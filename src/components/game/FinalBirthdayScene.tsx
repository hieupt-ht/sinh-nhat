"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { story } from "@/data/story";

import { Button } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";
import { TypewriterText } from "../ui/TypewriterText";
import { FinalCakeReveal } from "./finale/FinalCakeReveal";
import { FlyingMemoryPhotos } from "./finale/FlyingMemoryPhotos";
import type { FinalScenePhase } from "./finale/types";

const phaseDurations: Partial<Record<FinalScenePhase, number>> = {
  cakeShow: 3000,
  photoOrbit: 2800,
  photoScatter: 1600,
};

const phaseOrder: FinalScenePhase[] = [
  "cakeShow",
  "photoOrbit",
  "photoScatter",
  "finalGreeting",
];

export function FinalBirthdayScene({
  onReplay,
}: {
  onReplay: () => void;
}) {
  const [phase, setPhase] = useState<FinalScenePhase>("cakeShow");

  const nextPhase = useMemo(() => {
    const currentIndex = phaseOrder.indexOf(phase);
    return phaseOrder[currentIndex + 1] ?? null;
  }, [phase]);

  useEffect(() => {
    if (phase === "finalGreeting" || !nextPhase) {
      return;
    }

    const duration = phaseDurations[phase];

    if (!duration) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase(nextPhase);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [nextPhase, phase]);

  return (
    <section className="relative z-10 h-[100dvh] overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,240,191,0.16),transparent_34%),radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_42%),linear-gradient(180deg,rgba(21,14,48,0.08),rgba(8,8,29,0.22))]" />
      <div className="relative mx-auto h-[calc(100dvh-2rem)] w-full max-w-[1500px] overflow-hidden rounded-[34px] border border-white/24 bg-[rgba(255,255,255,0.06)] shadow-[0_38px_85px_rgba(29,12,46,0.18)] backdrop-blur-sm sm:h-[calc(100dvh-3rem)]">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,235,176,0.16),rgba(255,235,176,0)_55%)]"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {[...Array.from({ length: 28 })].map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-2.5 w-2.5 rounded-full bg-white/90"
            style={{
              left: `${(index * 13) % 100}%`,
              top: `${(index * 9) % 100}%`,
            }}
            animate={{ opacity: [0.18, 1, 0.3], scale: [0.7, 1.6, 0.85] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.2 + (index % 5) * 0.25,
              delay: index * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="relative z-10 grid h-full gap-4 p-4 lg:grid-cols-[0.85fr_1.15fr] lg:p-6">
          <div className="flex items-center">
            <GlassPanel className="w-full bg-[rgba(255,248,242,0.9)] p-5 sm:p-6 lg:p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1db] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#98615d]">
                One Last Wish
              </div>
              <h2 className="mt-4 font-display text-3xl leading-[0.98] text-[#5d3950] sm:text-4xl lg:text-5xl">
                {story.final.title}
              </h2>
              <div className="mt-4 min-h-[20rem] sm:min-h-[17rem] lg:min-h-[19rem]">
                <TypewriterText
                  lines={story.final.content}
                  delayMs={16}
                  lineClassName="text-sm leading-7 text-[#6d586c] sm:text-[15px] lg:text-base"
                />
              </div>

              <motion.div
                className="mt-6"
                initial={false}
                animate={{
                  opacity: phase === "finalGreeting" ? 1 : 0.72,
                  y: phase === "finalGreeting" ? 0 : 8,
                }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-display text-2xl text-[#5a3951] sm:text-3xl">
                  Happy Birthday, Linh.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6d586c] sm:text-base">
                  From Hiếu, with all my heart.
                </p>
                {phase === "finalGreeting" ? (
                  <Button className="mt-5" onClick={onReplay}>
                    Replay Journey
                  </Button>
                ) : null}
              </motion.div>
            </GlassPanel>
          </div>

          <div className="relative min-h-[48dvh] overflow-hidden rounded-[30px] border border-white/28 bg-[rgba(255,255,255,0.08)] shadow-[0_30px_70px_rgba(29,12,46,0.18)] backdrop-blur-sm sm:min-h-[54dvh] lg:min-h-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,243,199,0.18),transparent_46%)]" />
            <motion.div className="absolute inset-0" animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
              <FinalCakeReveal phase={phase} />
              <FlyingMemoryPhotos phase={phase} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
