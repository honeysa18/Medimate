import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "blue" | "teal" | "low" | "moderate" | "emergency" | "neutral";
}

const TONE_CLASSES: Record<NonNullable<BadgeProps["tone"]>, string> = {
  blue: "bg-medical-blue-light text-medical-blue-dark",
  teal: "bg-teal-light text-teal-dark",
  low: "bg-risk-low-bg text-risk-low",
  moderate: "bg-risk-moderate-bg text-risk-moderate",
  emergency: "bg-risk-emergency-bg text-risk-emergency",
  neutral: "bg-bg-alt text-ink-muted",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        TONE_CLASSES[tone],
        className
      )}
      {...props}
    />
  );
}
