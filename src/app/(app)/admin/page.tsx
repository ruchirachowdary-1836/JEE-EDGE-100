import Link from "next/link";
import { db } from "@/lib/db";
import { Card, PageHeader } from "@/components/ui";
import { StatusControl } from "./StatusControl";

export const metadata = { title: "Admin" };

export default async function AdminHome() {
  const groupCount = async (model: "note" | "formula" | "question" | "animation" | "formulaComparison" | "namedReaction" | "conceptCard") => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: { publishStatus: string; reviewStatus: string; _count: number }[] = await (db as any)[model].groupBy({ by: ["publishStatus", "reviewStatus"], _count: true });
    const c = (f: (r: { publishStatus: string; reviewStatus: string }) => boolean) => rows.filter(f).reduce((a, r) => a + r._count, 0);
    return { total: c(() => true), published: c((r) => r.publishStatus === "PUBLISHED"), verified: c((r) => r.reviewStatus === "VERIFIED"), pending: c((r) => r.reviewStatus !== "VERIFIED") };
  };
  const [notes, formulas, questions, animations, comps, reactions, cards, users, chapters, topics, topicsWithNotes, queueQ, queueF, queueN] = await Promise.all([
    groupCount("note"), groupCount("formula"), groupCount("question"), groupCount("animation"), groupCount("formulaComparison"), groupCount("namedReaction"), groupCount("conceptCard"),
    db.user.groupBy({ by: ["role"], _count: true }), db.chapter.count(), db.topic.count(), db.note.count(),
    db.question.findMany({ where: { reviewStatus: { not: "VERIFIED" } }, take: 10, orderBy: { createdAt: "desc" }, include: { chapter: { select: { name: true } } } }),
    db.formula.findMany({ where: { reviewStatus: { not: "VERIFIED" } }, take: 10, orderBy: { updatedAt: "desc" } }),
    db.note.findMany({ where: { reviewStatus: { not: "VERIFIED" } }, take: 10, orderBy: { updatedAt: "desc" }, include: { topic: { select: { name: true, slug: true, id: true } } } }),
  ]);
  const rows = [
    ["Notes", notes, "/admin/syllabus"], ["Formulas", formulas, "/admin/formulas"], ["Questions (practice + PYQ)", questions, "/admin/questions"],
    ["Animated lessons", animations, "/admin/animations"], ["Comparisons", comps, "/formulas/compare"], ["Named reactions", reactions, "/chemistry?tab=reactions"], ["Concept cards", cards, "/revision?deck=CONCEPT"],
  ] as const;

  return (
    <div>
      <PageHeader title="Content overview" subtitle={`${chapters} chapters · ${topics} topics (${topicsWithNotes} with notes) · ${users.map((u) => `${u._count} ${u.role.toLowerCase()}${u._count === 1 ? "" : "s"}`).join(", ")}`} />
      <Card className="mb-6 overflow-x-auto !p-0">
        <table className="w-full min-w-[560px] text-sm">
          <thead><tr className="muted border-b border-[var(--border)] text-left text-xs uppercase"><th className="p-3">Content type</th><th className="p-3">Total</th><th className="p-3">Published</th><th className="p-3">Expert verified</th><th className="p-3">Awaiting verification</th></tr></thead>
          <tbody>{rows.map(([label, c, href]) => (
            <tr key={label} className="border-b border-[var(--border)] last:border-0"><td className="p-3"><Link href={href} className="font-semibold hover:underline">{label}</Link></td><td className="p-3">{c.total}</td><td className="p-3">{c.published}</td><td className="p-3 text-emerald-500">{c.verified}</td><td className="p-3 text-amber-500">{c.pending}</td></tr>
          ))}</tbody>
        </table>
      </Card>
      <div className="mb-3 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 p-4 text-sm">
        <strong>Verification workflow.</strong> Published items are visible to students immediately and carry an “Awaiting expert review” badge until a subject expert marks them <em>Verified</em>. Editing an item resets it to <em>Pending</em>. Use <em>Changes requested</em> to flag errors, and unpublish anything incorrect.
      </div>
      <h2 className="h2 mb-3">Review queue</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <div className="mb-2 font-semibold">Notes</div>
          {queueN.map((n) => <div key={n.id} className="flex flex-col gap-1 border-b border-[var(--border)] py-2 last:border-0"><Link className="link text-sm" href={`/admin/notes/${n.topic.id}`}>{n.topic.name}</Link><StatusControl model="note" id={n.id} publishStatus={n.publishStatus} reviewStatus={n.reviewStatus} compact /></div>)}
          {queueN.length === 0 && <p className="muted text-sm">Nothing waiting.</p>}
        </Card>
        <Card>
          <div className="mb-2 font-semibold">Formulas</div>
          {queueF.map((f) => <div key={f.id} className="flex flex-col gap-1 border-b border-[var(--border)] py-2 last:border-0"><Link className="link text-sm" href={`/admin/formulas/${f.slug}`}>{f.name}</Link><StatusControl model="formula" id={f.id} publishStatus={f.publishStatus} reviewStatus={f.reviewStatus} compact /></div>)}
          {queueF.length === 0 && <p className="muted text-sm">Nothing waiting.</p>}
        </Card>
        <Card>
          <div className="mb-2 font-semibold">Questions</div>
          {queueQ.map((q) => <div key={q.id} className="flex flex-col gap-1 border-b border-[var(--border)] py-2 last:border-0"><Link className="link line-clamp-1 text-sm" href={`/admin/questions/${q.id}`}>{q.chapter.name}: {q.statement.replace(/\$[^$]*\$/g, "…").slice(0, 60)}</Link><StatusControl model="question" id={q.id} publishStatus={q.publishStatus} reviewStatus={q.reviewStatus} compact /></div>)}
          {queueQ.length === 0 && <p className="muted text-sm">Nothing waiting.</p>}
        </Card>
      </div>
    </div>
  );
}
