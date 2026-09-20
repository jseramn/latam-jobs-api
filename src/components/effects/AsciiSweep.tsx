"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiSweepProps {
  className?: string;
  height?: number;
  speed?: number;
  density?: number;
  color?: string;
}

// Más caracteres de línea para el barrido
const SWEEP_CHARS =
  "─━│┃┄┆┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋┿";

export function AsciiSweep({
  className = "",
  height = 50,
  speed = 45,
  density = 0.55,
  color = "var(--accent)",
}: AsciiSweepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(-15);
  const [seed, setSeed] = useState(Math.random() * 1000);

  // Refresh random seed when becoming visible so pattern changes each time
  useEffect(() => {
    if (visible) {
      const id = setTimeout(() => setSeed(Math.random() * 1000), 60);
      return () => clearTimeout(id);
    }
  }, [visible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(el);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);

    return () => {
      ro.disconnect();
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible || width === 0) return;

    let raf: number;
    let last = performance.now();

    function tick(t: number) {
      const dt = (t - last) / 1000;
      last = t;
      setPosition((p) => {
        const next = p + dt * speed * 60; // speed in "characters per second"
        return next > width + 20 ? -20 : next;
      });
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, width, speed]);

  // Column width tighter for sharper look
  const colWidth = 6;
  const cols = Math.max(1, Math.floor(width / colWidth));
  const lineHeight = 13;
  const lines = Array.from({ length: Math.max(1, Math.floor(height / lineHeight)) }, (_, i) => i);

  // Deterministic pseudo-random based on seed + coords
  function seededRandom(col: number, row: number): number {
    const x = Math.sin(col * 127.1 + row * 311.7 + seed) * 43758.5453;
    return x - Math.floor(x);
  }

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
      aria-hidden
    >
      <div
        className="absolute inset-0 font-mono text-[9px] leading-[13px]"
        style={{ color }}
      >
        {lines.map((row) => (
          <div key={row} className="flex" style={{ width: width, flexWrap: "nowrap" }}>
            {Array.from({ length: cols }, (_, col) => {
              const dist = Math.abs(col * colWidth + colWidth / 2 - position);
              const intensity = Math.max(0, 1 - dist / 70);
              const rnd = seededRandom(col, row);
              const show = intensity > 0.05 && rnd < density;

              return (
                <span
                  key={col}
                  className="inline-block text-center w-[6px]"
                  style={{
                    opacity: show ? Math.min(1, intensity * 1.1) : 0.04,
                    color: show && intensity > 0.4 ? "var(--foreground)" : undefined,
                  }}
                >
                  {show
                    ? SWEEP_CHARS[Math.floor(rnd * SWEEP_CHARS.length)]
                    : "·"}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Barrido principal: línea brillante vertical */}
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{
          left: position,
          background: `linear-gradient(to bottom, transparent 0%, ${color} 25%, ${color} 75%, transparent 100%)`,
          boxShadow: `0 0 14px 3px ${color}`,
          opacity: 0.85,
        }}
      />

      {/* Secundaria: línea más tenue detrás */}
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{
          left: position - 12,
          background: `linear-gradient(to bottom, transparent, ${color} 40%, ${color} 60%, transparent)`,
          opacity: 0.25,
        }}
      />
    </div>
  );
}
