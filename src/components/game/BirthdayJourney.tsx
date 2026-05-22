"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import { memories } from "@/data/memories";
import { questions } from "@/data/questions";
import { useAudio } from "@/hooks/useAudio";
import { useGameStore } from "@/hooks/useGameStore";
import { MIDDLE_GATE } from "@/lib/constants";

import { FinalBirthdayScene } from "./FinalBirthdayScene";
import { IntroScreen } from "./IntroScreen";
import { JourneyMap } from "./JourneyMap";
import { MemoryAlbum } from "./MemoryAlbum";
import { MemoryUnlockModal } from "./MemoryUnlockModal";
import { MidStoryLetter } from "./MidStoryLetter";
import { MusicButton } from "./MusicButton";
import { QuestionModal } from "./QuestionModal";
import { SceneBackground } from "./SceneBackground";
import { SceneTransition } from "./SceneTransition";

export function BirthdayJourney() {
  const {
    isHydrated,
    phase,
    currentGate,
    viewedGate,
    completedGates,
    unlockedMemories,
    activeQuestionGate,
    latestUnlockedGate,
    latestUnlockedMemoryIds,
    isQuestionOpen,
    isUnlockOpen,
    isMoving,
    startJourney,
    resumeJourney,
    viewUnlockedGates,
    setMoving,
    arriveAtGate,
    completeGate,
    continueAfterUnlock,
    continueFromMiddleLetter,
    previewGate,
    focusCurrentGate,
    replay,
  } = useGameStore();
  const { isPlaying, musicAvailable, startMusic, toggleMusic, playSfx } = useAudio();

  useEffect(() => {
    if (!isMoving) {
      return;
    }

    const timer = window.setTimeout(() => {
      arriveAtGate(currentGate);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [arriveAtGate, currentGate, isMoving]);

  const currentQuestion =
    questions.find((item) => item.id === activeQuestionGate) ?? null;
  const unlockedRewardMemories = latestUnlockedMemoryIds
    .map((memoryId) => memories.find((item) => item.id === memoryId) ?? null)
    .filter((item) => item !== null);
  const unlockMessage =
    questions.find((item) => item.id === latestUnlockedGate)?.successMessage ?? "";

  const sceneGateId =
    phase === "intro"
      ? 1
      : phase === "middle-letter"
        ? MIDDLE_GATE + 1
        : phase === "finale"
          ? 10
          : viewedGate;
  const sceneVariant =
    phase === "intro"
      ? "intro"
      : phase === "middle-letter"
        ? "middle"
        : phase === "finale"
          ? "finale"
          : "journey";

  const handleStart = async () => {
    await playSfx("click");
    await startMusic();
    startJourney();
  };

  const handleResume = async () => {
    await playSfx("click");
    await startMusic();
    resumeJourney();
  };

  const handleViewUnlockedGates = async () => {
    await playSfx("click");
    await startMusic();
    viewUnlockedGates();
  };

  const handleMove = async () => {
    await playSfx("click");
    setMoving(true);
  };

  const handleReplay = async () => {
    await playSfx("click");
    replay();
  };

  return (
    <main className="storybook-shell">
      <SceneBackground gateId={sceneGateId} variant={sceneVariant} />
      <SceneTransition sceneKey={`${phase}-${sceneGateId}`} />
      <MusicButton
        isPlaying={isPlaying}
        musicAvailable={musicAvailable}
        onToggle={() => void toggleMusic()}
      />

      {(phase === "journey" || phase === "middle-letter") && (
        <MemoryAlbum
          unlockedMemories={unlockedMemories}
          highlightIds={latestUnlockedMemoryIds}
        />
      )}

      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <IntroScreen
            key="intro"
            onStart={() => void handleStart()}
            onResume={() => void handleResume()}
            onViewUnlockedGates={() => void handleViewUnlockedGates()}
            onReset={() => void handleReplay()}
            isHydrated={isHydrated}
            canResume={isHydrated && (completedGates.length > 0 || unlockedMemories.length > 0)}
            canViewUnlockedGates={isHydrated && completedGates.length > 0}
            resumeGate={Math.min(currentGate, questions.length)}
            hasCompletedJourney={completedGates.length >= questions.length}
          />
        ) : null}
        {phase === "journey" ? (
          <JourneyMap
            key={`journey-${currentGate}`}
            currentGate={currentGate}
            viewedGate={viewedGate}
            completedGates={completedGates}
            collectedMemories={unlockedMemories.length}
            isMoving={isMoving}
            journeyComplete={completedGates.length >= questions.length}
            onMove={() => void handleMove()}
            onPreviewGate={previewGate}
            onFocusCurrentGate={focusCurrentGate}
          />
        ) : null}
        {phase === "middle-letter" ? (
          <MidStoryLetter
            key="middle"
            onContinue={() => {
              void playSfx("click");
              continueFromMiddleLetter();
            }}
          />
        ) : null}
        {phase === "finale" ? (
          <FinalBirthdayScene key="finale" onReplay={() => void handleReplay()} />
        ) : null}
      </AnimatePresence>

      <QuestionModal
        open={isQuestionOpen}
        question={currentQuestion}
        onResolved={completeGate}
        playSfx={playSfx}
      />

      <MemoryUnlockModal
        open={isUnlockOpen}
        memories={unlockedRewardMemories}
        gateId={latestUnlockedGate}
        message={unlockMessage}
        onContinue={() => {
          void playSfx("click");
          continueAfterUnlock();
        }}
        playSfx={playSfx}
      />
    </main>
  );
}
