import { randomBytes, createHash } from "crypto";

/**
 * API key issuance for paying customers.
 *
 * Flow:
 *   1. Customer pays via Mercado Pago
 *   2. Webhook fires → marks subscription active
 *   3. Webhook handler calls issueApiKey(email, planId)
 *   4. We store mapping {hashed_key: {email, planId, created_at, status}}
 *   5. Email API key to customer (plain text, never stored)
 *
 * Format: sk_live_<32-hex> for production
 *         sk_test_<32-hex> for staging
 */

const SUBS_FILE = process.cwd() + "/data/subscriptions.json";
const KEYS_FILE = process.cwd() + "/data/api-keys.json";

export interface ApiKey {
  id: string; // hashed key (first 16 chars for display)
  hash: string; // sha256(key) for lookup
  email: string;
  plan: "indie" | "scale";
  subscription_id?: string;
  status: "active" | "revoked";
  calls_this_month: number;
  created_at: string;
  last_used_at?: string;
}

export function generateApiKey(testMode = false): { key: string; id: string; hash: string } {
  const prefix = testMode ? "sk_test_" : "sk_live_";
  const raw = randomBytes(24).toString("hex"); // 48 chars
  const key = `${prefix}${raw}`;
  const id = raw.slice(0, 8); // short id for display
  const hash = createHash("sha256").update(key).digest("hex");
  return { key, id, hash };
}

export function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

/** Read API keys from file. Empty array if file doesn't exist. */
export async function readApiKeys(): Promise<ApiKey[]> {
  const { readFile } = await import("fs/promises");
  const { existsSync } = await import("fs");
  if (!existsSync(KEYS_FILE)) return [];
  try {
    const raw = await readFile(KEYS_FILE, "utf-8");
    return JSON.parse(raw) as ApiKey[];
  } catch {
    return [];
  }
}

export async function writeApiKeys(keys: ApiKey[]): Promise<void> {
  const { writeFile, mkdir } = await import("fs/promises");
  const { existsSync } = await import("fs");
  const dir = require("path").dirname(KEYS_FILE);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  await writeFile(KEYS_FILE, JSON.stringify(keys, null, 2));
}

/** Generate a new key for a customer. Idempotent: returns existing key if customer has one active. */
export async function issueApiKey(
  email: string,
  plan: "indie" | "scale",
  subscriptionId?: string,
): Promise<{ key: string; existing: boolean }> {
  const keys = await readApiKeys();
  const existing = keys.find(
    (k) =>
      k.email === email &&
      k.plan === plan &&
      k.status === "active",
  );
  if (existing) {
    // We can't recover the original plaintext, so we issue a new one
    // and revoke the old. Safer than silently keeping a key we can't show.
    existing.status = "revoked";
  }

  const { key, id, hash } = generateApiKey(process.env.NODE_ENV !== "production");
  const newKey: ApiKey = {
    id,
    hash,
    email,
    plan,
    subscription_id: subscriptionId,
    status: "active",
    calls_this_month: 0,
    created_at: new Date().toISOString(),
  };

  const updated = existing
    ? keys.map((k) => (k.id === existing.id ? newKey : k)).concat(newKey)
    : [...keys, newKey];
  await writeApiKeys(updated);

  return { key, existing: Boolean(existing) };
}
