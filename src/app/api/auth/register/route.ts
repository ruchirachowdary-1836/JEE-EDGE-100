import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, hashPassword, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { getSettings } from "@/lib/config";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .regex(/[A-Za-z]/, "Password needs a letter")
    .regex(/[0-9]/, "Password needs a number"),
});

export const POST = handler(async (req) => {
  const input = await body(req, schema);
  const exists = await db.user.findUnique({ where: { email: input.email } });
  if (exists) throw new HttpError(409, "An account with this email already exists.");
  const settings = await getSettings();
  const user = await db.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: await hashPassword(input.password),
      role: "STUDENT",
      profile: { create: { examDate: new Date(`${settings.examDates[0]?.date ?? "2027-01-20"}T09:00:00+05:30`) } },
    },
  });
  await createSession(user.id);
  return { ok: true };
});
