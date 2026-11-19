/* Prints which chapters and topics have Question Gym questions, per level. Run: npx tsx scripts/list-coverage.ts */
import { SYLLABUS } from "../content/syllabus";
import { ALL_QUESTIONS } from "../content/questions";

const slugify = (s: string) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const seen = new Set<string>();
let chaptersCovered = 0, chapters = 0, topicsCovered = 0, topics = 0;
const full = process.argv.includes("--all");
for (const s of SYLLABUS) for (const c of s.chapters) {
  chapters++;
  const rows = c.topics.map((t) => {
    let slug = t.slug ?? slugify(t.name);
    if (seen.has(slug)) slug = `${slug}-${c.slug}`;
    seen.add(slug);
    const qs = ALL_QUESTIONS.filter((q) => q.topic === slug);
    topics++; if (qs.length) topicsCovered++;
    const levels = [1, 2, 3, 4, 5].map((l) => qs.filter((q) => q.level === l).length).join("/");
    return { slug, n: qs.length, levels };
  });
  const cov = rows.some((r) => r.n);
  if (cov) chaptersCovered++;
  if (full || !cov) console.log(`${cov ? "✓" : "✗"} ${s.slug} ${c.slug}: ${rows.map((r) => `${r.slug}${r.n ? ` [${r.levels}]` : ""}`).join(", ")}`);
}
console.log(`\n${ALL_QUESTIONS.length} questions · chapters with questions ${chaptersCovered}/${chapters} · topics with questions ${topicsCovered}/${topics}`);
