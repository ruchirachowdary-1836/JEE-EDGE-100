export type NoteSection = { key: string; title: string; body: string; animationKey?: string };
export type NoteSeed = { topic: string; sections: NoteSection[] };

export type Worked = { problem: string; solution: string };

export type FormulaSeed = {
  slug: string;
  chapter: string;
  topic?: string;
  name: string;
  expression: string;
  variables: { symbol: string; meaning: string; unit: string }[];
  siUnit: string;
  dimensions: string;
  origin: string;
  derivation: { statement: string; justification: string }[];
  interpretation: string;
  whyItWorks: string;
  whenToUse: string;
  whenNotToUse: string;
  conditions: string;
  assumptions: string;
  specialCases: string;
  relations: { slug?: string; text: string }[];
  graph?: string;
  graphKey?: string;
  basicExample: Worked;
  jeeExample: Worked;
  trickyApplication: Worked;
  commonMistakes: string;
  shortcuts: string;
  limitations: string;
};

export type ComparisonSeed = {
  slug: string;
  title: string;
  chapter?: string;
  leftTitle: string;
  rightTitle: string;
  rows: { aspect: string; left: string; right: string }[];
  summary: string;
};

export type OptionSeed = { text: string; correct?: boolean; why: string };

export type QuestionSeed = {
  topic: string;
  level: 1 | 2 | 3 | 4 | 5;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  /** MCQ: exactly one correct option. MULTIPLE: one or more correct (JEE Advanced partial marking).
   *  MATCH: List-I/List-II matching, options are answer codes with exactly one correct. NUMERICAL: value answer. */
  type: "MCQ" | "NUMERICAL" | "MULTIPLE" | "MATCH";
  /** MATCH only: List-I items (labelled P, Q, R, S) and List-II items (labelled 1, 2, 3, …) */
  match?: { left: string[]; right: string[] };
  statement: string;
  options?: OptionSeed[];
  answer?: number; // numerical
  tolerance?: number;
  solution: string;
  concept: string;
  formula: string;
  whyFormula: string;
  alt?: string;
  mistakes: string;
  time: number;
};

export type AnimationSeed = {
  key: string;
  title: string;
  subject: string;
  chapter?: string;
  topic?: string;
  intro: string;
  steps: { title: string; body: string }[];
  math: string;
  realLife: string;
  jee: string;
};
