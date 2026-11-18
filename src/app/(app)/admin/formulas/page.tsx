import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Card, PageHeader } from "@/components/ui";
import { TeX } from "@/components/Rich";
import { StatusControl } from "../StatusControl";

export const metadata = { title: "Admin · Formulas" };

export default async function AdminFormulas() {
  const formulas = await db.formula.findMany({ include: { chapter: { include: { subject: true } } }, orderBy: [{ chapter: { subject: { order: "asc" } } }, { chapter: { order: "asc" } }, { name: "asc" }] });
  return (
    <div>
      <PageHeader title="Formulas" subtitle="Every formula needs all 21 structured fields before it can be saved." actions={<Link href="/admin/formulas/new" className="btn-violet"><Plus size={16} /> New formula</Link>} />
      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[720px] text-sm">
          <thead><tr className="muted border-b border-[var(--border)] text-left text-xs uppercase"><th className="p-3">Formula</th><th className="p-3">Expression</th><th className="p-3">Chapter</th><th className="p-3">Status</th></tr></thead>
          <tbody>{formulas.map((f) => (
            <tr key={f.id} className="border-b border-[var(--border)] last:border-0">
              <td className="p-3"><Link href={`/admin/formulas/${f.slug}`} className="font-semibold hover:underline">{f.name}</Link></td>
              <td className="max-w-[260px] overflow-x-auto p-3"><TeX>{f.expression}</TeX></td>
              <td className="muted p-3">{f.chapter.name}</td>
              <td className="p-3"><StatusControl model="formula" id={f.id} publishStatus={f.publishStatus} reviewStatus={f.reviewStatus} compact /></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
}
