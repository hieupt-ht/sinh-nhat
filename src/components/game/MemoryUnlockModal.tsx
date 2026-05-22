/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { MemoryCard } from "@/data/memories";

type MemoryUnlockModalProps = {
  open: boolean;
  memories: MemoryCard[];
  gateId: number | null;
  message: string;
  onContinue: () => void;
  playSfx: (name: "correct" | "unlock" | "click") => Promise<void>;
};

type MemoryUnlockModalContentProps = {
  memories: MemoryCard[];
  message: string;
  onContinue: () => void;
  playSfx: (name: "correct" | "unlock" | "click") => Promise<void>;
};

function MemoryPhoto({
  memory,
  className,
}: {
  memory: MemoryCard;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-[linear-gradient(135deg,#ffd9e8,#fff1be,#d8edff)] p-5 text-center ${className ?? ""}`}
      >
        <Camera className="mb-3 h-7 w-7 text-[#8e5378]" />
        <p className="font-display text-xl text-[#73425d]">Add photo here</p>
      </div>
    );
  }

  return (
    <img
      src={memory.image}
      alt={memory.caption}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

function MemoryUnlockModalContent({
  memories,
  message,
  onContinue,
  playSfx,
}: MemoryUnlockModalContentProps) {
  const [showFlight, setShowFlight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    void playSfx("unlock");

    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);

    const timer = window.setTimeout(() => setShowFlight(true), 540);

    return () => {
      media.removeEventListener("change", apply);
      window.clearTimeout(timer);
    };
  }, [memories, playSfx]);

  const flightTarget = useMemo(
    () => (isMobile ? { x: 90, y: 270 } : { x: 360, y: 220 }),
    [isMobile],
  );

  return (
    <GlassPanel className="relative w-full max-w-[860px] overflow-visible p-4 sm:p-5">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[240px] w-[220px] -translate-x-1/2 -translate-y-1/2 sm:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          showFlight
            ? {
                opacity: [0.8, 0.95, 0],
                scale: [0.94, 0.88, 0.36],
                x: [0, 90, flightTarget.x],
                y: [0, 40, flightTarget.y],
                rotate: [0, 6, 16],
              }
            : { opacity: 0, scale: 0.8, x: 0, y: 0 }
        }
        transition={{ duration: 1.35, ease: "easeInOut" }}
      >
        {memories.slice(0, 2).map((memory, index) => (
          <div
            key={`flight-${memory.id}`}
            className="absolute top-0 h-full w-[188px] rounded-[26px] border border-white/70 bg-white p-3 shadow-[0_24px_45px_rgba(58,21,66,0.25)]"
            style={{
              left: index * 26,
              rotate: `${index === 0 ? -5 : 6}deg`,
            }}
          >
            <MemoryPhoto
              memory={memory}
              className="h-full w-full rounded-[18px] bg-[#fff8fd] object-contain object-center"
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/58 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8d5478]">
          <Sparkles className="h-4 w-4" />
          Memory Unlocked
        </div>

        <h2 className="font-display text-2xl text-[#5c3556] sm:text-3xl">
          {message}
        </h2>

        <div className="mt-5 flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="mx-auto w-full max-w-[220px] rounded-[24px] border border-white/75 bg-white p-2.5 shadow-[0_20px_36px_rgba(58,21,66,0.16)] sm:max-w-none"
                style={{ rotate: `${index % 2 === 0 ? -2 : 2}deg` }}
              >
                <div className="rounded-[18px] bg-[#fff6fb] p-2.5">
                  <MemoryPhoto
                    key={`main-${memory.image}`}
                    memory={memory}
                    className="aspect-[4/5] w-full rounded-[18px] bg-[#fffaf8] object-contain object-center"
                  />
                </div>
                <p className="px-2 pb-1 pt-3 font-display text-xl text-[#6d4463]">
                  {memory.caption}
                </p>
              </div>
            ))}
          </div>

          <Button className="w-full sm:w-auto" onClick={onContinue}>
            Continue
          </Button>
        </div>
      </motion.div>
    </GlassPanel>
  );
}

export function MemoryUnlockModal({
  open,
  memories,
  gateId,
  message,
  onContinue,
  playSfx,
}: MemoryUnlockModalProps) {
  if (memories.length === 0 || !gateId) {
    return null;
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-[rgba(18,10,31,0.34)] px-4 py-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MemoryUnlockModalContent
            key={`${gateId}-${memories.map((memory) => memory.id).join("-")}`}
            memories={memories}
            message={message}
            onContinue={onContinue}
            playSfx={playSfx}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
