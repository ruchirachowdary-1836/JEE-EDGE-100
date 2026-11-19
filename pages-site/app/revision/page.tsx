import { PageHeader } from "@/components/ui";
import { CHAPTERS } from "@site/lib/data";
import { DECK_CARDS } from "@site/lib/cards";
import { StaticFlashcards } from "./StaticFlashcards";

export const metadata = { title: "Flashcards" };

export default function RevisionPage() {
  return (
    <div>
      <PageHeader eyebrow="Revision" title="Flashcards"
        subtitle="Spaced repetition: after revealing a card, grade your recall. Again brings it back in 10 minutes; Hard, Good and Easy push it 1, 3 and then progressively more days out (up to 45). Missed reviews come first. Your schedule and history are saved in this browser." />
      <StaticFlashcards cards={DECK_CARDS} chapters={CHAPTERS.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject }))} />
    </div>
  );
}
