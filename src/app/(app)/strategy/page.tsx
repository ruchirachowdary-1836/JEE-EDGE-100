import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { StrategyGuide } from "@/components/StrategyGuide";
import { STRATEGY_TRACKS } from "@content/strategy";

export const metadata = { title: "Exam Playbook" };

export default async function StrategyPage() {
  await requireUser();
  const chapters = await db.chapter.findMany({
    where: { publishStatus: "PUBLISHED", planWeight: { gte: 4 } },
    orderBy: [{ planWeight: "desc" }, { order: "asc" }],
    include: { subject: true },
  });
  return (
    <div>
      <PageHeader eyebrow="Exam strategy" title="Exam Playbook: JEE Main and JEE Advanced" subtitle="Two separate strategies: JEE Main 2027 (pattern, speed, accuracy, percentiles) and JEE Advanced 2027 (two papers, variable and partial marking, the AIR 100 framework). Official rules and our recommendations are labelled separately." />
      <StrategyGuide tracks={STRATEGY_TRACKS} chapters={chapters.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject.slug, weight: c.planWeight }))} />
    </div>
  );
}
