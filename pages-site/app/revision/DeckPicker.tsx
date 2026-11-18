"use client";

import { useEffect, useState } from "react";
import { Flashcards, type Card } from "@/app/(app)/revision/Flashcards";
import { cn } from "@/lib/utils";

const LABEL: Record<string, string> = { FORMULA: "Formulas", CONCEPT: "Concepts", REACTION: "Reactions" };

export function DeckPicker({ decks }: { decks: Record<string, Card[]> }) {
  const [deck, setDeck] = useState("FORMULA");
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("deck");
    if (d && decks[d]) setDeck(d);
  }, [decks]);
  return (
    <div>
      <div className="mb-5 flex justify-center gap-2">
        {Object.keys(decks).map((k) => (
          <button key={k} onClick={() => setDeck(k)} className={cn("btn-ghost", deck === k && "!border-electric-500 !text-electric-500")}>{LABEL[k]} ({decks[k].length})</button>
        ))}
      </div>
      <Flashcards key={deck} cards={decks[deck]} />
    </div>
  );
}
