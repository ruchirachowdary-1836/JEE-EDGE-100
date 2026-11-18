import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { getSettings } from "@/lib/config";
import { schedule, type Grade } from "@/lib/srs";
import { logEvent } from "@/lib/progress";

const schema = z.object({ cardType: z.enum(["FORMULA", "CONCEPT", "REACTION"]), itemId: z.string().min(1), grade: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]) });

export const POST = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, schema);
  const exists =
    input.cardType === "FORMULA" ? await db.formula.findFirst({ where: { slug: input.itemId, publishStatus: "PUBLISHED" } })
    : input.cardType === "CONCEPT" ? await db.conceptCard.findFirst({ where: { id: input.itemId, publishStatus: "PUBLISHED" } })
    : await db.namedReaction.findFirst({ where: { slug: input.itemId, publishStatus: "PUBLISHED" } });
  if (!exists) throw new HttpError(404, "Card not found.");
  const settings = await getSettings();
  const key = { userId_cardType_itemId: { userId: user.id, cardType: input.cardType, itemId: input.itemId } };
  const card = (await db.reviewCard.findUnique({ where: key })) ?? { ease: 2.5, intervalDays: 0, repetitions: 0, lapses: 0 };
  const next = schedule(card, input.grade as Grade, settings.srs);
  await db.reviewCard.upsert({
    where: key,
    create: { userId: user.id, cardType: input.cardType, itemId: input.itemId, ...next, lastReviewedAt: new Date() },
    update: { ...next, lastReviewedAt: new Date() },
  });
  const reviewsToday = await db.reviewCard.count({ where: { userId: user.id, lastReviewedAt: { gte: new Date(Date.now() - 60_000) } } });
  if (reviewsToday <= 1) await logEvent(user.id, "REVISION", `${input.cardType.toLowerCase()} flashcards`, `/revision?deck=${input.cardType}`);
  return { ok: true, dueAt: next.dueAt, intervalDays: next.intervalDays };
});
