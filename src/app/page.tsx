import Link from "next/link";
import { SignupForm } from "@/components/landing/SignupForm";
import { SignupCounter } from "@/components/landing/SignupCounter";
import { LiveDemo } from "@/components/landing/LiveDemo";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <PainSection />
        <SectionDivider label="Demo en vivo" />
        <DemoSection />
        <SectionDivider label="Por qué" />
        <FeaturesSection />
        <SectionDivider label="Pricing" />
        <PricingSection />
        <SectionDivider label="FAQ" />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-background font-bold text-sm">
            L
          </div>
          <span className="font-semibold tracking-tight">
            LatamJobs<span className="text-accent">.api</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="#demo" className="hover:text-foreground transition-colors">
            Demo
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </a>
          <Link
            href="/docs"
            className="hover:text-foreground transition-colors"
          >
            Docs
          </Link>
        </nav>
        <a
          href="#signup"
          className="px-4 py-2 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent-deep transition-colors"
        >
          Sumate
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(94,234,212,0.08),transparent_50%)]" />
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Validando demanda · 30 signups para lanzar
            </div>
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Una API.
              <br />
              Todas las bolsas de{" "}
              <span className="text-accent">trabajo de LATAM.</span>
            </h1>
            <p className="text-lg text-muted max-w-xl leading-relaxed">
              Computrabajo, Bumeran, OCC, ZonaJobs y Laborum en una sola
              llamada. Salario parseado a número y moneda. Ofertas
              deduplicadas. JSON limpio, listo para integrar.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#demo"
                className="px-5 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent-deep transition-colors"
              >
                Probar la demo
              </a>
              <a
                href="/docs"
                className="px-5 py-3 rounded-lg border border-border text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                Ver docs
              </a>
            </div>
            <div className="pt-4 max-w-md">
              <SignupCounter />
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card-hover/40">
        <span className="w-2.5 h-2.5 rounded-full bg-danger" />
        <span className="w-2.5 h-2.5 rounded-full bg-warning" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
        <span className="ml-2 text-xs text-muted">GET /v1/search</span>
      </div>
      <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed">
        <code>
          <span className="text-muted">{`// Request`}</span>
          {"\n"}
          <span className="text-accent-deep">curl</span>{" "}
          <span className="text-foreground">https://api.latam-jobs.dev/v1/search</span>
          {"\n"}
          <span className="text-muted">{"  ?q=desarrollador+python"}</span>
          {"\n"}
          <span className="text-muted">{"  &country=mx,co,ar"}</span>
          {"\n\n"}
          <span className="text-muted">{`// Response 200 OK`}</span>
          {"\n"}
          {"{"}
          {"\n  "}
          <span className="text-accent">"results"</span>: [
          {"\n    "}
          {"{"}
          {"\n      "}
          <span className="text-accent">"title"</span>:{" "}
          <span className="text-foreground">&quot;Backend Dev Python&quot;</span>,
          {"\n      "}
          <span className="text-accent">"company"</span>:{" "}
          <span className="text-foreground">&quot;Mercado Libre&quot;</span>,
          {"\n      "}
          <span className="text-accent">"salary"</span>:{" "}
          {"{"}{" "}
          <span className="text-accent">&quot;min&quot;</span>:{" "}
          <span className="text-warning">45000</span>,{" "}
          <span className="text-accent">&quot;max&quot;</span>:{" "}
          <span className="text-warning">70000</span>,{" "}
          <span className="text-accent">&quot;currency&quot;</span>:{" "}
          <span className="text-foreground">&quot;MXN&quot;</span>{" "}
          {"}"},
          {"\n      "}
          <span className="text-accent">"sources&quot;</span>: [
          <span className="text-foreground">&quot;computrabajo&quot;</span>,{" "}
          <span className="text-foreground">&quot;bumeran&quot;</span>]
          {"\n    "}
          {"}"}
          {"\n  "}
          ],
          {"\n  "}
          <span className="text-accent">&quot;meta&quot;</span>:{" "}
          {"{"}{" "}
          <span className="text-accent">&quot;total&quot;</span>:{" "}
          <span className="text-warning">1247</span>,{" "}
          <span className="text-accent">&quot;fetched_ms&quot;</span>:{" "}
          <span className="text-warning">3120</span>{" "}
          {"}"}
          {"\n"}
          {"}"}
        </code>
      </pre>
    </div>
  );
}

