/* Idempotent seed: loads the structured content library from /content into PostgreSQL.
 * Run with `npm run db:seed`. Safe to re-run — rows are upserted by slug or deterministic id. */
import { PrismaClient, type QuestionType, type Difficulty } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SYLLABUS } from "../content/syllabus";
import { PHYSICS_NOTES } from "../content/notes-physics";
import { CHEMISTRY_NOTES } from "../content/notes-chemistry";
import { MATHEMATICS_NOTES } from "../content/notes-mathematics";
import { PHYSICS_FORMULAS } from "../content/formulas-physics";
import { CHEMISTRY_FORMULAS, MATHEMATICS_FORMULAS } from "../content/formulas-chem-math";
import { COMPARISONS } from "../content/comparisons";
import { ANIMATIONS } from "../content/animations";
import { PHYSICS_QUESTIONS } from "../content/questions-physics";
import { CHEMISTRY_QUESTIONS } from "../content/questions-chemistry";
import { MATHEMATICS_QUESTIONS } from "../content/questions-mathematics";
import { PHYSICS_QUESTIONS_2 } from "../content/questions-physics-2";
import { CHEMISTRY_QUESTIONS_2 } from "../content/questions-chemistry-2";
import { MATHEMATICS_QUESTIONS_2 } from "../content/questions-mathematics-2";
import { NAMED_REACTIONS, INORGANIC_EXCEPTIONS, CONCEPT_CARDS } from "../content/chemistry";
import type { QuestionSeed } from "../content/types";
import { syncOptions } from "../src/lib/options";

const db = new PrismaClient();

