"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { api } from "@/lib/client";
import { cn, fmtDuration, MISTAKE_LABELS, SUBJECT_META } from "@/lib/utils";

type Item = {
  n: number; questionId: string; section: string; chapter: string; type: string; statement: string;
  options: { label: string; text: string; isCorrect: boolean; explanation: string; chosen: boolean }[];
  yourAnswer: string | null; correctAnswer: string; isCorrect: boolean | null; marks: number; timeSec: number; category: string | null;
  solution: string; concept: string; formula: string; mistakes: string;
};

export function ResultReview({ attemptId, items }: { attemptId: string; items: Item[] }) {
  const [filter, setFilter] = useState<"all" | "wrong" | "skipped" | "correct">("all");
  const [cats, setCats] = useState<Record<string, string | null>>(Object.fromEntries(items.map((i) => [i.questionId, i.category])));
  const shown = items.filter((i) => filter === "all" || (filter === "wrong" && i.isCorrect === false) || (filter === "skipped" && i.isCorrect === null) || (filter === "correct" && i.isCorrect === true));

  const classify = async (questionId: string, category: string) => {
    setCats((c) => ({ ...c, [questionId]: category || null }));
    await api(`/api/exams/${attemptId}/classify`, { method: "PATCH", body: { questionId, category: category || null } }).catch(() => {});
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "wrong", "skipped", "correct"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("btn-ghost !py-1.5 text-xs", filter === f && "!border-electric-500 !text-electric-500")}>
            {f === "all" ? `All (${items.length})` : f === "wrong" ? `Incorrect (${items.filter((i) => i.isCorrect === false).length})` : f === "skipped" ? `Unattempted (${items.filter((i) => i.isCorrect === null).length})` : `Correct (${items.filter((i) => i.isCorrect).length})`}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {shown.map((i) => (
          <details key={i.questionId} className="card card-pad group" open={i.isCorrect === false}>
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2">
              {i.isCorrect === true ? <CheckCircle2 size={18} className="text-emerald-500" /> : i.isCorrect === false ? <XCircle size={18} className="text-rose-500" /> : <MinusCircle size={18} className="muted" />}
              <span className="font-bold">Q{i.n}</span>
              <span className="muted text-xs">{SUBJECT_META[i.section]?.name} · {i.chapter}</span>
              <span className="ml-auto text-xs">your answer: <strong>{i.yourAnswer ?? "—"}</strong> · correct: <strong>{i.correctAnswer}</strong> · <span className={i.marks > 0 ? "text-emerald-500" : i.marks < 0 ? "text-rose-500" : ""}>{i.marks > 0 ? `+${i.marks}` : i.marks}</span> · {fmtDuration(i.timeSec)}</span>
            </summary>
            <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4">
              <Rich text={i.statement} />
              {i.options.length > 0 && (
                <ul className="space-y-1.5 text-sm">
                  {i.options.map((o) => (
                    <li key={o.label} className={cn("rounded-lg border px-3 py-2", o.isCorrect ? "border-emerald-500 bg-emerald-500/5" : o.chosen ? "border-rose-500 bg-rose-500/5" : "border-[var(--border)]")}>
                      <strong>{o.label}.</strong> <Inline text={o.text} />
                      {o.explanation && <div className="muted mt-0.5 text-xs"><Inline text={o.explanation} /></div>}
                    </li>
                  ))}
                </ul>
              )}
              <div className="grid gap-2 text-sm md:grid-cols-2">
                <div className="rounded-lg bg-[var(--surface-2)] p-3"><div className="text-xs font-bold uppercase text-electric-500">Concept</div><Rich text={i.concept} /></div>
                <div className="rounded-lg bg-[var(--surface-2)] p-3"><div className="text-xs font-bold uppercase text-violet-500">Formula</div><Rich text={i.formula} /></div>
              </div>
              <div><div className="mb-1 text-xs font-bold uppercase">Solution</div><Rich text={i.solution} className="text-sm" /></div>
              <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/5 p-3 text-sm"><div className="text-xs font-bold uppercase text-amber-600">Common mistakes</div><Rich text={i.mistakes} /></div>
              {i.isCorrect !== true && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase">Why did you lose this mark?</span>
                  <select className="input !w-auto" value={cats[i.questionId] ?? ""} onChange={(e) => classify(i.questionId, e.target.value)}>
                    <option value="">Not classified</option>
                    {Object.entries(MISTAKE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
