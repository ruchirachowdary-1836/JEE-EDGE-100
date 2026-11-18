import "server-only";
import { db } from "./db";
import { getSettings, type GymRules, type MasteryRules } from "./config";
import { istDay } from "./utils";

export type Stage = "NOT_STARTED" | "STUDIED" | "PRACTICED" | "REVISED" | "MASTERED";
export const STAGE_ORDER: Stage[] = ["NOT_STARTED", "STUDIED", "PRACTICED", "REVISED", "MASTERED"];
export const STAGE_LABEL: Record<Stage, string> = {
  NOT_STARTED: "Not started",
  STUDIED: "Studied",
  PRACTICED: "Practised",
  REVISED: "Revised",
  MASTERED: "Mastered",
};

export type TopicStat = {
  topicId: string;
  attempts: number;
  correct: number;
  accuracy: number;
  avgTime: number;
  notesDone: boolean;
  revisedCount: number;
  levelUnlocked: number;
  clearedLevels: number[];
  stage: Stage;
};

type AttemptLite = { questionId: string; isCorrect: boolean; timeTakenSec: number; question: { topicId: string | null; level: number | null } };

/** Level L is cleared when enough of its questions are attempted and overall accuracy on that level meets the rule. */
export function levelStatus(
  level: number,
  questionIds: string[],
  attempts: { questionId: string; isCorrect: boolean }[],
  rules: GymRules,
) {
  const ids = new Set(questionIds);
  const mine = attempts.filter((a) => ids.has(a.questionId));
  const attempted = new Set(mine.map((a) => a.questionId)).size;
  const correct = mine.filter((a) => a.isCorrect).length;
  const accuracy = mine.length ? Math.round((correct / mine.length) * 100) : 0;
  const completion = questionIds.length ? Math.round((attempted / questionIds.length) * 100) : 0;
  const cleared = questionIds.length > 0 && completion >= rules.minCompletion && accuracy >= rules.minAccuracy;
  return { level, total: questionIds.length, attempted, accuracy, completion, cleared, empty: questionIds.length === 0 };
}

/** Highest unlocked level: level 1 is always open; L+1 opens when L is cleared (empty levels don't block). */
export function unlockedLevel(statuses: ReturnType<typeof levelStatus>[]) {
  let unlocked = 1;
  for (const s of statuses.sort((a, b) => a.level - b.level)) {
    if (s.level !== unlocked) continue;
    if (s.cleared || s.empty) unlocked = Math.min(5, unlocked + 1);
    else break;
  }
  return unlocked;
}

export function stageFor(input: { notesDone: boolean; attempts: number; revisedCount: number; mastered: boolean }): Stage {
  if (input.mastered) return "MASTERED";
  if (input.revisedCount > 0 && input.attempts > 0) return "REVISED";
  if (input.attempts > 0) return "PRACTICED";
  if (input.notesDone) return "STUDIED";
  return "NOT_STARTED";
}

export function isMastered(s: { attempts: number; accuracy: number; clearedLevels: number[]; revisedCount: number; notesDone: boolean }, rules: MasteryRules) {
  const clearedThrough = s.clearedLevels.includes(rules.minLevelCleared);
  return s.notesDone && s.attempts >= rules.minAttempts && s.accuracy >= rules.minAccuracy && clearedThrough && s.revisedCount >= rules.minRevisions;
}

