"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Stethoscope,
  Video,
  MapPin,
  ScanText,
  ActivitySquare,
  Mic,
  UserCircle2,
  Cross,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/symptom-checker", label: "Symptom Checker", icon: Stethoscope },
  { href: "/consultation", label: "Consultation", icon: Video },
  { href: "/hospital-finder", label: "Hospital Finder", icon: MapPin },
  { href: "/prescription-reader", label: "Prescription Reader", icon: ScanText },
  { href: "/follow-up", label: "Follow-Up Tracker", icon: ActivitySquare },
  { href: "/telmed", label: "TelMed Voice", icon: Mic },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-medical-blue text-white">
            <Cross className="h-4.5 w-4.5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            MEDIMATE
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-medical-blue-light text-medical-blue-dark"
                    : "text-ink-muted hover:bg-bg-alt hover:text-ink"
                )}
                aria-current={active ? "page" : undefined}
              >
                <item.icon className="h-4 w-4" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-ink-muted hover:bg-bg-alt"
          aria-label="Profile"
        >
          <UserCircle2 className="h-6 w-6" strokeWidth={1.75} />
          <span className="hidden sm:inline">Profile</span>
        </Link>
      </div>
    </header>
  );
}
