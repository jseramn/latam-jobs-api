// Smoke test: scraper de Bumeran con Playwright para sortear el challenge de Cloudflare
import { chromium } from "playwright";

const URL = "https://www.bumeran.com.ar/empleos.html";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  viewport: { width: 1280, height: 800 },
});
const page = await ctx.newPage();

console.log("[bumeran] navigating...");
const start = Date.now();
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });

// Esperar a que pase el challenge de Cloudflare
console.log("[bumeran] waiting for cloudflare challenge...");
await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => null);
await page.waitForTimeout(2000);

console.log(`[bumeran] loaded in ${Date.now() - start}ms`);
console.log(`[bumeran] title: ${await page.title()}`);

// Intentar extraer ofertas
const html = await page.content();
console.log(`[bumeran] HTML size: ${html.length}`);

const cards = await page.$$eval(
  'a[href*="/empleos/"], [class*="job"], [class*="oferta"]',
  (els) =>
    els.slice(0, 5).map((el) => ({
      tag: el.tagName,
      text: (el.textContent ?? "").slice(0, 80),
      href: el.href ?? null,
    })),
);
console.log("[bumeran] sample cards:", JSON.stringify(cards, null, 2));

await browser.close();
