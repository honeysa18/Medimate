import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RiskMeter } from "@/components/ui/risk-meter";
import type { ActiveFollowUp } from "@/types/dashboard";
import { ChevronRight } from "lucide-react";

interface ActiveFollowUpsWidgetProps {
  followUps: ActiveFollowUp[];
}

function formatRelativeTime(iso: string): string {
  const diffMs = new Date(iso).getTime() - Date.now();
  const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
  if (diffHrs <= 0) return "Due now";
  if (diffHrs < 24) return `In ${diffHrs}h`;
  return `In ${Math.round(diffHrs / 24)}d`;
}

export function ActiveFollowUpsWidget({ followUps }: ActiveFollowUpsWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active follow-ups</CardTitle>
        <span className="font-mono text-xs text-ink-faint">{followUps.length}</span>
      </CardHeader>
      <CardContent className="space-y-3">
        {followUps.length === 0 && (
          <p className="text-sm text-ink-faint">No active follow-up plans right now.</p>
        )}
        {followUps.map((fu) => (
          <button
            key={fu.id}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-border p-3.5 text-left transition-colors hover:border-medical-blue/40 hover:bg-bg-alt"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{fu.title}</p>
              <p className="mt-0.5 font-mono text-xs text-ink-faint">
                Next check-in: {formatRelativeTime(fu.nextCheckInAt)}
              </p>
              <RiskMeter level={fu.riskLevel} size="sm" showLabel={false} className="mt-2 max-w-[140px]" />
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-ink-faint" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
