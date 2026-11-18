"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bookmark, BookmarkCheck, CheckCircle2, Circle, Dumbbell, FileDown, Repeat } from "lucide-react";
import { api } from "@/lib/client";
import { cn } from "@/lib/utils";

export function TopicActions(props: { topicId: string; slug: string; hasNotes: boolean; notesDone: boolean; revisedCount: number; bookmarked: boolean; gymCount: number }) {
  const router = useRouter();
  const [done, setDone] = useState(props.notesDone);
  const [bm, setBm] = useState(props.bookmarked);
  const [revised, setRevised] = useState(props.revisedCount);
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  const run = async (key: string, fn: () => Promise<void>) => {
    setBusy(key);
    setMsg("");
    try { await fn(); router.refresh(); } catch (e) { setMsg((e as Error).message); } finally { setBusy(""); }
  };

  return (
    <div className="no-print mb-5 flex flex-wrap items-center gap-2">
      <button className={cn("btn-ghost", done && "!border-emerald-500 !text-emerald-600 dark:!text-emerald-400")} disabled={busy === "done"}
        onClick={() => run("done", async () => { const r = await api<{ done: boolean }>(`/api/topics/${props.topicId}/progress`, { body: { action: done ? "uncomplete" : "complete" } }); setDone(r.done); })}>
        {done ? <CheckCircle2 size={16} /> : <Circle size={16} />} {done ? "Studied" : props.hasNotes ? "Mark notes complete" : "Mark as studied"}
      </button>
      <button className="btn-ghost" disabled={busy === "rev" || !done}
        title={done ? "Record a revision of this topic" : "Finish studying the notes first"}
        onClick={() => run("rev", async () => { const r = await api<{ revisedCount: number }>(`/api/topics/${props.topicId}/progress`, { body: { action: "revise" } }); setRevised(r.revisedCount); })}>
        <Repeat size={16} /> Mark revised {revised > 0 && <span className="chip bg-amber-500/10 text-amber-600">{revised}×</span>}
      </button>
      <button className={cn("btn-ghost", bm && "!border-electric-500 !text-electric-500")} disabled={busy === "bm"}
        onClick={() => run("bm", async () => { const r = await api<{ bookmarked: boolean }>(`/api/bookmarks`, { body: { itemType: "TOPIC", itemId: props.topicId } }); setBm(r.bookmarked); })}>
        {bm ? <BookmarkCheck size={16} /> : <Bookmark size={16} />} {bm ? "Bookmarked" : "Bookmark"}
      </button>
      {props.hasNotes && <Link href={`/topic/${props.slug}/sheet`} className="btn-ghost" target="_blank"><FileDown size={16} /> Revision sheet</Link>}
      {props.gymCount > 0 && <Link href={`/gym/${props.slug}`} className="btn-primary"><Dumbbell size={16} /> Practise ({props.gymCount})</Link>}
      {msg && <span className="text-sm text-rose-500">{msg}</span>}
    </div>
  );
}
