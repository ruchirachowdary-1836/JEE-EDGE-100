import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Dumbbell, Sigma, Clapperboard, Archive, Timer, ChevronRight } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { topicStats, emptyStat } from "@/lib/progress";
import { Card, PageHeader, StageBadge, SubjectChip } from "@/components/ui";
import { ChapterFormulas } from "@/components/ChapterFormulas";
import { TeX } from "@/components/Rich";

export default async function ChapterPage({ params }: { params: { slug: string } }) {
  const user = await requireUser();
  const chapter = await db.chapter.findUnique({
    where: { slug: params.slug },
    include: {
      subject: true,
      topics: { where: { publishStatus: "PUBLISHED" }, orderBy: { order: "asc" }, include: { note: { select: { publishStatus: true, sections: true } } } },
      formulas: { where: { publishStatus: "PUBLISHED" }, select: { slug: true, name: true, expression: true } },
      animations: { where: { publishStatus: "PUBLISHED" }, select: { key: true, title: true } },
      comparisons: { where: { publishStatus: "PUBLISHED" }, select: { slug: true, title: true } },
    },
  });
  if (!chapter) notFound();
  const [stats, pyqCount, practiceCount, perTopic] = await Promise.all([
    topicStats(user.id, chapter.topics.map((t) => t.id)),
    db.question.count({ where: { chapterId: chapter.id, source: "PYQ", publishStatus: "PUBLISHED" } }),
    db.question.count({ where: { chapterId: chapter.id, source: "PRACTICE", publishStatus: "PUBLISHED" } }),
    db.question.groupBy({ by: ["topicId"], where: { chapterId: chapter.id, source: "PRACTICE", publishStatus: "PUBLISHED" }, _count: true }),
  ]);
  const gymCount = new Map(perTopic.map((g) => [g.topicId, g._count]));
  const sheets = chapter.topics.flatMap((t) => {
    if (t.note?.publishStatus !== "PUBLISHED") return [];
    const sec = (t.note.sections as { key: string; body: string }[]).find((x) => x.key === "formulas");
    return sec ? [{ slug: t.slug, name: t.name, body: sec.body }] : [];
  });

  return (
    <div>
      <PageHeader eyebrow={chapter.unit ?? chapter.subject.name} title={chapter.name} subtitle={chapter.summary}
        actions={<><SubjectChip slug={chapter.subject.slug} /><Link href={`/syllabus/${chapter.subject.slug}`} className="btn-ghost">Back to {chapter.subject.name}</Link></>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="h2">Topics</h2>
          {chapter.topics.map((t, i) => {
            const s = stats.get(t.id) ?? emptyStat(t.id);
            return (
              <Card key={t.id} className="!p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="muted text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                      <Link href={`/topic/${t.slug}`} className="font-semibold hover:underline">{t.name}</Link>
                      <StageBadge stage={s.stage} />
                    </div>
                    {t.subtopics.length > 0 && <div className="muted mt-1 text-xs">{t.subtopics.join(" · ")}</div>}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link href={`/topic/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><BookOpen size={14} /> Notes</Link>
                    {gymCount.get(t.id) ? <Link href={`/gym/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><Dumbbell size={14} /> Gym ({gymCount.get(t.id)})</Link> : null}
                  </div>
                </div>
                {s.attempts > 0 && <div className="muted mt-2 text-xs">{s.attempts} attempts · {s.accuracy}% accuracy · Gym level {s.levelUnlocked} unlocked</div>}
              </Card>
            );
          })}
          <div className="pt-3"><ChapterFormulas lab={chapter.formulas} sheets={sheets} /></div>
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
            ) : null}
            <a href="#formula-collection" className="btn-ghost mt-2 w-full !py-1.5 text-xs">Full formula collection ({sheets.length} topic sheet{sheets.length === 1 ? "" : "s"})</a>
            {chapter.comparisons.map((c) => <Link key={c.slug} href={`/formulas/compare#${c.slug}`} className="link mt-2 block text-sm">Compare: {c.title}</Link>)}
          </Card>
          {chapter.animations.length > 0 && (
            <Card>
              <h3 className="h2 mb-3 flex items-center gap-2"><Clapperboard size={18} className="text-violet-500" /> Animated lessons</h3>
              {chapter.animations.map((a) => (
                <Link key={a.key} href={`/studio/${a.key}`} className="flex items-center justify-between rounded-lg p-2 text-sm hover:bg-[var(--surface-2)]">{a.title}<ChevronRight size={14} /></Link>
              ))}
            </Card>
          )}
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
