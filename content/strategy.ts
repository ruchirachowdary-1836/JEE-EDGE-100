import { r } from "./note-helpers";

export type StrategySection = { key: string; title: string; body: string };

/** Exam strategy guidance. Practical advice only — no invented cut-offs or rank predictions. */
export const STRATEGY: StrategySection[] = [
  {
    key: "reality",
    title: "What a top-100 rank actually takes",
    body: r`A rank in the top 100 needs a score close to the top of the paper — so **accuracy** matters more than attempting everything. With +4 / −1 marking, one wrong answer cancels a quarter of a correct one, and three careless errors erase almost a full question.

> Ranks come from NTA's normalised percentiles across shifts, so no fixed score guarantees a rank. Use your mock scores to track **trend and consistency**, not to predict an exact rank.

What separates top rankers is rarely a secret topic. It is:
1. No weak chapter left completely untouched.
2. Very high accuracy (aim for 95%+ in what you attempt).
3. Speed on routine questions, so time remains for the hard ones.
4. A ruthless habit of analysing every mistake.`,
  },
  {
    key: "paper",
    title: "Know the paper",
    body: r`Default pattern on this platform (check the official bulletin): 75 questions, 25 per subject (20 MCQ + 5 numerical), 180 minutes, +4 for correct and −1 for incorrect in both types.

- That is **2.4 minutes per question** on average.
- Every subject carries 100 marks — no subject can be "skipped".
- Numerical answers have no options to eliminate, so practise exact calculation.`,
  },
  {
    key: "time",
    title: "Time plan for the 3-hour paper",
    body: r`A plan that many strong students use (adapt it in mocks before the exam):

1. **Round 1 (≈ 100 min):** go through all three subjects once. Solve every question you can do in under 2–3 minutes. Mark the rest for review.
2. **Round 2 (≈ 60 min):** return to marked questions, longest-but-doable first.
3. **Round 3 (≈ 20 min):** final check of numerical entries and bubbled options; attempt a marked question only if you can eliminate options confidently.

Checkpoints: about 60 marks' worth of questions done by the 60-minute mark is a healthy pace. Never spend more than 5 minutes on one question in round 1.`,
  },
  {
    key: "order",
    title: "Choosing a subject order",
    body: r`- Start with your **most reliable** subject to build momentum (many begin with Chemistry because many questions are quick).
- Keep your hardest subject in the middle, when you are warmed up but not tired.
- Fix the order in your mocks and keep it on exam day — no experiments.`,
  },
  {
    key: "accuracy",
    title: "Accuracy rules",
    body: r`- **Never guess blindly.** Answer only when you can eliminate at least two options.
- Re-read the question stem for "incorrect", "not", "minimum", units and significant figures.
- In numericals, check sign, units and order of magnitude before entering.
- If two attempts at a calculation disagree, mark it and move on; come back later with a fresh mind.`,
  },
  {
    key: "mistakes",
    title: "The mistake-analysis loop (the biggest lever)",
    body: r`After every test or Gym session:

1. Every wrong or skipped question goes into the **Mistake Notebook** automatically — classify it (conceptual, formula selection, calculation, interpretation, time, guessing).
2. Write one line on what you will do differently.
3. Re-attempt it on schedule (1, 3, 7, 15 days) until it is resolved.
4. Once a week, look at the category chart: if "calculation" dominates, slow down slightly; if "conceptual" dominates, go back to the notes and the Formula Lab's *When NOT to use it* fields.

A mistake made twice is a habit. Kill habits first.`,
  },
  {
    key: "sixty",
    title: "Using the last 60 days",
    body: r`Follow the 60-Day Plan's four phases:

- **Days 1–15 Concept Foundation:** close gaps in high-priority chapters; finish notes and Gym levels 1–3.
- **Days 16–30 Application:** Gym levels 4–5 and PYQs chapter by chapter.
- **Days 31–45 Exam Mastery:** a full mock every third day, analysis the next day, weak-topic correction in between.
- **Days 46–60 Final Revision:** formula sheets, flashcards, mistake notebook, mocks at your exam shift's time; no new heavy topics in the last week.

Use **Recover missed tasks** on buffer days instead of guilt-tripping — consistency beats intensity.`,
  },
  {
    key: "revision",
    title: "Revision that sticks",
    body: r`- Clear the **due flashcards** daily (5–15 minutes). Spaced repetition beats rereading.
- Revise each chapter with its **formula sheet** and **Quick revision summary**; mark the topic revised.
- Keep one page of "my traps" per subject from the Common examination traps sections.
- Before each mock, spend 10 minutes on that week's mistake notebook entries.`,
  },
  {
    key: "subjects",
    title: "Subject-wise approach",
    body: r`**Physics:** draw the diagram first (FBD, ray diagram, circuit). Identify the governing law, then the formula — and check its conditions. Practise units and dimensional checks to catch errors.

**Chemistry:** Physical — practise numericals until formulas are automatic. Inorganic — short daily reading of trends and exceptions (the Inorganic exceptions library). Organic — learn mechanisms and named reactions as connected maps (use the Organic reaction map and conversion practice), not isolated facts.

**Mathematics:** speed comes from recognising standard forms. Keep the formula sheet handy, solve with properties first (symmetry, King's property, Vieta), and only then compute.`,
  },
  {
    key: "routine",
    title: "A sustainable daily routine",
    body: r`- 6–10 focused hours split into 90-minute blocks with short breaks.
- At least one block of timed question practice every day.
- Sleep 7 hours; the exam rewards a rested brain more than one extra late-night hour.
- One light day per week (the plan's buffer day) to recover and catch up.`,
  },
  {
    key: "examday",
    title: "Exam-day checklist",
    body: r`- Admit card, valid photo ID, permitted items only; check the centre route a day earlier.
- Reach early; read instructions calmly in the first minutes.
- Follow your mock-tested time plan and subject order.
- If a section feels hard, it is hard for everyone (normalisation) — move on, do not panic.
- Keep the last 5 minutes to review numerical entries.`,
  },
];
