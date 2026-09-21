import { NextResponse } from "next/server";
import { searchBumeranAr } from "@/lib/scrapers/bumeran";
import { parseSalaryText } from "@/lib/scrapers/parse-salary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * v1 search endpoint. Tries real scrapers; falls back to sample data
 * with `preview: true` flag if scrapers fail.
 *
 * Auth: requires `Authorization: Bearer <api_key>` header in production.
 * For now (validating demand), it's open.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").toLowerCase().trim();
  const countryParam = (url.searchParams.get("country") ?? "ar").toLowerCase();
  const sources = (url.searchParams.get("sources") ?? "bumeran")
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const maxResults = Math.min(
    50,
    Math.max(1, Number(url.searchParams.get("limit") ?? "20")),
  );

  const start = Date.now();
  const warnings: string[] = [];
  const fetchedFrom: string[] = [];
  let realJobs: any[] = [];

  // Try real scrapers
  if (sources.includes("bumeran") && (countryParam.includes("ar") || sources.length > 1)) {
    try {
      const jobs = await searchBumeranAr({ query: q, maxResults });
      realJobs.push(...jobs);
      fetchedFrom.push("bumeran");
    } catch (e) {
      warnings.push(`bumeran_failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  const elapsed = Date.now() - start;

  // If we got real data, normalize it
  if (realJobs.length > 0) {
    const normalized = realJobs.slice(0, maxResults).map((job) => {
      const salary = parseSalaryText(job.raw?.salary_text);
      return {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        url: job.url,
        source: job.source,
        posted_at: job.posted_at,
        salary,
        rating: job.rating,
      };
    });

    return NextResponse.json({
      results: normalized,
      meta: {
        total: normalized.length,
        fetched_ms: elapsed,
        sources: fetchedFrom,
        countries: countryParam.split(","),
        query: q,
        preview: false,
      },
    });
  }

  // Fallback to preview data (re-use preview route handler)
  const SAMPLE = await import("@/app/api/preview/route");
  const previewRes = await (SAMPLE as any).GET(req);
  const previewJson = await previewRes.json();

  return NextResponse.json({
    ...previewJson,
    meta: {
      ...previewJson.meta,
      warnings: [...warnings, "no_real_data_returned_sample"],
      fetched_from: fetchedFrom,
    },
  });
}
