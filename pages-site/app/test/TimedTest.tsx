"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Clock, Flag, ChevronLeft, ChevronRight, Send, RotateCcw } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { cn, fmtDuration, SUBJECT_META } from "@/lib/utils";
import { marksFor } from "@/lib/scoring";
import type { SiteQuestion } from "@site/lib/data";
import { saveTest, load, type TestRec } from "@site/lib/progress";

const SCHEME = { correct: 4, incorrectMcq: -1, incorrectNumerical: -1, unattempted: 0 };
const ACTIVE_KEY = "jee-edge-active-test";
type Resp = { opt: number | null; num: string; marked: boolean; visited: boolean };
type Active = { id: string; title: string; ids: string[]; startedAt: number; durationSec: number; resp: Record<string, Resp> };

const readActive = (): Active | null => { try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) ?? "null"); } catch { return null; } };
const writeActive = (a: Active | null) => { try { if (a) localStorage.setItem(ACTIVE_KEY, JSON.stringify(a)); else localStorage.removeItem(ACTIVE_KEY); } catch { /* ignore */ } };

const clock = (s: number) => `${Math.floor(s / 3600) ? `${Math.floor(s / 3600)}:` : ""}${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function shuffle<T>(arr: T[]) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

export function TimedTest({ questions, chapters }: { questions: SiteQuestion[]; chapters: { slug: string; name: string; subject: string; count: number }[] }) {
  const byId = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);
  const [active, setActive] = useState<Active | null>(null);
  const [result, setResult] = useState<TestRec | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const a = readActive(); if (a && a.ids.every((id) => byId.has(id))) setActive(a); setLoaded(true); }, [byId]);

  if (!loaded) return null;
  if (result) return <Result rec={result} byId={byId} onAgain={() => setResult(null)} />;
  if (active) return <Runner active={active} byId={byId} onChange={(a) => { setActive(a); writeActive(a); }} onSubmit={(rec) => { writeActive(null); setActive(null); saveTest(rec); setResult(rec); }} />;
  return <Setup questions={questions} chapters={chapters} onStart={(a) => { writeActive(a); setActive(a); }} />;
}

function Setup({ questions, chapters, onStart }: { questions: SiteQuestion[]; chapters: { slug: string; name: string; subject: string; count: number }[]; onStart: (a: Active) => void }) {
  const [subject, setSubject] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [levels, setLevels] = useState<number[]>([3, 4, 5]);
  const [count, setCount] = useState(15);
  const [mpq, setMpq] = useState(2.4);
  const pool = questions.filter((q) => (!subject || chapters.find((c) => c.slug === q.chapterSlug)?.subject === subject) && (!picked.length || picked.includes(q.chapterSlug)) && levels.includes(q.level));
  const n = Math.min(count, pool.length);
  const past = load().tests.slice(-5).reverse();
  const start = () => {
    const order = ["physics", "chemistry", "mathematics"];
    const subj = (q: SiteQuestion) => chapters.find((c) => c.slug === q.chapterSlug)?.subject ?? "";
    const ids = shuffle(pool).slice(0, n).sort((a, b) => order.indexOf(subj(a)) - order.indexOf(subj(b))).map((q) => q.id);
    onStart({ id: `t${Date.now().toString(36)}`, title: `${subject ? SUBJECT_META[subject].name : "Mixed"} timed test · ${n} questions`, ids, startedAt: Date.now(), durationSec: Math.round(n * mpq * 60), resp: {} });
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="card card-pad space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">Subject
            <select className="input mt-1" value={subject} onChange={(e) => { setSubject(e.target.value); setPicked([]); }}>
              <option value="">All three subjects</option>{Object.entries(SUBJECT_META).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Questions ({n} of {pool.length} available)
            <input type="range" min={3} max={Math.max(3, Math.min(75, pool.length))} value={count} onChange={(e) => setCount(Number(e.target.value))} className="mt-3 w-full accent-electric-500" />
          </label>
          <label className="text-sm font-semibold">Minutes per question: {mpq}
            <input type="range" min={1} max={6} step={0.2} value={mpq} onChange={(e) => setMpq(Number(e.target.value))} className="mt-3 w-full accent-electric-500" />
            <span className="muted block text-xs font-normal">JEE Main averages 2.4 minutes per question.</span>
          </label>
          <div className="text-sm font-semibold">Levels
            <div className="mt-1 flex flex-wrap gap-1">{[1, 2, 3, 4, 5].map((l) => (
              <button key={l} onClick={() => setLevels(levels.includes(l) ? levels.filter((x) => x !== l) : [...levels, l])} className={cn("btn-ghost !px-3 !py-1 text-xs", levels.includes(l) && "!border-electric-500 !text-electric-500")}>L{l}</button>
            ))}</div>
          </div>
        </div>
        <div>
          <div className="mb-1 text-sm font-semibold">Chapters (optional — leave empty for all)</div>
          <div className="flex max-h-48 flex-wrap gap-1 overflow-y-auto">
            {chapters.filter((c) => c.count > 0 && (!subject || c.subject === subject)).map((c) => (
              <button key={c.slug} onClick={() => setPicked(picked.includes(c.slug) ? picked.filter((x) => x !== c.slug) : [...picked, c.slug])} className={cn("chip border border-[var(--border)]", picked.includes(c.slug) && "!border-electric-500 bg-electric-500/10 text-electric-600 dark:text-electric-300")}>{c.name} ({c.count})</button>
            ))}
          </div>
        </div>
        <p className="muted text-xs">Marking as in JEE Main: +4 correct, −1 incorrect (both MCQ and numerical), 0 unattempted. The timer keeps running if you refresh or close the tab, and the test is submitted automatically at time-up.</p>
        <button className="btn-primary" disabled={n < 3} onClick={start}>Start test ({n} questions, {fmtDuration(Math.round(n * mpq * 60))})</button>
        {n < 3 && <p className="text-sm text-rose-500">Choose a wider selection: at least 3 questions are needed.</p>}
      </div>
      <div className="card card-pad">
        <div className="h2 mb-2">Recent tests</div>
        {past.length === 0 ? <p className="muted text-sm">No tests yet. Results appear here and on the Progress page.</p> : (
          <ul className="space-y-2 text-sm">{past.map((t) => (
            <li key={t.id} className="flex justify-between gap-2"><span className="truncate">{new Date(t.t).toLocaleDateString(undefined, { day: "numeric", month: "short" })} · {t.title}</span><span className="font-semibold">{t.score}/{t.max}</span></li>
          ))}</ul>
        )}
        <Link href="/progress" className="link mt-3 inline-block text-sm">Open the Progress page</Link>
      </div>
    </div>
  );
}

function score(active: Active, byId: Map<string, SiteQuestion>, usedSec: number, subjectOf: (q: SiteQuestion) => string): TestRec {
  const rec: TestRec = { id: active.id, t: Date.now(), title: active.title, durationSec: active.durationSec, usedSec, score: 0, max: 0, correct: 0, incorrect: 0, unattempted: 0, perSubject: {}, answers: {} };
  for (const id of active.ids) {
    const q = byId.get(id)!;
    const r = active.resp[id];
    const num = r?.num?.trim() ? Number(r.num) : null;
    const res = marksFor(
      { type: q.type, numericalAnswer: q.answer ?? null, numericalTolerance: q.tolerance ?? 0.01, options: (q.options ?? []).map((o, i) => ({ id: String(i), isCorrect: !!o.correct })) },
      { selectedOptionId: r?.opt !== null && r?.opt !== undefined ? String(r.opt) : null, numericalResponse: num !== null && !Number.isNaN(num) ? num : null },
      SCHEME,
    );
    const s = (rec.perSubject[subjectOf(q)] ??= { score: 0, max: 0, correct: 0, incorrect: 0, unattempted: 0 });
    rec.max += 4; s.max += 4; rec.score += res.marks; s.score += res.marks;
    if (!res.attempted) { rec.unattempted++; s.unattempted++; rec.answers[id] = null; }
    else if (res.isCorrect) { rec.correct++; s.correct++; rec.answers[id] = true; }
    else { rec.incorrect++; s.incorrect++; rec.answers[id] = false; }
  }
  return rec;
}

function Runner({ active, byId, onChange, onSubmit }: { active: Active; byId: Map<string, SiteQuestion>; onChange: (a: Active) => void; onSubmit: (r: TestRec) => void }) {
  const [i, setI] = useState(0);
  const [now, setNow] = useState(Date.now());
  const submitted = useRef(false);
  const left = Math.max(0, Math.round((active.startedAt + active.durationSec * 1000 - now) / 1000));
  const id = active.ids[i];
  const q = byId.get(id)!;
  const r: Resp = active.resp[id] ?? { opt: null, num: "", marked: false, visited: true };
  const subjectOf = useCallback((x: SiteQuestion) => x.subject, []);

  const finish = useCallback(() => {
    if (submitted.current) return;
    submitted.current = true;
    onSubmit(score(active, byId, Math.min(active.durationSec, Math.round((Date.now() - active.startedAt) / 1000)), subjectOf));
  }, [active, byId, onSubmit, subjectOf]);

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (left === 0) finish(); }, [left, finish]);
  useEffect(() => { if (!active.resp[id]) onChange({ ...active, resp: { ...active.resp, [id]: { opt: null, num: "", marked: false, visited: true } } }); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (patch: Partial<Resp>) => onChange({ ...active, resp: { ...active.resp, [id]: { ...r, ...patch } } });
  const answered = (x?: Resp) => !!x && (x.opt !== null || x.num.trim() !== "");
  const confirmSubmit = () => { const un = active.ids.filter((x) => !answered(active.resp[x])).length; if (window.confirm(`Submit now?${un ? ` ${un} question(s) are unanswered.` : ""}`)) finish(); };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="card card-pad min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold">Question {i + 1} of {active.ids.length}</span>
          <span className="chip bg-[var(--surface-2)]">{SUBJECT_META[q.subject]?.name}</span>
          <span className="chip bg-[var(--surface-2)]">{q.type === "MCQ" ? "Single correct" : "Numerical value"}</span>
          <span className={cn("ml-auto flex items-center gap-1 font-mono text-sm font-bold", left < 300 ? "text-rose-500" : "")} role="timer" aria-live="off"><Clock size={14} /> {clock(left)}</span>
        </div>
        <Rich text={q.statement} className="text-[15px]" />
        {q.type === "MCQ" ? (
          <div className="mt-4 grid gap-2">
            {q.options!.map((o, k) => (
              <button key={k} onClick={() => set({ opt: r.opt === k ? null : k })} className={cn("rounded-xl border px-4 py-3 text-left text-sm transition", r.opt === k ? "border-electric-500 bg-electric-500/10" : "border-[var(--border)] hover:border-electric-400")}>
                <span className="mr-2 font-bold">{"ABCD"[k]}.</span><Inline text={o.text} />
              </button>
            ))}
          </div>
        ) : (
          <input className="input mt-4 max-w-xs" inputMode="decimal" placeholder="Your answer" value={r.num} onChange={(e) => set({ num: e.target.value })} />
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          <button className="btn-ghost" disabled={i === 0} onClick={() => setI(i - 1)}><ChevronLeft size={16} /> Previous</button>
          <button className={cn("btn-ghost", r.marked && "!border-violet-500 !text-violet-500")} onClick={() => set({ marked: !r.marked })}><Flag size={15} /> {r.marked ? "Marked" : "Mark for review"}</button>
          <button className="btn-ghost" onClick={() => set({ opt: null, num: "" })}>Clear</button>
          <button className="btn-primary ml-auto" disabled={i === active.ids.length - 1} onClick={() => setI(i + 1)}>Next <ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="card card-pad h-fit">
        <div className="mb-2 text-sm font-semibold">Question palette</div>
        <div className="grid grid-cols-6 gap-1.5">
          {active.ids.map((x, k) => {
            const rx = active.resp[x];
            return <button key={x} onClick={() => setI(k)} aria-label={`Question ${k + 1}`} className={cn("h-9 rounded-lg text-xs font-bold", k === i && "ring-2 ring-electric-500", rx?.marked ? "bg-violet-500 text-white" : answered(rx) ? "bg-emerald-500 text-white" : rx?.visited ? "bg-rose-500/15 text-rose-600" : "bg-[var(--surface-2)]")}>{k + 1}</button>;
          })}
        </div>
        <div className="muted mt-3 space-y-1 text-xs"><div>Green: answered · Purple: marked · Red: visited, unanswered</div></div>
        <button className="btn-primary mt-4 w-full" onClick={confirmSubmit}><Send size={15} /> Submit test</button>
      </div>
    </div>
  );
}

function Result({ rec, byId, onAgain }: { rec: TestRec; byId: Map<string, SiteQuestion>; onAgain: () => void }) {
  const ids = Object.keys(rec.answers);
  return (
    <div className="space-y-4">
      <div className="card card-pad">
        <div className="muted text-xs font-bold uppercase tracking-wide">{rec.title}</div>
        <div className="font-display text-4xl font-bold">{rec.score} <span className="muted text-xl">/ {rec.max}</span></div>
        <div className="muted mt-1 text-sm">{rec.correct} correct · {rec.incorrect} incorrect · {rec.unattempted} unattempted · time used {fmtDuration(rec.usedSec)} of {fmtDuration(rec.durationSec)} · accuracy {rec.correct + rec.incorrect ? Math.round((rec.correct / (rec.correct + rec.incorrect)) * 100) : 0}% of attempted</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {Object.entries(rec.perSubject).map(([s, v]) => (
            <div key={s} className="rounded-xl border border-[var(--border)] p-3 text-sm"><div className="font-semibold" style={{ color: SUBJECT_META[s]?.color }}>{SUBJECT_META[s]?.name}</div>{v.score}/{v.max} · {v.correct}✓ {v.incorrect}✗ {v.unattempted}–</div>
          ))}
        </div>
        <div className="mt-4 flex gap-2"><button className="btn-primary" onClick={onAgain}><RotateCcw size={15} /> New test</button><Link href="/progress" className="btn-ghost">Progress page</Link></div>
      </div>
      <div className="space-y-3">
        {ids.map((id, k) => {
          const q = byId.get(id)!;
          const a = rec.answers[id];
          const ci = q.options?.findIndex((o) => o.correct) ?? -1;
          return (
            <details key={id} className="card card-pad">
              <summary className="flex cursor-pointer items-center gap-2 text-sm">
                <span className={cn("chip", a === true ? "bg-emerald-500/10 text-emerald-600" : a === false ? "bg-rose-500/10 text-rose-600" : "bg-[var(--surface-2)]")}>{a === true ? "+4" : a === false ? "−1" : "0"}</span>
                <span className="font-semibold">Q{k + 1}</span><span className="muted truncate">{q.topicName}</span>
              </summary>
              <div className="mt-3 space-y-3 text-sm">
                <Rich text={q.statement} />
                <div className="font-semibold">Answer: {q.type === "MCQ" ? <>({"ABCD"[ci]}) <Inline text={q.options![ci].text} /></> : q.answer}</div>
                <Rich text={q.solution} />
                <Link href={`/gym/${q.topic}`} className="link text-xs">Practise this topic in the Gym</Link>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
