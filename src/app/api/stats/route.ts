import { NextResponse } from "next/server";
import { getContactCount, resendConfigured } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!resendConfigured) {
    return NextResponse.json({
      signups: "unknown",
      goal: 30,
      percent: 0,
      configured: false,
    });
  }
  const count = await getContactCount();
  const goal = 30;
  const percent =
    typeof count === "number" ? Math.min(100, Math.round((count / goal) * 100)) : 0;
  return NextResponse.json({
    signups: count ?? "unknown",
    goal,
    percent,
    configured: true,
  });
}
