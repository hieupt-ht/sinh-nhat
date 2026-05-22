"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { MIDDLE_GATE, TOTAL_GATES, getMemoryIdsForGate } from "@/lib/constants";

type Phase = "intro" | "journey" | "middle-letter" | "finale";

type GameState = {
  isHydrated: boolean;
  phase: Phase;
  currentGate: number;
  viewedGate: number;
  completedGates: number[];
  unlockedMemories: number[];
  activeQuestionGate: number | null;
  latestUnlockedGate: number | null;
  latestUnlockedMemoryIds: number[];
  isQuestionOpen: boolean;
  isUnlockOpen: boolean;
  isMoving: boolean;
  hasStarted: boolean;
  markHydrated: () => void;
  startJourney: () => void;
  resumeJourney: () => void;
  viewUnlockedGates: () => void;
  setMoving: (value: boolean) => void;
  arriveAtGate: (gateId: number) => void;
  completeGate: (gateId: number) => void;
  continueAfterUnlock: () => void;
  continueFromMiddleLetter: () => void;
  previewGate: (gateId: number) => void;
  focusCurrentGate: () => void;
  replay: () => void;
};

const initialState = {
  isHydrated: false,
  phase: "intro" as Phase,
  currentGate: 1,
  viewedGate: 1,
  completedGates: [] as number[],
  unlockedMemories: [] as number[],
  activeQuestionGate: null,
  latestUnlockedGate: null,
  latestUnlockedMemoryIds: [] as number[],
  isQuestionOpen: false,
  isUnlockOpen: false,
  isMoving: false,
  hasStarted: false,
};

function clampGate(gateId: number) {
  return Math.max(1, Math.min(gateId, TOTAL_GATES));
}

function getLastCompletedGate(completedGates: number[]) {
  return completedGates.length > 0 ? Math.max(...completedGates) : 1;
}

function getProgressGate(completedGates: number[], fallbackGate = 1) {
  if (completedGates.length >= TOTAL_GATES) {
    return TOTAL_GATES;
  }

  return clampGate(Math.max(fallbackGate, completedGates.length + 1));
}

