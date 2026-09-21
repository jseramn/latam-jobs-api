import Link from "next/link";
import { SignupForm } from "@/components/landing/SignupForm";
import { SignupCounter } from "@/components/landing/SignupCounter";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { AsciiScramble } from "@/components/effects/AsciiScramble";
import { DecryptReveal } from "@/components/effects/DecryptReveal";

/* ============================================================
   VERCEL-STRICT LANDING — ported from sketches/001-vercel-strict
   ============================================================ */
export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <WorkflowSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

/* ============================================================
   TOPBAR — sticky, shadow-as-border bottom, logo + nav + CTA
   ============================================================ */
function TopBar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            aria-hidden
            className="inline-grid place-items-center w-7 h-7 rounded-md bg-[var(--color-fg)] text-[var(--color-bg)] font-bold text-[14px]"
          >
            L
          </span>
          <span className="font-semibold tracking-tight text-base leading-none">
            latam-jobs<span className="text-[var(--color-fg-subtle)]">.api</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <TopBarLink href="#workflow">Workflow</TopBarLink>
          <TopBarLink href="#features">Features</TopBarLink>
          <TopBarLink href="#signup">Sumate</TopBarLink>
          <TopBarLink href="/docs">Docs</TopBarLink>
        </nav>
        <a href="#signup" className="btn btn-primary">
          Sumate →
        </a>
      </div>
    </header>
  );
}

function TopBarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-md text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface)] transition-colors"
    >
      {children}
    </Link>
  );
}

/* ============================================================
   HERO — display headline + codeblock side
   ============================================================ */
function Hero() {
  return (
    <section className="section-divider-dark">
      <div className="container section-pad">
        <div className="pill mb-10">
          <span className="dot animate-pulse-soft" />
          <span>Validando demanda · 30 signups para lanzar</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-display">
              <span className="block">
                <AsciiScramble text="Una API." duration={420} />
              </span>
              <span className="block mt-3">
                Todas las bolsas
                <br />
                de LATAM.
              </span>
            </h1>

            <p className="text-lead max-w-xl">
              <DecryptReveal duration={420} delay={100}>
                {`Computrabajo · Bumeran · OCC · ZonaJobs · Laborum. Una sola llamada.
Salario parseado a número. Ofertas deduplicadas. JSON limpio,
listo para integrar.`}
              </DecryptReveal>
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#signup" className="btn btn-primary">
                Probar demo →
              </a>
              <a href="/docs" className="btn btn-secondary">
                Leer docs
              </a>
            </div>

            <div className="pt-2 max-w-md">
              <SignupCounter />
            </div>
          </div>

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
    <div className="codeblock">
      <div className="codeblock-head">
        <div className="codeblock-dots">
          <span /><span /><span />
        </div>
        <span>/v1/search · GET</span>
      </div>
      <pre>
        <span className="tok-com">{"# request"}</span>{"\n"}
        <span className="tok-key">{"GET"}</span>{" "}
        <span className="tok-str">{"https://api.latam-jobs.dev/v1/search"}</span>
        {"\n"}
        <span className="tok-prop">{"  ?q=python"}</span>
        <span className="tok-punct">{"&"}</span>
        <span className="tok-prop">{"country=mx,co,ar"}</span>
        {"\n\n"}
        <span className="tok-com">{"# response"}</span>{"\n"}
        <span className="tok-punct">{"{"}</span>
        {"\n  "}<span className="tok-prop">{"results"}</span><span className="tok-punct">{":"}</span>{" ["}
        {"\n    "}<span className="tok-punct">{"{"}</span>
        {"\n      "}<span className="tok-prop">{"title"}</span><span className="tok-punct">{":"}</span>{" "}<span className="tok-str">{"\"Senior Python\""}</span><span className="tok-punct">{","}</span>
        {"\n      "}<span className="tok-prop">{"company"}</span><span className="tok-punct">{":"}</span>{" "}<span className="tok-str">{"\"Mercado Libre\""}</span><span className="tok-punct">{","}</span>
        {"\n      "}<span className="tok-prop">{"salary"}</span><span className="tok-punct">{":"}</span>{" "}
        <span className="tok-punct">{"{"}</span>{" "}
        <span className="tok-prop">{"min"}</span><span className="tok-punct">{":"}</span>{" "}<span className="tok-num">{"85000"}</span><span className="tok-punct">{","}</span>{" "}
        <span className="tok-prop">{"currency"}</span><span className="tok-punct">{":"}</span>{" "}<span className="tok-str">{"\"MXN\""}</span>{" "}
        <span className="tok-punct">{"}"}</span>
        {"\n      "}<span className="tok-prop">{"sources"}</span><span className="tok-punct">{":"}</span>{" ["}
        <span className="tok-str">{"\"computrabajo\""}</span><span className="tok-punct">{","}</span>{" "}
        <span className="tok-str">{"\"bumeran\""}</span><span className="tok-punct">{"]"}</span>
        {"\n    "}<span className="tok-punct">{"}"}</span>
        {"\n  "}<span className="tok-punct">{"],"}</span>
        {"\n  "}<span className="tok-prop">{"meta"}</span><span className="tok-punct">{":"}</span>{" "}
        <span className="tok-punct">{"{"}</span>{" "}
        <span className="tok-prop">{"total"}</span><span className="tok-punct">{":"}</span>{" "}<span className="tok-num">{"1247"}</span>
        {" "}<span className="tok-punct">{" }"}</span>
        {"\n"}<span className="tok-punct">{"}"}</span>
      </pre>
      <div className="codeblock-foot">
        <span>3120ms · 19 fuentes</span>
        <span>cached 30s</span>
      </div>
    </div>
  );
}

