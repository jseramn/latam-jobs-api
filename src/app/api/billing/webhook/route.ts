import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { issueApiKey } from "@/lib/api-keys";
import { resendConfigured } from "@/lib/resend";
import {
  verifyEventSignature,
  type WompiEvent,
} from "@/lib/wompi";

export const runtime = "nodejs";

const SUBS_FILE = path.join(process.cwd(), "data", "subscriptions.json");

interface Subscription {
  provider: "wompi" | "mercadopago";
  wompi_transaction_id?: string;
  wompi_reference?: string;
  mp_subscription_id?: string;
  mp_plan_id?: string;
  email: string;
  tier: "indie" | "scale";
  status: "pending" | "approved" | "declined" | "voided" | "error" | "cancelled";
  amount_cop: number;
  payment_method?: string;
  created_at: string;
  updated_at: string;
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
 * Tier inference from amount (cents).
 * Indie = COP$200.000 (20_000_000 cents), Scale = COP$800.000 (80_000_000).
 */
function inferTier(amountInCents: number): "indie" | "scale" {
  return amountInCents >= 50_000_000 ? "scale" : "indie";
}

/**
 * Wompi webhook receiver.
 *
 * Verifies X-Event-Checksum signature against WOMPI_EVENTS_SECRET,
 * then persists subscription state and issues API key on first APPROVED.
 */
export async function POST(req: Request) {
  const eventsSecret = process.env.WOMPI_EVENTS_SECRET;
  if (!eventsSecret) {
    return NextResponse.json(
      { error: "wompi_events_secret_not_configured" },
      { status: 503 },
    );
  }

  // Read body + checksum header BEFORE parsing for signature verification
  const rawBody = await req.text();
  const receivedChecksum = req.headers.get("x-event-checksum");

  let event: WompiEvent;
  try {
    event = JSON.parse(rawBody) as WompiEvent;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Verify signature
  if (!receivedChecksum) {
    return NextResponse.json(
      { ok: false, error: "missing_checksum_header" },
      { status: 400 },
    );
  }

  const properties = event.signature?.properties ?? [];
  const values = properties.map((p) => {
    const parts = p.split(".");
    let cursor: unknown = event.data;
    for (const part of parts) {
      if (cursor && typeof cursor === "object" && part in cursor) {
        cursor = (cursor as Record<string, unknown>)[part];
      } else {
        cursor = undefined;
      }
    }
    return cursor === undefined || cursor === null ? "" : String(cursor);
  });

  const signatureOk = verifyEventSignature(
    properties,
    values,
    event.timestamp,
    receivedChecksum,
  );

  if (!signatureOk) {
    return NextResponse.json(
      { ok: false, error: "invalid_signature" },
      { status: 401 },
    );
  }

  // Signature verified — process event
  const tx = event.data.transaction;
  const txId = tx.id;
  const reference = tx.reference;
  const email = tx.customer_email;
  const amount = tx.amount_in_cents / 100;
  const tier = inferTier(tx.amount_in_cents);
  const status = tx.status.toLowerCase() as Subscription["status"];
  const paymentMethod = tx.payment_method_type;

  const subs = await readSubs();
  const existing = subs.find((s) => s.wompi_reference === reference);
  const now = new Date().toISOString();

  const next: Subscription = existing ?? {
    provider: "wompi",
    wompi_reference: reference,
    email,
    tier,
    status: "pending",
    amount_cop: amount,
    created_at: now,
    updated_at: now,
  };

  next.wompi_transaction_id = txId;
  next.status = status;
  next.updated_at = now;
  if (email) next.email = email;
  if (paymentMethod) next.payment_method = paymentMethod;
  if (amount) next.amount_cop = amount;

  const updated = existing
    ? subs.map((s) => (s.wompi_reference === reference ? next : s))
    : [...subs, next];

  await writeSubs(updated);

  // Issue API key on first APPROVED
  let issuedKey: { key: string; existing: boolean } | null = null;
  if (next.status === "approved" && next.email && !existing) {
    try {
      issuedKey = await issueApiKey(next.email, next.tier, txId);
    } catch (e) {
      console.error("api key issue failed:", e);
    }
  }

  // Email welcome with API key
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
              Tu pago fue confirmado vía Wompi. Acá está tu API key — guardala bien,
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
    received: { reference, status, amount, email, payment_method: paymentMethod },
    api_key_issued: issuedKey ? !issuedKey.existing : false,
  });
}
