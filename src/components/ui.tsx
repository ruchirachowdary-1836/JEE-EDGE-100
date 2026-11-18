import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck, ShieldAlert, Clock3, Inbox } from "lucide-react";
import { cn, REVIEW_LABELS, SUBJECT_META } from "@/lib/utils";

export function PageHeader({ title, subtitle, actions, eyebrow }: { title: string; subtitle?: ReactNode; actions?: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <div className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-electric-500">{eyebrow}</div>}
        <h1 className="h1">{title}</h1>
        {subtitle && <p className="muted mt-1 max-w-3xl text-sm sm:text-base">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className, pad = true }: { children: ReactNode; className?: string; pad?: boolean }) {
  return <div className={cn("card", pad && "card-pad", className)}>{children}</div>;
}

export function ProgressBar({ value, color = "bg-electric-500", className, label }: { value: number; color?: string; className?: string; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {label && (
        <div className="mb-1 flex justify-between text-xs font-medium">
          <span className="muted">{label}</span>
          <span>{v}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
        <div className={cn("h-full rounded-full transition-all duration-700", color)} style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

export function ProgressRing({ value, size = 96, stroke = 9, color = "#2b8cff", label, sub }: { value: number; size?: number; stroke?: number; color?: string; label?: ReactNode; sub?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-slate-200 dark:stroke-white/10" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke={color} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (v / 100) * c} style={{ transition: "stroke-dashoffset 900ms ease" }} />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-xl font-bold">{label ?? `${v}%`}</div>
        {sub && <div className="muted text-[10px] font-semibold uppercase tracking-wide">{sub}</div>}
      </div>
    </div>
  );
}

export function Stat({ label, value, hint, icon }: { label: string; value: ReactNode; hint?: ReactNode; icon?: ReactNode }) {
  return (
    <Card className="flex items-start gap-3">
      {icon && <div className="rounded-xl bg-electric-500/10 p-2 text-electric-500">{icon}</div>}
      <div className="min-w-0">
        <div className="muted text-xs font-semibold uppercase tracking-wide">{label}</div>
        <div className="font-display text-2xl font-bold">{value}</div>
        {hint && <div className="muted text-xs">{hint}</div>}
      </div>
    </Card>
  );
}

export function ReviewBadge({ status }: { status: string }) {
  const verified = status === "VERIFIED";
  // Students only see a badge for content an expert has verified; review workflow lives in the CMS.
  if (!verified) return null;
  const Icon = verified ? ShieldCheck : status === "CHANGES_REQUESTED" ? ShieldAlert : Clock3;
  return (
    <span
      title={verified ? "Checked and signed off by a subject expert" : "Published for study; expert sign-off is still pending"}
      className={cn(
        "chip",
        verified ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      )}
    >
      <Icon size={12} /> {REVIEW_LABELS[status] ?? status}
    </span>
  );
}

export function SubjectChip({ slug }: { slug: string }) {
  const m = SUBJECT_META[slug];
  if (!m) return null;
  return (
    <span className="chip bg-[var(--surface-2)]">
      <span className="h-2 w-2 rounded-full" style={{ background: m.color }} />
      {m.name}
    </span>
  );
}

export function Empty({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <Card className="flex flex-col items-center py-10 text-center">
      <div className="mb-3 rounded-2xl bg-[var(--surface-2)] p-3"><Inbox className="text-electric-500" /></div>
      <div className="h2">{title}</div>
      {children && <div className="muted mt-1 max-w-lg text-sm">{children}</div>}
      {action && <div className="mt-4">{action}</div>}
    </Card>
  );
}

export function Pending({ what }: { what: string }) {
  return (
    <div className="muted rounded-xl border border-[var(--border)] px-4 py-3 text-sm">
      {what} is coming soon.
    </div>
  );
}

export function StageBadge({ stage }: { stage: string }) {
  const map: Record<string, string> = {
    NOT_STARTED: "bg-slate-500/10 text-slate-500",
    STUDIED: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    PRACTICED: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    REVISED: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    MASTERED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  };
  const label: Record<string, string> = { NOT_STARTED: "Not started", STUDIED: "Studied", PRACTICED: "Practised", REVISED: "Revised", MASTERED: "Mastered" };
  return <span className={cn("chip", map[stage])}>{label[stage]}</span>;
}

export function Tabs({ tabs, active }: { tabs: { href: string; label: string; key: string }[]; active: string }) {
  return (
    <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
      {tabs.map((t) => (
        <Link key={t.key} href={t.href} className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition", t.key === active ? "bg-electric-500 text-white" : "muted hover:bg-[var(--surface-2)]")}>
          {t.label}
        </Link>
      ))}
    </div>
  );
}
