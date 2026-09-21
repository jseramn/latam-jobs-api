import { NextResponse } from "next/server";
import { z } from "zod";
import { createMpPlan } from "@/lib/mercadopago";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(254),
  tier: z.enum(["indie", "scale"]),
});

export async function POST(req: Request) {
  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "mercadopago_not_configured", message: "Set MERCADO_PAGO_ACCESS_TOKEN in Vercel env vars." },
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
    const plan = await createMpPlan(tier, email);
    return NextResponse.json({
      ok: true,
      plan_id: plan.id,
      init_point: plan.init_point,
      tier,
      email,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "mp_create_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
