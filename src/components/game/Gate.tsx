"use client";

import { Check, Cloud, Flower2, Gift, Lamp, MoonStar, Sparkles, TreePine, UtensilsCrossed, Waves, Wind } from "lucide-react";
import { motion } from "framer-motion";

import type { BackgroundTheme } from "@/data/backgrounds";
import { cn } from "@/lib/utils";

type GateProps = {
  index: number;
  theme: BackgroundTheme;
  status: "locked" | "next" | "done";
  x: number;
  y: number;
  isActive?: boolean;
  interactive?: boolean;
  onClick?: () => void;
};

const iconMap = {
  Flower2,
  MoonStar,
  TreePine,
  Wind,
  UtensilsCrossed,
  Waves,
  Lamp,
  Cloud,
  Sparkles,
  Gift,
} as const;

export function Gate({
  index,
  theme,
  status,
  x,
  y,
  isActive = false,
  interactive = false,
  onClick,
}: GateProps) {
  const Icon = iconMap[theme.icon as keyof typeof iconMap] ?? Sparkles;
  const isLocked = status === "locked";
  const isDone = status === "done";

  return (
    <motion.button
      type="button"
      className={cn(
        "absolute z-20 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85",
        interactive ? "cursor-pointer" : "cursor-default",
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={false}
      animate={{ scale: status === "next" ? [1, 1.06, 1] : 1 }}
      transition={{ repeat: status === "next" ? Number.POSITIVE_INFINITY : 0, duration: 2.3 }}
      onClick={interactive ? onClick : undefined}
      disabled={!interactive}
      aria-label={`Gate ${index}`}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <span
          className="absolute inset-[-14px] rounded-full blur-2xl"
          style={{ background: theme.palette.gateGlow, opacity: isLocked ? 0.25 : 0.85 }}
        />
        <div
          className={cn(
            "relative flex h-16 w-16 items-center justify-center rounded-[26px] border border-white/60 bg-white/35 backdrop-blur-md shadow-[0_20px_30px_rgba(42,18,54,0.16)] sm:h-20 sm:w-20",
            isLocked ? "opacity-55 saturate-75" : "",
            isDone ? "ring-2 ring-white/85" : "",
            isActive ? "scale-[1.04] ring-2 ring-amber-200/90" : "",
          )}
        >
          <span
            className="absolute inset-[6px] rounded-[20px] opacity-90"
            style={{
              background: `linear-gradient(180deg, ${theme.palette.accent}, rgba(255,255,255,0.36))`,
            }}
          />
          <Icon className="relative h-7 w-7 text-[#5c3556] sm:h-8 sm:w-8" strokeWidth={1.8} />
          {isDone ? (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-white shadow-lg">
              <Check className="h-4 w-4" />
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-center font-medium tracking-[0.06em] text-white/92 drop-shadow-[0_2px_8px_rgba(35,14,49,0.35)]">
          {index}
        </p>
      </div>
    </motion.button>
  );
}