const slugify = (s: string) =>
  s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function main() {
  console.log("Seeding syllabus…");
  const subjectId: Record<string, string> = {};
  const chapterId: Record<string, string> = {};
  const chapterSubject: Record<string, string> = {};
  const topicId: Record<string, string> = {};
  const usedTopicSlugs = new Set<string>();

  for (const [si, s] of SYLLABUS.entries()) {
    const subject = await db.subject.upsert({
      where: { slug: s.slug },
      create: { slug: s.slug, name: s.name, order: si },
      update: { name: s.name, order: si },
    });
    subjectId[s.slug] = subject.id;
    for (const [ci, c] of s.chapters.entries()) {
      const chapter = await db.chapter.upsert({
        where: { slug: c.slug },
        create: { slug: c.slug, name: c.name, unit: c.unit, order: ci, planWeight: c.planWeight, summary: c.summary, subjectId: subject.id },
        update: { name: c.name, unit: c.unit, order: ci, planWeight: c.planWeight, summary: c.summary, subjectId: subject.id },
      });
      chapterId[c.slug] = chapter.id;
      chapterSubject[c.slug] = s.slug;
      for (const [ti, t] of c.topics.entries()) {
        let slug = t.slug ?? slugify(t.name);
        if (usedTopicSlugs.has(slug)) slug = `${slug}-${c.slug}`;
        usedTopicSlugs.add(slug);
        const topic = await db.topic.upsert({
          where: { slug },
          create: { slug, name: t.name, order: ti, subtopics: t.subtopics, chapterId: chapter.id },
          update: { name: t.name, order: ti, subtopics: t.subtopics, chapterId: chapter.id },
        });
        topicId[slug] = topic.id;
      }
    }
  }

  console.log("Seeding notes…");
  for (const n of [...PHYSICS_NOTES, ...CHEMISTRY_NOTES, ...MATHEMATICS_NOTES]) {
    const tid = topicId[n.topic];
    if (!tid) throw new Error(`Unknown topic in notes: ${n.topic}`);
    await db.note.upsert({
      where: { topicId: tid },
      create: { topicId: tid, sections: n.sections, publishStatus: "PUBLISHED" },
      update: { sections: n.sections, publishStatus: "PUBLISHED" },
    });
  }

  console.log("Seeding formulas…");
  for (const f of [...PHYSICS_FORMULAS, ...CHEMISTRY_FORMULAS, ...MATHEMATICS_FORMULAS]) {
    const cid = chapterId[f.chapter];
    if (!cid) throw new Error(`Unknown chapter in formula ${f.slug}: ${f.chapter}`);
    const data = {
      chapterId: cid,
      topicId: f.topic ? topicId[f.topic] : null,
      name: f.name, expression: f.expression, variables: f.variables, siUnit: f.siUnit, dimensions: f.dimensions,
      origin: f.origin, interpretation: f.interpretation, whyItWorks: f.whyItWorks, whenToUse: f.whenToUse,
      whenNotToUse: f.whenNotToUse, conditions: f.conditions, assumptions: f.assumptions, specialCases: f.specialCases,
      relations: f.relations, graph: f.graph ?? null, graphKey: f.graphKey ?? null, basicExample: f.basicExample,
      jeeExample: f.jeeExample, trickyApplication: f.trickyApplication, commonMistakes: f.commonMistakes,
      shortcuts: f.shortcuts, limitations: f.limitations, publishStatus: "PUBLISHED" as const,
    };
    const formula = await db.formula.upsert({ where: { slug: f.slug }, create: { slug: f.slug, ...data }, update: data });
    await db.formulaDerivationStep.deleteMany({ where: { formulaId: formula.id } });
    await db.formulaDerivationStep.createMany({
      data: f.derivation.map((d, i) => ({ formulaId: formula.id, order: i, statement: d.statement, justification: d.justification })),
    });
  }

  console.log("Seeding comparisons…");
  for (const c of COMPARISONS) {
    const data = { title: c.title, chapterId: c.chapter ? chapterId[c.chapter] : null, leftTitle: c.leftTitle, rightTitle: c.rightTitle, rows: c.rows, summary: c.summary, publishStatus: "PUBLISHED" as const };
    await db.formulaComparison.upsert({ where: { slug: c.slug }, create: { slug: c.slug, ...data }, update: data });
  }

  console.log("Seeding animated lessons…");
  for (const a of ANIMATIONS) {
    const data = {
      title: a.title, subjectId: subjectId[a.subject], chapterId: a.chapter ? chapterId[a.chapter] : null,
      topicId: a.topic ? topicId[a.topic] : null, intro: a.intro, steps: a.steps, mathExplanation: a.math,
      realLife: a.realLife, jeeApplication: a.jee, publishStatus: "PUBLISHED" as const,
    };
    await db.animation.upsert({ where: { key: a.key }, create: { key: a.key, ...data }, update: data });
  }

  console.log("Seeding practice questions…");
  const topicChapter: Record<string, string> = {};
  for (const s of SYLLABUS) for (const c of s.chapters) for (const t of c.topics) topicChapter[t.slug ?? slugify(t.name)] = c.slug;

  const counters: Record<string, number> = {};
  const seededIds: { id: string; subject: string; type: QuestionType }[] = [];
  const all: QuestionSeed[] = [...PHYSICS_QUESTIONS, ...PHYSICS_QUESTIONS_2, ...CHEMISTRY_QUESTIONS, ...CHEMISTRY_QUESTIONS_2, ...MATHEMATICS_QUESTIONS, ...MATHEMATICS_QUESTIONS_2];
  for (const q of all) {
    const key = `${q.topic}-${q.level}`;
    counters[key] = (counters[key] ?? 0) + 1;
    const id = `seed-${q.topic}-l${q.level}-${counters[key]}`;
    const chSlug = topicChapter[q.topic];
    if (!chSlug) throw new Error(`Unknown topic in question: ${q.topic}`);
    if (q.type === "MCQ" && (q.options?.filter((o) => o.correct).length ?? 0) !== 1) throw new Error(`${id}: MCQ must have exactly one correct option`);
    if (q.type === "NUMERICAL" && typeof q.answer !== "number") throw new Error(`${id}: numerical answer missing`);
    const data = {
      source: "PRACTICE" as const, type: q.type, subjectId: subjectId[chapterSubject[chSlug]], chapterId: chapterId[chSlug],
      topicId: topicId[q.topic], level: q.level, difficulty: q.difficulty as Difficulty, statement: q.statement,
      numericalAnswer: q.answer ?? null, numericalTolerance: q.tolerance ?? 0.01, solution: q.solution, conceptTested: q.concept,
      formulaUsed: q.formula, whyFormula: q.whyFormula, altMethod: q.alt ?? null, commonMistakes: q.mistakes,
      approxTimeSec: q.time, publishStatus: "PUBLISHED" as const,
    };
    await db.question.upsert({ where: { id }, create: { id, ...data }, update: data });
    await syncOptions(db, id, (q.options ?? []).map((o) => ({ text: o.text, isCorrect: !!o.correct, explanation: o.why })));
    seededIds.push({ id, subject: chapterSubject[chSlug], type: q.type });
  }
  // related questions: others in the same topic
  const byTopic: Record<string, string[]> = {};
  for (const s of seededIds) {
    const t = s.id.replace(/^seed-/, "").replace(/-l\d-\d+$/, "");
    (byTopic[t] ??= []).push(s.id);
  }
  for (const ids of Object.values(byTopic)) {
    for (const id of ids) await db.question.update({ where: { id }, data: { relatedIds: ids.filter((x) => x !== id).slice(0, 4) } });
  }

  console.log("Seeding chemistry tools and flashcards…");
  for (const r of NAMED_REACTIONS) {
    const data = { name: r.name, chapterId: chapterId[r.chapter], reactant: r.reactant, reagents: r.reagents, product: r.product, equation: r.equation, mechanism: r.mechanism, notes: r.notes, publishStatus: "PUBLISHED" as const };
    await db.namedReaction.upsert({ where: { slug: r.slug }, create: { slug: r.slug, ...data }, update: data });
  }
  await db.inorganicException.deleteMany({});
  await db.inorganicException.createMany({
    data: INORGANIC_EXCEPTIONS.map((e) => ({ chapterId: chapterId[e.chapter], title: e.title, statement: e.statement, reason: e.reason, publishStatus: "PUBLISHED" as const })),
  });
  const existingCards = await db.conceptCard.count();
  if (existingCards === 0) {
    await db.conceptCard.createMany({
      data: CONCEPT_CARDS.map((c) => ({ chapterId: chapterId[c.chapter], front: c.front, back: c.back, publishStatus: "PUBLISHED" as const })),
    });
  }

  console.log("Seeding starter mock test…");
  const mockId = "seed-starter-mock-1";
  const pattern = {
    sections: ["physics", "chemistry", "mathematics"].map((subject) => ({ subject, mcq: 8, numerical: 2 })),
    marks: { correct: 4, incorrectMcq: -1, incorrectNumerical: -1, unattempted: 0 },
  };
  await db.mockExam.upsert({
    where: { id: mockId },
    create: { id: mockId, title: "Starter Mock 1 (30 questions)", kind: "CUSTOM", durationMin: 72, pattern, publishStatus: "PUBLISHED",
      description: "A shortened mock in the JEE Main format (MCQ + numerical, +4/−1) built from the current question bank. Full 75-question mocks become available as the bank grows." },
    update: { pattern, durationMin: 72, publishStatus: "PUBLISHED" },
  });
  // Never rebuild a mock that students have attempted — their result pages depend on its question list.
  const attempted = await db.mockAttempt.count({ where: { mockExamId: mockId } });
  if (!attempted) await db.mockExamQuestion.deleteMany({ where: { mockExamId: mockId } });
  let order = 0;
  for (const section of attempted ? [] : pattern.sections) {
    const pool = seededIds.filter((q) => q.subject === section.subject);
    // spread across levels: take every other question for variety
    // spread the picks evenly across the pool so every level and topic is represented
    const mcqPool = pool.filter((q) => q.type === "MCQ");
    const mcq = Array.from({ length: Math.min(section.mcq, mcqPool.length) }, (_, k) => mcqPool[Math.floor((k * mcqPool.length) / section.mcq)]);
    const num = pool.filter((q) => q.type === "NUMERICAL").slice(-section.numerical);
    for (const q of [...mcq, ...num]) {
      await db.mockExamQuestion.create({ data: { mockExamId: mockId, questionId: q.id, order: order++, section: section.subject } });
    }
  }

  console.log("Seeding full-length mock…");
  const fullId = "seed-full-mock-1";
  const fullPattern = {
    sections: ["physics", "chemistry", "mathematics"].map((subject) => ({ subject, mcq: 20, numerical: 5 })),
    marks: { correct: 4, incorrectMcq: -1, incorrectNumerical: -1, unattempted: 0 },
  };
  await db.mockExam.upsert({
    where: { id: fullId },
    create: { id: fullId, title: "Full Mock Test 1 (JEE Main pattern, 75 questions)", kind: "FULL", durationMin: 180, pattern: fullPattern, publishStatus: "PUBLISHED",
      description: "75 questions — 20 MCQ + 5 numerical per subject, 180 minutes, +4/−1 — assembled from the original practice bank." },
    update: { pattern: fullPattern, durationMin: 180, publishStatus: "PUBLISHED" },
  });
  const fullAttempted = await db.mockAttempt.count({ where: { mockExamId: fullId } });
  if (!fullAttempted) {
    await db.mockExamQuestion.deleteMany({ where: { mockExamId: fullId } });
    let o = 0;
    for (const section of fullPattern.sections) {
      const pool = seededIds.filter((q) => q.subject === section.subject);
      const pick = (type: QuestionType, n: number) => {
        const list = pool.filter((q) => q.type === type);
        if (list.length < n) throw new Error(`Full mock needs ${n} ${type} in ${section.subject}, have ${list.length}`);
        return Array.from({ length: n }, (_, k) => list[Math.floor((k * list.length) / n)]);
      };
      for (const q of [...pick("MCQ", section.mcq), ...pick("NUMERICAL", section.numerical)]) {
        await db.mockExamQuestion.create({ data: { mockExamId: fullId, questionId: q.id, order: o++, section: section.subject } });
      }
    }
  }

  console.log("Seeding accounts…");
  // Default demo passwords are published in the README, so they are only allowed outside production.
  const isProd = process.env.NODE_ENV === "production";
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@jee-edge.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? (isProd ? undefined : "Admin@JeeEdge2027");
  const studentEmail = process.env.SEED_STUDENT_EMAIL ?? "student@jee-edge.local";
  const studentPassword = process.env.SEED_STUDENT_PASSWORD ?? (isProd ? undefined : "Student@JeeEdge2027");
  for (const [email, password, name, role] of [
    [adminEmail, adminPassword, "Content Admin", "ADMIN"],
    [studentEmail, studentPassword, "Demo Student", "STUDENT"],
  ] as const) {
    if (!password) {
      console.log(`  skipped ${role.toLowerCase()} account: set SEED_${role === "ADMIN" ? "ADMIN" : "STUDENT"}_PASSWORD to create it in production`);
      continue;
    }
    if (isProd && password.length < 12) throw new Error(`SEED_${role}_PASSWORD must be at least 12 characters in production`);
    const existing = await db.user.findUnique({ where: { email } });
    if (!existing) {
      await db.user.create({
        data: { email, name, role, passwordHash: await bcrypt.hash(password, 12), profile: { create: { examDate: new Date("2027-01-20T09:00:00+05:30") } } },
      });
      console.log(`  created ${role.toLowerCase()} ${email}`);
    }
  }

  const counts = await Promise.all([db.chapter.count(), db.topic.count(), db.note.count(), db.formula.count(), db.question.count(), db.animation.count()]);
  console.log(`Done: ${counts[0]} chapters, ${counts[1]} topics, ${counts[2]} notes, ${counts[3]} formulas, ${counts[4]} questions, ${counts[5]} animated lessons.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
