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
      <main>
        <Hero />
        <AsciiSweep height={80} />
        <PainSection />
        <DemoSection />
        <AsciiSweep height={40} speed={28} />
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
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md border border-accent/40 bg-accent/10 flex items-center justify-center text-accent font-bold text-sm font-mono group-hover:bg-accent/20 transition-colors">
            ▌
          </div>
          <span className="font-semibold tracking-tight font-mono text-sm">
            latam-jobs<span className="text-accent">.api</span>
            <span className="text-muted ml-2 text-xs">v0.1</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted font-mono">
          <a href="#demo" className="hover:text-accent transition-colors">demo</a>
          <a href="#pricing" className="hover:text-accent transition-colors">pricing</a>
          <a href="#faq" className="hover:text-accent transition-colors">faq</a>
          <Link href="/docs" className="hover:text-accent transition-colors">docs</Link>
          <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">llms.txt</a>
        </nav>
        <a
          href="#signup"
          className="px-4 py-2 rounded-md border border-accent text-accent text-sm font-mono font-medium hover:bg-accent hover:text-background transition-colors"
        >
          &gt; sumate
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(94,234,212,0.25), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,234,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-xs text-muted font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-accent">●</span>
              <span>validando_demanda // 30_signups_para_lanzar</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[0.95] font-mono">
              <span className="block">
                <AsciiScramble text="Una API." duration={1400} className="text-foreground" />
              </span>
              <span className="block text-muted text-3xl lg:text-4xl my-2">
                <AsciiScramble text="$ curl" duration={900} className="text-muted" />
              </span>
              <span className="block text-accent">
                <AsciiScramble text="todas las bolsas de LATAM." duration={2000} />
              </span>
            </h1>

            <p className="text-base lg:text-lg text-muted max-w-xl leading-relaxed font-mono">
              <DecryptReveal duration={1800} delay={1200}>
                {`> Computrabajo · Bumeran · OCC · ZonaJobs · Laborum. Una llamada.
Salario parseado a número. Ofertas deduplicadas. JSON limpio,
listo para integrar.`}
              </DecryptReveal>
            </p>

            <div className="flex flex-wrap gap-3 pt-3 font-mono">
              <a
                href="#demo"
                className="px-5 py-2.5 rounded-md bg-accent text-background font-semibold hover:bg-accent-deep transition-colors text-sm"
              >
                $ probar_demo
              </a>
              <a
                href="/docs"
                className="px-5 py-2.5 rounded-md border border-border text-foreground hover:border-accent hover:text-accent transition-colors text-sm"
              >
                /docs
              </a>
            </div>

            <div className="pt-4 max-w-md font-mono">
              <SignupCounter />
            </div>
          </div>

          <div className="lg:col-span-5">
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card-hover/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-danger" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
        </div>
        <span className="text-xs text-muted">/v1/search</span>
      </div>
      <pre className="p-5 overflow-x-auto text-[12.5px] leading-relaxed">
        <code>
          <span className="text-muted"># request</span>{"\n"}
          <span className="text-accent-deep">GET</span>{" "}
          <span className="text-foreground">/v1/search?q=python&amp;country=mx,co,ar</span>
          {"\n\n"}
          <span className="text-muted"># response</span>{"\n"}
          <span className="text-foreground">{"{"}</span>
          {"\n  "}<span className="text-accent">&quot;results&quot;</span><span className="text-foreground">: [</span>
          {"\n    "}<span className="text-foreground">{"{"}</span>
          {"\n      "}<span className="text-accent">&quot;title&quot;</span><span className="text-foreground">: </span><span className="text-warning">&quot;Backend Dev Python&quot;</span><span className="text-foreground">,</span>
          {"\n      "}<span className="text-accent">&quot;company&quot;</span><span className="text-foreground">: </span><span className="text-warning">&quot;Mercado Libre&quot;</span><span className="text-foreground">,</span>
          {"\n      "}<span className="text-accent">&quot;salary&quot;</span><span className="text-foreground">: </span>
          <span className="text-foreground">{"{"}</span>{" "}
          <span className="text-accent">&quot;min&quot;</span><span className="text-foreground">: </span><span className="text-warning">45000</span><span className="text-foreground">, </span>
          <span className="text-accent">&quot;max&quot;</span><span className="text-foreground">: </span><span className="text-warning">70000</span><span className="text-foreground">, </span>
          <span className="text-accent">&quot;currency&quot;</span><span className="text-foreground">: </span><span className="text-warning">&quot;MXN&quot;</span>{" "}
          <span className="text-foreground">{"}"}</span><span className="text-foreground">,</span>
          {"\n      "}<span className="text-accent">&quot;sources&quot;</span><span className="text-foreground">: [</span>
          <span className="text-warning">&quot;computrabajo&quot;</span><span className="text-foreground">, </span>
          <span className="text-warning">&quot;bumeran&quot;</span><span className="text-foreground">]</span>
          {"\n    "}<span className="text-foreground">{"}"}</span>
          {"\n  "}<span className="text-foreground">],</span>
          {"\n  "}<span className="text-accent">&quot;meta&quot;</span><span className="text-foreground">: </span>
          <span className="text-foreground">{"{"}</span>{" "}
          <span className="text-accent">&quot;total&quot;</span><span className="text-foreground">: </span><span className="text-warning">1247</span><span className="text-foreground">, </span>
          <span className="text-accent">&quot;ms&quot;</span><span className="text-foreground">: </span><span className="text-warning">3120</span>{" "}
          <span className="text-foreground">{"}"}</span>
          {"\n"}<span className="text-foreground">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}

