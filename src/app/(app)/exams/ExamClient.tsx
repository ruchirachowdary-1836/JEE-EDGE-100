"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Loader2, PlayCircle } from "lucide-react";
import { api } from "@/lib/client";
import { SUBJECT_META } from "@/lib/utils";

export function StartMockButton({ mockExamId }: { mockExamId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const start = async () => {
    setBusy(true);
    setErr("");
    try {
      const r = await api<{ attemptId: string }>("/api/exams/start", { body: { mode: "mock", mockExamId } });
      router.push(`/exams/${r.attemptId}`);
    } catch (e) { setErr((e as Error).message); setBusy(false); }
  };
  return (
    <div className="text-right">
      <button className="btn-primary" onClick={start} disabled={busy}>{busy ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />} Start / resume</button>
      {err && <p className="mt-1 text-xs text-rose-500">{err}</p>}
    </div>
  );
}

type Ch = { slug: string; name: string; subject: string; count: number };

export function TestBuilder({ chapters, initialChapter, initialSource, initialYear, initialSubject }: { chapters: Ch[]; initialChapter?: string; initialSource: "ANY" | "PYQ"; initialYear?: number; initialSubject?: string }) {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>(initialChapter ? [initialChapter] : []);
  const [subject, setSubject] = useState(initialSubject ?? "");
  const [source, setSource] = useState<"ANY" | "PRACTICE" | "PYQ">(initialSource);
  const [count, setCount] = useState(15);
  const [mpq, setMpq] = useState(2.4);
  const [title, setTitle] = useState(initialSource === "PYQ" ? "Timed PYQ test" : "Chapter test");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const available = useMemo(() => chapters.filter((c) => c.count > 0 && (!subject || c.subject === subject)), [chapters, subject]);
  const pool = picked.length ? chapters.filter((c) => picked.includes(c.slug)).reduce((a, c) => a + c.count, 0) : available.reduce((a, c) => a + c.count, 0);

  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
  const start = async () => {
    setErr("");
    if (title.trim().length < 3) return setErr("Give the test a name (3+ characters).");
    if (count < 3 || count > 90) return setErr("Choose between 3 and 90 questions.");
    setBusy(true);
    try {
      const r = await api<{ attemptId: string }>("/api/exams/start", {
        body: { mode: "custom", title: title.trim(), chapterSlugs: picked, subject: subject || undefined, source, year: initialYear, count, minutesPerQuestion: mpq },
      });
      router.push(`/exams/${r.attemptId}`);
    } catch (e) { setErr((e as Error).message); setBusy(false); }
  };

  return (
    <div className="space-y-3">
      <div><label className="label">Test name</label><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} /></div>
      <div className="grid grid-cols-2 gap-2 [&>*]:min-w-0">
        <div><label className="label">Subject</label>
          <select className="input min-w-0" value={subject} onChange={(e) => { setSubject(e.target.value); setPicked([]); }}>
            <option value="">All</option>{Object.entries(SUBJECT_META).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
        <div><label className="label">Source</label>
          <select className="input min-w-0" value={source} onChange={(e) => setSource(e.target.value as "ANY" | "PRACTICE" | "PYQ")}>
            <option value="ANY">PYQ + practice</option><option value="PYQ">PYQs only</option><option value="PRACTICE">Practice only</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label">Chapters ({picked.length ? `${picked.length} selected` : "all with questions"})</label>
        <div className="max-h-48 space-y-1 overflow-y-auto rounded-xl border border-[var(--border)] p-2">
          {available.length === 0 && <p className="muted p-2 text-xs">No chapters with published questions.</p>}
          {available.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-[var(--surface-2)]">
              <input type="checkbox" checked={picked.includes(c.slug)} onChange={() => toggle(c.slug)} className="accent-electric-500" />
              <span className="flex-1 truncate">{c.name}</span><span className="muted text-xs">{c.count}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div><label className="label">Questions</label><input type="number" className="input" min={3} max={90} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div><label className="label">Min / question</label><input type="number" className="input" min={0.5} max={6} step={0.1} value={mpq} onChange={(e) => setMpq(Number(e.target.value))} /></div>
      </div>
      <p className="muted text-xs">{pool} questions available in this selection{initialYear ? ` (year ${initialYear})` : ""}. Timer: {Math.max(5, Math.round(Math.min(count, pool) * mpq))} min. JEE Main pace is 2.4 min/question.</p>
      {err && <p className="text-sm text-rose-500">{err}</p>}
      <button className="btn-violet w-full" onClick={start} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Start test</button>
    </div>
  );
}
