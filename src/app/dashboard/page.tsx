import { AppNav } from "@/components/dashboard/app-nav";
import { HealthScoreWidget } from "@/components/dashboard/health-score-widget";
import { ActiveFollowUpsWidget } from "@/components/dashboard/active-follow-ups-widget";
import { MedicationRemindersWidget } from "@/components/dashboard/medication-reminders-widget";
import { RecentAssessmentsWidget } from "@/components/dashboard/recent-assessments-widget";
import { EmergencyContactsWidget } from "@/components/dashboard/emergency-contacts-widget";
import { mockDashboardData } from "@/lib/mock-dashboard-data";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const data = mockDashboardData;

  return (
    <div className="min-h-screen bg-background">
      <AppNav />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {getGreeting()}, {data.patientFirstName}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Here&apos;s where things stand with your health today.
            </p>
          </div>
          <Link href="/symptom-checker">
            <Button>
              <Stethoscope className="h-4 w-4" />
              Start a symptom check
            </Button>
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <HealthScoreWidget data={data.healthScore} />
            <ActiveFollowUpsWidget followUps={data.activeFollowUps} />
            <RecentAssessmentsWidget assessments={data.recentAssessments} />
          </div>
          <div className="space-y-5">
            <MedicationRemindersWidget reminders={data.medicationReminders} />
            <EmergencyContactsWidget contacts={data.emergencyContacts} />
          </div>
        </div>
      </main>
    </div>
  );
}
