import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Rich, TeX } from "@/components/Rich";
import { PrintButton } from "./PrintButton";

export const metadata = { title: "Revision sheet" };

/** Printable one-page revision sheet: quick summary, traps and every formula in the topic. Use the browser's Save as PDF to download. */
export default async function RevisionSheet({ params }: { params: { slug: string } }) {
  await requireUser();
  const topic = await db.topic.findUnique({
    where: { slug: params.slug },
    include: { chapter: { include: { subject: true } }, note: true, formulas: { where: { publishStatus: "PUBLISHED" } } },
  });
  if (!topic || !topic.note || topic.note.publishStatus !== "PUBLISHED") notFound();
  const sections = topic.note.sections as { key: string; title: string; body: string }[];
  const pick = (k: string) => sections.find((s) => s.key === k);
  const parts = ["summary", "specialCases", "traps", "misconceptions"].map(pick).filter(Boolean) as { key: string; title: string; body: string }[];
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="muted text-xs font-bold uppercase tracking-[0.18em]">{topic.chapter.subject.name} · {topic.chapter.name} · Revision sheet</div>
          <h1 className="h1">{topic.name}</h1>
        </div>
        <PrintButton />
      </div>
      {parts.map((s) => (
        <div key={s.key} className="card card-pad">
          <h2 className="h2 mb-2">{s.title}</h2>
          <Rich text={s.body} className="text-sm" />
        </div>
      ))}
      {topic.formulas.length > 0 && (
        <div className="card card-pad">
          <h2 className="h2 mb-2">Formulas</h2>
          <div className="space-y-3">
            {topic.formulas.map((f) => (
              <div key={f.id} className="border-b border-[var(--border)] pb-3 last:border-0">
                <div className="text-sm font-semibold">{f.name}</div>
                <TeX display>{f.expression}</TeX>
                <div className="text-xs"><strong>Use when:</strong> <Rich text={f.whenToUse} className="inline" /></div>
                <div className="text-xs"><strong>Not when:</strong> <Rich text={f.whenNotToUse} className="inline" /></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="muted text-xs">JEE EDGE 100 · content review status: {topic.note.reviewStatus.toLowerCase().replace("_", " ")}</p>
    </div>
  );
}
