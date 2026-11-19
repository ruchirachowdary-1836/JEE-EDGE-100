import { PageHeader } from "@/components/ui";
import { CHAPTERS, QUESTIONS } from "@site/lib/data";
import { DECK_CARDS } from "@site/lib/cards";
import { ProgressDashboard } from "./ProgressDashboard";

export const metadata = { title: "My progress" };

export default function ProgressPage() {
  return (
    <div>
      <PageHeader eyebrow="Performance" title="My progress"
        subtitle="Subject-wise and chapter-wise progress from your own saved activity: topics studied, questions attempted, accuracy, weak topics, revision backlog and timed tests. No rank or AIR predictions are shown — a few practice sessions cannot predict a rank." />
      <ProgressDashboard
        questions={QUESTIONS.map((q) => ({ id: q.id, topic: q.topic, topicName: q.topicName, chapterSlug: q.chapterSlug, subject: q.subject, level: q.level }))}
        chapters={CHAPTERS.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject, topics: c.topics.map((t) => ({ slug: t.slug, name: t.name })) }))}
        cardKeys={DECK_CARDS.map((c) => ({ key: c.key, deck: c.deck, chapter: c.chapter }))} />
    </div>
  );
}
