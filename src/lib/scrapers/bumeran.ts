import { chromium, type Browser } from "playwright";

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

export interface ScrapedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  posted_at?: string;
  rating?: number;
  source: "bumeran";
  raw: {
    description?: string;
    salary_text?: string;
  };
}

let browserPromise: Promise<Browser> | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = chromium.launch({ headless: true });
  }
  return browserPromise;
}

/**
 * Parse "Publicado ayer" / "Publicado hace 2 días" / "Publicado hace 3 horas"
 * into an ISO timestamp. Returns undefined if the text doesn't match.
 */
function parsePostedAgo(text: string | undefined): string | undefined {
  if (!text) return undefined;
  const now = Date.now();
  let m = text.match(/hace\s+(\d+)\s+hora/i);
  if (m) {
    return new Date(now - Number(m[1]) * 3_600_000).toISOString();
  }
  m = text.match(/hace\s+(\d+)\s+min/i);
  if (m) {
    return new Date(now - Number(m[1]) * 60_000).toISOString();
  }
  if (/ayer/i.test(text)) {
    return new Date(now - 86_400_000).toISOString();
  }
  m = text.match(/hace\s+(\d+)\s+d[ií]a/i);
  if (m) {
    return new Date(now - Number(m[1]) * 86_400_000).toISOString();
  }
  if (/hoy/i.test(text)) {
    return new Date(now).toISOString();
  }
  return undefined;
}

export async function searchBumeranAr(opts: {
  query?: string;
  maxResults?: number;
}): Promise<ScrapedJob[]> {
  const { query = "", maxResults = 30 } = opts;
  const url = query
    ? `https://www.bumeran.com.ar/empleos.html?keyword=${encodeURIComponent(query)}`
    : "https://www.bumeran.com.ar/empleos.html";

  const browser = await getBrowser();
  const ctx = await browser.newContext({
    userAgent: USER_AGENT,
    viewport: { width: 1280, height: 800 },
    locale: "es-AR",
  });
  const page = await ctx.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    // Wait for Cloudflare challenge to settle
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => null);
    await page.waitForTimeout(1500);

    const cards = await page.$$eval(
      'a[href*="/empleos/"]',
      (els) =>
        els.slice(0, maxResults).map((el) => {
          const a = el as HTMLAnchorElement;
          const fullText = (a.textContent ?? "").trim();
          const href = a.href || "";
          const idMatch = href.match(/(\d{8,})\.html/);
          const ratingMatch = fullText.match(/(\d\.\d)/);
          return {
            href,
            fullText: fullText.slice(0, 300),
            id: idMatch?.[1] ?? href,
            rating: ratingMatch ? Number(ratingMatch[1]) : undefined,
          };
        }),
    );

    return cards
      .filter((c) => c.href && c.fullText.length > 10)
      .map((c): ScrapedJob => {
        // Title is the first "word block" before the company rating
        // Format: "Publicado ayer<title><company><rating>"
        const titleMatch = c.fullText.match(
          /(?:Publicado\s+(?:hoy|ayer|hace\s+\d+\s+(?:hora|horas|d[ií]a|d[ií]as)))?(.+?)(?:Bumeran\s+Selecta|La\s+Anonima|Strategy|Grupo|Empresa|Somos|$)/i,
        );
        const title = titleMatch?.[1]?.trim() ?? c.fullText.slice(0, 60);

        return {
          id: `bumeran-${c.id}`,
          title,
          company: "—", // TODO: separate company from title properly
          location: "Argentina",
          url: c.href,
          posted_at: parsePostedAgo(c.fullText),
          rating: c.rating,
          source: "bumeran",
          raw: {},
        };
      });
  } finally {
    await ctx.close();
  }
}
