import { SyllabusSourceCard } from "@/components/SyllabusScope";
import Link from "next/link";
import { PageHeader, Card, SubjectChip } from "@/components/ui";
import { SUBJECTS, NOTES } from "@site/lib/data";

export const metadata = { title: "Syllabus" };

export default function SyllabusPage() {
  return (
    <div>
      <PageHeader eyebrow="Complete syllabus" title="Syllabus & Master Notes" subtitle="All 54 chapters mapped to the official JEE Main 2027 syllabus. Topics marked with a dot have full notes." />
      <SyllabusSourceCard beyondCount={SUBJECTS.flatMap((s) => s.chapters.flatMap((c) => c.topics.flatMap((t) => t.beyondMain))).length} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {SUBJECTS.map((s) => {
          const units = [...new Set(s.chapters.map((c) => c.unit ?? ""))];
          return (
            <Card key={s.slug} className="min-w-0">
              <div className="mb-4 flex items-center justify-between"><h2 className="h2">{s.name}</h2><SubjectChip slug={s.slug} /></div>
              {units.map((u) => (
                <div key={u} className="mb-3">
                  {u && <div className="muted mb-1 text-[10px] font-bold uppercase tracking-[0.18em]">{u}</div>}
                  <ul className="space-y-1">
                    {s.chapters.filter((c) => (c.unit ?? "") === u).map((c) => (
                      <li key={c.slug}>
                        <Link href={`/chapter/${c.slug}`} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-[var(--surface-2)]">
                          <span className="min-w-0 truncate">{c.name}</span>
                          {c.topics.some((t) => NOTES[t.slug]) && <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" title="Has full notes" />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