function PainSection() {
  const pains = [
    { n: "01", title: "4 pestañas, 1 vacante", body: "Computrabajo, Bumeran, OCC, ZonaJobs. Abrís cada una, filtrás, copiás, pegás en un Excel. Tres veces por vacante." },
    { n: "02", title: "Sueldo en texto libre", body: '"25,000 MXN mensuales", "a convenir", "$45K USD". Imposible filtrar por rango. Imposible comparar entre países.' },
    { n: "03", title: "Oferta duplicada", body: "Aparece en Computrabajo y Bumeran. El candidato ya aplicó. Vos no sabés. Email doble, primera impresión rota." },
    { n: "04", title: "Monitoring manual", body: "5 pestañas abiertas revisando cada 30 min. No escala más allá de 3 vacantes. Tu día se va en tareas mecánicas." },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12 font-mono">
        <p className="text-xs text-accent uppercase tracking-wider mb-3">
          <DecryptReveal>// 01 · el_problema</DecryptReveal>
        </p>
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight max-w-2xl font-mono">
          <DecryptReveal duration={1500}>Si reclutás en LATAM, ya sabés cómo se siente esto.</DecryptReveal>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pains.map((p) => (
          <article key={p.title} className="group rounded-lg border border-border bg-card p-5 hover:border-accent/40 transition-colors font-mono">
            <div className="text-xs text-muted mb-3">{p.n}</div>
            <h3 className="text-base font-semibold mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-4 font-mono">
          <p className="text-xs text-accent uppercase tracking-wider">// 02 · demo_en_vivo</p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            <DecryptReveal duration={1500}>Probalo ahora.</DecryptReveal>
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            <DecryptReveal duration={1800} delay={300}>
              Buscá por keyword y filtrá por país. Datos reales cuando estén
              disponibles; mientras tanto, datos de muestra con el schema final.
            </DecryptReveal>
          </p>
          <ul className="text-xs text-muted space-y-2 pt-2">
            <li className="flex gap-2">
              <span className="text-accent shrink-0">→</span>
              <span>salario como <code className="text-accent font-mono">number</code>, no string</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent shrink-0">→</span>
              <span>deduplicado por hash de oferta</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent shrink-0">→</span>
              <span>moneda y período inferidos (monthly, yearly)</span>
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
      <div className="mb-12 font-mono">
        <p className="text-xs text-accent uppercase tracking-wider mb-3">// 03 · por_qué</p>
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight max-w-2xl">
          <DecryptReveal duration={1500}>Lo que esta API hace, en términos concretos.</DecryptReveal>
        </h2>
      </div>
      <div className="grid lg:grid-cols-12 gap-3 font-mono">
        <FeatureCard size="large" kicker="01" title="Un endpoint, 6 portales" body="Computrabajo (19 países), Bumeran, OCC Mundial, ZonaJobs, Laborum, El Empleo. Una llamada, un JSON consistente, sin schemas que cambian cada semana." visual={<PortalsVisual />} />
        <FeatureCard size="medium" kicker="02" title="Salario parseado" body='"$25,000 - $35,000 MXN mensuales" → {min: 25000, max: 35000, currency: "MXN", period: "monthly"}. Listo para filtrar, ordenar, graficar.' visual={<SalaryVisual />} />
        <FeatureCard size="medium" kicker="03" title="Webhooks de cambios" body="Monitoreá keywords. Cuando aparece una oferta nueva, te llega un POST en JSON al instante. Como un Slack alert, pero integrable." visual={<WebhookVisual />} />
        <FeatureCard size="medium" kicker="04" title="Dedup por hash" body="Si Computrabajo y Bumeran cargan la misma oferta, recibís una fila con sources: [computrabajo, bumeran]. Tu ATS no se duplica." visual={<DedupVisual />} />
        <FeatureCard size="medium" kicker="05" title="MCP-ready" body="Endpoint OpenAI function-calling ready. Tu agente Claude / GPT puede buscar vacantes como tool. Workflows agénticos sin código custom." visual={<McpVisual />} />
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 font-mono">
      <div className="mb-8">
        <p className="text-xs text-accent uppercase tracking-wider mb-3">// 04 · arquitectura</p>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          <DecryptReveal>Cómo está construido.</DecryptReveal>
        </h2>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
        <pre className="text-xs leading-relaxed overflow-x-auto">
          <code>
            <span className="text-muted">{`┌─────────────────────────────────────────────────────────────────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│  CLIENT (your app · ATS · AI agent · spreadsheet · cron)                │`}</span>
            {"\n"}<span className="text-muted">{`└─────────────────────────────────────────────────────────────────────────┘`}</span>
            {"\n"}<span className="text-muted">{"                              │"}</span>
            {"\n"}<span className="text-muted">{"                              ▼  GET /v1/search · Authorization: Bearer"}</span>
            {"\n"}<span className="text-muted">{`┌─────────────────────────────────────────────────────────────────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│  EDGE  (Vercel Edge Functions · 12 regions · 0 cold start)             │`}</span>
            {"\n"}<span className="text-muted">{`│  · auth · rate limit · response shaping · cache layer (30s TTL)        │`}</span>
            {"\n"}<span className="text-muted">{`└─────────────────────────────────────────────────────────────────────────┘`}</span>
            {"\n"}<span className="text-muted">{"              │                          │                          │"}</span>
            {"\n"}<span className="text-muted">{"              ▼                          ▼                          ▼"}</span>
            {"\n"}<span className="text-muted">{`┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│`}</span><span className="text-accent">{"  scraper/ct   "}</span><span className="text-muted">{`│    │`}</span><span className="text-accent">{"  scraper/bm   "}</span><span className="text-muted">{`│    │`}</span><span className="text-accent">{"  scraper/occ   "}</span><span className="text-muted">{`│`}</span>
            {"\n"}<span className="text-muted">{`│ Playwright · cron  │    │  HTTP fetch · cron  │    │  HTTP fetch · cron  │`}</span>
            {"\n"}<span className="text-muted">{`│ 19 países          │    │  AR · MX · CL       │    │  MX                 │`}</span>
            {"\n"}<span className="text-muted">{`└────────────────────┘    └────────────────────┘    └────────────────────┘`}</span>
            {"\n"}<span className="text-muted">{"              │                          │                          │"}</span>
            {"\n"}<span className="text-muted">{"              └────────────┬─────────────┴────────────┬─────────────┘"}</span>
            {"\n"}<span className="text-muted">{"                           ▼                          ▼"}</span>
            {"\n"}<span className="text-muted">{`┌─────────────────────────────────────────────────────────────────────────┐`}</span>
            {"\n"}<span className="text-muted">{`│  POSTGRES (Neon)                                                         │`}</span>
            {"\n"}<span className="text-muted">{`│  · raw postings · dedup index · salary parser · keyword watchlist       │`}</span>
            {"\n"}<span className="text-muted">{`└─────────────────────────────────────────────────────────────────────────┘`}</span>
          </code>
        </pre>
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
  const colSpan = size === "large" ? "lg:col-span-6" : "lg:col-span-3";
  return (
    <article className={`${colSpan} rounded-lg border border-border bg-card p-5 hover:border-accent/40 transition-colors flex flex-col gap-3`}>
      <div className="text-xs text-muted">// {kicker}</div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="text-xs text-muted leading-relaxed">{body}</p>
      <div className="mt-auto pt-2">{visual}</div>
    </article>
  );
}

function PortalsVisual() {
  const portals = ["computrabajo", "bumeran", "occ", "zonajobs", "laborum", "elempleo"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {portals.map((p) => (
        <span key={p} className="px-2 py-0.5 rounded border border-accent/30 bg-accent/5 text-accent text-[11px]">{p}</span>
      ))}
    </div>
  );
}

function SalaryVisual() {
  return (
    <div className="text-[11px] space-y-1 bg-background/50 rounded-md p-3 border border-border">
      <div className="text-muted">&quot;25,000 - 35,000 MXN mensuales&quot;</div>
      <div className="text-accent">↓ parse</div>
      <div>
        <span className="text-foreground">{"{"} </span>
        <span className="text-accent">min</span>: <span className="text-warning">25000</span>,{" "}
        <span className="text-accent">max</span>: <span className="text-warning">35000</span>,{" "}
        <span className="text-accent">currency</span>: <span className="text-warning">&quot;MXN&quot;</span>{" "}
        <span className="text-foreground">{"}"}</span>
      </div>
    </div>
  );
}

function WebhookVisual() {
  return (
    <div className="text-[11px] bg-background/50 rounded-md p-3 border border-border space-y-1">
      <div className="text-muted">POST tu-endpoint/hook</div>
      <div className="text-accent">↓ webhook</div>
      <div>
        <span className="text-foreground">{"{"} </span>
        <span className="text-accent">event</span>: <span className="text-warning">&quot;job.new&quot;</span>,{" "}
        <span className="text-accent">title</span>: <span className="text-warning">&quot;Senior Python&quot;</span>{" "}
        <span className="text-foreground">{"}"}</span>
      </div>
    </div>
  );
}

function DedupVisual() {
  return (
    <div className="text-[11px] bg-background/50 rounded-md p-3 border border-border space-y-1">
      <div className="text-muted">2 portales · misma oferta</div>
      <div className="flex gap-1.5 pt-1">
        <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/30">computrabajo</span>
        <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/30">bumeran</span>
      </div>
      <div className="text-accent pt-1">↓ dedup</div>
      <div className="text-foreground">1 fila · sources: [ambas]</div>
    </div>
  );
}

function McpVisual() {
  return (
    <div className="text-[11px] bg-background/50 rounded-md p-3 border border-border space-y-1">
      <div className="text-muted">// openai tool schema</div>
      <div>
        <span className="text-foreground">{"{"} </span>
        <span className="text-accent">name</span>: <span className="text-warning">&quot;search_jobs&quot;</span>
      </div>
      <div>
        {"  "}
        <span className="text-accent">params</span>: <span className="text-muted">{"{ query: string }"}</span>{" "}
        <span className="text-foreground">{"}"}</span>
      </div>
    </div>
  );
}

function PricingSection() {
  const tiers = [
    { name: "Free", price: "$0", period: "/siempre", description: "Para probar la API y construir un primer demo.", cta: "$ empezar", features: ["500 calls/mes", "1 país", "Latencia estándar", "Sin webhooks"] },
    { name: "Indie", price: "$49", period: "/mes", description: "Para recruiters y developers individuales.", cta: "$ probar_indie", features: ["10,000 calls/mes", "Todos los países", "Webhooks de cambios", "Soporte por email"], highlighted: true, badge: "founding_price" },
    { name: "Scale", price: "$199", period: "/mes", description: "Para agencias y HR-tech en producción.", cta: "$ probar_scale", features: ["100,000 calls/mes", "Webhooks + polling", "Dedup + salary normalization", "Soporte prioritario", "99.5% SLA"] },
  ];

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 font-mono">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <p className="text-xs text-accent uppercase tracking-wider mb-3">// 05 · pricing</p>
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
          <DecryptReveal>Pricing simple, en USD.</DecryptReveal>
        </h2>
        <p className="text-sm text-muted">Sin contratos anuales, sin setup fees. Cancelás cuando quieras. El precio founding queda bloqueado para early adopters.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <div key={tier.name} className={`rounded-lg p-6 flex flex-col gap-5 relative ${tier.highlighted ? "border-2 border-accent bg-card" : "border border-border bg-card"}`}>
            {tier.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-background text-[10px] font-semibold tracking-wider">{tier.badge}</span>
            )}
            <div>
              <div className="text-xs text-muted uppercase tracking-wider mb-2">{tier.name}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                <span className="text-muted text-xs">{tier.period}</span>
              </div>
              <p className="text-xs text-muted mt-3">{tier.description}</p>
            </div>
            <ul className="space-y-2 text-xs flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2 text-foreground">
                  <span className="text-accent shrink-0">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#signup" className={`px-4 py-2 rounded-md text-xs font-semibold text-center transition-colors ${tier.highlighted ? "bg-accent text-background hover:bg-accent-deep" : "border border-border text-foreground hover:border-accent hover:text-accent"}`}>
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
    { q: "¿De dónde sale la data?", a: "Scraping de los portales públicos (Computrabajo, Bumeran, OCC, ZonaJobs, Laborum, El Empleo). Cuando un portal expone una API oficial, la usamos. No vendemos datos de candidatos, solo ofertas." },
    { q: "¿Con qué frecuencia se actualiza?", a: "Cada portal se scrapea cada 15–30 minutos. Los endpoints de búsqueda reflejan el último snapshot. Los webhooks disparan cuando aparece una oferta nueva en tus keywords." },
    { q: "¿Cómo es la deduplicación?", a: "Hash sobre (título normalizado + empresa + ciudad + país). Si dos portales cargan la misma oferta, recibís una fila con el array `sources` indicando de dónde vino." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin contratos anuales, sin setup fees. El precio founding ($49/mes en Indie) se mantiene mientras tu suscripción esté activa." },
    { q: "¿Y si un portal cambia su HTML?", a: "El scraper se rompe y nosotros nos enteramos por el monitoring. El fix típico toma 1–4 horas y se deploya sin action de tu parte." },
  ];

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20 font-mono">
      <p className="text-xs text-accent uppercase tracking-wider mb-3">// 06 · faq</p>
      <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-10">
        <DecryptReveal>Preguntas reales de recruiters LATAM.</DecryptReveal>
      </h2>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((f, i) => (
          <details key={f.q} className="group py-5 cursor-pointer" open={i === 0}>
            <summary className="flex items-start justify-between gap-4 list-none">
              <span className="text-sm font-medium pr-4">
                <span className="text-muted mr-2">{String(i + 1).padStart(2, "0")}.</span>
                {f.q}
              </span>
              <span className="text-accent text-lg shrink-0 transition-transform group-open:rotate-45 font-mono">+</span>
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
    <section id="signup" className="max-w-3xl mx-auto px-6 py-20 font-mono">
      <div className="rounded-lg border border-accent/30 bg-gradient-to-br from-card to-card-hover p-8 lg:p-12 text-center">
        <p className="text-xs text-accent uppercase tracking-wider mb-4">// 07 · call_to_action</p>
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
          <DecryptReveal duration={1500}>Sumate a los 30 que validan esto.</DecryptReveal>
        </h2>
        <p className="text-xs text-muted mb-8 max-w-md mx-auto">
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
    <footer className="border-t border-border mt-12 font-mono">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border border-accent/40 bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">▌</div>
          <span>latam-jobs<span className="text-accent">.api</span> · building in Bogotá 🇨🇴</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="hover:text-accent">/docs</Link>
          <Link href="/recruiters" className="hover:text-accent">/recruiters</Link>
          <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-accent">/llms.txt</a>
          <a href="https://github.com/jseramn/latam-jobs-api" target="_blank" rel="noopener noreferrer" className="hover:text-accent">/github</a>
        </div>
      </div>
    </footer>
  );
}
