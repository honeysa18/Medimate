"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { MedicationReminder } from "@/types/dashboard";
import { Check, Pill } from "lucide-react";
import { cn } from "@/lib/utils";

interface MedicationRemindersWidgetProps {
  reminders: MedicationReminder[];
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function MedicationRemindersWidget({ reminders }: MedicationRemindersWidgetProps) {
  const pending = reminders.filter((r) => !r.taken).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication reminders</CardTitle>
        <span className="font-mono text-xs text-ink-faint">{pending} pending</span>
      </CardHeader>
      <CardContent className="space-y-2">
        {reminders.map((med) => (
          <div
            key={med.id}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3",
              med.taken ? "border-border bg-bg-alt/50" : "border-border"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
                med.taken ? "bg-risk-low-bg text-risk-low" : "bg-medical-blue-light text-medical-blue"
              )}
            >
              {med.taken ? <Check className="h-4 w-4" /> : <Pill className="h-4 w-4" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm font-medium", med.taken ? "text-ink-faint line-through" : "text-ink")}>
                {med.medicineName} — {med.dosage}
              </p>
              <p className="font-mono text-xs text-ink-faint">{formatTime(med.scheduledAt)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
