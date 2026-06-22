"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IntakeMessage } from "@/types/symptom-assessment";
import { cn } from "@/lib/utils";

interface IntakeChatProps {
  messages: IntakeMessage[];
  onSend: (text: string) => void;
  isThinking: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function IntakeChat({
  messages,
  onSend,
  isThinking,
  disabled,
  placeholder = "Describe how you're feeling…",
}: IntakeChatProps) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setDraft("");
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-display text-lg font-medium text-ink">
              What&apos;s going on?
            </p>
            <p className="mt-1.5 max-w-sm text-sm text-ink-muted">
              Describe your symptoms in your own words — duration, severity,
              anything that makes it better or worse.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-medical-blue text-white"
                  : "bg-bg-alt text-ink"
              )}
            >
              {m.content}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-1.5 rounded-2xl bg-bg-alt px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-ink-faint"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-border p-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-medical-blue focus:outline-none disabled:opacity-50"
          aria-label="Describe your symptoms"
        />
        <Button type="button" variant="outline" size="md" aria-label="Use voice input instead" disabled={disabled}>
          <Mic className="h-4 w-4" />
        </Button>
        <Button type="submit" size="md" disabled={disabled || !draft.trim()} aria-label="Send message">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
