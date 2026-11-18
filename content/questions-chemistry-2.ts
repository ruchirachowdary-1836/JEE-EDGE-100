import type { QuestionSeed } from "./types";

// Original practice questions written for JEE EDGE 100 (not previous-year questions). 25 °C unless stated.

export const CHEMISTRY_QUESTIONS_2: QuestionSeed[] = [
  // ── Ionic equilibrium ──
  {
    topic: "ionic-equilibrium", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The pH of $0.001\\,\\text{M}$ HCl is:",
    options: [
      { text: "3", correct: true, why: "$[H^+] = 10^{-3}$." },
      { text: "11", why: "That is the pOH." },
      { text: "0.001", why: "That is the concentration, not pH." },
      { text: "1", why: "Wrong power of ten." },
    ],
    solution: "Strong acid, fully ionised: $[H^+] = 10^{-3}\\,\\text{M}$, pH $= 3$.",
    concept: "pH of a strong acid", formula: "pH $= -\\log[H^+]$", whyFormula: "Direct definition.", mistakes: "Confusing pH and pOH.",
  },
  {
    topic: "ionic-equilibrium", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The conjugate base of $\\text{HSO}_4^-$ is:",
    options: [
      { text: "$\\text{SO}_4^{2-}$", correct: true, why: "Remove one H⁺." },
      { text: "$\\text{H}_2\\text{SO}_4$", why: "That is its conjugate acid." },
      { text: "$\\text{OH}^-$", why: "Unrelated species." },
      { text: "$\\text{SO}_3^{2-}$", why: "Different oxidation state of S." },
    ],
    solution: "Conjugate base = acid minus one proton: $\\text{HSO}_4^- \\to \\text{SO}_4^{2-} + \\text{H}^+$.",
    concept: "Brønsted–Lowry pairs", formula: "Acid ⇌ conjugate base + H⁺", whyFormula: "Definition.", mistakes: "Adding instead of removing H⁺.",
  },
  {
    topic: "ionic-equilibrium", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 40, answer: 12,
    statement: "Find the pH of $0.01\\,\\text{M}$ NaOH at $25^\\circ\\text{C}$.",
    solution: "$[OH^-] = 10^{-2}$, pOH $= 2$, pH $= 14 - 2 = 12$.",
    concept: "pH of a strong base", formula: "pH + pOH = 14", whyFormula: "Convert from pOH.", mistakes: "Reporting pOH.",
  },
  {
    topic: "ionic-equilibrium", level: 2, difficulty: "EASY", type: "MCQ", time: 40,
    statement: "Which aqueous salt solution is basic?",
    options: [
      { text: "$\\text{CH}_3\\text{COONa}$", correct: true, why: "Salt of weak acid + strong base; acetate hydrolyses to give OH⁻." },
      { text: "NaCl", why: "Strong acid + strong base: neutral." },
      { text: "$\\text{NH}_4\\text{Cl}$", why: "Strong acid + weak base: acidic." },
      { text: "$\\text{KNO}_3$", why: "Neutral." },
    ],
    solution: "$\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-$, so the solution is basic.",
    concept: "Salt hydrolysis", formula: "Weak acid–strong base salt → pH > 7", whyFormula: "Only the weak partner's ion hydrolyses.", mistakes: "Assuming all salts are neutral.",
  },
  {
    topic: "ionic-equilibrium", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 3,
    statement: "Find the pH of $0.1\\,\\text{M}$ solution of a weak monobasic acid with $K_a = 10^{-5}$.",
    solution: "$[H^+] = \\sqrt{K_aC} = \\sqrt{10^{-5}\\times10^{-1}} = 10^{-3}$; pH $= 3$.",
    concept: "Weak acid ionisation", formula: "$[H^+] = \\sqrt{K_aC}$", whyFormula: "$\\alpha \\ll 1$ (here 1%).", alt: "pH $= \\tfrac12(\\text{p}K_a - \\log C) = \\tfrac12(5 + 1) = 3$.", mistakes: "Using $K_aC$ without the square root.",
  },
  {
    topic: "ionic-equilibrium", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "A buffer contains $0.1\\,\\text{M}$ acetic acid and $0.1\\,\\text{M}$ sodium acetate (p$K_a$ = 4.74). Its pH is:",
    options: [
      { text: "4.74", correct: true, why: "Equal concentrations ⇒ pH = p$K_a$." },
      { text: "7", why: "A buffer of a weak acid is not neutral." },
      { text: "2.87", why: "pH of the acid alone." },
      { text: "9.26", why: "That is p$K_b$ of acetate." },
    ],
    solution: "Henderson: pH $= \\text{p}K_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]} = 4.74 + \\log1 = 4.74$.",
    concept: "Acidic buffer", formula: "pH $= \\text{p}K_a + \\log\\dfrac{[A^-]}{[HA]}$", whyFormula: "Weak acid with its conjugate base.", mistakes: "Treating the buffer as a pure acid.",
  },
  {
    topic: "ionic-equilibrium", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 1,
    statement: "A sparingly soluble salt $\\text{AB}_2$ has $K_{sp} = 4\\times10^{-12}$. Its solubility is $x\\times10^{-4}\\,\\text{mol L}^{-1}$. Find $x$.",
    solution: "$\\text{AB}_2 \\rightleftharpoons A^{2+} + 2B^-$: $K_{sp} = s(2s)^2 = 4s^3 = 4\\times10^{-12} \\Rightarrow s^3 = 10^{-12} \\Rightarrow s = 10^{-4}$. So $x = 1$.",
    concept: "Solubility product", formula: "$K_{sp} = 4s^3$ for AB₂", whyFormula: "Stoichiometry of dissolution.", mistakes: "Writing $K_{sp} = s^2$ or $2s^3$.",
  },
  {
    topic: "ionic-equilibrium", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "The solubility of AgCl ($K_{sp} = 1.8\\times10^{-10}$) in $0.1\\,\\text{M}$ NaCl is approximately:",
    options: [
      { text: "$1.8\\times10^{-9}\\,\\text{M}$", correct: true, why: "$s = K_{sp}/[\\text{Cl}^-] = 1.8\\times10^{-10}/0.1$." },
      { text: "$1.34\\times10^{-5}\\,\\text{M}$", why: "Solubility in pure water." },
      { text: "$1.8\\times10^{-11}\\,\\text{M}$", why: "Multiplied instead of divided." },
      { text: "$0.1\\,\\text{M}$", why: "That is [Cl⁻] from NaCl." },
    ],
    solution: "Common ion: $[\\text{Cl}^-] \\approx 0.1$. $s = \\dfrac{K_{sp}}{0.1} = 1.8\\times10^{-9}\\,\\text{M}$ — far less than in pure water.",
    concept: "Common ion effect", formula: "$s = K_{sp}/[\\text{common ion}]$", whyFormula: "Added Cl⁻ dominates.", mistakes: "Ignoring the common ion.",
  },
  {
    topic: "ionic-equilibrium", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 90, answer: 9,
    statement: "Find the pH of $0.1\\,\\text{M}$ sodium acetate if $K_a$ of acetic acid is $10^{-5}$.",
    solution: "pH $= 7 + \\tfrac12(\\text{p}K_a + \\log C) = 7 + \\tfrac12(5 - 1) = 9$.",
    concept: "Hydrolysis of a weak-acid salt", formula: "pH $= 7 + \\tfrac12(\\text{p}K_a + \\log C)$", whyFormula: "Anion hydrolysis produces OH⁻.", alt: "$K_h = K_w/K_a = 10^{-9}$; $[OH^-] = \\sqrt{K_hC} = 10^{-5}$, pOH 5, pH 9.", mistakes: "Sign of $\\log C$.",
  },
  {
    topic: "ionic-equilibrium", level: 5, difficulty: "HARD", type: "MCQ", time: 90,
    statement: "$50\\,\\text{mL}$ of $0.1\\,\\text{M}$ HCl is mixed with $50\\,\\text{mL}$ of $0.2\\,\\text{M}$ NaOH. The pH of the mixture is about ($\\log5 = 0.7$):",
    options: [
      { text: "12.7", correct: true, why: "Excess OH⁻ = 0.05 M." },
      { text: "13", why: "Ignores dilution to 100 mL." },
      { text: "12.3", why: "Sign slip in pOH." },
      { text: "7", why: "Not equimolar." },
    ],
    solution: "HCl: 5 mmol; NaOH: 10 mmol. Excess OH⁻ = 5 mmol in 100 mL = $0.05\\,\\text{M}$. pOH $= -\\log(5\\times10^{-2}) = 1.3$; pH $= 12.7$.",
    concept: "Mixing strong acid and base", formula: "Excess moles / total volume", whyFormula: "Neutralisation is complete; only the excess sets pH.", mistakes: "Forgetting the total volume.",
  },

  // ── Electrochemical cells ──
  {
    topic: "electrochemical-cells", level: 1, difficulty: "EASY", type: "MCQ", time: 25,
    statement: "In a galvanic cell, oxidation occurs at the:",
    options: [
      { text: "anode", correct: true, why: "AN OX — anode oxidation." },
      { text: "cathode", why: "Reduction occurs there." },
      { text: "salt bridge", why: "It only conducts ions." },
      { text: "both electrodes", why: "Each electrode hosts one half-reaction." },
    ],
    solution: "Anode: oxidation (negative terminal in a galvanic cell); cathode: reduction.",
    concept: "Electrodes", formula: "AN OX, RED CAT", whyFormula: "Definition.", mistakes: "Linking the anode with a positive sign in all cells.",
  },
  {
    topic: "electrochemical-cells", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "$E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = -0.76\\,\\text{V}$ and $E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) = +0.34\\,\\text{V}$. $E^\\circ$ of the Daniell cell is:",
    options: [
      { text: "1.10 V", correct: true, why: "$0.34 - (-0.76)$." },
      { text: "0.42 V", why: "Added the values." },
      { text: "−1.10 V", why: "Reversed anode and cathode." },
      { text: "0.76 V", why: "Only the zinc electrode." },
    ],
    solution: "$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.34 - (-0.76) = 1.10\\,\\text{V}$.",
    concept: "Standard cell potential", formula: "$E^\\circ = E^\\circ_c - E^\\circ_a$", whyFormula: "Reduction potentials are tabulated.", mistakes: "Adding potentials.",
  },
  {
    topic: "electrochemical-cells", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 212.3, tolerance: 0.5,
    statement: "For the Daniell cell ($E^\\circ = 1.10\\,\\text{V}$, $n = 2$), find $-\\Delta G^\\circ$ in kJ/mol ($F = 96500\\,\\text{C mol}^{-1}$).",
    solution: "$\\Delta G^\\circ = -nFE^\\circ = -2\\times96500\\times1.10 = -212\\,300\\,\\text{J} = -212.3\\,\\text{kJ/mol}$.",
    concept: "Gibbs energy and EMF", formula: "$\\Delta G^\\circ = -nFE^\\circ$", whyFormula: "Electrical work = $nFE$.", mistakes: "Forgetting $n$ or units.",
  },
  {
    topic: "electrochemical-cells", level: 2, difficulty: "EASY", type: "MCQ", time: 35,
    statement: "Using $E^\\circ$ values F₂/F⁻ = +2.87 V, Cl₂/Cl⁻ = +1.36 V, Ag⁺/Ag = +0.80 V, Zn²⁺/Zn = −0.76 V, the strongest oxidising agent is:",
    options: [
      { text: "F₂", correct: true, why: "Highest reduction potential." },
      { text: "Cl₂", why: "Lower $E^\\circ$ than F₂." },
      { text: "Ag⁺", why: "Lower still." },
      { text: "Zn", why: "Zn is a reducing agent." },
    ],
    solution: "The species most easily reduced (highest $E^\\circ_{\\text{red}}$) is the strongest oxidant: F₂.",
    concept: "Electrochemical series", formula: "Higher $E^\\circ$ ⇒ stronger oxidant", whyFormula: "Oxidants get reduced.", mistakes: "Choosing Zn²⁺.",
  },
  {
    topic: "electrochemical-cells", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 177.3, tolerance: 1,
    statement: "A hydrogen electrode ($p_{\\text{H}_2} = 1$ bar) dips in a solution of pH 3 at 298 K. Find the magnitude of its electrode (reduction) potential in mV.",
    solution: "$E = -0.0591\\times\\text{pH} = -0.0591\\times3 = -0.1773\\,\\text{V}$; magnitude $177.3\\,\\text{mV}$.",
    concept: "Nernst equation for the hydrogen electrode", formula: "$E = -0.0591\\,\\text{pH}$", whyFormula: "From $E = 0 - \\frac{0.0591}{1}\\log\\frac{1}{[H^+]}$.", mistakes: "Sign and V→mV conversion.",
  },
  {
    topic: "electrochemical-cells", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "The EMF of the concentration cell $\\text{Cu}|\\text{Cu}^{2+}(0.01\\,\\text{M})\\|\\text{Cu}^{2+}(1\\,\\text{M})|\\text{Cu}$ at 298 K is:",
    options: [
      { text: "0.0591 V", correct: true, why: "$\\frac{0.0591}{2}\\log100$." },
      { text: "0.118 V", why: "Used $n = 1$." },
      { text: "0.0295 V", why: "Used $\\log10$." },
      { text: "0 V", why: "$E^\\circ = 0$ but concentrations differ." },
    ],
    solution: "$E = \\dfrac{0.0591}{n}\\log\\dfrac{C_{\\text{cathode}}}{C_{\\text{anode}}} = \\dfrac{0.0591}{2}\\log\\dfrac{1}{0.01} = \\dfrac{0.0591}{2}\\times2 = 0.0591\\,\\text{V}$.",
    concept: "Concentration cells", formula: "$E = \\dfrac{0.0591}n\\log\\dfrac{C_2}{C_1}$", whyFormula: "Same electrode, different concentrations.", mistakes: "Wrong $n$.",
  },
  {
    topic: "electrochemical-cells", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 37.2, tolerance: 0.2,
    statement: "Find $\\log K$ for the Daniell cell reaction at 298 K ($E^\\circ = 1.10\\,\\text{V}$, $n = 2$).",
    solution: "$\\log K = \\dfrac{nE^\\circ}{0.0591} = \\dfrac{2\\times1.10}{0.0591} \\approx 37.2$.",
    concept: "Equilibrium constant from $E^\\circ$", formula: "$\\log K = \\dfrac{nE^\\circ}{0.0591}$", whyFormula: "At equilibrium $E = 0$.", mistakes: "Using $\\ln$ with 0.0591.",
  },
  {
    topic: "electrochemical-cells", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 75,
    statement: "For $\\text{Zn}|\\text{Zn}^{2+}(0.1\\,\\text{M})\\|\\text{Cu}^{2+}(1\\,\\text{M})|\\text{Cu}$ ($E^\\circ = 1.10\\,\\text{V}$), the EMF at 298 K is about:",
    options: [
      { text: "1.13 V", correct: true, why: "$1.10 - 0.0295\\log0.1$." },
      { text: "1.07 V", why: "Sign error in log term." },
      { text: "1.10 V", why: "Ignores concentrations." },
      { text: "1.16 V", why: "Used $n = 1$." },
    ],
    solution: "$Q = \\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} = 0.1$. $E = 1.10 - \\dfrac{0.0591}{2}\\log0.1 = 1.10 + 0.0296 \\approx 1.13\\,\\text{V}$.",
    concept: "Nernst equation", formula: "$E = E^\\circ - \\dfrac{0.0591}n\\log Q$", whyFormula: "Non-standard concentrations.", mistakes: "Inverting $Q$.",
  },
  {
    topic: "electrochemical-cells", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 120, answer: -36.7, tolerance: 0.5,
    statement: "Given $E^\\circ(\\text{Fe}^{3+}/\\text{Fe}^{2+}) = 0.77\\,\\text{V}$ and $E^\\circ(\\text{Fe}^{2+}/\\text{Fe}) = -0.44\\,\\text{V}$, find $E^\\circ(\\text{Fe}^{3+}/\\text{Fe})$ in millivolts.",
    solution: "Add Gibbs energies, not potentials: $-3FE_3^\\circ = -1F(0.77) - 2F(-0.44)$. $E_3^\\circ = \\dfrac{0.77 - 0.88}{3} = -0.0367\\,\\text{V} = -36.7\\,\\text{mV}$.",
    concept: "Combining electrode potentials", formula: "$n_3E_3^\\circ = n_1E_1^\\circ + n_2E_2^\\circ$", whyFormula: "$\\Delta G^\\circ$ is additive; $E^\\circ$ is intensive.", mistakes: "Simply adding 0.77 and −0.44.",
  },
  {
    topic: "electrochemical-cells", level: 5, difficulty: "HARD", type: "MCQ", time: 60,
    statement: "Which metal liberates hydrogen from dilute HCl under standard conditions?",
    options: [
      { text: "Zn ($E^\\circ = -0.76$ V)", correct: true, why: "Negative $E^\\circ$: Zn reduces H⁺." },
      { text: "Cu ($E^\\circ = +0.34$ V)", why: "Below hydrogen in reducing power." },
      { text: "Ag ($E^\\circ = +0.80$ V)", why: "Cannot reduce H⁺." },
      { text: "Au ($E^\\circ = +1.50$ V)", why: "Noble metal." },
    ],
    solution: "Zn + 2H⁺ → Zn²⁺ + H₂ has $E^\\circ = 0 - (-0.76) = +0.76\\,\\text{V} > 0$, so it is spontaneous. The others give negative $E^\\circ_{\\text{cell}}$.",
    concept: "Feasibility from $E^\\circ$", formula: "$E^\\circ_{\\text{cell}} > 0$ ⇒ spontaneous", whyFormula: "Compare with the SHE.", mistakes: "Choosing metals with positive $E^\\circ$.",
  },
];
