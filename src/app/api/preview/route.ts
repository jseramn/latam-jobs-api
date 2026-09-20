import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Demo endpoint for the landing page. Once the real scraper is wired in,
 * this returns live data. For now it returns a small sample so the UI works.
 */
const SAMPLE_JOBS = [
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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").toLowerCase().trim();
  const countryParam = url.searchParams.get("country") ?? "mx,co,ar";
  const countries = countryParam
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);

  const COUNTRY_MAP: Record<string, string> = {
    mx: "Ciudad de México, MX",
    co: "Bogotá, CO",
    ar: "Buenos Aires, AR",
    cl: "Santiago, CL",
    pe: "Lima, PE",
    uy: "Montevideo, UY",
    br: "São Paulo, BR",
  };

  const filtered = q
    ? SAMPLE_JOBS.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q),
      )
    : SAMPLE_JOBS;

  // Light country filter (sample data only spans these)
  const byCountry = countries.length
    ? filtered.filter((j) =>
        countries.some((c) => j.location.toLowerCase().includes(c)),
      )
    : filtered;

  const start = Date.now();
  // Simulate latency
  await new Promise((r) => setTimeout(r, 600));
  const elapsed = Date.now() - start;

  return NextResponse.json({
    results: byCountry.length ? byCountry : filtered.slice(0, 3),
    meta: {
      total: byCountry.length * 415,
      fetched_ms: elapsed,
      source: "preview",
      countries,
      country_map: COUNTRY_MAP,
      query: q,
    },
    preview: true,
    message:
      "Sample data — the real scraper lands next week. Real schema, sample rows.",
  });
}
