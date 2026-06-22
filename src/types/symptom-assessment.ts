/**
 * Core type contracts for MEDIMATE's AI Symptom Assessment Engine.
 *
 * These types define the shape of data flowing between the frontend and the
 * assessment API (see /src/app/api/symptom-assessment/route.ts). The route
 * currently returns mocked responses — swap in a real OpenAI call there and
 * every component downstream keeps working unchanged, since they're built
 * against this contract, not against the mock implementation.
 */

export type RiskLevel = "low" | "moderate" | "emergency";

export type Sex = "male" | "female" | "intersex" | "prefer_not_to_say";

/** A single message in the symptom intake conversation. */
export interface IntakeMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ISO 8601
}

/** Structured patient context collected during intake follow-up questions. */
export interface PatientContext {
  age?: number;
  sex?: Sex;
  durationDescription?: string; // e.g. "3 days", "since this morning"
  severity?: "mild" | "moderate" | "severe";
  existingConditions?: string[];
  currentMedications?: string[];
}

/** Request sent to the assessment endpoint after intake is complete. */
export interface SymptomAssessmentRequest {
  freeTextSymptoms: string;
  conversation: IntakeMessage[];
  patientContext: PatientContext;
}

/** One candidate condition returned by the assessment engine. */
export interface PossibleCondition {
  name: string;
  confidence: number; // 0–1
  description: string;
}

/** A single actionable next step, ordered by priority. */
export interface NextStep {
  label: string;
  detail: string;
  urgent: boolean;
}

/** A home-care guidance item. */
export interface HomeCareItem {
  title: string;
  detail: string;
}

/** Full structured output of an AI symptom assessment. */
export interface SymptomAssessmentResult {
  id: string;
  createdAt: string; // ISO 8601
  riskLevel: RiskLevel;
  confidenceScore: number; // 0–1, overall model confidence in this assessment
  possibleConditions: PossibleCondition[];
  nextSteps: NextStep[];
  homeCareGuidance: HomeCareItem[];
  doctorConsultationRecommended: boolean;
  emergencyWarning?: string; // present only when riskLevel === "emergency"
  disclaimer: string;
}

/** One follow-up question the assessment engine asks during intake. */
export interface FollowUpQuestion {
  id: string;
  question: string;
  inputType: "text" | "single_select" | "multi_select" | "number" | "scale";
  options?: string[];
}

/** Discriminated union for the multi-step intake flow's current state. */
export type IntakeStep =
  | { kind: "collecting_symptoms" }
  | { kind: "asking_follow_up"; question: FollowUpQuestion }
  | { kind: "assessing" }
  | { kind: "complete"; result: SymptomAssessmentResult };
