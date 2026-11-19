import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// Levels 1–4: JEE Main formats; Level 5: JEE Advanced formats.

export const MATHEMATICS_QUESTIONS_4: QuestionSeed[] = [
  // ── Sets and relations ──
  {
    topic: "sets-and-relations", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`A set has 3 elements. How many subsets does it have?`,
    options: [
      { text: "8", correct: true, why: r`$2^3$.` },
      { text: "6", why: "Counts something else." },
      { text: "9", why: r`That is $3^2$.` },
      { text: "7", why: "That excludes one subset (the proper subsets number 7)." },
    ],
    solution: r`Each element is either in or out: $2^n = 2^3 = 8$ subsets, including $\varnothing$ and the set itself.`,
    concept: "Power set", formula: r`$|P(A)| = 2^n$`, whyFormula: "Two choices per element.", mistakes: "Forgetting the empty set.",
  },
  {
    topic: "sets-and-relations", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 10,
    statement: r`In a class of 50, 30 students study Physics, 25 study Chemistry, and 15 study both. How many study neither?`,
    solution: r`$|P \cup C| = 30 + 25 - 15 = 40$; neither $= 50 - 40 = 10$.`,
    concept: "Inclusion–exclusion", formula: r`$|A\cup B| = |A| + |B| - |A\cap B|$`, whyFormula: "Remove the double count.", mistakes: "Not subtracting the overlap.",
  },
  {
    topic: "sets-and-relations", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`On $A = \{1, 2, 3\}$, the relation $R = \{(1,1), (2,2), (3,3), (1,2), (2,1)\}$ is:`,
    options: [
      { text: "an equivalence relation", correct: true, why: "Reflexive, symmetric and transitive." },
      { text: "reflexive but not symmetric", why: "(1,2) and (2,1) are both present." },
      { text: "symmetric but not transitive", why: "Every needed pair is present." },
      { text: "not reflexive", why: "All (a, a) are present." },
    ],
    solution: "Reflexive: (1,1), (2,2), (3,3) ✓. Symmetric: (1,2) ↔ (2,1) ✓. Transitive: (1,2),(2,1) ⇒ (1,1) ✓, (2,1),(1,2) ⇒ (2,2) ✓. Its classes are {1, 2} and {3}.",
    concept: "Equivalence relations", formula: "Reflexive + symmetric + transitive", whyFormula: "Definition.", mistakes: "Missing a transitivity check.",
  },
  {
    topic: "sets-and-relations", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 64,
    statement: r`How many reflexive relations are there on a set with 3 elements?`,
    solution: r`$A\times A$ has 9 pairs. The 3 diagonal pairs must be included; each of the other 6 is free: $2^6 = 64$.`,
    concept: "Counting relations", formula: r`reflexive: $2^{n^2 - n}$`, whyFormula: "Diagonal fixed, rest free.", mistakes: r`Using $2^{n^2}$ (all relations).`,
  },
  {
    topic: "sets-and-relations", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`On $\mathbb{Z}$, define $a\,R\,b \iff a - b$ is divisible by 5. Which statements are correct?`,
    options: [
      { text: "R is reflexive", correct: true, why: "a − a = 0 is divisible by 5." },
      { text: "R is symmetric", correct: true, why: "If 5 | a − b then 5 | b − a." },
      { text: "R is transitive", correct: true, why: "(a − b) + (b − c) = a − c." },
      { text: "R has exactly 4 equivalence classes", why: "Remainders 0–4 give 5 classes." },
    ],
    solution: "Congruence modulo 5 is an equivalence relation: reflexive, symmetric and transitive (sums of multiples of 5 are multiples of 5). The classes are the five residue classes [0], [1], [2], [3], [4].",
    concept: "Congruence as an equivalence relation", formula: r`$a \equiv b \pmod n$`, whyFormula: "n residue classes.", mistakes: "Counting n − 1 classes.",
  },

  // ── Complex numbers ──
  {
    topic: "complex-numbers", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The modulus of $3 + 4i$ is:`,
    options: [
      { text: "5", correct: true, why: r`$\sqrt{9 + 16}$.` },
      { text: "7", why: "Adds the parts." },
      { text: "25", why: "That is the square of the modulus." },
      { text: "1", why: "No." },
    ],
    solution: r`$|a + bi| = \sqrt{a^2 + b^2} = \sqrt{9 + 16} = 5$.`,
    concept: "Modulus", formula: r`$|z| = \sqrt{a^2 + b^2}$`, whyFormula: "Distance from the origin.", mistakes: "Forgetting the square root.",
  },
  {
    topic: "complex-numbers", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1,
    statement: r`Find $i^{100}$.`,
    solution: r`Powers of $i$ cycle with period 4; $100 = 4\times25$, so $i^{100} = (i^4)^{25} = 1$.`,
    concept: "Powers of i", formula: r`$i^4 = 1$`, whyFormula: "Cycle i, −1, −i, 1.", mistakes: "Using the wrong remainder.",
  },
  {
    topic: "complex-numbers", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`If $\omega$ is a non-real cube root of unity, $1 + \omega + \omega^2$ equals:`,
    options: [
      { text: "0", correct: true, why: "Sum of the roots of z³ − 1 = 0." },
      { text: "1", why: "No." },
      { text: "3", why: "That is for ω = 1." },
      { text: r`$-1$`, why: r`That is $\omega + \omega^2$.` },
    ],
    solution: r`$\omega^3 = 1,\ \omega \ne 1 \Rightarrow (\omega - 1)(\omega^2 + \omega + 1) = 0 \Rightarrow 1 + \omega + \omega^2 = 0$.`,
    concept: "Cube roots of unity", formula: r`$1 + \omega + \omega^2 = 0$`, whyFormula: "Factorisation of z³ − 1.", mistakes: "Including ω = 1.",
  },
  {
    topic: "complex-numbers", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: -64,
    statement: r`Find the value of $(1 + i)^{12}$.`,
    solution: r`$(1 + i)^2 = 2i$, so $(1 + i)^{12} = (2i)^6 = 64\,i^6 = 64(-1) = -64$.`,
    concept: "Powers of complex numbers", formula: r`$(1 + i)^2 = 2i$`, whyFormula: "Reduce the exponent.", mistakes: r`Sign error in $i^6$.`,
  },
  {
    topic: "complex-numbers", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Let $z = 1 + i\sqrt3$. Which statements are correct?`,
    options: [
      { text: r`$|z| = 2$`, correct: true, why: r`$\sqrt{1 + 3}$.` },
      { text: r`$\arg z = \pi/6$`, why: r`$\tan(\arg z) = \sqrt3$, so $\arg z = \pi/3$.` },
      { text: r`$z^3 = -8$`, correct: true, why: r`$2^3 e^{i\pi} = -8$.` },
      { text: r`$z^6 = -64$`, why: r`$z^6 = 2^6e^{2\pi i} = 64$.` },
    ],
    solution: r`$z = 2e^{i\pi/3}$. De Moivre: $z^3 = 8e^{i\pi} = -8$, $z^6 = 64e^{2\pi i} = 64$.`,
    concept: "Polar form and De Moivre's theorem", formula: r`$(re^{i\theta})^n = r^ne^{in\theta}$`, whyFormula: "Multiply arguments.", mistakes: "Sign of z⁶.",
  },

  // ── Matrices ──
  {
    topic: "matrices", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`If $A$ is $2\times3$ and $B$ is $3\times4$, the order of $AB$ is:`,
    options: [
      { text: r`$2\times4$`, correct: true, why: "Outer dimensions." },
      { text: r`$3\times3$`, why: "Inner dimensions must match; they do not give the order." },
      { text: r`$4\times2$`, why: "That would be BᵀAᵀ." },
      { text: "not defined", why: "Columns of A = rows of B = 3." },
    ],
    solution: r`$(m\times n)(n\times p) = m\times p$: $2\times4$.`,
    concept: "Matrix multiplication", formula: r`$(m\times n)(n\times p) \to m\times p$`, whyFormula: "Row-by-column products.", mistakes: "Using inner dimensions.",
  },
  {
    topic: "matrices", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 3,
    statement: r`Find the trace of $\begin{pmatrix}2 & 5\\ 7 & 1\end{pmatrix}$.`,
    solution: r`Trace = sum of the diagonal entries $= 2 + 1 = 3$.`,
    concept: "Trace", formula: r`$\operatorname{tr}A = \sum a_{ii}$`, whyFormula: "Definition.", mistakes: "Adding off-diagonal entries.",
  },
  {
    topic: "matrices", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`For square matrices $A$ and $B$ of the same order, $(AB)^T$ equals:`,
    options: [
      { text: r`$B^TA^T$`, correct: true, why: "Reversal law." },
      { text: r`$A^TB^T$`, why: "Order must reverse." },
      { text: r`$AB$`, why: "Only if AB is symmetric." },
      { text: r`$BA$`, why: "No." },
    ],
    solution: r`$((AB)^T)_{ij} = (AB)_{ji} = \sum_k a_{jk}b_{ki} = \sum_k (B^T)_{ik}(A^T)_{kj} = (B^TA^T)_{ij}$.`,
    concept: "Transpose of a product", formula: r`$(AB)^T = B^TA^T$`, whyFormula: "Reversal law.", mistakes: "Keeping the order.",
  },
  {
    topic: "matrices", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 6,
    statement: r`$A = \begin{pmatrix}1 & 2\\ 0 & 1\end{pmatrix}$. If $A^3 = \begin{pmatrix}1 & k\\ 0 & 1\end{pmatrix}$, find $k$.`,
    solution: r`$A = I + N$ with $N^2 = 0$, so $A^n = I + nN$: $A^3 = \begin{pmatrix}1 & 6\\ 0 & 1\end{pmatrix}$. $k = 6$.`,
    concept: "Powers of matrices", formula: r`$(I + N)^n = I + nN$ when $N^2 = 0$`, whyFormula: "Binomial expansion; I and N commute.", mistakes: "Cubing the entries (8).",
  },
  {
    topic: "matrices", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Let $A$ be a $3\times3$ skew-symmetric matrix with real entries. Which statements are correct?`,
    options: [
      { text: "All diagonal entries of A are 0", correct: true, why: r`$a_{ii} = -a_{ii}$.` },
      { text: r`$\det A = 0$`, correct: true, why: r`$\det A = \det(-A^T) = (-1)^3\det A$.` },
      { text: r`$A^2$ is symmetric`, correct: true, why: r`$(A^2)^T = (A^T)^2 = (-A)^2 = A^2$.` },
      { text: "A is invertible", why: "Its determinant is 0." },
    ],
    solution: r`$A^T = -A$. Diagonal: $a_{ii} = -a_{ii} \Rightarrow 0$. Odd order: $\det A = (-1)^3\det A \Rightarrow \det A = 0$, so A is singular. $(A^2)^T = (A^T)^2 = A^2$: symmetric.`,
    concept: "Properties of skew-symmetric matrices", formula: r`$A^T = -A$`, whyFormula: "Apply transpose and determinant rules.", mistakes: "Assuming invertibility.",
  },

  // ── Limits and continuity ──
  {
    topic: "limits-and-continuity", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`$\displaystyle\lim_{x\to0}\frac{\sin 3x}{x}$ equals:`,
    options: [
      { text: "3", correct: true, why: r`$3\cdot\frac{\sin3x}{3x} \to 3$.` },
      { text: "1", why: "Ignores the factor 3." },
      { text: "0", why: "No." },
      { text: r`$1/3$`, why: "Inverted." },
    ],
    solution: r`$\dfrac{\sin3x}{x} = 3\cdot\dfrac{\sin3x}{3x} \to 3\cdot1 = 3$.`,
    concept: "Standard limit", formula: r`$\lim_{t\to0}\frac{\sin t}{t} = 1$`, whyFormula: "Fundamental trigonometric limit.", mistakes: "Forgetting the 3.",
  },
  {
    topic: "limits-and-continuity", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 6,
    statement: r`Find $\displaystyle\lim_{x\to3}\frac{x^2 - 9}{x - 3}$.`,
    solution: r`$\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3 \to 6$.`,
    concept: "Factorisation of 0/0 forms", formula: "Cancel the common factor", whyFormula: "Removable indeterminacy.", mistakes: "Saying the limit does not exist.",
  },
  {
    topic: "limits-and-continuity", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`$f(x) = \begin{cases}kx + 1, & x \le 2\\ 3x - 1, & x > 2\end{cases}$ is continuous at $x = 2$ when $k$ equals:`,
    options: [
      { text: "2", correct: true, why: "2k + 1 = 5." },
      { text: "3", why: "Gives 7 ≠ 5." },
      { text: "1", why: "Gives 3 ≠ 5." },
      { text: r`$5/2$`, why: "Ignores the +1." },
    ],
    solution: r`Left value $f(2) = 2k + 1$; right limit $= 3(2) - 1 = 5$. Continuity: $2k + 1 = 5 \Rightarrow k = 2$.`,
    concept: "Continuity of piecewise functions", formula: "LHL = RHL = f(a)", whyFormula: "Definition.", mistakes: "Matching only one side.",
  },
  {
    topic: "limits-and-continuity", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 7.389, tolerance: 0.01,
    statement: r`Find $\displaystyle\lim_{x\to\infty}\left(1 + \frac{2}{x}\right)^x$ (give the value to three decimal places).`,
    solution: r`$1^\infty$ form: limit $= e^{\lim x\cdot\frac2x} = e^2 \approx 7.389$.`,
    concept: r`$1^\infty$ limits`, formula: r`$\lim(1 + f)^g = e^{\lim fg}$ when $f\to0$, $g\to\infty$`, whyFormula: "From the definition of e.", mistakes: "Answering 1.",
  },
  {
    topic: "limits-and-continuity", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Let $f(x) = |x|$ and $g(x) = \lfloor x\rfloor$ (greatest integer function). Which statements are correct?`,
    options: [
      { text: r`$f$ is continuous at $x = 0$`, correct: true, why: "Both one-sided limits equal 0." },
      { text: r`$f$ is differentiable at $x = 0$`, why: "Left derivative −1, right derivative +1." },
      { text: r`$g$ is continuous from the left at every integer`, why: r`It is continuous from the right: at $x = n$ the left limit is $n - 1$ but $g(n) = n$.` },
      { text: r`$\displaystyle\lim_{x\to0}\frac{|x|}{x}$ does not exist`, correct: true, why: "One-sided limits are −1 and +1." },
    ],
    solution: r`|x| is continuous everywhere but has a corner at 0 (one-sided derivatives −1 and 1). $\lfloor x\rfloor$ jumps at each integer. $|x|/x$ is −1 for $x < 0$ and 1 for $x > 0$, so the two-sided limit at 0 does not exist.`,
    concept: "Continuity vs differentiability", formula: "Differentiable ⇒ continuous (not conversely)", whyFormula: "Corners and jumps.", mistakes: "Thinking continuity implies differentiability.",
  },

  // ── Differentiation ──
  {
    topic: "differentiation", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`$\dfrac{d}{dx}\left(\sin x^2\right)$ is:`,
    options: [
      { text: r`$2x\cos x^2$`, correct: true, why: "Chain rule." },
      { text: r`$\cos x^2$`, why: "Missing the inner derivative." },
      { text: r`$2\sin x\cos x$`, why: r`That is for $\sin^2 x$.` },
      { text: r`$-2x\cos x^2$`, why: "Sign error." },
    ],
    solution: r`Chain rule: $\cos(x^2)\cdot\dfrac{d}{dx}(x^2) = 2x\cos x^2$.`,
    concept: "Chain rule", formula: r`$(f\circ g)' = f'(g)\,g'$`, whyFormula: "Composite functions.", mistakes: r`Confusing $\sin x^2$ with $\sin^2x$.`,
  },
  {
    topic: "differentiation", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 14,
    statement: r`If $f(x) = x^3 + 2x$, find $f'(2)$.`,
    solution: r`$f'(x) = 3x^2 + 2$, so $f'(2) = 3(4) + 2 = 14$.`,
    concept: "Power rule", formula: r`$(x^n)' = nx^{n-1}$`, whyFormula: "Basic differentiation.", mistakes: "Arithmetic.",
  },
  {
    topic: "differentiation", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`If $x = at^2$ and $y = 2at$, then $\dfrac{dy}{dx}$ equals:`,
    options: [
      { text: r`$1/t$`, correct: true, why: r`$\frac{2a}{2at}$.` },
      { text: r`$t$`, why: "Inverted." },
      { text: r`$2t$`, why: "No." },
      { text: r`$1/(2t)$`, why: "Arithmetic slip." },
    ],
    solution: r`$\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt} = \dfrac{2a}{2at} = \dfrac1t$.`,
    concept: "Parametric differentiation", formula: r`$\dfrac{dy}{dx} = \dfrac{\dot y}{\dot x}$`, whyFormula: "Chain rule.", mistakes: "Dividing the wrong way.",
  },
  {
    topic: "differentiation", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 1,
    statement: r`If $y = x^x$, find $\dfrac{dy}{dx}$ at $x = 1$.`,
    solution: r`$\ln y = x\ln x \Rightarrow \dfrac{y'}{y} = \ln x + 1 \Rightarrow y' = x^x(\ln x + 1)$. At $x = 1$: $1\cdot(0 + 1) = 1$.`,
    concept: "Logarithmic differentiation", formula: r`$(x^x)' = x^x(1 + \ln x)$`, whyFormula: "Variable base and exponent.", mistakes: r`Using $x\cdot x^{x-1}$.`,
  },
  {
    topic: "differentiation", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Let $y = e^{2x}$. Which statements are correct?`,
    options: [
      { text: r`$\dfrac{d^2y}{dx^2} = 4y$`, correct: true, why: r`$y'' = 4e^{2x}$.` },
      { text: r`$\dfrac{d^ny}{dx^n} = 2^ne^{2x}$`, correct: true, why: "Each derivative multiplies by 2." },
      { text: r`$\dfrac{dy}{dx} = e^{2x}$`, why: r`It is $2e^{2x}$.` },
      { text: r`$y$ satisfies $y' + 2y = 0$`, why: r`$y' + 2y = 4e^{2x} \ne 0$; it satisfies $y' - 2y = 0$.` },
    ],
    solution: r`$y' = 2e^{2x}$, $y'' = 4e^{2x} = 4y$, and in general $y^{(n)} = 2^ne^{2x}$. So $y$ satisfies $y'' - 4y = 0$.`,
    concept: "Higher-order derivatives", formula: r`$(e^{ax})^{(n)} = a^ne^{ax}$`, whyFormula: "Repeated chain rule.", mistakes: "Dropping the factor 2.",
  },

  // ── Indefinite integrals ──
  {
    topic: "indefinite-integrals", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`$\displaystyle\int \frac{1}{x}\,dx$ equals:`,
    options: [
      { text: r`$\ln|x| + C$`, correct: true, why: "Valid for x ≠ 0 of either sign." },
      { text: r`$-\dfrac{1}{x^2} + C$`, why: "That is the derivative." },
      { text: r`$\dfrac{x^0}{0} + C$`, why: "Power rule fails for n = −1." },
      { text: r`$\ln x$ (no constant needed)`, why: "Missing |x| and C." },
    ],
    solution: r`$\dfrac{d}{dx}\ln|x| = \dfrac1x$ for $x \ne 0$, so $\int\frac{dx}{x} = \ln|x| + C$.`,
    concept: "Standard integrals", formula: r`$\int x^{-1}dx = \ln|x| + C$`, whyFormula: "Exception to the power rule.", mistakes: "Applying the power rule.",
  },
  {
    topic: "indefinite-integrals", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 2,
    statement: r`If $\displaystyle\int (3x^2 + 2)\,dx = x^3 + kx + C$, find $k$.`,
    solution: r`$\int(3x^2 + 2)\,dx = x^3 + 2x + C$, so $k = 2$.`,
    concept: "Power rule for integrals", formula: r`$\int x^ndx = \dfrac{x^{n+1}}{n+1} + C$`, whyFormula: "Reverse of differentiation.", mistakes: "Forgetting the constant term.",
  },
  {
    topic: "indefinite-integrals", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`$\displaystyle\int x e^x\,dx$ equals:`,
    options: [
      { text: r`$(x - 1)e^x + C$`, correct: true, why: "Integration by parts." },
      { text: r`$xe^x + C$`, why: "Missing −∫eˣdx." },
      { text: r`$\dfrac{x^2}{2}e^x + C$`, why: "Cannot integrate factors separately." },
      { text: r`$(x + 1)e^x + C$`, why: "Sign error." },
    ],
    solution: r`Parts with $u = x$, $dv = e^xdx$: $xe^x - \int e^xdx = xe^x - e^x + C = (x - 1)e^x + C$.`,
    concept: "Integration by parts", formula: r`$\int u\,dv = uv - \int v\,du$`, whyFormula: "Reverse product rule.", mistakes: "Sign in the second term.",
  },
  {
    topic: "indefinite-integrals", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 2,
    statement: r`If $\displaystyle\int \frac{4x}{1 + x^2}\,dx = m\ln(1 + x^2) + C$, find $m$.`,
    solution: r`Substitute $t = 1 + x^2$, $dt = 2x\,dx$: $\int\frac{2x}{1 + x^2}dx = \ln(1 + x^2) + C$, so $\int\frac{4x}{1 + x^2}dx = 2\ln(1 + x^2) + C$: $m = 2$.`,
    concept: "Substitution", formula: r`$\int\dfrac{f'(x)}{f(x)}dx = \ln|f(x)| + C$`, whyFormula: "Numerator is the derivative of the denominator.", mistakes: "Missing the factor 2.",
  },
  {
    topic: "indefinite-integrals", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Which of the following are correct (C an arbitrary constant)?`,
    options: [
      { text: r`$\displaystyle\int \sec^2x\,dx = \tan x + C$`, correct: true, why: r`$(\tan x)' = \sec^2x$.` },
      { text: r`$\displaystyle\int \frac{dx}{1 + x^2} = \tan^{-1}x + C$`, correct: true, why: "Standard result." },
      { text: r`$\displaystyle\int \ln x\,dx = x\ln x - x + C$`, correct: true, why: "Parts with u = ln x, dv = dx." },
      { text: r`$\displaystyle\int e^{x^2}dx = \dfrac{e^{x^2}}{2x} + C$`, why: "It has no elementary antiderivative; differentiating the RHS does not give e^{x²}." },
    ],
    solution: r`Check by differentiating: $(\tan x)' = \sec^2x$; $(\tan^{-1}x)' = \frac{1}{1 + x^2}$; $(x\ln x - x)' = \ln x + 1 - 1 = \ln x$. For the last, $\frac{d}{dx}\frac{e^{x^2}}{2x} = e^{x^2} - \frac{e^{x^2}}{2x^2} \ne e^{x^2}$.`,
    concept: "Verifying antiderivatives", formula: r`$F' = f$`, whyFormula: "Differentiate to check.", mistakes: "Dividing by the inner derivative when it is not constant.",
  },

  // ── Circles ──
  {
    topic: "circles", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The centre of the circle $x^2 + y^2 - 4x + 6y - 3 = 0$ is:`,
    options: [
      { text: r`$(2, -3)$`, correct: true, why: r`$(-g, -f)$ with $2g = -4$, $2f = 6$.` },
      { text: r`$(-2, 3)$`, why: "Sign error." },
      { text: r`$(4, -6)$`, why: "Did not halve." },
      { text: r`$(-4, 6)$`, why: "Sign error and did not halve." },
    ],
    solution: r`$x^2 + y^2 + 2gx + 2fy + c = 0$ has centre $(-g, -f)$. Here $g = -2$, $f = 3$: centre $(2, -3)$.`,
    concept: "General equation of a circle", formula: r`centre $(-g, -f)$, $r = \sqrt{g^2 + f^2 - c}$`, whyFormula: "Complete the square.", mistakes: "Sign errors.",
  },
  {
    topic: "circles", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 4,
    statement: r`Find the radius of the circle $x^2 + y^2 - 4x + 6y - 3 = 0$.`,
    solution: r`$r = \sqrt{g^2 + f^2 - c} = \sqrt{4 + 9 + 3} = 4$.`,
    concept: "Radius from the general equation", formula: r`$r = \sqrt{g^2 + f^2 - c}$`, whyFormula: "Completing the square.", mistakes: "Sign of c.",
  },
  {
    topic: "circles", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The line $3x + 4y = k$ touches the circle $x^2 + y^2 = 25$ when $k$ equals:`,
    options: [
      { text: r`$\pm25$`, correct: true, why: r`Distance $|k|/5 = 5$.` },
      { text: r`$\pm5$`, why: "Forgot the factor 5." },
      { text: "25 only", why: "Both signs work." },
      { text: r`$\pm125$`, why: "Overcounted." },
    ],
    solution: r`Tangency: distance from centre $(0,0)$ to the line equals the radius: $\dfrac{|k|}{\sqrt{9 + 16}} = 5 \Rightarrow |k| = 25$.`,
    concept: "Condition of tangency", formula: r`$\dfrac{|ax_0 + by_0 - k|}{\sqrt{a^2 + b^2}} = r$`, whyFormula: "Perpendicular distance.", mistakes: "Missing the negative value.",
  },
  {
    topic: "circles", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 12,
    statement: r`Find the length of the tangent from the point $(13, 0)$ to the circle $x^2 + y^2 = 25$.`,
    solution: r`Length $= \sqrt{S_1} = \sqrt{13^2 + 0 - 25} = \sqrt{144} = 12$.`,
    concept: "Length of tangent", formula: r`$L = \sqrt{x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c}$`, whyFormula: "Pythagoras with the radius.", mistakes: "Forgetting to subtract r².",
  },
  {
    topic: "circles", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Circles $C_1: x^2 + y^2 = 9$ and $C_2: (x - 5)^2 + y^2 = 4$. Which statements are correct?`,
    options: [
      { text: "They touch externally", correct: true, why: "Distance between centres 5 = 3 + 2." },
      { text: "They have exactly 3 common tangents", correct: true, why: "Two direct tangents plus the tangent at the contact point." },
      { text: r`The point of contact is $(2, 0)$`, why: r`It lies 3 units (radius of $C_1$) from the origin: $(3, 0)$.` },
      { text: "They intersect at two points", why: "They touch at one point." },
    ],
    solution: r`Centres $(0,0)$, $(5,0)$; radii 3, 2. $d = 5 = r_1 + r_2$: external tangency, 3 common tangents. Contact point on the line of centres at distance 3 from the origin: $(3, 0)$.`,
    concept: "Relative positions of two circles", formula: r`$d = r_1 + r_2$ ⇒ external tangency`, whyFormula: "Compare d with r₁ ± r₂.", mistakes: "Counting 4 tangents (that is for separate circles).",
  },

  // ── Conic sections ──
  {
    topic: "conic-sections", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The focus of the parabola $y^2 = 12x$ is:`,
    options: [
      { text: r`$(3, 0)$`, correct: true, why: r`$4a = 12$, $a = 3$.` },
      { text: r`$(12, 0)$`, why: "Did not divide by 4." },
      { text: r`$(0, 3)$`, why: "Wrong axis." },
      { text: r`$(-3, 0)$`, why: "Sign error." },
    ],
    solution: r`$y^2 = 4ax$ has focus $(a, 0)$. Here $4a = 12$, so $a = 3$: focus $(3, 0)$, directrix $x = -3$.`,
    concept: "Standard parabola", formula: r`$y^2 = 4ax$: focus $(a, 0)$`, whyFormula: "Standard form.", mistakes: "Using 4a as the focal distance.",
  },
  {
    topic: "conic-sections", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 0.8, tolerance: 0.001,
    statement: r`Find the eccentricity of the ellipse $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$.`,
    solution: r`$e = \sqrt{1 - b^2/a^2} = \sqrt{1 - 9/25} = 4/5 = 0.8$.`,
    concept: "Eccentricity of an ellipse", formula: r`$e = \sqrt{1 - b^2/a^2}$`, whyFormula: r`$b^2 = a^2(1 - e^2)$.`, mistakes: "Using the hyperbola formula.",
  },
  {
    topic: "conic-sections", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The length of the latus rectum of $\dfrac{x^2}{16} + \dfrac{y^2}{9} = 1$ is:`,
    options: [
      { text: r`$9/2$`, correct: true, why: r`$2b^2/a = 18/4$.` },
      { text: r`$9/4$`, why: "Missing factor 2." },
      { text: r`$32/3$`, why: "Swapped a and b." },
      { text: "6", why: "That is the minor axis." },
    ],
    solution: r`Latus rectum $= \dfrac{2b^2}{a} = \dfrac{2\times9}{4} = \dfrac92$.`,
    concept: "Latus rectum", formula: r`$\ell = 2b^2/a$`, whyFormula: "Chord through the focus perpendicular to the major axis.", mistakes: "Swapping a and b.",
  },
  {
    topic: "conic-sections", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 10,
    statement: r`For the hyperbola $\dfrac{x^2}{36} - \dfrac{y^2}{64} = 1$, find the distance from its centre to either focus.`,
    solution: r`$b^2 = a^2(e^2 - 1) \Rightarrow a^2e^2 = a^2 + b^2 = 36 + 64 = 100 \Rightarrow ae = 10$. The foci are $(\pm10, 0)$.`,
    concept: "Foci of a hyperbola", formula: r`$c^2 = a^2 + b^2$`, whyFormula: "Hyperbola relation.", mistakes: "Using a² − b².",
  },
  {
    topic: "conic-sections", level: 5, difficulty: "HARD", type: "MATCH", time: 180,
    statement: "Match each conic in List-I with its eccentricity in List-II.",
    match: {
      left: [r`$y^2 = 8x$`, r`$\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$`, r`$x^2 - y^2 = 4$`, r`$\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$`],
      right: ["1", r`$3/5$`, r`$\sqrt2$`, r`$5/4$`, r`$4/5$`],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: "Each eccentricity computed below." },
      { text: "P→1, Q→5, R→3, S→4", why: r`$4/5$ is $b/a$, not e, for Q.` },
      { text: "P→3, Q→2, R→1, S→4", why: "Parabolas have e = 1; rectangular hyperbolas √2." },
      { text: "P→1, Q→2, R→4, S→3", why: "Swaps R and S." },
    ],
    solution: r`- Parabola: $e = 1$.
- Ellipse: $e = \sqrt{1 - 16/25} = 3/5$.
- Rectangular hyperbola ($a = b$): $e = \sqrt2$.
- Hyperbola: $e = \sqrt{1 + 9/16} = 5/4$.`,
    concept: "Eccentricity of conics", formula: r`ellipse $\sqrt{1 - b^2/a^2}$; hyperbola $\sqrt{1 + b^2/a^2}$`, whyFormula: "Standard results.", mistakes: "Mixing up the two formulas.",
  },

  // ── Statistics ──
  {
    topic: "statistics", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The median of 3, 7, 1, 9, 5 is:",
    options: [
      { text: "5", correct: true, why: "Sorted: 1, 3, 5, 7, 9." },
      { text: "1", why: "Did not sort." },
      { text: "9", why: "Did not sort." },
      { text: "7", why: "That is the fourth value after sorting, not the middle one." },
    ],
    solution: "Sorted: 1, 3, 5, 7, 9. Middle value: 5.",
    concept: "Median", formula: "Middle value of sorted data", whyFormula: "Definition.", mistakes: "Not sorting first.",
  },
  {
    topic: "statistics", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 8,
    statement: "Find the variance of 2, 4, 6, 8, 10.",
    solution: r`Mean 6. Deviations −4, −2, 0, 2, 4; squares 16, 4, 0, 4, 16; sum 40. Variance $= 40/5 = 8$.`,
    concept: "Variance", formula: r`$\sigma^2 = \dfrac{\sum(x_i - \bar x)^2}{n}$`, whyFormula: "Mean squared deviation.", mistakes: "Dividing by n − 1 (sample variance).",
  },
  {
    topic: "statistics", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Each observation of a data set is multiplied by 3 and then increased by 5. The standard deviation:",
    options: [
      { text: "is multiplied by 3", correct: true, why: "Adding a constant does not change spread." },
      { text: "is multiplied by 3 and increased by 5", why: "Shifts do not affect SD." },
      { text: "is unchanged", why: "Scaling changes SD." },
      { text: "is multiplied by 9", why: "That is the variance." },
    ],
    solution: r`For $y = ax + b$: $\sigma_y = |a|\sigma_x$. Here SD is multiplied by 3 (variance by 9).`,
    concept: "Effect of linear transformations", formula: r`$\sigma_{ax + b} = |a|\sigma_x$`, whyFormula: "Deviations scale by a; shifts cancel.", mistakes: "Adding the shift to SD.",
  },
  {
    topic: "statistics", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 8.25, tolerance: 0.01,
    statement: "Find the variance of the first 10 natural numbers.",
    solution: r`Variance of $1, \dots, n$ is $\dfrac{n^2 - 1}{12} = \dfrac{99}{12} = 8.25$. Directly: mean 5.5, $\sum x^2 = 385$, $\sigma^2 = 38.5 - 30.25 = 8.25$.`,
    concept: "Variance of natural numbers", formula: r`$\sigma^2 = \dfrac{n^2 - 1}{12}$`, whyFormula: "From the sums of n and n².", mistakes: "Using the sample formula.",
  },
  {
    topic: "statistics", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "The mean of five observations is 4 and their variance is 5.2. Three of them are 1, 2 and 6. Which statements are correct about the other two?",
    options: [
      { text: "Their sum is 11", correct: true, why: "5 × 4 − (1 + 2 + 6)." },
      { text: "The sum of their squares is 65", correct: true, why: "5(5.2 + 16) − (1 + 4 + 36)." },
      { text: "They are 4 and 7", correct: true, why: "a + b = 11, a² + b² = 65." },
      { text: "They are 5 and 6", why: "Sum of squares would be 61." },
    ],
    solution: r`$a + b = 20 - 9 = 11$. $\sum x^2 = n(\sigma^2 + \bar x^2) = 5(5.2 + 16) = 106$, so $a^2 + b^2 = 106 - 41 = 65$. Then $2ab = 121 - 65 = 56$, $ab = 28$: $a, b = 4, 7$.`,
    concept: "Recovering data from mean and variance", formula: r`$\sigma^2 = \dfrac{\sum x^2}{n} - \bar x^2$`, whyFormula: "Gives the sum of squares.", mistakes: "Using variance directly as the sum of squares.",
  },

  // ── Trigonometric functions and equations ──
  {
    topic: "trigonometric-functions-and-equations", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The fundamental period of $\sin 2x$ is:`,
    options: [
      { text: r`$\pi$`, correct: true, why: r`$2\pi/2$.` },
      { text: r`$2\pi$`, why: r`That is $\sin x$.` },
      { text: r`$\pi/2$`, why: r`That is for $\sin 4x$ or $|\sin 2x|$.` },
      { text: r`$4\pi$`, why: "Multiplied instead of divided." },
    ],
    solution: r`$\sin(kx)$ has period $2\pi/|k|$: $2\pi/2 = \pi$.`,
    concept: "Period of trigonometric functions", formula: r`$T = 2\pi/|k|$`, whyFormula: "Horizontal compression.", mistakes: "Multiplying by k.",
  },
  {
    topic: "trigonometric-functions-and-equations", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1,
    statement: r`Find $\sin^2 37^\circ + \cos^2 37^\circ$.`,
    solution: r`$\sin^2\theta + \cos^2\theta = 1$ for every θ.`,
    concept: "Pythagorean identity", formula: r`$\sin^2\theta + \cos^2\theta = 1$`, whyFormula: "Unit circle.", mistakes: "Trying to evaluate each term.",
  },
  {
    topic: "trigonometric-functions-and-equations", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The general solution of $\sin x = \dfrac12$ is:`,
    options: [
      { text: r`$x = n\pi + (-1)^n\dfrac{\pi}{6}$`, correct: true, why: "Standard form for sin x = sin α." },
      { text: r`$x = 2n\pi \pm \dfrac{\pi}{6}$`, why: "That is the form for cos." },
      { text: r`$x = n\pi + \dfrac{\pi}{6}$`, why: "That is the form for tan." },
      { text: r`$x = \dfrac{\pi}{6}$ only`, why: "That is only the principal value." },
    ],
    solution: r`$\sin x = \sin\alpha \iff x = n\pi + (-1)^n\alpha$, $n\in\mathbb{Z}$. With $\alpha = \pi/6$ this covers $\pi/6, 5\pi/6, 13\pi/6, \dots$`,
    concept: "General solutions", formula: r`$\sin x = \sin\alpha \Rightarrow x = n\pi + (-1)^n\alpha$`, whyFormula: "Symmetry of sine.", mistakes: "Using the cosine form.",
  },
  {
    topic: "trigonometric-functions-and-equations", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 4,
    statement: r`How many solutions does $\sin 2x = \cos x$ have in $[0, 2\pi)$?`,
    solution: r`$2\sin x\cos x = \cos x \Rightarrow \cos x(2\sin x - 1) = 0$. $\cos x = 0$: $x = \pi/2, 3\pi/2$. $\sin x = 1/2$: $x = \pi/6, 5\pi/6$. Total 4.`,
    concept: "Solving by factorisation", formula: r`$\sin2x = 2\sin x\cos x$`, whyFormula: "Reduce to a product equal to zero.", mistakes: "Dividing by cos x and losing solutions.",
  },
  {
    topic: "trigonometric-functions-and-equations", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Let $f(x) = 3\sin x + 4\cos x$. Which statements are correct?`,
    options: [
      { text: "The maximum value of f is 5", correct: true, why: r`$\sqrt{9 + 16}$.` },
      { text: r`$f(0) = 3$`, why: r`$f(0) = 3(0) + 4(1) = 4$.` },
      { text: r`The period of $f$ is $\pi$`, why: r`$f = 5\sin(x + \alpha)$ has period $2\pi$.` },
      { text: "The maximum value of f is 7", why: "The maxima of sin and cos occur at different x." },
    ],
    solution: r`$a\sin x + b\cos x = \sqrt{a^2 + b^2}\sin(x + \alpha)$ with $\tan\alpha = b/a$. So $f = 5\sin(x + \alpha)$: range $[-5, 5]$, period $2\pi$.`,
    concept: "Range of a sin x + b cos x", formula: r`$-\sqrt{a^2 + b^2} \le a\sin x + b\cos x \le \sqrt{a^2 + b^2}$`, whyFormula: "Combine into one sine.", mistakes: "Adding the separate maxima.",
  },
];
