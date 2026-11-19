import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// One five-level set per chapter. Every numerical answer is recomputed independently in tests/verify-answers.ts.
// g = 10 m/s² unless stated.

export const PHYSICS_QUESTIONS_3: QuestionSeed[] = [
  // ── Units and Measurements · SI units and dimensions ──
  {
    topic: "si-units-and-dimensions", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The dimensional formula of Planck's constant $h$ is:`,
    options: [
      { text: r`$[\text{ML}^2\text{T}^{-1}]$`, correct: true, why: r`$E = h\nu$, so $[h] = [E]/[\nu] = \text{ML}^2\text{T}^{-2}/\text{T}^{-1}$.` },
      { text: r`$[\text{ML}^2\text{T}^{-2}]$`, why: r`That is energy; dividing by frequency adds a factor of T.` },
      { text: r`$[\text{MLT}^{-1}]$`, why: r`That is linear momentum; $h$ has the dimensions of angular momentum.` },
      { text: r`$[\text{ML}^2\text{T}^{-3}]$`, why: r`That is power.` },
    ],
    solution: r`From $E = h\nu$: $[h] = \dfrac{[\text{ML}^2\text{T}^{-2}]}{[\text{T}^{-1}]} = [\text{ML}^2\text{T}^{-1}]$ — the same as angular momentum.`,
    concept: "Dimensions from a defining equation", formula: r`$E = h\nu$`, whyFormula: "It relates $h$ to quantities whose dimensions are known.", mistakes: "Confusing the dimensions of energy, power and angular momentum.",
  },
  {
    topic: "si-units-and-dimensions", level: 2, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 2,
    statement: r`In a system where force $F$, length $L$ and time $T$ are the fundamental quantities, the dimensions of mass are $[F^aL^bT^c]$. Find $a + b + c$.`,
    solution: r`From $F = ma$: $m = F/a$ and $[a] = LT^{-2}$, so $[m] = F\,L^{-1}T^{2}$. Hence $a = 1,\ b = -1,\ c = 2$ and $a + b + c = 2$.`,
    concept: "Changing the set of fundamental quantities", formula: r`$F = ma$`, whyFormula: "Newton's second law links mass to force, length and time.", mistakes: "Writing $[m] = FLT^{-2}$ by multiplying instead of dividing by acceleration.",
  },
  {
    topic: "si-units-and-dimensions", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`Which combination has the dimensions of velocity? ($\mu_0$ = permeability, $\varepsilon_0$ = permittivity of free space)`,
    options: [
      { text: r`$\dfrac{1}{\sqrt{\mu_0\varepsilon_0}}$`, correct: true, why: r`It equals $c$, the speed of light in vacuum.` },
      { text: r`$\mu_0\varepsilon_0$`, why: r`Its dimensions are $[\text{L}^{-2}\text{T}^2]$, the inverse square of a speed.` },
      { text: r`$\sqrt{\mu_0/\varepsilon_0}$`, why: r`This is the impedance of free space (about 377 Ω), a resistance.` },
      { text: r`$\sqrt{\varepsilon_0/\mu_0}$`, why: r`This has the dimensions of conductance.` },
    ],
    solution: r`Maxwell's theory gives $c = 1/\sqrt{\mu_0\varepsilon_0}$, so this combination has the dimensions of velocity. The ratio $\sqrt{\mu_0/\varepsilon_0}$ is a resistance (the impedance of free space).`,
    concept: "Dimensions of electromagnetic constants", formula: r`$c = 1/\sqrt{\mu_0\varepsilon_0}$`, whyFormula: "A known physical relation is faster than deriving dimensions of $\\mu_0$ and $\\varepsilon_0$ separately.", mistakes: "Treating $\\mu_0\\varepsilon_0$ itself as a speed.",
  },
  {
    topic: "si-units-and-dimensions", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 1.5,
    statement: r`The period $T$ of small oscillations of a liquid drop depends on its density $\rho$, radius $r$ and surface tension $S$ as $T \propto \rho^a r^b S^c$. Find $a + b + c$.`,
    solution: r`$[\rho] = \text{ML}^{-3}$, $[r] = \text{L}$, $[S] = \text{MT}^{-2}$ (force per length). Then $\rho^a r^b S^c$ has dimensions $\text{M}^{a+c}\text{L}^{-3a+b}\text{T}^{-2c}$. Matching $\text{T}^1$: $c = -\tfrac12$; $a + c = 0 \Rightarrow a = \tfrac12$; $-3a + b = 0 \Rightarrow b = \tfrac32$. So $T \propto \sqrt{\rho r^3/S}$ and $a + b + c = 1.5$.`,
    concept: "Deriving a relation by dimensional analysis", formula: r`$[S] = \text{MT}^{-2}$`, whyFormula: "Surface tension is force per unit length.", mistakes: "Taking surface tension as force per area (pressure).",
  },
  {
    topic: "si-units-and-dimensions", level: 5, difficulty: "HARD", type: "MCQ", time: 120,
    statement: r`$L$ is a length, $\Delta V$ a potential difference and $\Delta t$ a time interval. The quantity $X = \dfrac{\varepsilon_0 L\,\Delta V}{\Delta t}$ has the dimensions of:`,
    options: [
      { text: "electric current", correct: true, why: r`$\varepsilon_0L$ is a capacitance, $C\Delta V$ a charge, and charge per time a current.` },
      { text: "electric charge", why: r`$\varepsilon_0L\,\Delta V$ alone is a charge; dividing by time gives current.` },
      { text: "magnetic flux", why: r`Magnetic flux has dimensions of voltage × time, not voltage / time × capacitance.` },
      { text: "resistance", why: r`Resistance is $\Delta V/I$; here $\Delta V$ is in the numerator.` },
    ],
    solution: r`Recognise the pieces instead of expanding into M, L, T, A. For a parallel-plate capacitor $C = \varepsilon_0A/d$, so $\varepsilon_0 \times$ (length) has the dimensions of capacitance. Then $\varepsilon_0L\,\Delta V = C\,\Delta V$ is a charge $Q$, and $Q/\Delta t$ is a current.`,
    concept: "Dimensional reasoning through physical relations", formula: r`$C = \varepsilon_0A/d,\ Q = CV,\ I = Q/t$`, whyFormula: "Each relation converts one group of symbols into a familiar quantity.", alt: r`In base dimensions: $[\varepsilon_0] = \text{M}^{-1}\text{L}^{-3}\text{T}^4\text{A}^2$, $[V] = \text{ML}^2\text{T}^{-3}\text{A}^{-1}$. Then $[X] = \text{M}^{-1}\text{L}^{-3}\text{T}^4\text{A}^2\cdot\text{L}\cdot\text{ML}^2\text{T}^{-3}\text{A}^{-1}\cdot\text{T}^{-1} = \text{A}$.`, mistakes: "Expanding everything into base units and making a sign error in the exponents.",
  },

  // ── Laws of Motion · Friction ──
  {
    topic: "friction", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A block rests on a rough horizontal floor (coefficient of static friction $\\mu_s$). No horizontal force acts on it. The friction force on the block is:",
    options: [
      { text: "zero", correct: true, why: "Static friction only opposes a tendency to slide; with no horizontal force there is none." },
      { text: r`$\mu_s mg$`, why: r`That is the maximum possible static friction, reached only when sliding is about to start.` },
      { text: r`$\mu_s mg/2$`, why: "There is no reason for any non-zero value." },
      { text: r`$mg$`, why: "That is the normal reaction, not friction." },
    ],
    solution: r`Static friction is self-adjusting: $f_s \le \mu_sN$. It equals whatever is needed to prevent relative motion. With no applied horizontal force, $f_s = 0$.`,
    concept: "Static friction is self-adjusting", formula: r`$f_s \le \mu_s N$`, whyFormula: "The inequality, not equality, governs static friction.", mistakes: "Always writing $f = \\mu N$.",
  },
  {
    topic: "friction", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 2,
    statement: r`A block is released on a rough incline of angle $37^\circ$ ($\sin 37^\circ = 0.6$) with coefficient of friction $0.5$. Find its acceleration in m s⁻².`,
    solution: r`$\tan37^\circ = 0.75 > 0.5$, so the block slides. Along the incline: $a = g(\sin\theta - \mu\cos\theta) = 10(0.6 - 0.5\times0.8) = 2\ \text{m s}^{-2}$.`,
    concept: "Sliding on a rough incline", formula: r`$a = g(\sin\theta - \mu\cos\theta)$`, whyFormula: "Gravity component down the slope minus kinetic friction.", mistakes: "Not checking first whether the block slides at all ($\\tan\\theta > \\mu$).",
  },
  {
    topic: "friction", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`A $2\ \text{kg}$ block is pressed against a vertical wall by a horizontal force $F$. The coefficient of static friction is $0.5$. The minimum $F$ that keeps the block from sliding down is:`,
    options: [
      { text: r`$40\ \text{N}$`, correct: true, why: r`$\mu_sF \ge mg \Rightarrow F \ge 20/0.5 = 40\ \text{N}$.` },
      { text: r`$20\ \text{N}$`, why: "This only equals the weight; friction is $\\mu$ times the normal force." },
      { text: r`$10\ \text{N}$`, why: "Multiplies by $\\mu$ instead of dividing." },
      { text: r`$80\ \text{N}$`, why: "Twice the required value." },
    ],
    solution: r`The normal force is $N = F$ (horizontal). Friction acts upward and can be at most $\mu_sN$. Equilibrium needs $\mu_sF \ge mg$: $F_{\min} = \dfrac{mg}{\mu_s} = \dfrac{20}{0.5} = 40\ \text{N}$.`,
    concept: "Friction with a horizontal normal force", formula: r`$f_{\max} = \mu_sN$`, whyFormula: "Find the normal force first; here it is the applied force.", mistakes: "Taking the normal force as $mg$.",
  },
  {
    topic: "friction", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 150, answer: 24,
    statement: r`Block A ($2\ \text{kg}$) rests on block B ($4\ \text{kg}$), which lies on a frictionless floor. The coefficient of friction between A and B is $0.4$. A horizontal force $F$ is applied to B. Find the maximum $F$ (in N) for which A and B move together.`,
    solution: r`Only friction accelerates A, so A's acceleration is at most $\mu g = 4\ \text{m s}^{-2}$. Moving together, the whole system has this acceleration: $F_{\max} = (m_A + m_B)\,\mu g = 6 \times 4 = 24\ \text{N}$.`,
    concept: "Limiting friction in stacked blocks", formula: r`$a_{\max} = \mu g$ for the upper block`, whyFormula: "The upper block is pulled only by friction.", mistakes: "Using $F = \\mu m_A g$ (forgetting that B must also accelerate).",
  },
  {
    topic: "friction", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 1,
    statement: r`In the arrangement of the previous question (A: $2\ \text{kg}$ on B: $4\ \text{kg}$, $\mu = 0.4$ between them, frictionless floor), A is placed at the front edge of B, which is $1.5\ \text{m}$ long. The system starts at rest and a force of $36\ \text{N}$ is applied to B. After how many seconds does A fall off B's rear edge? (Treat A as a point.)`,
    solution: r`Since $36\ \text{N} > 24\ \text{N}$, A slips on B and kinetic friction $\mu m_Ag = 8\ \text{N}$ acts.

- A: $a_A = 8/2 = 4\ \text{m s}^{-2}$ forward.
- B: $a_B = (36 - 8)/4 = 7\ \text{m s}^{-2}$ forward.

Relative to B, A accelerates backward at $3\ \text{m s}^{-2}$ from rest. It covers $1.5\ \text{m}$ in $t = \sqrt{2 \times 1.5/3} = 1\ \text{s}$.`,
    concept: "Slipping check, separate free-body diagrams and relative motion", formula: r`$s_{\text{rel}} = \tfrac12a_{\text{rel}}t^2$`, whyFormula: "Both blocks start from rest, so the relative motion starts from rest too.", alt: "Work in B's (non-inertial) frame: A feels a pseudo-force $m_Aa_B = 14\\ \\text{N}$ backward and friction $8\\ \\text{N}$ forward, giving $3\\ \\text{m s}^{-2}$ backward.", mistakes: "Assuming they move together without checking against the 24 N limit; using static friction after slipping starts.",
  },

  // ── Work, Energy and Power · Work and the work–energy theorem ──
  {
    topic: "work-and-the-work-energy-theorem", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In uniform circular motion, the work done by the centripetal force over one revolution is:",
    options: [
      { text: "zero", correct: true, why: "The force is always perpendicular to the displacement." },
      { text: r`$2\pi r \times \dfrac{mv^2}{r}$`, why: "Multiplies the force by the path length, ignoring direction." },
      { text: r`$mv^2$`, why: "There is no change in kinetic energy, so no net work." },
      { text: "negative", why: "The force never has a component along the velocity." },
    ],
    solution: r`$dW = \vec F\cdot d\vec s = F\,ds\cos90^\circ = 0$ at every instant, so the total work is zero — consistent with constant speed (no change in kinetic energy).`,
    concept: "Work by a perpendicular force", formula: r`$W = \int \vec F\cdot d\vec s$`, whyFormula: "Work depends on the force component along the displacement.", mistakes: "Multiplying force by distance without the cosine factor.",
  },
  {
    topic: "work-and-the-work-energy-theorem", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 8,
    statement: r`A force $F = 3x^2\ \text{N}$ ($x$ in metres) acts along the $x$-axis on a particle. Find the work done (in J) as the particle moves from $x = 0$ to $x = 2\ \text{m}$.`,
    solution: r`$W = \displaystyle\int_0^2 3x^2\,dx = \big[x^3\big]_0^2 = 8\ \text{J}$.`,
    concept: "Work by a variable force", formula: r`$W = \int F\,dx$`, whyFormula: "The force changes with position, so $W = F\\,d$ does not apply.", mistakes: "Using $F(2)\\times 2 = 24\\ \\text{J}$.",
  },
  {
    topic: "work-and-the-work-energy-theorem", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`A $2\ \text{kg}$ block slides at $4\ \text{m s}^{-1}$ onto a rough floor with coefficient of kinetic friction $0.2$. The distance it travels before stopping is:`,
    options: [
      { text: r`$4\ \text{m}$`, correct: true, why: r`$\mu mg\,d = \tfrac12mv^2 \Rightarrow d = v^2/(2\mu g) = 16/4$.` },
      { text: r`$2\ \text{m}$`, why: "Missing the factor 2 in $2\\mu g$ the other way round." },
      { text: r`$8\ \text{m}$`, why: "Forgets the $\\tfrac12$ in kinetic energy." },
      { text: r`$1\ \text{m}$`, why: "Arithmetic slip." },
    ],
    solution: r`Work–energy theorem: friction's work equals the change in KE. $-\mu mg\,d = 0 - \tfrac12mv^2 \Rightarrow d = \dfrac{v^2}{2\mu g} = \dfrac{16}{2\times0.2\times10} = 4\ \text{m}$. The mass cancels.`,
    concept: "Work–energy theorem with friction", formula: r`$W_{\text{net}} = \Delta K$`, whyFormula: "Only friction does work horizontally.", mistakes: "Thinking a heavier block slides a different distance.",
  },
  {
    topic: "work-and-the-work-energy-theorem", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 150, answer: 150,
    statement: r`A pump lifts $60\ \text{kg}$ of water per minute through a height of $10\ \text{m}$ and delivers it at a speed of $10\ \text{m s}^{-1}$. Find the minimum power of the pump in watts.`,
    solution: r`Per minute the pump supplies potential energy $mgh = 60\times10\times10 = 6000\ \text{J}$ and kinetic energy $\tfrac12mv^2 = \tfrac12\times60\times100 = 3000\ \text{J}$. Power $= 9000/60 = 150\ \text{W}$.`,
    concept: "Power as the rate of energy supplied", formula: r`$P = \dfrac{mgh + \tfrac12mv^2}{t}$`, whyFormula: "The water gains both potential and kinetic energy.", mistakes: "Ignoring the kinetic energy of the delivered water (answer 100 W).",
  },
  {
    topic: "work-and-the-work-energy-theorem", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 4.22, tolerance: 0.03,
    statement: r`A uniform chain of length $2\ \text{m}$ lies on a smooth horizontal table with one-third of its length hanging over the edge. It is released from rest. Find its speed (in m s⁻¹) at the instant it completely leaves the table.`,
    solution: r`Take the table top as the zero of potential energy and track each part's centre of mass.

- Initially: the hanging third (mass $m/3$) has its centre $L/6$ below the top: $U_i = -\dfrac m3\,g\,\dfrac L6 = -\dfrac{mgL}{18}$.
- Finally: the whole chain hangs, centre $L/2$ below: $U_f = -\dfrac{mgL}{2}$.

Energy conservation: $\tfrac12mv^2 = U_i - U_f = mgL\left(\tfrac12 - \tfrac1{18}\right) = \tfrac49mgL$, so $v = \sqrt{\tfrac89gL} = \sqrt{\tfrac{8\times10\times2}{9}} \approx 4.22\ \text{m s}^{-1}$.`,
    concept: "Energy conservation for an extended body using centres of mass", formula: r`$U = Mgh_{\text{cm}}$`, whyFormula: "The potential energy of a continuous body depends only on its centre of mass.", alt: r`Integrate: when a length $y$ hangs, the net force is $(m/L)yg$; $\displaystyle\int_{L/3}^{L}\frac{m}{L}gy\,dy = \tfrac12mv^2$ gives the same result.`, mistakes: "Treating the whole chain's centre of mass as falling by $L$; forgetting the part that was already hanging.",
  },

  // ── Rotational Motion · Torque and moment of inertia ──
  {
    topic: "torque-and-moment-of-inertia", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The moment of inertia of a thin uniform ring of mass $M$ and radius $R$ about the axis through its centre, perpendicular to its plane, is:",
    options: [
      { text: r`$MR^2$`, correct: true, why: "All the mass is at distance $R$ from the axis." },
      { text: r`$\tfrac12MR^2$`, why: "That is the ring about a diameter (or a disc about its axis)." },
      { text: r`$\tfrac25MR^2$`, why: "That is a solid sphere." },
      { text: r`$\tfrac32MR^2$`, why: "That is the ring about a tangent in its plane." },
    ],
    solution: r`$I = \sum m_ir_i^2 = R^2\sum m_i = MR^2$, since every element is at distance $R$.`,
    concept: "Moment of inertia from its definition", formula: r`$I = \sum m_ir_i^2$`, whyFormula: "The distance from the axis is the same for all mass elements.", mistakes: "Mixing up the axis: perpendicular axis vs diameter.",
  },
  {
    topic: "torque-and-moment-of-inertia", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 4,
    statement: r`Find the moment of inertia (in kg m²) of a uniform rod of mass $3\ \text{kg}$ and length $2\ \text{m}$ about an axis through one end, perpendicular to the rod.`,
    solution: r`$I_{\text{end}} = \tfrac13ML^2 = \tfrac13\times3\times4 = 4\ \text{kg m}^2$ (or $\tfrac1{12}ML^2 + M(L/2)^2$ by the parallel-axis theorem).`,
    concept: "Rod about its end", formula: r`$I = \tfrac13ML^2$`, whyFormula: "Standard result; follows from the parallel-axis theorem.", mistakes: "Using the centre value $\\tfrac1{12}ML^2 = 1$.",
  },
  {
    topic: "torque-and-moment-of-inertia", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "The moment of inertia of a thin ring (mass $M$, radius $R$) about a tangent lying in its plane is:",
    options: [
      { text: r`$\tfrac32MR^2$`, correct: true, why: r`$\tfrac12MR^2$ about a diameter, plus $MR^2$ for the shift of axis.` },
      { text: r`$2MR^2$`, why: "That is a tangent perpendicular to the plane." },
      { text: r`$\tfrac12MR^2$`, why: "That is about a diameter, through the centre." },
      { text: r`$MR^2$`, why: "That is about the central perpendicular axis." },
    ],
    solution: r`Perpendicular-axis theorem: $I_{\text{diameter}} = \tfrac12MR^2$. The tangent in the plane is parallel to a diameter at distance $R$: $I = \tfrac12MR^2 + MR^2 = \tfrac32MR^2$.`,
    concept: "Perpendicular and parallel axes theorems together", formula: r`$I = I_{\text{cm}} + Md^2$`, whyFormula: "The parallel-axis theorem needs an axis through the centre of mass first.", mistakes: "Applying the parallel-axis shift from an axis that is not through the centre of mass.",
  },
  {
    topic: "torque-and-moment-of-inertia", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 16,
    statement: r`A uniform disc of mass $2\ \text{kg}$ and radius $0.5\ \text{m}$ can rotate freely about its fixed central axis. A string wound on its rim is pulled with a constant force of $4\ \text{N}$. Starting from rest, find its angular speed (in rad s⁻¹) after $2\ \text{s}$.`,
    solution: r`$\tau = FR = 4\times0.5 = 2\ \text{N m}$; $I = \tfrac12MR^2 = \tfrac12\times2\times0.25 = 0.25\ \text{kg m}^2$; $\alpha = \tau/I = 8\ \text{rad s}^{-2}$; $\omega = \alpha t = 16\ \text{rad s}^{-1}$.`,
    concept: "Rotational form of Newton's second law", formula: r`$\tau = I\alpha$`, whyFormula: "A fixed axis, so torque about it determines angular acceleration.", mistakes: "Using $I = MR^2$ for a disc.",
  },
  {
    topic: "torque-and-moment-of-inertia", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 3,
    statement: r`A light string is wound on a pulley that is a uniform disc of mass $2\ \text{kg}$ and radius $0.1\ \text{m}$, free to turn about a fixed horizontal axle. A $1\ \text{kg}$ block hangs from the free end. Released from rest, what is the block's speed (in m s⁻¹) after it has fallen $0.9\ \text{m}$? The string does not slip.`,
    solution: r`Block: $mg - T = ma$. Pulley: $TR = I\alpha = \tfrac12MR^2\cdot\dfrac aR \Rightarrow T = \tfrac12Ma$.

Adding: $mg = \left(m + \tfrac M2\right)a \Rightarrow a = \dfrac{10}{1 + 1} = 5\ \text{m s}^{-2}$. Then $v = \sqrt{2ah} = \sqrt{2\times5\times0.9} = 3\ \text{m s}^{-1}$.`,
    concept: "Coupled translation and rotation", formula: r`$a = R\alpha$ (no slipping), $\tau = I\alpha$`, whyFormula: "The constraint links the block's acceleration to the pulley's angular acceleration.", alt: r`Energy: $mgh = \tfrac12mv^2 + \tfrac12I\omega^2 = \tfrac12\left(m + \tfrac M2\right)v^2 \Rightarrow v^2 = \dfrac{2\times1\times10\times0.9}{2} = 9$.`, mistakes: "Assuming the tension equals the weight; forgetting the pulley's rotational kinetic energy ($v = \\sqrt{2gh} = 4.24$).",
  },

  // ── Gravitation · Satellites and Kepler's laws ──
  {
    topic: "satellites-and-keplers-laws", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The orbital speed of a satellite just above the Earth's surface (radius $R$, surface gravity $g$) is about:",
    options: [
      { text: r`$\sqrt{gR}$`, correct: true, why: r`$mg = mv^2/R$ for a circular orbit at the surface.` },
      { text: r`$\sqrt{2gR}$`, why: "That is the escape speed." },
      { text: r`$gR$`, why: "Dimensionally not a speed." },
      { text: r`$\sqrt{gR/2}$`, why: "That is the orbital speed at height $R$." },
    ],
    solution: r`Gravity provides the centripetal force: $mg = \dfrac{mv^2}{R} \Rightarrow v = \sqrt{gR} \approx 7.9\ \text{km s}^{-1}$.`,
    concept: "Orbital speed", formula: r`$v_o = \sqrt{GM/r}$`, whyFormula: "At $r = R$, $GM/R = gR$.", mistakes: "Confusing orbital and escape speeds.",
  },
  {
    topic: "satellites-and-keplers-laws", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 11.2, tolerance: 0.05,
    statement: r`A planet has twice the mass and twice the radius of the Earth. If the escape speed from the Earth is $11.2\ \text{km s}^{-1}$, find the escape speed from the planet in km s⁻¹.`,
    solution: r`$v_e = \sqrt{2GM/R} \propto \sqrt{M/R}$. Here $M/R$ is unchanged ($2/2 = 1$), so $v_e = 11.2\ \text{km s}^{-1}$.`,
    concept: "Escape speed scaling", formula: r`$v_e = \sqrt{2GM/R}$`, whyFormula: "Ratio method — constants cancel.", mistakes: "Scaling with $M$ alone, or with $R^2$ as for $g$.",
  },
  {
    topic: "satellites-and-keplers-laws", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "If the radius of a planet's circular orbit around the Sun were four times larger, its orbital period would become:",
    options: [
      { text: r`$8T$`, correct: true, why: r`$T \propto r^{3/2}$, and $4^{3/2} = 8$.` },
      { text: r`$4T$`, why: "Period is not proportional to radius." },
      { text: r`$16T$`, why: "Uses $T \\propto r^2$." },
      { text: r`$2T$`, why: "Uses $T \\propto \\sqrt r$." },
    ],
    solution: r`Kepler's third law: $T^2 \propto r^3$, so $T \propto r^{3/2}$ and $T' = 4^{3/2}T = 8T$.`,
    concept: "Kepler's third law", formula: r`$T^2 = \dfrac{4\pi^2}{GM}r^3$`, whyFormula: "It relates period and orbital radius directly.", mistakes: "Squaring or cubing the wrong side.",
  },
  {
    topic: "satellites-and-keplers-laws", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 5.66, tolerance: 0.03,
    statement: r`A satellite moves in a circular orbit at a height equal to the Earth's radius ($R = 6400\ \text{km}$, $g = 10\ \text{m s}^{-2}$ at the surface). Find its orbital speed in km s⁻¹.`,
    solution: r`$v = \sqrt{\dfrac{GM}{2R}} = \sqrt{\dfrac{gR}{2}} = \sqrt{\dfrac{10\times6.4\times10^6}{2}} = \sqrt{3.2\times10^7} \approx 5.66\times10^3\ \text{m s}^{-1}$.`,
    concept: "Orbital speed at a height", formula: r`$v = \sqrt{GM/r},\ GM = gR^2$`, whyFormula: "$r = R + h = 2R$; $GM$ is replaced using surface gravity.", mistakes: "Using $r = h$ instead of $R + h$.",
  },
  {
    topic: "satellites-and-keplers-laws", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 3.2, tolerance: 0.02,
    statement: r`A $600\ \text{kg}$ satellite is moved from a circular orbit of radius $2R$ to a circular orbit of radius $3R$ around the Earth ($R = 6.4\times10^6\ \text{m}$, $g = 10\ \text{m s}^{-2}$). Find the minimum energy required, in units of $10^9\ \text{J}$.`,
    solution: r`The total energy of a circular orbit is $E = -\dfrac{GMm}{2r}$ (kinetic energy is half the magnitude of the potential energy).

$\Delta E = \dfrac{GMm}{2}\left(\dfrac1{2R} - \dfrac1{3R}\right) = \dfrac{GMm}{12R} = \dfrac{mgR}{12}$ (using $GM = gR^2$).

$\Delta E = \dfrac{600\times10\times6.4\times10^6}{12} = 3.2\times10^9\ \text{J}$.`,
    concept: "Energy of circular orbits", formula: r`$E = -\dfrac{GMm}{2r}$`, whyFormula: "Both orbits are circular, so only the total orbital energies matter.", mistakes: "Using only the change in potential energy (gives twice the answer); forgetting that kinetic energy decreases in the higher orbit.",
  },

  // ── Properties of Solids and Liquids · Fluid mechanics ──
  {
    topic: "fluid-mechanics", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The terminal velocity of a small sphere falling through a viscous liquid is proportional to its radius $r$ as:",
    options: [
      { text: r`$r^2$`, correct: true, why: r`$v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta}$.` },
      { text: r`$r$`, why: "Weight grows as $r^3$ but drag only as $r$." },
      { text: r`$r^3$`, why: "That is the weight's dependence." },
      { text: r`$1/r$`, why: "Bigger spheres fall faster, not slower." },
    ],
    solution: r`At terminal velocity, weight − buoyancy = Stokes drag: $\tfrac43\pi r^3(\rho - \sigma)g = 6\pi\eta rv_t$, so $v_t \propto r^2$.`,
    concept: "Stokes' law and terminal velocity", formula: r`$F = 6\pi\eta rv$`, whyFormula: "Balance of forces at constant velocity.", mistakes: "Forgetting buoyancy, or the $r$ in Stokes' drag.",
  },
  {
    topic: "fluid-mechanics", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 100,
    statement: r`Find the gauge pressure (in kPa) at a depth of $10\ \text{m}$ in water ($\rho = 1000\ \text{kg m}^{-3}$).`,
    solution: r`$P_{\text{gauge}} = \rho gh = 1000\times10\times10 = 10^5\ \text{Pa} = 100\ \text{kPa}$.`,
    concept: "Pressure due to a fluid column", formula: r`$P = \rho gh$`, whyFormula: "Gauge pressure excludes atmospheric pressure.", mistakes: "Adding atmospheric pressure when gauge pressure is asked.",
  },
  {
    topic: "fluid-mechanics", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "Water flows steadily through a horizontal pipe. Where the cross-sectional area is halved, the speed and pressure of the water:",
    options: [
      { text: "speed doubles and pressure decreases", correct: true, why: "Continuity doubles the speed; Bernoulli then lowers the pressure." },
      { text: "speed doubles and pressure increases", why: "Higher speed in a horizontal pipe means lower pressure." },
      { text: "speed halves and pressure increases", why: "Continuity: $Av$ is constant, so a smaller area means higher speed." },
      { text: "both stay the same", why: "Mass conservation forces the speed to change." },
    ],
    solution: r`Continuity: $A_1v_1 = A_2v_2 \Rightarrow v_2 = 2v_1$. Bernoulli at equal height: $P + \tfrac12\rho v^2$ is constant, so $P$ falls where $v$ rises.`,
    concept: "Continuity and Bernoulli's principle", formula: r`$A_1v_1 = A_2v_2$; $P + \tfrac12\rho v^2 + \rho gh = \text{const}$`, whyFormula: "Ideal, steady, incompressible flow.", mistakes: "Thinking a narrow section must have higher pressure.",
  },
  {
    topic: "fluid-mechanics", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 150, answer: 10,
    statement: r`A tank standing on level ground is filled with water to a height of $10\ \text{m}$. A small hole is made in its side $5\ \text{m}$ below the water surface. How far from the base of the tank (in m) does the jet hit the ground?`,
    solution: r`Efflux speed (Torricelli): $v = \sqrt{2gh} = \sqrt{2\times10\times5} = 10\ \text{m s}^{-1}$, horizontal. The hole is $5\ \text{m}$ above the ground: fall time $t = \sqrt{2\times5/10} = 1\ \text{s}$. Range $= vt = 10\ \text{m}$.`,
    concept: "Torricelli's theorem with projectile motion", formula: r`$v = \sqrt{2gh}$`, whyFormula: "Bernoulli between the free surface and the hole (both at atmospheric pressure).", alt: r`Range $= 2\sqrt{h(H - h)} = 2\sqrt{5\times5} = 10\ \text{m}$.`, mistakes: "Measuring $h$ from the ground instead of from the free surface.",
  },
  {
    topic: "fluid-mechanics", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 2,
    statement: r`A small ball of density $500\ \text{kg m}^{-3}$ is released from rest $2\ \text{m}$ below the surface of water ($1000\ \text{kg m}^{-3}$). Ignoring viscosity and surface effects, to what height (in m) above the water surface does it rise?`,
    solution: r`In the water, the net upward force is buoyancy minus weight: $a = \dfrac{(\sigma - \rho)Vg}{\rho V} = \left(\dfrac{1000}{500} - 1\right)g = g = 10\ \text{m s}^{-2}$ upward.

At the surface: $v^2 = 2a\,(2) = 40\ \text{m}^2\text{s}^{-2}$. Above the water only gravity acts: $h = \dfrac{v^2}{2g} = \dfrac{40}{20} = 2\ \text{m}$.`,
    concept: "Buoyancy, Newton's second law and projectile rise", formula: r`$a = \left(\dfrac{\sigma}{\rho} - 1\right)g$`, whyFormula: "Archimedes' principle gives the buoyant force on the fully immersed ball.", alt: r`Energy: net work by buoyancy and gravity in water $(\sigma - \rho)Vg\times2$ equals the gain in PE above water $\rho Vgh$, so $h = 2(\sigma/\rho - 1) = 2\ \text{m}$.`, mistakes: "Using buoyancy alone (forgetting weight) inside the water; forgetting that it decelerates at $g$ once out.",
  },

  // ── Thermodynamics · First law ──
  {
    topic: "first-law-of-thermodynamics", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In an isothermal process of an ideal gas, the change in internal energy is:",
    options: [
      { text: "zero", correct: true, why: "The internal energy of an ideal gas depends only on its temperature." },
      { text: "equal to the heat supplied", why: "The heat supplied equals the work done, not $\\Delta U$." },
      { text: "equal to the work done", why: "$\\Delta U = Q - W = 0$ here." },
      { text: "always negative", why: "Temperature is constant." },
    ],
    solution: r`For an ideal gas $U = nC_VT$. If $T$ is constant, $\Delta U = 0$, and the first law gives $Q = W$.`,
    concept: "Internal energy of an ideal gas", formula: r`$\Delta U = nC_V\Delta T$`, whyFormula: "Valid for any process of an ideal gas.", mistakes: "Assuming 'isothermal' means 'no heat exchanged'.",
  },
  {
    topic: "first-law-of-thermodynamics", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 300,
    statement: r`A gas absorbs $500\ \text{J}$ of heat and does $200\ \text{J}$ of work on its surroundings. Find the change in its internal energy in joules.`,
    solution: r`$\Delta U = Q - W = 500 - 200 = 300\ \text{J}$ (with $W$ = work done by the gas).`,
    concept: "First law of thermodynamics", formula: r`$\Delta U = Q - W$`, whyFormula: "Energy conservation with the physics sign convention.", mistakes: "Mixing sign conventions (chemistry uses $\\Delta U = q + w$ with $w$ done on the system).",
  },
  {
    topic: "first-law-of-thermodynamics", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "When an ideal gas expands adiabatically, its temperature:",
    options: [
      { text: "decreases", correct: true, why: "$Q = 0$ and $W > 0$, so $\\Delta U = -W < 0$." },
      { text: "increases", why: "That happens in adiabatic compression." },
      { text: "stays the same", why: "That is an isothermal process, which needs heat input." },
      { text: "may increase or decrease", why: "For expansion ($W > 0$) the sign is fixed." },
    ],
    solution: r`Adiabatic: $Q = 0$. Expansion means the gas does positive work, so $\Delta U = -W < 0$ and $T$ falls ($TV^{\gamma-1}$ = constant).`,
    concept: "Adiabatic process", formula: r`$TV^{\gamma - 1} = \text{constant}$`, whyFormula: "Follows from the first law with $Q = 0$.", mistakes: "Confusing adiabatic with isothermal.",
  },
  {
    topic: "first-law-of-thermodynamics", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 4155, tolerance: 5,
    statement: r`Two moles of a monatomic ideal gas are heated at constant pressure from $300\ \text{K}$ to $400\ \text{K}$. Find the heat supplied in joules ($R = 8.31\ \text{J mol}^{-1}\text{K}^{-1}$).`,
    solution: r`Monatomic: $C_P = \tfrac52R$. $Q = nC_P\Delta T = 2\times\tfrac52\times8.31\times100 = 4155\ \text{J}$.`,
    concept: "Heat at constant pressure", formula: r`$Q = nC_P\Delta T$`, whyFormula: "Constant pressure, so $C_P$ (not $C_V$).", mistakes: "Using $C_V = \\tfrac32R$ (gives 2493 J).",
  },
  {
    topic: "first-law-of-thermodynamics", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: -200, tolerance: 0.5,
    statement: r`One mole of an ideal gas is taken round the cycle A → B → C → D → A, with $(P, V)$ values A $(1\times10^5\ \text{Pa},\ 1\ \text{L})$, B $(1\times10^5\ \text{Pa},\ 3\ \text{L})$, C $(2\times10^5\ \text{Pa},\ 3\ \text{L})$, D $(2\times10^5\ \text{Pa},\ 1\ \text{L})$; each step is a straight line on the $P$–$V$ diagram. Find the net heat absorbed by the gas over one cycle, in joules (negative if heat is released).`,
    solution: r`Work done by the gas in each step:

- A → B (expansion at $1\times10^5$ Pa): $W = 10^5\times2\times10^{-3} = +200\ \text{J}$.
- B → C and D → A (constant volume): $W = 0$.
- C → D (compression at $2\times10^5$ Pa): $W = 2\times10^5\times(-2\times10^{-3}) = -400\ \text{J}$.

Net $W = -200\ \text{J}$. Over a cycle $\Delta U = 0$, so $Q = W = -200\ \text{J}$: the gas releases $200\ \text{J}$ of heat. (The cycle is traversed anticlockwise on a $P$–$V$ diagram, which always means net work is done on the gas.)`,
    concept: "First law over a cycle and the sign of the enclosed area", formula: r`$\oint dU = 0 \Rightarrow Q_{\text{net}} = W_{\text{net}}$`, whyFormula: "Internal energy is a state function.", mistakes: "Taking the area as positive regardless of direction; converting litres to m³ incorrectly ($1\\ \\text{L} = 10^{-3}\\ \\text{m}^3$).",
  },

  // ── Kinetic Theory of Gases ──
  {
    topic: "kinetic-theory", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "For a given ideal gas, the RMS speed of its molecules is proportional to the absolute temperature $T$ as:",
    options: [
      { text: r`$\sqrt T$`, correct: true, why: r`$v_{\text{rms}} = \sqrt{3RT/M}$.` },
      { text: r`$T$`, why: "Kinetic energy, not speed, is proportional to $T$." },
      { text: r`$T^2$`, why: "No such dependence." },
      { text: r`$1/\sqrt T$`, why: "Molecules move faster when hotter." },
    ],
    solution: r`$\tfrac12mv_{\text{rms}}^2 = \tfrac32kT$, so $v_{\text{rms}} = \sqrt{3kT/m} \propto \sqrt T$.`,
    concept: "Kinetic interpretation of temperature", formula: r`$v_{\text{rms}} = \sqrt{3RT/M}$`, whyFormula: "Average translational KE is $\\tfrac32kT$.", mistakes: "Confusing proportionality of KE and speed.",
  },
  {
    topic: "kinetic-theory", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 483, tolerance: 2,
    statement: r`Find the RMS speed (in m s⁻¹) of oxygen molecules ($M = 32\ \text{g mol}^{-1}$) at $300\ \text{K}$ ($R = 8.31\ \text{J mol}^{-1}\text{K}^{-1}$).`,
    solution: r`$v_{\text{rms}} = \sqrt{\dfrac{3RT}{M}} = \sqrt{\dfrac{3\times8.31\times300}{0.032}} = \sqrt{2.337\times10^5} \approx 483\ \text{m s}^{-1}$.`,
    concept: "RMS speed", formula: r`$v_{\text{rms}} = \sqrt{3RT/M}$`, whyFormula: "Molar mass in kg mol⁻¹ with $R$ in SI units.", mistakes: "Using $M = 32$ instead of $0.032\\ \\text{kg mol}^{-1}$.",
  },
  {
    topic: "kinetic-theory", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`At what temperature is the RMS speed of a gas's molecules twice its value at $27^\circ\text{C}$?`,
    options: [
      { text: r`$927^\circ\text{C}$`, correct: true, why: r`$T$ must be four times $300\ \text{K}$: $1200\ \text{K} = 927^\circ\text{C}$.` },
      { text: r`$54^\circ\text{C}$`, why: "Doubles the Celsius temperature." },
      { text: r`$327^\circ\text{C}$`, why: "Doubles the kelvin temperature (speed would rise by only √2)." },
      { text: r`$1200^\circ\text{C}$`, why: "1200 is the kelvin value." },
    ],
    solution: r`$v_{\text{rms}} \propto \sqrt T$, so doubling it needs $4T = 4\times300 = 1200\ \text{K} = 927^\circ\text{C}$.`,
    concept: "Scaling of RMS speed with temperature", formula: r`$v_{\text{rms}} \propto \sqrt T$`, whyFormula: "Ratio method; $T$ in kelvin.", mistakes: "Working in Celsius.",
  },
  {
    topic: "kinetic-theory", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 4,
    statement: r`Find the ratio of the RMS speed of hydrogen molecules to that of oxygen molecules at the same temperature.`,
    solution: r`$\dfrac{v_{\text{H}_2}}{v_{\text{O}_2}} = \sqrt{\dfrac{M_{\text{O}_2}}{M_{\text{H}_2}}} = \sqrt{\dfrac{32}{2}} = 4$.`,
    concept: "Dependence on molar mass", formula: r`$v_{\text{rms}} \propto 1/\sqrt M$`, whyFormula: "Same temperature, so only molar mass differs.", mistakes: "Using atomic masses (16 and 1) — the ratio is the same here, but not in general.",
  },
  {
    topic: "kinetic-theory", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: 2,
    statement: r`Two vessels of equal volume contain ideal gases: vessel 1 has hydrogen at $300\ \text{K}$ and pressure $P$; vessel 2 has oxygen at $600\ \text{K}$ and pressure $2P$. Find the ratio (vessel 2 : vessel 1) of the total translational kinetic energy of the molecules.`,
    solution: r`Total translational KE $= N\cdot\tfrac32kT = \tfrac32nRT = \tfrac32PV$.

It depends only on $P$ and $V$, not on the gas or (separately) the temperature. With equal volumes, the ratio is $\dfrac{2P}{P} = 2$.

(Check: $N_2/N_1 = \dfrac{2P/600}{P/300} = 1$ — equal numbers of molecules — and the KE per molecule is twice as large at 600 K.)`,
    concept: "Pressure as two-thirds of the translational KE density", formula: r`$PV = \tfrac23E_{\text{trans}}$`, whyFormula: "It links the macroscopic pressure to total molecular kinetic energy directly.", mistakes: "Bringing molar mass into a kinetic-energy comparison; using $\\tfrac52kT$ (that includes rotation, which is not translational).",
  },

  // ── Current Electricity · Kirchhoff's laws and circuits ──
  {
    topic: "kirchhoffs-laws-and-circuits", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Kirchhoff's junction (current) rule is a consequence of the conservation of:",
    options: [
      { text: "charge", correct: true, why: "Charge does not accumulate at a junction in steady state." },
      { text: "energy", why: "Energy conservation gives the loop rule." },
      { text: "momentum", why: "Not involved." },
      { text: "mass", why: "Current is flow of charge, not of mass." },
    ],
    solution: "In steady state no charge builds up at a junction, so the total current in equals the total current out. The loop rule comes from energy conservation.",
    concept: "Basis of Kirchhoff's laws", formula: r`$\sum I_{\text{in}} = \sum I_{\text{out}}$`, whyFormula: "Charge conservation at a point.", mistakes: "Swapping the bases of the two rules.",
  },
  {
    topic: "kirchhoffs-laws-and-circuits", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 10,
    statement: r`A cell of EMF $12\ \text{V}$ and internal resistance $1\ \Omega$ is connected to a $5\ \Omega$ resistor. Find the terminal potential difference in volts.`,
    solution: r`$I = \dfrac{E}{R + r} = \dfrac{12}{6} = 2\ \text{A}$; $V = E - Ir = 12 - 2 = 10\ \text{V}$ (also $= IR$).`,
    concept: "Terminal voltage", formula: r`$V = E - Ir$`, whyFormula: "Part of the EMF is used inside the cell.", mistakes: "Answering the EMF.",
  },
  {
    topic: "kirchhoffs-laws-and-circuits", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`A Wheatstone bridge has $P = 10\ \Omega$, $Q = 20\ \Omega$ and $R = 15\ \Omega$. It is balanced when the fourth resistance $S$ is:`,
    options: [
      { text: r`$30\ \Omega$`, correct: true, why: r`$P/Q = R/S \Rightarrow S = RQ/P = 30$.` },
      { text: r`$7.5\ \Omega$`, why: "Inverts the ratio." },
      { text: r`$45\ \Omega$`, why: "Adds instead of using the ratio." },
      { text: r`$20\ \Omega$`, why: "Copies $Q$." },
    ],
    solution: r`Balance condition: $\dfrac PQ = \dfrac RS \Rightarrow S = \dfrac{QR}{P} = \dfrac{20\times15}{10} = 30\ \Omega$.`,
    concept: "Balanced Wheatstone bridge", formula: r`$P/Q = R/S$`, whyFormula: "No current through the galvanometer at balance.", mistakes: "Pairing the wrong arms.",
  },
  {
    topic: "kirchhoffs-laws-and-circuits", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 150, answer: 1.5,
    statement: r`Two cells, $2\ \text{V}$ with internal resistance $1\ \Omega$ and $4\ \text{V}$ with internal resistance $1\ \Omega$, are connected in parallel (positive terminals together) across a $1.5\ \Omega$ resistor. Find the current (in A) through the resistor.`,
    solution: r`Equivalent cell: $E_{\text{eq}} = \dfrac{E_1/r_1 + E_2/r_2}{1/r_1 + 1/r_2} = \dfrac{2 + 4}{2} = 3\ \text{V}$, $r_{\text{eq}} = 0.5\ \Omega$. Current $= \dfrac{3}{0.5 + 1.5} = 1.5\ \text{A}$.`,
    concept: "Cells in parallel", formula: r`$E_{\text{eq}} = \dfrac{\sum E_i/r_i}{\sum 1/r_i}$`, whyFormula: "Equivalent of a parallel combination of non-identical cells.", alt: r`Kirchhoff: let the common terminal voltage be $V$. Currents: $(2 - V)/1 + (4 - V)/1 = V/1.5 \Rightarrow 6 = V(2 + \tfrac23) \Rightarrow V = 2.25\ \text{V}$, current $= 2.25/1.5 = 1.5\ \text{A}$.`, mistakes: "Adding the EMFs as if in series.",
  },
  {
    topic: "kirchhoffs-laws-and-circuits", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 33.3, tolerance: 0.2,
    statement: r`In a metre bridge, an unknown resistance $X$ is in the left gap and $12\ \Omega$ in the right gap; the balance point is $40\ \text{cm}$ from the left end. A $24\ \Omega$ resistor is then connected in parallel with $X$. Find the new balance length (in cm) from the left end.`,
    solution: r`First balance: $\dfrac X{12} = \dfrac{40}{60} \Rightarrow X = 8\ \Omega$.

With $24\ \Omega$ in parallel: $X' = \dfrac{8\times24}{32} = 6\ \Omega$.

New balance: $\dfrac{6}{12} = \dfrac{l}{100 - l} \Rightarrow l = \tfrac{100}{3} \approx 33.3\ \text{cm}$.`,
    concept: "Metre bridge with a modified arm", formula: r`$\dfrac XR = \dfrac{l}{100 - l}$`, whyFormula: "Metre bridge balance condition (a Wheatstone bridge with wire segments).", mistakes: "Measuring $l$ from the wrong end; adding the resistors in series.",
  },

  // ── Magnetic effects · Force on moving charges and currents ──
  {
    topic: "force-on-moving-charges-and-currents", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The work done by a uniform magnetic field on a moving charged particle is:",
    options: [
      { text: "always zero", correct: true, why: "$\\vec F = q\\vec v\\times\\vec B$ is always perpendicular to $\\vec v$." },
      { text: "positive", why: "The magnetic force cannot change the speed." },
      { text: "negative", why: "Same reason — no tangential component." },
      { text: "zero only for circular motion", why: "It is zero for any path, including helical motion." },
    ],
    solution: r`The magnetic force $q\vec v\times\vec B$ is perpendicular to the velocity, so its power $\vec F\cdot\vec v = 0$. Speed and kinetic energy stay constant.`,
    concept: "Magnetic force does no work", formula: r`$\vec F = q\,\vec v\times\vec B$`, whyFormula: "A cross product is perpendicular to both factors.", mistakes: "Thinking a magnetic field can speed up a charge.",
  },
  {
    topic: "force-on-moving-charges-and-currents", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 20,
    statement: r`A particle of mass $1.6\times10^{-27}\ \text{kg}$ and charge $1.6\times10^{-19}\ \text{C}$ moves at $2\times10^6\ \text{m s}^{-1}$ perpendicular to a uniform magnetic field of $0.1\ \text{T}$. Find the radius of its path in cm.`,
    solution: r`$r = \dfrac{mv}{qB} = \dfrac{1.6\times10^{-27}\times2\times10^6}{1.6\times10^{-19}\times0.1} = 0.2\ \text{m} = 20\ \text{cm}$.`,
    concept: "Circular motion in a magnetic field", formula: r`$r = \dfrac{mv}{qB}$`, whyFormula: "$qvB = mv^2/r$.", mistakes: "Forgetting to convert to cm.",
  },
  {
    topic: "force-on-moving-charges-and-currents", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Two long parallel wires carry currents in the same direction. The wires:",
    options: [
      { text: "attract each other", correct: true, why: "Each wire sits in the other's field; the force on parallel currents is attractive." },
      { text: "repel each other", why: "That happens for opposite currents." },
      { text: "exert no force on each other", why: "Each current is in the other's magnetic field." },
      { text: "experience a torque but no net force", why: "Parallel straight wires feel a net force per unit length." },
    ],
    solution: r`The field of wire 1 at wire 2 is $B = \mu_0I_1/(2\pi d)$; the force per unit length on wire 2 is $\mu_0I_1I_2/(2\pi d)$, directed towards wire 1 for like currents (right-hand rule). This defines the ampere.`,
    concept: "Force between parallel currents", formula: r`$\dfrac FL = \dfrac{\mu_0I_1I_2}{2\pi d}$`, whyFormula: "Combines the field of a long wire with $\\vec F = I\\vec L\\times\\vec B$.", mistakes: "Using the rule for like charges (repel) by analogy.",
  },
  {
    topic: "force-on-moving-charges-and-currents", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 0.505, tolerance: 0.005,
    statement: r`A galvanometer of resistance $50\ \Omega$ gives full-scale deflection at $10\ \text{mA}$. Find the shunt resistance (in Ω) needed to convert it into an ammeter of range $0\text{–}1\ \text{A}$.`,
    solution: r`The shunt carries $I - I_g = 0.99\ \text{A}$ at the same voltage as the galvanometer: $S = \dfrac{I_gG}{I - I_g} = \dfrac{0.01\times50}{0.99} \approx 0.505\ \Omega$.`,
    concept: "Galvanometer to ammeter", formula: r`$S = \dfrac{I_gG}{I - I_g}$`, whyFormula: "The shunt is in parallel, so the voltages are equal.", mistakes: "Using $I$ instead of $I - I_g$ (gives 0.5 Ω, close but not correct); putting the resistance in series (that makes a voltmeter).",
  },
  {
    topic: "force-on-moving-charges-and-currents", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 4,
    statement: r`Protons ($m = 1.6\times10^{-27}\ \text{kg}$, $q = 1.6\times10^{-19}\ \text{C}$) of various speeds enter a region with crossed fields $E = 10^4\ \text{V m}^{-1}$ and $B = 0.05\ \text{T}$. Those that pass straight through then enter a region containing only a uniform magnetic field of $0.05\ \text{T}$, perpendicular to their velocity. Find the radius of their circular path, in cm.`,
    solution: r`Undeflected protons satisfy $qE = qvB \Rightarrow v = E/B = \dfrac{10^4}{0.05} = 2\times10^5\ \text{m s}^{-1}$ (a velocity selector).

In the magnetic field alone: $r = \dfrac{mv}{qB} = \dfrac{1.6\times10^{-27}\times2\times10^5}{1.6\times10^{-19}\times0.05} = 0.04\ \text{m} = 4\ \text{cm}$.`,
    concept: "Velocity selector followed by a magnetic deflection", formula: r`$v = E/B$, then $r = mv/(qB)$`, whyFormula: "Only one speed survives the crossed fields; that speed fixes the radius.", alt: r`Combining: $r = \dfrac{mE}{qB_1B_2}$.`, mistakes: "Using $v = B/E$; including the electric force in the second region.",
  },

  // ── Electromagnetic Induction ──
  {
    topic: "electromagnetic-induction", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Lenz's law is a consequence of the law of conservation of:",
    options: [
      { text: "energy", correct: true, why: "If the induced current aided the change, energy would be created from nothing." },
      { text: "charge", why: "Charge conservation gives Kirchhoff's junction rule." },
      { text: "momentum", why: "Not the underlying principle here." },
      { text: "magnetic flux", why: "Flux is not a conserved quantity." },
    ],
    solution: "The induced current opposes the change that produces it. If it did not, a small change would grow by itself and produce energy for free; so Lenz's law expresses energy conservation.",
    concept: "Lenz's law", formula: r`$\varepsilon = -\dfrac{d\Phi}{dt}$`, whyFormula: "The minus sign is Lenz's law.", mistakes: "Saying the induced current opposes the flux itself (it opposes the change in flux).",
  },
  {
    topic: "electromagnetic-induction", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 20,
    statement: r`The flux through each turn of a 10-turn coil falls from $0.5\ \text{Wb}$ to $0.1\ \text{Wb}$ in $0.2\ \text{s}$. Find the magnitude of the average induced EMF in volts.`,
    solution: r`$|\varepsilon| = N\dfrac{\Delta\Phi}{\Delta t} = 10\times\dfrac{0.4}{0.2} = 20\ \text{V}$.`,
    concept: "Faraday's law", formula: r`$\varepsilon = -N\dfrac{\Delta\Phi}{\Delta t}$`, whyFormula: "Average EMF over a time interval.", mistakes: "Forgetting the number of turns.",
  },
  {
    topic: "electromagnetic-induction", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`A straight conductor of length $l$ moves with velocity $v$ perpendicular to its length and to a uniform magnetic field $B$. The EMF between its ends is:`,
    options: [
      { text: r`$Bvl$`, correct: true, why: "Motional EMF: each charge feels $qvB$ along the rod." },
      { text: r`$Bv/l$`, why: "Dimensionally wrong." },
      { text: r`$\tfrac12Bvl$`, why: "The factor ½ belongs to a rod rotating about one end ($\\tfrac12B\\omega l^2$)." },
      { text: "zero", why: "The rod cuts field lines, so an EMF appears." },
    ],
    solution: r`The magnetic force on charges in the rod, $qvB$, acts along the rod. Work per unit charge over length $l$ gives $\varepsilon = Bvl$. Equivalently, the area swept per second is $lv$, so $d\Phi/dt = Blv$.`,
    concept: "Motional EMF", formula: r`$\varepsilon = Bvl$`, whyFormula: "$\\vec B$, $\\vec v$ and the rod are mutually perpendicular.", mistakes: "Using the rotating-rod formula for translation.",
  },
  {
    topic: "electromagnetic-induction", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 9,
    statement: r`Find the energy (in J) stored in an inductor of $2\ \text{H}$ carrying a current of $3\ \text{A}$.`,
    solution: r`$U = \tfrac12LI^2 = \tfrac12\times2\times9 = 9\ \text{J}$.`,
    concept: "Energy in a magnetic field", formula: r`$U = \tfrac12LI^2$`, whyFormula: "Work done against the back EMF while the current builds up.", mistakes: "Forgetting the ½.",
  },
  {
    topic: "electromagnetic-induction", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 2,
    statement: r`A conducting rod of length $0.5\ \text{m}$ slides without friction on two parallel rails joined at one end by a $2\ \Omega$ resistor; the rod and rails have negligible resistance. A uniform field of $1\ \text{T}$ is perpendicular to the plane of the rails. An external agent moves the rod at a constant $4\ \text{m s}^{-1}$. Find the power (in W) supplied by the agent.`,
    solution: r`EMF: $\varepsilon = Bvl = 1\times4\times0.5 = 2\ \text{V}$. Current: $I = 2/2 = 1\ \text{A}$. Magnetic force on the rod, opposing its motion: $F = BIl = 0.5\ \text{N}$.

At constant velocity the agent supplies $F = 0.5\ \text{N}$, so $P = Fv = 0.5\times4 = 2\ \text{W}$ — exactly the Joule heating $I^2R = 2\ \text{W}$, as energy conservation requires.`,
    concept: "Motional EMF, Ohm's law, magnetic force and energy balance", formula: r`$P = Fv = \dfrac{B^2l^2v^2}{R}$`, whyFormula: "Constant velocity means the applied force balances the magnetic drag.", mistakes: "Forgetting that the agent must balance the magnetic force; computing only EMF × current without checking the force.",
  },

  // ── Electromagnetic Waves ──
  {
    topic: "electromagnetic-waves", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In an electromagnetic wave travelling in vacuum, the electric field $\\vec E$, the magnetic field $\\vec B$ and the direction of propagation are:",
    options: [
      { text: "mutually perpendicular", correct: true, why: "EM waves are transverse; $\\vec E\\times\\vec B$ points along the propagation." },
      { text: "all parallel", why: "That would be a longitudinal wave." },
      { text: r`$\vec E$ along the propagation, $\vec B$ perpendicular`, why: "Neither field has a component along the propagation in vacuum." },
      { text: r`$\vec E$ and $\vec B$ parallel, both perpendicular to the propagation`, why: "$\\vec E$ and $\\vec B$ are perpendicular to each other." },
    ],
    solution: r`EM waves are transverse: $\vec E \perp \vec B$, both perpendicular to the direction of travel, which is along $\vec E\times\vec B$.`,
    concept: "Transverse nature of EM waves", formula: r`$\hat k \parallel \vec E\times\vec B$`, whyFormula: "Defines the propagation direction.", mistakes: "Thinking $\\vec E$ and $\\vec B$ are parallel.",
  },
  {
    topic: "electromagnetic-waves", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 100,
    statement: r`The peak electric field of an electromagnetic wave in vacuum is $30\ \text{V m}^{-1}$. Find the peak magnetic field in nanotesla ($c = 3\times10^8\ \text{m s}^{-1}$).`,
    solution: r`$B_0 = E_0/c = 30/(3\times10^8) = 10^{-7}\ \text{T} = 100\ \text{nT}$.`,
    concept: "Relation between field amplitudes", formula: r`$E_0 = cB_0$`, whyFormula: "Holds for plane EM waves in vacuum.", mistakes: "Multiplying by $c$ instead of dividing.",
  },
  {
    topic: "electromagnetic-waves", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which of these has the longest wavelength?",
    options: [
      { text: "microwaves", correct: true, why: "Microwaves (mm to cm) are longer than infrared (µm)." },
      { text: "infrared", why: "Longer than visible light but shorter than microwaves." },
      { text: "ultraviolet", why: "Shorter than visible light." },
      { text: "X-rays", why: "Among the shortest wavelengths." },
    ],
    solution: "In order of decreasing wavelength: radio > microwave > infrared > visible > ultraviolet > X-rays > gamma rays.",
    concept: "Electromagnetic spectrum", formula: r`$c = \nu\lambda$`, whyFormula: "Longer wavelength means lower frequency.", mistakes: "Reversing the order of microwaves and infrared.",
  },
  {
    topic: "electromagnetic-waves", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 88.5, tolerance: 0.5,
    statement: r`The electric field between the plates of a parallel-plate capacitor (plate area $0.01\ \text{m}^2$) is changing at $10^{12}\ \text{V m}^{-1}\text{s}^{-1}$. Find the displacement current between the plates in mA ($\varepsilon_0 = 8.85\times10^{-12}\ \text{F m}^{-1}$).`,
    solution: r`$I_d = \varepsilon_0\dfrac{d\Phi_E}{dt} = \varepsilon_0A\dfrac{dE}{dt} = 8.85\times10^{-12}\times0.01\times10^{12} = 0.0885\ \text{A} = 88.5\ \text{mA}$. It equals the conduction current charging the plates.`,
    concept: "Displacement current", formula: r`$I_d = \varepsilon_0\dfrac{d\Phi_E}{dt}$`, whyFormula: "Maxwell's correction that keeps Ampère's law consistent across a capacitor gap.", mistakes: "Leaving out the area (using $E$ instead of the flux).",
  },
  {
    topic: "electromagnetic-waves", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: 478, tolerance: 2,
    statement: r`A plane electromagnetic wave in vacuum has electric-field amplitude $600\ \text{V m}^{-1}$. Find its intensity (time-averaged power per unit area) in W m⁻² ($\varepsilon_0 = 8.85\times10^{-12}\ \text{F m}^{-1}$, $c = 3\times10^8\ \text{m s}^{-1}$).`,
    solution: r`The time-averaged electric energy density is $\tfrac14\varepsilon_0E_0^2$, and the magnetic energy density $\dfrac{B_0^2}{4\mu_0}$ is exactly equal to it (because $B_0 = E_0/c$ and $c^2 = 1/\mu_0\varepsilon_0$). So the total average energy density is $\bar u = \tfrac12\varepsilon_0E_0^2$.

Intensity $= \bar u\,c = \tfrac12\varepsilon_0E_0^2c = \tfrac12\times8.85\times10^{-12}\times3.6\times10^5\times3\times10^8 \approx 478\ \text{W m}^{-2}$.`,
    concept: "Energy carried by EM waves; equal sharing between E and B", formula: r`$I = \tfrac12\varepsilon_0E_0^2c$`, whyFormula: "Energy density times the speed at which the energy moves.", mistakes: "Counting only the electric energy (half the answer) or forgetting the time-average factor ½.",
  },

  // ── Optics · Wave optics ──
  {
    topic: "wave-optics", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In Young's double-slit experiment, if the slit separation is doubled (everything else unchanged), the fringe width:",
    options: [
      { text: "becomes half", correct: true, why: r`$\beta = \lambda D/d$.` },
      { text: "doubles", why: "Fringe width is inversely proportional to $d$." },
      { text: "stays the same", why: "It depends on $d$." },
      { text: "becomes one quarter", why: "The dependence is $1/d$, not $1/d^2$." },
    ],
    solution: r`$\beta = \dfrac{\lambda D}{d}$, so doubling $d$ halves $\beta$.`,
    concept: "Fringe width", formula: r`$\beta = \lambda D/d$`, whyFormula: "Small-angle YDSE result.", mistakes: "Thinking wider slit separation gives wider fringes.",
  },
  {
    topic: "wave-optics", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 1.2,
    statement: r`In Young's experiment, $\lambda = 600\ \text{nm}$, the slit separation is $0.5\ \text{mm}$ and the screen is $1\ \text{m}$ away. Find the fringe width in mm.`,
    solution: r`$\beta = \dfrac{\lambda D}{d} = \dfrac{600\times10^{-9}\times1}{0.5\times10^{-3}} = 1.2\times10^{-3}\ \text{m} = 1.2\ \text{mm}$.`,
    concept: "Fringe width", formula: r`$\beta = \lambda D/d$`, whyFormula: "Direct substitution.", mistakes: "Unit conversions (nm, mm).",
  },
  {
    topic: "wave-optics", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`Light is reflected from a glass surface of refractive index $\sqrt3$. The reflected light is completely plane-polarised when the angle of incidence is:`,
    options: [
      { text: r`$60^\circ$`, correct: true, why: r`Brewster: $\tan\theta_B = n = \sqrt3$.` },
      { text: r`$30^\circ$`, why: "That is the angle of refraction at Brewster incidence." },
      { text: r`$45^\circ$`, why: "Would need $n = 1$." },
      { text: r`$90^\circ$`, why: "Grazing incidence." },
    ],
    solution: r`Brewster's law: $\tan\theta_B = n$. With $n = \sqrt3$, $\theta_B = 60^\circ$. At this angle the reflected and refracted rays are perpendicular.`,
    concept: "Brewster's law", formula: r`$\tan\theta_B = n$`, whyFormula: "Condition for zero reflection of the in-plane polarisation.", mistakes: "Using $\\sin\\theta_B = 1/n$ (critical angle).",
  },
  {
    topic: "wave-optics", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 10,
    statement: r`Light of wavelength $500\ \text{nm}$ falls normally on a single slit of width $0.2\ \text{mm}$. Find the width (in mm) of the central maximum on a screen $2\ \text{m}$ away.`,
    solution: r`The first minima are at $\sin\theta = \lambda/a$. Width $= 2\dfrac{\lambda D}{a} = \dfrac{2\times5\times10^{-7}\times2}{2\times10^{-4}} = 0.01\ \text{m} = 10\ \text{mm}$.`,
    concept: "Single-slit diffraction", formula: r`$\text{width} = 2\lambda D/a$`, whyFormula: "The central maximum spans between the first minima on both sides.", mistakes: "Forgetting the factor 2.",
  },
  {
    topic: "wave-optics", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 6,
    statement: r`In Young's experiment with light of wavelength $600\ \text{nm}$, one slit is covered by a thin glass sheet of refractive index $1.5$. The central bright fringe shifts by exactly five fringe widths. Find the thickness of the sheet in micrometres.`,
    solution: r`The sheet adds an optical path $(n - 1)t$ for one beam. The zero-path-difference point moves until the geometric path difference compensates: shift $= \dfrac{(n - 1)tD}{d}$.

Setting this equal to $5\beta = 5\dfrac{\lambda D}{d}$: $(n - 1)t = 5\lambda \Rightarrow t = \dfrac{5\times600\ \text{nm}}{0.5} = 6000\ \text{nm} = 6\ \mu\text{m}$.`,
    concept: "Optical path difference and fringe shift", formula: r`$\Delta = (n - 1)t$`, whyFormula: "A slab of thickness $t$ adds $nt$ of optical path instead of $t$.", mistakes: "Using $nt$ instead of $(n - 1)t$; thinking the fringe width changes (it does not).",
  },

  // ── Dual Nature · Photoelectric effect ──
  {
    topic: "photoelectric-effect", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "For a given metal, the stopping potential in the photoelectric effect depends on:",
    options: [
      { text: "the frequency of the incident light", correct: true, why: r`$eV_0 = h\nu - \phi$.` },
      { text: "the intensity of the incident light", why: "Intensity changes the number of electrons (current), not their maximum energy." },
      { text: "both frequency and intensity", why: "Intensity does not appear in Einstein's equation." },
      { text: "neither", why: "It increases with frequency." },
    ],
    solution: r`Einstein's equation $eV_0 = h\nu - \phi$: the maximum kinetic energy, hence the stopping potential, depends on frequency only. Intensity sets the photocurrent.`,
    concept: "Einstein's photoelectric equation", formula: r`$eV_0 = h\nu - \phi$`, whyFormula: "One photon is absorbed by one electron.", mistakes: "Expecting brighter light to give faster electrons.",
  },
  {
    topic: "photoelectric-effect", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 3,
    statement: r`Photons of energy $5\ \text{eV}$ fall on a metal of work function $2\ \text{eV}$. Find the stopping potential in volts.`,
    solution: r`$K_{\max} = 5 - 2 = 3\ \text{eV}$, so $V_0 = 3\ \text{V}$.`,
    concept: "Stopping potential", formula: r`$eV_0 = h\nu - \phi$`, whyFormula: "Energies in eV give the potential in volts directly.", mistakes: "Adding the work function.",
  },
  {
    topic: "photoelectric-effect", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The work function of a metal is $2.48\ \text{eV}$. Its threshold wavelength is ($hc = 1240\ \text{eV nm}$):`,
    options: [
      { text: r`$500\ \text{nm}$`, correct: true, why: r`$\lambda_0 = hc/\phi = 1240/2.48$.` },
      { text: r`$250\ \text{nm}$`, why: "Arithmetic slip by a factor of 2." },
      { text: r`$310\ \text{nm}$`, why: "Uses 4 eV." },
      { text: r`$620\ \text{nm}$`, why: "Uses 2 eV." },
    ],
    solution: r`$\lambda_0 = \dfrac{hc}{\phi} = \dfrac{1240\ \text{eV nm}}{2.48\ \text{eV}} = 500\ \text{nm}$. Longer wavelengths cannot eject electrons.`,
    concept: "Threshold wavelength", formula: r`$\lambda_0 = hc/\phi$`, whyFormula: "At threshold, the photon energy equals the work function.", mistakes: "Thinking shorter wavelengths fail.",
  },
  {
    topic: "photoelectric-effect", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 2,
    statement: r`Light of wavelength $248\ \text{nm}$ gives a stopping potential of $3\ \text{V}$ for a certain metal. Find the stopping potential (in V) for light of wavelength $310\ \text{nm}$ on the same metal ($hc = 1240\ \text{eV nm}$).`,
    solution: r`$E_1 = 1240/248 = 5\ \text{eV} \Rightarrow \phi = 5 - 3 = 2\ \text{eV}$. $E_2 = 1240/310 = 4\ \text{eV} \Rightarrow V_0 = 4 - 2 = 2\ \text{V}$.`,
    concept: "Finding the work function from one measurement", formula: r`$eV_0 = \dfrac{hc}{\lambda} - \phi$`, whyFormula: "The work function is a property of the metal and stays the same.", mistakes: "Scaling the stopping potential with wavelength ratio.",
  },
  {
    topic: "photoelectric-effect", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 4.77, tolerance: 0.05,
    statement: r`Photons of energy $4\ \text{eV}$ fall on a metal of work function $2\ \text{eV}$. The fastest photoelectrons enter a uniform magnetic field of $10^{-4}\ \text{T}$ perpendicular to their velocity. Find the radius of their path in cm ($m_e = 9.1\times10^{-31}\ \text{kg}$, $e = 1.6\times10^{-19}\ \text{C}$).`,
    solution: r`$K_{\max} = 4 - 2 = 2\ \text{eV} = 3.2\times10^{-19}\ \text{J}$. Momentum $p = \sqrt{2mK} = \sqrt{2\times9.1\times10^{-31}\times3.2\times10^{-19}} \approx 7.63\times10^{-25}\ \text{kg m s}^{-1}$.

$r = \dfrac{p}{eB} = \dfrac{7.63\times10^{-25}}{1.6\times10^{-19}\times10^{-4}} \approx 0.0477\ \text{m} = 4.77\ \text{cm}$.`,
    concept: "Photoelectric effect combined with motion in a magnetic field", formula: r`$r = \dfrac{\sqrt{2mK}}{eB}$`, whyFormula: "Momentum from kinetic energy (non-relativistic), then $r = p/(qB)$.", mistakes: "Using the photon energy instead of the electron's kinetic energy; forgetting eV → J.",
  },

  // ── Atoms and Nuclei · Nuclei ──
  {
    topic: "nuclei", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The binding energy per nucleon is largest for nuclei with mass number around:",
    options: [
      { text: "56", correct: true, why: "Iron-56 region; this is why fission of heavy and fusion of light nuclei both release energy." },
      { text: "4", why: "Helium-4 is unusually stable for a light nucleus but below the peak." },
      { text: "238", why: "Heavy nuclei have lower binding energy per nucleon (about 7.6 MeV)." },
      { text: "1", why: "A single proton has no binding energy." },
    ],
    solution: "The binding-energy-per-nucleon curve peaks near $A \\approx 56$ at about 8.8 MeV. Moving towards the peak — fusion of light nuclei or fission of heavy nuclei — releases energy.",
    concept: "Binding energy curve", formula: r`$\dfrac{B}{A}$ vs $A$`, whyFormula: "The curve's shape explains fission and fusion.", mistakes: "Thinking the heaviest nuclei are the most tightly bound.",
  },
  {
    topic: "nuclei", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 18.63, tolerance: 0.05,
    statement: r`A nucleus has a mass defect of $0.02\ \text{u}$. Find its binding energy in MeV ($1\ \text{u} = 931.5\ \text{MeV}/c^2$).`,
    solution: r`$B = \Delta m\,c^2 = 0.02\times931.5 = 18.63\ \text{MeV}$.`,
    concept: "Mass–energy equivalence", formula: r`$B = \Delta m\,c^2$`, whyFormula: "The mass defect is the energy that binds the nucleus.", mistakes: "Using 931 vs 931.5 and rounding too early.",
  },
  {
    topic: "nuclei", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "The ratio of the radius of a nucleus with mass number 216 to that of a nucleus with mass number 27 is:",
    options: [
      { text: "2", correct: true, why: r`$R \propto A^{1/3}$ and $(216/27)^{1/3} = 8^{1/3}$.` },
      { text: "8", why: "That is the ratio of volumes (and of mass numbers)." },
      { text: "4", why: "Would need $R \\propto A^{2/3}$." },
      { text: r`$2\sqrt2$`, why: "Would need $R \\propto A^{1/2}$." },
    ],
    solution: r`$R = R_0A^{1/3}$, so $\dfrac{R_1}{R_2} = \left(\dfrac{216}{27}\right)^{1/3} = 2$. Nuclear density is therefore nearly the same for all nuclei.`,
    concept: "Size of the nucleus", formula: r`$R = R_0A^{1/3}$`, whyFormula: "Volume is proportional to the number of nucleons.", mistakes: "Using the mass ratio directly.",
  },
  {
    topic: "nuclei", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 150, answer: 2.22, tolerance: 0.02,
    statement: r`Using $m_p = 1.007276\ \text{u}$, $m_n = 1.008665\ \text{u}$ and the mass of the deuteron nucleus $2.013553\ \text{u}$, find the binding energy of the deuteron in MeV ($1\ \text{u} = 931.5\ \text{MeV}/c^2$).`,
    solution: r`$\Delta m = 1.007276 + 1.008665 - 2.013553 = 0.002388\ \text{u}$. $B = 0.002388\times931.5 \approx 2.22\ \text{MeV}$.`,
    concept: "Binding energy from nuclear masses", formula: r`$\Delta m = Zm_p + Nm_n - M_{\text{nucleus}}$`, whyFormula: "Nuclear (not atomic) masses are given, so no electron masses enter.", mistakes: "Mixing atomic and nuclear masses.",
  },
  {
    topic: "nuclei", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: 216,
    statement: r`A nucleus of mass number 240 with binding energy per nucleon $7.6\ \text{MeV}$ splits into two equal fragments, each with binding energy per nucleon $8.5\ \text{MeV}$. Find the energy released (in MeV).`,
    solution: r`Energy released = (total binding energy after) − (total binding energy before):

$Q = 2\times120\times8.5 - 240\times7.6 = 2040 - 1824 = 216\ \text{MeV}$.

The products are more tightly bound, so mass is converted to energy.`,
    concept: "Energy released in fission from binding energies", formula: r`$Q = \sum B_{\text{products}} - \sum B_{\text{reactants}}$`, whyFormula: "Binding energy is the energy needed to separate the nucleons; an increase means energy is released.", mistakes: "Subtracting in the wrong order; using per-nucleon values without multiplying by the nucleon numbers.",
  },

  // ── Electronic Devices · Semiconductors and diodes ──
  {
    topic: "semiconductors-and-diodes", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "When a p–n junction is forward biased, its depletion region:",
    options: [
      { text: "becomes narrower", correct: true, why: "The applied voltage opposes the built-in potential." },
      { text: "becomes wider", why: "That happens in reverse bias." },
      { text: "stays the same", why: "The barrier height changes with bias." },
      { text: "disappears completely at any voltage", why: "It narrows; it does not vanish at small voltages." },
    ],
    solution: "In forward bias the external field opposes the junction field, lowering the barrier and narrowing the depletion region, so majority carriers diffuse across easily.",
    concept: "Biasing a p–n junction", formula: "Barrier height $= V_0 - V$ (forward)", whyFormula: "The applied voltage subtracts from the built-in potential.", mistakes: "Swapping the effects of forward and reverse bias.",
  },
  {
    topic: "semiconductors-and-diodes", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 50,
    statement: r`A Zener regulator has input $15\ \text{V}$, series resistor $50\ \Omega$, Zener voltage $10\ \text{V}$ and load $200\ \Omega$. Find the Zener current in mA.`,
    solution: r`Series current $= (15 - 10)/50 = 100\ \text{mA}$. Load current $= 10/200 = 50\ \text{mA}$. Zener current $= 100 - 50 = 50\ \text{mA}$.`,
    concept: "Zener diode as a voltage regulator", formula: r`$I_Z = I_S - I_L$`, whyFormula: "The series current splits between Zener and load.", mistakes: "Using 15 V across the load.",
  },
  {
    topic: "semiconductors-and-diodes", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The input to a full-wave rectifier is a $50\ \text{Hz}$ AC voltage. The fundamental frequency of the output ripple is:`,
    options: [
      { text: r`$100\ \text{Hz}$`, correct: true, why: "Both half-cycles give an output pulse." },
      { text: r`$50\ \text{Hz}$`, why: "That is a half-wave rectifier." },
      { text: r`$25\ \text{Hz}$`, why: "Frequency is not reduced." },
      { text: r`$0\ \text{Hz}$`, why: "The output is pulsating DC, not pure DC." },
    ],
    solution: "A full-wave rectifier passes both half-cycles, producing two pulses per input cycle: ripple frequency $2\\times50 = 100$ Hz.",
    concept: "Rectifier output", formula: r`$f_{\text{out}} = 2f_{\text{in}}$ (full wave)`, whyFormula: "One pulse per half-cycle.", mistakes: "Confusing half-wave and full-wave.",
  },
  {
    topic: "semiconductors-and-diodes", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 5,
    statement: r`A silicon diode (forward drop $0.7\ \text{V}$) is connected in forward bias in series with a $1\ \text{k}\Omega$ resistor across a $5.7\ \text{V}$ battery. Find the current in mA.`,
    solution: r`$I = \dfrac{5.7 - 0.7}{1000} = 5\ \text{mA}$.`,
    concept: "Diode with a constant-voltage-drop model", formula: r`$I = \dfrac{V - V_D}{R}$`, whyFormula: "A conducting silicon diode drops about 0.7 V.", mistakes: "Ignoring the diode drop.",
  },
  {
    topic: "semiconductors-and-diodes", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 100,
    statement: r`A Zener regulator has input $15\ \text{V}$, series resistance $50\ \Omega$ and Zener voltage $10\ \text{V}$. The Zener current must stay between $0$ and $80\ \text{mA}$ for regulation. Find the minimum load resistance (in Ω) for which the output stays at $10\ \text{V}$.`,
    solution: r`While the Zener conducts, the output is $10\ \text{V}$ and the series current is fixed: $I_S = (15 - 10)/50 = 100\ \text{mA}$.

- Smallest load resistance ⇒ largest load current. The Zener current cannot go below 0, so $I_L \le 100\ \text{mA} \Rightarrow R_L \ge 10/0.1 = 100\ \Omega$.
- (The 80 mA limit gives the other end: $I_L \ge 20\ \text{mA} \Rightarrow R_L \le 500\ \Omega$.)

Minimum load resistance: $100\ \Omega$.`,
    concept: "Operating range of a Zener regulator", formula: r`$I_S = I_Z + I_L$ with $I_S$ fixed`, whyFormula: "The series current is set by the input and Zener voltages, not by the load.", mistakes: "Using the 80 mA limit for the minimum load (it limits the maximum load resistance).",
  },

  // ── Experimental Skills · Measuring instruments ──
  {
    topic: "measuring-instruments", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The least count of vernier callipers equals:",
    options: [
      { text: "1 main-scale division − 1 vernier-scale division", correct: true, why: "This is the smallest difference the vernier can resolve." },
      { text: "1 main-scale division + 1 vernier-scale division", why: "The difference, not the sum, sets the resolution." },
      { text: "1 main-scale division", why: "That is the resolution without the vernier." },
      { text: "the number of vernier divisions", why: "That is a count, not a length." },
    ],
    solution: "Least count = 1 MSD − 1 VSD. If $n$ VSD = $(n - 1)$ MSD, this is $\\dfrac{1\\ \\text{MSD}}{n}$.",
    concept: "Least count of a vernier", formula: r`$\text{LC} = 1\ \text{MSD} - 1\ \text{VSD}$`, whyFormula: "Definition.", mistakes: "Confusing with the screw gauge formula (pitch / number of divisions).",
  },
  {
    topic: "measuring-instruments", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 3.27,
    statement: r`A screw gauge has pitch $0.5\ \text{mm}$ and 50 circular divisions, with no zero error. The main-scale reading is $3\ \text{mm}$ and the 27th circular division coincides with the reference line. Find the reading in mm.`,
    solution: r`Least count $= 0.5/50 = 0.01\ \text{mm}$. Reading $= 3 + 27\times0.01 = 3.27\ \text{mm}$.`,
    concept: "Screw gauge reading", formula: r`$\text{reading} = \text{MSR} + n\times\text{LC}$`, whyFormula: "Standard reading formula.", mistakes: "Using the pitch instead of the least count.",
  },
  {
    topic: "measuring-instruments", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`Vernier callipers have a positive zero error of $0.03\ \text{cm}$. A measured (observed) reading is $2.47\ \text{cm}$. The corrected reading is:`,
    options: [
      { text: r`$2.44\ \text{cm}$`, correct: true, why: "Corrected = observed − zero error = 2.47 − 0.03." },
      { text: r`$2.50\ \text{cm}$`, why: "Adds a positive zero error." },
      { text: r`$2.47\ \text{cm}$`, why: "Ignores the zero error." },
      { text: r`$2.41\ \text{cm}$`, why: "Subtracts twice." },
    ],
    solution: "With a positive zero error the instrument reads too high, so the correction is negative: corrected = 2.47 − 0.03 = 2.44 cm.",
    concept: "Zero error correction", formula: "Corrected = observed − zero error (with sign)", whyFormula: "The instrument's offset is added to every reading.", mistakes: "Getting the sign of the correction wrong.",
  },
  {
    topic: "measuring-instruments", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 23.8,
    statement: r`Vernier callipers have 10 vernier divisions equal to 9 main-scale divisions of $1\ \text{mm}$ each. The instrument has a negative zero error of $0.2\ \text{mm}$. With an object between the jaws, the main-scale reading is $23\ \text{mm}$ and the 6th vernier division coincides. Find the corrected length in mm.`,
    solution: r`LC $= 1 - 0.9 = 0.1\ \text{mm}$. Observed $= 23 + 6\times0.1 = 23.6\ \text{mm}$. Corrected $= 23.6 - (-0.2) = 23.8\ \text{mm}$.`,
    concept: "Reading with a negative zero error", formula: "Corrected = observed − (zero error)", whyFormula: "A negative zero error means the instrument reads too low.", mistakes: "Subtracting 0.2 instead of adding.",
  },
  {
    topic: "measuring-instruments", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 180, answer: 4.2, tolerance: 0.05,
    statement: r`To find the resistivity $\rho = \dfrac{\pi d^2R}{4L}$ of a wire, its diameter $d = 0.50\ \text{mm}$ is measured with a screw gauge of least count $0.01\ \text{mm}$ and its length $L = 50.0\ \text{cm}$ with a scale of least count $0.1\ \text{cm}$. Treating $R$ as exact and each least count as the maximum error, find the maximum percentage error in $\rho$.`,
    solution: r`Relative errors add with their powers: $\dfrac{\Delta\rho}{\rho} = 2\dfrac{\Delta d}{d} + \dfrac{\Delta L}{L} = 2\times\dfrac{0.01}{0.50} + \dfrac{0.1}{50.0} = 0.04 + 0.002 = 0.042$, i.e. $4.2\%$.

The diameter dominates because it is small and enters squared — which is why it is measured with a screw gauge.`,
    concept: "Least counts and propagation of errors", formula: r`$\dfrac{\Delta Q}{Q} = \sum |n_i|\dfrac{\Delta x_i}{x_i}$ for $Q = \prod x_i^{n_i}$`, whyFormula: "Maximum error of a product of powers.", mistakes: "Forgetting the factor 2 on the diameter; subtracting the length error.",
  },
];
