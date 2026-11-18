import { PageHeader } from "@/components/ui";
import { FORMULAS, CONCEPT_CARDS, NAMED_REACTIONS, chapterBySlug } from "@site/lib/data";
import type { Card } from "@/app/(app)/revision/Flashcards";
import { DeckPicker } from "./DeckPicker";

export const metadata = { title: "Flashcards" };

export default function RevisionPage() {
  const decks: Record<string, Card[]> = {
    FORMULA: FORMULAS.map((f) => ({ type: "FORMULA", id: f.slug, front: f.name, frontSub: chapterBySlug(f.chapter)?.name ?? "", back: `$$${f.expression}$$\n\n**Use when:** ${f.whenToUse}\n\n**Not when:** ${f.whenNotToUse}`, subject: chapterBySlug(f.chapter)?.subject ?? "physics", due: true, isNew: false })),
    CONCEPT: CONCEPT_CARDS.map((c, i) => ({ type: "CONCEPT", id: String(i), front: c.front, frontSub: chapterBySlug(c.chapter)?.name ?? "", back: c.back, subject: chapterBySlug(c.chapter)?.subject ?? "physics", due: true, isNew: false })),
    REACTION: NAMED_REACTIONS.map((r) => ({ type: "REACTION", id: r.slug, front: r.name, frontSub: `${r.reactant} → ?`, back: `$$${r.equation}$$\n\n**Reagents:** ${r.reagents}\n\n**Product:** ${r.product}\n\n${r.notes}`, subject: "chemistry", due: true, isNew: false })),
  };
  return (
    <div>
      <PageHeader eyebrow="Revision" title="Flashcards" subtitle="Tap a card to reveal it, then grade yourself. In the full app your grades schedule each card with spaced repetition; here the deck simply cycles cards you mark “Again”." />
      <DeckPicker decks={decks} />
    </div>
  );
}
