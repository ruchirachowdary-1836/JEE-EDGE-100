import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, SubjectChip } from "@/components/ui";
import { QUESTIONS, TOPICS, topicBySlug } from "@site/lib/data";
import { StaticGym } from "./StaticGym";

export const generateStaticParams = () => TOPICS.filter((t) => QUESTIONS.some((q) => q.topic === t.slug)).map((t) => ({ topic: t.slug }));
export const dynamicParams = false;

export default function GymTopic({ params }: { params: { topic: string } }) {
  const t = topicBySlug(params.topic);
  if (!t) notFound();
  const questions = QUESTIONS.filter((q) => q.topic === t.slug);
  return (
    <div>
      <PageHeader eyebrow={`Question Gym · ${t.chapterName}`} title={t.name}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={t.subject} /><span>Progress is saved in this browser only.</span></span>}
        actions={<><Link href={`/topic/${t.slug}`} className="btn-ghost">Notes</Link><Link href="/gym" className="btn-ghost">All topics</Link></>} />
      <StaticGym topic={t.slug} questions={questions} />
    </div>
  );
}
