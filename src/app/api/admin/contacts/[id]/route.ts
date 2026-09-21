import { NextResponse } from "next/server";
import { resendConfigured } from "@/lib/resend";

export const runtime = "nodejs";

/**
 * Admin endpoint to list + delete Resend contacts.
 *
 * Auth: requires `Authorization: Bearer <ADMIN_KEY>` header.
 * ADMIN_KEY must be set in Vercel env vars.
 *
 * Usage:
 *   GET  /api/admin/contacts?email=jseramn%2Btest@gmail.com  → list matching
 *   DELETE /api/admin/contacts/{contact_id}                → delete by ID
 *
 * This endpoint is for cleanup of test data only. No production traffic.
 */
async function ensureAdminAuth(req: Request): Promise<boolean> {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return false; // refuse if no key set
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
  const url = new URL(req.url);
  const emailFilter = url.searchParams.get("email")?.toLowerCase() ?? "";

  // Direct REST call to Resend (SDK v6 has no clean delete API)
  const apiKey = process.env.RESEND_API_KEY!;
  const audienceName = process.env.RESEND_AUDIENCE_NAME ?? "General";

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
    ? contacts.filter((c: { email: string }) => c.email.toLowerCase().includes(emailFilter))
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

export async function DELETE(req: Request) {
  if (!(await ensureAdminAuth(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!resendConfigured) {
    return NextResponse.json({ error: "resend_not_configured" }, { status: 503 });
  }

  // Extract contact ID from URL: /api/admin/contacts/{id}
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  const contactId = pathParts[pathParts.length - 1];

  if (!contactId || contactId === "contacts") {
    return NextResponse.json({ error: "missing_contact_id" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY!;
  const delRes = await fetch(
    `https://api.resend.com/audiences/contacts/${contactId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${apiKey}` },
    },
  );

  if (!delRes.ok) {
    const text = await delRes.text();
    return NextResponse.json(
      { error: "delete_failed", status: delRes.status, body: text },
      { status: delRes.status },
    );
  }

  return NextResponse.json({ ok: true, deleted: contactId });
}
