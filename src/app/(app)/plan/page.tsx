import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { examDateFor } from "@/lib/queries";
import { PHASES } from "@/lib/plan";
import { PageHeader } from "@/components/ui";
import { daysBetween, startOfIstDay, fmtDate } from "@/lib/utils";
import { PlanView, PlanSetup } from "./PlanClient";

export const metadata = { title: "60-Day Plan" };

export default async function PlanPage() {
  const user = await requireUser();
  const [plan, chapters, exam] = await Promise.all([
    db.studyPlan.findFirst({ where: { userId: user.id, active: true }, include: { tasks: { orderBy: [{ day: "asc" }, { id: "asc" }], include: { chapter: { select: { slug: true } } } } } }),
    db.chapter.findMany({ where: { publishStatus: "PUBLISHED" }, orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], select: { id: true, name: true, subject: { select: { slug: true } } } }),
    examDateFor(user.id),
  ]);
  const daysLeft = daysBetween(startOfIstDay(), exam.date);
  const setup = (
    <PlanSetup
      chapters={chapters.map((c) => ({ id: c.id, name: c.name, subject: c.subject.slug }))}
      initialHours={exam.profile?.dailyHours ?? 6}
      initialCompleted={exam.profile?.completedChapterIds ?? []}
      hasPlan={!!plan}
      daysLeft={daysLeft}
    />
  );
  return (
    <div>
      <PageHeader eyebrow="Structured preparation" title="60-Day Preparation Roadmap"
        subtitle={<>Exam date {fmtDate(exam.date)} — {daysLeft} days away. Four phases, a realistic daily budget, a buffer day every week and one-click recovery for missed tasks.</>} />
      {plan ? (
        <PlanView
          phases={PHASES}
          today={daysBetween(startOfIstDay(plan.startDate), startOfIstDay()) + 1}
          startDate={plan.startDate.toISOString()}
          dailyHours={plan.dailyHours}
          tasks={plan.tasks.map((t) => ({ id: t.id, day: t.day, phase: t.phase, kind: t.kind, title: t.title, detail: t.detail, minutes: t.minutes, questionTarget: t.questionTarget, completed: !!t.completedAt, rescheduledFrom: t.rescheduledFrom, chapterSlug: t.chapter?.slug ?? null }))}
          setup={setup}
        />
      ) : setup}
    </div>
  );
}
