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

const CHARS = "▓▒░█▄▀■□◇◈◉●◐◑◒◓╔╗╚╝║═╬╠╣╦╩├┤┬┴┼━┃┏┓┗┛<>/\\|-+*#@$%&";

export function AsciiScramble({
  text,
  className = "",
  duration = 1200,
  scrambleChars = CHARS,
  trigger = "mount",
  loop = false,
  loopDelay = 3000,
}: AsciiScrambleProps) {
  const [display, setDisplay] = useState(
    trigger === "mount" ? text : text.replace(/./g, () => pick(scrambleChars)),
  );
  const [running, setRunning] = useState(trigger === "mount");
  const ref = useRef<HTMLElement>(null);

  function pick(charset: string): string {
    return charset[Math.floor(Math.random() * charset.length)];
  }

  function run() {
    setRunning(true);
    const start = Date.now();
    const total = duration;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / total, 1);
      const revealed = Math.floor(progress * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            i < revealed
              ? ch
              : ch === " "
              ? " "
              : pick(scrambleChars),
          )
          .join(""),
      );
      if (progress >= 1) {
        clearInterval(interval);
        setDisplay(text);
        setRunning(false);
        if (loop) {
          setTimeout(() => {
            setDisplay(text.replace(/./g, () => pick(scrambleChars)));
            run();
          }, loopDelay);
        }
      }
    }, 32);
  }

  useEffect(() => {
    if (trigger === "mount") {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
