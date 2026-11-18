import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, PageHeader, ReviewBadge } from "@/components/ui";
import { Rich } from "@/components/Rich";

export const metadata = { title: "Formula comparisons" };

export default async function ComparePage() {
  await requireUser();
  const comps = await db.formulaComparison.findMany({ where: { publishStatus: "PUBLISHED" }, include: { chapter: true }, orderBy: { title: "asc" } });
  return (
    <div>
      <PageHeader eyebrow="Formula Lab" title="Side-by-side comparisons" subtitle="Pairs of ideas that students most often confuse, compared aspect by aspect." actions={<Link href="/formulas" className="btn-ghost">All formulas</Link>} />
      <div className="mb-6 flex flex-wrap gap-2">
        {comps.map((c) => <a key={c.slug} href={`#${c.slug}`} className="chip bg-[var(--surface-2)] hover:bg-electric-500/10">{c.title}</a>)}
      </div>
      <div className="space-y-6">
        {comps.map((c) => {
          const rows = c.rows as { aspect: string; left: string; right: string }[];
          return (
            <Card key={c.slug} className="scroll-mt-6">
              <div id={c.slug} className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="h2">{c.title}</h2>
                <div className="flex items-center gap-2">{c.chapter && <Link href={`/chapter/${c.chapter.slug}`} className="link text-xs">{c.chapter.name}</Link>}<ReviewBadge status={c.reviewStatus} /></div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="muted w-1/4 py-2 pr-3 text-xs uppercase">Aspect</th>
                      <th className="w-[37.5%] py-2 pr-3 text-electric-500">{c.leftTitle}</th>
                      <th className="w-[37.5%] py-2 text-violet-500">{c.rightTitle}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.aspect} className="border-b border-[var(--border)] align-top last:border-0">
                        <td className="py-2 pr-3 font-semibold">{r.aspect}</td>
                        <td className="py-2 pr-3"><Rich text={r.left} /></td>
                        <td className="py-2"><Rich text={r.right} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 rounded-xl bg-[var(--surface-2)] p-3 text-sm"><Rich text={c.summary} /></div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
