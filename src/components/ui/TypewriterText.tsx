"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { cn, prefersReducedMotion } from "@/lib/utils";

type TypewriterTextProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delayMs?: number;
};

export function TypewriterText({
  lines,
  className,
  lineClassName,
  delayMs = 18,
}: TypewriterTextProps) {
  const reduced = useMemo(() => prefersReducedMotion(), []);

  if (reduced) {
    return (
      <div className={cn("space-y-3", className)}>
        {lines.map((line, index) => (
          <motion.p
            key={`${index}-${line}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={cn("leading-7 text-slate-700/90", lineClassName)}
          >
            {line}
          </motion.p>
        ))}
      </div>
    );
  }

  return (
    <AnimatedTypewriter
      key={lines.join("|")}
      lines={lines}
      className={className}
      lineClassName={lineClassName}
      delayMs={delayMs}
    />
  );
}

function AnimatedTypewriter({
  lines,
  className,
  lineClassName,
  delayMs,
}: TypewriterTextProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>(lines.map(() => ""));

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const output = lines.map(() => "");
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
        const line = lines[lineIndex];
        for (let charIndex = 0; charIndex <= line.length; charIndex += 1) {
          if (cancelled) {
            return;
          }
          output[lineIndex] = line.slice(0, charIndex);
          setVisibleLines([...output]);
          await new Promise((resolve) => window.setTimeout(resolve, delayMs));
        }
        await new Promise((resolve) => window.setTimeout(resolve, 140));
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [delayMs, lines]);

  return (
    <div className={cn("space-y-3", className)}>
      {visibleLines.map((line, index) => (
        <motion.p
          key={`${index}-${lines[index]}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.12 }}
          className={cn("leading-7 text-slate-700/90", lineClassName)}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
