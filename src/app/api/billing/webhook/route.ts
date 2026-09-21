import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { MpWebhookPayload } from "@/lib/mercadopago";

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

    return NextResponse.json({ ok: true, recorded: next });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
