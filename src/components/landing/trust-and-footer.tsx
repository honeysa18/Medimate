import { ShieldCheck, Lock, FileCheck2, Clock } from "lucide-react";

const TRUST_POINTS = [
  { icon: Lock, label: "Data encrypted in transit and at rest" },
  { icon: ShieldCheck, label: "Role-based access control" },
  { icon: FileCheck2, label: "Full audit logging" },
  { icon: Clock, label: "Available for guidance, 24/7" },
];

export function TrustStrip() {
  return (
    <section className="border-t border-border bg-surface py-12">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <div key={point.label} className="flex items-center gap-3">
              <point.icon className="h-5 w-5 flex-shrink-0 text-teal-dark" strokeWidth={1.75} />
              <span className="text-sm text-ink-muted">{point.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-faint">
          MEDIMATE uses HIPAA-inspired security architecture and is built for
          health information support. It is not a substitute for professional
          medical advice, diagnosis, or treatment. Always seek the advice of a
          qualified clinician for any medical condition, and call emergency
          services immediately for a medical emergency.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-display text-sm font-semibold tracking-tight text-ink">
          MEDIMATE
        </span>
        <p className="text-xs text-ink-faint">
          © 2026 MEDIMATE. For informational and decision-support purposes
          only.
        </p>
      </div>
    </footer>
  );
}
