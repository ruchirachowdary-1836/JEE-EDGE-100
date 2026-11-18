"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Clock, ChevronLeft, ChevronRight, Loader2, AlertTriangle, User } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { api } from "@/lib/client";
import { cn, SUBJECT_META } from "@/lib/utils";

type State = "NOT_VISITED" | "NOT_ANSWERED" | "ANSWERED" | "MARKED" | "ANSWERED_MARKED";
type Q = { id: string; section: string; type: "MCQ" | "NUMERICAL"; statement: string; options: { id: string; label: string; text: string }[]; selectedOptionId: string | null; numericalResponse: number | null; state: State };

const STATE_STYLE: Record<State, string> = {
  NOT_VISITED: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300",
  NOT_ANSWERED: "bg-rose-500 text-white",
  ANSWERED: "bg-emerald-500 text-white",
  MARKED: "bg-violet-500 text-white rounded-full",
  ANSWERED_MARKED: "bg-violet-500 text-white rounded-full ring-2 ring-emerald-400 ring-offset-1 ring-offset-[var(--surface)]",
};
const STATE_LABEL: Record<State, string> = { NOT_VISITED: "Not visited", NOT_ANSWERED: "Not answered", ANSWERED: "Answered", MARKED: "Marked for review", ANSWERED_MARKED: "Answered & marked (evaluated)" };

