import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, verifyPassword, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { blocked, clearKey, clientIp, hit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

const MAX_FAILURES = 10;
const WINDOW_MS = 15 * 60_000;

export const POST = handler(async (req) => {
  const { email, password } = await body(req, schema);
  // Throttle failed sign-ins by account and by client address, so neither one email nor one IP can be brute-forced.
  // Only failures count, so many students signing in from one school or hostel network are not locked out.
  const limits: [string, number][] = [[`login:email:${email}`, MAX_FAILURES], [`login:ip:${clientIp(req)}`, MAX_FAILURES * 5]];
  const hitLimit = limits.map(([k, n]) => blocked(k, n)).find((b) => b.blocked);
  if (hitLimit) throw new HttpError(429, `Too many failed sign-in attempts. Try again in ${Math.ceil(hitLimit.retryAfterSec / 60)} minutes.`);
  const user = await db.user.findUnique({ where: { email } });
  // Same message for an unknown email and a wrong password, so accounts cannot be enumerated.
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    for (const [k] of limits) hit(k, Infinity, WINDOW_MS);
    throw new HttpError(401, "Incorrect email or password.");
  }
  clearKey(limits[0][0]);
  await createSession(user.id);
  return { ok: true, role: user.role };
});
