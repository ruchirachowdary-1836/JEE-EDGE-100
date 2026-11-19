/**
 * JEE Advanced-style question formats.
 *
 * The IITs print the marking scheme on each paper and it has varied by year. The defaults below are the
 * schemes used in several recent papers (2019–2025) and are labelled as such wherever they are shown.
 */
export const ADVANCED_SCHEME = {
  multiple: { full: 4, wrong: -2, note: "Recent-paper scheme: +4 for exactly the correct set; otherwise, if no wrong option is chosen, +1 for each correct option chosen; −2 if any wrong option is chosen; 0 if unanswered." },
  match: { correct: 3, wrong: -1, note: "Recent-paper scheme for matching lists: +3 correct, −1 incorrect, 0 unanswered." },
} as const;

/**
 * Marks for a one-or-more-correct question.
 * Partial credit (only when no wrong option is chosen) equals the number of correct options chosen,
 * which reproduces the published rule: all four correct & three chosen → +3; three or more correct &
 * two chosen → +2; two or more correct & one chosen → +1.
 */
export function multipleMarks(selected: readonly string[], correct: readonly string[]) {
  const sel = new Set(selected);
  const cor = new Set(correct);
  if (sel.size === 0) return { marks: 0, fullyCorrect: false, attempted: false };
  if ([...sel].some((s) => !cor.has(s))) return { marks: ADVANCED_SCHEME.multiple.wrong, fullyCorrect: false, attempted: true };
  if (sel.size === cor.size) return { marks: ADVANCED_SCHEME.multiple.full, fullyCorrect: true, attempted: true };
  return { marks: sel.size, fullyCorrect: false, attempted: true };
}

export function matchMarks(selected: string | null, correct: string) {
  if (!selected) return { marks: 0, fullyCorrect: false, attempted: false };
  return selected === correct ? { marks: ADVANCED_SCHEME.match.correct, fullyCorrect: true, attempted: true } : { marks: ADVANCED_SCHEME.match.wrong, fullyCorrect: false, attempted: true };
}

export type QType = "MCQ" | "NUMERICAL" | "MULTIPLE" | "MATCH";
export const TYPE_LABEL: Record<QType, string> = {
  MCQ: "Single correct",
  NUMERICAL: "Numerical value",
  MULTIPLE: "One or more correct (JEE Advanced)",
  MATCH: "Matching list (JEE Advanced)",
};
/** Formats used in the JEE Main paper; the others appear only in the Gym's Advanced-style practice. */
export const MAIN_TYPES: QType[] = ["MCQ", "NUMERICAL"];
