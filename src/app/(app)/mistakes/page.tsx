import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, PageHeader, Stat, Empty } from "@/components/ui";
import { ColoredBars } from "@/components/charts";
import { MISTAKE_LABELS } from "@/lib/utils";
import { MistakeList } from "./MistakeList";
import { QUESTION_PUBLIC_SELECT } from "@/lib/questions";

export const metadata = { title: "Mistake Notebook" };

const CAT_COLORS: Record<string, string> = { CONCEPTUAL: "#f43f5e", FORMULA_SELECTION: "#8b5cf6", CALCULATION: "#f59e0b", INTERPRETATION: "#2b8cff", TIME_MANAGEMENT: "#06b6d4", GUESSING: "#94a3b8" };

export default async function MistakesPage() {
  const user = await requireUser();
  const entries = await db.mistakeEntry.findMany({
    where: { userId: user.id },
    include: { question: { select: { ...QUESTION_PUBLIC_SELECT, solution: true, conceptTested: true, commonMistakes: true } } },
    orderBy: [{ resolved: "asc" }, { nextReviewAt: "asc" }],
  });
  const now = new Date();
  const open = entries.filter((e) => !e.resolved);
  const due = open.filter((e) => e.nextReviewAt <= now);
  const repeated = open.filter((e) => e.occurrences > 1);
  const byCat = Object.keys(MISTAKE_LABELS).map((k) => ({ name: MISTAKE_LABELS[k].replace(" error", "").replace("Question ", ""), value: open.filter((e) => e.category === k).length, color: CAT_COLORS[k] }));
  const unclassified = open.filter((e) => !e.category).length;
  const weakTopics = Object.values(open.reduce<Record<string, { name: string; slug: string; n: number }>>((acc, e) => {
    const t = e.question.topic ?? { name: e.question.chapter.name, slug: "" };
    const key = t.name;
    acc[key] = acc[key] ?? { name: t.name, slug: t.slug, n: 0 };
    acc[key].n += e.occurrences;
    return acc;
  }, {})).sort((a, b) => b.n - a.n).slice(0, 6);

  return (
    <div>
      <PageHeader eyebrow="Every mistake corrected" title="Mistake Notebook" subtitle="Wrong answers from the Gym, PYQs and mock tests land here automatically. Classify each one, write what you will do differently, and re-attempt it on schedule (1, 3, 7 and 15 days) until it is resolved." />
      {entries.length === 0 ? (
        <Empty title="No mistakes recorded yet">Answer questions in the Question Gym, PYQ library or a mock test. Every incorrect answer is saved here with your answer, the correct answer and the explanation.</Empty>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Stat label="Unresolved" value={open.length} />
            <Stat label="Due for review" value={<span className="text-amber-500">{due.length}</span>} />
            <Stat label="Repeated mistakes" value={<span className="text-rose-500">{repeated.length}</span>} hint="wrong more than once" />
            <Stat label="Resolved" value={<span className="text-emerald-500">{entries.length - open.length}</span>} />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <h2 className="h2 mb-2">Unresolved mistakes by type</h2>
              <ColoredBars data={byCat} unit="" yMax={Math.max(4, ...byCat.map((b) => b.value))} />
              {unclassified > 0 && <p className="muted mt-1 text-xs">{unclassified} unresolved mistake(s) not yet classified.</p>}
            </Card>
            <Card>
              <h2 className="h2 mb-2">Unresolved weak topics</h2>
              {weakTopics.length ? (
                <ul className="space-y-2 text-sm">{weakTopics.map((w) => <li key={w.name} className="flex justify-between"><a className="hover:underline" href={w.slug ? `/topic/${w.slug}` : "#"}>{w.name}</a><span className="font-semibold">{w.n}×</span></li>)}</ul>
              ) : <p className="muted text-sm">All clear.</p>}
            </Card>
          </div>
          <MistakeList entries={entries.map((e) => ({
            id: e.id, questionId: e.questionId, statement: e.question.statement, chapter: e.question.chapter.name, topic: e.question.topic?.name ?? null,
            selectedAnswer: e.selectedAnswer, correctAnswer: e.correctAnswer, category: e.category, observation: e.observation, occurrences: e.occurrences,
            resolved: e.resolved, due: !e.resolved && e.nextReviewAt <= now, nextReviewAt: e.nextReviewAt.toISOString(), reviewCount: e.reviewCount,
            solution: e.question.solution, concept: e.question.conceptTested, mistakes: e.question.commonMistakes,
            question: { ...e.question, type: e.question.type as "MCQ" | "NUMERICAL" },
          }))} />
        </>
      )}
    </div>
  );
}
