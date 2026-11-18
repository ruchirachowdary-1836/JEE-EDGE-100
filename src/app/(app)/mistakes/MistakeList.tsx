"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarClock, CheckCircle2, RotateCcw, Save } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { QuestionCard, type CardQuestion } from "@/components/QuestionCard";
import { api } from "@/lib/client";
import { cn, fmtDate, MISTAKE_LABELS } from "@/lib/utils";

type Entry = {
  id: string; questionId: string; statement: string; chapter: string; topic: string | null; selectedAnswer: string; correctAnswer: string;
  category: string | null; observation: string; occurrences: number; resolved: boolean; due: boolean; nextReviewAt: string; reviewCount: number;
  solution: string; concept: string; mistakes: string; question: CardQuestion;
};

function EntryCard({ e }: { e: Entry }) {
  const router = useRouter();
  const [category, setCategory] = useState(e.category ?? "");
  const [obs, setObs] = useState(e.observation);
  const [msg, setMsg] = useState("");
  const [reattempt, setReattempt] = useState(false);

  const patch = async (b: Record<string, unknown>, done?: string) => {
    try { await api("/api/mistakes", { method: "PATCH", body: { questionId: e.questionId, ...b } }); setMsg(done ?? "Saved."); router.refresh(); }
    catch (err) { setMsg((err as Error).message); }
  };

  return (
    <div className={cn("card card-pad", e.due && "border-amber-400/60")}>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="muted">{e.chapter}{e.topic ? ` · ${e.topic}` : ""}</span>
        {e.occurrences > 1 && <span className="chip bg-rose-500/10 text-rose-600">wrong {e.occurrences}×</span>}
        {e.resolved ? <span className="chip bg-emerald-500/10 text-emerald-600">resolved</span> : e.due ? <span className="chip bg-amber-500/10 text-amber-600">due for review</span> : <span className="chip bg-[var(--surface-2)]"><CalendarClock size={11} /> review {fmtDate(e.nextReviewAt)}</span>}
        <span className="muted ml-auto">reviews passed: {e.reviewCount}</span>
      </div>
      {reattempt ? (
        <div className="space-y-2">
          <QuestionCard q={e.question} context="REVISION" bookmarked={false} onAnswered={(r) => patch({ review: r.isCorrect ? "correct" : "wrong" }, r.isCorrect ? "Correct — next review scheduled." : "Still wrong — rescheduled for tomorrow.")} />
          <button className="btn-ghost text-xs" onClick={() => setReattempt(false)}>Close re-attempt</button>
        </div>
      ) : (
        <>
          <Rich text={e.statement} className="text-sm" />
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-rose-500/10 p-2"><span className="text-xs font-bold uppercase text-rose-600">Your answer</span><div><Inline text={e.selectedAnswer} /></div></div>
            <div className="rounded-lg bg-emerald-500/10 p-2"><span className="text-xs font-bold uppercase text-emerald-600">Correct answer</span><div><Inline text={e.correctAnswer} /></div></div>
          </div>
          <details className="mt-2 text-sm">
            <summary className="cursor-pointer text-xs font-bold uppercase text-electric-500">Explanation</summary>
            <div className="mt-2 space-y-2"><Rich text={e.solution} /><div className="muted text-xs"><strong>Concept: </strong><Inline text={e.concept} /></div><div className="muted text-xs"><strong>Common mistakes: </strong><Inline text={e.mistakes} /></div></div>
          </details>
        </>
      )}
      <div className="mt-3 grid gap-2 border-t border-[var(--border)] pt-3 sm:grid-cols-[220px_1fr_auto]">
        <select className="input" value={category} onChange={(ev) => { setCategory(ev.target.value); patch({ category: ev.target.value || null }, "Category saved."); }} aria-label="Error category">
          <option value="">Classify error…</option>
          {Object.entries(MISTAKE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input className="input" value={obs} maxLength={4000} onChange={(ev) => setObs(ev.target.value)} placeholder="Personal observation: what went wrong, what to do next time" />
        <button className="btn-ghost" onClick={() => patch({ observation: obs })}><Save size={15} /> Save</button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {!e.resolved && !reattempt && <button className="btn-primary !py-1.5 text-xs" onClick={() => setReattempt(true)}><RotateCcw size={14} /> Re-attempt now</button>}
        <button className="btn-ghost !py-1.5 text-xs" onClick={() => patch({ resolved: !e.resolved }, e.resolved ? "Reopened." : "Marked resolved.")}><CheckCircle2 size={14} /> {e.resolved ? "Reopen" : "Mark resolved"}</button>
        {msg && <span className="muted text-xs">{msg}</span>}
      </div>
    </div>
  );
}

export function MistakeList({ entries }: { entries: Entry[] }) {
  const [tab, setTab] = useState<"due" | "open" | "repeated" | "resolved">("due");
  const [cat, setCat] = useState("");
  const list = entries.filter((e) => (tab === "due" ? e.due : tab === "open" ? !e.resolved : tab === "repeated" ? !e.resolved && e.occurrences > 1 : e.resolved) && (!cat || e.category === cat));
  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {([["due", "Due now"], ["open", "All unresolved"], ["repeated", "Repeated"], ["resolved", "Resolved"]] as const).map(([k, l]) => (
          <button key={k} className={cn("btn-ghost !py-1.5 text-xs", tab === k && "!border-electric-500 !text-electric-500")} onClick={() => setTab(k)}>{l}</button>
        ))}
        <select className="input ml-auto !w-auto" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {Object.entries(MISTAKE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="space-y-4">
        {list.map((e) => <EntryCard key={e.id} e={e} />)}
        {list.length === 0 && <p className="muted py-8 text-center text-sm">Nothing here.</p>}
      </div>
    </div>
  );
}
