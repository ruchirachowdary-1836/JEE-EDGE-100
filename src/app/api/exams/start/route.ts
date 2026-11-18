import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { getSettings } from "@/lib/config";
import { settleIfExpired } from "@/lib/exam";

const schema = z.union([
  z.object({ mode: z.literal("mock"), mockExamId: z.string().min(1) }),
  z.object({
    mode: z.literal("custom"),
    title: z.string().trim().min(3).max(120),
    chapterSlugs: z.array(z.string()).max(60).default([]),
    subject: z.string().optional(),
    source: z.enum(["ANY", "PRACTICE", "PYQ"]).default("ANY"),
    year: z.number().int().min(2000).max(2100).optional(),
    count: z.number().int().min(3, "At least 3 questions").max(90, "At most 90 questions"),
    minutesPerQuestion: z.number().min(0.5).max(6),
  }),
]);

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export const POST = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, schema);
  let mockExamId: string;

  if (input.mode === "mock") {
    const mock = await db.mockExam.findUnique({ where: { id: input.mockExamId }, include: { _count: { select: { items: true } } } });
    if (!mock || (mock.publishStatus !== "PUBLISHED" && mock.ownerId !== user.id)) throw new HttpError(404, "Mock test not found.");
    if (mock._count.items === 0) throw new HttpError(400, "This mock test has no questions yet.");
    mockExamId = mock.id;
    // resume an unfinished attempt instead of starting a duplicate
    const open = await db.mockAttempt.findFirst({ where: { userId: user.id, mockExamId, status: "IN_PROGRESS" }, orderBy: { startedAt: "desc" } });
    if (open) {
      await settleIfExpired(open.id);
      const fresh = await db.mockAttempt.findUnique({ where: { id: open.id } });
      if (fresh?.status === "IN_PROGRESS") return { attemptId: open.id, resumed: true };
    }
  } else {
    const settings = await getSettings();
    const where: Prisma.QuestionWhereInput = { publishStatus: "PUBLISHED" };
    const slugs = input.chapterSlugs ?? [];
    if (slugs.length) where.chapter = { slug: { in: slugs } };
    if (input.subject) where.subject = { slug: input.subject };
    if (input.source !== "ANY") where.source = input.source;
    if (input.year) where.pyqYear = input.year;
    const pool = await db.question.findMany({ where, select: { id: true, subject: { select: { slug: true } } } });
    if (pool.length < 3) throw new HttpError(400, `Only ${pool.length} published question(s) match. Choose more chapters or a different source.`);
    const picked = shuffle(pool).slice(0, input.count);
    const order = ["physics", "chemistry", "mathematics"];
    picked.sort((a, b) => order.indexOf(a.subject.slug) - order.indexOf(b.subject.slug));
    const mock = await db.mockExam.create({
      data: {
        title: input.title,
        kind: slugs.length ? "CHAPTER" : "CUSTOM",
        durationMin: Math.max(5, Math.round(picked.length * input.minutesPerQuestion)),
        pattern: { sections: order.map((s) => ({ subject: s, mcq: 0, numerical: 0 })), marks: settings.examPattern.marks },
        publishStatus: "DRAFT",
        ownerId: user.id,
        description: picked.length < input.count ? `Only ${picked.length} questions were available for this selection.` : "",
        items: { create: picked.map((q, i) => ({ questionId: q.id, order: i, section: q.subject.slug })) },
      },
    });
    mockExamId = mock.id;
  }

  const mock = await db.mockExam.findUniqueOrThrow({ where: { id: mockExamId }, include: { items: { select: { questionId: true } } } });
  const attempt = await db.mockAttempt.create({
    data: {
      userId: user.id, mockExamId,
      endsAt: new Date(Date.now() + mock.durationMin * 60_000),
      responses: { create: mock.items.map((it) => ({ questionId: it.questionId })) },
    },
  });
  return { attemptId: attempt.id, resumed: false };
});
