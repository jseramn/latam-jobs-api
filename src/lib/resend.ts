import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const audienceName = process.env.RESEND_AUDIENCE_NAME ?? "General";
const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "LatamJobs <hola@jseramn.tech>";

let resendClient: Resend | null = null;
let cachedAudienceId: string | null = null;

function client(): Resend {
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Resend v6 renamed audiences → segments. The `.audiences` property still
 * works as a deprecated alias, but the official path is now `.segments`.
 */
async function getAudienceId(): Promise<string> {
  if (cachedAudienceId) return cachedAudienceId;

  // v6 path
  const listRes = await client().audiences.list();
  // Response is a discriminated union { data, error } | { error, data }.
  // v6 wraps the actual payload in `data.data` (nested list object).
  if (listRes.error || !listRes.data) {
    throw new Error(
      `Failed to list audiences: ${listRes.error?.message ?? "unknown"}`,
    );
  }
  // Try both shapes: data may be the array directly, or wrapped in data.data
  const wrapped = listRes.data as unknown;
  let list: Array<{ id: string; name: string }> = [];
  if (Array.isArray(wrapped)) {
    list = wrapped as Array<{ id: string; name: string }>;
  } else if (
    wrapped &&
    typeof wrapped === "object" &&
    "data" in wrapped &&
    Array.isArray((wrapped as { data: unknown }).data)
  ) {
    list = (wrapped as { data: Array<{ id: string; name: string }> }).data;
  }
  const existing = list.find((a) => a.name === audienceName);
  if (existing) {
    cachedAudienceId = existing.id;
    return existing.id;
  }

  const createRes = await client().audiences.create({ name: audienceName });
  if (createRes.error || !createRes.data) {
    throw new Error(
      `Failed to create audience: ${createRes.error?.message ?? "unknown"}`,
    );
  }
  // v6 wraps create response too: data.data.id is the new segment
  const createdWrapped = createRes.data as unknown;
  let createdId: string | undefined;
  if (createdWrapped && typeof createdWrapped === "object") {
    const obj = createdWrapped as Record<string, unknown>;
    if (typeof obj.id === "string") {
      createdId = obj.id;
    } else if (
      obj.data &&
      typeof obj.data === "object" &&
      typeof (obj.data as Record<string, unknown>).id === "string"
    ) {
      createdId = (obj.data as { id: string }).id;
    }
  }
  if (!createdId) {
    throw new Error("Created audience but no id returned");
  }
  cachedAudienceId = createdId;
  return createdId;
}

export interface SignupInput {
  email: string;
  role?: string;
  country?: string;
}

export async function addContact(input: SignupInput): Promise<{
  ok: boolean;
  duplicate?: boolean;
  error?: string;
}> {
  try {
    const audienceId = await getAudienceId();
    const result = await client().contacts.create({
      email: input.email,
      firstName: input.role ?? "",
      lastName: input.country ?? "",
      unsubscribed: false,
      audienceId,
    });
    if (result.error) {
      // 409 duplicate is treated as ok=true, duplicate=true
      if (result.error.name === "validation_error") {
        return { ok: true, duplicate: true };
      }
      return { ok: false, error: result.error.message };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: message };
  }
}

export async function getContactCount(): Promise<number | null> {
  try {
    const audienceId = await getAudienceId();
    const result = await client().contacts.list({ audienceId });
    if (result.error || !result.data) return null;
    const data = result.data as unknown;
    if (Array.isArray(data)) return data.length;
    if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      Array.isArray((data as { data: unknown[] }).data)
    ) {
      return (data as { data: unknown[] }).data.length;
    }
    return null;
  } catch {
    return null;
  }
}

export async function sendConfirmation(input: SignupInput): Promise<boolean> {
  if (process.env.SEND_CONFIRMATION !== "true") return false;
  try {
    const result = await client().emails.send({
      from: fromEmail,
      to: [input.email],
      subject: "Estás en la lista — LatamJobs API",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b0d12;">
          <h1 style="margin:0 0 8px;font-size:22px;">¡Listo!</h1>
          <p style="font-size:15px;line-height:1.6;color:#444;">
            Te sumaste a la lista de early access de <strong>LatamJobs API</strong>.
            Si llegamos a <strong>30 recruiters</strong> en las próximas 48h, abrimos la API con precio founding de <strong>$49/mes</strong>.
          </p>
          <p style="font-size:12px;color:#999;margin-top:32px;">
            LatamJobs API · construido en Bogotá 🇨🇴
          </p>
        </div>`,
    });
    return !result.error;
  } catch {
    return false;
  }
}

export const resendConfigured = Boolean(apiKey);
