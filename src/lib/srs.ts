import type { SrsRules } from "./config";

export type Grade = 0 | 1 | 2 | 3; // Again, Hard, Good, Easy

export type CardState = { ease: number; intervalDays: number; repetitions: number; lapses: number };

/** SM-2 style scheduler with configurable first/second intervals and an interval cap. */
export function schedule(card: CardState, grade: Grade, rules: SrsRules, now = new Date()) {
  let { ease, intervalDays, repetitions, lapses } = card;
  let dueAt: Date;
  if (grade === 0) {
    repetitions = 0;
    lapses += 1;
    ease = Math.max(1.3, ease - 0.2);
    intervalDays = 0;
    dueAt = new Date(now.getTime() + 10 * 60_000); // see it again in this session
  } else {
    if (grade === 1) {
      ease = Math.max(1.3, ease - 0.15);
      intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2));
    } else {
      if (repetitions === 0) intervalDays = rules.firstIntervalDays;
      else if (repetitions === 1) intervalDays = rules.secondIntervalDays;
      else intervalDays = Math.round(intervalDays * ease);
      if (grade === 3) {
        ease += 0.15;
        intervalDays = Math.round(intervalDays * 1.3);
      }
    }
    repetitions += 1;
    intervalDays = Math.min(rules.maxIntervalDays, Math.max(1, intervalDays));
    dueAt = new Date(now.getTime() + intervalDays * 86400_000);
  }
  return { ease: Math.round(ease * 100) / 100, intervalDays, repetitions, lapses, dueAt };
}
