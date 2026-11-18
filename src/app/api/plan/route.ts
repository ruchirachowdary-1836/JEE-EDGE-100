import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { generatePlan } from "@/lib/plan";
import { examDateFor } from "@/lib/queries";
import { daysBetween, startOfIstDay } from "@/lib/utils";

const generateSchema = z.object({
  action: z.literal("generate"),
  dailyHours: z.number().min(2, "Plan at least 2 hours a day").max(12, "More than 12 hours a day is not sustainable"),
  completedChapterIds: z.array(z.string()).max(100),
});
const recoverSchema = z.object({ action: z.literal("recover") });
const toggleSchema = z.object({ taskId: z.string().min(1), completed: z.boolean() });

export const POST = handler(async (req) => {
  const user = await apiUser();
  const raw = await req.json().catch(() => null);
  if (!raw || typeof raw !== "object") throw new HttpError(400, "Request body must be JSON.");

  if ((raw as { action?: string }).action === "generate") {
    const input = generateSchema.parse(raw);
    const { date: examDate } = await examDateFor(user.id);
    const start = startOfIstDay();
    const daysLeft = daysBetween(start, examDate);
    if (daysLeft < 7) throw new HttpError(400, "Your exam is less than a week away — use the one- or three-day revision tracks in the Revision Centre instead.");
    const days = Math.min(60, daysLeft);
    const chapters = await db.chapter.findMany({ where: { publishStatus: "PUBLISHED", syllabusStatus: "EXAMINABLE" }, include: { subject: true } });
    const tasks = generatePlan({
      days, dailyHours: input.dailyHours, completedChapterIds: input.completedChapterIds,
      chapters: chapters.map((c) => ({ id: c.id, name: c.name, subject: c.subject.slug, planWeight: c.planWeight })),
    });
    await db.studyPlan.updateMany({ where: { userId: user.id, active: true }, data: { active: false } });
    const plan = await db.studyPlan.create({ data: { userId: user.id, startDate: start, examDate, dailyHours: input.dailyHours } });
    await db.planTask.createMany({ data: tasks.map((t) => ({ ...t, planId: plan.id })) });
    await db.studentProfile.upsert({ where: { userId: user.id }, create: { userId: user.id, dailyHours: input.dailyHours, completedChapterIds: input.completedChapterIds }, update: { dailyHours: input.dailyHours, completedChapterIds: input.completedChapterIds } });
    return { ok: true, planId: plan.id, days, tasks: tasks.length };
  }

  if ((raw as { action?: string }).action === "recover") {
    recoverSchema.parse(raw);
    const plan = await db.studyPlan.findFirst({ where: { userId: user.id, active: true }, include: { tasks: true } });
    if (!plan) throw new HttpError(404, "No active plan.");
    const today = daysBetween(startOfIstDay(plan.startDate), startOfIstDay()) + 1;
    const lastDay = Math.max(...plan.tasks.map((t) => t.day));
    const missed = plan.tasks.filter((t) => t.day < today && !t.completedAt && t.kind !== "BUFFER").sort((a, b) => a.day - b.day);
    if (!missed.length) return { moved: 0 };
    // load per day so recovery never overfills a day beyond 125% of the daily budget
    const budget = plan.dailyHours * 60;
    const load: Record<number, number> = {};
    for (const t of plan.tasks) if (t.day >= today && !t.completedAt) load[t.day] = (load[t.day] ?? 0) + (t.kind === "BUFFER" ? 0 : t.minutes);
    const bufferDays = [...new Set(plan.tasks.filter((t) => t.kind === "BUFFER" && t.day >= today).map((t) => t.day))].sort((a, b) => a - b);
    const candidates = [...bufferDays, ...Array.from({ length: Math.max(0, lastDay - today - 1) }, (_, i) => today + i)].filter((d) => d < lastDay - 1);
    let moved = 0;
    for (const t of missed) {
      const day = candidates.find((d) => (load[d] ?? 0) + t.minutes <= budget * 1.25);
      if (day === undefined) break;
      load[day] = (load[day] ?? 0) + t.minutes;
      await db.planTask.update({ where: { id: t.id }, data: { day, rescheduledFrom: t.rescheduledFrom ?? t.day } });
      moved++;
    }
    return { moved, unplaced: missed.length - moved };
  }

  throw new HttpError(400, "Unknown action.");
});

export const PATCH = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, toggleSchema);
  const task = await db.planTask.findUnique({ where: { id: input.taskId }, include: { plan: true } });
  if (!task || task.plan.userId !== user.id) throw new HttpError(404, "Task not found.");
  await db.planTask.update({ where: { id: task.id }, data: { completedAt: input.completed ? new Date() : null } });
  return { ok: true };
});
