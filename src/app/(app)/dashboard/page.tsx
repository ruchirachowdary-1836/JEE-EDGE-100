import Link from "next/link";
import { Flame, Target, CheckCircle2, Timer, ArrowRight, CalendarClock, NotebookPen, Repeat, PlayCircle, TrendingDown, TrendingUp } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { syllabusWithStats, examDateFor, weakStrong } from "@/lib/queries";
import { Card, PageHeader, ProgressRing, ProgressBar, Stat, SubjectChip } from "@/components/ui";
import { LineSeries } from "@/components/charts";
import { SUBJECT_META, startOfIstDay, daysBetween, fmtDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const user = await requireUser();
  const todayStart = startOfIstDay();
  const [subjects, exam, todayAttempts, totals, mocks, dueCards, dueMistakes, events, plan] = await Promise.all([
    syllabusWithStats(user.id),
    examDateFor(user.id),
    db.attempt.count({ where: { userId: user.id, createdAt: { gte: todayStart } } }),
    db.attempt.groupBy({ by: ["isCorrect"], where: { userId: user.id }, _count: true }),
    db.mockAttempt.findMany({ where: { userId: user.id, status: "SUBMITTED" }, orderBy: { submittedAt: "asc" }, take: 10, include: { mockExam: { select: { title: true } } } }),
    db.reviewCard.count({ where: { userId: user.id, dueAt: { lte: new Date() } } }),
    db.mistakeEntry.count({ where: { userId: user.id, resolved: false, nextReviewAt: { lte: new Date() } } }),
    db.studyEvent.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 30 }),
    db.studyPlan.findFirst({ where: { userId: user.id, active: true }, include: { tasks: { orderBy: [{ day: "asc" }] } } }),
  ]);

  const solved = totals.reduce((a, t) => a + t._count, 0);
  const correct = totals.find((t) => t.isCorrect)?._count ?? 0;
  const accuracy = solved ? Math.round((correct / solved) * 100) : 0;
  const daysLeft = Math.max(0, daysBetween(new Date(), exam.date));
  const overall = Math.round(subjects.reduce((a, s) => a + s.studiedPct, 0) / Math.max(1, subjects.length));
  const { weak, strong, rated } = weakStrong(subjects);
  const target = exam.profile?.dailyQuestionTarget ?? 60;

  // unique recent items
  const seen = new Set<string>();
  const recent = events.filter((e) => (seen.has(e.href) ? false : (seen.add(e.href), true))).slice(0, 6);
  const cont = recent.find((e) => e.kind === "NOTES" || e.kind === "GYM") ?? recent[0];

  let todayTasks: NonNullable<typeof plan>["tasks"] = [];
  let planDay = 0;
  if (plan) {
    planDay = daysBetween(startOfIstDay(plan.startDate), todayStart) + 1;
    todayTasks = plan.tasks.filter((t) => t.day === planDay);
  }

  const mockData = mocks.map((m, i) => ({ name: `#${i + 1}`, score: m.score ?? 0 }));
  const maxScore = Math.max(300, ...mockData.map((m) => m.score));

  return (
    <div className="space-y-6">
      <div className="card bg-hero relative overflow-hidden card-pad">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-electric-500">Welcome back</div>
            <h1 className="h1 mt-1">{user.name.split(" ")[0]}, let's make today count.</h1>
            <p className="muted mt-2 max-w-xl text-sm">
              {cont ? <>Pick up where you left off: <Link href={cont.href} className="link">{cont.label}</Link>.</> : <>Start with the <Link className="link" href="/syllabus">syllabus</Link> or generate your <Link className="link" href="/plan">60-day plan</Link>.</>}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cont && <Link href={cont.href} className="btn-primary"><PlayCircle size={16} /> Continue learning</Link>}
              <Link href="/plan" className="btn-ghost"><CalendarClock size={16} /> Today's plan</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="font-display text-5xl font-bold tabular-nums text-electric-500">{daysLeft}</div>
              <div className="muted text-xs font-semibold uppercase tracking-wide">days to exam</div>
              <div className="muted text-xs">{fmtDate(exam.date)} · <Link href="/settings" className="link">change</Link></div>
            </div>
            <ProgressRing value={overall} size={110} sub="studied" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Daily streak" value={<span className="flex items-center gap-1">{exam.profile?.streak ?? 0}<Flame size={20} className="text-orange-500" /></span>} hint={`Best: ${exam.profile?.longestStreak ?? 0} days`} />
        <Stat label="Questions today" value={`${todayAttempts}/${target}`} hint={<ProgressBar value={Math.round((todayAttempts / Math.max(1, target)) * 100)} className="mt-1 w-28" />} icon={<Target size={18} />} />
        <Stat label="Questions solved" value={solved} hint="all practice and tests" icon={<CheckCircle2 size={18} />} />
        <Stat label="Accuracy" value={`${accuracy}%`} hint={solved ? `${correct} correct` : "no attempts yet"} icon={<Timer size={18} />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="h2">Syllabus completion</h2>
            <Link href="/syllabus" className="link text-sm">Open syllabus</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {subjects.map((s) => (
              <Link key={s.slug} href={`/syllabus/${s.slug}`} className="rounded-xl border border-[var(--border)] p-4 transition hover:border-electric-400">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <SubjectChip slug={s.slug} />
                  <span className="muted whitespace-nowrap text-xs">{s.chapters.length} chapters</span>
                </div>
                <div className="mt-3 flex flex-col items-center gap-3 text-center 2xl:flex-row 2xl:text-left">
                  <ProgressRing value={s.studiedPct} size={72} stroke={7} color={SUBJECT_META[s.slug].color} />
                  <div className="text-xs">
                    <div><span className="font-semibold">{s.progressScore}</span> <span className="muted">progress score</span></div>
                    <div><span className="font-semibold">{s.attempts}</span> <span className="muted">attempts</span></div>
                    <div><span className="font-semibold">{s.attempts ? `${s.accuracy}%` : "—"}</span> <span className="muted">accuracy</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="muted mt-3 text-xs">Completion = topics whose notes you have finished. Progress score weighs each topic by stage: studied 25, practised 50, revised 75, mastered 100.</p>
        </Card>

        <Card>
          <h2 className="h2 mb-3">Today</h2>
          {plan ? (
            todayTasks.length ? (
              <ul className="space-y-2">
                {todayTasks.map((t) => (
                  <li key={t.id} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className={t.completedAt ? "mt-0.5 text-emerald-500" : "muted mt-0.5"} />
                    <span className={t.completedAt ? "muted line-through" : ""}>{t.title} <span className="muted">· {t.minutes} min</span></span>
                  </li>
                ))}
              </ul>
            ) : <p className="muted text-sm">No tasks scheduled for day {planDay} of your plan.</p>
          ) : (
            <p className="muted text-sm">No plan yet. <Link href="/plan" className="link">Generate your 60-day plan</Link>.</p>
          )}
          <div className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
            <Link href="/revision" className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[var(--surface-2)]"><span className="flex items-center gap-2"><Repeat size={15} /> Flashcards due</span><span className="font-bold">{dueCards}</span></Link>
            <Link href="/mistakes" className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[var(--surface-2)]"><span className="flex items-center gap-2"><NotebookPen size={15} /> Mistakes due for review</span><span className="font-bold">{dueMistakes}</span></Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="h2">Mock test performance</h2>
            <Link href="/exams" className="link text-sm">Exam simulator</Link>
          </div>
          {mockData.length ? <LineSeries data={mockData} xKey="name" lines={[{ key: "score", color: "#2b8cff", name: "Score" }]} yMax={maxScore} /> : <p className="muted py-10 text-center text-sm">Take your first mock test to see your score trend.</p>}
        </Card>
        <Card>
          <h2 className="h2 mb-3">Weak & strong chapters</h2>
          {rated === 0 ? (
            <p className="muted text-sm">Based on recorded performance only. Attempt at least 4 questions in a chapter to see it rated here.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-rose-500"><TrendingDown size={14} /> Needs work</div>
                {weak.length ? weak.map((c) => <Link key={c.id} href={`/chapter/${c.slug}`} className="flex justify-between py-1 text-sm hover:underline"><span>{c.name}</span><span className="font-semibold">{c.accuracy}%</span></Link>) : <p className="muted text-sm">No chapter below 70%.</p>}
              </div>
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-emerald-500"><TrendingUp size={14} /> Strong</div>
                {strong.length ? strong.map((c) => <Link key={c.id} href={`/chapter/${c.slug}`} className="flex justify-between py-1 text-sm hover:underline"><span>{c.name}</span><span className="font-semibold">{c.accuracy}%</span></Link>) : <p className="muted text-sm">None yet.</p>}
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="h2 mb-3">Recently studied</h2>
        {recent.length ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((e) => (
              <Link key={e.id} href={e.href} className="flex items-center justify-between rounded-xl border border-[var(--border)] px-3 py-2 text-sm transition hover:border-electric-400">
                <span className="truncate"><span className="muted mr-2 text-[10px] font-bold uppercase">{e.kind}</span>{e.label}</span>
                <ArrowRight size={14} className="shrink-0" />
              </Link>
            ))}
          </div>
        ) : <p className="muted text-sm">Your recent notes, practice and tests will appear here.</p>}
      </Card>
    </div>
  );
}
