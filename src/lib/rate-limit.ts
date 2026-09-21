/**
 * In-memory rate limiter. Sufficient for Vercel Hobby where each function
 * instance is short-lived but warm starts share state. NOT distributed —
 * a determined attacker can bypass by hitting different instances.
 *
 * For real protection, upgrade to Upstash + sliding window.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5; // 5 signups per IP per hour

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(ip);

  if (!bucket || bucket.resetAt < now) {
    const fresh: Bucket = { count: 1, resetAt: now + WINDOW_MS };
    store.set(ip, fresh);
    return { allowed: true, remaining: MAX_PER_WINDOW - 1, resetAt: fresh.resetAt };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: MAX_PER_WINDOW - bucket.count,
    resetAt: bucket.resetAt,
  };
}

/** Cleanup old buckets every 100 calls to avoid memory leaks. */
let callsSinceCleanup = 0;
function maybeCleanup() {
  callsSinceCleanup += 1;
  if (callsSinceCleanup < 100) return;
  callsSinceCleanup = 0;
  const now = Date.now();
  for (const [ip, bucket] of store) {
    if (bucket.resetAt < now) store.delete(ip);
  }
}

/** Extract client IP from common headers. Falls back to "unknown". */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
