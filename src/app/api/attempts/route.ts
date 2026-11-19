import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { getSettings } from "@/lib/config";
import { isNumericalCorrect } from "@/lib/scoring";
import { logEvent, syncMastery, topicStats } from "@/lib/progress";
import type { Reveal } from "@/lib/questions";
import { ADVANCED_SCHEME, matchMarks, multipleMarks } from "@/lib/advanced";

const schema = z.object({
  questionId: z.string().min(1),
  context: z.enum(["GYM", "PYQ", "REVISION"]),
  selectedOptionId: z.string().nullable().optional(),
  /** MULTIPLE questions: every option ticked */
  selectedOptionIds: z.array(z.string()).max(10).optional(),
  numericalResponse: z.number().finite().nullable().optional(),
  timeTakenSec: z.number().int().min(0).max(36000),
});

export const POST = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, schema);
  const q = await db.question.findUnique({
    where: { id: input.questionId },
    include: { options: { orderBy: { order: "asc" } }, topic: { select: { id: true, slug: true, name: true } } },
  });
  if (!q || q.publishStatus !== "PUBLISHED") throw new HttpError(404, "Question not found.");

  // Practising a question here reveals its solution, so block it while the same question sits in a live mock.
  const liveMock = await db.mockAttempt.findFirst({
    where: { userId: user.id, status: "IN_PROGRESS", endsAt: { gt: new Date() }, mockExam: { items: { some: { questionId: q.id } } } },
    select: { id: true },
  });
  if (liveMock) throw new HttpError(409, "This question is in the mock test you are taking. Finish or submit the mock first.");

  // Enforce Gym level locks on the server, not just in the UI.
  if (input.context === "GYM" && q.topicId && q.level && q.level > 1) {
    const s = (await topicStats(user.id, [q.topicId])).get(q.topicId);
    if ((s?.levelUnlocked ?? 1) < q.level) throw new HttpError(403, `Level ${q.level} is locked. Clear level ${q.level - 1} first.`);
  }

  let isCorrect = false;
  let selectedText = "";
  let marks: number | null = null;
  if (q.type === "MULTIPLE") {
    const ids = [...new Set(input.selectedOptionIds ?? [])];
    if (!ids.length) throw new HttpError(400, "Tick at least one option before submitting.");
    const picked = ids.map((id) => q.options.find((o) => o.id === id));
    if (picked.some((o) => !o)) throw new HttpError(400, "That option does not belong to this question.");
    const r = multipleMarks(ids, q.options.filter((o) => o.isCorrect).map((o) => o.id));
    isCorrect = r.fullyCorrect;
    marks = r.marks;
    selectedText = picked.map((o) => `(${o!.label})`).join(", ");
  } else if (q.type === "MCQ" || q.type === "MATCH") {
    if (!input.selectedOptionId) throw new HttpError(400, "Choose an option before submitting.");
    const opt = q.options.find((o) => o.id === input.selectedOptionId);
    if (!opt) throw new HttpError(400, "That option does not belong to this question.");
    isCorrect = opt.isCorrect;
    selectedText = `(${opt.label}) ${opt.text}`;
    if (q.type === "MATCH") marks = matchMarks(opt.id, q.options.find((o) => o.isCorrect)!.id).marks;
  } else {
    if (input.numericalResponse === null || input.numericalResponse === undefined) throw new HttpError(400, "Enter a numerical answer before submitting.");
    isCorrect = q.numericalAnswer !== null && isNumericalCorrect(input.numericalResponse, q.numericalAnswer, q.numericalTolerance);
    selectedText = String(input.numericalResponse);
  }

  const correct = q.options.find((o) => o.isCorrect);
  const correctAnswerText = q.type === "MULTIPLE"
    ? q.options.filter((o) => o.isCorrect).map((o) => `(${o.label})`).join(", ")
    : q.type === "NUMERICAL" ? String(q.numericalAnswer) : correct ? `(${correct.label}) ${correct.text}` : "";

  await db.attempt.create({
    data: {
      userId: user.id, questionId: q.id, context: input.context, isCorrect, timeTakenSec: input.timeTakenSec,
      selectedOptionId: q.type === "MULTIPLE" ? null : input.selectedOptionId ?? null, selectedOptionIds: q.type === "MULTIPLE" ? input.selectedOptionIds ?? [] : [],
      numericalResponse: input.numericalResponse ?? null, marks,
    },
  });

  // REVISION re-attempts are scheduled from the mistake notebook, which records their outcome itself.
  if (!isCorrect && input.context !== "REVISION") {
    const settings = await getSettings();
    const next = new Date(Date.now() + (settings.srs.mistakeReviewDays[0] ?? 1) * 86400_000);
    await db.mistakeEntry.upsert({
      where: { userId_questionId: { userId: user.id, questionId: q.id } },
      create: { userId: user.id, questionId: q.id, selectedAnswer: selectedText, correctAnswer: correctAnswerText, nextReviewAt: next },
      update: { selectedAnswer: selectedText, occurrences: { increment: 1 }, resolved: false, reviewCount: 0, nextReviewAt: next },
    });
  }

  if (q.topic) {
    await syncMastery(user.id, q.topic.id);
    await logEvent(user.id, input.context === "PYQ" ? "PYQ" : "GYM", q.topic.name, input.context === "PYQ" ? `/q/${q.id}` : `/gym/${q.topic.slug}`);
  }

  const related = q.relatedIds.length
    ? await db.question.findMany({ where: { id: { in: q.relatedIds }, publishStatus: "PUBLISHED" }, select: { id: true, statement: true, topic: { select: { slug: true } } } })
    : [];

  const levelUnlocked = q.topicId ? (await topicStats(user.id, [q.topicId])).get(q.topicId)?.levelUnlocked ?? 1 : null;

  const reveal: Reveal & { levelUnlocked: number | null } = {
    isCorrect, marks, markScheme: q.type === "MULTIPLE" ? ADVANCED_SCHEME.multiple.note : q.type === "MATCH" ? ADVANCED_SCHEME.match.note : null, correctOptionId: correct?.id ?? null, correctAnswerText, numericalAnswer: q.numericalAnswer,
    solution: q.solution, conceptTested: q.conceptTested, formulaUsed: q.formulaUsed, whyFormula: q.whyFormula,
    altMethod: q.altMethod, commonMistakes: q.commonMistakes, approxTimeSec: q.approxTimeSec,
    options: q.options.map((o) => ({ id: o.id, label: o.label, isCorrect: o.isCorrect, explanation: o.explanation })),
    related: related.map((r) => ({ id: r.id, statement: r.statement, topicSlug: r.topic?.slug ?? null })),
    levelUnlocked,
  };
  return reveal;
});
