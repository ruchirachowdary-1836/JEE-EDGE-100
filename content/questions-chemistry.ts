import type { QuestionSeed } from "./types";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).

export const CHEMISTRY_QUESTIONS: QuestionSeed[] = [
  // ── Bohr model and hydrogen spectrum ──
  {
    topic: "bohr-model-hydrogen-spectrum", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The Balmer series of the hydrogen spectrum lies in the:",
    options: [
      { text: "ultraviolet region", why: "That is the Lyman series ($n_1 = 1$)." },
      { text: "visible region", correct: true, why: "Balmer lines ($n_1 = 2$) include 656 nm (red), 486 nm, 434 nm, 410 nm." },
      { text: "infrared region", why: "Paschen, Brackett and Pfund lie in the infrared." },
      { text: "microwave region", why: "No hydrogen electronic series lies there." },
    ],
    solution: "Transitions ending at $n_1 = 2$ (Balmer) emit photons of 1.9–3.4 eV, i.e. wavelengths between about 365 nm and 656 nm — mostly visible.",
    concept: "Spectral series of hydrogen", formula: "$\\dfrac1\\lambda = R_H\\left(\\dfrac1{2^2} - \\dfrac1{n_2^2}\\right)$", whyFormula: "Balmer is defined by $n_1 = 2$.", mistakes: "Mixing up Lyman (UV) and Balmer (visible).",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "As the principal quantum number $n$ increases, the energy of the electron in a hydrogen atom:",
    options: [
      { text: "increases (becomes less negative)", correct: true, why: "$E_n = -13.6/n^2$ approaches 0 from below." },
      { text: "decreases (becomes more negative)", why: "$-13.6/n^2$ grows toward zero as $n$ increases." },
      { text: "remains the same", why: "Energy depends on $n$." },
      { text: "first increases then decreases", why: "$E_n$ is monotonic in $n$." },
    ],
    solution: "$E_n = -13.6/n^2$ eV: $E_1 = -13.6$, $E_2 = -3.4$, $E_3 = -1.51$ … the values rise toward zero.",
    concept: "Bohr energy levels", formula: "$E_n = -13.6\\,Z^2/n^2$ eV", whyFormula: "Direct dependence on $n$.", mistakes: "Reading the magnitude instead of the signed value.",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 54.4, tolerance: 0.1,
    statement: "Find the ionisation energy (in eV) of He⁺ in its ground state.",
    solution: "$E_1 = -13.6\\times\\dfrac{Z^2}{1^2} = -13.6\\times4 = -54.4\\,\\text{eV}$. Ionisation energy $= 54.4\\,\\text{eV}$.",
    concept: "Ionisation energy of a hydrogen-like ion", formula: "$IE = 13.6\\,Z^2/n^2$ eV", whyFormula: "He⁺ has one electron, so the Bohr formula applies.", mistakes: "Using $Z$ instead of $Z^2$ (gives 27.2 eV).",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 2, difficulty: "EASY", type: "MCQ", time: 45,
    statement: "The ratio of the radius of the second Bohr orbit of He⁺ to the radius of the first Bohr orbit of H is:",
    options: [
      { text: "2", correct: true, why: "$r \\propto n^2/Z$: $(4/2)/(1/1) = 2$." },
      { text: "4", why: "Ignores the $Z$ in the denominator." },
      { text: "1", why: "Ignores the $n^2$ factor." },
      { text: "1/2", why: "Inverts the ratio." },
    ],
    solution: "$r_n = 0.529\\,n^2/Z$ Å. He⁺, $n = 2$: $0.529\\times4/2 = 1.058$ Å. H, $n = 1$: $0.529$ Å. Ratio $= 2$.",
    concept: "Bohr radius scaling", formula: "$r_n = 0.529\\,n^2/Z$ Å", whyFormula: "Both $n$ and $Z$ change.", mistakes: "Using $Z^2$ instead of $Z$ for radius.",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 10,
    statement: "A sample of hydrogen atoms is excited to $n = 5$. How many different spectral lines can be emitted as the electrons return to the ground state?",
    solution: "Number of lines $= \\dfrac{n(n-1)}{2} = \\dfrac{5\\times4}{2} = 10$.",
    concept: "Number of spectral lines", formula: "$N = n(n-1)/2$", whyFormula: "A *sample* contains many atoms, so every possible pair of levels can produce a line.", mistakes: "Using $n - 1 = 4$, which is the maximum for a single atom.",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 75,
    statement: "The ratio of the wavelength of the first line of the Lyman series to that of the first line of the Balmer series of hydrogen is:",
    options: [
      { text: "5 : 27", correct: true, why: "$\\lambda \\propto 1/(\\text{wave number})$: $(5/36)/(3/4) = 5/27$." },
      { text: "27 : 5", why: "Inverts the ratio — Lyman has the shorter wavelength." },
      { text: "3 : 4", why: "Uses only the Lyman wave-number factor." },
      { text: "4 : 9", why: "Uses $n_1^2$ values only." },
    ],
    solution: "Lyman first line ($2 \\to 1$): $\\bar\\nu = R(1 - \\tfrac14) = \\tfrac34R$. Balmer first line ($3 \\to 2$): $\\bar\\nu = R(\\tfrac14 - \\tfrac19) = \\tfrac5{36}R$. $\\dfrac{\\lambda_L}{\\lambda_B} = \\dfrac{5/36}{3/4} = \\dfrac{5}{27}$.",
    concept: "Rydberg formula", formula: "$\\dfrac1\\lambda = R_H\\left(\\dfrac1{n_1^2} - \\dfrac1{n_2^2}\\right)$", whyFormula: "Wavelength ratios need wave numbers of both lines.", mistakes: "Forgetting that wavelength is the reciprocal of wave number.",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "Which transition in He⁺ emits light of the same wavelength as the $n = 2 \\to n = 1$ transition in hydrogen?",
    options: [
      { text: "$n = 4 \\to n = 2$", correct: true, why: "$4(\\tfrac14 - \\tfrac1{16}) = \\tfrac34$, matching hydrogen's $1 - \\tfrac14$." },
      { text: "$n = 2 \\to n = 1$", why: "Gives $4\\times\\tfrac34 = 3$, four times hydrogen's value." },
      { text: "$n = 3 \\to n = 2$", why: "Gives $4\\times\\tfrac5{36} = \\tfrac59$." },
      { text: "$n = 4 \\to n = 3$", why: "Gives $4\\times\\tfrac7{144} = \\tfrac7{36}$." },
    ],
    solution: "Need $Z^2\\left(\\dfrac1{n_1^2} - \\dfrac1{n_2^2}\\right)$ equal for both. Hydrogen: $1\\times\\tfrac34$. He⁺ ($Z^2 = 4$): need $\\dfrac1{n_1^2} - \\dfrac1{n_2^2} = \\dfrac3{16}$, satisfied by $n_1 = 2, n_2 = 4$.",
    concept: "Scaling of spectra with Z", formula: "$\\dfrac1\\lambda = R_HZ^2\\left(\\dfrac1{n_1^2} - \\dfrac1{n_2^2}\\right)$", whyFormula: "Equal wavelengths mean equal right-hand sides.", alt: "Doubling both quantum numbers divides each term by 4, cancelling $Z^2 = 4$.",
    mistakes: "Matching quantum numbers directly without the $Z^2$ factor.",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "The speed of the electron in the third orbit of Li²⁺ compared with its speed in the first orbit of H is:",
    options: [
      { text: "equal", correct: true, why: "$v \\propto Z/n$: $3/3 = 1/1$." },
      { text: "three times", why: "Ignores the $n$ in the denominator." },
      { text: "one-third", why: "Ignores $Z$." },
      { text: "nine times", why: "Uses $Z^2$ (the energy scaling)." },
    ],
    solution: "$v_n = 2.18\\times10^6\\,Z/n$ m s⁻¹. Li²⁺, $n = 3$: $Z/n = 3/3 = 1$. H, $n = 1$: $Z/n = 1$. The speeds are equal.",
    concept: "Bohr velocity scaling", formula: "$v_n \\propto Z/n$", whyFormula: "Both $Z$ and $n$ change between the two cases.", mistakes: "Using energy scaling ($Z^2/n^2$) for speed.",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 90, answer: 6,
    statement: "Electrons in a sample of hydrogen atoms are in an excited state of energy $-0.85\\,\\text{eV}$. How many different spectral lines can be emitted as they return to the ground state?",
    solution: "$-13.6/n^2 = -0.85 \\Rightarrow n^2 = 16 \\Rightarrow n = 4$. Number of lines $= \\dfrac{4\\times3}{2} = 6$.",
    concept: "Energy levels and spectral lines", formula: "$E_n = -13.6/n^2$ eV, $N = n(n-1)/2$", whyFormula: "First identify the level from its energy, then count transitions.", mistakes: "Stopping at $n = 4$ and answering 4, or using $n - 1 = 3$.",
  },
  {
    topic: "bohr-model-hydrogen-spectrum", level: 5, difficulty: "HARD", type: "MCQ", time: 90,
    statement: "The shortest wavelength of the Balmer series of hydrogen is $\\lambda$. The shortest wavelength of the Lyman series of He⁺ is:",
    options: [
      { text: "$\\lambda/16$", correct: true, why: "Wave numbers are $R/4$ and $4R$; ratio 16." },
      { text: "$\\lambda/4$", why: "Accounts for $Z^2$ but not the change in $n_1$." },
      { text: "$4\\lambda$", why: "Inverts the effect of $Z$." },
      { text: "$\\lambda/9$", why: "Arithmetic slip in the series-limit wave numbers." },
    ],
    solution: "Series limits ($n_2 = \\infty$). H Balmer: $1/\\lambda = R\\cdot\\tfrac14$. He⁺ Lyman: $1/\\lambda' = R\\cdot4\\cdot1 = 4R$. $\\lambda'/\\lambda = (R/4)/(4R) = 1/16$.",
    concept: "Series limit with Z scaling", formula: "$\\dfrac1{\\lambda_{limit}} = \\dfrac{R_HZ^2}{n_1^2}$", whyFormula: "Shortest wavelength = highest energy = $n_2 \\to \\infty$.", mistakes: "Using the first line instead of the series limit.",
  },

  // ── Rate law and order ──
  {
    topic: "rate-law-order", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The unit of the rate constant of a first-order reaction is:",
    options: [
      { text: "mol L⁻¹ s⁻¹", why: "Unit for zero order." },
      { text: "s⁻¹", correct: true, why: "$(\\text{mol L}^{-1})^{1-1}\\text{s}^{-1} = \\text{s}^{-1}$." },
      { text: "L mol⁻¹ s⁻¹", why: "Unit for second order." },
      { text: "L² mol⁻² s⁻¹", why: "Unit for third order." },
    ],
    solution: "For order $n$, unit of $k = (\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}$. For $n = 1$: s⁻¹.",
    concept: "Units of rate constant", formula: "$[k] = (\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}$", whyFormula: "Rate always has unit mol L⁻¹ s⁻¹; $k$ adjusts for the concentration powers.", mistakes: "Memorising units without the general rule.",
  },
  {
    topic: "rate-law-order", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which of the following can have a fractional value?",
    options: [
      { text: "Order of a reaction", correct: true, why: "Order is experimental and can be 0, fractional or even negative." },
      { text: "Molecularity of an elementary step", why: "Molecularity counts colliding species — a whole number." },
      { text: "Number of molecules in a balanced equation", why: "Stoichiometric counts of molecules are whole numbers." },
      { text: "Number of steps in a mechanism", why: "Steps are counted in whole numbers." },
    ],
    solution: "Order comes from the experimental rate law (e.g. $r = k[A][B]^{1/2}$) and may be fractional. Molecularity is the number of species in an elementary collision and must be a positive integer.",
    concept: "Order versus molecularity", formula: "$r = k[A]^m[B]^n$", whyFormula: "Order is defined by the exponents.", mistakes: "Treating order and molecularity as the same thing.",
  },
  {
    topic: "rate-law-order", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 40, answer: 10,
    statement: "A first-order reaction has $k = 0.0693\\,\\text{min}^{-1}$. Find its half-life in minutes.",
    solution: "$t_{1/2} = 0.693/k = 0.693/0.0693 = 10\\,\\text{min}$.",
    concept: "First-order half-life", formula: "$t_{1/2} = 0.693/k$", whyFormula: "Direct relation for first order.", mistakes: "Using $1/k$ (mean life, 14.4 min).",
  },
  {
    topic: "rate-law-order", level: 2, difficulty: "EASY", type: "MCQ", time: 40,
    statement: "For a zero-order reaction, a plot of concentration of reactant versus time is:",
    options: [
      { text: "a straight line with slope $-k$", correct: true, why: "$[A] = [A]_0 - kt$." },
      { text: "an exponential decay curve", why: "That is first order." },
      { text: "a straight line through the origin with positive slope", why: "Concentration of reactant decreases." },
      { text: "a horizontal line", why: "That is the *rate* vs concentration plot for zero order." },
    ],
    solution: "Integrating $-d[A]/dt = k$ gives $[A] = [A]_0 - kt$: linear with intercept $[A]_0$ and slope $-k$.",
    concept: "Integrated zero-order law", formula: "$[A] = [A]_0 - kt$", whyFormula: "It describes [A] as a function of t.", mistakes: "Confusing the rate–concentration graph with the concentration–time graph.",
  },
  {
    topic: "rate-law-order", level: 3, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 12.5, tolerance: 0.05,
    statement: "A first-order reaction has a half-life of $15\\,\\text{min}$. What percentage of the reactant remains after $45\\,\\text{min}$?",
    solution: "$45\\,\\text{min} = 3$ half-lives. Fraction remaining $= (1/2)^3 = 1/8 = 12.5\\%$.",
    concept: "Successive half-lives", formula: "$[A] = [A]_0(1/2)^n$", whyFormula: "The time is an exact multiple of $t_{1/2}$.", mistakes: "Reporting the percentage reacted (87.5%).",
  },
  {
    topic: "rate-law-order", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "For $A + B \\to$ products: doubling [A] at constant [B] doubles the rate; doubling [B] at constant [A] makes the rate four times. The rate law is:",
    options: [
      { text: "$r = k[A][B]^2$", correct: true, why: "First order in A ($2^1 = 2$), second order in B ($2^2 = 4$)." },
      { text: "$r = k[A]^2[B]$", why: "Swaps the orders." },
      { text: "$r = k[A][B]$", why: "Doubling [B] would then only double the rate." },
      { text: "$r = k[A]^2[B]^2$", why: "Doubling [A] would then quadruple the rate." },
    ],
    solution: "$2^m = 2 \\Rightarrow m = 1$. $2^n = 4 \\Rightarrow n = 2$. $r = k[A][B]^2$, overall order 3.",
    concept: "Method of initial rates", formula: "$\\dfrac{r_2}{r_1} = \\left(\\dfrac{[A]_2}{[A]_1}\\right)^m$", whyFormula: "Changing one concentration at a time isolates its order.", mistakes: "Using stoichiometric coefficients as orders.",
  },
  {
    topic: "rate-law-order", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "When the initial concentration of a reactant is doubled, the half-life of the reaction is halved. The order of the reaction is:",
    options: [
      { text: "zero", why: "Zero-order half-life doubles when $[A]_0$ doubles." },
      { text: "first", why: "First-order half-life is independent of $[A]_0$." },
      { text: "second", correct: true, why: "$t_{1/2} \\propto [A]_0^{1-n}$; $2^{1-n} = 1/2 \\Rightarrow n = 2$." },
      { text: "third", why: "Would give $t_{1/2}$ reduced to one-quarter." },
    ],
    solution: "$t_{1/2} \\propto [A]_0^{1-n}$. $\\dfrac{t'}{t} = 2^{1-n} = \\dfrac12 \\Rightarrow 1 - n = -1 \\Rightarrow n = 2$.",
    concept: "Half-life dependence on initial concentration", formula: "$t_{1/2} \\propto [A]_0^{1-n}$", whyFormula: "Relates the change in half-life directly to order.", mistakes: "Assuming every half-life is constant.",
  },
  {
    topic: "rate-law-order", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 75, answer: 2,
    statement: "For a first-order reaction, find the ratio of the time required for 99% completion to the time required for 90% completion.",
    solution: "$t = \\dfrac{2.303}{k}\\log\\dfrac{[A]_0}{[A]}$. $t_{99\\%} = \\dfrac{2.303}{k}\\log100 = \\dfrac{2.303\\times2}{k}$; $t_{90\\%} = \\dfrac{2.303}{k}\\log10 = \\dfrac{2.303}{k}$. Ratio $= 2$.",
    concept: "Integrated first-order law", formula: "$k = \\dfrac{2.303}{t}\\log\\dfrac{[A]_0}{[A]}$", whyFormula: "Both times share the same $k$.", mistakes: "Using the fraction *reacted* (99/90) inside the log.",
  },
  {
    topic: "rate-law-order", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 150, answer: 55.3, tolerance: 0.6,
    statement: "The rate constant of a reaction becomes four times when the temperature is raised from $300\\,\\text{K}$ to $320\\,\\text{K}$. Find the activation energy in kJ mol⁻¹. (Use $\\log 4 = 0.602$, $R = 8.314\\,\\text{J K}^{-1}\\text{mol}^{-1}$.)",
    solution: "$\\log\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303R}\\left(\\dfrac{T_2 - T_1}{T_1T_2}\\right)$. $0.602 = \\dfrac{E_a}{2.303\\times8.314}\\times\\dfrac{20}{300\\times320}$. $E_a = 0.602\\times19.147\\times4800 \\approx 5.53\\times10^4\\,\\text{J mol}^{-1} \\approx 55.3\\,\\text{kJ mol}^{-1}$.",
    concept: "Temperature dependence of rate", formula: "$\\log\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303R}\\left(\\dfrac1{T_1} - \\dfrac1{T_2}\\right)$", whyFormula: "Two rate constants at two temperatures — the two-point Arrhenius form.", mistakes: "Answering in J mol⁻¹; using $\\ln 4$ with $2.303$; temperatures in °C.",
  },
  {
    topic: "rate-law-order", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: "The first-order gas-phase reaction $A(g) \\to 2B(g)$ is started with pure A at $100\\,\\text{mm Hg}$. After $10\\,\\text{min}$ the total pressure is $150\\,\\text{mm Hg}$. The rate constant is:",
    options: [
      { text: "$0.0693\\,\\text{min}^{-1}$", correct: true, why: "Half of A has reacted in 10 min, so $t_{1/2} = 10$ min." },
      { text: "$0.0347\\,\\text{min}^{-1}$", why: "Assumes only a quarter of A reacted." },
      { text: "$0.1386\\,\\text{min}^{-1}$", why: "Assumes 75% reacted." },
      { text: "$0.693\\,\\text{min}^{-1}$", why: "Decimal slip in $0.693/t_{1/2}$." },
    ],
    solution: "If A falls by $p$, B rises by $2p$: total $= 100 - p + 2p = 100 + p = 150 \\Rightarrow p = 50$. So $p_A = 50\\,\\text{mm Hg}$ — exactly half — after 10 min. $t_{1/2} = 10\\,\\text{min}$, $k = 0.693/10 = 0.0693\\,\\text{min}^{-1}$.",
    concept: "First-order kinetics from pressure data", formula: "$k = \\dfrac{2.303}{t}\\log\\dfrac{p_0}{p_A}$", whyFormula: "Partial pressure is proportional to concentration at constant V and T.", mistakes: "Using total pressure directly in the rate law instead of the partial pressure of A.",
  },
];
