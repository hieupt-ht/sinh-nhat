/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Images, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { journeyMemories } from "@/data/memories";
import { TOTAL_MEMORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function AlbumThumb({
  id,
  unlocked,
  highlight,
}: {
  id: number;
  unlocked: boolean;
  highlight: boolean;
}) {
  const memory = journeyMemories.find((item) => item.id === id);
  const [failed, setFailed] = useState(false);

  if (!memory) {
    return null;
  }

  return (
    <motion.div
      layout
      className={cn(
        "relative h-16 w-14 overflow-hidden rounded-2xl border border-white/65 bg-white/70 shadow-[0_10px_22px_rgba(33,18,45,0.12)] sm:h-20 sm:w-16",
        highlight ? "ring-2 ring-amber-200/95" : "",
      )}
      initial={highlight ? { scale: 0.65, opacity: 0.5, y: 18 } : false}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {unlocked && !failed ? (
        <img
          src={memory.image}
          alt={memory.caption}
          className="h-full w-full object-cover object-center"
          onError={() => setFailed(true)}
        />
      ) : unlocked ? (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#ffd9ea,#fff0bc,#d8ecff)] text-center">
          <Camera className="h-5 w-5 text-[#915575]" />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/14 text-lg font-semibold text-white/70">
          ?
        </div>
      )}
      {highlight ? (
        <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(255,232,176,0.9)]" />
      ) : null}
    </motion.div>
  );
}

export function MemoryAlbum({
  unlockedMemories,
  highlightIds,
}: {
  unlockedMemories: number[];
  highlightIds: number[];
}) {
  const [expanded, setExpanded] = useState(false);

  const recentIds = useMemo(() => {
    if (expanded) {
      return journeyMemories.map((item) => item.id);
    }

    const lastUnlocked = unlockedMemories.slice(-3);
    const lockedFill = journeyMemories
      .map((item) => item.id)
      .filter((id) => !lastUnlocked.includes(id))
      .slice(0, Math.max(0, 4 - lastUnlocked.length));

    return [...lastUnlocked, ...lockedFill];
  }, [expanded, unlockedMemories]);

  return (
    <motion.aside
      layout
      className="fixed bottom-4 left-4 right-4 z-[60] rounded-[28px] border border-white/55 bg-[rgba(255,250,255,0.78)] p-4 text-[#5e4063] shadow-[0_24px_45px_rgba(31,15,45,0.14)] backdrop-blur-xl sm:left-auto sm:right-6 sm:w-[340px]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7b5d7c]">
            <Images className="h-4 w-4" />
            Memory Album
          </p>
          <p className="mt-1 text-sm text-[#6d586c]">
            {unlockedMemories.length}/{TOTAL_MEMORIES} collected
          </p>
        </div>
        <Button
          variant="ghost"
          className="min-h-10 px-4 text-sm sm:hidden"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Hide" : "Open"}
        </Button>
      </div>

      <div className="mt-4 hidden grid-cols-4 gap-2 sm:grid">
        {journeyMemories.map((memory) => (
          <AlbumThumb
            key={memory.id}
            id={memory.id}
            unlocked={unlockedMemories.includes(memory.id)}
            highlight={highlightIds.includes(memory.id)}
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          layout
          className="mt-4 grid grid-cols-4 gap-2 sm:hidden"
          initial={false}
          animate={{ height: "auto", opacity: 1 }}
        >
          {recentIds.map((id) => (
            <AlbumThumb
              key={id}
              id={id}
              unlocked={unlockedMemories.includes(id)}
              highlight={highlightIds.includes(id)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {highlightIds.length > 0 ? (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#fff1d9] px-3 py-2 text-xs font-medium text-[#73514f]">
          <Sparkles className="h-4 w-4" />
          {highlightIds.length > 1
            ? `${highlightIds.length} new memories added to the album`
            : "New memory added to the album"}
        </div>
      ) : null}
    </motion.aside>
  );
}
