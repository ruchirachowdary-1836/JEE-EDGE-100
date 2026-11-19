"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Rich } from "@/components/Rich";
import { api } from "@/lib/client";

export type QForm = {
  id?: string; source: string; type: string; chapterSlug: string; topicSlug: string; level: number; difficulty: string; statement: string;
  options: { text: string; isCorrect: boolean; explanation: string }[]; numericalAnswer: string; numericalTolerance: number;
  solution: string; conceptTested: string; formulaUsed: string; whyFormula: string; altMethod: string; commonMistakes: string; approxTimeSec: number;
  pyqYear: string; pyqSession: string; pyqShift: string; pyqDate: string; sourceAttribution: string;
  /** MATCH only: one List-I / List-II item per line */
  matchLeft?: string; matchRight?: string;
};

export function QuestionEditor({ initial, chapters }: { initial: QForm; chapters: { slug: string; name: string; topics: { slug: string; name: string }[] }[] }) {
  const router = useRouter();
  const [f, setF] = useState<QForm>(initial);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const topics = chapters.find((c) => c.slug === f.chapterSlug)?.topics ?? [];
  const set = <K extends keyof QForm>(k: K, v: QForm[K]) => setF({ ...f, [k]: v });
  const area = (k: keyof QForm, label: string, rows = 3) => (
    <div className="card card-pad"><label className="label">{label}</label><textarea className="input text-sm" rows={rows} value={String(f[k])} onChange={(e) => set(k, e.target.value as never)} /></div>
  );

  const save = async () => {
    setErr("");
    if (f.type === "NUMERICAL" && (f.numericalAnswer.trim() === "" || Number.isNaN(Number(f.numericalAnswer)))) return setErr("Enter a numeric answer.");
    const lines = (t?: string) => (t ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
    setBusy(true);
    try {
      const r = await api<{ id: string }>("/api/admin/questions", {
        method: "PUT",
        body: {
          ...f, topicSlug: f.topicSlug || null, level: f.source === "PRACTICE" ? f.level : f.level || null,
          options: f.type !== "NUMERICAL" ? f.options : [], matchLists: f.type === "MATCH" ? { left: lines(f.matchLeft), right: lines(f.matchRight) } : null, numericalAnswer: f.type === "NUMERICAL" ? Number(f.numericalAnswer) : null,
          altMethod: f.altMethod || null, pyqYear: f.pyqYear ? Number(f.pyqYear) : null, pyqSession: f.pyqSession || null, pyqShift: f.pyqShift || null,
          pyqDate: f.pyqDate || null, sourceAttribution: f.sourceAttribution || null,
        },
      });
      router.push(`/admin/questions/${r.id}`);
      router.refresh();
      setErr("Saved as pending review.");
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <div className="card card-pad grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div><label className="label">Source</label><select className="input" value={f.source} onChange={(e) => set("source", e.target.value)}><option value="PRACTICE">Practice (original)</option><option value="PYQ">PYQ (licensed)</option></select></div>
        <div><label className="label">Type</label><select className="input" value={f.type} onChange={(e) => set("type", e.target.value)}><option value="MCQ">MCQ (single correct)</option><option value="NUMERICAL">Numerical</option><option value="MULTIPLE">One or more correct (Advanced)</option><option value="MATCH">Matching list (Advanced)</option></select></div>
        <div className="lg:col-span-2"><label className="label">Chapter</label><select className="input" value={f.chapterSlug} onChange={(e) => setF({ ...f, chapterSlug: e.target.value, topicSlug: "" })}>{chapters.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
        <div className="lg:col-span-2"><label className="label">Topic</label><select className="input" value={f.topicSlug} onChange={(e) => set("topicSlug", e.target.value)}><option value="">—</option>{topics.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select></div>
        <div><label className="label">Gym level</label><select className="input" value={f.level} onChange={(e) => set("level", Number(e.target.value))}>{[1, 2, 3, 4, 5].map((l) => <option key={l} value={l}>Level {l}</option>)}</select></div>
        <div><label className="label">Difficulty</label><select className="input" value={f.difficulty} onChange={(e) => set("difficulty", e.target.value)}><option value="EASY">Easy</option><option value="MEDIUM">Medium</option><option value="HARD">Hard</option></select></div>
        <div><label className="label">Approx. time (s)</label><input type="number" className="input" value={f.approxTimeSec} onChange={(e) => set("approxTimeSec", Number(e.target.value))} /></div>
      </div>

      {f.source === "PYQ" && (
        <div className="card card-pad grid gap-3 border-electric-500/40 sm:grid-cols-5">
          <div><label className="label">Year</label><input className="input" value={f.pyqYear} onChange={(e) => set("pyqYear", e.target.value)} placeholder="2025" /></div>
          <div><label className="label">Session</label><input className="input" value={f.pyqSession} onChange={(e) => set("pyqSession", e.target.value)} placeholder="January" /></div>
          <div><label className="label">Shift</label><input className="input" value={f.pyqShift} onChange={(e) => set("pyqShift", e.target.value)} placeholder="Shift 1" /></div>
          <div><label className="label">Exam date</label><input type="date" className="input" value={f.pyqDate} onChange={(e) => set("pyqDate", e.target.value)} /></div>
          <div><label className="label">Source attribution</label><input className="input" value={f.sourceAttribution} onChange={(e) => set("sourceAttribution", e.target.value)} placeholder="e.g. NTA official question paper, licence ref." /></div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card card-pad"><label className="label">Question statement</label><textarea className="input text-sm" rows={6} value={f.statement} onChange={(e) => set("statement", e.target.value)} /></div>
        <div className="card card-pad"><label className="label">Preview</label><Rich text={f.statement || "_(empty)_"} /></div>
      </div>

      {f.type === "MATCH" && (
        <div className="card card-pad grid gap-3 sm:grid-cols-2">
          <div><label className="label">List-I (P, Q, R, S — one item per line)</label><textarea className="input text-sm" rows={4} value={f.matchLeft ?? ""} onChange={(e) => set("matchLeft", e.target.value)} /></div>
          <div><label className="label">List-II (1, 2, 3, … — one item per line)</label><textarea className="input text-sm" rows={4} value={f.matchRight ?? ""} onChange={(e) => set("matchRight", e.target.value)} /></div>
          <p className="muted text-xs sm:col-span-2">Options below are answer codes such as “P→2, Q→3, R→1, S→4”; mark the single correct code.</p>
        </div>
      )}
      {f.type !== "NUMERICAL" ? (
        <div className="card card-pad space-y-2">
          <label className="label">{f.type === "MULTIPLE" ? "Options (tick every correct option; explain every option)" : "Options (select the single correct one; explain every option)"}</label>
          {f.options.map((o, i) => (
            <div key={i} className="grid gap-2 rounded-xl border border-[var(--border)] p-2 sm:grid-cols-[auto_1fr_1fr_auto]">
              <label className="flex items-center gap-1 text-sm font-bold"><input type={f.type === "MULTIPLE" ? "checkbox" : "radio"} name="correct" checked={o.isCorrect} onChange={() => set("options", f.options.map((x, j) => (f.type === "MULTIPLE" ? (j === i ? { ...x, isCorrect: !x.isCorrect } : x) : { ...x, isCorrect: j === i })))} className="accent-emerald-500" /> {String.fromCharCode(65 + i)}</label>
              <input className="input" placeholder="Option text" value={o.text} onChange={(e) => set("options", f.options.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))} />
              <input className="input" placeholder={o.isCorrect ? "Why this is correct" : "Why this is wrong"} value={o.explanation} onChange={(e) => set("options", f.options.map((x, j) => (j === i ? { ...x, explanation: e.target.value } : x)))} />
              <button className="muted hover:text-rose-500" onClick={() => set("options", f.options.filter((_, j) => j !== i))} aria-label="Remove option"><Trash2 size={15} /></button>
            </div>
          ))}
          {f.options.length < 6 && <button className="btn-ghost !py-1 text-xs" onClick={() => set("options", [...f.options, { text: "", isCorrect: false, explanation: "" }])}><Plus size={13} /> Add option</button>}
        </div>
      ) : (
        <div className="card card-pad grid gap-3 sm:grid-cols-2">
          <div><label className="label">Correct numerical answer</label><input className="input" value={f.numericalAnswer} onChange={(e) => set("numericalAnswer", e.target.value)} /></div>
          <div><label className="label">Accepted tolerance (±)</label><input type="number" step="0.01" className="input" value={f.numericalTolerance} onChange={(e) => set("numericalTolerance", Number(e.target.value))} /></div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {area("solution", "Complete step-by-step solution", 6)}
        {area("conceptTested", "Concept being tested")}
        {area("formulaUsed", "Formula used")}
        {area("whyFormula", "Why that formula was selected")}
        {area("altMethod", "Alternative method (optional)")}
        {area("commonMistakes", "Common mistakes")}
      </div>

      <div className="sticky bottom-4 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
        <button className="btn-violet" onClick={save} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Save question</button>
        {err && <span className="whitespace-pre-wrap text-sm">{err}</span>}
      </div>
    </div>
  );
}
