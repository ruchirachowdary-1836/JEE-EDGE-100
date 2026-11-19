import "server-only";
import type { Prisma } from "@prisma/client";

/** Fields safe to send before the student answers: no correctness flags, explanations or solutions. */
export const QUESTION_PUBLIC_SELECT = {
  id: true, type: true, statement: true, level: true, difficulty: true, approxTimeSec: true, source: true,
  pyqYear: true, pyqSession: true, pyqShift: true, sourceAttribution: true, matchLists: true,
  chapter: { select: { name: true, slug: true } },
  topic: { select: { name: true, slug: true } },
  subject: { select: { slug: true } },
  options: { select: { id: true, label: true, text: true }, orderBy: { order: "asc" } },
} satisfies Prisma.QuestionSelect;

export type PublicQuestion = Prisma.QuestionGetPayload<{ select: typeof QUESTION_PUBLIC_SELECT }>;

export type Reveal = {
  isCorrect: boolean;
  /** JEE Advanced marks for MULTIPLE/MATCH questions (null otherwise) */
  marks: number | null;
  markScheme: string | null;
  correctOptionId: string | null;
  correctAnswerText: string;
  numericalAnswer: number | null;
  solution: string;
  conceptTested: string;
  formulaUsed: string;
  whyFormula: string;
  altMethod: string | null;
  commonMistakes: string;
  approxTimeSec: number;
  options: { id: string; label: string; isCorrect: boolean; explanation: string }[];
  related: { id: string; statement: string; topicSlug: string | null }[];
};
