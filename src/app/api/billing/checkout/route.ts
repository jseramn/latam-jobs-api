import { NextResponse } from "next/server";
import { z } from "zod";
import {
  PRICING_COP_CENTS,
  TIER_LABEL,
  generateReference,
  buildCheckoutUrl,
} from "@/lib/wompi";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(254),
  tier: z.enum(["indie", "scale"]),
});

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://latamjobs-api.jseramn.tech";

export async function POST(req: Request) {
  // Required env vars check (no value logging)
  const required = [
    "WOMPI_PUBLIC_KEY",
    "WOMPI_PRIVATE_KEY",
    "WOMPI_INTEGRITY_SECRET",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: "wompi_not_configured",
        message: `Set these env vars in Vercel: ${missing.join(", ")}`,
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, tier } = parsed.data;

  try {
    const reference = generateReference(tier, email);
    const amountInCents = PRICING_COP_CENTS[tier];
    const redirectUrl = `${BASE_URL}/billing/return`;

    const checkoutUrl = buildCheckoutUrl({
      reference,
      amountInCents,
      email,
      tier,
      redirectUrl,
    });

    return NextResponse.json({
      ok: true,
      reference,
      checkout_url: checkoutUrl,
      amount_cop: amountInCents / 100,
      tier,
      email,
      tier_label: TIER_LABEL[tier],
    });
  } catch (e) {
    return NextResponse.json(
      { error: "wompi_build_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
