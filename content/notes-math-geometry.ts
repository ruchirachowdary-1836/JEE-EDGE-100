import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const MATH_GEOMETRY_NOTES: NoteSeed[] = [
  note("straight-lines", {
    introduction: r`Coordinate geometry turns geometric facts into algebra. Straight lines are its foundation: distances, slopes, angles and the standard centres of a triangle all reduce to short formulas.`,
    prerequisites: r`- Plotting points, the distance formula
- Basic trigonometry (slope $= \tan\theta$)`,
    concept: r`A line is fixed by a point and a direction. The **slope** $m = \tan\theta$ measures the direction ($\theta$ = angle with the positive $x$-axis). Every form of a line's equation is just a different way of supplying "point + direction" or "two points".`,
    theory: r`General form $ax + by + c = 0$ has slope $-\frac ab$ ($b \ne 0$). Two lines are parallel if $m_1 = m_2$ and perpendicular if $m_1m_2 = -1$. The sign of $ax_1 + by_1 + c$ tells which side of the line the point $(x_1, y_1)$ lies on.`,
    definitions: r`- **Centroid** $G$: intersection of medians. **Incentre** $I$: angle bisectors. **Circumcentre** $O$: perpendicular bisectors. **Orthocentre** $H$: altitudes.
- **Intercepts:** where the line meets the axes.`,
    principles: r`1. The circumcentre $O$, centroid $G$ and orthocentre $H$ are collinear (Euler line), with $HG : GO = 2 : 1$.
2. Lines $L_1 = 0$ and $L_2 = 0$: $L_1 + \lambda L_2 = 0$ is any line through their intersection.
3. Points on the same side of a line give $ax + by + c$ values of the same sign.`,
    derivations: r`**Distance of a point from a line.** The foot of the perpendicular from $P(x_1, y_1)$ to $ax + by + c = 0$ is reached along the normal direction $(a, b)$. Moving $t(a, b)$ from $P$ and substituting gives $t = -\frac{ax_1 + by_1 + c}{a^2 + b^2}$, so the distance is $|t|\sqrt{a^2 + b^2} = \frac{|ax_1 + by_1 + c|}{\sqrt{a^2 + b^2}}$.`,
    formulas: r`- Distance: $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$; section (internal $m:n$): $\left(\dfrac{mx_2 + nx_1}{m + n}, \dfrac{my_2 + ny_1}{m + n}\right)$; external: replace $n$ by $-n$.
- Slope: $m = \dfrac{y_2 - y_1}{x_2 - x_1}$ ($x_1 \ne x_2$).
- Forms: $y - y_1 = m(x - x_1)$; $y = mx + c$; $\dfrac{x}{a} + \dfrac yb = 1$; $x\cos\alpha + y\sin\alpha = p$; $\dfrac{x - x_1}{\cos\theta} = \dfrac{y - y_1}{\sin\theta} = r$ (parametric).
- Angle between lines: $\tan\theta = \left|\dfrac{m_1 - m_2}{1 + m_1m_2}\right|$ — undefined ($90^\circ$) when $m_1m_2 = -1$.
- Distance from $(x_1, y_1)$ to $ax + by + c = 0$: $\dfrac{|ax_1 + by_1 + c|}{\sqrt{a^2 + b^2}}$.
- Distance between parallel lines $ax + by + c_1 = 0$, $ax + by + c_2 = 0$: $\dfrac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}$ — same $a, b$ in both.
- Foot of perpendicular $(h, k)$: $\dfrac{h - x_1}{a} = \dfrac{k - y_1}{b} = -\dfrac{ax_1 + by_1 + c}{a^2 + b^2}$; image: replace the right side by $-2\dfrac{ax_1 + by_1 + c}{a^2 + b^2}$.
- Area of triangle: $\dfrac12|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$.
- Centroid $\left(\dfrac{x_1 + x_2 + x_3}3, \dfrac{y_1 + y_2 + y_3}3\right)$; incentre $\left(\dfrac{ax_1 + bx_2 + cx_3}{a + b + c}, \dfrac{ay_1 + by_2 + cy_3}{a + b + c}\right)$ with $a, b, c$ the sides opposite the vertices.
- Concurrency of three lines: $\begin{vmatrix}a_1&b_1&c_1\\a_2&b_2&c_2\\a_3&b_3&c_3\end{vmatrix} = 0$ (given no two are parallel).
- Angle bisectors: $\dfrac{a_1x + b_1y + c_1}{\sqrt{a_1^2 + b_1^2}} = \pm\dfrac{a_2x + b_2y + c_2}{\sqrt{a_2^2 + b_2^2}}$.`,
    diagrams: r`Mark the slope triangle (rise over run) and the normal from the origin of length $p$ at angle $\alpha$ for the normal form.`,
    graphs: r`Lines with equal slopes are parallel; slopes $m$ and $-1/m$ are perpendicular.`,
    specialCases: r`- Lines through the origin: $y = mx$.
- Line parallel to $ax + by + c = 0$: $ax + by + k = 0$; perpendicular: $bx - ay + k = 0$.
- In an equilateral triangle $G = I = O = H$.`,
    exceptions: r`Slope form fails for vertical lines ($x = k$); use the general form.`,
    assumptions: r`Rectangular (perpendicular) axes with equal scales.`,
    applications: r`Linear programming boundaries, optics (reflection in a mirror line), surveying.`,
    patterns: r`- Image/foot of perpendicular of a point in a line.
- Centres of a triangle from vertices or side equations.
- Family of lines through an intersection.
- Locus problems leading to a line.`,
    misconceptions: r`- "Distance formula needs $c$ on the right side." Bring the equation to $ax + by + c = 0$ first.
- "Parallel lines formula works with any multiples." Make the $x$ and $y$ coefficients identical first.`,
    traps: r`- Incentre uses the side **opposite** each vertex.
- Sign choice in angle bisectors (acute vs obtuse).`,
    summary: r`- Angle: $\tan\theta = \left|\frac{m_1 - m_2}{1 + m_1m_2}\right|$.
- Point–line distance $\frac{|ax_1 + by_1 + c|}{\sqrt{a^2+b^2}}$; parallel lines $\frac{|c_1 - c_2|}{\sqrt{a^2+b^2}}$.
- Foot/image formula; $L_1 + \lambda L_2 = 0$.`,
  }),

  note("circles", {
    introduction: r`A **circle** is the set of points at a fixed distance $r$ from a centre. JEE problems involve tangents, chords, intersection of circles and families of circles.`,
    prerequisites: r`- Straight lines, distance from a point to a line
- Completing the square`,
    concept: r`A line meets a circle in two points, one point (tangent) or none, depending on whether its distance from the centre is less than, equal to, or greater than the radius. Almost every tangent problem reduces to this one comparison.`,
    theory: r`$$(x - h)^2 + (y - k)^2 = r^2 \quad\text{or}\quad x^2 + y^2 + 2gx + 2fy + c = 0$$
with centre $(-g, -f)$ and radius $\sqrt{g^2 + f^2 - c}$ (real circle when $g^2 + f^2 - c > 0$).

Notation: $S = x^2 + y^2 + 2gx + 2fy + c$, $S_1 = S(x_1, y_1)$, $T = xx_1 + yy_1 + g(x + x_1) + f(y + y_1) + c$.`,
    definitions: r`- **Power of a point** $P$: $S_1$ — positive outside, zero on, negative inside the circle.
- **Chord of contact:** chord joining the points of contact of tangents from an external point.
- **Orthogonal circles:** tangents at an intersection point are perpendicular.`,
    principles: r`1. The perpendicular from the centre bisects a chord.
2. Tangent is perpendicular to the radius at the point of contact.
3. Two tangents from an external point are equal in length.`,
    derivations: r`**Tangent condition for $y = mx + c$ to $x^2 + y^2 = a^2$.** Distance from the centre $(0,0)$ to the line: $\frac{|c|}{\sqrt{1+m^2}} = a$, so $c^2 = a^2(1 + m^2)$, giving tangents $y = mx \pm a\sqrt{1 + m^2}$.

**Length of tangent.** Right triangle centre–contact point–$P$: $L^2 = CP^2 - r^2 = S_1$.`,
    formulas: r`- Centre $(-g, -f)$, radius $\sqrt{g^2 + f^2 - c}$.
- Diameter form: $(x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0$.
- Parametric point: $(h + r\cos\theta, k + r\sin\theta)$.
- Tangent at $(x_1, y_1)$ on the circle: $T = 0$, i.e. $xx_1 + yy_1 + g(x + x_1) + f(y + y_1) + c = 0$.
- Tangent to $x^2 + y^2 = a^2$ with slope $m$: $y = mx \pm a\sqrt{1 + m^2}$.
- Condition for $y = mx + c$ to touch $x^2 + y^2 = a^2$: $c^2 = a^2(1 + m^2)$.
- Length of tangent from $(x_1, y_1)$: $\sqrt{S_1}$ — $P$ outside the circle.
- Chord of contact from $(x_1, y_1)$: $T = 0$. Chord with midpoint $(x_1, y_1)$: $T = S_1$.
- Length of chord at distance $d$ from centre: $2\sqrt{r^2 - d^2}$.
- Two circles, centres $C_1, C_2$, radii $r_1, r_2$, $d = C_1C_2$: $d > r_1 + r_2$ separate (4 common tangents); $d = r_1 + r_2$ touch externally (3); $|r_1 - r_2| < d < r_1 + r_2$ intersect (2); $d = |r_1 - r_2|$ touch internally (1); $d < |r_1 - r_2|$ one inside the other (0).
- Common chord / radical axis: $S_1 - S_2 = 0$ (coefficients of $x^2, y^2$ equal to 1).
- Orthogonality: $2g_1g_2 + 2f_1f_2 = c_1 + c_2$.
- Family through intersection of circle and line: $S + \lambda L = 0$; of two circles: $S_1 + \lambda S_2 = 0$ ($\lambda \ne -1$).`,
    diagrams: r`Draw the centre, the radius to the point of contact and the tangent at right angles; the perpendicular from the centre to a chord meets it at its midpoint.`,
    graphs: r`$x^2 + y^2 + 2gx + 2fy + c = 0$ is a point circle when $g^2 + f^2 = c$ and imaginary when $g^2 + f^2 < c$.`,
    specialCases: r`- Circle touching both axes: $(x \mp r)^2 + (y \mp r)^2 = r^2$.
- Circle touching the $x$-axis: radius $= |k|$.`,
    exceptions: r`A second-degree equation represents a circle only if the $x^2$ and $y^2$ coefficients are equal and there is no $xy$ term.`,
    assumptions: r`Formulas in $g, f, c$ require the $x^2, y^2$ coefficients to be 1 — divide through first.`,
    applications: r`Gear design, wheel paths, locating a point equidistant from three points (circumcircle).`,
    patterns: r`- Tangents with given slope or from an external point.
- Common tangents and relative position of two circles.
- Chord with given midpoint; chord of contact.
- Orthogonal circles; family of circles.`,
    misconceptions: r`- "$T = 0$ is always a tangent." It is a tangent only if $(x_1, y_1)$ lies on the circle; otherwise it is the chord of contact.`,
    traps: r`- Forgetting to make the $x^2, y^2$ coefficients 1.
- Using $\sqrt{S_1}$ for a point inside (no real tangent).`,
    summary: r`- Centre $(-g,-f)$, $r = \sqrt{g^2 + f^2 - c}$.
- $T = 0$ tangent/chord of contact; $T = S_1$ chord with midpoint.
- Tangent $y = mx \pm a\sqrt{1+m^2}$; length $\sqrt{S_1}$; orthogonal $2g_1g_2 + 2f_1f_2 = c_1 + c_2$.`,
  }),

  note("conic-sections", {
    introduction: r`Parabola, ellipse and hyperbola are the curves obtained by slicing a cone. In coordinates, each is the locus of a point whose distance from a **focus** is $e$ times its distance from a **directrix**.`,
    prerequisites: r`- Circles and straight lines
- Completing the square`,
    concept: r`The eccentricity $e$ decides the shape: $e < 1$ ellipse (closed), $e = 1$ parabola, $e > 1$ hyperbola (two branches). A circle is the limiting ellipse with $e = 0$.`,
    theory: r`Standard forms:
- Parabola $y^2 = 4ax$.
- Ellipse $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ ($a > b$), $b^2 = a^2(1 - e^2)$.
- Hyperbola $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$, $b^2 = a^2(e^2 - 1)$.`,
    definitions: r`- **Latus rectum:** focal chord perpendicular to the axis.
- **Focal distance:** distance of a point on the conic from a focus.
- **Asymptotes** (hyperbola): lines the branches approach at infinity.
- **Rectangular hyperbola:** $a = b$, $e = \sqrt2$.`,
    principles: r`1. Ellipse: $SP + S'P = 2a$. Hyperbola: $|SP - S'P| = 2a$. Parabola: $SP = $ distance to directrix.
2. Tangent conditions come from the discriminant of line–conic intersection being zero.
3. Reflection property: a parabola reflects rays parallel to its axis through the focus.`,
    derivations: r`**Parabola.** Focus $(a, 0)$, directrix $x = -a$: $\sqrt{(x-a)^2 + y^2} = x + a \Rightarrow y^2 = 4ax$.

**Tangent condition for the ellipse.** Substituting $y = mx + c$ into $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ gives a quadratic in $x$; setting its discriminant to zero yields $c^2 = a^2m^2 + b^2$.`,
    formulas: r`- **Parabola $y^2 = 4ax$** ($a > 0$): focus $(a, 0)$; directrix $x = -a$; axis $y = 0$; latus rectum $4a$; parametric $(at^2, 2at)$; focal distance $x + a$.
- Parabola tangent at $(x_1, y_1)$: $yy_1 = 2a(x + x_1)$; at $t$: $ty = x + at^2$; slope form $y = mx + \dfrac am$ ($m \ne 0$); condition $c = \dfrac am$.
- Parabola normal at $t$: $y = -tx + 2at + at^3$; in slope form $y = mx - 2am - am^3$.
- Focal chord: $t_1t_2 = -1$.
- **Ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$** ($a > b$): $e = \sqrt{1 - \frac{b^2}{a^2}}$; foci $(\pm ae, 0)$; directrices $x = \pm\dfrac ae$; latus rectum $\dfrac{2b^2}{a}$; parametric $(a\cos\theta, b\sin\theta)$; $SP = a - ex$, $S'P = a + ex$.
- Ellipse tangent at $(x_1, y_1)$: $\dfrac{xx_1}{a^2} + \dfrac{yy_1}{b^2} = 1$; slope form $y = mx \pm\sqrt{a^2m^2 + b^2}$.
- **Hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$:** $e = \sqrt{1 + \frac{b^2}{a^2}}$; foci $(\pm ae, 0)$; directrices $x = \pm\dfrac ae$; latus rectum $\dfrac{2b^2}a$; parametric $(a\sec\theta, b\tan\theta)$; asymptotes $y = \pm\dfrac bax$.
- Hyperbola tangent at $(x_1, y_1)$: $\dfrac{xx_1}{a^2} - \dfrac{yy_1}{b^2} = 1$; slope form $y = mx \pm\sqrt{a^2m^2 - b^2}$ — real only if $a^2m^2 > b^2$.
- Conjugate hyperbola $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = -1$; $\dfrac1{e_1^2} + \dfrac1{e_2^2} = 1$.
- Rectangular hyperbola $xy = c^2$: parametric $\left(ct, \dfrac ct\right)$, $e = \sqrt2$.
- If $b > a$ in the ellipse form, the major axis is along $y$: $e = \sqrt{1 - a^2/b^2}$, foci $(0, \pm be)$.`,
    diagrams: r`Change the eccentricity in the conic lab below and watch $SP/PM$ stay equal to $e$ as the point moves.`,
    graphs: r`Ellipse: bounded, symmetric about both axes. Hyperbola: two branches between which the asymptotes cross at the centre. Parabola: one open branch.`,
    specialCases: r`- $y^2 = -4ax$, $x^2 = \pm4ay$: rotate the standard results accordingly.
- Shifted conics: replace $x, y$ by $x - h$, $y - k$ (centre or vertex at $(h, k)$).`,
    exceptions: r`Not every second-degree equation is a non-degenerate conic; it can be a pair of lines or a point.`,
    assumptions: r`Standard forms assume the axes are along the coordinate axes.`,
    applications: r`Satellite dishes and headlights (parabola), planetary orbits (ellipse), navigation systems (hyperbola).`,
    patterns: r`- Eccentricity, foci and latus rectum from equations.
- Tangent/normal equations and conditions of tangency.
- Focal chord properties of a parabola.
- Locus problems giving a conic.`,
    misconceptions: r`- "In an ellipse $a^2 = b^2 + c^2$ means $c$ is the minor axis." Here $c = ae$ is the focal distance from the centre.
- "Asymptotes touch the hyperbola." They never meet it.`,
    traps: r`- Confusing $b^2 = a^2(1 - e^2)$ (ellipse) with $b^2 = a^2(e^2 - 1)$ (hyperbola).
- Major axis along $y$ when $b > a$.`,
    summary: r`- Parabola $y^2 = 4ax$: focus $(a,0)$, LR $4a$, tangent $y = mx + \frac am$.
- Ellipse: $b^2 = a^2(1-e^2)$, $SP + S'P = 2a$, tangent $c^2 = a^2m^2 + b^2$.
- Hyperbola: $b^2 = a^2(e^2-1)$, $|SP - S'P| = 2a$, tangent $c^2 = a^2m^2 - b^2$, asymptotes $y = \pm\frac bax$.`,
  }, { diagrams: "conics" }),

  note("lines-and-planes", {
    introduction: r`Three-dimensional geometry extends coordinates to space. JEE tests direction cosines, equations of lines, angles and especially the shortest distance between skew lines.`,
    prerequisites: r`- Vectors: dot and cross product
- 2D coordinate geometry`,
    concept: r`A line in space is still "a point plus a direction", now with a direction vector $\vec b = (a, b, c)$. Two lines in space can intersect, be parallel, or be **skew** — neither parallel nor intersecting.`,
    theory: r`Line through $\vec a$ parallel to $\vec b$: $\vec r = \vec a + \lambda\vec b$, or in Cartesian form $\dfrac{x - x_1}a = \dfrac{y - y_1}b = \dfrac{z - z_1}c$.

The shortest distance between skew lines is along their common perpendicular, whose direction is $\vec b_1 \times \vec b_2$.`,
    definitions: r`- **Direction cosines** $l, m, n$: cosines of the angles with the axes; $l^2 + m^2 + n^2 = 1$.
- **Direction ratios** $a, b, c$: any numbers proportional to $l, m, n$.
- **Skew lines:** non-parallel, non-intersecting lines.`,
    principles: r`1. Angle between lines = angle between their direction vectors.
2. Two lines are coplanar iff $(\vec a_2 - \vec a_1)\cdot(\vec b_1 \times \vec b_2) = 0$.
3. Projection of $\vec a_2 - \vec a_1$ onto the common normal gives the shortest distance.`,
    derivations: r`**Shortest distance.** $\hat n = \frac{\vec b_1 \times \vec b_2}{|\vec b_1 \times \vec b_2|}$ is perpendicular to both lines. The shortest distance is the length of the projection of $\vec a_2 - \vec a_1$ on $\hat n$:
$$d = \frac{|(\vec a_2 - \vec a_1)\cdot(\vec b_1\times\vec b_2)|}{|\vec b_1\times\vec b_2|}$$`,
    formulas: r`- Distance: $\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$; section formula as in 2D with a $z$-coordinate.
- Direction cosines from ratios $a, b, c$: $l = \dfrac{a}{\sqrt{a^2+b^2+c^2}}$, etc.; $l^2 + m^2 + n^2 = 1$.
- DRs of the line through two points: $(x_2 - x_1, y_2 - y_1, z_2 - z_1)$.
- Angle between lines: $\cos\theta = \dfrac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}}$; perpendicular iff $a_1a_2 + b_1b_2 + c_1c_2 = 0$; parallel iff $\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2}$.
- Line: $\vec r = \vec a + \lambda\vec b$; $\dfrac{x - x_1}{a} = \dfrac{y - y_1}{b} = \dfrac{z - z_1}{c}$; general point $(x_1 + a\lambda, y_1 + b\lambda, z_1 + c\lambda)$.
- Shortest distance between skew lines: $\dfrac{|(\vec a_2 - \vec a_1)\cdot(\vec b_1\times\vec b_2)|}{|\vec b_1\times\vec b_2|}$ — lines not parallel.
- Distance between parallel lines $\vec r = \vec a_i + \lambda\vec b$: $\dfrac{|(\vec a_2 - \vec a_1)\times\vec b|}{|\vec b|}$.
- Coplanarity of two lines: $(\vec a_2 - \vec a_1)\cdot(\vec b_1\times\vec b_2) = 0$.
- Perpendicular distance of a point $P$ from a line through $A$ with direction $\vec b$: $\dfrac{|\overrightarrow{AP}\times\vec b|}{|\vec b|}$.
- *Enrichment (verify against the current syllabus):* plane $ax + by + cz + d = 0$; distance of a point $\dfrac{|ax_1 + by_1 + cz_1 + d|}{\sqrt{a^2+b^2+c^2}}$; angle between a line and a plane $\sin\phi = \dfrac{|\vec b\cdot\vec n|}{|\vec b||\vec n|}$.`,
    diagrams: r`Sketch the two skew lines as non-touching rods and the common perpendicular joining them; $\vec b_1 \times \vec b_2$ points along it.`,
    graphs: r`The general point of a line, $(x_1 + a\lambda, \dots)$, traces the line as $\lambda$ varies — use it to find intersections and feet of perpendiculars.`,
    specialCases: r`- Lines along the axes have DCs $(1,0,0)$, $(0,1,0)$, $(0,0,1)$.
- If the shortest distance is $0$, the lines intersect.`,
    exceptions: r`The skew-line formula divides by $|\vec b_1 \times \vec b_2|$, which is zero for parallel lines — use the parallel-line formula instead.`,
    assumptions: r`Right-handed rectangular coordinate system.`,
    applications: r`Robotics (arm paths), aviation (closest approach of flight paths), structural design.`,
    patterns: r`- Shortest distance between two given lines.
- Foot of perpendicular from a point to a line, and its image.
- Angle between lines; checking intersection and finding the point.`,
    misconceptions: r`- "Non-parallel lines in space must intersect." They may be skew.
- "DRs must satisfy $a^2 + b^2 + c^2 = 1$." Only DCs do.`,
    traps: r`- Sign and order in the cross product (magnitude is what matters for distance).
- Using DRs instead of DCs in $l^2 + m^2 + n^2 = 1$.`,
    summary: r`- $l^2 + m^2 + n^2 = 1$; angle via dot product of direction vectors.
- SD $= \frac{|(\vec a_2 - \vec a_1)\cdot(\vec b_1\times\vec b_2)|}{|\vec b_1\times\vec b_2|}$; zero ⇒ intersecting.`,
  }),

  note("vectors", {
    introduction: r`Vectors carry magnitude and direction. Dot and cross products turn geometric questions — angles, areas, volumes, perpendicularity — into quick computations.`,
    prerequisites: r`- Coordinates in 3D
- Trigonometry`,
    concept: r`The **dot product** measures how much two vectors point the same way (a number). The **cross product** builds a new vector perpendicular to both, whose length is the area of the parallelogram they span.`,
    theory: r`$$\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta = a_1b_1 + a_2b_2 + a_3b_3$$
$$\vec a\times\vec b = |\vec a||\vec b|\sin\theta\,\hat n = \begin{vmatrix}\hat i&\hat j&\hat k\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix}$$
with $\hat n$ given by the right-hand rule.`,
    definitions: r`- **Unit vector** $\hat a = \vec a/|\vec a|$. **Position vector** of $P$: $\overrightarrow{OP}$.
- **Collinear vectors:** $\vec a = \lambda\vec b$. **Coplanar vectors:** lie in one plane.
- **Scalar triple product** $[\vec a\,\vec b\,\vec c] = \vec a\cdot(\vec b\times\vec c)$.`,
    principles: r`1. $\vec a\cdot\vec b = 0 \iff$ perpendicular (non-zero vectors).
2. $\vec a\times\vec b = \vec 0 \iff$ parallel.
3. $\vec a\times\vec b = -\vec b\times\vec a$ (anti-commutative); the dot product is commutative.`,
    derivations: r`**Projection.** The component of $\vec a$ along $\vec b$ is $|\vec a|\cos\theta = \frac{\vec a\cdot\vec b}{|\vec b|}$.

**Lagrange identity.** $|\vec a\times\vec b|^2 + (\vec a\cdot\vec b)^2 = |\vec a|^2|\vec b|^2(\sin^2\theta + \cos^2\theta) = |\vec a|^2|\vec b|^2$.`,
    formulas: r`- $|\vec a| = \sqrt{a_1^2 + a_2^2 + a_3^2}$; $\overrightarrow{AB} = \vec b - \vec a$.
- Section formula: $\dfrac{m\vec b + n\vec a}{m + n}$ (internal $m:n$).
- $\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta$; $\cos\theta = \dfrac{\vec a\cdot\vec b}{|\vec a||\vec b|}$.
- Projection of $\vec a$ on $\vec b$: $\dfrac{\vec a\cdot\vec b}{|\vec b|}$; vector projection $\dfrac{\vec a\cdot\vec b}{|\vec b|^2}\vec b$.
- $|\vec a\pm\vec b|^2 = |\vec a|^2 + |\vec b|^2 \pm 2\vec a\cdot\vec b$.
- $|\vec a\times\vec b| = |\vec a||\vec b|\sin\theta$ = area of parallelogram; triangle area $\dfrac12|\vec a\times\vec b|$.
- Area of parallelogram with diagonals $\vec d_1, \vec d_2$: $\dfrac12|\vec d_1\times\vec d_2|$.
- $|\vec a\times\vec b|^2 + (\vec a\cdot\vec b)^2 = |\vec a|^2|\vec b|^2$.
- $[\vec a\,\vec b\,\vec c] = \begin{vmatrix}a_1&a_2&a_3\\b_1&b_2&b_3\\c_1&c_2&c_3\end{vmatrix}$ = volume of parallelepiped; tetrahedron volume $\dfrac16|[\vec a\,\vec b\,\vec c]|$.
- Coplanar $\iff [\vec a\,\vec b\,\vec c] = 0$; cyclic: $[\vec a\,\vec b\,\vec c] = [\vec b\,\vec c\,\vec a] = [\vec c\,\vec a\,\vec b]$.
- Vector triple product: $\vec a\times(\vec b\times\vec c) = (\vec a\cdot\vec c)\vec b - (\vec a\cdot\vec b)\vec c$.
- $\hat i\cdot\hat i = 1$, $\hat i\cdot\hat j = 0$; $\hat i\times\hat j = \hat k$, $\hat j\times\hat k = \hat i$, $\hat k\times\hat i = \hat j$.`,
    diagrams: r`Draw $\vec a$ and $\vec b$ tail to tail: the parallelogram they span has area $|\vec a\times\vec b|$; the shadow of $\vec a$ on $\vec b$ is the projection.`,
    graphs: r`Right-hand rule: fingers from $\vec a$ to $\vec b$, thumb along $\vec a\times\vec b$.`,
    specialCases: r`- $\vec a\times\vec a = \vec 0$; $[\vec a\,\vec a\,\vec b] = 0$.
- Unit vectors along the angle bisector of $\vec a$, $\vec b$: $\hat a + \hat b$ (internal).`,
    exceptions: r`The cross product is not associative: $\vec a\times(\vec b\times\vec c) \ne (\vec a\times\vec b)\times\vec c$ in general.`,
    assumptions: r`Right-handed coordinate system.`,
    applications: r`Work $W = \vec F\cdot\vec d$, torque $\vec\tau = \vec r\times\vec F$, magnetic force $q\vec v\times\vec B$.`,
    patterns: r`- Angle between vectors and projections.
- Area of triangle/parallelogram; volume of parallelepiped/tetrahedron.
- Coplanarity conditions; solving for an unknown vector with given dot/cross products.
- Vector triple product simplifications.`,
    misconceptions: r`- "$\vec a\cdot\vec b = 0$ means one vector is zero." It can mean perpendicular.
- "$\vec a\times\vec b = \vec b\times\vec a$." The sign flips.`,
    traps: r`- Dividing by vectors (undefined).
- Sign errors in the determinant for the cross product.`,
    summary: r`- $\vec a\cdot\vec b = |a||b|\cos\theta$, $|\vec a\times\vec b| = |a||b|\sin\theta$.
- $[\vec a\,\vec b\,\vec c]$ = volume; $= 0 \iff$ coplanar.
- $\vec a\times(\vec b\times\vec c) = (\vec a\cdot\vec c)\vec b - (\vec a\cdot\vec b)\vec c$.`,
  }),

  note("statistics", {
    introduction: r`Statistics summarises data by a centre (mean, median, mode) and a spread (mean deviation, variance, standard deviation). JEE focuses on computations and how these measures change when data are shifted or scaled.`,
    prerequisites: r`- Sums $\sum x_i$, $\sum x_i^2$
- Arranging data in order`,
    concept: r`Two data sets can share a mean but differ wildly in spread. Variance measures the average squared distance from the mean; its square root, the standard deviation, is in the same units as the data.`,
    theory: r`For $n$ observations: $\bar x = \frac{\sum x_i}{n}$, $\sigma^2 = \frac{\sum(x_i - \bar x)^2}{n} = \frac{\sum x_i^2}{n} - \bar x^2$.

For grouped data with frequencies $f_i$ and $N = \sum f_i$: $\bar x = \frac{\sum f_ix_i}{N}$, $\sigma^2 = \frac{\sum f_ix_i^2}{N} - \bar x^2$.`,
    definitions: r`- **Median:** middle value of ordered data. **Mode:** most frequent value.
- **Mean deviation** about $a$: $\frac{\sum|x_i - a|}{n}$.
- **Coefficient of variation:** $\frac{\sigma}{\bar x}\times100$ — compares variability of data sets.`,
    principles: r`1. Mean deviation is least when taken about the median.
2. Adding a constant shifts the mean but not the variance.
3. Multiplying by $k$ multiplies the SD by $|k|$ and the variance by $k^2$.`,
    derivations: r`**Shortcut variance.** $\sum(x_i - \bar x)^2 = \sum x_i^2 - 2\bar x\sum x_i + n\bar x^2 = \sum x_i^2 - n\bar x^2$; divide by $n$.

**Change of origin and scale.** If $y_i = ax_i + b$, then $\bar y = a\bar x + b$ and $y_i - \bar y = a(x_i - \bar x)$, so $\sigma_y^2 = a^2\sigma_x^2$.`,
    formulas: r`- Mean $\bar x = \dfrac{\sum x_i}{n}$; grouped $\dfrac{\sum f_ix_i}{\sum f_i}$.
- Median ($n$ ordered values): $x_{(n+1)/2}$ if $n$ odd; average of $x_{n/2}$ and $x_{n/2+1}$ if even.
- Grouped median: $l + \dfrac{\frac N2 - C}{f}\times h$ ($l$ lower limit of median class, $C$ cumulative frequency before it, $f$ its frequency, $h$ width).
- Mean deviation: $\dfrac{\sum|x_i - a|}{n}$ (or $\dfrac{\sum f_i|x_i - a|}{N}$).
- Variance: $\sigma^2 = \dfrac{\sum x_i^2}{n} - \bar x^2$; grouped $\dfrac{\sum f_ix_i^2}{N} - \bar x^2$.
- If $y = ax + b$: $\bar y = a\bar x + b$, $\sigma_y = |a|\sigma_x$, $\sigma_y^2 = a^2\sigma_x^2$.
- Combined mean of two groups: $\bar x = \dfrac{n_1\bar x_1 + n_2\bar x_2}{n_1 + n_2}$.
- Combined variance: $\sigma^2 = \dfrac{n_1(\sigma_1^2 + d_1^2) + n_2(\sigma_2^2 + d_2^2)}{n_1 + n_2}$, $d_i = \bar x_i - \bar x$.
- Variance of first $n$ natural numbers: $\dfrac{n^2 - 1}{12}$.
- Coefficient of variation $= \dfrac{\sigma}{\bar x}\times100$ ($\bar x \ne 0$).`,
    diagrams: r`A histogram shows frequency by class; the spread of the bars around the mean visualises the variance.`,
    graphs: r`Ogives (cumulative frequency curves) locate the median at $N/2$.`,
    specialCases: r`- All observations equal ⇒ variance $0$.
- Variance of an AP $a, a+d, \dots$ ($n$ terms): $d^2\cdot\frac{n^2-1}{12}$.`,
    exceptions: r`Mode may not be unique or may not exist.`,
    assumptions: r`Population formulas (divide by $n$), as used in the JEE syllabus.`,
    applications: r`Comparing consistency of batsmen or manufacturing processes (lower CV = more consistent).`,
    patterns: r`- Corrected mean/variance after a wrong entry.
- Effect of adding/multiplying all observations.
- Combined mean and variance.
- Mean deviation about mean or median.`,
    misconceptions: r`- "Adding 5 to every value increases the variance." It does not.
- "SD can be negative." It is never negative.`,
    traps: r`- Using $\frac{\sum x^2}{n} - \bar x$ instead of $- \bar x^2$.
- Correcting $\sum x^2$ as well as $\sum x$ when a wrong value is replaced.`,
    summary: r`- $\sigma^2 = \overline{x^2} - \bar x^2$.
- $y = ax + b$: mean $a\bar x + b$, SD $|a|\sigma$.
- Mean deviation least about the median; CV $= \sigma/\bar x \times 100$.`,
  }),

  note("probability", {
    introduction: r`Probability quantifies uncertainty. JEE builds from equally likely outcomes to conditional probability, Bayes' theorem and the binomial distribution.`,
    prerequisites: r`- Permutations and combinations
- Set operations`,
    concept: r`For equally likely outcomes, $P(E) = \frac{\text{favourable outcomes}}{\text{total outcomes}}$. **Conditional probability** restricts the sample space to what we already know has happened.`,
    theory: r`Axioms: $0 \le P(E) \le 1$, $P(S) = 1$, and probabilities of mutually exclusive events add.

$P(A\mid B) = \frac{P(A\cap B)}{P(B)}$ ($P(B) > 0$). Events are **independent** if $P(A\cap B) = P(A)P(B)$.`,
    definitions: r`- **Mutually exclusive:** $A\cap B = \varnothing$. **Exhaustive:** $A_1\cup\dots\cup A_n = S$.
- **Random variable:** numerical value attached to each outcome; its **probability distribution** lists values with probabilities.
- **Bernoulli trial:** two outcomes (success $p$, failure $q = 1 - p$), repeated independently.`,
    principles: r`1. $P(A') = 1 - P(A)$ — "at least one" problems are easiest by complement.
2. Mutually exclusive events (with non-zero probabilities) cannot be independent.
3. Theorem of total probability splits $P(A)$ over a partition $E_1, \dots, E_n$.`,
    derivations: r`**Bayes' theorem.** $P(E_i\mid A) = \frac{P(E_i\cap A)}{P(A)} = \frac{P(E_i)P(A\mid E_i)}{\sum_j P(E_j)P(A\mid E_j)}$, using the definition of conditional probability on top and total probability below.

**Binomial mean.** $X$ = sum of $n$ independent Bernoulli variables each with mean $p$, so $E(X) = np$; variances add: $npq$.`,
    formulas: r`- $P(A\cup B) = P(A) + P(B) - P(A\cap B)$; three events: $\sum P(A) - \sum P(A\cap B) + P(A\cap B\cap C)$.
- $P(A') = 1 - P(A)$; $P(A\cap B') = P(A) - P(A\cap B)$.
- Conditional: $P(A\mid B) = \dfrac{P(A\cap B)}{P(B)}$ — $P(B) > 0$.
- Multiplication: $P(A\cap B) = P(B)P(A\mid B) = P(A)P(B\mid A)$.
- Independent: $P(A\cap B) = P(A)P(B)$; then $A'$ and $B'$ are also independent.
- Total probability: $P(A) = \sum P(E_i)P(A\mid E_i)$ — $E_i$ mutually exclusive and exhaustive.
- Bayes: $P(E_i\mid A) = \dfrac{P(E_i)P(A\mid E_i)}{\sum_j P(E_j)P(A\mid E_j)}$.
- Random variable: $E(X) = \sum x_ip_i$, $\operatorname{Var}(X) = \sum x_i^2p_i - [E(X)]^2$, $\sum p_i = 1$.
- Binomial: $P(X = r) = {}\binom nr p^rq^{n-r}$, mean $np$, variance $npq$ — $n$ independent identical trials.
- $P(\text{at least one success in } n \text{ trials}) = 1 - q^n$.`,
    diagrams: r`Tree diagrams: multiply along branches for "and", add across final branches for "or". Bayes is "favourable branch ÷ all branches giving the observed result".`,
    graphs: r`The binomial distribution is symmetric when $p = \frac12$ and skewed otherwise; its most probable value lies near $np$.`,
    specialCases: r`- Two dice: 36 equally likely outcomes; sum 7 is most likely ($\frac6{36}$).
- Drawing without replacement makes successive draws dependent.`,
    exceptions: r`Pairwise independence of three events does not imply mutual independence.`,
    assumptions: r`Classical probability assumes equally likely outcomes; binomial assumes independent trials with constant $p$.`,
    applications: r`Medical test reliability (Bayes), quality control (binomial), games of chance.`,
    patterns: r`- Bayes' theorem with urns or test reliability.
- Binomial: "at least", "at most", most probable number of successes.
- Mean and variance of a random variable from a table.
- Independence checks.`,
    misconceptions: r`- "Independent = mutually exclusive." They are almost opposite ideas.
- "$P(A\mid B) = P(B\mid A)$." Not in general (that is what Bayes corrects).`,
    traps: r`- Forgetting that $\sum p_i = 1$ can be used to find unknown probabilities.
- Ordered vs unordered sample spaces.`,
    summary: r`- $P(A\cup B) = P(A) + P(B) - P(A\cap B)$; $P(A\mid B) = P(A\cap B)/P(B)$.
- Total probability and Bayes.
- Binomial: $\binom nr p^rq^{n-r}$, mean $np$, variance $npq$.`,
  }),

  note("trigonometric-functions-and-equations", {
    introduction: r`Trigonometric identities simplify expressions throughout calculus and geometry; trigonometric equations ask for all angles satisfying a condition, written as a **general solution**.`,
    prerequisites: r`- Right-triangle ratios and the unit circle
- Radian measure: $\pi$ rad $= 180^\circ$`,
    concept: r`On the unit circle, the point at angle $\theta$ is $(\cos\theta, \sin\theta)$. Every identity follows from this picture plus Pythagoras, and periodicity means each equation has infinitely many solutions spaced by the period.`,
    theory: r`Signs: all ratios positive in quadrant I, only $\sin/\csc$ in II, $\tan/\cot$ in III, $\cos/\sec$ in IV.

Allied angles: for $\frac{n\pi}{2} \pm \theta$, the function changes to its co-function when $n$ is odd and stays the same when $n$ is even; the sign is that of the original function in the resulting quadrant.`,
    definitions: r`- **Principal solution:** solution in $[0, 2\pi)$.
- **General solution:** all solutions, expressed with an integer $n$.
- **Period:** $2\pi$ for $\sin, \cos, \sec, \csc$; $\pi$ for $\tan, \cot$.`,
    principles: r`1. Reduce equations to a single function of a single angle.
2. Squaring can introduce extra roots — check them.
3. $a\sin\theta + b\cos\theta = R\sin(\theta + \alpha)$ with $R = \sqrt{a^2 + b^2}$.`,
    derivations: r`**$\cos2A$ forms.** $\cos2A = \cos^2A - \sin^2A$; replace $\sin^2A = 1 - \cos^2A$ to get $2\cos^2A - 1$, or $\cos^2A = 1 - \sin^2A$ to get $1 - 2\sin^2A$.

**General solution of $\sin\theta = \sin\alpha$.** $\sin\theta - \sin\alpha = 2\cos\frac{\theta+\alpha}2\sin\frac{\theta-\alpha}2 = 0$ gives $\theta = 2k\pi + \alpha$ or $\theta = (2k+1)\pi - \alpha$, combined as $n\pi + (-1)^n\alpha$.`,
    formulas: r`- $\sin^2\theta + \cos^2\theta = 1$, $1 + \tan^2\theta = \sec^2\theta$, $1 + \cot^2\theta = \csc^2\theta$.
- $\sin(A\pm B) = \sin A\cos B \pm \cos A\sin B$; $\cos(A\pm B) = \cos A\cos B \mp \sin A\sin B$; $\tan(A\pm B) = \dfrac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$.
- $\sin(A+B)\sin(A-B) = \sin^2A - \sin^2B$; $\cos(A+B)\cos(A-B) = \cos^2A - \sin^2B$.
- $\sin2A = 2\sin A\cos A = \dfrac{2\tan A}{1+\tan^2A}$; $\cos2A = \cos^2A - \sin^2A = 2\cos^2A - 1 = 1 - 2\sin^2A = \dfrac{1 - \tan^2A}{1 + \tan^2A}$; $\tan2A = \dfrac{2\tan A}{1 - \tan^2A}$.
- $\sin3A = 3\sin A - 4\sin^3A$; $\cos3A = 4\cos^3A - 3\cos A$; $\tan3A = \dfrac{3\tan A - \tan^3A}{1 - 3\tan^2A}$.
- $\sin C + \sin D = 2\sin\frac{C+D}2\cos\frac{C-D}2$; $\sin C - \sin D = 2\cos\frac{C+D}2\sin\frac{C-D}2$; $\cos C + \cos D = 2\cos\frac{C+D}2\cos\frac{C-D}2$; $\cos C - \cos D = -2\sin\frac{C+D}2\sin\frac{C-D}2$.
- $2\sin A\cos B = \sin(A+B) + \sin(A-B)$; $2\cos A\cos B = \cos(A+B) + \cos(A-B)$; $2\sin A\sin B = \cos(A-B) - \cos(A+B)$.
- $\sin\theta\sin(60^\circ-\theta)\sin(60^\circ+\theta) = \dfrac14\sin3\theta$ (and similarly for $\cos$, $\tan$).
- $-\sqrt{a^2+b^2} \le a\sin\theta + b\cos\theta \le \sqrt{a^2+b^2}$.
- General solutions: $\sin\theta = 0 \Rightarrow \theta = n\pi$; $\cos\theta = 0 \Rightarrow \theta = (2n+1)\frac\pi2$; $\tan\theta = 0 \Rightarrow n\pi$.
- $\sin\theta = \sin\alpha \Rightarrow \theta = n\pi + (-1)^n\alpha$; $\cos\theta = \cos\alpha \Rightarrow \theta = 2n\pi \pm \alpha$; $\tan\theta = \tan\alpha \Rightarrow \theta = n\pi + \alpha$ — $n \in \mathbb Z$.
- $\sin^2\theta = \sin^2\alpha$, $\cos^2\theta = \cos^2\alpha$ or $\tan^2\theta = \tan^2\alpha$ $\Rightarrow \theta = n\pi \pm \alpha$.
- Values: $\sin15^\circ = \dfrac{\sqrt3 - 1}{2\sqrt2}$, $\cos15^\circ = \dfrac{\sqrt3+1}{2\sqrt2}$, $\tan15^\circ = 2 - \sqrt3$, $\sin18^\circ = \dfrac{\sqrt5 - 1}{4}$, $\cos36^\circ = \dfrac{\sqrt5 + 1}{4}$.`,
    diagrams: r`The transformation lab (choose $\sin x$) shows amplitude, period and phase shifts of trigonometric graphs.`,
    graphs: r`$y = \sin x$ and $y = \cos x$ oscillate between $-1$ and $1$; $\tan x$ has vertical asymptotes at $x = (2n+1)\frac\pi2$. The number of solutions of $f(x) = g(x)$ equals the number of intersections of their graphs.`,
    specialCases: r`- $\cos A\cos2A\cos4A\cdots\cos2^{n-1}A = \dfrac{\sin2^nA}{2^n\sin A}$.
- $\tan A + \tan B + \tan C = \tan A\tan B\tan C$ when $A + B + C = \pi$.`,
    exceptions: r`$\tan$ is undefined at odd multiples of $\frac\pi2$; equations involving $\tan$ or $\sec$ must exclude those points.`,
    assumptions: r`Angles in radians in calculus contexts; degrees accepted in pure trigonometry.`,
    applications: r`Waves, alternating current, rotations, and resolving forces.`,
    patterns: r`- Prove/simplify using compound and multiple angles.
- Maximum and minimum of $a\sin\theta + b\cos\theta + c$.
- Number of solutions of a trigonometric equation in an interval.
- Products like $\cos20^\circ\cos40^\circ\cos80^\circ$.`,
    misconceptions: r`- "$\sin2A = 2\sin A$." It is $2\sin A\cos A$.
- "$\sin\theta = \frac12$ has one solution." It has infinitely many: $n\pi + (-1)^n\frac\pi6$.`,
    traps: r`- Losing solutions by dividing by $\cos\theta$ or $\sin\theta$ (check where they are zero).
- Extraneous roots after squaring.`,
    summary: r`- Compound, double and triple angle formulas; sum ↔ product.
- $a\sin\theta + b\cos\theta \in [-\sqrt{a^2+b^2}, \sqrt{a^2+b^2}]$.
- General solutions: $n\pi + (-1)^n\alpha$, $2n\pi\pm\alpha$, $n\pi + \alpha$.`,
  }, { diagrams: "transform" }),

  note("inverse-trigonometric-functions", {
    introduction: r`Trigonometric functions are periodic, so they are not one-one on $\mathbb R$. Restricting each to a **principal branch** makes it invertible; the inverse functions $\sin^{-1}x$, $\cos^{-1}x$, … return angles.`,
    prerequisites: r`- Functions and inverses
- Trigonometric identities`,
    concept: r`$\sin^{-1}x$ answers "which angle in $[-\frac\pi2, \frac\pi2]$ has sine $x$?". Because only one branch is used, $\sin^{-1}(\sin\theta) = \theta$ holds only when $\theta$ already lies in that branch.`,
    theory: r`Principal value branches:
- $\sin^{-1}: [-1, 1] \to [-\frac\pi2, \frac\pi2]$; $\cos^{-1}: [-1,1] \to [0, \pi]$; $\tan^{-1}: \mathbb R \to (-\frac\pi2, \frac\pi2)$;
- $\cot^{-1}: \mathbb R \to (0, \pi)$; $\sec^{-1}: |x| \ge 1 \to [0, \pi] - \{\frac\pi2\}$; $\csc^{-1}: |x| \ge 1 \to [-\frac\pi2, \frac\pi2] - \{0\}$.`,
    definitions: r`- **Principal value:** the value of the inverse function lying in its principal branch.`,
    principles: r`1. $f(f^{-1}(x)) = x$ on the domain of $f^{-1}$; $f^{-1}(f(x)) = x$ only on the principal branch.
2. Convert between inverse functions using a right triangle: if $\theta = \sin^{-1}x$ then $\tan\theta = \frac{x}{\sqrt{1-x^2}}$.`,
    derivations: r`**$\sin^{-1}x + \cos^{-1}x = \frac\pi2$.** Let $\theta = \sin^{-1}x \in [-\frac\pi2, \frac\pi2]$. Then $\cos(\frac\pi2 - \theta) = \sin\theta = x$ and $\frac\pi2 - \theta \in [0, \pi]$, so $\cos^{-1}x = \frac\pi2 - \theta$.

**Sum of $\tan^{-1}$.** $\tan(\tan^{-1}x + \tan^{-1}y) = \frac{x+y}{1-xy}$; the branch adjustment depends on whether the sum leaves $(-\frac\pi2, \frac\pi2)$.`,
    formulas: r`- $\sin(\sin^{-1}x) = x$ for $|x| \le 1$; $\sin^{-1}(\sin x) = x$ only for $x \in [-\frac\pi2, \frac\pi2]$ (similar statements for each branch).
- $\sin^{-1}(-x) = -\sin^{-1}x$, $\tan^{-1}(-x) = -\tan^{-1}x$, $\csc^{-1}(-x) = -\csc^{-1}x$.
- $\cos^{-1}(-x) = \pi - \cos^{-1}x$, $\cot^{-1}(-x) = \pi - \cot^{-1}x$, $\sec^{-1}(-x) = \pi - \sec^{-1}x$.
- $\sin^{-1}x + \cos^{-1}x = \dfrac\pi2$ ($|x| \le 1$); $\tan^{-1}x + \cot^{-1}x = \dfrac\pi2$; $\sec^{-1}x + \csc^{-1}x = \dfrac\pi2$ ($|x| \ge 1$).
- $\sin^{-1}\dfrac1x = \csc^{-1}x$ ($|x| \ge 1$); $\cos^{-1}\dfrac1x = \sec^{-1}x$; $\tan^{-1}\dfrac1x = \cot^{-1}x$ for $x > 0$ ($= \cot^{-1}x - \pi$ for $x < 0$).
- $\tan^{-1}x + \tan^{-1}y = \tan^{-1}\dfrac{x+y}{1-xy}$ if $xy < 1$; $= \pi + \tan^{-1}\dfrac{x+y}{1-xy}$ if $x, y > 0$ and $xy > 1$; $= -\pi + \tan^{-1}\dfrac{x+y}{1-xy}$ if $x, y < 0$ and $xy > 1$.
- $\tan^{-1}x - \tan^{-1}y = \tan^{-1}\dfrac{x - y}{1 + xy}$ for $xy > -1$.
- $2\tan^{-1}x = \sin^{-1}\dfrac{2x}{1+x^2}$ ($|x| \le 1$) $= \cos^{-1}\dfrac{1-x^2}{1+x^2}$ ($x \ge 0$) $= \tan^{-1}\dfrac{2x}{1-x^2}$ ($|x| < 1$).
- $2\sin^{-1}x = \sin^{-1}\left(2x\sqrt{1-x^2}\right)$ for $|x| \le \frac1{\sqrt2}$; $3\sin^{-1}x = \sin^{-1}(3x - 4x^3)$ for $|x| \le \frac12$.`,
    diagrams: r`Right-triangle trick: for $\theta = \tan^{-1}\frac34$, draw legs 3 and 4, hypotenuse 5; then $\sin\theta = \frac35$, $\cos\theta = \frac45$.`,
    graphs: r`$y = \sin^{-1}x$ is the reflection in $y = x$ of $y = \sin x$ restricted to $[-\frac\pi2, \frac\pi2]$; $y = \sin^{-1}(\sin x)$ is a zig-zag (triangular wave) with slope $\pm1$.`,
    specialCases: r`- $\cos^{-1}(\cos x) = x$ on $[0, \pi]$, $= 2\pi - x$ on $[\pi, 2\pi]$.
- $\tan^{-1}1 + \tan^{-1}2 + \tan^{-1}3 = \pi$.`,
    exceptions: r`Sum formulas for $\tan^{-1}$ change by $\pm\pi$ outside $xy < 1$ — ignoring this is the most common error.`,
    assumptions: r`Principal branches as listed above (the NCERT convention).`,
    applications: r`Finding angles from measured ratios (e.g. slope angles), and integrals producing $\tan^{-1}$ or $\sin^{-1}$.`,
    patterns: r`- Principal values of composite expressions like $\sin^{-1}(\sin\frac{5\pi}6)$.
- Simplify using substitution $x = \tan\theta$, $\sin\theta$, etc.
- Sums of $\tan^{-1}$ terms, including telescoping series $\tan^{-1}\frac{1}{1 + r(r+1)}$.
- Solve equations like $\sin^{-1}x + \sin^{-1}2x = \frac\pi3$ (check domain).`,
    misconceptions: r`- "$\sin^{-1}x = \frac{1}{\sin x}$." That is $\csc x$.
- "$\sin^{-1}(\sin x) = x$ always." Only on $[-\frac\pi2, \frac\pi2]$.`,
    traps: r`- Range of $\cot^{-1}$ is $(0, \pi)$, not $(-\frac\pi2, \frac\pi2)$.
- Domain restrictions in "solve for $x$" questions.`,
    summary: r`- Principal branches: $\sin^{-1} [-\frac\pi2,\frac\pi2]$, $\cos^{-1} [0,\pi]$, $\tan^{-1} (-\frac\pi2,\frac\pi2)$, $\cot^{-1} (0,\pi)$.
- $\sin^{-1}x + \cos^{-1}x = \frac\pi2$; $\tan^{-1}x + \tan^{-1}y$ with branch correction.
- $2\tan^{-1}x$ conversions with their domains.`,
  }),
];
