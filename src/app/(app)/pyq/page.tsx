import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { Archive, ShieldCheck } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { QUESTION_PUBLIC_SELECT } from "@/lib/questions";
import { Card, Empty, PageHeader } from "@/components/ui";
import { PyqList } from "./PyqList";
import { PyqFilters } from "./PyqFilters";

export const metadata = { title: "PYQ Library" };

const YEARS = [2022, 2023, 2024, 2025, 2026];
const PAGE = 20;

export default async function PyqPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const user = await requireUser();
  const { year, subject, chapter, difficulty, status, session, shift } = searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);

  const where: Prisma.QuestionWhereInput = { source: "PYQ", publishStatus: "PUBLISHED" };
  if (year) where.pyqYear = Number(year);
  if (subject) where.subject = { slug: subject };
  if (chapter) where.chapter = { slug: chapter };
  if (difficulty) where.difficulty = difficulty as Prisma.QuestionWhereInput["difficulty"];
  if (session) where.pyqSession = session;
  if (shift) where.pyqShift = shift;
  if (status === "unsolved") where.attempts = { none: { userId: user.id } };
  if (status === "attempted") where.attempts = { some: { userId: user.id } };
  if (status === "incorrect") where.mistakes = { some: { userId: user.id, resolved: false } };
  if (status === "bookmarked") {
    const bms = await db.bookmark.findMany({ where: { userId: user.id, itemType: "QUESTION" }, select: { itemId: true } });
    where.id = { in: bms.map((b) => b.itemId) };
  }

  const [total, questions, totalAll, byYear, chapters, bookmarks, papers] = await Promise.all([
    db.question.count({ where }),
    db.question.findMany({ where, select: QUESTION_PUBLIC_SELECT, orderBy: [{ pyqYear: "desc" }, { pyqDate: "desc" }, { id: "asc" }], skip: (page - 1) * PAGE, take: PAGE }),
    db.question.count({ where: { source: "PYQ", publishStatus: "PUBLISHED" } }),
    db.question.groupBy({ by: ["pyqYear"], where: { source: "PYQ", publishStatus: "PUBLISHED" }, _count: true }),
    db.chapter.findMany({ orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], select: { slug: true, name: true, subject: { select: { slug: true } } } }),
    db.bookmark.findMany({ where: { userId: user.id, itemType: "QUESTION" }, select: { itemId: true } }),
    db.question.groupBy({ by: ["pyqYear", "pyqSession", "pyqShift"], where: { source: "PYQ", publishStatus: "PUBLISHED" }, _count: true, orderBy: [{ pyqYear: "desc" }] }),
  ]);
  const yearCount = Object.fromEntries(byYear.map((y) => [y.pyqYear, y._count]));
  const last = await db.attempt.findMany({ where: { userId: user.id, questionId: { in: questions.map((q) => q.id) } }, orderBy: { createdAt: "asc" }, select: { questionId: true, isCorrect: true } });
  const lastResult: Record<string, boolean> = {};
  for (const a of last) lastResult[a.questionId] = a.isCorrect;

  return (
    <div>
      <PageHeader eyebrow="Last five years" title="JEE Main PYQ Library"
        subtitle="Previous-year questions for 2022–2026, organised by subject, chapter, topic, year, session, shift, difficulty and type — each with a full worked solution."
        actions={totalAll > 0 ? <Link href={`/exams?pyq=1${year ? `&year=${year}` : ""}${subject ? `&subject=${subject}` : ""}${chapter ? `&chapter=${chapter}` : ""}`} className="btn-primary">Start a timed PYQ test</Link> : undefined} />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {YEARS.map((y) => (
          <Link key={y} href={`/pyq?year=${y}`} className={`card p-4 text-center transition hover:border-electric-400 ${year === String(y) ? "!border-electric-500" : ""}`}>
            <div className="font-display text-xl font-bold">{y}</div>
            <div className="muted text-xs">{yearCount[y] ?? 0} questions</div>
          </Link>
        ))}
      </div>

      {totalAll === 0 ? (
        <div className="space-y-4">
          <Empty title="No previous-year questions have been imported yet" action={user.role === "ADMIN" ? <Link href="/admin/questions/import" className="btn-primary">Import PYQs</Link> : undefined}>
            JEE EDGE 100 does not invent or reconstruct exam questions. The PYQ library fills up when the content team imports papers from properly licensed sources, each with its year, session, shift and source attribution. Until then, use the <Link className="link" href="/gym">Question Gym</Link> — its questions are original practice questions, clearly labelled as such.
          </Empty>
          <Card>
            <h2 className="h2 mb-2 flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /> What every PYQ will include</h2>
            <div className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              {["Original statement and all options", "Correct answer and step-by-step solution", "Concept tested and formula used", "Why that formula was chosen", "Alternative method where useful", "Why each wrong option is wrong", "Common mistakes", "Approximate solving time", "Related questions", "Year, session, shift and source attribution"].map((x) => <div key={x} className="flex items-center gap-2"><Archive size={13} className="text-electric-500" />{x}</div>)}
            </div>
          </Card>
        </div>
      ) : (
        <>
          <PyqFilters chapters={chapters.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject.slug }))} current={searchParams} />
          {papers.length > 0 && (
            <details className="card card-pad mb-4">
              <summary className="cursor-pointer font-semibold">Year-wise and shift-wise papers ({papers.length})</summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {papers.map((p) => (
                  <Link key={`${p.pyqYear}-${p.pyqSession}-${p.pyqShift}`} href={`/pyq?year=${p.pyqYear}${p.pyqSession ? `&session=${encodeURIComponent(p.pyqSession)}` : ""}${p.pyqShift ? `&shift=${encodeURIComponent(p.pyqShift)}` : ""}`} className="chip bg-[var(--surface-2)] hover:bg-electric-500/10">
                    {p.pyqYear} · {p.pyqSession ?? "—"} · {p.pyqShift ?? "—"} ({p._count})
                  </Link>
                ))}
              </div>
            </details>
          )}
          <PyqList questions={questions.map((q) => ({ ...q, type: q.type as "MCQ" | "NUMERICAL" }))} bookmarked={bookmarks.map((b) => b.itemId)} lastResult={lastResult} />
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="muted">{total} matching · page {page} of {Math.max(1, Math.ceil(total / PAGE))}</span>
            <div className="flex gap-2">
              {page > 1 && <Link className="btn-ghost" href={{ pathname: "/pyq", query: { ...searchParams, page: page - 1 } }}>Previous</Link>}
              {page * PAGE < total && <Link className="btn-ghost" href={{ pathname: "/pyq", query: { ...searchParams, page: page + 1 } }}>Next</Link>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
