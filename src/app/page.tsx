import Link from "next/link";
import { SignupForm } from "@/components/landing/SignupForm";
import { SignupCounter } from "@/components/landing/SignupCounter";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { AsciiScramble } from "@/components/effects/AsciiScramble";
import { AsciiSweep } from "@/components/effects/AsciiSweep";
import { DecryptReveal } from "@/components/effects/DecryptReveal";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="font-mono">
        <Hero />
        <AsciiSweep height={64} />
        <PainSection />
        <DemoSection />
        <AsciiSweep height={48} />
        <FeaturesSection />
        <ArchitectureSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <svg viewBox="0 0 360 360" className="w-7 h-7" aria-hidden>
            <g fill="var(--dot)" opacity="0.5">
              <circle cx="110" cy="90" r="2"/>
              <circle cx="188" cy="135" r="2"/>
              <circle cx="178" cy="187" r="2"/>
              <circle cx="273" cy="223" r="2.5"/>
              <circle cx="198" cy="254" r="2"/>
              <circle cx="236" cy="257" r="2"/>
            </g>
            <g fill="var(--accent)">
              <circle cx="110" cy="90" r="4"/>
              <circle cx="188" cy="135" r="4"/>
              <circle cx="178" cy="187" r="4"/>
              <circle cx="273" cy="223" r="5"/>
              <circle cx="198" cy="254" r="4"/>
              <circle cx="236" cy="257" r="4"/>
            </g>
          </svg>
          <span className="font-semibold tracking-tight text-sm">
            latam-jobs<span className="text-accent">.api</span>
            <span className="text-muted ml-2 text-xs">v0.1</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="#demo" className="hover:text-accent transition-colors">/demo</a>
          <a href="#features" className="hover:text-accent transition-colors">/features</a>
          <a href="#pricing" className="hover:text-accent transition-colors">/pricing</a>
          <a href="#faq" className="hover:text-accent transition-colors">/faq</a>
          <Link href="/docs" className="hover:text-accent transition-colors">/docs</Link>
        </nav>
        <a
          href="#signup"
          className="px-4 py-1.5 border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-background transition-colors"
        >
          &gt; sumate
        </a>
      </div>
    </header>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(94,234,212,0.18), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,234,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card text-[11px] text-muted mb-8">
          <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
          <span className="text-accent">●</span>
          <span>validando_demanda // 30_signups_para_lanzar</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h1 className="text-[42px] sm:text-5xl lg:text-[68px] font-semibold tracking-tight leading-[0.92]">
              <span className="block text-foreground">
                <AsciiScramble text="Una API." duration={420} />
              </span>
              <span className="block text-foreground my-1">
                <AsciiScramble text="$ curl" duration={360} />
                <span className="text-accent">
                  <AsciiScramble text=" todas" duration={360} />
                </span>
                <span className="text-foreground">
                  <AsciiScramble text=" las bolsas" duration={420} />
                </span>
                <span className="text-accent">
                  <AsciiScramble text=" de LATAM." duration={520} />
                </span>
              </span>
            </h1>

            <p className="mt-7 text-base lg:text-lg text-muted max-w-xl leading-relaxed">
              <DecryptReveal duration={420} delay={100}>
                {`Computrabajo · Bumeran · OCC · ZonaJobs · Laborum. Una llamada.
Salario parseado a número. Ofertas deduplicadas. JSON limpio,
listo para integrar.`}
              </DecryptReveal>
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <a
                href="#demo"
                className="px-5 py-2.5 bg-accent text-background font-semibold hover:bg-accent-deep transition-colors text-sm"
              >
                $ probar_demo
              </a>
              <a
                href="/docs"
                className="px-5 py-2.5 border border-border text-foreground hover:border-accent hover:text-accent transition-colors text-sm"
              >
                /docs
              </a>
            </div>

            <div className="mt-7 max-w-md">
              <SignupCounter />
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  return (
    <div className="border border-border bg-card overflow-hidden text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card-hover/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-danger" />
          <span className="w-2.5 h-2.5 bg-warning" />
          <span className="w-2.5 h-2.5 bg-accent" />
        </div>
        <span className="text-[11px] text-muted">/v1/search</span>
      </div>
      <pre className="p-5 overflow-x-auto text-[12.5px] leading-relaxed">
        <code>
          <span className="text-muted">{"# request"}</span>{"\n"}
          <span className="text-accent-deep">{"GET"}</span>{" "}
          <span className="text-foreground">{"/v1/search?q=python&country=mx,co,ar"}</span>
          {"\n\n"}
          <span className="text-muted">{"# response"}</span>{"\n"}
          <span className="text-foreground">{"{"}</span>
          {"\n  "}<span className="text-accent">{"results"}</span><span className="text-foreground">{":"}</span>{" ["}
          {"\n    "}<span className="text-foreground">{"{"}</span>
          {"\n      "}<span className="text-accent">{"title"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-warning">{"\"Senior Python\""}</span><span className="text-foreground">{","}</span>
          {"\n      "}<span className="text-accent">{"company"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-warning">{"\"Mercado Libre\""}</span><span className="text-foreground">{","}</span>
          {"\n      "}<span className="text-accent">{"salary"}</span><span className="text-foreground">{":"}</span>{" "}
          <span className="text-foreground">{"{"}</span>{" "}
          <span className="text-accent">{"min"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-warning">{"85000"}</span><span className="text-foreground">{","}</span>{" "}
          <span className="text-accent">{"currency"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-warning">{"\"MXN\""}</span>{" "}
          <span className="text-foreground">{"}"}</span>
          {"\n      "}<span className="text-accent">{"sources"}</span><span className="text-foreground">{":"}</span>{" ["}
          <span className="text-warning">{"\"computrabajo\""}</span><span className="text-foreground">{","}</span>{" "}
          <span className="text-warning">{"\"bumeran\""}</span><span className="text-foreground">{"]"}</span>
          {"\n    "}<span className="text-foreground">{"}"}</span>
          {"\n  "}<span className="text-foreground">{"],"}</span>
          {"\n  "}<span className="text-accent">{"meta"}</span><span className="text-foreground">{":"}</span>{" "}
          <span className="text-foreground">{"{"}</span>{" "}
          <span className="text-accent">{"total"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-warning">{"1247"}</span>
          <span className="text-foreground">{" }"}</span>
          {"\n"}<span className="text-foreground">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}


function PainSection() {
  const pains = [
    { n: "01", title: "4 pestañas, 1 vacante", body: "Computrabajo, Bumeran, OCC, ZonaJobs. Abrís cada una, filtrás, copiás, pegás en un Excel. Tres veces por vacante." },
    { n: "02", title: "Sueldo en texto libre", body: "\"25,000 MXN mensuales\", \"a convenir\", \"$45K USD\". Imposible filtrar por rango. Imposible comparar entre países." },
    { n: "03", title: "Oferta duplicada", body: "Aparece en Computrabajo y Bumeran. El candidato ya aplicó. Vos no sabés. Email doble, primera impresión rota." },
    { n: "04", title: "Monitoring manual", body: "5 pestañas abiertas revisando cada 30 min. No escala más allá de 3 vacantes. Tu día se va en tareas mecánicas." },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="mb-10">
        <p className="text-[11px] text-accent uppercase tracking-wider mb-3">
          <DecryptReveal duration={350}>{"// 01 · el_problema"}</DecryptReveal>
        </p>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight max-w-2xl">
          <DecryptReveal duration={500} delay={100}>
            {"Si reclutás en LATAM, ya sabés cómo se siente esto."}
          </DecryptReveal>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pains.map((p) => (
          <article
            key={p.n}
            className="group border border-border bg-card p-5 hover:border-accent/40 transition-colors"
          >
            <div className="text-[11px] text-muted mb-3">{`// ${p.n}`}</div>
            <h3 className="text-[15px] font-semibold mb-2 group-hover:text-accent transition-colors">
              {p.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-4">
          <p className="text-[11px] text-accent uppercase tracking-wider">
            <DecryptReveal duration={350}>{"// 02 · demo_en_vivo"}</DecryptReveal>
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            <DecryptReveal duration={500}>{"Probalo ahora."}</DecryptReveal>
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            <DecryptReveal duration={600} delay={150}>
              {`Buscá por keyword y filtrá por país. Datos reales cuando estén
disponibles; mientras tanto, datos de muestra con el schema final.`}
            </DecryptReveal>
          </p>
          <ul className="text-xs text-muted space-y-2 pt-2">
            <li className="flex gap-2">
              <span className="text-accent shrink-0">{"→"}</span>
              <span>
                {`salario como `}<code className="text-accent">number</code>
                {`, no string`}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent shrink-0">{"→"}</span>
              <span>{"deduplicado por hash de oferta"}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent shrink-0">{"→"}</span>
              <span>{"moneda y período inferidos (monthly, yearly)"}</span>
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
    <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="mb-10">
        <p className="text-[11px] text-accent uppercase tracking-wider mb-3">
          <DecryptReveal duration={350}>{"// 03 · por_qué"}</DecryptReveal>
        </p>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight max-w-2xl">
          <DecryptReveal duration={500} delay={100}>
            {"Lo que esta API hace, en términos concretos."}
          </DecryptReveal>
        </h2>
      </div>
      {/* B-grid: 4 cards full row. Cada card media. Sin mezclar col-span. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <FeatureCard
          n="01"
          title="Un endpoint, 6 portales"
          body="Computrabajo (19 países), Bumeran, OCC Mundial, ZonaJobs, Laborum, El Empleo."
          visual={<PortalsVisual />}
        />
        <FeatureCard
          n="02"
          title="Salario parseado"
          body='"25,000 MXN" → { min: 25000, currency: "MXN" }. Listo para filtrar.'
          visual={<SalaryVisual />}
        />
        <FeatureCard
          n="03"
          title="Webhooks"
          body="Monitoreá keywords. Cuando aparece una oferta nueva, te llega un POST en JSON."
          visual={<WebhookVisual />}
        />
        <FeatureCard
          n="04"
          title="Dedup por hash"
          body="Misma oferta en Computrabajo y Bumeran = 1 fila con sources: [ambas]."
          visual={<DedupVisual />}
        />
      </div>
      {/* B-grid: MCP ancho completo (1 row de 4 + 1 row de 4 perfecto) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
        <FeatureCard
          n="05"
          title="MCP-ready"
          body="Tu agente Claude o GPT puede buscar vacantes como tool. Sin código custom."
          visual={<McpVisual />}
        />
        <FeatureCard
          n="06"
          title="Latency-bounded"
          body="P99 < 800ms con cache layer 30s TTL. Sin cold start en edge functions."
          visual={<LatencyVisual />}
        />
        <FeatureCard
          n="07"
          title="Multi-currency"
          body="MXN, COP, BRL, CLP, ARS, PEN, USD. Normalización por país y periodo."
          visual={<CurrencyVisual />}
        />
        <FeatureCard
          n="08"
          title="OpenAI function-calling"
          body="Endpoint expuesto como tool schema compatible con /v1/chat/completions."
          visual={<OpenAiVisual />}
        />
      </div>
    </section>
  );
}

function FeatureCard({
  n,
  title,
  body,
  visual,
}: {
  n: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}) {
  return (
    <article className="group border border-border bg-card p-5 hover:border-accent/40 transition-colors flex flex-col gap-3 h-full">
      <div className="text-[11px] text-muted">{`// ${n}`}</div>
      <h3 className="text-[15px] font-semibold tracking-tight group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-xs text-muted leading-relaxed flex-1">{body}</p>
      <div className="pt-2 mt-auto">{visual}</div>
    </article>
  );
}

function PortalsVisual() {
  const portals = ["computrabajo", "bumeran", "occ", "zonajobs", "laborum", "elempleo"];
  return (
    <div className="flex flex-wrap gap-1">
      {portals.map((p) => (
        <span
          key={p}
          className="px-1.5 py-0.5 border border-accent/30 bg-accent/5 text-accent text-[10px]"
        >
          {p}
        </span>
      ))}
    </div>
  );
}

function SalaryVisual() {
  return (
    <div className="text-[10px] bg-background border border-border p-2 space-y-0.5">
      <div className="text-muted">{"\"$25,000 MXN mensuales\""}</div>
      <div className="text-accent">{"↓"}</div>
      <div>
        <span className="text-accent">{"min"}</span>
        <span className="text-foreground">{":"}</span>
        <span className="text-warning">{" 25000"}</span>
      </div>
    </div>
  );
}

function WebhookVisual() {
  return (
    <div className="text-[10px] bg-background border border-border p-2 space-y-0.5">
      <div className="text-muted">{"POST /webhook"}</div>
      <div className="text-accent">{"↓"}</div>
      <div>
        <span className="text-accent">{"event"}</span>
        <span className="text-foreground">{":"}</span>
        <span className="text-warning">{" \"job.new\""}</span>
      </div>
    </div>
  );
}

function DedupVisual() {
  return (
    <div className="text-[10px] bg-background border border-border p-2 space-y-0.5">
      <div className="flex gap-1">
        <span className="px-1 border border-accent/30 text-accent">ct</span>
        <span className="px-1 border border-accent/30 text-accent">bm</span>
      </div>
      <div className="text-accent">{"↓"}</div>
      <div className="text-foreground">{"1 fila · sources: [2]"}</div>
    </div>
  );
}

function McpVisual() {
  return (
    <div className="text-[10px] bg-background border border-border p-2">
      <div className="text-muted mb-1">{"// mcp tool"}</div>
      <div>
        <span className="text-accent">{"name"}</span>
        <span className="text-foreground">{":"}</span>
        <span className="text-warning">{" \"search_jobs\""}</span>
      </div>
    </div>
  );
}

function LatencyVisual() {
  return (
    <div className="text-[10px] bg-background border border-border p-2">
      <div className="text-muted mb-1">{"// p99 latency"}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-border">
          <div className="h-full bg-accent" style={{ width: "62%" }} />
        </div>
        <span className="text-warning">{"680ms"}</span>
      </div>
    </div>
  );
}

function CurrencyVisual() {
  return (
    <div className="text-[10px] bg-background border border-border p-2 grid grid-cols-2 gap-x-2 gap-y-0.5">
      <div><span className="text-accent">{"MXN"}</span><span className="text-foreground">{" MX"}</span></div>
      <div><span className="text-accent">{"COP"}</span><span className="text-foreground">{" CO"}</span></div>
      <div><span className="text-accent">{"BRL"}</span><span className="text-foreground">{" BR"}</span></div>
      <div><span className="text-accent">{"ARS"}</span><span className="text-foreground">{" AR"}</span></div>
    </div>
  );
}

function OpenAiVisual() {
  return (
    <div className="text-[10px] bg-background border border-border p-2 space-y-0.5">
      <div className="text-muted">{"POST /chat/completions"}</div>
      <div>
        <span className="text-accent">{"tools"}</span>
        <span className="text-foreground">{":"}</span>
        <span className="text-warning">{" [search_jobs]"}</span>
      </div>
    </div>
  );
}


function ArchitectureSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-b border-border">
      <div className="mb-8">
        <p className="text-[11px] text-accent uppercase tracking-wider mb-3">
          <DecryptReveal duration={350}>{"// 04 · arquitectura"}</DecryptReveal>
        </p>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          <DecryptReveal duration={500} delay={100}>{"Cómo está construido."}</DecryptReveal>
        </h2>
      </div>
      <div className="border border-border bg-card p-6 lg:p-8">
        <pre className="text-xs leading-relaxed overflow-x-auto">
          <code>
            <span className="text-muted">{`┌─────────────────────────────────────────────────────────────────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│  CLIENT  (your app · ATS · AI agent · spreadsheet · cron)               │`}</span>
            {"\n"}<span className="text-muted">{`└─────────────────────────────────────────────────────────────────────────┘`}</span>
            {"\n"}<span className="text-muted">{"                              │"}</span>
            {"\n"}<span className="text-muted">{"                              ▼  GET /v1/search  ·  Authorization: ***"}</span>
            {"\n"}<span className="text-muted">{`┌─────────────────────────────────────────────────────────────────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│  EDGE  (Vercel Edge · 12 regions · 0 cold start)                       │`}</span>
            {"\n"}<span className="text-muted">{`│  · auth · rate limit · response shaping · cache (30s TTL)              │`}</span>
            {"\n"}<span className="text-muted">{`└─────────────────────────────────────────────────────────────────────────┘`}</span>
            {"\n"}<span className="text-muted">{"       │                       │                       │"}</span>
            {"\n"}<span className="text-muted">{"       ▼                       ▼                       ▼"}</span>
            {"\n"}<span className="text-muted">{`┌──────────────┐    ┌──────────────┐    ┌──────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│`}</span><span className="text-accent">{"  scraper/ct "}</span><span className="text-muted">{`│    │`}</span><span className="text-accent">{"  scraper/bm "}</span><span className="text-muted">{`│    │`}</span><span className="text-accent">{"  scraper/occ"}</span><span className="text-muted">{`│`}</span>
            {"\n"}<span className="text-muted">{`│ Playwright   │    │ HTTP fetch   │    │ HTTP fetch   │`}</span>
            {"\n"}<span className="text-muted">{`│ 19 países    │    │ AR · MX · CL │    │ MX           │`}</span>
            {"\n"}<span className="text-muted">{`└──────────────┘    └──────────────┘    └──────────────┘`}</span>
            {"\n"}<span className="text-muted">{"       └───────────┬──────────────────────────┬──────────┘"}</span>
            {"\n"}<span className="text-muted">{"                   ▼                          ▼"}</span>
            {"\n"}<span className="text-muted">{`┌─────────────────────────────────────────────────────────────────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│  POSTGRES (Neon)                                                        │`}</span>
            {"\n"}<span className="text-muted">{`│  · raw postings · dedup index · salary parser · keyword watchlist       │`}</span>
            {"\n"}<span className="text-muted">{`└─────────────────────────────────────────────────────────────────────────┘`}</span>
          </code>
        </pre>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "/siempre",
      desc: "Para probar la API y construir un primer demo.",
      cta: "$ empezar",
      features: ["500 calls/mes", "1 país", "Latencia estándar", "Sin webhooks"],
    },
    {
      name: "Indie",
      price: "$49",
      period: "/mes",
      desc: "Para recruiters y developers individuales.",
      cta: "$ probar_indie",
      features: [
        "10,000 calls/mes",
        "Todos los países",
        "Webhooks de cambios",
        "Soporte por email",
      ],
      highlighted: true,
      badge: "founding_price",
    },
    {
      name: "Scale",
      price: "$199",
      period: "/mes",
      desc: "Para agencias y HR-tech en producción.",
      cta: "$ probar_scale",
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
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="mb-12 max-w-2xl">
        <p className="text-[11px] text-accent uppercase tracking-wider mb-3">
          <DecryptReveal duration={350}>{"// 05 · pricing"}</DecryptReveal>
        </p>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">
          <DecryptReveal duration={500}>{"Pricing simple, en USD."}</DecryptReveal>
        </h2>
        <p className="text-sm text-muted">
          Sin contratos anuales, sin setup fees. Cancelás cuando quieras. El precio founding queda bloqueado para early adopters.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`p-6 flex flex-col gap-5 relative ${
              t.highlighted
                ? "border-2 border-accent bg-card"
                : "border border-border bg-card"
            }`}
          >
            {t.badge && (
              <span className="absolute -top-3 left-6 px-3 py-0.5 bg-accent text-background text-[10px] font-semibold tracking-wider">
                {t.badge}
              </span>
            )}
            <div>
              <div className="text-[11px] text-muted uppercase tracking-wider mb-2">
                {t.name}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
                <span className="text-muted text-xs">{t.period}</span>
              </div>
              <p className="text-xs text-muted mt-3">{t.desc}</p>
            </div>
            <ul className="space-y-2 text-xs flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 text-foreground">
                  <span className="text-accent shrink-0">{"+"}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#signup"
              className={`px-4 py-2 text-xs font-semibold text-center transition-colors ${
                t.highlighted
                  ? "bg-accent text-background hover:bg-accent-deep"
                  : "border border-border text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {t.cta}
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
      a: "Hash sobre (título normalizado + empresa + ciudad + país). Si dos portales cargan la misma oferta, recibís una fila con el array sources indicando de dónde vino.",
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
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20 border-b border-border">
      <p className="text-[11px] text-accent uppercase tracking-wider mb-3">
        <DecryptReveal duration={350}>{"// 06 · faq"}</DecryptReveal>
      </p>
      <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-10">
        <DecryptReveal duration={500}>{"Preguntas reales de recruiters LATAM."}</DecryptReveal>
      </h2>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((f, i) => (
          <details key={f.q} className="group py-5 cursor-pointer" open={i === 0}>
            <summary className="flex items-start justify-between gap-4 list-none">
              <span className="text-sm font-medium pr-4">
                <span className="text-muted mr-2">{String(i + 1).padStart(2, "0")}.</span>
                {f.q}
              </span>
              <span className="text-accent text-lg shrink-0 transition-transform group-open:rotate-45">
                {"+"}
              </span>
            </summary>
            <p className="text-xs text-muted leading-relaxed mt-3 pr-10">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="signup" className="max-w-3xl mx-auto px-6 py-20">
      <div className="border border-accent/30 bg-card p-8 lg:p-12 text-center">
        <p className="text-[11px] text-accent uppercase tracking-wider mb-4">
          <DecryptReveal duration={350}>{"// 07 · call_to_action"}</DecryptReveal>
        </p>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">
          <DecryptReveal duration={500}>{"Sumate a los 30 que validan esto."}</DecryptReveal>
        </h2>
        <p className="text-xs text-muted mb-8 max-w-md mx-auto">
          Si llegamos a 30 recruiters o HR-tech builders en 48h, abrimos el acceso. Precio founding de por vida.
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
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-accent/40 bg-accent/10 flex items-center justify-center text-accent text-[10px]">
            ▌
          </div>
          <span>
            latam-jobs<span className="text-accent">.api</span> · building in Bogotá 🇨🇴
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="hover:text-accent">/docs</Link>
          <Link href="/recruiters" className="hover:text-accent">/recruiters</Link>
          <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            /llms.txt
          </a>
          <a
            href="https://github.com/jseramn/latam-jobs-api"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            /github
          </a>
        </div>
      </div>
    </footer>
  );
}
