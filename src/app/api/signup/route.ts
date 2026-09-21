import { NextResponse } from "next/server";
import { z } from "zod";
import { addContact, resendConfigured, sendConfirmation } from "@/lib/resend";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(254),
  role: z.enum(["recruiter", "agency", "hrtech", "developer", "other"]).optional(),
  country: z
    .enum(["MX", "CO", "AR", "CL", "PE", "UY", "OTHER"])
    .optional(),
  // Honeypot: bots fill this, humans don't. Must be empty.
  company_url: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  if (!resendConfigured) {
    return NextResponse.json(
      { error: "missing_resend_key" },
      { status: 503 },
    );
  }

  // Rate limit per IP
  const ip = clientIp(req);
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: "Too many signups from this IP. Try again in an hour.",
        reset_at: new Date(limit.resetAt).toISOString(),
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
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
    // If honeypot is filled, silently succeed to not tip off bots
    const raw = body as { company_url?: string };
    if (raw.company_url && raw.company_url.length > 0) {
      return NextResponse.json({ ok: true });
    }
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
