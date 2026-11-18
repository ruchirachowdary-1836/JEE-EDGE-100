import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const schema = z.object({ itemType: z.enum(["TOPIC", "FORMULA", "QUESTION", "REACTION"]), itemId: z.string().min(1).max(64) });

/** Toggles a bookmark and returns the new state. */
export const POST = handler(async (req) => {
  const user = await apiUser();
  const { itemType, itemId } = await body(req, schema);
  const where = { userId_itemType_itemId: { userId: user.id, itemType, itemId } };
  const existing = await db.bookmark.findUnique({ where });
  if (existing) {
    await db.bookmark.delete({ where });
    return { bookmarked: false };
  }
  await db.bookmark.create({ data: { userId: user.id, itemType, itemId } });
  return { bookmarked: true };
});
