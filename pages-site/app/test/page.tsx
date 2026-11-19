import { PageHeader } from "@/components/ui";
import { CHAPTERS, QUESTIONS } from "@site/lib/data";
import { TimedTest } from "./TimedTest";

export const metadata = { title: "Timed test" };

export default function TestPage() {
  return (
    <div>
      <PageHeader eyebrow="Exam practice" title="Timed test"
        subtitle="Build a timed test from the original practice questions, with JEE Main marking and a question palette. These are original questions, not previous-year papers. Results are saved to your Progress page." />
      <TimedTest questions={QUESTIONS} chapters={CHAPTERS.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject, count: QUESTIONS.filter((q) => q.chapterSlug === c.slug).length }))} />
    </div>
  );
}
