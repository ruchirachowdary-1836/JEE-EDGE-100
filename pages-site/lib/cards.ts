import { FORMULAS, CONCEPT_CARDS, NAMED_REACTIONS, chapterBySlug } from "./data";

export type DeckCard = { key: string; deck: "FORMULA" | "CONCEPT" | "REACTION"; front: string; frontSub: string; back: string; subject: string; chapter: string; chapterName: string };

// Stable card ids: formula and reaction slugs, and a slug of the concept card's question.
const conceptId = (front: string) => front.toLowerCase().replace(/\$[^$]*\$/g, "m").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
const ch = (slug: string) => chapterBySlug(slug);

export const DECK_CARDS: DeckCard[] = [
  ...FORMULAS.map((f) => ({ key: `FORMULA:${f.slug}`, deck: "FORMULA" as const, front: f.name, frontSub: "", back: `$$${f.expression}$$\n\n**Use when:** ${f.whenToUse}\n\n**Not when:** ${f.whenNotToUse}`, subject: ch(f.chapter)?.subject ?? "physics", chapter: f.chapter, chapterName: ch(f.chapter)?.name ?? "" })),
  ...CONCEPT_CARDS.map((c) => ({ key: `CONCEPT:${conceptId(c.front)}`, deck: "CONCEPT" as const, front: c.front, frontSub: "", back: c.back, subject: ch(c.chapter)?.subject ?? "physics", chapter: c.chapter, chapterName: ch(c.chapter)?.name ?? "" })),
  ...NAMED_REACTIONS.map((r) => ({ key: `REACTION:${r.slug}`, deck: "REACTION" as const, front: r.name, frontSub: `${r.reactant} → ?`, back: `$$${r.equation}$$\n\n**Reagents and conditions:** ${r.reagents}\n\n**Product:** ${r.product}\n\n${r.notes}`, subject: "chemistry", chapter: r.chapter, chapterName: ch(r.chapter)?.name ?? "" })),
];
