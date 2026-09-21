import Link from "next/link";
import { DecryptReveal } from "@/components/effects/DecryptReveal";
import { AsciiSweep } from "@/components/effects/AsciiSweep";

export const metadata = {
  title: "Docs — LatamJobs API",
  description:
    "Documentación técnica de LatamJobs API: endpoints REST, schema de respuesta, ejemplos curl.",
};

export default function DocsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 font-mono">
      <Link href="/" className="text-xs text-muted hover:text-accent transition-colors">
        ← /home
      </Link>
      <p className="text-xs text-accent uppercase tracking-wider mt-6 mb-3">
        // docs
      </p>
      <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
        <DecryptReveal>Documentación técnica</DecryptReveal>
      </h1>
      <p className="text-sm text-muted mb-12">
        Referencia completa de endpoints. Para una versión resumida, leé{" "}
        <a href="/llms.txt" className="text-accent hover:underline">
          /llms.txt
        </a>
        .
      </p>

      <AsciiSweep height={40} />

      <section className="space-y-10 mt-10">
        <DocSection
          n="01"
          title="GET /v1/search"
          desc="Busca ofertas en uno o varios países. Retorna resultados deduplicados con salario parseado."
        >
          <Endpoint method="GET" path="/v1/search?q=python&country=mx,co,ar" />
          <ParamTable
            rows={[
              { name: "q", type: "string", required: true, desc: "Keyword (título, skill, empresa)" },
              { name: "country", type: "string", required: false, desc: "ISO codes separados por coma: mx, co, ar, cl, pe, uy" },
              { name: "salary_min", type: "number", required: false, desc: "Sueldo mínimo mensual en USD" },
              { name: "salary_max", type: "number", required: false, desc: "Sueldo máximo mensual en USD" },
              { name: "limit", type: "integer", required: false, desc: "1-100, default 20" },
              { name: "offset", type: "integer", required: false, desc: "Paginación, default 0" },
              { name: "posted_within", type: "integer", required: false, desc: "Días desde publicación, default 30" },
              { name: "remote", type: "boolean", required: false, desc: "Solo ofertas remotas" },
            ]}
          />
          <ResponseExample />
        </DocSection>

        <DocSection
          n="02"
          title="POST /v1/webhooks"
          desc="Suscribite a notificaciones cuando aparezcan nuevas ofertas que matcheen tu query."
        >
          <Endpoint method="POST" path="/v1/webhooks" />
          <CodeLang lang="json">
{`{
  "url": "https://your-app.com/webhook",
  "query": {
    "q": "senior python",
    "country": "mx,co"
  },
  "events": ["job.new", "job.removed"]
}`}
          </CodeLang>
        </DocSection>

        <DocSection
          n="03"
          title="GET /v1/stats"
          desc="Estadísticas públicas del índice. No requiere auth."
        >
          <Endpoint method="GET" path="/v1/stats" />
        </DocSection>

        <DocSection
          n="04"
          title="Autenticación"
          desc="Header con API key. Se emite al confirmar el early access."
        >
          <CodeLang lang="bash">
{`Authorization: Bearer YOUR_API_KEY`}
          </CodeLang>
        </DocSection>

        <DocSection
          n="05"
          title="Rate limits"
          desc="Por tier de plan. Reset el primer día de cada mes."
        >
          <ul className="text-sm space-y-1.5">
            <li className="flex gap-2"><span className="text-accent shrink-0">→</span><span><strong>Free:</strong> 500 calls/mes</span></li>
            <li className="flex gap-2"><span className="text-accent shrink-0">→</span><span><strong>Indie:</strong> 10,000 calls/mes</span></li>
            <li className="flex gap-2"><span className="text-accent shrink-0">→</span><span><strong>Scale:</strong> 100,000 calls/mes</span></li>
          </ul>
        </DocSection>

        <DocSection
          n="06"
          title="Ejemplos de código"
          desc="Copy-paste en JavaScript, Python, cURL o como tool de OpenAI/Anthropic."
        >
          <CodeLang lang="javascript">
{`const r = await fetch(
  "https://api.latam-jobs.dev/v1/search?q=python&country=mx,co",
  { headers: { Authorization: \`Bearer \${process.env.LATAM_JOBS_API_KEY}\` } }
);
const data = await r.json();
console.log(data.results);`}
          </CodeLang>
          <CodeLang lang="python">
{`import os, requests
r = requests.get(
    "https://api.latam-jobs.dev/v1/search",
    params={"q": "python", "country": "mx,co"},
    headers={"Authorization": f"Bearer {os.environ['LATAM_JOBS_API_KEY']}"},
    timeout=10,
)
r.raise_for_status()
for job in r.json()["results"]:
    print(job["title"], "-", job["company"])`}
          </CodeLang>
          <CodeLang lang="bash">
{`curl -G https://api.latam-jobs.dev/v1/search \\
  -H "Authorization: Bearer $LATAM_JOBS_API_KEY" \\
  --data-urlencode "q=senior python" \\
  --data-urlencode "country=mx,co,ar"`}
          </CodeLang>
        </DocSection>
      </section>
    </main>
  );
}

