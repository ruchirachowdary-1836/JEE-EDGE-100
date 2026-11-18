import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { getSettings } from "@/lib/config";

const CATEGORIES = ["CONCEPTUAL", "FORMULA_SELECTION", "CALCULATION", "INTERPRETATION", "TIME_MANAGEMENT", "GUESSING"] as const;

const schema = z.object({
  questionId: z.string().min(1),
  category: z.enum(CATEGORIES).nullable().optional(),
  observation: z.string().max(4000).optional(),
  resolved: z.boolean().optional(),
  /** outcome of a scheduled re-attempt */
  review: z.enum(["correct", "wrong"]).optional(),
  /** manually add a question (e.g. a lucky guess that was correct) */
  add: z.boolean().optional(),
});

export const PATCH = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, schema);
  const where = { userId_questionId: { userId: user.id, questionId: input.questionId } };
  let entry = await db.mistakeEntry.findUnique({ where });
  const settings = await getSettings();
  const days = settings.srs.mistakeReviewDays;

  if (!entry) {
    if (!input.add) throw new HttpError(404, "This question is not in your mistake notebook.");
    const q = await db.question.findUnique({ where: { id: input.questionId }, include: { options: true } });
    if (!q) throw new HttpError(404, "Question not found.");
    const correct = q.options.find((o) => o.isCorrect);
    entry = await db.mistakeEntry.create({
      data: {
        userId: user.id, questionId: q.id, selectedAnswer: "(added manually)",
        correctAnswer: q.type === "MCQ" ? `(${correct?.label}) ${correct?.text}` : String(q.numericalAnswer),
        nextReviewAt: new Date(Date.now() + (days[0] ?? 1) * 86400_000),
      },
    });
  }

  const data: Record<string, unknown> = {};
  if (input.category !== undefined) data.category = input.category;
  if (input.observation !== undefined) data.observation = input.observation;
  if (input.resolved !== undefined) data.resolved = input.resolved;
  if (input.review === "correct") {
    const reviewCount = entry.reviewCount + 1;
    data.reviewCount = reviewCount;
    // resolved once it has survived every interval in the schedule
    if (reviewCount >= days.length) data.resolved = true;
    else data.nextReviewAt = new Date(Date.now() + days[reviewCount] * 86400_000);
  } else if (input.review === "wrong") {
    data.reviewCount = 0;
    data.occurrences = entry.occurrences + 1;
    data.nextReviewAt = new Date(Date.now() + (days[0] ?? 1) * 86400_000);
  }
  const updated = await db.mistakeEntry.update({ where, data });
  return { ok: true, resolved: updated.resolved, nextReviewAt: updated.nextReviewAt, category: updated.category };
});
