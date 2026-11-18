import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { handler } from "@/lib/api";
import { submitAttempt } from "@/lib/exam";
import { logEvent } from "@/lib/progress";

export const POST = handler<{ params: { id: string } }>(async (_req, { params }) => {
  const user = await apiUser();
  const attempt = await db.mockAttempt.findUnique({ where: { id: params.id }, include: { mockExam: { select: { title: true } } } });
  if (!attempt || attempt.userId !== user.id) throw new HttpError(404, "Attempt not found.");
  const done = await submitAttempt(attempt.id);
  await logEvent(user.id, "MOCK", attempt.mockExam.title, `/exams/${attempt.id}/result`);
  return { ok: true, score: done.score };
});
