import type { QuestionSeed } from "./types";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).

export const PHYSICS_QUESTIONS_2: QuestionSeed[] = [
  // ── Capacitors ──
  {
    topic: "capacitors", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The plate separation of an isolated parallel-plate capacitor is doubled. Its capacitance becomes:",
    options: [
      { text: "$C/2$", correct: true, why: "$C = \\varepsilon_0A/d$, so doubling $d$ halves $C$." },
      { text: "$2C$", why: "Capacitance is inversely proportional to $d$." },
      { text: "$C/4$", why: "Would need $C \\propto 1/d^2$." },
      { text: "$C$", why: "Geometry has changed, so $C$ changes." },
    ],
    solution: "$C = \\dfrac{\\varepsilon_0A}{d}$. With $d \\to 2d$, $C \\to C/2$. (Capacitance depends only on geometry, not on charge.)",
    concept: "Parallel-plate capacitance", formula: "$C = \\varepsilon_0A/d$", whyFormula: "Only the separation changes.", mistakes: "Thinking capacitance depends on whether the battery is connected.",
  },
  {
    topic: "capacitors", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Capacitors of $2\\,\\mu\\text{F}$ and $3\\,\\mu\\text{F}$ are connected in series. The equivalent capacitance is:",
    options: [
      { text: "$5\\,\\mu\\text{F}$", why: "That is the parallel combination." },
      { text: "$1.2\\,\\mu\\text{F}$", correct: true, why: "$\\frac{2\\times3}{2+3} = 1.2$." },
      { text: "$6\\,\\mu\\text{F}$", why: "Product, not the series formula." },
      { text: "$0.83\\,\\mu\\text{F}$", why: "Reciprocal of the sum of reciprocals inverted wrongly." },
    ],
    solution: "$\\dfrac1C = \\dfrac12 + \\dfrac13 = \\dfrac56 \\Rightarrow C = 1.2\\,\\mu\\text{F}$.",
    concept: "Series combination", formula: "$\\dfrac1C = \\dfrac1{C_1} + \\dfrac1{C_2}$", whyFormula: "Series capacitors carry the same charge.", mistakes: "Using the resistor series rule for capacitors.",
  },
  {
    topic: "capacitors", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 50,
    statement: "A $10\\,\\mu\\text{F}$ capacitor is charged to $100\\,\\text{V}$. Find the energy stored in millijoules.",
    solution: "$U = \\tfrac12CV^2 = \\tfrac12(10\\times10^{-6})(10^4) = 0.05\\,\\text{J} = 50\\,\\text{mJ}$.",
    concept: "Energy of a capacitor", formula: "$U = \\tfrac12CV^2$", whyFormula: "$C$ and $V$ are given directly.", mistakes: "Forgetting the factor $\\tfrac12$ or the micro prefix.",
  },
  {
    topic: "capacitors", level: 2, difficulty: "EASY", type: "MCQ", time: 45,
    statement: "A capacitor stays connected to a battery while a dielectric of constant $K = 4$ completely fills the gap. The charge on the plates becomes ($Q$ = original charge):",
    options: [
      { text: "$4Q$", correct: true, why: "$V$ fixed, $C \\to 4C$, so $Q = CV \\to 4Q$." },
      { text: "$Q/4$", why: "That would happen to $V$ if the battery were disconnected." },
      { text: "$Q$", why: "Charge stays constant only when the battery is removed." },
      { text: "$2Q$", why: "Uses $\\sqrt K$." },
    ],
    solution: "With the battery connected, $V$ is constant. The dielectric multiplies $C$ by $K = 4$, so $Q' = (4C)V = 4Q$.",
    concept: "Dielectric with battery connected", formula: "$Q = CV$, $C' = KC$", whyFormula: "Identify what is fixed (here $V$).", mistakes: "Treating $Q$ as constant while the battery is connected.",
  },
  {
    topic: "capacitors", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 4.5,
    statement: "Three $3\\,\\mu\\text{F}$ capacitors: two are in series, and this pair is connected in parallel with the third. Find the equivalent capacitance in $\\mu\\text{F}$.",
    solution: "Series pair: $\\dfrac{3\\times3}{6} = 1.5\\,\\mu\\text{F}$. In parallel with $3\\,\\mu\\text{F}$: $1.5 + 3 = 4.5\\,\\mu\\text{F}$.",
    concept: "Mixed combinations", formula: "Series $\\frac1C = \\sum\\frac1{C_i}$; parallel $C = \\sum C_i$", whyFormula: "Reduce the network step by step.", mistakes: "Combining in the wrong order.",
  },
  {
    topic: "capacitors", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "A $2\\,\\mu\\text{F}$ capacitor charged to $100\\,\\text{V}$ is connected across an identical uncharged capacitor. The energy lost in the process is:",
    options: [
      { text: "$10\\,\\text{mJ}$", why: "That is the initial energy, not the loss." },
      { text: "$5\\,\\text{mJ}$", correct: true, why: "Initial 10 mJ, final 5 mJ." },
      { text: "$2.5\\,\\text{mJ}$", why: "Final energy computed with one capacitor only." },
      { text: "zero", why: "Energy is always lost when capacitors at different potentials are joined." },
    ],
    solution: "Initial $U = \\tfrac12(2\\times10^{-6})(100)^2 = 10\\,\\text{mJ}$. Charge $200\\,\\mu\\text{C}$ shared over $4\\,\\mu\\text{F}$: $V = 50\\,\\text{V}$. Final $U = \\tfrac12(4\\times10^{-6})(50)^2 = 5\\,\\text{mJ}$. Loss $= 5\\,\\text{mJ}$.",
    concept: "Charge sharing", formula: "Loss $= \\dfrac{C_1C_2}{2(C_1 + C_2)}(V_1 - V_2)^2$", whyFormula: "Charge is conserved; energy is not.", alt: "$\\dfrac{2\\times2}{2\\times4}\\times10^{-6}\\times10^4 = 5\\,\\text{mJ}$.", mistakes: "Assuming energy is conserved.",
  },
  {
    topic: "capacitors", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "A dielectric slab of constant $K$ and thickness $d/2$ is placed between the plates of a parallel-plate capacitor of separation $d$ and capacitance $C_0$. The new capacitance is:",
    options: [
      { text: "$\\dfrac{2K}{K + 1}C_0$", correct: true, why: "$C = \\dfrac{\\varepsilon_0A}{d/2 + d/2K}$." },
      { text: "$\\dfrac{K + 1}{2}C_0$", why: "This is the side-by-side (parallel) arrangement." },
      { text: "$KC_0$", why: "Only if the slab fills the whole gap." },
      { text: "$\\dfrac{K}{2}C_0$", why: "Ignores the air gap in series." },
    ],
    solution: "$C = \\dfrac{\\varepsilon_0A}{d - t + t/K}$ with $t = d/2$: $C = \\dfrac{\\varepsilon_0A}{\\frac d2\\left(1 + \\frac1K\\right)} = \\dfrac{2K}{K+1}\\cdot\\dfrac{\\varepsilon_0A}{d} = \\dfrac{2K}{K+1}C_0$.",
    concept: "Partially filled capacitor", formula: "$C = \\dfrac{\\varepsilon_0A}{d - t + t/K}$", whyFormula: "Air layer and dielectric layer act in series.", mistakes: "Using the parallel arrangement formula.",
  },
  {
    topic: "capacitors", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 75, answer: 4,
    statement: "A $2\\,\\mu\\text{F}$ capacitor is charged through a $1\\,\\text{M}\\Omega$ resistor from a battery. Find the time (in seconds) for the charge to reach $\\left(1 - \\dfrac{1}{e^2}\\right)$ of its final value.",
    solution: "$q = Q(1 - e^{-t/\\tau})$, $\\tau = RC = 10^6\\times2\\times10^{-6} = 2\\,\\text{s}$. $1 - e^{-t/\\tau} = 1 - e^{-2} \\Rightarrow t = 2\\tau = 4\\,\\text{s}$.",
    concept: "RC charging", formula: "$q = Q(1 - e^{-t/RC})$", whyFormula: "Charging through a resistor is exponential.", mistakes: "Answering $\\tau$ instead of $2\\tau$.",
  },
  {
    topic: "capacitors", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 120, answer: 4,
    statement: "A $4\\,\\mu\\text{F}$ capacitor is charged to $50\\,\\text{V}$ and disconnected from the battery. A dielectric slab of $K = 5$ is then inserted to fill the gap completely. Find the decrease in stored energy in millijoules.",
    solution: "$Q = CV = 200\\,\\mu\\text{C}$ (constant). Initial $U = \\dfrac{Q^2}{2C} = \\dfrac{(200\\times10^{-6})^2}{2\\times4\\times10^{-6}} = 5\\,\\text{mJ}$. Final $C' = 20\\,\\mu\\text{F}$: $U' = \\dfrac{Q^2}{2C'} = 1\\,\\text{mJ}$. Decrease $= 4\\,\\text{mJ}$.",
    concept: "Dielectric with isolated capacitor", formula: "$U = \\dfrac{Q^2}{2C}$", whyFormula: "$Q$ is fixed after disconnection, so use the $Q$ form.", alt: "$U' = U/K$; decrease $= U(1 - 1/K) = 5\\times0.8 = 4\\,\\text{mJ}$.", mistakes: "Using $\\tfrac12CV^2$ with the old $V$.",
  },
  {
    topic: "capacitors", level: 5, difficulty: "HARD", type: "MCQ", time: 120,
    statement: "Two identical capacitors are connected in parallel and charged to potential $V$; the battery is then removed. A dielectric of constant $K$ is inserted into one of them. The new common potential is:",
    options: [
      { text: "$\\dfrac{2V}{K + 1}$", correct: true, why: "Total charge $2CV$ over total capacitance $(1 + K)C$." },
      { text: "$\\dfrac VK$", why: "Ignores the second (unfilled) capacitor." },
      { text: "$\\dfrac{(K + 1)V}{2}$", why: "Inverted ratio." },
      { text: "$V$", why: "Charge redistributes; potential must fall." },
    ],
    solution: "Total charge $Q = 2CV$ is conserved. New total capacitance $= C + KC$. Common potential $= \\dfrac{2CV}{(1 + K)C} = \\dfrac{2V}{K + 1}$.",
    concept: "Charge conservation in isolated networks", formula: "$V = \\dfrac{Q_{\\text{total}}}{C_{\\text{total}}}$", whyFormula: "Parallel capacitors share one potential.", mistakes: "Assuming each capacitor keeps its own charge.",
  },

  // ── Ray optics ──
  {
    topic: "ray-optics", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The critical angle for light going from a medium of refractive index $\\sqrt2$ into air is:",
    options: [
      { text: "$30^\\circ$", why: "$\\sin30^\\circ = 1/2$, needs $n = 2$." },
      { text: "$45^\\circ$", correct: true, why: "$\\sin C = 1/\\sqrt2$." },
      { text: "$60^\\circ$", why: "Needs $n = 2/\\sqrt3$." },
      { text: "$90^\\circ$", why: "Only if $n = 1$." },
    ],
    solution: "$\\sin C = \\dfrac1n = \\dfrac1{\\sqrt2} \\Rightarrow C = 45^\\circ$.",
    concept: "Total internal reflection", formula: "$\\sin C = 1/n$", whyFormula: "Denser medium to air.", mistakes: "Using $\\cos$ or $\\tan$.",
  },
  {
    topic: "ray-optics", level: 1, difficulty: "EASY", type: "MCQ", time: 40,
    statement: "An object is placed $30\\,\\text{cm}$ in front of a concave mirror of focal length $15\\,\\text{cm}$. The image is:",
    options: [
      { text: "real, inverted, same size, at 30 cm", correct: true, why: "Object at centre of curvature ($2f$)." },
      { text: "virtual, upright, magnified", why: "Needs the object inside $F$." },
      { text: "real, inverted, diminished, between F and C", why: "Needs the object beyond $C$." },
      { text: "at infinity", why: "Needs the object at $F$." },
    ],
    solution: "$u = -30$, $f = -15$: $\\dfrac1v = \\dfrac1f - \\dfrac1u = -\\dfrac1{15} + \\dfrac1{30} = -\\dfrac1{30} \\Rightarrow v = -30\\,\\text{cm}$; $m = -v/u = -1$.",
    concept: "Mirror formula", formula: "$\\dfrac1v + \\dfrac1u = \\dfrac1f$", whyFormula: "Locate image of a real object.", mistakes: "Sign convention errors.",
  },
  {
    topic: "ray-optics", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 4,
    statement: "Find the power (in dioptres) of a convex lens of focal length $25\\,\\text{cm}$.",
    solution: "$P = \\dfrac{1}{f(\\text{m})} = \\dfrac1{0.25} = +4\\,\\text{D}$.",
    concept: "Power of a lens", formula: "$P = 1/f$ (metres)", whyFormula: "Definition of power.", mistakes: "Using centimetres.",
  },
  {
    topic: "ray-optics", level: 2, difficulty: "EASY", type: "MCQ", time: 40,
    statement: "A coin lies at the bottom of water ($n = 4/3$) of depth $12\\,\\text{cm}$. Viewed from directly above, it appears to be at a depth of:",
    options: [
      { text: "$9\\,\\text{cm}$", correct: true, why: "$12/(4/3) = 9$." },
      { text: "$16\\,\\text{cm}$", why: "Multiplies instead of divides." },
      { text: "$12\\,\\text{cm}$", why: "Ignores refraction." },
      { text: "$3\\,\\text{cm}$", why: "That is the apparent shift, not depth." },
    ],
    solution: "Apparent depth $= \\dfrac{\\text{real depth}}{n} = \\dfrac{12}{4/3} = 9\\,\\text{cm}$.",
    concept: "Apparent depth", formula: "$d' = d/n$", whyFormula: "Near-normal viewing.", mistakes: "Confusing shift (3 cm) with apparent depth.",
  },
  {
    topic: "ray-optics", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 60,
    statement: "An object is placed $30\\,\\text{cm}$ from a convex lens of focal length $20\\,\\text{cm}$. Find the image distance in cm.",
    solution: "$u = -30$, $f = +20$: $\\dfrac1v = \\dfrac1f + \\dfrac1u = \\dfrac1{20} - \\dfrac1{30} = \\dfrac1{60} \\Rightarrow v = 60\\,\\text{cm}$ (real, on the other side, $m = -2$).",
    concept: "Thin lens formula", formula: "$\\dfrac1v - \\dfrac1u = \\dfrac1f$", whyFormula: "Locate the image of a real object.", mistakes: "Using the mirror formula sign.",
  },
  {
    topic: "ray-optics", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Two thin lenses of powers $+10\\,\\text{D}$ and $-5\\,\\text{D}$ are placed in contact. The focal length of the combination is:",
    options: [
      { text: "$+20\\,\\text{cm}$", correct: true, why: "$P = +5$ D." },
      { text: "$+6.7\\,\\text{cm}$", why: "Adds focal lengths incorrectly." },
      { text: "$-20\\,\\text{cm}$", why: "Sign error." },
      { text: "$+15\\,\\text{cm}$", why: "Arithmetic slip." },
    ],
    solution: "$P = P_1 + P_2 = 10 - 5 = 5\\,\\text{D} \\Rightarrow f = \\dfrac15\\,\\text{m} = 20\\,\\text{cm}$ (converging).",
    concept: "Lenses in contact", formula: "$P = P_1 + P_2$", whyFormula: "Powers add for thin lenses in contact.", mistakes: "Adding focal lengths.",
  },
  {
    topic: "ray-optics", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "A prism of angle $60^\\circ$ produces a minimum deviation of $30^\\circ$. Its refractive index is:",
    options: [
      { text: "$\\sqrt2$", correct: true, why: "$\\sin45^\\circ/\\sin30^\\circ$." },
      { text: "$\\sqrt3$", why: "Uses $\\sin60^\\circ/\\sin30^\\circ$." },
      { text: "$1.5$", why: "Typical glass value, not computed." },
      { text: "$\\dfrac{\\sqrt3}{2}$", why: "Less than 1 — impossible." },
    ],
    solution: "$n = \\dfrac{\\sin\\frac{A + \\delta_m}2}{\\sin\\frac A2} = \\dfrac{\\sin45^\\circ}{\\sin30^\\circ} = \\dfrac{1/\\sqrt2}{1/2} = \\sqrt2$.",
    concept: "Prism at minimum deviation", formula: "$n = \\dfrac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac A2}$", whyFormula: "Symmetric passage at minimum deviation.", mistakes: "Forgetting to halve the angles.",
  },
  {
    topic: "ray-optics", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 50,
    statement: "A glass lens ($n = 1.5$) has focal length $20\\,\\text{cm}$ in air. Find its focal length (in cm) when immersed in a liquid of refractive index $1.25$.",
    solution: "$\\dfrac1f \\propto \\left(\\dfrac{n_g}{n_m} - 1\\right)$. In air: $0.5$. In liquid: $\\dfrac{1.5}{1.25} - 1 = 0.2$. $f' = 20\\times\\dfrac{0.5}{0.2} = 50\\,\\text{cm}$.",
    concept: "Lens maker's formula in a medium", formula: "$\\dfrac1f = \\left(\\dfrac{n_g}{n_m} - 1\\right)\\left(\\dfrac1{R_1} - \\dfrac1{R_2}\\right)$", whyFormula: "Radii unchanged; only the relative index changes.", mistakes: "Using $n_g - n_m$.",
  },
  {
    topic: "ray-optics", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 90, answer: 20,
    statement: "An object and a screen are $90\\,\\text{cm}$ apart. A convex lens placed between them forms a sharp image on the screen at two positions $30\\,\\text{cm}$ apart. Find the focal length in cm.",
    solution: "Displacement method: $f = \\dfrac{D^2 - d^2}{4D} = \\dfrac{8100 - 900}{360} = 20\\,\\text{cm}$.",
    concept: "Displacement method", formula: "$f = \\dfrac{D^2 - d^2}{4D}$", whyFormula: "Two conjugate positions with $u$ and $v$ interchanged.", alt: "Positions: $u + v = 90$, $v - u = 30$ ⇒ $u = 30$, $v = 60$; $f = \\frac{uv}{u+v} = 20$.", mistakes: "Using $D^2 + d^2$.",
  },
  {
    topic: "ray-optics", level: 5, difficulty: "HARD", type: "MCQ", time: 120,
    statement: "An equiconvex lens ($n = 1.5$, radius of each surface $20\\,\\text{cm}$) is silvered on one face. It behaves as a mirror of focal length:",
    options: [
      { text: "$5\\,\\text{cm}$ (concave)", correct: true, why: "$\\frac1F = \\frac2{f_l} + \\frac1{f_m} = \\frac2{20} + \\frac1{10}$." },
      { text: "$10\\,\\text{cm}$", why: "Only the mirror surface." },
      { text: "$20\\,\\text{cm}$", why: "Only the lens." },
      { text: "$6.67\\,\\text{cm}$", why: "Counts the lens once instead of twice." },
    ],
    solution: "Lens: $\\dfrac1{f_l} = 0.5\\left(\\dfrac2{20}\\right) \\Rightarrow f_l = 20\\,\\text{cm}$. Silvered surface: concave mirror $f_m = R/2 = 10\\,\\text{cm}$. Light passes the lens twice: $\\dfrac1F = \\dfrac2{f_l} + \\dfrac1{f_m} = \\dfrac1{10} + \\dfrac1{10} = \\dfrac15 \\Rightarrow F = 5\\,\\text{cm}$ (converging, like a concave mirror).",
    concept: "Silvered lens", formula: "$\\dfrac1F = \\dfrac2{f_l} + \\dfrac1{f_m}$", whyFormula: "Refraction, reflection, refraction again.", mistakes: "Counting the lens only once.",
  },
];
