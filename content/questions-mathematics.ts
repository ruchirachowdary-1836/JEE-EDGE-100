import type { QuestionSeed } from "./types";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).

export const MATHEMATICS_QUESTIONS: QuestionSeed[] = [
  // ── Quadratic equations ──
  {
    topic: "quadratic-equations", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The roots of $x^2 - 4x + 4 = 0$ are:",
    options: [
      { text: "real and equal", correct: true, why: "$D = 16 - 16 = 0$." },
      { text: "real and distinct", why: "Needs $D > 0$." },
      { text: "complex conjugates", why: "Needs $D < 0$." },
      { text: "one real, one complex", why: "Impossible for real coefficients." },
    ],
    solution: "$D = b^2 - 4ac = 16 - 16 = 0$, so the roots are real and equal (both $x = 2$).",
    concept: "Nature of roots", formula: "$D = b^2 - 4ac$", whyFormula: "The discriminant decides the nature of roots.", mistakes: "Sign slip computing $D$.",
  },
  {
    topic: "quadratic-equations", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The sum of the roots of $2x^2 - 6x + 3 = 0$ is:",
    options: [
      { text: "3", correct: true, why: "$-b/a = 6/2 = 3$." },
      { text: "−3", why: "Sign error: sum is $-b/a$." },
      { text: "3/2", why: "That is the product $c/a$." },
      { text: "6", why: "Forgot to divide by $a$." },
    ],
    solution: "$\\alpha + \\beta = -b/a = -(-6)/2 = 3$.",
    concept: "Vieta's relations", formula: "$\\alpha + \\beta = -b/a$", whyFormula: "Sum of roots without solving.", mistakes: "Forgetting the leading coefficient.",
  },
  {
    topic: "quadratic-equations", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 13,
    statement: "If $\\alpha$ and $\\beta$ are the roots of $x^2 - 5x + 6 = 0$, find $\\alpha^2 + \\beta^2$.",
    solution: "$\\alpha + \\beta = 5$, $\\alpha\\beta = 6$. $\\alpha^2 + \\beta^2 = 25 - 12 = 13$.",
    concept: "Symmetric functions of roots", formula: "$\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta$", whyFormula: "Avoids solving the equation.", alt: "Roots are 2 and 3: $4 + 9 = 13$.", mistakes: "Writing $(\\alpha+\\beta)^2 + 2\\alpha\\beta = 37$.",
  },
  {
    topic: "quadratic-equations", level: 2, difficulty: "EASY", type: "MCQ", time: 45,
    statement: "For what values of $k$ does $x^2 + kx + 9 = 0$ have equal roots?",
    options: [
      { text: "$k = \\pm6$", correct: true, why: "$k^2 - 36 = 0$." },
      { text: "$k = 6$ only", why: "Misses the negative root of $k^2 = 36$." },
      { text: "$k = \\pm3$", why: "Uses $k^2 = 9$, forgetting the factor 4." },
      { text: "$k = \\pm9$", why: "Uses $k^2 = 81$." },
    ],
    solution: "Equal roots $\\Leftrightarrow D = 0$: $k^2 - 4(1)(9) = 0 \\Rightarrow k^2 = 36 \\Rightarrow k = \\pm6$.",
    concept: "Condition for equal roots", formula: "$D = 0$", whyFormula: "Equal roots occur exactly when the discriminant vanishes.", mistakes: "Dropping the negative solution.",
  },
  {
    topic: "quadratic-equations", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 18,
    statement: "If $\\alpha$ and $\\beta$ are the roots of $x^2 - 3x + 1 = 0$, find $\\alpha^3 + \\beta^3$.",
    solution: "$\\alpha + \\beta = 3$, $\\alpha\\beta = 1$. $\\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta) = 27 - 9 = 18$.",
    concept: "Symmetric functions of roots", formula: "$\\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)$", whyFormula: "Express the cubic sum in terms of sum and product.", alt: "Newton's sums: $S_1 = 3$, $S_2 = 7$, $S_3 = 3S_2 - S_1 = 18$.", mistakes: "Using $+3\\alpha\\beta(\\alpha+\\beta)$.",
  },
  {
    topic: "quadratic-equations", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 50,
    statement: "The quadratic equation with rational coefficients whose roots are $2 + \\sqrt3$ and $2 - \\sqrt3$ is:",
    options: [
      { text: "$x^2 - 4x + 1 = 0$", correct: true, why: "Sum 4, product $4 - 3 = 1$." },
      { text: "$x^2 + 4x + 1 = 0$", why: "Sign of the sum term is wrong." },
      { text: "$x^2 - 4x - 1 = 0$", why: "Product computed as $-1$." },
      { text: "$x^2 - 4x + 7 = 0$", why: "Product computed as $4 + 3$." },
    ],
    solution: "Sum $= 4$, product $= (2)^2 - (\\sqrt3)^2 = 1$. Equation: $x^2 - 4x + 1 = 0$.",
    concept: "Forming an equation from roots", formula: "$x^2 - (\\text{sum})x + \\text{product} = 0$", whyFormula: "Sum and product determine a monic quadratic.", mistakes: "Using $(a+b)(a-b) = a^2 + b^2$.",
  },
  {
    topic: "quadratic-equations", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "Both roots of $x^2 - 2kx + k^2 - 1 = 0$ lie in the interval $(-2, 4)$. Then $k$ lies in:",
    options: [
      { text: "$(-1, 3)$", correct: true, why: "Roots are $k \\pm 1$; need $k - 1 > -2$ and $k + 1 < 4$." },
      { text: "$(-2, 4)$", why: "Ignores the spread of the roots about $k$." },
      { text: "$(-1, 4)$", why: "Only checks the smaller root." },
      { text: "$(0, 3)$", why: "Over-restricts the lower bound." },
    ],
    solution: "$D = 4k^2 - 4(k^2 - 1) = 4 > 0$. Roots: $x = \\dfrac{2k \\pm 2}{2} = k \\pm 1$. Need $k - 1 > -2 \\Rightarrow k > -1$ and $k + 1 < 4 \\Rightarrow k < 3$. So $k \\in (-1, 3)$.",
    concept: "Location of roots", formula: "$x = \\dfrac{-b \\pm \\sqrt D}{2a}$", whyFormula: "Here the roots come out in a simple closed form, which is faster than the general location conditions.", alt: "General method: $D \\ge 0$, $f(-2) > 0$, $f(4) > 0$, and $-2 < k < 4$ for the vertex.", mistakes: "Using only the vertex condition.",
  },
  {
    topic: "quadratic-equations", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 4,
    statement: "Find the number of real solutions of $x^2 - 5|x| + 6 = 0$.",
    solution: "Let $t = |x| \\ge 0$: $t^2 - 5t + 6 = 0 \\Rightarrow t = 2$ or $3$. Each gives two values of $x$: $\\pm2, \\pm3$. Total 4 solutions.",
    concept: "Quadratic in |x|", formula: "$x^2 = |x|^2$", whyFormula: "Substitution reduces the equation to an ordinary quadratic in $t$.", mistakes: "Forgetting the negative solutions, or not checking $t \\ge 0$.",
  },
  {
    topic: "quadratic-equations", level: 5, difficulty: "HARD", type: "MCQ", time: 90,
    statement: "If $\\alpha, \\beta$ are the roots of $x^2 - x - 1 = 0$ and $S_n = \\alpha^n + \\beta^n$, then $S_5$ equals:",
    options: [
      { text: "11", correct: true, why: "$S_n = S_{n-1} + S_{n-2}$: 1, 3, 4, 7, 11." },
      { text: "7", why: "That is $S_4$." },
      { text: "18", why: "That is $S_6$." },
      { text: "9", why: "Arithmetic slip in the recursion." },
    ],
    solution: "Since $\\alpha^2 = \\alpha + 1$, multiplying by $\\alpha^{n-2}$ gives $\\alpha^n = \\alpha^{n-1} + \\alpha^{n-2}$ (same for $\\beta$). Hence $S_n = S_{n-1} + S_{n-2}$. $S_1 = 1$, $S_2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta = 3$, $S_3 = 4$, $S_4 = 7$, $S_5 = 11$.",
    concept: "Recurrence for power sums of roots", formula: "$S_n = (\\alpha+\\beta)S_{n-1} - \\alpha\\beta\\,S_{n-2}$", whyFormula: "Each root satisfies the original equation, which gives a linear recurrence.", mistakes: "Wrong signs in the recurrence ($\\alpha\\beta = -1$).",
  },
  {
    topic: "quadratic-equations", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: 27,
    statement: "Find the sum of all real values of $x$ satisfying $\\left(x^2 - 7x + 11\\right)^{x^2 - 13x + 42} = 1$.",
    solution: "Case 1 — exponent zero (base non-zero): $x^2 - 13x + 42 = 0 \\Rightarrow x = 6, 7$; bases are 5 and 11, both non-zero ✓. Case 2 — base equal to 1: $x^2 - 7x + 10 = 0 \\Rightarrow x = 2, 5$ ✓. Case 3 — base equal to $-1$ with even integer exponent: $x^2 - 7x + 12 = 0 \\Rightarrow x = 3, 4$; exponents are $9 - 39 + 42 = 12$ and $16 - 52 + 42 = 6$, both even ✓. Distinct solutions: 2, 3, 4, 5, 6, 7. Sum $= 27$.",
    concept: "Equations of the form $a^b = 1$", formula: "$a^b = 1 \\iff b = 0\\,(a \\ne 0)$, or $a = 1$, or $a = -1$ with $b$ even", whyFormula: "These are the only ways a real power can equal 1.", mistakes: "Missing the $a = -1$ case, or forgetting to check that the exponent is even.",
  },

  // ── Definite integrals ──
  {
    topic: "definite-integrals", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "$\\displaystyle\\int_{-1}^{1} x^3\\,dx$ equals:",
    options: [
      { text: "0", correct: true, why: "$x^3$ is odd and the interval is symmetric." },
      { text: "1/2", why: "Doubles the integral over $[0, 1]$ as if the function were even." },
      { text: "1/4", why: "Only the integral over $[0,1]$." },
      { text: "2", why: "Arithmetic slip." },
    ],
    solution: "$x^3$ is odd, so $\\int_{-a}^{a} x^3\\,dx = 0$. Directly: $[x^4/4]_{-1}^{1} = 1/4 - 1/4 = 0$.",
    concept: "Odd functions on symmetric intervals", formula: "$\\int_{-a}^{a} f = 0$ for odd $f$", whyFormula: "Recognising symmetry avoids computation.", mistakes: "Treating every function as even.",
  },
  {
    topic: "definite-integrals", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "$\\displaystyle\\int_0^2 x\\,dx$ equals:",
    options: [
      { text: "2", correct: true, why: "$[x^2/2]_0^2 = 2$ — the area of a triangle with base 2, height 2." },
      { text: "4", why: "Forgot to divide by 2." },
      { text: "1", why: "Evaluated at $x = 1$." },
      { text: "0", why: "Confused with an odd-function result." },
    ],
    solution: "$\\int_0^2 x\\,dx = \\left[\\dfrac{x^2}{2}\\right]_0^2 = 2$.",
    concept: "Fundamental theorem of calculus", formula: "$\\int_a^b f = F(b) - F(a)$", whyFormula: "Direct evaluation.", mistakes: "Forgetting the 1/2 in the antiderivative.",
  },
  {
    topic: "definite-integrals", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1,
    statement: "Evaluate $\\displaystyle\\int_0^{\\pi/2}\\sin x\\,dx$.",
    solution: "$[-\\cos x]_0^{\\pi/2} = -\\cos(\\pi/2) + \\cos 0 = 0 + 1 = 1$.",
    concept: "Standard definite integral", formula: "$\\int\\sin x\\,dx = -\\cos x$", whyFormula: "Direct antiderivative.", mistakes: "Sign error giving $-1$.",
  },
  {
    topic: "definite-integrals", level: 2, difficulty: "EASY", type: "MCQ", time: 40,
    statement: "$\\dfrac{d}{dx}\\displaystyle\\int_0^{x}\\cos(t^2)\\,dt$ equals:",
    options: [
      { text: "$\\cos(x^2)$", correct: true, why: "Fundamental theorem: replace $t$ by the upper limit." },
      { text: "$-2x\\sin(x^2)$", why: "Differentiated the integrand instead." },
      { text: "$2x\\cos(x^2)$", why: "Added a chain-rule factor that does not exist (upper limit is just $x$)." },
      { text: "$\\sin(x^2)$", why: "Integrated instead of evaluating." },
    ],
    solution: "$\\dfrac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$, so the answer is $\\cos(x^2)$.",
    concept: "Fundamental theorem of calculus (part 1)", formula: "$\\dfrac{d}{dx}\\int_a^x f(t)dt = f(x)$", whyFormula: "Derivative of an integral with variable upper limit.", mistakes: "Differentiating the integrand.",
  },
  {
    topic: "definite-integrals", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 4,
    statement: "Evaluate $\\displaystyle\\int_{-2}^{2} |x|\\,dx$.",
    solution: "$|x|$ is even: $2\\int_0^2 x\\,dx = 2\\times2 = 4$.",
    concept: "Even functions and modulus", formula: "$\\int_{-a}^{a} f = 2\\int_0^a f$ for even $f$", whyFormula: "Removes the modulus by working on $[0, 2]$.", mistakes: "Integrating $x$ directly over $[-2, 2]$ to get 0.",
  },
  {
    topic: "definite-integrals", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "For any positive integer $n$, $\\displaystyle\\int_0^{\\pi/2}\\frac{\\sin^n x}{\\sin^n x + \\cos^n x}\\,dx$ equals:",
    options: [
      { text: "$\\pi/4$", correct: true, why: "King's property and adding gives $2I = \\pi/2$." },
      { text: "$\\pi/2$", why: "Forgot to halve after adding." },
      { text: "Depends on $n$", why: "The symmetry argument works for every $n$." },
      { text: "1", why: "Guessing from the $n = 0$ form." },
    ],
    solution: "Replace $x$ by $\\pi/2 - x$: $I = \\int_0^{\\pi/2}\\dfrac{\\cos^n x}{\\cos^n x + \\sin^n x}dx$. Adding the two forms, $2I = \\int_0^{\\pi/2}1\\,dx = \\pi/2$, so $I = \\pi/4$.",
    concept: "King's property", formula: "$\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$", whyFormula: "Swaps sin and cos so the sum of integrands is 1.", mistakes: "Trying to integrate directly.",
  },
  {
    topic: "definite-integrals", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 3,
    statement: "Evaluate $\\displaystyle\\int_0^{3}[x]\\,dx$, where $[x]$ is the greatest integer less than or equal to $x$.",
    solution: "Split at integers: $\\int_0^1 0\\,dx + \\int_1^2 1\\,dx + \\int_2^3 2\\,dx = 0 + 1 + 2 = 3$.",
    concept: "Integrals of step functions", formula: "$\\int_a^b f = \\int_a^c f + \\int_c^b f$", whyFormula: "$[x]$ is constant between consecutive integers.", mistakes: "Using $[3]\\times3 = 9$ or $\\int x\\,dx = 4.5$.",
  },
  {
    topic: "definite-integrals", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 75,
    statement: "$\\displaystyle\\lim_{n\\to\\infty}\\frac1n\\sum_{r=1}^{n}\\left(\\frac{r}{n}\\right)^2$ equals:",
    options: [
      { text: "1/3", correct: true, why: "$\\int_0^1 x^2\\,dx = 1/3$." },
      { text: "1/2", why: "That is $\\int_0^1 x\\,dx$." },
      { text: "1", why: "Treats the sum as a single term." },
      { text: "∞", why: "The $1/n$ factor keeps the limit finite." },
    ],
    solution: "This is a Riemann sum with $\\Delta x = 1/n$ and $x_r = r/n$: limit $= \\int_0^1 x^2\\,dx = 1/3$.",
    concept: "Limit of a sum as a definite integral", formula: "$\\lim \\dfrac1n\\sum f(r/n) = \\int_0^1 f(x)dx$", whyFormula: "The sum has exactly the Riemann form.", alt: "$\\dfrac1{n^3}\\cdot\\dfrac{n(n+1)(2n+1)}{6} \\to \\dfrac{2}{6} = \\dfrac13$.", mistakes: "Wrong limits of integration.",
  },
  {
    topic: "definite-integrals", level: 5, difficulty: "HARD", type: "MCQ", time: 120,
    statement: "$\\displaystyle\\int_0^{\\pi}\\frac{x}{1 + \\sin x}\\,dx$ equals:",
    options: [
      { text: "$\\pi$", correct: true, why: "King's property reduces it to $\\tfrac\\pi2\\int_0^\\pi\\frac{dx}{1+\\sin x} = \\tfrac\\pi2\\cdot2$." },
      { text: "$\\pi/2$", why: "Forgets that $\\int_0^\\pi\\frac{dx}{1+\\sin x} = 2$." },
      { text: "$\\pi^2$", why: "Doubles instead of halving." },
      { text: "$2\\pi$", why: "Forgets to divide $2I$ by 2." },
    ],
    solution: "With $x \\to \\pi - x$ (and $\\sin(\\pi - x) = \\sin x$): $I = \\int_0^\\pi\\dfrac{\\pi - x}{1+\\sin x}dx$. Adding: $2I = \\pi\\int_0^\\pi\\dfrac{dx}{1+\\sin x}$. Since $\\dfrac{1}{1+\\sin x} = \\dfrac{1 - \\sin x}{\\cos^2 x} = \\sec^2x - \\sec x\\tan x$, an antiderivative is $\\tan x - \\sec x$. From 0 to $\\pi$: $(0 - (-1)) - (0 - 1) = 2$. So $2I = 2\\pi$, $I = \\pi$.",
    concept: "King's property with $x f(\\sin x)$", formula: "$\\int_0^\\pi x f(\\sin x)dx = \\dfrac\\pi2\\int_0^\\pi f(\\sin x)dx$", whyFormula: "Removes the troublesome factor $x$.", mistakes: "Evaluating $\\tan x - \\sec x$ carelessly near $\\pi/2$ — the expression $\\dfrac{\\sin x - 1}{\\cos x}$ is continuous there (limit 0).",
  },
  {
    topic: "definite-integrals", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 120, answer: 3,
    statement: "Let $F(x) = \\displaystyle\\int_0^{x}(t-1)(t-3)\\,dt$. Find the point of local minimum of $F$.",
    solution: "$F'(x) = (x-1)(x-3)$, which vanishes at $x = 1$ and $x = 3$. $F''(x) = 2x - 4$: $F''(1) = -2 < 0$ (local maximum), $F''(3) = 2 > 0$ (local minimum). Answer: $x = 3$.",
    concept: "Extrema of integral-defined functions", formula: "$\\dfrac{d}{dx}\\int_a^x f(t)dt = f(x)$", whyFormula: "Turns the problem into a standard derivative test without integrating.", mistakes: "Integrating first (correct but slower) or picking $x = 1$, which is a maximum.",
  },
];
