"use client";

import { useEffect, useRef, useState } from "react";

interface DecryptRevealProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const CIPHER = "█▓▒░";

export function DecryptReveal({
  children,
  className = "",
  duration = 900,
  delay = 0,
}: DecryptRevealProps) {
  const [display, setDisplay] = useState(children.replace(/./g, () => pick(CIPHER)));
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  function pick(charset: string): string {
    return charset[Math.floor(Math.random() * charset.length)];
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => {
            const start = Date.now();
            const total = duration;
            const interval = setInterval(() => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / total, 1);
              const revealed = Math.floor(progress * children.length);
              setDisplay(
                children
                  .split("")
                  .map((ch, i) =>
                    i < revealed
                      ? ch
                      : ch === " "
                      ? " "
                      : pick(CIPHER),
                  )
                  .join(""),
              );
              if (progress >= 1) {
                clearInterval(interval);
                setDisplay(children);
              }
            }, 28);
          }, delay);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [children, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={children}>
      {display}
    </span>
  );
}
