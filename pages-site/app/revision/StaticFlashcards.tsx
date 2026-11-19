"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw, PartyPopper, History, AlertTriangle } from "lucide-react";
import { Rich, Inline } from "@/components/Rich";
import { cn, SUBJECT_META } from "@/lib/utils";
import type { Grade } from "@/lib/srs";
import { buildQueue, cardStatus, load, previewIntervals, reviewCard, storageAvailable, subscribe } from "@site/lib/progress";

import type { DeckCard } from "@site/lib/cards";

const GRADES = [
  { g: 0 as Grade, label: "Again", hint: "forgot", cls: "bg-rose-500 hover:bg-rose-600" },
  { g: 1 as Grade, label: "Hard", hint: "struggled", cls: "bg-amber-500 hover:bg-amber-600" },
  { g: 2 as Grade, label: "Good", hint: "recalled", cls: "bg-electric-500 hover:bg-electric-600" },
  { g: 3 as Grade, label: "Easy", hint: "instant", cls: "bg-emerald-500 hover:bg-emerald-600" },
];
const DECKS: Record<string, string> = { ALL: "All decks", FORMULA: "Formulas", CONCEPT: "Concepts", REACTION: "Reactions" };
const NEW_PER_DAY = 20;

const fmtInterval = (days: number, dueAt: Date) => {
  if (days === 0) return `${Math.max(1, Math.round((dueAt.getTime() - Date.now()) / 60000))} min`;
  return days === 1 ? "1 day" : days < 30 ? `${days} days` : `${(days / 30).toFixed(1)} mo`;
};
const fmtDate = (t: number) => new Date(t).toLocaleDateString(undefined, { day: "numeric", month: "short" });

function useVersion() {
  // re-render whenever the progress store changes (this tab or another tab)
  return useSyncExternalStore(subscribe, () => load(), () => null);
}

