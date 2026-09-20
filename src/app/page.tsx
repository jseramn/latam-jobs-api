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
          <svg viewBox="0 0 48 48" className="w-7 h-7 shrink-0" aria-hidden>
            <rect x="2" y="2" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="1"/>
            <g fill="#ffffff">
              <rect x="10" y="10" width="2.5" height="2.5"/>
              <rect x="20" y="18" width="2.5" height="2.5"/>
              <rect x="30" y="22" width="3" height="3"/>
              <rect x="22" y="30" width="2.5" height="2.5"/>
              <rect x="14" y="32" width="2" height="2"/>
            </g>
            <rect x="23" y="23" width="2" height="2" fill="#000000"/>
          </svg>
          <span className="font-semibold tracking-tight text-sm leading-none">
            latam-jobs<span className="text-accent">.api</span>
          </span>
          <span className="hidden sm:inline-flex items-center text-[10px] text-muted/60 ml-2 pl-2 border-l border-border/60 leading-none">
            v0.1
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
          <span className="w-2.5 h-2.5 border border-foreground/30" />
          <span className="w-2.5 h-2.5 border border-foreground/30" />
          <span className="w-2.5 h-2.5 border border-foreground/30" />
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
          {"\n      "}<span className="text-accent">{"title"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-foreground/80">{"\"Senior Python\""}</span><span className="text-foreground">{","}</span>
          {"\n      "}<span className="text-accent">{"company"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-foreground/80">{"\"Mercado Libre\""}</span><span className="text-foreground">{","}</span>
          {"\n      "}<span className="text-accent">{"salary"}</span><span className="text-foreground">{":"}</span>{" "}
          <span className="text-foreground">{"{"}</span>{" "}
          <span className="text-accent">{"min"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-foreground/80">{"85000"}</span><span className="text-foreground">{","}</span>{" "}
          <span className="text-accent">{"currency"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-foreground/80">{"\"MXN\""}</span>{" "}
          <span className="text-foreground">{"}"}</span>
          {"\n      "}<span className="text-accent">{"sources"}</span><span className="text-foreground">{":"}</span>{" ["}
          <span className="text-foreground/80">{"\"computrabajo\""}</span><span className="text-foreground">{","}</span>{" "}
          <span className="text-foreground/80">{"\"bumeran\""}</span><span className="text-foreground">{"]"}</span>
          {"\n    "}<span className="text-foreground">{"}"}</span>
          {"\n  "}<span className="text-foreground">{"],"}</span>
          {"\n  "}<span className="text-accent">{"meta"}</span><span className="text-foreground">{":"}</span>{" "}
          <span className="text-foreground">{"{"}</span>{" "}
          <span className="text-accent">{"total"}</span><span className="text-foreground">{":"}</span>{" "}<span className="text-foreground/80">{"1247"}</span>
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
        <div className="mb-3 flex items-baseline gap-3">
          <span className="text-2xl text-accent font-semibold leading-none">01</span>
          <span className="text-[11px] uppercase tracking-wider text-muted">"El problema"</span>
        </div>
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
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-2xl text-accent font-semibold leading-none">02</span>
            <span className="text-[11px] uppercase tracking-wider text-muted">Demo en vivo</span>
          </div>
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
        <div className="mb-3 flex items-baseline gap-3">
          <span className="text-2xl text-accent font-semibold leading-none">03</span>
          <span className="text-[11px] uppercase tracking-wider text-muted">"Por qué"</span>
        </div>
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
          body="De texto suelto a número y moneda. Filtrá por rango, sin parsers."
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
  // Silueta LATAM minimalista: 6 hubs
  return (
    <div className="font-mono text-foreground space-y-1">
      <div className="text-[10px] text-muted">6 portales · 19 países</div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs leading-none">
        <span>MX</span><span>CO</span><span>PE</span>
        <span>BR</span><span>CL</span><span>AR</span>
      </div>
      <div className="text-[10px] text-muted mt-1">Computrabajo · Bumeran · OCC · ZonaJobs · Laborum · El Empleo</div>
    </div>
  );
}

function SalaryVisual() {
  return (
    <div className="font-mono text-xs text-muted space-y-1">
      <div className="text-foreground">"25,000 MXN mensuales"</div>
      <div className="text-foreground">{"─>"} 25000</div>
      <div className="text-[10px]">Listo. Como número, no como string.</div>
    </div>
  );
}

