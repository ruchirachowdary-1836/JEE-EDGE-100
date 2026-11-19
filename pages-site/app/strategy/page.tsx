import { PageHeader } from "@/components/ui";
import { StrategyGuide } from "@/components/StrategyGuide";
import { STRATEGY_TRACKS } from "@content/strategy";
import { CHAPTERS } from "@site/lib/data";

export const metadata = { title: "Exam Playbook" };

export default function StrategyPage() {
  const chapters = CHAPTERS.filter((c) => c.planWeight >= 4).sort((a, b) => b.planWeight - a.planWeight);
  return (
    <div>
      <PageHeader eyebrow="Exam strategy" title="Exam Playbook: JEE Main and JEE Advanced" subtitle="Two separate strategies: JEE Main 2027 (pattern, speed, accuracy, percentiles) and JEE Advanced 2027 (two papers, variable and partial marking, the AIR 100 framework). Official rules and our recommendations are labelled separately." />
      <StrategyGuide tracks={STRATEGY_TRACKS} chapters={chapters.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject, weight: c.planWeight }))} />
    </div>
  );
}
