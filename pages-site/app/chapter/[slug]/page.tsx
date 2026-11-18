import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Dumbbell } from "lucide-react";
import { Card, PageHeader, Pending, SubjectChip, ReviewBadge } from "@/components/ui";
import { TeX } from "@/components/Rich";
import { CHAPTERS, chapterBySlug, NOTES, FORMULAS, ANIMATIONS, QUESTIONS, COMPARISONS } from "@site/lib/data";

export const generateStaticParams = () => CHAPTERS.map((c) => ({ slug: c.slug }));
export const dynamicParams = false;

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const c = chapterBySlug(params.slug);
  if (!c) notFound();
  const formulas = FORMULAS.filter((f) => f.chapter === c.slug);
  const anims = ANIMATIONS.filter((a) => a.chapter === c.slug);
  const comps = COMPARISONS.filter((x) => x.chapter === c.slug);
  return (
    <div>
      <PageHeader eyebrow={c.unit ?? c.subject} title={c.name} subtitle={c.summary} actions={<><SubjectChip slug={c.subject} /><Link href="/syllabus" className="btn-ghost">Syllabus</Link></>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="h2">Topics</h2>
          {c.topics.map((t, i) => {
            const qn = QUESTIONS.filter((q) => q.topic === t.slug).length;
            return (
              <Card key={t.slug} className="!p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="muted text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                      <Link href={`/topic/${t.slug}`} className="font-semibold hover:underline">{t.name}</Link>
                      {NOTES[t.slug] ? <ReviewBadge status="PENDING" /> : <span className="chip bg-slate-500/10 text-slate-500">Notes pending</span>}
                    </div>
                    <div className="muted mt-1 text-xs">{t.subtopics.join(" · ")}</div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link href={`/topic/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><BookOpen size={14} /> Notes</Link>
                    {qn > 0 && <Link href={`/gym/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><Dumbbell size={14} /> Gym ({qn})</Link>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="h2 mb-3">Formulas</h3>
            {formulas.length ? formulas.map((f) => (
              <Link key={f.slug} href={`/formulas/${f.slug}`} className="block rounded-lg p-2 hover:bg-[var(--surface-2)]"><div className="text-sm font-semibold">{f.name}</div><div className="overflow-x-auto text-sm"><TeX>{f.expression}</TeX></div></Link>
            )) : <Pending what="The formula collection for this chapter" />}
            {comps.map((x) => <Link key={x.slug} href={`/formulas/compare#${x.slug}`} className="link mt-2 block text-sm">Compare: {x.title}</Link>)}
          </Card>
          <Card>
            <h3 className="h2 mb-3">Animated lessons</h3>
            {anims.length ? anims.map((a) => <Link key={a.key} href={`/studio/${a.key}`} className="link block py-1 text-sm">{a.title}</Link>) : <p className="muted text-sm">None yet.</p>}
          </Card>
        </div>
      </div>
    </div>
  );
}
