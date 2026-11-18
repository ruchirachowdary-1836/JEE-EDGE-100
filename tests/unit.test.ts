import { test } from "node:test";
import assert from "node:assert/strict";
import { marksFor, isNumericalCorrect } from "../src/lib/scoring";
import { schedule, nextMistakeReview } from "../src/lib/srs";
import { generatePlan, type PlanChapter } from "../src/lib/plan";
import { levelStatus, unlockedLevel, isMastered, stageFor } from "../src/lib/progress";
import { hit, blocked } from "../src/lib/rate-limit";
import { DEFAULT_SETTINGS } from "../src/lib/config";

const scheme = { correct: 4, incorrectMcq: -1, incorrectNumerical: -1, unattempted: 0 };
const mcq = { type: "MCQ" as const, numericalAnswer: null, numericalTolerance: 0, options: [{ id: "a", isCorrect: false }, { id: "b", isCorrect: true }] };
const num = { type: "NUMERICAL" as const, numericalAnswer: 12.5, numericalTolerance: 0.01, options: [] };

test("marking: MCQ correct +4, wrong -1, blank 0", () => {
  assert.deepEqual(marksFor(mcq, { selectedOptionId: "b", numericalResponse: null }, scheme), { attempted: true, isCorrect: true, marks: 4 });
  assert.deepEqual(marksFor(mcq, { selectedOptionId: "a", numericalResponse: null }, scheme), { attempted: true, isCorrect: false, marks: -1 });
  assert.deepEqual(marksFor(mcq, { selectedOptionId: null, numericalResponse: null }, scheme), { attempted: false, isCorrect: null, marks: 0 });
});

test("marking: an option id from another question scores as wrong", () => {
  assert.equal(marksFor(mcq, { selectedOptionId: "zzz", numericalResponse: null }, scheme).marks, -1);
});

test("marking: numerical uses tolerance and negative marking from the scheme", () => {
  assert.equal(marksFor(num, { selectedOptionId: null, numericalResponse: 12.5 }, scheme).marks, 4);
  assert.equal(marksFor(num, { selectedOptionId: null, numericalResponse: 12.509 }, scheme).marks, 4);
  assert.equal(marksFor(num, { selectedOptionId: null, numericalResponse: 12.6 }, scheme).marks, -1);
  assert.equal(marksFor(num, { selectedOptionId: null, numericalResponse: null }, scheme).marks, 0);
  assert.equal(marksFor(num, { selectedOptionId: null, numericalResponse: Number.NaN }, scheme).marks, 0);
  assert.equal(marksFor(num, { selectedOptionId: null, numericalResponse: 13 }, { ...scheme, incorrectNumerical: 0 }).marks, 0);
  assert.equal(isNumericalCorrect(3, 3, 0), true);
});

test("marking: full 75-question paper maxes at 300", () => {
  const total = Array.from({ length: 75 }).reduce<number>((s) => s + marksFor(mcq, { selectedOptionId: "b", numericalResponse: null }, scheme).marks, 0);
  assert.equal(total, 300);
});

const rules = DEFAULT_SETTINGS.srs;
const fresh = { ease: 2.5, intervalDays: 0, repetitions: 0, lapses: 0 };
const now = new Date("2026-11-18T00:00:00Z");
const days = (d: Date) => Math.round((d.getTime() - now.getTime()) / 86400_000);

test("SRS: Good gives 1 day, then 3 days, then interval × ease", () => {
  const a = schedule(fresh, 2, rules, now);
  assert.equal(a.intervalDays, 1); assert.equal(days(a.dueAt), 1);
  const b = schedule(a, 2, rules, now);
  assert.equal(b.intervalDays, 3); assert.equal(days(b.dueAt), 3);
  const c = schedule(b, 2, rules, now);
  assert.equal(c.intervalDays, Math.round(3 * 2.5));
});

test("SRS: Again resets repetitions, adds a lapse and returns in 10 minutes", () => {
  const a = schedule({ ease: 2.5, intervalDays: 20, repetitions: 5, lapses: 0 }, 0, rules, now);
  assert.equal(a.repetitions, 0); assert.equal(a.lapses, 1); assert.equal(a.ease, 2.3);
  assert.equal(a.dueAt.getTime() - now.getTime(), 10 * 60_000);
});

test("SRS: ease never drops below 1.3 and interval never exceeds the cap", () => {
  let c = { ease: 1.35, intervalDays: 1, repetitions: 0, lapses: 0 };
  for (let i = 0; i < 5; i++) c = schedule(c, 0, rules, now);
  assert.equal(c.ease, 1.3);
  let g = { ...fresh };
  for (let i = 0; i < 30; i++) g = schedule(g, 3, rules, now);
  assert.equal(g.intervalDays, rules.maxIntervalDays);
});

test("mistake notebook: 1 → 3 → 7 → 15 days, then resolved; a wrong answer restarts", () => {
  const ladder = [1, 3, 7, 15];
  const first = nextMistakeReview(0, "correct", ladder, now);
  assert.equal(days(first.nextReviewAt!), 3);
  assert.equal(days(nextMistakeReview(1, "correct", ladder, now).nextReviewAt!), 7);
  assert.equal(days(nextMistakeReview(2, "correct", ladder, now).nextReviewAt!), 15);
  const done = nextMistakeReview(3, "correct", ladder, now);
  assert.equal(done.resolved, true); assert.equal(done.nextReviewAt, null);
  const wrong = nextMistakeReview(3, "wrong", ladder, now);
  assert.equal(wrong.reviewCount, 0); assert.equal(days(wrong.nextReviewAt!), 1);
});

