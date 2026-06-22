import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { EmergencyContact } from "@/types/dashboard";
import { Phone } from "lucide-react";

interface EmergencyContactsWidgetProps {
  contacts: EmergencyContact[];
}

export function EmergencyContactsWidget({ contacts }: EmergencyContactsWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency contacts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {contacts.map((c) => (
          <a
            key={c.id}
            href={`tel:${c.phoneNumber.replace(/\s/g, "")}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 transition-colors hover:border-medical-blue/40 hover:bg-bg-alt"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{c.name}</p>
              <p className="text-xs text-ink-faint">{c.relationship}</p>
            </div>
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal-light text-teal-dark">
              <Phone className="h-4 w-4" />
            </span>
          </a>
        ))}
        <a
          href="tel:112"
          className="flex items-center justify-center gap-2 rounded-xl border border-risk-emergency/30 bg-risk-emergency-bg p-3 text-sm font-medium text-risk-emergency transition-colors hover:bg-red-100"
        >
          <Phone className="h-4 w-4" />
          Call emergency services (112)
        </a>
      </CardContent>
    </Card>
  );
}
