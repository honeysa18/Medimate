"use client";

import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/types/symptom-assessment";
import { motion } from "framer-motion";

interface RiskMeterProps {
  level: RiskLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const LEVELS: { key: RiskLevel; label: string }[] = [
  { key: "low", label: "Low" },
  { key: "moderate", label: "Moderate" },
  { key: "emergency", label: "Emergency" },
];

const LEVEL_INDEX: Record<RiskLevel, number> = {
  low: 0,
  moderate: 1,
  emergency: 2,
};

const ACTIVE_COLOR: Record<RiskLevel, string> = {
  low: "var(--color-risk-low)",
  moderate: "var(--color-risk-moderate)",
  emergency: "var(--color-risk-emergency)",
};

const LABEL_COLOR: Record<RiskLevel, string> = {
  low: "text-risk-low",
  moderate: "text-risk-moderate",
  emergency: "text-risk-emergency",
};

/**
 * MEDIMATE's signature risk indicator: a three-segment gauge that always
 * reads left-to-right as escalating severity. Used identically across the
 * symptom checker, dashboard, and follow-up tracker so the visual language
 * of "where does this sit on the risk spectrum" never has to be relearned.
 */
export function RiskMeter({
  level,
  size = "md",
  showLabel = true,
  className,
}: RiskMeterProps) {
  const activeIndex = LEVEL_INDEX[level];

  const segmentHeight = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";
  const gap = size === "sm" ? "gap-1" : "gap-1.5";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className={cn("flex w-full", gap)} role="img" aria-label={`Risk level: ${LEVELS[activeIndex].label}`}>
        {LEVELS.map((segment, i) => {
          const isActive = i <= activeIndex;
          return (
            <div
              key={segment.key}
              className={cn(
                "flex-1 rounded-full overflow-hidden bg-bg-alt relative",
                segmentHeight
              )}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: isActive ? ACTIVE_COLOR[level] : "transparent",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          );
        })}
      </div>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "font-display font-semibold tracking-tight",
              size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
              LABEL_COLOR[level]
            )}
          >
            {LEVELS[activeIndex].label} risk
          </span>
        </div>
      )}
    </div>
  );
}
