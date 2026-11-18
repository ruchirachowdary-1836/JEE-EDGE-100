import { db } from "@/lib/db";
import { getSettings } from "@/lib/config";
import { Card, PageHeader } from "@/components/ui";
import { StatusControl } from "../StatusControl";
import { MockBuilder, DeleteMock } from "./MockBuilder";

export const metadata = { title: "Admin · Mock exams" };

export default async function AdminMocks() {
  const [mocks, settings, bank] = await Promise.all([
    db.mockExam.findMany({ where: { ownerId: null }, include: { _count: { select: { items: true, attempts: true } } }, orderBy: { createdAt: "desc" } }),
    getSettings(),
    db.question.groupBy({ by: ["type"], where: { publishStatus: "PUBLISHED" }, _count: true }),
  ]);
  return (
    <div>
      <PageHeader title="Mock exams" subtitle={`Published bank: ${bank.map((b) => `${b._count} ${b.type === "MCQ" ? "MCQ" : "numerical"}`).join(", ") || "empty"}. Student-built chapter tests are not listed here.`} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {mocks.map((m) => (
            <Card key={m.id} className="flex flex-wrap items-center gap-3 !p-4">
              <div className="min-w-0 flex-1"><div className="font-semibold">{m.title}</div><div className="muted text-xs">{m.kind} · {m._count.items} questions · {m.durationMin} min · {m._count.attempts} attempts</div></div>
              <StatusControl model="mockExam" id={m.id} publishStatus={m.publishStatus} reviewStatus={m.reviewStatus} compact />
              <DeleteMock id={m.id} />
            </Card>
          ))}
          {mocks.length === 0 && <p className="muted text-sm">No mocks yet.</p>}
        </div>
        <Card><h2 className="h2 mb-3">Assemble a mock</h2><MockBuilder pattern={settings.examPattern} /></Card>
      </div>
    </div>
  );
}
