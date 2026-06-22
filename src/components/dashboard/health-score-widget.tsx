"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { HealthScoreSnapshot } from "@/types/dashboard";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface HealthScoreWidgetProps {
  data: HealthScoreSnapshot;
}

const TREND_ICON = { up: TrendingUp, down: TrendingDown, stable: Minus };
const TREND_COLOR = {
  up: "text-risk-low",
  down: "text-risk-emergency",
  stable: "text-ink-faint",
};

export function HealthScoreWidget({ data }: HealthScoreWidgetProps) {
  const TrendIcon = TREND_ICON[data.trend];
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (data.score / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health score</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-5">
        <div className="relative h-24 w-24 flex-shrink-0">
          <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              strokeWidth="8"
              className="stroke-bg-alt"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="stroke-medical-blue"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-mono text-2xl font-semibold text-ink">
              {data.score}
            </span>
            <span className="text-[10px] text-ink-faint">/ 100</span>
          </div>
        </div>
        <div>
          <div className={`flex items-center gap-1 text-sm font-medium ${TREND_COLOR[data.trend]}`}>
            <TrendIcon className="h-4 w-4" />
            {data.trend === "stable" ? "Stable" : `${data.trendDelta} pts this week`}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            Based on recent assessments, follow-up adherence, and reported
            symptoms.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
