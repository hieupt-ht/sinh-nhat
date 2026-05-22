"use client";

import { motion } from "framer-motion";

import type { FinalScenePhase } from "./types";

function Cake() {
  return (
    <div className="relative h-[220px] w-[220px] sm:h-[300px] sm:w-[300px]">
      <div className="absolute left-1/2 top-[-38px] -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,#fff5ba,#ffb8cf)] px-4 py-2 font-display text-3xl text-[#7d4761] shadow-[0_12px_24px_rgba(89,40,68,0.2)] sm:top-[-46px] sm:text-4xl">
        21
      </div>
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-5">
        {[0, 1, 2].map((item) => (
          <motion.div
            key={item}
            className="relative h-20 w-4"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.4 + item * 0.22,
            }}
          >
            <span className="absolute bottom-0 left-1/2 h-14 w-2 -translate-x-1/2 rounded-full bg-[#ffe6a8]" />
            <span className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fffbd3,#ffc46a_58%,rgba(255,196,106,0))] blur-[0.5px]" />
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 h-28 w-44 -translate-x-1/2 rounded-[30px] bg-[linear-gradient(180deg,#ffb1c8,#ff7f9d)] shadow-[0_32px_60px_rgba(90,32,69,0.28)]" />
      <div className="absolute bottom-20 left-1/2 h-28 w-[232px] -translate-x-1/2 rounded-[34px] bg-[linear-gradient(180deg,#fff4cf,#ffd887)] shadow-[0_24px_36px_rgba(90,32,69,0.18)] sm:w-[258px]" />
      <div className="absolute bottom-[60px] left-1/2 h-11 w-[248px] -translate-x-1/2 rounded-full bg-[#fff2cf] sm:w-[274px]" />
      <div className="absolute bottom-0 left-1/2 h-16 w-[288px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,232,175,0.65),rgba(255,232,175,0))] sm:w-[340px]" />
    </div>
  );
}

export function FinalCakeReveal({
  phase,
}: {
  phase: FinalScenePhase;
}) {
  if (phase === "finalGreeting") {
    return null;
  }

  const showCelebration =
    phase === "cakeShow" || phase === "photoOrbit" || phase === "photoScatter";

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,245,193,0.6),rgba(255,245,193,0)_72%)] blur-2xl sm:h-[420px] sm:w-[420px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === "cakeShow" ? 1 : phase === "photoOrbit" ? 0.38 : 0,
          scale: showCelebration ? [1, 1.08, 1] : 1,
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: {
            duration: 2.4,
            repeat: phase === "cakeShow" ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          },
        }}
      />

      {[...Array.from({ length: 14 })].map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-2.5 w-2.5 rounded-full bg-[#fff5d6]"
          style={{
            left: `${18 + ((index * 7) % 64)}%`,
            top: `${14 + ((index * 11) % 62)}%`,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: phase === "cakeShow" ? [0.2, 1, 0.35] : 0,
            scale: phase === "cakeShow" ? [0.5, 1.5, 0.8] : 0.5,
            y: phase === "cakeShow" ? [0, -16, 0] : 0,
          }}
          transition={{
            duration: 1.8 + (index % 4) * 0.25,
            delay: 0.2 + index * 0.06,
            repeat: phase === "cakeShow" ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />
      ))}

      {[...Array.from({ length: 18 })].map((_, index) => (
        <motion.span
          key={`confetti-${index}`}
          className="absolute h-2 w-4 rounded-full bg-[linear-gradient(90deg,#ffe6a8,#ff9ec0)]"
          style={{
            left: `${34 + ((index * 5) % 32)}%`,
            top: `${26 + ((index * 9) % 18)}%`,
            rotate: `${index * 21}deg`,
          }}
          initial={{ opacity: 0, y: -18, scale: 0.5 }}
          animate={
            phase === "cakeShow"
              ? {
                  opacity: [0, 1, 0.82, 0],
                  y: [-22, 18 + (index % 3) * 18, 82 + (index % 4) * 22],
                  x: [0, (index % 2 === 0 ? 1 : -1) * (18 + (index % 3) * 8)],
                  rotate: [`${index * 21}deg`, `${index * 21 + 120}deg`],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 2.1 + (index % 4) * 0.16,
            delay: 0.15 + index * 0.04,
            repeat: phase === "cakeShow" ? Number.POSITIVE_INFINITY : 0,
            repeatDelay: 0.45,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, scale: 0.72, y: 42 }}
        animate={{
          opacity: phase === "cakeShow" ? 1 : phase === "photoOrbit" ? 0 : 0,
          scale: phase === "cakeShow" ? [0.82, 1.04, 1] : 0.84,
          y: 0,
        }}
        transition={{
          opacity: { duration: 0.7, ease: "easeOut" },
          y: { duration: 0.9, ease: "easeOut" },
          scale: { duration: 1, ease: "easeOut" },
        }}
      >
        <Cake />
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] h-[72px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,236,188,0.34),rgba(255,236,188,0))] blur-xl sm:w-[420px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "cakeShow" ? 0.9 : 0 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}
