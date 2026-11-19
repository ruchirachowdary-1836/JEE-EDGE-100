"use client";
/**
 * Persistent student progress for the static (GitHub Pages) edition.
 * There is no server here, so everything lives in this browser's localStorage under one versioned key.
 * Students can export it to a file and import it on another device (Progress page).
 */
import { schedule, DEFAULT_SRS_RULES, type CardState, type Grade } from "@/lib/srs";

export type AttemptRec = { ok: boolean; t: number; sec: number };
export type CardRec = CardState & { dueAt: number; lastReviewedAt: number };
export type ReviewRec = { card: string; grade: Grade; t: number; interval: number; overdueDays: number };
export type TestRec = {
  id: string; t: number; title: string; durationSec: number; usedSec: number;
  score: number; max: number; correct: number; incorrect: number; unattempted: number;
  perSubject: Record<string, { score: number; max: number; correct: number; incorrect: number; unattempted: number }>;
  /** per question: true correct, false wrong, null unattempted */
  answers: Record<string, boolean | null>;
};
export type Progress = {
  v: 2;
  attempts: Record<string, AttemptRec[]>;
  studied: Record<string, number>;
  cards: Record<string, CardRec>;
  history: ReviewRec[];
  tests: TestRec[];
  unlocked: Record<string, number>;
};

const KEY = "jee-edge-progress-v2";
const LEGACY_ATTEMPTS = "jee-edge-static-attempts";
const LEGACY_UNLOCK = "jee-edge-static-unlocked";
const HISTORY_CAP = 5000;
const DAY = 86400_000;

const empty = (): Progress => ({ v: 2, attempts: {}, studied: {}, cards: {}, history: [], tests: [], unlocked: {} });

let cache: Progress | null = null;
const listeners = new Set<() => void>();

export function load(): Progress {
  if (cache) return cache;
  let p = empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) p = { ...empty(), ...JSON.parse(raw) };
    else {
      // migrate the first static edition's storage (boolean attempts, no timestamps)
      const old = JSON.parse(localStorage.getItem(LEGACY_ATTEMPTS) ?? "{}") as Record<string, boolean[]>;
      for (const [id, arr] of Object.entries(old)) p.attempts[id] = arr.map((ok) => ({ ok, t: 0, sec: 0 }));
      p.unlocked = JSON.parse(localStorage.getItem(LEGACY_UNLOCK) ?? "{}");
    }
  } catch { /* storage unavailable or corrupt: start fresh in memory */ }
  cache = p;
  return p;
}

function save(p: Progress) {
  cache = p;
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* quota or private mode: keep in memory */ }
  listeners.forEach((l) => l());
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { cache = null; fn(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(fn); window.removeEventListener("storage", onStorage); };
}

export function storageAvailable() {
  try { localStorage.setItem("__jee_t", "1"); localStorage.removeItem("__jee_t"); return true; } catch { return false; }
}

// ---------- Question attempts ----------
export function recordAttempt(questionId: string, ok: boolean, sec: number) {
  const p = load();
  save({ ...p, attempts: { ...p.attempts, [questionId]: [...(p.attempts[questionId] ?? []), { ok, t: Date.now(), sec }] } });
}
export function setUnlocked(topic: string, level: number) {
  const p = load();
  if ((p.unlocked[topic] ?? 1) >= level) return;
  save({ ...p, unlocked: { ...p.unlocked, [topic]: level } });
}

// ---------- Topics ----------
export function setStudied(topic: string, done: boolean) {
  const p = load();
  const studied = { ...p.studied };
  if (done) studied[topic] = Date.now(); else delete studied[topic];
  save({ ...p, studied });
}

// ---------- Flashcards (spaced repetition) ----------
export const cardKey = (type: string, id: string) => `${type}:${id}`;

/** Preview the interval each grade would give, for the grade buttons. */
export function previewIntervals(key: string, now = new Date()) {
  const c = load().cards[key];
  const state: CardState = c ?? { ease: 2.5, intervalDays: 0, repetitions: 0, lapses: 0 };
  return ([0, 1, 2, 3] as Grade[]).map((g) => schedule(state, g, DEFAULT_SRS_RULES, now));
}

