/* Writes every topic's formula-sheet section to one text file for review. Usage: npx tsx scripts/dump-formula-sheets.ts <out.txt> */
import fs from "node:fs";
import { PHYSICS_NOTES } from "../content/notes-physics";
import { CHEMISTRY_NOTES } from "../content/notes-chemistry";
import { MATHEMATICS_NOTES } from "../content/notes-mathematics";

const out: string[] = [];
for (const n of [...PHYSICS_NOTES, ...CHEMISTRY_NOTES, ...MATHEMATICS_NOTES]) {
  const s = n.sections.find((x) => /formula/i.test(x.key) || /formula/i.test(x.title));
  if (s) out.push(`### ${n.topic}\n${s.body}\n`);
}
fs.writeFileSync(process.argv[2] ?? "formula-sheets.txt", out.join("\n"));
console.log(`${out.length} formula sheets, ${out.join("").length} characters`);
