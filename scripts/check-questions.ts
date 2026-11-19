/* Validates the practice bank: KaTeX compiles everywhere, MCQs have exactly one correct option. */
import katex from "katex";
import { ALL_QUESTIONS, PHYSICS_ALL, CHEMISTRY_ALL, MATHEMATICS_ALL } from "../content/questions";
import { SYLLABUS } from "../content/syllabus";

const all = ALL_QUESTIONS;
const slugify = (s: string) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const topicSlugs = new Set<string>();
for (const s of SYLLABUS) for (const c of s.chapters) for (const t of c.topics) { let sl = t.slug ?? slugify(t.name); if (topicSlugs.has(sl)) sl = `${sl}-${c.slug}`; topicSlugs.add(sl); }
const seenStatements = new Map<string, number>();
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
  if (!topicSlugs.has(q.topic)) { errors++; console.log(`${id}: unknown topic slug "${q.topic}"`); }
  if (q.type === "MCQ" && q.options?.some((o) => !o.why?.trim())) { errors++; console.log(`${id}: every option needs an explanation`); }
  const key = q.statement.replace(/\s+/g, " ").trim();
  if (seenStatements.has(key)) { errors++; console.log(`${id}: duplicate statement (also #${seenStatements.get(key)})`); } else seenStatements.set(key, i);
  [q.statement, q.solution, q.concept, q.formula, q.whyFormula, q.alt, q.mistakes, ...(q.options ?? []).flatMap((o) => [o.text, o.why])].forEach((t) => check(id, t));
});
const by = (s: string, t: string) => all.filter((q) => (s === "p" ? PHYSICS_ALL : s === "c" ? CHEMISTRY_ALL : MATHEMATICS_ALL).includes(q) && q.type === t).length;
console.log(`${all.length} questions; MCQ/NUM — physics ${by("p", "MCQ")}/${by("p", "NUMERICAL")}, chemistry ${by("c", "MCQ")}/${by("c", "NUMERICAL")}, maths ${by("m", "MCQ")}/${by("m", "NUMERICAL")}; ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