function WebhookVisual() {
  return (
    <div className="font-mono text-xs text-muted space-y-1">
      <div className="text-foreground">{"["} nueva oferta {" ]"}</div>
      <div className="text-foreground">{"─>"} te llega un POST</div>
      <div className="text-[10px]">Aviso en tiempo real.</div>
    </div>
  );
}

function DedupVisual() {
  return (
    <div className="font-mono text-xs text-muted space-y-1">
      <div className="text-foreground">{"2 portales"}</div>
      <div className="text-foreground">{"─>"} 1 oferta</div>
      <div className="text-[10px]">Sin duplicados.</div>
    </div>
  );
}

function McpVisual() {
  return (
    <div className="font-mono text-xs text-muted space-y-1">
      <div className="text-foreground">Tu agente IA</div>
      <div className="text-foreground">{"─>"} busca solo</div>
      <div className="text-[10px]">Compatible con Claude y GPT.</div>
    </div>
  );
}

function LatencyVisual() {
  return (
    <div className="font-mono text-xs text-muted space-y-1">
      <div className="flex justify-between">
        <span>{"<"} 800ms</span>
        <span className="text-foreground">rápido</span>
      </div>
      <div className="h-px bg-foreground/30 mt-1" />
      <div className="text-[10px]">P99 medido.</div>
    </div>
  );
}

function CurrencyVisual() {
  return (
    <div className="font-mono text-[10px] text-foreground grid grid-cols-2 gap-x-3 gap-y-0.5">
      <span>MXN  México</span>
      <span>COP  Colombia</span>
      <span>BRL  Brasil</span>
      <span>ARS  Argentina</span>
      <span>CLP  Chile</span>
      <span>PEN  Perú</span>
    </div>
  );
}

function OpenAiVisual() {
  return (
    <div className="font-mono text-xs text-muted space-y-1">
      <div className="text-foreground">{"{ tools: [...] }"}</div>
      <div className="text-foreground">{"─>"} listo para tu agente</div>
      <div className="text-[10px]">OpenAI function calling nativo.</div>
    </div>
  );
}


function ArchitectureSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-2xl text-accent font-semibold leading-none">04</span>
        <span className="text-[11px] uppercase tracking-wider text-muted">Cómo funciona</span>
      </div>
      <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-10">
        <DecryptReveal duration={500} delay={100}>
          {"Tres pasos. Sin código raro. Sin mantenimiento."}
        </DecryptReveal>
      </h2>
      <div className="grid md:grid-cols-3 gap-3">
        <StepCard n="1" title="Pedís" body="Una llamada HTTP. Pasás qué buscás y qué países. Te devolvemos JSON." />
        <StepCard n="2" title="Recibís" body="Ofertas con salario ya en número y moneda. Sin duplicadas entre portales." />
        <StepCard n="3" title="Listo" body="Lo metés en tu ATS, tu dashboard o tu agente. Te avisamos cuando hay cambios." />
      </div>
    </section>
  );
}

function StepCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <article className="border border-border bg-card p-6 flex flex-col gap-3">
      <div className="text-[11px] text-muted">{`// paso ${n}`}</div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
    </article>
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
        <div className="mb-3 flex items-baseline gap-3">
          <span className="text-2xl text-accent font-semibold leading-none">05</span>
          <span className="text-[11px] uppercase tracking-wider text-muted">"Pricing"</span>
        </div>
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
                <span className="text-5xl font-semibold tracking-tight">{t.price}</span>
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
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-2xl text-accent font-semibold leading-none">06</span>
        <span className="text-[11px] uppercase tracking-wider text-muted">"Preguntas frecuentes"</span>
      </div>
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
        <div className="mb-4 flex items-baseline gap-3 justify-center">
          <span className="text-2xl text-accent font-semibold leading-none">07</span>
          <span className="text-[11px] uppercase tracking-wider text-muted">"Sumate"</span>
        </div>
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
          <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0" aria-hidden>
            <rect x="2" y="2" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
            <g fill="#ffffff">
              <rect x="10" y="10" width="2.5" height="2.5"/>
              <rect x="20" y="18" width="2.5" height="2.5"/>
              <rect x="30" y="22" width="3" height="3"/>
              <rect x="22" y="30" width="2.5" height="2.5"/>
              <rect x="14" y="32" width="2" height="2"/>
            </g>
          </svg>
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
