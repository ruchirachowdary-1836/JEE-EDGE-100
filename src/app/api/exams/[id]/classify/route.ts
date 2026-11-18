import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const schema = z.object({
  questionId: z.string().min(1),
  category: z.enum(["CONCEPTUAL", "FORMULA_SELECTION", "CALCULATION", "INTERPRETATION", "TIME_MANAGEMENT", "GUESSING"]).nullable(),
});

/** Classify a mock-test mistake; mirrors the category into the mistake notebook. */
export const PATCH = handler<{ params: { id: string } }>(async (req, { params }) => {
  const user = await apiUser();
  const input = await body(req, schema);
  const attempt = await db.mockAttempt.findUnique({ where: { id: params.id } });
  if (!attempt || attempt.userId !== user.id) throw new HttpError(404, "Attempt not found.");
  if (attempt.status !== "SUBMITTED") throw new HttpError(409, "Submit the test first.");
  await db.mockResponse.update({ where: { mockAttemptId_questionId: { mockAttemptId: attempt.id, questionId: input.questionId } }, data: { mistakeCategory: input.category } });
  await db.mistakeEntry.updateMany({ where: { userId: user.id, questionId: input.questionId }, data: { category: input.category } });
  return { ok: true };
});
