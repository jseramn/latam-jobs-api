import Link from "next/link";
import { SignupForm } from "@/components/landing/SignupForm";
import { SignupCounter } from "@/components/landing/SignupCounter";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { AsciiScramble } from "@/components/effects/AsciiScramble";
import { DecryptReveal } from "@/components/effects/DecryptReveal";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="font-mono">
        <Hero />
        <ProblemSection />
        <DemoSection />
        <FeaturesSection />
        <HowSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

/* ============================================================
   TOPBAR — sticky, panel con border-bottom, logo + nav + CTA
   ============================================================ */
function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-foreground/15">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <svg viewBox="0 0 48 48" className="w-8 h-8 shrink-0" aria-hidden>
            <rect x="2" y="2" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
            <g fill="#ffffff">
              <rect x="10" y="10" width="2.5" height="2.5"/>
              <rect x="20" y="18" width="2.5" height="2.5"/>
              <rect x="30" y="22" width="3" height="3"/>
              <rect x="22" y="30" width="2.5" height="2.5"/>
              <rect x="14" y="32" width="2" height="2"/>
            </g>
            <rect x="23" y="23" width="2" height="2" fill="#000000"/>
          </svg>
          <span className="font-semibold tracking-tight text-base leading-none">
            latam-jobs<span className="text-accent">.api</span>
          </span>
          <span className="hidden sm:inline-flex items-center text-[11px] text-muted/70 ml-3 pl-3 border-l border-foreground/15 leading-none">
            v0.1
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <TopBarLink href="#demo">Demo</TopBarLink>
          <TopBarLink href="#features">Features</TopBarLink>
          <TopBarLink href="#pricing">Pricing</TopBarLink>
          <TopBarLink href="#faq">FAQ</TopBarLink>
          <TopBarLink href="/docs" external={false}>Docs</TopBarLink>
        </nav>
        <a
          href="#signup"
          className="px-5 py-2 bg-foreground text-background text-sm font-semibold tracking-tight hover:bg-foreground/85 transition-colors"
        >
          Sumate →
        </a>
      </div>
    </header>
  );
}

