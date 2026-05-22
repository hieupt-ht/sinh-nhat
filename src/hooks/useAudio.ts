"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DEFAULT_AUDIO_VOLUME } from "@/lib/constants";

type SfxName = "correct" | "unlock" | "click";

let backgroundAudio: HTMLAudioElement | null = null;
let backgroundAudioPath = "/audio/background.mp3";

const BACKGROUND_AUDIO_CANDIDATES = [
  "/audio/background.mp3",
  "/audio/backgroundsound.mp3",
] as const;

function getAudioElement(source = backgroundAudioPath) {
  if (typeof window === "undefined") {
    return null;
  }

  const resolvedSource = new URL(source, window.location.origin).toString();

  if (!backgroundAudio || backgroundAudio.src !== resolvedSource) {
    backgroundAudio = new Audio(source);
    backgroundAudio.autoplay = true;
    backgroundAudio.preload = "auto";
    backgroundAudio.loop = true;
    backgroundAudio.volume = DEFAULT_AUDIO_VOLUME;
  }

  return backgroundAudio;
}

export function useAudio() {
  const [musicAvailable, setMusicAvailable] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicSource, setMusicSource] = useState(backgroundAudioPath);
  const hasAttemptedAutoplay = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function detectMusic() {
      for (const source of BACKGROUND_AUDIO_CANDIDATES) {
        try {
          const response = await fetch(source, { method: "HEAD" });
          if (response.ok) {
            backgroundAudioPath = source;
            if (mounted) {
              setMusicSource(source);
              setMusicAvailable(true);
            }
            return;
          }
        } catch {
          // Try the next candidate.
        }
      }

      if (mounted) {
        setMusicAvailable(false);
      }
    }

    void detectMusic();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const audio = getAudioElement(musicSource);

    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setMusicAvailable(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [musicSource]);

  useEffect(() => {
    if (musicAvailable !== true || hasAttemptedAutoplay.current) {
      return;
    }

    hasAttemptedAutoplay.current = true;

    const audio = getAudioElement(musicSource);

    if (!audio) {
      return;
    }

    void audio.play().then(
      () => {
        setIsPlaying(true);
      },
      () => {
        setIsPlaying(false);
      },
    );
  }, [musicAvailable, musicSource]);

  const startMusic = useCallback(async () => {
    if (musicAvailable === false) {
      return;
    }

    const audio = getAudioElement(musicSource);

    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [musicAvailable, musicSource]);

  const toggleMusic = useCallback(async () => {
    if (musicAvailable === false) {
      return;
    }

    const audio = getAudioElement(musicSource);

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, [musicAvailable, musicSource]);

  const playSfx = useCallback(async (name: SfxName) => {
    if (typeof window === "undefined") {
      return;
    }

    const audio = new Audio(`/audio/${name}.mp3`);
    audio.volume = name === "click" ? 0.26 : 0.42;

    try {
      await audio.play();
    } catch {
      // Optional SFX. Missing files should never break the experience.
    }
  }, []);

  return {
    isPlaying,
    musicAvailable,
    startMusic,
    toggleMusic,
    playSfx,
  };
}
