import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const startTime = Date.now();

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "latam-jobs-api",
    version: "0.1.0",
    uptime_seconds: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    env: {
      resend_configured: Boolean(process.env.RESEND_API_KEY),
      send_confirmation: process.env.SEND_CONFIRMATION === "true",
    },
    endpoints: [
      "GET  /",
      "GET  /docs",
      "GET  /recruiters",
      "POST /api/signup",
      "GET  /api/signup",
      "GET  /api/stats",
      "GET  /api/preview?q=&country=",
      "GET  /api/healthz",
    ],
  });
}
