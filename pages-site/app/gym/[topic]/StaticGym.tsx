"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, XCircle, Clock, Lock, Lightbulb, Sigma, AlertTriangle, PartyPopper } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { ProgressBar } from "@/components/ui";
import { cn, fmtDuration } from "@/lib/utils";
import type { SiteQuestion } from "@site/lib/data";

import { load, recordAttempt, setUnlocked as saveUnlocked } from "@site/lib/progress";
import { GYM_LEVELS } from "@/lib/levels";
import { ADVANCED_SCHEME, TYPE_LABEL, matchMarks, multipleMarks } from "@/lib/advanced";
import { MatchTable } from "@/components/MatchTable";

// Progress lives in the shared browser store (@site/lib/progress): every attempt with its time.
type Store = Record<string, boolean[]>;
const read = (): Store => Object.fromEntries(Object.entries(load().attempts).map(([k, v]) => [k, v.map((a) => a.ok)]));
const readUnlocked = (): Record<string, number> => load().unlocked;

function levelStats(ids: string[], store: Store) {
  const all = ids.flatMap((id) => store[id] ?? []);
  const attempted = ids.filter((id) => (store[id]?.length ?? 0) > 0).length;
  const accuracy = all.length ? Math.round((all.filter(Boolean).length / all.length) * 100) : 0;
  const completion = ids.length ? Math.round((attempted / ids.length) * 100) : 0;
  return { attempted, accuracy, completion, cleared: ids.length > 0 && completion >= 100 && accuracy >= 70 };
}

function computeUnlocked(topic: string, questions: { id: string; level: number }[], store: Store) {
  let unlocked = 1;
  for (let l = 1; l <= 5; l++) {
    if (l !== unlocked) break;
    const ids = questions.filter((q) => q.level === l).map((q) => q.id);
    if (!ids.length || levelStats(ids, store).cleared) unlocked = Math.min(5, unlocked + 1);
    else break;
  }
  return Math.max(unlocked, readUnlocked()[topic] ?? 1);
}

export function GymProgressBadge({ topic, ids }: { topic: string; ids: string[] }) {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const s = read();
    const n = ids.filter((id) => s[id]?.length).length;
    const lvl = readUnlocked()[topic] ?? 1;
    setTxt(n ? `${n}/${ids.length} tried · L${lvl}` : "");
  }, [topic, ids]);
  return txt ? <span className="chip bg-violet-500/10 text-violet-500">{txt}</span> : null;
}

