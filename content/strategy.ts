import { r } from "./note-helpers";

/**
 * kind "rule"   = an examination rule. Stated only where it has been stable in recent official documents, and
 *                 always with the instruction to confirm it in the current official bulletin/brochure.
 * kind "advice" = a recommendation from the content team. Never presented as an official rule.
 */
export type StrategySection = { key: string; title: string; body: string; kind: "rule" | "advice" };
export type StrategyTrack = { key: string; title: string; tagline: string; sections: StrategySection[] };

const MAIN: StrategyTrack = {
  key: "main",
  title: "JEE Main 2027",
  tagline: "Conducted by NTA. Decides your NIT/IIIT/GFTI rank and whether you can sit JEE Advanced.",
  sections: [
    {
      key: "main-pattern",
      kind: "rule",
      title: "Examination pattern (Paper 1, B.E./B.Tech.)",
      body: r`From the official **JEE Main 2027 Information Bulletin** (NTA, uploaded 24 Oct 2026; checked 19 Nov 2026):

- Computer-based test, **3 hours** (4 hours for PwD/PwBD candidates eligible for a scribe), Physics, Chemistry and Mathematics with equal weightage.
- Per subject: **Section A — 20 multiple-choice questions**, **Section B — 5 numerical-value questions**. All 75 questions are compulsory; total **300 marks**.
- Marking in both sections: **+4** correct, **−1** incorrect, **0** unanswered or marked for review.
- **Section B answers are integers**: you type the value on an on-screen keypad, and the bulletin says the answer should be **rounded off to the nearest integer**. Use the constants given in the question.
- **Session 1:** 20, 21, 22, 23, 24 and 28 January 2027. **Session 2:** 2, 3, 4, 5, 6 and 7 April 2027. Shifts: 9:00 a.m.–12:00 noon and 3:00–6:00 p.m. (IST). Candidates may take one or both sessions.
- Results are **NTA scores** (percentiles computed per shift, then merged). For candidates who take both sessions, the **better of the two total NTA scores** is used for the merit list.

Question Gym numericals sometimes have decimal answers: they are practice in JEE Advanced style. In the real JEE Main paper, round your Section B answer to the nearest integer.

Syllabus: see the Syllabus page, checked against the official 2027 PDF.`,
    },
    {
      key: "main-numbers",
      kind: "advice",
      title: "What the marking scheme means for you",
      body: r`Work it out once, then let it guide every decision in the paper:

- 180 minutes for 75 questions is **2.4 minutes per question** on average. Routine questions must take far less, so the hard ones can take more.
- With +4 / −1, a guess with 4 equally likely options has an expected value of $\tfrac14(4) + \tfrac34(-1) = +0.25$. That is small and has high variance: guess only after eliminating at least **two** options (expected value $\tfrac12(4) + \tfrac12(-1) = +1.5$).
- **Numerical (Section B) questions also carry −1**, and there are no options to eliminate. Enter a value only when you have actually solved the problem.
- Every subject carries 100 marks. A neglected subject cannot be compensated by the other two at the top end.`,
    },
    {
      key: "main-speed",
      kind: "advice",
      title: "Speed and question selection",
      body: r`A three-round plan that many strong candidates adapt (test it in mocks first):

1. **Round 1 (about 100 min):** go through every subject once. Solve every question you can finish in about 2 minutes; mark the rest. Never sit on one question for more than about 4 minutes in this round.
2. **Round 2 (about 60 min):** return to the marked questions, starting with the ones closest to done.
3. **Round 3 (about 20 min):** re-check numerical entries and marked answers; attempt a marked question only if you can now eliminate options confidently.

How to choose in Round 1: read the question, identify the governing idea in about 20 seconds, and decide. "I know the idea and the algebra is short" → solve now. "I know the idea but it is long" → mark. "I do not recognise it" → mark and move on.`,
    },
    {
      key: "main-accuracy",
      kind: "advice",
      title: "Accuracy",
      body: r`- Aim for **95% or higher accuracy in what you attempt** in your later mocks. Track it on the Progress page.
- Re-read the stem for "incorrect", "not", "minimum", "maximum", units and the quantity actually asked.
- In numericals, check sign, unit and order of magnitude before entering. JEE Main 2027 Section B takes integers only: round your final value to the nearest integer, and round only at the end.
- If two attempts at a calculation disagree, mark it and come back later with a fresh mind.`,
    },
    {
      key: "main-subjects",
      kind: "advice",
      title: "Subject-wise strategy for JEE Main",
      body: r`**Physics:** draw the diagram first (free-body, ray, circuit). Name the governing law, then choose the formula and check its conditions in the Formula Lab. Dimensional checks catch many errors quickly.

**Chemistry:** many questions are short and direct, which makes Chemistry a common first subject. Physical — numerical fluency. Inorganic — short daily revision of trends and exceptions (NCERT-based statements appear often). Organic — mechanisms and reaction maps, not isolated facts.

**Mathematics:** usually the longest section. Recognise standard forms, use properties first (symmetry, properties of definite integrals, Vieta's relations), compute only after that. Keep Maths in the middle or at the end depending on what your mocks show.`,
    },
    {
      key: "main-sessions",
      kind: "advice",
      title: "Percentiles and the two sessions",
      body: r`- Because scores are normalised per shift, a hard shift does not by itself put you at a disadvantage: if a paper feels hard, it is hard for everyone in that shift. Keep going with your plan.
- Use the **January session** as a full rehearsal under real conditions. Analyse it like a mock and correct the weak chapters before April.
- No fixed raw score guarantees a percentile or rank; the score-to-percentile relation changes every shift. Track your mock trend and consistency instead of chasing a predicted rank.
- JEE Main also decides **eligibility for JEE Advanced**: a set number of top Paper 1 candidates, by category, can register for JEE Advanced (2.5 lakh in recent years; the exact rule is in the JEE Advanced information brochure).`,
    },
  ],
};

