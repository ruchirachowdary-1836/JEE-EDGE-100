// Single index of every original practice question. Seed, static site and checks all read from here.
// These are original questions written for JEE EDGE 100 — never previous-year questions (PYQs are imported
// separately, with year/session/shift/source attribution, through the admin importer).
import type { QuestionSeed } from "./types";
import { PHYSICS_QUESTIONS } from "./questions-physics";
import { PHYSICS_QUESTIONS_2 } from "./questions-physics-2";
import { PHYSICS_QUESTIONS_3 } from "./questions-physics-3";
import { PHYSICS_QUESTIONS_4 } from "./questions-physics-4";
import { PHYSICS_QUESTIONS_5 } from "./questions-physics-5";
import { PHYSICS_QUESTIONS_6 } from "./questions-physics-6";
import { CHEMISTRY_QUESTIONS } from "./questions-chemistry";
import { CHEMISTRY_QUESTIONS_2 } from "./questions-chemistry-2";
import { CHEMISTRY_QUESTIONS_3 } from "./questions-chemistry-3";
import { CHEMISTRY_QUESTIONS_4 } from "./questions-chemistry-4";
import { MATHEMATICS_QUESTIONS } from "./questions-mathematics";
import { MATHEMATICS_QUESTIONS_2 } from "./questions-mathematics-2";
import { MATHEMATICS_QUESTIONS_3 } from "./questions-mathematics-3";
import { MATHEMATICS_QUESTIONS_4 } from "./questions-mathematics-4";

export const PHYSICS_ALL: QuestionSeed[] = [...PHYSICS_QUESTIONS, ...PHYSICS_QUESTIONS_2, ...PHYSICS_QUESTIONS_3, ...PHYSICS_QUESTIONS_4, ...PHYSICS_QUESTIONS_5, ...PHYSICS_QUESTIONS_6];
export const CHEMISTRY_ALL: QuestionSeed[] = [...CHEMISTRY_QUESTIONS, ...CHEMISTRY_QUESTIONS_2, ...CHEMISTRY_QUESTIONS_3, ...CHEMISTRY_QUESTIONS_4];
export const MATHEMATICS_ALL: QuestionSeed[] = [...MATHEMATICS_QUESTIONS, ...MATHEMATICS_QUESTIONS_2, ...MATHEMATICS_QUESTIONS_3, ...MATHEMATICS_QUESTIONS_4];
export const ALL_QUESTIONS: QuestionSeed[] = [...PHYSICS_ALL, ...CHEMISTRY_ALL, ...MATHEMATICS_ALL];
