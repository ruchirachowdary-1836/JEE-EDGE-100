import Link from "next/link";
import { Columns2, Layers, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { FormulaBrowser } from "@/app/(app)/formulas/FormulaBrowser";
import { FORMULAS, CHAPTERS, chapterBySlug } from "@site/lib/data";

export const metadata = { title: "Formula Lab" };

export default function FormulasPage() {
  const withF = CHAPTERS.filter((c) => FORMULAS.some((f) => f.chapter === c.slug));
  return (
    <div>
      <PageHeader eyebrow="Formula Intelligence Lab" title="Every formula, justified"
        subtitle="Each entry explains where the formula comes from, why it works, exactly when it applies — and when it does not."
        actions={<><Link href="/formulas/sheet" className="btn-ghost"><FileText size={16} /> Formula sheet</Link><Link href="/formulas/compare" className="btn-ghost"><Columns2 size={16} /> Comparisons</Link><Link href="/revision?deck=FORMULA" className="btn-primary"><Layers size={16} /> Formula flashcards</Link></>} />
      <FormulaBrowser
        formulas={FORMULAS.map((f) => {
          const c = chapterBySlug(f.chapter)!;
          return {
            slug: f.slug, name: f.name, expression: f.expression, whenToUse: f.whenToUse, subject: c.subject, chapter: c.name, chapterSlug: c.slug, reviewStatus: "PENDING",
            search: `${f.name} ${c.name} ${f.whenToUse} ${f.origin} ${f.variables.map((v) => v.meaning).join(" ")}`.toLowerCase(),
          };
        })}
        chapters={withF.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject }))}
        bookmarked={[]}
      />
    </div>
  );
}
