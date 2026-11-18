import type { NoteSeed } from "./types";
import { withFormulaSheet } from "./note-helpers";
import { MATH_SHEETS, MATH_TOPIC_ORDER } from "./notes-math-sheets";
import { MATH_ALGEBRA_NOTES } from "./notes-math-algebra";
import { MATH_CALCULUS_NOTES } from "./notes-math-calculus";
import { MATH_GEOMETRY_NOTES } from "./notes-math-geometry";

const BASE_NOTES: NoteSeed[] = [
  {
    topic: "quadratic-equations",
    sections: [
      { key: "introduction", title: "Introduction", body: `A **quadratic equation** is an equation of the form $ax^2 + bx + c = 0$ with $a \\neq 0$. Quadratics appear everywhere in JEE: in their own right, inside inequalities, in coordinate geometry (a line meeting a conic), in calculus (extrema) and in complex numbers.` },
      { key: "prerequisites", title: "Prerequisite knowledge", body: `- Factorisation and completing the square
- Graph of $y = x^2$ and transformations
- Basic complex numbers ($i^2 = -1$)` },
      { key: "concept", title: "Concept from the basics", body: `The graph of $y = ax^2 + bx + c$ is a parabola. The **roots** of $ax^2+bx+c=0$ are the $x$-coordinates where this parabola meets the $x$-axis.

A parabola can cut the axis twice, touch it once, or miss it entirely. These three pictures correspond exactly to the sign of the **discriminant** $D = b^2 - 4ac$. Thinking of quadratics as parabolas turns many algebraic questions into easy geometric ones.` },
      { key: "theory", title: "Detailed theory", body: `Completing the square:
$$ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{D}{4a}$$
so the roots are
$$x = \\frac{-b \\pm \\sqrt{D}}{2a}$$
If $\\alpha$ and $\\beta$ are the roots, then $ax^2 + bx + c = a(x-\\alpha)(x-\\beta)$, and comparing coefficients
$$\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}$$
The vertex of the parabola is at $\\left(-\\dfrac{b}{2a},\\, -\\dfrac{D}{4a}\\right)$.` },
      { key: "definitions", title: "Definitions", body: `- **Root (zero):** a value of $x$ that satisfies the equation.
- **Discriminant:** $D = b^2 - 4ac$.
- **Symmetric function of roots:** an expression in $\\alpha, \\beta$ unchanged when they are swapped (e.g. $\\alpha^2 + \\beta^2$); it can always be written using $\\alpha+\\beta$ and $\\alpha\\beta$.` },
      { key: "principles", title: "Important principles", body: `1. **Nature of roots** (real coefficients): $D > 0$ two distinct real roots; $D = 0$ equal real roots; $D < 0$ a pair of complex conjugate roots.
2. With rational coefficients, if $D$ is a **perfect square** the roots are rational; irrational roots occur in conjugate pairs $p \\pm \\sqrt q$.
3. **Sign of the quadratic:** if $D < 0$, $ax^2+bx+c$ has the same sign as $a$ for every real $x$.
4. **Forming an equation** with roots $\\alpha, \\beta$: $x^2 - (\\alpha+\\beta)x + \\alpha\\beta = 0$.` },
      { key: "derivations", title: "Derivations", body: `**Quadratic formula.** Divide by $a$ and complete the square:
$$x^2 + \\frac ba x = -\\frac ca \\;\\Rightarrow\\; \\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2} \\;\\Rightarrow\\; x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$

**Sum and product.** Adding the two roots, the $\\pm\\sqrt D$ terms cancel: $\\alpha+\\beta = -b/a$. Multiplying, $\\alpha\\beta = \\dfrac{b^2 - D}{4a^2} = \\dfrac{4ac}{4a^2} = \\dfrac ca$.

**Useful identities.**
$$\\alpha^2+\\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta, \\qquad |\\alpha-\\beta| = \\frac{\\sqrt D}{|a|}, \\qquad \\alpha^3+\\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)$$` },
      { key: "diagrams", title: "Diagram", body: `Use the function-transformation lab below to see how changing $a$, $b$ and $c$ moves the parabola relative to the $x$-axis, and when it stops cutting it.`, animationKey: "transform" },
      { key: "graphs", title: "Graphs", body: `- $a > 0$: parabola opens upward; minimum value $-D/4a$ at $x = -b/2a$.
- $a < 0$: opens downward; maximum value $-D/4a$.
- $c$ is the $y$-intercept.
- The axis of symmetry $x = -b/2a$ is the average of the roots.` },
      { key: "specialCases", title: "Special cases", body: `- Roots equal in magnitude, opposite in sign: $b = 0$ (and $ac < 0$).
- Roots reciprocal of each other: $c = a$.
- One root zero: $c = 0$. Both roots zero: $b = c = 0$.
- Common root of $a_1x^2+b_1x+c_1=0$ and $a_2x^2+b_2x+c_2=0$: $(c_1a_2 - c_2a_1)^2 = (a_1b_2 - a_2b_1)(b_1c_2 - b_2c_1)$.` },
      { key: "exceptions", title: "Exceptions", body: `- The discriminant test for the nature of roots requires **real coefficients**. For $x^2 - 2ix - 1 = 0$, $D = 0$ but the coefficients are complex.
- If the leading coefficient contains a parameter (e.g. $(k-1)x^2 + \\dots$), check separately the case where it becomes zero — the equation is then linear.` },
      { key: "assumptions", title: "Assumptions and limitations", body: `- $a \\neq 0$ throughout.
- Conjugate-pair results need real (for complex roots) or rational (for surd roots) coefficients.` },
      { key: "applications", title: "Applications", body: `- Projectile height as a function of time is quadratic: "when does the ball reach 10 m?" is a quadratic equation.
- Maximum area of a rectangle with fixed perimeter.
- Condition for a line to be tangent to a circle or conic ($D = 0$ after substitution).` },
      { key: "patterns", title: "JEE Main question patterns", body: `- Evaluate a symmetric expression of the roots without solving.
- Find parameter values for which roots are real, equal, positive, or lie in an interval.
- Form a new equation whose roots are functions of the old roots.
- Quadratic in disguise: substitute $t = x + 1/x$, $t = 2^x$ or $t = |x|$.
- Combine with complex numbers or sequences (roots in AP/GP).` },
      { key: "misconceptions", title: "Common misconceptions", body: `- "$D < 0$ means no roots." It means no **real** roots; there are two complex roots.
- "If $\\alpha+\\beta$ and $\\alpha\\beta$ are positive, nothing more is needed for both roots to be positive." You also need $D \\ge 0$ so that the roots are real.` },
      { key: "traps", title: "Common examination traps", body: `- Forgetting the case where the leading coefficient vanishes.
- Losing a sign in $\\alpha+\\beta = -b/a$.
- Writing $|\\alpha - \\beta| = \\sqrt D$ instead of $\\sqrt D/|a|$.` },
      { key: "summary", title: "Quick revision summary", body: `$$x = \\frac{-b\\pm\\sqrt{D}}{2a},\\quad \\alpha+\\beta = -\\frac ba,\\quad \\alpha\\beta = \\frac ca,\\quad |\\alpha-\\beta| = \\frac{\\sqrt D}{|a|}$$

- $D>0$, $=0$, $<0$ ↔ two real, equal, complex-conjugate roots (real coefficients).
- New equation: $x^2 - (\\text{sum})x + \\text{product} = 0$.
- Vertex $(-b/2a, -D/4a)$.` },
    ],
  },
  {
    topic: "definite-integrals",
    sections: [
      { key: "introduction", title: "Introduction", body: `A **definite integral** $\\int_a^b f(x)\\,dx$ measures the accumulated quantity of $f$ over the interval $[a, b]$ — most visibly, the **signed area** between the curve and the $x$-axis. Definite integrals are among the most heavily practised areas of JEE Mathematics because their properties let you evaluate integrals that have no elementary antiderivative.` },
      { key: "prerequisites", title: "Prerequisite knowledge", body: `- Standard indefinite integrals
- Substitution and integration by parts
- Even and odd functions; periodic functions
- Graphs of standard functions` },
      { key: "concept", title: "Concept from the basics", body: `Split $[a,b]$ into $n$ thin strips of width $\\Delta x$. Each strip is almost a rectangle of height $f(x_i)$. Add their areas, then let the strips become infinitely thin:
$$\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^{n} f(x_i)\\,\\Delta x$$
Area above the axis counts positive; area below counts negative.` },
      { key: "theory", title: "Detailed theory", body: `**Fundamental theorem of calculus.** If $F'(x) = f(x)$ and $f$ is continuous on $[a,b]$, then
$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$
Also, $\\dfrac{d}{dx}\\displaystyle\\int_a^{x} f(t)\\,dt = f(x)$. More generally (**Leibniz rule**):
$$\\frac{d}{dx}\\int_{g(x)}^{h(x)} f(t)\\,dt = f(h(x))\\,h'(x) - f(g(x))\\,g'(x)$$` },
      { key: "definitions", title: "Definitions", body: `- **Integrand:** the function $f(x)$ being integrated.
- **Limits of integration:** $a$ (lower) and $b$ (upper).
- **Riemann sum:** $\\sum f(x_i)\\Delta x$ approximating the integral.
- **Even function:** $f(-x) = f(x)$. **Odd function:** $f(-x) = -f(x)$.` },
      { key: "principles", title: "Important principles", body: `1. $\\int_a^b f(x)\\,dx = \\int_a^b f(t)\\,dt$ (dummy variable).
2. $\\int_a^b f = -\\int_b^a f$.
3. $\\int_a^b f = \\int_a^c f + \\int_c^b f$ (splitting — essential for $|x|$, $[x]$ and piecewise functions).
4. **King's property:** $\\int_a^b f(x)\\,dx = \\int_a^b f(a+b-x)\\,dx$.
5. $\\int_{-a}^{a} f = 2\\int_0^a f$ if $f$ is even, and $0$ if $f$ is odd.
6. $\\int_0^{2a} f = 2\\int_0^a f$ if $f(2a-x) = f(x)$, and $0$ if $f(2a-x) = -f(x)$.
7. If $f$ has period $T$: $\\int_0^{nT} f = n\\int_0^T f$.` },
      { key: "derivations", title: "Derivations", body: `**King's property.** Substitute $x = a + b - t$, so $dx = -dt$; when $x = a$, $t = b$ and when $x = b$, $t = a$:
$$\\int_a^b f(x)\\,dx = \\int_b^a f(a+b-t)(-dt) = \\int_a^b f(a+b-t)\\,dt$$

**Even/odd property.** Split at 0 and substitute $x = -t$ in the left part:
$$\\int_{-a}^{0} f(x)\\,dx = \\int_0^a f(-t)\\,dt$$
So $\\int_{-a}^{a} f = \\int_0^a [f(x) + f(-x)]\\,dx$, which is $2\\int_0^a f$ for even $f$ and $0$ for odd $f$.

**Classic use.** $I = \\int_0^{\\pi/2}\\dfrac{\\sin x}{\\sin x + \\cos x}dx$. King's property gives $I = \\int_0^{\\pi/2}\\dfrac{\\cos x}{\\cos x + \\sin x}dx$. Adding, $2I = \\int_0^{\\pi/2}1\\,dx = \\pi/2$, so $I = \\pi/4$.` },
      { key: "diagrams", title: "Diagram", body: `The Riemann-sum visualiser below fills the area under a curve with rectangles. Increase the number of strips and watch the sum approach the exact integral.`, animationKey: "riemann" },
      { key: "graphs", title: "Graphs", body: `- The integral is the net signed area; for total (geometric) area integrate $|f(x)|$.
- For an odd function on a symmetric interval the positive and negative areas cancel exactly.
- $F(x) = \\int_a^x f(t)\\,dt$ increases where $f > 0$ and has turning points where $f$ changes sign.` },
      { key: "specialCases", title: "Special cases", body: `- $\\int_0^{\\pi/2}\\dfrac{f(\\sin x)}{f(\\sin x) + f(\\cos x)}dx = \\dfrac{\\pi}{4}$.
- $\\int_0^{\\pi/2}\\ln\\sin x\\,dx = -\\dfrac{\\pi}{2}\\ln 2$.
- $\\int_0^{\\pi} x f(\\sin x)\\,dx = \\dfrac{\\pi}{2}\\int_0^{\\pi} f(\\sin x)\\,dx$.
- $\\int_a^b \\dfrac{f(x)}{f(x)+f(a+b-x)}dx = \\dfrac{b-a}{2}$.` },
      { key: "exceptions", title: "Exceptions", body: `- The fundamental theorem needs $f$ continuous on $[a,b]$. $\\int_{-1}^{1}\\dfrac{dx}{x^2}$ is **not** $[-1/x]_{-1}^{1} = -2$; the integrand is unbounded at 0 and the integral diverges.
- For greatest-integer or modulus functions, split at the points where the expression changes form before integrating.` },
      { key: "assumptions", title: "Assumptions and limitations", body: `- The integrand is bounded and (piecewise) continuous on a finite interval for the standard theory.
- Properties assume the substitutions are valid (the substituted function maps the interval correctly).` },
      { key: "applications", title: "Applications", body: `- Area between curves.
- Work done by a variable force: $W = \\int F\\,dx$.
- Displacement from a velocity–time graph.
- Average value of a function: $\\dfrac{1}{b-a}\\int_a^b f$.` },
      { key: "patterns", title: "JEE Main question patterns", body: `- King's property with $\\sin/\\cos$ or $f(x)/(f(x)+f(a+b-x))$ forms.
- Integrals with $|x|$, $[x]$ or $\\{x\\}$ requiring splitting.
- Leibniz rule: limits or derivatives of $\\int_0^x$ expressions.
- Limits of sums converted to integrals: $\\lim \\dfrac1n\\sum f(r/n) = \\int_0^1 f(x)\\,dx$.
- Even/odd simplification over $[-a, a]$.` },
      { key: "misconceptions", title: "Common misconceptions", body: `- "Definite integral always equals area." It equals **signed** area.
- "Change of variable keeps the same limits." Limits must be converted too.
- "Odd-function property works on $[0, a]$." It needs a symmetric interval $[-a, a]$.` },
      { key: "traps", title: "Common examination traps", body: `- Ignoring a discontinuity inside the interval.
- Forgetting the chain-rule factor $h'(x)$ in the Leibniz rule.
- Adding $+C$ to a definite integral.` },
      { key: "summary", title: "Quick revision summary", body: `$$\\int_a^b f(x)\\,dx = F(b)-F(a),\\qquad \\int_a^b f(x)\\,dx = \\int_a^b f(a+b-x)\\,dx$$
$$\\frac{d}{dx}\\int_{g(x)}^{h(x)} f(t)dt = f(h)h' - f(g)g'$$

- Even on $[-a,a]$: double half. Odd: zero.
- Split at kinks and jumps.
- $\\lim_{n\\to\\infty}\\frac1n\\sum_{r=1}^{n} f(r/n) = \\int_0^1 f(x)dx$.` },
    ],
  },
];

const ALL = [
  ...BASE_NOTES.map((n) => (MATH_SHEETS[n.topic] ? withFormulaSheet(n, MATH_SHEETS[n.topic]) : n)),
  ...MATH_ALGEBRA_NOTES,
  ...MATH_CALCULUS_NOTES,
  ...MATH_GEOMETRY_NOTES,
];

/** Every Mathematics topic, in syllabus order. */
export const MATHEMATICS_NOTES: NoteSeed[] = MATH_TOPIC_ORDER.map((t) => {
  const n = ALL.find((x) => x.topic === t);
  if (!n) throw new Error("Missing maths note for " + t);
  return n;
});