function PainSection() {
  const pains = [
    {
      title: "4 pestañas, 1 vacante",
      body: "Computrabajo, Bumeran, OCC, ZonaJobs. Abrís cada una, filtrás, copiás, pegás en un Excel. Tres veces por vacante.",
    },
    {
      title: "Sueldo en texto libre",
      body: '"25,000 MXN mensuales", "a convenir", "$45K USD". Imposible filtrar por rango. Imposible comparar entre países.',
    },
    {
      title: "La misma oferta duplicada",
      body: "Aparece en Computrabajo y en Bumeran. El candidato ya aplicó. Vos no sabés. Email doble, primera impresión rota.",
    },
    {
      title: "Monitoring manual",
      body: "Dejar 5 ventanas abiertas en el navegador revisando cada 30 min si salió algo nuevo. No escala más allá de 3 vacantes.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12">
        <p className="text-sm text-accent font-mono uppercase tracking-wider mb-2">
          El problema
        </p>
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight max-w-2xl">
          Si reclutás en LATAM, ya sabés cómo se siente esto.
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pains.map((p, i) => (
          <article
            key={p.title}
            className="rounded-xl border border-border bg-card p-5 hover:border-accent/40 transition-colors"
          >
            <div className="text-xs font-mono text-muted mb-3">
              0{i + 1}
            </div>
            <h3 className="text-base font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-mono uppercase tracking-wider text-muted">
          {label}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            Probalo ahora.
          </h2>
          <p className="text-muted leading-relaxed">
            Buscá por keyword y filtrá por país. Los datos reales están
            llegando; mientras tanto, datos de muestra con el schema final.
          </p>
          <ul className="text-sm text-muted space-y-2 pt-2">
            <li className="flex gap-2">
              <span className="text-accent shrink-0">→</span>
              Salario como{" "}
              <code className="text-accent font-mono text-xs">
                number
              </code>
              , no como string.
            </li>
            <li className="flex gap-2">
              <span className="text-accent shrink-0">→</span>
              Deduplicado por hash de oferta.
            </li>
            <li className="flex gap-2">
              <span className="text-accent shrink-0">→</span>
              Moneda y período inferidos (mensual, anual).
            </li>
          </ul>
        </div>
        <div className="lg:col-span-8">
          <LiveDemo />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-12 gap-6">
        <FeatureCard
          size="large"
          kicker="01"
          title="Un endpoint, 6 portales"
          body="Computrabajo (19 países), Bumeran, OCC Mundial, ZonaJobs, Laborum, El Empleo. Una llamada, un JSON consistente, sin schemas que cambian cada semana."
          visual={<PortalsVisual />}
        />
        <FeatureCard
          size="medium"
          kicker="02"
          title="Salario parseado"
          body='"$25,000 - $35,000 MXN mensuales" → {min: 25000, max: 35000, currency: "MXN", period: "monthly"}. Listo para filtrar, ordenar, graficar.'
          visual={<SalaryVisual />}
        />
        <FeatureCard
          size="medium"
          kicker="03"
          title="Webhooks de cambios"
          body="Monitoreá keywords. Cuando aparece una oferta nueva, te llega un POST en JSON al instante. Como un Slack alert, pero integrable."
          visual={<WebhookVisual />}
        />
        <FeatureCard
          size="medium"
          kicker="04"
          title="Dedup por hash"
          body="Si Computrabajo y Bumeran cargan la misma oferta, recibís una fila con sources: [computrabajo, bumeran]. Tu ATS no se duplica."
          visual={<DedupVisual />}
        />
        <FeatureCard
          size="medium"
          kicker="05"
          title="API compatible MCP"
          body="Endpoint OpenAI function-calling ready. Tu agente Claude / GPT puede buscar vacantes como tool. Listo para workflows agénticos."
          visual={<McpVisual />}
        />
      </div>
    </section>
  );
}

function FeatureCard({
  size,
  kicker,
  title,
  body,
  visual,
}: {
  size: "large" | "medium";
  kicker: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}) {
  const colSpan =
    size === "large" ? "lg:col-span-6" : "lg:col-span-3";
  return (
    <article
      className={`${colSpan} rounded-xl border border-border bg-card p-6 hover:border-accent/40 transition-colors flex flex-col gap-4`}
    >
      <div className="text-xs font-mono text-muted">{kicker}</div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
      <div className="mt-auto pt-4">{visual}</div>
    </article>
  );
}

function PortalsVisual() {
  const portals = [
    "computrabajo",
    "bumeran",
    "occ",
    "zonajobs",
    "laborum",
    "elempleo",
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {portals.map((p, i) => (
        <span
          key={p}
          className="px-2.5 py-1 rounded-md bg-accent/10 text-accent font-mono text-xs"
          style={{ opacity: 1 - i * 0.05 }}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

function SalaryVisual() {
  return (
    <div className="font-mono text-xs space-y-1.5 bg-background/50 rounded-lg p-3 border border-border">
      <div className="text-muted">
        "25,000 - 35,000 MXN mensuales"
      </div>
      <div className="text-accent">↓</div>
      <div className="text-foreground">
        {"{"} min:{" "}
        <span className="text-warning">25000</span>, max:{" "}
        <span className="text-warning">35000</span>, currency:{" "}
        <span className="text-accent">&quot;MXN&quot;</span> {"}"}
      </div>
    </div>
  );
}

function WebhookVisual() {
  return (
    <div className="font-mono text-xs bg-background/50 rounded-lg p-3 border border-border space-y-1">
      <div className="text-muted">POST tu-endpoint.com/hook</div>
      <div className="text-accent">↓</div>
      <div className="text-foreground">
        {"{"} <span className="text-accent">event</span>:{" "}
        <span className="text-warning">&quot;job.new&quot;</span>,{" "}
        <span className="text-accent">title</span>:{" "}
        <span className="text-foreground">&quot;Senior Python&quot;</span> {"}"}
      </div>
    </div>
  );
}

function DedupVisual() {
  return (
    <div className="font-mono text-xs bg-background/50 rounded-lg p-3 border border-border space-y-1">
      <div className="text-muted">2 portales · misma oferta</div>
      <div className="flex gap-1.5 pt-1">
        <span className="px-2 py-0.5 rounded bg-accent/10 text-accent">
          computrabajo
        </span>
        <span className="px-2 py-0.5 rounded bg-accent/10 text-accent">
          bumeran
        </span>
      </div>
      <div className="text-accent pt-1">↓</div>
      <div className="text-foreground">1 fila, sources: [ambas]</div>
    </div>
  );
}

function McpVisual() {
  return (
    <div className="font-mono text-xs bg-background/50 rounded-lg p-3 border border-border space-y-1">
      <div className="text-muted">// OpenAI tool schema</div>
      <div className="text-foreground">
        {"{"} <span className="text-accent">name</span>:{" "}
        <span className="text-warning">&quot;search_jobs&quot;</span>,
        <br />
        {"  "}
        <span className="text-accent">params</span>:{" "}
        <span className="text-muted">{"{ query: string }"}</span> {"}"}
      </div>
    </div>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "siempre",
      description: "Para probar la API y construir un primer demo.",
      cta: "Empezar gratis",
      features: [
        "500 calls/mes",
        "1 país",
        "Latencia estándar",
        "Sin webhooks",
      ],
    },
    {
      name: "Indie",
      price: "$49",
      period: "/mes",
      description: "Para recruiters y developers individuales.",
      cta: "Probar Indie",
      features: [
        "10,000 calls/mes",
        "Todos los países",
        "Webhooks de cambios",
        "Soporte por email",
      ],
      highlighted: true,
      badge: "Founding price",
    },
    {
      name: "Scale",
      price: "$199",
      period: "/mes",
      description: "Para agencias y HR-tech en producción.",
      cta: "Probar Scale",
      features: [
        "100,000 calls/mes",
        "Webhooks + polling",
        "Dedup + salary normalization",
        "Soporte prioritario",
        "99.5% SLA",
      ],
    },
  ];

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
          Pricing simple, en USD.
        </h2>
        <p className="text-muted">
          Sin contratos anuales, sin setup fees. Cancelás cuando quieras. Los
          early adopters锁定 el precio founding de por vida.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl p-6 flex flex-col gap-5 ${
              tier.highlighted
                ? "border-2 border-accent bg-card relative"
                : "border border-border bg-card"
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-background text-xs font-semibold">
                {tier.badge}
              </span>
            )}
            <div>
              <div className="text-sm text-muted font-mono uppercase tracking-wider mb-2">
                {tier.name}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-muted text-sm">{tier.period}</span>
              </div>
              <p className="text-sm text-muted mt-3">{tier.description}</p>
            </div>

            <ul className="space-y-2 text-sm flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2 text-foreground">
                  <span className="text-accent shrink-0">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#signup"
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-colors ${
                tier.highlighted
                  ? "bg-accent text-background hover:bg-accent-deep"
                  : "border border-border text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "¿De dónde sale la data?",
      a: "Scraping de los portales públicos (Computrabajo, Bumeran, OCC, ZonaJobs, Laborum, El Empleo). Cuando un portal expone una API oficial, la usamos. No vendemos datos de candidatos, solo ofertas.",
    },
    {
      q: "¿Con qué frecuencia se actualiza?",
      a: "Cada portal se scrapea cada 15–30 minutos. Los endpoints de búsqueda reflejan el último snapshot. Los webhooks disparan cuando aparece una oferta nueva en tus keywords.",
    },
    {
      q: "¿Cómo es la deduplicación?",
      a: "Hash sobre (título normalizado + empresa + ciudad + país). Si dos portales cargan la misma oferta, recibís una fila con el array `sources` indicando de dónde vino.",
    },
    {
      q: "¿Puedo cancelar cuando quiera?",
      a: "Sí. Sin contratos anuales, sin setup fees. El precio founding ($49/mes en Indie) se mantiene mientras tu suscripción esté activa.",
    },
    {
      q: "¿Y si un portal cambia su HTML?",
      a: "El scraper se rompe y nosotros nos enteramos por el monitoring. El fix típico toma 1–4 horas y se deploya sin action de tu parte.",
    },
  ];

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-10">
        Preguntas reales de recruiters LATAM.
      </h2>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group py-5 cursor-pointer"
          >
            <summary className="flex items-start justify-between gap-4 list-none">
              <span className="text-base font-medium pr-4">{f.q}</span>
              <span className="text-muted text-xl shrink-0 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="text-sm text-muted leading-relaxed mt-3 pr-10">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="signup" className="max-w-3xl mx-auto px-6 py-20">
      <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-card to-card-hover p-8 lg:p-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
          Sumate a los 30 que validan esto.
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Si llegamos a 30 recruiters o HR-tech builders en 48h, abrimos el
          acceso. Precio founding de por vida.
        </p>
        <div className="max-w-sm mx-auto">
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-accent flex items-center justify-center text-background font-bold text-xs">
            L
          </div>
          <span>
            LatamJobs<span className="text-accent">.api</span> · construyendo en
            Bogotá 🇨🇴
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <Link href="/recruiters" className="hover:text-foreground">
            Para recruiters
          </Link>
          <a
            href="https://github.com/jseramn/latam-jobs-api"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
