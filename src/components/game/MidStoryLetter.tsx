"use client";

import { motion } from "framer-motion";
import { BookHeart } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { story } from "@/data/story";

export function MidStoryLetter({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <section className="relative z-10 flex h-[100dvh] items-center justify-center overflow-hidden px-4 py-6 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <GlassPanel className="overflow-visible p-4 sm:p-6">
          <div className="absolute -right-3 -top-3 hidden h-20 w-20 rotate-12 rounded-[26px] bg-[linear-gradient(135deg,#ffd6a8,#ffa1c5)] shadow-[0_20px_32px_rgba(110,53,82,0.18)] sm:block" />
          <div className="absolute -left-2 top-12 hidden h-12 w-12 rounded-full bg-amber-100/70 blur-xl sm:block" />

          <div className="relative rounded-[28px] border border-white/55 bg-[rgba(255,250,241,0.82)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:p-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fff0da] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9a6a56]">
              <BookHeart className="h-4 w-4" />
              Midway Letter
            </div>
            <h2 className="font-display text-3xl leading-tight text-[#6e4a5a] sm:text-4xl">
              {story.middle.title}
            </h2>
            <TypewriterText
              lines={story.middle.content}
              className="mt-5"
              lineClassName="text-sm leading-7 sm:text-base text-[#735f69]"
            />
            <Button className="mt-6" onClick={onContinue}>
              Continue the Journey
            </Button>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