function QuestionCard({ q, index, onAnswer }: { q: SiteQuestion; index: number; onAnswer: (ok: boolean, sec: number) => void }) {
  const [sel, setSel] = useState<number | null>(null);
  const [multi, setMulti] = useState<number[]>([]);
  const [marks, setMarks] = useState<number | null>(null);
  const optionType = q.type !== "NUMERICAL";
  const [num, setNum] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const [err, setErr] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const start = useRef(Date.now());
  useEffect(() => {
    if (result !== null) return;
    const id = setInterval(() => setElapsed(Math.round((Date.now() - start.current) / 1000)), 1000);
    return () => clearInterval(id);
  }, [result]);
  const submit = () => {
    setErr("");
    let ok: boolean;
    if (q.type === "MULTIPLE") {
      if (!multi.length) return setErr("Tick at least one option.");
      const r = multipleMarks(multi.map(String), q.options!.map((o, i) => (o.correct ? String(i) : null)).filter((x): x is string => x !== null));
      ok = r.fullyCorrect;
      setMarks(r.marks);
    } else if (q.type === "MCQ" || q.type === "MATCH") {
      if (sel === null) return setErr("Choose an option first.");
      ok = !!q.options![sel].correct;
      if (q.type === "MATCH") setMarks(matchMarks(String(sel), String(q.options!.findIndex((o) => o.correct))).marks);
    } else {
      if (num.trim() === "" || Number.isNaN(Number(num))) return setErr("Enter a number.");
      ok = Math.abs(Number(num) - (q.answer ?? NaN)) <= (q.tolerance ?? 0.01);
    }
    setResult(ok);
    onAnswer(ok, Math.round((Date.now() - start.current) / 1000));
  };
  const retry = () => { setResult(null); setSel(null); setMulti([]); setMarks(null); setNum(""); start.current = Date.now(); setElapsed(0); };
  const correctIdx = q.options?.findIndex((o) => o.correct) ?? -1;
  return (
    <div className="card card-pad">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold">Q{index + 1}</span>
        <span className="chip bg-violet-500/10 text-violet-500" title={GYM_LEVELS[q.level - 1]?.description}>Level {q.level} · {GYM_LEVELS[q.level - 1]?.name}</span>
        <span className={cn("chip", q.difficulty === "EASY" ? "bg-emerald-500/10 text-emerald-600" : q.difficulty === "MEDIUM" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600")}>{q.difficulty.toLowerCase()}</span>
        <span className={cn("chip", q.type === "MULTIPLE" || q.type === "MATCH" ? "bg-rose-500/10 text-rose-600 dark:text-rose-300" : "bg-[var(--surface-2)]")}>{TYPE_LABEL[q.type]}</span>
        <span className="muted ml-auto flex items-center gap-1"><Clock size={13} /> {fmtDuration(elapsed)} / ~{fmtDuration(q.time)}</span>
      </div>
      <Rich text={q.statement} className="text-[15px]" />
      {q.type === "MATCH" && <MatchTable lists={q.match} />}
      {q.type === "MULTIPLE" && result === null && <p className="muted mt-2 text-xs">One or more options may be correct. Tick every option you are sure of: a wrong tick costs marks under the JEE Advanced scheme.</p>}
      {optionType ? (
        <div className="mt-4 grid gap-2">
          {q.options!.map((o, i) => {
            const chosen = q.type === "MULTIPLE" ? multi.includes(i) : sel === i;
            const st = result === null ? (chosen ? "sel" : "idle") : o.correct ? "ok" : chosen ? "bad" : "idle";
            return (
              <button key={i} disabled={result !== null} aria-pressed={chosen} onClick={() => (q.type === "MULTIPLE" ? setMulti((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i])) : setSel(i))} className={cn("rounded-xl border px-4 py-3 text-left text-sm transition", st === "idle" && "border-[var(--border)] hover:border-electric-400", st === "sel" && "border-electric-500 bg-electric-500/10", st === "ok" && "border-emerald-500 bg-emerald-500/10", st === "bad" && "border-rose-500 bg-rose-500/10")}>
                <div className="flex items-start gap-3">
                  <span className={cn("grid h-6 w-6 shrink-0 place-items-center border border-[var(--border)] text-xs font-bold", q.type === "MULTIPLE" ? "rounded-md" : "rounded-full")}>{"ABCDEF"[i]}</span>
                  <div className="min-w-0 flex-1"><Inline text={o.text} />{result !== null && <div className="muted mt-1 text-xs"><Inline text={o.why} /></div>}</div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <input className="input mt-4 max-w-xs" inputMode="decimal" placeholder="Your answer" value={num} disabled={result !== null} onChange={(e) => setNum(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
      )}
      {err && <p className="mt-2 text-sm text-rose-500">{err}</p>}
      {result === null ? <button className="btn-primary mt-4" onClick={submit}>Submit answer</button> : (
        <div className="mt-5 space-y-4 border-t border-[var(--border)] pt-4">
          <div className={cn("flex flex-wrap items-center gap-2 rounded-xl px-4 py-3 font-semibold", result ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300")}>
            {result ? <CheckCircle2 size={18} /> : <XCircle size={18} />} {result ? "Correct" : marks !== null && marks > 0 ? "Partially correct" : "Incorrect"} · Answer: {q.type === "MULTIPLE" ? q.options!.map((o, i) => (o.correct ? `(${"ABCDEF"[i]})` : null)).filter(Boolean).join(", ") : optionType ? <>({"ABCDEF"[correctIdx]}) <Inline text={q.options![correctIdx].text} /></> : q.answer}
            {marks !== null && <span className="chip bg-[var(--surface)]">{marks > 0 ? "+" : ""}{marks} marks</span>}
          </div>
          {(q.type === "MULTIPLE" || q.type === "MATCH") && <p className="muted text-xs">{q.type === "MULTIPLE" ? ADVANCED_SCHEME.multiple.note : ADVANCED_SCHEME.match.note} The actual scheme is printed on each JEE Advanced paper.</p>}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] p-3"><div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-electric-500"><Lightbulb size={13} /> Concept tested</div><Rich text={q.concept} className="text-sm" /></div>
            <div className="rounded-xl border border-[var(--border)] p-3"><div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-violet-500"><Sigma size={13} /> Formula used</div><Rich text={q.formula} className="text-sm" /><div className="muted mt-1 text-xs"><strong>Why: </strong><Inline text={q.whyFormula} /></div></div>
          </div>
          <div><div className="mb-1 text-xs font-bold uppercase">Step-by-step solution</div><Rich text={q.solution} className="text-sm" /></div>
          {q.alt && <div className="rounded-xl bg-[var(--surface-2)] p-3 text-sm"><div className="mb-1 text-xs font-bold uppercase">Alternative method</div><Rich text={q.alt} /></div>}
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-500/5 p-3 text-sm"><div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-amber-600"><AlertTriangle size={13} /> Common mistakes</div><Rich text={q.mistakes} /></div>
          <button className="btn-ghost" onClick={retry}>Try again</button>
        </div>
      )}
    </div>
  );
}

export function StaticGym({ topic, questions }: { topic: string; questions: SiteQuestion[] }) {
  const [store, setStore] = useState<Store>({});
  const [unlocked, setUnlocked] = useState(1);
  const [level, setLevel] = useState(1);
  const [newUnlock, setNewUnlock] = useState<number | null>(null);
  useEffect(() => { const s = read(); setStore(s); setUnlocked(computeUnlocked(topic, questions, s)); }, [topic, questions]);

  const answer = (id: string, ok: boolean, sec: number) => {
    recordAttempt(id, ok, sec);
    const s = read();
    setStore(s);
    const u = computeUnlocked(topic, questions, s);
    if (u > unlocked) { setNewUnlock(u); saveUnlocked(topic, u); }
    setUnlocked(u);
  };

  const ids = (l: number) => questions.filter((q) => q.level === l).map((q) => q.id);
  const stats = levelStats(ids(level), store);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((l) => {
          const open = l <= unlocked;
          const s = levelStats(ids(l), store);
          return (
            <button key={l} disabled={!open} onClick={() => setLevel(l)} className={cn("rounded-xl border p-3 text-left transition", level === l ? "border-electric-500 bg-electric-500/10" : "border-[var(--border)]", !open && "cursor-not-allowed opacity-50")}>
              <div className="flex items-center justify-between text-xs font-bold"><span>Level {l}<span className="muted hidden font-normal lg:inline"> · {GYM_LEVELS[l - 1].name}</span></span>{!open ? <Lock size={13} /> : s.cleared ? <CheckCircle2 size={14} className="text-emerald-500" /> : null}</div>
              <div className="muted mt-1 hidden text-[11px] sm:block">{s.attempted}/{ids(l).length} tried · {s.accuracy}%</div>
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
      <div className="card card-pad grid gap-4 sm:grid-cols-2">
        <ProgressBar value={stats.completion} label="Attempted" />
        <ProgressBar value={stats.accuracy} label="Accuracy (all attempts)" color={stats.accuracy >= 70 ? "bg-emerald-500" : "bg-amber-500"} />
      </div>
      <div className="space-y-4">
        {questions.filter((q) => q.level === level).map((q, i) => <QuestionCard key={q.id} q={q} index={i} onAnswer={(ok, sec) => answer(q.id, ok, sec)} />)}
      </div>
    </div>
  );
}
