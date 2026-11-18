import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { FormulaSheet, type SheetGroup } from "@/components/FormulaSheet";
import { PrintButton } from "@/app/(app)/topic/[slug]/sheet/PrintButton";
import { CHAPTERS, NOTES } from "@site/lib/data";

export const metadata = { title: "Formula sheet" };

export default function FormulaSheetPage() {
  const groups: SheetGroup[] = CHAPTERS.map((c) => ({
    subject: c.subject, chapter: c.name, chapterSlug: c.slug,
    topics: c.topics.flatMap((t) => {
      const s = NOTES[t.slug]?.find((x) => x.key === "formulas");
      return s ? [{ slug: t.slug, name: t.name, body: s.body }] : [];
    }),
  })).filter((g) => g.topics.length);
  return (
    <div>
      <PageHeader eyebrow="Formula Lab" title="Formula sheet" subtitle="Every formula from the master notes, each with the condition under which it holds. Open a topic for derivations and worked examples."
        actions={<><PrintButton /><Link href="/formulas" className="btn-ghost">Formula Lab</Link></>} />
      <FormulaSheet groups={groups} />
    </div>
  );
}
