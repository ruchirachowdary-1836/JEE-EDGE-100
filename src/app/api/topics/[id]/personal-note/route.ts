import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const schema = z.object({ body: z.string().max(20000, "Notes are limited to 20,000 characters") });

export const PUT = handler<{ params: { id: string } }>(async (req, { params }) => {
  const user = await apiUser();
  const input = await body(req, schema);
  const topic = await db.topic.findUnique({ where: { id: params.id }, select: { id: true } });
  if (!topic) throw new HttpError(404, "Topic not found.");
  await db.personalNote.upsert({
    where: { userId_topicId: { userId: user.id, topicId: topic.id } },
    create: { userId: user.id, topicId: topic.id, body: input.body },
    update: { body: input.body },
  });
  return { ok: true };
});
