import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { settleIfExpired } from "@/lib/exam";
import { CBT } from "./CBT";

export const metadata = { title: "Test in progress" };

export default async function ExamRoom({ params }: { params: { id: string } }) {
  const user = await requireUser();
  await settleIfExpired(params.id);
  const attempt = await db.mockAttempt.findUnique({
    where: { id: params.id },
    include: {
      mockExam: {
        include: {
          items: {
            orderBy: { order: "asc" },
            include: { question: { select: { id: true, type: true, statement: true, options: { select: { id: true, label: true, text: true }, orderBy: { order: "asc" } } } } },
          },
        },
      },
      responses: true,
    },
  });
  if (!attempt || attempt.userId !== user.id) notFound();
  if (attempt.status === "SUBMITTED") redirect(`/exams/${attempt.id}/result`);
  const resp = new Map(attempt.responses.map((r) => [r.questionId, r]));
  const marks = (attempt.mockExam.pattern as { marks: { correct: number; incorrectMcq: number; incorrectNumerical: number } }).marks;

  return (
    <CBT
      attemptId={attempt.id}
      title={attempt.mockExam.title}
      candidate={user.name}
      endsAt={attempt.endsAt.toISOString()}
      serverNow={new Date().toISOString()}
      marks={marks}
      questions={attempt.mockExam.items.map((it) => {
        const r = resp.get(it.questionId);
        return {
          id: it.question.id, section: it.section, type: it.question.type as "MCQ" | "NUMERICAL", statement: it.question.statement, options: it.question.options,
          selectedOptionId: r?.selectedOptionId ?? null, numericalResponse: r?.numericalResponse ?? null, state: r?.state ?? "NOT_VISITED",
        };
      })}
    />
  );
}
