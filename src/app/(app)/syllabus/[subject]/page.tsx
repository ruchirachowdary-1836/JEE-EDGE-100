import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { syllabusWithStats } from "@/lib/queries";
import { Card, PageHeader, ProgressBar, StageBadge } from "@/components/ui";
import { SUBJECT_META } from "@/lib/utils";

export default async function SubjectPage({ params }: { params: { subject: string } }) {
  const user = await requireUser();
  const subjects = await syllabusWithStats(user.id);
  const s = subjects.find((x) => x.slug === params.subject);
  if (!s) notFound();
  const meta = SUBJECT_META[s.slug];
  return (
    <div>
      <PageHeader eyebrow="Subject" title={s.name} subtitle={`${s.chapters.length} chapters · ${s.chapters.reduce((a, c) => a + c.topics.length, 0)} topics · ${s.studiedPct}% of topics studied`}
        actions={<Link href="/syllabus" className="btn-ghost">All subjects</Link>} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {s.chapters.map((c) => (
          <Link key={c.id} href={`/chapter/${c.slug}`} className="card card-pad block transition hover:-translate-y-0.5 hover:border-electric-400">
            {c.unit && <div className="muted mb-1 text-[10px] font-bold uppercase tracking-[0.18em]">{c.unit}</div>}
            <div className="font-display font-semibold">{c.name}</div>
            <p className="muted mt-1 line-clamp-2 text-sm">{c.summary}</p>
            <ProgressBar value={c.progressScore} color={meta.bg} label="Progress score" className="mt-4" />
            <div className="mt-3 flex flex-wrap gap-1">
              {(["STUDIED", "PRACTICED", "REVISED", "MASTERED"] as const).map((st) => c.stageCounts[st] > 0 && (
                <span key={st} className="flex items-center gap-1 text-xs"><StageBadge stage={st} /> {c.stageCounts[st]}</span>
              ))}
              {c.topics.every((t) => t.stat.stage === "NOT_STARTED") && <span className="muted text-xs">Not started</span>}
            </div>
          </Link>
        ))}
      </div>
      {s.chapters.length === 0 && <Card>No chapters published.</Card>}
    </div>
  );
}
