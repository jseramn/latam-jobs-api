/**
 * Parse Spanish/Portuguese salary strings into structured data.
 *
 * Examples:
 *   "MXN 25,000 - 35,000 mensuales" → {min: 25000, max: 35000, currency: "MXN", period: "monthly"}
 *   "$45K USD" → {min: 45000, max: 45000, currency: "USD", period: "yearly"}
 *   "a convenir" → null
 *   "BRL 8.000 - 12.000" → {min: 8000, max: 12000, currency: "BRL", period: null}
 */

export interface ParsedSalary {
  min: number;
  max: number;
  currency: string | null;
  period: "monthly" | "yearly" | "hourly" | null;
}

const CURRENCY_MAP: Record<string, string> = {
  "usd": "USD",
  "ars": "ARS",
  "mxn": "MXN",
  "cop": "COP",
  "brl": "BRL",
  "clp": "CLP",
  "pen": "PEN",
  "uyu": "UYU",
};

const PERIOD_MAP: Record<string, ParsedSalary["period"]> = {
  mensual: "monthly",
  mensuales: "monthly",
  mes: "monthly",
  "/mes": "monthly",
  "por mes": "monthly",
  anual: "yearly",
  anuales: "yearly",
  año: "yearly",
  "/año": "yearly",
  "por año": "yearly",
  hora: "hourly",
  "/hora": "hourly",
  "por hora": "hourly",
};

export function parseSalaryText(text: string | undefined | null): ParsedSalary | null {
  if (!text) return null;
  const lower = text.toLowerCase().trim();

  // "a convenir" / "to be agreed" — no number
  if (/a convenir|negociable|a tratar|según experiencia/i.test(text)) {
    return null;
  }

  // Extract currency
  let currency: string | null = null;
  for (const [key, code] of Object.entries(CURRENCY_MAP)) {
    if (lower.includes(key)) {
      currency = code;
      break;
    }
  }

  // Extract period
  let period: ParsedSalary["period"] = null;
  for (const [key, p] of Object.entries(PERIOD_MAP)) {
    if (lower.includes(key)) {
      period = p;
      break;
    }
  }

  // Extract numbers. Handle "25,000" / "25.000" / "25K" / "25k"
  // Spanish: 25.000 = 25000, English: 25,000 = 25000
  // Heuristic: count separators. If has both . and , → rightmost is decimal.
  // If only , and 3 digits after → thousands. If only . and 3 digits after → thousands.
  const numberPattern = /(\d{1,3}(?:[.,]\d{3})+|\d+(?:[,.]\d+)?[kK]?)/g;
  const matches: number[] = [];
  let m;
  while ((m = numberPattern.exec(text)) !== null) {
    const raw = m[1];
    let n = raw.toLowerCase().replace("k", "000");
    // Replace , or . depending on context
    if (n.includes(",") && n.includes(".")) {
      // Both: the rightmost is decimal
      if (n.lastIndexOf(",") > n.lastIndexOf(".")) {
        n = n.replace(/\./g, "").replace(",", ".");
      } else {
        n = n.replace(/,/g, "");
      }
    } else if (n.includes(",")) {
      // Only comma: if 3 digits after → thousands, else decimal
      const parts = n.split(",");
      if (parts[1] && parts[1].length === 3) {
        n = n.replace(/,/g, "");
      } else {
        n = n.replace(",", ".");
      }
    } else if (n.includes(".")) {
      // Only dot: if 3 digits after and no decimals → thousands
      const parts = n.split(".");
      if (parts[1] && parts[1].length === 3 && !n.includes("." + parts[0])) {
        n = n.replace(/\./g, "");
      }
    }
    const num = Number(n);
    if (Number.isFinite(num) && num > 0) {
      matches.push(num);
    }
  }

  if (matches.length === 0) return null;
  if (matches.length === 1) {
    return { min: matches[0], max: matches[0], currency, period };
  }
  const min = Math.min(...matches);
  const max = Math.max(...matches);
  return { min, max, currency, period };
}
