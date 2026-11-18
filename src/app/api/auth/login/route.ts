import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, verifyPassword, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export const POST = handler(async (req) => {
  const { email, password } = await body(req, schema);
  const user = await db.user.findUnique({ where: { email } });
  // Same message for an unknown email and a wrong password, so accounts cannot be enumerated.
  if (!user || !(await verifyPassword(password, user.passwordHash))) throw new HttpError(401, "Incorrect email or password.");
  await createSession(user.id);
  return { ok: true, role: user.role };
});
