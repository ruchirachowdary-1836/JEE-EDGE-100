"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw, PartyPopper } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { api } from "@/lib/client";
import { cn, SUBJECT_META } from "@/lib/utils";

export type Card = { type: "FORMULA" | "CONCEPT" | "REACTION"; id: string; front: string; frontSub: string; back: string; subject: string; due: boolean; isNew: boolean };

const GRADES = [
  { g: 0, label: "Again", hint: "forgot", cls: "bg-rose-500 hover:bg-rose-600" },
  { g: 1, label: "Hard", hint: "struggled", cls: "bg-amber-500 hover:bg-amber-600" },
  { g: 2, label: "Good", hint: "recalled", cls: "bg-electric-500 hover:bg-electric-600" },
  { g: 3, label: "Easy", hint: "instant", cls: "bg-emerald-500 hover:bg-emerald-600" },
] as const;

export function Flashcards({ cards }: { cards: Card[] }) {
  const [subject, setSubject] = useState("");
  const [includeAll, setIncludeAll] = useState(false);
  const queue0 = useMemo(() => cards.filter((c) => (includeAll || c.due) && (!subject || c.subject === subject)), [cards, includeAll, subject]);
  const [queue, setQueue] = useState<Card[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const q = queue ?? queue0;
  const card = q[0];

  const grade = async (g: number) => {
    if (!card) return;
    setFlipped(false);
    const rest = q.slice(1);
    // "Again" puts the card back near the end of this session
    setQueue(g === 0 ? [...rest, card] : rest);
    if (g !== 0) setDone((d) => d + 1);
    await api("/api/revision/review", { body: { cardType: card.type, itemId: card.id, grade: g } }).catch(() => {});
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select className="input !w-auto" value={subject} onChange={(e) => { setSubject(e.target.value); setQueue(null); }}>
          <option value="">All subjects</option>{Object.entries(SUBJECT_META).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-electric-500" checked={includeAll} onChange={(e) => { setIncludeAll(e.target.checked); setQueue(null); }} /> Include cards not yet due (cram mode)</label>
        <span className="muted ml-auto text-sm">{done} reviewed · {q.length} left</span>
      </div>

      {!card ? (
        <div className="card card-pad flex flex-col items-center py-12 text-center">
          <PartyPopper className="mb-2 text-emerald-500" size={32} />
          <div className="h2">All caught up</div>
          <p className="muted text-sm">No cards are due right now. Come back later, or turn on cram mode.</p>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.button key={card.id + String(flipped)} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              onClick={() => setFlipped(!flipped)} className="card card-pad block min-h-[260px] w-full text-left">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="muted">{card.frontSub}</span>
                <span className="flex gap-1">{card.isNew && <span className="chip bg-violet-500/10 text-violet-500">new</span>}<span className="chip bg-[var(--surface-2)]">{flipped ? "answer" : "question"}</span></span>
              </div>
              {flipped ? <Rich text={card.back} /> : (
                <div className="grid min-h-[180px] place-items-center text-center">
                  <div>
                    <div className="font-display text-2xl font-semibold"><Inline text={card.front} /></div>
                    <div className="muted mt-3 flex items-center justify-center gap-1 text-sm"><RotateCw size={14} /> tap to reveal</div>
                  </div>
                </div>
              )}
            </motion.button>
          </AnimatePresence>
          <div className={cn("mt-4 grid grid-cols-4 gap-2 transition", !flipped && "pointer-events-none opacity-40")}>
            {GRADES.map((g) => (
              <button key={g.g} onClick={() => grade(g.g)} className={cn("btn flex-col !gap-0 text-white", g.cls)}>
                {g.label}<span className="text-[10px] font-normal opacity-80">{g.hint}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
