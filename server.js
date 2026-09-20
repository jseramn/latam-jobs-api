// Landing + email capture for latam-jobs-api validation
// Goal: 30+ emails from LATAM recruiters in 48h. If yes -> build the scraper.
import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "signups.jsonl");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Count signups
function countSignups() {
  try {
    if (!fs.existsSync(DATA_FILE)) return 0;
    const lines = fs.readFileSync(DATA_FILE, "utf8").trim().split("\n").filter(Boolean);
    return lines.length;
  } catch {
    return 0;
  }
}

// POST /api/signup
app.post("/api/signup", (req, res) => {
  const { email, role, country } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "invalid_email" });
  }
  const entry = JSON.stringify({
    email: String(email).toLowerCase().trim(),
    role: String(role || "unknown").slice(0, 40),
    country: String(country || "unknown").slice(0, 8),
    ua: req.get("user-agent") || "",
    ts: new Date().toISOString(),
  });
  fs.appendFileSync(DATA_FILE, entry + "\n");
  console.log(`[signup] ${email} role=${role} country=${country} total=${countSignups()}`);
  res.json({ ok: true, total: countSignups() });
});

// GET /api/stats -> public count
app.get("/api/stats", (_req, res) => {
  const total = countSignups();
  const goal = 30;
  res.json({ signups: total, goal, percent: Math.min(100, Math.round((total / goal) * 100)) });
});

// GET /admin/signups -> protected, just for now no auth (dev only)
app.get("/admin/signups", (_req, res) => {
  try {
    const lines = fs.existsSync(DATA_FILE)
      ? fs.readFileSync(DATA_FILE, "utf8").trim().split("\n").filter(Boolean)
      : [];
    const entries = lines.map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    }).filter(Boolean);
    res.json({ total: entries.length, entries });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`[landing] up on http://localhost:${PORT}`);
});
