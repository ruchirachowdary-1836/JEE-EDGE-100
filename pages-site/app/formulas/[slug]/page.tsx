import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, ReviewBadge, SubjectChip } from "@/components/ui";
import { FormulaDetail } from "@/components/FormulaDetail";
import { FORMULAS, chapterBySlug, topicBySlug } from "@site/lib/data";

export const generateStaticParams = () => FORMULAS.map((f) => ({ slug: f.slug }));
export const dynamicParams = false;

export default function FormulaPage({ params }: { params: { slug: string } }) {
  const f = FORMULAS.find((x) => x.slug === params.slug);
  if (!f) notFound();
  const c = chapterBySlug(f.chapter)!;
  const t = f.topic ? topicBySlug(f.topic) : undefined;
  return (
    <div>
      <PageHeader eyebrow={c.name} title={f.name}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={c.subject} /><ReviewBadge status="PENDING" />{t && <Link className="link text-sm" href={`/topic/${t.slug}`}>Notes: {t.name}</Link>}</span>}
        actions={<Link href="/formulas" className="btn-ghost">All formulas</Link>} />
      <FormulaDetail f={f} relName={Object.fromEntries(FORMULAS.map((x) => [x.slug, x.name]))} />
    </div>
  );
}
