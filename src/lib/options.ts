import type { Prisma, PrismaClient } from "@prisma/client";

export type OptionInput = { text: string; isCorrect: boolean; explanation?: string | null };

/**
 * Replace a question's options while keeping option ids stable.
 * Attempts and mock responses store the selected option id, so deleting and recreating options
 * (the old behaviour) silently broke scoring for every in-progress mock and every past attempt.
 * Options are matched by position: existing rows are updated in place, extra rows created, surplus rows removed.
 */
export async function syncOptions(client: PrismaClient | Prisma.TransactionClient, questionId: string, options: OptionInput[]) {
  const existing = await client.questionOption.findMany({ where: { questionId }, orderBy: { order: "asc" } });
  for (let i = 0; i < options.length; i++) {
    const o = options[i];
    const data = { label: String.fromCharCode(65 + i), text: o.text, isCorrect: o.isCorrect, explanation: o.explanation ?? "", order: i };
    if (existing[i]) await client.questionOption.update({ where: { id: existing[i].id }, data });
    else await client.questionOption.create({ data: { questionId, ...data } });
  }
  const surplus = existing.slice(options.length).map((o) => o.id);
  if (surplus.length) await client.questionOption.deleteMany({ where: { id: { in: surplus } } });
}
