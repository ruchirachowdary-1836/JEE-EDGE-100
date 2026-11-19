"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Download, Upload, Trash2, AlertTriangle } from "lucide-react";
import { Card, ProgressBar, Stat } from "@/components/ui";
import { BarSeries, LineSeries, ColoredBars } from "@/components/charts";
import { cn, SUBJECT_META, fmtDuration } from "@/lib/utils";
import { load, subscribe, cardStatus, exportProgress, importProgress, resetProgress, storageAvailable, type Progress } from "@site/lib/progress";

type Q = { id: string; topic: string; topicName: string; chapterSlug: string; subject: string; level: number };
type Ch = { slug: string; name: string; subject: string; topics: { slug: string; name: string }[] };

const dayKey = (t: number) => { const d = new Date(t); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; };
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

export function ProgressDashboard({ questions, chapters, cardKeys }: { questions: Q[]; chapters: Ch[]; cardKeys: { key: string; deck: string; chapter: string }[] }) {
  const store = useSyncExternalStore(subscribe, () => load(), () => null);
  const [mounted, setMounted] = useState(false);
  const [persistent, setPersistent] = useState(true);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setMounted(true); setPersistent(storageAvailable()); }, []);

  const data = useMemo(() => (mounted && store ? compute(store, questions, chapters, cardKeys) : null), [mounted, store, questions, chapters, cardKeys]);
  if (!data) return <p className="muted text-sm">Loading your saved progress…</p>;
  const { overall, subjects, chapterRows, weak, wrongNow, backlog, tests, activity } = data;
  const nothing = overall.attempts === 0 && overall.studied === 0 && tests.length === 0 && backlog.reviewed === 0;

  const doExport = () => {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `jee-edge-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const doImport = async (f: File) => {
    try { importProgress(await f.text()); setMsg("Progress imported."); } catch (e) { setMsg((e as Error).message); }
  };

  return (
    <div className="space-y-6">
      {!persistent && <div className="flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm"><AlertTriangle size={16} className="mt-0.5 shrink-0" /> This browser is blocking storage, so progress cannot be saved between visits. Use a normal (non-private) window.</div>}
      {nothing && (
        <Card><p className="text-sm">No saved activity yet. Every number on this page comes from what you do on this site in this browser: mark topics as studied, answer questions in the <Link className="link" href="/gym">Question Gym</Link>, review <Link className="link" href="/revision">flashcards</Link> and take a <Link className="link" href="/test">timed test</Link>.</p></Card>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat label="Topics studied" value={`${overall.studied}/${overall.topics}`} hint="self-reported" />
        <Stat label="Questions attempted" value={`${overall.attempted}/${overall.bank}`} hint={`${overall.attempts} attempts in total`} />
        <Stat label="Correct / incorrect" value={`${overall.correct} / ${overall.incorrect}`} hint="all Gym attempts" />
        <Stat label="Accuracy" value={overall.attempts ? `${overall.accuracy}%` : "—"} hint={overall.avgSec ? `avg ${fmtDuration(overall.avgSec)} per attempt` : undefined} />
        <Stat label="Revision backlog" value={backlog.overdue + backlog.due} hint={`${backlog.overdue} overdue · ${backlog.due} due today`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {subjects.map((s) => (
          <Card key={s.slug}>
            <div className="mb-3 flex items-center justify-between"><div className="h2" style={{ color: SUBJECT_META[s.slug].color }}>{SUBJECT_META[s.slug].name}</div><span className="muted text-xs">{s.chapters} chapters</span></div>
            <ProgressBar value={pct(s.studied, s.topics)} label={`Topics studied (${s.studied}/${s.topics})`} color={SUBJECT_META[s.slug].bg} className="mb-2" />
            <ProgressBar value={pct(s.attempted, s.bank)} label={`Questions attempted (${s.attempted}/${s.bank})`} color="bg-violet-500" className="mb-2" />
            <div className="muted mt-2 text-xs">{s.correct} correct · {s.incorrect} incorrect · accuracy {s.attempts ? `${s.accuracy}%` : "—"}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="h2 mb-2">Accuracy by subject</h2>
          <ColoredBars data={subjects.filter((s) => s.attempts > 0).map((s) => ({ name: SUBJECT_META[s.slug].name, value: s.accuracy, color: SUBJECT_META[s.slug].color }))} />
        </Card>
        <Card>
          <h2 className="h2 mb-2">Gym attempts, last 14 days</h2>
          <BarSeries data={activity.some((a) => a.correct + a.incorrect > 0) ? activity : []} xKey="day" bars={[{ key: "correct", color: "#10b981", name: "Correct" }, { key: "incorrect", color: "#f43f5e", name: "Incorrect" }]} />
        </Card>
      </div>

      <Card>
        <h2 className="h2 mb-1">Timed tests</h2>
        <p className="muted mb-3 text-sm">Scores from <Link className="link" href="/test">timed tests</Link> (+4 / −1 / 0). Percentage of the maximum for that test.</p>
        <LineSeries data={tests.map((t, i) => ({ n: `#${i + 1}`, score: pct(t.score, t.max) }))} xKey="n" lines={[{ key: "score", color: "#2b8cff", name: "Score %" }]} yMax={100} unit="%" />
        {tests.length > 0 && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="muted text-left text-xs"><th className="p-2">Date</th><th className="p-2">Test</th><th className="p-2">Score</th><th className="p-2">✓ / ✗ / –</th><th className="p-2">Time used</th></tr></thead>
              <tbody>{tests.slice().reverse().map((t) => (
                <tr key={t.id} className="border-t border-[var(--border)]"><td className="whitespace-nowrap p-2">{new Date(t.t).toLocaleDateString()}</td><td className="p-2">{t.title}</td><td className="p-2 font-semibold">{t.score}/{t.max}</td><td className="p-2">{t.correct} / {t.incorrect} / {t.unattempted}</td><td className="p-2">{fmtDuration(t.usedSec)}</td></tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="h2 mb-1">Weak topics</h2>
          <p className="muted mb-3 text-sm">Topics with at least 3 Gym attempts and accuracy below 70%, weakest first.</p>
          {weak.length === 0 ? <p className="muted text-sm">None yet{overall.attempts < 3 ? " — not enough attempts to judge" : ""}.</p> : (
            <ul className="space-y-2 text-sm">{weak.map((w) => (
              <li key={w.slug} className="flex items-center justify-between gap-2"><Link href={`/gym/${w.slug}`} className="hover:underline">{w.name}</Link><span className="chip bg-rose-500/10 text-rose-600">{w.accuracy}% of {w.attempts}</span></li>
            ))}</ul>
          )}
        </Card>
        <Card>
          <h2 className="h2 mb-1">Questions to redo</h2>
          <p className="muted mb-3 text-sm">Questions whose most recent answer was wrong.</p>
          {wrongNow.length === 0 ? <p className="muted text-sm">None.</p> : (
            <ul className="space-y-1 text-sm">{wrongNow.slice(0, 15).map((q) => (
              <li key={q.id} className="flex justify-between gap-2"><Link href={`/gym/${q.topic}`} className="truncate hover:underline">{q.topicName} · Level {q.level}</Link><span className="muted shrink-0 text-xs">{SUBJECT_META[q.subject]?.name}</span></li>
            ))}</ul>
          )}
          {wrongNow.length > 15 && <p className="muted mt-2 text-xs">and {wrongNow.length - 15} more.</p>}
        </Card>
      </div>

      <Card>
        <h2 className="h2 mb-1">Revision backlog</h2>
        <p className="muted mb-3 text-sm">{backlog.reviewed} cards reviewed at least once · {backlog.history} reviews in total.</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {backlog.decks.map((d) => (
            <Link key={d.deck} href={`/revision?deck=${d.deck}`} className="rounded-xl border border-[var(--border)] p-3 text-sm hover:border-electric-400">
              <div className="font-semibold">{d.label}</div>
              <div className="muted text-xs">{d.overdue} overdue · {d.due} due · {d.fresh} new · {d.scheduled} scheduled</div>
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="h2 mb-3">Chapter-wise progress</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead><tr className="muted text-left text-xs"><th className="p-2">Chapter</th><th className="p-2">Topics studied</th><th className="p-2">Questions tried</th><th className="p-2">Correct</th><th className="p-2">Incorrect</th><th className="p-2">Accuracy</th></tr></thead>
            <tbody>{chapterRows.map((c) => (
              <tr key={c.slug} className={cn("border-t border-[var(--border)]", c.active ? "" : "muted")}>
                <td className="p-2"><Link href={`/chapter/${c.slug}`} className="hover:underline">{c.name}</Link></td>
                <td className="p-2">{c.studied}/{c.topics}</td>
                <td className="p-2">{c.bank ? `${c.attempted}/${c.bank}` : "no questions yet"}</td>
                <td className="p-2">{c.correct}</td><td className="p-2">{c.incorrect}</td>
                <td className="p-2">{c.attempts ? `${c.accuracy}%` : "—"}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="h2 mb-1">Back up or move your progress</h2>
        <p className="muted mb-3 text-sm">This edition saves progress only in this browser. Export it to a file to keep a backup or to continue on another device.</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-ghost" onClick={doExport}><Download size={15} /> Export progress</button>
          <button className="btn-ghost" onClick={() => fileRef.current?.click()}><Upload size={15} /> Import progress</button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
          <button className="btn-ghost !text-rose-500" onClick={() => { if (window.confirm("Delete all saved progress in this browser? This cannot be undone unless you exported it.")) { resetProgress(); setMsg("Progress cleared."); } }}><Trash2 size={15} /> Clear all progress</button>
        </div>
        {msg && <p className="mt-2 text-sm">{msg}</p>}
      </Card>
    </div>
  );
}

function compute(p: Progress, questions: Q[], chapters: Ch[], cardKeys: { key: string; deck: string; chapter: string }[]) {
  const stat = (qs: Q[]) => {
    const all = qs.flatMap((q) => p.attempts[q.id] ?? []);
    const correct = all.filter((a) => a.ok).length;
    return { bank: qs.length, attempted: qs.filter((q) => p.attempts[q.id]?.length).length, attempts: all.length, correct, incorrect: all.length - correct, accuracy: pct(correct, all.length), secs: all.reduce((s, a) => s + a.sec, 0) };
  };
  const topicsOf = (cs: Ch[]) => cs.flatMap((c) => c.topics);
  const studiedCount = (ts: { slug: string }[]) => ts.filter((t) => p.studied[t.slug]).length;
  const allTopics = topicsOf(chapters);
  const o = stat(questions);
  const overall = { ...o, topics: allTopics.length, studied: studiedCount(allTopics), avgSec: o.attempts ? Math.round(o.secs / o.attempts) : 0 };
  const subjects = ["physics", "chemistry", "mathematics"].map((slug) => {
    const cs = chapters.filter((c) => c.subject === slug);
    return { slug, chapters: cs.length, topics: topicsOf(cs).length, studied: studiedCount(topicsOf(cs)), ...stat(questions.filter((q) => q.subject === slug)) };
  });
  const chapterRows = chapters.map((c) => {
    const s = stat(questions.filter((q) => q.chapterSlug === c.slug));
    const studied = studiedCount(c.topics);
    return { slug: c.slug, name: c.name, topics: c.topics.length, studied, ...s, active: s.attempts > 0 || studied > 0 };
  });
  const weak = allTopics.map((t) => ({ ...t, ...stat(questions.filter((q) => q.topic === t.slug)) })).filter((t) => t.attempts >= 3 && t.accuracy < 70).sort((a, b) => a.accuracy - b.accuracy).slice(0, 10);
  const wrongNow = questions.filter((q) => { const a = p.attempts[q.id]; return a?.length && !a[a.length - 1].ok; });
  const now = Date.now();
  const deckLabel: Record<string, string> = { FORMULA: "Formulas", CONCEPT: "Concepts", REACTION: "Reactions" };
  const decks = Object.keys(deckLabel).map((deck) => {
    const st = cardKeys.filter((c) => c.deck === deck).map((c) => cardStatus(c.key, now).status);
    return { deck, label: deckLabel[deck], overdue: st.filter((s) => s === "overdue").length, due: st.filter((s) => s === "due" || s === "learning").length, fresh: st.filter((s) => s === "new").length, scheduled: st.filter((s) => s === "scheduled").length };
  });
  const backlog = { decks, overdue: decks.reduce((s, d) => s + d.overdue, 0), due: decks.reduce((s, d) => s + d.due, 0), reviewed: Object.keys(p.cards).length, history: p.history.length };
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (13 - i)); return d; });
  const all = Object.values(p.attempts).flat().filter((a) => a.t > 0);
  const activity = days.map((d) => {
    const k = dayKey(d.getTime());
    const list = all.filter((a) => dayKey(a.t) === k);
    return { day: `${d.getDate()}/${d.getMonth() + 1}`, correct: list.filter((a) => a.ok).length, incorrect: list.filter((a) => !a.ok).length };
  });
  return { overall, subjects, chapterRows, weak, wrongNow, backlog, tests: p.tests, activity };
}
