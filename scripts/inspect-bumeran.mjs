// Inspect HTML structure of a single Bumeran offer to find better selectors
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
});
const page = await ctx.newPage();

// List page
console.log("=== LIST PAGE ===");
await page.goto("https://www.bumeran.com.ar/empleos.html", {
  waitUntil: "domcontentloaded",
  timeout: 30000,
});
await page.waitForTimeout(3000);

// Inspect first card structure
const cardHtml = await page.$$eval(
  'a[href*="/empleos/"]',
  (els) => {
    const el = els[0];
    if (!el) return "NO_CARDS";
    return el.outerHTML.slice(0, 2000);
  },
);
console.log(cardHtml);

// Detail page
console.log("\n\n=== DETAIL PAGE ===");
const detailUrl =
  "https://www.bumeran.com.ar/empleos/comprador-senior-bumeran-selecta-1118418465.html";
await page.goto(detailUrl, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const detailHtml = await page.content();
console.log(`Detail HTML size: ${detailHtml.length}`);
console.log("Title:", await page.title());

// Find salary if present
const salary = await page.$$eval(
  '[class*="salary"], [class*="sueldo"], [class*="remuneracion"]',
  (els) => els.map((e) => e.textContent?.slice(0, 200)).filter(Boolean),
);
console.log("Salary fields:", salary);

// Find description
const desc = await page.$$eval(
  '[class*="description"], [class*="descripcion"], main p',
  (els) => els.slice(0, 3).map((e) => e.textContent?.slice(0, 200)).filter(Boolean),
);
console.log("Description snippets:", desc);

await browser.close();
