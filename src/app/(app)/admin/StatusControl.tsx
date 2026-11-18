"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/client";
import { cn } from "@/lib/utils";

export type Model = "chapter" | "topic" | "note" | "formula" | "formulaComparison" | "animation" | "question" | "mockExam" | "conceptCard" | "namedReaction" | "inorganicException";

/** Publish toggle + expert review status, used on every CMS list. */
export function StatusControl({ model, id, publishStatus, reviewStatus, compact = false }: { model: Model; id: string; publishStatus: string; reviewStatus?: string; compact?: boolean }) {
  const router = useRouter();
  const [pub, setPub] = useState(publishStatus);
  const [rev, setRev] = useState(reviewStatus);
  const [err, setErr] = useState("");
  const send = async (patch: { publishStatus?: string; reviewStatus?: string }) => {
    setErr("");
    try { await api("/api/admin/review", { body: { model, id, ...patch } }); router.refresh(); return true; }
    catch (e) { setErr((e as Error).message); return false; }
  };
  return (
    <div className={cn("flex flex-wrap items-center gap-2", compact && "text-xs")}>
      <button onClick={async () => { const next = pub === "PUBLISHED" ? "DRAFT" : "PUBLISHED"; if (await send({ publishStatus: next })) setPub(next); }}
        className={cn("chip cursor-pointer", pub === "PUBLISHED" ? "bg-emerald-500/15 text-emerald-600" : "bg-slate-500/15 text-slate-500")} title="Toggle publish">
        {pub === "PUBLISHED" ? "Published" : "Draft"}
      </button>
      {rev !== undefined && (
        <select value={rev} onChange={async (e) => { const v = e.target.value; if (await send({ reviewStatus: v })) setRev(v); }} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs" aria-label="Review status">
          <option value="PENDING">Pending review</option>
          <option value="IN_REVIEW">In review</option>
          <option value="CHANGES_REQUESTED">Changes requested</option>
          <option value="VERIFIED">Verified</option>
        </select>
      )}
      {err && <span className="text-xs text-rose-500">{err}</span>}
    </div>
  );
}
