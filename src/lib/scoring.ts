import type { ExamPattern } from "./config";

export type MarkScheme = ExamPattern["marks"];

export function isNumericalCorrect(response: number, answer: number, tolerance: number) {
  return Math.abs(response - answer) <= Math.max(tolerance, 1e-9);
}

export function marksFor(
  /** JEE Main marking. Option-based types are scored as single selections (multiple-correct questions are never put in JEE Main mocks). */
  q: { type: "MCQ" | "NUMERICAL" | "MULTIPLE" | "MATCH"; numericalAnswer: number | null; numericalTolerance: number; options: { id: string; isCorrect: boolean }[] },
  r: { selectedOptionId: string | null; numericalResponse: number | null },
  scheme: MarkScheme,
): { attempted: boolean; isCorrect: boolean | null; marks: number } {
  if (q.type !== "NUMERICAL") {
    if (!r.selectedOptionId) return { attempted: false, isCorrect: null, marks: scheme.unattempted };
    const ok = q.options.some((o) => o.id === r.selectedOptionId && o.isCorrect);
    return { attempted: true, isCorrect: ok, marks: ok ? scheme.correct : scheme.incorrectMcq };
  }
  if (r.numericalResponse === null || r.numericalResponse === undefined || Number.isNaN(r.numericalResponse))
    return { attempted: false, isCorrect: null, marks: scheme.unattempted };
  const ok = q.numericalAnswer !== null && isNumericalCorrect(r.numericalResponse, q.numericalAnswer, q.numericalTolerance);
  return { attempted: true, isCorrect: ok, marks: ok ? scheme.correct : scheme.incorrectNumerical };
}
