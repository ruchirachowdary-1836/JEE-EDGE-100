import Link from "next/link";
import { notFound } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { Card, PageHeader, Pending, ReviewBadge, SubjectChip } from "@/components/ui";
import { TeX } from "@/components/Rich";
import { TOPICS, topicBySlug, NOTES, FORMULAS, ANIMATIONS, QUESTIONS } from "@site/lib/data";
import { StaticNotes } from "./StaticNotes";
import { SyllabusScope } from "@/components/SyllabusScope";
import { StudiedToggle } from "./StudiedToggle";

export const generateStaticParams = () => TOPICS.map((t) => ({ slug: t.slug }));
export const dynamicParams = false;

export default function TopicPage({ params }: { params: { slug: string } }) {
  const t = topicBySlug(params.slug);
  if (!t) notFound();
  const sections = NOTES[t.slug];
  const formulas = FORMULAS.filter((f) => f.topic === t.slug);
  const anims = ANIMATIONS.filter((a) => a.topic === t.slug);
  const qn = QUESTIONS.filter((q) => q.topic === t.slug).length;
  return (
    <div>
      <PageHeader eyebrow={t.chapterName} title={t.name}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={t.subject} />{sections && <ReviewBadge status="PENDING" />}</span>}
        actions={<><StudiedToggle topic={t.slug} />{qn > 0 && <Link href={`/gym/${t.slug}`} className="btn-primary"><Dumbbell size={16} /> Practise ({qn})</Link>}<Link href={`/chapter/${t.chapterSlug}`} className="btn-ghost">Chapter</Link></>} />
      <SyllabusScope subtopics={t.subtopics} beyondMain={t.beyondMain} />
      {sections ? <StaticNotes sections={sections} /> : (
        <div className="space-y-4">
          <Pending what={`The master notes for “${t.name}”`} />
          <Card><h2 className="h2 mb-2">What this topic covers</h2><ul className="ml-5 list-disc space-y-1 text-sm">{t.subtopics.map((s) => <li key={s}>{s}</li>)}</ul></Card>
        </div>
      )}
      {(formulas.length > 0 || anims.length > 0) && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {formulas.length > 0 && <Card><h2 className="h2 mb-2">Formulas in this topic</h2>{formulas.map((f) => <Link key={f.slug} href={`/formulas/${f.slug}`} className="block rounded-lg p-2 hover:bg-[var(--surface-2)]"><div className="text-sm font-semibold">{f.name}</div><div className="overflow-x-auto"><TeX>{f.expression}</TeX></div></Link>)}</Card>}
          {anims.length > 0 && <Card><h2 className="h2 mb-2">Animated lessons</h2>{anims.map((a) => <Link key={a.key} href={`/studio/${a.key}`} className="link block py-1 text-sm">{a.title}</Link>)}</Card>}
        </div>
      )}
    </div>
  );
}
