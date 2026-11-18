import Link from "next/link";
import { Rich } from "@/components/Rich";
import { SUBJECT_META } from "@/lib/utils";
import type { StrategySection } from "@content/strategy";

export type PriorityChapter = { slug: string; name: string; subject: string; weight: number };

/** The AIR-100 playbook: strategy sections plus the high-priority chapter list. */
export function StrategyGuide({ sections, chapters }: { sections: StrategySection[]; chapters: PriorityChapter[] }) {
  const subjects = ["physics", "chemistry", "mathematics"];
  return (
    <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
      <aside className="no-print hidden xl:block">
        <div className="sticky top-24 space-y-1">
          {sections.map((s, i) => <a key={s.key} href={`#play-${s.key}`} className="muted block rounded-lg px-2 py-1 text-sm hover:text-[var(--text)]">{i + 1}. {s.title}</a>)}
          <a href="#play-priority" className="muted block rounded-lg px-2 py-1 text-sm hover:text-[var(--text)]">{sections.length + 1}. High-priority chapters</a>
        </div>
      </aside>
      <div className="min-w-0 space-y-4">
        {sections.map((s, i) => (
          <section key={s.key} id={`play-${s.key}`} className="card card-pad scroll-mt-24">
            <h2 className="h2 mb-3">{i + 1}. {s.title}</h2>
            <Rich text={s.body} />
          </section>
        ))}
        <section id="play-priority" className="card card-pad scroll-mt-24">
          <h2 className="h2 mb-1">{sections.length + 1}. High-priority chapters</h2>
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
      </div>
    </div>
  );
}
