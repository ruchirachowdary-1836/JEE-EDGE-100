"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, BookmarkCheck } from "lucide-react";
import { TeX, Inline } from "@/components/Rich";
import { SUBJECT_META, cn } from "@/lib/utils";

type F = { slug: string; name: string; expression: string; whenToUse: string; subject: string; chapter: string; chapterSlug: string; reviewStatus: string; search: string };

export function FormulaBrowser({ formulas, chapters, bookmarked }: { formulas: F[]; chapters: { slug: string; name: string; subject: string }[]; bookmarked: string[] }) {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("all");
  const [chapter, setChapter] = useState("all");
  const [onlyBm, setOnlyBm] = useState(false);
  const bm = new Set(bookmarked);
  const list = useMemo(() => formulas.filter((f) =>
    (subject === "all" || f.subject === subject) && (chapter === "all" || f.chapterSlug === chapter) &&
    (!onlyBm || bm.has(f.slug)) && (!q.trim() || f.search.includes(q.trim().toLowerCase()))), [formulas, subject, chapter, q, onlyBm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative">
          <Search size={16} className="muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input className="input !pl-9" placeholder="Search by name, chapter, variable or use…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search formulas" />
        </div>
        <select className="input" value={subject} onChange={(e) => { setSubject(e.target.value); setChapter("all"); }} aria-label="Subject">
          <option value="all">All subjects</option>
          {Object.entries(SUBJECT_META).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>
        <select className="input" value={chapter} onChange={(e) => setChapter(e.target.value)} aria-label="Chapter">
          <option value="all">All chapters</option>
          {chapters.filter((c) => subject === "all" || c.subject === subject).map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <button className={cn("btn-ghost", onlyBm && "!border-electric-500 !text-electric-500")} onClick={() => setOnlyBm(!onlyBm)}><BookmarkCheck size={16} /> Bookmarked</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((f) => (
          <Link key={f.slug} href={`/formulas/${f.slug}`} className="card card-pad block transition hover:-translate-y-0.5 hover:border-electric-400">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="muted truncate text-xs font-semibold"><span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: SUBJECT_META[f.subject].color }} />{f.chapter}</span>
              {bm.has(f.slug) && <BookmarkCheck size={14} className="text-electric-500" />}
            </div>
            <div className="font-display font-semibold">{f.name}</div>
            <div className="my-3 overflow-x-auto rounded-xl bg-[var(--surface-2)] px-3 py-2 text-center"><TeX>{f.expression}</TeX></div>
            <p className="muted line-clamp-2 text-xs"><strong className="text-[var(--text)]">Use when: </strong><Inline text={f.whenToUse} /></p>
          </Link>
        ))}
      </div>
      {list.length === 0 && <p className="muted py-10 text-center text-sm">No formulas match these filters.</p>}
    </div>
  );
}
