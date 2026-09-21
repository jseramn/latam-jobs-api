/**
 * API key authentication middleware.
 *
 * Phase 1: keys issued via issueApiKey() after MP payment confirmed.
 * Auth header: Authorization: Bearer sk_live_xxx
 * Rate limit per key: 10k calls/month (Indie), 100k/month (Scale).
 *
 * Returns the key record on success, null on auth failure.
 */

import { createHash } from "crypto";
import { readApiKeys, type ApiKey } from "./api-keys";

export const PLAN_LIMITS = {
  indie: 10_000,
  scale: 100_000,
} as const;

export interface AuthResult {
  ok: boolean;
  key?: ApiKey;
  remaining?: number;
  reason?: "missing" | "invalid" | "revoked" | "exceeded_limit" | "internal_error";
}

export async function authenticateRequest(
  req: Request,
): Promise<AuthResult> {
  const auth = req.headers.get("authorization");
  if (!auth) return { ok: false, reason: "missing" };

  const match = auth.match(/^Bearer\s+(sk_(live|test)_[a-f0-9]+)$/i);
  if (!match) return { ok: false, reason: "invalid" };

  const presented = match[1];
  const presentedHash = createHash("sha256").update(presented).digest("hex");

  let keys: ApiKey[];
  try {
    keys = await readApiKeys();
  } catch {
    return { ok: false, reason: "internal_error" };
  }

  const key = keys.find((k) => k.hash === presentedHash);
  if (!key) return { ok: false, reason: "invalid" };
  if (key.status !== "active") return { ok: false, reason: "revoked" };

  const limit = PLAN_LIMITS[key.plan];
  const remaining = Math.max(0, limit - key.calls_this_month);
  if (key.calls_this_month >= limit) {
    return { ok: false, key, remaining: 0, reason: "exceeded_limit" };
  }

  return { ok: true, key, remaining };
}

export async function incrementUsage(keyId: string): Promise<void> {
  const { readApiKeys, writeApiKeys } = await import("./api-keys");
  const keys = await readApiKeys();
  const idx = keys.findIndex((k) => k.id === keyId);
  if (idx === -1) return;
  keys[idx].calls_this_month += 1;
  keys[idx].last_used_at = new Date().toISOString();
  await writeApiKeys(keys);
}
