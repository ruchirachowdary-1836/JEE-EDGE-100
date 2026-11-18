"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowDown, ArrowUp, Eye, Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { Rich } from "@/components/Rich";
import { api } from "@/lib/client";

type S = { key: string; title: string; body: string; animationKey?: string };

export function NoteEditor({ topicId, initial, simKeys }: { topicId: string; initial: S[]; simKeys: string[] }) {
  const router = useRouter();
  const [sections, setSections] = useState<S[]>(initial);
  const [preview, setPreview] = useState<Record<number, boolean>>({});
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (i: number, patch: Partial<S>) => setSections((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const move = (i: number, d: number) => setSections((s) => { const a = [...s]; const [x] = a.splice(i, 1); a.splice(i + d, 0, x); return a; });

  const save = async () => {
    setMsg("");
    const keys = sections.map((s) => s.key);
    if (new Set(keys).size !== keys.length) return setMsg("Section keys must be unique.");
    const filled = sections.filter((s) => s.body.trim());
    if (!filled.length) return setMsg("Write at least one section before saving.");
    setBusy(true);
    try {
      await api("/api/admin/content", { method: "PUT", body: { kind: "note", data: { topicId, sections: filled.map((s) => ({ ...s, animationKey: s.animationKey || null })) } } });
      setMsg(`Saved ${filled.length} section(s). Empty sections are omitted. Review status reset to pending.`);
      router.refresh();
    } catch (e) { setMsg((e as Error).message); } finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      {sections.map((s, i) => (
        <div key={i} className="card card-pad space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="muted text-xs font-bold">{i + 1}</span>
            <input className="input !w-40 font-mono text-xs" value={s.key} onChange={(e) => update(i, { key: e.target.value })} aria-label="Section key" />
            <input className="input flex-1" value={s.title} onChange={(e) => update(i, { title: e.target.value })} aria-label="Section title" />
            <select className="input !w-auto text-xs" value={s.animationKey ?? ""} onChange={(e) => update(i, { animationKey: e.target.value || undefined })} aria-label="Embedded animation">
              <option value="">No animation</option>{simKeys.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <button className="btn-ghost !p-1.5" onClick={() => setPreview((p) => ({ ...p, [i]: !p[i] }))} aria-label="Toggle preview">{preview[i] ? <Pencil size={14} /> : <Eye size={14} />}</button>
            <button className="btn-ghost !p-1.5" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp size={14} /></button>
            <button className="btn-ghost !p-1.5" disabled={i === sections.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown size={14} /></button>
            <button className="btn-ghost !p-1.5 hover:!text-rose-500" onClick={() => setSections((x) => x.filter((_, j) => j !== i))} aria-label="Delete section"><Trash2 size={14} /></button>
          </div>
          {preview[i] ? <div className="rounded-xl bg-[var(--surface-2)] p-3"><Rich text={s.body || "_(empty)_"} /></div> : (
            <textarea className="input min-h-[140px] font-mono text-xs" value={s.body} onChange={(e) => update(i, { body: e.target.value })} placeholder="Write this section…" />
          )}
        </div>
      ))}
      <div className="sticky bottom-4 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
        <button className="btn-ghost" onClick={() => setSections((s) => [...s, { key: `section${s.length + 1}`, title: "New section", body: "" }])}><Plus size={16} /> Add section</button>
        <button className="btn-violet" onClick={save} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Save notes</button>
        {msg && <span className="text-sm">{msg}</span>}
      </div>
    </div>
  );
}
