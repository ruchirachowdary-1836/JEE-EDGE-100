import { withFormulaSheet } from "./note-helpers";
import { LEGACY_SHEETS } from "./notes-legacy-sheets";
import { PHY_MODERN_NOTES } from "./notes-phy-modern";
import { PHY_MECHANICS_NOTES } from "./notes-phy-mechanics";
import { PHY_ENERGY_MATTER_NOTES } from "./notes-phy-energy-matter";
import { PHY_THERMAL_WAVES_NOTES } from "./notes-phy-thermal-waves";
import { PHY_ELECTRICITY_NOTES } from "./notes-phy-electricity";
import type { NoteSeed } from "./types";

const BASE_PHYSICS: NoteSeed[] = [
  {
    topic: "projectile-motion",
    sections: [
      { key: "introduction", title: "Introduction", body: `A **projectile** is any body that, after being launched, moves under the influence of gravity alone. A thrown ball, a jet of water from a hose and a bullet fired horizontally are all projectiles (once air resistance is neglected).

The central idea of this topic is surprisingly simple: **a two-dimensional motion can be split into two independent one-dimensional motions** — uniform motion horizontally and uniformly accelerated motion vertically.` },
      { key: "prerequisites", title: "Prerequisite knowledge", body: `- Equations of uniformly accelerated motion: $v = u + at$, $s = ut + \\tfrac12 at^2$, $v^2 = u^2 + 2as$
- Resolving a vector into perpendicular components: $u_x = u\\cos\\theta$, $u_y = u\\sin\\theta$
- Basic trigonometric identities, especially $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$` },
      { key: "concept", title: "Concept from the basics", body: `Place the origin at the launch point, with $x$ horizontal and $y$ vertically upward. Gravity acts only along $-y$, so:

- Horizontally, $a_x = 0$. The horizontal velocity never changes: $v_x = u\\cos\\theta$ for the whole flight.
- Vertically, $a_y = -g$. The vertical velocity decreases by $g$ every second on the way up, becomes zero at the top, then grows downward.

Because the two directions are perpendicular, what happens in one does not affect the other. The **only link between them is time**: both motions last for exactly the same duration.` },
      { key: "theory", title: "Detailed theory", body: `At any time $t$ after launch with speed $u$ at angle $\\theta$ above the horizontal:

$$x = (u\\cos\\theta)\\,t, \\qquad y = (u\\sin\\theta)\\,t - \\tfrac12 g t^2$$

$$v_x = u\\cos\\theta, \\qquad v_y = u\\sin\\theta - g t$$

The speed is $v = \\sqrt{v_x^2 + v_y^2}$ and the velocity makes angle $\\alpha$ with the horizontal where $\\tan\\alpha = v_y / v_x$. The velocity is always **tangent to the path**; the acceleration is always $g$ vertically downward — even at the highest point.` },
      { key: "definitions", title: "Definitions", body: `- **Time of flight (T):** total time the projectile spends in the air before returning to the launch level.
- **Maximum height (H):** greatest vertical displacement above the launch level.
- **Horizontal range (R):** horizontal distance covered when the projectile returns to the launch level.
- **Angle of projection (θ):** angle between the initial velocity and the horizontal.` },
      { key: "principles", title: "Important principles", body: `1. **Independence of motion:** horizontal and vertical motions are independent and share only time.
2. **Symmetry (level ground, no drag):** time to rise = time to fall; speed at equal heights is equal on the way up and down.
3. **Complementary angles:** $\\theta$ and $90^\\circ - \\theta$ give the same range because $\\sin 2\\theta = \\sin(180^\\circ - 2\\theta)$.
4. **Energy view:** only gravity does work, so $\\tfrac12 m u^2 = \\tfrac12 m v^2 + m g y$ at every point.` },
      { key: "derivations", title: "Derivations", body: `**Time of flight.** The projectile returns to the launch level when $y = 0$:
$$0 = (u\\sin\\theta)T - \\tfrac12 g T^2 \\;\\Rightarrow\\; T = \\frac{2u\\sin\\theta}{g}$$

**Maximum height.** At the top $v_y = 0$, so using $v^2 = u^2 + 2as$ vertically:
$$0 = u^2\\sin^2\\theta - 2gH \\;\\Rightarrow\\; H = \\frac{u^2\\sin^2\\theta}{2g}$$

**Range.** Horizontal velocity is constant for time $T$:
$$R = (u\\cos\\theta)\\cdot\\frac{2u\\sin\\theta}{g} = \\frac{u^2\\sin 2\\theta}{g}$$

**Trajectory.** Eliminate $t = x/(u\\cos\\theta)$ from the $y$ equation:
$$y = x\\tan\\theta - \\frac{g x^2}{2u^2\\cos^2\\theta} = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)$$
This is a downward-opening parabola.` },
      { key: "diagrams", title: "Diagram", body: `The live diagram below draws the path, the constant horizontal velocity component and the changing vertical component. Change the angle and speed, and watch $v_y$ shrink to zero at the top.`, animationKey: "projectile" },
      { key: "graphs", title: "Graphs", body: `- $x$–$t$: straight line through the origin (slope $u\\cos\\theta$).
- $y$–$t$: downward parabola, maximum at $t = T/2$.
- $v_x$–$t$: horizontal line.
- $v_y$–$t$: straight line with slope $-g$, crossing zero at $T/2$.
- Speed–$t$: decreases to a minimum $u\\cos\\theta$ at the top (not zero!), then increases symmetrically.` },
      { key: "specialCases", title: "Special cases", body: `- $\\theta = 45^\\circ$: maximum range $R_{max} = u^2/g$; then $H = R_{max}/4$.
- $\\theta = 90^\\circ$: vertical throw, $R = 0$, $H = u^2/2g$, $T = 2u/g$.
- **Horizontal projection from height $h$:** $T = \\sqrt{2h/g}$ (independent of launch speed), $R = u\\sqrt{2h/g}$.
- When $R = H$: $\\tan\\theta = 4$.
- Relation $\\tan\\theta = 4H/R$ holds for every level-ground projectile.` },
      { key: "exceptions", title: "Exceptions", body: `- The formulas $T = 2u\\sin\\theta/g$, $H$, $R$ apply **only when launch and landing points are at the same level**. For projection from a cliff or onto an incline, return to the component equations.
- On an inclined plane, the maximum range is **not** at $45^\\circ$ to the horizontal; it occurs when the velocity bisects the angle between the incline and the vertical.` },
      { key: "assumptions", title: "Assumptions and limitations", body: `- Air resistance is negligible.
- $g$ is constant in magnitude and direction (heights and ranges small compared with Earth's radius).
- Earth's rotation and curvature are ignored.
- The body is treated as a point particle (no spin, no lift).

Real long-range projectiles (artillery, golf balls) deviate strongly from the parabola because of drag and spin.` },
      { key: "applications", title: "Applications", body: `- Sports: the release angle of a javelin or a basketball shot.
- Water fountains and fire-hose jets.
- Dropping relief packages from an aircraft: the package keeps the aircraft's horizontal velocity, so it must be released *before* the aircraft is above the target.` },
      { key: "patterns", title: "JEE Main question patterns", body: `- Ratio problems: two projectiles with complementary angles, or same $H$ with different $R$.
- Projection from a tower or cliff, sometimes with an upward angle.
- Finding the velocity (magnitude and direction) at a given time or height.
- Using the trajectory equation: "the path is $y = ax - bx^2$, find $u$ and $\\theta$" — compare with $y = x\\tan\\theta - \\dfrac{g x^2}{2u^2\\cos^2\\theta}$.
- Relative motion between two projectiles: their relative acceleration is zero, so relative motion is a straight line.` },
      { key: "misconceptions", title: "Common misconceptions", body: `- "Velocity is zero at the top." Only the vertical component is zero; the speed there is $u\\cos\\theta$.
- "Acceleration is zero at the top." Acceleration is $g$ downward throughout.
- "A heavier ball goes farther." Without air resistance, mass does not appear in any formula.
- "A bullet fired horizontally falls more slowly than one dropped." Both reach the ground at the same time from the same height.` },
      { key: "traps", title: "Common examination traps", body: `- Using $R = u^2\\sin 2\\theta / g$ for a projectile thrown from a height.
- Measuring $\\theta$ from the vertical instead of the horizontal (read the question!).
- Forgetting that "angle of velocity with horizontal at time $t$" needs both components, not just $v_y$.
- Sign errors when the projectile is thrown downward from a height: keep a consistent upward-positive convention.` },
      { key: "summary", title: "Quick revision summary", body: `$$T = \\frac{2u\\sin\\theta}{g},\\quad H = \\frac{u^2\\sin^2\\theta}{2g},\\quad R = \\frac{u^2\\sin 2\\theta}{g},\\quad y = x\\tan\\theta\\left(1-\\frac{x}{R}\\right)$$

- Horizontal: constant velocity. Vertical: acceleration $-g$. Shared quantity: time.
- Max range at $45^\\circ$; complementary angles give equal range; $\\tan\\theta = 4H/R$.
- Level-ground formulas only for equal launch and landing heights.` },
    ],
  },
  {
    topic: "simple-harmonic-motion",
    sections: [
      { key: "introduction", title: "Introduction", body: `**Simple harmonic motion (SHM)** is the to-and-fro motion of a body about a fixed equilibrium position in which the restoring force is proportional to the displacement and directed toward equilibrium. It is the simplest model of oscillation and describes springs, pendulums (for small angles), vibrating molecules and AC circuits.` },
      { key: "prerequisites", title: "Prerequisite knowledge", body: `- Newton's second law, $F = ma$
- Derivatives of $\\sin$ and $\\cos$
- Hooke's law, $F = -kx$
- Kinetic and potential energy` },
      { key: "concept", title: "Concept from the basics", body: `Pull a block attached to a spring and release it. The spring pulls it back; it overshoots the equilibrium because it has speed there; the spring now pushes it back again. The farther the block is from equilibrium, the harder it is pulled back.

That proportionality, $F \\propto -x$, is the defining feature. Any system whose restoring force behaves like this — at least for small displacements — performs SHM.` },
      { key: "theory", title: "Detailed theory", body: `The defining equation is
$$\\frac{d^2x}{dt^2} = -\\omega^2 x$$
whose general solution is
$$x(t) = A\\sin(\\omega t + \\phi)$$
where $A$ is the amplitude, $\\omega$ the angular frequency and $\\phi$ the initial phase. Then
$$v = A\\omega\\cos(\\omega t + \\phi) = \\pm\\,\\omega\\sqrt{A^2 - x^2}, \\qquad a = -\\omega^2 x$$
The time period is $T = 2\\pi/\\omega$ and the frequency $f = 1/T$.` },
      { key: "definitions", title: "Definitions", body: `- **Amplitude (A):** maximum displacement from equilibrium.
- **Time period (T):** time for one complete oscillation.
- **Phase:** the argument $(\\omega t + \\phi)$; it fixes the state (position and direction of motion) of the oscillator.
- **Angular frequency (ω):** $2\\pi$ times the frequency, in rad/s.` },
      { key: "principles", title: "Important principles", body: `1. **Restoring-force criterion:** if $F = -kx$ then $\\omega = \\sqrt{k/m}$. To find the period of any system, write its restoring force (or torque) in this form.
2. **Energy conservation:** $E = \\tfrac12 kA^2$ stays constant; it trades between $KE = \\tfrac12 k(A^2 - x^2)$ and $PE = \\tfrac12 kx^2$.
3. **Phase relations:** velocity leads displacement by $\\pi/2$; acceleration leads displacement by $\\pi$.
4. **SHM as a projection** of uniform circular motion onto a diameter.` },
      { key: "derivations", title: "Derivations", body: `**Spring–mass system.** Newton's law gives $m\\ddot x = -kx$, so $\\ddot x = -(k/m)x$. Comparing with $\\ddot x = -\\omega^2 x$:
$$\\omega = \\sqrt{\\frac{k}{m}}, \\qquad T = 2\\pi\\sqrt{\\frac{m}{k}}$$

**Simple pendulum.** For a bob of mass $m$ on a string of length $L$, the restoring torque about the pivot is $-mgL\\sin\\theta$. With moment of inertia $mL^2$:
$$mL^2\\ddot\\theta = -mgL\\sin\\theta \\approx -mgL\\theta \\quad (\\theta \\text{ small})$$
$$\\Rightarrow\\; \\omega = \\sqrt{\\frac{g}{L}}, \\qquad T = 2\\pi\\sqrt{\\frac{L}{g}}$$

**Velocity–displacement relation.** From $x = A\\sin\\omega t$, $v = A\\omega\\cos\\omega t = \\omega\\sqrt{A^2 - A^2\\sin^2\\omega t} = \\omega\\sqrt{A^2 - x^2}$.` },
      { key: "diagrams", title: "Diagram", body: `The live diagram links a point moving uniformly on a circle to its shadow on the diameter. The shadow performs SHM. Use step mode to see how phase sets the position.`, animationKey: "shm" },
      { key: "graphs", title: "Graphs", body: `- $x$–$t$, $v$–$t$, $a$–$t$ are all sinusoids; $v$ is shifted by a quarter period and $a$ by half a period from $x$.
- $v$–$x$: an ellipse $\\dfrac{x^2}{A^2} + \\dfrac{v^2}{A^2\\omega^2} = 1$.
- $a$–$x$: a straight line through the origin with slope $-\\omega^2$.
- $KE$ and $PE$ versus $x$: two parabolas that add to a horizontal line $E$.` },
      { key: "specialCases", title: "Special cases", body: `- Springs in series: $\\dfrac{1}{k} = \\dfrac{1}{k_1} + \\dfrac{1}{k_2}$; in parallel: $k = k_1 + k_2$.
- Cutting a spring into $n$ equal parts multiplies each part's spring constant by $n$.
- Pendulum in a lift accelerating upward with $a$: $T = 2\\pi\\sqrt{L/(g+a)}$.
- Vertical spring: the period is the same as horizontal, $2\\pi\\sqrt{m/k}$; gravity only shifts the equilibrium position.
- $KE = PE$ when $x = A/\\sqrt2$.` },
      { key: "exceptions", title: "Exceptions", body: `- The pendulum period $2\\pi\\sqrt{L/g}$ fails for large amplitudes; the true period is longer.
- A pendulum whose length is comparable to Earth's radius does not obey the simple formula.
- Damped or driven oscillators are not pure SHM; their amplitude changes with time.` },
      { key: "assumptions", title: "Assumptions and limitations", body: `- No friction or air drag (no damping).
- Ideal massless spring obeying Hooke's law within its elastic limit.
- For the pendulum: inextensible massless string, point bob, small angle ($\\sin\\theta \\approx \\theta$, good to about 1% below 15°).` },
      { key: "applications", title: "Applications", body: `- Pendulum clocks and seismometers.
- Vehicle suspension (springs with damping).
- Molecular vibrations used in infrared spectroscopy.
- The mathematics of SHM reappears in LC circuits and alternating currents.` },
      { key: "patterns", title: "JEE Main question patterns", body: `- Finding the period of an unusual system by writing the restoring force: floating bodies, U-tube liquid columns, charged particles.
- Energy-fraction questions: "at what displacement is KE three times PE?"
- Phase and time questions: "minimum time to go from $x = A/2$ to $x = A$".
- Spring combinations and pendulums in accelerating frames.` },
      { key: "misconceptions", title: "Common misconceptions", body: `- "Period depends on amplitude." In ideal SHM it does not (isochronism).
- "Speed is maximum at the extreme positions." It is zero there; acceleration is maximum there.
- "A heavier pendulum bob swings more slowly." Period of a simple pendulum is independent of mass.` },
      { key: "traps", title: "Common examination traps", body: `- Confusing $\\omega$ (rad/s) with frequency $f$ (Hz): $\\omega = 2\\pi f$.
- Using $x = A\\sin\\omega t$ when the particle starts from an extreme (then $x = A\\cos\\omega t$).
- Forgetting that for "time from $x_1$ to $x_2$" the phase difference, not the displacement, is what is proportional to time.` },
      { key: "summary", title: "Quick revision summary", body: `$$a = -\\omega^2 x,\\quad v = \\omega\\sqrt{A^2-x^2},\\quad E = \\tfrac12 m\\omega^2A^2$$
$$T_{spring} = 2\\pi\\sqrt{m/k},\\qquad T_{pendulum} = 2\\pi\\sqrt{L/g}$$

- Write the restoring force as $-kx$ (or torque as $-c\\theta$) and read off $\\omega$.
- Max speed $A\\omega$ at the mean position; max acceleration $A\\omega^2$ at the extremes.` },
    ],
  },
];

export const PHYSICS_NOTES: NoteSeed[] = [...BASE_PHYSICS.map((n) => (LEGACY_SHEETS[n.topic] ? withFormulaSheet(n, LEGACY_SHEETS[n.topic]) : n)), ...PHY_MECHANICS_NOTES, ...PHY_ENERGY_MATTER_NOTES, ...PHY_THERMAL_WAVES_NOTES, ...PHY_ELECTRICITY_NOTES, ...PHY_MODERN_NOTES];
