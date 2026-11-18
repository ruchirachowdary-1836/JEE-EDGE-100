import Link from "next/link";
import { Timer, FileText, PlayCircle, BarChart3 } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/config";
import { Card, PageHeader, Empty } from "@/components/ui";
import { StartMockButton, TestBuilder } from "./ExamClient";
import { fmtDate } from "@/lib/utils";

export const metadata = { title: "Exam Simulator" };

export default async function ExamsPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const user = await requireUser();
  const [mocks, attempts, chapters, settings, bankCount] = await Promise.all([
    db.mockExam.findMany({ where: { publishStatus: "PUBLISHED", ownerId: null }, include: { _count: { select: { items: true } } }, orderBy: { createdAt: "desc" } }),
    db.mockAttempt.findMany({ where: { userId: user.id }, include: { mockExam: { select: { title: true, kind: true } } }, orderBy: { startedAt: "desc" }, take: 20 }),
    db.chapter.findMany({ orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], select: { slug: true, name: true, subject: { select: { slug: true } }, _count: { select: { questions: { where: { publishStatus: "PUBLISHED" } } } } } }),
    getSettings(),
    db.question.count({ where: { publishStatus: "PUBLISHED" } }),
  ]);
  const p = settings.examPattern;
  const fullCount = p.sections.reduce((a, s) => a + s.mcq + s.numerical, 0);

  return (
    <div>
      <PageHeader eyebrow="Computer-based test" title="JEE Main Exam Simulator"
        subtitle={<>Configured pattern: <strong>{p.name}</strong> — {fullCount} questions, {p.durationMin} minutes, +{p.marks.correct} / {p.marks.incorrectMcq} (MCQ) / {p.marks.incorrectNumerical} (numerical). {p.source}</>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <h2 className="h2">Mock tests</h2>
          {mocks.length === 0 && <Empty title="No mock tests published yet">An administrator can assemble mocks from the question bank in the CMS.</Empty>}
          {mocks.map((m) => (
            <Card key={m.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 font-display font-semibold"><FileText size={16} className="text-electric-500" /> {m.title}</div>
                <div className="muted text-sm">{m._count.items} questions · {m.durationMin} min · {m.kind === "FULL" ? "full-length" : "shortened"}</div>
                {m.description && <p className="muted mt-1 text-xs">{m.description}</p>}
              </div>
              <StartMockButton mockExamId={m.id} />
            </Card>
          ))}
          {bankCount < fullCount && (
            <p className="muted text-xs">A full {fullCount}-question mock needs at least {p.sections.map((s) => `${s.mcq + s.numerical} ${s.subject}`).join(", ")} published questions. The bank currently has {bankCount} questions in total, so only shortened mocks are offered.</p>
          )}

          <h2 className="h2 pt-4">Your attempts</h2>
          {attempts.length === 0 ? <p className="muted text-sm">No attempts yet.</p> : (
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead><tr className="muted border-b border-[var(--border)] text-left text-xs uppercase"><th className="p-3">Test</th><th className="p-3">Started</th><th className="p-3">Score</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {attempts.map((a) => (
                    <tr key={a.id} className="border-b border-[var(--border)] last:border-0">
                      <td className="p-3 font-medium">{a.mockExam.title}</td>
                      <td className="muted p-3">{fmtDate(a.startedAt)}</td>
                      <td className="p-3 font-semibold">{a.status === "SUBMITTED" ? a.score ?? "…" : <span className="chip bg-amber-500/10 text-amber-600">in progress</span>}</td>
                      <td className="p-3 text-right">
                        {a.status === "SUBMITTED"
                          ? <Link href={`/exams/${a.id}/result`} className="btn-ghost !py-1 text-xs"><BarChart3 size={14} /> Analysis</Link>
                          : <Link href={`/exams/${a.id}`} className="btn-primary !py-1 text-xs"><PlayCircle size={14} /> Resume</Link>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <Card>
            <h2 className="h2 mb-1 flex items-center gap-2"><Timer size={18} className="text-violet-500" /> Build a test</h2>
            <p className="muted mb-4 text-sm">Chapter-wise tests, timed PYQ tests or a mixed set — drawn at random from published questions.</p>
            <TestBuilder
              chapters={chapters.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject.slug, count: c._count.questions }))}
              initialChapter={searchParams.chapter}
              initialSource={searchParams.pyq ? "PYQ" : "ANY"}
              initialYear={searchParams.year ? Number(searchParams.year) : undefined}
              initialSubject={searchParams.subject}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
