"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiskMeter } from "@/components/ui/risk-meter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, ArrowRight } from "lucide-react";

type DemoPhase = "typing" | "thinking" | "result";

const DEMO_INPUT = "I've had a dull headache and a low fever since yesterday evening.";

export function Hero() {
  const [phase, setPhase] = useState<DemoPhase>("typing");
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= DEMO_INPUT.length) {
      const t = setTimeout(() => setPhase("thinking"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTypedChars((c) => c + 1), 28);
    return () => clearTimeout(t);
  }, [phase, typedChars]);

  useEffect(() => {
    if (phase !== "thinking") return;
    const t = setTimeout(() => setPhase("result"), 1400);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "result") return;
    const t = setTimeout(() => {
      setTypedChars(0);
      setPhase("typing");
    }, 4200);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        {/* Left: thesis copy */}
        <div>
          <Badge tone="blue" className="mb-6">
            AI-powered healthcare companion
          </Badge>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Describe what you feel.
            <br />
            <span className="text-medical-blue">Get a clear read</span> on what
            to do next.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            MEDIMATE turns plain-language symptoms into a structured
            assessment — risk level, possible conditions, and the right next
            step, in seconds. Always backed by a recommendation to see a
            clinician when it matters.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button size="lg" className="group">
              Start a symptom check
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline">
              <Mic className="h-4 w-4" />
              Talk to TelMed instead
            </Button>
          </div>
          <p className="mt-5 text-xs text-ink-faint">
            MEDIMATE provides health information and decision support. It does
            not replace diagnosis or treatment by a licensed clinician.
          </p>
        </div>

        {/* Right: live demo panel — the product's thesis, shown not told */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-medical-blue-light/60 via-transparent to-teal-light/40 blur-2xl" />
          <div className="rounded-2xl border border-border bg-surface shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
              <span className="h-2 w-2 rounded-full bg-teal" />
              <span className="font-display text-sm font-medium text-ink-muted">
                Symptom Checker
              </span>
            </div>

            <div className="min-h-[280px] p-5">
              {/* Input bubble */}
              <div className="mb-5 rounded-xl bg-bg-alt px-4 py-3">
                <p className="font-mono text-sm leading-relaxed text-ink">
                  {DEMO_INPUT.slice(0, typedChars)}
                  {phase === "typing" && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-medical-blue align-middle" />
                  )}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {phase === "thinking" && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-1 text-sm text-ink-muted"
                  >
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-medical-blue"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </span>
                    Assessing symptoms…
                  </motion.div>
                )}

                {phase === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <RiskMeter level="low" size="sm" />

                    <div>
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-faint">
                        Possible conditions
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge tone="neutral">Viral infection — 64%</Badge>
                        <Badge tone="neutral">Tension headache — 22%</Badge>
                      </div>
                    </div>

                    <div className="rounded-lg bg-teal-light/50 px-3.5 py-2.5">
                      <p className="text-sm text-teal-dark">
                        Suggested: rest, hydration, and monitor temperature.
                        See a doctor if fever exceeds 101°F or persists past 3
                        days.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
