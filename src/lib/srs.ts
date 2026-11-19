import type { SrsRules } from "./config";

/** Defaults shared by the full app (overridable in admin settings) and the static edition. */
export const DEFAULT_SRS_RULES: SrsRules = { firstIntervalDays: 1, secondIntervalDays: 3, maxIntervalDays: 45, mistakeReviewDays: [1, 3, 7, 15] };

export type Grade = 0 | 1 | 2 | 3; // Again, Hard, Good, Easy

export type CardState = { ease: number; intervalDays: number; repetitions: number; lapses: number };

/**
 * SM-2 style scheduler with configurable first/second intervals and an interval cap.
 * Again: back in 10 minutes; for a card that had been learned (repetitions > 0) it also counts a lapse and lowers ease.
 * Hard: interval × 1.2 (at least 1 day), ease − 0.15.  Good: first, second, then interval × ease.
 * Easy: like Good one step further (a new card skips straight to the second interval), × 1.3, ease + 0.15.
 */
export function schedule(card: CardState, grade: Grade, rules: Pick<SrsRules, "firstIntervalDays" | "secondIntervalDays" | "maxIntervalDays">, now = new Date()) {
  let { ease, intervalDays, repetitions, lapses } = card;
  let dueAt: Date;
  if (grade === 0) {
    if (repetitions > 0) {
      lapses += 1;
      ease = Math.max(1.3, ease - 0.2);
    }
    repetitions = 0;
    intervalDays = 0;
    dueAt = new Date(now.getTime() + 10 * 60_000); // see it again in this session
  } else {
    if (grade === 1) {
      ease = Math.max(1.3, ease - 0.15);
      intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2));
    } else {
      const step = grade === 3 ? repetitions + 1 : repetitions;
      if (step === 0) intervalDays = rules.firstIntervalDays;
      else if (step === 1) intervalDays = rules.secondIntervalDays;
      else intervalDays = Math.round(Math.max(intervalDays, rules.secondIntervalDays) * ease);
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

/**
 * Mistake-notebook re-attempt schedule. `days` is the configured ladder (default 1, 3, 7, 15).
 * A correct re-attempt climbs one rung; surviving every rung resolves the mistake. A wrong one restarts the ladder.
 */
export function nextMistakeReview(reviewCount: number, outcome: "correct" | "wrong", days: number[], now = new Date()) {
  const first = days[0] ?? 1;
  if (outcome === "wrong") return { reviewCount: 0, resolved: false, nextReviewAt: new Date(now.getTime() + first * 86400_000) };
  const next = reviewCount + 1;
  if (next >= days.length) return { reviewCount: next, resolved: true, nextReviewAt: null };
  return { reviewCount: next, resolved: false, nextReviewAt: new Date(now.getTime() + days[next] * 86400_000) };
}
