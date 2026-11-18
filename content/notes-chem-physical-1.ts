import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const CHEM_PHYSICAL_1: NoteSeed[] = [
  note("mole-concept", {
    introduction: r`The mole links the atomic world to grams we can weigh. Almost every numerical problem in physical chemistry begins with converting to moles.`,
    prerequisites: r`- Atomic and molecular formulas
- Ratios and percentages`,
    concept: r`One mole is $6.022\times10^{23}$ particles — the number of atoms in exactly 12 g of carbon-12. The molar mass in grams per mole equals the atomic or molecular mass in u, so grams convert to particle counts through moles.`,
    theory: r`$n = \frac{m}{M} = \frac{N}{N_A} = \frac{V_{\text{gas}}}{22.4\,\text{L}}$ (at STP, 273 K and 1 atm). Empirical formula: simplest whole-number atom ratio; molecular formula $= (\text{empirical})_n$ with $n = \frac{M}{M_{\text{empirical}}}$.`,
    definitions: r`- **Atomic mass unit:** $\frac1{12}$ of the mass of a C-12 atom ($1.66\times10^{-27}$ kg).
- **Average atomic mass:** abundance-weighted mean of isotope masses.
- **Equivalent weight:** $\frac{M}{n\text{-factor}}$.`,
    principles: r`1. Laws of chemical combination: conservation of mass, definite proportions, multiple proportions, Gay-Lussac's gaseous volumes, Avogadro's law.
2. Mole ratios come from balanced equations, mass ratios do not.`,
    derivations: r`**Empirical formula from % composition.** Divide each % by the atomic mass (gives moles per 100 g), divide by the smallest, and round to whole numbers (multiply if needed).`,
    formulas: r`- $n = \dfrac mM = \dfrac N{N_A}$; $N_A = 6.022\times10^{23}\,\text{mol}^{-1}$.
- Gas at STP (273 K, 1 atm): 22.4 L/mol (at 1 bar: 22.7 L/mol).
- Average atomic mass $= \dfrac{\sum(\text{mass}\times\%\text{abundance})}{100}$.
- Molecular formula $= n\times$ empirical, $n = \dfrac{M}{M_{\text{emp}}}$.
- % of element $= \dfrac{\text{mass of element in 1 mol}}{M}\times100$.
- Vapour density $= \dfrac M2$.
- Equivalent weight $= \dfrac{M}{n\text{-factor}}$; equivalents $= \dfrac{m}{E} = n\times n\text{-factor}$.
- Ideal gas: $PV = nRT$ ($R = 8.314$ J K⁻¹ mol⁻¹ $= 0.0821$ L atm K⁻¹ mol⁻¹); density $\rho = \dfrac{PM}{RT}$ — ideal behaviour assumed.
- Dalton's law of partial pressures: $P = \sum p_i$, $p_i = x_iP$ — non-reacting gases.
- Graham's law: $\dfrac{r_1}{r_2} = \sqrt{\dfrac{M_2}{M_1}}$ (rates of diffusion/effusion at the same $T$, $P$).
- Gay-Lussac's law of gaseous volumes: reacting gas volumes are in simple whole-number ratios (same $T$, $P$).`,
    diagrams: r`Mole "road map": mass ⇄ moles ⇄ particles, and moles ⇄ gas volume, with conversion factors on each arrow.`,
    graphs: r`Not applicable.`,
    specialCases: r`- 1 mol of H₂O contains $N_A$ molecules but $3N_A$ atoms.
- Electrons in 1 mol of CH₄: $10N_A$.`,
    exceptions: r`22.4 L/mol applies only to ideal gases at STP.`,
    assumptions: r`Ideal gas behaviour for volume conversions.`,
    applications: r`Drug dosing, fertiliser composition, combustion analysis.`,
    patterns: r`- Number of atoms/electrons/molecules in a sample.
- Empirical and molecular formula determination.
- Average atomic mass from isotopic abundance.`,
    misconceptions: r`- "Equal masses contain equal numbers of molecules." Equal **moles** do.`,
    traps: r`- STP definition (1 atm vs 1 bar).
- Counting atoms vs molecules.`,
    summary: r`- $n = m/M = N/N_A = V/22.4$ L.
- Molecular formula $= n\times$ empirical; VD $= M/2$.`,
  }),

  note("stoichiometry", {
    introduction: r`Stoichiometry uses balanced equations to predict how much product forms and which reactant runs out first. Concentration terms extend this to solutions.`,
    prerequisites: r`- Mole concept
- Balancing equations`,
    concept: r`A balanced equation is a recipe in moles. The **limiting reagent** is the ingredient that runs out first and caps the yield.`,
    theory: r`For $aA + bB \to$ products, compare $\frac{n_A}{a}$ and $\frac{n_B}{b}$: the smaller one is limiting. Concentration terms: molarity (temperature dependent), molality and mole fraction (temperature independent).`,
    definitions: r`- **Molarity** $M = \frac{n_{\text{solute}}}{V_{\text{solution}}(\text{L})}$. **Molality** $m = \frac{n_{\text{solute}}}{\text{kg solvent}}$.
- **Mole fraction** $x_A = \frac{n_A}{n_{\text{total}}}$. **Mass %**, **ppm** $= \frac{\text{mass solute}}{\text{mass solution}}\times10^6$.
- **Normality** $N = M\times n\text{-factor}$.`,
    principles: r`1. Law of equivalence: equivalents of reactants react in equal numbers.
2. Dilution: moles of solute unchanged, $M_1V_1 = M_2V_2$.`,
    derivations: r`**Molarity ↔ molality.** For 1 L solution of density $d$ (g/mL): mass of solution $1000d$ g, solute $MM_s$ g, solvent $1000d - MM_s$ g, so $m = \frac{1000M}{1000d - MM_s}$.`,
    formulas: r`- Limiting reagent: smallest $\dfrac{n_i}{\nu_i}$.
- % yield $= \dfrac{\text{actual}}{\text{theoretical}}\times100$.
- $M = \dfrac{n}{V(\text{L})} = \dfrac{w\times1000}{M_s\times V(\text{mL})}$; $m = \dfrac{w\times1000}{M_s\times W_{\text{solvent}}(\text{g})}$.
- $m = \dfrac{1000M}{1000d - MM_s}$ ($d$ in g/mL).
- Mass % to molarity: $M = \dfrac{10\times d\times\%}{M_s}$.
- Dilution $M_1V_1 = M_2V_2$; mixing $M = \dfrac{M_1V_1 + M_2V_2}{V_1 + V_2}$.
- Titration: $N_1V_1 = N_2V_2$ (or $n_1M_1V_1 = n_2M_2V_2$ with $n$-factors).
- Volume strength of H₂O₂ $= 11.2\times M$ (at STP).`,
    diagrams: r`Before–change–after (ICE-style) table for reactions: list moles, subtract consumption in stoichiometric ratio.`,
    graphs: r`Product formed vs reactant added: rises linearly then plateaus once the other reactant is limiting.`,
    specialCases: r`- Percentage labelling of oleum: % = mass of H₂SO₄ obtained from 100 g oleum with water.`,
    exceptions: r`Molarity changes with temperature (volume expands); molality does not.`,
    assumptions: r`Reactions go to completion unless equilibrium is specified.`,
    applications: r`Industrial yield calculations, titrations, preparing solutions.`,
    patterns: r`- Limiting reagent and mass of product.
- Interconversion of concentration terms.
- Titration and equivalence; volume strength of H₂O₂.`,
    misconceptions: r`- "The reactant with smaller mass is limiting." Compare moles divided by coefficients.`,
    traps: r`- Volume of solution vs volume of solvent.
- $n$-factor in redox titrations.`,
    summary: r`- Limiting: smallest $n/\nu$; $M_1V_1 = M_2V_2$.
- $m = 1000M/(1000d - MM_s)$; $M = 10d\%/M_s$.`,
  }),

  note("quantum-mechanical-model", {
    introduction: r`The quantum mechanical model replaces Bohr's fixed orbits with orbitals — regions of probability described by quantum numbers. It explains shapes, nodes and the structure of the periodic table.`,
    prerequisites: r`- Bohr model
- Wave–particle duality`,
    concept: r`An electron is described by a wavefunction $\psi$; $|\psi|^2$ gives the probability of finding it. Four quantum numbers specify each electron's state.`,
    theory: r`Principal $n = 1, 2, \dots$ (size/energy); azimuthal $l = 0$ to $n - 1$ (shape: s, p, d, f); magnetic $m_l = -l$ to $+l$ (orientation); spin $m_s = \pm\frac12$.

Nodes: radial $n - l - 1$, angular $l$, total $n - 1$.`,
    definitions: r`- **Orbital:** region of high electron probability defined by $n, l, m_l$.
- **Node:** surface where $\psi = 0$.
- **Degenerate orbitals:** same energy.`,
    principles: r`1. Heisenberg: $\Delta x\Delta p \ge \frac h{4\pi}$ — definite orbits are impossible.
2. De Broglie: $\lambda = h/mv$.
3. For multi-electron atoms energy depends on $n + l$.`,
    derivations: r`**Number of orbitals.** For given $l$ there are $2l + 1$ values of $m_l$; summing $l = 0$ to $n - 1$ gives $n^2$ orbitals and $2n^2$ electrons in shell $n$.`,
    formulas: r`- Orbitals in shell $n$: $n^2$; electrons $2n^2$; orbitals in a subshell $2l + 1$.
- Radial nodes $n - l - 1$; angular nodes $l$; total $n - 1$.
- Orbital angular momentum $\sqrt{l(l+1)}\dfrac h{2\pi}$; spin magnetic moment $\mu = \sqrt{n(n+2)}$ BM ($n$ unpaired electrons).
- De Broglie $\lambda = \dfrac h{mv}$; uncertainty $\Delta x\,\Delta v \ge \dfrac h{4\pi m}$.
- Photon: $E = h\nu = \dfrac{hc}\lambda$; energy of 1 mol of photons $= N_Ah\nu$.
- Photoelectric: $h\nu = h\nu_0 + \tfrac12mv^2$.`,
    diagrams: r`Explore s, p and d orbital shapes and nodes in the atomic-orbital lesson below.`,
    graphs: r`Radial probability $4\pi r^2R^2$ vs $r$: 1s one peak; 2s two peaks with one node; 2p one peak.`,
    specialCases: r`- $d_{z^2}$ has a doughnut ring and two lobes; it still has two angular (conical) nodes.`,
    exceptions: r`In hydrogen, orbitals with the same $n$ are degenerate (energy depends only on $n$).`,
    assumptions: r`Non-relativistic quantum mechanics.`,
    applications: r`Chemical bonding, spectroscopy, magnetism of compounds.`,
    patterns: r`- Valid and invalid sets of quantum numbers.
- Nodes for a given orbital.
- Maximum electrons with given $n$, $l$ or $m_l$.
- Uncertainty and de Broglie calculations.`,
    misconceptions: r`- "An orbital is a path." It is a probability distribution.`,
    traps: r`- $l$ cannot equal $n$.`,
    summary: r`- $n, l, m_l, m_s$; nodes radial $n - l - 1$, angular $l$.
- $n^2$ orbitals, $2n^2$ electrons per shell; $\mu = \sqrt{n(n+2)}$ BM.`,
  }, { diagrams: "orbitals" }),

  note("electronic-configuration", {
    introduction: r`Electronic configuration describes how electrons fill orbitals. It predicts valency, magnetism and periodic properties — and its exceptions are favourite JEE questions.`,
    prerequisites: r`- Quantum numbers`,
    concept: r`Electrons fill the lowest available energy first (Aufbau), at most two per orbital with opposite spins (Pauli), spreading out singly before pairing (Hund). Extra stability of half-filled and full subshells causes exceptions like Cr and Cu.`,
    theory: r`Filling order by $(n + l)$ rule; equal $n + l$: lower $n$ first: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p.`,
    definitions: r`- **Aufbau principle**, **Pauli exclusion principle**, **Hund's rule of maximum multiplicity**.
- **Exchange energy:** stabilisation from parallel-spin electrons in degenerate orbitals.`,
    principles: r`1. Electrons are removed from the highest $n$ first (4s before 3d in ions).
2. Half-filled and completely filled subshells are extra stable.`,
    derivations: r`**Fe³⁺.** Fe: [Ar] 3d⁶ 4s². Remove two 4s then one 3d: [Ar] 3d⁵ — five unpaired electrons, $\mu = \sqrt{35} \approx 5.92$ BM.`,
    formulas: r`- $(n + l)$ rule for filling order.
- Exceptions: Cr [Ar] 3d⁵4s¹, Cu [Ar] 3d¹⁰4s¹, Mo, Ag, Au, Pd [Kr] 4d¹⁰ (use the configuration explorer).
- Unpaired electrons → $\mu = \sqrt{n(n+2)}$ BM.
- Ions of transition metals: remove $ns$ electrons before $(n-1)d$.
- Isoelectronic species: same number of electrons (e.g. N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺).`,
    diagrams: r`Orbital box diagrams show Hund's rule — use the configuration explorer in the Chemistry Lab.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Zn²⁺, Cu⁺ (d¹⁰) and Sc³⁺ (d⁰) are diamagnetic and colourless.`,
    exceptions: r`Several 4d and 5d elements (Nb, Ru, Rh, Pt) show irregular configurations not covered by simple rules.`,
    assumptions: r`Ground-state configurations.`,
    applications: r`Predicting magnetism, colour and oxidation states.`,
    patterns: r`- Configuration of ions and exceptions.
- Unpaired electrons and magnetic moment.
- Isoelectronic series.`,
    misconceptions: r`- "4s electrons are removed last because they were filled first." They are removed first.`,
    traps: r`- Writing Cr as 3d⁴4s².`,
    summary: r`- Aufbau, Pauli, Hund; $(n + l)$ rule.
- Cr, Cu exceptions; ions lose $ns$ first; $\mu = \sqrt{n(n+2)}$.`,
  }),

  note("vsepr-and-molecular-geometry", {
    introduction: r`VSEPR theory predicts molecular shape from the number of electron pairs around the central atom. Shapes decide polarity, bond angles and reactivity.`,
    prerequisites: r`- Lewis structures
- Valence electrons`,
    concept: r`Electron pairs repel and arrange themselves as far apart as possible. Lone pairs repel more strongly than bonding pairs, squeezing bond angles.`,
    theory: r`Steric number (SN) = bond pairs + lone pairs: 2 linear, 3 trigonal planar, 4 tetrahedral, 5 trigonal bipyramidal, 6 octahedral. Repulsion: lp–lp > lp–bp > bp–bp.`,
    definitions: r`- **Electron geometry:** arrangement of all pairs. **Molecular shape:** arrangement of atoms only.`,
    principles: r`1. Lone pairs occupy equatorial positions in trigonal bipyramids.
2. Multiple bonds count as one domain.
3. More electronegative substituents reduce bond angles (bonding pairs pulled away).`,
    derivations: r`**Steric number formula.** $\text{SN} = \frac12(V + M - c + a)$, where $V$ = valence electrons of central atom, $M$ = monovalent atoms, $c$ = positive charge, $a$ = negative charge. Example SF₄: $\frac12(6 + 4) = 5$: 4 bp + 1 lp ⇒ see-saw.`,
    formulas: r`- $\text{SN} = \tfrac12(V + M - c + a)$; lone pairs $= \text{SN} - $ bonded atoms.
- SN 2: linear (CO₂, BeCl₂, XeF₂ with 3 lp).
- SN 3: trigonal planar (BF₃), bent (SO₂, ~119°).
- SN 4: tetrahedral (CH₄ 109.5°), pyramidal (NH₃ 107°), bent (H₂O 104.5°).
- SN 5: trigonal bipyramidal (PCl₅), see-saw (SF₄), T-shaped (ClF₃), linear (XeF₂, I₃⁻).
- SN 6: octahedral (SF₆), square pyramidal (BrF₅), square planar (XeF₄).
- SN 7: pentagonal bipyramidal (IF₇).
- Bond angle trends: NH₃ (107°) > PH₃ (93.5°); H₂O > H₂S; NF₃ (102°) < NH₃.`,
    diagrams: r`Rotate 3D models in the VSEPR lesson to see lone-pair positions.`,
    graphs: r`Not applicable.`,
    specialCases: r`- PH₃, H₂S bond angles near 90° (little hybridisation in heavier elements).`,
    exceptions: r`VSEPR does not apply well to transition-metal complexes.`,
    assumptions: r`Localised electron pairs.`,
    applications: r`Predicting polarity, boiling points and how drugs fit receptors.`,
    patterns: r`- Shape of interhalogens and xenon compounds.
- Compare bond angles.
- Identify planar/non-planar or polar molecules.`,
    misconceptions: r`- "H₂O is linear." Two lone pairs make it bent.`,
    traps: r`- Counting ions' charges in SN.`,
    summary: r`- SN = bp + lp; lp–lp > lp–bp > bp–bp.
- Lone pairs equatorial in TBP; XeF₂ linear, XeF₄ square planar.`,
  }, { diagrams: "vsepr" }),

  note("hybridisation", {
    introduction: r`Hybridisation mixes atomic orbitals to form equivalent hybrid orbitals that explain observed geometries — for example, four identical C–H bonds in methane.`,
    prerequisites: r`- Atomic orbitals
- VSEPR`,
    concept: r`Carbon's 2s and 2p orbitals have different shapes, yet methane's bonds are identical. Mixing one s and three p orbitals gives four equivalent sp³ hybrids pointing to the corners of a tetrahedron.`,
    theory: r`Hybridisation from steric number: 2 sp, 3 sp², 4 sp³, 5 sp³d, 6 sp³d², 7 sp³d³. %s character: sp 50%, sp² 33%, sp³ 25%. More s character ⇒ shorter, stronger bond and more electronegative atom.`,
    definitions: r`- **σ bond:** head-on overlap. **π bond:** sideways overlap of unhybridised p orbitals.`,
    principles: r`1. Number of hybrid orbitals = number of atomic orbitals mixed.
2. Hybrid orbitals form σ bonds or hold lone pairs; π bonds use unhybridised orbitals.`,
    derivations: r`**Ethyne.** Each C forms 2 σ bonds (sp), leaving two p orbitals for 2 π bonds: triple bond = 1σ + 2π, linear 180°.`,
    formulas: r`- SN → hybridisation: 2 sp (180°), 3 sp² (120°), 4 sp³ (109.5°), 5 sp³d (90°, 120°), 6 sp³d² (90°), 7 sp³d³.
- % s character: sp 50, sp² 33.3, sp³ 25.
- Acidity of C–H: sp > sp² > sp³ (ethyne > ethene > ethane).
- Single bond = 1σ; double = 1σ + 1π; triple = 1σ + 2π.
- sp³d hybrid uses $d_{z^2}$; sp³d² uses $d_{z^2}$ and $d_{x^2-y^2}$.`,
    diagrams: r`Hybrid orbitals: one large lobe and one small; arranged per VSEPR geometry.`,
    graphs: r`Bond length decreases and bond strength increases with % s character.`,
    specialCases: r`- Carbocation (sp²), carbanion (sp³), free radical (sp², nearly planar).
- [Ni(CN)₄]²⁻ dsp² square planar.`,
    exceptions: r`Hybridisation is a model; it does not describe heavier element hydrides (PH₃) well.`,
    assumptions: r`Valence bond theory.`,
    applications: r`Structures of organic molecules, bond strengths and acidity trends.`,
    patterns: r`- Hybridisation of central atoms and in organic molecules.
- Counting σ and π bonds.
- Planarity of molecules.`,
    misconceptions: r`- "Hybridisation happens before bonding as a real process." It is a description of the bonding.`,
    traps: r`- Lone pairs count toward hybridisation.`,
    summary: r`- SN 2–6: sp, sp², sp³, sp³d, sp³d².
- More s character ⇒ shorter bond, more acidic C–H.`,
  }),

  note("molecular-orbital-theory", {
    introduction: r`Molecular orbital theory combines atomic orbitals into orbitals spread over the whole molecule. It explains bond order, magnetism (O₂ is paramagnetic) and stability of ions.`,
    prerequisites: r`- Atomic orbitals and electronic configuration`,
    concept: r`Two atomic orbitals combine into a lower-energy bonding MO and a higher-energy antibonding MO. Filling electrons and counting the difference gives the bond order.`,
    theory: r`LCAO. Bond order $= \frac{N_b - N_a}2$. Higher bond order ⇒ shorter, stronger bond; zero ⇒ molecule does not exist.

Order for B₂, C₂, N₂ (s–p mixing): σ1s σ*1s σ2s σ*2s π2p π2p σ2p π*2p π*2p σ*2p. For O₂, F₂: σ2p below π2p.`,
    definitions: r`- **Bonding MO:** constructive overlap. **Antibonding MO:** destructive overlap (marked *).
- **HOMO/LUMO:** highest occupied / lowest unoccupied MO.`,
    principles: r`1. Unpaired electrons in MOs ⇒ paramagnetic.
2. Number of MOs = number of atomic orbitals combined.`,
    derivations: r`**O₂.** 16 electrons: σ1s² σ*1s² σ2s² σ*2s² σ2p² π2p⁴ π*2p². Bond order $= \frac{10 - 6}{2} = 2$; two unpaired electrons in π* ⇒ paramagnetic.`,
    formulas: r`- Bond order $= \dfrac{N_b - N_a}2$.
- H₂ 1; He₂⁺ ½; He₂ 0; Li₂ 1; B₂ 1 (paramagnetic); C₂ 2 (diamagnetic); N₂ 3; O₂ 2 (paramagnetic); F₂ 1; Ne₂ 0.
- O₂⁺ 2.5, O₂ 2, O₂⁻ 1.5, O₂²⁻ 1; N₂⁺ 2.5, N₂ 3.
- Bond length ∝ $\dfrac{1}{\text{bond order}}$; bond energy increases with bond order.
- Isoelectronic species have the same bond order (CO, N₂, CN⁻, NO⁺: 3).`,
    diagrams: r`MO energy diagram: atomic orbitals on each side, MOs in the middle; note the swap of σ2p and π2p between N₂ and O₂.`,
    graphs: r`Not applicable.`,
    specialCases: r`- N₂⁺ and N₂⁻ both have bond order 2.5, but N₂⁺ is more stable because N₂⁻ has more electrons in antibonding orbitals.`,
    exceptions: r`Simple MO diagrams for heteronuclear molecules (CO, NO) are approximate.`,
    assumptions: r`Homonuclear diatomics of period 2.`,
    applications: r`Magnetism of oxygen, stability of ions, spectroscopy.`,
    patterns: r`- Bond order, magnetism and stability comparisons.
- Bond length order among O₂ species.
- Isoelectronic species.`,
    misconceptions: r`- "VBT explains O₂'s paramagnetism." It does not; MOT does.`,
    traps: r`- Using the wrong σ2p/π2p order for B₂, C₂, N₂.`,
    summary: r`- BO $= (N_b - N_a)/2$; O₂ paramagnetic, BO 2.
- O₂⁺ > O₂ > O₂⁻ > O₂²⁻ in bond order.`,
  }),

  note("ionic-bonding-and-polarity", {
    introduction: r`Ionic bonds form by electron transfer; covalent bonds can be polar. Lattice enthalpy, Fajans' rules, dipole moments and hydrogen bonding explain melting points, solubility and structure.`,
    prerequisites: r`- Ionisation enthalpy, electron gain enthalpy
- Electronegativity`,
    concept: r`Ionic character depends on how much a cation distorts (polarises) an anion's electron cloud. Small, highly charged cations polarise strongly, giving covalent character.`,
    theory: r`Lattice enthalpy ∝ $\frac{z^+z^-}{r^+ + r^-}$. Born–Haber cycle uses Hess's law.

Dipole moment $\mu = q\times d$ (debye); vector sum of bond moments gives the molecular dipole.`,
    definitions: r`- **Fajans' rules:** covalent character increases with small cation, large anion, high charges, and pseudo-noble-gas (18-electron) cations.
- **Hydrogen bond:** attraction between H on N, O, F and a lone pair on N, O, F.
- **Percentage ionic character** $= \frac{\mu_{\text{obs}}}{\mu_{\text{ionic}}}\times100$.`,
    principles: r`1. Symmetrical molecules (CO₂, BF₃, CH₄, CCl₄) have zero dipole moment.
2. Intermolecular H-bonding raises boiling points; intramolecular H-bonding lowers them (o-nitrophenol).`,
    derivations: r`**Dipole of NH₃ vs NF₃.** In NH₃ the lone-pair moment adds to the N–H bond moments (1.47 D); in NF₃ the N–F moments point toward F, opposing the lone pair (0.23 D).`,
    formulas: r`- $\mu = q\times d$; $1\,\text{D} = 3.336\times10^{-30}$ C m.
- Resultant of two bond moments: $\mu = \sqrt{\mu_1^2 + \mu_2^2 + 2\mu_1\mu_2\cos\theta}$.
- % ionic character $= \dfrac{\mu_{\text{obs}}}{e\times d}\times100$.
- Lattice enthalpy $\propto \dfrac{z^+z^-}{r^+ + r^-}$.
- Born–Haber: $\Delta_fH = \Delta_{\text{sub}}H + IE + \tfrac12\Delta_{\text{diss}}H + \Delta_{\text{eg}}H - U$.
- Dipole moments: o > m > p for disubstituted benzenes with identical groups (p = 0).`,
    diagrams: r`Born–Haber cycle diagram: steps from elements to gaseous ions to the lattice.`,
    graphs: r`Boiling points of hydrides: H₂O, HF, NH₃ anomalously high due to H-bonding.`,
    specialCases: r`- LiCl and AgCl are more covalent than NaCl (small Li⁺; 18-electron Ag⁺).
- Ice has an open H-bonded structure — less dense than water.`,
    exceptions: r`Fajans' rules are qualitative trends, not exact predictions.`,
    assumptions: r`Ions treated as spheres.`,
    applications: r`Solubility, melting points, DNA base pairing (H-bonds).`,
    patterns: r`- Order of covalent character, lattice energy, melting point.
- Dipole moments of molecules.
- Effect of H-bonding on boiling points.`,
    misconceptions: r`- "Polar bonds always make polar molecules." Symmetry can cancel them.`,
    traps: r`- NF₃ vs NH₃ dipole order.`,
    summary: r`- Fajans: small/highly charged cation, large anion ⇒ covalent.
- $\mu = qd$; symmetric molecules $\mu = 0$; H-bonding raises bp.`,
  }),

  note("first-law-and-enthalpy", {
    introduction: r`Chemical thermodynamics tracks energy changes in reactions. Enthalpy and Hess's law let you compute heats of reaction from tabulated data.`,
    prerequisites: r`- First law of thermodynamics (physics)
- Stoichiometry`,
    concept: r`Reactions absorb or release heat. At constant pressure that heat is the enthalpy change $\Delta H$. Because enthalpy is a state function, the total $\Delta H$ is the same however the reaction is broken into steps (Hess's law).`,
    theory: r`$\Delta U = q + w$ (chemistry convention: $w$ = work done **on** the system, $w = -P\Delta V$). $H = U + PV$; $\Delta H = \Delta U + \Delta n_gRT$.`,
    definitions: r`- **Standard enthalpy of formation** $\Delta_fH^\circ$: 1 mol from elements in standard states (zero for elements).
- **Enthalpy of combustion, neutralisation, atomisation, bond dissociation.**
- **Extensive** vs **intensive** properties.`,
    principles: r`1. Hess's law of constant heat summation.
2. $\Delta_rH^\circ = \sum\Delta_fH^\circ(\text{products}) - \sum\Delta_fH^\circ(\text{reactants})$.
3. From bond energies: $\Delta_rH = \sum BE(\text{broken}) - \sum BE(\text{formed})$.`,
    derivations: r`**$\Delta H$ vs $\Delta U$.** $\Delta H = \Delta U + \Delta(PV) = \Delta U + \Delta n_gRT$ for ideal gases at constant $T$.`,
    formulas: r`- $\Delta U = q + w$; $w = -P_{\text{ext}}\Delta V$ (irreversible); reversible isothermal $w = -2.303nRT\log\dfrac{V_2}{V_1}$.
- $\Delta H = \Delta U + \Delta n_gRT$.
- $q_p = \Delta H$, $q_v = \Delta U$; $C_p - C_v = R$.
- $\Delta_rH^\circ = \sum\Delta_fH^\circ_{\text{prod}} - \sum\Delta_fH^\circ_{\text{react}}$.
- $\Delta_rH = \sum BE_{\text{reactants}} - \sum BE_{\text{products}}$.
- Neutralisation of strong acid by strong base: $-57.1$ kJ/mol.
- Calorimetry: $q = C\Delta T$ (bomb calorimeter gives $\Delta U$).
- Kirchhoff: $\Delta H_2 = \Delta H_1 + \Delta C_p(T_2 - T_1)$.`,
    diagrams: r`Enthalpy level diagrams: products below reactants for exothermic reactions.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Weak acid neutralisation releases less than 57.1 kJ (energy used for ionisation).
- Enthalpy of formation of diamond is +1.9 kJ/mol (graphite is the standard state).`,
    exceptions: r`Bond energy method gives approximate values (average bond energies).`,
    assumptions: r`Ideal gases; standard state 1 bar, specified temperature (usually 298 K).`,
    applications: r`Fuel values, industrial process design, food calorimetry.`,
    patterns: r`- Hess's law combinations.
- $\Delta H$ from $\Delta_fH^\circ$ or bond energies.
- $\Delta H$–$\Delta U$ conversion.
- Work in isothermal expansions.`,
    misconceptions: r`- "Exothermic reactions are always spontaneous." Entropy also matters.`,
    traps: r`- Physics vs chemistry sign convention for work.
- $\Delta n_g$ counts gaseous moles only.`,
    summary: r`- $\Delta H = \Delta U + \Delta n_gRT$; Hess's law.
- From formation enthalpies or bond energies (broken − formed).`,
  }),
];
