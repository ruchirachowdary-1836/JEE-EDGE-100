import { z } from "zod";
import { db } from "@/lib/db";
import { apiUser, HttpError } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { logEvent, syncMastery } from "@/lib/progress";

const schema = z.object({ action: z.enum(["complete", "uncomplete", "revise"]) });

export const POST = handler<{ params: { id: string } }>(async (req, { params }) => {
  const user = await apiUser();
  const { action } = await body(req, schema);
  const topic = await db.topic.findUnique({ where: { id: params.id } });
  if (!topic) throw new HttpError(404, "Topic not found.");
  const key = { userId_topicId: { userId: user.id, topicId: topic.id } };
  const existing = await db.topicProgress.findUnique({ where: key });

  if (action === "revise") {
    if (!existing?.notesCompletedAt) throw new HttpError(400, "Finish studying this topic before recording a revision.");
    const p = await db.topicProgress.update({ where: key, data: { revisedCount: { increment: 1 }, lastRevisedAt: new Date() } });
    await logEvent(user.id, "REVISION", topic.name, `/topic/${topic.slug}`);
    await syncMastery(user.id, topic.id);
    return { revisedCount: p.revisedCount };
  }

  const notesCompletedAt = action === "complete" ? new Date() : null;
  await db.topicProgress.upsert({
    where: key,
    create: { userId: user.id, topicId: topic.id, notesCompletedAt },
    update: { notesCompletedAt },
  });
  await syncMastery(user.id, topic.id);
  return { done: action === "complete" };
});
