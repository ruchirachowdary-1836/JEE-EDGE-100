import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Dumbbell, Sigma, Clapperboard, Archive, Timer, ChevronRight } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { topicStats, emptyStat } from "@/lib/progress";
import { Card, PageHeader, StageBadge, SubjectChip, Pending, ReviewBadge } from "@/components/ui";
import { Inline, TeX } from "@/components/Rich";

export default async function ChapterPage({ params }: { params: { slug: string } }) {
  const user = await requireUser();
  const chapter = await db.chapter.findUnique({
    where: { slug: params.slug },
    include: {
      subject: true,
      topics: { where: { publishStatus: "PUBLISHED" }, orderBy: { order: "asc" }, include: { note: { select: { publishStatus: true, reviewStatus: true } } } },
      formulas: { where: { publishStatus: "PUBLISHED" }, select: { slug: true, name: true, expression: true } },
      animations: { where: { publishStatus: "PUBLISHED" }, select: { key: true, title: true } },
      comparisons: { where: { publishStatus: "PUBLISHED" }, select: { slug: true, title: true } },
    },
  });
  if (!chapter) notFound();
  const [stats, pyqCount, practiceCount] = await Promise.all([
    topicStats(user.id, chapter.topics.map((t) => t.id)),
    db.question.count({ where: { chapterId: chapter.id, source: "PYQ", publishStatus: "PUBLISHED" } }),
    db.question.count({ where: { chapterId: chapter.id, source: "PRACTICE", publishStatus: "PUBLISHED" } }),
  ]);

  return (
    <div>
      <PageHeader eyebrow={chapter.unit ?? chapter.subject.name} title={chapter.name} subtitle={chapter.summary}
        actions={<><SubjectChip slug={chapter.subject.slug} /><Link href={`/syllabus/${chapter.subject.slug}`} className="btn-ghost">Back to {chapter.subject.name}</Link></>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="h2">Topics</h2>
          {chapter.topics.map((t, i) => {
            const s = stats.get(t.id) ?? emptyStat(t.id);
            const hasNotes = t.note?.publishStatus === "PUBLISHED";
            return (
              <Card key={t.id} className="!p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="muted text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                      <Link href={`/topic/${t.slug}`} className="font-semibold hover:underline">{t.name}</Link>
                      <StageBadge stage={s.stage} />
                      {hasNotes ? <ReviewBadge status={t.note!.reviewStatus} /> : <span className="chip bg-slate-500/10 text-slate-500">Notes pending</span>}
                    </div>
                    {t.subtopics.length > 0 && <div className="muted mt-1 text-xs">{t.subtopics.join(" · ")}</div>}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link href={`/topic/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><BookOpen size={14} /> Notes</Link>
                    <Link href={`/gym/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><Dumbbell size={14} /> Gym</Link>
                  </div>
                </div>
                {s.attempts > 0 && <div className="muted mt-2 text-xs">{s.attempts} attempts · {s.accuracy}% accuracy · Gym level {s.levelUnlocked} unlocked</div>}
              </Card>
            );
          })}
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="h2 mb-3 flex items-center gap-2"><Sigma size={18} className="text-electric-500" /> Formulas</h3>
            {chapter.formulas.length ? (
              <ul className="space-y-2">
                {chapter.formulas.map((f) => (
                  <li key={f.slug}><Link href={`/formulas/${f.slug}`} className="block rounded-lg p-2 hover:bg-[var(--surface-2)]"><div className="text-sm font-semibold">{f.name}</div><div className="overflow-x-auto text-sm"><TeX>{f.expression}</TeX></div></Link></li>
                ))}
              </ul>
            ) : <Pending what="The formula collection for this chapter" />}
            {chapter.comparisons.map((c) => <Link key={c.slug} href={`/formulas/compare#${c.slug}`} className="link mt-2 block text-sm">Compare: {c.title}</Link>)}
          </Card>
          <Card>
            <h3 className="h2 mb-3 flex items-center gap-2"><Clapperboard size={18} className="text-violet-500" /> Animated lessons</h3>
            {chapter.animations.length ? chapter.animations.map((a) => (
              <Link key={a.key} href={`/studio/${a.key}`} className="flex items-center justify-between rounded-lg p-2 text-sm hover:bg-[var(--surface-2)]">{a.title}<ChevronRight size={14} /></Link>
            )) : <p className="muted text-sm">No animated lesson for this chapter yet.</p>}
          </Card>
          <Card>
            <h3 className="h2 mb-3">Practice</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/pyq?chapter=${chapter.slug}`} className="flex items-center justify-between rounded-lg p-2 hover:bg-[var(--surface-2)]"><span className="flex items-center gap-2"><Archive size={15} /> Previous-year questions</span><span className="font-semibold">{pyqCount}</span></Link>
              <div className="flex items-center justify-between rounded-lg p-2"><span className="flex items-center gap-2"><Dumbbell size={15} /> Gym questions</span><span className="font-semibold">{practiceCount}</span></div>
              <Link href={`/exams?chapter=${chapter.slug}`} className="flex items-center justify-between rounded-lg p-2 hover:bg-[var(--surface-2)]"><span className="flex items-center gap-2"><Timer size={15} /> Build a chapter test</span><ChevronRight size={14} /></Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
