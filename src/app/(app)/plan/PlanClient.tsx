"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, Circle, Loader2, LifeBuoy, Settings2, BookOpen, Dumbbell, Archive, Repeat, Timer, Coffee } from "lucide-react";
import { api } from "@/lib/client";
import { ProgressBar } from "@/components/ui";
import { cn, SUBJECT_META } from "@/lib/utils";

type Task = { id: string; day: number; phase: number; kind: string; title: string; detail: string; minutes: number; questionTarget: number | null; completed: boolean; rescheduledFrom: number | null; chapterSlug: string | null };

const KIND_ICON: Record<string, typeof BookOpen> = { STUDY: BookOpen, PRACTICE: Dumbbell, PYQ: Archive, REVISION: Repeat, MOCK: Timer, BUFFER: Coffee };
const KIND_LINK: Record<string, (t: Task) => string> = {
  STUDY: (t) => (t.chapterSlug ? `/chapter/${t.chapterSlug}` : "/syllabus"),
  PRACTICE: (t) => (t.chapterSlug ? `/chapter/${t.chapterSlug}` : "/gym"),
  PYQ: (t) => (t.chapterSlug ? `/pyq?chapter=${t.chapterSlug}` : "/pyq"),
  REVISION: () => "/revision",
  MOCK: () => "/exams",
  BUFFER: () => "/mistakes",
};
const PHASE_COLOR = ["", "#2b8cff", "#8b5cf6", "#f59e0b", "#10b981"];

export function PlanSetup({ chapters, initialHours, initialCompleted, hasPlan, daysLeft }: { chapters: { id: string; name: string; subject: string }[]; initialHours: number; initialCompleted: string[]; hasPlan: boolean; daysLeft: number }) {
  const router = useRouter();
  const [hours, setHours] = useState(initialHours);
  const [done, setDone] = useState<string[]>(initialCompleted);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const generate = async () => {
    setErr("");
    if (hasPlan && !confirm("Replace your current plan? Completed-task history in the old plan will be archived.")) return;
    setBusy(true);
    try { await api("/api/plan", { body: { action: "generate", dailyHours: hours, completedChapterIds: done } }); router.refresh(); }
    catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };
  return (
    <div className="card card-pad">
      <h2 className="h2 mb-1">{hasPlan ? "Rebuild your plan" : "Build your plan"}</h2>
      <p className="muted mb-4 text-sm">The plan covers {Math.min(60, Math.max(daysLeft, 0))} days. Chapters you mark as already strong skip the study block in Phase 1 but still appear in practice, mocks and revision.</p>
      <div className="mb-4 max-w-sm">
        <label className="label">Study hours available per day: {hours} h</label>
        <input type="range" min={2} max={12} step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full accent-electric-500" />
        <p className="muted text-xs">{hours > 10 ? "Above 10 hours a day is hard to sustain for two months — consider leaving room for rest." : "Includes everything: study, practice, revision and tests."}</p>
      </div>
      <label className="label">Chapters already completed and strong ({done.length})</label>
      <div className="grid max-h-72 gap-1 overflow-y-auto rounded-xl border border-[var(--border)] p-2 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c) => (
          <label key={c.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-[var(--surface-2)]">
            <input type="checkbox" className="accent-electric-500" checked={done.includes(c.id)} onChange={() => setDone((d) => (d.includes(c.id) ? d.filter((x) => x !== c.id) : [...d, c.id]))} />
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: SUBJECT_META[c.subject].color }} />
            <span className="truncate">{c.name}</span>
          </label>
        ))}
      </div>
      {err && <p className="mt-2 text-sm text-rose-500">{err}</p>}
      <button className="btn-primary mt-4" onClick={generate} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} {hasPlan ? "Rebuild plan" : "Generate my plan"}</button>
    </div>
  );
}

