"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { Question } from "@/data/questions";
import { ANSWER_FEEDBACK } from "@/lib/constants";
import { cn } from "@/lib/utils";

type QuestionModalProps = {
  open: boolean;
  question: Question | null;
  onResolved: (gateId: number) => void;
  playSfx: (name: "correct" | "unlock" | "click") => Promise<void>;
};

type QuestionModalContentProps = {
  question: Question;
  onResolved: (gateId: number) => void;
  playSfx: (name: "correct" | "unlock" | "click") => Promise<void>;
};

function QuestionModalContent({
  question,
  onResolved,
  playSfx,
}: QuestionModalContentProps) {
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = async (index: number) => {
    if (isCorrect) {
      return;
    }

    await playSfx("click");

    if (index === question.correctIndex) {
      setFeedback(question.successMessage);
      setIsCorrect(true);
      await playSfx("correct");
      window.setTimeout(() => onResolved(question.id), 900);
      return;
    }

    setWrongIndex(index);
    setFeedback(question.wrongMessage || ANSWER_FEEDBACK);
    window.setTimeout(() => setWrongIndex(null), 520);
  };

  return (
    <GlassPanel className="w-full max-w-2xl bg-[rgba(255,249,251,0.86)] p-5 sm:p-7">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.45 }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/58 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8d5478]">
          <Sparkles className="h-4 w-4" />
          {question.gateName}
        </div>
        <h2 className="font-display text-3xl leading-tight text-[#5a3655] sm:text-4xl">
          {question.question}
        </h2>

        <div className="mt-5 grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={`${question.id}-${option}`}
              variant="secondary"
              className={cn(
                "min-h-12 justify-start rounded-[24px] px-5 text-left text-[15px] leading-7 text-[#5f4c61] sm:min-h-14 sm:text-base",
                wrongIndex === index
                  ? "animate-[shake_0.38s_ease-in-out] bg-rose-100/82 text-rose-700"
                  : "",
                isCorrect && index === question.correctIndex
                  ? "bg-emerald-100/90 text-emerald-800 ring-2 ring-emerald-300/80"
                  : "",
              )}
              onClick={() => void handleAnswer(index)}
            >
              <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/72 text-xs font-bold text-[#9b5d82]">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {feedback ? (
            <motion.div
              key={feedback}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={cn(
                "mt-5 rounded-[22px] px-4 py-3 text-sm leading-6 sm:text-base",
                isCorrect
                  ? "bg-emerald-100/80 text-emerald-800"
                  : "bg-rose-50/80 text-rose-700",
              )}
            >
              {feedback}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </GlassPanel>
  );
}

export function QuestionModal({
  open,
  question,
  onResolved,
  playSfx,
}: QuestionModalProps) {
  if (!question) {
    return null;
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(19,10,31,0.38)] px-3 py-6 backdrop-blur-md sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <QuestionModalContent
            key={question.id}
            question={question}
            onResolved={onResolved}
            playSfx={playSfx}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
