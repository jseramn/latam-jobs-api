import { NextResponse } from "next/server";
import { z } from "zod";
import { addContact, resendConfigured, sendConfirmation } from "@/lib/resend";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(254),
  role: z.enum(["recruiter", "agency", "hrtech", "developer", "other"]).optional(),
  country: z
    .enum(["MX", "CO", "AR", "CL", "PE", "UY", "OTHER"])
    .optional(),
});

export async function POST(req: Request) {
  if (!resendConfigured) {
    return NextResponse.json(
      { error: "missing_resend_key" },
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
      { error: "invalid_email", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, role, country } = parsed.data;
  const result = await addContact({ email, role, country });

  if (!result.ok) {
    return NextResponse.json(
      { error: "resend_failed", detail: result.error },
      { status: 502 },
    );
  }

  // Fire-and-forget confirmation email
  void sendConfirmation({ email, role, country }).catch(() => undefined);

  return NextResponse.json({
    ok: true,
    duplicate: result.duplicate ?? false,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: resendConfigured,
    audience_name: process.env.RESEND_AUDIENCE_NAME ?? "General",
  });
}
