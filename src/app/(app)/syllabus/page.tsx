import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { syllabusWithStats } from "@/lib/queries";
import { getSettings } from "@/lib/config";
import { Card, PageHeader, ProgressBar, SubjectChip } from "@/components/ui";
import { SUBJECT_META } from "@/lib/utils";

export const metadata = { title: "Syllabus" };

export default async function SyllabusPage() {
  const user = await requireUser();
  const [subjects, settings] = await Promise.all([syllabusWithStats(user.id), getSettings()]);
  return (
    <div>
      <PageHeader eyebrow="Complete syllabus" title="Syllabus & Master Notes" subtitle={<>Chapter list based on the {settings.syllabus.version}. {settings.syllabus.note}</>} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {subjects.map((s) => {
          const units = [...new Set(s.chapters.map((c) => c.unit ?? ""))];
          return (
            <Card key={s.slug} className="min-w-0">
              <div className="mb-4 flex items-center justify-between">
                <Link href={`/syllabus/${s.slug}`} className="h2 hover:underline">{s.name}</Link>
                <SubjectChip slug={s.slug} />
              </div>
              <ProgressBar value={s.studiedPct} color={SUBJECT_META[s.slug].bg} label="Topics studied" className="mb-4" />
              {units.map((u) => (
                <div key={u} className="mb-3">
                  {u && <div className="muted mb-1 text-[10px] font-bold uppercase tracking-[0.18em]">{u}</div>}
                  <ul className="space-y-1">
                    {s.chapters.filter((c) => (c.unit ?? "") === u).map((c) => (
                      <li key={c.id}>
                        <Link href={`/chapter/${c.slug}`} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-[var(--surface-2)]">
                          <span className="min-w-0 truncate">{c.name}{c.syllabusStatus === "ENRICHMENT" && <span className="chip ml-2 bg-violet-500/10 text-violet-500">Enrichment</span>}</span>
                          <span className="muted shrink-0 text-xs tabular-nums">{c.studiedPct}%</span>
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
