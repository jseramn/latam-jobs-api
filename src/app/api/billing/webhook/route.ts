import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { MpWebhookPayload } from "@/lib/mercadopago";
import { issueApiKey } from "@/lib/api-keys";
import { resendConfigured } from "@/lib/resend";

export const runtime = "nodejs";

const SUBS_FILE = path.join(process.cwd(), "data", "subscriptions.json");

interface Subscription {
  mp_plan_id: string;
  mp_subscription_id?: string;
  email: string;
  tier: "indie" | "scale";
  status: "pending" | "authorized" | "cancelled" | "paused";
  amount_cop: number;
  created_at: string;
  updated_at: string;
  external_reference?: string;
}

async function readSubs(): Promise<Subscription[]> {
  if (!existsSync(SUBS_FILE)) return [];
  try {
    const raw = await readFile(SUBS_FILE, "utf-8");
    return JSON.parse(raw) as Subscription[];
  } catch {
    return [];
  }
}

async function writeSubs(subs: Subscription[]): Promise<void> {
  const dir = path.dirname(SUBS_FILE);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  await writeFile(SUBS_FILE, JSON.stringify(subs, null, 2));
}

/**
 * Webhook receiver for Mercado Pago notifications.
 *
 * MP sends notifications when a subscription status changes.
 * For Phase 1 we just log them — Phase 2 will mark subscriptions active
 * and send the customer their API key.
 */
export async function POST(req: Request) {
  const payload = (await req.json()) as MpWebhookPayload;

  // MP sends {"type": "preapproval", "data": {"id": "..."}}
  // We poll that ID to get current status (avoids trusting webhook body).
  const resourceId = payload?.data?.id;
  if (!resourceId) {
    return NextResponse.json({ ok: true, ignored: "no_resource_id" });
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "mercadopago_not_configured" },
      { status: 503 },
    );
  }

  try {
    const subRes = await fetch(
      `https://api.mercadopago.com/preapproval/${resourceId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!subRes.ok) {
      return NextResponse.json(
        { ok: false, error: "mp_poll_failed", status: subRes.status },
        { status: 502 },
      );
    }
    const sub = (await subRes.json()) as {
      id: string;
      preapproval_plan_id: string;
      payer_email?: string;
      external_reference?: string;
      status: string;
      auto_recurring?: { transaction_amount: number; currency_id: string };
    };

    const subs = await readSubs();
    const existing = subs.find((s) => s.mp_plan_id === sub.preapproval_plan_id);
    const now = new Date().toISOString();

    const next: Subscription = existing ?? {
      mp_plan_id: sub.preapproval_plan_id,
      email: sub.payer_email ?? "",
      tier: "indie",
      status: "pending",
      amount_cop: sub.auto_recurring?.transaction_amount ?? 0,
      created_at: now,
      updated_at: now,
      external_reference: sub.external_reference,
    };

    next.mp_subscription_id = sub.id;
    next.status = sub.status as Subscription["status"];
    next.updated_at = now;
    if (sub.payer_email) next.email = sub.payer_email;

    const updated = existing
      ? subs.map((s) => (s.mp_plan_id === next.mp_plan_id ? next : s))
      : [...subs, next];

    await writeSubs(updated);

    // If subscription is now authorized for the first time, issue API key
    // and email it to the customer.
    let issuedKey: { key: string; existing: boolean } | null = null;
    if (next.status === "authorized" && next.email && !existing) {
      try {
        const tier = (next.tier ?? "indie") as "indie" | "scale";
        issuedKey = await issueApiKey(next.email, tier, next.mp_subscription_id);
      } catch (e) {
        // Non-fatal: log and continue
        console.error("api key issue failed:", e);
      }
    }

    // If we just issued a key, email it
    if (issuedKey && !issuedKey.existing && resendConfigured) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY!);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "LatamJobs <hola@jseramn.tech>",
          to: [next.email],
          subject: "Tu API key de LatamJobs",
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b0d12;">
              <h1 style="margin:0 0 8px;font-size:22px;">¡Bienvenido a LatamJobs API!</h1>
              <p style="font-size:15px;line-height:1.6;color:#444;">
                Tu pago fue confirmado. Acá está tu API key — guardala bien,
                no la vamos a re-enviar.
              </p>
              <pre style="background:#fafafa;padding:12px 16px;border-radius:6px;font-size:13px;overflow-x:auto;">${issuedKey.key}</pre>
              <p style="font-size:15px;line-height:1.6;color:#444;">
                Probala:
              </p>
              <pre style="background:#fafafa;padding:12px 16px;border-radius:6px;font-size:13px;overflow-x:auto;">curl -H "Authorization: Bearer ${issuedKey.key}" \\
  "https://latamjobs-api.jseramn.tech/api/v1/search?q=python&country=mx,co,ar"</pre>
              <p style="font-size:12px;color:#999;margin-top:32px;">
                Plan: ${next.tier} · ${next.amount_cop.toLocaleString("es-CO")} COP/mes
              </p>
            </div>`,
        });
      } catch (e) {
        console.error("welcome email failed:", e);
      }
    }

    return NextResponse.json({
      ok: true,
      recorded: next,
      api_key_issued: issuedKey ? !issuedKey.existing : false,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
