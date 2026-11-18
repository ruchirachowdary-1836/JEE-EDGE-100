import { r } from "./note-helpers";

/** Formula sheets added to the two maths notes that were written before the formula-sheet section existed. */
export const MATH_SHEETS: Record<string, string> = {
  "quadratic-equations": r`- Roots of $ax^2 + bx + c = 0$ ($a \ne 0$): $x = \dfrac{-b \pm \sqrt{D}}{2a}$, $D = b^2 - 4ac$.
- $\alpha + \beta = -\dfrac ba$, $\alpha\beta = \dfrac ca$ — valid for real or complex roots.
- $|\alpha - \beta| = \dfrac{\sqrt D}{|a|}$; $\alpha^2 + \beta^2 = (\alpha+\beta)^2 - 2\alpha\beta$; $\alpha^3 + \beta^3 = (\alpha+\beta)^3 - 3\alpha\beta(\alpha+\beta)$.
- Equation with roots $\alpha, \beta$: $x^2 - (\alpha+\beta)x + \alpha\beta = 0$.
- Nature (real coefficients): $D > 0$ distinct real, $D = 0$ equal, $D < 0$ complex conjugates; rational coefficients and $D$ a perfect square ⇒ rational roots.
- Vertex of $y = ax^2 + bx + c$: $\left(-\dfrac b{2a}, -\dfrac D{4a}\right)$; minimum value $-\dfrac D{4a}$ if $a > 0$, maximum if $a < 0$.
- Sign: if $D < 0$, $ax^2 + bx + c$ has the sign of $a$ for all real $x$.
- Common root of $a_1x^2 + b_1x + c_1 = 0$ and $a_2x^2 + b_2x + c_2 = 0$: $(c_1a_2 - c_2a_1)^2 = (a_1b_2 - a_2b_1)(b_1c_2 - b_2c_1)$.
- Both roots greater than $k$: $D \ge 0$, $af(k) > 0$, $-\dfrac b{2a} > k$. $k$ lies between the roots: $af(k) < 0$.
- Cubic $ax^3 + bx^2 + cx + d = 0$: $\sum\alpha = -\dfrac ba$, $\sum\alpha\beta = \dfrac ca$, $\alpha\beta\gamma = -\dfrac da$.
- Power sums: $S_n = (\alpha+\beta)S_{n-1} - \alpha\beta\,S_{n-2}$, where $S_n = \alpha^n + \beta^n$.`,
  "definite-integrals": r`- $\int_a^b f(x)\,dx = F(b) - F(a)$ — $f$ continuous on $[a, b]$, $F' = f$.
- $\int_a^b f = -\int_b^a f$; $\int_a^b f = \int_a^c f + \int_c^b f$.
- King's property: $\int_a^b f(x)\,dx = \int_a^b f(a + b - x)\,dx$; $\int_0^a f(x)\,dx = \int_0^a f(a - x)\,dx$.
- $\int_{-a}^a f = 2\int_0^a f$ ($f$ even), $= 0$ ($f$ odd).
- $\int_0^{2a} f = 2\int_0^a f$ if $f(2a - x) = f(x)$; $= 0$ if $f(2a - x) = -f(x)$.
- Periodic $f$ (period $T$): $\int_0^{nT} f = n\int_0^T f$; $\int_a^{a+T} f = \int_0^T f$.
- $\int_a^b \dfrac{f(x)}{f(x) + f(a+b-x)}dx = \dfrac{b - a}2$.
- Leibniz: $\dfrac d{dx}\int_{g(x)}^{h(x)} f(t)\,dt = f(h(x))h'(x) - f(g(x))g'(x)$ — $f$ continuous.
- Limit of a sum: $\lim_{n\to\infty}\dfrac1n\sum_{r=1}^{n} f\!\left(\dfrac rn\right) = \int_0^1 f(x)\,dx$.
- Wallis: $\int_0^{\pi/2}\sin^n x\,dx = \int_0^{\pi/2}\cos^n x\,dx = \dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots$, ending in $\dfrac12\cdot\dfrac\pi2$ ($n$ even) or $\dfrac23\cdot1$ ($n$ odd).
- $\int_0^{\pi/2}\ln\sin x\,dx = \int_0^{\pi/2}\ln\cos x\,dx = -\dfrac\pi2\ln2$.
- $\int_0^\pi x f(\sin x)\,dx = \dfrac\pi2\int_0^\pi f(\sin x)\,dx$.
- Area between curves: $\int_a^b |f(x) - g(x)|\,dx$; geometric area under $y = f(x)$: $\int_a^b |f(x)|\,dx$.
- Bounds: if $m \le f(x) \le M$ on $[a, b]$, then $m(b - a) \le \int_a^b f \le M(b - a)$.`,
};

export const MATH_TOPIC_ORDER = [
  "sets-and-relations", "functions", "complex-numbers", "quadratic-equations", "matrices", "determinants", "counting", "binomial-theorem",
  "progressions", "limits-and-continuity", "differentiation", "applications-of-derivatives", "indefinite-integrals", "definite-integrals",
  "differential-equations", "straight-lines", "circles", "conic-sections", "lines-and-planes", "vectors", "statistics", "probability",
  "trigonometric-functions-and-equations", "inverse-trigonometric-functions",
];
