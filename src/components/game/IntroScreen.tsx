"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

import { story } from "@/data/story";

import { Button } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";
import { TypewriterText } from "../ui/TypewriterText";

type IntroScreenProps = {
  onStart: () => void;
  onResume: () => void;
  onViewUnlockedGates: () => void;
  onReset: () => void;
  isHydrated: boolean;
  canResume: boolean;
  canViewUnlockedGates: boolean;
  resumeGate: number;
  hasCompletedJourney: boolean;
};

export function IntroScreen({
  onStart,
  onResume,
  onViewUnlockedGates,
  onReset,
  isHydrated,
  canResume,
  canViewUnlockedGates,
  resumeGate,
  hasCompletedJourney,
}: IntroScreenProps) {
  return (
    <motion.section
      className="relative z-10 flex h-[100dvh] items-center justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div className="mx-auto grid h-full w-full max-w-6xl items-center gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="hidden lg:block">
          <motion.div
            className="relative mx-auto aspect-[4/5] max-w-[360px] rounded-[32px] border border-white/55 bg-[rgba(255,248,250,0.3)] p-6 shadow-[0_30px_70px_rgba(54,26,73,0.16)] backdrop-blur-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,245,248,0.08))]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/58 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8e4a71] shadow-[0_8px_18px_rgba(98,54,83,0.08)]">
                  <Sparkles className="h-4 w-4" />
                  Storybook Gift
                </p>
                <h2 className="font-display text-3xl leading-tight text-[#5d3950] drop-shadow-[0_1px_1px_rgba(255,255,255,0.38)]">
                  A soft little path,
                  <br />
                  made for Linh.
                </h2>
              </div>
              <div className="rounded-[24px] border border-white/55 bg-white/28 p-5 text-[#6c4960] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                <p className="font-display text-xl">From Hieu</p>
              </div>
            </div>
          </motion.div>
        </div>

        <GlassPanel className="mx-auto w-full max-w-2xl p-5 sm:p-6 lg:p-7">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8e4a71]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <Heart className="h-4 w-4" />
            Birthday Storybook
          </motion.div>

          <motion.h1
            className="font-display text-4xl leading-[0.95] text-[#5c3556] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            A Birthday
            <br />
            Journey for Linh
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl text-sm leading-7 text-[#6f4c68] sm:text-base"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
          >
            Ten little gates, ten memories, and one small gift from Hiếu.
          </motion.p>

          <div className="mt-5 rounded-[24px] border border-white/55 bg-white/52 p-4 sm:p-5">
            <h2 className="font-display text-2xl text-[#68415d] sm:text-[2rem]">
              {story.intro.title}
            </h2>
            <TypewriterText
              lines={story.intro.content}
              className="mt-4"
              lineClassName="text-sm leading-7 sm:text-[15px] text-[#6d5872]"
            />
          </div>

          <motion.div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            {!isHydrated ? (
              <Button className="sm:min-w-[220px]" disabled>
                Preparing the story...
              </Button>
            ) : canResume ? (
              <>
                <Button className="sm:min-w-[220px]" onClick={onResume}>
                  {hasCompletedJourney ? "View the Finale" : `Continue at Gate ${resumeGate}`}
                </Button>
                {canViewUnlockedGates ? (
                  <Button variant="secondary" className="sm:min-w-[220px]" onClick={onViewUnlockedGates}>
                    View Unlocked Gates
                  </Button>
                ) : null}
                <Button variant="secondary" className="sm:min-w-[180px]" onClick={onReset}>
                  Start Over
                </Button>
              </>
            ) : (
              <Button className="sm:min-w-[220px]" onClick={onStart}>
                Start the Journey
              </Button>
            )}
          </motion.div>
        </GlassPanel>
      </div>
    </motion.section>
  );
}
