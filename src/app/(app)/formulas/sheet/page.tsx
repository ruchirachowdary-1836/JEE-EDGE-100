import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { FormulaSheet, type SheetGroup } from "@/components/FormulaSheet";
import { PrintButton } from "../../topic/[slug]/sheet/PrintButton";

export const metadata = { title: "Formula sheet" };

export default async function FormulaSheetPage() {
  await requireUser();
  const notes = await db.note.findMany({
    where: { publishStatus: "PUBLISHED" },
    include: { topic: { include: { chapter: { include: { subject: true } } } } },
    orderBy: [{ topic: { chapter: { subject: { order: "asc" } } } }, { topic: { chapter: { order: "asc" } } }, { topic: { order: "asc" } }],
  });
  const groups: SheetGroup[] = [];
  for (const n of notes) {
    const sheet = (n.sections as { key: string; body: string }[]).find((s) => s.key === "formulas");
    if (!sheet) continue;
    const c = n.topic.chapter;
    let g = groups.find((x) => x.chapterSlug === c.slug);
    if (!g) groups.push((g = { subject: c.subject.slug, chapter: c.name, chapterSlug: c.slug, topics: [] }));
    g.topics.push({ slug: n.topic.slug, name: n.topic.name, body: sheet.body });
  }
  return (
    <div>
      <PageHeader eyebrow="Formula Lab" title="Formula sheet" subtitle="Every formula from the master notes, each with the condition under which it holds. Open a topic for derivations and worked examples."
        actions={<><PrintButton /><Link href="/formulas" className="btn-ghost">Formula Lab</Link></>} />
      <FormulaSheet groups={groups} />
    </div>
  );
}
