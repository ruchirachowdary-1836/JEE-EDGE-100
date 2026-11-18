"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Plus, FileText } from "lucide-react";
import { api } from "@/lib/client";
import { StatusControl } from "../StatusControl";

type Topic = { id: string; slug: string; name: string; subtopics: string[]; summary: string; publishStatus: string; reviewStatus: string; note: { id: string; publishStatus: string; reviewStatus: string } | null };
type Chapter = { id: string; slug: string; name: string; unit: string | null; planWeight: number; summary: string; syllabusStatus: string; publishStatus: string; reviewStatus: string; topics: Topic[] };
type Subject = { slug: string; name: string; chapters: Chapter[] };

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

function ChapterForm({ subject, ch, onDone }: { subject: string; ch?: Chapter; onDone: () => void }) {
  const router = useRouter();
  const [f, setF] = useState({ name: ch?.name ?? "", slug: ch?.slug ?? "", unit: ch?.unit ?? "", planWeight: ch?.planWeight ?? 3, summary: ch?.summary ?? "", syllabusStatus: ch?.syllabusStatus ?? "EXAMINABLE" });
  const [err, setErr] = useState("");
  const save = async () => {
    setErr("");
    try {
      await api("/api/admin/syllabus", { method: "PUT", body: { kind: "chapter", id: ch?.id, subjectSlug: subject, ...f, slug: f.slug || slugify(f.name) } });
      router.refresh(); onDone();
    } catch (e) { setErr((e as Error).message); }
  };
  return (
    <div className="grid gap-2 rounded-xl border border-violet-500/40 bg-violet-500/5 p-3 sm:grid-cols-2">
      <input className="input" placeholder="Chapter name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <input className="input" placeholder="slug (auto)" value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} />
      <input className="input" placeholder="Unit (e.g. Organic Chemistry)" value={f.unit} onChange={(e) => setF({ ...f, unit: e.target.value })} />
      <div className="flex gap-2">
        <select className="input" value={f.planWeight} onChange={(e) => setF({ ...f, planWeight: Number(e.target.value) })}>{[1, 2, 3, 4, 5].map((w) => <option key={w} value={w}>Planning weight {w}</option>)}</select>
        <select className="input" value={f.syllabusStatus} onChange={(e) => setF({ ...f, syllabusStatus: e.target.value })}><option value="EXAMINABLE">Examinable</option><option value="ENRICHMENT">Optional enrichment</option></select>
      </div>
      <textarea className="input sm:col-span-2" rows={2} placeholder="Summary" value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} />
      <div className="flex items-center gap-2 sm:col-span-2"><button className="btn-violet !py-1.5" onClick={save}>Save chapter</button><button className="btn-ghost !py-1.5" onClick={onDone}>Cancel</button>{err && <span className="text-xs text-rose-500">{err}</span>}</div>
    </div>
  );
}

function TopicForm({ chapter, t, onDone }: { chapter: string; t?: Topic; onDone: () => void }) {
  const router = useRouter();
  const [f, setF] = useState({ name: t?.name ?? "", slug: t?.slug ?? "", subtopics: t?.subtopics.join("\n") ?? "", summary: t?.summary ?? "" });
  const [err, setErr] = useState("");
  const save = async () => {
    setErr("");
    try {
      await api("/api/admin/syllabus", { method: "PUT", body: { kind: "topic", id: t?.id, chapterSlug: chapter, name: f.name, slug: f.slug || slugify(f.name), summary: f.summary, subtopics: f.subtopics.split("\n").map((s) => s.trim()).filter(Boolean) } });
      router.refresh(); onDone();
    } catch (e) { setErr((e as Error).message); }
  };
  return (
    <div className="grid gap-2 rounded-xl border border-electric-500/40 bg-electric-500/5 p-3 sm:grid-cols-2">
      <input className="input" placeholder="Topic name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <input className="input" placeholder="slug (auto)" value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} />
      <textarea className="input sm:col-span-2" rows={3} placeholder="Subtopics, one per line" value={f.subtopics} onChange={(e) => setF({ ...f, subtopics: e.target.value })} />
      <div className="flex items-center gap-2 sm:col-span-2"><button className="btn-primary !py-1.5" onClick={save}>Save topic</button><button className="btn-ghost !py-1.5" onClick={onDone}>Cancel</button>{err && <span className="text-xs text-rose-500">{err}</span>}</div>
    </div>
  );
}

export function SyllabusEditor({ subjects }: { subjects: Subject[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  return (
    <div className="space-y-8">
      {subjects.map((s) => (
        <section key={s.slug}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="h2">{s.name}</h2>
            <button className="btn-ghost !py-1.5 text-xs" onClick={() => setEditing(`new-chapter-${s.slug}`)}><Plus size={14} /> Add chapter</button>
          </div>
          {editing === `new-chapter-${s.slug}` && <div className="mb-3"><ChapterForm subject={s.slug} onDone={() => setEditing(null)} /></div>}
          <div className="space-y-2">
            {s.chapters.map((c) => (
              <details key={c.id} className="card !p-0">
                <summary className="flex cursor-pointer flex-wrap items-center gap-3 p-4">
                  <span className="font-semibold">{c.name}</span>
                  <span className="muted text-xs">{c.topics.length} topics · weight {c.planWeight}{c.syllabusStatus === "ENRICHMENT" ? " · enrichment" : ""}</span>
                  <span className="ml-auto" onClick={(e) => e.preventDefault()}><StatusControl model="chapter" id={c.id} publishStatus={c.publishStatus} reviewStatus={c.reviewStatus} compact /></span>
                </summary>
                <div className="space-y-2 border-t border-[var(--border)] p-4">
                  {editing === c.id ? <ChapterForm subject={s.slug} ch={c} onDone={() => setEditing(null)} /> : <button className="btn-ghost !py-1 text-xs" onClick={() => setEditing(c.id)}><Pencil size={13} /> Edit chapter</button>}
                  {c.topics.map((t) => (
                    <div key={t.id} className="rounded-xl border border-[var(--border)] p-3">
                      {editing === t.id ? <TopicForm chapter={c.slug} t={t} onDone={() => setEditing(null)} /> : (
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-medium">{t.name}</span>
                          <span className="muted text-xs">/{t.slug}</span>
                          <button className="muted hover:text-electric-500" onClick={() => setEditing(t.id)} aria-label="Edit topic"><Pencil size={13} /></button>
                          <span className="ml-auto flex flex-wrap items-center gap-2">
                            <StatusControl model="topic" id={t.id} publishStatus={t.publishStatus} compact />
                            <Link href={`/admin/notes/${t.id}`} className="btn-ghost !px-2 !py-0.5 text-xs"><FileText size={12} /> {t.note ? "Edit notes" : "Write notes"}</Link>
                            {t.note && <StatusControl model="note" id={t.note.id} publishStatus={t.note.publishStatus} reviewStatus={t.note.reviewStatus} compact />}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  {editing === `new-topic-${c.id}` ? <TopicForm chapter={c.slug} onDone={() => setEditing(null)} /> : <button className="btn-ghost !py-1 text-xs" onClick={() => setEditing(`new-topic-${c.id}`)}><Plus size={13} /> Add topic</button>}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
