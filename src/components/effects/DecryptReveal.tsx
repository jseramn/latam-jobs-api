"use client";

import { useEffect, useRef, useState } from "react";

interface DecryptRevealProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const CIPHER = "░▒▓█";

export function DecryptReveal({
  children,
  className = "",
  duration = 500,
  delay = 0,
}: DecryptRevealProps) {
  const [display, setDisplay] = useState(
    children.replace(/./g, () => pick(CIPHER)),
  );
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const rafRef = useRef<number | null>(null);

  function pick(charset: string): string {
    return charset[Math.floor(Math.random() * charset.length)];
  }

  function scrambleText(t: string): string {
    return t.replace(/./g, (ch) => (ch === " " ? " " : pick(CIPHER)));
  }

  function runReveal() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const total = Math.max(60, duration);
    const step = 10;

    let lastTick = start;

    function tick(now: number) {
      if (now - lastTick >= step) {
        lastTick = now;
        const elapsed = now - start;
        const progress = Math.min(elapsed / total, 1);
        const revealed = Math.floor(progress * children.length);

        setDisplay(
          children
            .split("")
            .map((ch, i) =>
              i < revealed ? ch : ch === " " ? " " : pick(CIPHER),
            )
            .join(""),
        );

        if (progress >= 1) {
          setDisplay(children);
          rafRef.current = null;
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(runReveal, delay);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [children, duration, delay]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <span ref={ref} className={className} aria-label={children}>
      {display}
    </span>
  );
}
