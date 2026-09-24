/**
 * Wompi integration — Web Checkout (Colombia, COP).
 *
 * ⚠️ SECURITY: All keys are env-var only. Never commit, never log,
 * never echo back. If a key appears in chat, assume compromised and rotate.
 *
 * Required env vars (set via `vercel env add` — not in .env committed):
 *   WOMPI_PUBLIC_KEY              — pub_prod_xxx (client-safe)
 *   WOMPI_PRIVATE_KEY             — prv_prod_xxx (server-only, NEVER expose)
 *   WOMPI_INTEGRITY_SECRET        — prod_integrity_xxx (server-only)
 *   WOMPI_EVENTS_SECRET           — prod_events_xxx (server-only, webhook signature)
 *
 * Endpoints:
 *   Sandbox: https://sandbox.wompi.co
 *   Production: https://production.wompi.co
 *
 * Flow (Phase 1 — one-off monthly payment):
 *   1. POST /api/billing/checkout → returns Wompi checkout URL
 *   2. Customer pays on Wompi (hosted page)
 *   3. Wompi webhook → /api/billing/webhook
 *   4. Verify signature with WOMPI_EVENTS_SECRET
 *   5. Mark subscription active in /data/subscriptions.json
 *   6. Issue API key, email to customer
 *
 * Recurring billing (Phase 2):
 *   Wompi Botón Bancolombia: customer authorizes once → monthly charge.
 *   We persist payment_source_id, then create recurring transactions.
 */

import { createHash } from "crypto";

export type Tier = "indie" | "scale";

// Pricing in COP (centavos)
export const PRICING_COP_CENTS: Record<Tier, number> = {
  indie: 200_000_00,   // COP$200.000
  scale: 800_000_00,   // COP$800.000
};

export const TIER_LABEL: Record<Tier, string> = {
  indie: "Indie",
  scale: "Scale",
};

const SANDBOX_URL = "https://sandbox.wompi.co";
const PROD_URL = "https://production.wompi.co";

export function wompiBaseUrl(): string {
  return process.env.NODE_ENV === "production" ? PROD_URL : SANDBOX_URL;
}

/** Unique reference per checkout. Wompi rejects duplicates. */
export function generateReference(tier: Tier, email: string): string {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const safeEmail = email.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);
  return `latamjobs_${tier}_${safeEmail}_${stamp}_${rand}`;
}

/**
 * Generate Wompi integrity signature for a transaction.
 *
 * Formula (per Wompi docs): SHA256(Reference + AmountInCents + Currency + IntegritySecret)
 * If expiration-time is used, append that value too.
 */
export function generateIntegritySignature(
  reference: string,
  amountInCents: number,
  currency: string,
  expirationTime?: string,
): string {
  const secret = process.env.WOMPI_INTEGRITY_SECRET;
  if (!secret) throw new Error("WOMPI_INTEGRITY_SECRET not configured");

  const parts = [reference, String(amountInCents), currency, secret];
  if (expirationTime) parts.push(expirationTime);
  const concat = parts.join("");

  return createHash("sha256").update(concat).digest("hex");
}

/**
 * Build the Wompi Web Checkout URL (hosted page).
 *
 * Customer completes payment on Wompi; we receive webhook on completion.
 */
export function buildCheckoutUrl(opts: {
  reference: string;
  amountInCents: number;
  email: string;
  tier: Tier;
  redirectUrl: string;
}): string {
  const publicKey = process.env.WOMPI_PUBLIC_KEY;
  if (!publicKey) throw new Error("WOMPI_PUBLIC_KEY not configured");

  const signature = generateIntegritySignature(
    opts.reference,
    opts.amountInCents,
    "COP",
  );

  const params = new URLSearchParams({
    "public-key": publicKey,
    currency: "COP",
    "amount-in-cents": String(opts.amountInCents),
    reference: opts.reference,
    "signature:integrity": signature,
    "redirect-url": opts.redirectUrl,
    "customer-data:email": opts.email,
    "payment-method": "TARJETA,PSE,NEQUI,BANCOLOMBIA_TRANSFER",
  });

  return `${wompiBaseUrl()}/p/?${params.toString()}`;
}

/**
 * Verify a Wompi webhook event signature.
 *
 * Formula (per Wompi docs):
 *   concat = values from data.{properties} + timestamp + WOMPI_EVENTS_SECRET
 *   expected_checksum = SHA256(concat)
 *   compare against X-Event-Checksum header
 */
export function verifyEventSignature(
  properties: string[],
  values: string[],
  timestamp: number,
  receivedChecksum: string,
): boolean {
  const secret = process.env.WOMPI_EVENTS_SECRET;
  if (!secret) return false;

  const concat = [...values, String(timestamp), secret].join("");
  const computed = createHash("sha256").update(concat).digest("hex");
  return computed === receivedChecksum;
}

export interface WompiEvent {
  event: string;
  data: {
    transaction: {
      id: string;
      amount_in_cents: number;
      reference: string;
      customer_email: string;
      currency: string;
      payment_method_type: string;
      status: "PENDING" | "APPROVED" | "DECLINED" | "VOIDED" | "ERROR";
      payment_source_id?: number | null;
    };
  };
  signature: {
    checksum: string;
    properties: string[];
  };
  timestamp: number;
  sent_at: string;
}
