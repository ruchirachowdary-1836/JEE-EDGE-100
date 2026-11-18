import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";

const schema = z.object({
  topicId: z.string().min(1),
  sectionKey: z.string().min(1).max(60),
  text: z.string().trim().min(2).max(400),
});

export const POST = handler(async (req) => {
  const user = await apiUser();
  const input = await body(req, schema);
  const topic = await db.topic.findUnique({ where: { id: input.topicId }, select: { id: true } });
  if (!topic) throw new HttpError(404, "Topic not found.");
  const count = await db.highlight.count({ where: { userId: user.id, topicId: topic.id } });
  if (count >= 200) throw new HttpError(400, "Highlight limit reached for this topic.");
  const h = await db.highlight.create({ data: { userId: user.id, topicId: topic.id, sectionKey: input.sectionKey, text: input.text } });
  return { id: h.id, sectionKey: h.sectionKey, text: h.text };
});

export const DELETE = handler(async (req) => {
  const user = await apiUser();
  const id = new URL(req.url).searchParams.get("id");
  if (!id) throw new HttpError(400, "Missing highlight id.");
  // deleteMany scoped to the user so nobody can delete another student's highlight
  await db.highlight.deleteMany({ where: { id, userId: user.id } });
  return { ok: true };
});
