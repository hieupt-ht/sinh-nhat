import { TOTAL_MEMORIES } from "@/lib/constants";

export type MemoryCard = {
  id: number;
  image: string;
  caption: string;
};

// Replace these file paths with your real memory photos later.
// Replace this file with your real memory photo.
export const memories: MemoryCard[] = [
  { id: 1, image: "/images/memories/photo-1.jpg", caption: "Memory 1" },
  { id: 2, image: "/images/memories/photo-2.jpg", caption: "Memory 2" },
  { id: 3, image: "/images/memories/photo-3.jpg", caption: "Memory 3" },
  { id: 4, image: "/images/memories/photo-4.jpg", caption: "Memory 4" },
  { id: 5, image: "/images/memories/photo-5.jpg", caption: "Memory 5" },
  { id: 6, image: "/images/memories/photo-6.jpg", caption: "Memory 6" },
  { id: 7, image: "/images/memories/photo-7.jpg", caption: "Memory 7" },
  { id: 8, image: "/images/memories/photo-8.jpg", caption: "Memory 8" },
  { id: 9, image: "/images/memories/photo-9.jpg", caption: "Memory 9" },
  { id: 10, image: "/images/memories/photo-10.jpg", caption: "Memory 10" },
];

export const journeyMemories = memories.slice(0, TOTAL_MEMORIES);
