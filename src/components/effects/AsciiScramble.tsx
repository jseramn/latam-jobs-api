"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  scrambleChars?: string;
  trigger?: "mount" | "hover" | "visible";
  loop?: boolean;
  loopDelay?: number;
}

// Más chars visuales para el efecto terminal/ficiente
const CHARS =
  "░▒▓█▀▄╔╗╚╝║═╠╣┃┏┓┗┛┠╂┯┰┱┲┳┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╃╄╅╆╇╈╉╊╋╍╎╏┿╹╺╻╼╽╾╿";

export function AsciiScramble({
  text,
  className = "",
  duration = 450,
  scrambleChars = CHARS,
  trigger = "mount",
  loop = false,
  loopDelay = 1000,
}: AsciiScrambleProps) {
  const [display, setDisplay] = useState(
    trigger === "mount" ? text : text.replace(/./g, () => pick(scrambleChars)),
  );
  const [running, setRunning] = useState(trigger === "mount");
  const ref = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  function pick(charset: string): string {
    return charset[Math.floor(Math.random() * charset.length)];
  }

  // Scrambled initial state for non-mount triggers
  function scrambleText(t: string): string {
    return t.replace(/./g, (ch) => (ch === " " ? " " : pick(scrambleChars)));
  }

  function run() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(true);
    setDisplay(scrambleText(text));

    const start = performance.now();
    const total = Math.max(80, duration);
    const step = 14; // ~70fps de actualización del texto

    let lastTick = start;
    let frame: number;

    function tick(now: number) {
      if (now - lastTick >= step) {
        lastTick = now;
        const elapsed = now - start;
        const progress = Math.min(elapsed / total, 1);
        const revealed = Math.floor(progress * text.length);

        setDisplay(
          text
            .split("")
            .map((ch, i) =>
              i < revealed ? ch : ch === " " ? " " : pick(scrambleChars),
            )
            .join(""),
        );

        if (progress >= 1) {
          // Un frame más de scrambling aleatorio para tail effect
          setDisplay(
            text
              .split("")
              .map((ch, i) =>
                i < text.length ? ch : pick(scrambleChars),
              )
              .join(""),
          );
          rafRef.current = requestAnimationFrame(() => {
            setDisplay(text);
            setRunning(false);
            rafRef.current = null;
            if (loop) {
              setTimeout(() => {
                setDisplay(scrambleText(text));
                run();
              }, loopDelay);
            }
          });
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (trigger === "mount") {
      // Small delay to avoid flash on SSR/first paint
      const t = setTimeout(run, 30);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (trigger !== "visible") return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          run();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, running]);

  const onMouseEnter = () => {
    if (trigger === "hover" && !running) run();
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={onMouseEnter}
      aria-label={text}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {display}
    </span>
  );
}
