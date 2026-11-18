import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { QUESTION_PUBLIC_SELECT } from "@/lib/questions";
import { PageHeader } from "@/components/ui";
import { PyqList } from "../../pyq/PyqList";

export const metadata = { title: "Question" };

export default async function QuestionPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const q = await db.question.findFirst({ where: { id: params.id, publishStatus: "PUBLISHED" }, select: QUESTION_PUBLIC_SELECT });
  if (!q) notFound();
  const [bm, last] = await Promise.all([
    db.bookmark.findUnique({ where: { userId_itemType_itemId: { userId: user.id, itemType: "QUESTION", itemId: q.id } } }),
    db.attempt.findFirst({ where: { userId: user.id, questionId: q.id }, orderBy: { createdAt: "desc" } }),
  ]);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow={q.source === "PYQ" ? "Previous-year question" : "Practice question"} title={q.topic?.name ?? q.chapter.name}
        actions={<Link href={`/chapter/${q.chapter.slug}`} className="btn-ghost">{q.chapter.name}</Link>} />
      <PyqList questions={[{ ...q, type: q.type as "MCQ" | "NUMERICAL" }]} bookmarked={bm ? [q.id] : []} lastResult={last ? { [q.id]: last.isCorrect } : {}} />
    </div>
  );
}
