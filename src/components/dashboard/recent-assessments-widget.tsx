import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RecentAssessment } from "@/types/dashboard";

interface RecentAssessmentsWidgetProps {
  assessments: RecentAssessment[];
}

const TONE_BY_RISK = {
  low: "low" as const,
  moderate: "moderate" as const,
  emergency: "emergency" as const,
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function RecentAssessmentsWidget({ assessments }: RecentAssessmentsWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent assessments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {assessments.length === 0 && (
          <p className="text-sm text-ink-faint">No assessments yet. Start a symptom check to see results here.</p>
        )}
        {assessments.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-ink">{a.summary}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">{formatDate(a.createdAt)}</p>
            </div>
            <Badge tone={TONE_BY_RISK[a.riskLevel]} className="flex-shrink-0 capitalize">
              {a.riskLevel}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
