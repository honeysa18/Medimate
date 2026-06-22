"use client";

import { motion } from "framer-motion";
import type { FollowUpQuestion } from "@/types/symptom-assessment";

interface FollowUpPromptProps {
  question: FollowUpQuestion;
  onAnswer: (answer: string) => void;
}

export function FollowUpPrompt({ question, onAnswer }: FollowUpPromptProps) {
  if (question.inputType !== "single_select" || !question.options) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 px-5 pb-4"
    >
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
          className="rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:border-medical-blue hover:bg-medical-blue-light hover:text-medical-blue-dark"
        >
          {option}
        </button>
      ))}
    </motion.div>
  );
}