export function PlanView({ phases, today, startDate, dailyHours, tasks, setup }: { phases: { n: number; name: string; focus: string }[]; today: number; startDate: string; dailyHours: number; tasks: Task[]; setup: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState(tasks);
  const [day, setDay] = useState(Math.max(1, Math.min(today, Math.max(...tasks.map((t) => t.day)))));
  const [msg, setMsg] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const lastDay = Math.max(...state.map((t) => t.day));
  const byDay = useMemo(() => {
    const m = new Map<number, Task[]>();
    state.forEach((t) => { if (!m.has(t.day)) m.set(t.day, []); m.get(t.day)!.push(t); });
    return m;
  }, [state]);
  const missed = state.filter((t) => t.day < today && !t.completed && t.kind !== "BUFFER").length;
  const dateOf = (d: number) => new Date(new Date(startDate).getTime() + (d - 1) * 86400_000).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });

  const toggle = async (t: Task) => {
    setState((s) => s.map((x) => (x.id === t.id ? { ...x, completed: !x.completed } : x)));
    try { await api("/api/plan", { method: "PATCH", body: { taskId: t.id, completed: !t.completed } }); }
    catch { setState((s) => s.map((x) => (x.id === t.id ? { ...x, completed: t.completed } : x))); }
  };
  const recover = async () => {
    const r = await api<{ moved: number; unplaced?: number }>("/api/plan", { body: { action: "recover" } });
    setMsg(r.moved ? `Moved ${r.moved} missed task(s) into buffer and lighter days${r.unplaced ? `; ${r.unplaced} could not fit without overloading a day — skip or do them on rest time` : ""}.` : "Nothing to recover.");
    router.refresh();
  };

  const dayTasks = byDay.get(day) ?? [];
  const dayMinutes = dayTasks.reduce((a, t) => a + (t.kind === "BUFFER" ? 0 : t.minutes), 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-4">
        {phases.map((p) => {
          const pt = state.filter((t) => t.phase === p.n);
          const pct = pt.length ? Math.round((pt.filter((t) => t.completed).length / pt.length) * 100) : 0;
          const days = [...new Set(pt.map((t) => t.day))];
          return (
            <div key={p.n} className="card card-pad">
              <div className="text-xs font-bold uppercase" style={{ color: PHASE_COLOR[p.n] }}>Phase {p.n} · days {Math.min(...days)}–{Math.max(...days)}</div>
              <div className="font-display font-semibold">{p.name}</div>
              <p className="muted mb-3 text-xs">{p.focus}</p>
              <ProgressBar value={pct} label="Tasks done" />
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {missed > 0 && <button className="btn-violet" onClick={recover}><LifeBuoy size={16} /> Recover {missed} missed task{missed > 1 ? "s" : ""}</button>}
        <button className="btn-ghost" onClick={() => setShowSetup(!showSetup)}><Settings2 size={16} /> Customise / rebuild</button>
        <span className="muted text-sm">Budget: {dailyHours} h/day</span>
        {msg && <span className="text-sm text-emerald-600">{msg}</span>}
      </div>
      {showSetup && setup}

      <div className="card card-pad">
        <div className="mb-3 flex items-center justify-between"><h2 className="h2">Calendar</h2><span className="muted text-xs">Day {Math.min(Math.max(today, 0), lastDay)} of {lastDay}</span></div>
        <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10 lg:grid-cols-15" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))" }}>
          {Array.from({ length: lastDay }, (_, i) => i + 1).map((d) => {
            const ts = byDay.get(d) ?? [];
            const done = ts.filter((t) => t.completed).length;
            const all = ts.length;
            const ph = ts[0]?.phase ?? 1;
            const isMissed = d < today && done < ts.filter((t) => t.kind !== "BUFFER").length;
            return (
              <button key={d} onClick={() => setDay(d)} className={cn("relative rounded-lg border p-1.5 text-center text-xs transition", d === day ? "border-electric-500 ring-2 ring-electric-500/30" : "border-[var(--border)]", d === today && "font-bold")}
                style={{ background: all && done === all ? "rgba(16,185,129,0.18)" : undefined }}>
                <div style={{ color: PHASE_COLOR[ph] }}>{d}</div>
                <div className="muted text-[9px]">{dateOf(d)}</div>
                {isMissed && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />}
                {ts.some((t) => t.kind === "MOCK") && <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-amber-500" title="Mock test" />}
              </button>
            );
          })}
        </div>
        <p className="muted mt-2 text-xs">Green = all done · red dot = missed tasks · amber dot = mock test day.</p>
      </div>

      <div className="card card-pad">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="h2">Day {day} · {dateOf(day)} {day === today && <span className="chip ml-1 bg-electric-500/10 text-electric-500">today</span>}</h2>
          <span className="muted text-sm">{Math.floor(dayMinutes / 60)} h {dayMinutes % 60} min planned</span>
        </div>
        <ul className="space-y-2">
          {dayTasks.map((t) => {
            const Icon = KIND_ICON[t.kind] ?? BookOpen;
            return (
              <li key={t.id} className={cn("flex items-start gap-3 rounded-xl border border-[var(--border)] p-3", t.completed && "opacity-60")}>
                <button onClick={() => toggle(t)} aria-label={t.completed ? "Mark not done" : "Mark done"} className="mt-0.5">{t.completed ? <CheckCircle2 className="text-emerald-500" size={20} /> : <Circle className="muted" size={20} />}</button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon size={15} className="text-electric-500" />
                    <Link href={KIND_LINK[t.kind]?.(t) ?? "#"} className={cn("font-semibold hover:underline", t.completed && "line-through")}>{t.title}</Link>
                    <span className="chip bg-[var(--surface-2)]">{t.minutes} min</span>
                    {t.questionTarget && <span className="chip bg-violet-500/10 text-violet-500">{t.questionTarget} questions</span>}
                    {t.rescheduledFrom && <span className="chip bg-amber-500/10 text-amber-600">moved from day {t.rescheduledFrom}</span>}
                  </div>
                  {t.detail && <p className="muted mt-1 text-sm">{t.detail}</p>}
                </div>
              </li>
            );
          })}
          {dayTasks.length === 0 && <li className="muted text-sm">No tasks on this day.</li>}
        </ul>
      </div>
    </div>
  );
}
