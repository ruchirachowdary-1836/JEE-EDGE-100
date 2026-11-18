import { destroySession } from "@/lib/auth";
import { handler } from "@/lib/api";

export const POST = handler(async () => {
  await destroySession();
  return { ok: true };
});
