import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const slug = z.string().regex(/^[a-z0-9-]{3,80}$/, "slug: lowercase letters, digits and hyphens (3–80)");
const schema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("chapter"), id: z.string().optional(), subjectSlug: z.string(), slug, name: z.string().trim().min(3).max(150),
    unit: z.string().max(80).optional().nullable(), planWeight: z.number().int().min(1).max(5), summary: z.string().max(1000),
    syllabusStatus: z.enum(["EXAMINABLE", "ENRICHMENT"]), order: z.number().int().min(0).max(999).optional(),
  }),
  z.object({
    kind: z.literal("topic"), id: z.string().optional(), chapterSlug: z.string(), slug, name: z.string().trim().min(3).max(150),
    subtopics: z.array(z.string().trim().min(1).max(200)).max(40), summary: z.string().max(1000).default(""), order: z.number().int().min(0).max(999).optional(),
  }),
]);

export const PUT = handler(async (req) => {
  await apiUser("ADMIN");
  const input = await body(req, schema);
  if (input.kind === "chapter") {
    const subject = await db.subject.findUnique({ where: { slug: input.subjectSlug } });
    if (!subject) throw new HttpError(400, "Unknown subject.");
    const clash = await db.chapter.findUnique({ where: { slug: input.slug } });
    if (clash && clash.id !== input.id) throw new HttpError(409, "Another chapter already uses this slug.");
    const data = { subjectId: subject.id, slug: input.slug, name: input.name, unit: input.unit || null, planWeight: input.planWeight, summary: input.summary, syllabusStatus: input.syllabusStatus };
    const order = input.order ?? (await db.chapter.count({ where: { subjectId: subject.id } }));
    const row = input.id ? await db.chapter.update({ where: { id: input.id }, data }) : await db.chapter.create({ data: { ...data, order, publishStatus: "DRAFT" } });
    return { id: row.id };
  }
  const chapter = await db.chapter.findUnique({ where: { slug: input.chapterSlug } });
  if (!chapter) throw new HttpError(400, "Unknown chapter.");
  const clash = await db.topic.findUnique({ where: { slug: input.slug } });
  if (clash && clash.id !== input.id) throw new HttpError(409, "Another topic already uses this slug.");
  const data = { chapterId: chapter.id, slug: input.slug, name: input.name, subtopics: input.subtopics, summary: input.summary };
  const order = input.order ?? (await db.topic.count({ where: { chapterId: chapter.id } }));
  const row = input.id ? await db.topic.update({ where: { id: input.id }, data }) : await db.topic.create({ data: { ...data, order, publishStatus: "DRAFT" } });
  return { id: row.id };
});
