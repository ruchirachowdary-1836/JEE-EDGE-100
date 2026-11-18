"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/client";
import { StatusControl } from "../StatusControl";

type Lesson = { id?: string; key: string; title: string; subjectSlug: string; chapterSlug: string; topicSlug: string; intro: string; mathExplanation: string; realLife: string; jeeApplication: string; steps: { title: string; body: string }[]; publishStatus?: string; reviewStatus?: string };

function Editor({ lesson, simKeys, chapters, onDone }: { lesson: Lesson; simKeys: string[]; chapters: { slug: string; name: string; subject: string; topics: { slug: string; name: string }[] }[]; onDone: () => void }) {
  const router = useRouter();
  const [l, setL] = useState(lesson);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const topics = chapters.find((c) => c.slug === l.chapterSlug)?.topics ?? [];
  const save = async () => {
    setErr(""); setBusy(true);
    try {
      await api("/api/admin/content", { method: "PUT", body: { kind: "animation", data: { ...l, chapterSlug: l.chapterSlug || null, topicSlug: l.topicSlug || null } } });
      router.refresh(); onDone();
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };
  const field = (k: keyof Lesson, label: string) => <div><label className="label">{label}</label><textarea className="input text-sm" rows={3} value={String(l[k])} onChange={(e) => setL({ ...l, [k]: e.target.value })} /></div>;
  return (
    <div className="card card-pad space-y-3 border-violet-500/40">
      <div className="grid gap-2 sm:grid-cols-4">
        <div><label className="label">Simulation</label><select className="input" value={l.key} disabled={!!lesson.id} onChange={(e) => setL({ ...l, key: e.target.value })}>{simKeys.map((k) => <option key={k}>{k}</option>)}</select></div>
        <div><label className="label">Title</label><input className="input" value={l.title} onChange={(e) => setL({ ...l, title: e.target.value })} /></div>
        <div><label className="label">Chapter</label><select className="input" value={l.chapterSlug} onChange={(e) => { const c = chapters.find((x) => x.slug === e.target.value); setL({ ...l, chapterSlug: e.target.value, subjectSlug: c?.subject ?? l.subjectSlug, topicSlug: "" }); }}><option value="">—</option>{chapters.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
        <div><label className="label">Topic</label><select className="input" value={l.topicSlug} onChange={(e) => setL({ ...l, topicSlug: e.target.value })}><option value="">—</option>{topics.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select></div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {field("intro", "1. Concept introduction")}
        {field("mathExplanation", "6. Mathematical explanation")}
        {field("realLife", "7. Real-life application")}
        {field("jeeApplication", "8. JEE-level application")}
      </div>
      <div>
        <label className="label">3. Step-by-step explanation (also drives step mode)</label>
        {l.steps.map((s, i) => (
          <div key={i} className="mb-2 grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
            <input className="input" value={s.title} placeholder="Step title" onChange={(e) => setL({ ...l, steps: l.steps.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) })} />
            <input className="input" value={s.body} placeholder="Explanation" onChange={(e) => setL({ ...l, steps: l.steps.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)) })} />
            <button className="muted hover:text-rose-500" onClick={() => setL({ ...l, steps: l.steps.filter((_, j) => j !== i) })} aria-label="Remove step"><Trash2 size={15} /></button>
          </div>
        ))}
        <button className="btn-ghost !py-1 text-xs" onClick={() => setL({ ...l, steps: [...l.steps, { title: "", body: "" }] })}><Plus size={13} /> Add step</button>
      </div>
      <div className="flex items-center gap-2"><button className="btn-violet" onClick={save} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Save lesson</button><button className="btn-ghost" onClick={onDone}>Cancel</button>{err && <span className="text-sm text-rose-500">{err}</span>}</div>
    </div>
  );
}

export function AnimationAdmin({ lessons, simKeys, chapters }: { lessons: Lesson[]; simKeys: string[]; chapters: { slug: string; name: string; subject: string; topics: { slug: string; name: string }[] }[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const unused = simKeys.filter((k) => !lessons.some((l) => l.key === k));
  return (
    <div className="space-y-3">
      {unused.length > 0 && (editing === "new" ? (
        <Editor lesson={{ key: unused[0], title: "", subjectSlug: "physics", chapterSlug: "", topicSlug: "", intro: "", mathExplanation: "", realLife: "", jeeApplication: "", steps: [{ title: "", body: "" }] }} simKeys={unused} chapters={chapters} onDone={() => setEditing(null)} />
      ) : <button className="btn-violet" onClick={() => setEditing("new")}><Plus size={16} /> New lesson</button>)}
      {lessons.map((l) => editing === l.key ? (
        <Editor key={l.key} lesson={l} simKeys={simKeys} chapters={chapters} onDone={() => setEditing(null)} />
      ) : (
        <div key={l.key} className="card flex flex-wrap items-center gap-3 p-4">
          <div className="min-w-0 flex-1"><div className="font-semibold">{l.title}</div><div className="muted text-xs">sim: {l.key} · {l.steps.length} steps</div></div>
          <StatusControl model="animation" id={l.id!} publishStatus={l.publishStatus!} reviewStatus={l.reviewStatus} compact />
          <Link href={`/studio/${l.key}`} className="btn-ghost !py-1 text-xs">Preview</Link>
          <button className="btn-ghost !py-1 text-xs" onClick={() => setEditing(l.key)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
