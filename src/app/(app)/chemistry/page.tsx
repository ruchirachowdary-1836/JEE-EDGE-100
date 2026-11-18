import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { ChemLab } from "./ChemLab";

export const metadata = { title: "Chemistry Lab" };

export default async function ChemistryPage({ searchParams }: { searchParams: { tab?: string } }) {
  const user = await requireUser();
  const [reactions, exceptions, physTopics, bms] = await Promise.all([
    db.namedReaction.findMany({ where: { publishStatus: "PUBLISHED" }, include: { chapter: { select: { name: true } } }, orderBy: { name: "asc" } }),
    db.inorganicException.findMany({ where: { publishStatus: "PUBLISHED" }, include: { chapter: { select: { name: true, slug: true } } }, orderBy: { title: "asc" } }),
    db.topic.findMany({ where: { chapter: { unit: "Physical Chemistry" }, questions: { some: { publishStatus: "PUBLISHED" } } }, select: { slug: true, name: true, chapter: { select: { name: true } }, _count: { select: { questions: true } } } }),
    db.bookmark.findMany({ where: { userId: user.id, itemType: "REACTION" }, select: { itemId: true } }),
  ]);
  return (
    <div>
      <PageHeader eyebrow="Chemistry special features" title="Chemistry Lab" subtitle="Reference tools for the facts and patterns Chemistry asks you to know cold — all built on curated reference data and fixed rules." />
      <ChemLab
        initialTab={searchParams.tab ?? "table"}
        reactions={reactions.map((r) => ({ slug: r.slug, name: r.name, chapter: r.chapter?.name ?? "", reactant: r.reactant, reagents: r.reagents, product: r.product, equation: r.equation, mechanism: r.mechanism, notes: r.notes, reviewStatus: r.reviewStatus }))}
        exceptions={exceptions.map((e) => ({ id: e.id, title: e.title, statement: e.statement, reason: e.reason, chapter: e.chapter.name, chapterSlug: e.chapter.slug }))}
        physTopics={physTopics.map((t) => ({ slug: t.slug, name: t.name, chapter: t.chapter.name, count: t._count.questions }))}
        bookmarked={bms.map((b) => b.itemId)}
      />
    </div>
  );
}
