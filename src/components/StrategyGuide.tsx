"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Gavel, Lightbulb } from "lucide-react";
import { Rich } from "@/components/Rich";
import { SUBJECT_META, cn } from "@/lib/utils";
import type { StrategyTrack } from "@content/strategy";

export type PriorityChapter = { slug: string; name: string; subject: string; weight: number };

function KindBadge({ kind }: { kind: "rule" | "advice" }) {
  return kind === "rule" ? (
    <span className="chip bg-sky-500/10 text-sky-700 dark:text-sky-300" title="An examination rule from recent official documents. Confirm it in the current bulletin or brochure.">
      <Gavel size={12} /> Official rule · confirm in the current bulletin
    </span>
  ) : (
    <span className="chip bg-violet-500/10 text-violet-600 dark:text-violet-300" title="A recommendation from the content team, not an examination rule.">
      <Lightbulb size={12} /> Recommendation
    </span>
  );
}

/** The playbook: separate JEE Main and JEE Advanced strategies, shared study methods, and the priority chapter list. */
export function StrategyGuide({ tracks, chapters }: { tracks: StrategyTrack[]; chapters: PriorityChapter[] }) {
  const [active, setActive] = useState(tracks[0].key);
  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (tracks.some((t) => t.key === h)) setActive(h);
  }, [tracks]);
  const track = tracks.find((t) => t.key === active) ?? tracks[0];
  const subjects = ["physics", "chemistry", "mathematics"];
  return (
    <div>
      <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1" role="tablist">
        {tracks.map((t) => (
          <button key={t.key} role="tab" aria-selected={t.key === active} onClick={() => { setActive(t.key); history.replaceState(null, "", `#${t.key}`); }}
            className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition", t.key === active ? "bg-electric-500 text-white" : "muted hover:bg-[var(--surface-2)]")}>
            {t.title}
          </button>
        ))}
      </div>
      <p className="muted mb-4 text-sm">{track.tagline}</p>
      <div className="grid gap-6 xl:grid-cols-[240px_1fr]">
        <aside className="no-print hidden xl:block">
          <div className="sticky top-24 space-y-1">
            {track.sections.map((s, i) => <a key={s.key} href={`#play-${s.key}`} className="muted block rounded-lg px-2 py-1 text-sm hover:text-[var(--text)]">{i + 1}. {s.title}</a>)}
            {track.key === "main" && <a href="#play-priority" className="muted block rounded-lg px-2 py-1 text-sm hover:text-[var(--text)]">{track.sections.length + 1}. High-priority chapters</a>}
          </div>
        </aside>
        <div className="min-w-0 space-y-4">
          {track.sections.map((s, i) => (
            <section key={s.key} id={`play-${s.key}`} className="card card-pad scroll-mt-24">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="h2">{i + 1}. {s.title}</h2>
                <KindBadge kind={s.kind} />
              </div>
              <Rich text={s.body} />
            </section>
          ))}
          {track.key === "main" && (
            <section id="play-priority" className="card card-pad scroll-mt-24">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h2 className="h2">{track.sections.length + 1}. High-priority chapters</h2>
                <KindBadge kind="advice" />
              </div>
              <p className="muted mb-4 text-sm">Chapters given the highest planning priority (5 = highest) by the content team for allocating study time. This is a study-planning guide, not a prediction of how many questions NTA will set.</p>
              <div className="grid gap-4 md:grid-cols-3">
                {subjects.map((s) => (
                  <div key={s}>
                    <div className="mb-2 text-sm font-bold" style={{ color: SUBJECT_META[s].color }}>{SUBJECT_META[s].name}</div>
                    <ul className="space-y-1 text-sm">
                      {chapters.filter((c) => c.subject === s).map((c) => (
                        <li key={c.slug} className="flex items-center justify-between gap-2">
                          <Link href={`/chapter/${c.slug}`} className="hover:underline">{c.name}</Link>
                          <span className={`chip ${c.weight >= 5 ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}>{c.weight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
