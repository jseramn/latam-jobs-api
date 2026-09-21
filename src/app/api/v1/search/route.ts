import { NextResponse } from "next/server";
import type { ScrapedJob } from "@/lib/scrapers/bumeran";
import { parseSalaryText } from "@/lib/scrapers/parse-salary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * v1 search endpoint. Tries real scrapers with strict timeouts;
 * always falls back to sample data with `preview: true` flag if scrapers fail.
 *
 * Auth: requires `Authorization: Bearer <api_key>` header in production.
 * For now (validating demand), it's open.
 *
 * Reliability contract: this endpoint NEVER returns 5xx for client errors.
 * If the scraper is broken, it returns sample data + a `warning` field.
 */

interface NormalizedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  url?: string;
  source: string;
  posted_at?: string;
  salary: { min: number; max: number; currency: string | null; period: string | null } | null;
  rating?: number;
}

interface CountryMap {
  [key: string]: string;
}

const COUNTRY_MAP: CountryMap = {
  mx: "Ciudad de México, MX",
  co: "Bogotá, CO",
  ar: "Buenos Aires, AR",
  cl: "Santiago, CL",
  pe: "Lima, PE",
  uy: "Montevideo, UY",
  br: "São Paulo, BR",
};

const SAMPLE_JOBS: Array<{
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  period: string;
  source: string;
  posted_at: string;
}> = [
  {
    id: "demo-1",
    title: "Senior Backend Engineer (Python)",
    company: "Mercado Libre",
    location: "Ciudad de México, MX",
    salary_min: 85000,
    salary_max: 130000,
    currency: "MXN",
    period: "monthly",
    source: "computrabajo",
    posted_at: "2026-09-19T14:22:00Z",
  },
  {
    id: "demo-2",
    title: "Desarrollador Python + Django",
    company: "Rappi",
    location: "Bogotá, CO",
    salary_min: 96_000_000,
    salary_max: 144_000_000,
    currency: "COP",
    period: "yearly",
    source: "computrabajo",
    posted_at: "2026-09-19T09:15:00Z",
  },
  {
    id: "demo-3",
    title: "Python Developer (Remote LATAM)",
    company: "Globant",
    location: "Buenos Aires, AR (Remoto)",
    salary_min: 4500,
    salary_max: 7200,
    currency: "USD",
    period: "monthly",
    source: "bumeran",
    posted_at: "2026-09-18T22:40:00Z",
  },
  {
    id: "demo-4",
    title: "Backend Developer - Fintech",
    company: "Nubank",
    location: "São Paulo, BR",
    salary_min: 18000,
    salary_max: 28000,
    currency: "BRL",
    period: "monthly",
    source: "bumeran",
    posted_at: "2026-09-18T18:30:00Z",
  },
  {
    id: "demo-5",
    title: "Ingeniero de Software Python",
    company: "Cornershop by Uber",
    location: "Santiago, CL",
    salary_min: 3_500_000,
    salary_max: 5_200_000,
    currency: "CLP",
    period: "monthly",
    source: "laborum",
    posted_at: "2026-09-18T11:00:00Z",
  },
];

/** Race a promise against a timeout. Returns fallback if timeout wins. */
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

function sampleResults(q: string, countries: string[]): NormalizedJob[] {
  const filtered = q
    ? SAMPLE_JOBS.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q),
      )
    : SAMPLE_JOBS;
  const byCountry =
    countries.length > 0
      ? filtered.filter((j) =>
          countries.some(
            (c) => j.location.toLowerCase().includes(c) || c === "mx" && j.location.includes("MX") || c === "co" && j.location.includes("CO") || c === "ar" && j.location.includes("AR") || c === "cl" && j.location.includes("CL") || c === "pe" && j.location.includes("PE") || c === "uy" && j.location.includes("UY") || c === "br" && j.location.includes("BR"),
          ),
        )
      : filtered;

  const data = byCountry.length > 0 ? byCountry : filtered.slice(0, 3);

  return data.map((j) => ({
    id: j.id,
    title: j.title,
    company: j.company,
    location: j.location,
    source: j.source,
    posted_at: j.posted_at,
    salary: {
      min: j.salary_min,
      max: j.salary_max,
      currency: j.currency,
      period: j.period,
    },
  }));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").toLowerCase().trim();
  const countryParam = (url.searchParams.get("country") ?? "mx,co,ar").toLowerCase();
  const countries = countryParam.split(",").map((c) => c.trim()).filter(Boolean);
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
  let realJobs: ScrapedJob[] = [];

  // Try real scrapers with strict timeout (Vercel Hobby = 10s limit).
  // Bumeran takes ~11s locally; cap at 8s to stay under serverless limits.
  if (sources.includes("bumeran") && (countryParam.includes("ar") || sources.length > 1)) {
    try {
      const scraperModule = await import("@/lib/scrapers/bumeran");
      const jobs = await withTimeout(
        scraperModule.searchBumeranAr({ query: q, maxResults }),
        7500,
        [] as ScrapedJob[],
      );
      if (jobs.length > 0) {
        realJobs.push(...jobs);
        fetchedFrom.push("bumeran");
      } else {
        warnings.push("bumeran_timeout_or_empty");
      }
    } catch (e) {
      warnings.push(`bumeran_failed: ${e instanceof Error ? e.message.slice(0, 80) : String(e).slice(0, 80)}`);
    }
  }

  const elapsed = Date.now() - start;

  // Real data path
  if (realJobs.length > 0) {
    const normalized: NormalizedJob[] = realJobs.slice(0, maxResults).map((job) => {
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
        countries,
        query: q,
        preview: false,
      },
    });
  }

  // Fallback path — sample data
  const sampleData = sampleResults(q, countries);
  return NextResponse.json({
    results: sampleData,
    meta: {
      total: sampleData.length,
      fetched_ms: elapsed,
      sources: ["sample"],
      countries,
      query: q,
      country_map: COUNTRY_MAP,
      preview: true,
      warnings,
      message:
        "Sample data — real scrapers deploy with cron jobs + Redis cache (next sprint). Real schema, sample rows.",
    },
  });
}
