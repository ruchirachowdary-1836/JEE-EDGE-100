import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { QuestionEditor, type QForm } from "./QuestionEditor";

export default async function QuestionAdmin({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const q = isNew ? null : await db.question.findUnique({ where: { id: params.id }, include: { options: { orderBy: { order: "asc" } }, chapter: true, topic: true } });
  if (!isNew && !q) notFound();
  const chapters = await db.chapter.findMany({ orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], select: { slug: true, name: true, topics: { select: { slug: true, name: true }, orderBy: { order: "asc" } } } });
  const initial: QForm = q
    ? {
        id: q.id, source: q.source, type: q.type, chapterSlug: q.chapter.slug, topicSlug: q.topic?.slug ?? "", level: q.level ?? 1, difficulty: q.difficulty, statement: q.statement,
        options: q.options.map((o) => ({ text: o.text, isCorrect: o.isCorrect, explanation: o.explanation })), numericalAnswer: q.numericalAnswer?.toString() ?? "",
        numericalTolerance: q.numericalTolerance, solution: q.solution, conceptTested: q.conceptTested, formulaUsed: q.formulaUsed, whyFormula: q.whyFormula, altMethod: q.altMethod ?? "",
        commonMistakes: q.commonMistakes, approxTimeSec: q.approxTimeSec, pyqYear: q.pyqYear?.toString() ?? "", pyqSession: q.pyqSession ?? "", pyqShift: q.pyqShift ?? "",
        pyqDate: q.pyqDate ? new Date(q.pyqDate.getTime() + 5.5 * 3600_000).toISOString().slice(0, 10) : "", sourceAttribution: q.sourceAttribution ?? "",
      }
    : {
        source: "PRACTICE", type: "MCQ", chapterSlug: chapters[0]?.slug ?? "", topicSlug: "", level: 1, difficulty: "MEDIUM", statement: "",
        options: [0, 1, 2, 3].map((i) => ({ text: "", isCorrect: i === 0, explanation: "" })), numericalAnswer: "", numericalTolerance: 0.01, solution: "", conceptTested: "",
        formulaUsed: "", whyFormula: "", altMethod: "", commonMistakes: "", approxTimeSec: 120, pyqYear: "", pyqSession: "", pyqShift: "", pyqDate: "", sourceAttribution: "",
      };
  return (
    <div>
      <PageHeader title={isNew ? "New question" : "Edit question"} subtitle="New and edited questions are saved as draft / pending review. Publish from the list once verified." />
      <QuestionEditor initial={initial} chapters={chapters} />
    </div>
  );
}
