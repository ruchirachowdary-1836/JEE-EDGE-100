import { db } from "./db";

export type ExamPattern = {
  name: string;
  durationMin: number;
  sections: { subject: string; mcq: number; numerical: number }[];
  marks: { correct: number; incorrectMcq: number; incorrectNumerical: number; unattempted: number };
  source: string;
};

export type GymRules = {
  /** minimum accuracy (0-100) on a level before the next level unlocks */
  minAccuracy: number;
  /** fraction (0-100) of the level's questions that must be attempted */
  minCompletion: number;
};

export type SrsRules = {
  /** interval multipliers and caps for the SM-2 style scheduler */
  firstIntervalDays: number;
  secondIntervalDays: number;
  maxIntervalDays: number;
  mistakeReviewDays: number[];
};

export type MasteryRules = { minAttempts: number; minAccuracy: number; minLevelCleared: number; minRevisions: number };

export type AppSettings = {
  examPattern: ExamPattern;
  examDates: { label: string; date: string }[];
  syllabus: { version: string; note: string };
  gym: GymRules;
  srs: SrsRules;
  mastery: MasteryRules;
};

export const DEFAULT_SETTINGS: AppSettings = {
  examPattern: {
    name: "JEE Main Paper 1 (B.E./B.Tech.)",
    durationMin: 180,
    sections: [
      { subject: "physics", mcq: 20, numerical: 5 },
      { subject: "chemistry", mcq: 20, numerical: 5 },
      { subject: "mathematics", mcq: 20, numerical: 5 },
    ],
    marks: { correct: 4, incorrectMcq: -1, incorrectNumerical: -1, unattempted: 0 },
    source:
      "Pattern followed since JEE Main 2025 (all 75 questions compulsory). Confirm against the official JEE Main 2027 information bulletin at jeemain.nta.nic.in and edit here if NTA changes it.",
  },
  examDates: [
    { label: "JEE Main 2027 — Session 1 (tentative)", date: "2027-01-20" },
    { label: "JEE Main 2027 — Session 2 (tentative)", date: "2027-04-01" },
  ],
  syllabus: {
    version: "NTA JEE Main 2026 syllabus (released 31 Oct 2025)",
    note: "Chapter list follows the latest official NTA syllabus available when this content was prepared. Re-check against the JEE Main 2027 syllabus PDF and mark any removed chapter as enrichment.",
  },
  gym: { minAccuracy: 70, minCompletion: 100 },
  srs: { firstIntervalDays: 1, secondIntervalDays: 3, maxIntervalDays: 45, mistakeReviewDays: [1, 3, 7, 15] },
  mastery: { minAttempts: 8, minAccuracy: 80, minLevelCleared: 4, minRevisions: 1 },
};

export async function getSettings(): Promise<AppSettings> {
  const rows = await db.appConfig.findMany();
  const out: Record<string, unknown> = { ...DEFAULT_SETTINGS };
  for (const r of rows) if (r.key in out) out[r.key] = r.value;
  return out as AppSettings;
}

export async function saveSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
  await db.appConfig.upsert({
    where: { key },
    create: { key, value: value as object },
    update: { value: value as object },
  });
}
