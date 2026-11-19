import { z } from "zod";

const text = (min = 1, max = 20000) => z.string().trim().min(min).max(max);
export const worked = z.object({ problem: text(), solution: text() });

export const formulaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{3,80}$/, "slug: lowercase letters, digits and hyphens"),
  chapterSlug: z.string().min(1),
  topicSlug: z.string().optional().nullable(),
  name: text(3, 200),
  expression: text(1, 2000),
  variables: z.array(z.object({ symbol: text(1, 100), meaning: text(1, 500), unit: z.string().max(100) })).min(1, "List every variable"),
  siUnit: text(), dimensions: text(), origin: text(),
  derivation: z.array(z.object({ statement: text(1, 2000), justification: text(1, 2000) })).min(1, "Add at least one derivation step"),
  interpretation: text(), whyItWorks: text(), whenToUse: text(), whenNotToUse: text(), conditions: text(), assumptions: text(), specialCases: text(),
  relations: z.array(z.object({ slug: z.string().optional(), text: text(1, 1000) })),
  graph: z.string().max(5000).optional().nullable(),
  graphKey: z.string().max(40).optional().nullable(),
  basicExample: worked, jeeExample: worked, trickyApplication: worked,
  commonMistakes: text(), shortcuts: text(), limitations: text(),
});

const option = z.object({ text: text(1, 2000), isCorrect: z.boolean(), explanation: z.string().max(4000).default("") });

export const questionSchema = z
  .object({
    id: z.string().optional(),
    source: z.enum(["PRACTICE", "PYQ"]),
    type: z.enum(["MCQ", "NUMERICAL", "MULTIPLE", "MATCH"]),
    matchLists: z.object({ left: z.array(z.string().min(1)).min(2).max(6), right: z.array(z.string().min(1)).min(2).max(6) }).optional().nullable(),
    chapterSlug: z.string().min(1),
    topicSlug: z.string().optional().nullable(),
    level: z.number().int().min(1).max(5).optional().nullable(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    statement: text(5),
    options: z.array(option).default([]),
    numericalAnswer: z.number().finite().optional().nullable(),
    numericalTolerance: z.number().min(0).max(1000).default(0.01),
    solution: text(5), conceptTested: text(), formulaUsed: text(), whyFormula: text(),
    altMethod: z.string().max(10000).optional().nullable(),
    commonMistakes: text(),
    approxTimeSec: z.number().int().min(10).max(1800).default(120),
    pyqYear: z.number().int().min(2002).max(2100).optional().nullable(),
    pyqSession: z.string().max(60).optional().nullable(),
    pyqShift: z.string().max(60).optional().nullable(),
    pyqDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
    sourceAttribution: z.string().max(500).optional().nullable(),
  })
  .superRefine((q, ctx) => {
    if (q.type !== "NUMERICAL") {
      const n = q.options.filter((o) => o.isCorrect).length;
      if (q.options.length < 2) ctx.addIssue({ code: "custom", path: ["options"], message: "Option questions need at least 2 options" });
      if ((q.type === "MCQ" || q.type === "MATCH") && n !== 1) ctx.addIssue({ code: "custom", path: ["options"], message: "Exactly one option must be correct" });
      if (q.type === "MULTIPLE" && n < 1) ctx.addIssue({ code: "custom", path: ["options"], message: "At least one option must be correct" });
      if (q.type === "MATCH" && !q.matchLists) ctx.addIssue({ code: "custom", path: ["matchLists"], message: "Matching-list questions need List-I and List-II" });
      if (q.type !== "MCQ" && q.source === "PYQ") ctx.addIssue({ code: "custom", path: ["type"], message: "JEE Main PYQs are single-correct or numerical" });
    } else if (q.numericalAnswer === null || q.numericalAnswer === undefined) {
      ctx.addIssue({ code: "custom", path: ["numericalAnswer"], message: "Numerical questions need an answer" });
    }
    if (q.source === "PYQ") {
      if (!q.pyqYear) ctx.addIssue({ code: "custom", path: ["pyqYear"], message: "PYQs need the exam year" });
      if (!q.pyqSession) ctx.addIssue({ code: "custom", path: ["pyqSession"], message: "PYQs need the session (e.g. January)" });
      if (!q.pyqShift) ctx.addIssue({ code: "custom", path: ["pyqShift"], message: "PYQs need the shift" });
      if (!q.sourceAttribution || q.sourceAttribution.trim().length < 5) ctx.addIssue({ code: "custom", path: ["sourceAttribution"], message: "PYQs need a source attribution (licensed/official source)" });
    }
    if (q.source === "PRACTICE" && !q.level) ctx.addIssue({ code: "custom", path: ["level"], message: "Practice questions need a Gym level (1–5)" });
  });

export const noteSchema = z.object({
  topicId: z.string().min(1),
  sections: z.array(z.object({ key: z.string().regex(/^[a-zA-Z0-9_-]{2,40}$/), title: text(2, 120), body: z.string().max(40000), animationKey: z.string().max(40).optional().nullable() })).min(1),
});

export const animationSchema = z.object({
  key: z.string().min(1),
  title: text(3, 200),
  subjectSlug: z.string().min(1),
  chapterSlug: z.string().optional().nullable(),
  topicSlug: z.string().optional().nullable(),
  intro: text(), mathExplanation: text(), realLife: text(), jeeApplication: text(),
  steps: z.array(z.object({ title: text(2, 200), body: text(2, 4000) })).min(1),
});
