"use client";

import { useState, useCallback } from "react";
import { AppNav } from "@/components/dashboard/app-nav";
import { IntakeChat } from "@/components/symptom-checker/intake-chat";
import { FollowUpPrompt } from "@/components/symptom-checker/follow-up-prompt";
import { AssessmentResult } from "@/components/symptom-checker/assessment-result";
import type {
  IntakeMessage,
  IntakeStep,
  PatientContext,
  FollowUpQuestion,
  SymptomAssessmentResult,
} from "@/types/symptom-assessment";

const FOLLOW_UP_QUEUE: FollowUpQuestion[] = [
  {
    id: "duration",
    question: "How long have you been experiencing this?",
    inputType: "single_select",
    options: ["Today", "2–3 days", "About a week", "More than 2 weeks"],
  },
  {
    id: "severity",
    question: "How would you rate the severity?",
    inputType: "single_select",
    options: ["Mild", "Moderate", "Severe"],
  },
];

function now(): string {
  return new Date().toISOString();
}

export default function SymptomCheckerPage() {
  const [messages, setMessages] = useState<IntakeMessage[]>([]);
  const [freeText, setFreeText] = useState("");
  const [patientContext, setPatientContext] = useState<PatientContext>({});
  const [followUpIndex, setFollowUpIndex] = useState(0);
  const [step, setStep] = useState<IntakeStep>({ kind: "collecting_symptoms" });

  const currentFollowUp =
    step.kind === "asking_follow_up" ? step.question : undefined;

  const runAssessment = useCallback(
    async (context: PatientContext, symptoms: string, convo: IntakeMessage[]) => {
      setStep({ kind: "assessing" });
      try {
        const res = await fetch("/api/symptom-assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            freeTextSymptoms: symptoms,
            conversation: convo,
            patientContext: context,
          }),
        });
        if (!res.ok) throw new Error("Assessment request failed");
        const result: SymptomAssessmentResult = await res.json();
        setStep({ kind: "complete", result });
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Something went wrong while running that assessment. Please try again in a moment.",
            timestamp: now(),
          },
        ]);
        setStep({ kind: "collecting_symptoms" });
      }
    },
    []
  );

  function handleFollowUpAnswer(answer: string) {
    if (!currentFollowUp) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: answer, timestamp: now() },
    ]);

    const updatedContext: PatientContext = { ...patientContext };
    if (currentFollowUp.id === "duration") {
      updatedContext.durationDescription = answer;
    } else if (currentFollowUp.id === "severity") {
      updatedContext.severity = answer.toLowerCase() as PatientContext["severity"];
    }
    setPatientContext(updatedContext);

    const nextIndex = followUpIndex + 1;
    if (nextIndex < FOLLOW_UP_QUEUE.length) {
      const nextQuestion = FOLLOW_UP_QUEUE[nextIndex];
      setFollowUpIndex(nextIndex);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: nextQuestion.question, timestamp: now() },
      ]);
      setStep({ kind: "asking_follow_up", question: nextQuestion });
    } else {
      const finalMessages: IntakeMessage[] = [
        ...messages,
        { role: "user", content: answer, timestamp: now() },
      ];
      runAssessment(updatedContext, freeText, finalMessages);
    }
  }

  function handleInitialSend(text: string) {
    setFreeText(text);
    const userMsg: IntakeMessage = { role: "user", content: text, timestamp: now() };
    const firstQuestion = FOLLOW_UP_QUEUE[0];
    const assistantMsg: IntakeMessage = {
      role: "assistant",
      content: firstQuestion.question,
      timestamp: now(),
    };
    setMessages([userMsg, assistantMsg]);
    setFollowUpIndex(0);
    setStep({ kind: "asking_follow_up", question: firstQuestion });
  }

  function handleStartOver() {
    setMessages([]);
    setFreeText("");
    setPatientContext({});
    setFollowUpIndex(0);
    setStep({ kind: "collecting_symptoms" });
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Symptom Checker
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Describe how you&apos;re feeling. MEDIMATE will ask a couple of
            follow-up questions, then give you a structured read on what to
            do next.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex h-[640px] flex-col rounded-2xl border border-border bg-surface">
            <IntakeChat
              messages={messages}
              onSend={step.kind === "collecting_symptoms" ? handleInitialSend : () => {}}
              isThinking={step.kind === "assessing"}
              disabled={step.kind !== "collecting_symptoms"}
              placeholder={
                step.kind === "collecting_symptoms"
                  ? "Describe how you're feeling…"
                  : "Use the options below to continue"
              }
            />
            {currentFollowUp && (
              <FollowUpPrompt
                question={currentFollowUp}
                onAnswer={handleFollowUpAnswer}
              />
            )}
          </div>

          <div className="max-h-[640px] overflow-y-auto">
            {step.kind === "complete" ? (
              <AssessmentResult result={step.result} onStartOver={handleStartOver} />
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-ink-faint">
                  Your assessment will appear here once you&apos;ve described
                  your symptoms and answered a couple of quick questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
