import Link from "next/link";
import { Rich } from "@/components/Rich";
import { SUBJECT_META } from "@/lib/utils";

export type SheetGroup = { subject: string; chapter: string; chapterSlug: string; topics: { slug: string; name: string; body: string }[] };

/** All topic formula sheets, grouped by subject and chapter, with a jump list. Printable. */
export function FormulaSheet({ groups }: { groups: SheetGroup[] }) {
  const subjects = [...new Set(groups.map((g) => g.subject))];
  return (
    <div className="space-y-8">
      <nav className="no-print flex flex-wrap gap-2">
        {groups.map((g) => <a key={g.chapterSlug} href={`#sheet-${g.chapterSlug}`} className="chip bg-[var(--surface-2)] hover:bg-electric-500/10">{g.chapter}</a>)}
      </nav>
      {subjects.map((s) => (
        <section key={s}>
          <h2 className="h2 mb-4" style={{ color: SUBJECT_META[s]?.color }}>{SUBJECT_META[s]?.name ?? s}</h2>
          <div className="space-y-6">
            {groups.filter((g) => g.subject === s).map((g) => (
              <div key={g.chapterSlug} id={`sheet-${g.chapterSlug}`} className="card card-pad scroll-mt-24">
                <Link href={`/chapter/${g.chapterSlug}`} className="font-display text-lg font-semibold hover:underline">{g.chapter}</Link>
                <div className="mt-3 space-y-5">
                  {g.topics.map((t) => (
                    <div key={t.slug}>
                      <Link href={`/topic/${t.slug}`} className="mb-1 block text-xs font-bold uppercase tracking-wide text-electric-500 hover:underline">{t.name}</Link>
                      <Rich text={t.body} className="text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
