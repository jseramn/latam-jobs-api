import Link from "next/link";

export const metadata = {
  title: "Docs — LatamJobs API",
  description: "Documentación técnica de LatamJobs API.",
};

export default function DocsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Link
        href="/"
        className="text-sm text-muted hover:text-accent transition-colors"
      >
        ← Volver
      </Link>
      <h1 className="text-4xl font-semibold tracking-tight mt-6 mb-4">
        Docs
      </h1>
      <p className="text-muted mb-8">
        Documentación completa apenas validemos demanda. Mientras tanto:
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">GET /v1/search</h2>
          <p className="text-sm text-muted mb-3">
            Busca ofertas de trabajo en uno o varios países.
          </p>
          <pre className="rounded-lg border border-border bg-card p-4 text-xs overflow-x-auto font-mono">
{`curl https://api.latam-jobs.dev/v1/search?q=python&country=mx,co,ar`}
          </pre>
          <ul className="text-sm text-muted mt-3 space-y-1">
            <li>
              <code className="text-accent">q</code> — keyword (título, skill, empresa)
            </li>
            <li>
              <code className="text-accent">country</code> — códigos ISO
              separados por coma (mx, co, ar, cl, pe, uy)
            </li>
            <li>
              <code className="text-accent">salary_min</code> — sueldo mínimo
              en USD
            </li>
            <li>
              <code className="text-accent">limit</code> — 1 a 100 (default 20)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Schema de respuesta</h2>
          <pre className="rounded-lg border border-border bg-card p-4 text-xs overflow-x-auto font-mono">
{`{
  "results": [
    {
      "id": "abc123",
      "title": "Backend Developer Python",
      "company": "Mercado Libre",
      "location": "Ciudad de México, MX",
      "salary": { "min": 45000, "max": 70000, "currency": "MXN", "period": "monthly" },
      "posted_at": "2026-09-19T14:22:00Z",
      "sources": ["computrabajo", "bumeran"],
      "url": "https://..."
    }
  ],
  "meta": { "total": 1247, "fetched_ms": 3120 }
}`}
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Autenticación</h2>
          <p className="text-sm text-muted">
            Header <code className="text-accent">Authorization: Bearer TU_API_KEY</code>.
            Las keys se emiten al confirmar el early access.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Rate limits</h2>
          <p className="text-sm text-muted">
            Free: 500 calls/mes · Indie: 10k calls/mes · Scale: 100k calls/mes.
          </p>
        </section>
      </div>
    </main>
  );
}
