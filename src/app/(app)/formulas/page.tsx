import Link from "next/link";
import { Columns2, Layers } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { FormulaBrowser } from "./FormulaBrowser";

export const metadata = { title: "Formula Lab" };

export default async function FormulasPage() {
  const user = await requireUser();
  const [formulas, chapters, bookmarks] = await Promise.all([
    db.formula.findMany({
      where: { publishStatus: "PUBLISHED" },
      include: { chapter: { include: { subject: true } } },
      orderBy: [{ chapter: { subject: { order: "asc" } } }, { chapter: { order: "asc" } }, { name: "asc" }],
    }),
    db.chapter.findMany({ orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], include: { subject: true, _count: { select: { formulas: { where: { publishStatus: "PUBLISHED" } } } } } }),
    db.bookmark.findMany({ where: { userId: user.id, itemType: "FORMULA" }, select: { itemId: true } }),
  ]);
  const withoutFormulas = chapters.filter((c) => c._count.formulas === 0).length;
  return (
    <div>
      <PageHeader eyebrow="Formula Intelligence Lab" title="Every formula, justified"
        subtitle="Each entry explains where the formula comes from, why it works, exactly when it applies — and when it does not."
        actions={<><Link href="/formulas/compare" className="btn-ghost"><Columns2 size={16} /> Comparisons</Link><Link href="/revision?deck=FORMULA" className="btn-primary"><Layers size={16} /> Formula revision</Link></>} />
      <FormulaBrowser
        formulas={formulas.map((f) => ({
          slug: f.slug, name: f.name, expression: f.expression, whenToUse: f.whenToUse, subject: f.chapter.subject.slug,
          chapter: f.chapter.name, chapterSlug: f.chapter.slug, reviewStatus: f.reviewStatus,
          search: `${f.name} ${f.chapter.name} ${f.whenToUse} ${f.origin} ${(f.variables as { meaning: string }[]).map((v) => v.meaning).join(" ")}`.toLowerCase(),
        }))}
        chapters={chapters.filter((c) => c._count.formulas > 0).map((c) => ({ slug: c.slug, name: c.name, subject: c.subject.slug }))}
        bookmarked={bookmarks.map((b) => b.itemId)}
      />
      <p className="muted mt-6 text-sm">{withoutFormulas} of {chapters.length} chapters do not have a verified formula collection yet; they show a content-pending notice on their chapter page.</p>
    </div>
  );
}
