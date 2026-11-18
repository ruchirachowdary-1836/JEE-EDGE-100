import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const CHEM_INORGANIC: NoteSeed[] = [
  note("periodic-trends", {
    introduction: r`The modern periodic table arranges elements by atomic number, so properties repeat periodically. Trends in size, ionisation enthalpy, electron gain enthalpy and electronegativity — and their exceptions — are tested every year.`,
    prerequisites: r`- Electronic configuration
- Effective nuclear charge (shielding)`,
    concept: r`Across a period, protons are added but shielding barely increases, so effective nuclear charge rises: atoms shrink and hold electrons more tightly. Down a group, new shells are added: atoms grow and hold outer electrons less tightly.`,
    theory: r`Atomic radius decreases across a period, increases down a group. Ionisation enthalpy (IE) and electronegativity (EN) increase across, decrease down. Electron gain enthalpy becomes more negative across (with exceptions), less negative down (except Cl > F).`,
    definitions: r`- **Ionisation enthalpy:** energy to remove the outermost electron from a gaseous atom.
- **Electron gain enthalpy** $\Delta_{eg}H$: enthalpy change when a gaseous atom gains an electron.
- **Electronegativity:** tendency of a bonded atom to attract shared electrons (Pauling scale).
- **Isoelectronic species:** same number of electrons; size decreases as nuclear charge increases.`,
    principles: r`1. Cation smaller than parent atom; anion larger.
2. Successive IEs increase; a large jump marks removal from a new (inner) shell.
3. Half-filled/fully filled subshells cause IE irregularities.`,
    derivations: r`**Isoelectronic sizes.** For N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ (10 electrons each), nuclear charge rises 7 → 13, so radius decreases in that order.`,
    formulas: r`- Radius order (isoelectronic): $\text{N}^{3-} > \text{O}^{2-} > \text{F}^- > \text{Na}^+ > \text{Mg}^{2+} > \text{Al}^{3+}$.
- IE exceptions: Be > B, Mg > Al, N > O, P > S.
- Electron gain enthalpy: Cl > F > Br > I (most negative Cl); noble gases and Be, Mg, N have positive or near-zero values.
- EN (Pauling): F 4.0 > O 3.5 > N ≈ Cl 3.0.
- Mulliken EN $\propto \dfrac{IE + EA}{2}$.
- Diagonal relationships: Li–Mg, Be–Al, B–Si.
- Acidic character of oxides increases across a period; basic character increases down a group; amphoteric: Al₂O₃, ZnO, BeO, SnO₂, PbO.
- Ga radius (135 pm) < Al (143 pm) — poor shielding by 3d electrons.`,
    diagrams: r`Colour the interactive periodic table by electronegativity in the Chemistry Lab to see the trends.`,
    graphs: r`First IE vs atomic number: peaks at noble gases, troughs at alkali metals, small dips at B, O, Al, S.`,
    specialCases: r`- Noble gas radii are van der Waals radii (larger than covalent radii of neighbours).
- Lanthanoid contraction makes 4d and 5d elements of a group similar in size (Zr ≈ Hf).`,
    exceptions: r`Electron gain enthalpy of F is less negative than Cl because of electron–electron repulsion in the compact 2p subshell.`,
    assumptions: r`Gas-phase isolated atoms for IE and $\Delta_{eg}H$.`,
    applications: r`Predicting reactivity, bond type and oxide nature.`,
    patterns: r`- Order questions for radius, IE, $\Delta_{eg}H$, EN.
- Identify element from successive IE jumps.
- Nature of oxides.`,
    misconceptions: r`- "Electron affinity always increases across a period." There are exceptions (N, noble gases).`,
    traps: r`- O vs S electron gain enthalpy (S more negative).`,
    summary: r`- Across: size ↓, IE ↑, EN ↑. Down: size ↑, IE ↓.
- Exceptions: Be > B, N > O (IE); Cl > F ($\Delta_{eg}H$); Ga < Al (radius).`,
  }),

  note("groups-13-and-14", {
    introduction: r`Groups 13 (B to Tl) and 14 (C to Pb) show a shift from non-metals to metals down the group, the inert pair effect and striking anomalies of boron and carbon.`,
    prerequisites: r`- Periodic trends
- Hybridisation`,
    concept: r`Lighter members use all valence electrons ($+3$ for group 13, $+4$ for group 14). Heavier members increasingly keep their $ns^2$ pair out of bonding (inert pair effect), so Tl⁺ and Pb²⁺ become the stable states.`,
    theory: r`Group 13: $ns^2np^1$; boron is a non-metal forming electron-deficient compounds (Lewis acids, BF₃). Diborane B₂H₆ has two 3-centre-2-electron (banana) bonds.

Group 14: $ns^2np^2$; carbon catenates strongly and forms $p\pi$–$p\pi$ multiple bonds; silicon forms silicates and silicones.`,
    definitions: r`- **Inert pair effect:** reluctance of $ns^2$ electrons to bond in heavy p-block elements.
- **Catenation:** self-linking of atoms (C ≫ Si > Ge ≈ Sn).
- **Allotropes of carbon:** diamond (sp³), graphite (sp², conducts), fullerenes.`,
    principles: r`1. Stability of lower oxidation state increases down the group.
2. Boron cannot expand its octet (no d orbitals) — maximum covalency 4.
3. Lewis acidity of BX₃: BI₃ > BBr₃ > BCl₃ > BF₃ (back-bonding strongest in BF₃).`,
    derivations: r`**Lewis acidity order.** In BF₃, filled F 2p orbitals donate into the empty B 2p orbital (pπ–pπ back bonding), partly satisfying boron's electron deficiency. Overlap is best for similar-size F, so BF₃ is the weakest acceptor.`,
    formulas: r`- Group 13 oxidation states: +3 (B, Al), +1 increasingly stable (Tl⁺ > Tl³⁺).
- Group 14: +4 (C, Si), +2 increasingly stable (Pb²⁺ > Pb⁴⁺); PbO₂ strong oxidant, SnCl₂ reducing agent.
- Lewis acidity BI₃ > BBr₃ > BCl₃ > BF₃.
- Diborane: 4 terminal 2c–2e B–H, 2 bridging 3c–2e B–H–B bonds.
- Borax: Na₂[B₄O₅(OH)₄]·8H₂O; borax bead test gives coloured metaborates.
- Orthoboric acid H₃BO₃: weak monobasic Lewis acid ($\text{B(OH)}_3 + \text{H}_2\text{O} \to [\text{B(OH)}_4]^- + \text{H}^+$).
- CO is a neutral, toxic ligand (binds haemoglobin); CO₂ acidic; SiO₂ covalent network.
- Silicones: $(R_2SiO)_n$, water repellent.`,
    diagrams: r`Diborane structure: two bridging H atoms above and below the B–B axis, four terminal H in a plane.`,
    graphs: r`Melting point trends: group 13 irregular (Ga very low, 303 K).`,
    specialCases: r`- Al is passivated by concentrated HNO₃ (oxide layer).
- Graphite conducts along layers; diamond is an insulator.`,
    exceptions: r`Boron and carbon behave anomalously (small size, no d orbitals, high IE).`,
    assumptions: r`Current syllabus coverage (general trends and important compounds).`,
    applications: r`Borax in glass, Al in alloys, silicon in semiconductors, silicones as sealants.`,
    patterns: r`- Inert pair effect and stability of oxidation states.
- Structure of diborane and boric acid.
- Lewis acid strength order.
- Allotropes and properties of carbon.`,
    misconceptions: r`- "BF₃ is the strongest Lewis acid because F is most electronegative." Back-bonding makes it the weakest.`,
    traps: r`- H₃BO₃ is not a protonic (Brønsted) acid.`,
    summary: r`- Inert pair effect: Tl⁺, Pb²⁺ stable.
- B₂H₆: 3c–2e bonds; BX₃ acidity BI₃ > BF₃.
- C: catenation, pπ–pπ bonds.`,
  }),

  note("groups-15-to-18", {
    introduction: r`Groups 15 to 18 contain the most important non-metals: N, P, O, S, halogens and noble gases. Oxidation states, oxoacids, hydrides and interhalogen/xenon compounds are frequently tested.`,
    prerequisites: r`- VSEPR and hybridisation
- Periodic trends`,
    concept: r`Elements from period 3 onward can use d orbitals to expand their octet, giving higher covalencies (PCl₅, SF₆, IF₇). Small first members (N, O, F) form strong π bonds and hydrogen bonds instead, behaving anomalously.`,
    theory: r`Group 15: $ns^2np^3$, oxidation states −3 to +5. Group 16: $ns^2np^4$, −2 to +6. Group 17: $ns^2np^5$, −1 to +7 (F only −1). Group 18: noble gases; Xe forms fluorides and oxides.

Hydride trends: thermal stability decreases down the group; reducing character and acidity (group 16, 17) increase down the group.`,
    definitions: r`- **Oxoacids:** contain X–OH groups; acidity rises with oxidation state of X and with EN.
- **Interhalogens:** XX′ₙ ($n = 1, 3, 5, 7$), X larger than X′.
- **Pseudohalides:** CN⁻, SCN⁻.`,
    principles: r`1. Basicity of hydrides: NH₃ > PH₃ > AsH₃; acid strength: HF < HCl < HBr < HI; H₂O < H₂S < H₂Se < H₂Te.
2. Bond angle in hydrides decreases down the group.
3. F₂ is the strongest oxidant (high hydration enthalpy, weak F–F bond).`,
    derivations: r`**Basicity of oxoacids of phosphorus.** Only P–OH hydrogens are ionisable: H₃PO₄ (3 OH) tribasic, H₃PO₃ (2 OH, 1 P–H) dibasic, H₃PO₂ (1 OH, 2 P–H) monobasic — and P–H bonds make the last two reducing agents.`,
    formulas: r`- Hydride thermal stability: NH₃ > PH₃ > AsH₃; H₂O > H₂S; HF > HCl > HBr > HI.
- Acid strength: HI > HBr > HCl > HF; H₂Te > H₂Se > H₂S > H₂O.
- Boiling points: NH₃ > PH₃ < AsH₃; H₂O highest in group 16; HF highest in group 17 (H-bonding).
- Oxoacid acidity: HClO₄ > HClO₃ > HClO₂ > HClO; HOCl > HOBr > HOI.
- Basicity: H₃PO₄ 3, H₃PO₃ 2, H₃PO₂ 1; H₄P₂O₇ 4.
- Xenon fluorides: XeF₂ linear, XeF₄ square planar, XeF₆ distorted octahedral; XeO₃ pyramidal.
- Interhalogens: ClF₃ T-shaped, BrF₅ square pyramidal, IF₇ pentagonal bipyramidal.
- Oxides of nitrogen: N₂O (+1), NO (+2, paramagnetic), N₂O₃ (+3), NO₂ (+4, paramagnetic, dimerises), N₂O₅ (+5).
- Ozone: bent, resonance; strong oxidant. Sulfur: S₈ crown; H₂SO₄ by contact process (V₂O₅).
- Bond energy anomaly: F–F < Cl–Cl > Br–Br > I–I.`,
    diagrams: r`Structures: P₄ tetrahedron, P₄O₁₀ cage, S₈ crown, H₂SO₄ tetrahedral, XeF₄ square planar.`,
    graphs: r`Boiling points of group 15–17 hydrides: first member anomalously high.`,
    specialCases: r`- Nitrogen forms N≡N (very stable), phosphorus forms P₄ (single bonds).
- Noble gases: only Xe (and Kr) form stable compounds, mainly with F and O.`,
    exceptions: r`Nitrogen cannot form pentahalides (no d orbitals); F shows only −1.`,
    assumptions: r`Current syllabus emphasis on trends and important compounds.`,
    applications: r`Fertilisers (NH₃, phosphates), sulfuric acid industry, chlorine bleaches, xenon lamps.`,
    patterns: r`- Order of acid strength, bond angle, boiling point, thermal stability.
- Basicity and reducing nature of P oxoacids.
- Shapes and hybridisation of interhalogens and xenon compounds.
- Oxidation states of N in its oxides.`,
    misconceptions: r`- "HF is a strong acid because F is most electronegative." The strong H–F bond makes it weak.`,
    traps: r`- H₃PO₃ is dibasic, not tribasic.`,
    summary: r`- Hydride stability ↓ down group; acidity (16, 17) ↑ down group.
- H₃PO₄/₃/₂ basicity 3/2/1; XeF₂/₄/₆ shapes.
- F–F weaker than Cl–Cl.`,
  }),

  note("transition-elements", {
    introduction: r`d-block elements show variable oxidation states, coloured ions, paramagnetism, catalytic activity and complex formation. KMnO₄ and K₂Cr₂O₇ are the key compounds.`,
    prerequisites: r`- Electronic configuration
- Crystal field idea (qualitative)`,
    concept: r`The (n−1)d and ns orbitals are close in energy, so different numbers of electrons can be used in bonding — giving variable oxidation states. Partially filled d orbitals allow d–d transitions (colour) and unpaired electrons (magnetism).`,
    theory: r`General configuration $(n-1)d^{1-10}ns^{1-2}$. Highest oxidation state = number of $(n-1)d + ns$ electrons up to Mn (+7); later elements show lower maxima.

Magnetic moment (spin only) $\mu = \sqrt{n(n+2)}$ BM.`,
    definitions: r`- **Transition element:** incompletely filled d subshell in the atom or a common ion (Zn, Cd, Hg excluded).
- **Interstitial compounds:** small atoms (H, C, N) in metal lattices.
- **Alloys:** e.g. brass (Cu–Zn), bronze (Cu–Sn).`,
    principles: r`1. Colour arises from d–d transitions; d⁰ and d¹⁰ ions are colourless.
2. Catalysis: variable oxidation states and surface adsorption (Fe in Haber, V₂O₅ in contact process).
3. $E^\circ(M^{2+}/M)$ trends reflect atomisation, ionisation and hydration enthalpies.`,
    derivations: r`**Colour of [Ti(H₂O)₆]³⁺.** Ti³⁺ is d¹; absorption of yellow-green light promotes the electron from $t_{2g}$ to $e_g$; the transmitted complementary colour is purple.`,
    formulas: r`- $\mu = \sqrt{n(n+2)}$ BM: $n = 1$ 1.73, 2 2.83, 3 3.87, 4 4.90, 5 5.92.
- Mn shows +2 to +7; Mn²⁺ (d⁵) most stable; Fe³⁺ (d⁵) more stable than Fe²⁺.
- KMnO₄ (acidic): MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O; neutral: → MnO₂ (3e⁻); strongly basic: → MnO₄²⁻ (1e⁻).
- K₂Cr₂O₇ (acidic): Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.
- Chromate–dichromate: 2CrO₄²⁻ (yellow) + 2H⁺ ⇌ Cr₂O₇²⁻ (orange) + H₂O.
- KMnO₄ preparation: MnO₂ fused with KOH + O₂ → K₂MnO₄ (green), then oxidised to KMnO₄ (purple).
- Strongest oxidising states: MnO₄⁻, Cr₂O₇²⁻ (acidic); $E^\circ(\text{Cu}^{2+}/\text{Cu})$ positive (Cu does not liberate H₂ from acids).`,
    diagrams: r`Structures of MnO₄⁻ (tetrahedral) and Cr₂O₇²⁻ (two tetrahedra sharing an O).`,
    graphs: r`Melting points across 3d series rise to a maximum near Cr/V, dip at Mn, fall to Zn (fewer unpaired electrons in metallic bonding).`,
    specialCases: r`- Cu⁺ disproportionates in water (2Cu⁺ → Cu²⁺ + Cu).
- Sc³⁺, Ti⁴⁺, Zn²⁺ colourless.`,
    exceptions: r`Cr and Cu have anomalous configurations (3d⁵4s¹, 3d¹⁰4s¹).`,
    assumptions: r`Spin-only formula (orbital contribution quenched).`,
    applications: r`Catalysts, pigments, steel alloys, redox titrations with KMnO₄/K₂Cr₂O₇.`,
    patterns: r`- Magnetic moment from configuration of ions.
- Colour and stability of oxidation states.
- Reactions and n-factors of KMnO₄/K₂Cr₂O₇.
- Trends in $E^\circ$ and melting points.`,
    misconceptions: r`- "All d-block elements are transition elements." Zn, Cd, Hg are not (d¹⁰ in all common states).`,
    traps: r`- Removing 4s before 3d when forming ions.`,
    summary: r`- $\mu = \sqrt{n(n+2)}$; d⁰/d¹⁰ colourless.
- MnO₄⁻ n = 5 (acid), 3 (neutral), 1 (basic); Cr₂O₇²⁻ n = 6.`,
  }),

  note("lanthanoids-and-actinoids", {
    introduction: r`The f-block contains the lanthanoids (Ce–Lu) and actinoids (Th–Lr). Lanthanoid contraction and its consequences are the most tested idea.`,
    prerequisites: r`- Electronic configuration and shielding`,
    concept: r`4f electrons shield the nucleus very poorly, so across the lanthanoids the effective nuclear charge rises and atoms/ions shrink steadily — the lanthanoid contraction.`,
    theory: r`Lanthanoids: $[Xe]4f^{1-14}5d^{0-1}6s^2$, common state +3 (also +2: Eu, Yb; +4: Ce). Actinoids: $[Rn]5f^{1-14}6d^{0-1}7s^2$, wider range of oxidation states (up to +7 for Np, Pu) because 5f, 6d, 7s are close in energy; all radioactive.`,
    definitions: r`- **Lanthanoid contraction:** steady decrease in size of Ln³⁺ from La³⁺ to Lu³⁺.
- **Misch metal:** alloy of lanthanoids (~95%) with iron, used in lighter flints.`,
    principles: r`1. Lanthanoids are chemically similar (hard to separate).
2. Basicity of Ln(OH)₃ decreases from La to Lu.
3. Actinoid contraction is greater than lanthanoid contraction (poorer 5f shielding).`,
    derivations: r`**Consequence: Zr ≈ Hf.** The contraction across 14 lanthanoids cancels the expected size increase from period 5 to 6, so Zr (160 pm) and Hf (159 pm) are nearly identical in size and chemistry.`,
    formulas: r`- Ln³⁺ size: La³⁺ > … > Lu³⁺; basicity of hydroxides La(OH)₃ > … > Lu(OH)₃.
- Ce⁴⁺ (f⁰) good oxidant; Eu²⁺ (f⁷), Yb²⁺ (f¹⁴) good reductants.
- Magnetic moments of Ln³⁺ depend on both spin and orbital contributions (spin-only formula is not accurate).
- Colour: f–f transitions; La³⁺ (f⁰) and Lu³⁺ (f¹⁴) colourless.`,
    diagrams: r`Graph of ionic radius vs atomic number from La³⁺ to Lu³⁺: steady downward slope.`,
    graphs: r`Radius decrease is larger across actinoids.`,
    specialCases: r`- Gd: [Xe]4f⁷5d¹6s² — half-filled f retained.`,
    exceptions: r`+2 and +4 states appear where they give f⁰, f⁷ or f¹⁴.`,
    assumptions: r`Current syllabus: general properties and comparisons.`,
    applications: r`Lighter flints, catalysts in petroleum cracking, nuclear fuels (U, Pu).`,
    patterns: r`- Causes and consequences of lanthanoid contraction.
- Comparison of lanthanoids and actinoids.
- Stable oxidation states and their redox behaviour.`,
    misconceptions: r`- "Lanthanoid contraction means lanthanoids are small." It is a gradual decrease across the series.`,
    traps: r`- Ce⁴⁺ is an oxidant, Eu²⁺ a reductant.`,
    summary: r`- Lanthanoid contraction ⇒ Zr ≈ Hf, decreasing basicity.
- Actinoids: more oxidation states, radioactive, larger contraction.`,
  }),

  note("nomenclature-and-isomerism", {
    introduction: r`Coordination compounds contain a central metal bonded to ligands. Naming them correctly and counting their isomers are high-frequency JEE questions.`,
    prerequisites: r`- Lewis acids/bases
- Oxidation numbers`,
    concept: r`Ligands donate electron pairs to the metal. The way ligands are arranged in space (and which atoms bond) produces isomers with the same formula but different properties.`,
    theory: r`Werner's theory: primary valency (oxidation state, ionisable) and secondary valency (coordination number, directional).

IUPAC naming: cation first; ligands alphabetically (prefixes di-, tri- ignored), then metal with oxidation state in Roman numerals; anionic complexes end in -ate (ferrate, cuprate, argentate).`,
    definitions: r`- **Coordination number:** number of donor atoms bonded to the metal.
- **Denticity:** monodentate, bidentate (en, ox²⁻), hexadentate (EDTA⁴⁻). **Ambidentate:** NO₂⁻/ONO⁻, SCN⁻/NCS⁻.
- **Chelate:** ring formed by a polydentate ligand (extra stability).`,
    principles: r`1. Structural isomers: ionisation, hydrate (solvate), linkage, coordination.
2. Stereoisomers: geometrical (cis/trans, fac/mer) and optical.
3. Square planar MA₄ and tetrahedral complexes show no geometrical isomerism for MA₄/MA₃B.`,
    derivations: r`**Geometrical isomers of [MA₃B₃].** Octahedral: fac (three A on one face) and mer (three A in a meridian) — 2 isomers.

**Optical activity of [Co(en)₃]³⁺.** No plane of symmetry ⇒ non-superimposable mirror images (Δ and Λ).`,
    formulas: r`- Oxidation state from overall charge minus ligand charges.
- Geometrical isomers: square planar MA₂B₂ 2 (cis, trans); MABCD 3; octahedral MA₄B₂ 2; MA₃B₃ 2 (fac, mer); M(AA)₂B₂ 2 (cis optically active).
- Optical: [M(AA)₃] 2 enantiomers; cis-[M(AA)₂B₂] 2 enantiomers; MA₂B₂C₂: 5 geometrical (one cis-form pair optical) — 6 stereoisomers total.
- Conductivity/precipitation with AgNO₃ identifies counter-ions (e.g. [Co(NH₃)₆]Cl₃ gives 3 AgCl).
- EAN $= Z - \text{oxidation state} + 2\times\text{CN}$.
- Ligand charges: Cl⁻ chlorido, CN⁻ cyanido, NH₃ ammine, H₂O aqua, CO carbonyl, NO₂⁻ nitrito-N, en ethane-1,2-diamine.`,
    diagrams: r`Draw octahedral cis/trans (adjacent vs opposite) and fac/mer arrangements; mirror images of [M(en)₃].`,
    graphs: r`Not applicable.`,
    specialCases: r`- [Co(NH₃)₅Br]SO₄ and [Co(NH₃)₅SO₄]Br are ionisation isomers.
- [Co(NH₃)₅(NO₂)]²⁺ and [Co(NH₃)₅(ONO)]²⁺ are linkage isomers.`,
    exceptions: r`Tetrahedral complexes show optical isomerism only with four different unsymmetrical ligands (rare).`,
    assumptions: r`IUPAC 2005 conventions (chlorido, cyanido).`,
    applications: r`Chelation therapy (EDTA), haemoglobin, chlorophyll, cisplatin (cis isomer is the drug).`,
    patterns: r`- IUPAC names and formulas.
- Count geometrical and optical isomers.
- Identify isomer types; ions released in solution.`,
    misconceptions: r`- "Trans-[Co(en)₂Cl₂]⁺ is optically active." It has a plane of symmetry; the cis form is.`,
    traps: r`- Alphabetical order ignores multiplying prefixes.`,
    summary: r`- Name: cation first, ligands alphabetical, metal (−ate if anionic) with oxidation state.
- MA₂B₂ (sq. planar) 2; MA₃B₃ fac/mer; [M(AA)₃] optical.`,
  }),

  note("bonding-in-coordination-compounds", {
    introduction: r`Valence bond theory and crystal field theory explain the geometry, magnetism and colour of complexes. Predicting high-spin/low-spin and magnetic moments is a frequent question.`,
    prerequisites: r`- Nomenclature of complexes
- Hybridisation, d orbitals`,
    concept: r`Ligands approaching a metal raise the energies of some d orbitals more than others. In an octahedral field the $e_g$ pair (pointing at ligands) rises above the $t_{2g}$ trio. Strong-field ligands split them widely, forcing electrons to pair (low spin).`,
    theory: r`VBT: inner-orbital (d²sp³, low spin) vs outer-orbital (sp³d², high spin); sp³ tetrahedral; dsp² square planar.

CFT: octahedral splitting $\Delta_o$; tetrahedral $\Delta_t = \frac49\Delta_o$ (always high spin). If $\Delta_o > P$ (pairing energy), low spin.

Spectrochemical series: I⁻ < Br⁻ < SCN⁻ < Cl⁻ < S²⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < CN⁻ < CO.`,
    definitions: r`- **CFSE:** crystal field stabilisation energy.
- **Strong-field / weak-field ligands.**
- **Synergic bonding** in metal carbonyls (σ donation + π back-donation).`,
    principles: r`1. Colour: absorbed light corresponds to $\Delta$; observed colour is complementary.
2. Larger metal charge and heavier metal (4d, 5d) ⇒ larger $\Delta$ (mostly low spin).
3. Stability increases with chelation and metal charge.`,
    derivations: r`**CFSE of d⁶.** High spin $t_{2g}^4e_g^2$: $4(-0.4) + 2(0.6) = -0.4\Delta_o$. Low spin $t_{2g}^6$: $-2.4\Delta_o + 2P$.`,
    formulas: r`- Octahedral: $t_{2g}$ at $-0.4\Delta_o$, $e_g$ at $+0.6\Delta_o$; CFSE $= (-0.4n_{t_{2g}} + 0.6n_{e_g})\Delta_o + \text{pairing}$.
- Tetrahedral: $\Delta_t = \tfrac49\Delta_o$; $e$ at $-0.6\Delta_t$, $t_2$ at $+0.4\Delta_t$.
- $\mu = \sqrt{n(n+2)}$ BM from unpaired electrons.
- Examples: [Fe(CN)₆]³⁻ d⁵ low spin, 1 unpaired, d²sp³; [FeF₆]³⁻ d⁵ high spin, 5 unpaired, sp³d²; [Co(NH₃)₆]³⁺ d⁶ low spin, diamagnetic; [CoF₆]³⁻ high spin, 4 unpaired; [Ni(CN)₄]²⁻ dsp² diamagnetic; [NiCl₄]²⁻ sp³, 2 unpaired; [Ni(CO)₄] sp³ diamagnetic.
- Absorbed wavelength $\lambda = \dfrac{hc}{\Delta}$; stronger field ⇒ shorter absorbed wavelength.
- Carbonyls: EAN rule (18-electron) — Ni(CO)₄, Fe(CO)₅, Cr(CO)₆.`,
    diagrams: r`Splitting diagrams: octahedral (two up, three down), tetrahedral (reverse, smaller), square planar ($d_{x^2-y^2}$ highest).`,
    graphs: r`Not applicable.`,
    specialCases: r`- Co³⁺ complexes are almost always low spin (large $\Delta$).
- [Cu(H₂O)₆]²⁺ shows Jahn–Teller distortion.`,
    exceptions: r`CFT treats ligands as point charges and ignores covalency (ligand field theory refines it).`,
    assumptions: r`Spin-only magnetic moments.`,
    applications: r`Gemstone colours, biological metal centres, catalysts.`,
    patterns: r`- Hybridisation, geometry and magnetism of given complexes.
- CFSE values; high- vs low-spin.
- Colour and absorbed wavelength order.
- Metal carbonyl bonding.`,
    misconceptions: r`- "Observed colour is the absorbed colour." It is the complementary colour.`,
    traps: r`- Ni²⁺ with CN⁻ is square planar, with Cl⁻ tetrahedral.`,
    summary: r`- Spectrochemical series (I⁻ weakest … CO strongest).
- $\Delta_t = \frac49\Delta_o$; low spin if $\Delta_o > P$.
- [Fe(CN)₆]³⁻ 1 unpaired, [FeF₆]³⁻ 5 unpaired.`,
  }),
];
