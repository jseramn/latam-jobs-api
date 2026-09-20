"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiSweepProps {
  className?: string;
  height?: number;
  speed?: number;
  density?: number;
  color?: string;
}

const SWEEP_CHARS = "─━│┃┄┆┈┉╿╽╏║╎╍┼┿╋";

export function AsciiSweep({
  className = "",
  height = 60,
  speed = 18,
  density = 0.35,
  color = "var(--accent)",
}: AsciiSweepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(-10);

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
      { threshold: 0.1 },
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
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      setPosition((p) => {
        const next = p + (dt / 1000) * speed;
        return next > width + 10 ? -10 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, width, speed]);

  const cols = Math.max(1, Math.floor(width / 8));
  const lines = Array.from({ length: Math.floor(height / 14) }, (_, i) => i);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
      aria-hidden
    >
      <div
        className="absolute inset-0 font-mono text-[10px] leading-[14px]"
        style={{ color }}
      >
        {lines.map((row) => (
          <div key={row} className="flex">
            {Array.from({ length: cols }, (_, col) => {
              const dist = Math.abs(col * 8 + 4 - position);
              const intensity = Math.max(0, 1 - dist / 60);
              const show = intensity > 0 && Math.random() < density;
              return (
                <span
                  key={col}
                  className="w-2 inline-block text-center"
                  style={{ opacity: show ? intensity * 0.8 : 0.06 }}
                >
                  {show
                    ? SWEEP_CHARS[Math.floor(Math.random() * SWEEP_CHARS.length)]
                    : "·"}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{
          left: position,
          background: `linear-gradient(to bottom, transparent, ${color} 30%, ${color} 70%, transparent)`,
          boxShadow: `0 0 12px ${color}`,
          opacity: 0.7,
        }}
      />
    </div>
  );
}