function getResumePhase({
  phase,
  completedGates,
  hasStarted,
}: {
  phase: Phase;
  completedGates: number[];
  hasStarted: boolean;
}) {
  if (completedGates.length >= TOTAL_GATES) {
    return "finale" as const;
  }

  if (phase === "middle-letter" && completedGates.length >= MIDDLE_GATE) {
    return "middle-letter" as const;
  }

  if (hasStarted || completedGates.length > 0) {
    return "journey" as const;
  }

  return "intro" as const;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      markHydrated: () =>
        set((state) => {
          const completedGates = Array.from(
            new Set(
              state.completedGates.filter(
                (gateId) => gateId >= 1 && gateId <= TOTAL_GATES,
              ),
            ),
          ).sort((left, right) => left - right);

          const maxMemoryId = getMemoryIdsForGate(TOTAL_GATES).at(-1) ?? 0;
          const unlockedMemories = Array.from(
            new Set(
              state.unlockedMemories.filter(
                (memoryId) => memoryId >= 1 && memoryId <= maxMemoryId,
              ),
            ),
          ).sort((left, right) => left - right);

          const currentGate = getProgressGate(completedGates, state.currentGate);
          const viewedGate = clampGate(state.viewedGate || currentGate);

          return {
            isHydrated: true,
            hasStarted:
              state.hasStarted || completedGates.length > 0 || unlockedMemories.length > 0,
            phase: getResumePhase({
              phase: state.phase,
              completedGates,
              hasStarted: state.hasStarted,
            }),
            currentGate,
            viewedGate,
            completedGates,
            unlockedMemories,
            activeQuestionGate: null,
            latestUnlockedGate: null,
            latestUnlockedMemoryIds: [],
            isQuestionOpen: false,
            isUnlockOpen: false,
            isMoving: false,
          };
        }),
      startJourney: () =>
        set({
          phase: "journey",
          hasStarted: true,
          currentGate: 1,
          viewedGate: 1,
          activeQuestionGate: null,
          latestUnlockedGate: null,
          latestUnlockedMemoryIds: [],
          isQuestionOpen: false,
          isUnlockOpen: false,
          isMoving: false,
        }),
      resumeJourney: () =>
        set((state) => {
          const phase = getResumePhase({
            phase: state.phase,
            completedGates: state.completedGates,
            hasStarted: state.hasStarted,
          });
          const currentGate = getProgressGate(state.completedGates, state.currentGate);

          return {
            phase,
            hasStarted: true,
            currentGate,
            viewedGate: currentGate,
            activeQuestionGate: null,
            latestUnlockedGate: null,
            latestUnlockedMemoryIds: [],
            isQuestionOpen: false,
            isUnlockOpen: false,
            isMoving: false,
          };
        }),
      viewUnlockedGates: () =>
        set((state) => ({
          phase: "journey",
          hasStarted: true,
          currentGate: getProgressGate(state.completedGates, state.currentGate),
          viewedGate: clampGate(getLastCompletedGate(state.completedGates)),
          activeQuestionGate: null,
          latestUnlockedGate: null,
          latestUnlockedMemoryIds: [],
          isQuestionOpen: false,
          isUnlockOpen: false,
          isMoving: false,
        })),
      setMoving: (value) => set({ isMoving: value }),
      arriveAtGate: (gateId) =>
        set({
          activeQuestionGate: gateId,
          isQuestionOpen: true,
          isMoving: false,
        }),
      completeGate: (gateId) => {
        const state = get();
        const completedGates = state.completedGates.includes(gateId)
          ? state.completedGates
          : [...state.completedGates, gateId];
        const rewardMemoryIds = getMemoryIdsForGate(gateId);
        const unlockedMemories = Array.from(
          new Set([...state.unlockedMemories, ...rewardMemoryIds]),
        );

        set({
          completedGates,
          unlockedMemories,
          activeQuestionGate: null,
          isQuestionOpen: false,
          latestUnlockedGate: gateId,
          latestUnlockedMemoryIds: rewardMemoryIds,
          isUnlockOpen: true,
        });
      },
      continueAfterUnlock: () => {
        const { latestUnlockedGate } = get();
        const completedGate = latestUnlockedGate ?? 1;

        if (completedGate >= TOTAL_GATES) {
          set({
            phase: "finale",
            currentGate: TOTAL_GATES,
            viewedGate: TOTAL_GATES,
            latestUnlockedGate: null,
            latestUnlockedMemoryIds: [],
            isUnlockOpen: false,
          });
          return;
        }

        if (completedGate === MIDDLE_GATE) {
          set({
            phase: "middle-letter",
            currentGate: MIDDLE_GATE + 1,
            viewedGate: MIDDLE_GATE + 1,
            latestUnlockedGate: null,
            latestUnlockedMemoryIds: [],
            isUnlockOpen: false,
          });
          return;
        }

        set({
          phase: "journey",
          currentGate: completedGate + 1,
          viewedGate: completedGate + 1,
          latestUnlockedGate: null,
          latestUnlockedMemoryIds: [],
          isUnlockOpen: false,
        });
      },
      continueFromMiddleLetter: () =>
        set({
          phase: "journey",
          currentGate: MIDDLE_GATE + 1,
          viewedGate: MIDDLE_GATE + 1,
        }),
      previewGate: (gateId) =>
        set((state) => ({
          phase: "journey",
          viewedGate: clampGate(gateId),
          isMoving: false,
          activeQuestionGate: null,
          isQuestionOpen: false,
          latestUnlockedGate: null,
          latestUnlockedMemoryIds: [],
          isUnlockOpen: false,
          currentGate: getProgressGate(state.completedGates, state.currentGate),
        })),
      focusCurrentGate: () =>
        set((state) => ({
          phase: "journey",
          viewedGate: getProgressGate(state.completedGates, state.currentGate),
          isMoving: false,
        })),
      replay: () =>
        set((state) => ({
          ...initialState,
          isHydrated: state.isHydrated,
        })),
    }),
    {
      name: "birthday-journey-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        phase: state.phase,
        currentGate: state.currentGate,
        viewedGate: state.viewedGate,
        completedGates: state.completedGates,
        unlockedMemories: state.unlockedMemories,
        hasStarted: state.hasStarted,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