/* ============================================================
   WORKFLOW — 3-step pipeline (Develop→Preview→Ship)
   ============================================================ */
function WorkflowSection() {
  return (
    <section id="workflow" className="section-divider">
      <div className="container section-pad">
        <div className="kicker">
          <span className="num">01</span>
          <span className="line" />
          <span className="label">Workflow</span>
        </div>
        <h2 className="text-section max-w-3xl mb-16">
          De una keyword a ofertas estructuradas, en tres pasos.
        </h2>

        <div className="workflow-grid">
          <div className="workflow-step develop">
            <span className="step-label">→ Develop</span>
            <h3>Pedís</h3>
            <p>Una llamada HTTP con tu query y los países que te interesan.</p>
            <div className="step-arrow">GET /v1/search?q=python</div>
          </div>
          <div className="workflow-step preview">
            <span className="step-label">→ Preview</span>
            <h3>Recibís</h3>
            <p>JSON con salario como número, moneda, y deduplicado entre portales.</p>
            <div className="step-arrow">{`{ results: [...], meta: {...} }`}</div>
          </div>
          <div className="workflow-step ship">
            <span className="step-label">→ Ship</span>
            <h3>Integrás</h3>
            <p>Lo metés en tu ATS, dashboard o agente. Webhooks cuando hay cambios.</p>
            <div className="step-arrow">webhook → tu endpoint</div>
          </div>
        </div>

        {/* Live demo embedded under workflow */}
        <div className="mt-16">
          <LiveDemo />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURES — 6 cards en grid 3x2
   ============================================================ */
function FeaturesSection() {
  const features = [
    { n: "01", title: "Un endpoint, 6 portales", body: "Computrabajo (19 países), Bumeran, OCC Mundial, ZonaJobs, Laborum, El Empleo.", icon: "6" },
    { n: "02", title: "Salario parseado", body: "Texto suelto → número y moneda. Filtrá por rango, sin parsers.", icon: "$" },
    { n: "03", title: "Webhooks", body: "Monitoreá keywords. Te avisamos cuando aparece una oferta nueva.", icon: "⚡" },
    { n: "04", title: "Sin duplicados", body: "Misma oferta en Computrabajo y Bumeran = 1 fila con sources.", icon: "⊕" },
    { n: "05", title: "MCP-ready", body: "Tu agente Claude o GPT puede buscar vacantes como tool.", icon: "⌘" },
    { n: "06", title: "Multi-currency", body: "MXN, COP, BRL, ARS, CLP, PEN, USD. Por país y periodo.", icon: "¤" },
  ];

  return (
    <section id="features" className="section-divider bg-[var(--color-surface)]">
      <div className="container section-pad">
        <div className="kicker">
          <span className="num">02</span>
          <span className="line" />
          <span className="label">Features</span>
        </div>
        <h2 className="text-section max-w-3xl mb-16">
          Lo que esta API hace, en términos concretos.
        </h2>

        <div className="features-grid">
          {features.map((f) => (
            <article key={f.n} className="card">
              <span className="icon-square">{f.icon}</span>
              <span className="num">{f.n}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA — dark panel con glows + signup
   ============================================================ */
function CtaSection() {
  return (
    <section id="signup">
      <div className="container section-pad">
        <div className="cta-panel">
          <div className="kicker justify-center">
            <span className="num text-white">03</span>
            <span className="line bg-white/30" />
            <span className="label text-white/70">Sumate</span>
          </div>
          <h2>Sumate a los 30 que validan esto.</h2>
          <p>
            Si llegamos a 30 recruiters en 48h, abrimos el acceso. Precio founding de por vida.
          </p>
          <div className="max-w-md mx-auto">
            <SignupForm variant="compact" ctaLabel="Sumate →" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="section-divider">
      <div className="container py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--color-fg-muted)]">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-grid place-items-center w-6 h-6 rounded-md bg-[var(--color-fg)] text-[var(--color-bg)] font-bold text-[12px]"
          >
            L
          </span>
          <span>
            latam-jobs<span className="text-[var(--color-fg)]">.api</span> · building in Bogotá 🇨🇴
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FooterLink href="/docs">/docs</FooterLink>
          <FooterLink href="https://github.com/jseramn/latam-jobs-api">/github</FooterLink>
          <FooterLink href="/llms.txt">/llms.txt</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const cls = "px-3 py-1.5 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface)] rounded-md transition-colors";
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
