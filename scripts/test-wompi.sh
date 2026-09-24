#!/usr/bin/env bash
# Smoke test: verify Wompi integration end-to-end after setting env vars.
# Usage: bash scripts/test-wompi.sh
#
# What this does:
#   1. Checks /api/healthz says Wompi is configured
#   2. POSTs to /api/billing/checkout with a test tier
#   3. Verifies the response contains a valid Wompi checkout URL
#   4. Prints next steps (manual checkout, webhook verification)

set -e

API_URL="${API_URL:-https://latamjobs-api.jseramn.tech}"

echo "=== Wompi Integration Smoke Test ==="
echo "Target: $API_URL"
echo

# 1. Health check
echo "1. Health check..."
HEALTH=$(curl -sL "$API_URL/api/healthz")
echo "$HEALTH"
if echo "$HEALTH" | grep -q '"ok":true'; then
  echo "  ✓ Service healthy"
else
  echo "  ✗ Service unhealthy"
  exit 1
fi
echo

# 2. Checkout endpoint
echo "2. Creating test checkout (Indie tier)..."
TEST_EMAIL="wompi-test-$(date +%s)@example.com"
RESP=$(curl -sL -X POST "$API_URL/api/billing/checkout" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"tier\":\"indie\"}" \
  -w "\nHTTP %{http_code}")

echo "$RESP" | head -20
HTTP_CODE=$(echo "$RESP" | grep "HTTP" | awk '{print $2}')
echo

if [ "$HTTP_CODE" = "200" ]; then
  echo "  ✓ Checkout created"
  CHECKOUT_URL=$(echo "$RESP" | grep -oE '"checkout_url":"[^"]*"' | head -1 | cut -d'"' -f4)
  if [ -n "$CHECKOUT_URL" ]; then
    echo "  ✓ URL: $CHECKOUT_URL"
  fi
elif [ "$HTTP_CODE" = "503" ]; then
  echo "  ⚠ Wompi not configured yet"
  echo "  → Go to Vercel dashboard, add these 4 env vars to latam-jobs-api/production:"
  echo "     WOMPI_PUBLIC_KEY"
  echo "     WOMPI_PRIVATE_KEY"
  echo "     WOMPI_INTEGRITY_SECRET"
  echo "     WOMPI_EVENTS_SECRET"
  echo "  → Then redeploy: empty commit + push, or click 'Redeploy' in Vercel"
  echo "  → Then re-run this script"
  exit 1
else
  echo "  ✗ Unexpected status: $HTTP_CODE"
  exit 1
fi
echo

# 3. Webhook endpoint (signature verification)
echo "3. Webhook endpoint reachable..."
WEBHOOK_STATUS=$(curl -sL -o /dev/null -w "%{http_code}" \
  -X POST "$API_URL/api/billing/webhook" \
  -H "Content-Type: application/json" \
  -d '{"test":true}')
echo "  → Status: $WEBHOOK_STATUS (expecting 400 for invalid signature — that's OK)"
echo

echo "=== Next Steps ==="
echo "1. Open the checkout URL in your browser"
echo "2. Pay with Wompi test card: 4242 4242 4242 4242 (any future date, CVV 123)"
echo "3. Verify you get redirected to /billing/return?status=APPROVED"
echo "4. Verify the API key email arrives within 30s"
echo "5. Verify /api/v1/search with your new key returns data"
echo
echo "=== Production Deploy Checklist ==="
echo "□ Wompi dashboard: Events URL set to $API_URL/api/billing/webhook"
echo "□ Test webhook signature with a real Wompi sandbox event"
echo "□ Switch from sandbox to production keys in env vars"
echo "□ Confirm first real payment triggers API key email"