const chapters: PlanChapter[] = Array.from({ length: 54 }, (_, i) => ({ id: `c${i}`, name: `Chapter ${i}`, subject: ["physics", "chemistry", "mathematics"][i % 3], planWeight: (i % 5) + 1 }));

for (const [d, h] of [[60, 6], [60, 2], [7, 8], [30, 3], [120, 12], [45, 2.5]] as const) {
  test(`plan ${d} days × ${h} h: no day exceeds the budget, every day has work, no mocks in the last 2 days`, () => {
    const plan = generatePlan({ days: d, dailyHours: h, chapters, completedChapterIds: [] });
    const budget = Math.round(h * 60);
    for (let day = 1; day <= d; day++) {
      const t = plan.filter((x) => x.day === day);
      assert.ok(t.length > 0, `day ${day} is empty`);
      const sum = t.reduce((s, x) => s + x.minutes, 0);
      assert.ok(sum <= budget, `day ${day}: ${sum} min > ${budget} min budget`);
      assert.ok(t.every((x) => x.minutes >= 0));
    }
    assert.ok(!plan.some((x) => x.kind === "MOCK" && x.day > d - 2), "mock in final two days");
    assert.ok(plan.some((x) => x.kind === "MOCK"), "plan has no mock at all");
  });
}

test("plan: 60 days splits into four 15-day phases and covers every pending chapter", () => {
  const plan = generatePlan({ days: 60, dailyHours: 6, chapters, completedChapterIds: ["c0", "c1"] });
  const phaseOfDay = (d: number) => plan.find((t) => t.day === d)!.phase;
  assert.deepEqual([phaseOfDay(1), phaseOfDay(15), phaseOfDay(16), phaseOfDay(30), phaseOfDay(31), phaseOfDay(45), phaseOfDay(46), phaseOfDay(60)], [1, 1, 2, 2, 3, 3, 4, 4]);
  const studied = new Set(plan.filter((t) => t.kind === "STUDY").map((t) => t.chapterId));
  assert.equal(studied.size, 52);
  assert.ok(!studied.has("c0"));
  assert.ok(plan.filter((t) => t.day % 7 === 0 && t.day < 59).every((t) => t.kind === "BUFFER" || t.kind === "REVISION"));
});

const gym = DEFAULT_SETTINGS.gym;
test("gym: level clears at 100% attempted with ≥70% accuracy over all attempts", () => {
  const ids = ["q1", "q2", "q3", "q4"];
  const okAll = ids.map((q) => ({ questionId: q, isCorrect: true }));
  assert.equal(levelStatus(1, ids, okAll, gym).cleared, true);
  assert.equal(levelStatus(1, ids, okAll.slice(0, 3), gym).cleared, false, "75% attempted must not clear");
  const withRetries = [...okAll, { questionId: "q1", isCorrect: false }, { questionId: "q2", isCorrect: false }];
  assert.equal(levelStatus(1, ids, withRetries, gym).accuracy, 67);
  assert.equal(levelStatus(1, ids, withRetries, gym).cleared, false);
});

test("gym: unlocks are sequential; empty levels are skipped; capped at 5", () => {
  const s = (level: number, cleared: boolean, empty = false) => ({ level, total: empty ? 0 : 4, attempted: 0, accuracy: 0, completion: 0, cleared, empty });
  assert.equal(unlockedLevel([s(1, false), s(2, true)]), 1);
  assert.equal(unlockedLevel([s(1, true), s(2, false)]), 2);
  assert.equal(unlockedLevel([s(1, true), s(2, true, true), s(3, false)]), 3);
  assert.equal(unlockedLevel([1, 2, 3, 4, 5].map((l) => s(l, true))), 5);
});

test("mastery needs notes, attempts, accuracy, level 4 and a revision", () => {
  const m = DEFAULT_SETTINGS.mastery;
  const base = { attempts: 10, accuracy: 85, clearedLevels: [1, 2, 3, 4], revisedCount: 1, notesDone: true };
  assert.equal(isMastered(base, m), true);
  assert.equal(isMastered({ ...base, revisedCount: 0 }, m), false);
  assert.equal(isMastered({ ...base, clearedLevels: [1, 2, 3] }, m), false);
  assert.equal(isMastered({ ...base, accuracy: 79 }, m), false);
  assert.equal(stageFor({ notesDone: true, attempts: 0, revisedCount: 0, mastered: false }), "STUDIED");
});

test("rate limiter blocks after the limit and resets after the window", () => {
  const t0 = 1_000_000;
  for (let i = 0; i < 3; i++) assert.equal(hit("unit-k", 3, 1000, t0).allowed, true);
  assert.equal(hit("unit-k", 3, 1000, t0).allowed, false);
  assert.equal(hit("unit-k", 3, 1000, t0 + 1001).allowed, true);
  for (let i = 0; i < 3; i++) hit("unit-f", Infinity, 1000, t0);
  assert.equal(blocked("unit-f", 3, t0).blocked, true);
  assert.equal(blocked("unit-f", 4, t0).blocked, false);
  assert.equal(blocked("unit-f", 3, t0 + 1001).blocked, false);
});
