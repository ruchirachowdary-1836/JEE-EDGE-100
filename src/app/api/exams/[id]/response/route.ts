import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const schema = z.object({
  questionId: z.string().min(1),
  selectedOptionId: z.string().nullable(),
  numericalResponse: z.number().finite().nullable(),
  state: z.enum(["NOT_VISITED", "NOT_ANSWERED", "ANSWERED", "MARKED", "ANSWERED_MARKED"]),
  timeDeltaSec: z.number().int().min(0).max(4 * 3600),
});

export const PUT = handler<{ params: { id: string } }>(async (req, { params }) => {
  const user = await apiUser();
  const input = await body(req, schema);
  const attempt = await db.mockAttempt.findUnique({ where: { id: params.id } });
  if (!attempt || attempt.userId !== user.id) throw new HttpError(404, "Attempt not found.");
  if (attempt.status !== "IN_PROGRESS") throw new HttpError(409, "This test has already been submitted.");
  if (attempt.endsAt.getTime() + 15_000 < Date.now()) throw new HttpError(409, "Time is up — the test is being submitted.");
  const answered = input.state === "ANSWERED" || input.state === "ANSWERED_MARKED";
  if (input.selectedOptionId) {
    const ok = await db.questionOption.findFirst({ where: { id: input.selectedOptionId, questionId: input.questionId } });
    if (!ok) throw new HttpError(400, "Invalid option.");
  }
  await db.mockResponse.update({
    where: { mockAttemptId_questionId: { mockAttemptId: attempt.id, questionId: input.questionId } },
    data: {
      selectedOptionId: answered ? input.selectedOptionId : null,
      numericalResponse: answered ? input.numericalResponse : null,
      state: input.state,
      timeSpentSec: { increment: input.timeDeltaSec },
    },
  });
  return { ok: true };
});
