import Link from "next/link";
import { Cross } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNav() {
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

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <a href="#features" className="text-sm font-medium text-ink-muted hover:text-ink">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-ink-muted hover:text-ink">
            How it works
          </a>
          <a href="#trust" className="text-sm font-medium text-ink-muted hover:text-ink">
            Security
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Link href="/dashboard">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
