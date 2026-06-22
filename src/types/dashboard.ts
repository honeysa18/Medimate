import type { RiskLevel } from "./symptom-assessment";

export interface HealthScoreSnapshot {
  score: number; // 0–100
  trend: "up" | "down" | "stable";
  trendDelta: number;
  lastUpdated: string; // ISO 8601
}

export interface ActiveFollowUp {
  id: string;
  title: string;
  type: "fever" | "blood_pressure" | "diabetes" | "medication_adherence" | "general";
  nextCheckInAt: string; // ISO 8601
  riskLevel: RiskLevel;
  progressPercent: number; // 0–100
}

export interface MedicationReminder {
  id: string;
  medicineName: string;
  dosage: string;
  scheduledAt: string; // ISO 8601
  taken: boolean;
}

export interface RecentAssessment {
  id: string;
  summary: string;
  riskLevel: RiskLevel;
  createdAt: string; // ISO 8601
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface DashboardData {
  patientFirstName: string;
  healthScore: HealthScoreSnapshot;
  activeFollowUps: ActiveFollowUp[];
  medicationReminders: MedicationReminder[];
  recentAssessments: RecentAssessment[];
  emergencyContacts: EmergencyContact[];
}
