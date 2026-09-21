import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparte LatamJobs API",
  description:
    "Ayuda a spread the word: una API REST que une los portales de empleo de LATAM en una sola llamada.",
};

// Pre-built share URLs (encoded). JR opens this page, picks platform, pastes or clicks.
const SHARE_URL = "https://latamjobs-api.jseramn.tech";

const SHORT_TEXT = `Construí una API que une Computrabajo+Bumeran+OCC+ZonaJobs+Laborum en una llamada. Salario parseado, deduplicado, JSON limpio. \$49/mes founding price si llegamos a 30 signups.`;

const TWEET = `Acabo de publicar una API que une las bolsas de empleo de LATAM en una llamada. Sueldo parseado, deduplicado, JSON limpio. Validando con 30 recruiters. Si te sirve, RT 💚`;

const LINKEDIN = `Acabo de publicar LatamJobs API — una API REST que une Computrabajo, Bumeran, OCC, ZonaJobs y Laborum en una sola llamada, con salario parseado a número y deduplicado entre portales.

Estoy validando con 30 recruiters o HR-tech builders de LATAM antes de seguir construyendo. Si llegamos a 30, lanzo con precio founding de $49/mes.

Dos preguntas para vos:
1. ¿Pagarías por algo así o es "nice to have"?
2. ¿Qué portales te importan más?

Landing: ${SHARE_URL}`;

const REDDIT_TITLE = "Built an API that unifies LATAM job boards into one endpoint — validating with 30 recruiters";

const REDDIT_BODY = `I built a single REST API that returns jobs from Computrabajo, Bumeran, OCC, ZonaJobs, and Laborum in one call, with salary parsed into a number and currency.

GET ${SHARE_URL}/api/v1/search?q=python&country=mx,co,ar

What I need feedback on:
- Would you pay $49-99/mo for this?
- Which portals matter most?
- Is parsing "MXN 25,000 - 35,000 mensuales" → {min, max, currency, period} what you want?

If we hit 30 signups, we ship. Otherwise I kill it and tell what I learned.

— Building solo in Bogotá 🇨🇴`;

const WHATSAPP = `${SHORT_TEXT}\n\n${SHARE_URL}`;

const EMAIL_SUBJECT = "API para bolsas de empleo de LATAM — feedback?";
const EMAIL_BODY = `Hola,

Armé una API REST que une los portales de empleo de LATAM (Computrabajo, Bumeran, OCC, ZonaJobs, Laborum) en una sola llamada. Salario parseado a número, ofertas deduplicadas, JSON limpio.

${SHARE_URL}

Estoy validando demanda con 30 recruiters antes de seguir construyendo. ¿Te sería útil algo así? ¿Qué portales te importan más?

— Manuel`;

function encodeURI(s: string): string {
  return encodeURIComponent(s);
}

const shareLinks = [
  {
    name: "Twitter / X",
    icon: "𝕏",
    description: "Tweet (1 click para publicar)",
    url: `https://twitter.com/intent/tweet?text=${encodeURI(TWEET)}&url=${encodeURI(SHARE_URL)}&hashtags=latamjobs,hrtech,recruiters`,
    bg: "hover:bg-[#1a1a1a] hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: "in",
    description: "Post en feed con texto pre-armado",
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(SHARE_URL)}`,
    bg: "hover:bg-[#0a66c2] hover:text-white",
  },
  {
    name: "Reddit",
    icon: "r/",
    description: "Submit a subreddit (elegís cuál)",
    url: `https://www.reddit.com/submit?url=${encodeURI(SHARE_URL)}&title=${encodeURI(REDDIT_TITLE)}`,
    bg: "hover:bg-[#ff4500] hover:text-white",
  },
  {
    name: "WhatsApp",
    icon: "✉",
    description: "Mensaje directo con link",
    url: `https://wa.me/?text=${encodeURI(WHATSAPP)}`,
    bg: "hover:bg-[#25d366] hover:text-white",
  },
  {
    name: "Email",
    icon: "@",
    description: "Email pre-armado para outreach 1:1",
    url: `mailto:?subject=${encodeURI(EMAIL_SUBJECT)}&body=${encodeURI(EMAIL_BODY)}`,
    bg: "hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]",
  },
];

