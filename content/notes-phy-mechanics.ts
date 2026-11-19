import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const PHY_MECHANICS_NOTES: NoteSeed[] = [
  note("si-units-and-dimensions", {
    introduction: r`Every physical quantity is a number times a unit. Dimensional analysis checks equations, converts units and even predicts the form of a relation — a quick, reliable tool in JEE.`,
    prerequisites: r`- Powers and indices
- Basic mechanics quantities (velocity, force, energy)`,
    concept: r`Seven base quantities (mass, length, time, current, temperature, amount, luminous intensity) build all others. Writing a quantity in powers of $M, L, T, A, K, \text{mol}, \text{cd}$ is its **dimensional formula**. Only quantities with the same dimensions can be added or equated.`,
    theory: r`Base SI units: kg, m, s, A, K, mol, cd. Derived example: force $= ma \Rightarrow [MLT^{-2}]$ (newton).

**Principle of homogeneity:** every term in a valid equation has the same dimensions. This lets us check formulas and find unknown exponents.`,
    definitions: r`- **Dimensionless quantity:** dimensions $[M^0L^0T^0]$, e.g. strain, angle, refractive index.
- **Dimensional constant:** has dimensions, e.g. $G$, $h$.
- **Supplementary units:** radian and steradian (dimensionless).`,
    principles: r`1. Homogeneity: add, subtract or equate only like dimensions.
2. Arguments of $\sin$, $e^x$, $\log$ must be dimensionless.
3. Unit conversion: $n_1u_1 = n_2u_2$, so $n_2 = n_1\left[\frac{M_1}{M_2}\right]^a\left[\frac{L_1}{L_2}\right]^b\left[\frac{T_1}{T_2}\right]^c$.`,
    derivations: r`**Period of a pendulum (dimensional method).** Assume $T = k\,m^aL^bg^c$. Then $[T] = [M]^a[L]^b[LT^{-2}]^c$. Matching powers: $a = 0$, $b + c = 0$, $-2c = 1 \Rightarrow c = -\frac12$, $b = \frac12$. So $T = k\sqrt{L/g}$ (the constant $2\pi$ needs a full derivation).`,
    formulas: r`- Force $[MLT^{-2}]$, work/energy/torque $[ML^2T^{-2}]$, power $[ML^2T^{-3}]$, momentum/impulse $[MLT^{-1}]$.
- Pressure/stress/Young's modulus/energy density $[ML^{-1}T^{-2}]$; surface tension/spring constant $[MT^{-2}]$.
- $G$ $[M^{-1}L^3T^{-2}]$; Planck's $h$ and angular momentum $[ML^2T^{-1}]$; viscosity $\eta$ $[ML^{-1}T^{-1}]$.
- Charge $[AT]$; potential $[ML^2T^{-3}A^{-1}]$; resistance $[ML^2T^{-3}A^{-2}]$; capacitance $[M^{-1}L^{-2}T^4A^2]$; inductance $[ML^2T^{-2}A^{-2}]$.
- $\varepsilon_0$ $[M^{-1}L^{-3}T^4A^2]$; $\mu_0$ $[MLT^{-2}A^{-2}]$; magnetic field $B$ $[MT^{-2}A^{-1}]$.
- $\sqrt{LC}$ and $RC$, $L/R$ have dimensions of time; $\frac{1}{\sqrt{\mu_0\varepsilon_0}}$ has dimensions of speed.
- Unit conversion: $n_2 = n_1\left(\frac{M_1}{M_2}\right)^a\left(\frac{L_1}{L_2}\right)^b\left(\frac{T_1}{T_2}\right)^c$ — for a quantity of dimensions $[M^aL^bT^c]$.`,
    diagrams: r`Tabulate each quantity with its defining equation and resulting dimensions; build new ones from old (e.g. power $=$ energy/time).`,
    graphs: r`Not applicable; dimensional analysis is algebraic.`,
    specialCases: r`- Torque and work share dimensions but are different quantities.
- Angle has a unit (radian) but no dimensions.`,
    exceptions: r`Dimensional analysis cannot find dimensionless constants ($2\pi$, $\frac12$), cannot handle sums of terms, and fails for relations involving $\sin$, $\log$ or $e^x$ of the unknowns.`,
    assumptions: r`The relation is a product of powers of the chosen quantities.`,
    applications: r`Checking derived formulas, converting units between systems, and guessing scaling laws.`,
    patterns: r`- Dimensions of a combination like $\frac{B^2}{\mu_0}$ (energy density) or $\frac{e^2}{4\pi\varepsilon_0hc}$ (dimensionless).
- Find exponents in a proposed formula.
- Express a quantity in a new system of base units.`,
    misconceptions: r`- "Dimensionally correct means correct." A wrong constant or missing term can still be dimensionally consistent.`,
    traps: r`- Treating $\varepsilon_0$ and $\mu_0$ dimensions carelessly — derive them from Coulomb's law and the force between currents.`,
    summary: r`- Homogeneity principle; arguments of sin/exp/log dimensionless.
- Key dimensions: energy $[ML^2T^{-2}]$, pressure $[ML^{-1}T^{-2}]$, $h$ $[ML^2T^{-1}]$, $G$ $[M^{-1}L^3T^{-2}]$.
- Cannot find numerical constants.`,
  }),

  note("errors-and-significant-figures", {
    introduction: r`No measurement is exact. Error analysis tells you how reliable a result is and how errors in measured quantities combine in a calculated result.`,
    prerequisites: r`- Percentages
- Basic differentiation (for error propagation)`,
    concept: r`Every reading carries uncertainty, at least the **least count** of the instrument. When quantities are combined, their uncertainties combine too — absolute errors add for sums and differences, relative errors add for products and quotients.`,
    theory: r`For $n$ readings $a_1, \dots, a_n$: mean $\bar a$, absolute error $|\Delta a_i| = |\bar a - a_i|$, mean absolute error $\overline{\Delta a}$, relative error $\frac{\overline{\Delta a}}{\bar a}$, percentage error $\times100$.

Significant figures: all non-zero digits; zeros between them; trailing zeros after a decimal point. Leading zeros are not significant.`,
    definitions: r`- **Least count:** smallest value an instrument can measure.
- **Systematic error:** consistent bias (zero error, instrument fault). **Random error:** unpredictable scatter, reduced by averaging.
- **Accuracy:** closeness to the true value. **Precision:** closeness of repeated readings / resolution.`,
    principles: r`1. Result of addition/subtraction: round to the fewest **decimal places**.
2. Result of multiplication/division: round to the fewest **significant figures**.
3. Maximum error is quoted (errors are added, never subtracted).`,
    derivations: r`**Error in a product.** For $Z = A^pB^q/C^r$, take logs: $\ln Z = p\ln A + q\ln B - r\ln C$. Differentiating and taking the worst case (all errors adding): $\frac{\Delta Z}{Z} = p\frac{\Delta A}{A} + q\frac{\Delta B}{B} + r\frac{\Delta C}{C}$.`,
    formulas: r`- $Z = A \pm B \Rightarrow \Delta Z = \Delta A + \Delta B$.
- $Z = AB$ or $A/B \Rightarrow \dfrac{\Delta Z}{Z} = \dfrac{\Delta A}{A} + \dfrac{\Delta B}{B}$.
- $Z = \dfrac{A^pB^q}{C^r} \Rightarrow \dfrac{\Delta Z}{Z} = p\dfrac{\Delta A}{A} + q\dfrac{\Delta B}{B} + r\dfrac{\Delta C}{C}$ — maximum relative error.
- Percentage error $= \dfrac{\Delta Z}{Z}\times100\%$.
- Mean absolute error $\overline{\Delta a} = \dfrac1n\sum|\Delta a_i|$.
- Vernier least count $= 1\,\text{MSD} - 1\,\text{VSD}$; screw gauge least count $= \dfrac{\text{pitch}}{\text{number of circular divisions}}$.`,
    diagrams: r`Readings scattered around the true value: tight cluster far from it = precise but inaccurate; wide cluster around it = accurate but imprecise.`,
    graphs: r`Plot readings against trial number: random error shows as scatter, systematic error as an offset of all points.`,
    specialCases: r`- $g = 4\pi^2L/T^2$: $\frac{\Delta g}{g} = \frac{\Delta L}{L} + 2\frac{\Delta T}{T}$ — the period error matters twice.
- Constants like $\pi$ or $4$ contribute no error.`,
    exceptions: r`Exact numbers (counted objects, defined constants) have infinite significant figures.`,
    assumptions: r`Small errors (first-order approximation) and worst-case addition.`,
    applications: r`Reporting experimental results, choosing which measurement to improve first (the one with the largest weighted relative error).`,
    patterns: r`- Percentage error in a derived quantity like $\rho = \frac{m}{\pi r^2L}$.
- Significant figures in a computed result.
- Least count and reading of vernier callipers/screw gauge.`,
    misconceptions: r`- "Errors cancel in a quotient." They add.
- "More digits = more accurate." Digits beyond the least count are meaningless.`,
    traps: r`- Forgetting the power multiplier ($r^2$ doubles the radius error).
- Trailing zeros in whole numbers like 2500 are ambiguous; scientific notation removes ambiguity.`,
    summary: r`- Sums: absolute errors add. Products/quotients: relative errors add, weighted by powers.
- Addition → decimal places; multiplication → significant figures.`,
  }),

  note("motion-in-a-straight-line", {
    introduction: r`One-dimensional kinematics describes position, velocity and acceleration along a line. It is the foundation for projectiles, relative motion and graphs — a reliable source of JEE questions.`,
    prerequisites: r`- Derivatives and integrals (rates and areas)
- Algebra of quadratics`,
    concept: r`Velocity is the rate of change of position; acceleration is the rate of change of velocity. On graphs, slopes give rates and areas give accumulated change: slope of $x$–$t$ is velocity, slope of $v$–$t$ is acceleration, area under $v$–$t$ is displacement.`,
    theory: r`$v = \frac{dx}{dt}$, $a = \frac{dv}{dt} = v\frac{dv}{dx}$. For constant acceleration these integrate to the three equations of motion. For variable acceleration, integrate directly.`,
    definitions: r`- **Displacement:** change in position (vector). **Distance:** path length (scalar, never negative).
- **Average velocity** $= \frac{\Delta x}{\Delta t}$; **average speed** $= \frac{\text{distance}}{\text{time}}$.
- **Uniform acceleration:** $a$ constant.`,
    principles: r`1. Choose a sign convention and keep it (e.g. upward positive, $a = -g$).
2. Area under $v$–$t$ (with sign) = displacement; area of $|v|$–$t$ = distance.
3. Free fall near Earth: $a = g$ downward, independent of mass (no air resistance).`,
    derivations: r`From $a = \frac{dv}{dt}$ constant: $v = u + at$. Integrating $v = \frac{dx}{dt}$: $s = ut + \frac12at^2$. Eliminating $t$: $v^2 = u^2 + 2as$.

**Displacement in the $n$th second:** $s_n = s(n) - s(n-1) = u + \frac a2(2n - 1)$.`,
    formulas: r`- $v = u + at$, $s = ut + \tfrac12at^2$, $v^2 = u^2 + 2as$, $s = \tfrac{u + v}{2}t$ — constant acceleration only.
- $s_{n\text{th}} = u + \dfrac a2(2n - 1)$.
- $v = \dfrac{dx}{dt}$, $a = \dfrac{dv}{dt} = v\dfrac{dv}{dx}$; $x = \int v\,dt$, $v = \int a\,dt$.
- Vertical throw with speed $u$: max height $\dfrac{u^2}{2g}$, time to top $\dfrac ug$, total time $\dfrac{2u}{g}$.
- Dropped from height $h$: $t = \sqrt{\dfrac{2h}g}$, impact speed $\sqrt{2gh}$.
- Average velocity for constant $a$: $\dfrac{u + v}2$. Two equal distances at $v_1, v_2$: average speed $\dfrac{2v_1v_2}{v_1 + v_2}$; two equal times: $\dfrac{v_1 + v_2}2$.
- Stopping distance: $\dfrac{u^2}{2a}$ (proportional to $u^2$).`,
    diagrams: r`Motion diagram: dots at equal time intervals — growing spacing means speeding up, shrinking means slowing down.`,
    graphs: r`- $x$–$t$ straight line: uniform velocity; parabola: uniform acceleration.
- $v$–$t$ straight line: uniform acceleration (slope $a$).
- $a$–$t$: area gives change in velocity.`,
    specialCases: r`- Body thrown up returns with the same speed (no drag).
- Distances in successive equal intervals from rest under uniform $a$ are in ratio $1:3:5:\dots$ (Galileo).`,
    exceptions: r`The equations $v = u + at$ etc. fail when acceleration varies (e.g. $a = kx$ or $a = -kv$); integrate instead.`,
    assumptions: r`Point particle; free-fall problems neglect air resistance and take $g$ constant.`,
    applications: r`Braking distances, reaction time, free-fall timing.`,
    patterns: r`- Interpreting and converting between $x$–$t$, $v$–$t$, $a$–$t$ graphs.
- Variable acceleration given as $a(t)$, $a(x)$ or $a(v)$.
- Ball thrown up from a moving lift or balloon.
- Distance vs displacement when the body reverses.`,
    misconceptions: r`- "Zero velocity means zero acceleration." At the top of a throw $v = 0$ but $a = g$.
- "Negative acceleration means slowing down." Only if velocity is positive.`,
    traps: r`- Sign of $g$ when the launch is downward.
- Distance in a motion that reverses: split at the turning point.`,
    summary: r`- Three equations for constant $a$; $s_n = u + \frac a2(2n-1)$.
- Slope of $x$–$t$ = $v$; slope of $v$–$t$ = $a$; area of $v$–$t$ = displacement.
- $a = v\,\frac{dv}{dx}$ for position-dependent acceleration.`,
  }),

  note("vectors-in-kinematics", {
    introduction: r`Motion in two dimensions needs vectors: displacement, velocity and acceleration have direction. Resolving vectors into components turns 2D problems into two 1D problems, and relative velocity handles moving observers.`,
    prerequisites: r`- Trigonometry
- One-dimensional kinematics`,
    concept: r`A vector is an arrow; adding vectors means placing them head to tail. Any vector can be split into perpendicular components that act independently. The velocity of A **as seen by** B is A's velocity minus B's velocity.`,
    theory: r`$\vec A = A_x\hat i + A_y\hat j$ with $A_x = A\cos\theta$, $A_y = A\sin\theta$. Relative velocity: $\vec v_{AB} = \vec v_A - \vec v_B$. Velocity of a swimmer relative to ground $= $ velocity relative to water $+$ velocity of water.`,
    definitions: r`- **Resultant:** single vector equivalent to several.
- **Relative velocity** $\vec v_{AB}$: velocity of A in B's frame.
- **Drift:** downstream displacement while crossing a river.`,
    principles: r`1. Parallelogram/triangle law of addition.
2. Perpendicular components are independent.
3. Shortest time to cross a river: head straight across; shortest path (zero drift): head upstream so the resultant is perpendicular to the bank (possible only if swimmer speed > river speed).`,
    derivations: r`**Resultant of two vectors.** By the cosine rule on the parallelogram, $R^2 = A^2 + B^2 + 2AB\cos\theta$ and the direction satisfies $\tan\alpha = \frac{B\sin\theta}{A + B\cos\theta}$.

**River crossing (width $d$, river speed $u$, swimmer speed $v$ relative to water).** Heading straight across: $t = d/v$, drift $= ud/v$.`,
    formulas: r`- $R = \sqrt{A^2 + B^2 + 2AB\cos\theta}$, $\tan\alpha = \dfrac{B\sin\theta}{A + B\cos\theta}$ ($\alpha$ measured from $\vec A$).
- $|A - B| \le |\vec A + \vec B| \le A + B$.
- Components: $A_x = A\cos\theta$, $A_y = A\sin\theta$; $A = \sqrt{A_x^2 + A_y^2}$.
- Relative velocity: $\vec v_{AB} = \vec v_A - \vec v_B$.
- River: minimum time $t = \dfrac dv$, drift $= \dfrac{ud}{v}$; zero drift heading upstream at $\sin\theta = \dfrac uv$ to the perpendicular, time $\dfrac{d}{\sqrt{v^2 - u^2}}$ — needs $v > u$.
- Rain–man: apparent rain velocity $\vec v_{rm} = \vec v_r - \vec v_m$; hold the umbrella along $-\vec v_{rm}$.
- Closest approach of two bodies: minimise $|\vec r_{AB} + \vec v_{AB}t|$.`,
    diagrams: r`Draw velocity triangles: $\vec v_{\text{ground}} = \vec v_{\text{relative}} + \vec v_{\text{medium}}$ for boats, aircraft in wind and rain.`,
    graphs: r`In the frame of B, A moves in a straight line with velocity $\vec v_{AB}$ (if both have constant velocities).`,
    specialCases: r`- Two equal vectors at $120^\circ$: resultant equals each in magnitude.
- At $90^\circ$: $R = \sqrt{A^2 + B^2}$.`,
    exceptions: r`Zero-drift crossing is impossible if $v \le u$; then minimum drift heading is $\sin\phi = v/u$.`,
    assumptions: r`Uniform velocities; Galilean (non-relativistic) addition.`,
    applications: r`Aircraft navigation in wind, boats in currents, rain and umbrella angles.`,
    patterns: r`- River-boat minimum time / minimum drift.
- Rain appearing vertical when the man moves.
- Relative motion of two particles: time and distance of closest approach.`,
    misconceptions: r`- "Swimming upstream at an angle always minimises time." Time depends only on the velocity component across the river.`,
    traps: r`- Mixing up the swimmer's velocity relative to water with relative to ground.
- Direction angle measured from the wrong reference.`,
    summary: r`- $R^2 = A^2 + B^2 + 2AB\cos\theta$.
- $\vec v_{AB} = \vec v_A - \vec v_B$.
- River: $t_{\min} = d/v$; zero drift needs $v > u$.`,
  }),

  note("uniform-circular-motion", {
    introduction: r`An object moving in a circle at constant speed is still accelerating, because its direction keeps changing. This **centripetal acceleration** points to the centre.`,
    prerequisites: r`- Vectors and velocity
- Radian measure`,
    concept: r`The velocity vector has constant length but rotates; the change points inward. The faster the speed and the tighter the circle, the larger the inward acceleration $\frac{v^2}{r}$.`,
    theory: r`Angular displacement $\theta$ (rad), angular velocity $\omega = \frac{d\theta}{dt}$, angular acceleration $\alpha = \frac{d\omega}{dt}$. Linear and angular quantities: $s = r\theta$, $v = r\omega$, $a_t = r\alpha$.

Centripetal acceleration $a_c = \frac{v^2}{r} = \omega^2r$; in non-uniform circular motion the total acceleration is $\sqrt{a_c^2 + a_t^2}$.`,
    definitions: r`- **Time period** $T = \frac{2\pi}{\omega}$; **frequency** $f = \frac1T$.
- **Tangential acceleration:** rate of change of speed.`,
    principles: r`1. In uniform circular motion speed is constant, velocity is not.
2. Centripetal acceleration is always perpendicular to velocity, so it changes direction, not speed.`,
    derivations: r`**$a_c = v^2/r$.** In time $\Delta t$ the velocity turns through $\Delta\theta = \omega\Delta t$; $|\Delta\vec v| \approx v\Delta\theta$. So $a = \frac{v\,\Delta\theta}{\Delta t} = v\omega = \frac{v^2}{r}$, directed toward the centre.`,
    formulas: r`- $v = r\omega$, $\omega = \dfrac{2\pi}T = 2\pi f$.
- $a_c = \dfrac{v^2}r = \omega^2r = \dfrac{4\pi^2r}{T^2}$, toward the centre.
- $a_t = \dfrac{dv}{dt} = r\alpha$; net $a = \sqrt{a_c^2 + a_t^2}$.
- Uniform angular acceleration: $\omega = \omega_0 + \alpha t$, $\theta = \omega_0t + \tfrac12\alpha t^2$, $\omega^2 = \omega_0^2 + 2\alpha\theta$.
- Vector form: $\vec v = \vec\omega\times\vec r$.`,
    diagrams: r`Draw the circle, the tangential velocity at a point and the inward acceleration arrow; for non-uniform motion add the tangential component.`,
    graphs: r`$x = r\cos\omega t$ and $y = r\sin\omega t$ are sinusoids — the link to SHM.`,
    specialCases: r`- Hour hand of a clock: $\omega = \frac{2\pi}{12\times3600}$ rad/s; minute hand: $\frac{2\pi}{3600}$ rad/s.`,
    exceptions: r`$a = v^2/r$ gives only the radial part; it is the total acceleration only when speed is constant.`,
    assumptions: r`Fixed centre and radius.`,
    applications: r`Satellites, centrifuges, cars on curves, electrons in magnetic fields.`,
    patterns: r`- Net acceleration in non-uniform circular motion.
- Angular kinematics with constant $\alpha$.
- Relative angular velocity of clock hands.`,
    misconceptions: r`- "No acceleration because speed is constant." Direction changes, so it accelerates.
- "Centrifugal force acts on the body in the ground frame." It is a pseudo-force in the rotating frame.`,
    traps: r`- rpm to rad/s: multiply by $\frac{2\pi}{60}$.`,
    summary: r`- $v = r\omega$, $a_c = v^2/r = \omega^2r$.
- Total $a = \sqrt{a_c^2 + a_t^2}$; angular kinematics mirrors linear.`,
  }),

  note("newtons-laws-and-free-body-diagrams", {
    introduction: r`Newton's laws connect force and motion. Almost every mechanics problem is solved by drawing a free-body diagram (FBD) and applying $\vec F = m\vec a$ along chosen axes.`,
    prerequisites: r`- Vectors and components
- Kinematics`,
    concept: r`Forces change motion; they do not maintain it. A body keeps its velocity unless a net force acts. Forces always come in action–reaction pairs acting on **different** bodies.`,
    theory: r`1. **First law:** net force zero ⇔ constant velocity (inertial frames).
2. **Second law:** $\vec F_{\text{net}} = \frac{d\vec p}{dt} = m\vec a$ (constant mass).
3. **Third law:** $\vec F_{AB} = -\vec F_{BA}$.

In an accelerating (non-inertial) frame with acceleration $\vec a_0$, add a pseudo-force $-m\vec a_0$ to each body.`,
    definitions: r`- **Inertia:** resistance to change in motion, measured by mass.
- **Normal reaction:** contact force perpendicular to the surface. **Tension:** pull along a string.
- **Impulse** $\vec J = \int\vec F\,dt = \Delta\vec p$.`,
    principles: r`1. Isolate each body, draw all forces on it, choose axes along the expected acceleration.
2. Ideal (light, inextensible) string: same tension throughout; constraint relations link accelerations.
3. Light frictionless pulley: tension equal on both sides.`,
    derivations: r`**Atwood machine.** Masses $m_1 > m_2$ over a light pulley: $m_1g - T = m_1a$, $T - m_2g = m_2a$. Adding: $a = \frac{(m_1 - m_2)g}{m_1 + m_2}$, then $T = \frac{2m_1m_2g}{m_1 + m_2}$.`,
    formulas: r`- $\vec F_{\text{net}} = m\vec a = \dfrac{d\vec p}{dt}$; impulse $\vec J = \vec F_{\text{avg}}\Delta t = \Delta\vec p$.
- Atwood machine: $a = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$, $T = \dfrac{2m_1m_2g}{m_1 + m_2}$ — light string and pulley.
- Block on a smooth incline: $a = g\sin\theta$, $N = mg\cos\theta$.
- Apparent weight in a lift: $N = m(g + a)$ going up with acceleration $a$; $m(g - a)$ accelerating down; $0$ in free fall.
- Pseudo-force in a frame of acceleration $\vec a_0$: $-m\vec a_0$.
- Equilibrium of three forces (Lami): $\dfrac{F_1}{\sin\alpha} = \dfrac{F_2}{\sin\beta} = \dfrac{F_3}{\sin\gamma}$, each angle opposite its force.
- Pulley constraint: sum of (length segments) is constant ⇒ sum of (accelerations × number of strands) $= 0$.`,
    diagrams: r`FBD checklist: weight $mg$ down; normal reaction perpendicular to each contact surface; tension along each string away from the body; friction along the surface; applied forces.`,
    graphs: r`Force–time graph: area = impulse = change in momentum.`,
    specialCases: r`- Rope with mass: tension varies along its length.
- Two blocks pushed together by force $F$ on a smooth floor: contact force on the rear block's partner $= \frac{m_2}{m_1 + m_2}F$.`,
    exceptions: r`$F = ma$ (rather than $F = dp/dt$) fails for variable-mass systems like rockets.`,
    assumptions: r`Inertial frame (or pseudo-forces added), ideal strings and pulleys unless stated.`,
    applications: r`Lifts, vehicles, cranes, rocket propulsion.`,
    patterns: r`- Connected bodies, pulleys and constraint relations.
- Apparent weight in lifts.
- Block on wedge (pseudo-force method).
- Impulse from force–time graphs.`,
    misconceptions: r`- "Action and reaction cancel." They act on different bodies.
- "Normal reaction always equals $mg$." Not on inclines or in accelerating lifts.`,
    traps: r`- Including pseudo-forces in an inertial-frame analysis.
- Wrong constraint relation in multi-pulley systems.`,
    summary: r`- FBD → $\sum F = ma$ per axis.
- Atwood: $a = \frac{(m_1 - m_2)g}{m_1 + m_2}$.
- Lift: $N = m(g \pm a)$; pseudo-force $-m\vec a_0$.`,
  }),

  note("friction", {
    introduction: r`Friction opposes relative sliding between surfaces in contact. It can be static (no sliding, adjusts itself) or kinetic (sliding, roughly constant).`,
    prerequisites: r`- Free-body diagrams
- Inclined planes`,
    concept: r`Static friction is self-adjusting: it takes whatever value (up to a maximum) is needed to prevent sliding. Once sliding starts, kinetic friction takes over and is usually slightly smaller.`,
    theory: r`Static: $f_s \le \mu_sN$. Kinetic: $f_k = \mu_kN$, with $\mu_k < \mu_s$ typically. Friction acts along the surface, opposite to relative motion (or to the tendency of relative motion).`,
    definitions: r`- **Coefficient of friction** $\mu$: ratio of limiting friction to normal reaction.
- **Angle of friction** $\lambda$: $\tan\lambda = \mu$. **Angle of repose** $\theta$: steepest incline on which a body rests; $\tan\theta = \mu_s$.`,
    principles: r`1. Check whether sliding occurs: compare required friction with $\mu_sN$.
2. Friction is independent of apparent contact area (to a good approximation).
3. Friction can cause motion (e.g. a block on an accelerating cart).`,
    derivations: r`**Angle of repose.** On the verge of sliding: $mg\sin\theta = \mu_smg\cos\theta \Rightarrow \tan\theta = \mu_s$.

**Minimum force to move a block on a horizontal surface.** Pull at angle $\phi$ above horizontal: $F\cos\phi = \mu(mg - F\sin\phi) \Rightarrow F = \frac{\mu mg}{\cos\phi + \mu\sin\phi}$, minimum when $\tan\phi = \mu$: $F_{\min} = \frac{\mu mg}{\sqrt{1 + \mu^2}}$.`,
    formulas: r`- Static: $0 \le f_s \le \mu_sN$; kinetic: $f_k = \mu_kN$.
- Angle of repose: $\tan\theta = \mu_s$.
- Block sliding down a rough incline: $a = g(\sin\theta - \mu_k\cos\theta)$; up the incline (decelerating): $a = g(\sin\theta + \mu_k\cos\theta)$.
- Force to push a block up an incline at constant speed: $mg(\sin\theta + \mu\cos\theta)$; to prevent sliding down: $mg(\sin\theta - \mu\cos\theta)$.
- Minimum pull on level ground: $F_{\min} = \dfrac{\mu mg}{\sqrt{1 + \mu^2}}$ at $\tan\phi = \mu$.
- Block on a block: top block moves with the bottom one if the required acceleration $\le \mu_sg$.
- Stopping distance on a level road: $\dfrac{u^2}{2\mu g}$.`,
    diagrams: r`FBD on an incline: $mg\sin\theta$ down the slope, $mg\cos\theta$ into it, $N$ out of it, friction along the slope opposing the (tendency of) motion.`,
    graphs: r`Applied force vs friction: friction rises linearly (equal to the applied force) up to $\mu_sN$, then drops to $\mu_kN$ once sliding starts.`,
    specialCases: r`- On a vertical wall, a block pressed with force $F$ stays put if $\mu F \ge mg$.
- Rolling friction is much smaller than sliding friction.`,
    exceptions: r`Do not write $f = \mu N$ unless sliding occurs or is just about to occur.`,
    assumptions: r`Dry surfaces; $\mu$ constant.`,
    applications: r`Brakes, tyres, walking, belts and pulleys.`,
    patterns: r`- Two-block systems: does the top block slip?
- Incline problems: range of forces for equilibrium.
- Time and distance for blocks placed on moving belts or carts.`,
    misconceptions: r`- "Friction always opposes motion." It opposes **relative** motion; it can drive motion.
- "Friction is always $\mu N$." Static friction can be less.`,
    traps: r`- Normal reaction changes when the applied force has a vertical component.
- Direction of friction on each block in stacked systems.`,
    summary: r`- $f_s \le \mu_sN$, $f_k = \mu_kN$.
- Angle of repose $\tan\theta = \mu_s$.
- Incline: $a = g(\sin\theta \mp \mu\cos\theta)$.`,
  }),

  note("dynamics-of-circular-motion", {
    introduction: r`For circular motion, a real force (gravity, tension, friction, normal reaction) must supply the centripetal force $\frac{mv^2}{r}$. Banked roads and vertical circles are the classic applications.`,
    prerequisites: r`- Uniform circular motion
- Friction and FBDs`,
    concept: r`There is no special "centripetal force" — it is the name for the net inward component of the real forces. Write $\sum F_{\text{inward}} = \frac{mv^2}{r}$.`,
    theory: r`Level road: friction provides $\frac{mv^2}{r}$, so $v_{\max} = \sqrt{\mu rg}$. Banked road at angle $\theta$: the normal reaction's horizontal component helps; without friction the ideal speed is $\sqrt{rg\tan\theta}$.

Vertical circle (string): speed changes as gravity does work; tension varies around the circle.`,
    definitions: r`- **Banking angle:** tilt of the road toward the centre.
- **Critical speed:** minimum speed at the top of a vertical circle for the string to stay taut.`,
    principles: r`1. Inward net force $= mv^2/r$; tangential net force changes the speed.
2. In a vertical circle, energy conservation links speeds at different heights.`,
    derivations: r`**Banked road with friction (maximum speed).** Along vertical: $N\cos\theta = mg + f\sin\theta$; horizontal: $N\sin\theta + f\cos\theta = \frac{mv^2}{r}$ with $f = \mu N$. Dividing: $v_{\max} = \sqrt{rg\frac{\tan\theta + \mu}{1 - \mu\tan\theta}}$.

**Vertical circle.** At the top with the string just slack, $T = 0$: $mg = \frac{mv_{\text{top}}^2}{r} \Rightarrow v_{\text{top}} = \sqrt{gr}$. Energy: $v_{\text{bottom}}^2 = v_{\text{top}}^2 + 4gr = 5gr$.`,
    formulas: r`- Level curve: $v_{\max} = \sqrt{\mu rg}$.
- Banked, frictionless: $\tan\theta = \dfrac{v^2}{rg}$.
- Banked with friction: $v_{\max} = \sqrt{rg\dfrac{\tan\theta + \mu}{1 - \mu\tan\theta}}$, $v_{\min} = \sqrt{rg\dfrac{\tan\theta - \mu}{1 + \mu\tan\theta}}$.
- Vertical circle (string/inside track): minimum speed at bottom $\sqrt{5gr}$, at top $\sqrt{gr}$; $T_{\text{bottom}} - T_{\text{top}} = 6mg$ (for a complete circle).
- Tension at angle $\theta$ from the bottom: $T = \dfrac{mv^2}{r} + mg\cos\theta$.
- Rod (rigid) in a vertical circle: minimum speed at top $= 0$, at bottom $\sqrt{4gr}$.
- Conical pendulum: $\tan\theta = \dfrac{v^2}{rg}$, period $2\pi\sqrt{\dfrac{L\cos\theta}{g}}$.
- Car on a convex bridge top: $N = mg - \dfrac{mv^2}{r}$; loses contact at $v = \sqrt{gr}$.`,
    diagrams: r`On a banked road, resolve $N$ into $N\cos\theta$ (up) and $N\sin\theta$ (toward the centre).`,
    graphs: r`Tension around a vertical circle is largest at the bottom and smallest at the top.`,
    specialCases: r`- If $\sqrt{2gr} < v_{\text{bottom}} < \sqrt{5gr}$, the string slackens above the horizontal diameter.
- If $v_{\text{bottom}} \le \sqrt{2gr}$, the bob oscillates below the horizontal.`,
    exceptions: r`Banking formulas with friction assume the car is on the verge of slipping up (max) or down (min).`,
    assumptions: r`Point mass, light inextensible string, no air drag.`,
    applications: r`Highway and race-track banking, roller coasters, cyclists leaning ($\tan\theta = v^2/rg$).`,
    patterns: r`- Speed range on a banked road with friction.
- Vertical circle: tension, slack point, minimum speed.
- Conical pendulum period.`,
    misconceptions: r`- "Centrifugal force pushes the car outward." In the ground frame, the car simply tends to move straight; friction pulls it inward.`,
    traps: r`- Using $\sqrt{gr}$ (top) when the question asks about the bottom.
- Rod vs string in vertical circles.`,
    summary: r`- Level: $v_{\max} = \sqrt{\mu rg}$; banking $\tan\theta = v^2/rg$.
- Vertical circle: $v_{\text{top}} \ge \sqrt{gr}$, $v_{\text{bottom}} \ge \sqrt{5gr}$, $T_b - T_t = 6mg$.`,
  }),

  note("conservation-of-linear-momentum", {
    introduction: r`If no external force acts on a system, its total momentum stays constant. This law solves recoil, explosion and collision problems without knowing the internal forces.`,
    prerequisites: r`- Newton's laws
- Vectors`,
    concept: r`Internal forces come in equal and opposite pairs (third law), so they cancel in the total. Only external forces can change a system's total momentum.`,
    theory: r`$\vec p = m\vec v$. For a system: $\frac{d\vec P}{dt} = \vec F_{\text{ext}}$. If $\vec F_{\text{ext}} = 0$, $\vec P$ is constant — component-wise, even if only one component of external force vanishes.`,
    definitions: r`- **Impulse** $= \Delta\vec p = \int\vec F\,dt$.
- **Recoil:** backward motion of a gun or launcher when it fires forward.`,
    principles: r`1. Momentum is conserved in every collision and explosion (external impulse negligible during the short interaction).
2. Conservation can hold along one direction only (e.g. horizontal, when gravity acts vertically).`,
    derivations: r`**Recoil of a gun.** Initially $P = 0$. After firing, $mv + MV = 0 \Rightarrow V = -\frac{m}{M}v$.

**Rocket (variable mass).** Exhaust speed $u$ relative to the rocket: thrust $= u\frac{dm}{dt}$; with no gravity, $v = u\ln\frac{m_0}{m}$.`,
    formulas: r`- $\vec p = m\vec v$; $\sum\vec p_{\text{initial}} = \sum\vec p_{\text{final}}$ when $\vec F_{\text{ext}} = 0$.
- Impulse $\vec J = \int\vec F\,dt = \Delta\vec p$.
- Recoil: $V = -\dfrac mMv$; recoil energy $\dfrac{p^2}{2M}$ (smaller for heavier gun).
- $KE = \dfrac{p^2}{2m}$; same momentum ⇒ lighter body has more KE.
- Rocket thrust $F = u\dfrac{dm}{dt}$; $v = v_0 + u\ln\dfrac{m_0}{m}$ (no gravity). *(Beyond JEE Main 2027.)*
- Explosion of a body at rest into two pieces: momenta equal and opposite; $\dfrac{KE_1}{KE_2} = \dfrac{m_2}{m_1}$.
- Man walking on a plank on frictionless ice: the centre of mass stays fixed.`,
    diagrams: r`Before/after sketches with momentum arrows; add arrows head-to-tail to check the vector sum in 2D explosions.`,
    graphs: r`$F$–$t$ graph: area under the curve = impulse.`,
    specialCases: r`- Body at rest explodes into three pieces: momenta form a closed triangle.
- Bullet embedding in a block: momentum conserved, kinetic energy is not.`,
    exceptions: r`Momentum is not conserved if a significant external impulse acts during the event (e.g. a bat hitting a ball is external to the ball alone).`,
    assumptions: r`System boundary chosen so that internal forces cancel.`,
    applications: r`Gun recoil, rockets, jet propulsion, collisions in sports and traffic.`,
    patterns: r`- Recoil and explosion speeds and energies.
- Bullet–block systems with subsequent motion (pendulum, spring, friction).
- Man on boat/plank — centre of mass fixed.`,
    misconceptions: r`- "Kinetic energy is conserved whenever momentum is." Only in elastic collisions.`,
    traps: r`- Treating velocity relative to the moving gun as relative to the ground.`,
    summary: r`- $\vec F_{\text{ext}} = 0 \Rightarrow \vec P$ constant (also per component).
- Impulse $= \Delta p$; recoil $V = -mv/M$; $KE = p^2/2m$.`,
  }),
];
