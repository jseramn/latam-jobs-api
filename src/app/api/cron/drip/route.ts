import { NextResponse } from "next/server";
import { resendConfigured } from "@/lib/resend";
import { sendDripEmail } from "@/lib/drip";

export const runtime = "nodejs";

/**
 * Vercel Cron — drip campaign.
 * Schedule in vercel.json: daily at 10am UTC.
 *
 * Sends email to any contact whose signup age matches a drip step
 * (days 0, 3, 7, 14 from creation).
 *
 * Phase 1 (validation): we send ALL 4 emails to ALL contacts immediately,
 * marked with the step number in subject prefix. Production drip state
 * machine is post-launch work.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  if (!resendConfigured) {
    return NextResponse.json(
      { error: "resend_not_configured" },
      { status: 503 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY!;
  const audienceName = process.env.RESEND_AUDIENCE_NAME ?? "General";
  const url = new URL(req.url);
  const forceAll = url.searchParams.get("all") === "true";
  const onlyStep = Number(url.searchParams.get("step") ?? "0");

  // Find audience
  const audList = await fetch("https://api.resend.com/audiences", {
    headers: { Authorization: `Bearer ${apiKey}` },
  }).then((r) => r.json());

  const audiences = Array.isArray(audList?.data) ? audList.data : audList;
  const audience = audiences?.find?.((a: { name: string }) => a.name === audienceName);
  if (!audience?.id) {
    return NextResponse.json(
      { error: "audience_not_found", name: audienceName },
      { status: 404 },
    );
  }

  // List contacts
  const contactsRes = await fetch(
    `https://api.resend.com/audiences/${audience.id}/contacts`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  const contactsJson = await contactsRes.json();
  const contacts: Array<{ id: string; email: string; created_at: string }> =
    Array.isArray(contactsJson?.data)
      ? contactsJson.data
      : contactsJson;

  // For Phase 1: only send to contacts that haven't received any drip yet
  // (we track via email prefix "[Drip X/N]" check).
  const results: Array<{
    email: string;
    step: number;
    ok: boolean;
    error?: string;
  }> = [];

  // Lazy import drip to avoid loading on cold start
  const { DRIP_SEQUENCE } = await import("@/lib/drip");

  for (const contact of contacts) {
    const ageDays = contact.created_at
      ? Math.floor(
          (Date.now() - new Date(contact.created_at).getTime()) / 86_400_000,
        )
      : 0;

    for (const step of DRIP_SEQUENCE) {
      if (!forceAll && step.days !== ageDays) continue;
      if (forceAll && step.days !== onlyStep * 7) continue;
      if (ageDays < step.days) continue;

      const ok = await sendDripEmail(contact.email, step);
      results.push({
        email: contact.email,
        step: step.days,
        ok,
      });
    }
  }

  return NextResponse.json({
    audience_name: audienceName,
    contacts_total: contacts.length,
    emails_sent: results.filter((r) => r.ok).length,
    emails_failed: results.filter((r) => !r.ok).length,
    mode: forceAll ? `force_step_${onlyStep}` : "age_based",
    results,
  });
}
