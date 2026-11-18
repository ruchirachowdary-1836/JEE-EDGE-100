import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { questionSchema } from "@/lib/admin-schemas";
import { syncOptions } from "@/lib/options";

type Q = z.infer<typeof questionSchema>;

async function save(q: Q) {
  const chapter = await db.chapter.findUnique({ where: { slug: q.chapterSlug } });
  if (!chapter) throw new HttpError(400, `Unknown chapter “${q.chapterSlug}”.`);
  const topic = q.topicSlug ? await db.topic.findUnique({ where: { slug: q.topicSlug } }) : null;
  if (q.topicSlug && (!topic || topic.chapterId !== chapter.id)) throw new HttpError(400, `Topic “${q.topicSlug}” is not in chapter “${q.chapterSlug}”.`);
  const data = {
    source: q.source, type: q.type, subjectId: chapter.subjectId, chapterId: chapter.id, topicId: topic?.id ?? null,
    level: q.source === "PRACTICE" ? q.level ?? null : q.level ?? null, difficulty: q.difficulty, statement: q.statement,
    numericalAnswer: q.type === "NUMERICAL" ? q.numericalAnswer ?? null : null, numericalTolerance: q.numericalTolerance,
    solution: q.solution, conceptTested: q.conceptTested, formulaUsed: q.formulaUsed, whyFormula: q.whyFormula, altMethod: q.altMethod || null,
    commonMistakes: q.commonMistakes, approxTimeSec: q.approxTimeSec,
    pyqYear: q.source === "PYQ" ? q.pyqYear ?? null : null, pyqSession: q.source === "PYQ" ? q.pyqSession ?? null : null,
    pyqShift: q.source === "PYQ" ? q.pyqShift ?? null : null, pyqDate: q.source === "PYQ" && q.pyqDate ? new Date(`${q.pyqDate}T00:00:00+05:30`) : null,
    sourceAttribution: q.source === "PYQ" ? q.sourceAttribution ?? null : null,
  };
  const row = q.id
    ? await db.question.update({ where: { id: q.id }, data: { ...data, reviewStatus: "PENDING" } })
    : await db.question.create({ data: { ...data, publishStatus: "DRAFT" } });
  await syncOptions(db, row.id, q.type === "MCQ" ? q.options : []);
  return row.id;
}

/** Create or update one question. */
export const PUT = handler(async (req) => {
  await apiUser("ADMIN");
  const q = await body(req, questionSchema);
  if (q.id && !(await db.question.findUnique({ where: { id: q.id } }))) throw new HttpError(404, "Question not found.");
  return { id: await save(q) };
});

/** Bulk import (e.g. a licensed PYQ paper). Validates every row first; nothing is written if any row fails. Imported rows start as DRAFT / PENDING review. */
export const POST = handler(async (req) => {
  await apiUser("ADMIN");
  const raw = await body(req, z.object({ questions: z.array(z.unknown()).min(1).max(500) }));
  const errors: string[] = [];
  const parsed: Q[] = [];
  raw.questions.forEach((item, i) => {
    const r = questionSchema.safeParse(item);
    if (r.success) parsed.push({ ...r.data, id: undefined });
    else errors.push(`Row ${i + 1}: ${r.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`).join("; ")}`);
  });
  const chapterSlugs = [...new Set(parsed.map((p) => p.chapterSlug))];
  const found = await db.chapter.findMany({ where: { slug: { in: chapterSlugs } }, select: { slug: true } });
  const missing = chapterSlugs.filter((s) => !found.some((f) => f.slug === s));
  if (missing.length) errors.push(`Unknown chapter slug(s): ${missing.join(", ")}`);
  if (errors.length) throw new HttpError(400, errors.slice(0, 20).join("\n"));
  const ids: string[] = [];
  for (const q of parsed) ids.push(await save(q));
  return { imported: ids.length };
});

export const DELETE = handler(async (req) => {
  await apiUser("ADMIN");
  const id = new URL(req.url).searchParams.get("id");
  if (!id) throw new HttpError(400, "Missing id.");
  const used = await db.mockExamQuestion.count({ where: { questionId: id } });
  if (used) throw new HttpError(409, "This question is part of a mock test. Unpublish it instead of deleting.");
  await db.question.delete({ where: { id } });
  return { ok: true };
});
