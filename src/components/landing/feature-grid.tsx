"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  ClipboardPlus,
  ActivitySquare,
  ScanText,
  Mic,
  MapPin,
} from "lucide-react";

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Symptom assessment",
    description:
      "Describe symptoms naturally. Get a risk level, possible conditions, and a confidence-scored next step.",
    accent: "blue" as const,
  },
  {
    icon: ClipboardPlus,
    title: "Care recommendations",
    description:
      "Home-care guidance, OTC medicine information, and the right consultation platform for your case.",
    accent: "teal" as const,
  },
  {
    icon: MapPin,
    title: "Hospital & pharmacy finder",
    description:
      "Nearby facilities with ratings, distance, and directions — fastest path to in-person care when needed.",
    accent: "blue" as const,
  },
  {
    icon: ScanText,
    title: "Prescription reader",
    description:
      "Upload a prescription photo. Get medicines, dosages, and instructions translated into plain language.",
    accent: "teal" as const,
  },
  {
    icon: ActivitySquare,
    title: "Follow-up monitoring",
    description:
      "Track fever, blood pressure, or medication adherence over time with automatic AI check-ins.",
    accent: "blue" as const,
  },
  {
    icon: Mic,
    title: "TelMed voice assistant",
    description:
      "No app, no signal required — call in and talk through symptoms with a voice-first AI assistant.",
    accent: "teal" as const,
  },
];

export function FeatureGrid() {
  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-12 max-w-xl">
          <p className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-medical-blue">
            What MEDIMATE does
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            One companion, the whole care journey
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-medical-blue/40"
            >
              <div
                className={
                  feature.accent === "blue"
                    ? "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-medical-blue-light text-medical-blue"
                    : "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light text-teal-dark"
                }
              >
                <feature.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mb-1.5 font-display text-base font-semibold tracking-tight text-ink">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
