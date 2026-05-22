import { Sparkles } from "lucide-react";

import { TOTAL_GATES, TOTAL_MEMORIES } from "@/lib/constants";

export function ProgressBar({
  currentGate,
  collected,
}: {
  currentGate: number;
  collected: number;
}) {
  const progress = (collected / TOTAL_MEMORIES) * 100;

  return (
    <div className="rounded-[28px] border border-white/55 bg-[rgba(255,250,252,0.78)] px-4 py-3 text-[#5d405f] shadow-[0_16px_28px_rgba(23,12,43,0.12)] backdrop-blur-md">
      <div className="mb-2 flex flex-col gap-2 text-xs uppercase tracking-[0.16em] text-[#6d5670] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <span>Gate {currentGate <= TOTAL_GATES ? currentGate : TOTAL_GATES}</span>
        <span className="inline-flex items-center gap-1">
          <Sparkles className="h-4 w-4" />
          Memories collected: {collected}/{TOTAL_MEMORIES}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[#ead7e8]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#ffe9b1,#ff95bf)] shadow-[0_0_20px_rgba(255,215,145,0.45)] transition-[width] duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
