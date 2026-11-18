"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, XCircle, Clock, Loader2, Lightbulb, AlertTriangle, Sigma, BookmarkPlus, NotebookPen } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { BookmarkButton } from "@/components/BookmarkButton";
import { api } from "@/lib/client";
import { cn, fmtDuration, MISTAKE_LABELS } from "@/lib/utils";

export type CardQuestion = {
  id: string; type: "MCQ" | "NUMERICAL"; statement: string; level: number | null; difficulty: string; approxTimeSec: number;
  source: string; pyqYear: number | null; pyqSession: string | null; pyqShift: string | null; sourceAttribution: string | null;
  chapter: { name: string; slug: string }; topic: { name: string; slug: string } | null;
  options: { id: string; label: string; text: string }[];
};

type Reveal = {
  isCorrect: boolean; correctOptionId: string | null; correctAnswerText: string; numericalAnswer: number | null;
  solution: string; conceptTested: string; formulaUsed: string; whyFormula: string; altMethod: string | null; commonMistakes: string; approxTimeSec: number;
  options: { id: string; label: string; isCorrect: boolean; explanation: string }[];
  related: { id: string; statement: string; topicSlug: string | null }[];
  levelUnlocked: number | null;
};

export function QuestionCard({ q, index, context, bookmarked, lastResult, onAnswered }: {
  q: CardQuestion; index?: number; context: "GYM" | "PYQ" | "REVISION"; bookmarked: boolean;
  lastResult?: boolean | null; onAnswered?: (r: { isCorrect: boolean; levelUnlocked: number | null }) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [num, setNum] = useState("");
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [obs, setObs] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const start = useRef(Date.now());

  useEffect(() => {
    if (reveal) return;
    const id = setInterval(() => setElapsed(Math.round((Date.now() - start.current) / 1000)), 1000);
    return () => clearInterval(id);
  }, [reveal]);

  const submit = async () => {
    setError("");
    if (q.type === "MCQ" && !selected) return setError("Choose an option first.");
    if (q.type === "NUMERICAL" && (num.trim() === "" || Number.isNaN(Number(num)))) return setError("Enter a number (decimals allowed).");
    setBusy(true);
    try {
      const r = await api<Reveal>("/api/attempts", {
        body: { questionId: q.id, context, selectedOptionId: q.type === "MCQ" ? selected : null, numericalResponse: q.type === "NUMERICAL" ? Number(num) : null, timeTakenSec: Math.round((Date.now() - start.current) / 1000) },
      });
      setReveal(r);
      onAnswered?.({ isCorrect: r.isCorrect, levelUnlocked: r.levelUnlocked });
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  };

  const retry = () => { setReveal(null); setSelected(null); setNum(""); setElapsed(0); start.current = Date.now(); setSavedMsg(""); };

  const saveMistake = async (add = false) => {
    try {
      await api("/api/mistakes", { method: "PATCH", body: { questionId: q.id, category: category || null, observation: obs, add } });
      setSavedMsg("Saved to your mistake notebook.");
    } catch (e) { setSavedMsg((e as Error).message); }
  };

  const optState = (id: string) => {
    if (!reveal) return selected === id ? "selected" : "idle";
    const o = reveal.options.find((x) => x.id === id);
    if (o?.isCorrect) return "correct";
    if (id === selected) return "wrong";
    return "idle";
  };

  return (
    <div className="card card-pad">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        {index !== undefined && <span className="font-bold">Q{index + 1}</span>}
        {q.level && <span className="chip bg-violet-500/10 text-violet-500">Level {q.level}</span>}
        <span className={cn("chip", q.difficulty === "EASY" ? "bg-emerald-500/10 text-emerald-600" : q.difficulty === "MEDIUM" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600")}>{q.difficulty.toLowerCase()}</span>
        <span className="chip bg-[var(--surface-2)]">{q.type === "MCQ" ? "Single correct" : "Numerical value"}</span>
        {q.source === "PYQ" && <span className="chip bg-electric-500/10 text-electric-600">JEE Main {q.pyqYear}{q.pyqSession ? ` · ${q.pyqSession}` : ""}{q.pyqShift ? ` · ${q.pyqShift}` : ""}</span>}
        {lastResult !== undefined && lastResult !== null && !reveal && <span className={cn("chip", lastResult ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600")}>last attempt: {lastResult ? "correct" : "incorrect"}</span>}
        <span className="muted ml-auto flex items-center gap-1"><Clock size={13} /> {fmtDuration(reveal ? 0 : elapsed)} / ~{fmtDuration(q.approxTimeSec)}</span>
      </div>

      <Rich text={q.statement} className="text-[15px]" />

      {q.type === "MCQ" ? (
        <div className="mt-4 grid gap-2">
          {q.options.map((o) => {
            const st = optState(o.id);
            const exp = reveal?.options.find((x) => x.id === o.id)?.explanation;
            return (
              <button key={o.id} disabled={!!reveal} onClick={() => setSelected(o.id)}
                className={cn("rounded-xl border px-4 py-3 text-left text-sm transition",
                  st === "idle" && "border-[var(--border)] hover:border-electric-400",
                  st === "selected" && "border-electric-500 bg-electric-500/10",
                  st === "correct" && "border-emerald-500 bg-emerald-500/10",
                  st === "wrong" && "border-rose-500 bg-rose-500/10")}>
                <div className="flex items-start gap-3">
                  <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold", st === "correct" ? "border-emerald-500 text-emerald-600" : st === "wrong" ? "border-rose-500 text-rose-600" : "border-[var(--border)]")}>{o.label}</span>
                  <div className="min-w-0 flex-1">
                    <Inline text={o.text} />
                    {reveal && exp && <div className={cn("mt-1 text-xs", st === "correct" ? "text-emerald-700 dark:text-emerald-300" : "muted")}><Inline text={exp} /></div>}
                  </div>
                  {st === "correct" && <CheckCircle2 size={18} className="text-emerald-500" />}
                  {st === "wrong" && <XCircle size={18} className="text-rose-500" />}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 flex max-w-xs items-center gap-2">
          <input className="input" inputMode="decimal" placeholder="Your answer" value={num} disabled={!!reveal} onChange={(e) => setNum(e.target.value)} aria-label="Numerical answer"
            onKeyDown={(e) => e.key === "Enter" && submit()} />
        </div>
      )}

      {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}

      {!reveal ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button className="btn-primary" onClick={submit} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Submit answer</button>
          <BookmarkButton itemType="QUESTION" itemId={q.id} initial={bookmarked} small />
        </div>
      ) : (
        <div className="mt-5 space-y-4 border-t border-[var(--border)] pt-4">
          <div className={cn("flex flex-wrap items-center gap-2 rounded-xl px-4 py-3 font-semibold", reveal.isCorrect ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300")}>
            {reveal.isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {reveal.isCorrect ? "Correct" : "Incorrect"} · Correct answer: <Inline text={reveal.correctAnswerText} />
            <span className="muted ml-auto text-xs font-normal">you took {fmtDuration(elapsed)} · target ~{fmtDuration(reveal.approxTimeSec)}</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] p-3"><div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-electric-500"><Lightbulb size={13} /> Concept tested</div><Rich text={reveal.conceptTested} className="text-sm" /></div>
            <div className="rounded-xl border border-[var(--border)] p-3"><div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-violet-500"><Sigma size={13} /> Formula used</div><Rich text={reveal.formulaUsed} className="text-sm" /><div className="muted mt-1 text-xs"><strong>Why this formula: </strong><Inline text={reveal.whyFormula} /></div></div>
          </div>

          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide">Step-by-step solution</div>
            <Rich text={reveal.solution} className="text-sm" />
          </div>
          {reveal.altMethod && <div className="rounded-xl bg-[var(--surface-2)] p-3 text-sm"><div className="mb-1 text-xs font-bold uppercase">Alternative method</div><Rich text={reveal.altMethod} /></div>}
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-500/5 p-3 text-sm"><div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-amber-600"><AlertTriangle size={13} /> Common mistakes</div><Rich text={reveal.commonMistakes} /></div>

          <div className="rounded-xl border border-[var(--border)] p-3">
            <div className="mb-2 flex items-center gap-1 text-xs font-bold uppercase"><NotebookPen size={13} /> {reveal.isCorrect ? "Was this a lucky guess?" : "Added to your mistake notebook — classify it"}</div>
            <div className="grid gap-2 sm:grid-cols-[220px_1fr_auto]">
              <select className="input" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Mistake category">
                <option value="">Choose error type…</option>
                {Object.entries(MISTAKE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <input className="input" placeholder="What will you do differently? (optional)" value={obs} onChange={(e) => setObs(e.target.value)} maxLength={4000} />
              <button className="btn-ghost" onClick={() => saveMistake(reveal.isCorrect)}>{reveal.isCorrect ? <><BookmarkPlus size={15} /> Add</> : "Save"}</button>
            </div>
            {savedMsg && <p className="muted mt-1 text-xs">{savedMsg}</p>}
          </div>

          {reveal.related.length > 0 && (
            <div>
              <div className="mb-1 text-xs font-bold uppercase">Related questions</div>
              <ul className="space-y-1 text-sm">
                {reveal.related.map((r) => <li key={r.id}><Link className="link" href={`/q/${r.id}`}>{r.statement.replace(/\$[^$]*\$/g, "…").slice(0, 90)}…</Link></li>)}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button className="btn-ghost" onClick={retry}>Try again</button>
            <BookmarkButton itemType="QUESTION" itemId={q.id} initial={bookmarked} small />
          </div>
        </div>
      )}
    </div>
  );
}
