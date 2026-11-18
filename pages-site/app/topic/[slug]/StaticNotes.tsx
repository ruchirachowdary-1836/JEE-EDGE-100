"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Rich } from "@/components/Rich";
import { Player } from "@/components/studio/Player";
import type { NoteSection } from "@content/types";

export function StaticNotes({ sections }: { sections: NoteSection[] }) {
  const [q, setQ] = useState("");
  const visible = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? sections.filter((x) => x.title.toLowerCase().includes(s) || x.body.toLowerCase().includes(s)) : sections;
  }, [q, sections]);
  return (
    <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
      <aside className="hidden xl:block">
        <div className="sticky top-24 space-y-1">
          <div className="muted mb-2 text-[10px] font-bold uppercase tracking-[0.18em]">Contents</div>
          {sections.map((s, i) => <a key={s.key} href={`#sec-${s.key}`} className="muted block rounded-lg px-2 py-1 text-sm hover:text-[var(--text)]">{i + 1}. {s.title}</a>)}
        </div>
      </aside>
      <div className="min-w-0 space-y-4">
        <div className="relative">
          <Search size={16} className="muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input className="input !pl-9" placeholder="Search within these notes…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search within notes" />
          {q && <button className="muted absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setQ("")} aria-label="Clear"><X size={16} /></button>}
        </div>
        {q && <p className="muted text-sm">{visible.length} of {sections.length} sections match.</p>}
        {visible.map((s) => (
          <section key={s.key} id={`sec-${s.key}`} className="card card-pad scroll-mt-24">
            <h2 className="h2 mb-3">{sections.indexOf(s) + 1}. {s.title}</h2>
            <Rich text={s.body} />
            {s.animationKey && <div className="mt-4"><Player simKey={s.animationKey} compact /></div>}
          </section>
        ))}
      </div>
    </div>
  );
}
