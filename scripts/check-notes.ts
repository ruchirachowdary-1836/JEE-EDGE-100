/* Validates notes: topic slugs exist and every $…$ / $$…$$ compiles in KaTeX. Usage: npx tsx scripts/check-notes.ts */
import katex from "katex";
import { SYLLABUS } from "../content/syllabus";
import { PHYSICS_NOTES } from "../content/notes-physics";
import { CHEMISTRY_NOTES } from "../content/notes-chemistry";
import { MATHEMATICS_NOTES } from "../content/notes-mathematics";

const slugify = (s: string) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const used = new Set<string>();
for (const s of SYLLABUS) for (const c of s.chapters) for (const t of c.topics) {
  let slug = t.slug ?? slugify(t.name);
  if (used.has(slug)) slug = `${slug}-${c.slug}`;
  used.add(slug);
}
let errors = 0;
const all = [...PHYSICS_NOTES, ...CHEMISTRY_NOTES, ...MATHEMATICS_NOTES];
for (const n of all) {
  if (!used.has(n.topic)) { console.log(`Unknown topic slug: ${n.topic}`); errors++; }
  for (const s of n.sections) {
    const blocks = s.body.split(/\n\s*\n/);
    for (const b of blocks) {
      const t = b.trim();
      const maths: [string, boolean][] = [];
      if (/^(\$\$[\s\S]+?\$\$\s*)+$/.test(t)) for (const m of t.matchAll(/\$\$([\s\S]+?)\$\$/g)) maths.push([m[1], true]);
      else for (const m of t.matchAll(/\$[^$]+\$/g)) maths.push([m[0].slice(1, -1), false]);
      for (const [src, display] of maths) {
        try { katex.renderToString(src, { displayMode: display, throwOnError: true, strict: "ignore" }); }
        catch (e) { errors++; console.log(`${n.topic}/${s.key}: ${(e as Error).message.split("\n")[0]}  ⟶  ${src.slice(0, 80)}`); }
      }
      if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(t)) { errors++; console.log(`${n.topic}/${s.key}: control character found`); }
    }
  }
}
console.log(`${all.length} notes checked, ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