export function CBT({ attemptId, title, candidate, endsAt, serverNow, marks, questions: initial }: {
  attemptId: string; title: string; candidate: string; endsAt: string; serverNow: string;
  marks: { correct: number; incorrectMcq: number; incorrectNumerical: number }; questions: Q[];
}) {
  const router = useRouter();
  const [qs, setQs] = useState<Q[]>(initial);
  const [idx, setIdx] = useState(0);
  const [draftOpt, setDraftOpt] = useState<string | null>(initial[0]?.selectedOptionId ?? null);
  const [draftNum, setDraftNum] = useState<string>(initial[0]?.numericalResponse?.toString() ?? "");
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const offset = useRef(new Date(serverNow).getTime() - Date.now());
  const [remaining, setRemaining] = useState(() => new Date(endsAt).getTime() - (Date.now() + offset.current));
  const enteredAt = useRef(Date.now());
  const submittedRef = useRef(false);

  const sections = useMemo(() => [...new Set(qs.map((q) => q.section))], [qs]);
  const cur = qs[idx];

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    try {
      await api(`/api/exams/${attemptId}/submit`, { method: "POST" });
      router.replace(`/exams/${attemptId}/result`);
    } catch (e) {
      submittedRef.current = false;
      setSubmitting(false);
      setError((e as Error).message);
    }
  }, [attemptId, router]);

  useEffect(() => {
    const id = setInterval(() => {
      const left = new Date(endsAt).getTime() - (Date.now() + offset.current);
      setRemaining(left);
      if (left <= 0) submit();
    }, 500);
    return () => clearInterval(id);
  }, [endsAt, submit]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (!submittedRef.current) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const persist = async (q: Q, state: State, opt: string | null, num: number | null) => {
    const delta = Math.round((Date.now() - enteredAt.current) / 1000);
    enteredAt.current = Date.now();
    setQs((list) => list.map((x) => (x.id === q.id ? { ...x, state, selectedOptionId: opt, numericalResponse: num } : x)));
    try {
      await api(`/api/exams/${attemptId}/response`, { method: "PUT", body: { questionId: q.id, selectedOptionId: opt, numericalResponse: num, state, timeDeltaSec: delta } });
      setError("");
    } catch (e) { setError(`Not saved: ${(e as Error).message}`); }
  };

  const goto = (next: number, list = qs) => {
    const n = Math.max(0, Math.min(list.length - 1, next));
    setIdx(n);
    setDraftOpt(list[n].selectedOptionId);
    setDraftNum(list[n].numericalResponse?.toString() ?? "");
  };

  const draftValue = (): { opt: string | null; num: number | null; has: boolean } => {
    if (cur.type === "MCQ") return { opt: draftOpt, num: null, has: !!draftOpt };
    const v = draftNum.trim();
    if (v === "" || Number.isNaN(Number(v))) return { opt: null, num: null, has: false };
    return { opt: null, num: Number(v), has: true };
  };

  const leave = async (next: number) => {
    // navigating away keeps only the saved answer; an unvisited question becomes "not answered"
    const state = cur.state === "NOT_VISITED" ? "NOT_ANSWERED" : cur.state;
    await persist(cur, state, cur.selectedOptionId, cur.numericalResponse);
    goto(next, qs.map((x) => (x.id === cur.id ? { ...x, state } : x)));
  };

  const saveNext = async (mark: boolean) => {
    const d = draftValue();
    if (cur.type === "NUMERICAL" && draftNum.trim() !== "" && Number.isNaN(Number(draftNum))) { setError("Numerical answers must be numbers."); return; }
    const state: State = d.has ? (mark ? "ANSWERED_MARKED" : "ANSWERED") : mark ? "MARKED" : "NOT_ANSWERED";
    await persist(cur, state, d.opt, d.num);
    const updated = qs.map((x) => (x.id === cur.id ? { ...x, state, selectedOptionId: d.opt, numericalResponse: d.num } : x));
    goto(idx + 1 < qs.length ? idx + 1 : idx, updated);
  };

  const clear = async () => {
    setDraftOpt(null);
    setDraftNum("");
    await persist(cur, "NOT_ANSWERED", null, null);
  };

  const counts = useMemo(() => {
    const c: Record<State, number> = { NOT_VISITED: 0, NOT_ANSWERED: 0, ANSWERED: 0, MARKED: 0, ANSWERED_MARKED: 0 };
    qs.forEach((q, i) => { c[i === idx && q.state === "NOT_VISITED" ? "NOT_ANSWERED" : q.state]++; });
    return c;
  }, [qs, idx]);

  const mm = Math.max(0, Math.floor(remaining / 60000));
  const ss = Math.max(0, Math.floor((remaining % 60000) / 1000));
  const hh = Math.floor(mm / 60);
  const low = remaining < 5 * 60_000;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <div>
          <div className="font-display font-bold">{title}</div>
          <div className="muted flex items-center gap-1 text-xs"><User size={12} /> {candidate} · +{marks.correct} correct, {marks.incorrectMcq} wrong MCQ, {marks.incorrectNumerical} wrong numerical</div>
        </div>
        <div className={cn("flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-bold tabular-nums", low ? "bg-rose-500/15 text-rose-500" : "bg-electric-500/10 text-electric-600 dark:text-electric-300")} aria-live="polite">
          <Clock size={18} /> {hh > 0 ? `${hh}:${String(mm % 60).padStart(2, "0")}` : String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
        </div>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2">
        {sections.map((s) => {
          const first = qs.findIndex((q) => q.section === s);
          return (
            <button key={s} onClick={() => leave(first)} className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold", cur.section === s ? "bg-electric-500 text-white" : "muted hover:bg-[var(--surface-2)]")}>
              {SUBJECT_META[s]?.name ?? s} ({qs.filter((q) => q.section === s).length})
            </button>
          );
        })}
      </div>

      <div className="grid flex-1 gap-4 p-4 lg:grid-cols-[1fr_300px]">
        <main className="card flex flex-col">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3 text-sm">
            <span className="font-bold">Question {idx + 1} of {qs.length}</span>
            <span className="muted">{cur.type === "MCQ" ? "Single correct option" : "Numerical value — type your answer"}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <Rich text={cur.statement} className="text-[15px]" />
            {cur.type === "MCQ" ? (
              <div className="mt-5 grid gap-2">
                {cur.options.map((o) => (
                  <label key={o.id} className={cn("flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition", draftOpt === o.id ? "border-electric-500 bg-electric-500/10" : "border-[var(--border)] hover:border-electric-400")}>
                    <input type="radio" name={`q-${cur.id}`} className="mt-1 accent-electric-500" checked={draftOpt === o.id} onChange={() => setDraftOpt(o.id)} />
                    <span className="font-bold">{o.label}.</span><span className="flex-1"><Inline text={o.text} /></span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="mt-5 max-w-xs">
                <input className="input font-mono text-lg" inputMode="decimal" value={draftNum} onChange={(e) => setDraftNum(e.target.value.replace(/[^0-9.\-]/g, ""))} placeholder="Enter value" aria-label="Numerical answer" />
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {["7", "8", "9", "⌫", "4", "5", "6", "-", "1", "2", "3", ".", "0", "C"].map((k) => (
                    <button key={k} className="btn-ghost !px-0 !py-2" onClick={() => setDraftNum((v) => (k === "⌫" ? v.slice(0, -1) : k === "C" ? "" : k === "-" ? (v.startsWith("-") ? v.slice(1) : `-${v}`) : k === "." && v.includes(".") ? v : v + k))}>{k}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {error && <div className="mx-5 mb-2 flex items-center gap-2 rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-600"><AlertTriangle size={14} /> {error}</div>}
          <div className="flex flex-wrap gap-2 border-t border-[var(--border)] p-4">
            <button className="btn bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => saveNext(false)}>Save &amp; Next</button>
            <button className="btn bg-violet-500 text-white hover:bg-violet-600" onClick={() => saveNext(true)}>Save &amp; Mark for Review</button>
            <button className="btn-ghost" onClick={clear}>Clear Response</button>
            <div className="ml-auto flex gap-2">
              <button className="btn-ghost" onClick={() => leave(idx - 1)} disabled={idx === 0}><ChevronLeft size={16} /> Back</button>
              <button className="btn-ghost" onClick={() => leave(idx + 1)} disabled={idx === qs.length - 1}>Next <ChevronRight size={16} /></button>
            </div>
          </div>
        </main>

        <aside className="card card-pad h-fit lg:sticky lg:top-4">
          <div className="mb-3 grid grid-cols-2 gap-2 text-[11px]">
            {(Object.keys(STATE_LABEL) as State[]).map((s) => (
              <div key={s} className="flex items-center gap-2"><span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold", STATE_STYLE[s])}>{counts[s]}</span>{STATE_LABEL[s]}</div>
            ))}
          </div>
          {sections.map((s) => (
            <div key={s} className="mb-3">
              <div className="muted mb-1 text-[10px] font-bold uppercase tracking-wide">{SUBJECT_META[s]?.name ?? s}</div>
              <div className="grid grid-cols-6 gap-1.5">
                {qs.map((q, i) => q.section === s && (
                  <button key={q.id} onClick={() => leave(i)} className={cn("grid h-8 place-items-center rounded-md text-xs font-bold transition", STATE_STYLE[i === idx && q.state === "NOT_VISITED" ? "NOT_ANSWERED" : q.state], i === idx && "outline outline-2 outline-offset-1 outline-electric-500")} aria-label={`Question ${i + 1}: ${STATE_LABEL[q.state]}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn-primary mt-2 w-full" onClick={() => setConfirm(true)} disabled={submitting}>Submit test</button>
        </aside>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="card card-pad w-full max-w-md">
            <h2 className="h2 mb-2">Submit the test?</h2>
            <p className="muted mb-3 text-sm">You cannot change answers after submitting. Questions only “marked for review” without an answer are not evaluated; “answered &amp; marked” ones are.</p>
            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
              <div>Answered: <strong>{counts.ANSWERED + counts.ANSWERED_MARKED}</strong></div>
              <div>Not answered: <strong>{counts.NOT_ANSWERED}</strong></div>
              <div>Marked (no answer): <strong>{counts.MARKED}</strong></div>
              <div>Not visited: <strong>{counts.NOT_VISITED}</strong></div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn-ghost" onClick={() => setConfirm(false)}>Keep working</button>
              <button className="btn-primary" onClick={submit} disabled={submitting}>{submitting && <Loader2 size={16} className="animate-spin" />} Submit</button>
            </div>
          </div>
        </div>
      )}
      {submitting && !confirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60"><div className="card card-pad flex items-center gap-2"><Loader2 className="animate-spin" /> Time is up — submitting…</div></div>
      )}
    </div>
  );
}
