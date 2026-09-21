# Outreach posts — ready to copy/paste once deployed

URL once live: https://latamjobs-api.jseramn.tech
API: https://latamjobs-api.jseramn.tech/api/v1/search?q=python&country=ar

---

## POST 1 — Reddit r/RecruitmentHub (English)

**Title:** Built an API that unifies LATAM job boards into one endpoint — validating with 30 recruiters before launch

**Body:**

I spent the last few days building something I wish existed when I was hiring in Colombia: a single REST API that returns jobs from Computrabajo, Bumeran, OCC, ZonaJobs, and Laborum in one call, with salary parsed into a number and currency.

```
GET https://latamjobs-api.jseramn.tech/api/v1/search?q=desarrollador+python&country=mx,co,ar
```

I put up a landing to validate demand before continuing. Looking for 30 recruiters or HR-tech builders in LATAM who'd genuinely use something like this. If we hit 30 in 48h, we ship.

What I need feedback on:
- Would you actually pay $49–99/mo for this?
- Which portals matter most for your stack?
- Salary normalization — is parsing "MXN 25,000 - 35,000 mensuales" → `{min: 25000, max: 35000, currency: "MXN", period: "monthly"}` what you'd want?

Landing: https://latamjobs-api.jseramn.tech

If there's enough signal, I'll open a Discord for early testers next week. If not, I'll tell you what I learned and kill it.

— Manuel, building solo in Bogotá 🇨🇴

---

## POST 2 — Reddit r/empleos_AR (Spanish)

**Title:** Construí una API que une Computrabajo + Bumeran + OCC + ZonaJobs en una sola llamada — busco feedback de recruiters antes de lanzar

**Body:**

¿Les pasa que para cubrir una vacante tienen que abrir 4 pestañas y después pegar todo en un Excel?

Pasé unos días armando esto: una API REST que en una llamada devuelve ofertas de Computrabajo, Bumeran, OCC, ZonaJobs y Laborum, ya deduplicadas y con el sueldo parseado.

Puse un landing para validar demanda antes de seguir construyendo. Si llegamos a 30 recruiters en 48h, lo lanzo. Si no, lo mato y cuento qué aprendí.

Lo que me importa saber:
- ¿Pagarían $49–99 USD/mes por esto?
- ¿Qué portales usan más para Argentina?
- ¿Qué formato de salida les serviría?

Landing: https://latamjobs-api.jseramn.tech

— Manuel, armando solo en Bogotá 🇨🇴

---

## POST 3 — LinkedIn (target: recruiters LATAM + HR-tech founders)

Acabo de publicar una API que en una llamada devuelve ofertas de Computrabajo, Bumeran, OCC, ZonaJobs y Laborum — deduplicadas y con el sueldo parseado.

GET /api/v1/search?q=desarrollador+python&country=mx,co,ar
→ JSON con resultados, cada uno con salary.min, salary.max, currency, period

Estoy validando con 30 recruiters o HR-tech builders de LATAM antes de seguir construyendo.

Landing: https://latamjobs-api.jseramn.tech

Si llegamos a 30 en 48h, lanzo con precio founding de $49/mes (después $99).
Si no, lo mato y comparto qué aprendí.

Dos preguntas:
1. ¿Realmente pagarían por esto o es "nice to have"?
2. ¿Qué portales les importan más?

— Manuel

---

## POST 4 — Twitter / X thread

1/ Acabo de publicar algo que vengo necesitando hace años: una API que une Computrabajo + Bumeran + OCC + ZonaJobs + Laborum en UNA llamada.

Sueldo parseado a número y moneda. Deduplicado. Webhooks cuando aparecen ofertas nuevas.

🧵

2/ El caso es real: si reclutás en LATAM, sabés que tenés que abrir 4 pestañas, copiar ofertas a mano, y a veces la misma oferta aparece duplicada entre portales.

Mi API:
{
  "title": "Backend Dev Python",
  "company": "Mercado Libre",
  "salary": { "min": 45000, "max": 70000, "currency": "MXN", "period": "monthly" },
  "sources": ["computrabajo", "bumeran"]
}

3/ Validando demanda con 30 recruiters / HR-tech builders de LATAM antes de seguir construyendo.

Landing: https://latamjobs-api.jseramn.tech

Si llegamos a 30 en 48h, lanzo. Si no, lo mato.

4/ Lo que necesito saber:
- ¿Pagarían $49-99 USD/mes?
- ¿Qué portales les importan más?
- ¿Querrían webhook de nuevas ofertas?

RT si te interesa. Feedback honesto en replies 💚

— Manuel, building solo en Bogotá 🇨🇴

---

## POST 5 — Indie Hackers (Spanish-friendly)

**Title:** LatamJobs API — single endpoint for all LATAM job boards (validating)

**Body:**

Hola. Estoy validando una API que une las bolsas de trabajo de LATAM en una sola llamada.

El problema: si reclutás en LATAM, tenés que abrir 4 portales (Computrabajo, Bumeran, OCC, ZonaJobs) por cada vacante, copiar ofertas, dedupe a mano, etc.

Lo que estoy armando:
- Una API REST que devuelve las 5 fuentes en una llamada
- Salario parseado a número y moneda
- Deduplicación por hash de oferta
- Webhooks de cambios

Landing: https://latamjobs-api.jseramn.tech

Validando con 30 recruiters. Si llegamos a 30 en 48h, lo lanzo a $49/mes (después $99).

Si llegaste hasta acá: ¿vos contratarías esto? ¿Qué cambiarías?
