import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// Levels 1–4: JEE Main formats; Level 5: JEE Advanced formats. k = 1/(4πε₀) = 9×10⁹ N m² C⁻², μ₀ = 4π×10⁻⁷ T m A⁻¹.

export const PHYSICS_QUESTIONS_6: QuestionSeed[] = [
  // ── Second law and heat engines ──
  {
    topic: "second-law-and-heat-engines", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The Kelvin–Planck statement of the second law says it is impossible to:",
    options: [
      { text: "build a cyclic engine that converts all the heat it absorbs into work", correct: true, why: "Some heat must always be rejected to a colder reservoir." },
      { text: "convert work completely into heat", why: "Friction does this easily." },
      { text: "transfer heat from a hot body to a cold body", why: "That happens spontaneously." },
      { text: "build any heat engine", why: "Heat engines exist; they cannot be 100% efficient." },
    ],
    solution: "No cyclic device can take heat from a single reservoir and convert it entirely into work. Work → heat (e.g. friction) is always possible; the reverse in a cycle is not.",
    concept: "Second law of thermodynamics", formula: r`$\eta = \dfrac{W}{Q_1} < 1$`, whyFormula: "Some heat $Q_2$ is always rejected.", mistakes: "Reversing the direction of the impossibility.",
  },
  {
    topic: "second-law-and-heat-engines", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 40,
    statement: r`An engine absorbs $1000\ \text{J}$ of heat per cycle and rejects $600\ \text{J}$. Find its efficiency in percent.`,
    solution: r`$W = 1000 - 600 = 400\ \text{J}$; $\eta = 400/1000 = 40\%$.`,
    concept: "Efficiency of a heat engine", formula: r`$\eta = 1 - \dfrac{Q_2}{Q_1}$`, whyFormula: "Energy conservation over a cycle.", mistakes: "Using $Q_2/Q_1$.",
  },
  {
    topic: "second-law-and-heat-engines", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which of these processes is irreversible?",
    options: [
      { text: "free expansion of a gas into a vacuum", correct: true, why: "It cannot be undone without external work; the gas never spontaneously returns." },
      { text: "very slow (quasi-static) isothermal expansion of an ideal gas against a piston", why: "Can be reversed by an infinitesimal change in pressure." },
      { text: "very slow adiabatic compression without friction", why: "Quasi-static and frictionless: reversible." },
      { text: "melting of ice at exactly 0 °C by heat from a body at 0 °C (in the limit)", why: "Heat transfer across zero temperature difference is reversible in the limit." },
    ],
    solution: "A process is reversible only if it is quasi-static and free of dissipation (friction, heat flow across a finite temperature difference, free expansion). Free expansion happens suddenly with no restoring path — irreversible.",
    concept: "Reversible and irreversible processes", formula: "Quasi-static + no dissipation ⇒ reversible", whyFormula: "Criteria from the second law.", mistakes: "Thinking any expansion is irreversible.",
  },
  {
    topic: "second-law-and-heat-engines", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 3,
    statement: r`A refrigerator removes $300\ \text{J}$ of heat from its cold compartment using $100\ \text{J}$ of work. Find its coefficient of performance.`,
    solution: r`$\beta = \dfrac{Q_2}{W} = \dfrac{300}{100} = 3$. (It rejects $400\ \text{J}$ to the room.)`,
    concept: "Refrigerator performance", formula: r`$\beta = Q_2/W$`, whyFormula: "Heat removed per unit work.", mistakes: "Using $Q_1/W$ (that is a heat pump's COP).",
  },
  {
    topic: "second-law-and-heat-engines", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`A reversible (Carnot) engine works between reservoirs at $500\ \text{K}$ and $300\ \text{K}$. Which statements are correct? (The Carnot engine is beyond the JEE Main 2027 text; this is JEE Advanced-style practice.)`,
    options: [
      { text: "Its efficiency is 40%", correct: true, why: r`$1 - 300/500$.` },
      { text: r`For every $1000\ \text{J}$ absorbed it rejects $600\ \text{J}$`, correct: true, why: r`$Q_2/Q_1 = T_2/T_1$.` },
      { text: "A real engine between the same reservoirs could reach 45% efficiency", why: "No engine between two reservoirs beats the reversible one (Carnot's theorem)." },
      { text: "The total entropy of the engine and reservoirs is unchanged after each cycle", correct: true, why: r`Reversible: $-Q_1/T_1 + Q_2/T_2 = -2 + 2 = 0$ (in J/K for 1000 J).` },
    ],
    solution: r`$\eta = 1 - \dfrac{T_2}{T_1} = 0.4$. $\dfrac{Q_2}{Q_1} = \dfrac{T_2}{T_1} \Rightarrow Q_2 = 600\ \text{J}$. Entropy: hot reservoir loses $1000/500 = 2\ \text{J K}^{-1}$, cold gains $600/300 = 2\ \text{J K}^{-1}$: no net change for a reversible cycle. Carnot's theorem: no engine between the same reservoirs exceeds this efficiency.`,
    concept: "Carnot efficiency, Carnot's theorem and entropy", formula: r`$\eta = 1 - T_2/T_1$`, whyFormula: "Reversible engine between two reservoirs.", mistakes: "Using Celsius temperatures.",
  },

  // ── Degrees of freedom ──
  {
    topic: "degrees-of-freedom", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "At room temperature, a rigid diatomic molecule has how many degrees of freedom?",
    options: [
      { text: "5", correct: true, why: "3 translational + 2 rotational." },
      { text: "3", why: "That is a monatomic gas." },
      { text: "6", why: "That is a non-linear polyatomic molecule." },
      { text: "7", why: "That includes vibration, usually frozen at room temperature." },
    ],
    solution: "A diatomic molecule translates in 3 directions and rotates about the 2 axes perpendicular to the bond (rotation about the bond axis contributes negligibly). Vibration is not excited at room temperature: f = 5.",
    concept: "Degrees of freedom", formula: r`$f = 3 + 2$`, whyFormula: "Count independent energy terms.", mistakes: "Counting vibrations at room temperature.",
  },
  {
    topic: "degrees-of-freedom", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1.5,
    statement: r`Find the molar heat capacity at constant volume of a monatomic ideal gas, in units of $R$.`,
    solution: r`$C_V = \dfrac f2R = \dfrac32R$; the answer is $1.5$.`,
    concept: "Equipartition and heat capacity", formula: r`$C_V = \dfrac f2R$`, whyFormula: r`Each degree of freedom contributes $\tfrac12R$ per mole.`, mistakes: "Using $C_P$.",
  },
  {
    topic: "degrees-of-freedom", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The ratio $\gamma = C_P/C_V$ for a rigid diatomic ideal gas is:`,
    options: [
      { text: r`$7/5$`, correct: true, why: r`$1 + 2/5$.` },
      { text: r`$5/3$`, why: "Monatomic." },
      { text: r`$4/3$`, why: "Non-linear polyatomic." },
      { text: r`$9/7$`, why: "Diatomic with vibration." },
    ],
    solution: r`$\gamma = 1 + \dfrac2f = 1 + \dfrac25 = \dfrac75$.`,
    concept: "Ratio of specific heats", formula: r`$\gamma = 1 + \dfrac2f$`, whyFormula: r`From $C_P = C_V + R$.`, mistakes: "Mixing up the gas types.",
  },
  {
    topic: "degrees-of-freedom", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 1.48, tolerance: 0.01,
    statement: r`A mixture contains 2 mol of helium and 3 mol of nitrogen (rigid diatomic). Find $\gamma$ of the mixture.`,
    solution: r`$C_V = \dfrac{2(\tfrac32R) + 3(\tfrac52R)}{5} = \dfrac{3 + 7.5}{5}R = 2.1R$; $C_P = 3.1R$; $\gamma = \dfrac{3.1}{2.1} \approx 1.48$.`,
    concept: "Heat capacities of a gas mixture", formula: r`$\gamma_{\text{mix}} = \dfrac{\sum n_iC_{Pi}}{\sum n_iC_{Vi}}$`, whyFormula: "Heat capacities add by moles; γ values do not.", mistakes: "Averaging the γ values directly.",
  },
  {
    topic: "degrees-of-freedom", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`An ideal gas has $\gamma = 4/3$. Which statements are correct?`,
    options: [
      { text: "Its molecules have 6 active degrees of freedom", correct: true, why: r`$\gamma = 1 + 2/f$.` },
      { text: r`Its $C_V$ is $3R$`, correct: true, why: r`$\tfrac f2R$ with f = 6.` },
      { text: "It could be a rigid non-linear polyatomic gas", correct: true, why: "3 translational + 3 rotational degrees of freedom." },
      { text: r`Its $C_P$ is $3R$`, why: r`$C_P = C_V + R = 4R$.` },
    ],
    solution: r`$\gamma = 1 + \dfrac2f = \dfrac43 \Rightarrow f = 6$. Then $C_V = 3R$, $C_P = 4R$. Six degrees of freedom match a rigid non-linear molecule (e.g. CH₄, NH₃ with vibrations frozen).`,
    concept: "Linking γ, f and heat capacities", formula: r`$\gamma = 1 + 2/f$`, whyFormula: "Equipartition theorem.", mistakes: "Forgetting $C_P = C_V + R$.",
  },

  // ── Wave motion ──
  {
    topic: "wave-motion", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Sound waves in air are:",
    options: [
      { text: "longitudinal", correct: true, why: "Air particles oscillate along the direction of travel." },
      { text: "transverse", why: "Gases cannot support the shear needed for transverse waves." },
      { text: "electromagnetic", why: "Sound needs a material medium." },
      { text: "both longitudinal and transverse", why: "Not in a gas." },
    ],
    solution: "Sound in a gas is a train of compressions and rarefactions: particles oscillate along the propagation direction.",
    concept: "Types of waves", formula: r`$v = \sqrt{\gamma P/\rho}$`, whyFormula: "Speed set by the gas's compressibility.", mistakes: "Calling sound transverse.",
  },
  {
    topic: "wave-motion", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 340,
    statement: r`A sound wave of frequency $500\ \text{Hz}$ has wavelength $0.68\ \text{m}$. Find its speed in m s⁻¹.`,
    solution: r`$v = f\lambda = 500\times0.68 = 340\ \text{m s}^{-1}$.`,
    concept: "Wave equation", formula: r`$v = f\lambda$`, whyFormula: "One wavelength passes per period.", mistakes: "Dividing instead of multiplying.",
  },
  {
    topic: "wave-motion", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`A wave is described by $y = 0.02\sin(4\pi x - 200\pi t)$ (SI units). Its speed is:`,
    options: [
      { text: r`$50\ \text{m s}^{-1}$`, correct: true, why: r`$v = \omega/k = 200\pi/4\pi$.` },
      { text: r`$800\ \text{m s}^{-1}$`, why: "Multiplies ω and k." },
      { text: r`$100\ \text{m s}^{-1}$`, why: "That is the frequency in Hz." },
      { text: r`$0.02\ \text{m s}^{-1}$`, why: "That is the amplitude." },
    ],
    solution: r`Compare with $A\sin(kx - \omega t)$: $k = 4\pi$, $\omega = 200\pi$. $v = \omega/k = 50\ \text{m s}^{-1}$ along $+x$.`,
    concept: "Reading a wave equation", formula: r`$v = \omega/k$`, whyFormula: "Phase velocity.", mistakes: "Taking $\\omega k$.",
  },
  {
    topic: "wave-motion", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 100,
    statement: r`A string with linear mass density $0.01\ \text{kg m}^{-1}$ is under a tension of $100\ \text{N}$. Find the speed of transverse waves on it in m s⁻¹.`,
    solution: r`$v = \sqrt{T/\mu} = \sqrt{100/0.01} = 100\ \text{m s}^{-1}$.`,
    concept: "Wave speed on a string", formula: r`$v = \sqrt{T/\mu}$`, whyFormula: "Tension restores, inertia per length resists.", mistakes: "Using total mass instead of mass per length.",
  },
  {
    topic: "wave-motion", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`A wave on a string is $y = 0.05\sin(20\pi t - \pi x)$ (SI units). Which statements are correct?`,
    options: [
      { text: r`It travels in the $+x$ direction`, correct: true, why: r`$\sin(\omega t - kx)$ keeps its phase as $x$ increases with $t$.` },
      { text: r`Its wavelength is $2\ \text{m}$`, correct: true, why: r`$\lambda = 2\pi/k$.` },
      { text: r`The maximum speed of a particle of the string is $\pi\ \text{m s}^{-1}$`, correct: true, why: r`$A\omega = 0.05\times20\pi$.` },
      { text: r`The wave speed is $10\ \text{m s}^{-1}$`, why: r`$\omega/k = 20\ \text{m s}^{-1}$ (10 Hz is the frequency).` },
    ],
    solution: r`$\omega = 20\pi$ ($f = 10$ Hz), $k = \pi$ ($\lambda = 2$ m). Wave speed $\omega/k = 20\ \text{m s}^{-1}$ towards $+x$ (constant phase $20\pi t - \pi x$ needs $x$ to grow with $t$). Particle speed is a different thing: maximum $A\omega = \pi\ \text{m s}^{-1}$.`,
    concept: "Wave speed vs particle speed", formula: r`$v_{\text{wave}} = \omega/k$, $v_{\text{particle, max}} = A\omega$`, whyFormula: "Distinguishing two different velocities.", mistakes: "Confusing frequency with speed; equating particle speed and wave speed.",
  },

  // ── Superposition and standing waves ──
  {
    topic: "superposition-and-standing-waves", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In a standing wave, the distance between two adjacent nodes is:",
    options: [
      { text: r`$\lambda/2$`, correct: true, why: r`Nodes are where $\sin kx = 0$: spacing $\pi/k$.` },
      { text: r`$\lambda$`, why: "That is the spacing of alternate nodes." },
      { text: r`$\lambda/4$`, why: "That is node-to-adjacent-antinode." },
      { text: r`$2\lambda$`, why: "Too large." },
    ],
    solution: r`$y = 2A\sin kx\cos\omega t$: nodes where $kx = n\pi$, i.e. $x = n\lambda/2$. Adjacent nodes are $\lambda/2$ apart.`,
    concept: "Nodes and antinodes", formula: r`$y = 2A\sin kx\cos\omega t$`, whyFormula: "Superposition of two opposite travelling waves.", mistakes: "Using λ.",
  },
  {
    topic: "superposition-and-standing-waves", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 4,
    statement: r`Two tuning forks of $256\ \text{Hz}$ and $260\ \text{Hz}$ are sounded together. How many beats are heard per second?`,
    solution: r`Beat frequency $= |260 - 256| = 4\ \text{Hz}$.`,
    concept: "Beats", formula: r`$f_{\text{beat}} = |f_1 - f_2|$`, whyFormula: "Envelope of two close frequencies.", mistakes: "Halving or averaging.",
  },
  {
    topic: "superposition-and-standing-waves", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A pipe closed at one end can produce:",
    options: [
      { text: "only odd harmonics", correct: true, why: r`$f_n = \dfrac{(2n - 1)v}{4L}$.` },
      { text: "only even harmonics", why: "The fundamental (1st harmonic) is present." },
      { text: "all harmonics", why: "That is an open pipe." },
      { text: "no harmonics", why: "It resonates at odd multiples." },
    ],
    solution: "A closed end is a node and an open end an antinode, so the length holds an odd number of quarter-wavelengths: frequencies $v/4L, 3v/4L, 5v/4L, …$",
    concept: "Harmonics in pipes", formula: r`$f = \dfrac{(2n - 1)v}{4L}$`, whyFormula: "Boundary conditions.", mistakes: "Treating it like an open pipe.",
  },
  {
    topic: "superposition-and-standing-waves", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 100,
    statement: r`A string $1\ \text{m}$ long, fixed at both ends, carries waves at $200\ \text{m s}^{-1}$. Find its fundamental frequency in Hz.`,
    solution: r`$f_1 = \dfrac{v}{2L} = \dfrac{200}{2} = 100\ \text{Hz}$.`,
    concept: "Standing waves on a string", formula: r`$f_n = \dfrac{nv}{2L}$`, whyFormula: "Both ends are nodes.", mistakes: "Using $v/L$ or $v/4L$.",
  },
  {
    topic: "superposition-and-standing-waves", level: 5, difficulty: "HARD", type: "MATCH", time: 240,
    statement: r`For pipes of length $0.5\ \text{m}$ with sound speed $340\ \text{m s}^{-1}$ (ignore end corrections), match each mode in List-I with its frequency in List-II.`,
    match: {
      left: ["Open pipe, fundamental", "Closed pipe, fundamental", "Closed pipe, first overtone", "Open pipe, second harmonic"],
      right: [r`$170\ \text{Hz}$`, r`$340\ \text{Hz}$`, r`$510\ \text{Hz}$`, r`$680\ \text{Hz}$`, r`$1020\ \text{Hz}$`],
    },
    options: [
      { text: "P→2, Q→1, R→3, S→4", correct: true, why: "340, 170, 510, 680 Hz." },
      { text: "P→2, Q→1, R→2, S→4", why: "A closed pipe has no second harmonic; its first overtone is the 3rd harmonic." },
      { text: "P→1, Q→2, R→3, S→4", why: "Swaps open and closed fundamentals." },
      { text: "P→2, Q→1, R→3, S→5", why: "1020 Hz is the open pipe’s 3rd harmonic; its 2nd harmonic is 680 Hz." },
    ],
    solution: r`Open pipe: $f_n = \dfrac{nv}{2L} = 340n$ Hz → fundamental 340 Hz, second harmonic 680 Hz.
Closed pipe: $f = \dfrac{(2n - 1)v}{4L} = 170(2n - 1)$ Hz → fundamental 170 Hz, first overtone (3rd harmonic) 510 Hz.

P→2, Q→1, R→3, S→4.`,
    concept: "Open vs closed pipe harmonics", formula: r`Open $\dfrac{nv}{2L}$; closed $\dfrac{(2n - 1)v}{4L}$`, whyFormula: "Boundary conditions at the ends.", mistakes: "Calling the closed pipe's first overtone its second harmonic.",
  },

  // ── Electric field ──
  {
    topic: "electric-field", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Electric field lines never cross each other because:",
    options: [
      { text: "the field has a unique direction at each point", correct: true, why: "Crossing lines would give two directions at one point." },
      { text: "like charges repel", why: "Not the reason." },
      { text: "field lines are always straight", why: "They can be curved." },
      { text: "the field is zero where they would meet", why: "Field lines don't exist where E = 0 — that is not the reason they cannot cross." },
    ],
    solution: "The tangent to a field line gives the field direction. At any point the net field has one direction, so two lines cannot pass through the same point.",
    concept: "Properties of field lines", formula: "—", whyFormula: "Uniqueness of the field vector.", mistakes: "Giving a force argument.",
  },
  {
    topic: "electric-field", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 2000,
    statement: r`Find the electric field (in N C⁻¹) at $3\ \text{m}$ from a point charge of $2\ \mu\text{C}$.`,
    solution: r`$E = \dfrac{kq}{r^2} = \dfrac{9\times10^9\times2\times10^{-6}}{9} = 2000\ \text{N C}^{-1}$.`,
    concept: "Field of a point charge", formula: r`$E = kq/r^2$`, whyFormula: "Coulomb's law per unit test charge.", mistakes: "Forgetting to square r.",
  },
  {
    topic: "electric-field", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "At the same large distance from a short dipole, the field on the equatorial line compared with the field on the axis is:",
    options: [
      { text: "half as large, and directed opposite to the dipole moment", correct: true, why: r`$E_{\text{eq}} = kp/r^3$, $E_{\text{axis}} = 2kp/r^3$.` },
      { text: "twice as large", why: "The axial field is the larger one." },
      { text: "equal, in the same direction", why: "Magnitudes differ by a factor of 2." },
      { text: "zero", why: "The equatorial potential is zero, not the field." },
    ],
    solution: r`Axial: $E = \dfrac{2kp}{r^3}$ along $\vec p$. Equatorial: $E = \dfrac{kp}{r^3}$ opposite to $\vec p$.`,
    concept: "Field of an electric dipole", formula: r`$E_{\text{axis}} = \dfrac{2kp}{r^3}$, $E_{\text{eq}} = \dfrac{kp}{r^3}$`, whyFormula: "Short-dipole approximations.", mistakes: "Confusing zero potential with zero field.",
  },
  {
    topic: "electric-field", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 4,
    statement: r`A dipole of moment $2\times10^{-8}\ \text{C m}$ lies along a uniform field of $10^4\ \text{N C}^{-1}$. Find the work (in units of $10^{-4}\ \text{J}$) needed to turn it through $180^\circ$.`,
    solution: r`$W = pE(\cos\theta_1 - \cos\theta_2) = pE(1 - (-1)) = 2pE = 2\times2\times10^{-8}\times10^4 = 4\times10^{-4}\ \text{J}$.`,
    concept: "Work to rotate a dipole", formula: r`$W = pE(\cos\theta_1 - \cos\theta_2)$`, whyFormula: r`Change in $U = -pE\cos\theta$.`, mistakes: "Using $pE$ (that is the maximum torque).",
  },
  {
    topic: "electric-field", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`Equal charges $+q$ are fixed at $(-a, 0)$ and $(a, 0)$. Which statements are correct?`,
    options: [
      { text: "The electric field at the origin is zero", correct: true, why: "Equal and opposite contributions." },
      { text: "The electric potential at the origin is zero", why: r`$V = 2kq/a$ — potentials add as scalars.` },
      { text: r`On the positive $y$-axis the field points in the $+y$ direction`, correct: true, why: "x-components cancel; y-components add, pointing away from the charges." },
      { text: r`On the $y$-axis the field magnitude is largest at $y = a/\sqrt2$`, correct: true, why: r`$E = \dfrac{2kqy}{(a^2 + y^2)^{3/2}}$ peaks at $y = a/\sqrt2$.` },
    ],
    solution: r`On the $y$-axis: $E_y = \dfrac{2kqy}{(a^2 + y^2)^{3/2}}$ (directed away from the charges). $\dfrac{dE}{dy} = 0 \Rightarrow a^2 + y^2 = 3y^2 \Rightarrow y = a/\sqrt2$. At the origin the vectors cancel ($E = 0$) but the scalar potential is $2kq/a \ne 0$.`,
    concept: "Superposition of fields; field vs potential", formula: r`$E_y = \dfrac{2kqy}{(a^2 + y^2)^{3/2}}$`, whyFormula: "Symmetry cancels x-components.", mistakes: "Assuming zero field means zero potential.",
  },

  // ── Gauss's law ──
  {
    topic: "gausss-law", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The total electric flux through a closed surface depends on:",
    options: [
      { text: "only the charge enclosed by the surface", correct: true, why: r`$\Phi = q_{\text{enc}}/\varepsilon_0$.` },
      { text: "the shape and size of the surface", why: "Flux is independent of these." },
      { text: "charges outside the surface", why: "They contribute zero net flux." },
      { text: "the position of the charge inside the surface", why: "Any position inside gives the same total flux." },
    ],
    solution: r`Gauss's law: $\oint\vec E\cdot d\vec A = q_{\text{enc}}/\varepsilon_0$. Field lines from outside charges enter and leave, contributing nothing net.`,
    concept: "Gauss's law", formula: r`$\Phi = q_{\text{enc}}/\varepsilon_0$`, whyFormula: "Statement of the law.", mistakes: "Thinking a larger surface catches more flux.",
  },
  {
    topic: "gausss-law", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1000,
    statement: r`A closed surface encloses a charge of $8.85\ \text{nC}$. Find the total electric flux through it in N m² C⁻¹ ($\varepsilon_0 = 8.85\times10^{-12}\ \text{F m}^{-1}$).`,
    solution: r`$\Phi = \dfrac{q}{\varepsilon_0} = \dfrac{8.85\times10^{-9}}{8.85\times10^{-12}} = 1000\ \text{N m}^2\text{C}^{-1}$.`,
    concept: "Gauss's law", formula: r`$\Phi = q/\varepsilon_0$`, whyFormula: "Direct application.", mistakes: "Multiplying by ε₀.",
  },
  {
    topic: "gausss-law", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 30,
    statement: r`The field of an infinite plane sheet with surface charge density $\sigma$ is:`,
    options: [
      { text: r`$\dfrac{\sigma}{2\varepsilon_0}$, independent of distance`, correct: true, why: "Gauss's law with a pill-box through the sheet." },
      { text: r`$\dfrac{\sigma}{\varepsilon_0}$`, why: "That is near a conductor's surface (charge on one face only)." },
      { text: r`proportional to $1/r$`, why: "That is a line charge." },
      { text: r`proportional to $1/r^2$`, why: "That is a point charge." },
    ],
    solution: r`A cylinder piercing the sheet: flux $2EA = \sigma A/\varepsilon_0 \Rightarrow E = \sigma/2\varepsilon_0$, the same at every distance (field lines are parallel).`,
    concept: "Field of a plane sheet", formula: r`$E = \dfrac{\sigma}{2\varepsilon_0}$`, whyFormula: "Symmetry plus Gauss's law.", mistakes: "Confusing with the conductor result.",
  },
  {
    topic: "gausss-law", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 200, tolerance: 1,
    statement: r`Find the electric field (in N C⁻¹) at $0.18\ \text{m}$ from a long straight wire carrying a uniform charge of $2\ \text{nC m}^{-1}$.`,
    solution: r`$E = \dfrac{\lambda}{2\pi\varepsilon_0r} = \dfrac{2k\lambda}{r} = \dfrac{2\times9\times10^9\times2\times10^{-9}}{0.18} = 200\ \text{N C}^{-1}$.`,
    concept: "Field of a line charge", formula: r`$E = \dfrac{\lambda}{2\pi\varepsilon_0r}$`, whyFormula: "Cylindrical Gaussian surface.", mistakes: "Using $k\\lambda/r^2$.",
  },
  {
    topic: "gausss-law", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A solid non-conducting sphere of radius $R$ carries charge $Q$ uniformly through its volume. Which statements are correct?`,
    options: [
      { text: "Inside the sphere the field is proportional to the distance from the centre", correct: true, why: r`$E = \dfrac{kQr}{R^3}$.` },
      { text: "The field is greatest at the surface", correct: true, why: "It rises linearly inside and falls as 1/r² outside." },
      { text: r`The field at $r = R/2$ equals the field at $r = 2R$`, why: r`$\dfrac{kQ}{2R^2}$ vs $\dfrac{kQ}{4R^2}$.` },
      { text: r`The flux through a concentric sphere of radius $R/2$ is $\dfrac{Q}{8\varepsilon_0}$`, correct: true, why: "It encloses (1/2)³ of the charge." },
    ],
    solution: r`Inside: $q_{\text{enc}} = Q(r/R)^3$, so $E = \dfrac{kQr}{R^3}$ (linear). Outside: $E = kQ/r^2$. Maximum at $r = R$. $E(R/2) = \dfrac{kQ}{2R^2}$, $E(2R) = \dfrac{kQ}{4R^2}$ — not equal. Flux through radius $R/2$: $\dfrac{Q/8}{\varepsilon_0}$.`,
    concept: "Field of a uniformly charged sphere", formula: r`$E_{\text{in}} = \dfrac{kQr}{R^3}$, $E_{\text{out}} = \dfrac{kQ}{r^2}$`, whyFormula: "Gauss's law with enclosed charge.", mistakes: "Using the conducting-sphere result (zero inside).",
  },

  // ── Electric potential ──
  {
    topic: "electric-potential", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The work done in moving a charge along an equipotential surface is:",
    options: [
      { text: "zero", correct: true, why: r`$W = q\Delta V = 0$.` },
      { text: "positive", why: "No potential difference." },
      { text: "negative", why: "No potential difference." },
      { text: "infinite", why: "No." },
    ],
    solution: r`$W = q(V_B - V_A) = 0$ when $V_A = V_B$. The field is perpendicular to the surface, so it does no work along it.`,
    concept: "Equipotential surfaces", formula: r`$W = q\Delta V$`, whyFormula: "Potential difference is zero.", mistakes: "Thinking work depends on path length.",
  },
  {
    topic: "electric-potential", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 30,
    statement: r`Find the potential (in V) at $0.3\ \text{m}$ from a point charge of $1\ \text{nC}$.`,
    solution: r`$V = \dfrac{kq}{r} = \dfrac{9\times10^9\times10^{-9}}{0.3} = 30\ \text{V}$.`,
    concept: "Potential of a point charge", formula: r`$V = kq/r$`, whyFormula: "Direct formula.", mistakes: "Using $r^2$.",
  },
  {
    topic: "electric-potential", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`In a region the potential is $V = 5x^2$ volts ($x$ in metres). The electric field at $x = 1\ \text{m}$ is:`,
    options: [
      { text: r`$10\ \text{V m}^{-1}$ in the $-x$ direction`, correct: true, why: r`$E = -dV/dx = -10x$.` },
      { text: r`$10\ \text{V m}^{-1}$ in the $+x$ direction`, why: "Missing the minus sign." },
      { text: r`$5\ \text{V m}^{-1}$`, why: "That is V itself at x = 1." },
      { text: "zero", why: "dV/dx is not zero at x = 1." },
    ],
    solution: r`$E_x = -\dfrac{dV}{dx} = -10x = -10\ \text{V m}^{-1}$ at $x = 1$: magnitude 10, pointing towards $-x$ (down the potential gradient).`,
    concept: "Field from potential", formula: r`$E = -\dfrac{dV}{dx}$`, whyFormula: "Field points towards decreasing potential.", mistakes: "Dropping the sign.",
  },
  {
    topic: "electric-potential", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 0.18, tolerance: 0.002,
    statement: r`Find the electrostatic potential energy (in J) of two charges $2\ \mu\text{C}$ and $3\ \mu\text{C}$ separated by $0.3\ \text{m}$.`,
    solution: r`$U = \dfrac{kq_1q_2}{r} = \dfrac{9\times10^9\times6\times10^{-12}}{0.3} = 0.18\ \text{J}$.`,
    concept: "Potential energy of two charges", formula: r`$U = \dfrac{kq_1q_2}{r}$`, whyFormula: "Work to assemble the pair from infinity.", mistakes: "Using $r^2$.",
  },
  {
    topic: "electric-potential", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`Two isolated conducting spheres of radii $1\ \text{cm}$ and $3\ \text{cm}$ share a total charge of $8\ \text{nC}$ after being joined by a thin wire. Which statements are correct?`,
    options: [
      { text: r`They carry $2\ \text{nC}$ and $6\ \text{nC}$`, correct: true, why: "Equal potentials: q ∝ R." },
      { text: "They are at the same potential", correct: true, why: "Connected conductors form one equipotential." },
      { text: "The surface charge density is larger on the smaller sphere", correct: true, why: r`$\sigma \propto q/R^2 \propto 1/R$.` },
      { text: "The electric fields just outside the two surfaces are equal", why: r`$E = \sigma/\varepsilon_0$ is three times larger on the small sphere.` },
    ],
    solution: r`Equal potential: $\dfrac{kq_1}{R_1} = \dfrac{kq_2}{R_2} \Rightarrow q \propto R$: $q_1 = 2$ nC, $q_2 = 6$ nC. $\sigma = \dfrac{q}{4\pi R^2} \propto \dfrac1R$, so the smaller sphere has 3 times the charge density and 3 times the surface field. (This is why charge concentrates at sharp points.)`,
    concept: "Charge sharing between conductors", formula: r`$q_1/q_2 = R_1/R_2$, $\sigma_1/\sigma_2 = R_2/R_1$`, whyFormula: "Equipotential condition.", mistakes: "Assuming equal charges or equal densities.",
  },

  // ── Ohm's law and resistance ──
  {
    topic: "ohms-law-and-resistance", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The resistivity of a metal wire depends on:",
    options: [
      { text: "the material and its temperature", correct: true, why: "It is a material property." },
      { text: "its length", why: "Resistance depends on length; resistivity does not." },
      { text: "its cross-sectional area", why: "Same reason." },
      { text: "the current through it", why: "Not for an ohmic conductor at fixed temperature." },
    ],
    solution: r`$R = \rho L/A$: $R$ depends on geometry, but $\rho$ depends only on the material and temperature.`,
    concept: "Resistance vs resistivity", formula: r`$R = \rho L/A$`, whyFormula: "Separates geometry from material.", mistakes: "Treating ρ as geometry-dependent.",
  },
  {
    topic: "ohms-law-and-resistance", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 4,
    statement: r`A wire is stretched uniformly to twice its length. By what factor does its resistance increase?`,
    solution: r`Volume is constant, so $A \to A/2$. $R = \rho L/A \to \rho(2L)/(A/2) = 4R$. Factor 4.`,
    concept: "Resistance of a stretched wire", formula: r`$R' = n^2R$`, whyFormula: "Length up by n, area down by n.", mistakes: "Answering 2 (ignoring the area change).",
  },
  {
    topic: "ohms-law-and-resistance", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "A wire carries a steady current. If its diameter were doubled (same material, same current), the drift speed of electrons would become:",
    options: [
      { text: "one quarter", correct: true, why: r`$v_d = I/(neA)$ and A grows by 4.` },
      { text: "one half", why: "Area depends on diameter squared." },
      { text: "double", why: "A larger area means slower drift for the same current." },
      { text: "unchanged", why: "Drift speed depends on area." },
    ],
    solution: r`$I = neAv_d \Rightarrow v_d = \dfrac{I}{neA}$. Doubling $d$ makes $A$ four times larger, so $v_d$ falls to one quarter.`,
    concept: "Drift velocity", formula: r`$I = neAv_d$`, whyFormula: "Charge flow rate through a cross-section.", mistakes: "Using d instead of d².",
  },
  {
    topic: "ohms-law-and-resistance", level: 4, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 9,
    statement: r`Two $6\ \Omega$ resistors in parallel are connected in series with a third $6\ \Omega$ resistor. Find the total resistance in Ω.`,
    solution: r`Parallel pair: $3\ \Omega$; plus $6\ \Omega$ in series: $9\ \Omega$.`,
    concept: "Series and parallel combinations", formula: r`$R_p = \dfrac{R_1R_2}{R_1 + R_2}$`, whyFormula: "Reduce step by step.", mistakes: "Adding all three.",
  },
  {
    topic: "ohms-law-and-resistance", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`Two bulbs are rated $100\ \text{W}, 220\ \text{V}$ and $60\ \text{W}, 220\ \text{V}$. Treat their resistances as constant. Which statements are correct?`,
    options: [
      { text: "The 60 W bulb has the larger resistance", correct: true, why: r`$R = V^2/P$.` },
      { text: "Connected in series across 220 V, the 60 W bulb glows brighter", correct: true, why: r`Same current, so the larger R dissipates more ($I^2R$).` },
      { text: "Connected in parallel across 220 V, the 100 W bulb glows brighter", correct: true, why: "Each gets its rated voltage." },
      { text: "Connected in series across 220 V, they consume more than 60 W in total", why: r`$P = \dfrac{V^2}{R_1 + R_2} \approx 37.5\ \text{W}$.` },
    ],
    solution: r`$R_{100} = 220^2/100 = 484\ \Omega$; $R_{60} = 220^2/60 \approx 807\ \Omega$. In series the current is common, so power $\propto R$: the 60 W bulb is brighter, and the total is $\dfrac{220^2}{1291} \approx 37.5\ \text{W}$. In parallel each bulb gets 220 V and runs at its rated power.`,
    concept: "Power in series and parallel", formula: r`$P = I^2R$ (series), $P = V^2/R$ (parallel)`, whyFormula: "Choose the form with the common quantity.", mistakes: "Assuming the higher-rated bulb is always brighter.",
  },

  // ── Biot–Savart and Ampère's laws ──
  {
    topic: "biot-savart-and-amp-res-laws", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Inside a long solenoid (away from its ends) the magnetic field is:",
    options: [
      { text: r`uniform, equal to $\mu_0nI$ along the axis`, correct: true, why: "Ampère's law with a rectangular loop." },
      { text: "zero", why: "The field is strong inside." },
      { text: "largest near the windings and zero on the axis", why: "It is uniform across the cross-section." },
      { text: "proportional to 1/r from the axis", why: "That is a straight wire's field outside it." },
    ],
    solution: r`Ampère's law on a rectangle with one side inside: $BL = \mu_0(nL)I \Rightarrow B = \mu_0nI$, independent of position inside.`,
    concept: "Field of a solenoid", formula: r`$B = \mu_0nI$`, whyFormula: "Ampère's circuital law.", mistakes: "Using the total number of turns instead of turns per length.",
  },
  {
    topic: "biot-savart-and-amp-res-laws", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 31.4, tolerance: 0.2,
    statement: r`Find the magnetic field (in μT) at the centre of a circular loop of radius $0.1\ \text{m}$ carrying $5\ \text{A}$.`,
    solution: r`$B = \dfrac{\mu_0I}{2R} = \dfrac{4\pi\times10^{-7}\times5}{0.2} = 10\pi\times10^{-6}\ \text{T} \approx 31.4\ \mu\text{T}$.`,
    concept: "Field at the centre of a loop", formula: r`$B = \dfrac{\mu_0I}{2R}$`, whyFormula: "Biot–Savart, every element at distance R.", mistakes: "Using the straight-wire formula.",
  },
  {
    topic: "biot-savart-and-amp-res-laws", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "If the distance from a long straight current-carrying wire is doubled, the magnetic field becomes:",
    options: [
      { text: "half", correct: true, why: r`$B = \mu_0I/2\pi d$.` },
      { text: "one quarter", why: "That would be 1/d²." },
      { text: "double", why: "B decreases with distance." },
      { text: "unchanged", why: "B depends on d." },
    ],
    solution: r`$B = \dfrac{\mu_0I}{2\pi d} \propto \dfrac1d$: doubling $d$ halves $B$.`,
    concept: "Field of a long wire", formula: r`$B = \dfrac{\mu_0I}{2\pi d}$`, whyFormula: "Ampère's law with a circular loop.", mistakes: "Using an inverse-square law.",
  },
  {
    topic: "biot-savart-and-amp-res-laws", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 2.51, tolerance: 0.02,
    statement: r`A long solenoid has 1000 turns per metre and carries $2\ \text{A}$. Find the field inside, in mT.`,
    solution: r`$B = \mu_0nI = 4\pi\times10^{-7}\times1000\times2 \approx 2.51\times10^{-3}\ \text{T} = 2.51\ \text{mT}$.`,
    concept: "Solenoid field", formula: r`$B = \mu_0nI$`, whyFormula: "Turns per unit length.", mistakes: "Unit conversion.",
  },
  {
    topic: "biot-savart-and-amp-res-laws", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`Two long parallel wires $0.2\ \text{m}$ apart carry $5\ \text{A}$ each in opposite directions. Which statements are correct?`,
    options: [
      { text: "At the midpoint between them, their magnetic fields point in the same direction", correct: true, why: "Opposite currents on opposite sides give parallel fields between them." },
      { text: r`The field at the midpoint is $2\times10^{-5}\ \text{T}$`, correct: true, why: r`$2\times\dfrac{\mu_0I}{2\pi(0.1)} = 2\times10^{-5}$.` },
      { text: "The wires repel each other", correct: true, why: "Antiparallel currents repel." },
      { text: r`The force per unit length on each wire is $5\times10^{-5}\ \text{N m}^{-1}$`, why: r`$\dfrac{\mu_0I^2}{2\pi d} = 2.5\times10^{-5}\ \text{N m}^{-1}$.` },
    ],
    solution: r`Each wire alone gives $\dfrac{\mu_0I}{2\pi(0.1)} = \dfrac{2\times10^{-7}\times5}{0.1} = 10^{-5}\ \text{T}$ at the midpoint; for opposite currents the two fields there are in the same direction: total $2\times10^{-5}\ \text{T}$. Force per length $= \dfrac{\mu_0I_1I_2}{2\pi d} = \dfrac{2\times10^{-7}\times25}{0.2} = 2.5\times10^{-5}\ \text{N m}^{-1}$, repulsive.`,
    concept: "Superposing wire fields; force between currents", formula: r`$B = \dfrac{\mu_0I}{2\pi d}$, $\dfrac FL = \dfrac{\mu_0I_1I_2}{2\pi d}$`, whyFormula: "Right-hand rule decides directions.", mistakes: "Using the half-separation in the force formula.",
  },

  // ── Magnetism and matter ──
  {
    topic: "magnetism-and-matter", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A diamagnetic material has a magnetic susceptibility that is:",
    options: [
      { text: "small and negative", correct: true, why: "It is weakly repelled by a magnet." },
      { text: "small and positive", why: "That is paramagnetic." },
      { text: "large and positive", why: "That is ferromagnetic." },
      { text: "exactly zero", why: "Diamagnetism is present in all materials." },
    ],
    solution: "Diamagnetic materials (e.g. bismuth, copper, water) develop a magnetisation opposite to the applied field: χ is small and negative, nearly independent of temperature.",
    concept: "Magnetic materials", formula: r`$M = \chi H$`, whyFormula: "Sign of χ classifies the material.", mistakes: "Mixing dia- and paramagnetism.",
  },
  {
    topic: "magnetism-and-matter", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 0.1, tolerance: 0.001,
    statement: r`A bar magnet of moment $2\ \text{A m}^2$ makes $30^\circ$ with a uniform field of $0.1\ \text{T}$. Find the torque on it in N m.`,
    solution: r`$\tau = mB\sin\theta = 2\times0.1\times0.5 = 0.1\ \text{N m}$.`,
    concept: "Torque on a magnetic dipole", formula: r`$\tau = mB\sin\theta$`, whyFormula: r`$\vec\tau = \vec m\times\vec B$.`, mistakes: "Using cos.",
  },
  {
    topic: "magnetism-and-matter", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Curie's law states that, for a paramagnetic material, the susceptibility is:",
    options: [
      { text: "inversely proportional to the absolute temperature", correct: true, why: r`$\chi = C/T$.` },
      { text: "directly proportional to temperature", why: "Thermal agitation disorders the dipoles." },
      { text: "independent of temperature", why: "That describes diamagnetism approximately." },
      { text: "negative", why: "Paramagnetic χ is positive." },
    ],
    solution: "Heating randomises the atomic dipoles, so alignment by the field weakens: χ = C/T.",
    concept: "Curie's law", formula: r`$\chi = C/T$`, whyFormula: "Competition between field alignment and thermal motion.", mistakes: "Applying it to diamagnets.",
  },
  {
    topic: "magnetism-and-matter", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 0.4, tolerance: 0.001,
    statement: r`Find the work (in J) needed to turn a magnet of moment $2\ \text{A m}^2$ from alignment with a $0.1\ \text{T}$ field to the anti-aligned position.`,
    solution: r`$W = mB(\cos0^\circ - \cos180^\circ) = 2mB = 0.4\ \text{J}$.`,
    concept: "Work to rotate a magnetic dipole", formula: r`$W = mB(\cos\theta_1 - \cos\theta_2)$`, whyFormula: r`Change in $U = -mB\cos\theta$.`, mistakes: "Using $mB$.",
  },
  {
    topic: "magnetism-and-matter", level: 5, difficulty: "HARD", type: "MATCH", time: 180,
    statement: "Match each material in List-I with its behaviour in List-II.",
    match: {
      left: ["Diamagnetic substance", "Paramagnetic substance", "Ferromagnetic substance below its Curie temperature", "Ferromagnetic substance above its Curie temperature"],
      right: ["Small negative susceptibility, almost independent of temperature", "Small positive susceptibility that falls as 1/T", "Very large susceptibility and hysteresis", "Behaves like a paramagnet", "Susceptibility exactly zero"],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: "Each class matched to its defining behaviour." },
      { text: "P→5, Q→2, R→3, S→4", why: "Diamagnetic susceptibility is small and negative, not zero." },
      { text: "P→1, Q→3, R→2, S→4", why: "Swaps para- and ferromagnetic behaviour." },
      { text: "P→1, Q→2, R→3, S→3", why: "Above the Curie temperature the domains disappear." },
    ],
    solution: "Diamagnets: induced moments oppose the field (χ < 0, small). Paramagnets: permanent atomic moments partly align (χ > 0, small, Curie's law). Ferromagnets: domains give huge χ and hysteresis; above the Curie temperature thermal agitation destroys domain order and the material becomes paramagnetic.",
    concept: "Classes of magnetic materials", formula: r`Curie–Weiss: $\chi = \dfrac{C}{T - T_C}$ above $T_C$`, whyFormula: "Temperature dependence distinguishes the classes.", mistakes: "Thinking ferromagnets stay ferromagnetic at any temperature.",
  },

  // ── Alternating current ──
  {
    topic: "alternating-current", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In a purely inductive AC circuit, the current:",
    options: [
      { text: r`lags the voltage by $90^\circ$`, correct: true, why: r`$V = L\,dI/dt$.` },
      { text: r`leads the voltage by $90^\circ$`, why: "That is a pure capacitor." },
      { text: "is in phase with the voltage", why: "That is a pure resistor." },
      { text: r`lags by $180^\circ$`, why: "No." },
    ],
    solution: r`$V = L\dfrac{dI}{dt}$: if $I = I_0\sin\omega t$, then $V = \omega LI_0\cos\omega t$, which reaches its peak a quarter-cycle earlier. The current lags by $\pi/2$.`,
    concept: "Phase in an inductor", formula: r`$X_L = \omega L$`, whyFormula: "Back EMF opposes changes in current.", mistakes: "Mixing inductor and capacitor phases (remember 'CIVIL').",
  },
  {
    topic: "alternating-current", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 220, tolerance: 1,
    statement: r`An AC voltage has a peak value of $311\ \text{V}$. Find its RMS value in volts.`,
    solution: r`$V_{\text{rms}} = V_0/\sqrt2 = 311/1.414 \approx 220\ \text{V}$.`,
    concept: "RMS value", formula: r`$V_{\text{rms}} = V_0/\sqrt2$`, whyFormula: "Sinusoidal waveform.", mistakes: "Multiplying by √2.",
  },
  {
    topic: "alternating-current", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "At resonance in a series LCR circuit, the impedance is:",
    options: [
      { text: r`equal to $R$ (its minimum value)`, correct: true, why: r`$X_L = X_C$.` },
      { text: "zero", why: "R remains." },
      { text: "infinite", why: "That is a parallel LC at resonance." },
      { text: r`$X_L + X_C$`, why: "The reactances cancel." },
    ],
    solution: r`$Z = \sqrt{R^2 + (X_L - X_C)^2}$, minimum $= R$ when $X_L = X_C$: current is maximum and in phase with the voltage.`,
    concept: "Series resonance", formula: r`$\omega_0 = 1/\sqrt{LC}$`, whyFormula: r`$X_L = X_C$.`, mistakes: "Saying Z = 0.",
  },
  {
    topic: "alternating-current", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 1000,
    statement: r`Find the resonant angular frequency (in rad s⁻¹) of a series circuit with $L = 0.1\ \text{H}$ and $C = 10\ \mu\text{F}$.`,
    solution: r`$\omega_0 = \dfrac{1}{\sqrt{LC}} = \dfrac{1}{\sqrt{0.1\times10^{-5}}} = \dfrac{1}{10^{-3}} = 1000\ \text{rad s}^{-1}$.`,
    concept: "Resonant frequency", formula: r`$\omega_0 = 1/\sqrt{LC}$`, whyFormula: r`From $\omega L = 1/\omega C$.`, mistakes: "Giving f instead of ω.",
  },
  {
    topic: "alternating-current", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A series circuit has $R = 30\ \Omega$, $X_L = 80\ \Omega$ and $X_C = 40\ \Omega$ across a $100\ \text{V}$ (RMS) supply. Which statements are correct?`,
    options: [
      { text: r`The RMS current is $2\ \text{A}$`, correct: true, why: r`$Z = \sqrt{30^2 + 40^2} = 50\ \Omega$.` },
      { text: "The power factor is 0.6", correct: true, why: r`$R/Z$.` },
      { text: r`The average power consumed is $120\ \text{W}$`, correct: true, why: r`$I^2R = 4\times30$.` },
      { text: "The current lags the voltage", correct: true, why: r`$X_L > X_C$: the circuit is inductive.` },
    ],
    solution: r`$Z = \sqrt{R^2 + (X_L - X_C)^2} = \sqrt{900 + 1600} = 50\ \Omega$; $I = 100/50 = 2\ \text{A}$; $\cos\phi = 30/50 = 0.6$; $P = I^2R = 120\ \text{W}$ (also $VI\cos\phi = 100\times2\times0.6$). Since $X_L > X_C$, the current lags. All four are correct.`,
    concept: "Series LCR analysis", formula: r`$Z = \sqrt{R^2 + (X_L - X_C)^2}$, $P = I_{\text{rms}}^2R$`, whyFormula: "Only the resistor dissipates power.", mistakes: "Using $VI$ without the power factor.",
  },

  // ── Matter waves ──
  {
    topic: "matter-waves", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The de Broglie wavelength of a particle is inversely proportional to its:",
    options: [
      { text: "momentum", correct: true, why: r`$\lambda = h/p$.` },
      { text: "kinetic energy", why: r`It goes as $1/\sqrt{K}$.` },
      { text: "charge", why: "Charge appears only when using an accelerating voltage." },
      { text: "speed squared", why: "λ ∝ 1/v for a given mass." },
    ],
    solution: r`$\lambda = \dfrac hp = \dfrac{h}{mv} = \dfrac{h}{\sqrt{2mK}}$.`,
    concept: "de Broglie relation", formula: r`$\lambda = h/p$`, whyFormula: "Definition.", mistakes: "Using 1/K.",
  },
  {
    topic: "matter-waves", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 1.23, tolerance: 0.01,
    statement: r`An electron is accelerated from rest through $100\ \text{V}$. Find its de Broglie wavelength in Å (use $\lambda = 12.27/\sqrt{V}$ Å).`,
    solution: r`$\lambda = \dfrac{12.27}{\sqrt{100}} = 1.227\ \text{Å} \approx 1.23\ \text{Å}$.`,
    concept: "Wavelength of accelerated electrons", formula: r`$\lambda = \dfrac{h}{\sqrt{2meV}}$`, whyFormula: "KE = eV.", mistakes: "Forgetting the square root.",
  },
  {
    topic: "matter-waves", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "A proton and an alpha particle are accelerated through the same potential difference. The ratio of their de Broglie wavelengths (proton : alpha) is:",
    options: [
      { text: r`$2\sqrt2 : 1$`, correct: true, why: r`$\lambda \propto 1/\sqrt{mq}$; $\sqrt{4\times2} = 2\sqrt2$.` },
      { text: r`$1 : 2\sqrt2$`, why: "Inverted." },
      { text: "2 : 1", why: "Ignores the charge." },
      { text: "4 : 1", why: "Uses the mass ratio without the square root." },
    ],
    solution: r`$\lambda = \dfrac{h}{\sqrt{2mqV}}$. Alpha: $m_\alpha = 4m_p$, $q_\alpha = 2e$. $\dfrac{\lambda_p}{\lambda_\alpha} = \sqrt{\dfrac{m_\alpha q_\alpha}{m_pq_p}} = \sqrt8 = 2\sqrt2$.`,
    concept: "Comparing matter-wave wavelengths", formula: r`$\lambda = \dfrac{h}{\sqrt{2mqV}}$`, whyFormula: "Kinetic energy equals qV.", mistakes: "Forgetting the alpha's double charge.",
  },
  {
    topic: "matter-waves", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 1,
    statement: r`A particle of mass $6.6\times10^{-27}\ \text{kg}$ moves at $1000\ \text{m s}^{-1}$. Find its de Broglie wavelength in Å ($h = 6.6\times10^{-34}\ \text{J s}$).`,
    solution: r`$\lambda = \dfrac{h}{mv} = \dfrac{6.6\times10^{-34}}{6.6\times10^{-24}} = 10^{-10}\ \text{m} = 1\ \text{Å}$.`,
    concept: "de Broglie wavelength", formula: r`$\lambda = h/mv$`, whyFormula: "Direct.", mistakes: "Exponent arithmetic.",
  },
  {
    topic: "matter-waves", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`An electron and a photon both have wavelength $1\ \text{nm}$ ($h = 6.63\times10^{-34}\ \text{J s}$, $m_e = 9.1\times10^{-31}\ \text{kg}$, $hc = 1240\ \text{eV nm}$). Which statements are correct?`,
    options: [
      { text: "They have equal momenta", correct: true, why: r`$p = h/\lambda$ for both.` },
      { text: "The photon has much more energy than the electron's kinetic energy", correct: true, why: "1240 eV vs about 1.5 eV." },
      { text: r`The electron's kinetic energy is about $1.5\ \text{eV}$`, correct: true, why: r`$\dfrac{h^2}{2m\lambda^2} \approx 2.4\times10^{-19}\ \text{J}$.` },
      { text: r`The photon's energy is about $124\ \text{eV}$`, why: r`$E = hc/\lambda = 1240\ \text{eV}$.` },
    ],
    solution: r`Same wavelength ⇒ same momentum $p = h/\lambda = 6.63\times10^{-25}\ \text{kg m s}^{-1}$.
- Photon: $E = pc = \dfrac{1240}{1} = 1240\ \text{eV}$.
- Electron: $K = \dfrac{p^2}{2m} = \dfrac{(6.63\times10^{-25})^2}{2\times9.1\times10^{-31}} \approx 2.42\times10^{-19}\ \text{J} \approx 1.5\ \text{eV}$.

Energy–momentum relations differ: $E = pc$ (photon) vs $K = p^2/2m$ (slow particle).`,
    concept: "Matter waves vs photons", formula: r`$E_{\text{photon}} = pc$, $K_{\text{electron}} = \dfrac{p^2}{2m}$`, whyFormula: "Different dispersion relations for the same p.", mistakes: "Assuming equal wavelength means equal energy.",
  },

  // ── Atomic models and spectra ──
  {
    topic: "atomic-models-and-spectra", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Rutherford's alpha-scattering experiment showed that:",
    options: [
      { text: "the positive charge and most of the mass of an atom are in a tiny nucleus", correct: true, why: "A few alphas were deflected through large angles." },
      { text: "electrons move in fixed circular orbits", why: "That is Bohr's postulate." },
      { text: "positive charge is spread uniformly through the atom", why: "That was Thomson's model, which the experiment disproved." },
      { text: "the atom is mostly solid matter", why: "Most alphas passed straight through — the atom is mostly empty." },
    ],
    solution: "Most alpha particles passed undeflected (atom mostly empty); a very few rebounded (a tiny, dense, positive nucleus). This disproved the Thomson model.",
    concept: "Rutherford model", formula: r`Closest approach $r_0 = \dfrac{k(2e)(Ze)}{K}$`, whyFormula: "Energy conservation for a head-on approach.", mistakes: "Attributing quantised orbits to Rutherford.",
  },
  {
    topic: "atomic-models-and-spectra", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 2.12, tolerance: 0.01,
    statement: r`Find the radius (in Å) of the second Bohr orbit of hydrogen ($r_1 = 0.529$ Å).`,
    solution: r`$r_n = r_1n^2/Z = 0.529\times4 = 2.116 \approx 2.12\ \text{Å}$.`,
    concept: "Bohr radii", formula: r`$r_n = 0.529\dfrac{n^2}{Z}$ Å`, whyFormula: "Radius grows as n².", mistakes: "Using n instead of n².",
  },
  {
    topic: "atomic-models-and-spectra", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In the Bohr model of hydrogen, the speed of the electron in the nth orbit is proportional to:",
    options: [
      { text: r`$1/n$`, correct: true, why: r`$v_n = 2.18\times10^6\,Z/n$ m/s.` },
      { text: r`$n$`, why: "Outer orbits are slower." },
      { text: r`$1/n^2$`, why: "That is the energy dependence." },
      { text: r`$n^2$`, why: "That is the radius dependence." },
    ],
    solution: r`From $mvr = nh/2\pi$ and $r \propto n^2$: $v \propto n/r \propto 1/n$.`,
    concept: "Bohr model scalings", formula: r`$v_n \propto Z/n$`, whyFormula: "Combine quantisation with $r \\propto n^2$.", mistakes: "Mixing up scalings.",
  },
  {
    topic: "atomic-models-and-spectra", level: 4, difficulty: "HARD", type: "NUMERICAL", time: 120, answer: 45.5, tolerance: 0.3,
    statement: r`A $5\ \text{MeV}$ alpha particle approaches a gold nucleus ($Z = 79$) head-on. Find its distance of closest approach in femtometres ($k = 9\times10^9$, $e = 1.6\times10^{-19}\ \text{C}$).`,
    solution: r`At closest approach all KE becomes potential energy: $K = \dfrac{k(2e)(Ze)}{r_0}$.
$r_0 = \dfrac{9\times10^9\times2\times79\times(1.6\times10^{-19})^2}{5\times10^6\times1.6\times10^{-19}} = \dfrac{9\times10^9\times158\times1.6\times10^{-19}}{5\times10^6} \approx 4.55\times10^{-14}\ \text{m} = 45.5\ \text{fm}$.`,
    concept: "Distance of closest approach", formula: r`$r_0 = \dfrac{k(2e)(Ze)}{K}$`, whyFormula: "Energy conservation; the nucleus is assumed fixed.", mistakes: "Using the alpha's charge as e; not converting MeV to J.",
  },
  {
    topic: "atomic-models-and-spectra", level: 5, difficulty: "HARD", type: "MATCH", time: 240,
    statement: r`Match each hydrogen transition in List-I with the wavelength of the emitted radiation in List-II ($R = 1.097\times10^7\ \text{m}^{-1}$).`,
    match: {
      left: [r`$n = 2 \to 1$`, r`$n = 3 \to 2$`, r`$n = 4 \to 3$`, r`$n = \infty \to 1$`],
      right: [r`$121.6\ \text{nm}$`, r`$656\ \text{nm}$`, r`$1875\ \text{nm}$`, r`$91.2\ \text{nm}$`, r`$486\ \text{nm}$`],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: "Lyman-α, Balmer-α (Hα), Paschen-α and the Lyman limit." },
      { text: "P→1, Q→5, R→3, S→4", why: "486 nm is the 4 → 2 (Hβ) line." },
      { text: "P→4, Q→2, R→3, S→1", why: "Swaps the first Lyman line and the series limit." },
      { text: "P→1, Q→2, R→5, S→4", why: "4 → 3 lies in the infrared (Paschen)." },
    ],
    solution: r`$\dfrac1\lambda = R\left(\dfrac1{n_1^2} - \dfrac1{n_2^2}\right)$:
- $2\to1$: $\tfrac34R \Rightarrow 121.6\ \text{nm}$.
- $3\to2$: $\tfrac{5}{36}R \Rightarrow 656\ \text{nm}$.
- $4\to3$: $\tfrac{7}{144}R \Rightarrow 1875\ \text{nm}$.
- $\infty\to1$: $R \Rightarrow 91.2\ \text{nm}$.`,
    concept: "Hydrogen spectral series", formula: r`$\dfrac1\lambda = R\left(\dfrac1{n_1^2} - \dfrac1{n_2^2}\right)$`, whyFormula: "Rydberg formula.", mistakes: "Confusing the series limit with the first line.",
  },

  // ── Logic gates ──
  {
    topic: "logic-gates", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The output of a two-input NAND gate is 0 only when:",
    options: [
      { text: "both inputs are 1", correct: true, why: "NAND = NOT(AND)." },
      { text: "both inputs are 0", why: "Then AND = 0, so NAND = 1." },
      { text: "exactly one input is 1", why: "Then AND = 0, so NAND = 1." },
      { text: "never", why: "It is 0 for inputs (1, 1)." },
    ],
    solution: "AND is 1 only for (1, 1); NAND inverts it, so NAND is 0 only for (1, 1).",
    concept: "NAND gate truth table", formula: r`$Y = \overline{AB}$`, whyFormula: "Definition.", mistakes: "Confusing NAND with NOR.",
  },
  {
    topic: "logic-gates", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 8,
    statement: "How many rows does the truth table of a three-input logic gate have?",
    solution: r`Each input is 0 or 1: $2^3 = 8$ combinations.`,
    concept: "Truth tables", formula: r`$2^n$ rows`, whyFormula: "Independent binary inputs.", mistakes: "Answering 6.",
  },
  {
    topic: "logic-gates", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "The output of a NOR gate is fed into a NOT gate. The combination behaves as:",
    options: [
      { text: "an OR gate", correct: true, why: "NOT(NOR) = OR." },
      { text: "an AND gate", why: "That is NOT(NAND)." },
      { text: "a NAND gate", why: "No." },
      { text: "a NOR gate", why: "The NOT inverts it." },
    ],
    solution: r`$\overline{\overline{A + B}} = A + B$: an OR gate.`,
    concept: "Combining gates", formula: r`$\overline{\overline X} = X$`, whyFormula: "Double negation.", mistakes: "Confusing OR and AND.",
  },
  {
    topic: "logic-gates", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 2,
    statement: r`A circuit gives $Y = \overline{AB}\cdot(A + B)$ (a NAND output ANDed with an OR output). For how many of the four input combinations of $(A, B)$ is $Y = 1$?`,
    solution: r`Check each: (0,0): NAND = 1, OR = 0 → 0. (0,1): 1, 1 → 1. (1,0): 1, 1 → 1. (1,1): 0, 1 → 0. So $Y = 1$ for 2 combinations (the circuit outputs 1 when the inputs differ).`,
    concept: "Evaluating a combinational circuit", formula: "Truth table row by row", whyFormula: "Reliable for small circuits.", mistakes: "Skipping the (0, 0) row.",
  },
  {
    topic: "logic-gates", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about logic gates are correct?",
    options: [
      { text: "Every logic function can be built using NAND gates alone", correct: true, why: "NAND is a universal gate." },
      { text: "Every logic function can be built using NOR gates alone", correct: true, why: "NOR is also universal." },
      { text: "Every logic function can be built using AND gates alone", why: "AND alone cannot produce NOT." },
      { text: "A NAND gate with both inputs joined together works as a NOT gate", correct: true, why: r`$\overline{A\cdot A} = \overline A$.` },
    ],
    solution: r`NAND and NOR are universal: tying the inputs of either gives NOT, and NOT with NAND (or NOR) builds AND and OR. AND (or OR) alone can never invert a signal, so it is not universal.`,
    concept: "Universal gates", formula: r`$\overline{A\cdot A} = \overline A$; $\overline{A + A} = \overline A$`, whyFormula: "Getting NOT is the key.", mistakes: "Thinking AND/OR are universal.",
  },

  // ── Standard experiments ──
  {
    topic: "standard-experiments", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In a metre-bridge experiment, the balance point is preferably obtained near the middle of the wire because:",
    options: [
      { text: "the percentage error in the result is smallest there", correct: true, why: r`Error $\propto \dfrac{1}{l(100 - l)}$, smallest at $l = 50$ cm.` },
      { text: "the wire is thickest at the middle", why: "The wire is uniform." },
      { text: "the galvanometer is most sensitive at the middle", why: "Sensitivity is not the reason." },
      { text: "end resistances are larger in the middle", why: "End effects matter most near the ends." },
    ],
    solution: r`With $S = R(100 - l)/l$, a reading error $\Delta l$ gives $\dfrac{\Delta S}{S} = \dfrac{100\,\Delta l}{l(100 - l)}$, minimum at $l = 50$ cm; end-corrections also matter less there.`,
    concept: "Metre bridge accuracy", formula: r`$\dfrac{\Delta S}{S} = \dfrac{100\Delta l}{l(100 - l)}$`, whyFormula: "Error propagation.", mistakes: "Giving a sensitivity argument.",
  },
  {
    topic: "standard-experiments", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 340,
    statement: r`In a resonance-tube experiment with a $500\ \text{Hz}$ fork, the first and second resonance lengths are $16\ \text{cm}$ and $50\ \text{cm}$. Find the speed of sound in m s⁻¹.`,
    solution: r`$\dfrac\lambda2 = l_2 - l_1 = 34\ \text{cm} \Rightarrow \lambda = 0.68\ \text{m}$; $v = f\lambda = 340\ \text{m s}^{-1}$. The difference cancels the end correction.`,
    concept: "Resonance tube", formula: r`$v = 2f(l_2 - l_1)$`, whyFormula: "Successive resonances differ by half a wavelength.", mistakes: "Using $4fl_1$ (ignores end correction).",
  },
  {
    topic: "standard-experiments", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "For the resonance-tube readings above (16 cm and 50 cm), the end correction is:",
    options: [
      { text: r`$1\ \text{cm}$`, correct: true, why: r`$e = \dfrac{l_2 - 3l_1}{2}$.` },
      { text: r`$2\ \text{cm}$`, why: "Forgets the division by 2." },
      { text: r`$0.6\ \text{cm}$`, why: "That is 0.6r for an assumed radius." },
      { text: "zero", why: "The readings show a correction." },
    ],
    solution: r`$l_1 + e = \dfrac\lambda4$ and $l_2 + e = \dfrac{3\lambda}4 \Rightarrow l_2 + e = 3(l_1 + e) \Rightarrow e = \dfrac{l_2 - 3l_1}{2} = \dfrac{50 - 48}{2} = 1\ \text{cm}$.`,
    concept: "End correction", formula: r`$e = \dfrac{l_2 - 3l_1}{2}$`, whyFormula: "Two resonance conditions.", mistakes: "Sign errors.",
  },
  {
    topic: "standard-experiments", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 1.27, tolerance: 0.01,
    statement: r`In Searle's experiment a $2\ \text{kg}$ load extends a wire of length $2\ \text{m}$ and radius $0.5\ \text{mm}$ by $0.4\ \text{mm}$. Find Young's modulus in units of $10^{11}\ \text{Pa}$.`,
    solution: r`$Y = \dfrac{MgL}{\pi r^2\Delta l} = \dfrac{2\times10\times2}{\pi\times(0.5\times10^{-3})^2\times0.4\times10^{-3}} = \dfrac{40}{3.14\times10^{-10}} \approx 1.27\times10^{11}\ \text{Pa}$.`,
    concept: "Young's modulus experiment", formula: r`$Y = \dfrac{MgL}{\pi r^2\Delta l}$`, whyFormula: "Definition with measured quantities.", mistakes: "Using diameter instead of radius.",
  },
  {
    topic: "standard-experiments", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`In a simple-pendulum experiment, $T^2$ is plotted against $L$ to find $g$. Which statements are correct?`,
    options: [
      { text: "For an ideal pendulum the graph is a straight line through the origin", correct: true, why: r`$T^2 = \dfrac{4\pi^2}{g}L$.` },
      { text: r`The slope of the line is $4\pi^2/g$`, correct: true, why: "Direct comparison." },
      { text: "Measuring L to the top of the bob instead of its centre shifts the line but leaves the slope (and g) unchanged", correct: true, why: "A constant offset in L moves the intercept only." },
      { text: r`Using a large amplitude (about $60^\circ$) improves the accuracy of $g$`, why: "The small-angle formula fails; the period grows with amplitude." },
    ],
    solution: r`$T = 2\pi\sqrt{L/g} \Rightarrow T^2 = \dfrac{4\pi^2}{g}L$: straight line through the origin with slope $4\pi^2/g$. A constant error in $L$ (e.g. omitting the bob's radius) adds an intercept but does not change the slope — a key advantage of the graphical method. Large amplitudes violate the small-angle approximation.`,
    concept: "Graphical analysis of an experiment", formula: r`$T^2 = \dfrac{4\pi^2}{g}L$`, whyFormula: "Linearising the relation.", mistakes: "Computing g from a single reading.",
  },
];
