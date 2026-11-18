import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { logEvent } from "@/lib/progress";
import { PageHeader, ReviewBadge, SubjectChip } from "@/components/ui";
import { BookmarkButton } from "@/components/BookmarkButton";
import { FormulaDetail, type FormulaView } from "@/components/FormulaDetail";

export default async function FormulaPage({ params }: { params: { slug: string } }) {
  const user = await requireUser();
  const f = await db.formula.findUnique({
    where: { slug: params.slug },
    include: { chapter: { include: { subject: true } }, topic: true, derivation: { orderBy: { order: "asc" } } },
  });
  if (!f || (f.publishStatus !== "PUBLISHED" && user.role !== "ADMIN")) notFound();
  const bm = await db.bookmark.findUnique({ where: { userId_itemType_itemId: { userId: user.id, itemType: "FORMULA", itemId: f.slug } } });
  await logEvent(user.id, "FORMULA", f.name, `/formulas/${f.slug}`);
  const relations = f.relations as FormulaView["relations"];
  const related = await db.formula.findMany({ where: { slug: { in: relations.map((r) => r.slug).filter(Boolean) as string[] }, publishStatus: "PUBLISHED" }, select: { slug: true, name: true } });

  return (
    <div>
      <PageHeader eyebrow={`${f.chapter.subject.name} · ${f.chapter.name}`} title={f.name}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={f.chapter.subject.slug} /><ReviewBadge status={f.reviewStatus} />{f.topic && <Link className="link text-sm" href={`/topic/${f.topic.slug}`}>Notes: {f.topic.name}</Link>}</span>}
        actions={<><BookmarkButton itemType="FORMULA" itemId={f.slug} initial={!!bm} /><Link href="/formulas" className="btn-ghost">All formulas</Link></>} />
      <FormulaDetail
        relName={Object.fromEntries(related.map((r) => [r.slug, r.name]))}
        f={{
          ...f,
          variables: f.variables as FormulaView["variables"],
          relations,
          derivation: f.derivation.map((d) => ({ statement: d.statement, justification: d.justification })),
          basicExample: f.basicExample as FormulaView["basicExample"],
          jeeExample: f.jeeExample as FormulaView["jeeExample"],
          trickyApplication: f.trickyApplication as FormulaView["trickyApplication"],
        }}
      />
    </div>
  );
}
