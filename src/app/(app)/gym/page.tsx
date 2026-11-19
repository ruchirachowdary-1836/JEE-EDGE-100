import Link from "next/link";
import { Lock, Unlock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { topicStats, emptyStat } from "@/lib/progress";
import { getSettings } from "@/lib/config";
import { PageHeader, SubjectChip, StageBadge, Card } from "@/components/ui";
import { GYM_LEVELS } from "@/lib/levels";

export const metadata = { title: "Question Gym" };

export default async function GymPage() {
  const user = await requireUser();
  const settings = await getSettings();
  const topics = await db.topic.findMany({
    where: { questions: { some: { source: "PRACTICE", publishStatus: "PUBLISHED", level: { not: null } } } },
    include: { chapter: { include: { subject: true } }, _count: { select: { questions: { where: { source: "PRACTICE", publishStatus: "PUBLISHED" } } } } },
    orderBy: [{ chapter: { subject: { order: "asc" } } }, { chapter: { order: "asc" } }, { order: "asc" }],
  });
  const stats = await topicStats(user.id, topics.map((t) => t.id));
  return (
    <div>
      <PageHeader eyebrow="Progressive problem-solving" title="Question Gym"
        subtitle={<>Five levels per topic. Level 1 is open; each next level unlocks after you attempt at least {settings.gym.minCompletion}% of the current level&apos;s questions with {settings.gym.minAccuracy}% accuracy or better (all attempts count, including retries).</>} />
      <Card className="mb-6">
        <div className="grid gap-3 sm:grid-cols-5">
          {GYM_LEVELS.map((l) => (
            <div key={l.level} className="rounded-xl bg-[var(--surface-2)] p-3">
              <div className="text-xs font-bold text-violet-500">Level {l.level}</div>
              <div className="text-sm font-semibold">{l.name}</div>
              <div className="muted mt-1 text-xs">{l.description}</div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((t) => {
          const s = stats.get(t.id) ?? emptyStat(t.id);
          return (
            <Link key={t.id} href={`/gym/${t.slug}`} className="card card-pad block transition hover:-translate-y-0.5 hover:border-electric-400">
              <div className="mb-2 flex items-center justify-between"><SubjectChip slug={t.chapter.subject.slug} /><StageBadge stage={s.stage} /></div>
              <div className="font-display font-semibold">{t.name}</div>
              <div className="muted text-xs">{t.chapter.name} · {t._count.questions} questions</div>
              <div className="mt-4 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((l) => {
                  const cleared = s.clearedLevels.includes(l);
                  const open = l <= s.levelUnlocked;
                  return (
                    <div key={l} className={`flex h-9 flex-1 items-center justify-center rounded-lg text-xs font-bold ${cleared ? "bg-emerald-500 text-white" : open ? "bg-electric-500/15 text-electric-600 dark:text-electric-300" : "bg-[var(--surface-2)] text-slate-400"}`}>
                      {open ? (cleared ? `L${l} ✓` : <span className="flex items-center gap-1"><Unlock size={11} />L{l}</span>) : <span className="flex items-center gap-1"><Lock size={11} />L{l}</span>}
                    </div>
                  );
                })}
              </div>
              {s.attempts > 0 && <div className="muted mt-2 text-xs">{s.attempts} attempts · {s.accuracy}% accuracy</div>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
