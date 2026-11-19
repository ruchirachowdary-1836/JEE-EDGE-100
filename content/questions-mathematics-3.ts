import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// One five-level set per chapter. Numerical answers are recomputed independently in tests/verify-answers.ts.

export const MATHEMATICS_QUESTIONS_3: QuestionSeed[] = [
  // ── Sets, Relations and Functions · Functions ──
  {
    topic: "functions", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The function $f:\mathbb R \to \mathbb R$, $f(x) = 2x + 3$ is:`,
    options: [
      { text: "one-one and onto", correct: true, why: "A non-constant linear function on ℝ is a bijection." },
      { text: "one-one but not onto", why: "Every real $y$ has the preimage $(y - 3)/2$." },
      { text: "onto but not one-one", why: "$2x_1 + 3 = 2x_2 + 3 \\Rightarrow x_1 = x_2$." },
      { text: "neither", why: "It is both." },
    ],
    solution: r`One-one: $f(x_1) = f(x_2) \Rightarrow x_1 = x_2$. Onto: for any $y$, $x = (y - 3)/2 \in \mathbb R$ gives $f(x) = y$.`,
    concept: "Injective and surjective functions", formula: "Solve $f(x) = y$ for $x$", whyFormula: "Existence and uniqueness of the solution decide onto and one-one.", mistakes: "Forgetting to check the codomain for onto.",
  },
  {
    topic: "functions", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 10,
    statement: r`If $f(x) = x^2 + 1$ and $g(x) = 2x - 1$, find $(f\circ g)(2)$.`,
    solution: r`$g(2) = 3$, then $f(3) = 10$.`,
    concept: "Composition of functions", formula: r`$(f\circ g)(x) = f(g(x))$`, whyFormula: "Apply $g$ first.", mistakes: "Computing $g(f(2)) = 9$.",
  },
  {
    topic: "functions", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The domain of $f(x) = \sqrt{4 - x^2}$ (as a real function) is:`,
    options: [
      { text: r`$[-2, 2]$`, correct: true, why: r`Need $4 - x^2 \ge 0$.` },
      { text: r`$(-2, 2)$`, why: "The endpoints give $\\sqrt0 = 0$, which is allowed." },
      { text: r`$[0, 2]$`, why: "Negative $x$ also satisfy the condition." },
      { text: r`$\mathbb R$`, why: "For $|x| > 2$ the radicand is negative." },
    ],
    solution: r`$4 - x^2 \ge 0 \iff x^2 \le 4 \iff -2 \le x \le 2$.`,
    concept: "Domain of a real function", formula: r`$\sqrt{u}$ needs $u \ge 0$`, whyFormula: "Real square roots of negatives do not exist.", mistakes: "Excluding the endpoints.",
  },
  {
    topic: "functions", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 6,
    statement: r`How many onto functions are there from $\{1, 2, 3\}$ to $\{a, b\}$?`,
    solution: r`Total functions: $2^3 = 8$. Not onto: the two constant functions (all to $a$ or all to $b$). Onto: $8 - 2 = 6$.`,
    concept: "Counting onto functions", formula: r`$\#\text{onto} = 2^n - 2$ for a 2-element codomain`, whyFormula: "Complement of the functions that miss an element.", mistakes: "Counting one-one functions (there are none: 3 > 2).",
  },
  {
    topic: "functions", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: 3,
    statement: r`Let $f(x) = \dfrac{x + 1}{x - 1}$, $x \ne 1$. Find $\underbrace{(f\circ f\circ\cdots\circ f)}_{2027\ \text{times}}(2)$.`,
    solution: r`Compute $f(f(x))$: $f(f(x)) = \dfrac{\frac{x + 1}{x - 1} + 1}{\frac{x + 1}{x - 1} - 1} = \dfrac{2x}{2} = x$.

So $f$ is its own inverse ($f\circ f$ is the identity). An odd number of compositions equals $f$ itself: the answer is $f(2) = \dfrac{3}{1} = 3$.`,
    concept: "Self-inverse functions (involutions)", formula: r`$f\circ f = \text{id} \Rightarrow f^{(2k+1)} = f$`, whyFormula: "Finding a pattern instead of composing 2027 times.", alt: "Check numerically: f(2) = 3, f(3) = 2, f(2) = 3, …; odd steps give 3.", mistakes: "Composing a few times and guessing without proving $f\\circ f = x$.",
  },

  // ── Permutations and Combinations ──
  {
    topic: "counting", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The number of arrangements of the letters of the word CAT is:",
    options: [
      { text: "6", correct: true, why: "3! = 6." },
      { text: "3", why: "That is the number of letters." },
      { text: "9", why: "Uses 3² instead of 3!." },
      { text: "27", why: "Allows repetition (3³)." },
    ],
    solution: "Three distinct letters: $3! = 6$ arrangements.",
    concept: "Permutations of distinct objects", formula: r`$n!$`, whyFormula: "All letters are different and all are used.", mistakes: "Allowing repetition.",
  },
  {
    topic: "counting", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 120,
    statement: r`Find $^{10}C_3$.`,
    solution: r`$^{10}C_3 = \dfrac{10\times9\times8}{3!} = 120$.`,
    concept: "Combinations", formula: r`$^nC_r = \dfrac{n!}{r!(n - r)!}$`, whyFormula: "Definition.", mistakes: "Computing $^{10}P_3 = 720$.",
  },
  {
    topic: "counting", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "From 5 boys and 4 girls, a committee of 3 boys and 2 girls can be formed in how many ways?",
    options: [
      { text: "60", correct: true, why: r`$^5C_3\times{}^4C_2 = 10\times6$.` },
      { text: "16", why: "Adds instead of multiplying." },
      { text: "126", why: "That is $^9C_5$, ignoring the boy/girl split." },
      { text: "720", why: "Arranges instead of selects." },
    ],
    solution: r`Choose the boys and the girls independently and multiply: $^5C_3\times{}^4C_2 = 10\times6 = 60$.`,
    concept: "Multiplication principle with selections", formula: r`$^5C_3\cdot{}^4C_2$`, whyFormula: "Independent choices multiply.", mistakes: "Adding the counts.",
  },
  {
    topic: "counting", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 60,
    statement: "How many distinct arrangements are there of the letters of BANANA?",
    solution: r`6 letters with A repeated 3 times and N twice: $\dfrac{6!}{3!\,2!} = \dfrac{720}{12} = 60$.`,
    concept: "Permutations with repetition", formula: r`$\dfrac{n!}{p!\,q!\cdots}$`, whyFormula: "Swapping identical letters gives the same word.", mistakes: "Dividing only by 3!.",
  },
  {
    topic: "counting", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: 952,
    statement: "How many four-digit numbers with all digits different are divisible by 5?",
    solution: r`The last digit must be 0 or 5; the cases differ because the first digit cannot be 0.

- **Last digit 0:** first digit 9 choices (1–9), then 8, then 7: $9\times8\times7 = 504$.
- **Last digit 5:** first digit 8 choices (1–9 except 5), second 8 (0–9 except the two used), third 7: $8\times8\times7 = 448$.

Total $= 504 + 448 = 952$.`,
    concept: "Case analysis with a restricted position", formula: "Fill the most restricted places first", whyFormula: "The constraint on the first digit depends on the last digit.", mistakes: "Treating both cases the same ($2\\times9\\times8\\times7$) or forgetting that 0 cannot lead.",
  },

  // ── Binomial Theorem ──
  {
    topic: "binomial-theorem", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The number of terms in the expansion of $(x + y)^{10}$ is:`,
    options: [
      { text: "11", correct: true, why: "$n + 1$ terms." },
      { text: "10", why: "Forgets the $r = 0$ term." },
      { text: "20", why: "No such rule." },
      { text: "12", why: "One too many." },
    ],
    solution: r`$(x + y)^n$ has $n + 1$ terms ($r = 0, 1, \dots, n$): 11.`,
    concept: "Number of terms", formula: r`$T_{r+1} = {}^nC_rx^{n-r}y^r$`, whyFormula: "$r$ runs from 0 to $n$.", mistakes: "Answering $n$.",
  },
  {
    topic: "binomial-theorem", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 10,
    statement: r`Find the coefficient of $x^2$ in $(1 + x)^5$.`,
    solution: r`$^5C_2 = 10$.`,
    concept: "Binomial coefficients", formula: r`Coefficient of $x^r$ in $(1 + x)^n$ is $^nC_r$`, whyFormula: "Direct.", mistakes: "Using $^5C_3$ — same value here, but not in general.",
  },
  {
    topic: "binomial-theorem", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The middle term of $\left(x + \dfrac1x\right)^8$ is:`,
    options: [
      { text: "70", correct: true, why: r`$T_5 = {}^8C_4\,x^4x^{-4}$.` },
      { text: r`$70x$`, why: "The powers of $x$ cancel." },
      { text: "56", why: "That is $^8C_3$." },
      { text: "28", why: "That is $^8C_2$." },
    ],
    solution: r`$n = 8$ is even, so there is one middle term, $T_{n/2 + 1} = T_5 = {}^8C_4x^{4}\left(\tfrac1x\right)^4 = 70$.`,
    concept: "Middle term", formula: r`$T_{n/2+1}$ for even $n$`, whyFormula: "There are 9 terms.", mistakes: "Choosing $T_4$.",
  },
  {
    topic: "binomial-theorem", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 84,
    statement: r`Find the term independent of $x$ in $\left(x^2 + \dfrac1x\right)^9$.`,
    solution: r`$T_{r+1} = {}^9C_r(x^2)^{9 - r}x^{-r} = {}^9C_rx^{18 - 3r}$. Independent of $x$: $18 - 3r = 0 \Rightarrow r = 6$. Term $= {}^9C_6 = 84$.`,
    concept: "Term independent of x", formula: r`Set the power of $x$ in $T_{r+1}$ to 0`, whyFormula: "General-term method.", mistakes: "Power counting: $(x^2)^{9-r}$ gives $18 - 2r$.",
  },
  {
    topic: "binomial-theorem", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 150, answer: 10,
    statement: r`Find the coefficient of $x^4$ in $(1 + x)^5(1 - x)^5$.`,
    solution: r`Combine first: $(1 + x)^5(1 - x)^5 = (1 - x^2)^5 = \sum_k {}^5C_k(-1)^kx^{2k}$. The $x^4$ term has $k = 2$: coefficient $= {}^5C_2 = 10$.

(This also shows at once that every odd power, such as $x^5$, has coefficient 0.)`,
    concept: "Simplify before expanding", formula: r`$(1 + x)^n(1 - x)^n = (1 - x^2)^n$`, whyFormula: "Avoids multiplying two expansions term by term.", alt: r`Term by term: $\sum_{r=0}^{4} {}^5C_r\,{}^5C_{4-r}(-1)^{4-r} = 5 - 50 + 100 - 50 + 5 = 10$ — correct but slower and easier to get wrong.`, mistakes: "Expanding both brackets and making a sign error.",
  },

  // ── Sequences and Series · Progressions ──
  {
    topic: "progressions", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The 10th term of the AP 2, 5, 8, … is:",
    options: [
      { text: "29", correct: true, why: r`$a + 9d = 2 + 27$.` },
      { text: "32", why: "Uses $10d$." },
      { text: "30", why: "Arithmetic slip." },
      { text: "26", why: "Uses $8d$." },
    ],
    solution: r`$a_{10} = a + 9d = 2 + 9\times3 = 29$.`,
    concept: "nth term of an AP", formula: r`$a_n = a + (n - 1)d$`, whyFormula: "Direct.", mistakes: "Using $nd$.",
  },
  {
    topic: "progressions", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 400,
    statement: "Find the sum of the first 20 odd natural numbers.",
    solution: r`$S_n = \dfrac n2[2a + (n - 1)d] = 10(2 + 38) = 400$ (in general $n^2$).`,
    concept: "Sum of an AP", formula: r`$S_n = \dfrac n2[2a + (n - 1)d]$`, whyFormula: "Odd numbers form an AP with $d = 2$.", mistakes: "Summing to 20 instead of the 20th odd number (39).",
  },
  {
    topic: "progressions", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The 8th term of the GP 3, 6, 12, … is:",
    options: [
      { text: "384", correct: true, why: r`$3\times2^7$.` },
      { text: "768", why: "Uses $2^8$." },
      { text: "192", why: "Uses $2^6$." },
      { text: "48", why: "Multiplies instead of using powers." },
    ],
    solution: r`$a_8 = ar^7 = 3\times128 = 384$.`,
    concept: "nth term of a GP", formula: r`$a_n = ar^{n-1}$`, whyFormula: "Direct.", mistakes: "Exponent $n$ instead of $n - 1$.",
  },
  {
    topic: "progressions", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 8,
    statement: "The arithmetic mean of two positive numbers is 5 and their geometric mean is 4. Find the larger number.",
    solution: r`$a + b = 10$, $ab = 16$: they are the roots of $t^2 - 10t + 16 = 0$, i.e. $t = 8, 2$. Larger: 8.`,
    concept: "AM and GM of two numbers", formula: r`$A = \dfrac{a + b}2,\ G = \sqrt{ab}$`, whyFormula: "Gives the sum and product directly.", mistakes: "Using $G = ab$.",
  },
  {
    topic: "progressions", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 120, answer: 16,
    statement: r`For positive real numbers $x, y$ with $xy = 16$, find the minimum value of $x + 4y$.`,
    solution: r`AM ≥ GM on the two positive numbers $x$ and $4y$: $\dfrac{x + 4y}{2} \ge \sqrt{4xy} = \sqrt{64} = 8$, so $x + 4y \ge 16$.

Equality needs $x = 4y$; with $xy = 16$: $4y^2 = 16 \Rightarrow y = 2,\ x = 8$. So the minimum $16$ is attained.`,
    concept: "Optimisation with AM–GM", formula: r`$\dfrac{p + q}{2} \ge \sqrt{pq}$, equality iff $p = q$`, whyFormula: "The product $x\\cdot4y$ is fixed, so AM–GM bounds the sum.", alt: r`Calculus: $x + 64/x$, derivative $1 - 64/x^2 = 0 \Rightarrow x = 8$, value $16$.`, mistakes: "Applying AM–GM to $x$ and $y$ (product fixed, but the sum asked is weighted); not checking that equality is attainable.",
  },

  // ── Limits, Continuity and Differentiability · Applications of derivatives ──
  {
    topic: "applications-of-derivatives", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The function $f(x) = x^3$ on $\mathbb R$ is:`,
    options: [
      { text: "strictly increasing", correct: true, why: "$x_1 < x_2 \\Rightarrow x_1^3 < x_2^3$, even though $f'(0) = 0$." },
      { text: "strictly decreasing", why: "$f'(x) = 3x^2 \\ge 0$." },
      { text: "increasing only for $x > 0$", why: "It increases for negative $x$ too." },
      { text: "constant near $x = 0$", why: "A single zero of $f'$ does not make $f$ constant." },
    ],
    solution: r`$f'(x) = 3x^2 \ge 0$, with equality only at the single point $x = 0$. A derivative that is zero only at isolated points does not stop the function from being strictly increasing.`,
    concept: "Monotonicity from the derivative", formula: r`$f' \ge 0$ with isolated zeros ⇒ strictly increasing`, whyFormula: "Isolated stationary points do not break monotonicity.", mistakes: "Thinking $f'(0) = 0$ gives a maximum or minimum at 0.",
  },
  {
    topic: "applications-of-derivatives", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 5,
    statement: r`Find the maximum value of $f(x) = -x^2 + 4x + 1$.`,
    solution: r`$f'(x) = -2x + 4 = 0 \Rightarrow x = 2$; $f''(x) = -2 < 0$ (maximum). $f(2) = -4 + 8 + 1 = 5$.`,
    concept: "Maximum of a quadratic", formula: r`$f'(x) = 0,\ f''(x) < 0$`, whyFormula: "Second-derivative test.", mistakes: "Reporting $x = 2$ instead of the value.",
  },
  {
    topic: "applications-of-derivatives", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`$f(x) = x^3 - 3x$ has a local maximum at:`,
    options: [
      { text: r`$x = -1$`, correct: true, why: r`$f'' (-1) = -6 < 0$.` },
      { text: r`$x = 1$`, why: "That is a local minimum ($f''(1) = 6$)." },
      { text: r`$x = 0$`, why: "$f'(0) = -3 \\ne 0$." },
      { text: r`$x = \sqrt3$`, why: "That is a zero of $f$, not a stationary point." },
    ],
    solution: r`$f'(x) = 3x^2 - 3 = 0 \Rightarrow x = \pm1$. $f''(x) = 6x$: negative at $-1$ (maximum, value 2), positive at $1$ (minimum, value $-2$).`,
    concept: "Local extrema", formula: r`$f'' < 0$ ⇒ local maximum`, whyFormula: "Second-derivative test.", mistakes: "Confusing zeros of $f$ with stationary points.",
  },
  {
    topic: "applications-of-derivatives", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 62.83, tolerance: 0.1,
    statement: r`The radius of a circle increases at $2\ \text{cm s}^{-1}$. At what rate (in cm² s⁻¹) is its area increasing when the radius is $5\ \text{cm}$?`,
    solution: r`$A = \pi r^2 \Rightarrow \dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt} = 2\pi\times5\times2 = 20\pi \approx 62.83\ \text{cm}^2\text{s}^{-1}$.`,
    concept: "Rates of change", formula: r`$\dfrac{dA}{dt} = \dfrac{dA}{dr}\dfrac{dr}{dt}$`, whyFormula: "Chain rule.", mistakes: "Using the circumference instead of differentiating.",
  },
  {
    topic: "applications-of-derivatives", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 128,
    statement: r`An open box is made from a $12\ \text{cm}\times12\ \text{cm}$ square sheet by cutting equal squares from the four corners and folding up the sides. Find the maximum possible volume in cm³.`,
    solution: r`Let the cut squares have side $x$ ($0 < x < 6$). $V = x(12 - 2x)^2$.

$V'(x) = (12 - 2x)^2 - 4x(12 - 2x) = (12 - 2x)(12 - 6x)$. In $(0, 6)$: $V' = 0$ at $x = 2$.

$V'$ changes from positive to negative at $x = 2$, so it is the maximum: $V(2) = 2\times8^2 = 128\ \text{cm}^3$.`,
    concept: "Modelling and optimisation", formula: r`$V = x(a - 2x)^2$`, whyFormula: "Build the function from the geometry, then use the first-derivative test on the allowed interval.", mistakes: "Keeping the root $x = 6$ (zero volume); forgetting to restrict the domain.",
  },

  // ── Differential Equations ──
  {
    topic: "differential-equations", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The order and degree of $\left(\dfrac{d^2y}{dx^2}\right)^3 + \left(\dfrac{dy}{dx}\right)^4 + y = 0$ are:`,
    options: [
      { text: "order 2, degree 3", correct: true, why: "Highest derivative is second order; its power is 3." },
      { text: "order 2, degree 4", why: "The degree is the power of the highest-order derivative." },
      { text: "order 4, degree 2", why: "Order counts derivatives, not powers." },
      { text: "order 1, degree 4", why: "A second derivative is present." },
    ],
    solution: "Order = order of the highest derivative = 2. Degree = its power when the equation is polynomial in derivatives = 3.",
    concept: "Order and degree", formula: "Degree defined only when polynomial in the derivatives", whyFormula: "Definition.", mistakes: "Using the largest exponent anywhere.",
  },
  {
    topic: "differential-equations", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 10,
    statement: r`If $\dfrac{dy}{dx} = 2x$ and $y(0) = 1$, find $y(3)$.`,
    solution: r`$y = x^2 + C$; $y(0) = 1 \Rightarrow C = 1$; $y(3) = 10$.`,
    concept: "Direct integration", formula: r`$y = \int f(x)\,dx + C$`, whyFormula: "Variables already separated.", mistakes: "Forgetting the constant.",
  },
  {
    topic: "differential-equations", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The general solution of $\dfrac{dy}{dx} = \dfrac yx$ is:`,
    options: [
      { text: r`$y = cx$`, correct: true, why: r`$\ln|y| = \ln|x| + k$.` },
      { text: r`$y = x + c$`, why: "That solves $y' = 1$." },
      { text: r`$xy = c$`, why: "That solves $y' = -y/x$." },
      { text: r`$y = ce^x$`, why: "That solves $y' = y$." },
    ],
    solution: r`Separate: $\dfrac{dy}{y} = \dfrac{dx}{x} \Rightarrow \ln|y| = \ln|x| + k \Rightarrow y = cx$.`,
    concept: "Variables separable", formula: r`$\int\dfrac{dy}{y} = \int\dfrac{dx}{x}$`, whyFormula: "Both sides separate.", mistakes: "Sign error giving $xy = c$.",
  },
  {
    topic: "differential-equations", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 0.5,
    statement: r`Solve $\dfrac{dy}{dx} + y = 1$ with $y(0) = 0$, and find $y(\ln 2)$.`,
    solution: r`Linear, integrating factor $e^x$: $\dfrac{d}{dx}(ye^x) = e^x \Rightarrow ye^x = e^x + C$. $y(0) = 0 \Rightarrow C = -1$, so $y = 1 - e^{-x}$. $y(\ln2) = 1 - \tfrac12 = 0.5$.`,
    concept: "Linear first-order equation", formula: r`$\text{IF} = e^{\int P\,dx}$`, whyFormula: "Standard form $y' + Py = Q$.", mistakes: "Wrong sign in $e^{-x}$.",
  },
  {
    topic: "differential-equations", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 6,
    statement: r`The curve satisfying $\dfrac{dy}{dx} = \dfrac{x^2 + y^2}{2xy}$ passes through $(1, 0)$. Find $y^2$ at $x = 3$.`,
    solution: r`Homogeneous: put $y = vx$, $y' = v + xv'$.

$v + xv' = \dfrac{1 + v^2}{2v} \Rightarrow xv' = \dfrac{1 - v^2}{2v} \Rightarrow \displaystyle\int\frac{2v}{1 - v^2}\,dv = \int\frac{dx}{x}$.

$-\ln|1 - v^2| = \ln|x| + c \Rightarrow x(1 - v^2) = k \Rightarrow x^2 - y^2 = kx$.

Through $(1, 0)$: $k = 1$, so $x^2 - y^2 = x$. At $x = 3$: $y^2 = 9 - 3 = 6$.`,
    concept: "Homogeneous differential equations", formula: r`$y = vx$`, whyFormula: "The right side depends only on $y/x$.", alt: r`Write it as $2xy\,y' = x^2 + y^2$; with $u = y^2$: $xu' - u = x^2$, linear: $(u/x)' = 1 \Rightarrow u = x^2 + cx$, and $(1, 0)$ gives $c = -1$.`, mistakes: "Integration sign error; losing the constant before applying the point.",
  },

  // ── Coordinate Geometry · Straight lines ──
  {
    topic: "straight-lines", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The slope of the line $2x + 3y = 6$ is:`,
    options: [
      { text: r`$-\tfrac23$`, correct: true, why: r`$y = -\tfrac23x + 2$.` },
      { text: r`$\tfrac23$`, why: "Sign error." },
      { text: r`$-\tfrac32$`, why: "Inverts the ratio." },
      { text: "2", why: "That is the y-intercept." },
    ],
    solution: r`For $ax + by + c = 0$ the slope is $-a/b = -2/3$.`,
    concept: "Slope from the general form", formula: r`$m = -a/b$`, whyFormula: "Rearranging to $y = mx + c$.", mistakes: "Using $b/a$.",
  },
  {
    topic: "straight-lines", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 2,
    statement: r`Find the distance of the point $(1, 2)$ from the line $3x + 4y - 1 = 0$.`,
    solution: r`$d = \dfrac{|3(1) + 4(2) - 1|}{\sqrt{9 + 16}} = \dfrac{10}{5} = 2$.`,
    concept: "Distance of a point from a line", formula: r`$d = \dfrac{|ax_1 + by_1 + c|}{\sqrt{a^2 + b^2}}$`, whyFormula: "Standard formula.", mistakes: "Dropping the modulus or the constant term.",
  },
  {
    topic: "straight-lines", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which pair of lines is perpendicular?",
    options: [
      { text: r`$2x + 3y = 5$ and $3x - 2y = 1$`, correct: true, why: r`Slopes $-\tfrac23$ and $\tfrac32$; product $-1$.` },
      { text: r`$2x + 3y = 5$ and $4x + 6y = 1$`, why: "These are parallel." },
      { text: r`$x + y = 1$ and $x + 2y = 3$`, why: "Product of slopes is $\\tfrac12$." },
      { text: r`$x = 1$ and $x = 3$`, why: "Both vertical: parallel." },
    ],
    solution: r`Perpendicular lines have $m_1m_2 = -1$ (equivalently $a_1a_2 + b_1b_2 = 0$): $2\cdot3 + 3\cdot(-2) = 0$.`,
    concept: "Perpendicular lines", formula: r`$a_1a_2 + b_1b_2 = 0$`, whyFormula: "Works even for vertical lines.", mistakes: "Using $m_1 = m_2$ (parallel).",
  },
  {
    topic: "straight-lines", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 3,
    statement: r`Find $k$ if the lines $x + y = 2$, $2x - y = 1$ and $kx + 2y = 5$ are concurrent.`,
    solution: r`The first two meet where $3x = 3$: $(1, 1)$. The third must pass through it: $k + 2 = 5 \Rightarrow k = 3$.`,
    concept: "Concurrency of three lines", formula: "Third line through the intersection of the first two", whyFormula: "Faster than the determinant condition here.", mistakes: "Arithmetic in solving the first pair.",
  },
  {
    topic: "straight-lines", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: -2.28, tolerance: 0.01,
    statement: r`Find the sum of the coordinates of the image (reflection) of the point $(2, 3)$ in the line $3x + 4y - 5 = 0$.`,
    solution: r`The image $(x', y')$ lies on the perpendicular through $(2, 3)$, at the same distance on the other side:

$\dfrac{x' - 2}{3} = \dfrac{y' - 3}{4} = \dfrac{-2(3\cdot2 + 4\cdot3 - 5)}{3^2 + 4^2} = -\dfrac{26}{25}$.

$x' = 2 - \dfrac{78}{25} = -\dfrac{28}{25}$, $y' = 3 - \dfrac{104}{25} = -\dfrac{29}{25}$. Sum $= -\dfrac{57}{25} = -2.28$.

Check: the midpoint $\left(\tfrac{11}{25}, \tfrac{23}{25}\right)$ satisfies $3x + 4y = \tfrac{33 + 92}{25} = 5$ ✓.`,
    concept: "Reflection in a line", formula: r`$\dfrac{x' - x_1}{a} = \dfrac{y' - y_1}{b} = \dfrac{-2(ax_1 + by_1 + c)}{a^2 + b^2}$`, whyFormula: "Combines the perpendicular direction with equal distances.", mistakes: "Using the factor $-1$ (that gives the foot of the perpendicular, not the image).",
  },

  // ── Three-Dimensional Geometry · Lines ──
  {
    topic: "lines-and-planes", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`If $l, m, n$ are the direction cosines of a line, then:`,
    options: [
      { text: r`$l^2 + m^2 + n^2 = 1$`, correct: true, why: "They are the components of a unit vector." },
      { text: r`$l + m + n = 1$`, why: "The squares, not the values, add to 1." },
      { text: r`$lmn = 1$`, why: "No such identity." },
      { text: r`$l^2 + m^2 + n^2 = 0$`, why: "Impossible for real, non-zero vectors." },
    ],
    solution: r`$l = \cos\alpha$, $m = \cos\beta$, $n = \cos\gamma$ are the components of a unit vector along the line, so $l^2 + m^2 + n^2 = 1$.`,
    concept: "Direction cosines", formula: r`$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$`, whyFormula: "Length of a unit vector.", mistakes: "Treating direction ratios as direction cosines.",
  },
  {
    topic: "lines-and-planes", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 5,
    statement: r`Find the distance between the points $(1, 2, 3)$ and $(4, 6, 3)$.`,
    solution: r`$\sqrt{3^2 + 4^2 + 0^2} = 5$.`,
    concept: "Distance formula in space", formula: r`$d = \sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$`, whyFormula: "Pythagoras in 3D.", mistakes: "Forgetting a coordinate.",
  },
  {
    topic: "lines-and-planes", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "The angle between two lines with direction ratios $(1, 1, 0)$ and $(0, 1, 1)$ is:",
    options: [
      { text: r`$60^\circ$`, correct: true, why: r`$\cos\theta = \dfrac{1}{\sqrt2\sqrt2} = \tfrac12$.` },
      { text: r`$45^\circ$`, why: "Would need $\\cos\\theta = 1/\\sqrt2$." },
      { text: r`$90^\circ$`, why: "The dot product is 1, not 0." },
      { text: r`$30^\circ$`, why: "Would need $\\cos\\theta = \\sqrt3/2$." },
    ],
    solution: r`$\cos\theta = \dfrac{|1\cdot0 + 1\cdot1 + 0\cdot1|}{\sqrt2\cdot\sqrt2} = \dfrac12 \Rightarrow \theta = 60^\circ$.`,
    concept: "Angle between lines", formula: r`$\cos\theta = \dfrac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{\sum a_1^2}\sqrt{\sum a_2^2}}$`, whyFormula: "Dot product of direction vectors.", mistakes: "Forgetting to normalise.",
  },
  {
    topic: "lines-and-planes", level: 4, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 9,
    statement: r`The point dividing the segment from $(1, 2, 3)$ to $(4, 5, 6)$ internally in the ratio $1 : 2$ is $(a, b, c)$. Find $a + b + c$.`,
    solution: r`$\left(\dfrac{1\cdot4 + 2\cdot1}{3}, \dfrac{1\cdot5 + 2\cdot2}{3}, \dfrac{1\cdot6 + 2\cdot3}{3}\right) = (2, 3, 4)$; sum $= 9$.`,
    concept: "Section formula in space", formula: r`$\dfrac{mx_2 + nx_1}{m + n}$`, whyFormula: "Ratio $m : n$ measured from the first point.", mistakes: "Swapping the weights.",
  },
  {
    topic: "lines-and-planes", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 1.155, tolerance: 0.005,
    statement: r`Find the shortest distance between the lines $\vec r = s(\hat i + \hat j)$ and $\vec r = (\hat i + \hat k) + t(\hat j + \hat k)$.`,
    solution: r`Line 1: point $A = (0, 0, 0)$, direction $\vec b_1 = (1, 1, 0)$. Line 2: point $B = (1, 0, 1)$, direction $\vec b_2 = (0, 1, 1)$.

$\vec b_1\times\vec b_2 = (1\cdot1 - 0\cdot1,\ 0\cdot0 - 1\cdot1,\ 1\cdot1 - 1\cdot0) = (1, -1, 1)$, magnitude $\sqrt3$.

$\overrightarrow{AB} = (1, 0, 1)$; $\overrightarrow{AB}\cdot(\vec b_1\times\vec b_2) = 1 + 0 + 1 = 2 \ne 0$, so the lines are skew.

$\text{SD} = \dfrac{2}{\sqrt3} \approx 1.155$.`,
    concept: "Shortest distance between skew lines", formula: r`$\text{SD} = \dfrac{|(\vec a_2 - \vec a_1)\cdot(\vec b_1\times\vec b_2)|}{|\vec b_1\times\vec b_2|}$`, whyFormula: "Projection of the joining vector on the common perpendicular.", mistakes: "Cross-product sign errors; using the distance between the given points.",
  },

  // ── Vector Algebra ──
  {
    topic: "vectors", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`For non-zero vectors $\vec a$ and $\vec b$, $\vec a\cdot\vec b = 0$ means:`,
    options: [
      { text: "the vectors are perpendicular", correct: true, why: r`$|\vec a||\vec b|\cos\theta = 0 \Rightarrow \theta = 90^\circ$.` },
      { text: "the vectors are parallel", why: "That is $\\vec a\\times\\vec b = \\vec 0$." },
      { text: "the vectors are equal", why: "Equal non-zero vectors have a positive dot product." },
      { text: "one of them is zero", why: "Both are given as non-zero." },
    ],
    solution: r`$\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta$. With both magnitudes non-zero, $\cos\theta = 0$.`,
    concept: "Dot product and perpendicularity", formula: r`$\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta$`, whyFormula: "Definition.", mistakes: "Confusing dot and cross product conditions.",
  },
  {
    topic: "vectors", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 5,
    statement: r`Find $|\vec a\times\vec b|$ for $\vec a = \hat i + 2\hat j$ and $\vec b = 3\hat i + \hat j$.`,
    solution: r`$\vec a\times\vec b = (1\cdot1 - 2\cdot3)\hat k = -5\hat k$; magnitude 5.`,
    concept: "Cross product in the plane", formula: r`$(a_1b_2 - a_2b_1)\hat k$`, whyFormula: "Both vectors lie in the xy-plane.", mistakes: "Order of subtraction (sign does not affect the magnitude, but matters for direction).",
  },
  {
    topic: "vectors", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The scalar projection of $\vec a = 2\hat i + 3\hat j + \hat k$ on $\vec b = \hat i + \hat j$ is:`,
    options: [
      { text: r`$\dfrac{5}{\sqrt2}$`, correct: true, why: r`$\vec a\cdot\vec b/|\vec b| = 5/\sqrt2$.` },
      { text: "5", why: "Forgets to divide by $|\\vec b|$." },
      { text: r`$\dfrac{5}{\sqrt{14}}$`, why: "Divides by $|\\vec a|$." },
      { text: r`$\dfrac52$`, why: "Divides by $|\\vec b|^2$ (that gives the vector projection's coefficient)." },
    ],
    solution: r`Projection of $\vec a$ on $\vec b$ $= \dfrac{\vec a\cdot\vec b}{|\vec b|} = \dfrac{2 + 3}{\sqrt2} = \dfrac{5}{\sqrt2}$.`,
    concept: "Projection", formula: r`$\dfrac{\vec a\cdot\vec b}{|\vec b|}$`, whyFormula: "Component of $\\vec a$ along the unit vector $\\hat b$.", mistakes: "Dividing by the wrong magnitude.",
  },
  {
    topic: "vectors", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 0.866, tolerance: 0.005,
    statement: r`Find the area of the triangle with vertices $A(1, 0, 0)$, $B(0, 1, 0)$ and $C(0, 0, 1)$.`,
    solution: r`$\overrightarrow{AB} = (-1, 1, 0)$, $\overrightarrow{AC} = (-1, 0, 1)$. $\overrightarrow{AB}\times\overrightarrow{AC} = (1, 1, 1)$, magnitude $\sqrt3$. Area $= \tfrac{\sqrt3}{2} \approx 0.866$.`,
    concept: "Area by the cross product", formula: r`$\text{Area} = \tfrac12|\overrightarrow{AB}\times\overrightarrow{AC}|$`, whyFormula: "The cross product's magnitude is the parallelogram area.", mistakes: "Forgetting the ½.",
  },
  {
    topic: "vectors", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 150, answer: 12,
    statement: r`Vectors satisfy $|\vec a| = 3$, $|\vec b| = 4$ and $|\vec a + \vec b| = 5$. Find $|\vec a\times\vec b|$.`,
    solution: r`$|\vec a + \vec b|^2 = |\vec a|^2 + |\vec b|^2 + 2\,\vec a\cdot\vec b \Rightarrow 25 = 9 + 16 + 2\,\vec a\cdot\vec b \Rightarrow \vec a\cdot\vec b = 0$.

Then $|\vec a\times\vec b|^2 = |\vec a|^2|\vec b|^2 - (\vec a\cdot\vec b)^2 = 144$, so $|\vec a\times\vec b| = 12$.`,
    concept: "Linking dot and cross products", formula: r`$|\vec a\times\vec b|^2 + (\vec a\cdot\vec b)^2 = |\vec a|^2|\vec b|^2$`, whyFormula: "Lagrange's identity: $\\sin^2\\theta + \\cos^2\\theta = 1$.", mistakes: "Assuming the vectors are parallel or adding magnitudes.",
  },

  // ── Trigonometry · Inverse trigonometric functions ──
  {
    topic: "inverse-trigonometric-functions", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The principal value of $\sin^{-1}\left(-\tfrac12\right)$ is:`,
    options: [
      { text: r`$-\dfrac\pi6$`, correct: true, why: r`Principal range $[-\pi/2, \pi/2]$.` },
      { text: r`$\dfrac{7\pi}6$`, why: "Outside the principal range." },
      { text: r`$\dfrac{11\pi}6$`, why: "Outside the principal range." },
      { text: r`$-\dfrac\pi3$`, why: r`$\sin(-\pi/3) = -\sqrt3/2$.` },
    ],
    solution: r`$\sin^{-1}$ returns values in $[-\pi/2, \pi/2]$; the angle there with sine $-\tfrac12$ is $-\pi/6$.`,
    concept: "Principal values", formula: r`$\sin^{-1}: [-1, 1] \to [-\pi/2, \pi/2]$`, whyFormula: "Restricting the domain makes sine invertible.", mistakes: "Giving a general angle instead of the principal value.",
  },
  {
    topic: "inverse-trigonometric-functions", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 90,
    statement: r`Find $\sin^{-1}\tfrac12 + \cos^{-1}\tfrac12$ in degrees.`,
    solution: r`$\sin^{-1}x + \cos^{-1}x = \dfrac\pi2$ for $|x| \le 1$; here $30^\circ + 60^\circ = 90^\circ$.`,
    concept: "Complementary inverse functions", formula: r`$\sin^{-1}x + \cos^{-1}x = \pi/2$`, whyFormula: "Valid on $[-1, 1]$.", mistakes: "Adding the arguments.",
  },
  {
    topic: "inverse-trigonometric-functions", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`$\cos^{-1}\left(\cos\dfrac{7\pi}{6}\right)$ equals:`,
    options: [
      { text: r`$\dfrac{5\pi}{6}$`, correct: true, why: r`$\cos\frac{7\pi}6 = \cos\frac{5\pi}6$ and $\frac{5\pi}6 \in [0, \pi]$.` },
      { text: r`$\dfrac{7\pi}{6}$`, why: "Not in the principal range $[0, \\pi]$." },
      { text: r`$\dfrac{\pi}{6}$`, why: r`$\cos\frac\pi6 = +\frac{\sqrt3}2$, but $\cos\frac{7\pi}6 = -\frac{\sqrt3}2$.` },
      { text: r`$-\dfrac{5\pi}{6}$`, why: "Negative values are not in $[0, \\pi]$." },
    ],
    solution: r`$\cos^{-1}(\cos x) = x$ only for $x \in [0, \pi]$. Since $\cos\frac{7\pi}{6} = \cos\left(2\pi - \frac{7\pi}{6}\right) = \cos\frac{5\pi}{6}$ and $\frac{5\pi}6 \in [0, \pi]$, the value is $\frac{5\pi}{6}$.`,
    concept: "Composition outside the principal range", formula: r`$\cos^{-1}(\cos x) = 2\pi - x$ for $x \in [\pi, 2\pi]$`, whyFormula: "Use the symmetry of cosine to return to $[0, \\pi]$.", mistakes: "Cancelling $\\cos^{-1}$ and $\\cos$ blindly.",
  },
  {
    topic: "inverse-trigonometric-functions", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 45,
    statement: r`Find $\tan^{-1}\tfrac12 + \tan^{-1}\tfrac13$ in degrees.`,
    solution: r`$\tan^{-1}a + \tan^{-1}b = \tan^{-1}\dfrac{a + b}{1 - ab}$ when $ab < 1$: $\dfrac{1/2 + 1/3}{1 - 1/6} = 1$, so the sum is $45^\circ$.`,
    concept: "Addition formula for inverse tangents", formula: r`$\tan^{-1}a + \tan^{-1}b = \tan^{-1}\dfrac{a + b}{1 - ab}$ ($ab < 1$)`, whyFormula: "From $\\tan(A + B)$.", mistakes: "Ignoring the condition $ab < 1$ (otherwise add $\\pi$).",
  },
  {
    topic: "inverse-trigonometric-functions", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 150, answer: 0.933, tolerance: 0.002,
    statement: r`Evaluate $\sin\left(2\tan^{-1}\tfrac13\right) + \cos\left(\tan^{-1}2\sqrt2\right)$.`,
    solution: r`Let $\theta = \tan^{-1}\tfrac13$. Then $\sin2\theta = \dfrac{2\tan\theta}{1 + \tan^2\theta} = \dfrac{2/3}{10/9} = \dfrac35$.

Let $\phi = \tan^{-1}2\sqrt2 \in (0, \pi/2)$: a right triangle with opposite $2\sqrt2$, adjacent 1, hypotenuse 3, so $\cos\phi = \tfrac13$.

Sum $= \tfrac35 + \tfrac13 = \tfrac{14}{15} \approx 0.933$.`,
    concept: "Converting inverse functions with triangles and double-angle identities", formula: r`$\sin2\theta = \dfrac{2\tan\theta}{1 + \tan^2\theta}$`, whyFormula: "Expresses the result directly in terms of $\\tan\\theta$.", mistakes: "Forgetting the principal range fixes the sign of $\\cos\\phi$ (positive here).",
  },
];
