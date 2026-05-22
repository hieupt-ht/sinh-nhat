"use client";

import { motion } from "framer-motion";
import { Map } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { gateBackgrounds } from "@/data/backgrounds";
import {
  JOURNEY_POINTS,
  MOBILE_JOURNEY_POINTS,
  TOTAL_GATES,
  TOTAL_MEMORIES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Character } from "./Character";
import { Gate } from "./Gate";
import { ProgressBar } from "./ProgressBar";

type JourneyMapProps = {
  currentGate: number;
  viewedGate: number;
  completedGates: number[];
  collectedMemories: number;
  isMoving: boolean;
  journeyComplete: boolean;
  onMove: () => void;
  onPreviewGate: (gateId: number) => void;
  onFocusCurrentGate: () => void;
};

function buildPath(points: ReadonlyArray<{ x: number; y: number }>) {
  return points.reduce((accumulator, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const cx = (previous.x + point.x) / 2;
    const cy = Math.min(previous.y, point.y) - 8;
    return `${accumulator} Q ${cx} ${cy}, ${point.x} ${point.y}`;
  }, "");
}

export function JourneyMap({
  currentGate,
  viewedGate,
  completedGates,
  collectedMemories,
  isMoving,
  journeyComplete,
  onMove,
  onPreviewGate,
  onFocusCurrentGate,
}: JourneyMapProps) {
  const [isMobile, setIsMobile] = useState(false);
  const currentTheme = gateBackgrounds[currentGate - 1] ?? gateBackgrounds[0];
  const activeBackgrounds = gateBackgrounds.slice(0, TOTAL_GATES);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const points = isMobile ? MOBILE_JOURNEY_POINTS : JOURNEY_POINTS;
  const path = useMemo(() => buildPath(points), [points]);
  const completedCount = completedGates.length;
  const restingPoint = points[Math.min(completedCount, TOTAL_GATES)];
  const activePoint = points[Math.min(isMoving ? currentGate : viewedGate, TOTAL_GATES)];
  const isPreviewing = viewedGate !== currentGate;
  const previewTheme = gateBackgrounds[viewedGate - 1] ?? currentTheme;

  const ctaLabel = journeyComplete
    ? isPreviewing
      ? `Return to Gate ${currentGate}`
      : "Journey Complete"
    : isPreviewing
      ? `Return to Gate ${currentGate}`
      : isMoving
        ? `Walking to Gate ${currentGate}...`
        : `Go to Gate ${currentGate}`;

  const handlePrimaryAction = () => {
    if (isPreviewing) {
      onFocusCurrentGate();
      return;
    }

    if (!journeyComplete) {
      onMove();
    }
  };

  return (
    <section className="relative z-10 flex h-[100dvh] flex-col justify-between overflow-hidden px-4 pb-24 pt-18 sm:px-6 sm:pb-6 sm:pt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <GlassPanel className="max-w-xl bg-[rgba(255,250,248,0.74)] p-4 sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1f8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5578]">
              <Map className="h-4 w-4" />
              Storybook Map
            </div>
            <h1 className="mt-3 font-display text-3xl leading-tight text-[#55354b] sm:text-4xl">
              {previewTheme.name}
            </h1>
          </GlassPanel>

          <div className="w-full max-w-xl shrink-0">
            <ProgressBar currentGate={currentGate} collected={completedCount} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-white/96 sm:text-sm">
          <span className="rounded-full bg-[rgba(63,40,78,0.62)] px-3 py-1.5 shadow-[0_10px_24px_rgba(33,18,45,0.16)]">
            Current gate: {currentGate}/{TOTAL_GATES}
          </span>
          <span className="rounded-full bg-[rgba(63,40,78,0.62)] px-3 py-1.5 shadow-[0_10px_24px_rgba(33,18,45,0.16)]">
            Viewing scene: Gate {viewedGate}
          </span>
          <span className="rounded-full bg-[rgba(63,40,78,0.62)] px-3 py-1.5 shadow-[0_10px_24px_rgba(33,18,45,0.16)]">
            Unlocked memories: {completedGates.length}/{TOTAL_GATES} gates
          </span>
          <span className="rounded-full bg-[rgba(63,40,78,0.62)] px-3 py-1.5 shadow-[0_10px_24px_rgba(33,18,45,0.16)]">
            Album progress: {collectedMemories}/{TOTAL_MEMORIES}
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-3 h-[calc(100dvh-220px)] min-h-[350px] w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/38 bg-[rgba(255,255,255,0.12)] shadow-[0_28px_70px_rgba(25,12,40,0.14)] backdrop-blur-sm sm:h-[calc(100dvh-190px)] sm:min-h-[420px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,14,42,0.02),rgba(28,14,42,0.12))]" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path
            d={path}
            fill="none"
            stroke="rgba(255, 248, 214, 0.92)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray="1 0"
          />
          <path
            d={path}
            fill="none"
            stroke="rgba(255, 255, 255, 0.48)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>

        {activeBackgrounds.map((theme, index) => {
          const gateId = index + 1;
          const point = points[gateId];
          const status = completedGates.includes(gateId)
            ? "done"
            : gateId === currentGate
              ? "next"
              : "locked";

          return (
            <Gate
              key={theme.id}
              index={gateId}
              theme={theme}
              status={status}
              x={point.x}
              y={point.y}
              isActive={gateId === viewedGate}
              interactive={completedGates.includes(gateId) || gateId === currentGate}
              onClick={() => {
                if (gateId === currentGate) {
                  onFocusCurrentGate();
                  return;
                }

                if (completedGates.includes(gateId)) {
                  onPreviewGate(gateId);
                }
              }}
            />
          );
        })}

        <motion.div
          className="absolute z-30 -translate-x-1/2 -translate-y-[85%]"
          animate={{
            left: `${activePoint.x}%`,
            top: `${activePoint.y}%`,
          }}
          transition={{ duration: isMoving ? 1.8 : 0.55, ease: "easeInOut" }}
        >
          <Character isMoving={isMoving} />
        </motion.div>

        {!isMoving && completedCount > 0 ? (
          <div
            className="absolute z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl"
            style={{ left: `${restingPoint.x}%`, top: `${restingPoint.y}%` }}
          />
        ) : null}

        <div className="absolute bottom-20 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 sm:bottom-5">
          <Button
            className={cn(
              "w-full",
              isMoving ? "cursor-wait" : "",
            )}
            onClick={handlePrimaryAction}
            disabled={isMoving || (!isPreviewing && journeyComplete)}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
