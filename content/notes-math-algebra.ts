import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const MATH_ALGEBRA_NOTES: NoteSeed[] = [
  note("sets-and-relations", {
    introduction: r`Sets give mathematics a precise language for collections, and relations describe how elements of sets are linked. JEE uses them for counting problems and for testing whether a relation is reflexive, symmetric, transitive or an equivalence relation.`,
    prerequisites: r`- Basic counting ($2^n$ choices for $n$ yes/no decisions)
- Ordered pairs and the Cartesian plane`,
    concept: r`A **set** is a well-defined collection. A **relation** from $A$ to $B$ is simply any subset of $A \times B$: you choose which ordered pairs $(a, b)$ are "related". Properties such as symmetry ask whether the chosen pairs come in mirror-image pairs.`,
    theory: r`For sets $A, B$: union $A \cup B$, intersection $A \cap B$, difference $A - B$, complement $A'$ (relative to a universal set $U$).

A relation $R$ on a set $A$ is
- **reflexive** if $(a,a) \in R$ for every $a \in A$;
- **symmetric** if $(a,b) \in R \Rightarrow (b,a) \in R$;
- **transitive** if $(a,b),(b,c) \in R \Rightarrow (a,c) \in R$;
- an **equivalence relation** if it is all three. Its equivalence classes partition $A$ into disjoint pieces.`,
    definitions: r`- **Power set** $P(A)$: the set of all subsets of $A$.
- **Cartesian product** $A \times B = \{(a,b): a \in A, b \in B\}$.
- **Identity relation** $I_A = \{(a,a): a \in A\}$.
- **Equivalence class** $[a] = \{x \in A : (x,a) \in R\}$.`,
    principles: r`1. Inclusion–exclusion counts each element exactly once.
2. De Morgan's laws: $(A \cup B)' = A' \cap B'$ and $(A \cap B)' = A' \cup B'$.
3. Two equivalence classes are either identical or disjoint.`,
    derivations: r`**Number of relations on an $n$-element set.** $A \times A$ has $n^2$ ordered pairs; each pair is either in $R$ or not, so there are $2^{n^2}$ relations.

**Reflexive relations.** The $n$ diagonal pairs $(a,a)$ are forced in; the other $n^2 - n$ pairs are free: $2^{n^2 - n}$.

**Symmetric relations.** Diagonal pairs ($n$) are free, and the $\frac{n(n-1)}{2}$ off-diagonal pairs must be chosen together with their mirror images: $2^{n}\cdot 2^{n(n-1)/2} = 2^{n(n+1)/2}$.`,
    formulas: r`- $n(A \cup B) = n(A) + n(B) - n(A \cap B)$ — for any finite sets.
- $n(A \cup B \cup C) = \sum n(A) - \sum n(A \cap B) + n(A \cap B \cap C)$ — finite sets.
- $n(A - B) = n(A) - n(A \cap B)$.
- $n(P(A)) = 2^{n}$ when $n(A) = n$.
- $n(A \times B) = n(A)\,n(B)$.
- Number of relations from $A$ ($m$ elements) to $B$ ($n$ elements): $2^{mn}$.
- Relations on an $n$-set: $2^{n^2}$; reflexive: $2^{n(n-1)}$; symmetric: $2^{n(n+1)/2}$; reflexive and symmetric: $2^{n(n-1)/2}$.
- De Morgan: $(A \cup B)' = A' \cap B'$, $(A \cap B)' = A' \cup B'$ — complements taken in the same universal set.`,
    diagrams: r`Venn diagrams: draw overlapping circles for $A$, $B$ (and $C$) inside a rectangle $U$. Fill regions from the innermost (all three) outward when solving survey-type problems.`,
    graphs: r`A relation on a small set can be drawn as a directed graph: a loop at every vertex means reflexive; every arrow having a reverse arrow means symmetric.`,
    specialCases: r`- The empty relation on a non-empty set is symmetric and transitive but **not** reflexive.
- The universal relation $A \times A$ is an equivalence relation.
- $\{(1,1)\}$ on $\{1,2\}$ is symmetric and transitive but not reflexive.`,
    exceptions: r`Symmetric and transitive does **not** imply reflexive: an element related to nothing breaks the usual "proof".`,
    assumptions: r`Counting formulas assume finite sets. Complements require a stated universal set.`,
    applications: r`Survey problems (how many study neither subject), database joins, and classifying objects into equivalence classes (e.g. congruence modulo $n$).`,
    patterns: r`- Check whether a given relation is reflexive / symmetric / transitive.
- Count relations with given properties.
- Find the minimum number of pairs to add to make a relation an equivalence relation.
- Three-set Venn problems.`,
    misconceptions: r`- "A relation must relate every element." No — any subset of $A \times A$ is a relation.
- "Transitive needs three distinct elements." The condition also applies when elements repeat.`,
    traps: r`- Forgetting the pair $(a,a)$ cases when testing transitivity.
- Using $2^{n^2}$ for relations from $A$ to $B$ with different sizes ($2^{mn}$).`,
    summary: r`- Inclusion–exclusion; De Morgan; $|P(A)| = 2^n$.
- Relations on $n$ elements: $2^{n^2}$ total, $2^{n(n-1)}$ reflexive, $2^{n(n+1)/2}$ symmetric.
- Equivalence = reflexive + symmetric + transitive; classes partition the set.`,
  }),

  note("functions", {
    introduction: r`A **function** assigns to every input exactly one output. Functions are the backbone of calculus, and JEE tests domain and range, one-one/onto behaviour, composition, inverses and graph transformations.`,
    prerequisites: r`- Relations and Cartesian products
- Solving inequalities
- Graphs of $x^2$, $|x|$, $\sin x$, $e^x$, $\ln x$`,
    concept: r`Think of a function as a machine: each allowed input (the **domain**) produces exactly one output. The set of outputs actually produced is the **range**. A vertical line meets the graph of a function at most once.`,
    theory: r`$f: A \to B$ is
- **one-one (injective)** if $f(x_1) = f(x_2) \Rightarrow x_1 = x_2$;
- **onto (surjective)** if its range equals $B$;
- **bijective** if both — exactly then $f^{-1}$ exists.

Composition: $(g \circ f)(x) = g(f(x))$, defined when the range of $f$ lies in the domain of $g$. In general $g \circ f \ne f \circ g$.`,
    definitions: r`- **Even function:** $f(-x) = f(x)$ (graph symmetric about the $y$-axis).
- **Odd function:** $f(-x) = -f(x)$ (symmetric about the origin).
- **Periodic:** $f(x + T) = f(x)$ for all $x$; the least such $T > 0$ is the period.
- **Greatest integer** $[x]$: largest integer $\le x$. **Fractional part** $\{x\} = x - [x] \in [0, 1)$.`,
    principles: r`1. Domain first: exclude zero denominators, negative values under even roots, non-positive arguments of logarithms.
2. A strictly monotonic function is one-one.
3. The graph of $f^{-1}$ is the reflection of the graph of $f$ in the line $y = x$.`,
    derivations: r`**Number of one-one functions** from an $m$-set to an $n$-set ($m \le n$): the first element has $n$ images, the next $n - 1$, …, giving $n(n-1)\cdots(n-m+1) = {}^nP_m$.

**Number of onto functions** from an $m$-set to an $n$-set ($m \ge n$): by inclusion–exclusion on the images missed,
$$\sum_{k=0}^{n} (-1)^k \binom{n}{k}(n-k)^m$$`,
    formulas: r`- Number of functions $A \to B$: $n^m$ (where $|A| = m$, $|B| = n$).
- One-one functions: $ {}^nP_m = \dfrac{n!}{(n-m)!}$ — needs $m \le n$, otherwise $0$.
- Onto functions: $\sum_{k=0}^{n}(-1)^k\binom{n}{k}(n-k)^m$ — needs $m \ge n$; for $m = n$ this equals $n!$.
- Bijections between two $n$-sets: $n!$.
- $(f^{-1})^{-1} = f$, $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$ — when both are bijective.
- Every function on a symmetric domain: $f(x) = \underbrace{\tfrac{f(x)+f(-x)}{2}}_{\text{even}} + \underbrace{\tfrac{f(x)-f(-x)}{2}}_{\text{odd}}$.
- Period of $\sin(ax+b)$, $\cos(ax+b)$: $\dfrac{2\pi}{|a|}$; of $\tan(ax+b)$: $\dfrac{\pi}{|a|}$.
- $x - 1 < [x] \le x$; $[x + n] = [x] + n$ for integer $n$.
- Logarithms ($a, b > 0$, $a, b \ne 1$, $x, y > 0$): $\log_a(xy) = \log_ax + \log_ay$, $\log_a\dfrac xy = \log_ax - \log_ay$, $\log_ax^n = n\log_ax$, $\log_ab = \dfrac{\log_cb}{\log_ca}$, $\log_ab\cdot\log_ba = 1$, $a^{\log_ax} = x$.
- Modulus: $|x| < a \iff -a < x < a$; $|x| > a \iff x < -a$ or $x > a$ ($a > 0$); $|x + y| \le |x| + |y|$.
- Domains: $\sqrt{f(x)}$ needs $f(x) \ge 0$; $\log f(x)$ needs $f(x) > 0$; $\sin^{-1}f(x)$ needs $-1 \le f(x) \le 1$.`,
    diagrams: r`Use the transformation lab to see how $y = a\,f(b(x-h)) + k$ moves and stretches a graph.`,
    graphs: r`- $y = [x]$: steps, closed dot on the left end of each step.
- $y = \{x\}$: saw-tooth with period 1.
- $y = |f(x)|$: reflect the parts below the $x$-axis upward.
- $y = f(|x|)$: keep the right half, mirror it to the left.`,
    specialCases: r`- $f(x) = x$ is its own inverse; so is $f(x) = 1/x$ on $x \ne 0$.
- The constant function is even; $f(x) = 0$ is both even and odd.
- A function that is its own inverse has a graph symmetric about $y = x$.`,
    exceptions: r`$f(x) = x^2$ on $\mathbb{R}$ is not one-one; restricting the domain to $[0, \infty)$ makes it invertible ($f^{-1}(x) = \sqrt x$).`,
    assumptions: r`Unless stated, the domain is the largest set of real numbers for which the formula makes sense.`,
    applications: r`Modelling (cost as a function of quantity), encryption (bijections), and every calculus problem.`,
    patterns: r`- Domain and range of expressions with roots, logs and $[x]$.
- Counting one-one and onto functions.
- Finding $f^{-1}$ and composite functions; solving $f(f(x)) = x$.
- Periodicity of combinations (LCM of periods).`,
    misconceptions: r`- "$f^{-1}(x) = 1/f(x)$." The inverse function is not the reciprocal.
- "Range = codomain." Only for onto functions.`,
    traps: r`- Forgetting that $\log$ needs a positive argument **and** base $\ne 1$.
- Domain of $g \circ f$: must also satisfy the domain of $f$.`,
    summary: r`- Functions $A \to B$: $n^m$; one-one $ {}^nP_m$; bijections $n!$.
- Inverse exists $\iff$ bijective; graph reflects in $y = x$.
- Periods: $2\pi/|a|$ for sin/cos, $\pi/|a|$ for tan.`,
  }, { diagrams: "transform" }),

  note("complex-numbers", {
    introduction: r`Complex numbers $z = x + iy$ with $i^2 = -1$ make every polynomial solvable and turn geometry in the plane into algebra. JEE combines them with loci, rotation and roots of unity.`,
    prerequisites: r`- Coordinate geometry of the plane
- Trigonometric identities
- Quadratic equations`,
    concept: r`Picture $z = x + iy$ as the point $(x, y)$ (the Argand plane). Its distance from the origin is the **modulus** $|z|$ and its angle with the positive $x$-axis is the **argument**. Multiplying complex numbers multiplies their lengths and adds their angles — that is why they are perfect for rotations.`,
    theory: r`$$z = x + iy = r(\cos\theta + i\sin\theta) = re^{i\theta}, \quad r = |z| = \sqrt{x^2 + y^2}, \quad \tan\theta = \frac yx$$
The **principal argument** lies in $(-\pi, \pi]$; choose the quadrant from the signs of $x$ and $y$.

The conjugate $\bar z = x - iy$ is the reflection of $z$ in the real axis.`,
    definitions: r`- **Real part** $\operatorname{Re} z = x$, **imaginary part** $\operatorname{Im} z = y$.
- **Purely imaginary:** $x = 0$, $y \ne 0$.
- **Cube roots of unity:** $1, \omega, \omega^2$ with $\omega = e^{2\pi i/3} = -\tfrac12 + \tfrac{\sqrt3}{2}i$.`,
    principles: r`1. $|z_1 z_2| = |z_1||z_2|$ and $\arg(z_1z_2) = \arg z_1 + \arg z_2$ (up to multiples of $2\pi$).
2. $|z_1 - z_2|$ is the distance between the points $z_1$ and $z_2$.
3. Multiplying by $e^{i\alpha}$ rotates a point by $\alpha$ anticlockwise about the origin.`,
    derivations: r`**Cube roots of unity.** $z^3 = 1 \Rightarrow (z-1)(z^2+z+1) = 0$. The non-real roots satisfy $z^2 + z + 1 = 0$, so $1 + \omega + \omega^2 = 0$ and $\omega^3 = 1$.

**De Moivre.** $(\cos\theta + i\sin\theta)^n = (e^{i\theta})^n = e^{in\theta} = \cos n\theta + i\sin n\theta$ for integer $n$.`,
    formulas: r`- $|z| = \sqrt{x^2+y^2}$, $z\bar z = |z|^2$, $z^{-1} = \dfrac{\bar z}{|z|^2}$ ($z \ne 0$).
- $\overline{z_1 \pm z_2} = \bar z_1 \pm \bar z_2$, $\overline{z_1z_2} = \bar z_1\bar z_2$, $\overline{(z_1/z_2)} = \bar z_1/\bar z_2$.
- $\operatorname{Re} z = \dfrac{z + \bar z}{2}$, $\operatorname{Im} z = \dfrac{z - \bar z}{2i}$; $z$ real $\iff z = \bar z$.
- $|z_1 z_2| = |z_1||z_2|$, $\left|\dfrac{z_1}{z_2}\right| = \dfrac{|z_1|}{|z_2|}$.
- $\arg(z_1z_2) = \arg z_1 + \arg z_2$, $\arg(z_1/z_2) = \arg z_1 - \arg z_2$ — equality up to $2k\pi$.
- Triangle inequality: $\big||z_1| - |z_2|\big| \le |z_1 + z_2| \le |z_1| + |z_2|$.
- $|z_1 + z_2|^2 = |z_1|^2 + |z_2|^2 + 2\operatorname{Re}(z_1\bar z_2)$.
- De Moivre: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$ — integer $n$. *(Beyond JEE Main 2027.)*
- $n$th roots of unity: $e^{2k\pi i/n}$, $k = 0, 1, \dots, n-1$; their sum is $0$ ($n \ge 2$). *(Beyond JEE Main 2027.)*
- $1 + \omega + \omega^2 = 0$, $\omega^3 = 1$, $\bar\omega = \omega^2$. *(Beyond JEE Main 2027.)*
- $i^{4k} = 1$, $i^{4k+1} = i$, $i^{4k+2} = -1$, $i^{4k+3} = -i$.
- Circle: $|z - z_0| = r$. Perpendicular bisector: $|z - z_1| = |z - z_2|$.
- Rotation: $\dfrac{z_3 - z_1}{z_2 - z_1} = \dfrac{|z_3 - z_1|}{|z_2 - z_1|}e^{i\theta}$, where $\theta$ is the angle from $z_1z_2$ to $z_1z_3$.
- Section formula: $z = \dfrac{mz_2 + nz_1}{m + n}$ divides $z_1z_2$ internally in $m:n$.`,
    diagrams: r`Argand plane: plot $z$ as a point; $|z|$ is its distance from $O$, $\arg z$ its angle. $\bar z$ is its mirror image in the real axis; $-z$ is its reflection through $O$.`,
    graphs: r`- $|z - a| = r$: circle. $|z - a| + |z - b| = 2c$ ($2c > |a-b|$): ellipse with foci $a, b$.
- $\arg(z - a) = \alpha$: a ray from $a$ (not the full line).`,
    specialCases: r`- $|z| = 1 \Rightarrow \bar z = 1/z$.
- Points $z_1, z_2, z_3$ are collinear iff $\dfrac{z_3 - z_1}{z_2 - z_1}$ is real.
- Equilateral triangle: $z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1$.`,
    exceptions: r`$\arg 0$ is undefined. $\sqrt{a}\sqrt{b} = \sqrt{ab}$ fails when both $a, b$ are negative: $\sqrt{-1}\sqrt{-1} = -1 \ne \sqrt{1}$.`,
    assumptions: r`Principal argument convention $(-\pi, \pi]$ unless the question uses $[0, 2\pi)$.`,
    applications: r`AC circuit analysis (impedance), signal processing, and rotations in 2D geometry.`,
    patterns: r`- Locus of $z$ given a modulus or argument condition.
- Maximum/minimum of $|z|$ under a constraint (geometry: distance from a circle).
- Powers of $i$ and $\omega$; simplifying $(1 + \omega)^n$.
- Rotation to find vertices of squares or equilateral triangles.`,
    misconceptions: r`- "$\arg(z) = \tan^{-1}(y/x)$ always." The quadrant must be adjusted.
- "Complex numbers can be ordered." $z_1 < z_2$ is meaningless unless both are real.`,
    traps: r`- Using $(-\pi, \pi]$ vs $[0, 2\pi)$ inconsistently.
- Squaring both sides of $|z - a| = |z - b|$ correctly gives a line, not a circle.`,
    summary: r`- $z = re^{i\theta}$; $|z_1z_2| = |z_1||z_2|$; arguments add.
- $1 + \omega + \omega^2 = 0$, $\omega^3 = 1$; $n$th roots sum to $0$. *(Beyond JEE Main 2027.)*
- Rotation by $\theta$: multiply by $e^{i\theta}$.`,
  }),

  note("matrices", {
    introduction: r`A **matrix** is a rectangular array of numbers. Matrices represent linear transformations and systems of equations; JEE tests algebra of matrices, special types and their properties.`,
    prerequisites: r`- Solving simultaneous equations
- Basic algebra`,
    concept: r`Multiplying matrices composes the transformations they represent: row of the first times column of the second. Because doing transformation $B$ then $A$ is generally different from $A$ then $B$, matrix multiplication is **not commutative**.`,
    theory: r`For $A = [a_{ij}]_{m\times n}$ and $B = [b_{jk}]_{n\times p}$:
$$(AB)_{ik} = \sum_{j=1}^{n} a_{ij}b_{jk}$$
$AB$ exists only if the number of columns of $A$ equals the number of rows of $B$. The transpose $A^T$ swaps rows and columns.`,
    definitions: r`- **Square, diagonal, scalar, identity ($I$), zero, upper/lower triangular** matrices.
- **Symmetric:** $A^T = A$. **Skew-symmetric:** $A^T = -A$.
- **Idempotent:** $A^2 = A$. **Involutory:** $A^2 = I$. **Nilpotent:** $A^k = O$ for some $k$. **Orthogonal:** $AA^T = I$.
- **Trace:** sum of diagonal elements.`,
    principles: r`1. $(AB)C = A(BC)$ and $A(B + C) = AB + AC$, but $AB \ne BA$ in general.
2. $AB = O$ does not imply $A = O$ or $B = O$.
3. Every square matrix is uniquely the sum of a symmetric and a skew-symmetric matrix.`,
    derivations: r`**Symmetric + skew decomposition.** $P = \frac12(A + A^T)$ satisfies $P^T = \frac12(A^T + A) = P$; $Q = \frac12(A - A^T)$ satisfies $Q^T = -Q$; and $P + Q = A$.

**Diagonal of a skew-symmetric matrix.** $a_{ii} = -a_{ii} \Rightarrow a_{ii} = 0$.`,
    formulas: r`- $(A^T)^T = A$, $(A + B)^T = A^T + B^T$, $(kA)^T = kA^T$, $(AB)^T = B^TA^T$.
- $A = \tfrac12(A + A^T) + \tfrac12(A - A^T)$ — square $A$.
- $\operatorname{tr}(A + B) = \operatorname{tr}A + \operatorname{tr}B$, $\operatorname{tr}(kA) = k\operatorname{tr}A$, $\operatorname{tr}(AB) = \operatorname{tr}(BA)$ — when both products are defined.
- $A^mA^n = A^{m+n}$, $(A^m)^n = A^{mn}$ — square $A$.
- $(A + B)^2 = A^2 + AB + BA + B^2$ — equals $A^2 + 2AB + B^2$ **only if** $AB = BA$.
- Number of matrices of order $m \times n$ with entries from a $k$-element set: $k^{mn}$.
- For symmetric $n\times n$ matrices, independent entries: $\frac{n(n+1)}{2}$; skew-symmetric: $\frac{n(n-1)}{2}$.`,
    diagrams: r`Draw row $i$ of $A$ horizontally and column $k$ of $B$ vertically; $(AB)_{ik}$ is their dot product.`,
    graphs: r`A $2\times 2$ matrix maps the unit square to a parallelogram; its determinant is the signed area of that parallelogram.`,
    specialCases: r`- $AI = IA = A$.
- If $A$ is symmetric (or skew), so is $kA$; $A^n$ of a skew matrix is symmetric for even $n$ and skew for odd $n$.
- Diagonal matrices commute with each other.`,
    exceptions: r`Cancellation fails: $AB = AC$ does not give $B = C$ unless $A$ is invertible.`,
    assumptions: r`Entries are real unless stated.`,
    applications: r`Computer graphics (rotations/scaling), Markov chains, and solving linear systems.`,
    patterns: r`- Computing $A^n$ by finding a pattern or using $A^2 = kA$.
- Properties of symmetric/skew/orthogonal matrices.
- Counting matrices satisfying a condition.
- Trace and transpose identities.`,
    misconceptions: r`- "$(AB)^T = A^TB^T$." The order reverses.
- "$A^2 = O \Rightarrow A = O$." Counter-example: $\begin{pmatrix}0&1\\0&0\end{pmatrix}$.`,
    traps: r`- Expanding $(A+B)^2$ as $A^2 + 2AB + B^2$ without checking commutativity.
- Multiplying matrices of incompatible orders.`,
    summary: r`- $(AB)^T = B^TA^T$; $AB \ne BA$ in general.
- $A = $ symmetric part $+$ skew part.
- Skew-symmetric diagonals are zero; $\operatorname{tr}(AB) = \operatorname{tr}(BA)$.`,
  }),

  note("determinants", {
    introduction: r`The **determinant** is a single number attached to a square matrix. It tells us whether the matrix is invertible, measures area/volume scaling, and decides whether a linear system has a unique solution.`,
    prerequisites: r`- Matrix algebra
- Solving linear equations`,
    concept: r`For a $2\times 2$ matrix, the determinant $ad - bc$ is the (signed) area of the parallelogram formed by its column vectors. If that area is zero, the columns are parallel and the transformation squashes the plane flat — it cannot be undone, so no inverse exists.`,
    theory: r`$$\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$$
For $3\times 3$, expand along any row or column using cofactors $C_{ij} = (-1)^{i+j}M_{ij}$, where $M_{ij}$ is the minor.

$\operatorname{adj} A$ is the transpose of the cofactor matrix, and $A(\operatorname{adj}A) = (\operatorname{adj}A)A = |A|I$.`,
    definitions: r`- **Minor** $M_{ij}$: determinant left after deleting row $i$, column $j$.
- **Cofactor** $C_{ij} = (-1)^{i+j}M_{ij}$.
- **Singular matrix:** $|A| = 0$.`,
    principles: r`1. Swapping two rows changes the sign; two equal rows give $0$.
2. Adding a multiple of one row to another leaves the determinant unchanged.
3. Multiplying one row by $k$ multiplies the determinant by $k$.
4. $A^{-1}$ exists $\iff |A| \ne 0$.`,
    derivations: r`**Inverse.** From $A\,\operatorname{adj}A = |A|I$, dividing by $|A| \ne 0$ gives $A^{-1} = \dfrac{\operatorname{adj}A}{|A|}$.

**$|\operatorname{adj}A| = |A|^{n-1}$.** Taking determinants of $A\,\operatorname{adj}A = |A|I_n$: $|A||\operatorname{adj}A| = |A|^n$.`,
    formulas: r`- $|A^T| = |A|$, $|AB| = |A||B|$, $|kA| = k^n|A|$ — $A$ of order $n$.
- $|A^{-1}| = \dfrac{1}{|A|}$, $A^{-1} = \dfrac{\operatorname{adj}A}{|A|}$ — needs $|A| \ne 0$.
- $|\operatorname{adj}A| = |A|^{n-1}$, $\operatorname{adj}(\operatorname{adj}A) = |A|^{n-2}A$, $|\operatorname{adj}(\operatorname{adj}A)| = |A|^{(n-1)^2}$.
- $\operatorname{adj}(AB) = \operatorname{adj}B\,\operatorname{adj}A$, $(AB)^{-1} = B^{-1}A^{-1}$, $(A^T)^{-1} = (A^{-1})^T$.
- Determinant of an odd-order skew-symmetric matrix $= 0$.
- Area of triangle with vertices $(x_i, y_i)$: $\dfrac12\left|\begin{vmatrix}x_1&y_1&1\\x_2&y_2&1\\x_3&y_3&1\end{vmatrix}\right|$; zero $\iff$ collinear.
- Cramer's rule (3 equations): $x = \dfrac{D_1}{D}$, $y = \dfrac{D_2}{D}$, $z = \dfrac{D_3}{D}$ — valid only when $D \ne 0$.
- Consistency: $D \ne 0$ → unique solution; $D = 0$ and some $D_i \ne 0$ → no solution; $D = 0$ and all $D_i = 0$ → infinitely many **or** none (check further).
- Homogeneous system $AX = O$: non-trivial solution $\iff |A| = 0$.`,
    diagrams: r`Sarrus' diagram for $3\times3$: copy the first two columns to the right, add products along the three down-diagonals and subtract the three up-diagonals.`,
    graphs: r`$|\det|$ of a $2\times2$ matrix = area scale factor of the linear map; sign negative means orientation is flipped.`,
    specialCases: r`- Triangular matrix: determinant = product of diagonal entries.
- $\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix} = (a-b)(b-c)(c-a)$.`,
    exceptions: r`$|A + B| \ne |A| + |B|$ in general.`,
    assumptions: r`Determinants are defined only for square matrices.`,
    applications: r`Testing collinearity, finding areas, solving and classifying linear systems, and computing inverses.`,
    patterns: r`- Evaluate determinants using row operations and factorisation.
- Values of a parameter for which a system has no / unique / infinitely many solutions.
- Properties of $\operatorname{adj}A$ with given $|A|$.
- $|kA|$ and $|A^{-1}|$ calculations.`,
    misconceptions: r`- "$|2A| = 2|A|$." For order $n$ it is $2^n|A|$.
- "$D = 0$ means infinitely many solutions." It can also mean no solution.`,
    traps: r`- Sign of cofactors $(-1)^{i+j}$.
- Forgetting the order $n$ in $|\operatorname{adj}A| = |A|^{n-1}$.`,
    summary: r`- $|AB| = |A||B|$, $|kA| = k^n|A|$, $|\operatorname{adj}A| = |A|^{n-1}$.
- $A^{-1} = \operatorname{adj}A/|A|$, needs $|A| \ne 0$.
- Cramer: $D \ne 0$ unique; homogeneous non-trivial $\iff D = 0$.`,
  }),

  note("counting", {
    introduction: r`Permutations and combinations count arrangements and selections without listing them. They feed directly into probability and the binomial theorem.`,
    prerequisites: r`- Factorials: $n! = 1\cdot2\cdots n$, $0! = 1$
- Sets and basic logic`,
    concept: r`**Multiplication principle:** if one job can be done in $m$ ways and, after it, a second in $n$ ways, both together can be done in $mn$ ways. **Addition principle:** if they are alternatives (either/or), there are $m + n$ ways. Everything else is built from these two rules.`,
    theory: r`Arranging $r$ of $n$ distinct objects in order: $ {}^nP_r = \dfrac{n!}{(n-r)!}$. Choosing $r$ of $n$ without order: $ {}^nC_r = \dfrac{n!}{r!(n-r)!}$. Each selection of $r$ objects can be ordered in $r!$ ways, so $ {}^nP_r = r!\,{}^nC_r$.`,
    definitions: r`- **Permutation:** ordered arrangement.
- **Combination:** unordered selection.
- **Derangement:** arrangement in which no object is in its original place.`,
    principles: r`1. Decide first whether order matters.
2. Handle restrictions first (fix the restricted objects, then arrange the rest).
3. "Together" — tie them as one unit; "never together" — total minus together, or use the gap method.`,
    derivations: r`**Identical objects.** Arranging $n$ objects with $p$ alike of one kind and $q$ alike of another: treat all as distinct ($n!$), then divide by the $p!\,q!$ rearrangements that look the same: $\dfrac{n!}{p!\,q!}$.

**Distributing identical objects (stars and bars).** Writing $n$ identical items and $r - 1$ dividers in a row, the number of non-negative solutions of $x_1 + \dots + x_r = n$ is $\binom{n + r - 1}{r - 1}$.`,
    formulas: r`- $ {}^nP_r = \dfrac{n!}{(n-r)!}$, $ {}^nC_r = \dfrac{n!}{r!(n-r)!}$ — $0 \le r \le n$.
- $ {}^nC_r = {}^nC_{n-r}$; $ {}^nC_r + {}^nC_{r-1} = {}^{n+1}C_r$ (Pascal); $\dfrac{{}^nC_r}{{}^nC_{r-1}} = \dfrac{n - r + 1}{r}$.
- $ {}^nC_x = {}^nC_y \Rightarrow x = y$ or $x + y = n$.
- Arrangements with repetition allowed: $n^r$.
- $n$ objects with $p, q, r$ alike: $\dfrac{n!}{p!\,q!\,r!}$.
- Circular arrangements of $n$ distinct objects: $(n-1)!$; if clockwise = anticlockwise (necklace, garland): $\dfrac{(n-1)!}{2}$ ($n \ge 3$). *(Beyond JEE Main 2027.)*
- Selections of at least one from $n$ distinct objects: $2^n - 1$.
- Selections from $p$ alike, $q$ alike, $r$ alike (at least one item): $(p+1)(q+1)(r+1) - 1$.
- Non-negative integer solutions of $x_1 + \dots + x_r = n$: $\binom{n+r-1}{r-1}$; positive solutions: $\binom{n-1}{r-1}$.
- Dividing $m + n$ distinct objects into groups of $m$ and $n$ ($m \ne n$): $\dfrac{(m+n)!}{m!\,n!}$; into two equal groups of $n$: $\dfrac{(2n)!}{2!\,(n!)^2}$. *(Beyond JEE Main 2027.)*
- Derangements: $D_n = n!\left(1 - \dfrac1{1!} + \dfrac1{2!} - \dots + \dfrac{(-1)^n}{n!}\right)$; $D_2 = 1$, $D_3 = 2$, $D_4 = 9$. *(Beyond JEE Main 2027.)*
- Number of divisors of $N = p_1^{a_1}p_2^{a_2}\cdots$: $(a_1+1)(a_2+1)\cdots$.
- Points in a plane, no three collinear: lines $ {}^nC_2$, triangles $ {}^nC_3$; diagonals of an $n$-gon: $ {}^nC_2 - n$.`,
    diagrams: r`Gap method: place the unrestricted objects first (e.g. $5$ boys create $6$ gaps), then choose gaps for the objects that must be separated.`,
    graphs: r`Pascal's triangle: each entry is the sum of the two above it; row $n$ lists $ {}^nC_0, \dots, {}^nC_n$.`,
    specialCases: r`- $ {}^nC_0 = {}^nC_n = 1$, $ {}^nP_n = n!$.
- $ {}^nC_r$ is largest at $r = n/2$ ($n$ even) or $r = (n\pm1)/2$ ($n$ odd).`,
    exceptions: r`The necklace formula $(n-1)!/2$ does not apply when the arrangement has a fixed reference (e.g. a round table with numbered seats).`,
    assumptions: r`Objects are distinct unless stated; "selection" means order does not matter.`,
    applications: r`Probability, password and code counting, tournament scheduling.`,
    patterns: r`- Word arrangements with repeated letters and rank of a word in dictionary order.
- Committees with conditions ("at least one woman").
- Distribution of identical/distinct objects.
- Geometric counting (triangles, diagonals, intersection points).`,
    misconceptions: r`- "Choosing a committee and its chair is just a combination." It is $ {}^nC_r \times r$.
- "Circular arrangements are always $(n-1)!/2$." Only when reflections are identical.`,
    traps: r`- Double counting in "at least one" problems — use complement.
- Dividing by $2!$ when groups are of **equal** size and unlabelled, not otherwise.`,
    summary: r`- $ {}^nP_r = r!\,{}^nC_r$; Pascal's rule; $ {}^nC_r = {}^nC_{n-r}$.
- Identical objects: $n!/(p!q!\dots)$; circular $(n-1)!$.
- Stars and bars: $\binom{n+r-1}{r-1}$.`,
  }),

  note("binomial-theorem", {
    introduction: r`The **binomial theorem** expands $(x + y)^n$ for a positive integer $n$. It connects algebra with combinations and is used for approximations, divisibility and coefficient problems.`,
    prerequisites: r`- Combinations $ {}^nC_r$
- Laws of indices`,
    concept: r`In $(x + y)^n = (x+y)(x+y)\cdots(x+y)$, each term of the expansion picks $x$ or $y$ from every bracket. Picking $y$ from exactly $r$ brackets can be done in $ {}^nC_r$ ways, which gives the coefficient of $x^{n-r}y^r$.`,
    theory: r`$$(x+y)^n = \sum_{r=0}^{n} {}^nC_r\,x^{n-r}y^r, \quad n \in \mathbb{N}$$
There are $n + 1$ terms; the $(r+1)$th term is $T_{r+1} = {}^nC_r\,x^{n-r}y^r$.`,
    definitions: r`- **General term** $T_{r+1}$.
- **Middle term:** $T_{n/2+1}$ if $n$ is even; $T_{(n+1)/2}$ and $T_{(n+3)/2}$ if $n$ is odd.
- **Binomial coefficients** $C_r = {}^nC_r$.`,
    principles: r`1. Coefficients equidistant from the ends are equal ($ {}^nC_r = {}^nC_{n-r}$).
2. Substituting special values ($x = 1$, $x = -1$) produces coefficient sums.
3. Differentiating or integrating $(1+x)^n$ generates weighted sums.`,
    derivations: r`**Sum of coefficients.** Put $x = y = 1$: $\sum {}^nC_r = 2^n$. Put $x = 1, y = -1$: $\sum (-1)^r\,{}^nC_r = 0$, so the even-indexed and odd-indexed sums are equal, each $2^{n-1}$.

**$\sum r\,{}^nC_r$.** Differentiate $(1+x)^n = \sum {}^nC_r x^r$ and set $x = 1$: $n2^{n-1}$.

**$\sum ({}^nC_r)^2$.** Compare the coefficient of $x^n$ in $(1+x)^n(1+x)^n = (1+x)^{2n}$: $ {}^{2n}C_n$.`,
    formulas: r`- $(x+y)^n = \sum_{r=0}^n {}^nC_r x^{n-r}y^r$ — $n$ a positive integer.
- $T_{r+1} = {}^nC_r x^{n-r}y^r$; term independent of $x$: set the power of $x$ in $T_{r+1}$ to $0$.
- $\sum_{r=0}^n {}^nC_r = 2^n$; $C_0 + C_2 + \dots = C_1 + C_3 + \dots = 2^{n-1}$.
- $\sum r\,C_r = n2^{n-1}$; $\sum r^2 C_r = n(n+1)2^{n-2}$.
- $\sum C_r^2 = {}^{2n}C_n$; $\sum C_rC_{r+k} = {}^{2n}C_{n+k}$.
- $\sum \dfrac{C_r}{r+1} = \dfrac{2^{n+1} - 1}{n+1}$.
- Greatest coefficient: $ {}^nC_{n/2}$ ($n$ even); $ {}^nC_{(n\pm1)/2}$ ($n$ odd).
- $\dfrac{T_{r+1}}{T_r} = \dfrac{n - r + 1}{r}\cdot\dfrac yx$ — used to find the numerically greatest term.
- $(1+x)^n + (1-x)^n = 2[C_0 + C_2x^2 + \dots]$; $(1+x)^n - (1-x)^n = 2[C_1x + C_3x^3 + \dots]$.`,
    diagrams: r`Pascal's triangle gives the coefficients for small $n$: row 4 is $1, 4, 6, 4, 1$.`,
    graphs: r`Plotting $ {}^nC_r$ against $r$ gives a symmetric "hill" peaking at the middle term(s).`,
    specialCases: r`- $(1 + x)^n \approx 1 + nx$ when $|x|$ is very small (first-order approximation).
- Remainder problems: write $a^n = (bk \pm 1)^n$ and expand.`,
    exceptions: r`The expansion for negative or fractional index is an infinite series valid only for $|x| < 1$; it is **not** part of the current JEE Main syllabus (treat as enrichment).`,
    assumptions: r`$n$ is a positive integer throughout.`,
    applications: r`Divisibility and remainders, quick approximations, probability (binomial distribution).`,
    patterns: r`- Coefficient of $x^k$ or the term independent of $x$ in $\left(ax^p + \dfrac b{x^q}\right)^n$.
- Middle term(s) and greatest coefficient.
- Sums of binomial coefficients with weights.
- Remainder of $a^n$ divided by $m$.`,
    misconceptions: r`- "The $r$th term is $ {}^nC_r x^{n-r}y^r$." That is the $(r+1)$th term.
- "Coefficient = binomial coefficient." The numerical coefficient includes powers of constants in $x$ and $y$.`,
    traps: r`- Sign errors when $y$ is negative: $T_{r+1}$ carries $(-1)^r$.
- Counting terms: $(x + y)^n$ has $n+1$ terms; $(x + y + z)^n$ has $\binom{n+2}{2}$.`,
    summary: r`- $T_{r+1} = {}^nC_r x^{n-r}y^r$; $n + 1$ terms.
- $\sum C_r = 2^n$; even sum = odd sum $= 2^{n-1}$; $\sum rC_r = n2^{n-1}$; $\sum C_r^2 = {}^{2n}C_n$.`,
  }),

  note("progressions", {
    introduction: r`Sequences with a fixed pattern — **arithmetic** (constant difference) and **geometric** (constant ratio) progressions — appear across algebra, physics (uniform motion, decay) and finance. The AM–GM inequality is a powerful tool for finding minimum and maximum values.`,
    prerequisites: r`- Algebraic manipulation
- Laws of indices`,
    concept: r`An AP grows by adding the same amount each step; a GP grows by multiplying by the same factor. Summing an AP pairs the first and last terms (Gauss's trick); summing a GP uses "multiply by $r$ and subtract".`,
    theory: r`AP: $a, a+d, a+2d, \dots$ with $T_n = a + (n-1)d$.
GP: $a, ar, ar^2, \dots$ with $T_n = ar^{n-1}$.
For positive numbers, $\text{AM} \ge \text{GM}$, with equality only when all numbers are equal.`,
    definitions: r`- **Arithmetic mean** of $a, b$: $\dfrac{a+b}{2}$. **Geometric mean** of positive $a, b$: $\sqrt{ab}$.
- **Common difference** $d$, **common ratio** $r$.`,
    principles: r`1. Three numbers in AP: take $a - d, a, a + d$. In GP: $a/r, a, ar$.
2. If each term of an AP is multiplied (or increased) by a constant, it stays an AP.
3. $a, b, c$ in AP $\iff 2b = a + c$; in GP $\iff b^2 = ac$.`,
    derivations: r`**AP sum.** Write $S = a + (a+d) + \dots + l$ and reverse it; adding term by term gives $2S = n(a + l)$, so $S_n = \dfrac n2(a + l) = \dfrac n2[2a + (n-1)d]$.

**GP sum.** $S = a + ar + \dots + ar^{n-1}$; $rS = ar + \dots + ar^n$. Subtracting: $S(r - 1) = a(r^n - 1)$.

**AM ≥ GM (two numbers).** $(\sqrt a - \sqrt b)^2 \ge 0 \Rightarrow a + b \ge 2\sqrt{ab}$.`,
    formulas: r`- AP: $T_n = a + (n-1)d$, $S_n = \dfrac n2[2a + (n-1)d] = \dfrac n2(a + l)$; $T_n = S_n - S_{n-1}$.
- GP: $T_n = ar^{n-1}$, $S_n = \dfrac{a(r^n - 1)}{r - 1}$ — $r \ne 1$ (for $r = 1$, $S_n = na$).
- Infinite GP: $S_\infty = \dfrac{a}{1 - r}$ — valid only for $|r| < 1$.
- Inserting $n$ AMs between $a$ and $b$: $d = \dfrac{b - a}{n + 1}$; their sum $= n\cdot\dfrac{a+b}2$.
- Inserting $n$ GMs between positive $a$ and $b$: $r = \left(\dfrac ba\right)^{1/(n+1)}$; their product $= (\sqrt{ab})^n$.
- AM ≥ GM: $\dfrac{a_1 + \dots + a_n}{n} \ge (a_1\cdots a_n)^{1/n}$ — all $a_i > 0$; equality iff all equal.
- For two positive numbers: $\text{AM} \ge \text{GM} \ge \text{HM}$ and $\text{GM}^2 = \text{AM}\times\text{HM}$, where $\text{HM} = \dfrac{2ab}{a+b}$.
- Useful sums: $\sum k = \dfrac{n(n+1)}2$, $\sum k^2 = \dfrac{n(n+1)(2n+1)}6$, $\sum k^3 = \left[\dfrac{n(n+1)}2\right]^2$.`,
    diagrams: r`An AP plotted against $n$ lies on a straight line of slope $d$; a positive GP lies on an exponential curve.`,
    graphs: r`$S_n$ of an AP is quadratic in $n$ (a parabola); this is why "$S_n = pn^2 + qn$" identifies an AP with $d = 2p$.`,
    specialCases: r`- If $S_n = pn^2 + qn$, the sequence is an AP with $a = p + q$, $d = 2p$.
- If $S_m = S_n$ ($m \ne n$) for an AP, then $S_{m+n} = 0$.`,
    exceptions: r`AM–GM needs positive numbers: for $a = -4, b = -1$, AM $= -2.5$ while $\sqrt{ab} = 2$, so AM $<$ GM.`,
    assumptions: r`GM formulas assume positive terms.`,
    applications: r`Compound interest (GP), equal monthly savings (AP), and minimising expressions such as $x + \dfrac1x \ge 2$ for $x > 0$.`,
    patterns: r`- Find $n$ or a term from given sums.
- Three or four numbers in AP/GP with conditions on sum and product.
- Infinite GP sums and recurring decimals.
- Minimum value problems with AM–GM.`,
    misconceptions: r`- "$S_\infty$ exists for every GP." Only for $|r| < 1$.
- "AM–GM gives a minimum whenever applied." Equality must be achievable.`,
    traps: r`- Using $S_n = \frac{a(1 - r^n)}{1 - r}$ vs $\frac{a(r^n-1)}{r-1}$ — both are correct; mixing them causes sign errors.
- Forgetting the case $r = 1$.`,
    summary: r`- AP: $T_n = a + (n-1)d$, $S_n = \frac n2(a + l)$.
- GP: $T_n = ar^{n-1}$, $S_\infty = \frac{a}{1-r}$ ($|r| < 1$).
- AM ≥ GM for positive numbers; $\text{GM}^2 = \text{AM}\cdot\text{HM}$ for two numbers.`,
  }),
];
