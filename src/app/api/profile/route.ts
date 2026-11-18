import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, hashPassword, verifyPassword, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const profileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  examDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid date"),
  dailyHours: z.number().min(1).max(14),
  dailyQuestionTarget: z.number().int().min(5).max(400),
});

export const PATCH = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, profileSchema);
  const examDate = new Date(`${input.examDate}T09:00:00+05:30`);
  if (Number.isNaN(examDate.getTime())) throw new HttpError(400, "Invalid exam date.");
  if (examDate.getTime() < Date.now() - 86400_000) throw new HttpError(400, "The exam date must be in the future.");
  await db.user.update({ where: { id: user.id }, data: { name: input.name } });
  await db.studentProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, examDate, dailyHours: input.dailyHours, dailyQuestionTarget: input.dailyQuestionTarget },
    update: { examDate, dailyHours: input.dailyHours, dailyQuestionTarget: input.dailyQuestionTarget },
  });
  return { ok: true };
});

const pwSchema = z.object({
  current: z.string().min(1, "Enter your current password"),
  next: z.string().min(8, "New password must be at least 8 characters").max(128).regex(/[A-Za-z]/, "Needs a letter").regex(/[0-9]/, "Needs a number"),
});

export const POST = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, pwSchema);
  const row = await db.user.findUniqueOrThrow({ where: { id: user.id } });
  if (!(await verifyPassword(input.current, row.passwordHash))) throw new HttpError(400, "Current password is incorrect.");
  await db.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(input.next) } });
  return { ok: true };
});
