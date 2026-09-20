# LatamJobs API

API REST que une **Computrabajo, Bumeran, OCC, ZonaJobs y Laborum** en una sola llamada. Salario parseado a número y moneda. Ofertas deduplicadas. JSON limpio, listo para integrar.

Built with Next.js 16 + Tailwind 4.

## Status

**Validating demand.** Si llegamos a 30 recruiters o HR-tech builders en LATAM, abrimos el acceso. Precio founding: **$49/mes** de por vida.

## Stack

- Next.js 16 (App Router, RSC)
- Tailwind CSS 4 (con `@theme inline`)
- Resend (audience management + transactional email)
- Vercel (deploy target)

## Local development

```bash
pnpm install
cp .env.example .env.local  # add RESEND_API_KEY
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Var | Required | Default | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | yes | — | Audience + email |
| `RESEND_AUDIENCE_NAME` | no | `General` | Existing Resend audience |
| `RESEND_FROM_EMAIL` | no | `LatamJobs <hola@jseramn.tech>` | From address |
| `SEND_CONFIRMATION` | no | `false` | Set `true` to email new signups |

## Endpoints

- `GET /api/signup` — health check (returns ok + audience name)
- `POST /api/signup` — body: `{email, role, country}` → adds contact to Resend
- `GET /api/stats` — current signup count + progress to 30
- `GET /api/preview` — sample job search results (real scraper lands next week)

## Deploy

Push to `main` → Vercel auto-deploys. Set env vars in Vercel project settings (Production).

## What's next

- Real scraper for Computrabajo (Playwright) + Bumeran (server-rendered)
- OpenAPI spec + auto-generated docs
- Stripe integration for paid plans
- Rate limiting per API key
