import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const PHY_ENERGY_MATTER_NOTES: NoteSeed[] = [
  note("work-and-the-work-energy-theorem", {
    introduction: r`Work measures energy transferred by a force acting through a displacement. The work–energy theorem lets you find speeds without tracking accelerations — often the fastest route in JEE.`,
    prerequisites: r`- Dot product
- Integration`,
    concept: r`Only the component of force along the displacement does work. Positive work speeds a body up, negative work slows it down, and a force perpendicular to motion (like the normal force on a level road or the centripetal force) does no work.`,
    theory: r`$W = \int\vec F\cdot d\vec s$; for a constant force $W = Fs\cos\theta$. **Work–energy theorem:** net work done by all forces = change in kinetic energy, $W_{\text{net}} = \Delta K$.`,
    definitions: r`- **Kinetic energy** $K = \frac12mv^2$.
- **Work** (joule, $1\,\text{J} = 1\,\text{N m}$); $1\,\text{eV} = 1.6\times10^{-19}\,\text{J}$, $1\,\text{kWh} = 3.6\times10^6\,\text{J}$.`,
    principles: r`1. Sum the work of all forces (including friction, normal, tension) to get $\Delta K$.
2. Work depends on the frame of reference; the theorem holds in any inertial frame.`,
    derivations: r`**Work–energy theorem.** $W = \int F\,dx = \int m\frac{dv}{dt}dx = \int mv\,dv = \frac12mv^2 - \frac12mu^2$.`,
    formulas: r`- $W = \vec F\cdot\vec s = Fs\cos\theta$ — constant force.
- $W = \int_{x_1}^{x_2}F(x)\,dx$ = area under $F$–$x$ graph.
- $W_{\text{net}} = K_f - K_i$, $K = \tfrac12mv^2 = \dfrac{p^2}{2m}$.
- Work by a spring from $x_1$ to $x_2$: $-\tfrac12k(x_2^2 - x_1^2)$.
- Work by gravity: $mgh$ (going down by $h$); by kinetic friction on a level path of length $d$: $-\mu mgd$.
- Work–energy with friction: $W_{\text{gravity}} + W_{\text{friction}} + W_{\text{applied}} = \Delta K$.`,
    diagrams: r`Mark the angle between force and displacement for each force; work is zero at $90^\circ$.`,
    graphs: r`Area under $F$–$x$ gives work; regions below the axis count negative.`,
    specialCases: r`- Centripetal force does no work in uniform circular motion.
- Static friction does no work on a body that does not slip (e.g. rolling without slipping).`,
    exceptions: r`$W = Fs\cos\theta$ fails for variable force or curved paths with changing angle — integrate.`,
    assumptions: r`Rigid point particle; work of internal forces ignored for a single particle.`,
    applications: r`Braking distance, energy delivered by engines, loop-the-loop speeds.`,
    patterns: r`- Work from force–displacement graphs.
- Speed after a variable force acts.
- Work done by friction / spring in multi-stage motion.`,
    misconceptions: r`- "Holding a heavy bag still is work." No displacement, no work (physically).
- "Work is a vector." It is a scalar.`,
    traps: r`- Sign of work by friction and gravity.
- Forgetting the normal force's work on a moving incline.`,
    summary: r`- $W = \int\vec F\cdot d\vec s$; $W_{\text{net}} = \Delta K$.
- Spring work $-\frac12k(x_2^2 - x_1^2)$; area under $F$–$x$.`,
  }),

  note("potential-energy-and-conservative-forces", {
    introduction: r`For conservative forces (gravity, springs, electrostatic), work depends only on start and end points, so we can define **potential energy**. Mechanical energy is then conserved.`,
    prerequisites: r`- Work–energy theorem
- Differentiation`,
    concept: r`Potential energy is stored work: lift a book and you store energy that gravity returns when it falls. Non-conservative forces such as friction convert mechanical energy into heat, which cannot be recovered by reversing the path.`,
    theory: r`Conservative force: work around any closed path is zero. $\Delta U = -W_{\text{cons}}$ and $F = -\frac{dU}{dx}$.

Mechanical energy $E = K + U$ is conserved when only conservative forces do work; otherwise $\Delta E = W_{\text{non-cons}}$.`,
    definitions: r`- **Stable equilibrium:** $\frac{dU}{dx} = 0$, $\frac{d^2U}{dx^2} > 0$ (minimum of $U$). **Unstable:** maximum of $U$. **Neutral:** $U$ constant.`,
    principles: r`1. Only differences in $U$ are physical; choose the zero conveniently.
2. Force points toward decreasing $U$.`,
    derivations: r`**Spring PE.** $W_{\text{spring}} = \int_0^x(-kx)\,dx = -\frac12kx^2$, so $U = \frac12kx^2$.

**Gravitational PE near Earth.** $W_{\text{gravity}} = -mgh$ when raising by $h$, so $\Delta U = mgh$.`,
    formulas: r`- $\Delta U = -W_{\text{conservative}}$; $F = -\dfrac{dU}{dx}$ (3D: $\vec F = -\nabla U$).
- Gravity near Earth: $U = mgh$; spring: $U = \tfrac12kx^2$.
- Energy conservation: $K_i + U_i = K_f + U_f$ — only conservative forces doing work.
- With friction: $K_i + U_i = K_f + U_f + |W_{\text{friction}}|$.
- Equilibrium: $\dfrac{dU}{dx} = 0$; stable if $\dfrac{d^2U}{dx^2} > 0$.
- Maximum compression of a spring hit by mass $m$ at speed $v$: $x = v\sqrt{\dfrac mk}$.
- Block dropped on a spring from height $h$: $mg(h + x) = \tfrac12kx^2$.`,
    diagrams: r`Energy bar charts (K, U, thermal) before and after show where energy goes.`,
    graphs: r`$U$–$x$ graph: slope gives $-F$; a horizontal line at total energy $E$ shows the allowed region ($K = E - U \ge 0$) and turning points.`,
    specialCases: r`- Pendulum: speed at the bottom $\sqrt{2gL(1 - \cos\theta_0)}$.
- Chain partially hanging over a table edge: use the centre of mass of the hanging part.`,
    exceptions: r`Friction, air drag and the work by muscles are non-conservative; no potential energy can be defined for them.`,
    assumptions: r`Reference level for $U$ fixed throughout the problem.`,
    applications: r`Roller coasters, pendulums, springs in vehicle suspensions, hydroelectric storage.`,
    patterns: r`- Speed at a point using energy conservation.
- Spring compression problems.
- Equilibrium type from $U(x)$; force from $U(x)$.`,
    misconceptions: r`- "Potential energy belongs to one object." It belongs to the interacting system.`,
    traps: r`- Measuring heights from different reference levels in one equation.
- Forgetting the extra fall $x$ when a mass compresses a spring after dropping.`,
    summary: r`- $F = -dU/dx$; stable equilibrium at minimum of $U$.
- $U = mgh$, $\frac12kx^2$; $K + U$ conserved without friction.`,
  }),

  note("power-and-collisions", {
    introduction: r`**Power** is the rate of doing work. **Collisions** conserve momentum; whether kinetic energy is also conserved decides their type, characterised by the coefficient of restitution.`,
    prerequisites: r`- Momentum conservation
- Work and energy`,
    concept: r`During a collision, huge internal forces act for a very short time, so external forces are negligible and momentum is conserved. Some kinetic energy may turn into heat, sound or deformation.`,
    theory: r`Coefficient of restitution: $e = \frac{\text{speed of separation}}{\text{speed of approach}}$ (along the line of impact). $e = 1$ elastic, $0 < e < 1$ inelastic, $e = 0$ perfectly inelastic (bodies stick).`,
    definitions: r`- **Average power** $= \frac{W}{t}$; **instantaneous power** $P = \vec F\cdot\vec v$. Unit watt; $1\,\text{hp} = 746\,\text{W}$.
- **Head-on collision:** velocities along the line joining centres.`,
    principles: r`1. Momentum conserved along the line of impact; perpendicular components unchanged (smooth spheres).
2. KE conserved only in elastic collisions.`,
    derivations: r`**1D elastic collision.** Momentum: $m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$; restitution $e = 1$: $v_2 - v_1 = u_1 - u_2$. Solving:
$$v_1 = \frac{(m_1 - m_2)u_1 + 2m_2u_2}{m_1 + m_2}, \quad v_2 = \frac{(m_2 - m_1)u_2 + 2m_1u_1}{m_1 + m_2}$$`,
    formulas: r`- $P = \dfrac{dW}{dt} = \vec F\cdot\vec v$; $P_{\text{avg}} = \dfrac Wt$.
- Elastic 1D: $v_1 = \dfrac{(m_1 - m_2)u_1 + 2m_2u_2}{m_1 + m_2}$, $v_2 = \dfrac{(m_2 - m_1)u_2 + 2m_1u_1}{m_1 + m_2}$.
- General 1D with restitution $e$: $v_1 = \dfrac{m_1u_1 + m_2u_2 - m_2e(u_1 - u_2)}{m_1 + m_2}$, $v_2 = \dfrac{m_1u_1 + m_2u_2 + m_1e(u_1 - u_2)}{m_1 + m_2}$.
- Perfectly inelastic: common velocity $\dfrac{m_1u_1 + m_2u_2}{m_1 + m_2}$; KE loss $= \dfrac{m_1m_2}{2(m_1 + m_2)}(u_1 - u_2)^2$.
- KE loss for restitution $e$: $\dfrac{m_1m_2}{2(m_1 + m_2)}(1 - e^2)(u_1 - u_2)^2$.
- Ball dropped from $h$ bouncing on the floor: rebound height $e^2h$; height after $n$ bounces $e^{2n}h$; total time $\sqrt{\dfrac{2h}g}\dfrac{1 + e}{1 - e}$.
- Equal masses, elastic, head-on: velocities exchange. Oblique elastic collision of equal masses (one at rest): they move off at $90^\circ$.`,
    diagrams: r`Draw the line of impact; resolve velocities along it (changes) and perpendicular to it (unchanged).`,
    graphs: r`Velocity–time for two colliding bodies: they share a common velocity at maximum compression.`,
    specialCases: r`- Heavy body hits a light one at rest elastically: light body moves at almost $2u_1$.
- Light body hits a heavy one: it rebounds with nearly the same speed.`,
    exceptions: r`Restitution formulas apply along the line of impact only, not to the full velocity in oblique collisions.`,
    assumptions: r`Collision time negligible; external impulse ignored.`,
    applications: r`Neutron moderation in reactors (equal masses transfer most energy), car crash analysis, Newton's cradle.`,
    patterns: r`- Final velocities with given $e$.
- Fraction of KE lost or transferred.
- Bouncing ball heights and total time/distance.
- Power of a pump or engine lifting water or moving at constant speed ($P = Fv$).`,
    misconceptions: r`- "In an inelastic collision momentum is lost." Momentum is conserved; KE is lost.`,
    traps: r`- Sign of velocities (choose a positive direction).
- Applying $e$ to the total velocity in oblique collisions.`,
    summary: r`- $P = \vec F\cdot\vec v$.
- Momentum always conserved; $e = \frac{\text{separation}}{\text{approach}}$.
- KE loss $= \frac{m_1m_2}{2(m_1+m_2)}(1-e^2)(u_1-u_2)^2$; bounce height $e^2h$.`,
  }),

  note("centre-of-mass", {
    introduction: r`The **centre of mass** (COM) is the point that moves as if all the mass were concentrated there and all external forces acted on it. It simplifies systems of particles and extended bodies.`,
    prerequisites: r`- Vectors
- Integration (for continuous bodies)`,
    concept: r`Internal forces cancel in pairs, so the COM's motion depends only on external forces. If no external force acts, the COM moves with constant velocity — even while the parts fly apart.`,
    theory: r`$\vec r_{\text{cm}} = \frac{\sum m_i\vec r_i}{\sum m_i}$, or $\frac{1}{M}\int\vec r\,dm$ for continuous bodies. Then $M\vec a_{\text{cm}} = \vec F_{\text{ext}}$ and $\vec P = M\vec v_{\text{cm}}$.`,
    definitions: r`- **Centre of gravity:** point where the total weight acts; coincides with the COM in a uniform field.
- **Linear mass density** $\lambda = dm/dx$.`,
    principles: r`1. Use symmetry: COM lies on axes/planes of symmetry.
2. Removed portion: treat the hole as negative mass.
3. $\vec F_{\text{ext}} = 0$ and initially at rest ⇒ COM stays fixed.`,
    derivations: r`**Semicircular ring (radius $R$).** $dm = \frac{M}{\pi R}R\,d\theta$, $y = R\sin\theta$: $y_{\text{cm}} = \frac1M\int_0^\pi R\sin\theta\,\frac{M}{\pi}d\theta = \frac{2R}{\pi}$.`,
    formulas: r`- $x_{\text{cm}} = \dfrac{\sum m_ix_i}{\sum m_i}$; continuous: $\dfrac{\int x\,dm}{\int dm}$.
- Two particles: COM divides the separation in the inverse ratio of masses; $r_1 = \dfrac{m_2d}{m_1 + m_2}$.
- $\vec v_{\text{cm}} = \dfrac{\sum m_i\vec v_i}{M}$, $M\vec a_{\text{cm}} = \vec F_{\text{ext}}$.
- Standard positions (from the centre of the flat side or centre of curvature): semicircular ring $\dfrac{2R}{\pi}$; semicircular disc $\dfrac{4R}{3\pi}$; hemispherical shell $\dfrac R2$; solid hemisphere $\dfrac{3R}{8}$; solid cone $\dfrac h4$ from the base; hollow cone (curved surface) $\dfrac h3$ from the base.
- Triangle lamina: at the centroid.
- With a cavity: $x_{\text{cm}} = \dfrac{M_1x_1 - m_2x_2}{M_1 - m_2}$.`,
    diagrams: r`Mark symmetry axes first; the COM must lie on them, leaving only one coordinate to compute.`,
    graphs: r`During an explosion in mid-air, the COM continues on the original parabolic path.`,
    specialCases: r`- COM can lie outside the body (ring, boomerang).
- Man moving on a boat on still water: boat moves the opposite way so that the COM stays put.`,
    exceptions: r`Centre of gravity differs from COM in a non-uniform gravitational field (very tall objects).`,
    assumptions: r`Uniform density unless a density function is given.`,
    applications: r`Stability of vehicles and buildings, high-jump technique, rocket staging.`,
    patterns: r`- COM of composite or holed laminas.
- Displacement of a boat when a person walks on it.
- COM motion after explosions.`,
    misconceptions: r`- "COM must be inside the material." Not for rings or L-shapes.`,
    traps: r`- Using area instead of mass for non-uniform laminas.
- Wrong reference for standard COM positions (base vs vertex).`,
    summary: r`- $\vec r_{\text{cm}} = \sum m_i\vec r_i/M$; $M\vec a_{\text{cm}} = \vec F_{\text{ext}}$.
- Semicircular ring $2R/\pi$, disc $4R/3\pi$, solid hemisphere $3R/8$, cone $h/4$.`,
  }),

  note("torque-and-moment-of-inertia", {
    introduction: r`**Torque** is the turning effect of a force; **moment of inertia** is rotational inertia. Together they give the rotational version of Newton's second law, $\tau = I\alpha$.`,
    prerequisites: r`- Cross product
- Integration
- Centre of mass`,
    concept: r`A door turns more easily if you push far from the hinges and perpendicular to the door: torque depends on force and lever arm. Mass far from the axis is harder to spin, so moment of inertia depends on how mass is distributed, not just how much there is.`,
    theory: r`$\vec\tau = \vec r\times\vec F$, $|\tau| = rF\sin\theta = F\times(\text{perpendicular distance})$.
$I = \sum m_ir_i^2 = \int r^2\,dm$ about a given axis. Rotation about a fixed axis: $\tau = I\alpha$.

Equilibrium of a rigid body: $\sum\vec F = 0$ and $\sum\vec\tau = 0$ about any point.`,
    definitions: r`- **Radius of gyration** $k$: $I = Mk^2$.
- **Couple:** two equal and opposite forces not along the same line; produces pure rotation.`,
    principles: r`1. **Parallel axis theorem:** $I = I_{\text{cm}} + Md^2$.
2. **Perpendicular axis theorem** (planar bodies): $I_z = I_x + I_y$.
3. Rotational kinetic energy $\frac12I\omega^2$.`,
    derivations: r`**Rod about its centre.** $dm = \frac ML dx$: $I = \int_{-L/2}^{L/2}x^2\frac MLdx = \frac{ML^2}{12}$. About one end (parallel axis): $\frac{ML^2}{12} + M\left(\frac L2\right)^2 = \frac{ML^2}3$.

**Disc about a diameter.** $I_z = \frac12MR^2$ and by symmetry $I_x = I_y$, so $I_x = \frac14MR^2$.`,
    formulas: r`- $\vec\tau = \vec r\times\vec F$; $\tau = I\alpha$; $W = \int\tau\,d\theta$; $P = \tau\omega$.
- Parallel axis: $I = I_{\text{cm}} + Md^2$. Perpendicular axis (lamina): $I_z = I_x + I_y$.
- Rod (length $L$): $\dfrac{ML^2}{12}$ about centre, $\dfrac{ML^2}{3}$ about an end.
- Ring: $MR^2$ (axis), $\dfrac12MR^2$ (diameter). Disc: $\dfrac12MR^2$ (axis), $\dfrac14MR^2$ (diameter).
- Hollow cylinder: $MR^2$; solid cylinder: $\dfrac12MR^2$ (about its axis).
- Solid sphere: $\dfrac25MR^2$; hollow sphere: $\dfrac23MR^2$ (about a diameter).
- Rectangular plate ($a\times b$) about a perpendicular axis through the centre: $\dfrac{M(a^2 + b^2)}{12}$.
- Rotational KE $= \tfrac12I\omega^2$; angular kinematics as in linear motion with $\theta, \omega, \alpha$.
- Mass on a string wound on a pulley (radius $R$, inertia $I$): $a = \dfrac{mg}{m + I/R^2}$.`,
    diagrams: r`Draw the line of action of each force and drop a perpendicular from the axis: torque = force × that perpendicular.`,
    graphs: r`$I$ against axis distance $d$ is a parabola with minimum at the COM (parallel axis theorem).`,
    specialCases: r`- Torque of gravity on an extended body acts at the COM.
- A ring and a disc of equal mass and radius: ring has twice the $I$ about the axis.`,
    exceptions: r`Perpendicular axis theorem applies only to planar (laminar) bodies.`,
    assumptions: r`Rigid body; fixed axis for $\tau = I\alpha$ (or axis through the COM).`,
    applications: r`Flywheels, wrenches and levers, balancing beams (seesaws), pulleys with mass.`,
    patterns: r`- $I$ of composite bodies using the two theorems.
- Pulley with mass: acceleration and tensions.
- Equilibrium of ladders and beams (forces and torques).
- Torque from $\vec r\times\vec F$ in component form.`,
    misconceptions: r`- "Moment of inertia is a fixed property of a body." It depends on the axis.
- "Tension is the same on both sides of a massive pulley." Not when the pulley has rotational inertia.`,
    traps: r`- Parallel axis theorem must start from the axis through the COM.
- Using $\frac12MR^2$ for a ring.`,
    summary: r`- $\tau = rF\sin\theta = I\alpha$.
- Parallel axis $I_{\text{cm}} + Md^2$; perpendicular axis $I_z = I_x + I_y$.
- Rod $ML^2/12$, ring $MR^2$, disc $MR^2/2$, solid sphere $\frac25MR^2$, hollow sphere $\frac23MR^2$.`,
  }),

  note("angular-momentum-and-rolling", {
    introduction: r`Angular momentum $\vec L$ is conserved when no external torque acts — explaining spinning skaters, planetary orbits and much more. Rolling without slipping combines translation and rotation.`,
    prerequisites: r`- Torque and moment of inertia
- Linear momentum`,
    concept: r`A skater pulling in her arms reduces $I$, so $\omega$ must increase to keep $L = I\omega$ fixed. A rolling wheel's contact point is momentarily at rest, so friction need not do any work.`,
    theory: r`$\vec L = \vec r\times\vec p$; for rotation about a fixed axis $L = I\omega$. $\vec\tau_{\text{ext}} = \frac{d\vec L}{dt}$.

Rolling without slipping: $v_{\text{cm}} = R\omega$ and $a_{\text{cm}} = R\alpha$. Total KE $= \frac12Mv^2 + \frac12I\omega^2 = \frac12Mv^2\left(1 + \frac{k^2}{R^2}\right)$.`,
    definitions: r`- **Rolling without slipping:** contact point has zero velocity relative to the surface.
- **Instantaneous axis of rotation:** passes through the contact point.`,
    principles: r`1. $\tau_{\text{ext}} = 0 \Rightarrow I\omega$ constant.
2. In pure rolling, static friction does no work; mechanical energy is conserved.
3. Top of a rolling wheel moves at $2v_{\text{cm}}$; the contact point is at rest.`,
    derivations: r`**Rolling down an incline (height $h$).** Energy: $Mgh = \frac12Mv^2\left(1 + \frac{k^2}{R^2}\right) \Rightarrow v = \sqrt{\frac{2gh}{1 + k^2/R^2}}$. Acceleration $a = \frac{g\sin\theta}{1 + k^2/R^2}$.`,
    formulas: r`- $\vec L = \vec r\times\vec p$; $L = I\omega$ (fixed axis); $\vec\tau = \dfrac{d\vec L}{dt}$.
- Conservation: $I_1\omega_1 = I_2\omega_2$ when $\tau_{\text{ext}} = 0$.
- Angular momentum of a particle in a straight line: $L = mvd$ ($d$ = perpendicular distance from the origin).
- Rolling: $v = R\omega$, $KE = \tfrac12Mv^2\left(1 + \dfrac{k^2}{R^2}\right)$.
- Incline: $a = \dfrac{g\sin\theta}{1 + k^2/R^2}$, $v = \sqrt{\dfrac{2gh}{1 + k^2/R^2}}$.
- $\dfrac{k^2}{R^2}$: ring $1$, disc/solid cylinder $\tfrac12$, solid sphere $\tfrac25$, hollow sphere $\tfrac23$.
- Minimum friction for rolling on an incline: $\mu \ge \dfrac{\tan\theta}{1 + R^2/k^2}$.
- Rotational KE $= \dfrac{L^2}{2I}$.`,
    diagrams: r`Velocity of points on a rolling wheel: add $v_{\text{cm}}$ (same everywhere) to $\omega\times r$ (tangential); top $2v$, bottom $0$.`,
    graphs: r`Race down an incline: solid sphere arrives first, then disc, hollow sphere, ring (smaller $k^2/R^2$ wins).`,
    specialCases: r`- Sliding without friction (no rolling): $a = g\sin\theta$, faster than any rolling body.
- A ball hit with backspin may slip before pure rolling begins; friction acts until $v = R\omega$.`,
    exceptions: r`Energy is not conserved while slipping occurs (kinetic friction does work).`,
    assumptions: r`Rigid bodies, no deformation at contact.`,
    applications: r`Gyroscopes, ice skaters, wheels, bowling balls.`,
    patterns: r`- Ratio of KE (translational : rotational) for rolling bodies.
- Race of rolling objects down an incline.
- Angular momentum conservation (person on rotating platform, bead sliding on a rod).
- Angular momentum of a particle about a point.`,
    misconceptions: r`- "Friction always wastes energy." In pure rolling it does none.`,
    traps: r`- Using $\frac12Mv^2$ only and forgetting rotational KE.
- $L = I\omega$ requires the axis to be fixed or through the COM.`,
    summary: r`- $\tau = dL/dt$; $\tau = 0 \Rightarrow I\omega$ constant.
- Rolling: $v = R\omega$; $a = \frac{g\sin\theta}{1 + k^2/R^2}$.
- Order down incline: solid sphere < disc < hollow sphere < ring (time).`,
  }),

  note("gravitational-field-and-potential", {
    introduction: r`Newton's law of gravitation explains falling apples and planetary orbits alike. Field and potential describe gravity's effect at every point around a mass.`,
    prerequisites: r`- Inverse-square laws
- Work and potential energy
- Integration`,
    concept: r`Every mass attracts every other mass along the line joining them, with a force falling off as $1/r^2$. The **field** is force per unit mass; the **potential** is potential energy per unit mass — both depend only on the source.`,
    theory: r`$F = \frac{Gm_1m_2}{r^2}$, $G = 6.67\times10^{-11}\,\text{N m}^2\text{kg}^{-2}$. Field $g = \frac{GM}{r^2}$; potential $V = -\frac{GM}{r}$ (zero at infinity); $\vec g = -\nabla V$.

Outside a spherically symmetric body the field is as if all mass were at the centre.`,
    definitions: r`- **Gravitational field intensity** $\vec g = \vec F/m$.
- **Gravitational potential** $V = U/m$.
- **Acceleration due to gravity** at the surface: $g = \frac{GM}{R^2} \approx 9.8\,\text{m s}^{-2}$.`,
    principles: r`1. Superposition: fields and potentials of several masses add (vectorially and algebraically).
2. Inside a uniform spherical shell, the field is zero and the potential is constant.
3. Gravitational PE of two masses $U = -\frac{Gm_1m_2}{r}$.`,
    derivations: r`**$g$ at depth $d$.** Only the mass within radius $R - d$ attracts: $M' = M\frac{(R-d)^3}{R^3}$, so $g_d = \frac{GM'}{(R-d)^2} = g\left(1 - \frac dR\right)$.

**$g$ at height $h$.** $g_h = \frac{GM}{(R+h)^2} = g\left(1 + \frac hR\right)^{-2} \approx g\left(1 - \frac{2h}R\right)$ for $h \ll R$.`,
    formulas: r`- $F = \dfrac{Gm_1m_2}{r^2}$; $g = \dfrac{GM}{R^2}$.
- Height: $g_h = \dfrac{g}{(1 + h/R)^2} \approx g\left(1 - \dfrac{2h}R\right)$ ($h \ll R$).
- Depth: $g_d = g\left(1 - \dfrac dR\right)$; zero at the centre.
- Latitude $\lambda$ (rotation $\omega$): $g' = g - R\omega^2\cos^2\lambda$.
- Potential: point mass/outside sphere $V = -\dfrac{GM}r$; at the surface $-\dfrac{GM}R$; inside a solid sphere $V = -\dfrac{GM}{2R^3}(3R^2 - r^2)$; at its centre $-\dfrac{3GM}{2R}$.
- Shell: $V = -\dfrac{GM}{R}$ inside (constant), field zero inside.
- Ring (radius $a$) on axis at distance $x$: $V = -\dfrac{GM}{\sqrt{a^2 + x^2}}$, $g = \dfrac{GMx}{(a^2 + x^2)^{3/2}}$.
- Potential energy $U = -\dfrac{Gm_1m_2}{r}$; work to move from $r_1$ to $r_2$: $GMm\left(\dfrac1{r_1} - \dfrac1{r_2}\right)$.
- Change in PE when raised by $h$: $\Delta U = \dfrac{mgh}{1 + h/R}$ ($\approx mgh$ for $h \ll R$).`,
    diagrams: r`Field lines point radially inward to the mass; equipotential surfaces are concentric spheres.`,
    graphs: r`$g$ vs $r$ for a solid sphere: rises linearly inside ($\propto r$), maximum at the surface, falls as $1/r^2$ outside. $V$ vs $r$: most negative at the centre, rising toward zero.`,
    specialCases: r`- $g$ decreases faster with height than with depth near the surface ($2h/R$ vs $d/R$).
- At the poles rotation has no effect on $g$.`,
    exceptions: r`The approximation $g(1 - 2h/R)$ fails for $h$ comparable to $R$; use the exact form.`,
    assumptions: r`Spherically symmetric Earth of uniform density for depth formulas.`,
    applications: r`Satellite orbits, variation of weight with altitude and latitude, tides.`,
    patterns: r`- Height/depth at which $g$ falls by a given fraction.
- Field and potential of rings, shells and spheres.
- Work required to move masses apart or to infinity.`,
    misconceptions: r`- "Inside the Earth $g$ increases." It decreases linearly to zero at the centre.
- "Potential energy is positive at large distances." It is negative, approaching zero.`,
    traps: r`- Using the approximate height formula for large $h$.
- Sign of potential energy.`,
    summary: r`- $g = GM/R^2$; $g_h \approx g(1 - 2h/R)$, $g_d = g(1 - d/R)$.
- $V = -GM/r$ outside; $U = -Gm_1m_2/r$.
- Inside a shell: $g = 0$, $V$ constant.`,
  }),

  note("satellites-and-keplers-laws", {
    introduction: r`Satellites stay in orbit because gravity supplies exactly the centripetal force needed. Kepler's laws describe planetary motion and follow from Newton's law of gravitation.`,
    prerequisites: r`- Gravitational field and potential
- Circular motion
- Angular momentum`,
    concept: r`A satellite is always falling toward Earth but moving sideways fast enough that it keeps missing. Escape means giving enough kinetic energy to reach infinity with zero speed.`,
    theory: r`For a circular orbit of radius $r$: $\frac{mv^2}{r} = \frac{GMm}{r^2} \Rightarrow v_o = \sqrt{\frac{GM}{r}}$.

Kepler: (1) orbits are ellipses with the Sun at one focus; (2) equal areas swept in equal times (angular momentum conservation); (3) $T^2 \propto a^3$.`,
    definitions: r`- **Orbital velocity** $v_o$; **escape velocity** $v_e$.
- **Geostationary satellite:** period 24 h, equatorial orbit, same sense as Earth's rotation; radius ≈ 42 000 km (height ≈ 36 000 km).
- **Binding energy:** energy needed to send the satellite to infinity.`,
    principles: r`1. Total energy of a bound orbit is negative.
2. Angular momentum about the Sun is conserved (central force).
3. Escape velocity is independent of the launch direction and of the mass being launched.`,
    derivations: r`**Escape velocity.** $\frac12mv_e^2 - \frac{GMm}{R} = 0 \Rightarrow v_e = \sqrt{\frac{2GM}{R}} = \sqrt{2gR} \approx 11.2\,\text{km/s}$.

**Energy in circular orbit.** $K = \frac12mv_o^2 = \frac{GMm}{2r}$, $U = -\frac{GMm}{r}$, $E = -\frac{GMm}{2r}$.`,
    formulas: r`- Orbital speed $v_o = \sqrt{\dfrac{GM}r}$; near the surface $\sqrt{gR} \approx 7.9\,\text{km/s}$.
- Period $T = 2\pi\sqrt{\dfrac{r^3}{GM}}$ ⇒ $T^2 \propto r^3$ (Kepler's third law, with $r \to a$ for ellipses).
- Escape speed $v_e = \sqrt{\dfrac{2GM}R} = \sqrt{2gR} = \sqrt2\,v_o$ (surface).
- Orbit energies: $K = \dfrac{GMm}{2r}$, $U = -\dfrac{GMm}r$, $E = -\dfrac{GMm}{2r}$; $K = -E$, $U = 2E$.
- Energy to shift orbit from $r_1$ to $r_2$: $\dfrac{GMm}2\left(\dfrac1{r_1} - \dfrac1{r_2}\right)$.
- Areal velocity $\dfrac{dA}{dt} = \dfrac{L}{2m}$ (constant).
- Ellipse: $v_{\text{perihelion}}r_p = v_{\text{aphelion}}r_a$; $a = \dfrac{r_p + r_a}{2}$.
- Geostationary: $T = 24\,\text{h}$, $r = \left(\dfrac{GMT^2}{4\pi^2}\right)^{1/3} \approx 4.2\times10^7\,\text{m}$.`,
    diagrams: r`Elliptical orbit with the Sun at one focus; equal-area wedges are long and thin far away, short and wide near the Sun.`,
    graphs: r`$E$, $K$, $U$ vs $r$ for circular orbits: $K = -E$ and $U = 2E$, all varying as $1/r$.`,
    specialCases: r`- Astronauts feel weightless because they and the craft fall together.
- If gravity suddenly vanished, a satellite would move along the tangent.`,
    exceptions: r`Orbit formulas assume $M \gg m$; for comparable masses use the reduced mass (binary stars).`,
    assumptions: r`Spherically symmetric central body; no atmosphere drag.`,
    applications: r`Communication (geostationary) and polar satellites, GPS, planetary missions.`,
    patterns: r`- Ratios of orbital speed, period and energy for different radii.
- Escape velocity on another planet (scaled $M$ and $R$).
- Kepler's second and third laws with perihelion/aphelion data.
- Energy needed to launch or shift orbits.`,
    misconceptions: r`- "Heavier satellites need higher speed." Orbital speed is independent of satellite mass.
- "Escape velocity depends on launch angle." It does not (ignoring atmosphere).`,
    traps: r`- Using the height $h$ instead of the radius $R + h$.
- Sign of total energy.`,
    summary: r`- $v_o = \sqrt{GM/r}$, $v_e = \sqrt{2GM/R}$, $T^2 \propto r^3$.
- $E = -GMm/2r$; $K = -E$, $U = 2E$.
- Kepler II = angular momentum conservation.`,
  }),

  note("elasticity", {
    introduction: r`Solids deform under force and recover when it is removed, up to the elastic limit. Elastic moduli quantify stiffness for stretching, squeezing and shearing.`,
    prerequisites: r`- Force and area (pressure)
- Hooke's law for springs`,
    concept: r`Stress is the internal restoring force per unit area; strain is the fractional deformation. Within the proportional limit, stress is proportional to strain (Hooke's law), and the ratio is the modulus of elasticity.`,
    theory: r`Young's modulus $Y = \frac{F/A}{\Delta L/L}$ (stretching). Bulk modulus $B = -\frac{\Delta P}{\Delta V/V}$ (volume). Shear modulus $\eta = \frac{F/A}{\theta}$ (shape).

Poisson's ratio $\sigma = -\frac{\text{lateral strain}}{\text{longitudinal strain}}$, theoretically between $-1$ and $0.5$.`,
    definitions: r`- **Stress** $= F/A$ (Pa). **Strain** $= \Delta L/L$ (dimensionless).
- **Elastic limit:** beyond it, permanent set remains. **Breaking stress:** stress at fracture.
- **Compressibility** $= 1/B$.`,
    principles: r`1. Hooke's law: stress ∝ strain within the proportional limit.
2. Elastic potential energy is stored in a stretched wire.
3. Larger modulus = stiffer material (steel is more elastic than rubber in this sense).`,
    derivations: r`**Energy stored in a stretched wire.** Treating the wire as a spring with $k = \frac{YA}{L}$: $U = \frac12k(\Delta L)^2 = \frac12\,\text{stress}\times\text{strain}\times\text{volume}$.

**Extension of a wire under its own weight.** Element at distance $x$ from the bottom carries weight $\frac{Mg x}{L}$; integrating gives $\Delta L = \frac{MgL}{2AY}$.`,
    formulas: r`- $Y = \dfrac{FL}{A\,\Delta L}$; $\Delta L = \dfrac{FL}{AY}$.
- $B = -\dfrac{\Delta P}{\Delta V/V}$; compressibility $K = \dfrac1B$.
- Shear modulus $\eta = \dfrac{F/A}{\theta}$.
- Poisson's ratio $\sigma = -\dfrac{\Delta d/d}{\Delta L/L}$.
- Wire as a spring: $k = \dfrac{YA}L$.
- Energy density $= \tfrac12\,\text{stress}\times\text{strain} = \dfrac{\text{stress}^2}{2Y}$; energy $= \tfrac12F\Delta L$.
- Thermal stress (rod clamped, heated by $\Delta T$): $Y\alpha\Delta T$.
- Wire under its own weight: $\Delta L = \dfrac{MgL}{2AY}$.
- Relations: $Y = 3B(1 - 2\sigma) = 2\eta(1 + \sigma)$.`,
    diagrams: r`Stress–strain curve: linear (proportional limit) → elastic limit → yield point → plastic region → ultimate stress → fracture.`,
    graphs: r`Steeper initial slope = larger Young's modulus; area under the curve up to a strain = energy per unit volume.`,
    specialCases: r`- Two wires of the same material: extension $\propto \frac{L}{r^2}$.
- Liquids and gases have only a bulk modulus (no rigidity).`,
    exceptions: r`Rubber and many polymers do not obey Hooke's law over large strains.`,
    assumptions: r`Small deformations, homogeneous isotropic material.`,
    applications: r`Design of bridges, cranes (minimum rope thickness), springs and beams.`,
    patterns: r`- Extension for given load and wire dimensions; comparing two wires.
- Energy stored in stretched wires.
- Thermal stress in clamped rods.
- Bulk modulus with pressure change (e.g. at ocean depth).`,
    misconceptions: r`- "Rubber is more elastic than steel." Steel has a far larger modulus — it resists deformation more.`,
    traps: r`- Diameter vs radius in area.
- Using $\frac12F\Delta L$ (not $F\Delta L$) for stored energy.`,
    summary: r`- $Y = FL/A\Delta L$; $B = -\Delta P/(\Delta V/V)$; $\eta = (F/A)/\theta$.
- Energy density $\frac12$ stress × strain; thermal stress $Y\alpha\Delta T$.`,
  }),

  note("fluid-mechanics", {
    introduction: r`Fluids (liquids and gases) transmit pressure and flow. Pressure at depth, buoyancy, Bernoulli's principle and viscosity explain everything from dams to aeroplane lift.`,
    prerequisites: r`- Pressure and density
- Energy conservation`,
    concept: r`In a static fluid, pressure increases with depth because the fluid above must be supported. In a flowing ideal fluid, where speed is higher the pressure is lower — energy per unit volume is conserved (Bernoulli).`,
    theory: r`Hydrostatics: $P = P_0 + \rho gh$. Pascal's law: pressure applied to an enclosed fluid is transmitted undiminished. Archimedes: buoyant force = weight of fluid displaced.

Ideal steady flow: continuity $A_1v_1 = A_2v_2$; Bernoulli $P + \frac12\rho v^2 + \rho gh = $ constant along a streamline.

Viscous drag on a sphere (Stokes): $F = 6\pi\eta rv$; terminal velocity follows.`,
    definitions: r`- **Gauge pressure** $= P - P_{\text{atm}}$.
- **Streamline flow:** velocity at each point steady in time. **Turbulent flow:** irregular; onset predicted by Reynolds number $Re = \frac{\rho vD}{\eta}$.
- **Viscosity** $\eta$: internal friction, $F = \eta A\frac{dv}{dx}$.`,
    principles: r`1. Pressure at the same depth in a connected static fluid is the same.
2. Floating body: weight = buoyant force; fraction submerged $= \rho_{\text{body}}/\rho_{\text{fluid}}$.
3. Continuity follows from mass conservation; Bernoulli from energy conservation.`,
    derivations: r`**Torricelli's theorem.** Apply Bernoulli between the open top (speed ≈ 0, pressure $P_0$) and a hole at depth $h$ (pressure $P_0$): $\rho gh = \frac12\rho v^2 \Rightarrow v = \sqrt{2gh}$.

**Terminal velocity.** At terminal speed, weight $=$ buoyancy $+$ drag: $\frac43\pi r^3\rho g = \frac43\pi r^3\sigma g + 6\pi\eta rv_t$ ⇒ $v_t = \frac{2r^2(\rho - \sigma)g}{9\eta}$.`,
    formulas: r`- $P = P_0 + \rho gh$; force on a dam/wall uses average pressure; total hydrostatic thrust on a vertical rectangular wall of width $w$, depth $H$: $\tfrac12\rho gwH^2$.
- Hydraulic lift: $\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2}$.
- Buoyant force $F_B = \rho_{\text{fluid}}V_{\text{sub}}g$; floating: fraction submerged $= \dfrac{\rho_{\text{body}}}{\rho_{\text{fluid}}}$.
- Apparent weight in a liquid $= W\left(1 - \dfrac{\rho_{\text{fluid}}}{\rho_{\text{body}}}\right)$.
- Continuity: $A_1v_1 = A_2v_2$ (volume flow rate $Q = Av$).
- Bernoulli: $P + \tfrac12\rho v^2 + \rho gh = \text{constant}$ — ideal, incompressible, non-viscous, steady flow along a streamline.
- Torricelli: $v = \sqrt{2gh}$; horizontal range from a hole at depth $h$ in a tank of height $H$: $2\sqrt{h(H - h)}$ (maximum at $h = H/2$).
- Venturimeter: $v_1 = A_2\sqrt{\dfrac{2\Delta P}{\rho(A_1^2 - A_2^2)}}$.
- Viscous force $F = \eta A\dfrac{dv}{dx}$; Stokes $F = 6\pi\eta rv$; terminal velocity $v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta}$.
- Poiseuille: $Q = \dfrac{\pi r^4\Delta P}{8\eta L}$.
- Reynolds number $Re = \dfrac{\rho vD}{\eta}$ (laminar below ≈ 2000).`,
    diagrams: r`Streamlines crowd together where the pipe narrows (faster flow, lower pressure); a manometer across the constriction shows the pressure drop.`,
    graphs: r`Velocity of a falling sphere vs time rises and levels off at $v_t$.`,
    specialCases: r`- Liquid in an accelerating container: the free surface tilts with $\tan\theta = a/g$.
- Rotating liquid: surface is a paraboloid, $h = \frac{\omega^2r^2}{2g}$.`,
    exceptions: r`Bernoulli does not apply to viscous or turbulent flow, or across different streamlines in rotational flow.`,
    assumptions: r`Incompressible, non-viscous, steady, irrotational flow for Bernoulli.`,
    applications: r`Hydraulic brakes, aeroplane lift, atomisers, blood flow, ships floating.`,
    patterns: r`- Pressure at depth with multiple liquids (U-tube).
- Floating fraction and apparent weight.
- Efflux speed and range (Torricelli).
- Terminal velocity ratios ($\propto r^2$).`,
    misconceptions: r`- "Pressure depends on the shape of the container." It depends only on depth (hydrostatic paradox).
- "Faster fluid exerts more pressure." Bernoulli says the opposite along a streamline.`,
    traps: r`- Gauge vs absolute pressure.
- Diameter vs radius in $r^4$ (Poiseuille) and $r^2$ (terminal speed).`,
    summary: r`- $P = P_0 + \rho gh$; Pascal; Archimedes $F_B = \rho Vg$.
- $A_1v_1 = A_2v_2$; Bernoulli; $v = \sqrt{2gh}$.
- $v_t = \frac{2r^2(\rho - \sigma)g}{9\eta}$.`,
  }),

  note("surface-tension", {
    introduction: r`Molecules at a liquid surface are pulled inward, so the surface behaves like a stretched membrane. Surface tension explains drops, bubbles and capillary rise.`,
    prerequisites: r`- Pressure
- Intermolecular forces (qualitative)`,
    concept: r`A molecule inside the liquid is pulled equally in all directions; one at the surface feels a net inward pull. Increasing the surface area means bringing molecules to the surface, which costs energy — so liquids minimise their surface area.`,
    theory: r`Surface tension $S$ = force per unit length along a line on the surface = surface energy per unit area. A curved surface has excess pressure on its concave side.

Capillary rise: $h = \frac{2S\cos\theta}{\rho gr}$ where $\theta$ is the contact angle.`,
    definitions: r`- **Angle of contact** $\theta$: angle between the solid surface and the tangent to the liquid surface, measured inside the liquid. $\theta < 90^\circ$ wets (water–glass), $\theta > 90^\circ$ does not wet (mercury–glass).
- **Surface energy:** work per unit area to create new surface.`,
    principles: r`1. Liquids take shapes of minimum area (spherical drops).
2. A soap bubble has **two** surfaces.
3. Merging drops releases energy (total surface area decreases).`,
    derivations: r`**Excess pressure in a drop.** Splitting a drop of radius $R$ in half: pressure force $\Delta P\pi R^2$ balances surface tension $S\cdot2\pi R$ ⇒ $\Delta P = \frac{2S}{R}$. A bubble has two surfaces: $\frac{4S}{R}$.

**Capillary rise.** Upward force $S\cos\theta\cdot2\pi r$ balances the weight $\pi r^2h\rho g$ ⇒ $h = \frac{2S\cos\theta}{\rho gr}$.`,
    formulas: r`- $S = \dfrac{F}{L}$ = surface energy per unit area.
- Work to increase area by $\Delta A$: $W = S\,\Delta A$ ($2S\Delta A$ for a soap film with two surfaces).
- Excess pressure: drop $\dfrac{2S}R$; soap bubble $\dfrac{4S}R$; air bubble inside a liquid $\dfrac{2S}R$.
- Capillary rise $h = \dfrac{2S\cos\theta}{\rho gr}$; $h \propto \dfrac1r$.
- $n$ small drops (radius $r$) merging into one (radius $R = n^{1/3}r$): energy released $= 4\pi S(nr^2 - R^2)$.
- Work to blow a soap bubble of radius $R$: $8\pi R^2S$.
- Two bubbles in contact (radii $r_1 < r_2$): radius of the common interface $\dfrac{r_1r_2}{r_2 - r_1}$.`,
    diagrams: r`Meniscus shapes: concave (water in glass, rises), convex (mercury in glass, falls).`,
    graphs: r`Capillary height vs tube radius: rectangular hyperbola $hr = $ constant.`,
    specialCases: r`- Tube shorter than $h$: liquid rises to the top and the meniscus flattens; it does not overflow.
- Surface tension decreases with temperature; detergents lower it.`,
    exceptions: r`Capillary formula assumes a hemispherical meniscus in a narrow tube.`,
    assumptions: r`Clean surfaces; constant temperature.`,
    applications: r`Wicks, plant water transport, detergents, insects walking on water, mercury barometers.`,
    patterns: r`- Excess pressure in drops and bubbles.
- Capillary rise with given $\theta$, in tilted tubes ($h$ vertical remains the same).
- Energy released when drops coalesce.`,
    misconceptions: r`- "Surface tension is a force on the surface pushing outward." It acts along the surface.`,
    traps: r`- Soap bubble: two surfaces (factor 2).
- Diameter given instead of radius.`,
    summary: r`- $\Delta P$: drop $2S/R$, bubble $4S/R$.
- $h = \frac{2S\cos\theta}{\rho gr}$.
- Work $= S\Delta A$ per surface.`,
  }),

  note("thermal-properties", {
    introduction: r`Heating changes a body's size, temperature or phase, and heat flows from hot to cold by conduction, convection and radiation. These ideas cover thermal expansion, calorimetry and heat transfer.`,
    prerequisites: r`- Temperature scales
- Energy conservation`,
    concept: r`Heat is energy in transit due to a temperature difference. Absorbing heat either raises temperature (via specific heat) or changes phase at constant temperature (via latent heat). Atoms vibrating with larger amplitude push each other apart, so solids expand.`,
    theory: r`Linear expansion $\Delta L = L\alpha\Delta T$; area $\beta = 2\alpha$; volume $\gamma = 3\alpha$.

Calorimetry: heat lost = heat gained; $Q = mc\Delta T$ or $Q = mL$.

Conduction: $\frac{dQ}{dt} = \frac{KA\Delta T}{L}$. Radiation: Stefan–Boltzmann $P = e\sigma AT^4$. Newton's law of cooling for small temperature differences.`,
    definitions: r`- **Specific heat** $c$: heat per kg per kelvin. **Heat capacity** $= mc$.
- **Latent heat** $L$: heat per kg for a phase change at constant temperature.
- **Thermal resistance** $R = \frac{L}{KA}$.
- **Black body:** absorbs all incident radiation; emissivity $e = 1$.`,
    principles: r`1. Heat flows from higher to lower temperature until equilibrium.
2. Thermal resistances add in series and combine reciprocally in parallel, like electrical resistances.
3. Good absorbers are good emitters (Kirchhoff's law of radiation).`,
    derivations: r`**Newton's law of cooling (from Stefan's law).** Net loss $\propto T^4 - T_0^4 = (T - T_0)(T + T_0)(T^2 + T_0^2) \approx 4T_0^3(T - T_0)$ for small differences, so $\frac{dT}{dt} = -k(T - T_0)$.`,
    formulas: r`- $\Delta L = L\alpha\Delta T$, $\Delta A = A\beta\Delta T$, $\Delta V = V\gamma\Delta T$; $\beta = 2\alpha$, $\gamma = 3\alpha$ (isotropic solid).
- Thermal stress (clamped rod): $Y\alpha\Delta T$; pendulum clock error: $\dfrac{\Delta T_{\text{period}}}{T} = \tfrac12\alpha\Delta\theta$.
- Apparent expansion of a liquid: $\gamma_{\text{app}} = \gamma_{\text{liquid}} - \gamma_{\text{vessel}}$.
- $Q = mc\Delta T$; $Q = mL$; heat lost = heat gained.
- Conduction: $H = \dfrac{dQ}{dt} = \dfrac{KA(T_1 - T_2)}{L}$; $R_{\text{th}} = \dfrac{L}{KA}$; series $R = R_1 + R_2$, parallel $\dfrac1R = \dfrac1{R_1} + \dfrac1{R_2}$.
- Stefan–Boltzmann: $P = e\sigma AT^4$; net $P = e\sigma A(T^4 - T_0^4)$; $\sigma = 5.67\times10^{-8}\,\text{W m}^{-2}\text{K}^{-4}$. *(Beyond JEE Main 2027.)*
- Wien's law: $\lambda_mT = b$, $b \approx 2.9\times10^{-3}\,\text{m K}$. *(Beyond JEE Main 2027.)*
- Newton's cooling: $\dfrac{dT}{dt} = -k(T - T_0)$; average form $\dfrac{T_1 - T_2}{t} = k\left(\dfrac{T_1 + T_2}2 - T_0\right)$. *(Beyond JEE Main 2027.)*
- Temperature scales: $\dfrac{C}{100} = \dfrac{F - 32}{180} = \dfrac{K - 273.15}{100}$.`,
    diagrams: r`Heating curve of ice: rising temperature segments (specific heat) separated by flat segments (melting, boiling — latent heat).`,
    graphs: r`Black-body spectra: peak shifts to shorter wavelength as $T$ rises (Wien), area under curve $\propto T^4$.`,
    specialCases: r`- Water contracts on heating from 0 °C to 4 °C (maximum density at 4 °C) — anomalous expansion.
- A hole in a plate expands as if it were made of the same material.`,
    exceptions: r`Newton's law of cooling is accurate only for small temperature differences (and for convection-dominated cooling).`,
    assumptions: r`Steady state for conduction formulas; constant $\alpha$, $c$ over the range.`,
    applications: r`Expansion gaps in rails, bimetallic thermostats, insulation design, thermos flasks.`,
    patterns: r`- Mixture temperature in calorimetry, including phase changes.
- Composite slabs and junction temperature.
- Stefan's law ratios; Wien's law for star temperatures.
- Cooling-time comparisons.`,
    misconceptions: r`- "Heat and temperature are the same." Temperature is a state measure; heat is energy transfer.`,
    traps: r`- Checking whether all ice melts before assuming a final temperature above 0 °C.
- Using °C instead of K in Stefan's law.`,
    summary: r`- $\beta = 2\alpha$, $\gamma = 3\alpha$; $Q = mc\Delta T$, $Q = mL$.
- $H = KA\Delta T/L$; $P = e\sigma AT^4$; $\lambda_mT = b$.
- Newton's cooling $\frac{dT}{dt} = -k(T - T_0)$. *(Beyond JEE Main 2027.)*`,
  }),
];
