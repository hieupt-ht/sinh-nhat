"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Stars } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { story } from "@/data/story";

import type { FinalScenePhase } from "./types";

export function FinalMessageOverlay({
  phase,
  onContinue,
  onReplay,
}: {
  phase: FinalScenePhase;
  onContinue: () => void;
  onReplay: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {phase === "cakeShow" ? (
        <motion.div
          key="cakeShow"
          className="absolute inset-0 z-30 flex items-center justify-center px-4 py-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28, scale: 0.96 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlassPanel className="w-full max-w-3xl bg-[rgba(255,248,242,0.9)] p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1db] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#98615d]">
              <Stars className="h-4 w-4" />
              One Last Wish
            </div>
            <h2 className="mt-5 font-display text-4xl leading-[0.98] text-[#5d3950] sm:text-5xl lg:text-6xl">
              {story.final.title}
            </h2>
            <div className="mt-6 space-y-4">
              {story.final.content.map((line, index) => (
                <motion.p
                  key={`${index}-${line}`}
                  className="text-sm leading-8 text-[#6d586c] sm:text-base lg:text-lg"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.12, duration: 0.6 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-[#7e687d]">
                The final celebration begins in a moment.
              </p>
              <Button onClick={onContinue}>Continue to the Wish</Button>
            </div>
          </GlassPanel>
        </motion.div>
      ) : null}

      {phase === "finalGreeting" ? (
        <motion.div
          key="finalGreeting"
          className="absolute inset-x-4 bottom-6 z-40 flex justify-center sm:inset-x-8 sm:bottom-10"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <div className="w-full max-w-xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,246,220,0.2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-md">
              <Heart className="h-4 w-4" />
              Final Greeting
            </div>
            <p className="mt-5 font-display text-4xl text-white drop-shadow-[0_8px_28px_rgba(31,14,46,0.5)] sm:text-6xl">
              Happy Birthday, Linh.
            </p>
            <p className="mt-3 text-base leading-7 text-white/88 drop-shadow-[0_4px_18px_rgba(31,14,46,0.45)] sm:text-lg">
              From Hiếu, with all my heart.
            </p>
            <div className="mt-6">
              <Button className="shadow-[0_24px_45px_rgba(31,14,46,0.28)]" onClick={onReplay}>
                Replay Journey
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
