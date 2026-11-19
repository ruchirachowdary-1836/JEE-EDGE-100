import Link from "next/link";
import { Card, PageHeader, SubjectChip } from "@/components/ui";
import { QUESTIONS, TOPICS } from "@site/lib/data";
import { GymProgressBadge } from "./[topic]/StaticGym";
import { GYM_LEVELS } from "@/lib/levels";

export const metadata = { title: "Question Gym" };


export default function GymPage() {
  const topics = TOPICS.filter((t) => QUESTIONS.some((q) => q.topic === t.slug));
  return (
    <div>
      <PageHeader eyebrow="Progressive problem-solving" title="Question Gym" subtitle="Five levels per topic. Each next level unlocks after you attempt every question of the current level with at least 70% accuracy (all attempts count). These are original practice questions, not previous-year questions." />
      <Card className="mb-6">
        <div className="grid gap-3 sm:grid-cols-5">
          {GYM_LEVELS.map((l) => <div key={l.level} className="rounded-xl bg-[var(--surface-2)] p-3"><div className="text-xs font-bold text-violet-500">Level {l.level}</div><div className="text-sm font-semibold">{l.name}</div><div className="muted mt-1 text-xs">{l.description}</div></div>)}
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((t) => (
          <Link key={t.slug} href={`/gym/${t.slug}`} className="card card-pad block transition hover:-translate-y-0.5 hover:border-electric-400">
            <div className="mb-2 flex items-center justify-between"><SubjectChip slug={t.subject} /><GymProgressBadge topic={t.slug} ids={QUESTIONS.filter((q) => q.topic === t.slug).map((q) => q.id)} /></div>
            <div className="font-display font-semibold">{t.name}</div>
            <div className="muted text-xs">{t.chapterName} · {QUESTIONS.filter((q) => q.topic === t.slug).length} questions</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
