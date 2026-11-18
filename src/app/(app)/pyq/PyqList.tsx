"use client";

import { QuestionCard, type CardQuestion } from "@/components/QuestionCard";

export function PyqList({ questions, bookmarked, lastResult }: { questions: CardQuestion[]; bookmarked: string[]; lastResult: Record<string, boolean> }) {
  const bm = new Set(bookmarked);
  if (!questions.length) return <p className="muted py-10 text-center text-sm">No questions match these filters.</p>;
  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <div key={q.id}>
          <QuestionCard q={q} index={i} context="PYQ" bookmarked={bm.has(q.id)} lastResult={lastResult[q.id] ?? null} />
          {q.sourceAttribution && <p className="muted mt-1 px-2 text-xs">Source: {q.sourceAttribution}</p>}
        </div>
      ))}
    </div>
  );
}
