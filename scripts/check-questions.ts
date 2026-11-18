/* Validates the practice bank: KaTeX compiles everywhere, MCQs have exactly one correct option. */
import katex from "katex";
import { PHYSICS_QUESTIONS } from "../content/questions-physics";
import { PHYSICS_QUESTIONS_2 } from "../content/questions-physics-2";
import { CHEMISTRY_QUESTIONS } from "../content/questions-chemistry";
import { CHEMISTRY_QUESTIONS_2 } from "../content/questions-chemistry-2";
import { MATHEMATICS_QUESTIONS } from "../content/questions-mathematics";
import { MATHEMATICS_QUESTIONS_2 } from "../content/questions-mathematics-2";

const all = [...PHYSICS_QUESTIONS, ...PHYSICS_QUESTIONS_2, ...CHEMISTRY_QUESTIONS, ...CHEMISTRY_QUESTIONS_2, ...MATHEMATICS_QUESTIONS, ...MATHEMATICS_QUESTIONS_2];
let errors = 0;
const check = (where: string, text?: string) => {
  if (!text) return;
  for (const b of text.split(/\n\s*\n/)) {
    const t = b.trim();
    const maths: [string, boolean][] = /^(\$\$[\s\S]+?\$\$\s*)+$/.test(t)
      ? [...t.matchAll(/\$\$([\s\S]+?)\$\$/g)].map((m) => [m[1], true] as [string, boolean])
      : [...t.matchAll(/\$[^$]+\$/g)].map((m) => [m[0].slice(1, -1), false] as [string, boolean]);
    for (const [src, d] of maths) {
      try { katex.renderToString(src, { displayMode: d, throwOnError: true, strict: "ignore" }); }
      catch (e) { errors++; console.log(`${where}: ${(e as Error).message.split("\n")[0]}`); }
    }
  }
};
all.forEach((q, i) => {
  const id = `${q.topic} L${q.level} #${i}`;
  if (q.type === "MCQ" && q.options?.filter((o) => o.correct).length !== 1) { errors++; console.log(`${id}: needs exactly one correct option`); }
  if (q.type === "NUMERICAL" && typeof q.answer !== "number") { errors++; console.log(`${id}: missing answer`); }
  [q.statement, q.solution, q.concept, q.formula, q.whyFormula, q.alt, q.mistakes, ...(q.options ?? []).flatMap((o) => [o.text, o.why])].forEach((t) => check(id, t));
});
const by = (s: string, t: string) => all.filter((q) => (s === "p" ? [...PHYSICS_QUESTIONS, ...PHYSICS_QUESTIONS_2] : s === "c" ? [...CHEMISTRY_QUESTIONS, ...CHEMISTRY_QUESTIONS_2] : [...MATHEMATICS_QUESTIONS, ...MATHEMATICS_QUESTIONS_2]).includes(q) && q.type === t).length;
console.log(`${all.length} questions; MCQ/NUM — physics ${by("p", "MCQ")}/${by("p", "NUMERICAL")}, chemistry ${by("c", "MCQ")}/${by("c", "NUMERICAL")}, maths ${by("m", "MCQ")}/${by("m", "NUMERICAL")}; ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
