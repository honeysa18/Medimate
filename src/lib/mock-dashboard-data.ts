import type { DashboardData } from "@/types/dashboard";

/**
 * Mock dashboard data. Replace with a real fetch to your FastAPI backend
 * (e.g. GET /api/v1/dashboard) once that's wired up — the shape here is the
 * contract every widget component expects.
 */
export const mockDashboardData: DashboardData = {
  patientFirstName: "Aanya",
  healthScore: {
    score: 78,
    trend: "up",
    trendDelta: 4,
    lastUpdated: "2026-06-23T08:00:00.000Z",
  },
  activeFollowUps: [
    {
      id: "fu-1",
      title: "Fever recovery",
      type: "fever",
      nextCheckInAt: "2026-06-23T18:00:00.000Z",
      riskLevel: "low",
      progressPercent: 70,
    },
    {
      id: "fu-2",
      title: "Blood pressure monitoring",
      type: "blood_pressure",
      nextCheckInAt: "2026-06-24T09:00:00.000Z",
      riskLevel: "moderate",
      progressPercent: 35,
    },
  ],
  medicationReminders: [
    {
      id: "med-1",
      medicineName: "Paracetamol",
      dosage: "650 mg",
      scheduledAt: "2026-06-23T20:00:00.000Z",
      taken: false,
    },
    {
      id: "med-2",
      medicineName: "Cetirizine",
      dosage: "10 mg",
      scheduledAt: "2026-06-23T21:00:00.000Z",
      taken: false,
    },
    {
      id: "med-3",
      medicineName: "Vitamin D3",
      dosage: "60,000 IU",
      scheduledAt: "2026-06-23T09:00:00.000Z",
      taken: true,
    },
  ],
  recentAssessments: [
    {
      id: "as-1",
      summary: "Headache and low fever — likely viral",
      riskLevel: "low",
      createdAt: "2026-06-22T19:30:00.000Z",
    },
    {
      id: "as-2",
      summary: "Persistent dry cough, 2 weeks",
      riskLevel: "moderate",
      createdAt: "2026-06-18T11:15:00.000Z",
    },
  ],
  emergencyContacts: [
    { id: "ec-1", name: "Dr. Priya Menon", relationship: "Primary physician", phoneNumber: "+91 98765 43210" },
    { id: "ec-2", name: "Rohan Iyer", relationship: "Spouse", phoneNumber: "+91 91234 56789" },
  ],
};
