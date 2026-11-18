import "server-only";
import { db } from "./db";
import { marksFor, type MarkScheme } from "./scoring";
import { getSettings } from "./config";

export type MockPattern = { sections: { subject: string; mcq: number; numerical: number }[]; marks: MarkScheme };

export type SubjectSummary = { score: number; max: number; correct: number; incorrect: number; unattempted: number; timeSec: number };
export type ExamSummary = {
  score: number; max: number; correct: number; incorrect: number; unattempted: number; accuracy: number; timeSec: number;
  perSubject: Record<string, SubjectSummary>;
  perChapter: { chapter: string; slug: string; subject: string; correct: number; incorrect: number; unattempted: number; score: number }[];
};

/** Scores an attempt, writes per-question marks, practice attempts and mistake entries, and stores the summary. Idempotent. */
export async function submitAttempt(attemptId: string) {
  const attempt = await db.mockAttempt.findUnique({
    where: { id: attemptId },
    include: {
      mockExam: { include: { items: { orderBy: { order: "asc" }, include: { question: { include: { options: true, chapter: true, subject: true } } } } } },
      responses: true,
    },
  });
  if (!attempt) throw new Error("Attempt not found");
  if (attempt.status === "SUBMITTED") return attempt;
  // Claim the attempt atomically so a manual submit racing the auto-submit cannot score it twice.
  const claimed = await db.mockAttempt.updateMany({ where: { id: attempt.id, status: "IN_PROGRESS" }, data: { status: "SUBMITTED", submittedAt: new Date() } });
  if (claimed.count === 0) return db.mockAttempt.findUniqueOrThrow({ where: { id: attempt.id } });

  const pattern = attempt.mockExam.pattern as MockPattern;
  const scheme = pattern.marks;
  const settings = await getSettings();
  const resp = new Map(attempt.responses.map((r) => [r.questionId, r]));
  const summary: ExamSummary = { score: 0, max: 0, correct: 0, incorrect: 0, unattempted: 0, accuracy: 0, timeSec: 0, perSubject: {}, perChapter: [] };
  const chapters = new Map<string, ExamSummary["perChapter"][number]>();
  const now = new Date();

  for (const item of attempt.mockExam.items) {
    const q = item.question;
    const r = resp.get(q.id);
    const result = marksFor(
      { type: q.type, numericalAnswer: q.numericalAnswer, numericalTolerance: q.numericalTolerance, options: q.options },
      { selectedOptionId: r?.selectedOptionId ?? null, numericalResponse: r?.numericalResponse ?? null },
      scheme,
    );
    const subj = (summary.perSubject[item.section] ??= { score: 0, max: 0, correct: 0, incorrect: 0, unattempted: 0, timeSec: 0 });
    const ch = chapters.get(q.chapterId) ?? { chapter: q.chapter.name, slug: q.chapter.slug, subject: q.subject.slug, correct: 0, incorrect: 0, unattempted: 0, score: 0 };
    subj.max += scheme.correct;
    summary.max += scheme.correct;
    subj.timeSec += r?.timeSpentSec ?? 0;
    summary.timeSec += r?.timeSpentSec ?? 0;
    summary.score += result.marks;
    subj.score += result.marks;
    ch.score += result.marks;
    if (!result.attempted) { summary.unattempted++; subj.unattempted++; ch.unattempted++; }
    else if (result.isCorrect) { summary.correct++; subj.correct++; ch.correct++; }
    else { summary.incorrect++; subj.incorrect++; ch.incorrect++; }
    chapters.set(q.chapterId, ch);

    await db.mockResponse.upsert({
      where: { mockAttemptId_questionId: { mockAttemptId: attempt.id, questionId: q.id } },
      create: { mockAttemptId: attempt.id, questionId: q.id, isCorrect: result.isCorrect, marks: result.marks },
      update: { isCorrect: result.isCorrect, marks: result.marks },
    });
    if (result.attempted) {
      await db.attempt.create({
        data: { userId: attempt.userId, questionId: q.id, context: "MOCK", isCorrect: !!result.isCorrect, timeTakenSec: r?.timeSpentSec ?? 0, selectedOptionId: r?.selectedOptionId ?? null, numericalResponse: r?.numericalResponse ?? null },
      });
    }
    if (result.attempted && !result.isCorrect) {
      const sel = q.type === "MCQ" ? q.options.find((o) => o.id === r?.selectedOptionId) : null;
      const correct = q.options.find((o) => o.isCorrect);
      await db.mistakeEntry.upsert({
        where: { userId_questionId: { userId: attempt.userId, questionId: q.id } },
        create: {
          userId: attempt.userId, questionId: q.id,
          selectedAnswer: sel ? `(${sel.label}) ${sel.text}` : String(r?.numericalResponse ?? ""),
          correctAnswer: q.type === "MCQ" ? `(${correct?.label}) ${correct?.text}` : String(q.numericalAnswer),
          nextReviewAt: new Date(now.getTime() + (settings.srs.mistakeReviewDays[0] ?? 1) * 86400_000),
        },
        update: { occurrences: { increment: 1 }, resolved: false, reviewCount: 0 },
      });
    }
  }
  const attempted = summary.correct + summary.incorrect;
  summary.accuracy = attempted ? Math.round((summary.correct / attempted) * 100) : 0;
  summary.perChapter = [...chapters.values()].sort((a, b) => a.score - b.score);

  return db.mockAttempt.update({
    where: { id: attempt.id },
    data: { score: summary.score, summary },
  });
}

/** Auto-submits an in-progress attempt whose time has run out (with a small grace period for network latency). */
export async function settleIfExpired(attemptId: string) {
  const a = await db.mockAttempt.findUnique({ where: { id: attemptId }, select: { status: true, endsAt: true } });
  if (a && a.status === "IN_PROGRESS" && a.endsAt.getTime() + 15_000 < Date.now()) await submitAttempt(attemptId);
}
