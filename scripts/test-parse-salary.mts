// Smoke test for parse-salary — run with `node --experimental-strip-types scripts/test-parse-salary.mts`
import { parseSalaryText } from "../src/lib/scrapers/parse-salary.ts";

const cases: Array<[string, unknown]> = [
  ["MXN 25,000 - 35,000 mensuales", { min: 25000, max: 35000, currency: "MXN", period: "monthly" }],
  ["ARS 850.000 - 1.200.000 mensual", { min: 850000, max: 1200000, currency: "ARS", period: "monthly" }],
  ["$45K USD", { min: 45000, max: 45000, currency: "USD", period: null }],
  ["BRL 8.000 - 12.000", { min: 8000, max: 12000, currency: "BRL", period: null }],
  ["a convenir", null],
  ["según experiencia", null],
  ["USD 4,500 - 7,200 monthly", { min: 4500, max: 7200, currency: "USD", period: null }],
  ["MXN 25,000", { min: 25000, max: 25000, currency: "MXN", period: null }],
  ["", null],
  ["salario competitivo", null],
];

let passed = 0;
let failed = 0;
for (const [input, expected] of cases) {
  const result = parseSalaryText(input);
  const ok = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`${ok ? "✓" : "✗"} "${input}" → ${JSON.stringify(result)}`);
  if (!ok) {
    console.log(`  expected: ${JSON.stringify(expected)}`);
    failed++;
  } else passed++;
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
