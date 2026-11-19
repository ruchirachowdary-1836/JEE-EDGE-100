/** The Question Gym's difficulty classification, shared by both editions and the content checks. */
export const GYM_LEVELS = [
  { level: 1, name: "Fundamentals", description: "One idea, stated directly: definitions, units, a single formula with its conditions." },
  { level: 2, name: "Basic applications", description: "One idea applied to a short, standard situation." },
  { level: 3, name: "Multi-step applications", description: "Two or three steps, or one idea used in a less obvious setting." },
  { level: 4, name: "JEE Main examination level", description: "The length, mix and traps of a JEE Main question, solvable in about 2–3 minutes when prepared." },
  { level: 5, name: "JEE Advanced examination level", description: "At least two connected ideas, a choice of method, or a limiting-case insight — not just heavier arithmetic." },
] as const;
