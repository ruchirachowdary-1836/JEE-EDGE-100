import { PageHeader } from "@/components/ui";
import { ChemLab } from "@/app/(app)/chemistry/ChemLab";
import { NAMED_REACTIONS, INORGANIC_EXCEPTIONS, QUESTIONS, TOPICS, chapterBySlug } from "@site/lib/data";

export const metadata = { title: "Chemistry Lab" };

export default function ChemistryPage() {
  const phys = TOPICS.filter((t) => chapterBySlug(t.chapterSlug)?.unit === "Physical Chemistry" && QUESTIONS.some((q) => q.topic === t.slug));
  return (
    <div>
      <PageHeader eyebrow="Chemistry special features" title="Chemistry Lab" subtitle="Reference tools for the facts and patterns Chemistry asks you to know cold." />
      <ChemLab
        initialTab="table"
        staticMode
        reactions={NAMED_REACTIONS.map((r) => ({ ...r, chapter: chapterBySlug(r.chapter)?.name ?? "", reviewStatus: "PENDING" }))}
        exceptions={INORGANIC_EXCEPTIONS.map((e, i) => ({ id: String(i), title: e.title, statement: e.statement, reason: e.reason, chapter: chapterBySlug(e.chapter)?.name ?? "", chapterSlug: e.chapter }))}
        physTopics={phys.map((t) => ({ slug: t.slug, name: t.name, chapter: t.chapterName, count: QUESTIONS.filter((q) => q.topic === t.slug).length }))}
        bookmarked={[]}
      />
    </div>
  );
}
