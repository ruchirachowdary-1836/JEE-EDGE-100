import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { syllabusWithStats } from "@/lib/queries";
import { Card, PageHeader, Stat, ProgressBar } from "@/components/ui";
import { BarSeries, LineSeries, ColoredBars, RadarMastery } from "@/components/charts";
import { SUBJECT_META, fmtDuration, istDay } from "@/lib/utils";

export const metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const user = await requireUser();
  const since = new Date(Date.now() - 42 * 86400_000);
  const [subjects, attempts, mocks, formulaCount, formulaCards, pyqTotal, pyqAttempted, repeated, reviewsDone] = await Promise.all([
    syllabusWithStats(user.id),
    db.attempt.findMany({ where: { userId: user.id }, select: { isCorrect: true, timeTakenSec: true, createdAt: true, context: true, question: { select: { subject: { select: { slug: true } } } } } }),
    db.mockAttempt.findMany({ where: { userId: user.id, status: "SUBMITTED" }, orderBy: { submittedAt: "asc" }, select: { score: true, submittedAt: true, mockExam: { select: { title: true } }, summary: true } }),
    db.formula.count({ where: { publishStatus: "PUBLISHED" } }),
    db.reviewCard.findMany({ where: { userId: user.id, cardType: "FORMULA" }, select: { intervalDays: true } }),
    db.question.count({ where: { source: "PYQ", publishStatus: "PUBLISHED" } }),
    db.question.count({ where: { source: "PYQ", publishStatus: "PUBLISHED", attempts: { some: { userId: user.id } } } }),
    db.mistakeEntry.count({ where: { userId: user.id, resolved: false, occurrences: { gt: 1 } } }),
    db.reviewCard.count({ where: { userId: user.id, lastReviewedAt: { not: null } } }),
  ]);

  const total = attempts.length;
  const correct = attempts.filter((a) => a.isCorrect).length;
  const avgTime = total ? attempts.reduce((s, a) => s + a.timeTakenSec, 0) / total : 0;
  const allTopics = subjects.flatMap((s) => s.chapters.flatMap((c) => c.topics));
  const stageCount = (st: string) => allTopics.filter((t) => t.stat.stage === st).length;
  const studied = allTopics.filter((t) => t.stat.notesDone).length;
  const revised = allTopics.filter((t) => t.stat.revisedCount > 0).length;
  const formulaMastered = formulaCards.filter((c) => c.intervalDays >= 7).length;

  const subjAcc = Object.keys(SUBJECT_META).map((s) => {
    const list = attempts.filter((a) => a.question.subject.slug === s);
    return { name: SUBJECT_META[s].name, value: list.length ? Math.round((list.filter((a) => a.isCorrect).length / list.length) * 100) : 0, color: SUBJECT_META[s].color, n: list.length, time: list.length ? list.reduce((x, a) => x + a.timeTakenSec, 0) / list.length : 0 };
  });

  // daily questions over the last 14 days
  const days = Array.from({ length: 14 }, (_, i) => istDay(new Date(Date.now() - (13 - i) * 86400_000)));
  const perDay = days.map((d) => {
    const list = attempts.filter((a) => istDay(a.createdAt) === d);
    return { day: d.slice(5), Solved: list.length, Correct: list.filter((a) => a.isCorrect).length };
  });

  // weekly accuracy over the last 6 weeks
  const weeks = Array.from({ length: 6 }, (_, i) => {
    const end = Date.now() - (5 - i) * 7 * 86400_000;
    const start = end - 7 * 86400_000;
    const list = attempts.filter((a) => a.createdAt.getTime() > start && a.createdAt.getTime() <= end && a.createdAt >= since);
    return { week: i === 5 ? "this wk" : `-${5 - i}w`, Accuracy: list.length ? Math.round((list.filter((a) => a.isCorrect).length / list.length) * 100) : null, Questions: list.length };
  });

  const mockData = mocks.map((m, i) => {
    const s = m.summary as { max?: number } | null;
    return { test: `#${i + 1}`, Score: m.score ?? 0, Max: s?.max ?? 0 };
  });

  return (
    <div>
      <PageHeader eyebrow="Performance" title="Analytics" subtitle="Studied, practised, revised and mastered are tracked separately. A topic is only “mastered” after you finish its notes, clear Gym level 4, reach the accuracy threshold over enough attempts, and revise it at least once." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Questions solved" value={total} hint={`${correct} correct`} />
        <Stat label="Overall accuracy" value={`${total ? Math.round((correct / total) * 100) : 0}%`} />
        <Stat label="Avg. solving time" value={fmtDuration(avgTime)} hint="per question" />
        <Stat label="Repeated mistakes" value={repeated} hint="unresolved, wrong 2+ times" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {(["STUDIED", "PRACTICED", "REVISED", "MASTERED"] as const).map((st) => (
          <Card key={st}>
            <div className="muted text-xs font-bold uppercase">{st === "PRACTICED" ? "Practised" : st[0] + st.slice(1).toLowerCase()} (current stage)</div>
            <div className="font-display text-3xl font-bold">{stageCount(st)}</div>
            <div className="muted text-xs">of {allTopics.length} topics</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="h2 mb-2">Subject accuracy</h2>
          <ColoredBars data={subjAcc.map(({ name, value, color }) => ({ name, value, color }))} />
          <div className="mt-2 space-y-1 text-xs">{subjAcc.map((s) => <div key={s.name} className="flex justify-between"><span>{s.name}</span><span className="muted">{s.n} attempts · avg {fmtDuration(s.time)}</span></div>)}</div>
        </Card>
        <Card className="lg:col-span-2">
          <h2 className="h2 mb-2">Questions solved — last 14 days</h2>
          <BarSeries data={perDay} xKey="day" bars={[{ key: "Solved", color: "#2b8cff" }, { key: "Correct", color: "#10b981" }]} />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="h2 mb-2">Weekly improvement (accuracy %)</h2>
          <LineSeries data={weeks} xKey="week" lines={[{ key: "Accuracy", color: "#8b5cf6" }]} yMax={100} unit="%" />
        </Card>
        <Card>
          <h2 className="h2 mb-2">Progress score by subject</h2>
          <RadarMastery data={subjects.map((s) => ({ subject: s.name, value: s.progressScore }))} />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="h2 mb-2">Mock test scores</h2>
          {mockData.length ? <LineSeries data={mockData} xKey="test" lines={[{ key: "Score", color: "#2b8cff" }, { key: "Max", color: "#94a3b8" }]} /> : <p className="muted py-8 text-center text-sm">No mock tests submitted yet.</p>}
        </Card>
        <Card>
          <h2 className="h2 mb-3">Completion</h2>
          <div className="space-y-4">
            <ProgressBar label={`Topics studied (${studied}/${allTopics.length})`} value={Math.round((studied / Math.max(1, allTopics.length)) * 100)} />
            <ProgressBar label={`Revision completion (${revised}/${studied || 0} studied topics revised)`} value={studied ? Math.round((revised / studied) * 100) : 0} color="bg-amber-500" />
            <ProgressBar label={`Formula mastery (${formulaMastered}/${formulaCount}, interval ≥ 7 days)`} value={Math.round((formulaMastered / Math.max(1, formulaCount)) * 100)} color="bg-violet-500" />
            <ProgressBar label={`PYQ completion (${pyqAttempted}/${pyqTotal})`} value={pyqTotal ? Math.round((pyqAttempted / pyqTotal) * 100) : 0} color="bg-emerald-500" />
            <div className="muted text-xs">{reviewsDone} flashcards reviewed at least once.</div>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="h2 mb-3">Chapter mastery</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="muted border-b border-[var(--border)] text-left text-xs uppercase"><th className="py-2">Chapter</th><th>Topics</th><th>Studied</th><th>Practised</th><th>Revised</th><th>Mastered</th><th>Attempts</th><th>Accuracy</th><th className="w-40">Progress</th></tr></thead>
            <tbody>
              {subjects.flatMap((s) => s.chapters.map((c) => ({ ...c, subject: s.slug }))).filter((c) => c.progressScore > 0 || c.attempts > 0).sort((a, b) => b.progressScore - a.progressScore).map((c) => (
                <tr key={c.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-2"><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: SUBJECT_META[c.subject].color }} /><Link href={`/chapter/${c.slug}`} className="hover:underline">{c.name}</Link></td>
                  <td>{c.topics.length}</td>
                  <td>{c.topics.filter((t) => t.stat.notesDone).length}</td>
                  <td>{c.topics.filter((t) => t.stat.attempts > 0).length}</td>
                  <td>{c.topics.filter((t) => t.stat.revisedCount > 0).length}</td>
                  <td className="font-semibold text-emerald-500">{c.stageCounts.MASTERED}</td>
                  <td>{c.attempts}</td>
                  <td>{c.attempts ? `${c.accuracy}%` : "—"}</td>
                  <td><ProgressBar value={c.progressScore} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {subjects.every((s) => s.chapters.every((c) => c.progressScore === 0 && c.attempts === 0)) && <p className="muted py-6 text-center text-sm">Chapters appear here once you start studying or practising them.</p>}
        </div>
      </Card>
    </div>
  );
}
