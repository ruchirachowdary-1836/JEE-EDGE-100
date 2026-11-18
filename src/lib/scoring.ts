import type { ExamPattern } from "./config";

export type MarkScheme = ExamPattern["marks"];

export function isNumericalCorrect(response: number, answer: number, tolerance: number) {
  return Math.abs(response - answer) <= Math.max(tolerance, 1e-9);
}

export function marksFor(
  q: { type: "MCQ" | "NUMERICAL"; numericalAnswer: number | null; numericalTolerance: number; options: { id: string; isCorrect: boolean }[] },
  r: { selectedOptionId: string | null; numericalResponse: number | null },
  scheme: MarkScheme,
): { attempted: boolean; isCorrect: boolean | null; marks: number } {
  if (q.type === "MCQ") {
    if (!r.selectedOptionId) return { attempted: false, isCorrect: null, marks: scheme.unattempted };
    const ok = q.options.some((o) => o.id === r.selectedOptionId && o.isCorrect);
    return { attempted: true, isCorrect: ok, marks: ok ? scheme.correct : scheme.incorrectMcq };
  }
  if (r.numericalResponse === null || r.numericalResponse === undefined || Number.isNaN(r.numericalResponse))
    return { attempted: false, isCorrect: null, marks: scheme.unattempted };
  const ok = q.numericalAnswer !== null && isNumericalCorrect(r.numericalResponse, q.numericalAnswer, q.numericalTolerance);
  return { attempted: true, isCorrect: ok, marks: ok ? scheme.correct : scheme.incorrectNumerical };
}