export function StaticFlashcards({ cards, chapters }: { cards: DeckCard[]; chapters: { slug: string; name: string; subject: string }[] }) {
  const store = useVersion();
  const [ready, setReady] = useState(false);
  const [deck, setDeck] = useState("ALL");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [session, setSession] = useState<string[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [persistent, setPersistent] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setReady(true);
    setPersistent(storageAvailable());
    const d = new URLSearchParams(window.location.search).get("deck");
    if (d && DECKS[d]) setDeck(d);
  }, []);

  const filtered = useMemo(() => cards.filter((c) => (deck === "ALL" || c.deck === deck) && (!subject || c.subject === subject) && (!chapter || c.chapter === chapter)), [cards, deck, subject, chapter]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { queue, counts } = useMemo(() => (ready ? buildQueue(filtered, NEW_PER_DAY) : { queue: [], counts: { learning: 0, overdue: 0, due: 0, new: 0, newAllowed: 0, scheduled: 0 } }), [filtered, ready, store]);
  const byKey = useMemo(() => new Map(cards.map((c) => [c.key, c])), [cards]);

  // a session is fixed when it starts so cards do not jump around; "Again" re-queues at the end
  const active = session ?? queue.map((c) => c.key);
  const card = active.length ? byKey.get(active[0]) : undefined;
  const resetSession = () => { setSession(null); setFlipped(false); };

  const grade = (g: Grade) => {
    if (!card) return;
    reviewCard(card.key, g);
    setFlipped(false);
    setReviewed((n) => n + 1);
    const rest = active.slice(1);
    setSession(g === 0 ? [...rest, card.key] : rest);
  };

  useEffect(() => {
    if (!card || !flipped) return;
    const onKey = (e: KeyboardEvent) => { const i = ["1", "2", "3", "4"].indexOf(e.key); if (i >= 0) grade(i as Grade); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const preview = card && ready ? previewIntervals(card.key) : null;
  const st = card && ready ? cardStatus(card.key) : null;
  const chapterOptions = chapters.filter((c) => (!subject || c.subject === subject) && cards.some((k) => k.chapter === c.slug && (deck === "ALL" || k.deck === deck)));
  const history = (store?.history ?? []).slice(-40).reverse();

  return (
    <div className="mx-auto max-w-3xl">
      {!persistent && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-800 dark:text-amber-200">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" /> This browser is blocking storage (private mode or blocked site data), so reviews will be lost when you close the tab.
        </div>
      )}
      <div className="mb-3 flex flex-wrap gap-2">
        {Object.entries(DECKS).map(([k, v]) => (
          <button key={k} onClick={() => { setDeck(k); setChapter(""); resetSession(); }} className={cn("btn-ghost !py-1.5 text-sm", deck === k && "!border-electric-500 !text-electric-500")}>
            {v} ({k === "ALL" ? cards.length : cards.filter((c) => c.deck === k).length})
          </button>
        ))}
      </div>
      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        <select className="input" aria-label="Subject" value={subject} onChange={(e) => { setSubject(e.target.value); setChapter(""); resetSession(); }}>
          <option value="">All subjects</option>{Object.entries(SUBJECT_META).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>
        <select className="input" aria-label="Chapter" value={chapter} onChange={(e) => { setChapter(e.target.value); resetSession(); }}>
          <option value="">All chapters</option>{chapterOptions.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-5">
        {[
          ["Overdue", counts.overdue, "text-rose-500"], ["Due today", counts.due + counts.learning, "text-electric-500"],
          ["New available", `${Math.min(counts.new, counts.newAllowed)}/${counts.new}`, "text-violet-500"], ["Scheduled later", counts.scheduled, "muted"], ["Reviewed now", reviewed, "text-emerald-500"],
        ].map(([l, v, c]) => (
          <div key={String(l)} className="rounded-xl border border-[var(--border)] p-2"><div className={cn("font-display text-lg font-bold", String(c))}>{v}</div><div className="muted">{l}</div></div>
        ))}
      </div>
      {counts.overdue > 0 && (
        <p className="muted mb-3 text-xs">Missed reviews are shown first, most overdue first. Reviewing a card late still schedules it from today, so a backlog clears in a few sessions; at most {NEW_PER_DAY} new cards are introduced per day so it cannot grow faster than you can clear it.</p>
      )}

      {!card ? (
        <div className="card card-pad flex flex-col items-center py-12 text-center">
          <PartyPopper className="mb-2 text-emerald-500" size={32} />
          <div className="h2">All caught up</div>
          <p className="muted text-sm">{counts.new > counts.newAllowed ? `You have reached today's limit of ${NEW_PER_DAY} new cards. ` : ""}No cards are due in this selection. {counts.scheduled > 0 ? `${counts.scheduled} cards are scheduled for later days.` : ""}</p>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.button key={card.key + String(flipped)} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              onClick={() => setFlipped(!flipped)} aria-label={flipped ? "Show question" : "Reveal answer"} className="card card-pad block min-h-[260px] w-full text-left">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="muted">{card.chapterName}{card.frontSub ? ` · ${card.frontSub}` : ""}</span>
                <span className="flex gap-1">
                  {st?.status === "new" && <span className="chip bg-violet-500/10 text-violet-500">new</span>}
                  {st?.status === "overdue" && <span className="chip bg-rose-500/10 text-rose-500">overdue {st.overdueDays} d</span>}
                  {st?.status === "learning" && <span className="chip bg-amber-500/10 text-amber-600">relearning</span>}
                  <span className="chip bg-[var(--surface-2)]">{flipped ? "answer" : "question"}</span>
                </span>
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
          <div className={cn("mt-4 grid grid-cols-4 gap-2 transition", !flipped && "pointer-events-none opacity-40")} aria-hidden={!flipped}>
            {GRADES.map((g, i) => (
              <button key={g.g} onClick={() => grade(g.g)} className={cn("btn flex-col !gap-0 text-white", g.cls)} title={`Key ${i + 1}`}>
                {g.label}<span className="text-[10px] font-normal opacity-90">{preview ? fmtInterval(preview[i].intervalDays, preview[i].dueAt) : g.hint}</span>
              </button>
            ))}
          </div>
          <p className="muted mt-2 text-center text-xs">{active.length} left in this session · keys 1–4 grade after revealing</p>
        </>
      )}

      <div className="mt-8">
        <button className="btn-ghost text-sm" onClick={() => setShowHistory(!showHistory)}><History size={15} /> {showHistory ? "Hide" : "Show"} review history ({store?.history.length ?? 0})</button>
        {showHistory && (
          <div className="card mt-3 overflow-x-auto">
            {history.length === 0 ? <p className="muted p-4 text-sm">No reviews yet.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="muted text-left text-xs"><th className="p-2">When</th><th className="p-2">Card</th><th className="p-2">Grade</th><th className="p-2">Next in</th><th className="p-2">Late by</th></tr></thead>
                <tbody>
                  {history.map((h, i) => {
                    const c = byKey.get(h.card);
                    return (
                      <tr key={i} className="border-t border-[var(--border)]">
                        <td className="whitespace-nowrap p-2">{fmtDate(h.t)} {new Date(h.t).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</td>
                        <td className="p-2">{c ? <Inline text={c.front} /> : h.card}</td>
                        <td className="p-2">{GRADES[h.grade].label}</td>
                        <td className="p-2">{h.interval === 0 ? "10 min" : `${h.interval} d`}</td>
                        <td className="p-2">{h.overdueDays ? `${h.overdueDays} d` : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
