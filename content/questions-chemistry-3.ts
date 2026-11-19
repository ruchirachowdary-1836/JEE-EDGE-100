import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// One five-level set per chapter. Numerical answers are recomputed independently in tests/verify-answers.ts.

export const CHEMISTRY_QUESTIONS_3: QuestionSeed[] = [
  // ── Some Basic Concepts · Mole concept ──
  {
    topic: "mole-concept", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The number of molecules in 18 g of water is approximately:",
    options: [
      { text: r`$6.022\times10^{23}$`, correct: true, why: "18 g is one mole of H₂O." },
      { text: r`$3\times6.022\times10^{23}$`, why: "That is the number of atoms." },
      { text: r`$18\times6.022\times10^{23}$`, why: "Multiplies by the mass instead of using moles." },
      { text: r`$6.022\times10^{23}/18$`, why: "Divides the Avogadro number by the molar mass." },
    ],
    solution: r`Moles $= 18/18 = 1$; molecules $= 1\times N_A = 6.022\times10^{23}$. (Atoms: three per molecule.)`,
    concept: "Mole and Avogadro number", formula: r`$N = nN_A$`, whyFormula: "Convert mass to moles first.", mistakes: "Counting atoms instead of molecules.",
  },
  {
    topic: "mole-concept", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 11,
    statement: r`Find the mass (in g) of $0.25$ mol of carbon dioxide ($M = 44\ \text{g mol}^{-1}$).`,
    solution: r`$m = nM = 0.25\times44 = 11\ \text{g}$.`,
    concept: "Moles and mass", formula: r`$m = nM$`, whyFormula: "Definition of molar mass.", mistakes: "Using the atomic mass of carbon only.",
  },
  {
    topic: "mole-concept", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "A compound contains 40.0% C, 6.7% H and 53.3% O by mass. Its empirical formula is:",
    options: [
      { text: r`$\text{CH}_2\text{O}$`, correct: true, why: "Mole ratio C : H : O = 3.33 : 6.7 : 3.33 = 1 : 2 : 1." },
      { text: r`$\text{CHO}$`, why: "Ignores that H is twice C in moles." },
      { text: r`$\text{C}_2\text{H}_4\text{O}$`, why: "Ratio of C to O would be 2 : 1." },
      { text: r`$\text{CH}_2\text{O}_2$`, why: "Would need about 70% O." },
    ],
    solution: r`Per 100 g: C $40/12 = 3.33$, H $6.7/1 = 6.7$, O $53.3/16 = 3.33$ mol. Dividing by 3.33 gives $1 : 2 : 1$, so CH₂O.`,
    concept: "Empirical formula from percentage composition", formula: "Mole ratio = (mass %/atomic mass), divided by the smallest", whyFormula: "Formula ratios are mole ratios, not mass ratios.", mistakes: "Using mass percentages directly as ratios.",
  },
  {
    topic: "mole-concept", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 32,
    statement: r`Find the mass of oxygen (in g) needed for the complete combustion of $8\ \text{g}$ of methane.`,
    solution: r`$\text{CH}_4 + 2\text{O}_2 \to \text{CO}_2 + 2\text{H}_2\text{O}$. $8\ \text{g CH}_4 = 0.5\ \text{mol}$, needing $1\ \text{mol O}_2 = 32\ \text{g}$.`,
    concept: "Stoichiometry from a balanced equation", formula: "Mole ratio from coefficients", whyFormula: "The balanced equation fixes the mole ratio.", mistakes: "Using a 1 : 1 ratio.",
  },
  {
    topic: "mole-concept", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 300, answer: 50, tolerance: 1,
    statement: r`A $1.000\ \text{g}$ mixture of $\text{CaCO}_3$ and $\text{MgCO}_3$ is heated strongly until both decompose completely to the oxides ($\text{CaO}$ and $\text{MgO}$) and $\text{CO}_2$. The residue weighs $0.5181\ \text{g}$. Find the percentage by mass of $\text{CaCO}_3$ in the mixture. (Ca = 40, Mg = 24, C = 12, O = 16)`,
    solution: r`Let the mixture contain $x$ g CaCO₃ ($M = 100$) and $(1 - x)$ g MgCO₃ ($M = 84$).

Residue: CaO ($M = 56$) gives $0.56x$; MgO ($M = 40$) gives $\tfrac{40}{84}(1 - x) = 0.47619(1 - x)$.

$0.56x + 0.47619(1 - x) = 0.5181 \Rightarrow 0.08381x = 0.04191 \Rightarrow x = 0.500$.

So CaCO₃ is $50\%$ of the mixture.`,
    concept: "Simultaneous stoichiometry of a mixture", formula: r`$\text{MCO}_3 \to \text{MO} + \text{CO}_2$`, whyFormula: "Each carbonate's oxide fraction is fixed by molar masses; one equation in one unknown.", alt: r`Use the mass of CO₂ lost ($0.4819\ \text{g}$): $0.44x + \tfrac{44}{84}(1 - x) = 0.4819$ gives the same $x$.`, mistakes: "Taking a single molar mass for the mixture; forgetting that both carbonates lose CO₂.",
  },

  // ── Chemical Bonding · VSEPR and molecular geometry ──
  {
    topic: "vsepr-and-molecular-geometry", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The shape of the $\text{NH}_3$ molecule is:`,
    options: [
      { text: "trigonal pyramidal", correct: true, why: "Three bond pairs and one lone pair: tetrahedral electron geometry, pyramidal shape." },
      { text: "trigonal planar", why: "That needs three bond pairs and no lone pair (e.g. BF₃)." },
      { text: "tetrahedral", why: "That is the electron-pair geometry, not the molecular shape." },
      { text: "T-shaped", why: "That needs three bond pairs and two lone pairs (e.g. ClF₃)." },
    ],
    solution: r`N has 4 electron pairs (3 bonding, 1 lone): tetrahedral arrangement; ignoring the lone pair, the atoms form a trigonal pyramid (bond angle about $107^\circ$).`,
    concept: "VSEPR shapes", formula: "Shape from (bond pairs, lone pairs)", whyFormula: "Lone pairs occupy positions but are not part of the shape.", mistakes: "Naming the electron geometry instead of the molecular shape.",
  },
  {
    topic: "vsepr-and-molecular-geometry", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 2,
    statement: r`How many lone pairs are there on the central xenon atom in $\text{XeF}_4$?`,
    solution: r`Xe has 8 valence electrons; 4 are used in four Xe–F bonds, leaving 4 electrons = 2 lone pairs. Six electron pairs: octahedral arrangement, square-planar shape.`,
    concept: "Counting lone pairs", formula: "Lone pairs = (valence e⁻ − bonding e⁻ from central atom)/2", whyFormula: "Each single bond uses one electron of the central atom.", mistakes: "Counting the lone pairs on the fluorines.",
  },
  {
    topic: "vsepr-and-molecular-geometry", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which of the following species is linear?",
    options: [
      { text: r`$\text{XeF}_2$`, correct: true, why: "Two bond pairs and three lone pairs in the equatorial plane: linear." },
      { text: r`$\text{H}_2\text{O}$`, why: "Two lone pairs make it bent." },
      { text: r`$\text{SO}_2$`, why: "One lone pair on S: bent." },
      { text: r`$\text{NO}_2^-$`, why: "One lone pair on N: bent." },
    ],
    solution: r`XeF₂ has 5 electron pairs (trigonal bipyramidal). The three lone pairs take the equatorial positions to minimise repulsion, leaving the two F atoms axial: linear.`,
    concept: "Lone pairs in trigonal bipyramidal arrangements", formula: "Lone pairs prefer equatorial positions", whyFormula: "Equatorial positions have fewer 90° repulsions.", mistakes: "Thinking any molecule with lone pairs on the central atom must be bent.",
  },
  {
    topic: "vsepr-and-molecular-geometry", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 4,
    statement: r`How many of the following have at least one lone pair on the central atom? $\text{BF}_3$, $\text{NH}_3$, $\text{ClF}_3$, $\text{PCl}_5$, $\text{SF}_4$, $\text{XeF}_4$, $\text{CH}_4$`,
    solution: r`BF₃ (0), NH₃ (1), ClF₃ (2), PCl₅ (0), SF₄ (1), XeF₄ (2), CH₄ (0). Four species — NH₃, ClF₃, SF₄, XeF₄ — have lone pairs on the central atom.`,
    concept: "Electron-pair counting across many molecules", formula: "Lone pairs = (V − σ bonds)/2 for single-bonded molecules", whyFormula: "Fast to apply when all bonds are single bonds.", mistakes: "Missing the lone pair in SF₄ (see-saw).",
  },
  {
    topic: "vsepr-and-molecular-geometry", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: r`The correct order of bond angles in $\text{NH}_3$, $\text{NF}_3$ and $\text{PH}_3$ is:`,
    options: [
      { text: r`$\text{NH}_3 > \text{NF}_3 > \text{PH}_3$`, correct: true, why: "About 107°, 102° and 93.5°." },
      { text: r`$\text{NF}_3 > \text{NH}_3 > \text{PH}_3$`, why: "Electronegative F pulls bond pairs away from N, reducing repulsion, so NF₃ is smaller." },
      { text: r`$\text{PH}_3 > \text{NH}_3 > \text{NF}_3$`, why: "Larger, less electronegative P gives the smallest angle." },
      { text: r`$\text{NH}_3 = \text{NF}_3 > \text{PH}_3$`, why: "Ligand electronegativity changes the angle." },
    ],
    solution: r`All three have one lone pair (tetrahedral electron geometry), so two other factors decide:

1. **Ligand electronegativity:** in NF₃, F pulls the bonding pairs away from N, so they repel each other less and the angle shrinks (102°) compared with NH₃ (107°).
2. **Central-atom size and electronegativity:** P is larger and less electronegative than N, so the bond pairs in PH₃ are farther apart and the angle is close to 90° (93.5°; bonding uses nearly pure p orbitals).

Order: NH₃ > NF₃ > PH₃.`,
    concept: "Bond angles beyond basic VSEPR: electronegativity and size effects", formula: "Bond-pair repulsion grows as bonding pairs move closer to the central atom", whyFormula: "Explains differences between molecules with the same VSEPR count.", mistakes: "Expecting NF₃ to have a larger angle because F is bigger than H.",
  },

  // ── Chemical Thermodynamics · First law and enthalpy ──
  {
    topic: "first-law-and-enthalpy", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Hess's law of constant heat summation follows from the fact that enthalpy is:",
    options: [
      { text: "a state function", correct: true, why: "The change depends only on the initial and final states, not on the path." },
      { text: "an intensive property", why: "Enthalpy is extensive." },
      { text: "always negative for reactions", why: "Reactions can be endothermic." },
      { text: "equal to internal energy", why: r`$H = U + PV$.` },
    ],
    solution: "Because H is a state function, the enthalpy change between reactants and products is the same whatever the route, so the enthalpies of steps add up.",
    concept: "Hess's law", formula: r`$\Delta H_{\text{overall}} = \sum\Delta H_{\text{steps}}$`, whyFormula: "Path independence of state functions.", mistakes: "Calling enthalpy intensive.",
  },
  {
    topic: "first-law-and-enthalpy", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 90, answer: -110.5, tolerance: 0.2,
    statement: r`Given $\text{C(s)} + \text{O}_2\text{(g)} \to \text{CO}_2\text{(g)}$, $\Delta H = -393.5\ \text{kJ}$ and $\text{CO(g)} + \tfrac12\text{O}_2\text{(g)} \to \text{CO}_2\text{(g)}$, $\Delta H = -283.0\ \text{kJ}$, find the standard enthalpy of formation of CO in kJ mol⁻¹.`,
    solution: r`Target: $\text{C} + \tfrac12\text{O}_2 \to \text{CO}$. Subtract the second equation from the first: $\Delta H = -393.5 - (-283.0) = -110.5\ \text{kJ mol}^{-1}$.`,
    concept: "Hess's law with given equations", formula: r`$\Delta H_f(\text{CO}) = \Delta H_1 - \Delta H_2$`, whyFormula: "Reverse the CO combustion and add it to the C combustion.", mistakes: "Adding the two enthalpies.",
  },
  {
    topic: "first-law-and-enthalpy", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`For $\text{N}_2\text{(g)} + 3\text{H}_2\text{(g)} \to 2\text{NH}_3\text{(g)}$ at constant temperature:`,
    options: [
      { text: r`$\Delta H = \Delta U - 2RT$`, correct: true, why: r`$\Delta n_g = 2 - 4 = -2$.` },
      { text: r`$\Delta H = \Delta U + 2RT$`, why: "The sign of $\\Delta n_g$ is negative." },
      { text: r`$\Delta H = \Delta U$`, why: "That needs $\\Delta n_g = 0$." },
      { text: r`$\Delta H = \Delta U - 4RT$`, why: "Uses only the reactant moles." },
    ],
    solution: r`$\Delta H = \Delta U + \Delta n_gRT$ with $\Delta n_g = 2 - (1 + 3) = -2$, so $\Delta H = \Delta U - 2RT$ (ΔH is more negative than ΔU).`,
    concept: "Relation between ΔH and ΔU", formula: r`$\Delta H = \Delta U + \Delta n_gRT$`, whyFormula: "Ideal-gas behaviour of the gaseous species.", mistakes: "Counting liquids or solids in $\\Delta n_g$; sign of $\\Delta n_g$.",
  },
  {
    topic: "first-law-and-enthalpy", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: -87.4, tolerance: 0.2,
    statement: r`For $\text{N}_2\text{(g)} + 3\text{H}_2\text{(g)} \to 2\text{NH}_3\text{(g)}$, $\Delta H = -92.4\ \text{kJ}$ at $298\ \text{K}$. Find $\Delta U$ in kJ ($R = 8.314\ \text{J mol}^{-1}\text{K}^{-1}$).`,
    solution: r`$\Delta U = \Delta H - \Delta n_gRT = -92.4 - (-2)(8.314\times10^{-3})(298) = -92.4 + 4.96 \approx -87.4\ \text{kJ}$.`,
    concept: "Converting between ΔH and ΔU", formula: r`$\Delta U = \Delta H - \Delta n_gRT$`, whyFormula: "Same relation rearranged.", mistakes: "Forgetting to convert J to kJ in $RT$.",
  },
  {
    topic: "first-law-and-enthalpy", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: -892, tolerance: 1,
    statement: r`Using average bond enthalpies (kJ mol⁻¹) C–H 415, O=O 498, C=O (in CO₂) 804, O–H 463, and the enthalpy of vaporisation of water $44\ \text{kJ mol}^{-1}$, estimate $\Delta H$ (in kJ) for $\text{CH}_4\text{(g)} + 2\text{O}_2\text{(g)} \to \text{CO}_2\text{(g)} + 2\text{H}_2\text{O(l)}$.`,
    solution: r`Bond enthalpies apply to **gaseous** species, so first find $\Delta H$ for water vapour as product:

- Bonds broken: $4(\text{C–H}) + 2(\text{O=O}) = 4(415) + 2(498) = 2656\ \text{kJ}$.
- Bonds formed: $2(\text{C=O}) + 4(\text{O–H}) = 2(804) + 4(463) = 3460\ \text{kJ}$.
- $\Delta H(\text{H}_2\text{O(g)}) = 2656 - 3460 = -804\ \text{kJ}$.

Condensing 2 mol of water releases $2\times44 = 88\ \text{kJ}$: $\Delta H = -804 - 88 = -892\ \text{kJ}$ (the experimental value is about −890 kJ).`,
    concept: "Bond enthalpies combined with a phase change (Hess's law)", formula: r`$\Delta H = \sum B_{\text{broken}} - \sum B_{\text{formed}}$`, whyFormula: "Valid for gas-phase reactions; phase changes are added separately.", mistakes: "Applying bond enthalpies directly to liquid water; subtracting in the wrong order (formed − broken).",
  },

  // ── Solutions · Colligative properties ──
  {
    topic: "colligative-properties", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Colligative properties of dilute solutions depend on:",
    options: [
      { text: "the number of solute particles", correct: true, why: "Not on their identity." },
      { text: "the chemical nature of the solute", why: "That is what makes them colligative: nature does not matter." },
      { text: "the molar mass of the solvent only", why: "Solvent properties enter the constants, but the dependence is on particle number." },
      { text: "the colour of the solution", why: "Not related." },
    ],
    solution: "Relative lowering of vapour pressure, boiling-point elevation, freezing-point depression and osmotic pressure depend on the number of solute particles per amount of solvent, not on what the particles are.",
    concept: "Colligative properties", formula: r`$\Delta T_f = iK_fm$`, whyFormula: "The van 't Hoff factor counts particles.", mistakes: "Ignoring dissociation of electrolytes.",
  },
  {
    topic: "colligative-properties", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 0.186, tolerance: 0.002,
    statement: r`Find the depression in freezing point (in K) of a $0.1\ \text{mol kg}^{-1}$ aqueous glucose solution ($K_f = 1.86\ \text{K kg mol}^{-1}$).`,
    solution: r`Glucose does not dissociate ($i = 1$): $\Delta T_f = K_fm = 1.86\times0.1 = 0.186\ \text{K}$.`,
    concept: "Freezing-point depression", formula: r`$\Delta T_f = K_fm$`, whyFormula: "Dilute solution of a non-electrolyte.", mistakes: "Using molarity instead of molality.",
  },
  {
    topic: "colligative-properties", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 30,
    statement: r`Assuming complete dissociation, the van 't Hoff factor of $\text{K}_2\text{SO}_4$ in water is:`,
    options: [
      { text: "3", correct: true, why: "2 K⁺ + 1 SO₄²⁻." },
      { text: "2", why: "Counts types of ions, not their number." },
      { text: "7", why: "Counts atoms." },
      { text: "1", why: "That is a non-electrolyte." },
    ],
    solution: r`$\text{K}_2\text{SO}_4 \to 2\text{K}^+ + \text{SO}_4^{2-}$: three particles per formula unit, so $i = 3$.`,
    concept: "van 't Hoff factor", formula: r`$i = $ particles per formula unit`, whyFormula: "Complete dissociation assumed.", mistakes: "Counting the sulphate oxygens.",
  },
  {
    topic: "colligative-properties", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 2.46, tolerance: 0.02,
    statement: r`Find the osmotic pressure (in atm) of a $0.1\ \text{M}$ sucrose solution at $300\ \text{K}$ ($R = 0.0821\ \text{L atm K}^{-1}\text{mol}^{-1}$).`,
    solution: r`$\pi = CRT = 0.1\times0.0821\times300 = 2.46\ \text{atm}$.`,
    concept: "Osmotic pressure", formula: r`$\pi = iCRT$`, whyFormula: "Sucrose is a non-electrolyte ($i = 1$); molarity is used here.", mistakes: "Using °C.",
  },
  {
    topic: "colligative-properties", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 75, tolerance: 0.5,
    statement: r`$2.44\ \text{g}$ of benzoic acid ($M = 122\ \text{g mol}^{-1}$) dissolved in $100\ \text{g}$ of benzene lowers its freezing point by $0.64\ \text{K}$ ($K_f = 5.12\ \text{K kg mol}^{-1}$). Benzoic acid partly forms dimers in benzene. Find the percentage of molecules that dimerise.`,
    solution: r`Expected (no association): $m = \dfrac{2.44/122}{0.100} = 0.20\ \text{mol kg}^{-1}$, $\Delta T_f = 5.12\times0.20 = 1.024\ \text{K}$.

$i = \dfrac{0.64}{1.024} = 0.625$.

For $2A \rightleftharpoons A_2$ with degree of association $\alpha$: particles $= (1 - \alpha) + \alpha/2 = 1 - \alpha/2 = 0.625 \Rightarrow \alpha = 0.75$. So $75\%$ of the molecules are dimerised (by hydrogen bonding between COOH groups).`,
    concept: "Abnormal molar mass and association", formula: r`$i = 1 - \alpha\left(1 - \tfrac1n\right)$`, whyFormula: "For dimerisation, $n = 2$.", mistakes: "Using the dissociation formula $i = 1 + \\alpha$; inverting the ratio of observed to calculated.",
  },

  // ── Periodicity · Periodic trends ──
  {
    topic: "periodic-trends", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Across a period from left to right, atomic radius generally:",
    options: [
      { text: "decreases", correct: true, why: "Effective nuclear charge increases while electrons enter the same shell." },
      { text: "increases", why: "That is the trend down a group." },
      { text: "stays the same", why: "Effective nuclear charge changes." },
      { text: "first increases then decreases", why: "No such general trend in a period (noble gases are measured differently)." },
    ],
    solution: "Electrons are added to the same principal shell while the nuclear charge rises, so they are pulled closer: radius decreases across a period.",
    concept: "Atomic radius trend", formula: "Effective nuclear charge $Z_{\\text{eff}} = Z - S$", whyFormula: "Shielding by same-shell electrons is weak.", mistakes: "Mixing up period and group trends.",
  },
  {
    topic: "periodic-trends", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 16,
    statement: "What is the atomic number of the element in period 3 and group 16 of the modern periodic table?",
    solution: "Period 3 begins with Na (Z = 11) in group 1. Group 2 is Mg (12); groups 13–18 are Al (13) to Ar (18). Group 16 is sulphur, $Z = 16$.",
    concept: "Position in the periodic table", formula: "Period = principal quantum number of the valence shell", whyFormula: "Locating an element from its period and group.", mistakes: "Counting the d-block columns in period 3 (there are none).",
  },
  {
    topic: "periodic-trends", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "The first ionisation enthalpy of nitrogen is greater than that of oxygen because:",
    options: [
      { text: "nitrogen has a stable half-filled 2p³ configuration", correct: true, why: "Removing an electron from O (2p⁴) relieves electron pairing." },
      { text: "nitrogen has a larger nuclear charge", why: "Oxygen has the larger nuclear charge." },
      { text: "nitrogen is larger than oxygen", why: "A larger atom would make ionisation easier, not harder." },
      { text: "oxygen has a full 2p subshell", why: "Oxygen is 2p⁴." },
    ],
    solution: "N: 2p³ (half-filled, exchange-stabilised). O: 2p⁴ has one paired electron; repulsion within that pair makes it easier to remove. So IE₁(N) > IE₁(O) despite O's higher nuclear charge.",
    concept: "Exceptions to the ionisation enthalpy trend", formula: "Half-filled and filled subshells are extra stable", whyFormula: "Explains the dips in the IE trend.", mistakes: "Applying the general trend without checking configurations.",
  },
  {
    topic: "periodic-trends", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which element has the most negative electron gain enthalpy?",
    options: [
      { text: "Cl", correct: true, why: "Chlorine releases the most energy on gaining an electron." },
      { text: "F", why: "Fluorine's small 2p shell causes strong electron–electron repulsion, so it is less negative than Cl." },
      { text: "Br", why: "Larger than Cl; the added electron is farther from the nucleus." },
      { text: "O", why: "Group 16 elements are less negative than halogens." },
    ],
    solution: "Electron gain enthalpy becomes more negative across a period, so halogens are the most negative. Fluorine is an exception: its compact 2p subshell repels the incoming electron, so chlorine has the most negative value.",
    concept: "Electron gain enthalpy anomaly of fluorine", formula: "Size versus inter-electronic repulsion", whyFormula: "Small atoms crowd added electrons.", mistakes: "Choosing F because it is the most electronegative.",
  },
  {
    topic: "periodic-trends", level: 5, difficulty: "HARD", type: "MCQ", time: 120,
    statement: "Which order of ionic radii is correct?",
    options: [
      { text: r`$\text{Al}^{3+} < \text{Mg}^{2+} < \text{Na}^+ < \text{F}^- < \text{O}^{2-}$`, correct: true, why: "Isoelectronic (10 e⁻): radius falls as nuclear charge rises." },
      { text: r`$\text{O}^{2-} < \text{F}^- < \text{Na}^+ < \text{Mg}^{2+} < \text{Al}^{3+}$`, why: "Exactly reversed." },
      { text: r`$\text{Na}^+ < \text{Mg}^{2+} < \text{Al}^{3+} < \text{F}^- < \text{O}^{2-}$`, why: "Higher cationic charge means a smaller radius." },
      { text: r`$\text{Al}^{3+} < \text{Na}^+ < \text{Mg}^{2+} < \text{O}^{2-} < \text{F}^-$`, why: "Mixes the order within both sets." },
    ],
    solution: r`All five ions have 10 electrons (the neon configuration). With the same electron count, the ion with more protons pulls the electrons in more strongly: $Z$ = 8, 9, 11, 12, 13 for O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺. Radius therefore decreases in that order: $\text{O}^{2-} > \text{F}^- > \text{Na}^+ > \text{Mg}^{2+} > \text{Al}^{3+}$.`,
    concept: "Isoelectronic species", formula: "For equal electron count, radius ∝ 1/Z (qualitatively)", whyFormula: "Nuclear charge is the only differing factor.", mistakes: "Treating cation and anion trends separately and mixing them.",
  },

  // ── p-Block · Groups 15 to 18 ──
  {
    topic: "groups-15-to-18", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`Phosphorus forms $\text{PCl}_5$ but nitrogen does not form $\text{NCl}_5$, because:`,
    options: [
      { text: "nitrogen's valence shell (n = 2) has no d orbitals, so it cannot exceed four bonds", correct: true, why: "The unique behaviour of the first element of the group." },
      { text: "nitrogen is less electronegative than phosphorus", why: "Nitrogen is more electronegative." },
      { text: "chlorine does not react with nitrogen", why: "NCl₃ exists." },
      { text: "nitrogen is a metal", why: "Nitrogen is a non-metal." },
    ],
    solution: "Nitrogen has only 2s and 2p orbitals in its valence shell, so its maximum covalency is 4. Phosphorus (n = 3) can expand its valence beyond the octet.",
    concept: "Unique behaviour of the first element of a group", formula: "Maximum covalency of second-period elements = 4", whyFormula: "Only four valence orbitals are available.", mistakes: "Attributing it to electronegativity.",
  },
  {
    topic: "groups-15-to-18", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 4,
    statement: "What is the maximum covalency of nitrogen?",
    solution: r`Nitrogen can use its four valence orbitals (one 2s, three 2p) to form at most four bonds — as in $\text{NH}_4^+$, where one bond is a coordinate bond.`,
    concept: "Maximum covalency", formula: "Number of valence orbitals", whyFormula: "Each bond needs one orbital of the central atom.", mistakes: "Answering 5 (the group valence electrons) or 3 (common valency).",
  },
  {
    topic: "groups-15-to-18", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "In aqueous solution, the strongest acid among the hydrogen halides is:",
    options: [
      { text: "HI", correct: true, why: "The H–I bond is the weakest, so it ionises most readily." },
      { text: "HF", why: "HF is a weak acid due to the very strong H–F bond (and hydrogen bonding)." },
      { text: "HCl", why: "Strong, but weaker than HBr and HI." },
      { text: "HBr", why: "Weaker than HI." },
    ],
    solution: "Acid strength increases HF < HCl < HBr < HI because bond dissociation enthalpy falls as the halogen gets larger.",
    concept: "Acid strength of hydrogen halides", formula: "Bond strength dominates over electronegativity here", whyFormula: "Down a group, bond length increases and strength decreases.", mistakes: "Choosing HF because F is the most electronegative.",
  },
  {
    topic: "groups-15-to-18", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "The correct order of boiling points of the group 16 hydrides is:",
    options: [
      { text: r`$\text{H}_2\text{O} > \text{H}_2\text{Te} > \text{H}_2\text{Se} > \text{H}_2\text{S}$`, correct: true, why: "Water is anomalous (hydrogen bonding); the rest rise with molar mass." },
      { text: r`$\text{H}_2\text{Te} > \text{H}_2\text{Se} > \text{H}_2\text{S} > \text{H}_2\text{O}$`, why: "Ignores hydrogen bonding in water." },
      { text: r`$\text{H}_2\text{O} > \text{H}_2\text{S} > \text{H}_2\text{Se} > \text{H}_2\text{Te}$`, why: "Without hydrogen bonding, boiling point increases with size." },
      { text: r`$\text{H}_2\text{S} > \text{H}_2\text{O} > \text{H}_2\text{Se} > \text{H}_2\text{Te}$`, why: "H₂S has the lowest boiling point." },
    ],
    solution: "H₂O (100 °C) is far above the others because of hydrogen bonding. Among H₂S (−60 °C), H₂Se (−41 °C) and H₂Te (−2 °C), boiling point increases with molar mass (stronger dispersion forces).",
    concept: "Anomalous behaviour of the first member", formula: "Intermolecular forces: hydrogen bonding vs dispersion", whyFormula: "Explains the exception and the trend together.", mistakes: "Applying only one of the two effects.",
  },
  {
    topic: "groups-15-to-18", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: r`For the group 15 hydrides $\text{NH}_3, \text{PH}_3, \text{AsH}_3, \text{SbH}_3, \text{BiH}_3$, which statement is correct?`,
    options: [
      { text: "Bond angle and thermal stability both decrease from NH₃ to BiH₃", correct: true, why: "Both follow from the increasing size of the central atom." },
      { text: "Reducing character decreases from NH₃ to BiH₃", why: "Weaker E–H bonds make the heavier hydrides stronger reducing agents." },
      { text: "Basic character increases from NH₃ to BiH₃", why: "The lone pair becomes more diffuse, so basicity decreases." },
      { text: "NH₃ has the lowest boiling point because it is the lightest", why: "Hydrogen bonding gives NH₃ (−33 °C) a higher boiling point than PH₃ (−88 °C)." },
    ],
    solution: r`Down the group the central atom grows larger and less electronegative:

- The E–H bond gets longer and weaker → **thermal stability decreases** and **reducing character increases**.
- Bond pairs lie farther from the central atom → **bond angle decreases** (107° → about 90°).
- The lone pair spreads over a larger volume → **basic character decreases**.
- Boiling point: NH₃ is anomalously high (hydrogen bonding); the rest increase with size.

Only the first statement is correct.`,
    concept: "Combining several group trends", formula: "Size → bond strength → stability, reducing power, basicity, bond angle", whyFormula: "One underlying change explains all the trends.", mistakes: "Assuming every property simply decreases down the group.",
  },

  // ── d- and f-Block · Transition elements ──
  {
    topic: "transition-elements", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Zinc is usually not regarded as a transition element because:",
    options: [
      { text: "it has a completely filled 3d subshell in its atom and in its common ion Zn²⁺", correct: true, why: "A transition element has an incompletely filled d subshell in the atom or a common ion." },
      { text: "it is a non-metal", why: "Zinc is a metal." },
      { text: "it has no d electrons", why: "It has ten 3d electrons." },
      { text: "it shows many oxidation states", why: "It shows essentially only +2." },
    ],
    solution: r`Zn: [Ar] 3d¹⁰4s²; Zn²⁺: [Ar] 3d¹⁰. Neither has a partly filled d subshell, so zinc does not show typical transition properties (variable oxidation states, coloured ions, paramagnetism).`,
    concept: "Definition of a transition element", formula: "Incompletely filled d subshell in the atom or a common ion", whyFormula: "The IUPAC-style criterion used in NCERT.", mistakes: "Thinking any d-block element is a transition element.",
  },
  {
    topic: "transition-elements", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 60, answer: 5.92, tolerance: 0.02,
    statement: r`Find the spin-only magnetic moment (in BM) of $\text{Fe}^{3+}$.`,
    solution: r`Fe: [Ar] 3d⁶4s². Fe³⁺ loses the two 4s and one 3d electron: 3d⁵, with 5 unpaired electrons. $\mu = \sqrt{n(n + 2)} = \sqrt{35} \approx 5.92\ \text{BM}$.`,
    concept: "Spin-only magnetic moment", formula: r`$\mu = \sqrt{n(n + 2)}\ \text{BM}$`, whyFormula: "Orbital contribution is quenched in most 3d ions.", mistakes: "Removing 3d electrons before 4s.",
  },
  {
    topic: "transition-elements", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The oxidation state of manganese in $\text{KMnO}_4$ is:`,
    options: [
      { text: "+7", correct: true, why: "+1 + x + 4(−2) = 0." },
      { text: "+6", why: "That is manganate, K₂MnO₄." },
      { text: "+4", why: "That is MnO₂." },
      { text: "+2", why: "That is Mn²⁺ salts." },
    ],
    solution: r`$+1 + x + 4(-2) = 0 \Rightarrow x = +7$.`,
    concept: "Oxidation number", formula: "Sum of oxidation numbers = charge", whyFormula: "Standard rule.", mistakes: "Confusing permanganate with manganate.",
  },
  {
    topic: "transition-elements", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 20,
    statement: r`What volume (in mL) of $0.02\ \text{M}$ $\text{KMnO}_4$ is needed to oxidise $20\ \text{mL}$ of $0.1\ \text{M}$ $\text{FeSO}_4$ in acidic solution?`,
    solution: r`$\text{MnO}_4^- + 5\text{Fe}^{2+} + 8\text{H}^+ \to \text{Mn}^{2+} + 5\text{Fe}^{3+} + 4\text{H}_2\text{O}$. Moles Fe²⁺ $= 2\times10^{-3}$; moles MnO₄⁻ $= 4\times10^{-4}$; volume $= 4\times10^{-4}/0.02 = 0.020\ \text{L} = 20\ \text{mL}$.`,
    concept: "Permanganate titration in acidic medium", formula: r`$\text{MnO}_4^- + 8\text{H}^+ + 5e^- \to \text{Mn}^{2+} + 4\text{H}_2\text{O}$`, whyFormula: "In acid, each Mn accepts 5 electrons.", mistakes: "Using the 3-electron change of neutral/weakly basic medium.",
  },
  {
    topic: "transition-elements", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: "Which pair of ions has the same spin-only magnetic moment?",
    options: [
      { text: r`$\text{Mn}^{2+}$ and $\text{Fe}^{3+}$`, correct: true, why: "Both are 3d⁵ with 5 unpaired electrons (5.92 BM)." },
      { text: r`$\text{Fe}^{2+}$ and $\text{Co}^{2+}$`, why: "3d⁶ (4 unpaired) vs 3d⁷ (3 unpaired)." },
      { text: r`$\text{Cr}^{3+}$ and $\text{V}^{3+}$`, why: "3d³ (3 unpaired) vs 3d² (2 unpaired)." },
      { text: r`$\text{Cu}^{2+}$ and $\text{Zn}^{2+}$`, why: "3d⁹ (1 unpaired) vs 3d¹⁰ (0)." },
    ],
    solution: r`Write the ion configurations (4s electrons leave first): Mn²⁺ 3d⁵, Fe³⁺ 3d⁵, Fe²⁺ 3d⁶, Co²⁺ 3d⁷, Cr³⁺ 3d³, V³⁺ 3d², Cu²⁺ 3d⁹, Zn²⁺ 3d¹⁰. Free (high-spin) ions put one electron in each d orbital before pairing (Hund's rule). Only Mn²⁺ and Fe³⁺ have the same number of unpaired electrons (5).`,
    concept: "Ionic configurations and Hund's rule", formula: r`$\mu = \sqrt{n(n + 2)}$`, whyFormula: "Equal $n$ means equal spin-only moment.", mistakes: "Removing 3d electrons before 4s; pairing too early.",
  },

  // ── Coordination Compounds · Bonding ──
  {
    topic: "bonding-in-coordination-compounds", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The coordination number of cobalt in $[\text{Co(NH}_3)_6]^{3+}$ is:`,
    options: [
      { text: "6", correct: true, why: "Six monodentate NH₃ ligands." },
      { text: "3", why: "That is the oxidation state." },
      { text: "9", why: "Adds the charge and the ligand count." },
      { text: "18", why: "Counts hydrogen atoms." },
    ],
    solution: "Coordination number = number of donor atoms bonded to the metal = 6 (each NH₃ donates through N).",
    concept: "Coordination number", formula: "Number of ligand donor atoms", whyFormula: "Definition.", mistakes: "Confusing coordination number with oxidation state.",
  },
  {
    topic: "bonding-in-coordination-compounds", level: 2, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 1,
    statement: r`How many unpaired electrons are present in $[\text{Fe(CN)}_6]^{3-}$?`,
    solution: r`Fe³⁺ is 3d⁵. CN⁻ is a strong-field ligand, so the octahedral complex is low-spin: $t_{2g}^5e_g^0$, with one unpaired electron.`,
    concept: "Strong-field ligands and low-spin complexes", formula: "Pairing when $\\Delta_o > P$", whyFormula: "CN⁻ produces a large splitting.", mistakes: "Using the free-ion count (5).",
  },
  {
    topic: "bonding-in-coordination-compounds", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`$[\text{Ni(CO)}_4]$ is:`,
    options: [
      { text: "tetrahedral and diamagnetic", correct: true, why: "Ni(0), 3d¹⁰ after pairing; sp³ hybridisation." },
      { text: "square planar and diamagnetic", why: "Square planar needs dsp² with an empty 3d orbital." },
      { text: "tetrahedral and paramagnetic", why: "All electrons are paired." },
      { text: "octahedral", why: "There are only four ligands." },
    ],
    solution: r`Ni is in oxidation state 0 (3d⁸4s²). CO is a strong-field ligand: the 4s electrons are pushed into 3d, giving 3d¹⁰. The empty 4s and 4p orbitals form sp³ hybrids: tetrahedral, diamagnetic.`,
    concept: "Valence bond description of carbonyls", formula: "sp³ → tetrahedral", whyFormula: "Hybridisation from the available empty orbitals.", mistakes: "Taking Ni as Ni²⁺.",
  },
  {
    topic: "bonding-in-coordination-compounds", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 2.4,
    statement: r`Find the magnitude of the crystal field stabilisation energy (in units of $\Delta_o$, ignoring pairing energy) for a low-spin octahedral $d^6$ complex.`,
    solution: r`Low-spin $d^6$: $t_{2g}^6e_g^0$. CFSE $= 6\times(-0.4\Delta_o) + 0\times(0.6\Delta_o) = -2.4\Delta_o$; magnitude $2.4$.`,
    concept: "Crystal field stabilisation energy", formula: r`$\text{CFSE} = (-0.4n_{t_{2g}} + 0.6n_{e_g})\Delta_o$`, whyFormula: "Octahedral splitting with the barycentre preserved.", mistakes: "Using the high-spin configuration $t_{2g}^4e_g^2$ ($-0.4\\Delta_o$).",
  },
  {
    topic: "bonding-in-coordination-compounds", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 2.83, tolerance: 0.02,
    statement: r`Find the sum of the spin-only magnetic moments (in BM) of $[\text{NiCl}_4]^{2-}$ and $[\text{Ni(CN)}_4]^{2-}$.`,
    solution: r`Both contain Ni²⁺ (3d⁸).

- $[\text{NiCl}_4]^{2-}$: Cl⁻ is a weak-field ligand; no pairing; sp³ tetrahedral with 2 unpaired electrons: $\mu = \sqrt{8} \approx 2.83\ \text{BM}$.
- $[\text{Ni(CN)}_4]^{2-}$: CN⁻ is strong-field; the two unpaired 3d electrons pair up, freeing one 3d orbital for dsp² (square planar); diamagnetic, $\mu = 0$.

Sum $= 2.83\ \text{BM}$.`,
    concept: "Ligand field strength decides geometry and magnetism", formula: r`$\mu = \sqrt{n(n + 2)}$`, whyFormula: "Needs the unpaired count in each complex separately.", mistakes: "Assuming both are tetrahedral because both have four ligands.",
  },

  // ── Purification and characterisation ──
  {
    topic: "purification-and-analysis", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Aniline can be separated from a mixture with water-soluble non-volatile impurities by:",
    options: [
      { text: "steam distillation", correct: true, why: "Aniline is steam-volatile and immiscible with water." },
      { text: "sublimation", why: "Aniline is a liquid." },
      { text: "crystallisation", why: "Used for solids." },
      { text: "simple filtration", why: "Does not separate a dissolved or liquid component." },
    ],
    solution: "Steam distillation suits substances that are volatile in steam and immiscible with water: the mixture boils below 100 °C because the vapour pressures add.",
    concept: "Choosing a purification method", formula: r`$p_{\text{total}} = p_{\text{water}} + p_{\text{organic}}$`, whyFormula: "Boiling when the sum reaches atmospheric pressure.", mistakes: "Using simple distillation for a high-boiling, heat-sensitive liquid.",
  },
  {
    topic: "purification-and-analysis", level: 2, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 56,
    statement: r`In Kjeldahl's method, the ammonia from $0.5\ \text{g}$ of an organic compound neutralises $10\ \text{mL}$ of $1\ \text{M}$ $\text{H}_2\text{SO}_4$. Find the percentage of nitrogen.`,
    solution: r`$\text{H}_2\text{SO}_4 + 2\text{NH}_3 \to (\text{NH}_4)_2\text{SO}_4$. Moles H₂SO₄ $= 0.01$, so NH₃ $= 0.02$ mol and N $= 0.02\times14 = 0.28\ \text{g}$. Percentage $= 0.28/0.5\times100 = 56\%$.`,
    concept: "Kjeldahl's method", formula: r`$\%\text{N} = \dfrac{1.4\times M\times2V}{w}$ (for H₂SO₄)`, whyFormula: "Each mole of H₂SO₄ neutralises 2 mol NH₃.", mistakes: "Forgetting the factor 2 for the dibasic acid.",
  },
  {
    topic: "purification-and-analysis", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "In Lassaigne's test, a blood-red colour on adding FeCl₃ to the sodium fusion extract shows the presence of:",
    options: [
      { text: "both nitrogen and sulphur", correct: true, why: "NaSCN forms and gives red Fe(SCN)²⁺ with Fe³⁺." },
      { text: "nitrogen only", why: "Nitrogen alone gives Prussian blue (with FeSO₄, then acid)." },
      { text: "sulphur only", why: "Sulphur alone is detected by lead acetate (black) or nitroprusside (violet)." },
      { text: "a halogen", why: "Halogens are detected with AgNO₃." },
    ],
    solution: "When both N and S are present, sodium thiocyanate (NaSCN) forms during fusion. Fe³⁺ gives the blood-red Fe(SCN)²⁺ complex.",
    concept: "Detection of elements", formula: r`$\text{Fe}^{3+} + \text{SCN}^- \to [\text{Fe(SCN)}]^{2+}$ (red)`, whyFormula: "Thiocyanate forms only when both elements are present.", mistakes: "Confusing the Prussian blue and blood-red tests.",
  },
  {
    topic: "purification-and-analysis", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 35.5, tolerance: 0.2,
    statement: r`In a Carius determination, $0.20\ \text{g}$ of an organic compound gave $0.287\ \text{g}$ of AgCl. Find the percentage of chlorine (Ag = 108, Cl = 35.5).`,
    solution: r`AgCl $= 143.5\ \text{g mol}^{-1}$. Mass of Cl $= 0.287\times\dfrac{35.5}{143.5} = 0.0710\ \text{g}$. Percentage $= 0.0710/0.20\times100 = 35.5\%$.`,
    concept: "Carius method for halogens", formula: r`$\%\text{Cl} = \dfrac{35.5}{143.5}\times\dfrac{m_{\text{AgCl}}}{w}\times100$`, whyFormula: "All the chlorine ends up as AgCl.", mistakes: "Using the mass of AgCl as the mass of chlorine.",
  },
  {
    topic: "purification-and-analysis", level: 5, difficulty: "HARD", type: "NUMERICAL", time: 240, answer: 6,
    statement: r`$0.30\ \text{g}$ of a compound containing only C, H and O gave $0.44\ \text{g}$ of $\text{CO}_2$ and $0.18\ \text{g}$ of $\text{H}_2\text{O}$ on combustion. Its molar mass is $180\ \text{g mol}^{-1}$. How many carbon atoms are there in one molecule?`,
    solution: r`C: $0.44\times\tfrac{12}{44} = 0.12\ \text{g}$ (0.010 mol). H: $0.18\times\tfrac{2}{18} = 0.02\ \text{g}$ (0.020 mol). O by difference: $0.30 - 0.12 - 0.02 = 0.16\ \text{g}$ (0.010 mol).

Ratio C : H : O $= 1 : 2 : 1$ → empirical formula CH₂O (30 g mol⁻¹). $n = 180/30 = 6$: molecular formula $\text{C}_6\text{H}_{12}\text{O}_6$, so 6 carbon atoms.`,
    concept: "Combustion analysis to molecular formula", formula: "Molecular formula = $n\\times$ empirical formula, $n = M/M_{\\text{emp}}$", whyFormula: "Combustion gives the ratio; the molar mass gives $n$.", mistakes: "Forgetting to find O by difference; using H = 1/18 of the water mass.",
  },

  // ── Basic principles of organic chemistry · Electronic effects and intermediates ──
  {
    topic: "electronic-effects-and-intermediates", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The most stable carbocation among the following is:",
    options: [
      { text: r`$(\text{CH}_3)_3\text{C}^+$`, correct: true, why: "Tertiary: most hyperconjugation and +I donation." },
      { text: r`$(\text{CH}_3)_2\text{CH}^+$`, why: "Secondary." },
      { text: r`$\text{CH}_3\text{CH}_2^+$`, why: "Primary." },
      { text: r`$\text{CH}_3^+$`, why: "Methyl cation: least stabilised." },
    ],
    solution: "Alkyl groups stabilise a carbocation by hyperconjugation and the +I effect. Stability: 3° > 2° > 1° > methyl.",
    concept: "Carbocation stability", formula: "More α-H → more hyperconjugative structures", whyFormula: "Delocalises the positive charge.", mistakes: "Thinking larger means less stable.",
  },
  {
    topic: "electronic-effects-and-intermediates", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 9,
    statement: r`How many α-hydrogens (C–H bonds available for hyperconjugation) are there in the tert-butyl carbocation $(\text{CH}_3)_3\text{C}^+$?`,
    solution: "The cationic carbon has three CH₃ groups attached; each has 3 C–H bonds adjacent to the positive carbon: $3\\times3 = 9$.",
    concept: "Hyperconjugation", formula: "Number of α-H", whyFormula: "Each α-C–H bond can overlap with the empty p orbital.", mistakes: "Counting only one methyl group.",
  },
  {
    topic: "electronic-effects-and-intermediates", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "The strongest acid among the following is:",
    options: [
      { text: r`$\text{Cl}_3\text{CCOOH}$`, correct: true, why: "Three −I chlorines stabilise the carboxylate most." },
      { text: r`$\text{Cl}_2\text{CHCOOH}$`, why: "Two chlorines: strong, but less than three." },
      { text: r`$\text{ClCH}_2\text{COOH}$`, why: "One chlorine." },
      { text: r`$\text{CH}_3\text{COOH}$`, why: "No electron-withdrawing substituent." },
    ],
    solution: "Electron-withdrawing (−I) groups spread the negative charge of the conjugate base and stabilise it. More Cl atoms → stronger acid: CCl₃COOH (pKₐ ≈ 0.7) > CHCl₂COOH > CH₂ClCOOH > CH₃COOH (4.76).",
    concept: "Inductive effect on acidity", formula: "Stability of the conjugate base", whyFormula: "The more stable the anion, the stronger the acid.", mistakes: "Ignoring the additive nature of −I effects.",
  },
  {
    topic: "electronic-effects-and-intermediates", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "Which carbocation is the most stable?",
    options: [
      { text: r`benzyl, $\text{C}_6\text{H}_5\text{CH}_2^+$`, correct: true, why: "The positive charge is delocalised into the ring by resonance." },
      { text: r`ethyl, $\text{CH}_3\text{CH}_2^+$`, why: "Only three hyperconjugating C–H bonds." },
      { text: r`vinyl, $\text{CH}_2{=}\text{CH}^+$`, why: "Positive charge on an sp carbon: very unstable." },
      { text: r`methyl, $\text{CH}_3^+$`, why: "No stabilisation." },
    ],
    solution: "In the benzyl cation the empty p orbital overlaps with the ring π system, spreading the charge over the ortho and para carbons. Resonance outweighs the few hyperconjugative forms of a primary alkyl cation. The vinyl cation is least stable (charge on a more electronegative sp carbon).",
    concept: "Resonance stabilisation of carbocations", formula: "Resonance > hyperconjugation (usually)", whyFormula: "Delocalisation over several atoms.", mistakes: "Counting the benzyl cation as an ordinary primary cation.",
  },
  {
    topic: "electronic-effects-and-intermediates", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: "The correct order of acid strength is:",
    options: [
      { text: "p-nitrophenol > phenol > p-methylphenol > ethanol", correct: true, why: "−R/−I of NO₂ helps, +I/hyperconjugation of CH₃ hurts, and ethoxide has no resonance." },
      { text: "phenol > p-nitrophenol > p-methylphenol > ethanol", why: "The nitro group increases acidity." },
      { text: "p-methylphenol > phenol > p-nitrophenol > ethanol", why: "Electron donors destabilise the phenoxide ion." },
      { text: "ethanol > phenol > p-nitrophenol > p-methylphenol", why: "Alcohols are weaker acids than phenols." },
    ],
    solution: r`Compare the stability of the conjugate bases:

1. **Phenoxide vs ethoxide:** phenoxide's negative charge is delocalised into the ring; ethoxide's is localised (and destabilised by +I of the ethyl group). So phenols ≫ ethanol.
2. **para-NO₂:** withdraws electrons by resonance (−R) and induction (−I), delocalising the charge onto the nitro oxygens — strongest acid (pKₐ ≈ 7.2).
3. **para-CH₃:** donates electrons (+I, hyperconjugation), destabilising the phenoxide — weaker than phenol (pKₐ ≈ 10.3 vs 10.0).

Order: p-nitrophenol > phenol > p-methylphenol > ethanol.`,
    concept: "Combining resonance and inductive effects", formula: "Acid strength ↔ conjugate-base stability", whyFormula: "One criterion applied to every compound.", mistakes: "Treating the nitro group as an electron donor; ranking ethanol above phenol.",
  },

  // ── Hydrocarbons · Alkanes, alkenes and alkynes ──
  {
    topic: "alkanes-alkenes-and-alkynes", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Addition of HBr to propene in the absence of peroxide gives mainly:",
    options: [
      { text: "2-bromopropane", correct: true, why: "Markovnikov addition via the more stable secondary carbocation." },
      { text: "1-bromopropane", why: "That is the anti-Markovnikov product (peroxide effect)." },
      { text: "1,2-dibromopropane", why: "That forms with Br₂, not HBr." },
      { text: "propane", why: "That needs H₂." },
    ],
    solution: "H⁺ adds to the terminal CH₂ to give the more stable secondary carbocation CH₃CH⁺CH₃; Br⁻ then attacks it, giving 2-bromopropane.",
    concept: "Markovnikov's rule", formula: "Electrophilic addition via the more stable carbocation", whyFormula: "The rule follows from carbocation stability.", mistakes: "Applying the peroxide effect without peroxide.",
  },
  {
    topic: "alkanes-alkenes-and-alkynes", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 3,
    statement: r`How many moles of $\text{H}_2$ are consumed per mole of but-1-en-3-yne, $\text{CH}_2{=}\text{CH–C}{\equiv}\text{CH}$, on complete hydrogenation to butane?`,
    solution: "One C=C needs 1 mol H₂; one C≡C needs 2 mol H₂. Total 3 mol (C₄H₄ → C₄H₁₀).",
    concept: "Degree of unsaturation", formula: "C=C: 1 H₂, C≡C: 2 H₂", whyFormula: "Each π bond takes one H₂.", mistakes: "Counting a triple bond as one π bond.",
  },
  {
    topic: "alkanes-alkenes-and-alkynes", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Propene reacts with HBr in the presence of benzoyl peroxide. The major product is:",
    options: [
      { text: "1-bromopropane", correct: true, why: "Free-radical (anti-Markovnikov) addition." },
      { text: "2-bromopropane", why: "That forms without peroxide." },
      { text: "2-bromopropene", why: "Addition saturates the double bond." },
      { text: "the same result is obtained with HCl", why: "The peroxide effect works only for HBr." },
    ],
    solution: "Peroxide generates Br• radicals, which add to the terminal carbon to give the more stable secondary radical; that radical takes H from HBr. Net: anti-Markovnikov 1-bromopropane. (With HCl or HI the radical steps are not both favourable, so there is no peroxide effect.)",
    concept: "Peroxide (Kharasch) effect", formula: "Radical addition via the more stable radical", whyFormula: "Different mechanism, different orientation.", mistakes: "Expecting a peroxide effect with HCl or HI.",
  },
  {
    topic: "alkanes-alkenes-and-alkynes", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`Which compound reacts with sodamide ($\text{NaNH}_2$) to form a sodium salt?`,
    options: [
      { text: "propyne", correct: true, why: "Terminal alkyne: the ≡C–H hydrogen is acidic (sp carbon)." },
      { text: "but-2-yne", why: "Internal alkyne: no acidic hydrogen." },
      { text: "propene", why: "sp² C–H is not acidic enough." },
      { text: "propane", why: "sp³ C–H is far too weakly acidic." },
    ],
    solution: "The sp-hybridised carbon (50% s character) holds the C–H electron pair close, making terminal alkynes weakly acidic (pKₐ ≈ 25). NaNH₂ (conjugate acid NH₃, pKₐ ≈ 38) removes this proton.",
    concept: "Acidity of terminal alkynes", formula: "Acidity: sp > sp² > sp³ C–H", whyFormula: "s character stabilises the carbanion.", mistakes: "Thinking any alkyne reacts.",
  },
  {
    topic: "alkanes-alkenes-and-alkynes", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: r`An alkene $\text{C}_5\text{H}_{10}$ on ozonolysis (followed by Zn/H₂O) gives acetone and ethanal. The alkene is:`,
    options: [
      { text: "2-methylbut-2-ene", correct: true, why: "(CH₃)₂C=CHCH₃ splits into (CH₃)₂C=O and CH₃CHO." },
      { text: "2-methylbut-1-ene", why: "Gives butan-2-one and methanal." },
      { text: "pent-2-ene", why: "Gives ethanal and propanal." },
      { text: "3-methylbut-1-ene", why: "Gives 2-methylpropanal and methanal." },
    ],
    solution: r`Ozonolysis cuts the C=C and puts C=O on each fragment. Join the products back through their carbonyl carbons: acetone (CH₃)₂C=O + O=CHCH₃ → (CH₃)₂C=CHCH₃, which is 2-methylbut-2-ene (C₅H₁₀ ✓).

Check the alternatives by splitting each one — only this alkene gives exactly acetone and ethanal.`,
    concept: "Structure determination by ozonolysis", formula: "C=C → C=O + O=C (reductive workup)", whyFormula: "Reverse the reaction to rebuild the alkene.", mistakes: "Forgetting that a CH₂= end gives methanal.",
  },

  // ── Organic compounds containing halogens ──
  {
    topic: "haloalkanes-and-haloarenes", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "An SN2 reaction at a chiral carbon proceeds with:",
    options: [
      { text: "inversion of configuration", correct: true, why: "Back-side attack (Walden inversion)." },
      { text: "retention of configuration", why: "That would need front-side attack." },
      { text: "complete racemisation", why: "Typical of SN1 (planar carbocation)." },
      { text: "no change at the carbon", why: "The leaving group is replaced at that carbon." },
    ],
    solution: "In SN2 the nucleophile attacks from the side opposite the leaving group in one step; the other three groups flip like an umbrella, inverting the configuration.",
    concept: "Stereochemistry of SN2", formula: "Rate $= k[\\text{RX}][\\text{Nu}^-]$", whyFormula: "Concerted, bimolecular mechanism.", mistakes: "Confusing SN1 and SN2 stereochemistry.",
  },
  {
    topic: "haloalkanes-and-haloarenes", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 2,
    statement: "What is the overall order of a typical SN2 reaction?",
    solution: r`Rate $= k[\text{RX}][\text{Nu}^-]$: first order in each, second order overall.`,
    concept: "Kinetics of SN2", formula: r`$r = k[\text{RX}][\text{Nu}^-]$`, whyFormula: "Both species take part in the single step.", mistakes: "Answering 1 (that is SN1).",
  },
  {
    topic: "haloalkanes-and-haloarenes", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which alkyl bromide undergoes SN1 solvolysis fastest?",
    options: [
      { text: r`$(\text{CH}_3)_3\text{CBr}$`, correct: true, why: "Forms the most stable (tertiary) carbocation." },
      { text: r`$(\text{CH}_3)_2\text{CHBr}$`, why: "Secondary carbocation." },
      { text: r`$\text{CH}_3\text{CH}_2\text{Br}$`, why: "Primary carbocation, very unstable." },
      { text: r`$\text{CH}_3\text{Br}$`, why: "Methyl cation: SN1 practically impossible." },
    ],
    solution: "The slow step of SN1 is ionisation to a carbocation, so the rate follows carbocation stability: 3° > 2° > 1° > methyl.",
    concept: "SN1 reactivity", formula: "Rate $= k[\\text{RX}]$", whyFormula: "Rate-determining carbocation formation.", mistakes: "Using the SN2 order.",
  },
  {
    topic: "haloalkanes-and-haloarenes", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "Chlorobenzene is much less reactive than chloroethane towards nucleophilic substitution because:",
    options: [
      { text: "the C–Cl bond has partial double-bond character from resonance, and the carbon is sp²", correct: true, why: "Both make the bond shorter and stronger." },
      { text: "chlorine is more electronegative in chlorobenzene", why: "Electronegativity of Cl does not change." },
      { text: "benzene rings attract nucleophiles", why: "The electron-rich ring repels nucleophiles." },
      { text: "chlorobenzene is a gas", why: "It is a liquid; physical state is not the reason." },
    ],
    solution: "A lone pair on Cl is delocalised into the ring, giving the C–Cl bond partial double-bond character. The carbon is sp² (bond shorter, stronger), the phenyl cation is unstable (no SN1), and the ring blocks back-side attack (no SN2).",
    concept: "Low reactivity of haloarenes", formula: "Resonance + hybridisation effects", whyFormula: "Several reasons point the same way.", mistakes: "Giving only one of the reasons as if it were the whole story.",
  },
  {
    topic: "haloalkanes-and-haloarenes", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: "Which compound reacts fastest with NaI in acetone?",
    options: [
      { text: "1-bromobutane", correct: true, why: "Primary carbon (unhindered SN2) and a better leaving group (Br⁻) than Cl⁻." },
      { text: "2-bromobutane", why: "Secondary carbon: more steric hindrance to back-side attack." },
      { text: "1-chlorobutane", why: "Primary, but Cl⁻ is a poorer leaving group than Br⁻." },
      { text: "2-chloro-2-methylpropane", why: "Tertiary: SN2 is blocked; acetone does not favour SN1." },
    ],
    solution: r`NaI in acetone (Finkelstein conditions) is a classic SN2 reaction in a polar aprotic solvent. Two factors decide the rate:

1. **Steric hindrance:** methyl > 1° > 2° ≫ 3°.
2. **Leaving group:** I⁻ > Br⁻ > Cl⁻ (weaker C–X bond, more stable anion).

1-bromobutane is primary *and* has the better leaving group, so it is fastest.`,
    concept: "Two factors controlling SN2 rate", formula: "Rate ∝ accessibility × leaving-group ability", whyFormula: "Both appear in the SN2 transition state.", mistakes: "Choosing the tertiary halide by thinking of SN1.",
  },

  // ── Organic compounds containing oxygen · Aldehydes and ketones ──
  {
    topic: "aldehydes-and-ketones", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Aldehydes are generally more reactive than ketones in nucleophilic addition because:",
    options: [
      { text: "the carbonyl carbon is less hindered and more electrophilic", correct: true, why: "One H instead of a second alkyl group: less steric hindrance and less +I donation." },
      { text: "aldehydes have a stronger C=O bond", why: "Bond strength is not the main factor." },
      { text: "ketones have no carbonyl group", why: "Both contain C=O." },
      { text: "aldehydes are always gases", why: "Physical state is not relevant." },
    ],
    solution: "Two alkyl groups in a ketone donate electrons (+I), reducing the positive charge on the carbonyl carbon, and crowd it sterically. Aldehydes have only one alkyl group.",
    concept: "Reactivity of carbonyl compounds", formula: "Electrophilicity and steric access", whyFormula: "Both electronic and steric effects matter.", mistakes: "Giving only the steric reason.",
  },
  {
    topic: "aldehydes-and-ketones", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 5,
    statement: r`How many α-hydrogens are there in butanone, $\text{CH}_3\text{COCH}_2\text{CH}_3$?`,
    solution: "Both carbons next to C=O are α: the CH₃ (3 H) and the CH₂ (2 H). Total 5.",
    concept: "α-Hydrogens", formula: "Hydrogens on carbons adjacent to C=O", whyFormula: "These are the acidic hydrogens (enolisation, aldol).", mistakes: "Counting the terminal CH₃ of the ethyl group (β-hydrogens).",
  },
  {
    topic: "aldehydes-and-ketones", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which compound undergoes the Cannizzaro reaction with concentrated NaOH?",
    options: [
      { text: "benzaldehyde", correct: true, why: "No α-hydrogen." },
      { text: "ethanal", why: "Has α-H; gives aldol condensation instead." },
      { text: "propanone", why: "Ketones do not undergo Cannizzaro." },
      { text: "propanal", why: "Has α-H." },
    ],
    solution: "The Cannizzaro reaction (disproportionation to an alcohol and a carboxylate) occurs for aldehydes without α-hydrogens, e.g. HCHO and C₆H₅CHO. Aldehydes with α-H undergo aldol reactions in base.",
    concept: "Cannizzaro vs aldol", formula: "No α-H → Cannizzaro (conc. base)", whyFormula: "Enolate formation is impossible without α-H.", mistakes: "Applying Cannizzaro to any aldehyde.",
  },
  {
    topic: "aldehydes-and-ketones", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Which compound gives a positive iodoform test?",
    options: [
      { text: "propanone", correct: true, why: "Contains CH₃CO–." },
      { text: "propanal", why: "CH₃CH₂CHO lacks a CH₃CO– group." },
      { text: "benzaldehyde", why: "No methyl ketone group." },
      { text: "pentan-3-one", why: "CH₃CH₂COCH₂CH₃ has no CH₃CO–." },
    ],
    solution: "The haloform reaction needs a CH₃CO– group (or CH₃CH(OH)– that can be oxidised to it). Propanone, CH₃COCH₃, gives yellow CHI₃.",
    concept: "Haloform test", formula: r`$\text{RCOCH}_3 + 3\text{I}_2 + 4\text{OH}^- \to \text{RCOO}^- + \text{CHI}_3 + 3\text{I}^- + 3\text{H}_2\text{O}$`, whyFormula: "Requires a methyl ketone (or precursor).", mistakes: "Thinking any carbonyl compound gives iodoform.",
  },
  {
    topic: "aldehydes-and-ketones", level: 5, difficulty: "HARD", type: "MCQ", time: 150,
    statement: r`A compound $\text{C}_3\text{H}_6\text{O}$ gives a yellow precipitate with I₂/NaOH and does not reduce Tollens' reagent. It is:`,
    options: [
      { text: "propanone", correct: true, why: "Methyl ketone (iodoform +) and a ketone (Tollens −)." },
      { text: "propanal", why: "An aldehyde: Tollens positive; and it gives no iodoform." },
      { text: "prop-2-en-1-ol", why: "CH₂=CHCH₂OH has no CH₃CH(OH)– or CH₃CO– group." },
      { text: "methoxyethene", why: "An enol ether; not a methyl ketone and not Tollens-positive." },
    ],
    solution: r`Four C₃H₆O isomers are offered. Apply both tests:

- **Tollens' negative** rules out the aldehyde (propanal).
- **Iodoform positive** needs CH₃CO– or CH₃CH(OH)–: only propanone has one.

So the compound is propanone, CH₃COCH₃.`,
    concept: "Identification by combining chemical tests", formula: "Tollens: aldehydes; iodoform: methyl ketones", whyFormula: "Each test rules out a different set of isomers.", mistakes: "Using only one test; forgetting non-carbonyl isomers with the same formula.",
  },

  // ── Organic compounds containing nitrogen · Amines ──
  {
    topic: "amines-and-diazonium-salts", level: 1, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "In aqueous solution, the strongest base among the following is:",
    options: [
      { text: r`$(\text{CH}_3)_2\text{NH}$`, correct: true, why: "Best balance of +I effect, solvation of the cation and steric factors in water." },
      { text: r`$(\text{CH}_3)_3\text{N}$`, why: "Its conjugate acid is poorly hydrated (only one N–H), so it is weaker in water." },
      { text: r`$\text{CH}_3\text{NH}_2$`, why: "Fewer +I groups than dimethylamine." },
      { text: r`$\text{NH}_3$`, why: "No alkyl groups." },
    ],
    solution: "In water the order for methylamines is (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃. +I effects increase basicity, but the trimethylammonium ion has only one N–H for hydrogen bonding with water, so it is less stabilised; in the gas phase the order follows +I alone (3° > 2° > 1°).",
    concept: "Basicity of amines in water", formula: "+I effect, solvation and steric effects together", whyFormula: "The aqueous order differs from the gas-phase order.", mistakes: "Predicting 3° > 2° > 1° in water.",
  },
  {
    topic: "amines-and-diazonium-salts", level: 2, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 4,
    statement: r`How many structurally isomeric amines have the molecular formula $\text{C}_3\text{H}_9\text{N}$?`,
    solution: "Primary: propan-1-amine, propan-2-amine. Secondary: N-methylethanamine. Tertiary: N,N-dimethylmethanamine (trimethylamine). Total 4.",
    concept: "Isomerism in amines", formula: "1°, 2°, 3° arrangements of 3 carbons", whyFormula: "Systematic counting by class.", mistakes: "Missing the secondary or tertiary amines.",
  },
  {
    topic: "amines-and-diazonium-salts", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "Aniline is a weaker base than methylamine because:",
    options: [
      { text: "the nitrogen lone pair is delocalised into the benzene ring", correct: true, why: "It is less available to accept a proton." },
      { text: "aniline is heavier", why: "Molar mass does not determine basicity." },
      { text: "the phenyl group donates electrons", why: "The ring withdraws the lone pair by resonance." },
      { text: "aniline has no lone pair on nitrogen", why: "It has one; it is delocalised." },
    ],
    solution: "In aniline the N lone pair conjugates with the ring π system (and the sp²-like N is less basic). The anilinium ion loses this resonance, so protonation is less favourable. Methyl's +I effect makes methylamine more basic than ammonia.",
    concept: "Resonance and basicity", formula: "Availability of the lone pair", whyFormula: "Basicity measures lone-pair donation.", mistakes: "Thinking the phenyl group is electron-donating here.",
  },
  {
    topic: "amines-and-diazonium-salts", level: 4, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: "In the Hinsberg test, a secondary amine:",
    options: [
      { text: "forms a sulphonamide that is insoluble in aqueous alkali", correct: true, why: "No N–H remains on the sulphonamide nitrogen." },
      { text: "forms a sulphonamide soluble in aqueous alkali", why: "That is a primary amine (acidic N–H)." },
      { text: "does not react", why: "That is a tertiary amine." },
      { text: "gives nitrogen gas", why: "That happens with nitrous acid and primary aliphatic amines." },
    ],
    solution: "Benzenesulphonyl chloride reacts with 1° amines to give N-alkylsulphonamides with an acidic N–H (soluble in KOH), with 2° amines to give N,N-dialkylsulphonamides with no N–H (insoluble), and not with 3° amines.",
    concept: "Distinguishing 1°, 2°, 3° amines", formula: r`$\text{C}_6\text{H}_5\text{SO}_2\text{Cl} + \text{R}_2\text{NH} \to \text{C}_6\text{H}_5\text{SO}_2\text{NR}_2$`, whyFormula: "The N–H left on the product decides solubility in alkali.", mistakes: "Swapping the primary and secondary results.",
  },
  {
    topic: "amines-and-diazonium-salts", level: 5, difficulty: "HARD", type: "MCQ", time: 120,
    statement: "Benzenediazonium chloride is added to phenol in cold, mildly alkaline solution. The main product is:",
    options: [
      { text: "p-hydroxyazobenzene (an orange dye)", correct: true, why: "Azo coupling at the para position of the phenoxide ion." },
      { text: "phenol and nitrogen gas", why: "That is hydrolysis of the diazonium salt on warming with water." },
      { text: "chlorobenzene", why: "That needs CuCl (Sandmeyer reaction)." },
      { text: "benzene", why: "That needs H₃PO₂ (reductive deamination)." },
    ],
    solution: r`The same diazonium salt gives different products under different conditions:

- **Cold, mildly alkaline phenol:** the phenoxide ion is a strong nucleophile; the diazonium ion (a weak electrophile) attacks its para position → $\text{C}_6\text{H}_5\text{–N=N–C}_6\text{H}_4\text{OH}$ (p-hydroxyazobenzene, orange).
- Warm water → phenol + N₂; CuCl/HCl → chlorobenzene; H₃PO₂ → benzene.

Here the conditions are those of coupling.`,
    concept: "Reactions of diazonium salts depend on conditions", formula: r`$\text{ArN}_2^+ + \text{Ar'O}^- \to \text{Ar–N=N–Ar'OH}$`, whyFormula: "Electrophilic substitution on an activated ring.", mistakes: "Treating one reaction of diazonium salts as if it happened under all conditions.",
  },

  // ── Biomolecules ──
  {
    topic: "biomolecules", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Which of these is a non-reducing sugar?",
    options: [
      { text: "sucrose", correct: true, why: "Glucose C1 and fructose C2 are both used in the glycosidic bond." },
      { text: "glucose", why: "Free aldehyde (in the open-chain form): reducing." },
      { text: "maltose", why: "Has a free hemiacetal group: reducing." },
      { text: "lactose", why: "Has a free hemiacetal group: reducing." },
    ],
    solution: "In sucrose the anomeric carbons of both glucose (C1) and fructose (C2) form the glycosidic link, so there is no free hemiacetal/hemiketal group to reduce Tollens' or Fehling's reagent.",
    concept: "Reducing and non-reducing sugars", formula: "Free anomeric carbon → reducing", whyFormula: "Ring opening is needed for the reducing reaction.", mistakes: "Thinking all disaccharides are non-reducing.",
  },
  {
    topic: "biomolecules", level: 2, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 4,
    statement: "How many chiral carbon atoms are present in the open-chain form of glucose?",
    solution: "Open-chain glucose: CHO–(CHOH)₄–CH₂OH. C2, C3, C4 and C5 each carry four different groups: 4 chiral centres (16 stereoisomers of the aldohexose).",
    concept: "Chirality in glucose", formula: "Carbon with four different groups", whyFormula: "C1 (CHO) and C6 (CH₂OH) are not chiral.", mistakes: "Counting C1 or C6; counting five from the cyclic form (C1 becomes chiral there).",
  },
  {
    topic: "biomolecules", level: 3, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A peptide bond is:",
    options: [
      { text: r`an amide linkage, $\text{–CO–NH–}$`, correct: true, why: "Formed between the COOH of one amino acid and the NH₂ of another." },
      { text: r`an ester linkage, $\text{–CO–O–}$`, why: "That joins acids and alcohols (fats)." },
      { text: "a glycosidic linkage", why: "That joins sugars." },
      { text: "a hydrogen bond", why: "Hydrogen bonds hold secondary structures, not the backbone." },
    ],
    solution: "Condensation of the α-COOH of one amino acid with the α-NH₂ of another eliminates water and forms –CO–NH–.",
    concept: "Peptide bond", formula: r`$\text{–COOH} + \text{H}_2\text{N–} \to \text{–CO–NH–} + \text{H}_2\text{O}$`, whyFormula: "Condensation reaction.", mistakes: "Confusing linkage types across biomolecules.",
  },
  {
    topic: "biomolecules", level: 4, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "Deficiency of vitamin C causes:",
    options: [
      { text: "scurvy", correct: true, why: "Bleeding gums, weak connective tissue." },
      { text: "rickets", why: "Vitamin D deficiency." },
      { text: "night blindness", why: "Vitamin A deficiency." },
      { text: "beriberi", why: "Vitamin B₁ deficiency." },
    ],
    solution: "Vitamin C (ascorbic acid, water-soluble) is needed for collagen formation; its deficiency causes scurvy.",
    concept: "Vitamins and deficiency diseases", formula: "Water-soluble: B, C; fat-soluble: A, D, E, K", whyFormula: "Classification listed in the syllabus.", mistakes: "Mixing up vitamins A and D.",
  },
  {
    topic: "biomolecules", level: 5, difficulty: "MEDIUM", type: "MCQ", time: 90,
    statement: "Which statement is correct?",
    options: [
      { text: "RNA contains ribose and the base uracil", correct: true, why: "RNA: ribose, A, G, C, U." },
      { text: "DNA contains ribose and the base thymine", why: "DNA contains deoxyribose." },
      { text: "Both DNA and RNA contain thymine", why: "RNA has uracil in place of thymine." },
      { text: "Hydrolysis of sucrose gives two molecules of glucose", why: "It gives glucose and fructose (maltose gives two glucose)." },
    ],
    solution: "DNA: 2-deoxyribose with A, G, C, T. RNA: ribose with A, G, C, U. Sucrose → glucose + fructose; maltose → 2 glucose; lactose → glucose + galactose.",
    concept: "Composition of nucleic acids and disaccharides", formula: "Constituents listed in the 2027 syllabus", whyFormula: "Several facts must be checked together.", mistakes: "Swapping uracil and thymine, or ribose and deoxyribose.",
  },

  // ── Principles related to practical chemistry ──
  {
    topic: "practical-chemistry", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "In titrations with potassium permanganate in acidic medium, the indicator used is:",
    options: [
      { text: "KMnO₄ itself (self-indicator)", correct: true, why: "The first excess drop gives a permanent pink colour." },
      { text: "phenolphthalein", why: "Used in acid–base titrations." },
      { text: "methyl orange", why: "Used in acid–base titrations." },
      { text: "starch", why: "Used with iodine." },
    ],
    solution: "MnO₄⁻ is intensely purple and Mn²⁺ is almost colourless, so the end point is the first persistent pink colour.",
    concept: "Self-indicator", formula: "Purple MnO₄⁻ → colourless Mn²⁺", whyFormula: "Colour change of the titrant itself.", mistakes: "Adding an acid–base indicator to a redox titration.",
  },
  {
    topic: "practical-chemistry", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 6,
    statement: r`Mohr's salt is ferrous ammonium sulphate, $\text{FeSO}_4\cdot(\text{NH}_4)_2\text{SO}_4\cdot x\text{H}_2\text{O}$. Find $x$.`,
    solution: r`Mohr's salt is $\text{FeSO}_4\cdot(\text{NH}_4)_2\text{SO}_4\cdot6\text{H}_2\text{O}$, so $x = 6$.`,
    concept: "Composition of Mohr's salt (a listed preparation)", formula: r`$\text{(NH}_4)_2\text{Fe(SO}_4)_2\cdot6\text{H}_2\text{O}$`, whyFormula: "Double salt of the listed preparation.", mistakes: "Confusing with potash alum (24 H₂O for K₂SO₄·Al₂(SO₄)₃).",
  },
  {
    topic: "practical-chemistry", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "In qualitative analysis, the group reagent for group II cations (e.g. Cu²⁺, Pb²⁺ when not removed in group I) is:",
    options: [
      { text: "H₂S in the presence of dilute HCl", correct: true, why: "Low sulphide concentration precipitates only the least soluble sulphides." },
      { text: "dilute HCl", why: "Group I reagent." },
      { text: "NH₄OH in the presence of NH₄Cl", why: "Group III reagent." },
      { text: "(NH₄)₂CO₃ in the presence of NH₄OH", why: "Group V reagent." },
    ],
    solution: "Acidic H₂S keeps [S²⁻] low (common-ion effect of H⁺), so only sulphides with very small Ksp (Cu²⁺, Pb²⁺, Cd²⁺ …) precipitate in group II. Group IV sulphides (Zn²⁺, Ni²⁺) need basic H₂S.",
    concept: "Group reagents and solubility product", formula: "Precipitation when ionic product > Ksp", whyFormula: "The common-ion effect controls [S²⁻].", mistakes: "Mixing up group II and group IV conditions.",
  },
  {
    topic: "practical-chemistry", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 25,
    statement: r`What volume (in mL) of $0.02\ \text{M}$ $\text{KMnO}_4$ is needed to titrate $25\ \text{mL}$ of $0.05\ \text{M}$ oxalic acid in acidic solution?`,
    solution: r`$2\text{MnO}_4^- + 5\text{C}_2\text{O}_4^{2-} + 16\text{H}^+ \to 2\text{Mn}^{2+} + 10\text{CO}_2 + 8\text{H}_2\text{O}$. Moles oxalate $= 1.25\times10^{-3}$; moles MnO₄⁻ $= \tfrac25\times1.25\times10^{-3} = 5\times10^{-4}$; volume $= 5\times10^{-4}/0.02 = 0.025\ \text{L} = 25\ \text{mL}$.`,
    concept: "Redox titration stoichiometry", formula: "Electrons: MnO₄⁻ gains 5, C₂O₄²⁻ loses 2", whyFormula: "Equal electrons transferred ⇒ 2 : 5 mole ratio.", mistakes: "Using a 1 : 1 ratio.",
  },
  {
    topic: "practical-chemistry", level: 5, difficulty: "HARD", type: "MCQ", time: 120,
    statement: "A salt gives no effervescence and no brown fumes with dilute H₂SO₄. Its solution, mixed with freshly prepared FeSO₄ and with concentrated H₂SO₄ poured carefully down the side, gives a brown ring at the junction. The anion is:",
    options: [
      { text: r`$\text{NO}_3^-$`, correct: true, why: "Brown ring of [Fe(H₂O)₅(NO)]²⁺; nitrate is unaffected by dilute acid." },
      { text: r`$\text{NO}_2^-$`, why: "Nitrite gives brown NO₂ fumes with dilute acid." },
      { text: r`$\text{CO}_3^{2-}$`, why: "Carbonate gives effervescence (CO₂) with dilute acid." },
      { text: r`$\text{Br}^-$`, why: "Bromide gives no brown ring." },
    ],
    solution: r`Two observations are needed:

1. **Dilute acid: no effervescence, no brown fumes** → not carbonate, sulphide (H₂S smell) or nitrite (brown NO₂).
2. **Brown-ring test positive** → NO₃⁻: concentrated acid reduces it to NO, which binds Fe²⁺ as $[\text{Fe(H}_2\text{O)}_5(\text{NO})]^{2+}$.

Nitrite also gives a brown ring, but it is excluded by step 1. So the anion is nitrate.`,
    concept: "Systematic anion analysis", formula: "Dilute-acid group first, then confirmatory test", whyFormula: "A confirmatory test alone can be shared by two anions.", mistakes: "Relying on the brown ring alone (nitrite also gives it).",
  },
];
