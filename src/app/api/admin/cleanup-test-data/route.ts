import { NextResponse } from "next/server";
import { resendConfigured } from "@/lib/resend";

export const runtime = "nodejs";

/**
 * One-click cleanup of test data from Resend audience.
 *
 * Auth: requires `Authorization: Bearer <ADMIN_KEY>` header.
 *
 * Removes any contact whose email matches a test pattern:
 *   - ends with @example.com / @test.com
 *   - contains +test / +bot / +dev (gmail-style tags)
 *   - starts with test / bot / spam
 *   - equals jseramn+test@gmail.com
 *
 * Safe to call repeatedly. Returns deleted count + remaining.
 */
async function ensureAdminAuth(req: Request): Promise<boolean> {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${adminKey}`;
}

const TEST_PATTERNS = [
  /^[^@]*\+test@/i,
  /^[^@]*\+bot@/i,
  /^[^@]*\+dev@/i,
  /^[^@]*\+verify@/i,
  /^test\d*@/i,
  /^bot\d*@/i,
  /^spam@/i,
  /@example\.com$/i,
  /@test\.com$/i,
  /@mailinator\.com$/i,
  /@tempmail\.com$/i,
  /@10minutemail\.com$/i,
  /^jseramn\+test@/i,
];

function isTestEmail(email: string): boolean {
  return TEST_PATTERNS.some((re) => re.test(email));
}

export async function POST(req: Request) {
  if (!(await ensureAdminAuth(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!resendConfigured) {
    return NextResponse.json({ error: "resend_not_configured" }, { status: 503 });
  }

  const apiKey = process.env.RESEND_API_KEY!;
  const audienceName = process.env.RESEND_AUDIENCE_NAME ?? "General";

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

  // List all contacts (paginate if needed)
  const contactsRes = await fetch(
    `https://api.resend.com/audiences/${audience.id}/contacts`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  const contactsJson = await contactsRes.json();
  const contacts = Array.isArray(contactsJson?.data)
    ? contactsJson.data
    : contactsJson;

  const testContacts = contacts.filter((c: { email: string }) =>
    isTestEmail(c.email),
  );

  // Delete each
  const results: Array<{ id: string; email: string; ok: boolean; error?: string }> = [];
  for (const c of testContacts) {
    try {
      const del = await fetch(
        `https://api.resend.com/audiences/contacts/${c.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${apiKey}` },
        },
      );
      results.push({ id: c.id, email: c.email, ok: del.ok });
    } catch (e) {
      results.push({
        id: c.id,
        email: c.email,
        ok: false,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return NextResponse.json({
    audience_name: audienceName,
    total_contacts: contacts.length,
    test_patterns_matched: testContacts.length,
    deleted: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results,
  });
}
