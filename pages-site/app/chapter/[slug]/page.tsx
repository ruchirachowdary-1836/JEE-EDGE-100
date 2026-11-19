import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Dumbbell, Sigma, Clapperboard } from "lucide-react";
import { Card, PageHeader, SubjectChip } from "@/components/ui";
import { TeX } from "@/components/Rich";
import { ChapterFormulas } from "@/components/ChapterFormulas";
import { BeyondMainLine } from "@/components/SyllabusScope";
import { CHAPTERS, chapterBySlug, NOTES, FORMULAS, ANIMATIONS, QUESTIONS, COMPARISONS } from "@site/lib/data";

export const generateStaticParams = () => CHAPTERS.map((c) => ({ slug: c.slug }));
export const dynamicParams = false;

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const c = chapterBySlug(params.slug);
  if (!c) notFound();
  const formulas = FORMULAS.filter((f) => f.chapter === c.slug);
  const anims = ANIMATIONS.filter((a) => a.chapter === c.slug);
  const comps = COMPARISONS.filter((x) => x.chapter === c.slug);
  const sheets = c.topics.flatMap((t) => {
    const sec = NOTES[t.slug]?.find((s) => s.key === "formulas");
    return sec ? [{ slug: t.slug, name: t.name, body: sec.body }] : [];
  });
  return (
    <div>
      <PageHeader eyebrow={c.unit ?? c.subject} title={c.name} subtitle={c.summary} actions={<><SubjectChip slug={c.subject} /><Link href="/syllabus" className="btn-ghost">Syllabus</Link></>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-3 lg:col-span-2">
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
                    </div>
                    <div className="muted mt-1 text-xs">{t.subtopics.join(" · ")}</div>
                    <BeyondMainLine items={t.beyondMain} />
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link href={`/topic/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><BookOpen size={14} /> Notes</Link>
                    {qn > 0 && <Link href={`/gym/${t.slug}`} className="btn-ghost !py-1.5 text-xs"><Dumbbell size={14} /> Gym ({qn})</Link>}
                  </div>
                </div>
              </Card>
            );
          })}
          <div className="pt-3"><ChapterFormulas lab={formulas} sheets={sheets} /></div>
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="h2 mb-3 flex items-center gap-2"><Sigma size={18} className="text-electric-500" /> Formulas</h3>
            {formulas.map((f) => (
              <Link key={f.slug} href={`/formulas/${f.slug}`} className="block rounded-lg p-2 hover:bg-[var(--surface-2)]"><div className="text-sm font-semibold">{f.name}</div><div className="overflow-x-auto text-sm"><TeX>{f.expression}</TeX></div></Link>
            ))}
            <a href="#formula-collection" className="btn-ghost mt-2 w-full !py-1.5 text-xs">Full formula collection ({sheets.length} topic sheet{sheets.length === 1 ? "" : "s"})</a>
            {comps.map((x) => <Link key={x.slug} href={`/formulas/compare#${x.slug}`} className="link mt-2 block text-sm">Compare: {x.title}</Link>)}
          </Card>
          {anims.length > 0 && (
            <Card>
              <h3 className="h2 mb-3 flex items-center gap-2"><Clapperboard size={18} className="text-violet-500" /> Animated lessons</h3>
              {anims.map((a) => <Link key={a.key} href={`/studio/${a.key}`} className="link block py-1 text-sm">{a.title}</Link>)}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
