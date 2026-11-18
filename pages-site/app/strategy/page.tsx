import { PageHeader } from "@/components/ui";
import { StrategyGuide } from "@/components/StrategyGuide";
import { STRATEGY } from "@content/strategy";
import { CHAPTERS } from "@site/lib/data";

export const metadata = { title: "AIR 100 Playbook" };

export default function StrategyPage() {
  const chapters = CHAPTERS.filter((c) => c.planWeight >= 4).sort((a, b) => b.planWeight - a.planWeight);
  return (
    <div>
      <PageHeader eyebrow="Exam strategy" title="AIR 100 Playbook" subtitle="How to turn preparation into marks: paper strategy, time plan, accuracy rules, the mistake loop and the last 60 days." />
      <StrategyGuide sections={STRATEGY} chapters={chapters.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject, weight: c.planWeight }))} />
    </div>
  );
}
