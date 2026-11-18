import { z } from "zod";
import { apiUser } from "@/lib/auth";
import { body, handler } from "@/lib/api";
import { saveSetting } from "@/lib/config";

const schema = z.discriminatedUnion("key", [
  z.object({
    key: z.literal("examPattern"),
    value: z.object({
      name: z.string().min(3).max(120),
      durationMin: z.number().int().min(10).max(360),
      sections: z.array(z.object({ subject: z.enum(["physics", "chemistry", "mathematics"]), mcq: z.number().int().min(0).max(60), numerical: z.number().int().min(0).max(30) })).min(1),
      marks: z.object({ correct: z.number().int().min(1).max(10), incorrectMcq: z.number().int().min(-5).max(0), incorrectNumerical: z.number().int().min(-5).max(0), unattempted: z.number().int().min(-1).max(0) }),
      source: z.string().max(600),
    }),
  }),
  z.object({ key: z.literal("examDates"), value: z.array(z.object({ label: z.string().min(3).max(120), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) })).min(1).max(10) }),
  z.object({ key: z.literal("syllabus"), value: z.object({ version: z.string().min(3).max(200), note: z.string().max(1000) }) }),
  z.object({ key: z.literal("gym"), value: z.object({ minAccuracy: z.number().int().min(0).max(100), minCompletion: z.number().int().min(10).max(100) }) }),
  z.object({
    key: z.literal("srs"),
    value: z.object({ firstIntervalDays: z.number().int().min(1).max(10), secondIntervalDays: z.number().int().min(1).max(30), maxIntervalDays: z.number().int().min(7).max(365), mistakeReviewDays: z.array(z.number().int().min(1).max(90)).min(1).max(8) }),
  }),
  z.object({ key: z.literal("mastery"), value: z.object({ minAttempts: z.number().int().min(1).max(100), minAccuracy: z.number().int().min(0).max(100), minLevelCleared: z.number().int().min(1).max(5), minRevisions: z.number().int().min(0).max(10) }) }),
]);

export const PUT = handler(async (req) => {
  await apiUser("ADMIN");
  const input = await body(req, schema);
  await saveSetting(input.key, input.value as never);
  return { ok: true };
});
