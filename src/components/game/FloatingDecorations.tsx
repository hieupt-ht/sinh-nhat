"use client";

import { motion } from "framer-motion";

import type { DecorationSpec } from "@/data/backgrounds";
import { cn } from "@/lib/utils";

function DecorationShape({ kind }: { kind: DecorationSpec["kind"] }) {
  switch (kind) {
    case "butterfly":
      return (
        <div className="relative h-full w-full">
          <span className="absolute left-[7%] top-[22%] h-[48%] w-[36%] rounded-full bg-pink-300/80 blur-[0.3px]" />
          <span className="absolute right-[7%] top-[22%] h-[48%] w-[36%] rounded-full bg-amber-200/90 blur-[0.3px]" />
          <span className="absolute left-[28%] top-[8%] h-[76%] w-[44%] rounded-full bg-white/50" />
        </div>
      );
    case "sparkle":
    case "star":
      return (
        <div className="relative h-full w-full">
          <span className="absolute left-1/2 top-0 h-full w-[22%] -translate-x-1/2 rounded-full bg-white/90" />
          <span className="absolute left-0 top-1/2 h-[22%] w-full -translate-y-1/2 rounded-full bg-white/85" />
        </div>
      );
    case "flower":
      return (
        <div className="relative h-full w-full">
          <span className="absolute left-[32%] top-[4%] h-[34%] w-[34%] rounded-full bg-pink-200/90" />
          <span className="absolute left-[6%] top-[33%] h-[34%] w-[34%] rounded-full bg-pink-200/90" />
          <span className="absolute right-[6%] top-[33%] h-[34%] w-[34%] rounded-full bg-pink-200/90" />
          <span className="absolute left-[32%] bottom-[4%] h-[34%] w-[34%] rounded-full bg-pink-200/90" />
          <span className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200" />
        </div>
      );
    case "firefly":
      return <span className="block h-full w-full rounded-full bg-amber-200 shadow-[0_0_18px_rgba(255,220,132,0.92)]" />;
    case "cloud":
      return (
        <div className="relative h-full w-full rounded-full bg-white/75">
          <span className="absolute left-[8%] top-[36%] h-[42%] w-[34%] rounded-full bg-white/90" />
          <span className="absolute left-[26%] top-[16%] h-[52%] w-[34%] rounded-full bg-white/95" />
          <span className="absolute right-[10%] top-[28%] h-[46%] w-[34%] rounded-full bg-white/88" />
        </div>
      );
    case "fish":
      return (
        <div className="relative h-full w-full rounded-[50%_45%_50%_45%] bg-sky-200/80">
          <span className="absolute right-[-14%] top-[28%] h-[40%] w-[28%] rotate-45 border-r-[7px] border-t-[7px] border-r-sky-200/80 border-t-sky-200/80" />
        </div>
      );
    case "leaf":
    case "petal":
      return <span className="block h-full w-full rounded-[70%_0_70%_0] bg-emerald-200/80" />;
    case "wave":
      return (
        <div className="relative h-full w-full">
          <span className="absolute inset-x-0 top-[42%] h-[16%] rounded-full bg-white/75" />
          <span className="absolute inset-x-[10%] top-[22%] h-[16%] rounded-full bg-white/55" />
          <span className="absolute inset-x-[16%] top-[62%] h-[16%] rounded-full bg-white/45" />
        </div>
      );
    case "shell":
      return <span className="block h-full w-full rounded-[50%_50%_0_0] bg-rose-100/90" />;
    case "lantern":
      return (
        <div className="relative h-full w-full">
          <span className="absolute left-1/2 top-0 h-[24%] w-[10%] -translate-x-1/2 rounded-full bg-white/70" />
          <span className="absolute inset-x-[18%] top-[18%] h-[58%] rounded-[40%_40%_30%_30%] bg-amber-200/95 shadow-[0_0_18px_rgba(255,210,127,0.85)]" />
          <span className="absolute left-1/2 top-[78%] h-[18%] w-[8%] -translate-x-1/2 rounded-full bg-white/70" />
        </div>
      );
    case "balloon":
      return (
        <div className="relative h-full w-full">
          <span className="absolute inset-x-[18%] top-0 h-[78%] rounded-full bg-pink-200/92 shadow-[0_0_18px_rgba(255,171,204,0.45)]" />
          <span className="absolute left-1/2 top-[76%] h-[24%] w-[2px] -translate-x-1/2 bg-white/80" />
        </div>
      );
    default:
      return <span className="block h-full w-full rounded-full bg-white/60" />;
  }
}

export function FloatingDecorations({
  decorations,
  className,
}: {
  decorations: DecorationSpec[];
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {decorations.map((item, index) => (
        <motion.div
          key={`${item.kind}-${index}-${item.x}-${item.y}`}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
            opacity: item.opacity ?? 1,
          }}
          animate={{
            y: [0, -10, 0, 8, 0],
            x: item.kind === "cloud" ? [0, 12, 0] : [0, 4, -3, 0],
            rotate: ["leaf", "petal", "butterfly"].includes(item.kind)
              ? [0, 8, -6, 0]
              : [0, 0, 0],
            scale: item.kind === "sparkle" || item.kind === "star" ? [0.9, 1.15, 0.95] : [1, 1.04, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: item.duration,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className={cn(
              "h-full w-full",
              item.kind === "sparkle" || item.kind === "star" ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" : "",
            )}
          >
            <DecorationShape kind={item.kind} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
