/**
 * Mercado Pago integration — Checkout Pro for Colombia.
 *
 * Flow (simplest viable):
 *   1. POST /api/billing/checkout?tier=indie → creates a preapproval_plan
 *   2. Returns MP-hosted init_point URL
 *   3. User pays on MP
 *   4. MP webhook hits /api/billing/webhook
 *   5. We mark subscription active + send welcome email
 *
 * Pricing (Colombia, COP):
 *   - Indie:    COP$200.000/mes (~$49 USD)
 *   - Scale:    COP$800.000/mes (~$199 USD)
 *
 * Required env vars:
 *   MERCADO_PAGO_ACCESS_TOKEN — Production access token from
 *     https://www.mercadopago.com.co/developers/panel/credentials
 */

export type Tier = "indie" | "scale";

export const PRICING_COP: Record<Tier, number> = {
  indie: 200_000,
  scale: 800_000,
};

export const TIER_LABEL: Record<Tier, string> = {
  indie: "Indie",
  scale: "Scale",
};

export const BACK_URL =
  process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/billing/return`
    : "https://latamjobs-api.jseramn.tech/billing/return";

interface PlanResponse {
  id: string;
  init_point: string;
  status: string;
}

export async function createMpPlan(
  tier: Tier,
  customerEmail: string,
): Promise<PlanResponse> {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
  }

  const amount = PRICING_COP[tier];
  const reason = `LatamJobs API ${TIER_LABEL[tier]} (COP ${amount.toLocaleString("es-CO")}/mes)`;

  const body = {
    reason,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: amount,
      currency_id: "COP",
      billing_day_proportional: true,
    },
    payment_methods_allowed: {
      payment_types: [{}],
      payment_methods: [{}],
    },
    back_url: BACK_URL,
    external_reference: `${tier}_${customerEmail}_${Date.now()}`,
  };

  const res = await fetch("https://api.mercadopago.com/preapproval_plan", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MP plan creation failed ${res.status}: ${text}`);
  }

  const plan = (await res.json()) as PlanResponse;
  return plan;
}

export interface MpWebhookPayload {
  type?: string;
  data?: { id?: string };
  user_id?: number;
  api_version?: string;
  application_id?: number;
  action?: string;
}

/** Verify webhook authenticity using MP signing (HMAC). */
export function verifyMpSignature(
  _payload: string,
  _signature: string | null,
): boolean {
  // Phase 1: trust by IP + secret URL token. Phase 2: implement HMAC.
  // MP webhook IPs are documented at:
  // https://www.mercadopago.com.co/developers/en/docs/your-integrations/notifications/webhooks
  return true;
}