/** Computes per-topic statistics for one user across the given topics (all topics when omitted). */
export async function topicStats(userId: string, topicIds?: string[]): Promise<Map<string, TopicStat>> {
  const settings = await getSettings();
  const [attempts, progress, questions] = await Promise.all([
    db.attempt.findMany({
      where: { userId, context: { in: ["GYM", "PYQ", "REVISION"] }, ...(topicIds ? { question: { topicId: { in: topicIds } } } : {}) },
      select: { questionId: true, isCorrect: true, timeTakenSec: true, question: { select: { topicId: true, level: true } } },
    }),
    db.topicProgress.findMany({ where: { userId, ...(topicIds ? { topicId: { in: topicIds } } : {}) } }),
    db.question.findMany({
      where: { publishStatus: "PUBLISHED", source: "PRACTICE", level: { not: null }, ...(topicIds ? { topicId: { in: topicIds } } : { topicId: { not: null } }) },
      select: { id: true, topicId: true, level: true },
    }),
  ]);

  const byTopic = new Map<string, AttemptLite[]>();
  for (const a of attempts) {
    const t = a.question.topicId;
    if (!t) continue;
    if (!byTopic.has(t)) byTopic.set(t, []);
    byTopic.get(t)!.push(a);
  }
  const qByTopicLevel = new Map<string, Map<number, string[]>>();
  for (const q of questions) {
    if (!q.topicId || q.level == null) continue;
    if (!qByTopicLevel.has(q.topicId)) qByTopicLevel.set(q.topicId, new Map());
    const m = qByTopicLevel.get(q.topicId)!;
    if (!m.has(q.level)) m.set(q.level, []);
    m.get(q.level)!.push(q.id);
  }
  const progByTopic = new Map(progress.map((p) => [p.topicId, p]));
  const ids = new Set<string>([...(topicIds ?? []), ...byTopic.keys(), ...progByTopic.keys()]);
  const out = new Map<string, TopicStat>();

  for (const topicId of ids) {
    const list = byTopic.get(topicId) ?? [];
    const correct = list.filter((a) => a.isCorrect).length;
    const accuracy = list.length ? Math.round((correct / list.length) * 100) : 0;
    const avgTime = list.length ? Math.round(list.reduce((s, a) => s + a.timeTakenSec, 0) / list.length) : 0;
    const levels = qByTopicLevel.get(topicId) ?? new Map<number, string[]>();
    const statuses = [1, 2, 3, 4, 5].map((l) => levelStatus(l, levels.get(l) ?? [], list, settings.gym));
    const p = progByTopic.get(topicId);
    const notesDone = !!p?.notesCompletedAt;
    const revisedCount = p?.revisedCount ?? 0;
    const clearedLevels = statuses.filter((s) => s.cleared).map((s) => s.level);
    const mastered = isMastered({ attempts: list.length, accuracy, clearedLevels, revisedCount, notesDone }, settings.mastery);
    out.set(topicId, {
      topicId, attempts: list.length, correct, accuracy, avgTime, notesDone, revisedCount,
      // a level, once earned, stays unlocked even if later attempts lower the accuracy
      levelUnlocked: Math.max(unlockedLevel(statuses), p?.gymLevelUnlocked ?? 1), clearedLevels,
      stage: stageFor({ notesDone, attempts: list.length, revisedCount, mastered }),
    });
  }
  return out;
}

export function emptyStat(topicId: string): TopicStat {
  return { topicId, attempts: 0, correct: 0, accuracy: 0, avgTime: 0, notesDone: false, revisedCount: 0, levelUnlocked: 1, clearedLevels: [], stage: "NOT_STARTED" };
}

/** Persist mastery timestamp when a topic first reaches mastery (keeps history for analytics). */
export async function syncMastery(userId: string, topicId: string) {
  const stats = await topicStats(userId, [topicId]);
  const s = stats.get(topicId);
  if (!s) return;
  const existing = await db.topicProgress.findUnique({ where: { userId_topicId: { userId, topicId } } });
  const masteredAt = s.stage === "MASTERED" ? existing?.masteredAt ?? new Date() : null;
  await db.topicProgress.upsert({
    where: { userId_topicId: { userId, topicId } },
    create: { userId, topicId, gymLevelUnlocked: s.levelUnlocked, masteredAt },
    update: { gymLevelUnlocked: s.levelUnlocked, masteredAt },
  });
}

/** Records activity for "recently studied" and updates the daily streak (IST days). */
export async function logEvent(userId: string, kind: string, label: string, href: string) {
  await db.studyEvent.create({ data: { userId, kind, label, href } });
  const today = istDay();
  const profile = await db.studentProfile.upsert({ where: { userId }, create: { userId }, update: {} });
  if (profile.lastActiveDay === today) return;
  const yesterday = istDay(new Date(Date.now() - 86400_000));
  const streak = profile.lastActiveDay === yesterday ? profile.streak + 1 : 1;
  await db.studentProfile.update({
    where: { userId },
    data: { streak, longestStreak: Math.max(streak, profile.longestStreak), lastActiveDay: today },
  });
}
