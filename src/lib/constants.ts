import { questions } from "@/data/questions";

export const TOTAL_GATES = questions.length;
export const MIDDLE_GATE = Math.ceil(TOTAL_GATES / 2);
export const MEMORY_REWARD_COUNTS = [1, 2, 1, 1, 1, 2, 2] as const;
export const TOTAL_MEMORIES = MEMORY_REWARD_COUNTS.reduce(
  (sum, value) => sum + value,
  0,
);

export function getMemoryIdsForGate(gateId: number) {
  const rewardCount = MEMORY_REWARD_COUNTS[gateId - 1] ?? 1;
  const start = MEMORY_REWARD_COUNTS.slice(0, Math.max(0, gateId - 1)).reduce(
    (sum, value) => sum + value,
    0,
  );

  return Array.from({ length: rewardCount }, (_, index) => start + index + 1);
}

export const JOURNEY_POINTS = [
  { x: 10, y: 74 },
  { x: 16, y: 64 },
  { x: 31, y: 79 },
  { x: 44, y: 58 },
  { x: 58, y: 72 },
  { x: 72, y: 47 },
  { x: 66, y: 26 },
  { x: 84, y: 14 },
] as const;

export const MOBILE_JOURNEY_POINTS = [
  { x: 10, y: 78 },
  { x: 18, y: 68 },
  { x: 36, y: 82 },
  { x: 50, y: 61 },
  { x: 64, y: 75 },
  { x: 79, y: 52 },
  { x: 69, y: 31 },
  { x: 84, y: 16 },
] as const;

export const ANSWER_FEEDBACK = "Hmm, not this one. Try again ✨";

export const DEFAULT_AUDIO_VOLUME = 1;

export const SCENE_TRANSITION_MS = 900;
