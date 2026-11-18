import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { formulaSchema, noteSchema, animationSchema } from "@/lib/admin-schemas";
import { SIM_KEYS } from "@/lib/sim-keys";

const schema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("note"), data: noteSchema }),
  z.object({ kind: z.literal("formula"), data: formulaSchema, originalSlug: z.string().optional() }),
  z.object({ kind: z.literal("animation"), data: animationSchema }),
]);

/** Create or update notes, formulas and animated lessons. Edits reset review status to PENDING so changed content is re-verified. */
export const PUT = handler(async (req) => {
  await apiUser("ADMIN");
  const input = await body(req, schema);

  if (input.kind === "note") {
    const d = input.data;
    const topic = await db.topic.findUnique({ where: { id: d.topicId } });
    if (!topic) throw new HttpError(404, "Topic not found.");
    const bad = d.sections.find((s) => s.animationKey && !(SIM_KEYS as readonly string[]).includes(s.animationKey));
    if (bad) throw new HttpError(400, `Unknown animation key “${bad.animationKey}”.`);
    const sections = d.sections.map((s) => ({ key: s.key, title: s.title, body: s.body, ...(s.animationKey ? { animationKey: s.animationKey } : {}) }));
    await db.note.upsert({ where: { topicId: topic.id }, create: { topicId: topic.id, sections, publishStatus: "DRAFT" }, update: { sections, reviewStatus: "PENDING" } });
    return { ok: true };
  }

  if (input.kind === "formula") {
    const d = input.data;
    const chapter = await db.chapter.findUnique({ where: { slug: d.chapterSlug } });
    if (!chapter) throw new HttpError(400, "Unknown chapter.");
    const topic = d.topicSlug ? await db.topic.findUnique({ where: { slug: d.topicSlug } }) : null;
    if (d.topicSlug && !topic) throw new HttpError(400, "Unknown topic.");
    if (d.graphKey && !(SIM_KEYS as readonly string[]).includes(d.graphKey)) throw new HttpError(400, "Unknown graph animation key.");
    const original = input.originalSlug ? await db.formula.findUnique({ where: { slug: input.originalSlug } }) : null;
    const clash = await db.formula.findUnique({ where: { slug: d.slug } });
    if (clash && clash.id !== original?.id) throw new HttpError(409, "Another formula already uses this slug.");
    const data = {
      slug: d.slug, chapterId: chapter.id, topicId: topic?.id ?? null, name: d.name, expression: d.expression, variables: d.variables,
      siUnit: d.siUnit, dimensions: d.dimensions, origin: d.origin, interpretation: d.interpretation, whyItWorks: d.whyItWorks,
      whenToUse: d.whenToUse, whenNotToUse: d.whenNotToUse, conditions: d.conditions, assumptions: d.assumptions, specialCases: d.specialCases,
      relations: d.relations, graph: d.graph || null, graphKey: d.graphKey || null, basicExample: d.basicExample, jeeExample: d.jeeExample,
      trickyApplication: d.trickyApplication, commonMistakes: d.commonMistakes, shortcuts: d.shortcuts, limitations: d.limitations,
    };
    const row = original
      ? await db.formula.update({ where: { id: original.id }, data: { ...data, reviewStatus: "PENDING" } })
      : await db.formula.create({ data: { ...data, publishStatus: "DRAFT" } });
    await db.formulaDerivationStep.deleteMany({ where: { formulaId: row.id } });
    await db.formulaDerivationStep.createMany({ data: d.derivation.map((s, i) => ({ formulaId: row.id, order: i, statement: s.statement, justification: s.justification })) });
    return { ok: true, slug: row.slug };
  }

  const d = input.data;
  if (!(SIM_KEYS as readonly string[]).includes(d.key)) throw new HttpError(400, "Choose one of the available simulations.");
  const subject = await db.subject.findUnique({ where: { slug: d.subjectSlug } });
  if (!subject) throw new HttpError(400, "Unknown subject.");
  const chapter = d.chapterSlug ? await db.chapter.findUnique({ where: { slug: d.chapterSlug } }) : null;
  const topic = d.topicSlug ? await db.topic.findUnique({ where: { slug: d.topicSlug } }) : null;
  const data = { title: d.title, subjectId: subject.id, chapterId: chapter?.id ?? null, topicId: topic?.id ?? null, intro: d.intro, steps: d.steps, mathExplanation: d.mathExplanation, realLife: d.realLife, jeeApplication: d.jeeApplication };
  await db.animation.upsert({ where: { key: d.key }, create: { key: d.key, ...data, publishStatus: "DRAFT" }, update: { ...data, reviewStatus: "PENDING" } });
  return { ok: true };
});