function DocSection({
  n,
  title,
  desc,
  children,
}: {
  n: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="text-xs text-muted">// {n}</div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted">{desc}</p>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 border border-border bg-card text-sm">
      <span className="px-2 py-0.5 rounded-none bg-accent/10 text-accent border border-accent/30 text-xs">
        {method}
      </span>
      <code className="text-foreground">{path}</code>
    </div>
  );
}

function ParamTable({
  rows,
}: {
  rows: Array<{ name: string; type: string; required: boolean; desc: string }>;
}) {
  return (
    <div className=" border border-border overflow-hidden text-xs">
      <table className="w-full">
        <thead className="bg-card-hover/40">
          <tr className="text-left">
            <th className="px-3 py-2 font-medium text-muted">name</th>
            <th className="px-3 py-2 font-medium text-muted">type</th>
            <th className="px-3 py-2 font-medium text-muted">required</th>
            <th className="px-3 py-2 font-medium text-muted">desc</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="px-3 py-2 text-accent font-medium">{r.name}</td>
              <td className="px-3 py-2 text-muted">{r.type}</td>
              <td className="px-3 py-2">
                {r.required ? (
                  <span className="text-warning">required</span>
                ) : (
                  <span className="text-muted">optional</span>
                )}
              </td>
              <td className="px-3 py-2 text-foreground">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeLang({ lang, children }: { lang: string; children: string }) {
  return (
    <div className=" border border-border bg-card overflow-hidden text-xs">
      <div className="px-3 py-1.5 bg-card-hover/40 text-muted text-[10px] uppercase tracking-wider border-b border-border">
        {lang}
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed">
        <code className="text-foreground">{children}</code>
      </pre>
    </div>
  );
}

function ResponseExample() {
  return (
    <CodeLang lang="json">
{`{
  "results": [
    {
      "id": "ct_abc123",
      "title": "Senior Backend Engineer (Python)",
      "company": "Mercado Libre",
      "location": "Ciudad de México, MX",
      "country_code": "mx",
      "remote": false,
      "seniority": "senior",
      "salary": {
        "min": 85000,
        "max": 130000,
        "currency": "MXN",
        "period": "monthly",
        "raw": "$85,000 - $130,000 MXN mensuales"
      },
      "posted_at": "2026-09-19T14:22:00Z",
      "sources": ["computrabajo"],
      "urls": {
        "computrabajo": "https://www.computrabajo.com.mx/..."
      },
      "hash": "sha256:abc123..."
    }
  ],
  "meta": {
    "total": 1247,
    "fetched_ms": 3120,
    "cached": false,
    "sources_queried": ["computrabajo", "bumeran", "occ"]
  }
}`}
    </CodeLang>
  );
}
