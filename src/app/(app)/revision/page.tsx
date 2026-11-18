import Link from "next/link";
import { Layers, Brain, FlaskConical, NotebookPen, Flame, Bookmark, FileText, LineChart } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, PageHeader } from "@/components/ui";
import { Flashcards, type Card as FCard } from "./Flashcards";
import { SUBJECT_META } from "@/lib/utils";

export const metadata = { title: "Revision Centre" };

export default async function RevisionPage({ searchParams }: { searchParams: { deck?: string; track?: string } }) {
  const user = await requireUser();
  const now = new Date();
  const [formulas, concepts, reactions, cards, mistakesDue, hardWrong, bookmarks, notes, animations, chapters] = await Promise.all([
    db.formula.findMany({ where: { publishStatus: "PUBLISHED" }, include: { chapter: { include: { subject: true } } } }),
    db.conceptCard.findMany({ where: { publishStatus: "PUBLISHED" }, include: { chapter: { include: { subject: true } } } }),
    db.namedReaction.findMany({ where: { publishStatus: "PUBLISHED" } }),
    db.reviewCard.findMany({ where: { userId: user.id } }),
    db.mistakeEntry.count({ where: { userId: user.id, resolved: false, nextReviewAt: { lte: now } } }),
    db.mistakeEntry.findMany({ where: { userId: user.id, resolved: false, question: { OR: [{ level: { gte: 4 } }, { difficulty: "HARD" }] } }, include: { question: { select: { id: true, topic: { select: { name: true } } } } }, take: 8 }),
    db.bookmark.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 30 }),
    db.note.findMany({ where: { publishStatus: "PUBLISHED" }, include: { topic: { include: { chapter: { include: { subject: true } } } } } }),
    db.animation.findMany({ where: { publishStatus: "PUBLISHED" }, select: { key: true, title: true } }),
    db.chapter.findMany({ where: { publishStatus: "PUBLISHED", syllabusStatus: "EXAMINABLE" }, orderBy: [{ planWeight: "desc" }, { order: "asc" }], include: { subject: true, topics: { select: { slug: true, name: true, note: { select: { publishStatus: true } } }, orderBy: { order: "asc" } } } }),
  ]);
  const bmTopics = await db.topic.findMany({ where: { id: { in: bookmarks.filter((b) => b.itemType === "TOPIC").map((b) => b.itemId) } }, select: { id: true, slug: true, name: true } });
  const topicById = new Map(bmTopics.map((t) => [t.id, t]));
  const state = new Map(cards.map((c) => [`${c.cardType}:${c.itemId}`, c]));
  const isDue = (type: string, id: string) => { const c = state.get(`${type}:${id}`); return !c || c.dueAt <= now; };

  const deckCards: Record<string, FCard[]> = {
    FORMULA: formulas.map((f) => ({ type: "FORMULA", id: f.slug, front: f.name, frontSub: f.chapter.name, back: `$$${f.expression}$$\n\n**Use when:** ${f.whenToUse}\n\n**Not when:** ${f.whenNotToUse}`, subject: f.chapter.subject.slug, due: isDue("FORMULA", f.slug), isNew: !state.has(`FORMULA:${f.slug}`) })),
    CONCEPT: concepts.map((c) => ({ type: "CONCEPT", id: c.id, front: c.front, frontSub: c.chapter.name, back: c.back, subject: c.chapter.subject.slug, due: isDue("CONCEPT", c.id), isNew: !state.has(`CONCEPT:${c.id}`) })),
    REACTION: reactions.map((r) => ({ type: "REACTION", id: r.slug, front: r.name, frontSub: `${r.reactant} → ?`, back: `$$${r.equation}$$\n\n**Reagents:** ${r.reagents}\n\n**Product:** ${r.product}\n\n${r.notes}`, subject: "chemistry", due: isDue("REACTION", r.slug), isNew: !state.has(`REACTION:${r.slug}`) })),
  };
  const deck = searchParams.deck && deckCards[searchParams.deck] ? searchParams.deck : null;

  if (deck) {
    return (
      <div>
        <PageHeader eyebrow="Spaced repetition" title={`${deck === "FORMULA" ? "Formula" : deck === "CONCEPT" ? "Concept" : "Reaction"} flashcards`} subtitle="Grade yourself honestly: cards you find hard come back sooner; easy ones are spaced out further." actions={<Link className="btn-ghost" href="/revision">Revision Centre</Link>} />
        <Flashcards cards={deckCards[deck]} />
      </div>
    );
  }

  // Revision tracks built from chapter planning priority; topics with notes link to their revision sheet.
  const topicsWithNotes = chapters.flatMap((c) => c.topics.filter((t) => t.note?.publishStatus === "PUBLISHED").map((t) => ({ ...t, chapter: c.name, subject: c.subject.slug })));
  const bySubject = (s: string) => chapters.filter((c) => c.subject.slug === s);
  const tracks = {
    "1": [{ day: 1, items: ["Clear all due formula flashcards", "Re-attempt every mistake due today", ...chapters.filter((c) => c.planWeight >= 5).map((c) => `Skim summary + formulas: ${c.name}`)] }],
    "3": ["physics", "chemistry", "mathematics"].map((s, i) => ({ day: i + 1, items: [`${SUBJECT_META[s].name}: formula flashcards for the whole subject`, ...bySubject(s).filter((c) => c.planWeight >= 4).map((c) => `Quick revision: ${c.name}`), "Mistake notebook — this subject"] })),
    "7": Array.from({ length: 7 }, (_, d) => ({ day: d + 1, items: d === 6 ? ["Light day: formula sheets only", "Exam strategy and timing checkpoints", "Sleep early"] : chapters.filter((_, i) => i % 6 === d).map((c) => `${SUBJECT_META[c.subject.slug].name} · ${c.name}`) })),
  };
  const track = (searchParams.track ?? "") as keyof typeof tracks;

  const deckTiles = [
    { key: "FORMULA", label: "Formula flashcards", icon: Layers, n: deckCards.FORMULA.length, due: deckCards.FORMULA.filter((c) => c.due).length },
    { key: "CONCEPT", label: "Concept flashcards", icon: Brain, n: deckCards.CONCEPT.length, due: deckCards.CONCEPT.filter((c) => c.due).length },
    { key: "REACTION", label: "Reaction flashcards", icon: FlaskConical, n: deckCards.REACTION.length, due: deckCards.REACTION.filter((c) => c.due).length },
  ];

  return (
    <div>
      <PageHeader eyebrow="Revision Command Centre" title="Revise what matters, when it matters" subtitle="Flashcards are scheduled by a spaced-repetition algorithm using your own grades. Intervals are configurable by administrators." />
      <div className="grid gap-4 md:grid-cols-3">
        {deckTiles.map((d) => (
          <Link key={d.key} href={`/revision?deck=${d.key}`} className="card card-pad block transition hover:-translate-y-0.5 hover:border-electric-400">
            <d.icon className="mb-2 text-electric-500" />
            <div className="font-display font-semibold">{d.label}</div>
            <div className="muted text-sm">{d.n} cards · <span className="font-semibold text-amber-500">{d.due} due</span></div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="h2 mb-3 flex items-center gap-2"><NotebookPen size={18} className="text-rose-500" /> Incorrect & difficult</h2>
          <Link href="/mistakes" className="flex justify-between rounded-lg p-2 text-sm hover:bg-[var(--surface-2)]"><span>Mistakes due for re-attempt</span><strong>{mistakesDue}</strong></Link>
          <Link href="/pyq?status=incorrect" className="flex justify-between rounded-lg p-2 text-sm hover:bg-[var(--surface-2)]"><span>Incorrect PYQs</span><span>→</span></Link>
          <div className="mt-2 text-xs font-bold uppercase">Difficult questions you got wrong</div>
          {hardWrong.length ? hardWrong.map((m) => <Link key={m.id} className="link block py-1 text-sm" href={`/q/${m.question.id}`}>{m.question.topic?.name ?? "Question"}</Link>) : <p className="muted text-sm">None — good.</p>}
        </Card>
        <Card>
          <h2 className="h2 mb-3 flex items-center gap-2"><Bookmark size={18} className="text-electric-500" /> Personal bookmarks</h2>
          {bookmarks.length === 0 && <p className="muted text-sm">Bookmark topics, formulas and questions to collect them here.</p>}
          <ul className="space-y-1 text-sm">
            {bookmarks.map((b) => (
              <li key={b.id}>
                <Link className="link" href={b.itemType === "FORMULA" ? `/formulas/${b.itemId}` : b.itemType === "QUESTION" ? `/q/${b.itemId}` : b.itemType === "REACTION" ? `/chemistry?tab=reactions#${b.itemId}` : `/topic/${topicById.get(b.itemId)?.slug ?? ""}`}>
                  {b.itemType.toLowerCase()}: {b.itemType === "FORMULA" ? formulas.find((f) => f.slug === b.itemId)?.name ?? b.itemId : b.itemType === "TOPIC" ? topicById.get(b.itemId)?.name ?? "topic" : b.itemType === "REACTION" ? reactions.find((r) => r.slug === b.itemId)?.name ?? "reaction" : "question"}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="h2 mb-3 flex items-center gap-2"><Flame size={18} className="text-orange-500" /> Revision tracks</h2>
          <div className="flex gap-2">
            {(["1", "3", "7"] as const).map((k) => <Link key={k} href={`/revision?track=${k}`} className={`btn-ghost flex-1 ${track === k ? "!border-electric-500 !text-electric-500" : ""}`}>{k}-day</Link>)}
          </div>
          <p className="muted mt-2 text-xs">Tracks prioritise chapters by the content team&apos;s planning weight. Mark topics revised on their notes pages to record progress.</p>
        </Card>
      </div>

      {track && tracks[track] && (
        <Card className="mt-6">
          <h2 className="h2 mb-3">{track}-day revision track</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {tracks[track].map((d) => (
              <div key={d.day} className="rounded-xl border border-[var(--border)] p-3">
                <div className="mb-2 text-xs font-bold uppercase text-electric-500">Day {d.day}</div>
                <ul className="ml-4 list-disc space-y-1 text-sm">{d.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="h2 mb-3 flex items-center gap-2"><FileText size={18} className="text-violet-500" /> Chapter summary sheets</h2>
          {topicsWithNotes.length === 0 ? <p className="muted text-sm">No published notes yet.</p> : (
            <ul className="space-y-1 text-sm">{topicsWithNotes.map((t) => <li key={t.slug} className="flex justify-between"><Link className="link" href={`/topic/${t.slug}/sheet`}>{t.name}</Link><span className="muted text-xs">{t.chapter}</span></li>)}</ul>
          )}
        </Card>
        <Card>
          <h2 className="h2 mb-3 flex items-center gap-2"><LineChart size={18} className="text-emerald-500" /> Important graphs & diagrams</h2>
          <ul className="grid gap-1 text-sm sm:grid-cols-2">{animations.map((a) => <li key={a.key}><Link className="link" href={`/studio/${a.key}`}>{a.title}</Link></li>)}</ul>
          <div className="mt-4 text-xs font-bold uppercase">High-priority chapters (planning weight 5)</div>
          <div className="mt-1 flex flex-wrap gap-1">{chapters.filter((c) => c.planWeight >= 5).map((c) => <Link key={c.id} href={`/chapter/${c.slug}`} className="chip bg-[var(--surface-2)] hover:bg-electric-500/10">{c.name}</Link>)}</div>
        </Card>
      </div>
    </div>
  );
}
