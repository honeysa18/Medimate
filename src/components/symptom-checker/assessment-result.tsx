"use client";

import { motion } from "framer-motion";
import { RiskMeter } from "@/components/ui/risk-meter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SymptomAssessmentResult } from "@/types/symptom-assessment";
import {
  AlertTriangle,
  Stethoscope,
  Home,
  ArrowRight,
  ShieldAlert,
  Video,
  MapPin,
} from "lucide-react";

interface AssessmentResultProps {
  result: SymptomAssessmentResult;
  onStartOver: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export function AssessmentResult({ result, onStartOver }: AssessmentResultProps) {
  const isEmergency = result.riskLevel === "emergency";

  return (
    <div className="space-y-5 p-1">
      {isEmergency && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3 rounded-2xl border border-risk-emergency/30 bg-risk-emergency-bg p-5"
        >
          <ShieldAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-risk-emergency" />
          <div className="flex-1">
            <p className="font-display font-semibold text-risk-emergency">
              This may be a medical emergency
            </p>
            <p className="mt-1 text-sm leading-relaxed text-risk-emergency">
              {result.emergencyWarning}
            </p>
            <Button variant="emergency" size="md" className="mt-3">
              Find nearest emergency room
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.05 }}>
        <Card>
          <CardHeader>
            <CardTitle>Risk level</CardTitle>
            <span className="font-mono text-xs text-ink-faint">
              {Math.round(result.confidenceScore * 100)}% confidence
            </span>
          </CardHeader>
          <CardContent>
            <RiskMeter level={result.riskLevel} size="lg" />
          </CardContent>
        </Card>
      </motion.div>

      {result.possibleConditions.length > 0 && (
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Possible conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.possibleConditions.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-ink">{c.name}</p>
                    <span className="font-mono text-xs text-ink-faint">
                      {Math.round(c.confidence * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-alt">
                    <motion.div
                      className="h-full rounded-full bg-medical-blue"
                      initial={{ width: 0 }}
                      animate={{ width: `${c.confidence * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {c.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.15 }}>
        <Card>
          <CardHeader>
            <CardTitle>Suggested next steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {result.nextSteps.map((step) => (
              <div
                key={step.label}
                className="flex items-start gap-3 rounded-xl border border-border p-3.5"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-medical-blue-light text-medical-blue">
                  {step.urgent ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <Stethoscope className="h-3.5 w-3.5" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{step.label}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {result.homeCareGuidance.length > 0 && (
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Home care guidance</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {result.homeCareGuidance.map((item) => (
                <div key={item.title} className="flex items-start gap-2.5 rounded-xl bg-teal-light/40 p-3.5">
                  <Home className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-dark" />
                  <div>
                    <p className="text-sm font-medium text-teal-dark">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {result.doctorConsultationRecommended && (
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.25 }}>
          <Card>
            <CardHeader>
              <CardTitle>Consider speaking with a doctor</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="outline">
                <Video className="h-4 w-4" />
                Start online consultation
              </Button>
              <Button variant="outline">
                <MapPin className="h-4 w-4" />
                Find nearby hospitals
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.3 }} className="space-y-3">
        <p className="text-xs leading-relaxed text-ink-faint">{result.disclaimer}</p>
        <Button variant="ghost" size="sm" onClick={onStartOver}>
          Start a new symptom check
        </Button>
      </motion.div>
    </div>
  );
}
