export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const SUBJECT_META: Record<string, { name: string; color: string; text: string; bg: string; ring: string }> = {
  physics: { name: "Physics", color: "#38bdf8", text: "text-sky-500 dark:text-sky-400", bg: "bg-sky-500", ring: "ring-sky-400/40" },
  chemistry: { name: "Chemistry", color: "#34d399", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500", ring: "ring-emerald-400/40" },
  mathematics: { name: "Mathematics", color: "#f472b6", text: "text-pink-600 dark:text-pink-400", bg: "bg-pink-500", ring: "ring-pink-400/40" },
};

/** Today's date (YYYY-MM-DD) in India Standard Time, used for streaks and daily targets. */
export function istDay(d = new Date()) {
  return new Date(d.getTime() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

export function startOfIstDay(d = new Date()) {
  return new Date(`${istDay(d)}T00:00:00+05:30`);
}

export function daysBetween(a: Date, b: Date) {
  return Math.ceil((b.getTime() - a.getTime()) / 86400_000);
}

export function pct(n: number, d: number) {
  return d === 0 ? 0 : Math.round((n / d) * 100);
}

export function fmtDuration(sec: number) {
  if (sec < 60) return `${Math.round(sec)}s`;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return s ? `${m}m ${s}s` : `${m}m`;
}

export function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

export const MISTAKE_LABELS: Record<string, string> = {
  CONCEPTUAL: "Conceptual error",
  FORMULA_SELECTION: "Formula selection error",
  CALCULATION: "Calculation error",
  INTERPRETATION: "Question interpretation error",
  TIME_MANAGEMENT: "Time-management error",
  GUESSING: "Guessing error",
};

export const REVIEW_LABELS: Record<string, string> = {
  PENDING: "Awaiting expert review",
  IN_REVIEW: "In expert review",
  CHANGES_REQUESTED: "Changes requested",
  VERIFIED: "Expert verified",
};
