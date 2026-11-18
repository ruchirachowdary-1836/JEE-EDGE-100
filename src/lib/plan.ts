import type { PlanTaskKind } from "@prisma/client";

export type PlanChapter = { id: string; name: string; subject: string; planWeight: number };
export type PlanTaskDraft = {
  day: number; phase: number; kind: PlanTaskKind; title: string; detail: string;
  chapterId: string | null; minutes: number; questionTarget: number | null;
};

export const PHASES = [
  { n: 1, name: "Concept Foundation", focus: "Close concept gaps, essential theory and fundamental problem-solving." },
  { n: 2, name: "Concept Application", focus: "Chapter-wise practice, PYQs and multi-concept questions." },
  { n: 3, name: "Exam Mastery", focus: "Timed practice, full-length mocks and weak-topic correction." },
  { n: 4, name: "Final Revision", focus: "Formula revision, PYQs, mistake notebook, mocks and exam strategy." },
];

const SUBJECT_NAME: Record<string, string> = { physics: "Physics", chemistry: "Chemistry", mathematics: "Mathematics" };

/** Interleave subjects so consecutive study blocks alternate (P, C, M, P, C, M …), heavier chapters first. */
function interleave(chapters: PlanChapter[]) {
  const bySubject = new Map<string, PlanChapter[]>();
  for (const c of [...chapters].sort((a, b) => b.planWeight - a.planWeight)) {
    if (!bySubject.has(c.subject)) bySubject.set(c.subject, []);
    bySubject.get(c.subject)!.push(c);
  }
  const queues = [...bySubject.values()];
  const out: PlanChapter[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
}

/**
 * Builds a realistic plan. Every day's minutes sum to at most dailyHours × 60, with a lighter buffer
 * day every seventh day for missed-task recovery, and no mocks in the final two days.
 */
export function generatePlan(opts: { days: number; dailyHours: number; chapters: PlanChapter[]; completedChapterIds: string[] }): PlanTaskDraft[] {
  const days = Math.max(7, Math.min(120, opts.days));
  const budget = Math.round(Math.max(2, Math.min(12, opts.dailyHours)) * 60);
  const pending = interleave(opts.chapters.filter((c) => !opts.completedChapterIds.includes(c.id)));
  const done = interleave(opts.chapters.filter((c) => opts.completedChapterIds.includes(c.id)));
  const allOrdered = interleave(opts.chapters);

  // Phase boundaries scaled to the available days (60 days → 15/15/15/15).
  const b1 = Math.round(days * 0.25), b2 = Math.round(days * 0.5), b3 = Math.round(days * 0.75);
  const phaseOf = (d: number) => (d <= b1 ? 1 : d <= b2 ? 2 : d <= b3 ? 3 : 4);
  const isBuffer = (d: number) => d % 7 === 0 && d < days - 1;

  const tasks: PlanTaskDraft[] = [];
  const add = (t: Omit<PlanTaskDraft, "detail"> & { detail?: string }) => tasks.push({ detail: "", ...t });

  // Study slots in phases 1–2 for pending chapters.
  const studyDays = Array.from({ length: b2 }, (_, i) => i + 1).filter((d) => !isBuffer(d));
  const slotsPerDay = Math.max(1, Math.ceil(pending.length / Math.max(1, studyDays.length)));
  const studyMinutes = Math.round((budget * 0.55) / Math.min(slotsPerDay, 3));
  let cursor = 0;
  const studiedSoFar: PlanChapter[] = [...done];
  let practiceCursor = 0;
  let revisionCursor = 0;

  for (let d = 1; d <= days; d++) {
    const phase = phaseOf(d);
    if (isBuffer(d)) {
      add({ day: d, phase, kind: "BUFFER", title: "Buffer day — catch up on missed tasks", detail: "Missed tasks are moved here when you use ‘Recover missed tasks’. If nothing is pending, do a light mixed revision.", chapterId: null, minutes: Math.round(budget * 0.5), questionTarget: null });
      add({ day: d, phase, kind: "REVISION", title: "Weekly mistake-notebook review", detail: "Re-attempt every unresolved mistake due this week.", chapterId: null, minutes: Math.round(budget * 0.25), questionTarget: null });
      continue;
    }
    if (phase <= 2) {
      const todays: PlanChapter[] = [];
      for (let s = 0; s < Math.min(slotsPerDay, 3) && cursor < pending.length; s++) todays.push(pending[cursor++]);
      let used = 0;
      for (const c of todays) {
        add({ day: d, phase, kind: "STUDY", title: `Study: ${c.name}`, detail: `${SUBJECT_NAME[c.subject]} — notes, derivations and the formula sheet. Mark the chapter's topics as studied.`, chapterId: c.id, minutes: studyMinutes, questionTarget: null });
        used += studyMinutes;
        studiedSoFar.push(c);
      }
      const remaining = budget - used;
      const practicePool = studiedSoFar.length ? studiedSoFar : allOrdered;
      const pc = practicePool[practiceCursor++ % practicePool.length];
      if (phase === 1) {
        add({ day: d, phase, kind: "PRACTICE", title: `Question Gym: ${pc.name}`, detail: "Levels 1–3. Read every solution, including for questions you got right.", chapterId: pc.id, minutes: Math.round(remaining * 0.7), questionTarget: 20 });
      } else {
        add({ day: d, phase, kind: "PYQ", title: `PYQs + Gym levels 3–4: ${pc.name}`, detail: "Chapter-wise previous-year questions where available, then multi-step Gym questions.", chapterId: pc.id, minutes: Math.round(remaining * 0.7), questionTarget: 25 });
      }
      add({ day: d, phase, kind: "REVISION", title: "Formula flashcards (due cards)", detail: "Clear today's spaced-repetition queue.", chapterId: null, minutes: Math.round(remaining * 0.3), questionTarget: null });
      continue;
    }
    if (phase === 3) {
      const mockDay = (d - b2) % 3 === 1;
      const analysisDay = (d - b2) % 3 === 2;
      if (mockDay) {
        add({ day: d, phase, kind: "MOCK", title: "Full-length mock test (3 hours)", detail: "Exam conditions: one sitting, no breaks, no notes.", chapterId: null, minutes: 180, questionTarget: 75 });
        add({ day: d, phase, kind: "REVISION", title: "Light formula revision", detail: "Only after the mock — no new topics.", chapterId: null, minutes: Math.max(0, Math.min(60, budget - 180)), questionTarget: null });
      } else if (analysisDay) {
        add({ day: d, phase, kind: "REVISION", title: "Mock analysis and mistake classification", detail: "Classify every wrong or skipped question in the result page, then add them to the mistake notebook.", chapterId: null, minutes: Math.round(budget * 0.35), questionTarget: null });
        const wc = allOrdered[practiceCursor++ % allOrdered.length];
        add({ day: d, phase, kind: "PRACTICE", title: `Weak-topic correction: ${wc.name}`, detail: "Swap in the weakest chapter from your Analytics page if it differs.", chapterId: wc.id, minutes: Math.round(budget * 0.65), questionTarget: 30 });
      } else {
        const tc = allOrdered[practiceCursor++ % allOrdered.length];
        add({ day: d, phase, kind: "PRACTICE", title: `Timed chapter test: ${tc.name}`, detail: "Use Exams → Chapter test with a strict timer.", chapterId: tc.id, minutes: Math.round(budget * 0.5), questionTarget: 25 });
        add({ day: d, phase, kind: "PYQ", title: "Mixed timed PYQ set", detail: "Mixed chapters, 2 minutes per question.", chapterId: null, minutes: Math.round(budget * 0.3), questionTarget: 20 });
        add({ day: d, phase, kind: "REVISION", title: "Formula flashcards (due cards)", chapterId: null, minutes: Math.round(budget * 0.2), questionTarget: null });
      }
      continue;
    }
    // Phase 4 — final revision
    const daysLeft = days - d;
    if (daysLeft === 0) {
      add({ day: d, phase, kind: "REVISION", title: "Final day: formula sheets only, then rest", detail: "Skim the quick-revision summaries. Sleep early. Check admit card, ID and exam-centre route.", chapterId: null, minutes: Math.min(120, budget), questionTarget: null });
      continue;
    }
    if (daysLeft === 1) {
      add({ day: d, phase, kind: "REVISION", title: "One-day revision plan", detail: "Revision Command Centre → One-day revision. No mocks and no new problems.", chapterId: null, minutes: Math.round(budget * 0.6), questionTarget: null });
      add({ day: d, phase, kind: "REVISION", title: "Exam strategy rehearsal", detail: "Decide your subject order and time checkpoints (e.g. 60/120/170 minutes).", chapterId: null, minutes: 30, questionTarget: null });
      continue;
    }
    const mock = (d - b3) % 3 === 1 && daysLeft >= 3;
    if (mock) {
      add({ day: d, phase, kind: "MOCK", title: "Full-length mock test (3 hours)", detail: "Same time of day as your actual exam shift.", chapterId: null, minutes: 180, questionTarget: 75 });
      add({ day: d, phase, kind: "REVISION", title: "Mock review — classify mistakes", chapterId: null, minutes: Math.max(0, Math.min(90, budget - 180)), questionTarget: null });
    } else {
      const rc = allOrdered[revisionCursor++ % allOrdered.length];
      const rc2 = allOrdered[revisionCursor++ % allOrdered.length];
      add({ day: d, phase, kind: "REVISION", title: `Formula + summary revision: ${rc.name}, ${rc2.name}`, detail: "Quick-revision summaries and formula flashcards for both chapters.", chapterId: rc.id, minutes: Math.round(budget * 0.4), questionTarget: null });
      add({ day: d, phase, kind: "PYQ", title: "PYQ revision: incorrect and bookmarked", detail: "PYQ Library → filters ‘Incorrect’ and ‘Bookmarked’.", chapterId: null, minutes: Math.round(budget * 0.35), questionTarget: 20 });
      add({ day: d, phase, kind: "REVISION", title: "Mistake notebook — due reviews", chapterId: null, minutes: Math.round(budget * 0.25), questionTarget: null });
    }
  }
  return tasks;
}
