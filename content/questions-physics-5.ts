import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// Levels 1–4: JEE Main formats; Level 5: JEE Advanced formats. g = 10 m/s² unless stated.

export const PHYSICS_QUESTIONS_5: QuestionSeed[] = [
  // ── Potential energy and conservative forces ──
  {
    topic: "potential-energy-and-conservative-forces", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The work done by a conservative force on a particle taken round any closed path is:",
    options: [
      { text: "zero", correct: true, why: "Work depends only on the end points, which coincide." },
      { text: "always positive", why: "That would contradict path independence." },
      { text: "always negative", why: "Friction behaves like that, but it is non-conservative." },
      { text: "equal to the change in kinetic energy over half the path", why: "Not a general property." },
    ],
    solution: r`For a conservative force, $W_{A\to B} = U_A - U_B$ depends only on the end points. On a closed path $A = B$, so $W = 0$.`,
    concept: "Conservative forces", formula: r`$W = -\Delta U$`, whyFormula: "Defines potential energy.", mistakes: "Treating friction as conservative.",
  },
  {
    topic: "potential-energy-and-conservative-forces", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1,
    statement: r`A spring of constant $200\ \text{N m}^{-1}$ is compressed by $0.1\ \text{m}$. Find its elastic potential energy in J.`,
    solution: r`$U = \tfrac12kx^2 = \tfrac12(200)(0.01) = 1\ \text{J}$.`,
    concept: "Spring potential energy", formula: r`$U = \tfrac12kx^2$`, whyFormula: "Work done against the spring force $kx$.", mistakes: "Forgetting to square $x$.",
  },
  {
    topic: "potential-energy-and-conservative-forces", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`A particle has potential energy $U(x) = x^2 - 4x$ (SI units). Its equilibrium position and type are:`,
    options: [
      { text: r`$x = 2\ \text{m}$, stable`, correct: true, why: r`$U'(2) = 0$ and $U''(2) = 2 > 0$.` },
      { text: r`$x = 2\ \text{m}$, unstable`, why: "A minimum of U is stable." },
      { text: r`$x = 4\ \text{m}$, stable`, why: "U = 0 there, but the force is not zero." },
      { text: r`$x = 0$, neutral`, why: r`$U'(0) = -4 \ne 0$.` },
    ],
    solution: r`$F = -\dfrac{dU}{dx} = -(2x - 4) = 0 \Rightarrow x = 2\ \text{m}$. $\dfrac{d^2U}{dx^2} = 2 > 0$: a minimum of $U$, so the equilibrium is stable.`,
    concept: "Equilibrium from potential energy", formula: r`$F = -dU/dx$`, whyFormula: "Force is zero at equilibrium; curvature decides stability.", mistakes: "Setting $U = 0$ instead of $dU/dx = 0$.",
  },
  {
    topic: "potential-energy-and-conservative-forces", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 20,
    statement: r`A $2\ \text{kg}$ block sliding at $4\ \text{m s}^{-1}$ on a smooth floor hits a spring of constant $800\ \text{N m}^{-1}$. Find the maximum compression in cm.`,
    solution: r`$\tfrac12mv^2 = \tfrac12kx^2 \Rightarrow x = v\sqrt{m/k} = 4\sqrt{2/800} = 4\times0.05 = 0.2\ \text{m} = 20\ \text{cm}$.`,
    concept: "Energy conservation with a spring", formula: r`$\tfrac12mv^2 = \tfrac12kx^2$`, whyFormula: "All kinetic energy becomes spring energy at maximum compression.", mistakes: "Using $mv = kx$.",
  },
  {
    topic: "potential-energy-and-conservative-forces", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A particle of mass $1\ \text{kg}$ moves along $x$ with potential energy $U(x) = \dfrac{x^3}{3} - x$ (SI units). Which statements are correct?`,
    options: [
      { text: r`It has an equilibrium position only at $x = 1\ \text{m}$`, why: r`$U' = x^2 - 1 = 0$ at both $x = \pm1$.` },
      { text: r`$x = 1\ \text{m}$ is a stable equilibrium`, correct: true, why: r`$U''(1) = 2 > 0$.` },
      { text: r`$x = -1\ \text{m}$ is an unstable equilibrium`, correct: true, why: r`$U''(-1) = -2 < 0$.` },
      { text: r`At $x = 0$ the force on it is $1\ \text{N}$ in the $+x$ direction`, correct: true, why: r`$F = -U' = 1 - x^2 = 1$.` },
    ],
    solution: r`$F = -\dfrac{dU}{dx} = 1 - x^2$. Equilibria: $x = \pm1$. $\dfrac{d^2U}{dx^2} = 2x$: positive at $x = 1$ (stable), negative at $x = -1$ (unstable). At $x = 0$, $F = +1\ \text{N}$.`,
    concept: "Force, equilibrium and stability from U(x)", formula: r`$F = -U'(x)$, stability from $U''$`, whyFormula: "Every statement follows from the first two derivatives of U.", mistakes: "Missing the negative root; sign error in $F = -dU/dx$.",
  },

  // ── Power and collisions ──
  {
    topic: "power-and-collisions", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In a perfectly inelastic collision between two bodies (no external force):",
    options: [
      { text: "momentum is conserved but kinetic energy is not", correct: true, why: "The bodies stick together; some KE becomes heat and deformation." },
      { text: "both momentum and kinetic energy are conserved", why: "That is an elastic collision." },
      { text: "kinetic energy is conserved but momentum is not", why: "Momentum is conserved in every collision without external force." },
      { text: "neither is conserved", why: "Momentum is conserved." },
    ],
    solution: "Without external forces momentum is always conserved. In a perfectly inelastic collision the bodies move together afterwards and the loss of kinetic energy is the maximum possible.",
    concept: "Types of collisions", formula: r`$e = 0$ for perfectly inelastic`, whyFormula: "Coefficient of restitution classifies collisions.", mistakes: "Thinking total energy is lost (it changes form).",
  },
  {
    topic: "power-and-collisions", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 12,
    statement: r`A $1\ \text{kg}$ ball at $6\ \text{m s}^{-1}$ hits and sticks to a $2\ \text{kg}$ ball at rest. Find the kinetic energy lost (in J).`,
    solution: r`Common velocity $v = 6/3 = 2\ \text{m s}^{-1}$. KE before $= 18\ \text{J}$; after $= \tfrac12(3)(4) = 6\ \text{J}$. Lost: $12\ \text{J}$.`,
    concept: "Perfectly inelastic collision", formula: r`$\Delta K = \dfrac{m_1m_2}{2(m_1 + m_2)}u^2$`, whyFormula: "Momentum gives the common velocity.", mistakes: "Assuming KE is conserved.",
  },
  {
    topic: "power-and-collisions", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Two equal masses collide head-on elastically; one is initially at rest. After the collision:",
    options: [
      { text: "they exchange velocities", correct: true, why: "The moving one stops and the other moves off with its velocity." },
      { text: "they move together", why: "That is perfectly inelastic." },
      { text: "both move with half the original speed", why: "That conserves momentum but not KE." },
      { text: "the moving one rebounds with the same speed", why: "That happens with a much heavier target." },
    ],
    solution: r`Elastic, equal masses: $v_1 = \dfrac{(m - m)u}{2m} = 0$, $v_2 = \dfrac{2mu}{2m} = u$. Velocities exchange.`,
    concept: "Elastic collision of equal masses", formula: r`$v_1 = \dfrac{m_1 - m_2}{m_1 + m_2}u$, $v_2 = \dfrac{2m_1}{m_1 + m_2}u$`, whyFormula: "Standard elastic results with one body at rest.", mistakes: "Assuming they share the velocity.",
  },
  {
    topic: "power-and-collisions", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 2.5, tolerance: 0.01,
    statement: r`A ball is dropped from a height of $10\ \text{m}$ onto a floor. The coefficient of restitution is $0.5$. Find the height (in m) of the first rebound.`,
    solution: r`Impact speed $v = \sqrt{2gh}$; rebound speed $ev$; rebound height $\dfrac{(ev)^2}{2g} = e^2h = 0.25\times10 = 2.5\ \text{m}$.`,
    concept: "Coefficient of restitution", formula: r`$h_1 = e^2h$`, whyFormula: "Height scales with the square of speed.", mistakes: "Using $eh$.",
  },
  {
    topic: "power-and-collisions", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`Ball A (mass $m$, speed $u$) collides head-on and elastically with ball B (mass $2m$) at rest. Which statements are correct?`,
    options: [
      { text: r`A rebounds with speed $u/3$`, correct: true, why: r`$v_A = \dfrac{m - 2m}{3m}u = -\dfrac u3$.` },
      { text: r`B moves off with speed $2u/3$`, correct: true, why: r`$v_B = \dfrac{2m}{3m}u$.` },
      { text: r`B receives $\tfrac89$ of A's initial kinetic energy`, correct: true, why: r`$\dfrac{\tfrac12(2m)(4u^2/9)}{\tfrac12mu^2} = \dfrac89$.` },
      { text: r`The relative speed of separation equals $u$`, correct: true, why: "e = 1: separation speed equals approach speed." },
    ],
    solution: r`$v_A = \dfrac{m_A - m_B}{m_A + m_B}u = -\dfrac u3$; $v_B = \dfrac{2m_A}{m_A + m_B}u = \dfrac{2u}3$. Check: separation speed $\tfrac{2u}{3} + \tfrac u3 = u$ (e = 1). Fraction of KE to B: $\dfrac{2m\cdot\frac49u^2}{mu^2} = \dfrac89$. All four are correct.`,
    concept: "Elastic collision with unequal masses", formula: r`$v_A = \dfrac{m_A - m_B}{m_A + m_B}u$, $v_B = \dfrac{2m_A}{m_A + m_B}u$`, whyFormula: "Momentum + KE conservation (or e = 1).", mistakes: "Sign of $v_A$; assuming B gets all the KE.",
  },

  // ── Centre of mass ──
  {
    topic: "centre-of-mass", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`Masses of $1\ \text{kg}$ and $3\ \text{kg}$ are $4\ \text{m}$ apart. Their centre of mass is:`,
    options: [
      { text: r`$3\ \text{m}$ from the $1\ \text{kg}$ mass`, correct: true, why: r`$x = \dfrac{3\times4}{4} = 3$ from the 1 kg mass.` },
      { text: r`$1\ \text{m}$ from the $1\ \text{kg}$ mass`, why: "The centre of mass lies closer to the heavier mass." },
      { text: r`$2\ \text{m}$ from each`, why: "That is only for equal masses." },
      { text: r`$3\ \text{m}$ from the $3\ \text{kg}$ mass`, why: "Reversed." },
    ],
    solution: r`Taking the 1 kg mass at the origin: $x_{\text{cm}} = \dfrac{1(0) + 3(4)}{4} = 3\ \text{m}$ — i.e. 1 m from the 3 kg mass.`,
    concept: "Centre of mass of two particles", formula: r`$x_{\text{cm}} = \dfrac{\sum m_ix_i}{\sum m_i}$`, whyFormula: "Weighted average of positions.", mistakes: "Putting it nearer the lighter mass.",
  },
  {
    topic: "centre-of-mass", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 1.33, tolerance: 0.01,
    statement: r`Masses of $1$, $2$ and $3\ \text{kg}$ are placed at $x = 0$, $1$ and $2\ \text{m}$. Find $x_{\text{cm}}$ in m.`,
    solution: r`$x_{\text{cm}} = \dfrac{0 + 2 + 6}{6} = \dfrac43 \approx 1.33\ \text{m}$.`,
    concept: "Centre of mass of particles", formula: r`$x_{\text{cm}} = \dfrac{\sum m_ix_i}{\sum m_i}$`, whyFormula: "Direct definition.", mistakes: "Averaging positions without weights.",
  },
  {
    topic: "centre-of-mass", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: r`From a uniform disc of radius $R$, a circular hole of radius $R/2$ is cut whose edge passes through the disc's centre. The centre of mass of the remaining part shifts from the centre by:`,
    options: [
      { text: r`$R/6$, away from the hole`, correct: true, why: r`$\dfrac{(M/4)(R/2)}{3M/4}$.` },
      { text: r`$R/4$, away from the hole`, why: "Forgets that the remaining mass is 3M/4." },
      { text: r`$R/6$, towards the hole`, why: "Removing mass shifts the centre away from the hole." },
      { text: r`$R/2$`, why: "That is the position of the hole's centre." },
    ],
    solution: r`Treat the remaining part as (full disc) − (hole). Masses scale with area: hole $= M/4$ at $x = R/2$. $x_{\text{cm}} = \dfrac{M(0) - \frac M4\cdot\frac R2}{M - \frac M4} = -\dfrac{R}{6}$: a shift of $R/6$ away from the hole.`,
    concept: "Centre of mass with a cavity", formula: r`$x = \dfrac{M_1x_1 - m_2x_2}{M_1 - m_2}$`, whyFormula: "Negative mass for the removed part.", mistakes: "Using the hole's mass with the wrong sign.",
  },
  {
    topic: "centre-of-mass", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 1,
    statement: r`A $2\ \text{kg}$ particle moves east at $3\ \text{m s}^{-1}$ and a $1\ \text{kg}$ particle moves west at $3\ \text{m s}^{-1}$. Find the speed of their centre of mass in m s⁻¹.`,
    solution: r`$v_{\text{cm}} = \dfrac{2(3) + 1(-3)}{3} = 1\ \text{m s}^{-1}$ (east).`,
    concept: "Velocity of the centre of mass", formula: r`$v_{\text{cm}} = \dfrac{\sum m_iv_i}{\sum m_i}$`, whyFormula: "Total momentum divided by total mass.", mistakes: "Ignoring directions.",
  },
  {
    topic: "centre-of-mass", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A projectile of range $R$ (on level ground) splits into two equal fragments at the top of its path. Just after the split, one fragment has zero velocity and falls vertically. Neglect air resistance. Which statements are correct?`,
    options: [
      { text: r`The other fragment's velocity just after the split is twice the projectile's velocity at the top`, correct: true, why: r`$2m v = m(0) + m v'$ per unit mass → $v' = 2v$.` },
      { text: "Until either fragment lands, the centre of mass continues along the original parabola", correct: true, why: "Only gravity (external) acts on the system." },
      { text: r`The second fragment lands at a distance $\tfrac{3R}{2}$ from the launch point`, correct: true, why: r`Both land together, so $\tfrac12\left(\tfrac R2 + x\right) = R$.` },
      { text: "The second fragment lands after the first", why: "Both start the fall from the same height with zero vertical velocity, so they land together." },
    ],
    solution: r`At the top the velocity is horizontal. Momentum (internal explosion): $(2m)v = m\cdot0 + m v' \Rightarrow v' = 2v$. Both fragments have zero vertical velocity and the same height, so they land at the same time; the centre of mass lands where the whole projectile would have, at $R$. The first fragment lands at $R/2$, so the second lands at $x$ with $\tfrac{R/2 + x}{2} = R \Rightarrow x = \tfrac{3R}{2}$.`,
    concept: "Motion of the centre of mass under external force only", formula: r`$M\vec a_{\text{cm}} = \vec F_{\text{ext}}$`, whyFormula: "Internal forces cannot change the centre of mass motion.", mistakes: "Assuming the fragments land at different times.",
  },

  // ── Angular momentum and rolling ──
  {
    topic: "angular-momentum-and-rolling", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A spinning ice skater pulls in her arms. Her angular speed:",
    options: [
      { text: "increases, because her angular momentum is conserved and her moment of inertia decreases", correct: true, why: r`$I\omega$ = constant.` },
      { text: "decreases", why: "Smaller I means larger ω." },
      { text: "stays the same", why: "I changes, so ω changes." },
      { text: "increases because her angular momentum increases", why: "No external torque: angular momentum is constant." },
    ],
    solution: r`No external torque about the spin axis, so $L = I\omega$ is constant. Pulling the arms in reduces $I$, so $\omega$ increases. (Her rotational KE $L^2/2I$ increases — she does work pulling her arms in.)`,
    concept: "Conservation of angular momentum", formula: r`$I_1\omega_1 = I_2\omega_2$`, whyFormula: "Zero external torque.", mistakes: "Thinking angular momentum changes.",
  },
  {
    topic: "angular-momentum-and-rolling", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 5,
    statement: r`A disc of moment of inertia $2\ \text{kg m}^2$ rotates freely at $10\ \text{rad s}^{-1}$. An identical disc at rest is dropped coaxially onto it and they rotate together. Find the final angular speed in rad s⁻¹.`,
    solution: r`$I\omega = 2I\omega' \Rightarrow \omega' = 5\ \text{rad s}^{-1}$.`,
    concept: "Angular momentum in a rotational collision", formula: r`$I_1\omega_1 = (I_1 + I_2)\omega'$`, whyFormula: "Friction between the discs is internal.", mistakes: "Conserving kinetic energy.",
  },
  {
    topic: "angular-momentum-and-rolling", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`A $2\ \text{kg}$ particle moves at $3\ \text{m s}^{-1}$ along the line $y = 4\ \text{m}$, parallel to the $x$-axis. The magnitude of its angular momentum about the origin is:`,
    options: [
      { text: r`$24\ \text{kg m}^2\text{s}^{-1}$`, correct: true, why: r`$L = mvd = 2\times3\times4$.` },
      { text: r`$6\ \text{kg m}^2\text{s}^{-1}$`, why: "That is the linear momentum." },
      { text: "zero", why: "The line does not pass through the origin." },
      { text: r`$12\ \text{kg m}^2\text{s}^{-1}$`, why: "Uses half the distance." },
    ],
    solution: r`$L = |\vec r\times\vec p| = mv\,d_\perp = 2\times3\times4 = 24\ \text{kg m}^2\text{s}^{-1}$, constant along the line.`,
    concept: "Angular momentum of a particle", formula: r`$L = mvd_\perp$`, whyFormula: "Perpendicular distance from the origin to the line of motion.", mistakes: "Thinking a straight-line motion has no angular momentum.",
  },
  {
    topic: "angular-momentum-and-rolling", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 50,
    statement: r`In the disc problem above ($I = 2\ \text{kg m}^2$ at $10\ \text{rad s}^{-1}$, joined by an identical disc at rest), how much rotational kinetic energy (in J) is lost?`,
    solution: r`Before: $\tfrac12(2)(100) = 100\ \text{J}$. After: $\tfrac12(4)(25) = 50\ \text{J}$. Lost: $50\ \text{J}$ (to heat by friction between the discs).`,
    concept: "Energy loss in rotational inelastic collision", formula: r`$K = \tfrac12I\omega^2$`, whyFormula: "Angular momentum is conserved, KE is not.", mistakes: "Assuming no energy is lost.",
  },
  {
    topic: "angular-momentum-and-rolling", level: 5, difficulty: "HARD", type: "MATCH", time: 240,
    statement: r`Each body in List-I is released from rest and rolls without slipping down an incline through a vertical height $h$. Match it with $v^2$ at the bottom in List-II. (Rolling is beyond the JEE Main 2027 text; this is JEE Advanced-style practice.)`,
    match: {
      left: ["Thin ring", "Uniform disc", "Solid sphere", "Thin hollow sphere"],
      right: [r`$gh$`, r`$\tfrac43gh$`, r`$\tfrac{10}{7}gh$`, r`$\tfrac65gh$`, r`$2gh$`],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: r`$v^2 = \dfrac{2gh}{1 + k^2/R^2}$ with $k^2/R^2 = 1, \tfrac12, \tfrac25, \tfrac23$.` },
      { text: "P→5, Q→2, R→3, S→4", why: "2gh is sliding without friction, not rolling." },
      { text: "P→1, Q→3, R→2, S→4", why: "Swaps the disc and the solid sphere." },
      { text: "P→1, Q→2, R→4, S→3", why: "Swaps the solid and hollow spheres." },
    ],
    solution: r`Energy: $mgh = \tfrac12mv^2\left(1 + \dfrac{k^2}{R^2}\right) \Rightarrow v^2 = \dfrac{2gh}{1 + k^2/R^2}$.

- Ring ($k^2/R^2 = 1$): $gh$.
- Disc ($\tfrac12$): $\tfrac43gh$.
- Solid sphere ($\tfrac25$): $\tfrac{10}{7}gh$.
- Hollow sphere ($\tfrac23$): $\tfrac65gh$.

The solid sphere is fastest; the ring is slowest — more mass far from the axis stores more energy as rotation.`,
    concept: "Energy sharing between translation and rotation", formula: r`$K = \tfrac12mv^2\left(1 + \dfrac{k^2}{R^2}\right)$`, whyFormula: "Rolling without slipping: $v = R\\omega$; static friction does no work.", mistakes: "Using $v = \\sqrt{2gh}$ (that ignores rotation).",
  },

  // ── Gravitational field and potential ──
  {
    topic: "gravitational-field-and-potential", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The acceleration due to gravity at the centre of the Earth (treated as a uniform sphere) is:",
    options: [
      { text: "zero", correct: true, why: r`$g_d = g(1 - d/R)$ with $d = R$.` },
      { text: r`$g$`, why: "g decreases with depth." },
      { text: r`$g/2$`, why: "That is at depth R/2." },
      { text: "infinite", why: "The 1/r² law applies outside the sphere only." },
    ],
    solution: r`Inside a uniform sphere $g \propto r$; at the centre $r = 0$, so $g = 0$ (the pulls of the surrounding mass cancel by symmetry).`,
    concept: "Variation of g with depth", formula: r`$g_d = g\left(1 - \dfrac dR\right)$`, whyFormula: "Only the mass inside radius r contributes.", mistakes: "Applying $GM/r^2$ inside the Earth.",
  },
  {
    topic: "gravitational-field-and-potential", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 2.5, tolerance: 0.01,
    statement: r`Find the acceleration due to gravity (in m s⁻²) at a height equal to the Earth's radius ($g = 10\ \text{m s}^{-2}$ at the surface).`,
    solution: r`$g_h = \dfrac{g}{(1 + h/R)^2} = \dfrac{10}{4} = 2.5\ \text{m s}^{-2}$.`,
    concept: "Variation of g with height", formula: r`$g_h = \dfrac{g}{(1 + h/R)^2}$`, whyFormula: "Exact form; the approximation $g(1 - 2h/R)$ fails for $h = R$.", mistakes: "Using $g(1 - 2h/R) = -10$.",
  },
  {
    topic: "gravitational-field-and-potential", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "At a depth equal to half the Earth's radius, g becomes:",
    options: [
      { text: r`$g/2$`, correct: true, why: r`$g(1 - \tfrac12)$.` },
      { text: r`$g/4$`, why: "That is at height R." },
      { text: r`$3g/4$`, why: "Arithmetic slip." },
      { text: r`$g$`, why: "g decreases with depth." },
    ],
    solution: r`$g_d = g\left(1 - \dfrac{R/2}{R}\right) = \dfrac g2$.`,
    concept: "Variation of g with depth", formula: r`$g_d = g(1 - d/R)$`, whyFormula: "Linear decrease inside a uniform sphere.", mistakes: "Using the height formula.",
  },
  {
    topic: "gravitational-field-and-potential", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 32,
    statement: r`Find the work (in MJ) needed to raise a $1\ \text{kg}$ mass from the Earth's surface to a height equal to the Earth's radius ($R = 6.4\times10^6\ \text{m}$, $g = 10\ \text{m s}^{-2}$).`,
    solution: r`$W = \Delta U = -\dfrac{GMm}{2R} - \left(-\dfrac{GMm}{R}\right) = \dfrac{GMm}{2R} = \dfrac{mgR}{2} = \dfrac{10\times6.4\times10^6}{2} = 3.2\times10^7\ \text{J} = 32\ \text{MJ}$.`,
    concept: "Gravitational potential energy over large heights", formula: r`$U = -\dfrac{GMm}{r}$`, whyFormula: r`$mgh$ fails when $h$ is comparable to $R$.`, mistakes: "Using $mgh = 64$ MJ.",
  },
  {
    topic: "gravitational-field-and-potential", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`For a thin uniform spherical shell of mass $M$ and radius $R$, which statements are correct?`,
    options: [
      { text: "The gravitational field everywhere inside the shell is zero", correct: true, why: "Shell theorem." },
      { text: r`The potential everywhere inside the shell is $-GM/R$`, correct: true, why: "Zero field means constant potential, equal to the surface value." },
      { text: r`The field just outside the surface is $GM/R^2$`, correct: true, why: "Outside, the shell acts like a point mass at its centre." },
      { text: r`The potential at its centre is $-\dfrac{3GM}{2R}$`, why: "That is the value for a solid sphere." },
    ],
    solution: r`Shell theorem: outside, the shell acts as a point mass ($g = GM/r^2$, $V = -GM/r$); inside, $g = 0$, so $V$ is constant and equals its surface value $-GM/R$. The $-\tfrac{3GM}{2R}$ result is for the centre of a **solid** uniform sphere.`,
    concept: "Field and potential of a spherical shell", formula: r`$g = -\dfrac{dV}{dr}$`, whyFormula: "Constant potential where the field is zero.", mistakes: "Using the solid-sphere results for a shell.",
  },

  // ── Elasticity ──
  {
    topic: "elasticity", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The SI unit of Young's modulus is:",
    options: [
      { text: r`$\text{N m}^{-2}$ (pascal)`, correct: true, why: "Stress / strain, and strain is dimensionless." },
      { text: r`$\text{N m}^{-1}$`, why: "That is spring constant / surface tension." },
      { text: "N", why: "That is force." },
      { text: "dimensionless", why: "Strain is dimensionless; stress is not." },
    ],
    solution: r`$Y = \dfrac{\text{stress}}{\text{strain}} = \dfrac{F/A}{\Delta L/L}$. Strain has no unit, so $Y$ has the unit of stress, $\text{N m}^{-2}$ = Pa.`,
    concept: "Young's modulus", formula: r`$Y = \dfrac{FL}{A\Delta L}$`, whyFormula: "Definition.", mistakes: "Confusing with spring constant.",
  },
  {
    topic: "elasticity", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 1,
    statement: r`A wire $2\ \text{m}$ long with cross-section $10^{-6}\ \text{m}^2$ and Young's modulus $2\times10^{11}\ \text{Pa}$ carries a load of $100\ \text{N}$. Find its extension in mm.`,
    solution: r`$\Delta L = \dfrac{FL}{AY} = \dfrac{100\times2}{10^{-6}\times2\times10^{11}} = 10^{-3}\ \text{m} = 1\ \text{mm}$.`,
    concept: "Hooke's law for a wire", formula: r`$\Delta L = \dfrac{FL}{AY}$`, whyFormula: "Rearranged definition of Y.", mistakes: "Area unit conversion.",
  },
  {
    topic: "elasticity", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "Two wires of the same material carry the same load. Their lengths are in the ratio 1 : 2 and diameters 2 : 1. The ratio of their extensions is:",
    options: [
      { text: "1 : 8", correct: true, why: r`$\Delta L \propto L/d^2$: $\dfrac{1/4}{2/1}$.` },
      { text: "1 : 4", why: "Ignores the length ratio." },
      { text: "1 : 2", why: "Ignores the diameter." },
      { text: "2 : 1", why: "Inverted." },
    ],
    solution: r`$\Delta L = \dfrac{FL}{AY} \propto \dfrac{L}{d^2}$. Ratio $= \dfrac{1/2^2}{2/1^2} = \dfrac{1/4}{2} = \dfrac18$.`,
    concept: "Scaling of extension", formula: r`$\Delta L \propto L/d^2$`, whyFormula: "Same F and Y.", mistakes: "Using $d$ instead of $d^2$.",
  },
  {
    topic: "elasticity", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 50,
    statement: r`For the wire in the Level 2 question ($100\ \text{N}$ load, $1\ \text{mm}$ extension), find the elastic potential energy stored, in mJ.`,
    solution: r`$U = \tfrac12F\Delta L = \tfrac12\times100\times10^{-3} = 0.05\ \text{J} = 50\ \text{mJ}$.`,
    concept: "Elastic energy in a stretched wire", formula: r`$U = \tfrac12F\Delta L$`, whyFormula: "Area under the linear force–extension graph.", mistakes: "Using $F\\Delta L$ (twice the answer).",
  },
  {
    topic: "elasticity", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`A steel rod is clamped rigidly between two walls and heated by $50\ \text{K}$ ($Y = 2\times10^{11}\ \text{Pa}$, $\alpha = 1.2\times10^{-5}\ \text{K}^{-1}$). Which statements are correct?`,
    options: [
      { text: r`The thermal stress in the rod is $1.2\times10^8\ \text{Pa}$`, correct: true, why: r`$Y\alpha\Delta T$.` },
      { text: "The thermal stress does not depend on the rod's length", correct: true, why: "Strain αΔT is independent of length." },
      { text: "The force on each wall does not depend on the rod's cross-sectional area", why: "Force = stress × area, so a thicker rod pushes harder." },
      { text: "The rod is under compression", correct: true, why: "It is prevented from expanding." },
    ],
    solution: r`The walls prevent the free expansion $L\alpha\Delta T$, so they impose a compressive strain $\alpha\Delta T$. Stress $= Y\alpha\Delta T = 2\times10^{11}\times1.2\times10^{-5}\times50 = 1.2\times10^8\ \text{Pa}$, independent of $L$ and $A$; but the force $F = \text{stress}\times A$ grows with the cross-section.`,
    concept: "Thermal stress", formula: r`$\sigma = Y\alpha\Delta T$`, whyFormula: "Strain needed to cancel thermal expansion.", mistakes: "Confusing stress with force.",
  },

  // ── Surface tension ──
  {
    topic: "surface-tension", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Small liquid drops are nearly spherical because:",
    options: [
      { text: "surface tension minimises the surface area for a given volume", correct: true, why: "A sphere has the least area for a given volume." },
      { text: "gravity pulls equally in all directions", why: "Gravity is directional; it flattens large drops." },
      { text: "air pressure is greater at the bottom", why: "Not the reason." },
      { text: "viscosity holds the shape", why: "Viscosity resists flow but does not set equilibrium shape." },
    ],
    solution: "Surface energy is S × area. The equilibrium shape minimises this energy, and for fixed volume the minimum-area shape is a sphere. For large drops gravity flattens them.",
    concept: "Surface energy minimisation", formula: r`$E = S\cdot A$`, whyFormula: "Surface tension equals surface energy per area.", mistakes: "Attributing it to gravity.",
  },
  {
    topic: "surface-tension", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 10,
    statement: r`Find the excess pressure (in Pa) inside a soap bubble of radius $1\ \text{cm}$ if the surface tension of the soap solution is $0.025\ \text{N m}^{-1}$.`,
    solution: r`A soap bubble has two surfaces: $\Delta P = \dfrac{4S}{R} = \dfrac{4\times0.025}{0.01} = 10\ \text{Pa}$.`,
    concept: "Excess pressure in a bubble", formula: r`$\Delta P = 4S/R$ (soap bubble)`, whyFormula: "Two liquid–air surfaces.", mistakes: "Using $2S/R$ (that is a drop).",
  },
  {
    topic: "surface-tension", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "If the radius of a capillary tube is halved, the height of water rise becomes:",
    options: [
      { text: "double", correct: true, why: r`$h \propto 1/r$.` },
      { text: "half", why: "Narrower tubes raise water higher." },
      { text: "four times", why: "h is proportional to 1/r, not 1/r²." },
      { text: "unchanged", why: "h depends on r." },
    ],
    solution: r`$h = \dfrac{2S\cos\theta}{\rho gr} \propto \dfrac1r$: halving $r$ doubles $h$.`,
    concept: "Capillary rise", formula: r`$h = \dfrac{2S\cos\theta}{\rho gr}$`, whyFormula: "Balance of surface-tension pull and weight of the column.", mistakes: "Using $1/r^2$.",
  },
  {
    topic: "surface-tension", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 14,
    statement: r`Water ($S = 0.07\ \text{N m}^{-1}$, angle of contact $0^\circ$) rises in a glass capillary of radius $0.1\ \text{mm}$. Find the height of rise in cm ($\rho = 1000\ \text{kg m}^{-3}$, $g = 10\ \text{m s}^{-2}$).`,
    solution: r`$h = \dfrac{2S}{\rho gr} = \dfrac{0.14}{1000\times10\times10^{-4}} = 0.14\ \text{m} = 14\ \text{cm}$.`,
    concept: "Capillary rise", formula: r`$h = \dfrac{2S\cos\theta}{\rho gr}$`, whyFormula: r`$\cos0^\circ = 1$.`, mistakes: "Unit conversion of the radius.",
  },
  {
    topic: "surface-tension", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`One thousand identical spherical droplets of radius $r$ merge into one drop. The surface tension is $S$. Which statements are correct?`,
    options: [
      { text: r`The radius of the big drop is $10r$`, correct: true, why: r`Volume: $1000r^3 = R^3$.` },
      { text: "The total surface area becomes one-tenth of the original", correct: true, why: r`$\dfrac{4\pi(10r)^2}{1000\times4\pi r^2} = \dfrac1{10}$.` },
      { text: r`The energy released is $3600\pi r^2S$`, correct: true, why: r`$4\pi S(1000r^2 - 100r^2)$.` },
      { text: "The temperature of the drop falls", why: "The released surface energy heats the drop." },
    ],
    solution: r`Volume conservation: $R = 1000^{1/3}r = 10r$. Areas: before $1000\cdot4\pi r^2$, after $4\pi\cdot100r^2$ — one-tenth. Energy released $= S\Delta A = 4\pi S(1000 - 100)r^2 = 3600\pi r^2S$, which appears as heat, so the temperature rises.`,
    concept: "Surface energy when drops coalesce", formula: r`$E = S\,\Delta A$`, whyFormula: "Surface energy per unit area equals surface tension.", mistakes: "Forgetting volume conservation; thinking the drop cools.",
  },

  // ── Thermal properties ──
  {
    topic: "thermal-properties", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Heat can travel through a vacuum by:",
    options: [
      { text: "radiation only", correct: true, why: "Electromagnetic waves need no medium." },
      { text: "conduction only", why: "Conduction needs matter." },
      { text: "convection only", why: "Convection needs a fluid." },
      { text: "conduction and convection", why: "Both need a medium." },
    ],
    solution: "Conduction and convection need matter. Radiation is electromagnetic and crosses a vacuum (e.g. sunlight).",
    concept: "Modes of heat transfer", formula: "—", whyFormula: "Qualitative distinction.", mistakes: "Thinking convection works in a vacuum.",
  },
  {
    topic: "thermal-properties", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 84,
    statement: r`How much heat (in kJ) is needed to raise the temperature of $2\ \text{kg}$ of water by $10\ \text{K}$? ($c = 4200\ \text{J kg}^{-1}\text{K}^{-1}$)`,
    solution: r`$Q = mc\Delta T = 2\times4200\times10 = 84000\ \text{J} = 84\ \text{kJ}$.`,
    concept: "Specific heat capacity", formula: r`$Q = mc\Delta T$`, whyFormula: "No change of state.", mistakes: "Forgetting kJ conversion.",
  },
  {
    topic: "thermal-properties", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`Two rods of equal length and cross-section, with thermal conductivities $K$ and $2K$, are joined end to end (in series). The equivalent conductivity of the combination is:`,
    options: [
      { text: r`$\tfrac43K$`, correct: true, why: r`$\dfrac{2L}{K_{\text{eq}}} = \dfrac LK + \dfrac{L}{2K}$.` },
      { text: r`$\tfrac32K$`, why: "That is the parallel combination." },
      { text: r`$3K$`, why: "Adds conductivities." },
      { text: r`$\tfrac23K$`, why: "Arithmetic slip." },
    ],
    solution: r`Thermal resistances add in series: $\dfrac{2L}{K_{\text{eq}}A} = \dfrac{L}{KA} + \dfrac{L}{2KA} = \dfrac{3L}{2KA} \Rightarrow K_{\text{eq}} = \dfrac43K$.`,
    concept: "Thermal resistance in series", formula: r`$R_{\text{th}} = \dfrac{L}{KA}$`, whyFormula: "Same heat current through both rods.", mistakes: "Adding conductivities.",
  },
  {
    topic: "thermal-properties", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 150, answer: 10,
    statement: r`$100\ \text{g}$ of ice at $0^\circ\text{C}$ is mixed with $100\ \text{g}$ of water at $100^\circ\text{C}$. Find the final temperature in °C. (Latent heat of fusion $336\ \text{kJ kg}^{-1}$, $c_{\text{water}} = 4.2\ \text{kJ kg}^{-1}\text{K}^{-1}$; no heat loss.)`,
    solution: r`Heat to melt all the ice: $0.1\times336 = 33.6\ \text{kJ}$. The hot water can release up to $0.1\times4.2\times100 = 42\ \text{kJ}$, so all the ice melts.

Balance: $0.1\times4.2\times(100 - T) = 33.6 + 0.1\times4.2\times T \Rightarrow 42 - 0.42T = 33.6 + 0.42T \Rightarrow T = 10^\circ\text{C}$.`,
    concept: "Calorimetry with a change of state", formula: r`$Q_{\text{lost}} = Q_{\text{gained}}$`, whyFormula: "Check first whether all the ice melts.", mistakes: "Averaging the temperatures (50 °C).",
  },
  {
    topic: "thermal-properties", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`A metal (linear expansion coefficient $\alpha$, isotropic) is heated through $\Delta T$. Which statements are correct?`,
    options: [
      { text: r`A rod of length $L$ lengthens by $L\alpha\Delta T$`, correct: true, why: "Definition of α." },
      { text: r`A hole cut in a plate of this metal becomes smaller`, why: "The hole expands exactly as if it were filled with the metal." },
      { text: r`The coefficient of area expansion is $2\alpha$`, correct: true, why: r`$(1 + \alpha\Delta T)^2 \approx 1 + 2\alpha\Delta T$.` },
      { text: "A pendulum clock with a rod of this metal loses time in hot weather", correct: true, why: r`A longer rod gives a longer period: $\Delta T/T = \tfrac12\alpha\Delta\theta$.` },
    ],
    solution: r`Isotropic expansion scales every length by $(1 + \alpha\Delta T)$: areas by $\approx 1 + 2\alpha\Delta T$ and volumes by $\approx 1 + 3\alpha\Delta T$. A hole is just a length in the material, so it grows. A longer pendulum has a longer period, so the clock runs slow (loses time) in summer.`,
    concept: "Thermal expansion", formula: r`$\beta = 2\alpha$, $\gamma = 3\alpha$`, whyFormula: "Small-change approximation of a scaled length.", mistakes: "Thinking holes shrink.",
  },
];
