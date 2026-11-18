import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/config";
import { levelStatus, unlockedLevel } from "@/lib/progress";
import { QUESTION_PUBLIC_SELECT } from "@/lib/questions";
import { PageHeader, Pending, SubjectChip } from "@/components/ui";
import { GymLevels } from "./GymLevels";

export default async function GymTopic({ params, searchParams }: { params: { topic: string }; searchParams: { level?: string } }) {
  const user = await requireUser();
  const topic = await db.topic.findUnique({ where: { slug: params.topic }, include: { chapter: { include: { subject: true } } } });
  if (!topic) notFound();
  const [questions, attempts, bookmarks, settings] = await Promise.all([
    db.question.findMany({ where: { topicId: topic.id, source: "PRACTICE", publishStatus: "PUBLISHED", level: { not: null } }, select: QUESTION_PUBLIC_SELECT, orderBy: [{ level: "asc" }, { createdAt: "asc" }, { id: "asc" }] }),
    db.attempt.findMany({ where: { userId: user.id, question: { topicId: topic.id }, context: { in: ["GYM", "PYQ", "REVISION"] } }, select: { questionId: true, isCorrect: true, createdAt: true }, orderBy: { createdAt: "asc" } }),
    db.bookmark.findMany({ where: { userId: user.id, itemType: "QUESTION" }, select: { itemId: true } }),
    getSettings(),
  ]);
  const statuses = [1, 2, 3, 4, 5].map((l) => levelStatus(l, questions.filter((q) => q.level === l).map((q) => q.id), attempts, settings.gym));
  const progress = await db.topicProgress.findUnique({ where: { userId_topicId: { userId: user.id, topicId: topic.id } } });
  const unlocked = Math.max(unlockedLevel([...statuses]), progress?.gymLevelUnlocked ?? 1);
  const last: Record<string, boolean> = {};
  for (const a of attempts) last[a.questionId] = a.isCorrect;
  const requested = Number(searchParams.level);
  const initialLevel = requested >= 1 && requested <= unlocked ? requested : Math.min(unlocked, Math.max(1, ...statuses.filter((s) => !s.empty).map((s) => s.level).filter((l) => l <= unlocked)));

  return (
    <div>
      <PageHeader eyebrow={`Question Gym · ${topic.chapter.name}`} title={topic.name}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={topic.chapter.subject.slug} /><span>Unlock rule: attempt {settings.gym.minCompletion}% of a level at ≥ {settings.gym.minAccuracy}% accuracy.</span></span>}
        actions={<><Link href={`/topic/${topic.slug}`} className="btn-ghost">Notes</Link><Link href="/gym" className="btn-ghost">All topics</Link></>} />
      {questions.length === 0 ? <Pending what={`The Question Gym set for “${topic.name}”`} /> : (
        <GymLevels
          questions={questions.map((q) => ({ ...q, type: q.type as "MCQ" | "NUMERICAL", difficulty: q.difficulty }))}
          statuses={statuses}
          unlocked={unlocked}
          initialLevel={initialLevel}
          lastResult={last}
          bookmarked={bookmarks.map((b) => b.itemId)}
        />
      )}
    </div>
  );
}
