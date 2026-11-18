import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { getSettings } from "@/lib/config";

const schema = z.object({
  title: z.string().trim().min(3).max(150),
  description: z.string().max(1000).default(""),
  kind: z.enum(["FULL", "CUSTOM"]),
  durationMin: z.number().int().min(5).max(360),
  /** per-subject counts; defaults to the configured exam pattern for FULL mocks */
  sections: z.array(z.object({ subject: z.string(), mcq: z.number().int().min(0).max(60), numerical: z.number().int().min(0).max(30) })).min(1),
  sources: z.enum(["ANY", "PYQ", "PRACTICE"]).default("ANY"),
  onlyVerified: z.boolean().default(false),
});

function shuffle<T>(a: T[]) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

/** Assemble a mock from the published bank following a pattern. Fails honestly if the bank is too small. */
export const POST = handler(async (req) => {
  await apiUser("ADMIN");
  const input = await body(req, schema);
  const settings = await getSettings();
  const items: { questionId: string; section: string }[] = [];
  const shortages: string[] = [];
  for (const s of input.sections) {
    for (const [type, n] of [["MCQ", s.mcq], ["NUMERICAL", s.numerical]] as const) {
      if (!n) continue;
      const pool = await db.question.findMany({
        where: { publishStatus: "PUBLISHED", subject: { slug: s.subject }, type, ...(input.sources !== "ANY" ? { source: input.sources } : {}), ...(input.onlyVerified ? { reviewStatus: "VERIFIED" } : {}) },
        select: { id: true },
      });
      if (pool.length < n) shortages.push(`${s.subject} ${type}: need ${n}, have ${pool.length}`);
      shuffle(pool).slice(0, n).forEach((q) => items.push({ questionId: q.id, section: s.subject }));
    }
  }
  if (shortages.length) throw new HttpError(400, `Not enough published questions — ${shortages.join("; ")}.`);
  const mock = await db.mockExam.create({
    data: {
      title: input.title, description: input.description, kind: input.kind, durationMin: input.durationMin,
      pattern: { sections: input.sections, marks: settings.examPattern.marks }, publishStatus: "DRAFT",
      items: { create: items.map((it, i) => ({ ...it, order: i })) },
    },
  });
  return { id: mock.id, count: items.length };
});

export const DELETE = handler(async (req) => {
  await apiUser("ADMIN");
  const id = new URL(req.url).searchParams.get("id");
  if (!id) throw new HttpError(400, "Missing id.");
  const attempts = await db.mockAttempt.count({ where: { mockExamId: id } });
  if (attempts) throw new HttpError(409, "Students have attempted this mock; unpublish it instead so their results stay intact.");
  await db.mockExam.delete({ where: { id } });
  return { ok: true };
});
