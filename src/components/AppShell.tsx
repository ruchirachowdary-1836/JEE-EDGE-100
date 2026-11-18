"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, CalendarRange, BarChart3, BookOpen, Clapperboard, Sigma, FlaskConical, Dumbbell,
  Archive, Timer, NotebookPen, Repeat, Settings, ShieldCheck, LogOut, Menu, X, Sun, Moon, Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { group: "Overview", items: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/plan", label: "60-Day Plan", icon: CalendarRange },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ]},
  { group: "Learn", items: [
    { href: "/syllabus", label: "Syllabus & Notes", icon: BookOpen },
    { href: "/studio", label: "Concept Studio", icon: Clapperboard },
    { href: "/formulas", label: "Formula Lab", icon: Sigma },
    { href: "/chemistry", label: "Chemistry Lab", icon: FlaskConical },
  ]},
  { group: "Practise", items: [
    { href: "/gym", label: "Question Gym", icon: Dumbbell },
    { href: "/pyq", label: "PYQ Library", icon: Archive },
    { href: "/exams", label: "Exam Simulator", icon: Timer },
    { href: "/mistakes", label: "Mistake Notebook", icon: NotebookPen },
  ]},
  { group: "Revise", items: [{ href: "/revision", label: "Revision Centre", icon: Repeat }] },
];

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("jee-theme", next ? "dark" : "light"); } catch {}
  };
  return (
    <button onClick={toggle} className={cn("btn-ghost !px-2.5", className)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 text-white shadow-lg shadow-electric-500/30">
        <Target size={18} />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight">
          JEE EDGE <span className="bg-gradient-to-r from-electric-400 to-violet-400 bg-clip-text text-transparent">100</span>
        </span>
      )}
    </Link>
  );
}

function NavLinks({ isAdmin, onNavigate }: { isAdmin: boolean; onNavigate?: () => void }) {
  const path = usePathname();
  const groups = isAdmin ? [...NAV, { group: "Admin", items: [{ href: "/admin", label: "Content CMS", icon: ShieldCheck }] }] : NAV;
  return (
    <nav className="space-y-5">
      {groups.map((g) => (
        <div key={g.group}>
          <div className="muted mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.2em]">{g.group}</div>
          <div className="space-y-0.5">
            {g.items.map((it) => {
              const active = path === it.href || path.startsWith(it.href + "/");
              const Icon = it.icon;
              return (
                <Link key={it.href} href={it.href} onClick={onNavigate}
                  className={cn("group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                    active ? "bg-electric-500/10 text-electric-600 dark:text-electric-300" : "muted hover:bg-[var(--surface-2)] hover:text-[var(--text)]")}>
                  {active && <motion.span layoutId="nav-active" className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-electric-500" />}
                  <Icon size={17} />
                  {it.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ user, children }: { user: { name: string; email: string; role: string }; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isAdmin = user.role === "ADMIN";
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };
  const footer = (
    <div className="space-y-2 border-t border-[var(--border)] pt-4">
      <Link href="/settings" onClick={() => setOpen(false)} className="muted flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-[var(--surface-2)]">
        <Settings size={17} /> Settings
      </Link>
      <div className="flex items-center gap-2 px-1">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-500/15 font-bold text-violet-500">{user.name.slice(0, 1).toUpperCase()}</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{user.name}</div>
          <div className="muted truncate text-xs">{isAdmin ? "Administrator" : "Student"}</div>
        </div>
        <ThemeToggle />
        <button onClick={logout} className="btn-ghost !px-2.5" aria-label="Sign out" title="Sign out"><LogOut size={16} /></button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* desktop sidebar */}
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)] px-3 py-5 lg:flex">
        <div className="mb-6 px-2"><Logo /></div>
        <div className="flex-1 overflow-y-auto pr-1"><NavLinks isAdmin={isAdmin} /></div>
        {footer}
      </aside>

      {/* mobile top bar */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/90 px-4 py-3 backdrop-blur lg:hidden">
        <Logo />
        <button className="btn-ghost !px-2.5" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={18} /></button>
      </header>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[var(--surface)] px-3 py-5 lg:hidden"
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 28, stiffness: 300 }}>
              <div className="mb-6 flex items-center justify-between px-2">
                <Logo />
                <button className="btn-ghost !px-2.5" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-y-auto"><NavLinks isAdmin={isAdmin} onNavigate={() => setOpen(false)} /></div>
              {footer}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
