import { NextResponse } from "next/server";
import { cache, CACHE_TTL } from "@/lib/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Vercel Cron endpoint. Schedule in vercel.json: every 15 min.
 *
 * Auth: requires `Authorization: Bearer <CRON_SECRET>` header from Vercel.
 * Falls back to no-auth when CRON_SECRET is unset (dev mode).
 *
 * Phase 1: stores a heartbeat record. Real scraper integration comes
 * after we hit 30 signups and validate demand.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const start = Date.now();
  const cacheStore = cache();
  const now = new Date().toISOString();

  // Heartbeat record — proves cron is firing
  await cacheStore.set(
    "cron:scrape:heartbeat",
    JSON.stringify({ ran_at: now, duration_ms: Date.now() - start }),
    { ex: CACHE_TTL.scrape_run },
  );

  // Future: trigger scrapers here, store results in cache.
  // For now, this is a no-op heartbeat so Vercel keeps the cron schedule alive.

  return NextResponse.json({
    ok: true,
    ran_at: now,
    duration_ms: Date.now() - start,
    cache_configured: cacheStore.isConfigured(),
    note:
      "Phase 1 heartbeat only. Real scraper integration pending 30 signups + external scraper service (Apify/Browserless).",
  });
}