function TopBarLink({ href, external = true, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  const cls =
    "px-3 py-1.5 text-muted hover:text-foreground hover:bg-foreground/5 transition-colors";
  if (external) {
    return <a href={href} className={cls}>{children}</a>;
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

/* ============================================================
   HERO — panel grande con headline + codeblock lado a lado
   ============================================================ */
function Hero() {
  return (
    <section className="bg-background border-b border-foreground/15">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* kicker badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-foreground/25 bg-foreground/[0.03] text-xs mb-10">
          <span className="w-1.5 h-1.5 bg-foreground animate-pulse" />
          <span className="text-foreground/70">Validando demanda · 30 signups para lanzar</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Headline column */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.92]">
              <span className="block">
                <AsciiScramble text="Una API." duration={420} />
              </span>
              <span className="block text-foreground/90 my-3">
                <AsciiScramble text="$ curl" duration={360} />
                <span>
                  <AsciiScramble text=" todas" duration={360} />
                </span>
                <span>
                  <AsciiScramble text=" las bolsas" duration={420} />
                </span>
                <span>
                  <AsciiScramble text=" de LATAM." duration={520} />
                </span>
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted max-w-xl leading-relaxed">
              <DecryptReveal duration={420} delay={100}>
                {`Computrabajo · Bumeran · OCC · ZonaJobs · Laborum. Una llamada.
Salario parseado a número. Ofertas deduplicadas. JSON limpio,
listo para integrar.`}
              </DecryptReveal>
            </p>

            {/* CTA panel */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#demo"
                className="px-6 py-3 bg-foreground text-background font-semibold tracking-tight hover:bg-foreground/85 transition-colors text-sm"
              >
                Probar demo →
              </a>
              <a
                href="/docs"
                className="px-6 py-3 border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground/5 transition-colors text-sm font-semibold tracking-tight"
              >
                Leer docs
              </a>
            </div>

            <div className="pt-2 max-w-md">
              <SignupCounter />
            </div>
          </div>

          {/* CodeBlock column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  return (
    <div className="border border-foreground/25 bg-foreground/[0.02] overflow-hidden text-sm">
      {/* terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/15">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 border border-foreground/30" />
          <span className="w-2.5 h-2.5 border border-foreground/30" />
          <span className="w-2.5 h-2.5 border border-foreground/30" />
        </div>
        <span className="text-[11px] text-muted">/v1/search · GET</span>
      </div>
      <pre className="p-5 overflow-x-auto text-[12.5px] leading-relaxed">
        <code>
          <span className="text-muted">{"# request"}</span>{"\n"}
          <span className="text-foreground">{"GET"}</span>{" "}
          <span className="text-muted">{"https://api.latam-jobs.dev/v1/search"}</span>
          {"\n"}
          <span className="text-foreground">{"  ?q=python"}</span>
          <span className="text-muted">{"&"}</span>
          <span className="text-foreground">{"country=mx,co,ar"}</span>
          {"\n\n"}
          <span className="text-muted">{"# response"}</span>{"\n"}
          <span className="text-muted">{"{"}</span>
          {"\n  "}<span className="text-foreground">{"results"}</span><span className="text-muted">{":"}</span>{" ["}
          {"\n    "}<span className="text-muted">{"{"}</span>
          {"\n      "}<span className="text-foreground">{"title"}</span><span className="text-muted">{":"}</span>{" "}<span className="text-foreground/85">{"\"Senior Python\""}</span><span className="text-muted">{","}</span>
          {"\n      "}<span className="text-foreground">{"company"}</span><span className="text-muted">{":"}</span>{" "}<span className="text-foreground/85">{"\"Mercado Libre\""}</span><span className="text-muted">{","}</span>
          {"\n      "}<span className="text-foreground">{"salary"}</span><span className="text-muted">{":"}</span>{" "}
          <span className="text-muted">{"{"}</span>{" "}
          <span className="text-foreground">{"min"}</span><span className="text-muted">{":"}</span>{" "}<span className="text-foreground/85">{"85000"}</span><span className="text-muted">{","}</span>{" "}
          <span className="text-foreground">{"currency"}</span><span className="text-muted">{":"}</span>{" "}<span className="text-foreground/85">{"\"MXN\""}</span>{" "}
          <span className="text-muted">{"}"}</span>
          {"\n      "}<span className="text-foreground">{"sources"}</span><span className="text-muted">{":"}</span>{" ["}
          <span className="text-foreground/85">{"\"computrabajo\""}</span><span className="text-muted">{","}</span>{" "}
          <span className="text-foreground/85">{"\"bumeran\""}</span><span className="text-muted">{"]"}</span>
          {"\n    "}<span className="text-muted">{"}"}</span>
          {"\n  "}<span className="text-muted">{"],"}</span>
          {"\n  "}<span className="text-foreground">{"meta"}</span><span className="text-muted">{":"}</span>{" "}
          <span className="text-muted">{"{"}</span>{" "}
          <span className="text-foreground">{"total"}</span><span className="text-muted">{":"}</span>{" "}<span className="text-foreground/85">{"1247"}</span>
          <span className="text-muted">{" }"}</span>
          {"\n"}<span className="text-muted">{"}"}</span>
        </code>
      </pre>
      <div className="px-4 py-3 border-t border-foreground/15 flex items-center justify-between text-[11px] text-muted">
        <span>3120ms · 19 fuentes</span>
        <span>cached 30s</span>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION WRAPPERS — surface (alternating bg)
   ============================================================ */
function SectionSurface({
  children,
  id,
  alt = false,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  alt?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${alt ? "bg-foreground/[0.025]" : "bg-background"} border-b border-foreground/15 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">{children}</div>
    </section>
  );
}

function Kicker({ n, label }: { n: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <span className="text-2xl font-semibold leading-none">{n}</span>
      <span className="w-8 h-px bg-foreground/30" />
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}

/* ============================================================
   PROBLEM SECTION
   ============================================================ */
function ProblemSection() {
  const pains = [
    { n: "01", title: "4 pestañas, 1 vacante", body: "Computrabajo, Bumeran, OCC, ZonaJobs. Abrís cada una, filtrás, copiás, pegás en un Excel. Tres veces por vacante." },
    { n: "02", title: "Sueldo en texto libre", body: '"25,000 MXN mensuales", "a convenir", "$45K USD". Imposible filtrar por rango. Imposible comparar entre países.' },
    { n: "03", title: "Oferta duplicada", body: "Aparece en Computrabajo y Bumeran. El candidato ya aplicó. Vos no sabés. Email doble, primera impresión rota." },
    { n: "04", title: "Monitoring manual", body: "5 pestañas abiertas revisando cada 30 min. No escala más allá de 3 vacantes. Tu día se va en tareas mecánicas." },
  ];

  return (
    <SectionSurface id="problem" alt>
      <div className="mb-12">
        <Kicker n="01" label="El problema" />
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl leading-[1.05]">
          Si reclutás en LATAM, ya sabés cómo se siente esto.
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pains.map((p) => (
          <article key={p.n} className="border border-foreground/20 bg-background p-6 hover:border-foreground/50 transition-colors group">
            <div className="text-xs text-muted mb-4 font-mono">{p.n}</div>
            <h3 className="text-base font-semibold mb-3 group-hover:text-foreground transition-colors leading-tight">
              {p.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{p.body}</p>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}

/* ============================================================
   DEMO SECTION
   ============================================================ */
function DemoSection() {
  return (
    <SectionSurface id="demo">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4">
          <Kicker n="02" label="Demo en vivo" />
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-6 leading-[1.05]">
            Probalo ahora.
          </h2>
          <p className="text-base text-muted leading-relaxed mb-8">
            Buscá por keyword y filtrá por país. Datos reales cuando estén disponibles; mientras tanto, datos de muestra con el schema final.
          </p>
          <ul className="space-y-3 text-sm">
            <Feature2 text="Salario como número, no string" />
            <Feature2 text="Deduplicado por hash de oferta" />
            <Feature2 text="Moneda y período inferidos" />
            <Feature2 text="Latency < 800ms con cache" />
          </ul>
        </div>
        <div className="lg:col-span-8">
          <LiveDemo />
        </div>
      </div>
    </SectionSurface>
  );
}

function Feature2({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-4 h-4 border border-foreground/40 mt-0.5 shrink-0" />
      <span className="text-foreground/85">{text}</span>
    </li>
  );
}

/* ============================================================
   FEATURES SECTION
   ============================================================ */
function FeaturesSection() {
  const features = [
    {
      n: "01",
      title: "Un endpoint, 6 portales",
      body: "Computrabajo (19 países), Bumeran, OCC Mundial, ZonaJobs, Laborum, El Empleo.",
    },
    {
      n: "02",
      title: "Salario parseado",
      body: "Texto suelto → número y moneda. Filtrá por rango, sin parsers.",
    },
    {
      n: "03",
      title: "Webhooks",
      body: "Monitoreá keywords. Te avisamos cuando aparece una oferta nueva.",
    },
    {
      n: "04",
      title: "Sin duplicados",
      body: "Misma oferta en Computrabajo y Bumeran = 1 fila con sources.",
    },
    {
      n: "05",
      title: "MCP-ready",
      body: "Tu agente Claude o GPT puede buscar vacantes como tool.",
    },
    {
      n: "06",
      title: "Multi-currency",
      body: "MXN, COP, BRL, ARS, CLP, PEN, USD. Por país y periodo.",
    },
  ];

  return (
    <SectionSurface id="features" alt>
      <div className="mb-12">
        <Kicker n="03" label="Por qué" />
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl leading-[1.05]">
          Lo que esta API hace, en términos concretos.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <article key={f.n} className="border border-foreground/20 bg-background p-6 hover:border-foreground/50 transition-colors">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-2xl font-semibold">{f.n}</span>
              <span className="text-xs text-muted">feature</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 tracking-tight">{f.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}

/* ============================================================
   HOW SECTION — Cómo funciona (3 pasos con UI real)
   ============================================================ */
function HowSection() {
  const steps = [
    {
      n: "01",
      title: "Pedís",
      body: "Una llamada HTTP. Pasás qué buscás y qué países.",
      example: 'GET /v1/search?q=python&country=mx,co',
    },
    {
      n: "02",
      title: "Recibís",
      body: "Ofertas con salario en número y moneda. Sin duplicadas entre portales.",
      example: "{ results: [...], meta: { total: 1247 } }",
    },
    {
      n: "03",
      title: "Listo",
      body: "Lo metés en tu ATS, dashboard o agente. Te avisamos cuando hay cambios.",
      example: "webhook → tu endpoint",
    },
  ];

  return (
    <SectionSurface id="how">
      <div className="mb-12">
        <Kicker n="04" label="Cómo funciona" />
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl leading-[1.05]">
          Tres pasos. Sin código raro.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((s) => (
          <article key={s.n} className="border border-foreground/25 bg-background p-7">
            <div className="flex items-center justify-between mb-5">
              <span className="text-3xl font-semibold">{s.n}</span>
              <span className="text-xs text-muted px-2 py-0.5 border border-foreground/20">
                paso
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-5">{s.body}</p>
            <code className="block text-xs bg-foreground/[0.04] border border-foreground/15 px-3 py-2 text-foreground/85 overflow-x-auto">
              {s.example}
            </code>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}

/* ============================================================
   PRICING SECTION
   ============================================================ */
function PricingSection() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "para siempre",
      desc: "Para probar la API y construir un primer demo.",
      cta: "Empezar gratis",
      highlighted: false,
      features: [
        "500 calls/mes",
        "1 país incluido",
        "Latencia estándar",
        "Sin webhooks",
      ],
    },
    {
      name: "Indie",
      price: "$49",
      period: "/mes",
      desc: "Para recruiters y developers individuales.",
      cta: "Probar Indie",
      highlighted: true,
      badge: "founding_price",
      features: [
        "10,000 calls/mes",
        "Todos los países",
        "Webhooks de cambios",
        "Soporte por email",
      ],
    },
    {
      name: "Scale",
      price: "$199",
      period: "/mes",
      desc: "Para agencias y HR-tech en producción.",
      cta: "Probar Scale",
      highlighted: false,
      features: [
        "100,000 calls/mes",
        "Webhooks + polling",
        "Dedup + salary parsing",
        "Soporte prioritario",
        "99.5% SLA",
      ],
    },
  ];

  return (
    <SectionSurface id="pricing" alt>
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-foreground/30" />
          <span className="text-sm text-muted">05 · Pricing</span>
          <span className="w-8 h-px bg-foreground/30" />
        </div>
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-5 leading-[1.05]">
          Pricing simple, en USD.
        </h2>
        <p className="text-base text-muted">
          Sin contratos anuales, sin setup fees. Cancelás cuando quieras. El precio founding queda bloqueado para early adopters.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {tiers.map((t) => (
          <article
            key={t.name}
            className={`relative border p-8 flex flex-col ${
              t.highlighted
                ? "border-foreground bg-background"
                : "border-foreground/20 bg-background"
            }`}
          >
            {t.badge && (
              <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-background text-[10px] font-bold tracking-widest">
                {t.badge}
              </span>
            )}
            <div className="mb-6">
              <div className="text-sm text-muted uppercase tracking-wider mb-3">
                {t.name}
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl font-semibold tracking-tight">{t.price}</span>
                <span className="text-muted text-sm">{t.period}</span>
              </div>
              <p className="text-sm text-muted">{t.desc}</p>
            </div>
            <ul className="space-y-2.5 text-sm flex-1 mb-8">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 border border-foreground/40 mt-0.5 shrink-0" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#signup"
              className={`block w-full text-center px-5 py-3 text-sm font-semibold tracking-tight transition-colors ${
                t.highlighted
                  ? "bg-foreground text-background hover:bg-foreground/85"
                  : "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground/5"
              }`}
            >
              {t.cta}
            </a>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}

/* ============================================================
   FAQ SECTION
   ============================================================ */
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
    <SectionSurface id="faq">
      <div className="mb-12 max-w-3xl">
        <Kicker n="06" label="Preguntas frecuentes" />
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
          Lo que más preguntan los recruiters.
        </h2>
      </div>
      <div className="max-w-3xl border border-foreground/20 divide-y divide-foreground/15">
        {faqs.map((f, i) => (
          <details key={f.q} className="group p-6 cursor-pointer" open={i === 0}>
            <summary className="flex items-start justify-between gap-4 list-none">
              <div className="flex items-baseline gap-4">
                <span className="text-xs text-muted font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-semibold pr-4">{f.q}</span>
              </div>
              <span className="text-foreground text-xl shrink-0 transition-transform group-open:rotate-45 leading-none">
                +
              </span>
            </summary>
            <p className="text-sm text-muted leading-relaxed mt-4 pl-10 pr-10">{f.a}</p>
          </details>
        ))}
      </div>
    </SectionSurface>
  );
}

/* ============================================================
   CTA SECTION — panel grande con signup
   ============================================================ */
function CtaSection() {
  return (
    <SectionSurface id="signup" alt>
      <div className="border border-foreground/40 bg-background p-8 lg:p-16 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6 justify-center">
          <span className="text-2xl font-semibold">07</span>
          <span className="w-8 h-px bg-foreground/30" />
          <span className="text-sm text-muted">Sumate</span>
        </div>
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-5 leading-[1.05]">
          Sumate a los 30 que validan esto.
        </h2>
        <p className="text-base text-muted mb-10 max-w-md mx-auto leading-relaxed">
          Si llegamos a 30 recruiters o HR-tech builders en 48h, abrimos el acceso. Precio founding de por vida.
        </p>
        <div className="max-w-sm mx-auto">
          <SignupForm />
        </div>
      </div>
    </SectionSurface>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/15">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 48 48" className="w-6 h-6 shrink-0" aria-hidden>
            <rect x="2" y="2" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
            <g fill="#ffffff">
              <rect x="10" y="10" width="2.5" height="2.5"/>
              <rect x="20" y="18" width="2.5" height="2.5"/>
              <rect x="30" y="22" width="3" height="3"/>
              <rect x="22" y="30" width="2.5" height="2.5"/>
              <rect x="14" y="32" width="2" height="2"/>
            </g>
          </svg>
          <span className="text-muted">
            latam-jobs<span className="text-foreground">.api</span> · building in Bogotá 🇨🇴
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FooterLink href="/docs">/docs</FooterLink>
          <FooterLink href="/recruiters">/recruiters</FooterLink>
          <FooterLink href="/llms.txt" external>/llms.txt</FooterLink>
          <FooterLink href="https://github.com/jseramn/latam-jobs-api" external>/github</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  external = true,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const cls = "px-3 py-1.5 text-muted hover:text-foreground hover:bg-foreground/5 transition-colors";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
