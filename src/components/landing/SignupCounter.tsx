"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  goal?: number;
}

export function SignupCounter({ goal = 30 }: CounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const r = await fetch("/api/stats", { cache: "no-store" });
        if (!r.ok) return;
        const data = (await r.json()) as { signups?: number | string };
        if (typeof data.signups === "number") {
          setCount(data.signups);
        }
      } catch {
        // silent fail — counter stays null
      }
    };
    fetchCount();
    // refresh every 60s
    const t = setInterval(fetchCount, 60_000);
    return () => clearInterval(t);
  }, []);

  const display = count === null ? "—" : count.toString();
  const percent = count === null ? 0 : Math.min(100, Math.round((count / goal) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted">
          <strong className="text-foreground font-mono text-base">{display}</strong> de{" "}
          <strong className="font-mono">{goal}</strong> recruiters
        </span>
        <span className="text-muted font-mono">{percent}%</span>
      </div>
      <div className="h-1.5 bg-border overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
