import Link from "next/link";
import { Sigma } from "lucide-react";
import { Card } from "@/components/ui";
import { Rich, TeX } from "@/components/Rich";

export type LabEntry = { slug: string; name: string; expression: string };
export type TopicSheet = { slug: string; name: string; body: string };

/** Every formula of a chapter: detailed Formula Lab entries first, then each topic's formula sheet. */
export function ChapterFormulas({ lab, sheets }: { lab: LabEntry[]; sheets: TopicSheet[] }) {
  if (!lab.length && !sheets.length) return null;
  return (
    <Card className="scroll-mt-24" >
      <div id="formula-collection" className="mb-4 flex items-center gap-2">
        <Sigma size={18} className="text-electric-500" />
        <h2 className="h2">Formula collection</h2>
      </div>
      {lab.length > 0 && (
        <div className="mb-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-violet-500">In-depth formula studies</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {lab.map((f) => (
              <Link key={f.slug} href={`/formulas/${f.slug}`} className="rounded-xl border border-[var(--border)] p-3 transition hover:border-electric-400">
                <div className="text-sm font-semibold">{f.name}</div>
                <div className="overflow-x-auto text-sm"><TeX>{f.expression}</TeX></div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-5">
        {sheets.map((s) => (
          <div key={s.slug}>
            <Link href={`/topic/${s.slug}`} className="mb-1 block text-xs font-bold uppercase tracking-wide text-electric-500 hover:underline">{s.name}</Link>
            <Rich text={s.body} className="text-sm" />
          </div>
        ))}
      </div>
    </Card>
  );
}
