"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { api } from "@/lib/client";
import type { ExamPattern } from "@/lib/config";

export function MockBuilder({ pattern }: { pattern: ExamPattern }) {
  const router = useRouter();
  const [title, setTitle] = useState("Full Mock Test");
  const [kind, setKind] = useState<"FULL" | "CUSTOM">("FULL");
  const [duration, setDuration] = useState(pattern.durationMin);
  const [sections, setSections] = useState(pattern.sections);
  const [sources, setSources] = useState("ANY");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const build = async () => {
    setMsg(""); setBusy(true);
    try { const r = await api<{ count: number }>("/api/admin/mocks", { body: { title, kind, durationMin: duration, sections, sources, onlyVerified } }); setMsg(`Created as draft with ${r.count} questions. Publish it from the list.`); router.refresh(); }
    catch (e) { setMsg((e as Error).message); } finally { setBusy(false); }
  };
  return (
    <div className="space-y-3 text-sm">
      <div><label className="label">Title</label><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-2">
        <div><label className="label">Kind</label><select className="input" value={kind} onChange={(e) => setKind(e.target.value as "FULL" | "CUSTOM")}><option value="FULL">Full-length</option><option value="CUSTOM">Shortened</option></select></div>
        <div><label className="label">Duration (min)</label><input type="number" className="input" value={duration} onChange={(e) => setDuration(Number(e.target.value))} /></div>
      </div>
      {sections.map((s, i) => (
        <div key={s.subject} className="grid grid-cols-3 items-end gap-2">
          <div className="pb-2 font-semibold capitalize">{s.subject}</div>
          <div><label className="label">MCQ</label><input type="number" className="input" value={s.mcq} onChange={(e) => setSections(sections.map((x, j) => (j === i ? { ...x, mcq: Number(e.target.value) } : x)))} /></div>
          <div><label className="label">Numerical</label><input type="number" className="input" value={s.numerical} onChange={(e) => setSections(sections.map((x, j) => (j === i ? { ...x, numerical: Number(e.target.value) } : x)))} /></div>
        </div>
      ))}
      <div><label className="label">Question source</label><select className="input" value={sources} onChange={(e) => setSources(e.target.value)}><option value="ANY">PYQ + practice</option><option value="PYQ">PYQ only</option><option value="PRACTICE">Practice only</option></select></div>
      <label className="flex items-center gap-2"><input type="checkbox" className="accent-violet-500" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} /> Only expert-verified questions</label>
      <button className="btn-violet w-full" onClick={build} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Assemble from bank</button>
      {msg && <p className="text-xs">{msg}</p>}
      <p className="muted text-xs">Marking scheme comes from Exam configuration ({pattern.marks.correct} / {pattern.marks.incorrectMcq} / {pattern.marks.incorrectNumerical}).</p>
    </div>
  );
}

export function DeleteMock({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button className="muted hover:text-rose-500" aria-label="Delete mock" onClick={async () => {
      if (!confirm("Delete this mock test? This cannot be undone.")) return;
      try { await api(`/api/admin/mocks?id=${encodeURIComponent(id)}`, { method: "DELETE" }); router.refresh(); } catch (e) { alert((e as Error).message); }
    }}><Trash2 size={15} /></button>
  );
}
