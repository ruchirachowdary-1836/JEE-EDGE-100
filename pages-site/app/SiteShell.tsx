"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Target, Menu, X, BookOpen, Clapperboard, Sigma, FlaskConical, Dumbbell, Repeat, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/AppShell";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/strategy", label: "AIR 100 Playbook", icon: Trophy },
  { href: "/syllabus", label: "Syllabus & Notes", icon: BookOpen },
  { href: "/studio", label: "Concept Studio", icon: Clapperboard },
  { href: "/formulas", label: "Formula Lab", icon: Sigma },
  { href: "/gym", label: "Question Gym", icon: Dumbbell },
  { href: "/chemistry", label: "Chemistry Lab", icon: FlaskConical },
  { href: "/revision", label: "Flashcards", icon: Repeat },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const links = (onClick?: () => void) => NAV.map((n) => {
    const active = path === n.href || path.startsWith(n.href + "/");
    return (
      <Link key={n.href} href={n.href} onClick={onClick} className={cn("flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition", active ? "bg-electric-500/10 text-electric-600 dark:text-electric-300" : "muted hover:bg-[var(--surface-2)] hover:text-[var(--text)]")}>
        <n.icon size={15} /> {n.label}
      </Link>
    );
  });
  return (
    <div className="min-h-screen">
      <header className="no-print sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 text-white"><Target size={18} /></span>
            <span className="font-display text-lg font-bold">JEE EDGE <span className="bg-gradient-to-r from-electric-400 to-violet-400 bg-clip-text text-transparent">100</span></span>
          </Link>
          <nav className="ml-4 hidden flex-1 items-center gap-1 xl:flex">{links()}</nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button className="btn-ghost !px-2.5 xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {open && <nav className="grid gap-1 border-t border-[var(--border)] px-4 py-3 xl:hidden">{links(() => setOpen(false))}</nav>}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
    </div>
  );
}