export function reviewCard(key: string, grade: Grade, now = new Date()) {
  const p = load();
  const c = p.cards[key];
  const state: CardState = c ?? { ease: 2.5, intervalDays: 0, repetitions: 0, lapses: 0 };
  const next = schedule(state, grade, DEFAULT_SRS_RULES, now);
  const overdueDays = c ? Math.max(0, Math.floor((now.getTime() - c.dueAt) / DAY)) : 0;
  const rec: CardRec = { ease: next.ease, intervalDays: next.intervalDays, repetitions: next.repetitions, lapses: next.lapses, dueAt: next.dueAt.getTime(), lastReviewedAt: now.getTime() };
  const history = [...p.history, { card: key, grade, t: now.getTime(), interval: next.intervalDays, overdueDays }].slice(-HISTORY_CAP);
  save({ ...p, cards: { ...p.cards, [key]: rec }, history });
  return rec;
}

export type CardStatus = "new" | "overdue" | "due" | "learning" | "scheduled";
export function cardStatus(key: string, now = Date.now()): { status: CardStatus; overdueDays: number; dueAt: number | null } {
  const c = load().cards[key];
  if (!c) return { status: "new", overdueDays: 0, dueAt: null };
  if (c.dueAt > now) return { status: "scheduled", overdueDays: 0, dueAt: c.dueAt };
  const overdueDays = Math.floor((now - c.dueAt) / DAY);
  if (c.intervalDays === 0) return { status: "learning", overdueDays: 0, dueAt: c.dueAt };
  return { status: overdueDays >= 1 ? "overdue" : "due", overdueDays, dueAt: c.dueAt };
}

/** Today's queue: lapsed-in-session cards first, then most-overdue first, then due, then up to `newLimit` new cards. */
export function buildQueue<T extends { key: string }>(cards: T[], newLimit: number, now = Date.now()) {
  const withStatus = cards.map((c) => ({ c, s: cardStatus(c.key, now) }));
  const learning = withStatus.filter((x) => x.s.status === "learning");
  const overdue = withStatus.filter((x) => x.s.status === "overdue").sort((a, b) => b.s.overdueDays - a.s.overdueDays);
  const due = withStatus.filter((x) => x.s.status === "due");
  const fresh = withStatus.filter((x) => x.s.status === "new");
  const newToday = newCardsReviewedToday(now);
  const newAllowed = Math.max(0, newLimit - newToday);
  return {
    queue: [...learning, ...overdue, ...due, ...fresh.slice(0, newAllowed)].map((x) => x.c),
    counts: { learning: learning.length, overdue: overdue.length, due: due.length, new: fresh.length, newAllowed, scheduled: withStatus.filter((x) => x.s.status === "scheduled").length },
  };
}

function startOfDay(t: number) { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
function newCardsReviewedToday(now: number) {
  const p = load();
  const sod = startOfDay(now);
  const firstSeen = new Map<string, number>();
  for (const h of p.history) if (!firstSeen.has(h.card)) firstSeen.set(h.card, h.t);
  return [...firstSeen.values()].filter((t) => t >= sod).length;
}

// ---------- Timed tests ----------
export function saveTest(t: TestRec) {
  const p = load();
  save({ ...p, tests: [...p.tests, t] });
}

// ---------- Backup ----------
export function exportProgress() { return JSON.stringify(load(), null, 1); }
export function importProgress(json: string) {
  const parsed = JSON.parse(json);
  if (!parsed || parsed.v !== 2 || typeof parsed.attempts !== "object") throw new Error("This file is not a JEE EDGE progress export.");
  save({ ...empty(), ...parsed });
}
export function resetProgress() { save(empty()); }

// ---------- Derived statistics ----------
export function attemptStats(ids: string[]) {
  const p = load();
  const all = ids.flatMap((id) => p.attempts[id] ?? []);
  const attempted = ids.filter((id) => (p.attempts[id]?.length ?? 0) > 0).length;
  const correct = all.filter((a) => a.ok).length;
  return { attempted, total: all.length, correct, incorrect: all.length - correct, accuracy: all.length ? Math.round((correct / all.length) * 100) : 0 };
}
/** Questions whose most recent attempt was wrong. */
export function currentlyWrong(): string[] {
  const p = load();
  return Object.entries(p.attempts).filter(([, a]) => a.length && !a[a.length - 1].ok).map(([id]) => id);
}
