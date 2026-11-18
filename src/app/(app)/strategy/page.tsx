import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { StrategyGuide } from "@/components/StrategyGuide";
import { STRATEGY } from "@content/strategy";

export const metadata = { title: "AIR 100 Playbook" };

export default async function StrategyPage() {
  await requireUser();
  const chapters = await db.chapter.findMany({
    where: { publishStatus: "PUBLISHED", planWeight: { gte: 4 } },
    orderBy: [{ planWeight: "desc" }, { order: "asc" }],
    include: { subject: true },
  });
  return (
    <div>
      <PageHeader eyebrow="Exam strategy" title="AIR 100 Playbook" subtitle="How to turn preparation into marks: paper strategy, time plan, accuracy rules, the mistake loop and the last 60 days." />
      <StrategyGuide sections={STRATEGY} chapters={chapters.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject.slug, weight: c.planWeight }))} />
    </div>
  );
}
