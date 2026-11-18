import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const MODELS = ["chapter", "topic", "note", "formula", "formulaComparison", "animation", "question", "mockExam", "conceptCard", "namedReaction", "inorganicException"] as const;
const schema = z.object({
  model: z.enum(MODELS),
  id: z.string().min(1),
  publishStatus: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  reviewStatus: z.enum(["PENDING", "IN_REVIEW", "CHANGES_REQUESTED", "VERIFIED"]).optional(),
  reviewNote: z.string().max(2000).optional(),
});

/** Generic publish / review-status update used across the CMS. Admin only. */
export const POST = handler(async (req) => {
  await apiUser("ADMIN");
  const input = await body(req, schema);
  const data: Record<string, unknown> = {};
  if (input.publishStatus) data.publishStatus = input.publishStatus;
  if (input.reviewStatus) data.reviewStatus = input.reviewStatus;
  const supportsNote = ["note", "formula", "question"].includes(input.model);
  if (supportsNote && input.reviewNote !== undefined) data.reviewNote = input.reviewNote;
  if (supportsNote && input.reviewStatus && input.model !== "question") data.reviewedAt = new Date();
  if (!Object.keys(data).length) throw new HttpError(400, "Nothing to update.");
  // Publishing a question that fails integrity checks is blocked.
  if (input.model === "question" && input.publishStatus === "PUBLISHED") {
    const q = await db.question.findUnique({ where: { id: input.id }, include: { options: true } });
    if (!q) throw new HttpError(404, "Question not found.");
    if (q.type === "MCQ" && q.options.filter((o) => o.isCorrect).length !== 1) throw new HttpError(400, "Cannot publish: an MCQ needs exactly one correct option.");
    if (q.type === "NUMERICAL" && q.numericalAnswer === null) throw new HttpError(400, "Cannot publish: numerical answer missing.");
    if (q.source === "PYQ" && (!q.pyqYear || !q.sourceAttribution)) throw new HttpError(400, "Cannot publish: PYQ attribution incomplete.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const delegate = (db as any)[input.model];
  const existing = await delegate.findUnique({ where: { id: input.id } });
  if (!existing) throw new HttpError(404, "Item not found.");
  await delegate.update({ where: { id: input.id }, data });
  return { ok: true };
});
