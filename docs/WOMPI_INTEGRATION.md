# Wompi Integration — Operational Runbook

**Last updated**: 2026-09-24
**Status**: Code deployed, env vars not yet configured (waiting on JR rotation + manual set).

---

## Quick reference

| Item | Value |
|---|---|
| Payment processor | Wompi Colombia |
| Currency | COP (centavos in API) |
| Public key env var | `WOMPI_PUBLIC_KEY` (pub_prod_xxx) |
| Private key env var | `WOMPI_PRIVATE_KEY` (prv_prod_xxx) |
| Integrity env var | `WOMPI_INTEGRITY_SECRET` (prod_integrity_xxx) |
| Events webhook env var | `WOMPI_EVENTS_SECRET` (prod_events_xxx) |
| Production base URL | https://production.wompi.co |
| Sandbox base URL | https://sandbox.wompi.co |
| Our webhook URL | https://latamjobs-api.jseramn.tech/api/billing/webhook |
| Health check | https://latamjobs-api.jseramn.tech/api/healthz |
| Test script | `bash scripts/test-wompi.sh` |

---

## Pricing

| Tier | Price (COP/mes) | Price (USD equiv) | Calls/mo |
|---|---|---|---|
| Indie | COP$200.000 | ~$49 | 10,000 |
| Scale | COP$800.000 | ~$199 | 100,000 |

---

## Setup checklist (JR's part)

These 4 env vars must be set in Vercel → latam-jobs-api → Production:

```bash
# After JR rotates and copies the new keys into Vercel dashboard
# (or runs vercel env add <KEY> production for each), redeploy:
cd /home/jseramn/agent-core/latam-jobs-api
git commit --allow-empty -m "chore: redeploy to pick up Wompi env vars"
git push origin main
```

After redeploy, run:
```bash
bash scripts/test-wompi.sh
```

Expected output:
```
1. Health check...
  ✓ Service healthy
2. Creating test checkout (Indie tier)...
  ✓ Checkout created
  ✓ URL: https://production.wompi.co/p/?public-key=...&signature:integrity=...
```

---

## Wompi Dashboard configuration

### Events URL

In https://dashboard.wompi.co → Commerce → Events → set:

```
https://latamjobs-api.jseramn.tech/api/billing/webhook
```

### Acceptance tokens (habeas data compliance)

Wompi requires you to send `acceptance_token` and `accept_personal_auth` when creating transactions that involve personal data. **Status**: NOT YET IMPLEMENTED.

When implemented, the flow is:
1. `GET /merchants/:public_key` → fetch both tokens
2. Display checkboxes on our checkout page for the 2 PDF contracts
3. After user accepts, include tokens in the transaction create call

For Phase 1 (one-off payment + manual recurring email), Wompi's hosted checkout handles acceptance internally. We don't need to implement this until we move to API-only transactions (Phase 2 with Botón Bancolombia).

---

## Architecture

### Phase 1 — Hosted Web Checkout (CURRENT)

```
User clicks "Empezar" on /billing
  ↓
Browser POSTs {email, tier} to /api/billing/checkout
  ↓
Server generates integrity signature (SHA256)
  ↓
Server builds URL: https://production.wompi.co/p/?public-key=...&signature:integrity=...
  ↓
Browser redirects to Wompi hosted page
  ↓
User pays (TARJETA, PSE, NEQUI, BANCOLOMBIA_TRANSFER)
  ↓
Wompi redirects user to /billing/return?id=...&status=APPROVED
  ↓
Wompi webhook fires: POST /api/billing/webhook with X-Event-Checksum
  ↓
Server verifies signature using WOMPI_EVENTS_SECRET
  ↓
Server persists subscription to /data/subscriptions.json
  ↓
Server generates API key (sk_live_...)
  ↓
Server emails API key to customer via Resend
  ↓
Customer uses Authorization: Bearer sk_live_... in their requests
```

### Phase 2 — Botón Bancolombia for recurring (FUTURE)

Wompi's Botón Bancolombia allows customers to authorize recurring debits from their Bancolombia savings account. Customer authorizes once → we can charge monthly without re-auth.

Requires:
1. Customer signs up via web flow that uses Wompi's Bancolombia widget
2. We persist `payment_source_id` per customer
3. Each month, we `POST /transactions` with `payment_source_id` (no redirect needed)
4. Wompi debits their bank account automatically

**Why this matters**: Phase 1 requires us to send a "time to renew" email every month and hope customer clicks "Pay now". Phase 2 is true recurring — set and forget.

**When to implement**: After we have 5+ paying customers on Phase 1. Until then, the manual approach is fine.

---

## Code map

| File | Purpose |
|---|---|
| `src/lib/wompi.ts` | Integrity signature + checkout URL builder + signature verification |
| `src/app/api/billing/checkout/route.ts` | POST endpoint that returns Wompi checkout URL |
| `src/app/api/billing/webhook/route.ts` | POST endpoint receiving Wompi events, verifies signature, persists subs, issues API keys |
| `src/app/billing/page.tsx` | Pricing page with 2 tier cards |
| `src/app/billing/return/page.tsx` | Post-checkout landing (APPROVED / PENDING / DECLINED states) |
| `src/components/billing/BillingClient.tsx` | Client component with prompt for email + redirect |
| `src/lib/api-keys.ts` | API key generation (`sk_live_<48hex>`) + storage |
| `src/lib/auth.ts` | Bearer token validation + plan-based rate limits (commented out, opt-in) |
| `data/subscriptions.json` | Per-customer subscription state |
| `data/api-keys.json` | Hashed API keys + usage counters |

---

## Known limitations

1. **No acceptance tokens** — works for Phase 1 because Wompi's hosted checkout handles the habeas data contract internally. Will need implementation for Phase 2 (API-only transactions).

2. **No manual cancellation flow** — Phase 1 cancellations happen via Wompi's dashboard. Phase 2 will add a `/api/billing/cancel` endpoint and a "Cancelar suscripción" button in the email.

3. **No usage-based billing** — fixed monthly tiers only. If a customer uses 0 calls, they still pay. Phase 3 could add metered billing for overage.

4. **No refunds automation** — refunds happen manually via Wompi dashboard.

5. **Webhook signature uses async property traversal** — `src/lib/wompi.ts verifyEventSignature` extracts values from `event.data` by dot-separated path. Tested only manually against Wompi docs. Verify with a real Wompi sandbox event after deploy.

---

## Security notes

- All 4 env vars must be set in Vercel Production, never in code
- Private key and integrity secret are server-side only, never exposed to client
- Webhook signature verification is mandatory — never skip
- API keys are hashed (sha256) before storage; plaintext only in email to customer
- File-based storage (`/data/subscriptions.json`) is MVP only — switch to Vercel KV or Postgres when >100 customers
- All API keys were exposed in chat at one point → assumed compromised → manual rotation is required before first production charge
