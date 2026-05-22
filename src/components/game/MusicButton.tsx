"use client";

import { Music2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/Button";

type MusicButtonProps = {
  isPlaying: boolean;
  musicAvailable: boolean | null;
  onToggle: () => void;
};

export function MusicButton({
  isPlaying,
  musicAvailable,
  onToggle,
}: MusicButtonProps) {
  return (
    <Button
      variant="ghost"
      className="fixed right-4 top-4 z-[70] min-h-11 px-4 py-2 text-sm text-white sm:right-6 sm:top-6"
      onClick={onToggle}
      disabled={musicAvailable === false}
      aria-label="Toggle music"
    >
      {musicAvailable === false ? (
        <>
          <VolumeX className="mr-2 h-4 w-4" />
          No Music
        </>
      ) : (
        <>
          <Music2 className="mr-2 h-4 w-4" />
          {isPlaying ? "Music On" : "Music Off"}
        </>
      )}
    </Button>
  );
}
