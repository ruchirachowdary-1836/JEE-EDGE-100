import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// Levels 1–4: JEE Main formats; Level 5: JEE Advanced formats.

export const CHEMISTRY_QUESTIONS_4: QuestionSeed[] = [
  // ── Stoichiometry ──
  {
    topic: "stoichiometry", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In a reaction, the amount of product formed is decided by:",
    options: [
      { text: "the limiting reagent", correct: true, why: "It is used up first; the reaction stops there." },
      { text: "the reagent in excess", why: "Some of it is left over." },
      { text: "the heavier reactant", why: "Mass alone does not decide it; mole ratio does." },
      { text: "the catalyst", why: "A catalyst changes rate, not yield." },
    ],
    solution: "The limiting reagent is the reactant that runs out first, relative to the mole ratio in the balanced equation. Once it is consumed, no more product forms.",
    concept: "Limiting reagent", formula: r`Smallest $n_i/\nu_i$`, whyFormula: "Moles divided by stoichiometric coefficient.", mistakes: "Choosing the reactant with the smaller mass.",
  },
  {
    topic: "stoichiometry", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 0.4, tolerance: 0.001,
    statement: r`$4\ \text{g}$ of NaOH ($M = 40$) is dissolved in water to make $250\ \text{mL}$ of solution. Find the molarity.`,
    solution: r`$n = 4/40 = 0.1\ \text{mol}$; $M = 0.1/0.250 = 0.4\ \text{mol L}^{-1}$.`,
    concept: "Molarity", formula: r`$M = n/V(\text{L})$`, whyFormula: "Definition.", mistakes: "Using 250 instead of 0.250 L.",
  },
  {
    topic: "stoichiometry", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`$4\ \text{g}$ of $\text{H}_2$ and $16\ \text{g}$ of $\text{O}_2$ react to form water. The mass of water formed is:`,
    options: [
      { text: r`$18\ \text{g}$`, correct: true, why: r`O₂ (0.5 mol) is limiting and gives 1 mol H₂O.` },
      { text: r`$36\ \text{g}$`, why: "Assumes H₂ is limiting." },
      { text: r`$20\ \text{g}$`, why: "Adds the masses; part of the H₂ is left unreacted." },
      { text: r`$9\ \text{g}$`, why: "Halves the correct amount." },
    ],
    solution: r`$2\text{H}_2 + \text{O}_2 \to 2\text{H}_2\text{O}$. H₂: 2 mol; O₂: 0.5 mol. O₂ needs only 1 mol H₂, so O₂ is limiting and gives 1 mol (18 g) of water; 1 mol (2 g) H₂ remains.`,
    concept: "Limiting reagent calculation", formula: r`$n/\nu$ comparison`, whyFormula: "Find the reactant that runs out first.", mistakes: "Using the total mass of reactants.",
  },
  {
    topic: "stoichiometry", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 200,
    statement: r`What volume (in mL) of $0.1\ \text{M}$ NaOH is needed to neutralise $20\ \text{mL}$ of $0.5\ \text{M}$ $\text{H}_2\text{SO}_4$?`,
    solution: r`Moles H₂SO₄ $= 0.01$; it is dibasic, so NaOH needed $= 0.02\ \text{mol}$; volume $= 0.02/0.1 = 0.2\ \text{L} = 200\ \text{mL}$.`,
    concept: "Neutralisation stoichiometry", formula: r`$n_{\text{H}^+} = n_{\text{OH}^-}$`, whyFormula: "Each H₂SO₄ gives 2 H⁺.", mistakes: "Ignoring the dibasic nature (100 mL).",
  },
  {
    topic: "stoichiometry", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`$10\ \text{g}$ of $\text{CaCO}_3$ is heated until it decomposes completely: $\text{CaCO}_3 \to \text{CaO} + \text{CO}_2$ (Ca = 40, C = 12, O = 16). Which statements are correct?`,
    options: [
      { text: r`$5.6\ \text{g}$ of CaO is formed`, correct: true, why: "0.1 mol × 56 g/mol." },
      { text: r`$2.24\ \text{L}$ of CO₂ is formed at STP (273 K, 1 atm)`, correct: true, why: "0.1 mol × 22.4 L/mol." },
      { text: r`$0.1\ \text{mol}$ of CO₂ is formed`, correct: true, why: "1 : 1 with CaCO₃." },
      { text: r`$4.4\ \text{g}$ of CO₂ is formed`, correct: true, why: "0.1 mol × 44 g/mol; and 5.6 + 4.4 = 10 g conserves mass." },
    ],
    solution: r`$n(\text{CaCO}_3) = 10/100 = 0.1\ \text{mol}$. Products: 0.1 mol CaO (5.6 g) and 0.1 mol CO₂ (4.4 g; 2.24 L at 273 K and 1 atm). Mass is conserved: 5.6 + 4.4 = 10 g. All four are correct.`,
    concept: "Mole–mass–volume relationships", formula: r`$n = m/M$; $V = n\times22.4$ L at STP`, whyFormula: "One mole ratio links every quantity.", mistakes: "Using 22.7 L (that is at 1 bar) while the question says 1 atm.",
  },

  // ── Quantum mechanical model ──
  {
    topic: "quantum-mechanical-model", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`How many orbitals are there in the shell with $n = 3$?`,
    options: [
      { text: "9", correct: true, why: r`$n^2$.` },
      { text: "18", why: "That is the number of electrons." },
      { text: "3", why: "That is the number of subshells." },
      { text: "6", why: "No." },
    ],
    solution: r`Subshells 3s (1), 3p (3), 3d (5): total $1 + 3 + 5 = 9 = n^2$ orbitals, holding up to $2n^2 = 18$ electrons.`,
    concept: "Orbitals in a shell", formula: r`$n^2$ orbitals, $2n^2$ electrons`, whyFormula: r`$\sum_{l=0}^{n-1}(2l + 1) = n^2$.`, mistakes: "Confusing orbitals with electrons.",
  },
  {
    topic: "quantum-mechanical-model", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1,
    statement: "How many radial nodes does a 3p orbital have?",
    solution: r`Radial nodes $= n - l - 1 = 3 - 1 - 1 = 1$.`,
    concept: "Nodes of orbitals", formula: r`radial $= n - l - 1$, angular $= l$`, whyFormula: "Total nodes = n − 1.", mistakes: "Giving the total nodes (2).",
  },
  {
    topic: "quantum-mechanical-model", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which set of quantum numbers is NOT allowed?",
    options: [
      { text: r`$n = 2,\ l = 2,\ m_l = 0$`, correct: true, why: r`$l$ can be at most $n - 1 = 1$.` },
      { text: r`$n = 3,\ l = 2,\ m_l = -2$`, why: "Allowed (a 3d orbital)." },
      { text: r`$n = 1,\ l = 0,\ m_l = 0$`, why: "Allowed (1s)." },
      { text: r`$n = 4,\ l = 3,\ m_l = +3$`, why: "Allowed (a 4f orbital)." },
    ],
    solution: r`Rules: $l = 0, 1, \dots, n - 1$; $m_l = -l, \dots, +l$. For $n = 2$, $l$ can only be 0 or 1.`,
    concept: "Allowed quantum numbers", formula: r`$0 \le l \le n - 1$, $|m_l| \le l$`, whyFormula: "Constraints from the Schrödinger equation.", mistakes: "Allowing l = n.",
  },
  {
    topic: "quantum-mechanical-model", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 5.8, tolerance: 0.05,
    statement: r`An electron is confined within $\Delta x = 1\times10^{-10}\ \text{m}$. Find the minimum uncertainty in its velocity, in units of $10^5\ \text{m s}^{-1}$ ($h = 6.63\times10^{-34}\ \text{J s}$, $m = 9.1\times10^{-31}\ \text{kg}$).`,
    solution: r`$\Delta v \ge \dfrac{h}{4\pi m\Delta x} = \dfrac{6.63\times10^{-34}}{4\pi\times9.1\times10^{-31}\times10^{-10}} \approx 5.8\times10^5\ \text{m s}^{-1}$.`,
    concept: "Heisenberg uncertainty principle", formula: r`$\Delta x\,\Delta p \ge \dfrac{h}{4\pi}$`, whyFormula: "Momentum uncertainty from position uncertainty.", mistakes: "Using h/2π instead of h/4π.",
  },
  {
    topic: "quantum-mechanical-model", level: 5, difficulty: "HARD", type: "MATCH", time: 180,
    statement: "Match each orbital in List-I with its numbers of radial and angular nodes in List-II.",
    match: {
      left: ["2s", "3p", "3d", "4s"],
      right: ["1 radial, 0 angular", "1 radial, 1 angular", "0 radial, 2 angular", "3 radial, 0 angular", "2 radial, 1 angular"],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: r`Radial $= n - l - 1$, angular $= l$.` },
      { text: "P→1, Q→5, R→3, S→4", why: "2 radial and 1 angular is 4p, not 3p." },
      { text: "P→4, Q→2, R→3, S→1", why: "Swaps 2s and 4s." },
      { text: "P→1, Q→2, R→5, S→4", why: "3d has no radial node." },
    ],
    solution: r`- 2s: $n - l - 1 = 1$ radial, $l = 0$ angular.
- 3p: $3 - 1 - 1 = 1$ radial, 1 angular.
- 3d: $3 - 2 - 1 = 0$ radial, 2 angular.
- 4s: $4 - 0 - 1 = 3$ radial, 0 angular.`,
    concept: "Nodal structure of orbitals", formula: r`radial $= n - l - 1$, angular $= l$`, whyFormula: "Node counting rules.", mistakes: "Swapping radial and angular counts.",
  },

  // ── Electronic configuration ──
  {
    topic: "electronic-configuration", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The ground-state electronic configuration of chromium (Z = 24) is:",
    options: [
      { text: r`$[\text{Ar}]\,3d^5\,4s^1$`, correct: true, why: "Half-filled 3d is extra stable." },
      { text: r`$[\text{Ar}]\,3d^4\,4s^2$`, why: "The simple Aufbau prediction, not observed." },
      { text: r`$[\text{Ar}]\,3d^6$`, why: "4s cannot be empty in the atom here." },
      { text: r`$[\text{Ar}]\,4s^2\,4p^4$`, why: "3d fills before 4p." },
    ],
    solution: "Exchange energy stabilises the half-filled 3d⁵ subshell enough to promote one 4s electron: [Ar] 3d⁵ 4s¹ (six unpaired electrons).",
    concept: "Exceptions to the Aufbau principle", formula: "Half-filled / filled subshell stability", whyFormula: "Exchange energy.", mistakes: "Writing 3d⁴4s².",
  },
  {
    topic: "electronic-configuration", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 4,
    statement: "How many unpaired electrons does an iron atom (Z = 26) have in its ground state?",
    solution: r`Fe: $[\text{Ar}]\,3d^6\,4s^2$. Hund's rule: five 3d electrons singly, the sixth pairs → 4 unpaired.`,
    concept: "Hund's rule", formula: "Maximum multiplicity", whyFormula: "Electrons occupy degenerate orbitals singly first.", mistakes: "Counting 6.",
  },
  {
    topic: "electronic-configuration", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`In a nitrogen atom ($2p^3$), the three 2p electrons are:`,
    options: [
      { text: "in three different p orbitals with parallel spins", correct: true, why: "Hund's rule." },
      { text: "two paired in one orbital and one in another", why: "Pairing costs energy when empty orbitals are available." },
      { text: "all in one orbital", why: "Pauli allows at most two per orbital." },
      { text: "in different orbitals with alternating spins", why: "Parallel spins give the lower energy." },
    ],
    solution: "Hund's rule of maximum multiplicity: degenerate orbitals are filled singly with parallel spins before any pairing.",
    concept: "Hund's rule", formula: "—", whyFormula: "Minimises electron repulsion, maximises exchange energy.", mistakes: "Pairing early.",
  },
  {
    topic: "electronic-configuration", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 11,
    statement: r`How many electrons in a chlorine atom (Z = 17) have azimuthal quantum number $l = 1$?`,
    solution: r`Cl: $1s^2\,2s^2\,2p^6\,3s^2\,3p^5$. $l = 1$ means p electrons: $6 + 5 = 11$.`,
    concept: "Quantum numbers and configuration", formula: r`$l = 1 \leftrightarrow$ p subshell`, whyFormula: "Count all p electrons.", mistakes: "Counting only the valence p electrons.",
  },
  {
    topic: "electronic-configuration", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "For copper (Z = 29) and its ions, which statements are correct?",
    options: [
      { text: r`The copper atom is $[\text{Ar}]\,3d^9\,4s^2$`, why: r`It is $[\text{Ar}]\,3d^{10}\,4s^1$ (filled 3d is extra stable).` },
      { text: r`$\text{Cu}^+$ has no unpaired electrons`, correct: true, why: r`$3d^{10}$.` },
      { text: r`$\text{Cu}^{2+}$ has one unpaired electron`, correct: true, why: r`$3d^9$.` },
      { text: r`Copper(I) salts such as CuCl are typically blue`, why: r`$\text{Cu}^+$ is $3d^{10}$: no d–d transition, so its salts are usually white/colourless.` },
    ],
    solution: r`Cu: $[\text{Ar}]\,3d^{10}\,4s^1$. Ions lose 4s first: $\text{Cu}^+ = 3d^{10}$ (diamagnetic, colourless salts), $\text{Cu}^{2+} = 3d^9$ (1 unpaired, paramagnetic, coloured).`,
    concept: "Configurations of atoms vs ions", formula: "Remove ns before (n − 1)d", whyFormula: "Ionisation order differs from filling order.", mistakes: "Using the Aufbau prediction for Cu.",
  },

  // ── Hybridisation ──
  {
    topic: "hybridisation", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The hybridisation of each carbon atom in ethyne ($\text{HC}{\equiv}\text{CH}$) is:`,
    options: [
      { text: "sp", correct: true, why: "Two σ bonds per carbon, linear." },
      { text: "sp²", why: "That is ethene." },
      { text: "sp³", why: "That is ethane." },
      { text: "sp³d", why: "Carbon cannot expand its octet." },
    ],
    solution: "Each carbon forms two σ bonds (one C–H, one C–C) and two π bonds: two hybrid orbitals → sp, linear (180°).",
    concept: "Hybridisation from σ-bond count", formula: "Steric number = σ bonds + lone pairs", whyFormula: "π bonds use unhybridised p orbitals.", mistakes: "Counting π bonds in the steric number.",
  },
  {
    topic: "hybridisation", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 3,
    statement: r`How many sp²-hybridised carbon atoms are there in propenal, $\text{CH}_2{=}\text{CH–CHO}$?`,
    solution: "All three carbons are sp²: C1 and C2 form the C=C, C3 is the carbonyl carbon (C=O).",
    concept: "Identifying hybridisation", formula: "Double bond ⇒ sp² (when no triple bond)", whyFormula: "Three σ bonds around each carbon.", mistakes: "Thinking the CHO carbon is sp³.",
  },
  {
    topic: "hybridisation", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The hybridisation of sulphur in $\text{SF}_6$ is:`,
    options: [
      { text: "sp³d²", correct: true, why: "Six bond pairs, octahedral." },
      { text: "sp³d", why: "Five electron pairs." },
      { text: "sp³", why: "Four electron pairs." },
      { text: "d²sp³", why: "Inner-orbital notation is used for complexes with (n − 1)d orbitals." },
    ],
    solution: "S has six bond pairs and no lone pair: steric number 6 → sp³d², octahedral.",
    concept: "Expanded octet hybridisation", formula: "SN 6 → sp³d²", whyFormula: "Six electron domains.", mistakes: "Using complex-ion notation.",
  },
  {
    topic: "hybridisation", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 6,
    statement: r`How many σ bonds are there in acrylonitrile, $\text{CH}_2{=}\text{CH–C}{\equiv}\text{N}$?`,
    solution: "C–H: 3; C=C: 1 σ; C–C: 1; C≡N: 1 σ. Total 6 σ bonds (and 3 π bonds).",
    concept: "Counting σ and π bonds", formula: "Single = 1σ; double = 1σ + 1π; triple = 1σ + 2π", whyFormula: "Every bond has exactly one σ component.", mistakes: "Counting double bonds as two σ.",
  },
  {
    topic: "hybridisation", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`For $\text{PCl}_5$ in the gas phase, which statements are correct?`,
    options: [
      { text: "All Cl–P–Cl bond angles are 120°", why: "Axial–equatorial angles are 90° and the axial–axial angle is 180°." },
      { text: "Phosphorus is sp³d hybridised", correct: true, why: "Five bond pairs." },
      { text: "The molecule has a net dipole moment", why: "The trigonal bipyramid is symmetrical; bond dipoles cancel." },
      { text: "The axial P–Cl bonds are longer than the equatorial ones", correct: true, why: "Axial bonds feel three 90° repulsions." },
    ],
    solution: "Five bond pairs → sp³d, trigonal bipyramidal. Equatorial angles 120°, axial–equatorial 90°. Each axial bond pair has three bond pairs at 90°, versus two for equatorial, so axial bonds are longer and weaker (why PCl₅ dissociates readily).",
    concept: "Geometry and bond lengths in trigonal bipyramids", formula: "SN 5 → sp³d", whyFormula: "VSEPR repulsions at 90° dominate.", mistakes: "Assuming all bonds are equivalent.",
  },

  // ── Molecular orbital theory ──
  {
    topic: "molecular-orbital-theory", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The bond order of $\text{N}_2$ is:`,
    options: [
      { text: "3", correct: true, why: "(10 − 4)/2." },
      { text: "2", why: "That is O₂." },
      { text: "2.5", why: "That is N₂⁺ or O₂⁺." },
      { text: "1", why: "That is F₂." },
    ],
    solution: r`N₂ (14 electrons): bonding 10, antibonding 4. Bond order $= (10 - 4)/2 = 3$.`,
    concept: "Bond order", formula: r`$\text{BO} = \dfrac{N_b - N_a}{2}$`, whyFormula: "Excess of bonding electrons.", mistakes: "Counting only valence electrons inconsistently.",
  },
  {
    topic: "molecular-orbital-theory", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 1.5, tolerance: 0.001,
    statement: r`Find the bond order of the superoxide ion $\text{O}_2^-$.`,
    solution: r`O₂ has BO 2; adding an electron to a π* orbital lowers it by ½: $\text{O}_2^-$ has BO $= (10 - 7)/2 = 1.5$.`,
    concept: "Bond order of ions", formula: r`$\text{BO} = \dfrac{N_b - N_a}{2}$`, whyFormula: "The extra electron is antibonding.", mistakes: "Adding the electron to a bonding orbital.",
  },
  {
    topic: "molecular-orbital-theory", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which molecule is paramagnetic?",
    options: [
      { text: r`$\text{O}_2$`, correct: true, why: "Two unpaired electrons in π* orbitals." },
      { text: r`$\text{N}_2$`, why: "All electrons paired." },
      { text: r`$\text{F}_2$`, why: "All electrons paired." },
      { text: r`$\text{C}_2$`, why: "All electrons paired." },
    ],
    solution: "In O₂ the two highest electrons occupy the degenerate π*2p orbitals singly (Hund's rule), so O₂ is paramagnetic — something Lewis structures cannot explain.",
    concept: "Magnetism from MO theory", formula: "Unpaired electrons ⇒ paramagnetic", whyFormula: "Degenerate π* orbitals.", mistakes: "Using the Lewis structure (all paired).",
  },
  {
    topic: "molecular-orbital-theory", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 2,
    statement: r`How many unpaired electrons are present in $\text{B}_2$?`,
    solution: r`B₂ (10 electrons): $\sigma1s^2\,\sigma^*1s^2\,\sigma2s^2\,\sigma^*2s^2\,\pi2p_x^1\,\pi2p_y^1$ (for B, C, N the π2p lies below σ2p). Two unpaired electrons: paramagnetic.`,
    concept: "s–p mixing in light diatomics", formula: "π2p below σ2p for B₂, C₂, N₂", whyFormula: "s–p mixing changes the order.", mistakes: "Using the O₂ ordering and predicting diamagnetism.",
  },
  {
    topic: "molecular-orbital-theory", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`Consider $\text{O}_2^+$, $\text{O}_2$, $\text{O}_2^-$ and $\text{O}_2^{2-}$. Which statements are correct?`,
    options: [
      { text: r`$\text{O}_2^-$ has two unpaired electrons`, why: "π* holds three electrons: one unpaired." },
      { text: r`Bond order decreases in the order $\text{O}_2^+ > \text{O}_2 > \text{O}_2^- > \text{O}_2^{2-}$`, correct: true, why: "2.5 > 2 > 1.5 > 1." },
      { text: "Bond length increases in the same order", correct: true, why: "Lower bond order, longer bond." },
      { text: r`$\text{O}_2^+$ is diamagnetic`, why: "It has one unpaired electron in π*." },
    ],
    solution: r`π* electrons: O₂⁺ 1, O₂ 2, O₂⁻ 3, O₂²⁻ 4. Bond orders: 2.5, 2, 1.5, 1 — so bond length increases along the series. Unpaired electrons: 1, 2, 1, 0.`,
    concept: "Trends across a series of ions", formula: r`$\text{BO} = \dfrac{N_b - N_a}{2}$`, whyFormula: "Each added electron enters π*.", mistakes: "Assuming every oxygen species has two unpaired electrons.",
  },

  // ── Ionic bonding and polarity ──
  {
    topic: "ionic-bonding-and-polarity", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which molecule has zero dipole moment?",
    options: [
      { text: r`$\text{CO}_2$`, correct: true, why: "Linear: the two C=O dipoles cancel." },
      { text: r`$\text{H}_2\text{O}$`, why: "Bent: dipoles add." },
      { text: r`$\text{NH}_3$`, why: "Pyramidal: dipoles add." },
      { text: "HCl", why: "A single polar bond." },
    ],
    solution: "Polar bonds in a symmetrical arrangement cancel. CO₂ is linear, so its two bond dipoles are equal and opposite.",
    concept: "Molecular dipole moment", formula: "Vector sum of bond dipoles", whyFormula: "Geometry decides cancellation.", mistakes: "Thinking polar bonds always make a polar molecule.",
  },
  {
    topic: "ionic-bonding-and-polarity", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 4.8, tolerance: 0.05,
    statement: r`Charges $\pm1.6\times10^{-19}\ \text{C}$ are $1\ \text{Å}$ apart. Find the dipole moment in debye ($1\ \text{D} = 3.336\times10^{-30}\ \text{C m}$).`,
    solution: r`$\mu = qd = 1.6\times10^{-19}\times10^{-10} = 1.6\times10^{-29}\ \text{C m} = \dfrac{1.6\times10^{-29}}{3.336\times10^{-30}} \approx 4.8\ \text{D}$.`,
    concept: "Dipole moment", formula: r`$\mu = q\times d$`, whyFormula: "Definition.", mistakes: "Unit conversion.",
  },
  {
    topic: "ionic-bonding-and-polarity", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "According to Fajans' rules, which chloride has the most covalent character?",
    options: [
      { text: r`$\text{AlCl}_3$`, correct: true, why: "Small, highly charged Al³⁺ polarises Cl⁻ most." },
      { text: "NaCl", why: "Na⁺ is large and singly charged." },
      { text: r`$\text{MgCl}_2$`, why: "Mg²⁺ polarises less than Al³⁺." },
      { text: "KCl", why: "K⁺ is the largest, least polarising." },
    ],
    solution: "Covalent character grows with cation charge and smaller cation size (higher polarising power). Al³⁺ is the smallest and most highly charged.",
    concept: "Fajans' rules", formula: "Polarising power ∝ charge / size", whyFormula: "Distortion of the anion's electron cloud.", mistakes: "Choosing by anion only.",
  },
  {
    topic: "ionic-bonding-and-polarity", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 16.9, tolerance: 0.3,
    statement: r`HCl has a dipole moment of $1.03\ \text{D}$ and bond length $1.27\ \text{Å}$. Find its percentage ionic character ($e = 1.6\times10^{-19}\ \text{C}$, $1\ \text{D} = 3.336\times10^{-30}\ \text{C m}$).`,
    solution: r`If fully ionic: $\mu = ed = 1.6\times10^{-19}\times1.27\times10^{-10} = 2.032\times10^{-29}\ \text{C m} = 6.09\ \text{D}$. Ionic character $= 1.03/6.09\times100 \approx 16.9\%$.`,
    concept: "Percentage ionic character", formula: r`$\%\ \text{ionic} = \dfrac{\mu_{\text{obs}}}{ed}\times100$`, whyFormula: "Compare with a fully ionic dipole.", mistakes: "Forgetting to convert Å to m.",
  },
  {
    topic: "ionic-bonding-and-polarity", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about hydrogen bonding are correct?",
    options: [
      { text: "o-Nitrophenol has a lower boiling point than p-nitrophenol because its hydrogen bond is intramolecular", correct: true, why: "p-Nitrophenol associates through intermolecular H-bonds." },
      { text: "A hydrogen bond is stronger than a typical covalent bond", why: "About 10–40 kJ/mol vs several hundred." },
      { text: "HF boils at a higher temperature than HCl", correct: true, why: "Strong H-bonding in HF." },
      { text: "Ice is less dense than liquid water because hydrogen bonds hold it in an open cage structure", correct: true, why: "Tetrahedral H-bonded network with empty space." },
    ],
    solution: "Intramolecular H-bonding (o-nitrophenol) reduces association, lowering the boiling point and raising volatility (it is steam-volatile). HF's hydrogen bonds raise its boiling point above HCl's. Ice's open tetrahedral network makes it less dense than water. Hydrogen bonds are much weaker than covalent bonds.",
    concept: "Consequences of hydrogen bonding", formula: "Intermolecular vs intramolecular H-bonds", whyFormula: "Different effects on physical properties.", mistakes: "Overstating H-bond strength.",
  },

  // ── Entropy and Gibbs energy ──
  {
    topic: "entropy-and-gibbs-energy", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "At constant temperature and pressure, a process is spontaneous if:",
    options: [
      { text: r`$\Delta G < 0$`, correct: true, why: "Gibbs energy decreases." },
      { text: r`$\Delta H < 0$`, why: "Exothermic processes can be non-spontaneous (if ΔS is very negative)." },
      { text: r`$\Delta S_{\text{system}} > 0$`, why: "The total entropy (system + surroundings) is what matters." },
      { text: r`$\Delta G > 0$`, why: "That is non-spontaneous." },
    ],
    solution: r`At constant $T$ and $P$, $\Delta G = -T\Delta S_{\text{universe}}$, so $\Delta G < 0$ is equivalent to an increase in the entropy of the universe.`,
    concept: "Spontaneity criterion", formula: r`$\Delta G = \Delta H - T\Delta S$`, whyFormula: "Combines enthalpy and entropy.", mistakes: "Using ΔH alone.",
  },
  {
    topic: "entropy-and-gibbs-energy", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 109, tolerance: 0.5,
    statement: r`The enthalpy of vaporisation of water at $373\ \text{K}$ is $40.7\ \text{kJ mol}^{-1}$. Find the entropy of vaporisation in J K⁻¹ mol⁻¹.`,
    solution: r`At the boiling point the phases are in equilibrium: $\Delta S = \dfrac{\Delta H}{T} = \dfrac{40700}{373} \approx 109\ \text{J K}^{-1}\text{mol}^{-1}$.`,
    concept: "Entropy of a phase change", formula: r`$\Delta S = \Delta H/T$`, whyFormula: "Reversible heat at constant T.", mistakes: "Forgetting kJ → J.",
  },
  {
    topic: "entropy-and-gibbs-energy", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`A reaction has $\Delta H > 0$ and $\Delta S > 0$. It is spontaneous:`,
    options: [
      { text: "at high temperatures only", correct: true, why: r`$T\Delta S$ must exceed $\Delta H$.` },
      { text: "at all temperatures", why: "At low T, ΔH dominates and ΔG > 0." },
      { text: "at low temperatures only", why: "That is ΔH < 0, ΔS < 0." },
      { text: "at no temperature", why: "That is ΔH > 0, ΔS < 0." },
    ],
    solution: r`$\Delta G = \Delta H - T\Delta S < 0 \iff T > \Delta H/\Delta S$.`,
    concept: "Temperature dependence of spontaneity", formula: r`$T > \Delta H/\Delta S$`, whyFormula: "Sign analysis of ΔG.", mistakes: "Reversing the temperature condition.",
  },
  {
    topic: "entropy-and-gibbs-energy", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 300,
    statement: r`For a reaction $\Delta H = +30\ \text{kJ mol}^{-1}$ and $\Delta S = +100\ \text{J K}^{-1}\text{mol}^{-1}$. Above what temperature (in K) is it spontaneous?`,
    solution: r`$T = \dfrac{\Delta H}{\Delta S} = \dfrac{30000}{100} = 300\ \text{K}$; spontaneous above 300 K.`,
    concept: "Crossover temperature", formula: r`$T = \Delta H/\Delta S$`, whyFormula: "ΔG = 0 at the crossover.", mistakes: "Unit mismatch (kJ vs J).",
  },
  {
    topic: "entropy-and-gibbs-energy", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`A reaction has equilibrium constant $K = 10$ at $300\ \text{K}$ ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$). Which statements are correct?`,
    options: [
      { text: r`If at some instant $Q > K$, the reaction proceeds in the forward direction`, why: "It proceeds backward until Q falls to K." },
      { text: r`$\Delta G^\circ$ is negative`, correct: true, why: "K > 1." },
      { text: r`$\Delta G^\circ \approx -5.74\ \text{kJ mol}^{-1}$`, correct: true, why: r`$-2.303RT\log K = -2.303\times8.314\times300\times1$.` },
      { text: r`At equilibrium, $\Delta G^\circ = 0$`, why: r`At equilibrium $\Delta G = 0$; $\Delta G^\circ$ is fixed by K and is $-5.74$ kJ/mol here.` },
    ],
    solution: r`$\Delta G^\circ = -2.303RT\log K = -2.303\times8.314\times300\times\log10 \approx -5744\ \text{J mol}^{-1}$. $\Delta G = \Delta G^\circ + RT\ln Q$: at equilibrium $Q = K$ and $\Delta G = 0$. If $Q > K$, $\Delta G > 0$ for the forward reaction, so it runs backward.`,
    concept: "ΔG°, ΔG and the reaction quotient", formula: r`$\Delta G = \Delta G^\circ + RT\ln Q$`, whyFormula: "Links instantaneous composition to direction.", mistakes: "Confusing ΔG° with ΔG.",
  },

  // ── Raoult's law ──
  {
    topic: "raoults-law", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "For an ideal solution:",
    options: [
      { text: r`$\Delta H_{\text{mix}} = 0$ and $\Delta V_{\text{mix}} = 0$`, correct: true, why: "A–B interactions equal the average of A–A and B–B." },
      { text: r`$\Delta H_{\text{mix}} > 0$`, why: "That is positive deviation." },
      { text: r`$\Delta S_{\text{mix}} = 0$`, why: "Mixing always increases entropy." },
      { text: r`$\Delta G_{\text{mix}} > 0$`, why: "Ideal solutions form spontaneously." },
    ],
    solution: "An ideal solution obeys Raoult's law at all compositions: no heat change and no volume change on mixing; ΔS_mix > 0 and ΔG_mix < 0.",
    concept: "Ideal solutions", formula: r`$p_A = x_Ap_A^\circ$`, whyFormula: "Raoult's law for every component.", mistakes: "Thinking ΔS_mix = 0.",
  },
  {
    topic: "raoults-law", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 70,
    statement: r`Liquids A and B form an ideal solution. $p_A^\circ = 100$ torr, $p_B^\circ = 50$ torr. Find the total vapour pressure (in torr) of a solution with $x_A = 0.4$.`,
    solution: r`$P = x_Ap_A^\circ + x_Bp_B^\circ = 0.4(100) + 0.6(50) = 40 + 30 = 70$ torr.`,
    concept: "Raoult's law", formula: r`$P = x_Ap_A^\circ + x_Bp_B^\circ$`, whyFormula: "Dalton's law for the vapour.", mistakes: "Averaging the pure vapour pressures.",
  },
  {
    topic: "raoults-law", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which mixture shows negative deviation from Raoult's law?",
    options: [
      { text: "chloroform + acetone", correct: true, why: "Hydrogen bonding between them is stronger than in the pure liquids." },
      { text: "ethanol + hexane", why: "Positive deviation (H-bonds of ethanol are broken)." },
      { text: "benzene + toluene", why: "Nearly ideal." },
      { text: "acetone + carbon disulphide", why: "Positive deviation." },
    ],
    solution: "CHCl₃'s acidic H hydrogen-bonds to acetone's C=O. A–B attraction exceeds A–A and B–B, so vapour pressure is lower than Raoult's law predicts (ΔH_mix < 0).",
    concept: "Deviations from Raoult's law", formula: "Stronger A–B attraction ⇒ negative deviation", whyFormula: "Escaping tendency falls.", mistakes: "Confusing the sign of deviation.",
  },
  {
    topic: "raoults-law", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 0.571, tolerance: 0.003,
    statement: r`For the solution in the Level 2 question ($p_A^\circ = 100$, $p_B^\circ = 50$ torr, $x_A = 0.4$), find the mole fraction of A in the vapour.`,
    solution: r`$y_A = \dfrac{p_A}{P} = \dfrac{40}{70} \approx 0.571$. The vapour is richer in the more volatile component (0.571 > 0.4).`,
    concept: "Vapour composition", formula: r`$y_A = \dfrac{x_Ap_A^\circ}{P}$`, whyFormula: "Dalton's law.", mistakes: "Using $x_A$.",
  },
  {
    topic: "raoults-law", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "For a binary solution showing large positive deviation from Raoult's law, which statements are correct?",
    options: [
      { text: r`$\Delta H_{\text{mix}} > 0$`, correct: true, why: "Mixing breaks stronger like–like attractions." },
      { text: r`$\Delta V_{\text{mix}} > 0$`, correct: true, why: "Weaker attractions let molecules spread out." },
      { text: "A–B attractions are stronger than A–A and B–B attractions", why: "That causes negative deviation." },
      { text: "It may form a minimum-boiling azeotrope", correct: true, why: "Vapour pressure has a maximum at some composition." },
    ],
    solution: "Positive deviation: A–B interactions are weaker, so molecules escape more easily (higher vapour pressure), mixing is endothermic and the volume increases. A vapour-pressure maximum means a boiling-point minimum: a minimum-boiling azeotrope (e.g. ethanol–water).",
    concept: "Positive deviation and azeotropes", formula: r`$p_A > x_Ap_A^\circ$`, whyFormula: "Escaping tendency.", mistakes: "Linking positive deviation to maximum-boiling azeotropes.",
  },

  // ── Chemical equilibrium ──
  {
    topic: "chemical-equilibrium", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Adding a catalyst to a reaction at equilibrium:",
    options: [
      { text: "does not change the equilibrium constant or composition", correct: true, why: "It speeds up both directions equally." },
      { text: "increases the equilibrium constant", why: "K depends only on temperature." },
      { text: "shifts the equilibrium towards products", why: "Both rates rise by the same factor." },
      { text: "shifts the equilibrium towards reactants", why: "No shift." },
    ],
    solution: "A catalyst lowers the activation energy of the forward and reverse reactions by the same amount. Equilibrium is reached faster, but K and the equilibrium mixture are unchanged.",
    concept: "Catalysts and equilibrium", formula: r`$K = k_f/k_b$`, whyFormula: "Both rate constants change by the same factor.", mistakes: "Thinking catalysts increase yield.",
  },
  {
    topic: "chemical-equilibrium", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 0.0625, tolerance: 0.0005,
    statement: r`For $\text{A} \rightleftharpoons \text{B}$, $K = 4$. Find $K$ for $2\text{B} \rightleftharpoons 2\text{A}$.`,
    solution: r`Reversing: $1/4$. Doubling the coefficients squares it: $(1/4)^2 = 1/16 = 0.0625$.`,
    concept: "Manipulating equilibrium constants", formula: r`reverse → $1/K$; multiply by $n$ → $K^n$`, whyFormula: "From the expression for K.", mistakes: "Multiplying K by 2.",
  },
  {
    topic: "chemical-equilibrium", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`For $\text{N}_2\text{(g)} + 3\text{H}_2\text{(g)} \rightleftharpoons 2\text{NH}_3\text{(g)}$, $\Delta H < 0$, the yield of ammonia increases with:`,
    options: [
      { text: "higher pressure", correct: true, why: "4 mol of gas → 2 mol: fewer moles favoured." },
      { text: "higher temperature", why: "Exothermic: heating shifts it back." },
      { text: "adding a catalyst", why: "Changes the rate, not the yield." },
      { text: "removing nitrogen", why: "Shifts it backward." },
    ],
    solution: "Le Chatelier: increasing pressure favours the side with fewer gas moles (products). Lower temperature also favours the exothermic forward reaction, though the rate falls — hence the compromise conditions in the Haber process.",
    concept: "Le Chatelier's principle", formula: "Shift to oppose the change", whyFormula: "Qualitative prediction.", mistakes: "Thinking a catalyst raises yield.",
  },
  {
    topic: "chemical-equilibrium", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 1,
    statement: r`$\text{PCl}_5 \rightleftharpoons \text{PCl}_3 + \text{Cl}_2$. At equilibrium, PCl₅ is 50% dissociated and the total pressure is $3\ \text{atm}$. Find $K_p$ (in atm).`,
    solution: r`Per mole PCl₅: $(1 - \alpha)$, $\alpha$, $\alpha$; total $1 + \alpha$. $K_p = \dfrac{(\frac{\alpha}{1+\alpha}P)^2}{\frac{1-\alpha}{1+\alpha}P} = \dfrac{\alpha^2P}{1 - \alpha^2} = \dfrac{0.25\times3}{0.75} = 1\ \text{atm}$.`,
    concept: "Kp from degree of dissociation", formula: r`$K_p = \dfrac{\alpha^2P}{1 - \alpha^2}$`, whyFormula: "Partial pressures from mole fractions.", mistakes: "Forgetting the total moles (1 + α).",
  },
  {
    topic: "chemical-equilibrium", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`For $2\text{SO}_2\text{(g)} + \text{O}_2\text{(g)} \rightleftharpoons 2\text{SO}_3\text{(g)}$, $\Delta H < 0$, at equilibrium. Which statements are correct?`,
    options: [
      { text: "Removing SO₃ shifts the equilibrium backward", why: "It shifts forward to replace SO₃." },
      { text: "Raising the temperature increases K", why: "The forward reaction is exothermic, so K decreases on heating." },
      { text: "Adding argon at constant volume does not shift the equilibrium", correct: true, why: "Partial pressures of the reacting gases are unchanged." },
      { text: "Adding argon at constant total pressure shifts it backward", correct: true, why: "Partial pressures fall; the side with more gas moles is favoured." },
    ],
    solution: "Exothermic ⇒ K falls as T rises. Inert gas at constant volume leaves every partial pressure unchanged (no shift). At constant total pressure the volume grows, all partial pressures fall, and the equilibrium shifts to the side with more gas moles (3 > 2): backward. Removing a product shifts forward.",
    concept: "Le Chatelier's principle with inert gases", formula: r`$K_p$ in partial pressures`, whyFormula: "Only partial pressures of reacting species matter.", mistakes: "Thinking inert gas always has no effect.",
  },

  // ── Redox reactions ──
  {
    topic: "redox-reactions", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In terms of electrons, oxidation is:",
    options: [
      { text: "loss of electrons", correct: true, why: "OIL RIG." },
      { text: "gain of electrons", why: "That is reduction." },
      { text: "gain of protons", why: "Not the electronic definition." },
      { text: "loss of neutrons", why: "Nuclear, not chemical." },
    ],
    solution: "Oxidation is loss of electrons (oxidation number increases); reduction is gain of electrons (oxidation number decreases).",
    concept: "Electronic concept of redox", formula: "OIL RIG", whyFormula: "Definition.", mistakes: "Reversing the definitions.",
  },
  {
    topic: "redox-reactions", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 6,
    statement: r`Find the oxidation number of chromium in $\text{K}_2\text{Cr}_2\text{O}_7$.`,
    solution: r`$2(+1) + 2x + 7(-2) = 0 \Rightarrow 2x = 12 \Rightarrow x = +6$.`,
    concept: "Oxidation number", formula: "Sum = charge", whyFormula: "Standard rules.", mistakes: "Forgetting the two Cr atoms.",
  },
  {
    topic: "redox-reactions", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`In $2\text{H}_2\text{O}_2 \to 2\text{H}_2\text{O} + \text{O}_2$, hydrogen peroxide acts as:`,
    options: [
      { text: "both oxidising and reducing agent (disproportionation)", correct: true, why: "O goes from −1 to −2 and to 0." },
      { text: "only an oxidising agent", why: "Some O is also oxidised." },
      { text: "only a reducing agent", why: "Some O is also reduced." },
      { text: "neither (it is not a redox reaction)", why: "Oxidation numbers change." },
    ],
    solution: "O in H₂O₂ is −1. It becomes −2 in H₂O (reduced) and 0 in O₂ (oxidised): the same element is both oxidised and reduced — disproportionation.",
    concept: "Disproportionation", formula: "Same element, two directions", whyFormula: "Track oxidation numbers.", mistakes: "Overlooking that H₂O₂ is both.",
  },
  {
    topic: "redox-reactions", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 5,
    statement: r`In acidic solution, how many moles of $\text{Fe}^{2+}$ are oxidised by one mole of $\text{MnO}_4^-$?`,
    solution: r`Mn: +7 → +2 (gains 5 e⁻). Fe: +2 → +3 (loses 1 e⁻). So 5 mol Fe²⁺ per mol MnO₄⁻.`,
    concept: "Electron balance", formula: "Electrons lost = electrons gained", whyFormula: "Redox balancing principle.", mistakes: "Using the neutral-medium change (3 e⁻).",
  },
  {
    topic: "redox-reactions", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: r`For the balanced reaction of dichromate with iron(II) in acid, $\text{Cr}_2\text{O}_7^{2-} + a\,\text{Fe}^{2+} + b\,\text{H}^+ \to 2\text{Cr}^{3+} + a\,\text{Fe}^{3+} + c\,\text{H}_2\text{O}$, which statements are correct?`,
    options: [
      { text: "Iron is reduced", why: "Fe goes from +2 to +3: oxidised (a = 6)." },
      { text: "Chromium is oxidised", why: "Cr goes from +6 to +3: reduced." },
      { text: r`$b = 14$`, correct: true, why: "Balances charge: −2 + 12 + 14 = 24 = 6 + 18." },
      { text: r`$c = 7$`, correct: true, why: "Balances the 7 oxygens of dichromate." },
    ],
    solution: r`Half-reactions: $\text{Cr}_2\text{O}_7^{2-} + 14\text{H}^+ + 6e^- \to 2\text{Cr}^{3+} + 7\text{H}_2\text{O}$ and $\text{Fe}^{2+} \to \text{Fe}^{3+} + e^-$ (×6). Overall: $\text{Cr}_2\text{O}_7^{2-} + 6\text{Fe}^{2+} + 14\text{H}^+ \to 2\text{Cr}^{3+} + 6\text{Fe}^{3+} + 7\text{H}_2\text{O}$. Check charge: left $-2 + 12 + 14 = 24$; right $6 + 18 = 24$ ✓.`,
    concept: "Ion–electron balancing", formula: "Balance atoms, then O with H₂O, H with H⁺, charge with e⁻", whyFormula: "Systematic half-reaction method.", mistakes: "Saying the oxidising agent is oxidised.",
  },

  // ── Conductance and electrolysis ──
  {
    topic: "conductance-and-electrolysis", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "On dilution, the molar conductivity of an electrolyte solution:",
    options: [
      { text: "increases", correct: true, why: "Ions interact less (strong) and dissociation increases (weak)." },
      { text: "decreases", why: "That is the specific conductivity (fewer ions per volume)." },
      { text: "stays constant", why: "It changes with concentration." },
      { text: "becomes zero", why: "It tends to a limiting value." },
    ],
    solution: "Molar conductivity Λm = κ/C. On dilution κ falls but C falls faster; ions also move more freely (strong electrolytes) and dissociate more (weak electrolytes), so Λm rises towards Λ°m.",
    concept: "Molar vs specific conductivity", formula: r`$\Lambda_m = \dfrac{1000\kappa}{C}$`, whyFormula: "Per mole of electrolyte.", mistakes: "Confusing κ with Λm.",
  },
  {
    topic: "conductance-and-electrolysis", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 120,
    statement: r`A $0.01\ \text{M}$ solution has conductivity $0.0012\ \text{S cm}^{-1}$. Find its molar conductivity in S cm² mol⁻¹.`,
    solution: r`$\Lambda_m = \dfrac{1000\kappa}{C} = \dfrac{1000\times0.0012}{0.01} = 120\ \text{S cm}^2\text{mol}^{-1}$.`,
    concept: "Molar conductivity", formula: r`$\Lambda_m = 1000\kappa/C$`, whyFormula: "Units: κ in S cm⁻¹, C in mol L⁻¹.", mistakes: "Missing the factor 1000.",
  },
  {
    topic: "conductance-and-electrolysis", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`Using Kohlrausch's law, $\Lambda_m^\circ(\text{CH}_3\text{COOH})$ equals:`,
    options: [
      { text: r`$\Lambda^\circ(\text{CH}_3\text{COONa}) + \Lambda^\circ(\text{HCl}) - \Lambda^\circ(\text{NaCl})$`, correct: true, why: "Adds λ°(CH₃COO⁻) + λ°(H⁺)." },
      { text: r`$\Lambda^\circ(\text{CH}_3\text{COONa}) + \Lambda^\circ(\text{NaCl}) - \Lambda^\circ(\text{HCl})$`, why: "Leaves Na⁺ in and H⁺ out." },
      { text: r`$\Lambda^\circ(\text{HCl}) + \Lambda^\circ(\text{NaCl})$`, why: "No acetate term." },
      { text: r`It cannot be found because acetic acid is weak`, why: "That is exactly what Kohlrausch's law allows." },
    ],
    solution: r`Kohlrausch: limiting molar conductivities are sums of independent ionic contributions. $\lambda^\circ(\text{CH}_3\text{COO}^-) + \lambda^\circ(\text{Na}^+) + \lambda^\circ(\text{H}^+) + \lambda^\circ(\text{Cl}^-) - \lambda^\circ(\text{Na}^+) - \lambda^\circ(\text{Cl}^-) = \lambda^\circ(\text{CH}_3\text{COO}^-) + \lambda^\circ(\text{H}^+)$.`,
    concept: "Kohlrausch's law", formula: r`$\Lambda_m^\circ = \nu_+\lambda_+^\circ + \nu_-\lambda_-^\circ$`, whyFormula: "Independent migration of ions.", mistakes: "Sign errors in the combination.",
  },
  {
    topic: "conductance-and-electrolysis", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 0.1, tolerance: 0.001,
    statement: r`At a certain concentration, acetic acid has $\Lambda_m = 39\ \text{S cm}^2\text{mol}^{-1}$; its $\Lambda_m^\circ = 390\ \text{S cm}^2\text{mol}^{-1}$. Find its degree of dissociation.`,
    solution: r`$\alpha = \Lambda_m/\Lambda_m^\circ = 39/390 = 0.1$.`,
    concept: "Degree of dissociation from conductivity", formula: r`$\alpha = \Lambda_m/\Lambda_m^\circ$`, whyFormula: "Fraction of molecules ionised.", mistakes: "Inverting the ratio.",
  },
  {
    topic: "conductance-and-electrolysis", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`Aqueous $\text{CuSO}_4$ is electrolysed between inert electrodes with $2\ \text{A}$ for $965\ \text{s}$ ($F = 96500\ \text{C mol}^{-1}$, Cu = 63.5). Which statements are correct? (Faraday's laws are beyond the JEE Main 2027 text; this is JEE Advanced-style practice.)`,
    options: [
      { text: r`$0.02\ \text{mol}$ of copper is deposited`, why: "0.02 mol of electrons deposit 0.01 mol Cu (Cu²⁺ + 2e⁻)." },
      { text: r`About $0.635\ \text{g}$ of copper is deposited`, correct: true, why: "0.01 mol × 63.5." },
      { text: "Oxygen is evolved at the anode", correct: true, why: "Water is oxidised; sulphate is not." },
      { text: "The solution becomes more acidic", correct: true, why: "H⁺ forms at the anode with O₂." },
    ],
    solution: r`$Q = 2\times965 = 1930\ \text{C} = 0.02\ \text{F}$. Cathode: $\text{Cu}^{2+} + 2e^- \to \text{Cu}$: 0.01 mol = 0.635 g. Anode: $2\text{H}_2\text{O} \to \text{O}_2 + 4\text{H}^+ + 4e^-$: 0.005 mol O₂ and 0.02 mol H⁺, so the solution turns acidic (it becomes dilute H₂SO₄).`,
    concept: "Electrolysis products and Faraday's first law", formula: r`$n = \dfrac{Q}{zF}$`, whyFormula: "Moles of electrons divided by electrons per ion.", mistakes: "Forgetting z = 2 for Cu²⁺.",
  },

  // ── Temperature dependence of rate ──
  {
    topic: "temperature-dependence-of-rate", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A catalyst increases the rate of a reaction by:",
    options: [
      { text: "providing a pathway of lower activation energy", correct: true, why: "More molecules can cross the lower barrier." },
      { text: "increasing ΔH", why: "ΔH is unchanged." },
      { text: "increasing the temperature", why: "Temperature is set externally." },
      { text: "increasing the equilibrium constant", why: "K is unchanged." },
    ],
    solution: r`A catalyst opens an alternative mechanism with lower $E_a$. By Arrhenius, $k = Ae^{-E_a/RT}$ grows. ΔH, ΔG and K are unchanged.`,
    concept: "Catalysis", formula: r`$k = Ae^{-E_a/RT}$`, whyFormula: "Rate constant depends exponentially on Ea.", mistakes: "Thinking catalysts change ΔH.",
  },
  {
    topic: "temperature-dependence-of-rate", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 8,
    statement: "A reaction's rate doubles for every 10 K rise in temperature. By what factor does the rate increase when the temperature rises by 30 K?",
    solution: r`$2^{30/10} = 2^3 = 8$.`,
    concept: "Temperature coefficient", formula: r`rate ratio $= \mu^{\Delta T/10}$`, whyFormula: "Repeated doubling.", mistakes: "Answering 6 (adding instead of multiplying).",
  },
  {
    topic: "temperature-dependence-of-rate", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`A plot of $\ln k$ against $1/T$ is a straight line with slope:`,
    options: [
      { text: r`$-E_a/R$`, correct: true, why: r`$\ln k = \ln A - \dfrac{E_a}{R}\cdot\dfrac1T$.` },
      { text: r`$+E_a/R$`, why: "k increases with T, so ln k falls as 1/T rises." },
      { text: r`$-E_a/2.303R$`, why: "That is for log₁₀ k." },
      { text: r`$\ln A$`, why: "That is the intercept." },
    ],
    solution: r`Take logarithms of $k = Ae^{-E_a/RT}$: $\ln k = \ln A - \dfrac{E_a}{R}\left(\dfrac1T\right)$.`,
    concept: "Arrhenius plot", formula: r`$\ln k = \ln A - \dfrac{E_a}{RT}$`, whyFormula: "Linear in 1/T.", mistakes: "Mixing ln and log slopes.",
  },
  {
    topic: "temperature-dependence-of-rate", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 140,
    statement: r`The activation energy of a forward reaction is $100\ \text{kJ mol}^{-1}$ and its enthalpy change is $-40\ \text{kJ mol}^{-1}$. Find the activation energy of the reverse reaction in kJ mol⁻¹.`,
    solution: r`$\Delta H = E_{a,f} - E_{a,b} \Rightarrow E_{a,b} = 100 - (-40) = 140\ \text{kJ mol}^{-1}$.`,
    concept: "Energy profile of a reaction", formula: r`$\Delta H = E_{a,f} - E_{a,b}$`, whyFormula: "Both barriers measured to the same transition state.", mistakes: "Subtracting the wrong way (60).",
  },
  {
    topic: "temperature-dependence-of-rate", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about a catalyst added to a reversible reaction are correct?",
    options: [
      { text: "It increases the forward and backward rate constants by the same factor", correct: true, why: "Both barriers fall by the same amount." },
      { text: "It raises the activation energy of the reverse reaction", why: "It lowers both barriers by the same amount; ΔH is unchanged." },
      { text: "It shifts the equilibrium towards the products", why: "K and the equilibrium composition are unchanged." },
      { text: "It does not change the equilibrium constant", correct: true, why: r`$K = k_f/k_b$ is unchanged.` },
    ],
    solution: r`The catalysed path lowers the transition-state energy, reducing both $E_{a,f}$ and $E_{a,b}$ by the same amount, so $k_f$ and $k_b$ rise by the same factor $e^{\Delta E_a/RT}$ (same A assumed). ΔH and K are state properties and stay the same; equilibrium is just reached sooner.`,
    concept: "Catalysis, kinetics and thermodynamics", formula: r`$K = k_f/k_b$`, whyFormula: "Ratio unchanged by equal factors.", mistakes: "Thinking a catalyst increases yield.",
  },

  // ── Groups 13 and 14 ──
  {
    topic: "groups-13-and-14", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Because of the inert pair effect, the most stable oxidation state of thallium is:",
    options: [
      { text: "+1", correct: true, why: "The 6s² pair is reluctant to take part in bonding." },
      { text: "+3", why: "Tl³⁺ is a strong oxidant — less stable." },
      { text: "+2", why: "Not typical for group 13." },
      { text: "−3", why: "Thallium is a metal." },
    ],
    solution: "Down group 13 the ns² electrons are held more tightly (poor shielding by d and f electrons), so the lower state (+1) becomes more stable: Tl⁺ > Tl³⁺.",
    concept: "Inert pair effect", formula: "Stability of (group oxidation state − 2) increases down the group", whyFormula: "Relativistic and shielding effects.", mistakes: "Assuming the group valency is always the most stable.",
  },
  {
    topic: "groups-13-and-14", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 2,
    statement: r`How many three-centre two-electron (B–H–B) bonds are there in diborane, $\text{B}_2\text{H}_6$?`,
    solution: "Diborane has four terminal B–H bonds (2c–2e) and two bridging B–H–B bonds (3c–2e, 'banana' bonds).",
    concept: "Structure of diborane", formula: "4 terminal + 2 bridging", whyFormula: "Electron-deficient bonding.", mistakes: "Treating diborane like ethane.",
  },
  {
    topic: "groups-13-and-14", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`Orthoboric acid, $\text{H}_3\text{BO}_3$, is:`,
    options: [
      { text: "a weak monobasic Lewis acid", correct: true, why: r`$\text{B(OH)}_3 + \text{H}_2\text{O} \to [\text{B(OH)}_4]^- + \text{H}^+$.` },
      { text: "a strong tribasic protonic acid", why: "It does not release its three H⁺ directly." },
      { text: "a base", why: "It is electron deficient: an acid." },
      { text: "amphoteric like Al(OH)₃", why: "It shows only acidic behaviour." },
    ],
    solution: "Boron's empty p orbital accepts OH⁻ from water, releasing one H⁺. So boric acid is a weak, monobasic Lewis acid.",
    concept: "Acidity of boric acid", formula: r`$\text{B(OH)}_3 + \text{H}_2\text{O} \rightleftharpoons [\text{B(OH)}_4]^- + \text{H}^+$`, whyFormula: "Electron-deficient boron.", mistakes: "Calling it tribasic.",
  },
  {
    topic: "groups-13-and-14", level: 4, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 4,
    statement: r`How many terminal B–H bonds are there in diborane, $\text{B}_2\text{H}_6$?`,
    solution: "Each boron has two terminal hydrogens: 4 terminal B–H bonds in all (lying in one plane); the other 2 H atoms bridge.",
    concept: "Structure of diborane", formula: "4 terminal + 2 bridging H", whyFormula: "Same structure as above.", mistakes: "Counting all six H as terminal.",
  },
  {
    topic: "groups-13-and-14", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about group 14 elements are correct?",
    options: [
      { text: r`$\text{CO}_2$ is a molecular gas but $\text{SiO}_2$ is a covalent network solid`, correct: true, why: "Si does not form stable pπ–pπ double bonds with O." },
      { text: r`$\text{Sn}^{2+}$ salts are good oxidising agents`, why: "Sn²⁺ is a reducing agent (it is oxidised to Sn⁴⁺)." },
      { text: r`$\text{PbCl}_4$ is less stable than $\text{SnCl}_4$`, correct: true, why: "Inert pair effect stabilises Pb²⁺." },
      { text: "Carbon readily forms pπ–pπ multiple bonds, silicon rarely does", correct: true, why: "Small size allows good π overlap for carbon." },
    ],
    solution: "Carbon, small and without d orbitals in its valence shell, forms strong pπ–pπ bonds (O=C=O as discrete molecules). Silicon forms single Si–O bonds in a 3D network. Down the group +2 becomes more stable: Sn²⁺ is reducing (→ Sn⁴⁺) while Pb⁴⁺ compounds are oxidising and less stable.",
    concept: "Trends and anomalies in group 14", formula: "Inert pair effect; catenation and multiple bonding", whyFormula: "Size and orbital overlap.", mistakes: "Mixing up which ions oxidise and reduce.",
  },

  // ── Lanthanoids and actinoids ──
  {
    topic: "lanthanoids-and-actinoids", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The most common oxidation state of the lanthanoids is:",
    options: [
      { text: "+3", correct: true, why: "Typical for all lanthanoids." },
      { text: "+2", why: "Shown by a few (Eu, Yb)." },
      { text: "+4", why: "Shown by a few (Ce, Tb)." },
      { text: "+1", why: "Not typical." },
    ],
    solution: "Removing the two 6s electrons and one 4f/5d electron gives the characteristic +3 state; +2 and +4 occur when they lead to f⁰, f⁷ or f¹⁴ configurations.",
    concept: "Oxidation states of lanthanoids", formula: "—", whyFormula: "Ionisation energies favour +3.", mistakes: "Treating +2/+4 as the general state.",
  },
  {
    topic: "lanthanoids-and-actinoids", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 7,
    statement: r`How many 4f electrons does $\text{Gd}^{3+}$ have? (Gd: $[\text{Xe}]\,4f^7\,5d^1\,6s^2$)`,
    solution: r`Removing 6s² and 5d¹ leaves $4f^7$: 7 electrons (a stable half-filled subshell).`,
    concept: "Configurations of lanthanoid ions", formula: "Remove 6s, then 5d, then 4f", whyFormula: "Order of ionisation.", mistakes: "Removing 4f first.",
  },
  {
    topic: "lanthanoids-and-actinoids", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Zirconium and hafnium have almost identical atomic radii because of:",
    options: [
      { text: "the lanthanoid contraction", correct: true, why: "Poor 4f shielding cancels the expected increase from Zr to Hf." },
      { text: "the inert pair effect", why: "That concerns ns² electrons of p-block elements." },
      { text: "the diagonal relationship", why: "That relates Li–Mg, Be–Al." },
      { text: "the actinoid contraction", why: "Actinoids come after Hf." },
    ],
    solution: "Between Zr (period 5) and Hf (period 6) the 14 lanthanoids add 4f electrons that shield poorly, so Hf's radius is about the same as Zr's. Their chemistry is so similar that separating them is difficult.",
    concept: "Lanthanoid contraction", formula: "—", whyFormula: "Poor shielding by f electrons.", mistakes: "Confusing with the inert pair effect.",
  },
  {
    topic: "lanthanoids-and-actinoids", level: 4, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 1,
    statement: r`How many unpaired electrons does $\text{Ce}^{3+}$ have? (Ce: $[\text{Xe}]\,4f^1\,5d^1\,6s^2$)`,
    solution: r`$\text{Ce}^{3+}$: $[\text{Xe}]\,4f^1$ — one unpaired electron.`,
    concept: "Lanthanoid ion configurations", formula: "—", whyFormula: "Remove 6s² and 5d¹.", mistakes: "Counting the 5d electron.",
  },
  {
    topic: "lanthanoids-and-actinoids", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about the f-block elements are correct?",
    options: [
      { text: "Actinoids show a wider range of oxidation states than lanthanoids", correct: true, why: "5f, 6d and 7s are closer in energy." },
      { text: "Lu(OH)₃ is more basic than La(OH)₃", why: "Basicity decreases from La to Lu as Ln³⁺ shrinks (lanthanoid contraction)." },
      { text: r`$\text{Eu}^{2+}$ is a good oxidising agent`, why: "It is a reducing agent (it goes to Eu³⁺)." },
      { text: r`$\text{Ce}^{4+}$ is a good oxidising agent`, correct: true, why: "It is reduced to the common +3 state." },
    ],
    solution: "Actinoid 5f, 6d and 7s energies are close, so many oxidation states occur (U up to +6, Np/Pu up to +7). The lanthanoid contraction makes Ln³⁺ smaller across the series, increasing covalent character and decreasing basicity. Ce⁴⁺ (f⁰) tends to gain an electron (oxidant); Eu²⁺ (f⁷) tends to lose one (reductant).",
    concept: "Comparing lanthanoids and actinoids", formula: "—", whyFormula: "Energy spacing of f, d, s orbitals.", mistakes: "Reversing Ce⁴⁺ and Eu²⁺ roles.",
  },

  // ── Coordination compounds · Nomenclature and isomerism ──
  {
    topic: "nomenclature-and-isomerism", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The IUPAC name of $[\text{Co(NH}_3)_6]\text{Cl}_3$ is:`,
    options: [
      { text: "hexaamminecobalt(III) chloride", correct: true, why: "Ligands alphabetically with prefix, metal with oxidation state, then the anion." },
      { text: "hexaamminecobalt(II) chloride", why: "Co is +3 here." },
      { text: "cobalt hexammine trichloride", why: "Not IUPAC order." },
      { text: "hexaamminecobaltate(III) chloride", why: "'-ate' is for anionic complexes." },
    ],
    solution: "Cation complex: ligand name with prefix (hexaammine), metal (cobalt), oxidation state in Roman numerals (III, since 3 Cl⁻ balance it), then the anion (chloride).",
    concept: "IUPAC nomenclature", formula: "—", whyFormula: "Naming rules for complexes.", mistakes: "Using '-ate' for a cationic complex.",
  },
  {
    topic: "nomenclature-and-isomerism", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 2,
    statement: r`How many geometrical isomers does square-planar $[\text{Pt(NH}_3)_2\text{Cl}_2]$ have?`,
    solution: "Two: cis (the two Cl adjacent) and trans (opposite). Cisplatin is the cis isomer.",
    concept: "Geometrical isomerism in square-planar complexes", formula: r`$MA_2B_2$ → 2 isomers`, whyFormula: "Adjacent vs opposite positions.", mistakes: "Thinking tetrahedral MA₂B₂ has isomers (it does not).",
  },
  {
    topic: "nomenclature-and-isomerism", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`One mole of $[\text{Co(NH}_3)_5\text{Cl}]\text{Cl}_2$ is treated with excess $\text{AgNO}_3$. The number of moles of AgCl precipitated is:`,
    options: [
      { text: "2", correct: true, why: "Only the counter-ion chlorides are free." },
      { text: "3", why: "One Cl is bound to cobalt." },
      { text: "1", why: "There are two ionisable chlorides." },
      { text: "0", why: "Free Cl⁻ ions precipitate." },
    ],
    solution: "Chloride inside the coordination sphere is not ionised. The two outer Cl⁻ ions precipitate as 2 AgCl.",
    concept: "Ionisable vs coordinated ligands", formula: "—", whyFormula: "Werner's theory.", mistakes: "Counting all three chlorides.",
  },
  {
    topic: "nomenclature-and-isomerism", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 3,
    statement: r`How many stereoisomers does $[\text{Co(en)}_2\text{Cl}_2]^+$ have?`,
    solution: "Geometrical: cis and trans. The trans isomer has a mirror plane (achiral); the cis isomer is chiral and exists as two enantiomers. Total stereoisomers: 2 (cis pair) + 1 (trans) = 3.",
    concept: "Geometrical and optical isomerism in octahedral complexes", formula: r`$[M(AA)_2B_2]$: 3 stereoisomers`, whyFormula: "Check each geometrical isomer for chirality.", mistakes: "Answering 2 (forgetting the cis enantiomers).",
  },
  {
    topic: "nomenclature-and-isomerism", level: 5, difficulty: "HARD", type: "MATCH", time: 180,
    statement: "Match each pair or compound in List-I with the type of structural isomerism it shows in List-II.",
    match: {
      left: [r`$[\text{Co(NH}_3)_5(\text{NO}_2)]\text{Cl}_2$ and $[\text{Co(NH}_3)_5(\text{ONO})]\text{Cl}_2$`, r`$[\text{Co(NH}_3)_6][\text{Cr(CN)}_6]$ and $[\text{Cr(NH}_3)_6][\text{Co(CN)}_6]$`, r`$[\text{Co(NH}_3)_5\text{Br}]\text{SO}_4$ and $[\text{Co(NH}_3)_5\text{SO}_4]\text{Br}$`, r`$[\text{Cr(H}_2\text{O)}_6]\text{Cl}_3$ and $[\text{Cr(H}_2\text{O)}_5\text{Cl}]\text{Cl}_2\cdot\text{H}_2\text{O}$`],
      right: ["Linkage isomerism", "Coordination isomerism", "Ionisation isomerism", "Hydrate (solvate) isomerism", "Optical isomerism"],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: "Each pair matched to its isomer type." },
      { text: "P→3, Q→2, R→1, S→4", why: "Swaps linkage and ionisation isomerism." },
      { text: "P→1, Q→3, R→2, S→4", why: "Swaps coordination and ionisation." },
      { text: "P→1, Q→2, R→3, S→5", why: "Hydrate isomers differ in water inside/outside the sphere, not chirality." },
    ],
    solution: "- Linkage: an ambidentate ligand (NO₂⁻ binds through N or O).\n- Coordination: ligands exchanged between cationic and anionic complexes.\n- Ionisation: the ions give different ions in solution (Br⁻ vs SO₄²⁻ precipitates).\n- Hydrate: water as ligand vs water of crystallisation.",
    concept: "Types of structural isomerism in complexes", formula: "—", whyFormula: "Classification by what is exchanged.", mistakes: "Confusing ionisation with coordination isomerism.",
  },

  // ── Basic principles of organic chemistry · Nomenclature and isomerism ──
  {
    topic: "nomenclature-and-isomerism-basic-principles-organic", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The IUPAC name of $\text{CH}_3\text{CH(CH}_3)\text{CH}_2\text{CH}_3$ is:`,
    options: [
      { text: "2-methylbutane", correct: true, why: "Longest chain 4 C, methyl at C2." },
      { text: "3-methylbutane", why: "Number from the end nearer the branch." },
      { text: "isopentane only (no IUPAC name)", why: "Isopentane is the common name; IUPAC is 2-methylbutane." },
      { text: "2-ethylpropane", why: "That would make a longer chain possible." },
    ],
    solution: "Longest chain: 4 carbons (butane). The methyl branch gets the lowest locant: C2. Name: 2-methylbutane (common name isopentane).",
    concept: "IUPAC nomenclature of alkanes", formula: "Longest chain, lowest locants", whyFormula: "IUPAC rules.", mistakes: "Not choosing the lowest locant.",
  },
  {
    topic: "nomenclature-and-isomerism-basic-principles-organic", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 3,
    statement: r`How many structural isomers does $\text{C}_5\text{H}_{12}$ have?`,
    solution: "n-pentane, 2-methylbutane (isopentane) and 2,2-dimethylpropane (neopentane): 3.",
    concept: "Chain isomerism", formula: "—", whyFormula: "Systematic branching.", mistakes: "Counting 3-methylbutane separately (it is 2-methylbutane).",
  },
  {
    topic: "nomenclature-and-isomerism-basic-principles-organic", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which compound shows geometrical (cis–trans) isomerism?",
    options: [
      { text: "but-2-ene", correct: true, why: "Each doubly bonded carbon carries two different groups (H and CH₃)." },
      { text: "but-1-ene", why: "C1 has two identical H atoms." },
      { text: "2-methylpropene", why: "C2 carries two identical CH₃ groups." },
      { text: "propene", why: "C1 has two identical H atoms." },
    ],
    solution: r`Cis–trans isomerism needs restricted rotation and two different groups on **each** doubly bonded carbon. In but-2-ene, $\text{CH}_3\text{CH}{=}\text{CHCH}_3$, each carbon has H and CH₃.`,
    concept: "Conditions for geometrical isomerism", formula: "abC=Cab (a ≠ b)", whyFormula: "Restricted rotation about C=C.", mistakes: "Requiring only one carbon to be different.",
  },
  {
    topic: "nomenclature-and-isomerism-basic-principles-organic", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 3,
    statement: "How many stereoisomers does 2,3-dibromobutane have?",
    solution: r`Two chiral centres, but the molecule is symmetrical: the (R,R) and (S,S) forms are enantiomers, and (R,S) is identical to (S,R) — a meso compound with an internal mirror plane. Total $2 + 1 = 3$ (not $2^2 = 4$).`,
    concept: "Meso compounds", formula: r`Symmetric, $n = 2$: $2^{n-1}$ active + $2^{n/2 - 1}$ meso`, whyFormula: "Symmetry removes one isomer.", mistakes: "Using 2ⁿ blindly.",
  },
  {
    topic: "nomenclature-and-isomerism-basic-principles-organic", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about butan-2-ol are correct?",
    options: [
      { text: "It has a meso form", why: "Meso forms need two or more chiral centres with internal symmetry; it has one." },
      { text: "It is chiral", correct: true, why: "C2 carries H, OH, CH₃ and C₂H₅." },
      { text: "Its two enantiomers have different boiling points", why: "Enantiomers have identical physical properties except the sign of optical rotation." },
      { text: "Its enantiomers rotate plane-polarised light by different amounts", why: "Equal magnitude, opposite sign; a 50 : 50 mixture is therefore inactive." },
    ],
    solution: "C2 is a stereocentre (four different groups), so butan-2-ol exists as a pair of enantiomers. Enantiomers share boiling points, densities and so on, differing only in the sign of optical rotation (and in reactions with other chiral substances). A 50 : 50 mixture shows no net rotation. With one stereocentre there is no meso form.",
    concept: "Chirality and enantiomers", formula: "Stereocentre: four different groups", whyFormula: "Origin of optical activity.", mistakes: "Thinking enantiomers differ in boiling point.",
  },

  // ── Aromatic hydrocarbons ──
  {
    topic: "aromatic-hydrocarbons", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In the nitration of benzene with concentrated nitric and sulphuric acids, the electrophile is:",
    options: [
      { text: r`$\text{NO}_2^+$ (nitronium ion)`, correct: true, why: "Formed by protonation of HNO₃ and loss of water." },
      { text: r`$\text{NO}_3^-$`, why: "An anion cannot attack an electron-rich ring." },
      { text: r`$\text{H}^+$`, why: "It generates the electrophile but does not substitute." },
      { text: r`$\text{NO}_2^-$`, why: "Nucleophile, not electrophile." },
    ],
    solution: r`$\text{HNO}_3 + 2\text{H}_2\text{SO}_4 \rightleftharpoons \text{NO}_2^+ + \text{H}_3\text{O}^+ + 2\text{HSO}_4^-$. $\text{NO}_2^+$ attacks the π system (electrophilic aromatic substitution).`,
    concept: "Electrophilic aromatic substitution", formula: "Generate E⁺, attack, lose H⁺", whyFormula: "General mechanism.", mistakes: "Choosing an anion as electrophile.",
  },
  {
    topic: "aromatic-hydrocarbons", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 6,
    statement: "How many π electrons are in the benzene ring?",
    solution: r`Three C=C bonds (in resonance) give 6 delocalised π electrons, satisfying Hückel's $4n + 2$ rule with $n = 1$.`,
    concept: "Aromaticity", formula: r`$4n + 2$ π electrons`, whyFormula: "Hückel's rule.", mistakes: "Counting σ electrons.",
  },
  {
    topic: "aromatic-hydrocarbons", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which substituent on benzene is meta-directing?",
    options: [
      { text: r`$-\text{NO}_2$`, correct: true, why: "Strongly electron-withdrawing; deactivates o/p most." },
      { text: r`$-\text{OH}$`, why: "o/p-directing, activating." },
      { text: r`$-\text{CH}_3$`, why: "o/p-directing, activating." },
      { text: r`$-\text{Cl}$`, why: "o/p-directing though deactivating." },
    ],
    solution: "Electron-withdrawing groups (−NO₂, −CHO, −COOH, −CN) remove electron density especially from ortho and para positions, so substitution occurs at meta. Halogens are the exception: deactivating yet o/p-directing (lone-pair resonance).",
    concept: "Directive influence", formula: "EWG → meta; EDG → o/p", whyFormula: "Stability of the arenium intermediates.", mistakes: "Treating halogens as meta-directors.",
  },
  {
    topic: "aromatic-hydrocarbons", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 4,
    statement: "How many structurally different monochloro derivatives of toluene are possible (ring and side chain)?",
    solution: "Ring: ortho, meta and para chlorotoluene (3). Side chain: benzyl chloride, C₆H₅CH₂Cl (1). Total 4.",
    concept: "Positional isomers", formula: "—", whyFormula: "Count non-equivalent H atoms.", mistakes: "Forgetting the side-chain product.",
  },
  {
    topic: "aromatic-hydrocarbons", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about Friedel–Crafts reactions are correct?",
    options: [
      { text: "Acylation does not suffer from rearrangement of the acyl group", correct: true, why: "The acylium ion is resonance-stabilised." },
      { text: "Alkylation of benzene with 1-chloropropane and AlCl₃ gives mainly n-propylbenzene", why: "The primary carbocation rearranges: isopropylbenzene is the main product." },
      { text: "Acylation readily gives polyacylated products", why: "The acyl group deactivates the ring, so acylation stops after one substitution (alkylation is the one that over-reacts)." },
      { text: "Nitrobenzene does not undergo Friedel–Crafts reactions", correct: true, why: "Strongly deactivated ring (and it is used as a solvent)." },
    ],
    solution: "Alkylation goes through carbocations that rearrange (n-propyl → isopropyl), and the product, activated by the alkyl group, reacts further (polyalkylation). Acylation uses a stable acylium ion (no rearrangement), and the acyl product is deactivated (no polyacylation). Strongly deactivated rings such as nitrobenzene do not react.",
    concept: "Limitations of Friedel–Crafts reactions", formula: "Carbocation stability; ring activation", whyFormula: "Mechanistic reasons.", mistakes: "Expecting the unrearranged alkyl product.",
  },

  // ── Alcohols, phenols and ethers ──
  {
    topic: "alcohols-phenols-and-ethers", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "With the Lucas reagent (conc. HCl + ZnCl₂) at room temperature, turbidity appears immediately for:",
    options: [
      { text: "tertiary alcohols", correct: true, why: "They form stable 3° carbocations fastest." },
      { text: "secondary alcohols", why: "Turbidity in about 5 minutes." },
      { text: "primary alcohols", why: "No turbidity at room temperature." },
      { text: "phenols", why: "The C–O bond of phenol is not replaced." },
    ],
    solution: "The test depends on SN1 conversion to an insoluble alkyl chloride. Rate follows carbocation stability: 3° (immediate) > 2° (~5 min) > 1° (no reaction at room temperature).",
    concept: "Lucas test", formula: "Carbocation stability order", whyFormula: "SN1 mechanism.", mistakes: "Reversing the order.",
  },
  {
    topic: "alcohols-phenols-and-ethers", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 4,
    statement: r`How many isomeric alcohols have the formula $\text{C}_4\text{H}_{10}\text{O}$?`,
    solution: "Butan-1-ol, butan-2-ol, 2-methylpropan-1-ol and 2-methylpropan-2-ol: 4 (the 3 ethers are not alcohols).",
    concept: "Isomeric alcohols", formula: "—", whyFormula: "Place –OH on each distinct carbon of each skeleton.", mistakes: "Including ethers.",
  },
  {
    topic: "alcohols-phenols-and-ethers", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Phenol is more acidic than ethanol because:",
    options: [
      { text: "the phenoxide ion is stabilised by resonance with the ring", correct: true, why: "Negative charge delocalised over the ring." },
      { text: "phenol has more hydrogen atoms", why: "Irrelevant." },
      { text: "ethoxide is stabilised by the ethyl group", why: "The ethyl group destabilises it (+I)." },
      { text: "phenol forms hydrogen bonds", why: "Both do." },
    ],
    solution: "Acidity reflects conjugate-base stability. Phenoxide's charge delocalises into the ring; ethoxide's is localised on O and pushed further by the +I effect of the ethyl group.",
    concept: "Acidity of phenols", formula: "Conjugate base stability", whyFormula: "Resonance delocalisation.", mistakes: "Giving a hydrogen-bonding reason.",
  },
  {
    topic: "alcohols-phenols-and-ethers", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 45, answer: 3,
    statement: "How many moles of Br₂ react with one mole of phenol in bromine water?",
    solution: "The strongly activated ring is substituted at both ortho positions and the para position: 2,4,6-tribromophenol (white precipitate). 3 mol Br₂ (3 HBr released).",
    concept: "Halogenation of phenol", formula: "–OH strongly activates o/p", whyFormula: "In polar water, polysubstitution occurs.", mistakes: "Answering 1 (that is in CS₂ at low temperature).",
  },
  {
    topic: "alcohols-phenols-and-ethers", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which statements about the acid-catalysed dehydration of alcohols (conc. H₂SO₄, heat) are correct?",
    options: [
      { text: "Primary alcohols dehydrate most easily", why: "Tertiary alcohols dehydrate most easily." },
      { text: "For 2° and 3° alcohols it proceeds through a carbocation", correct: true, why: "E1 mechanism." },
      { text: "The ease of dehydration is 3° > 2° > 1°", correct: true, why: "Follows carbocation stability." },
      { text: "Butan-2-ol gives mainly but-2-ene", correct: true, why: "Saytzeff: the more substituted alkene." },
    ],
    solution: "Protonation of –OH and loss of water gives a carbocation (2°, 3°), which loses a β-H. Rates follow carbocation stability (3° > 2° > 1°; 1° alcohols need harsher conditions). The major alkene is the more substituted one (Saytzeff), so butan-2-ol gives mainly but-2-ene.",
    concept: "Mechanism of alcohol dehydration", formula: "E1 via carbocation; Saytzeff product", whyFormula: "Carbocation stability and alkene stability.", mistakes: "Predicting but-1-ene as major.",
  },

  // ── Carboxylic acids ──
  {
    topic: "carboxylic-acids", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Carboxylic acids are more acidic than alcohols because:",
    options: [
      { text: "the carboxylate ion is stabilised by resonance between two equivalent oxygens", correct: true, why: "Charge shared equally over two O atoms." },
      { text: "they have higher molar masses", why: "Irrelevant." },
      { text: "the O–H bond in acids is shorter", why: "Not the explanation." },
      { text: "they are more soluble in water", why: "Solubility does not set acidity." },
    ],
    solution: "In RCOO⁻ the negative charge is delocalised equally over two electronegative oxygens (two equivalent resonance structures). Alkoxide has no such stabilisation.",
    concept: "Acidity of carboxylic acids", formula: "Conjugate base stability", whyFormula: "Resonance.", mistakes: "Using physical properties.",
  },
  {
    topic: "carboxylic-acids", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 2,
    statement: r`How many α-hydrogens are present in propanoic acid, $\text{CH}_3\text{CH}_2\text{COOH}$?`,
    solution: "The α-carbon is the CH₂ next to COOH: 2 α-hydrogens.",
    concept: "α-Hydrogens", formula: "H on the carbon adjacent to the carbonyl", whyFormula: "Definition.", mistakes: "Counting the CH₃ hydrogens.",
  },
  {
    topic: "carboxylic-acids", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which of these carboxylic acids is the strongest?",
    options: [
      { text: "methanoic acid (HCOOH)", correct: true, why: "No electron-donating alkyl group (pKa 3.75)." },
      { text: "ethanoic acid", why: "The +I methyl group weakens it (pKa 4.76)." },
      { text: "propanoic acid", why: "Larger +I effect (pKa 4.87)." },
      { text: "benzoic acid", why: "pKa 4.20 — stronger than acetic, weaker than formic." },
    ],
    solution: "Alkyl groups donate electrons (+I) and destabilise the carboxylate. Formic acid has none, so it is the strongest of these: HCOOH (3.75) > C₆H₅COOH (4.20) > CH₃COOH (4.76) > CH₃CH₂COOH (4.87).",
    concept: "Effect of substituents on acidity", formula: "+I lowers acidity, −I raises it", whyFormula: "Inductive effect on carboxylate stability.", mistakes: "Thinking larger acids are stronger.",
  },
  {
    topic: "carboxylic-acids", level: 4, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 4.74, tolerance: 0.01,
    statement: r`An acid has $K_a = 1.8\times10^{-5}$. Find its $\text{p}K_a$.`,
    solution: r`$\text{p}K_a = -\log(1.8\times10^{-5}) = 5 - \log1.8 = 5 - 0.255 = 4.745 \approx 4.74$.`,
    concept: "pKa", formula: r`$\text{p}K_a = -\log K_a$`, whyFormula: "Definition.", mistakes: "Using ln.",
  },
  {
    topic: "carboxylic-acids", level: 5, difficulty: "HARD", type: "MATCH", time: 180,
    statement: r`Match each acid in List-I with its approximate $\text{p}K_a$ in water in List-II.`,
    match: {
      left: [r`$\text{CCl}_3\text{COOH}$`, r`$\text{HCOOH}$`, r`$\text{C}_6\text{H}_5\text{COOH}$`, r`$\text{CH}_3\text{COOH}$`],
      right: ["0.7", "3.75", "4.20", "4.76", "9.9"],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: "Strongest to weakest: CCl₃COOH, HCOOH, C₆H₅COOH, CH₃COOH." },
      { text: "P→1, Q→3, R→2, S→4", why: "Formic acid is stronger than benzoic acid." },
      { text: "P→1, Q→2, R→3, S→5", why: "9.9 is phenol's pKa, not acetic acid's." },
      { text: "P→2, Q→1, R→3, S→4", why: "Three −I chlorines make CCl₃COOH by far the strongest." },
    ],
    solution: "Three electron-withdrawing Cl atoms make trichloroacetic acid strong (pKa ≈ 0.7). HCOOH (3.75) has no +I alkyl group. Benzoic acid (4.20): the sp² phenyl carbon withdraws slightly. Acetic acid (4.76): +I methyl. Phenol (9.9) is not a carboxylic acid.",
    concept: "Quantitative acidity order", formula: r`Lower $\text{p}K_a$ = stronger acid`, whyFormula: "Logarithmic scale.", mistakes: "Reading higher pKa as stronger.",
  },
];
