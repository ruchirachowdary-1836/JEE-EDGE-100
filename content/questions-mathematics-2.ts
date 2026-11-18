import type { QuestionSeed } from "./types";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).

export const MATHEMATICS_QUESTIONS_2: QuestionSeed[] = [
  // ── Probability ──
  {
    topic: "probability", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Two fair coins are tossed. The probability of getting at least one head is:",
    options: [
      { text: "$\\dfrac34$", correct: true, why: "$1 - P(\\text{TT}) = 1 - \\frac14$." },
      { text: "$\\dfrac12$", why: "Exactly one head." },
      { text: "$\\dfrac14$", why: "Both heads." },
      { text: "$1$", why: "TT is possible." },
    ],
    solution: "Sample space {HH, HT, TH, TT}. $P(\\text{at least one H}) = 1 - P(\\text{TT}) = 1 - \\dfrac14 = \\dfrac34$.",
    concept: "Complement rule", formula: "$P(A) = 1 - P(A')$", whyFormula: "'At least one' is easiest by complement.", mistakes: "Counting exactly one head.",
  },
  {
    topic: "probability", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Independent events $A$, $B$ have $P(A) = 0.5$ and $P(B) = 0.4$. $P(A\\cap B)$ is:",
    options: [
      { text: "0.2", correct: true, why: "$0.5\\times0.4$." },
      { text: "0.9", why: "Sum, not product." },
      { text: "0.7", why: "That is $P(A\\cup B)$." },
      { text: "0.1", why: "Difference." },
    ],
    solution: "For independent events $P(A\\cap B) = P(A)P(B) = 0.2$.",
    concept: "Independence", formula: "$P(A\\cap B) = P(A)P(B)$", whyFormula: "Definition of independence.", mistakes: "Adding probabilities.",
  },
  {
    topic: "probability", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 5,
    statement: "Two fair dice are thrown. If $P(\\text{sum} = 8) = \\dfrac{k}{36}$, find $k$.",
    solution: "Favourable: (2,6), (3,5), (4,4), (5,3), (6,2) — 5 outcomes. $k = 5$.",
    concept: "Classical probability", formula: "$P = \\dfrac{\\text{favourable}}{\\text{total}}$", whyFormula: "36 equally likely ordered outcomes.", mistakes: "Counting (4,4) twice or treating dice as unordered.",
  },
  {
    topic: "probability", level: 2, difficulty: "EASY", type: "MCQ", time: 45,
    statement: "If $P(A) = 0.6$, $P(B) = 0.5$ and $P(A\\cup B) = 0.8$, then $P(A\\mid B)$ is:",
    options: [
      { text: "0.6", correct: true, why: "$P(A\\cap B) = 0.3$; $0.3/0.5$." },
      { text: "0.5", why: "That is $P(B)$, not the conditional probability." },
      { text: "0.3", why: "That is $P(A\\cap B)$." },
      { text: "0.75", why: "Divided by $P(A\\cup B)$." },
    ],
    solution: "$P(A\\cap B) = 0.6 + 0.5 - 0.8 = 0.3$. $P(A\\mid B) = \\dfrac{0.3}{0.5} = 0.6$.",
    concept: "Conditional probability", formula: "$P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}$", whyFormula: "Find the intersection first.", mistakes: "Dividing by $P(A)$.",
  },
  {
    topic: "probability", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 3,
    statement: "A fair coin is tossed 4 times. If $P(\\text{exactly two heads}) = \\dfrac{k}{8}$, find $k$.",
    solution: "$P = \\binom42\\left(\\tfrac12\\right)^4 = \\dfrac{6}{16} = \\dfrac38$. $k = 3$.",
    concept: "Binomial distribution", formula: "$P(X = r) = \\binom nr p^rq^{n-r}$", whyFormula: "Independent identical trials.", mistakes: "Forgetting $\\binom42$.",
  },
  {
    topic: "probability", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "A bag has 5 red and 3 black balls. Two balls are drawn without replacement. The probability that both are red is:",
    options: [
      { text: "$\\dfrac{5}{14}$", correct: true, why: "$\\frac58\\cdot\\frac47$." },
      { text: "$\\dfrac{25}{64}$", why: "With replacement." },
      { text: "$\\dfrac58$", why: "Only the first draw." },
      { text: "$\\dfrac{3}{8}$", why: "Probability of a black ball on one draw." },
    ],
    solution: "$P = \\dfrac{\\binom52}{\\binom82} = \\dfrac{10}{28} = \\dfrac5{14}$.",
    concept: "Dependent events", formula: "$P(A\\cap B) = P(A)P(B\\mid A)$", whyFormula: "Without replacement changes the second probability.", alt: "$\\frac58\\times\\frac47 = \\frac{20}{56} = \\frac5{14}$.", mistakes: "Treating draws as independent.",
  },
  {
    topic: "probability", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "Urn I has 3 white and 2 black balls; urn II has 2 white and 3 black. An urn is chosen at random and a ball drawn is white. The probability it came from urn I is:",
    options: [
      { text: "$\\dfrac35$", correct: true, why: "Bayes: $\\frac{3/10}{5/10}$." },
      { text: "$\\dfrac12$", why: "Prior probability, ignores the evidence." },
      { text: "$\\dfrac25$", why: "Probability of urn II." },
      { text: "$\\dfrac3{10}$", why: "Joint probability, not conditional." },
    ],
    solution: "$P(W) = \\tfrac12\\cdot\\tfrac35 + \\tfrac12\\cdot\\tfrac25 = \\tfrac12$. $P(I\\mid W) = \\dfrac{\\frac12\\cdot\\frac35}{\\frac12} = \\dfrac35$.",
    concept: "Bayes' theorem", formula: "$P(E_i\\mid A) = \\dfrac{P(E_i)P(A\\mid E_i)}{\\sum P(E_j)P(A\\mid E_j)}$", whyFormula: "Reverse conditioning from observed result.", mistakes: "Forgetting the denominator.",
  },
  {
    topic: "probability", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 0.5, tolerance: 0.01,
    statement: "A random variable takes values 0, 1, 2 with probabilities 0.25, 0.5, 0.25. Find its variance.",
    solution: "$E(X) = 0 + 0.5 + 0.5 = 1$. $E(X^2) = 0 + 0.5 + 1 = 1.5$. Var $= 1.5 - 1 = 0.5$.",
    concept: "Mean and variance of a distribution", formula: "Var $= E(X^2) - [E(X)]^2$", whyFormula: "Shortcut formula.", mistakes: "Using $E(X)^2$ for $E(X^2)$.",
  },
  {
    topic: "probability", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 90, answer: 255,
    statement: "A binomial variable has mean 4 and variance 2. If $P(X \\ge 1) = \\dfrac{k}{256}$, find $k$.",
    solution: "$np = 4$, $npq = 2 \\Rightarrow q = \\tfrac12$, $p = \\tfrac12$, $n = 8$. $P(X \\ge 1) = 1 - q^8 = 1 - \\dfrac1{256} = \\dfrac{255}{256}$. $k = 255$.",
    concept: "Binomial parameters", formula: "mean $np$, variance $npq$", whyFormula: "Two equations give $n$ and $p$.", mistakes: "Computing $P(X = 1)$ instead.",
  },
  {
    topic: "probability", level: 5, difficulty: "HARD", type: "MCQ", time: 90,
    statement: "A and B throw a die alternately, A first. The first to throw a six wins. The probability that A wins is:",
    options: [
      { text: "$\\dfrac6{11}$", correct: true, why: "Geometric series with ratio $\\frac{25}{36}$." },
      { text: "$\\dfrac12$", why: "Ignores A's first-move advantage." },
      { text: "$\\dfrac5{11}$", why: "That is B's probability." },
      { text: "$\\dfrac16$", why: "Only A's first throw." },
    ],
    solution: "$P(A) = \\dfrac16 + \\left(\\dfrac56\\right)^2\\dfrac16 + \\left(\\dfrac56\\right)^4\\dfrac16 + \\dots = \\dfrac{1/6}{1 - 25/36} = \\dfrac{1/6}{11/36} = \\dfrac6{11}$.",
    concept: "Infinite geometric series in probability", formula: "$S_\\infty = \\dfrac a{1 - r}$", whyFormula: "A wins on throws 1, 3, 5, …", mistakes: "Using ratio $\\frac56$ instead of $\\left(\\frac56\\right)^2$.",
  },

  // ── Determinants ──
  {
    topic: "determinants", level: 1, difficulty: "EASY", type: "MCQ", time: 25,
    statement: "$\\begin{vmatrix} 2 & 3 \\\\ 1 & 4 \\end{vmatrix}$ equals:",
    options: [
      { text: "5", correct: true, why: "$8 - 3$." },
      { text: "11", why: "Added the products." },
      { text: "−5", why: "Reversed order of subtraction." },
      { text: "10", why: "Arithmetic slip." },
    ],
    solution: "$ad - bc = 2\\cdot4 - 3\\cdot1 = 5$.",
    concept: "2×2 determinant", formula: "$ad - bc$", whyFormula: "Definition.", mistakes: "Using $ad + bc$.",
  },
  {
    topic: "determinants", level: 1, difficulty: "EASY", type: "MCQ", time: 25,
    statement: "If two rows of a determinant are identical, its value is:",
    options: [
      { text: "0", correct: true, why: "Swapping them changes sign yet leaves it unchanged ⇒ 0." },
      { text: "1", why: "No reason for 1." },
      { text: "the product of the diagonal", why: "Only for triangular matrices." },
      { text: "undefined", why: "Determinants of square matrices are always defined." },
    ],
    solution: "Interchanging the identical rows gives $D = -D$, so $D = 0$.",
    concept: "Properties of determinants", formula: "Row swap changes sign", whyFormula: "Swapping identical rows changes nothing.", mistakes: "None common.",
  },
  {
    topic: "determinants", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 32,
    statement: "$A$ is a $3\\times3$ matrix with $|A| = 4$. Find $|2A|$.",
    solution: "$|kA| = k^n|A| = 2^3\\times4 = 32$.",
    concept: "Scalar multiple", formula: "$|kA| = k^n|A|$", whyFormula: "Each of $n$ rows is scaled by $k$.", mistakes: "Answering 8 ($2|A|$).",
  },
  {
    topic: "determinants", level: 2, difficulty: "EASY", type: "MCQ", time: 35,
    statement: "For a $3\\times3$ matrix with $|A| = 3$, $|\\operatorname{adj}A|$ equals:",
    options: [
      { text: "9", correct: true, why: "$|A|^{n-1} = 3^2$." },
      { text: "3", why: "That is $|A|$." },
      { text: "27", why: "Uses $|A|^n$." },
      { text: "1/3", why: "That is $|A^{-1}|$." },
    ],
    solution: "$|\\operatorname{adj}A| = |A|^{n-1} = 3^2 = 9$.",
    concept: "Adjoint", formula: "$|\\operatorname{adj}A| = |A|^{n-1}$", whyFormula: "From $A\\,\\operatorname{adj}A = |A|I$.", mistakes: "Using exponent $n$.",
  },
  {
    topic: "determinants", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: -3,
    statement: "Evaluate $\\begin{vmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 10 \\end{vmatrix}$.",
    solution: "$1(50 - 48) - 2(40 - 42) + 3(32 - 35) = 2 + 4 - 9 = -3$.",
    concept: "3×3 expansion", formula: "Cofactor expansion along row 1", whyFormula: "Direct evaluation.", alt: "$R_2 \\to R_2 - R_1$, $R_3 \\to R_3 - R_2$ simplifies first.", mistakes: "Sign of the middle cofactor.",
  },
  {
    topic: "determinants", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "The area of the triangle with vertices $(0,0)$, $(4,0)$, $(0,3)$ is:",
    options: [
      { text: "6", correct: true, why: "$\\tfrac12\\times4\\times3$." },
      { text: "12", why: "Forgot the $\\tfrac12$." },
      { text: "7", why: "Added sides." },
      { text: "3.5", why: "Arithmetic slip." },
    ],
    solution: "$\\dfrac12\\left|\\begin{vmatrix}0&0&1\\\\4&0&1\\\\0&3&1\\end{vmatrix}\\right| = \\dfrac12|12| = 6$.",
    concept: "Area by determinant", formula: "$\\tfrac12|\\det|$", whyFormula: "Standard result.", mistakes: "Dropping the $\\tfrac12$.",
  },
  {
    topic: "determinants", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 120,
    statement: "For the system $x + y + z = 1$, $x + 2y + 3z = 2$, $x + 3y + kz = 3$, when $k = 5$ the system has:",
    options: [
      { text: "infinitely many solutions", correct: true, why: "$D = 0$ and the equations are consistent." },
      { text: "a unique solution", why: "Needs $D \\ne 0$, i.e. $k \\ne 5$." },
      { text: "no solution", why: "Equations are consistent (third is a combination)." },
      { text: "exactly two solutions", why: "Linear systems never have exactly two." },
    ],
    solution: "$D = \\begin{vmatrix}1&1&1\\\\1&2&3\\\\1&3&k\\end{vmatrix} = k - 5$, so $D = 0$ at $k = 5$. Then eq2 − eq1: $y + 2z = 1$; eq3 − eq2: $y + 2z = 1$ — the same equation, so the system is consistent with a free variable: infinitely many solutions.",
    concept: "Consistency of linear systems", formula: "$D = 0$ ⇒ none or infinitely many", whyFormula: "Must check consistency when $D = 0$.", mistakes: "Concluding 'no solution' from $D = 0$ alone.",
  },
  {
    topic: "determinants", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 16,
    statement: "$A$ is a $3\\times3$ matrix with $|A| = 2$. Find $|\\operatorname{adj}(\\operatorname{adj}A)|$.",
    solution: "$|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{(n-1)^2} = 2^4 = 16$.",
    concept: "Repeated adjoint", formula: "$|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{(n-1)^2}$", whyFormula: "Apply $|\\operatorname{adj}B| = |B|^{n-1}$ twice.", mistakes: "Using $(n-2)$ from the matrix identity.",
  },
  {
    topic: "determinants", level: 5, difficulty: "HARD", type: "MCQ", time: 60,
    statement: "The value of $\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 4 & 9 \\end{vmatrix}$ is:",
    options: [
      { text: "2", correct: true, why: "Vandermonde: $(a-b)(b-c)(c-a)$ with $a, b, c = 1, 2, 3$." },
      { text: "−2", why: "Sign slip in the Vandermonde product." },
      { text: "0", why: "Rows are not proportional." },
      { text: "6", why: "Product of differences without signs." },
    ],
    solution: "This is $\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix} = (a-b)(b-c)(c-a)$ with $a = 1, b = 2, c = 3$: $(-1)(-1)(2) = 2$.",
    concept: "Vandermonde determinant", formula: "$(a-b)(b-c)(c-a)$", whyFormula: "Recognising the structure avoids expansion.", alt: "Direct expansion: $1(18 - 12) - 1(9 - 3) + 1(4 - 2) = 6 - 6 + 2 = 2$.", mistakes: "Sign order of the factors.",
  },
  {
    topic: "determinants", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 120, answer: -1,
    statement: "The system $kx + y + z = 0$, $x + ky + z = 0$, $x + y + kz = 0$ has a non-trivial solution. Find the sum of all distinct real values of $k$.",
    solution: "Non-trivial solution ⇔ $D = 0$. $D = \\begin{vmatrix}k&1&1\\\\1&k&1\\\\1&1&k\\end{vmatrix} = (k + 2)(k - 1)^2$. So $k = 1$ or $k = -2$; sum $= -1$.",
    concept: "Homogeneous systems", formula: "Non-trivial ⇔ $|A| = 0$", whyFormula: "Trivial solution always exists; others need a singular matrix.", alt: "Add all columns to the first to extract $(k + 2)$.", mistakes: "Counting $k = 1$ twice.",
  },
];
