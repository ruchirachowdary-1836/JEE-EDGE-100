import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { Plus, Upload } from "lucide-react";
import { db } from "@/lib/db";
import { Card, PageHeader } from "@/components/ui";
import { StatusControl } from "../StatusControl";
import { DeleteQuestion } from "./DeleteQuestion";

export const metadata = { title: "Admin · Questions" };

export default async function AdminQuestions({ searchParams }: { searchParams: { source?: string; chapter?: string; review?: string; page?: string } }) {
  const where: Prisma.QuestionWhereInput = {};
  if (searchParams.source === "PYQ" || searchParams.source === "PRACTICE") where.source = searchParams.source;
  if (searchParams.chapter) where.chapter = { slug: searchParams.chapter };
  if (searchParams.review) where.reviewStatus = searchParams.review as Prisma.QuestionWhereInput["reviewStatus"];
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [total, questions, chapters] = await Promise.all([
    db.question.count({ where }),
    db.question.findMany({ where, include: { chapter: { select: { name: true } }, topic: { select: { name: true } } }, orderBy: [{ chapterId: "asc" }, { level: "asc" }, { createdAt: "asc" }], skip: (page - 1) * 50, take: 50 }),
    db.chapter.findMany({ orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], select: { slug: true, name: true } }),
  ]);
  const qs = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...searchParams, ...patch })) if (v) p.set(k, v);
    return `/admin/questions?${p}`;
  };
  return (
    <div>
      <PageHeader title="Questions & PYQs" subtitle={`${total} questions match.`} actions={<><Link href="/admin/questions/import" className="btn-ghost"><Upload size={16} /> Bulk import</Link><Link href="/admin/questions/new" className="btn-violet"><Plus size={16} /> New question</Link></>} />
      <form className="mb-4 grid gap-2 sm:grid-cols-4" action="/admin/questions">
        <select name="source" defaultValue={searchParams.source ?? ""} className="input"><option value="">All sources</option><option value="PRACTICE">Practice</option><option value="PYQ">PYQ</option></select>
        <select name="chapter" defaultValue={searchParams.chapter ?? ""} className="input"><option value="">All chapters</option>{chapters.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
        <select name="review" defaultValue={searchParams.review ?? ""} className="input"><option value="">Any review status</option><option value="PENDING">Pending</option><option value="IN_REVIEW">In review</option><option value="CHANGES_REQUESTED">Changes requested</option><option value="VERIFIED">Verified</option></select>
        <button className="btn-ghost">Filter</button>
      </form>
      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[820px] text-sm">
          <thead><tr className="muted border-b border-[var(--border)] text-left text-xs uppercase"><th className="p-3">Question</th><th className="p-3">Chapter / topic</th><th className="p-3">Source</th><th className="p-3">Lvl</th><th className="p-3">Status</th><th className="p-3"></th></tr></thead>
          <tbody>{questions.map((q) => (
            <tr key={q.id} className="border-b border-[var(--border)] last:border-0">
              <td className="max-w-[320px] p-3"><Link href={`/admin/questions/${q.id}`} className="line-clamp-2 hover:underline">{q.statement.replace(/\$[^$]*\$/g, "…")}</Link></td>
              <td className="muted p-3 text-xs">{q.chapter.name}{q.topic ? ` · ${q.topic.name}` : ""}</td>
              <td className="p-3 text-xs">{q.source === "PYQ" ? `PYQ ${q.pyqYear ?? ""}` : "Practice"} · {q.type === "MCQ" ? "MCQ" : "Num"}</td>
              <td className="p-3">{q.level ?? "—"}</td>
              <td className="p-3"><StatusControl model="question" id={q.id} publishStatus={q.publishStatus} reviewStatus={q.reviewStatus} compact /></td>
              <td className="p-3"><DeleteQuestion id={q.id} /></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
      <div className="mt-4 flex justify-end gap-2">
        {page > 1 && <Link className="btn-ghost" href={qs({ page: String(page - 1) })}>Previous</Link>}
        {page * 50 < total && <Link className="btn-ghost" href={qs({ page: String(page + 1) })}>Next</Link>}
      </div>
    </div>
  );
}
