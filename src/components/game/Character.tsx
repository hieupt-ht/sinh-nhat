"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type CharacterProps = {
  isMoving?: boolean;
  className?: string;
};

export function Character({ isMoving = false, className }: CharacterProps) {
  return (
    <motion.div
      className={cn("relative h-[108px] w-[88px] sm:h-[132px] sm:w-[108px]", className)}
      animate={{
        y: isMoving ? [0, -5, 0] : [0, -6, 0],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: isMoving ? 0.75 : 2.8,
        ease: "easeInOut",
      }}
    >
      <motion.svg
        viewBox="0 0 120 160"
        className="h-full w-full drop-shadow-[0_16px_20px_rgba(62,35,82,0.26)]"
        animate={{ rotate: isMoving ? [-1, 1, -1] : [0, 1, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: isMoving ? 0.8 : 3.2 }}
      >
        <defs>
          <linearGradient id="hair" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#33223d" />
            <stop offset="100%" stopColor="#654367" />
          </linearGradient>
          <linearGradient id="dress" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#fff1d6" />
            <stop offset="100%" stopColor="#ff9bc0" />
          </linearGradient>
          <linearGradient id="sleeve" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#fff8ef" />
            <stop offset="100%" stopColor="#ffd6e8" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="150" rx="24" ry="8" fill="rgba(70, 46, 88, 0.18)" />
        <path d="M34 60 C27 32, 41 8, 60 8 C79 8, 93 32, 86 60 L84 86 C82 110, 75 123, 60 123 C45 123, 38 110, 36 86 Z" fill="url(#hair)" />
        <path d="M45 20 C49 13, 56 10, 60 10 C65 10, 71 13, 75 20 C71 18, 66 17, 60 17 C54 17, 49 18, 45 20 Z" fill="#a58bb4" opacity="0.5" />
        <circle cx="60" cy="48" r="24" fill="#ffe8d9" />
        <path d="M36 52 C34 27, 48 19, 60 19 C74 19, 88 30, 84 58 C77 48, 70 42, 58 42 C48 42, 40 46, 36 52 Z" fill="url(#hair)" />
        <ellipse cx="51" cy="49" rx="2.4" ry="3.3" fill="#392645" />
        <ellipse cx="69" cy="49" rx="2.4" ry="3.3" fill="#392645" />
        <path d="M56 60 C58 62, 62 62, 64 60" stroke="#a76b79" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="45" cy="55" rx="4.4" ry="2.8" fill="#ffbdd0" opacity="0.6" />
        <ellipse cx="75" cy="55" rx="4.4" ry="2.8" fill="#ffbdd0" opacity="0.6" />
        <motion.g
          animate={{ rotate: isMoving ? [-8, 10, -8] : [-2, 2, -2] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: isMoving ? 0.75 : 2.8 }}
          style={{ originX: "34px", originY: "84px" }}
        >
          <rect x="30" y="73" width="12" height="35" rx="6" fill="url(#sleeve)" />
        </motion.g>
        <motion.g
          animate={{ rotate: isMoving ? [10, -8, 10] : [2, -2, 2] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: isMoving ? 0.75 : 2.8 }}
          style={{ originX: "86px", originY: "84px" }}
        >
          <rect x="78" y="73" width="12" height="35" rx="6" fill="url(#sleeve)" />
        </motion.g>
        <path d="M44 70 C47 62, 54 57, 60 57 C67 57, 74 62, 77 70 L86 112 C78 123, 69 129, 60 129 C50 129, 40 123, 34 112 Z" fill="url(#dress)" />
        <path d="M40 111 C47 117, 53 121, 60 121 C68 121, 76 117, 82 111" stroke="#ffd9e8" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
        <motion.g
          animate={{ rotate: isMoving ? [6, -8, 6] : [1, -2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: isMoving ? 0.72 : 2.6 }}
          style={{ originX: "50px", originY: "118px" }}
        >
          <rect x="47" y="112" width="10" height="32" rx="5" fill="#ffe6d4" />
          <ellipse cx="51.5" cy="145" rx="8" ry="4" fill="#f1d1c2" />
        </motion.g>
        <motion.g
          animate={{ rotate: isMoving ? [-8, 6, -8] : [-1, 2, -1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: isMoving ? 0.72 : 2.6 }}
          style={{ originX: "70px", originY: "118px" }}
        >
          <rect x="64" y="112" width="10" height="32" rx="5" fill="#ffe6d4" />
          <ellipse cx="68.5" cy="145" rx="8" ry="4" fill="#f1d1c2" />
        </motion.g>
        <path d="M46 30 C52 26, 56 26, 60 30" stroke="#fef5f1" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <circle cx="83" cy="44" r="5" fill="#ffd16f" opacity="0.85" />
        <circle cx="83" cy="44" r="2.5" fill="#fff4b5" />
      </motion.svg>
    </motion.div>
  );
}