const ADVANCED: StrategyTrack = {
  key: "advanced",
  title: "JEE Advanced 2027 · the AIR 100 framework",
  tagline: "Set by the IITs (IIT Delhi organises 2027). Your IIT rank — and any AIR — comes only from your JEE Advanced marks.",
  sections: [
    {
      key: "adv-rank",
      kind: "rule",
      title: "How a JEE Advanced rank is decided",
      body: r`From recent JEE Advanced information brochures — **confirm in the 2027 brochure on jeeadv.ac.in**:

- **JEE Advanced 2027 is on Sunday 23 May 2027** (official: jeeadv.ac.in, posted 13 Nov 2026; organised by IIT Delhi).
- There are **two compulsory papers, Paper 1 and Paper 2, each 3 hours**, held on the same day. Each paper has Physics, Chemistry and Mathematics. A candidate must attempt **both** papers to be ranked.
- The rank is based on the **aggregate marks in JEE Advanced** (Paper 1 + Paper 2). To be included in a rank list, a candidate must also reach the **minimum subject-wise and aggregate marks** set in the brochure.
- **JEE Main percentiles do not enter the JEE Advanced rank.** JEE Main only decides who is eligible to sit JEE Advanced.

So the AIR 100 goal is a **JEE Advanced** goal: maximise your aggregate over two papers, with no weak subject.`,
    },
    {
      key: "adv-formats",
      kind: "rule",
      title: "Question formats and variable marking",
      body: r`The IITs do **not** publish the paper pattern in advance. The number of questions, the question types and the marking scheme for each section are printed in the **instructions on the paper itself**, and they have changed from year to year. Formats that have appeared in recent papers:

- **Single correct option** (multiple-choice, usually with negative marking).
- **One or more correct options** (multiple-correct), usually with **partial marking**.
- **Numerical / integer answer**, typically without options. Negative marking has varied by year.
- **Matching lists** (match List-I with List-II, answered as a single option).
- **Paragraph-based** questions sharing one passage.

Example of a partial-marking rule used in several recent papers for multiple-correct questions (check the actual instruction on the day): **+4** if exactly all correct options are chosen; **+3** if all four options are correct and three are chosen; **+2** if three or more are correct and two correct ones are chosen; **+1** if two or more are correct and one correct one is chosen; **0** if unanswered; **−2** in all other cases (any wrong option chosen).`,
    },
    {
      key: "adv-instructions",
      kind: "advice",
      title: "Read the marking scheme before the first question",
      body: r`Spend the first few minutes of each paper reading every section's instructions and write a one-line summary for each section on your rough sheet, for example: "Sec 2: one or more correct, partial +1/+2/+3, any wrong = −2". This decides how you answer:

- **Partial marking rewards certainty, not boldness.** In the example scheme above, choosing only the options you are sure of earns partial credit; adding one doubtful option risks −2. If you are sure of two options and unsure of a third, mark the two.
- **Single-correct with negative marking:** the same elimination rule as in Main — answer after eliminating two options.
- **Numerical answers without negative marking:** always enter your best value; an attempted answer cannot lose marks there. Check whether that is the case in the instructions.`,
    },
    {
      key: "adv-depth",
      kind: "advice",
      title: "Multi-concept questions",
      body: r`JEE Advanced questions usually combine two or three ideas (for example, rotational dynamics with collisions, or electrostatics with work–energy). Typical moves that work:

1. **Identify the systems and the stages.** Split the event into stages (before impact, impact, after impact) and write which quantity is conserved in each stage and why.
2. **Choose the frame and the variables** before writing equations. A good frame (centre of mass, rotating frame, a convenient origin) often removes half the algebra.
3. **Check limiting cases.** Let a mass → 0, an angle → 0, a charge → 0, or $t \to \infty$, and see if your answer behaves sensibly. This catches most sign and factor errors.
4. **Use the options** in single-correct questions: dimensions and limiting cases often eliminate two options without solving.

Level 5 of the Question Gym is written in this style: every Level 5 question needs at least two connected ideas, not just heavier arithmetic.`,
    },
    {
      key: "adv-time",
      kind: "advice",
      title: "Time allocation and paper stamina",
      body: r`- **Per paper:** roughly equal time per subject, decided in mocks. A common structure is two passes: first, every question you can solve with confidence; second, the long or uncertain ones.
- **Stop rule:** if a question has taken twice your average time without clear progress, mark it and move on. Return only after a full pass.
- **Two papers in one day:** the gap between papers is for recovery, not for discussing Paper 1. Eat, rest, and treat Paper 2 as a fresh start; ranks are on the aggregate, so a weak Paper 1 can be recovered.
- **Build stamina deliberately:** in the last 6–8 weeks take full **back-to-back two-paper mocks** at the actual exam timings, at least once a week.`,
    },
    {
      key: "adv-mocks",
      kind: "advice",
      title: "Advanced mock analysis",
      body: r`After every Advanced-style mock, record for each section:

1. **Marks lost to wrong options** (negative marks) versus **marks left unattempted**. If negatives are high, you are guessing in partial-marking sections; if unattempted marks are high in sections without negative marking, you are leaving free marks.
2. **Concept vs execution:** for each lost question, was the idea missing, or was the idea right but the execution wrong? Missing ideas go back to the notes; execution errors go to timed Gym practice.
3. **Time per question** in each section, compared with your plan.
4. **Subject balance:** the minimum-marks rule means one very weak subject can remove you from the rank list entirely.

Use the same Mistake Notebook loop as for Main.`,
    },
    {
      key: "adv-air100",
      kind: "advice",
      title: "What an AIR-100 preparation looks like",
      body: r`There is no published "AIR 100 score": the marks needed change every year with the paper. Check past rank-versus-marks data in the official JEE Advanced results released by the organising IIT, not unofficial predictors. What reliably separates top rankers:

- **Depth in every chapter of the JEE Advanced syllabus**, including material beyond JEE Main (see the "Beyond JEE Main 2027" labels on topic pages; the JEE Advanced 2027 syllabus will be mapped when published).
- **Consistent Level 4–5 practice** with full written solutions, and re-solving every question you got wrong without looking at the solution.
- **Accuracy in partial-marking sections**: few or no −2s.
- **Stamina** for two papers in one day.
- **No weak subject.**

This platform never shows a predicted AIR: a prediction from a few mocks would be noise presented as fact.`,
    },
  ],
};

