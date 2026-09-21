import { NextResponse } from "next/server";
import { resendConfigured } from "@/lib/resend";

export const runtime = "nodejs";

/**
 * Admin endpoint to LIST Resend contacts (no delete — use /api/admin/contacts/[id]).
 *
 * Auth: requires `Authorization: Bearer <ADMIN_KEY>` header.
 */
async function ensureAdminAuth(req: Request): Promise<boolean> {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${adminKey}`;
}

export async function GET(req: Request) {
  if (!(await ensureAdminAuth(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!resendConfigured) {
    return NextResponse.json({ error: "resend_not_configured" }, { status: 503 });
  }

  const apiKey = process.env.RESEND_API_KEY!;
  const audienceName = process.env.RESEND_AUDIENCE_NAME ?? "General";
  const url = new URL(req.url);
  const emailFilter = url.searchParams.get("email")?.toLowerCase() ?? "";

  const audList = await fetch("https://api.resend.com/audiences", {
    headers: { Authorization: `Bearer ${apiKey}` },
  }).then((r) => r.json());

  const audiences = Array.isArray(audList?.data) ? audList.data : audList;
  const audience = audiences?.find?.((a: { name: string }) => a.name === audienceName);
  if (!audience?.id) {
    return NextResponse.json({ error: "audience_not_found", name: audienceName }, { status: 404 });
  }

  const contactsRes = await fetch(
    `https://api.resend.com/audiences/${audience.id}/contacts`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  const contactsJson = await contactsRes.json();
  const contacts = Array.isArray(contactsJson?.data)
    ? contactsJson.data
    : contactsJson;

  const filtered = emailFilter
    ? contacts.filter((c: { email: string }) =>
        c.email.toLowerCase().includes(emailFilter),
      )
    : contacts;

  return NextResponse.json({
    audience_id: audience.id,
    audience_name: audienceName,
    total: contacts.length,
    matched: filtered.length,
    contacts: filtered.map((c: { id: string; email: string; created_at?: string }) => ({
      id: c.id,
      email: c.email,
      created_at: c.created_at,
    })),
  });
}
