"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  ["/admin", "Overview & review queue"], ["/admin/syllabus", "Chapters, topics & notes"], ["/admin/formulas", "Formulas"],
  ["/admin/questions", "Questions & PYQs"], ["/admin/animations", "Animated lessons"], ["/admin/mocks", "Mock exams"], ["/admin/settings", "Exam configuration"],
] as const;

export function AdminNav() {
  const path = usePathname();
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-500">Content management</div>
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {LINKS.map(([href, label]) => {
          const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
          return <Link key={href} href={href} className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold", active ? "bg-violet-500 text-white" : "muted hover:bg-[var(--surface-2)]")}>{label}</Link>;
        })}
      </div>
    </div>
  );
}
