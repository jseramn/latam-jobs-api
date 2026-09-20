"use client";

import { useState, type FormEvent } from "react";

interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  period?: string;
  source: string;
  posted_at?: string;
}

interface ApiResponse {
  results: JobResult[];
  meta: { total: number; fetched_ms: number; source: string };
  preview?: boolean;
  message?: string;
}

const SAMPLE_DATA: JobResult[] = [
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
    salary_min: 8_000_000,
    salary_max: 14_000_000,
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
];

const formatSalary = (j: JobResult) => {
  if (!j.salary_min) return "Sueldo a convenir";
  const fmt = new Intl.NumberFormat("es-419");
  const min = fmt.format(j.salary_min);
  const max = j.salary_max ? fmt.format(j.salary_max) : null;
  const period =
    j.period === "monthly" ? "/mes" : j.period === "yearly" ? "/año" : "";
  return max ? `${j.currency} ${min} – ${max}${period}` : `${j.currency} ${min}+${period}`;
};

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days === 0) return "hoy";
  if (days === 1) return "ayer";
  return `hace ${days} días`;
};

export function LiveDemo() {
  const [query, setQuery] = useState("python");
  const [country, setCountry] = useState("mx,co,ar");
  const [results, setResults] = useState<JobResult[]>(SAMPLE_DATA);
  const [meta, setMeta] = useState<ApiResponse["meta"]>({
    total: 1247,
    fetched_ms: 3120,
    source: "sample",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `/api/preview?q=${encodeURIComponent(query)}&country=${encodeURIComponent(country)}`,
        { cache: "no-store" },
      );
      const data = (await r.json()) as ApiResponse;
      setResults(data.results?.length ? data.results : []);
      setMeta(data.meta);
      setPreview(Boolean(data.preview));
    } catch {
      setError("Sin conexión. Probá de nuevo.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-card-hover/40 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-danger" />
          <span className="w-2 h-2 rounded-full bg-warning" />
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="ml-3 text-xs text-muted font-mono">
            api.latam-jobs.dev/v1/search
          </span>
        </div>
        {preview && (
          <span className="text-xs text-warning font-mono">SAMPLE</span>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="px-5 py-4 border-b border-border flex flex-wrap gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="python, desarrollador, marketing..."
          className="flex-1 min-w-[180px] px-3 py-2 rounded-md bg-background border border-border text-sm font-mono focus:outline-none focus:border-accent"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-3 py-2 rounded-md bg-background border border-border text-sm font-mono focus:outline-none focus:border-accent"
        >
          <option value="mx,co,ar">MX + CO + AR</option>
          <option value="mx">Solo México</option>
          <option value="co">Solo Colombia</option>
          <option value="ar">Solo Argentina</option>
          <option value="cl,pe,uy">CL + PE + UY</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-accent text-background text-sm font-semibold hover:bg-accent-deep transition-colors disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Probar"}
        </button>
      </form>

      <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
        {error && (
          <div className="px-5 py-8 text-center text-sm text-danger">{error}</div>
        )}
        {!error && results.length === 0 && !loading && (
          <div className="px-5 py-8 text-center text-sm text-muted">
            Sin resultados para esa búsqueda.
          </div>
        )}
        {results.map((job) => (
          <div
            key={job.id}
            className="px-5 py-4 hover:bg-card-hover transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-foreground font-medium truncate">
                  {job.title}
                </h4>
                <p className="text-sm text-muted mt-0.5">
                  {job.company} · {job.location}
                </p>
              </div>
              <span className="text-xs font-mono text-accent shrink-0 px-2 py-1 rounded bg-accent/10">
                {job.source}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-muted font-mono">
                {formatSalary(job)}
              </span>
              <span className="text-muted">{formatDate(job.posted_at)}</span>
            </div>
          </div>
        ))}
      </div>

      {meta && (
        <div className="px-5 py-3 border-t border-border bg-card-hover/40 text-xs text-muted font-mono flex justify-between">
          <span>{meta.total} resultados totales</span>
          <span>{meta.fetched_ms}ms · {meta.source}</span>
        </div>
      )}
    </div>
  );
}
