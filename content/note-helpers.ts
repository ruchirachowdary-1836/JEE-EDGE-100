import type { NoteSeed, NoteSection } from "./types";

/** Standard section order for master notes. "formulas" is the topic's formula sheet. */
export const NOTE_ORDER: [string, string][] = [
  ["introduction", "Introduction"],
  ["prerequisites", "Prerequisite knowledge"],
  ["concept", "Concept from the basics"],
  ["theory", "Detailed theory"],
  ["definitions", "Definitions"],
  ["principles", "Important principles"],
  ["derivations", "Derivations"],
  ["formulas", "Formula sheet"],
  ["diagrams", "Diagram"],
  ["graphs", "Graphs"],
  ["specialCases", "Special cases"],
  ["exceptions", "Exceptions"],
  ["assumptions", "Assumptions and limitations"],
  ["applications", "Applications"],
  ["patterns", "JEE Main question patterns"],
  ["misconceptions", "Common misconceptions"],
  ["traps", "Common examination traps"],
  ["summary", "Quick revision summary"],
];

/** Builds a note in the standard order. Bodies are written with String.raw so LaTeX needs single backslashes. */
export function note(topic: string, parts: Record<string, string>, animations: Record<string, string> = {}): NoteSeed {
  const sections: NoteSection[] = NOTE_ORDER.filter(([k]) => parts[k]?.trim()).map(([key, title]) => ({
    key,
    title,
    body: parts[key].trim().replace(/\n[ \t]+/g, "\n"),
    ...(animations[key] ? { animationKey: animations[key] } : {}),
  }));
  return { topic, sections };
}

/** Inserts (or replaces) a formula-sheet section into an existing note, after "derivations". */
export function withFormulaSheet(n: NoteSeed, body: string): NoteSeed {
  const rest = n.sections.filter((s) => s.key !== "formulas");
  const i = rest.findIndex((s) => s.key === "derivations");
  const sheet: NoteSection = { key: "formulas", title: "Formula sheet", body: body.trim().replace(/\n[ \t]+/g, "\n") };
  return { ...n, sections: [...rest.slice(0, i + 1), sheet, ...rest.slice(i + 1)] };
}

export const r = String.raw;