const COMMON: StrategyTrack = {
  key: "common",
  title: "For both exams: how to study",
  tagline: "Methods with good evidence behind them, and how this platform supports them.",
  sections: [
    {
      key: "evidence",
      kind: "advice",
      title: "Study methods with strong evidence",
      body: r`A widely cited review of learning research (Dunlosky et al., 2013, *Psychological Science in the Public Interest*) rated two techniques as having **high utility**:

- **Practice testing (retrieval practice):** answering questions from memory beats rereading. Use the Question Gym and flashcards rather than rereading notes.
- **Distributed practice (spacing):** revisiting material over increasing intervals. The flashcards here schedule each card with spaced repetition.

It rated **highlighting and rereading** as **low utility** on their own. Use highlights to mark what to test yourself on, not as the revision itself. **Interleaving** (mixing topics in one session) was rated moderate and is how the mixed practice sets work.`,
    },
    {
      key: "mistakes",
      kind: "advice",
      title: "The mistake-analysis loop (the biggest lever)",
      body: r`After every test or Gym session:

1. Every wrong or skipped question goes into the **Mistake Notebook** — classify it (conceptual, formula selection, calculation, interpretation, time, guessing).
2. Write one line on what you will do differently.
3. Re-attempt it on a schedule (1, 3, 7, 15 days) until it is resolved.
4. Once a week, look at the categories: if "calculation" dominates, slow down slightly; if "conceptual" dominates, go back to the notes and the Formula Lab's *When NOT to use it* fields.

A mistake made twice is a habit. Fix habits first.`,
    },
    {
      key: "sixty",
      kind: "advice",
      title: "Using the last 60 days",
      body: r`The full app's 60-Day Plan uses four phases:

- **Days 1–15 Concept Foundation:** close gaps in high-priority chapters; notes and Gym levels 1–3.
- **Days 16–30 Application:** Gym levels 4–5 and chapter-wise previous-year questions from official papers.
- **Days 31–45 Exam Mastery:** a full mock every third day, analysis the next day, weak-topic correction in between.
- **Days 46–60 Final Revision:** formula sheets, flashcards, mistake notebook, mocks at your exam shift's time; no new heavy topics in the last week.

For JEE Advanced, replace single mocks with **two-paper mocks** in the last phase.`,
    },
    {
      key: "routine",
      kind: "advice",
      title: "A sustainable daily routine",
      body: r`- 6–10 focused hours split into blocks of about 90 minutes with short breaks.
- At least one block of timed question practice every day.
- Sleep about 7–8 hours; memory consolidation depends on sleep.
- One lighter day per week to recover and catch up.`,
    },
    {
      key: "examday",
      kind: "advice",
      title: "Exam-day checklist",
      body: r`- Admit card, valid photo ID and only the permitted items listed in the official instructions; check the centre route a day earlier.
- Reach early; read the instructions (and, in JEE Advanced, each section's marking scheme) calmly.
- Follow your mock-tested time plan and subject order.
- Keep the last few minutes to review numerical entries.`,
    },
  ],
};

export const STRATEGY_TRACKS: StrategyTrack[] = [MAIN, ADVANCED, COMMON];
/** Flat list, kept for code that only needs the sections. */
export const STRATEGY: StrategySection[] = STRATEGY_TRACKS.flatMap((t) => t.sections);
