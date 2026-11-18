import "server-only";
import { db } from "./db";
import { emptyStat, topicStats, type Stage, type TopicStat } from "./progress";
import { getSettings } from "./config";

const STAGE_SCORE: Record<Stage, number> = { NOT_STARTED: 0, STUDIED: 25, PRACTICED: 50, REVISED: 75, MASTERED: 100 };

export type ChapterView = {
  id: string; slug: string; name: string; unit: string | null; planWeight: number; summary: string; syllabusStatus: string;
  topics: { id: string; slug: string; name: string; hasNotes: boolean; stat: TopicStat }[];
  studiedPct: number; progressScore: number; attempts: number; accuracy: number; stageCounts: Record<Stage, number>;
};

export type SubjectView = { id: string; slug: string; name: string; chapters: ChapterView[]; studiedPct: number; progressScore: number; attempts: number; accuracy: number };

/** The whole syllabus with this student's per-topic and per-chapter progress. */
export async function syllabusWithStats(userId: string): Promise<SubjectView[]> {
  const [subjects, stats] = await Promise.all([
    db.subject.findMany({
      orderBy: { order: "asc" },
      include: {
        chapters: {
          where: { publishStatus: "PUBLISHED" },
          orderBy: { order: "asc" },
          include: { topics: { where: { publishStatus: "PUBLISHED" }, orderBy: { order: "asc" }, include: { note: { select: { publishStatus: true } } } } },
        },
      },
    }),
    topicStats(userId),
  ]);

  return subjects.map((s) => {
    const chapters: ChapterView[] = s.chapters.map((c) => {
      const topics = c.topics.map((t) => ({
        id: t.id, slug: t.slug, name: t.name, hasNotes: t.note?.publishStatus === "PUBLISHED", stat: stats.get(t.id) ?? emptyStat(t.id),
      }));
      const stageCounts = { NOT_STARTED: 0, STUDIED: 0, PRACTICED: 0, REVISED: 0, MASTERED: 0 } as Record<Stage, number>;
      topics.forEach((t) => stageCounts[t.stat.stage]++);
      const attempts = topics.reduce((a, t) => a + t.stat.attempts, 0);
      const correct = topics.reduce((a, t) => a + t.stat.correct, 0);
      const n = Math.max(1, topics.length);
      return {
        id: c.id, slug: c.slug, name: c.name, unit: c.unit, planWeight: c.planWeight, summary: c.summary, syllabusStatus: c.syllabusStatus, topics,
        studiedPct: Math.round((topics.filter((t) => t.stat.notesDone).length / n) * 100),
        progressScore: Math.round(topics.reduce((a, t) => a + STAGE_SCORE[t.stat.stage], 0) / n),
        attempts, accuracy: attempts ? Math.round((correct / attempts) * 100) : 0, stageCounts,
      };
    });
    const allTopics = chapters.flatMap((c) => c.topics);
    const attempts = chapters.reduce((a, c) => a + c.attempts, 0);
    const correct = allTopics.reduce((a, t) => a + t.stat.correct, 0);
    const n = Math.max(1, allTopics.length);
    return {
      id: s.id, slug: s.slug, name: s.name, chapters,
      studiedPct: Math.round((allTopics.filter((t) => t.stat.notesDone).length / n) * 100),
      progressScore: Math.round(allTopics.reduce((a, t) => a + STAGE_SCORE[t.stat.stage], 0) / n),
      attempts, accuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
    };
  });
}

export async function examDateFor(userId: string) {
  const [profile, settings] = await Promise.all([db.studentProfile.findUnique({ where: { userId } }), getSettings()]);
  const date = profile?.examDate ?? new Date(`${settings.examDates[0]?.date ?? "2027-01-20"}T09:00:00+05:30`);
  return { date, profile, settings };
}

/** Chapters ranked by accuracy where the student has enough attempts to judge (min 4). */
export function weakStrong(subjects: SubjectView[], minAttempts = 4) {
  const rated = subjects.flatMap((s) => s.chapters.filter((c) => c.attempts >= minAttempts).map((c) => ({ ...c, subject: s.slug })));
  const sorted = [...rated].sort((a, b) => a.accuracy - b.accuracy);
  return { weak: sorted.filter((c) => c.accuracy < 70).slice(0, 5), strong: [...sorted].reverse().filter((c) => c.accuracy >= 70).slice(0, 5), rated: rated.length };
}
