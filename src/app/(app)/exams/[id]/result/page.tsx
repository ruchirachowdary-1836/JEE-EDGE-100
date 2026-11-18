import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { settleIfExpired, type ExamSummary } from "@/lib/exam";
import { Card, PageHeader, Stat } from "@/components/ui";
import { BarSeries } from "@/components/charts";
import { SUBJECT_META, fmtDuration, fmtDate, MISTAKE_LABELS } from "@/lib/utils";
import { ResultReview } from "./ResultReview";

export const metadata = { title: "Test analysis" };

export default async function ResultPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  await settleIfExpired(params.id);
  const attempt = await db.mockAttempt.findUnique({
    where: { id: params.id },
    include: {
      mockExam: { include: { items: { orderBy: { order: "asc" }, include: { question: { include: { options: { orderBy: { order: "asc" } }, chapter: true } } } } } },
      responses: true,
    },
  });
  if (!attempt || attempt.userId !== user.id) notFound();
  if (attempt.status !== "SUBMITTED") redirect(`/exams/${attempt.id}`);
  const s = attempt.summary as ExamSummary | null;
  if (!s) return <Card>Scoring in progress — refresh in a moment.</Card>;
  const resp = new Map(attempt.responses.map((r) => [r.questionId, r]));
  const subjects = Object.entries(s.perSubject);
  const catCounts: Record<string, number> = {};
  attempt.responses.forEach((r) => { if (r.mistakeCategory) catCounts[r.mistakeCategory] = (catCounts[r.mistakeCategory] ?? 0) + 1; });
  const timeData = attempt.mockExam.items.map((it, i) => ({ q: `${i + 1}`, seconds: resp.get(it.questionId)?.timeSpentSec ?? 0 }));

  return (
    <div>
      <PageHeader eyebrow={`Submitted ${attempt.submittedAt ? fmtDate(attempt.submittedAt) : ""}`} title={attempt.mockExam.title} subtitle="Every mark, every minute and every mistake — read the analysis before taking the next test."
        actions={<><Link href="/mistakes" className="btn-ghost">Mistake notebook</Link><Link href="/exams" className="btn-ghost">All tests</Link></>} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat label="Total marks" value={`${s.score} / ${s.max}`} />
        <Stat label="Correct" value={<span className="text-emerald-500">{s.correct}</span>} />
        <Stat label="Incorrect" value={<span className="text-rose-500">{s.incorrect}</span>} />
        <Stat label="Unattempted" value={s.unattempted} />
        <Stat label="Accuracy" value={`${s.accuracy}%`} hint={`time used ${fmtDuration(s.timeSec)}`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="h2 mb-3">Subject-wise</h2>
          <div className="space-y-3">
            {subjects.map(([slug, v]) => (
              <div key={slug} className="rounded-xl border border-[var(--border)] p-3">
                <div className="flex items-center justify-between font-semibold"><span style={{ color: SUBJECT_META[slug]?.color }}>{SUBJECT_META[slug]?.name ?? slug}</span><span>{v.score} / {v.max}</span></div>
                <div className="muted mt-1 text-xs">✓ {v.correct} · ✗ {v.incorrect} · — {v.unattempted} · {fmtDuration(v.timeSec)}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h2 className="h2 mb-2">Marks by subject</h2>
          <BarSeries data={subjects.map(([slug, v]) => ({ subject: SUBJECT_META[slug]?.name ?? slug, Correct: v.correct, Incorrect: v.incorrect, Unattempted: v.unattempted }))} xKey="subject"
            bars={[{ key: "Correct", color: "#10b981" }, { key: "Incorrect", color: "#f43f5e" }, { key: "Unattempted", color: "#94a3b8" }]} />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="h2 mb-3">Chapter-wise performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="muted border-b border-[var(--border)] text-left text-xs uppercase"><th className="py-2">Chapter</th><th>✓</th><th>✗</th><th>—</th><th className="text-right">Marks</th></tr></thead>
              <tbody>{s.perChapter.map((c) => (
                <tr key={c.slug} className="border-b border-[var(--border)] last:border-0"><td className="py-2"><Link className="hover:underline" href={`/chapter/${c.slug}`}>{c.chapter}</Link></td><td className="text-emerald-500">{c.correct}</td><td className="text-rose-500">{c.incorrect}</td><td>{c.unattempted}</td><td className="text-right font-semibold">{c.score}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </Card>
        <Card>
          <h2 className="h2 mb-2">Time spent per question (seconds)</h2>
          <BarSeries data={timeData} xKey="q" bars={[{ key: "seconds", color: "#2b8cff" }]} height={220} />
          <div className="mt-3">
            <div className="mb-1 text-xs font-bold uppercase">Mistake classification</div>
            {Object.keys(catCounts).length === 0 ? <p className="muted text-xs">Classify your wrong answers below to see the breakdown.</p> : (
              <div className="flex flex-wrap gap-2">{Object.entries(catCounts).map(([k, v]) => <span key={k} className="chip bg-rose-500/10 text-rose-600">{MISTAKE_LABELS[k]}: {v}</span>)}</div>
            )}
          </div>
        </Card>
      </div>

      <h2 className="h2 mb-3 mt-8">Detailed answer review</h2>
      <ResultReview attemptId={attempt.id} items={attempt.mockExam.items.map((it, i) => {
        const r = resp.get(it.questionId);
        const q = it.question;
        const sel = q.options.find((o) => o.id === r?.selectedOptionId);
        const correct = q.options.find((o) => o.isCorrect);
        return {
          n: i + 1, questionId: q.id, section: it.section, chapter: q.chapter.name, type: q.type, statement: q.statement,
          options: q.options.map((o) => ({ label: o.label, text: o.text, isCorrect: o.isCorrect, explanation: o.explanation, chosen: o.id === r?.selectedOptionId })),
          yourAnswer: q.type === "MCQ" ? (sel ? sel.label : null) : r?.numericalResponse != null ? String(r.numericalResponse) : null,
          correctAnswer: q.type === "MCQ" ? correct?.label ?? "" : String(q.numericalAnswer),
          isCorrect: r?.isCorrect ?? null, marks: r?.marks ?? 0, timeSec: r?.timeSpentSec ?? 0, category: r?.mistakeCategory ?? null,
          solution: q.solution, concept: q.conceptTested, formula: q.formulaUsed, mistakes: q.commonMistakes,
        };
      })} />
    </div>
  );
}