export default function SharePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container py-16 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8"
        >
          ← Volver al landing
        </Link>

        <div className="kicker">
          <span className="num">/share</span>
          <span className="line" />
          <span className="label">Outreach</span>
        </div>

        <h1 className="text-section mb-4">Comparte LatamJobs API</h1>
        <p className="text-lead mb-10">
          5 canales. Un click por canal. Cada link tiene el copy pre-armado —
          solo revisás y publicás.
        </p>

        <div className="space-y-3 mb-12">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-5 border border-border rounded-xl bg-background transition-colors group ${link.bg}`}
            >
              <span className="w-12 h-12 inline-grid place-items-center bg-surface rounded-lg border border-border font-mono text-lg shrink-0">
                {link.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base mb-1">{link.name}</div>
                <div className="text-sm text-muted">{link.description}</div>
              </div>
              <span className="text-muted group-hover:text-current transition-colors">
                →
              </span>
            </a>
          ))}
        </div>

        <div className="border border-border rounded-xl p-6 bg-surface">
          <h2 className="text-xl font-semibold mb-3">Copy pre-armado (copy/paste)</h2>

          <details className="mb-3">
            <summary className="cursor-pointer text-sm font-semibold text-foreground mb-2">
              Twitter / X thread (4 tweets)
            </summary>
            <pre className="text-xs bg-background border border-border p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono">
{`1/ Acabo de publicar algo que vengo necesitando hace años: una API que une Computrabajo + Bumeran + OCC + ZonaJobs + Laborum en UNA llamada.

Sueldo parseado a número y moneda. Deduplicado. Webhooks cuando aparecen ofertas nuevas.

2/ El caso es real: si reclutás en LATAM, sabés que tenés que abrir 4 pestañas, copiar ofertas a mano, y a veces la misma oferta aparece duplicada entre portales.

Mi API: { "title": "...", "company": "...", "salary": { "min": ..., "max": ..., "currency": "...", "period": "monthly" }, "sources": ["computrabajo", "bumeran"] }

3/ Validando demanda con 30 recruiters / HR-tech builders de LATAM antes de seguir construyendo.

Landing: ${SHARE_URL}

4/ Lo que necesito saber:
- ¿Pagarían $49-99 USD/mes?
- ¿Qué portales les importan más?
- ¿Querrían webhook de nuevas ofertas?

RT si te interesa. Feedback honesto en replies 💚`}
            </pre>
          </details>

          <details className="mb-3">
            <summary className="cursor-pointer text-sm font-semibold text-foreground mb-2">
              LinkedIn post
            </summary>
            <pre className="text-xs bg-background border border-border p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono">
              {LINKEDIN}
            </pre>
          </details>

          <details className="mb-3">
            <summary className="cursor-pointer text-sm font-semibold text-foreground mb-2">
              Reddit post (English)
            </summary>
            <pre className="text-xs bg-background border border-border p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono">
              {REDDIT_TITLE + "\n\n" + REDDIT_BODY}
            </pre>
          </details>

          <details>
            <summary className="cursor-pointer text-sm font-semibold text-foreground mb-2">
              Email (outreach 1:1 a recruiters)
            </summary>
            <pre className="text-xs bg-background border border-border p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono">
              {EMAIL_BODY}
            </pre>
          </details>
        </div>

        <p className="text-xs text-muted mt-8">
          Esta página es solo para vos (JR). El copy está armado para que vos
          decidas qué publicar y dónde. No automatizo publicación sin tu OK
          explícito cada vez.
        </p>
      </div>
    </main>
  );
}
