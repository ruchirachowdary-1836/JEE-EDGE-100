/* Prints the key (topic:level:n) and answer of every numerical question — used to maintain tests/verify-answers.ts. */
import { ALL_QUESTIONS } from "../content/questions";

const seen: Record<string, number> = {};
for (const q of ALL_QUESTIONS) {
  const b = `${q.topic}:${q.level}`;
  seen[b] = (seen[b] ?? 0) + 1;
  if (q.type === "NUMERICAL") console.log(`${b}:${seen[b]} = ${q.answer}`);
}
