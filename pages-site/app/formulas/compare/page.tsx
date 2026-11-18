import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { Rich } from "@/components/Rich";
import { COMPARISONS } from "@site/lib/data";

export const metadata = { title: "Formula comparisons" };

export default function ComparePage() {
  return (
    <div>
      <PageHeader eyebrow="Formula Lab" title="Side-by-side comparisons" subtitle="Pairs of ideas that students most often confuse, compared aspect by aspect." actions={<Link href="/formulas" className="btn-ghost">All formulas</Link>} />
      <div className="space-y-6">
        {COMPARISONS.map((c) => (
          <Card key={c.slug}>
            <h2 id={c.slug} className="h2 mb-3 scroll-mt-24">{c.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead><tr className="border-b border-[var(--border)]"><th className="muted w-1/4 py-2 pr-3 text-xs uppercase">Aspect</th><th className="py-2 pr-3 text-electric-500">{c.leftTitle}</th><th className="py-2 text-violet-500">{c.rightTitle}</th></tr></thead>
                <tbody>{c.rows.map((r) => <tr key={r.aspect} className="border-b border-[var(--border)] align-top last:border-0"><td className="py-2 pr-3 font-semibold">{r.aspect}</td><td className="py-2 pr-3"><Rich text={r.left} /></td><td className="py-2"><Rich text={r.right} /></td></tr>)}</tbody>
              </table>
            </div>
            <div className="mt-3 rounded-xl bg-[var(--surface-2)] p-3 text-sm"><Rich text={c.summary} /></div>
          </Card>
        ))}
      </div>
    </div>
  );
}
