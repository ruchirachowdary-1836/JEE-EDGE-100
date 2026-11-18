"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, CheckCircle2, PartyPopper } from "lucide-react";
import { QuestionCard, type CardQuestion } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ui";
import { cn } from "@/lib/utils";

type Status = { level: number; total: number; attempted: number; accuracy: number; completion: number; cleared: boolean; empty: boolean };

export function GymLevels({ questions, statuses, unlocked, initialLevel, lastResult, bookmarked }: {
  questions: CardQuestion[]; statuses: Status[]; unlocked: number; initialLevel: number; lastResult: Record<string, boolean>; bookmarked: string[];
}) {
  const router = useRouter();
  const [level, setLevel] = useState(initialLevel);
  const [newUnlock, setNewUnlock] = useState<number | null>(null);
  const status = statuses.find((s) => s.level === level)!;
  const list = questions.filter((q) => q.level === level);
  const bm = new Set(bookmarked);

  const onAnswered = (r: { levelUnlocked: number | null }) => {
    if (r.levelUnlocked && r.levelUnlocked > unlocked) setNewUnlock(r.levelUnlocked);
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-2">
        {statuses.map((s) => {
          const open = s.level <= unlocked;
          return (
            <button key={s.level} disabled={!open} onClick={() => setLevel(s.level)}
              className={cn("rounded-xl border p-3 text-left transition", level === s.level ? "border-electric-500 bg-electric-500/10" : "border-[var(--border)]", !open && "cursor-not-allowed opacity-50")}>
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Level {s.level}</span>
                {!open ? <Lock size={13} /> : s.cleared ? <CheckCircle2 size={14} className="text-emerald-500" /> : null}
              </div>
              <div className="muted mt-1 hidden text-[11px] sm:block">{s.empty ? "No questions yet" : `${s.attempted}/${s.total} tried · ${s.accuracy}%`}</div>
            </button>
          );
        })}
      </div>

      {newUnlock && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <PartyPopper size={18} /> Level {newUnlock} unlocked!
          <button className="btn-primary ml-auto !py-1.5" onClick={() => { setLevel(newUnlock); setNewUnlock(null); }}>Go to level {newUnlock}</button>
        </div>
      )}

      <div className="card card-pad">
        <div className="grid gap-4 sm:grid-cols-2">
          <ProgressBar value={status.completion} label="Attempted" />
          <ProgressBar value={status.accuracy} label="Accuracy (all attempts)" color={status.accuracy >= 70 ? "bg-emerald-500" : "bg-amber-500"} />
        </div>
        {status.cleared ? <p className="mt-2 text-sm text-emerald-600">Level cleared.</p> : !status.empty && <p className="muted mt-2 text-sm">Attempt every question here and keep accuracy at the required level to unlock the next level.</p>}
      </div>

      {status.empty ? (
        <p className="muted text-sm">No questions have been published for this level yet — it will not block your progress.</p>
      ) : (
        <div className="space-y-4">
          {list.map((q, i) => (
            <QuestionCard key={q.id} q={q} index={i} context="GYM" bookmarked={bm.has(q.id)} lastResult={lastResult[q.id] ?? null} onAnswered={onAnswered} />
          ))}
        </div>
      )}
    </div>
  );
}
