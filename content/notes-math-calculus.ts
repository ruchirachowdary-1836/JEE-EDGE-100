import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const MATH_CALCULUS_NOTES: NoteSeed[] = [
  note("limits-and-continuity", {
    introduction: r`A **limit** describes the value a function approaches as its input approaches a point — even if the function is undefined there. Limits underpin derivatives and integrals, and continuity is defined through them.`,
    prerequisites: r`- Factorisation and rationalisation
- Graphs of standard functions
- Trigonometric identities`,
    concept: r`$\lim_{x\to a} f(x) = L$ means: by taking $x$ close enough to $a$ (but not equal to $a$), $f(x)$ can be made as close to $L$ as we like. What happens **at** $a$ itself does not matter for the limit.`,
    theory: r`The limit exists iff the left-hand limit (LHL) and right-hand limit (RHL) exist and are equal.

$f$ is **continuous at $a$** if $\lim_{x\to a} f(x) = f(a)$: the limit exists, $f(a)$ is defined, and they are equal.

Indeterminate forms: $\frac00$, $\frac\infty\infty$, $0\cdot\infty$, $\infty - \infty$, $1^\infty$, $0^0$, $\infty^0$. They need algebra, standard limits, series or L'Hôpital's rule.`,
    definitions: r`- **LHL** $\lim_{x\to a^-} f(x)$, **RHL** $\lim_{x\to a^+} f(x)$.
- **Removable discontinuity:** limit exists but differs from $f(a)$ (or $f(a)$ undefined).
- **Jump discontinuity:** LHL and RHL exist but differ.`,
    principles: r`1. Limit laws: limit of sum/product/quotient = sum/product/quotient of limits (if they exist, denominator limit $\ne 0$).
2. Sandwich theorem: if $g \le f \le h$ near $a$ and $g, h \to L$, then $f \to L$.
3. Sums, products and compositions of continuous functions are continuous.`,
    derivations: r`**$\lim_{x\to0}\frac{\sin x}{x} = 1$.** For small $x > 0$, comparing areas in the unit circle gives $\sin x < x < \tan x$, so $\cos x < \frac{\sin x}{x} < 1$. Both bounds tend to $1$; by the sandwich theorem the limit is $1$.

**$1^\infty$ form.** If $f \to 1$ and $g \to \infty$, write $f^g = e^{g\ln f}$ and use $\ln f \approx f - 1$: $\lim f^g = e^{\lim g(f-1)}$.`,
    formulas: r`- $\lim_{x\to0}\dfrac{\sin x}{x} = 1$, $\lim_{x\to0}\dfrac{\tan x}{x} = 1$ — $x$ in radians.
- $\lim_{x\to0}\dfrac{1 - \cos x}{x^2} = \dfrac12$.
- $\lim_{x\to0}\dfrac{\sin^{-1}x}{x} = \lim_{x\to0}\dfrac{\tan^{-1}x}{x} = 1$.
- $\lim_{x\to0}\dfrac{e^x - 1}{x} = 1$, $\lim_{x\to0}\dfrac{a^x - 1}{x} = \ln a$ ($a > 0$).
- $\lim_{x\to0}\dfrac{\ln(1+x)}{x} = 1$.
- $\lim_{x\to a}\dfrac{x^n - a^n}{x - a} = na^{n-1}$.
- $\lim_{x\to0}(1 + x)^{1/x} = e$, $\lim_{x\to\infty}\left(1 + \dfrac ax\right)^x = e^a$.
- $1^\infty$ form: $\lim f^g = e^{\lim g\,(f - 1)}$ — when $f \to 1$, $g \to \infty$.
- L'Hôpital: $\lim\dfrac{f}{g} = \lim\dfrac{f'}{g'}$ — only for $\frac00$ or $\frac\infty\infty$, when the right side exists.
- Rational function at infinity: compare degrees (equal → ratio of leading coefficients; numerator smaller → $0$).
- Series near $0$: $\sin x = x - \frac{x^3}{6} + \dots$, $\cos x = 1 - \frac{x^2}{2} + \frac{x^4}{24} - \dots$, $e^x = 1 + x + \frac{x^2}2 + \dots$, $\ln(1+x) = x - \frac{x^2}2 + \dots$, $\tan x = x + \frac{x^3}3 + \dots$.`,
    diagrams: r`Draw the graph near $x = a$ and look at the heights approached from each side; an open circle marks a missing point, a filled circle the actual value $f(a)$.`,
    graphs: r`- $\frac{\sin x}{x}$: equals 1 in the limit at $0$ though undefined there.
- $[x]$: jumps at every integer — LHL $= n - 1$, RHL $= n$.
- $\frac{|x|}{x}$: LHL $-1$, RHL $1$, so no limit at $0$.`,
    specialCases: r`- $\lim_{x\to\infty}\frac{\sin x}{x} = 0$ (bounded over unbounded).
- $\lim_{x\to0}x\sin\frac1x = 0$ by the sandwich theorem.`,
    exceptions: r`L'Hôpital's rule cannot be used on forms like $\frac{1}{0}$ or when $\lim f'/g'$ does not exist (the original limit may still exist).`,
    assumptions: r`Trigonometric limits assume radian measure.`,
    applications: r`Instantaneous velocity, tangents, and defining $e$ through compound interest.`,
    patterns: r`- $\frac00$ limits via standard limits or expansions.
- $1^\infty$ limits.
- Find constants making a piecewise function continuous.
- Limits with $[x]$ and $|x|$: compute LHL and RHL separately.`,
    misconceptions: r`- "The limit is $f(a)$." Only for continuous functions.
- "$\frac{\infty}{\infty} = 1$." It is indeterminate.`,
    traps: r`- Degrees vs radians.
- Cancelling factors that are zero — legitimate for limits only because $x \ne a$.`,
    summary: r`- Limit exists $\iff$ LHL = RHL.
- $\frac{\sin x}{x}, \frac{\tan x}{x}, \frac{e^x-1}{x}, \frac{\ln(1+x)}x \to 1$; $\frac{1-\cos x}{x^2} \to \frac12$.
- $1^\infty$: $e^{\lim g(f-1)}$. Continuity: $\lim = f(a)$.`,
  }),

  note("differentiation", {
    introduction: r`The **derivative** measures instantaneous rate of change — the slope of the tangent to a curve. JEE requires fast, error-free differentiation using rules, the chain rule, implicit and parametric forms.`,
    prerequisites: r`- Limits
- Standard functions and their graphs`,
    concept: r`Zoom in on a smooth curve and it looks like a straight line; the slope of that line is the derivative. Algebraically it is the limit of the slope of a secant as the second point slides onto the first.`,
    theory: r`$$f'(x) = \lim_{h\to0}\frac{f(x+h) - f(x)}{h}$$
$f$ is differentiable at $a$ if this limit exists; then $f$ is also continuous at $a$. The left and right derivatives must be equal.`,
    definitions: r`- **Left derivative** $Lf'(a) = \lim_{h\to0^-}\frac{f(a+h) - f(a)}h$; **right derivative** similarly with $h \to 0^+$.
- **Higher derivatives:** $f''(x) = \frac{d^2y}{dx^2}$, etc.`,
    principles: r`1. Differentiable $\Rightarrow$ continuous, but not conversely ($|x|$ at $0$).
2. Chain rule: differentiate the outside, keep the inside, multiply by the derivative of the inside.
3. Logarithmic differentiation for products, quotients and variable powers like $x^x$.`,
    derivations: r`**$\frac{d}{dx}\sin x$.** $\frac{\sin(x+h) - \sin x}{h} = \frac{2\cos(x + h/2)\sin(h/2)}{h} \to \cos x$, using $\frac{\sin(h/2)}{h/2} \to 1$.

**Product rule.** $\frac{u(x+h)v(x+h) - u(x)v(x)}{h} = u(x+h)\frac{v(x+h)-v(x)}h + v(x)\frac{u(x+h)-u(x)}h \to uv' + vu'$.`,
    formulas: r`- $(u \pm v)' = u' \pm v'$, $(uv)' = u'v + uv'$, $\left(\dfrac uv\right)' = \dfrac{u'v - uv'}{v^2}$ ($v \ne 0$).
- Chain rule: $\dfrac{d}{dx}f(g(x)) = f'(g(x))\,g'(x)$.
- $\dfrac{d}{dx}x^n = nx^{n-1}$; $\dfrac{d}{dx}e^x = e^x$; $\dfrac{d}{dx}a^x = a^x\ln a$; $\dfrac d{dx}\ln x = \dfrac1x$ ($x > 0$); $\dfrac d{dx}\log_a x = \dfrac{1}{x\ln a}$.
- $\dfrac d{dx}\sin x = \cos x$, $\cos x \to -\sin x$, $\tan x \to \sec^2 x$, $\cot x \to -\csc^2x$, $\sec x \to \sec x\tan x$, $\csc x \to -\csc x\cot x$.
- $\dfrac d{dx}\sin^{-1}x = \dfrac{1}{\sqrt{1-x^2}}$, $\cos^{-1}x \to -\dfrac1{\sqrt{1-x^2}}$ ($|x| < 1$); $\tan^{-1}x \to \dfrac1{1+x^2}$, $\cot^{-1}x \to -\dfrac1{1+x^2}$; $\sec^{-1}x \to \dfrac1{|x|\sqrt{x^2-1}}$, $\csc^{-1}x \to -\dfrac1{|x|\sqrt{x^2-1}}$ ($|x| > 1$).
- $\dfrac d{dx}|x| = \dfrac{x}{|x|}$ ($x \ne 0$).
- Parametric: $\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt}$, $\dfrac{d^2y}{dx^2} = \dfrac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt}$ — needs $dx/dt \ne 0$. *(Beyond JEE Main 2027.)*
- Inverse function: $\dfrac{dx}{dy} = \dfrac{1}{dy/dx}$ — where $dy/dx \ne 0$.
- Logarithmic: if $y = u^v$, then $\dfrac{dy}{dx} = u^v\left(v'\ln u + \dfrac{vu'}{u}\right)$ ($u > 0$).
- Leibniz (product, $n$th derivative): $(uv)^{(n)} = \sum {}\binom nr u^{(n-r)}v^{(r)}$.`,
    diagrams: r`Shrink the secant into a tangent in the live diagram below.`,
    graphs: r`Where $f$ has a sharp corner (e.g. $|x|$ at $0$) or a vertical tangent ($x^{1/3}$ at $0$), $f'$ does not exist.`,
    specialCases: r`- $\frac{d}{dx}x^x = x^x(1 + \ln x)$.
- $f(x) = x|x|$ is differentiable at $0$ with $f'(0) = 0$.`,
    exceptions: r`$\frac{d}{dx}\ln|x| = \frac1x$ for all $x \ne 0$ (not only $x > 0$).`,
    assumptions: r`Angles in radians; functions differentiable on the interval considered.`,
    applications: r`Velocity and acceleration, marginal cost, rates of change in chemistry and physics.`,
    patterns: r`- Differentiability of piecewise and modulus functions at the joining point.
- Parametric and implicit second derivatives.
- Derivatives of inverse-trig expressions simplified by substitution ($x = \tan\theta$).
- Functional equations like $f(x+y) = f(x)f(y)$.`,
    misconceptions: r`- "Continuous $\Rightarrow$ differentiable." $|x|$ is a counterexample.
- "$\frac{d^2y}{dx^2} = \frac{d^2y/dt^2}{d^2x/dt^2}$." Wrong — use the parametric formula above.`,
    traps: r`- Missing the chain-rule factor (e.g. $\frac{d}{dx}\sin 3x = 3\cos3x$).
- Domain of inverse-trig derivatives ($|x| < 1$).`,
    summary: r`- Product, quotient and chain rules.
- Standard derivative table (trig, inverse trig, exp, log).
- Parametric: $\frac{dy}{dx} = \frac{\dot y}{\dot x}$. Differentiable ⇒ continuous.`,
  }, { diagrams: "derivative" }),

  note("applications-of-derivatives", {
    introduction: r`Derivatives answer practical questions: where a function increases, where it peaks, the equations of tangents and normals, and how fast related quantities change.`,
    prerequisites: r`- Differentiation rules
- Sign analysis (wavy-curve method)`,
    concept: r`If the slope is positive the graph rises; if negative it falls. Where the slope changes sign from $+$ to $-$, the graph has a peak (local maximum); from $-$ to $+$, a valley (local minimum).`,
    theory: r`**Critical points:** $f'(c) = 0$ or $f'(c)$ undefined.

First-derivative test: sign change of $f'$ at $c$ decides max/min. Second-derivative test: $f'(c) = 0$ and $f''(c) < 0$ ⇒ local max; $f''(c) > 0$ ⇒ local min; $f''(c) = 0$ ⇒ test fails.

On a closed interval $[a, b]$, absolute extrema occur at critical points or at the endpoints.`,
    definitions: r`- **Increasing on $I$:** $x_1 < x_2 \Rightarrow f(x_1) \le f(x_2)$ (strictly: $<$).
- **Point of inflection:** concavity changes.
- **Normal:** line perpendicular to the tangent at the point of contact.`,
    principles: r`1. $f' > 0$ on an interval ⇒ strictly increasing there.
2. **Rolle's theorem:** $f$ continuous on $[a,b]$, differentiable on $(a,b)$, $f(a) = f(b)$ ⇒ some $c \in (a,b)$ with $f'(c) = 0$.
3. **Lagrange's mean value theorem:** under the first two conditions, some $c$ has $f'(c) = \dfrac{f(b) - f(a)}{b - a}$.`,
    derivations: r`**Tangent and normal.** The tangent at $(x_1, y_1)$ has slope $m = f'(x_1)$: $y - y_1 = m(x - x_1)$. The normal is perpendicular, slope $-1/m$: $y - y_1 = -\frac1m(x - x_1)$.

**LMVT from Rolle.** Apply Rolle's theorem to $g(x) = f(x) - \frac{f(b)-f(a)}{b-a}x$, which has $g(a) = g(b)$.`,
    formulas: r`- Tangent: $y - y_1 = f'(x_1)(x - x_1)$; normal: $y - y_1 = -\dfrac{1}{f'(x_1)}(x - x_1)$ — $f'(x_1) \ne 0$ for the normal in this form. *(Beyond JEE Main 2027.)*
- Horizontal tangent: $f'(x_1) = 0$; vertical tangent: $\dfrac{dx}{dy} = 0$. *(Beyond JEE Main 2027.)*
- Angle between curves: $\tan\theta = \left|\dfrac{m_1 - m_2}{1 + m_1m_2}\right|$ at the point of intersection; orthogonal if $m_1m_2 = -1$. *(Beyond JEE Main 2027.)*
- Length of tangent/normal/subtangent/subnormal (curve $y = f(x)$): subtangent $= \left|\dfrac{y_1}{m}\right|$, subnormal $= |y_1m|$. *(Beyond JEE Main 2027.)*
- Increasing: $f'(x) > 0$; decreasing: $f'(x) < 0$.
- Second-derivative test: $f'(c) = 0$, $f''(c) < 0$ ⇒ max; $f''(c) > 0$ ⇒ min.
- Rolle: $f'(c) = 0$; LMVT: $f'(c) = \dfrac{f(b) - f(a)}{b - a}$ — need continuity on $[a,b]$ and differentiability on $(a,b)$. *(Beyond JEE Main 2027.)*
- Rate of change: $\dfrac{dy}{dt} = \dfrac{dy}{dx}\cdot\dfrac{dx}{dt}$.
- Approximation: $\Delta y \approx f'(x)\,\Delta x$ — small $\Delta x$.`,
    diagrams: r`Use the derivative visualiser: move $x_0$ and watch the tangent flatten at peaks and valleys.`,
    graphs: r`Sketch with a sign chart of $f'$: arrows up for $+$, down for $-$; turning points sit where arrows reverse.`,
    specialCases: r`- $f(x) = x^3$: $f'(0) = 0$ but no extremum (inflection point).
- $|x|$ has a minimum at $0$ where $f'$ does not exist.`,
    exceptions: r`Rolle's theorem fails for $|x|$ on $[-1, 1]$ (not differentiable at $0$) even though $f(-1) = f(1)$.`,
    assumptions: r`Hypotheses of the mean value theorems must be checked, not assumed.`,
    applications: r`Optimisation: maximum area with fixed perimeter, minimum cost, maximum volume of a box from a sheet.`,
    patterns: r`- Intervals of monotonicity of polynomial/log/exp functions.
- Local and absolute extrema, including on closed intervals.
- Tangent/normal equations and tangents from an external point.
- Verifying Rolle's/LMVT and finding $c$.
- Word problems on maxima/minima.`,
    misconceptions: r`- "$f'(c) = 0$ means an extremum." It may be an inflection point.
- "Local max is the largest value." The absolute maximum may be at an endpoint.`,
    traps: r`- Ignoring endpoints for absolute extrema.
- Normal slope $-1/m$, not $1/m$.`,
    summary: r`- Sign of $f'$ → monotonicity; sign change at critical point → extremum.
- Tangent $y - y_1 = m(x - x_1)$, normal slope $-1/m$.
- Rolle and LMVT need continuity on $[a,b]$ + differentiability on $(a,b)$.`,
  }, { diagrams: "derivative" }),

  note("indefinite-integrals", {
    introduction: r`**Integration** reverses differentiation: given $f'$, recover $f$ up to a constant. Fast recognition of standard forms and the right technique (substitution, parts, partial fractions) is essential for JEE.`,
    prerequisites: r`- Derivative table
- Trigonometric identities
- Partial fractions (factorising denominators)`,
    concept: r`$\int f(x)\,dx = F(x) + C$ means $F'(x) = f(x)$. Since constants differentiate to zero, there is a whole family of antiderivatives differing by $C$.`,
    theory: r`Techniques:
1. **Substitution** $t = g(x)$ when the integrand contains $g'(x)$.
2. **By parts** for products, choosing $u$ by ILATE (Inverse trig, Logarithmic, Algebraic, Trigonometric, Exponential).
3. **Partial fractions** for rational functions (make the fraction proper first).
4. **Trigonometric substitutions** $x = a\sin\theta$, $a\tan\theta$, $a\sec\theta$ for $\sqrt{a^2-x^2}$, $\sqrt{a^2+x^2}$, $\sqrt{x^2-a^2}$.`,
    definitions: r`- **Antiderivative / primitive:** $F$ with $F' = f$.
- **Constant of integration** $C$.`,
    principles: r`1. $\int [af(x) + bg(x)]dx = a\int f + b\int g$.
2. $\int f(ax + b)dx = \frac1a F(ax + b) + C$.
3. $\int \frac{f'(x)}{f(x)}dx = \ln|f(x)| + C$; $\int f'(x)[f(x)]^n dx = \frac{[f(x)]^{n+1}}{n+1} + C$ ($n \ne -1$).`,
    derivations: r`**Integration by parts.** From $(uv)' = u'v + uv'$: $\int uv'\,dx = uv - \int u'v\,dx$. Written with $v$ as the second function: $\int u\,v\,dx = u\int v\,dx - \int\left(u'\int v\,dx\right)dx$.

**$\int e^x[f(x) + f'(x)]dx = e^xf(x) + C$** — differentiate the right side to check.`,
    formulas: r`- $\int x^n dx = \dfrac{x^{n+1}}{n+1} + C$ ($n \ne -1$); $\int \dfrac{dx}{x} = \ln|x| + C$.
- $\int e^x dx = e^x + C$; $\int a^x dx = \dfrac{a^x}{\ln a} + C$ ($a > 0, a \ne 1$).
- $\int\sin x = -\cos x$, $\int\cos x = \sin x$, $\int\sec^2x = \tan x$, $\int\csc^2x = -\cot x$, $\int\sec x\tan x = \sec x$, $\int\csc x\cot x = -\csc x$ (each $+C$).
- $\int\tan x\,dx = \ln|\sec x| + C$, $\int\cot x\,dx = \ln|\sin x| + C$.
- $\int\sec x\,dx = \ln|\sec x + \tan x| + C$, $\int\csc x\,dx = \ln|\csc x - \cot x| + C$.
- $\int\dfrac{dx}{x^2 + a^2} = \dfrac1a\tan^{-1}\dfrac xa + C$.
- $\int\dfrac{dx}{x^2 - a^2} = \dfrac{1}{2a}\ln\left|\dfrac{x - a}{x + a}\right| + C$; $\int\dfrac{dx}{a^2 - x^2} = \dfrac1{2a}\ln\left|\dfrac{a + x}{a - x}\right| + C$.
- $\int\dfrac{dx}{\sqrt{a^2 - x^2}} = \sin^{-1}\dfrac xa + C$ ($|x| < a$).
- $\int\dfrac{dx}{\sqrt{x^2 \pm a^2}} = \ln\left|x + \sqrt{x^2 \pm a^2}\right| + C$.
- $\int\sqrt{a^2 - x^2}\,dx = \dfrac x2\sqrt{a^2 - x^2} + \dfrac{a^2}2\sin^{-1}\dfrac xa + C$.
- $\int\sqrt{x^2 \pm a^2}\,dx = \dfrac x2\sqrt{x^2 \pm a^2} \pm \dfrac{a^2}{2}\ln\left|x + \sqrt{x^2 \pm a^2}\right| + C$.
- By parts: $\int uv\,dx = u\int v\,dx - \int\left(u'\int v\,dx\right)dx$ (ILATE for choosing $u$).
- $\int e^x[f(x) + f'(x)]dx = e^xf(x) + C$.
- $\int e^{ax}\sin bx\,dx = \dfrac{e^{ax}}{a^2 + b^2}(a\sin bx - b\cos bx) + C$; $\int e^{ax}\cos bx\,dx = \dfrac{e^{ax}}{a^2+b^2}(a\cos bx + b\sin bx) + C$.
- $\int\dfrac{px + q}{ax^2 + bx + c}dx$: write $px + q = A\,\dfrac{d}{dx}(ax^2 + bx + c) + B$.`,
    diagrams: r`Think of the family $F(x) + C$ as vertical shifts of one curve; an initial condition picks one member.`,
    graphs: r`All antiderivatives of $f$ have parallel tangents at the same $x$ (slope $f(x)$).`,
    specialCases: r`- $\int\frac{dx}{1 + \sin x} = \tan x - \sec x + C$.
- $\int\frac{dx}{a\sin x + b\cos x}$: write $a\sin x + b\cos x = R\sin(x + \alpha)$.
- $\int\sin^2x\,dx = \frac x2 - \frac{\sin2x}{4} + C$ (use $\sin^2x = \frac{1-\cos2x}{2}$).`,
    exceptions: r`Some integrals have no elementary antiderivative, e.g. $\int e^{-x^2}dx$, $\int\frac{\sin x}{x}dx$.`,
    assumptions: r`Logarithm formulas use $|\cdot|$ so that they hold on every interval where the integrand is defined.`,
    applications: r`Displacement from velocity, work from force, solving differential equations.`,
    patterns: r`- Choose the right substitution for $\sqrt{\ }$ forms.
- By parts with ILATE; repeated parts for $e^{ax}\sin bx$.
- Partial fractions, including repeated and quadratic factors.
- $e^x[f + f']$ recognition.`,
    misconceptions: r`- "$\int\frac{dx}{x} = \ln x$." It is $\ln|x| + C$.
- "$\int f\cdot g = \int f\cdot\int g$." Use parts.`,
    traps: r`- Forgetting $+C$.
- Dividing by the coefficient in $\int f(ax + b)dx$.`,
    summary: r`- Standard table incl. $\int\frac{dx}{x^2+a^2}$, $\int\frac{dx}{\sqrt{a^2-x^2}}$, $\int\sec x$.
- Substitution, parts (ILATE), partial fractions.
- $\int e^x(f + f') = e^xf + C$.`,
  }),

  note("differential-equations", {
    introduction: r`A **differential equation** relates a function to its derivatives. Solving it recovers the function — the basis of growth/decay laws, cooling, motion and circuits.`,
    prerequisites: r`- Indefinite integrals
- Logarithms and exponentials`,
    concept: r`A differential equation tells you the slope at every point. Solving it means finding curves that follow those slopes everywhere. The general solution has as many arbitrary constants as the order of the equation.`,
    theory: r`First-order types in the syllabus:
1. **Variables separable:** $\frac{dy}{dx} = f(x)g(y) \Rightarrow \int\frac{dy}{g(y)} = \int f(x)dx$.
2. **Homogeneous:** $\frac{dy}{dx} = F\!\left(\frac yx\right)$; substitute $y = vx$.
3. **Linear:** $\frac{dy}{dx} + P(x)y = Q(x)$; multiply by the integrating factor $e^{\int P\,dx}$.`,
    definitions: r`- **Order:** highest derivative present.
- **Degree:** power of the highest-order derivative after the equation is made polynomial in derivatives (undefined otherwise, e.g. $y'' + \sin y' = 0$).
- **General solution:** contains arbitrary constants; **particular solution:** constants fixed by conditions.`,
    principles: r`1. Number of arbitrary constants in the general solution = order.
2. To form a DE from a family with $n$ constants, differentiate $n$ times and eliminate them.
3. Integrating factor makes the left side an exact derivative: $\frac{d}{dx}(y\cdot\text{IF})$.`,
    derivations: r`**Linear equation.** Multiply $y' + Py = Q$ by $\mu = e^{\int P\,dx}$, noting $\mu' = P\mu$:
$$\mu y' + \mu'y = \mu Q \;\Rightarrow\; \frac{d}{dx}(\mu y) = \mu Q \;\Rightarrow\; y\mu = \int Q\mu\,dx + C$$

**Exponential growth.** $\frac{dN}{dt} = kN \Rightarrow \int\frac{dN}N = \int k\,dt \Rightarrow N = N_0e^{kt}$.`,
    formulas: r`- Separable: $\dfrac{dy}{dx} = f(x)g(y) \Rightarrow \displaystyle\int\frac{dy}{g(y)} = \int f(x)\,dx + C$ — divide only where $g(y) \ne 0$.
- Homogeneous: put $y = vx$, $\dfrac{dy}{dx} = v + x\dfrac{dv}{dx}$.
- Linear in $y$: $\dfrac{dy}{dx} + Py = Q$, $\text{IF} = e^{\int P\,dx}$, $y\cdot\text{IF} = \int Q\cdot\text{IF}\,dx + C$.
- Linear in $x$: $\dfrac{dx}{dy} + P(y)x = Q(y)$, $\text{IF} = e^{\int P\,dy}$, $x\cdot\text{IF} = \int Q\cdot\text{IF}\,dy + C$.
- Useful exact forms: $d(xy) = x\,dy + y\,dx$; $d\!\left(\dfrac yx\right) = \dfrac{x\,dy - y\,dx}{x^2}$; $d(\ln xy) = \dfrac{x\,dy + y\,dx}{xy}$.
- Growth/decay: $\dfrac{dN}{dt} = kN \Rightarrow N = N_0e^{kt}$.`,
    diagrams: r`A slope field: short line segments with slope $f(x, y)$ at grid points; solution curves follow the segments.`,
    graphs: r`Solutions of $y' = ky$ are exponential curves; different $C$ give a family of non-intersecting curves.`,
    specialCases: r`- $y' = \frac{y}{x}$: solutions are lines through the origin $y = Cx$.
- $y' = -\frac xy$: circles $x^2 + y^2 = C$.`,
    exceptions: r`Dividing by $g(y)$ can lose constant solutions $y = y_0$ where $g(y_0) = 0$.`,
    assumptions: r`Functions involved are continuous on the interval considered.`,
    applications: r`Radioactive decay, Newton's law of cooling, population growth, RC/RL circuits.`,
    patterns: r`- Order and degree of a given DE.
- Form the DE of a family of curves (circles, parabolas).
- Solve linear DEs with initial conditions, then evaluate $y$ at a point.
- Homogeneous DEs.`,
    misconceptions: r`- "Degree is always defined." Not when derivatives appear inside $\sin$, $e^{(\cdot)}$, etc.
- "IF $= e^{\int P}$" — $P$ must be the coefficient after making the coefficient of $y'$ equal to 1.`,
    traps: r`- Forgetting $+C$ before applying the initial condition.
- Missing the alternative form $\frac{dx}{dy} + Px = Q$.`,
    summary: r`- Separable, homogeneous ($y = vx$), linear (IF $= e^{\int P}$).
- Order = number of arbitrary constants.
- $y\cdot\text{IF} = \int Q\cdot\text{IF}\,dx + C$.`,
  }),
];
