import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const CHEM_ORGANIC: NoteSeed[] = [
  note("purification-and-analysis", {
    introduction: r`Before a compound's structure can be studied it must be purified and its elements identified and quantified. JEE asks which method suits which mixture and how to calculate percentage composition.`,
    prerequisites: r`- Mole concept
- Physical properties (boiling point, solubility)`,
    concept: r`Each purification method exploits a difference: solubility (crystallisation), boiling point (distillation), volatility with steam (steam distillation), or adsorption (chromatography).`,
    theory: r`Detection (Lassaigne's test): fuse with sodium to convert N, S, X into NaCN, Na₂S, NaX. N → Prussian blue; S → violet with sodium nitroprusside or black PbS; halogens → AgX precipitate (after boiling off CN⁻/S²⁻ with HNO₃).

Quantitative: Dumas/Kjeldahl (N), Carius (halogens, S), Liebig combustion (C, H).`,
    definitions: r`- **Rf value** $= \frac{\text{distance moved by compound}}{\text{distance moved by solvent}}$.
- **Fractional distillation:** for liquids with close boiling points. **Distillation under reduced pressure:** for compounds decomposing below their boiling point (glycerol).`,
    principles: r`1. Steam distillation for steam-volatile, water-immiscible compounds (aniline, nitrobenzene).
2. Kjeldahl's method fails for nitro, azo and ring nitrogen (pyridine).`,
    derivations: r`**Kjeldahl.** N → NH₃ absorbed in known acid; % N $= \frac{1.4\times N_{\text{acid}}\times V_{\text{acid used}}}{w}$.`,
    formulas: r`- % C $= \dfrac{12}{44}\times\dfrac{m_{\text{CO}_2}}{w}\times100$; % H $= \dfrac{2}{18}\times\dfrac{m_{\text{H}_2\text{O}}}{w}\times100$.
- Dumas: % N $= \dfrac{28}{22400}\times\dfrac{V_{\text{N}_2}(\text{STP, mL})}{w}\times100$.
- Kjeldahl: % N $= \dfrac{1.4\,NV}{w}$ ($V$ mL of acid consumed).
- Carius: % Cl $= \dfrac{35.5}{143.5}\times\dfrac{m_{\text{AgCl}}}{w}\times100$; % Br with 80/188; % S $= \dfrac{32}{233}\times\dfrac{m_{\text{BaSO}_4}}{w}\times100$.
- Lassaigne: Fe₄[Fe(CN)₆]₃ Prussian blue (N); [Fe(CN)₅NOS]⁴⁻ violet (S); Fe(SCN)²⁺ blood red (N + S together).`,
    diagrams: r`Paper/TLC chromatogram: spots at different heights; Rf characteristic for a solvent system.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Sugar + salt: crystallisation; o- and p-nitrophenol: steam distillation (o- is steam volatile due to intramolecular H-bonding).`,
    exceptions: r`Beilstein test (green flame) is not definitive (some N compounds also give it).`,
    assumptions: r`Complete combustion/conversion in quantitative methods.`,
    applications: r`Drug purity checks, forensic analysis, natural product isolation.`,
    patterns: r`- Choose the right purification method.
- Interpret Lassaigne results.
- Percentage composition from analysis data.`,
    misconceptions: r`- "Kjeldahl works for all N compounds." Not for nitro/azo/ring N.`,
    traps: r`- Boil off CN⁻ and S²⁻ before the halogen test.`,
    summary: r`- Lassaigne: Prussian blue N, violet S, blood red N+S.
- % N (Kjeldahl) $= 1.4NV/w$; Carius halogens/S.`,
  }),

  note("nomenclature-and-isomerism-basic-principles-organic", {
    introduction: r`IUPAC rules give every organic compound a unique name; isomerism explains why one formula can represent many compounds. Both are guaranteed JEE content.`,
    prerequisites: r`- Valency of carbon
- Functional groups`,
    concept: r`A name encodes the longest chain (root), the principal functional group (suffix), substituents (prefixes) and their positions (lowest locants). Isomers share a formula but differ in connectivity (structural) or spatial arrangement (stereo).`,
    theory: r`Priority of functional groups (suffix): carboxylic acid > sulfonic acid > anhydride > ester > acid halide > amide > nitrile > aldehyde > ketone > alcohol > amine > alkene/alkyne.

Stereoisomerism: geometrical (cis/trans, E/Z by CIP priority) and optical (chiral centres; R/S).`,
    definitions: r`- **Chiral centre:** carbon with four different groups. **Enantiomers:** non-superimposable mirror images. **Diastereomers:** stereoisomers that are not mirror images. **Meso:** has chiral centres but a plane of symmetry (optically inactive).
- **Racemic mixture:** 50:50 enantiomers.`,
    principles: r`1. Lowest locant set to the principal group, then multiple bonds, then substituents.
2. CIP priority: higher atomic number first.
3. Structural isomers: chain, position, functional, metamerism, tautomerism.`,
    derivations: r`**Stereoisomer count.** With $n$ distinct chiral centres and no symmetry: $2^n$. If the molecule is symmetric and $n$ even: $2^{n-1} + 2^{n/2 - 1}$ (includes meso forms).`,
    formulas: r`- Degree of unsaturation (DBE) $= C - \dfrac H2 - \dfrac X2 + \dfrac N2 + 1$.
- Optical isomers (unsymmetric) $= 2^n$; symmetric, $n$ even: $2^{n-1}$ optically active + $2^{n/2-1}$ meso.
- Geometrical isomers of a compound with $n$ dissimilar double bonds: $2^n$.
- Common names: isopropyl, sec-butyl, tert-butyl, neopentyl.
- Tautomerism: keto ⇌ enol (needs α-H).`,
    diagrams: r`Fischer and wedge-dash projections; Newman projections for conformations.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Tartaric acid: 2 chiral centres, 3 stereoisomers (d, l, meso).
- Cumulated allenes can be chiral without a chiral centre.`,
    exceptions: r`Chirality requires the absence of a plane/centre of symmetry, not merely a stereocentre.`,
    assumptions: r`Current IUPAC recommendations.`,
    applications: r`Drug design (only one enantiomer active), naming in research and patents.`,
    patterns: r`- IUPAC names of polyfunctional compounds.
- Count structural/stereo isomers.
- E/Z and R/S assignment; DBE.`,
    misconceptions: r`- "Every compound with a chiral centre is optically active." Meso compounds are not.`,
    traps: r`- Alphabetical order of substituents ignores di/tri but not iso.`,
    summary: r`- Principal group priority: COOH > ester > amide > CN > CHO > ketone > OH > NH₂.
- DBE $= C - H/2 - X/2 + N/2 + 1$; $2^n$ stereoisomers.`,
  }),

  note("electronic-effects-and-intermediates", {
    introduction: r`Inductive, resonance and hyperconjugation effects decide acidity, basicity and the stability of carbocations, carbanions and radicals — the key to predicting reaction outcomes.`,
    prerequisites: r`- Electronegativity and resonance structures
- Hybridisation`,
    concept: r`Electrons in a molecule are pushed or pulled by nearby groups. Anything that spreads a charge over more atoms stabilises it: that is why resonance-stabilised and highly substituted carbocations form easily.`,
    theory: r`- **Inductive (I):** through σ bonds, decreasing with distance. −I: NO₂ > CN > COOH > F > Cl > Br > I > OH. +I: alkyl groups (tert > sec > primary > methyl).
- **Resonance (R/M):** through π systems. +R: −OH, −OR, −NH₂, halogens; −R: −NO₂, −CN, −CHO, −COOH.
- **Hyperconjugation:** σ(C–H) delocalisation into an adjacent empty p orbital or π bond; more α-H ⇒ more stability.`,
    definitions: r`- **Electrophile:** electron-poor (H⁺, NO₂⁺, carbocations). **Nucleophile:** electron-rich (OH⁻, CN⁻, NH₃).
- **Homolytic** (radicals) and **heterolytic** (ions) bond cleavage.`,
    principles: r`1. Carbocation stability: benzyl ≈ allyl > 3° > 2° > 1° > methyl.
2. Carbanion stability: reverse order of alkyl substitution; increased by −I/−R groups.
3. Radical stability parallels carbocations.
4. Carbocations rearrange (hydride/alkyl shifts) to more stable ones.`,
    derivations: r`**Acidity of substituted acids.** Electron-withdrawing groups stabilise the carboxylate anion: Cl₃CCOOH > Cl₂CHCOOH > ClCH₂COOH > CH₃COOH; and FCH₂COOH > ClCH₂COOH (F more −I).`,
    formulas: r`- Carbocation: $(C_6H_5)_3C^+ > (C_6H_5)_2CH^+$; $3^\circ > 2^\circ > 1^\circ > CH_3^+$. Benzyl and allyl cations are resonance-stabilised (far more stable than an ordinary primary cation, comparable to secondary/tertiary ones); their exact position relative to a tertiary cation depends on the medium, so do not rank them against 3° unless the question's context decides it.
- Acidity: carboxylic acids > phenol > water > alcohols > alkynes; o-, p-nitrophenol > phenol > p-cresol.
- Basicity (aqueous): $(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3$; for methyl: $2^\circ > 1^\circ > 3^\circ > NH_3$; aniline much weaker (lone pair delocalised).
- Hyperconjugation structures = number of α-H atoms.
- Stability of alkenes: more substituted (more α-H) more stable; trans > cis.
- Ortho effect: most ortho-substituted benzoic acids — with electron-donating or electron-withdrawing groups — are stronger acids than benzoic acid (steric inhibition of resonance, and H-bonding in salicylic acid). Exception to remember: o-aminobenzoic acid is weaker.`,
    diagrams: r`Resonance structures of the phenoxide ion and benzyl cation showing charge delocalised over the ring.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Halogens: −I > +R, so they deactivate the ring but direct ortho/para.
- Vinyl and aryl carbocations are very unstable.`,
    exceptions: r`Gas-phase basicity of amines (3° > 2° > 1°) differs from aqueous order (solvation).`,
    assumptions: r`Aqueous solution for acidity/basicity orders.`,
    applications: r`Predicting products of substitution, addition and elimination; drug pKa design.`,
    patterns: r`- Order of acidity/basicity/stability.
- Identify +I/−I, +R/−R groups.
- Carbocation rearrangement products.`,
    misconceptions: r`- "Resonance structures exist separately." The real molecule is a hybrid.`,
    traps: r`- Ortho effect and solvation exceptions.`,
    summary: r`- Carbocations: benzyl/allyl > 3° > 2° > 1°.
- −I/−R groups increase acidity; +I/+R increase basicity of amines (except aryl).
- Hyperconjugation ∝ number of α-H.`,
  }),

  note("alkanes-alkenes-and-alkynes", {
    introduction: r`Aliphatic hydrocarbons are the starting points of organic synthesis. Their preparation, addition reactions and regiochemistry (Markovnikov vs anti-Markovnikov) are heavily tested.`,
    prerequisites: r`- Electronic effects
- Carbocation stability`,
    concept: r`Alkanes undergo radical substitution; alkenes and alkynes undergo addition across their π bonds. Where the electrophile adds is decided by forming the most stable intermediate.`,
    theory: r`Markovnikov: H adds to the carbon with more H (via the more stable carbocation). Peroxide effect (HBr only): radical mechanism gives anti-Markovnikov product. Terminal alkynes are weakly acidic (sp C–H).`,
    definitions: r`- **Conformations:** staggered (more stable) and eclipsed ethane; chair cyclohexane.
- **Ozonolysis:** cleaves C=C into carbonyls.
- **Kolbe electrolysis:** RCOONa → R–R.`,
    principles: r`1. Radical halogenation selectivity: Br₂ highly selective (3° H), Cl₂ less selective.
2. Addition of X₂ to alkenes is anti (bromonium ion).
3. Lindlar (cis) vs Na/liq NH₃ (trans) reduction of alkynes.`,
    derivations: r`**Ozonolysis structure determination.** Join the carbonyl carbons of the products with a double bond to recover the alkene (e.g. CH₃CHO + HCHO ⇒ CH₃CH=CH₂).`,
    formulas: r`- Preparation of alkanes: Wurtz (2RX + 2Na), decarboxylation (RCOONa + NaOH/CaO → RH), Kolbe, hydrogenation (H₂/Ni).
- Alkenes: dehydration of alcohols (conc. H₂SO₄, Saytzeff product), dehydrohalogenation (alc. KOH).
- Additions to alkenes: HX (Markovnikov), HBr/peroxide (anti-Mark.), H₂O/H⁺, X₂ (anti), BH₃ then H₂O₂/OH⁻ (anti-Markovnikov alcohol), cold dil. KMnO₄ (syn diol, Baeyer's test), O₃/Zn (carbonyls).
- Alkynes: H₂O/HgSO₄ → ketone (ethyne → ethanal); terminal alkyne + Na/NaNH₂ → acetylide; + ammoniacal AgNO₃ → white ppt.
- Cyclic polymerisation: 3HC≡CH → benzene (red-hot Fe tube).
- Combustion: $C_xH_y + \left(x + \dfrac y4\right)O_2 \to xCO_2 + \dfrac y2H_2O$.
- Acidity: HC≡CH > CH₂=CH₂ > CH₃CH₃.`,
    diagrams: r`Newman projections for ethane conformers; bromonium ion intermediate for anti addition.`,
    graphs: r`Energy of ethane vs rotation angle: minima (staggered) every 120°, barrier ≈ 12.5 kJ/mol.`,
    specialCases: r`- Peroxide effect is shown only by HBr.
- Neopentane gives only one monochloro product.`,
    exceptions: r`Carbocation rearrangements can give unexpected products in HX addition and dehydration.`,
    assumptions: r`Standard reaction conditions as in NCERT.`,
    applications: r`Fuels, polymers, synthesis of alcohols and carbonyls.`,
    patterns: r`- Major product of additions (Markovnikov/anti).
- Ozonolysis structure puzzles.
- Number of monohalogenation products.
- Distinguishing terminal alkynes.`,
    misconceptions: r`- "Peroxide reverses addition for all HX." Only HBr.`,
    traps: r`- Rearrangement in carbocation steps.`,
    summary: r`- Markovnikov via stable carbocation; HBr/peroxide anti-Markovnikov.
- Lindlar cis, Na/NH₃ trans; ozonolysis cleaves C=C.`,
  }),

  note("aromatic-hydrocarbons", {
    introduction: r`Benzene's special stability (aromaticity) makes it prefer substitution over addition. Electrophilic aromatic substitution and directing effects are core organic topics.`,
    prerequisites: r`- Resonance and electronic effects`,
    concept: r`Benzene's six π electrons are delocalised around the ring, giving extra stability. Reactions that keep the ring intact (substitution) are favoured over those that destroy it (addition).`,
    theory: r`Hückel rule: planar, cyclic, fully conjugated with $(4n + 2)$ π electrons ⇒ aromatic; $4n$ ⇒ antiaromatic.

EAS mechanism: electrophile attacks → arenium ion (σ complex) → loss of H⁺ restores aromaticity.`,
    definitions: r`- **Activating groups:** −OH, −NH₂, −OR, −R (ortho/para directing).
- **Deactivating groups:** −NO₂, −CN, −CHO, −COOH, −SO₃H (meta directing); halogens deactivating but o/p directing.`,
    principles: r`1. o/p directors donate electrons; meta directors withdraw.
2. Friedel–Crafts fails on strongly deactivated rings (nitrobenzene) and with −NH₂ (complexes AlCl₃).`,
    derivations: r`**Why −OH is o/p directing.** Resonance donation places negative charge at ortho and para positions, so the arenium ion from attack there is extra stabilised (a structure with positive charge on the O-bearing carbon, stabilised by O).`,
    formulas: r`- Nitration: conc. HNO₃ + conc. H₂SO₄ (NO₂⁺).
- Halogenation: X₂/FeX₃.
- Sulfonation: fuming H₂SO₄ (SO₃), reversible.
- Friedel–Crafts alkylation: RCl/AlCl₃ (rearrangement, polyalkylation possible); acylation: RCOCl/AlCl₃ (no rearrangement).
- Hückel: $4n + 2$ π electrons (benzene 6, cyclopentadienyl anion 6, tropylium cation 6).
- Side-chain oxidation: alkylbenzene + KMnO₄ → benzoic acid (needs benzylic H).
- Birch reduction (enrichment): Na/liq NH₃.
- Benzene + Cl₂/UV → BHC (addition, C₆H₆Cl₆).`,
    diagrams: r`Arenium ion resonance for ortho, meta and para attack.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Tert-butylbenzene is not oxidised by KMnO₄ (no benzylic H).
- Cyclooctatetraene (8 π) is non-planar, non-aromatic.`,
    exceptions: r`Halogens are o/p directing yet deactivating.`,
    assumptions: r`Standard EAS conditions.`,
    applications: r`Dyes, drugs, explosives (TNT), detergents.`,
    patterns: r`- Aromatic/antiaromatic/non-aromatic classification.
- Major product with directing groups (including two substituents).
- Reactivity order towards EAS.`,
    misconceptions: r`- "All cyclic conjugated compounds are aromatic." They must satisfy Hückel's rule and be planar.`,
    traps: r`- Polyalkylation and rearrangement in Friedel–Crafts alkylation.`,
    summary: r`- Hückel $4n+2$; EAS via arenium ion.
- Activators o/p; deactivators meta; halogens o/p but deactivating.`,
  }),

  note("haloalkanes-and-haloarenes", {
    introduction: r`Haloalkanes undergo nucleophilic substitution and elimination; haloarenes are much less reactive. SN1 vs SN2 is among the most tested mechanisms.`,
    prerequisites: r`- Carbocation stability
- Stereochemistry`,
    concept: r`In SN2 the nucleophile attacks from the back as the leaving group departs (one step, inversion). In SN1 the leaving group leaves first to form a carbocation, which the nucleophile attacks from either side (racemisation).`,
    theory: r`SN2 rate $= k[RX][Nu]$; favoured by 1° substrates, strong nucleophiles, polar aprotic solvents. SN1 rate $= k[RX]$; favoured by 3°, allylic/benzylic substrates and polar protic solvents.

Elimination (E2) with strong bulky base and heat gives the more substituted alkene (Saytzeff).`,
    definitions: r`- **Leaving group ability:** I⁻ > Br⁻ > Cl⁻ > F⁻.
- **Walden inversion:** inversion of configuration in SN2.`,
    principles: r`1. Haloarenes resist substitution (C–X partial double bond, sp² carbon), except with −NO₂ at o/p (SNAr).
2. Alcoholic KOH → elimination; aqueous KOH → substitution.`,
    derivations: r`**Reactivity order for SN2.** Steric hindrance at the back of the carbon: CH₃X > 1° > 2° > 3°. For SN1, carbocation stability reverses it: 3° > 2° > 1° > CH₃X.`,
    formulas: r`- SN1: 3° > 2° > 1°; SN2: CH₃ > 1° > 2° > 3°; leaving group RI > RBr > RCl > RF.
- Preparation: ROH + SOCl₂ (best, gaseous by-products), PCl₅, HX/ZnCl₂ (Lucas); alkenes + HX; Finkelstein (NaI/acetone), Swarts (AgF, SbF₃).
- Reactions: aq. KOH → ROH; alc. KOH → alkene; KCN → RCN; AgCN → RNC; KNO₂ → R–ONO; AgNO₂ → R–NO₂; Wurtz; Grignard RMgX (dry ether).
- Haloarenes: Dow's process (NaOH, 623 K, high P) → phenol; Wurtz–Fittig; o/p directing EAS.
- Lucas test (alcohols): 3° immediate turbidity, 2° ~5 min, 1° no reaction at room temperature.
- Polyhalogen: CHCl₃ (anaesthetic, stored in dark bottles — forms phosgene), CCl₄, DDT, freons.`,
    diagrams: r`SN2 transition state: nucleophile and leaving group 180° apart, carbon trigonal bipyramidal.`,
    graphs: r`Energy profiles: SN2 one hump; SN1 two humps with a carbocation intermediate.`,
    specialCases: r`- Allyl and benzyl halides are reactive in both SN1 and SN2.
- Neopentyl halides are very slow in SN2 (steric).`,
    exceptions: r`Vinyl and aryl halides do not undergo SN1/SN2 easily.`,
    assumptions: r`Typical solvent conditions.`,
    applications: r`Grignard synthesis, refrigerants, solvents, pesticides.`,
    patterns: r`- SN1/SN2 rate orders and stereochemistry.
- Product with KCN vs AgCN, KNO₂ vs AgNO₂.
- Substitution vs elimination conditions.
- Reactivity of haloarenes.`,
    misconceptions: r`- "Tertiary halides are always fastest." Only for SN1.`,
    traps: r`- Ambident nucleophiles (CN⁻, NO₂⁻).`,
    summary: r`- SN2: Me > 1° > 2° > 3°, inversion; SN1: 3° > 2° > 1°, racemisation.
- aq. KOH substitution; alc. KOH elimination; AgCN isocyanide.`,
  }),

  note("alcohols-phenols-and-ethers", {
    introduction: r`Alcohols, phenols and ethers contain C–O bonds. Their acidity, preparation and distinguishing tests are standard JEE material.`,
    prerequisites: r`- Electronic effects
- Substitution and elimination`,
    concept: r`The O–H in phenol is more acidic than in alcohols because the phenoxide ion is resonance-stabilised. Ethers lack O–H, so they are relatively unreactive except toward strong acids.`,
    theory: r`Acidity: phenol (pKa ≈ 10) > water > alcohols; electron-withdrawing groups increase phenol acidity. Alcohol dehydration: 3° > 2° > 1°. Williamson synthesis is SN2.`,
    definitions: r`- **Lucas reagent:** conc. HCl + anhydrous ZnCl₂.
- **Denatured alcohol:** ethanol made unfit for drinking.`,
    principles: r`1. Oxidation: 1° → aldehyde (PCC) → acid; 2° → ketone; 3° resist oxidation.
2. Phenol ring is strongly activated (o/p): bromine water gives 2,4,6-tribromophenol.`,
    derivations: r`**Cleavage of ethers with HI.** Protonation then SN2 attack by I⁻ at the less hindered carbon (for methyl alkyl ethers, CH₃I + ROH); with tertiary alkyl, SN1 gives tertiary iodide.`,
    formulas: r`- Preparation of alcohols: hydration of alkenes, hydroboration–oxidation, reduction of carbonyls (NaBH₄/LiAlH₄), Grignard + carbonyls (HCHO → 1°, RCHO → 2°, ketone → 3°).
- Phenol: from cumene (air, then H⁺ → phenol + acetone), Dow's process, diazonium salt + warm water.
- Reactions of phenol: Br₂ water → 2,4,6-tribromophenol (white ppt); dil. HNO₃ → o/p-nitrophenol; Kolbe (CO₂/NaOH) → salicylic acid; Reimer–Tiemann (CHCl₃/NaOH) → salicylaldehyde; Zn dust → benzene; FeCl₃ → violet colour.
- Acidity: p-nitrophenol > m-nitrophenol > phenol > p-cresol; 2,4,6-trinitrophenol (picric acid) strongly acidic.
- Williamson: RONa + R′X (1°) → ROR′.
- Ether + HI: with a 1° or 2° alkyl group (SN2 at the less hindered carbon), R–O–CH₃ → ROH + CH₃I; with a 3° alkyl group (SN1), (CH₃)₃C–O–CH₃ → (CH₃)₃C–I + CH₃OH; aryl methyl ethers give phenol + CH₃I (the aryl–O bond does not break).
- Tests: Lucas (1°/2°/3°), iodoform for CH₃CH(OH)– group, ceric ammonium nitrate (red) for alcohols.`,
    diagrams: r`Phenoxide resonance: negative charge delocalised onto ortho and para carbons.`,
    graphs: r`Boiling point: alcohols ≫ ethers of similar mass (H-bonding).`,
    specialCases: r`- o-Nitrophenol is steam volatile (intramolecular H-bond), p- is not.
- Ethanol gives the iodoform test; methanol does not.`,
    exceptions: r`Phenols do not undergo dehydration or easy SN reactions at the C–O bond.`,
    assumptions: r`Standard laboratory conditions.`,
    applications: r`Solvents, antiseptics (phenol, Dettol), anaesthetic ethers, fuels.`,
    patterns: r`- Acidity orders; distinguishing tests.
- Products of Grignard + carbonyl.
- Phenol EAS products; ether cleavage.`,
    misconceptions: r`- "Phenol reacts with NaHCO₃." It is too weak an acid (carboxylic acids do).`,
    traps: r`- Williamson with tertiary halide gives alkene.`,
    summary: r`- Phenol > water > alcohol (acidity); EWG increase phenol acidity.
- Grignard: HCHO 1°, RCHO 2°, R₂CO 3° alcohol.
- Lucas, iodoform, FeCl₃ tests.`,
  }),

  note("aldehydes-and-ketones", {
    introduction: r`The carbonyl group's polarity makes aldehydes and ketones targets for nucleophilic addition. Named reactions (aldol, Cannizzaro, Clemmensen, Wolff–Kishner) are guaranteed exam material.`,
    prerequisites: r`- Electronic effects
- Alcohols`,
    concept: r`The carbonyl carbon is electron-poor; nucleophiles attack it. Aldehydes react faster than ketones (less steric hindrance, fewer electron-donating alkyl groups).`,
    theory: r`Nucleophilic addition: HCN (cyanohydrin), NaHSO₃, ROH (acetal), NH₂–Z derivatives (oxime, hydrazone, semicarbazone). α-H atoms are acidic (enolate), enabling aldol condensation.`,
    definitions: r`- **Tollens' reagent:** ammoniacal AgNO₃ (silver mirror with aldehydes).
- **Fehling's solution:** Cu²⁺ tartrate complex (red Cu₂O with aliphatic aldehydes).
- **Iodoform test:** CH₃CO– or CH₃CH(OH)– groups give yellow CHI₃.`,
    principles: r`1. Reactivity: HCHO > CH₃CHO > ketones; electron-withdrawing groups increase reactivity.
2. Aldol needs α-H; Cannizzaro needs no α-H.`,
    derivations: r`**Aldol mechanism.** OH⁻ removes an α-H to give an enolate; it adds to another carbonyl; protonation gives the β-hydroxy carbonyl; heating eliminates water to an α,β-unsaturated carbonyl.`,
    formulas: r`- Preparation: oxidation of alcohols (PCC), ozonolysis, Rosenmund (RCOCl + H₂/Pd–BaSO₄), Stephen (RCN + SnCl₂/HCl), Étard (CrO₂Cl₂), Gattermann–Koch, Friedel–Crafts acylation, hydration of alkynes, nitriles + Grignard.
- Reduction: NaBH₄/LiAlH₄ → alcohols; Clemmensen (Zn–Hg/HCl) and Wolff–Kishner (NH₂NH₂/KOH) → CH₂.
- Aldol (α-H, dil. NaOH); Cannizzaro (no α-H, conc. NaOH) → alcohol + acid salt; crossed Cannizzaro with HCHO (HCHO oxidised).
- Tests: Tollens' (both aliphatic and aromatic aldehydes), Fehling's/Benedict's (aliphatic aldehydes only), iodoform (methyl ketones, ethanal), 2,4-DNP (orange ppt, all carbonyls).
- Reactivity: HCHO > CH₃CHO > CH₃COCH₃ > C₆H₅CHO (resonance) roughly; electron-withdrawing substituents increase it.`,
    diagrams: r`Mechanism arrows: nucleophile attacks carbonyl carbon, π electrons move to O, protonation follows.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Benzaldehyde gives Tollens' but not Fehling's test.
- Formaldehyde with ammonia gives urotropine.`,
    exceptions: r`Ketones generally do not reduce Tollens' or Fehling's reagents.`,
    assumptions: r`NCERT reaction conditions.`,
    applications: r`Formalin (preservative), acetone (solvent), flavours (vanillin, benzaldehyde).`,
    patterns: r`- Distinguishing tests.
- Products of aldol/crossed aldol/Cannizzaro.
- Conversion sequences with named reactions.
- Reactivity towards nucleophilic addition.`,
    misconceptions: r`- "All aldehydes give Fehling's test." Aromatic aldehydes do not.`,
    traps: r`- Number of aldol products in crossed aldol (up to 4).`,
    summary: r`- Nucleophilic addition; aldehydes > ketones.
- Aldol (α-H), Cannizzaro (no α-H); Clemmensen/Wolff–Kishner → CH₂.
- Tollens', Fehling's, iodoform, 2,4-DNP.`,
  }),

  note("carboxylic-acids", {
    introduction: r`Carboxylic acids and their derivatives (esters, amides, acid halides, anhydrides) are linked by nucleophilic acyl substitution. Acidity trends and reactions like HVZ and decarboxylation are frequently asked.`,
    prerequisites: r`- Aldehydes and ketones
- Electronic effects`,
    concept: r`The carboxylate ion is stabilised by resonance over two oxygens, making carboxylic acids much more acidic than alcohols. Derivatives react by addition–elimination at the acyl carbon; better leaving groups mean faster reaction.`,
    theory: r`Reactivity of derivatives: acid chloride > anhydride > ester > amide. Acid strength increases with electron-withdrawing groups and decreases with electron-donating ones.`,
    definitions: r`- **Esterification:** acid + alcohol ⇌ ester + water (conc. H₂SO₄).
- **Decarboxylation:** loss of CO₂ (soda lime).
- **HVZ reaction:** α-halogenation (X₂/red P).`,
    principles: r`1. Carboxylic acids react with NaHCO₃ (brisk effervescence); phenols do not.
2. LiAlH₄ reduces acids to 1° alcohols; NaBH₄ does not.`,
    derivations: r`**Acidity of substituted benzoic acids.** EWG (−NO₂) at para increases acidity; EDG (−OCH₃, −CH₃) at para decreases it; ortho substituents increase acidity (ortho effect).`,
    formulas: r`- Preparation: oxidation of 1° alcohols/aldehydes, alkylbenzenes (KMnO₄), hydrolysis of nitriles/esters, Grignard + CO₂.
- Reactions: + NaHCO₃ → CO₂; + PCl₅/SOCl₂ → RCOCl; + NH₃ → amide (heat); + ROH/H⁺ → ester; LiAlH₄ → RCH₂OH; soda lime → RH; HVZ → α-halo acid; Kolbe electrolysis.
- Acidity: Cl₃CCOOH > Cl₂CHCOOH > ClCH₂COOH > HCOOH > C₆H₅COOH > CH₃COOH.
- Derivative reactivity: RCOCl > (RCO)₂O > RCOOR′ > RCONH₂.
- Hofmann bromamide: RCONH₂ + Br₂/NaOH → RNH₂ (one C fewer).`,
    diagrams: r`Carboxylate resonance: two equivalent C–O bonds (equal lengths).`,
    graphs: r`Boiling points: acids > alcohols of similar mass (dimer H-bonding).`,
    specialCases: r`- HCOOH (formic acid) gives Tollens' and Fehling's tests (has an aldehyde-like H).`,
    exceptions: r`Formic acid is stronger than acetic acid; benzoic acid is stronger than acetic acid but weaker than formic.`,
    assumptions: r`Aqueous acidity at 298 K.`,
    applications: r`Vinegar, soaps (salts of fatty acids), aspirin, polyesters.`,
    patterns: r`- Acidity orders.
- Conversions among derivatives.
- Reagent identification (HVZ, decarboxylation, Hofmann).`,
    misconceptions: r`- "NaBH₄ reduces carboxylic acids." It does not.`,
    traps: r`- Carbon count after decarboxylation/Hofmann.`,
    summary: r`- Acidity ↑ with EWG; RCOOH + NaHCO₃ → CO₂.
- RCOCl > anhydride > ester > amide.
- HVZ α-halogenation; soda lime decarboxylation.`,
  }),

  note("amines-and-diazonium-salts", {
    introduction: r`Amines are organic bases; aromatic diazonium salts are versatile intermediates that convert an –NH₂ group into almost anything else on a benzene ring.`,
    prerequisites: r`- Electronic effects
- Nitro compounds`,
    concept: r`The nitrogen lone pair makes amines basic and nucleophilic. In aniline the lone pair is delocalised into the ring, making it a much weaker base than aliphatic amines.`,
    theory: r`Basicity (aqueous): 2° > 1° > 3° > NH₃ (ethyl: 2° > 3° > 1°) > aniline. Diazotisation: ArNH₂ + NaNO₂ + HCl at 0–5 °C → ArN₂⁺Cl⁻.`,
    definitions: r`- **Hinsberg reagent:** benzenesulfonyl chloride — distinguishes 1°, 2°, 3° amines.
- **Carbylamine test:** 1° amines + CHCl₃ + KOH → foul-smelling isocyanide.
- **Coupling reaction:** diazonium + phenol/aniline → azo dye.`,
    principles: r`1. −NH₂ is strongly activating in EAS; protect by acetylation to get monosubstitution.
2. Nitration of aniline gives substantial meta product (anilinium ion in acid).`,
    derivations: r`**Hinsberg logic.** 1° amine forms a sulfonamide with an acidic N–H (soluble in KOH); 2° forms one without N–H (insoluble); 3° does not react.`,
    formulas: r`- Preparation: reduction of nitro compounds (Sn/HCl or Fe/HCl), Gabriel (1° only), Hofmann bromamide, reduction of nitriles/amides (LiAlH₄), ammonolysis of halides (mixture).
- Basicity: $(\text{C}_2\text{H}_5)_2\text{NH} > (\text{C}_2\text{H}_5)_3\text{N} > \text{C}_2\text{H}_5\text{NH}_2 > \text{NH}_3 > \text{C}_6\text{H}_5\text{NH}_2$; p-toluidine > aniline > p-nitroaniline.
- Tests: carbylamine (1°), Hinsberg (1° soluble in alkali, 2° insoluble, 3° no reaction), HNO₂ (aliphatic 1° → N₂ gas).
- Diazonium reactions: CuCl/HCl → ArCl, CuBr → ArBr, CuCN → ArCN (Sandmeyer); KI → ArI; HBF₄/heat → ArF (Balz–Schiemann); H₂O → ArOH; H₃PO₂ → ArH; coupling with phenol (alkaline) → orange azo dye, with aniline (mildly acidic) → yellow dye.
- Aniline + Br₂ water → 2,4,6-tribromoaniline (white ppt).`,
    diagrams: r`Diazonium resonance and the azo coupling at the para position.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Aryl diazonium salts are stable only at 0–5 °C; aliphatic ones decompose instantly.
- Aniline does not undergo Friedel–Crafts (complexes AlCl₃).`,
    exceptions: r`Gabriel synthesis cannot make aromatic amines.`,
    assumptions: r`Aqueous basicity orders.`,
    applications: r`Dyes, drugs (sulfa drugs), polymers (nylon).`,
    patterns: r`- Basicity orders.
- Distinguishing 1°/2°/3° amines.
- Diazonium conversion sequences.
- EAS products of aniline (with and without protection).`,
    misconceptions: r`- "3° amines are always the strongest bases." In water, steric hindrance to solvation lowers them.`,
    traps: r`- Meta product in nitration of aniline.`,
    summary: r`- Basicity 2° > 1° > 3° > NH₃ ≫ aniline (aqueous, methyl series).
- Carbylamine 1°; Hinsberg.
- Sandmeyer, KI, H₃PO₂, coupling from ArN₂⁺.`,
  }),

  note("biomolecules", {
    introduction: r`Biomolecules — carbohydrates, proteins, vitamins and nucleic acids — are largely factual but appear every year. Structures, classifications and tests are what matter.`,
    prerequisites: r`- Functional groups (aldehyde, ketone, amine, acid)
- Stereochemistry (D/L)`,
    concept: r`Large biological molecules are built from small units: monosaccharides form polysaccharides, amino acids form proteins, nucleotides form nucleic acids. Their shapes depend on hydrogen bonding and other weak interactions.`,
    theory: r`Glucose: aldohexose, exists mainly as cyclic α/β pyranose (anomers). Fructose: ketohexose (furanose). Sucrose = glucose + fructose (non-reducing, glycosidic link through both anomeric carbons).

Proteins: amino acids joined by peptide bonds; structures primary → quaternary. Nucleic acids: sugar + base + phosphate; DNA (deoxyribose, A T G C, double helix), RNA (ribose, A U G C).`,
    definitions: r`- **Reducing sugar:** free anomeric –OH (gives Tollens'/Fehling's).
- **Anomers:** differ at C-1 (α, β). **Mutarotation:** interconversion in solution.
- **Zwitterion:** amino acid with $\text{NH}_3^+$ and $\text{COO}^-$; **isoelectric point.**
- **Denaturation:** loss of secondary/tertiary structure.`,
    principles: r`1. Base pairing: A=T (2 H-bonds), G≡C (3 H-bonds); RNA: A–U.
2. Essential amino acids must come from diet.`,
    derivations: r`**Evidence for glucose's open-chain structure.** Forms an oxime (C=O), reduces Tollens' (aldehyde), pentaacetate (5 OH), HI gives n-hexane (straight chain). Failure to react with NaHSO₃/Schiff's reagent indicates the cyclic form.`,
    formulas: r`- Glucose C₆H₁₂O₆ (aldohexose); fructose (ketohexose); sucrose (non-reducing, invert sugar on hydrolysis); maltose (α-1,4, reducing); lactose (β-1,4, reducing).
- Starch: amylose (α-1,4, linear) + amylopectin (α-1,4 and α-1,6, branched); cellulose: β-1,4; glycogen: highly branched.
- Peptide bond –CO–NH–; number of peptide bonds in a chain of $n$ residues $= n - 1$.
- Protein structure: primary (sequence), secondary (α-helix, β-sheet; H-bonds), tertiary (folding), quaternary (subunits).
- Vitamins: fat-soluble A, D, E, K; water-soluble B, C. Deficiencies: A night blindness, B₁ beriberi, C scurvy, D rickets, K poor clotting, B₁₂ pernicious anaemia.
- DNA: A, G, C, T + deoxyribose; RNA: A, G, C, U + ribose.`,
    diagrams: r`Haworth projections of α- and β-D-glucopyranose; DNA double helix with base pairs.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Sucrose hydrolysis changes rotation from dextro to laevo (invert sugar).
- Vitamin B₁₂ is stored in the liver despite being water-soluble.`,
    exceptions: r`Glycine is the only achiral standard amino acid.`,
    assumptions: r`D-series sugars and L-amino acids (natural forms).`,
    applications: r`Nutrition, medicine, genetic engineering.`,
    patterns: r`- Reducing vs non-reducing sugars.
- Glycosidic linkages of disaccharides/polysaccharides.
- Vitamin deficiency diseases.
- DNA vs RNA differences; protein structure levels.`,
    misconceptions: r`- "All sugars are reducing." Sucrose is not.`,
    traps: r`- α vs β linkage in starch vs cellulose.`,
    summary: r`- Glucose aldohexose; sucrose non-reducing; starch α, cellulose β.
- A=T, G≡C; vitamins A, D, E, K fat-soluble.`,
  }),

  note("practical-chemistry", {
    introduction: r`Principles related to practical chemistry cover functional group tests, salt analysis (cations and anions), titrations and preparations — direct, scoring questions.`,
    prerequisites: r`- Organic functional groups
- Ionic equilibrium and solubility product`,
    concept: r`Each ion or functional group gives a characteristic colour, gas or precipitate with specific reagents. Cations are separated into groups by precipitating them selectively, using solubility products.`,
    theory: r`Cation groups: I Pb²⁺, Ag⁺, Hg₂²⁺ (dil. HCl → chlorides); II Cu²⁺, Pb²⁺, Cd²⁺, As³⁺, Sb³⁺, Sn²⁺ (H₂S in acid); III Fe³⁺, Al³⁺, Cr³⁺ (NH₄OH + NH₄Cl); IV Zn²⁺, Mn²⁺, Co²⁺, Ni²⁺ (H₂S in ammoniacal medium); V Ba²⁺, Sr²⁺, Ca²⁺ ((NH₄)₂CO₃); VI Mg²⁺, NH₄⁺ (zero group: NH₄⁺ by NaOH/heat).`,
    definitions: r`- **Common ion effect** in group analysis (NH₄Cl suppresses OH⁻; HCl suppresses S²⁻).
- **Primary standard:** pure, stable substance for standardisation (oxalic acid, Mohr's salt).`,
    principles: r`1. Group II sulphides have very low $K_{sp}$, precipitating in acidic H₂S.
2. Indicator choice depends on the titration's pH jump.`,
    derivations: r`**Why NH₄Cl in group III.** It lowers [OH⁻] via the common ion NH₄⁺, so only hydroxides with very small $K_{sp}$ (Fe, Al, Cr) precipitate, not Zn, Mn, Mg.`,
    formulas: r`- Anion tests: CO₃²⁻ effervescence with dil. HCl (lime water milky); S²⁻ (lead acetate black); SO₃²⁻ (pungent SO₂, decolourises KMnO₄); NO₂⁻ (brown fumes with dil. acid); Cl⁻ (white AgCl, soluble in NH₃); Br⁻ (pale yellow AgBr, partly soluble); I⁻ (yellow AgI, insoluble); NO₃⁻ (brown ring with FeSO₄ + conc. H₂SO₄); SO₄²⁻ (white BaSO₄, insoluble in HCl).
- Cation confirmatory: Pb²⁺ yellow PbCrO₄ / PbI₂; Cu²⁺ deep blue [Cu(NH₃)₄]²⁺, chocolate Cu₂[Fe(CN)₆]; Fe³⁺ Prussian blue, blood red with SCN⁻; Al³⁺ blue lake; Zn²⁺ white ZnS; Ni²⁺ red with DMG; Ca²⁺ brick red flame, Ba²⁺ apple green, Sr²⁺ crimson; NH₄⁺ brown ppt with Nessler's reagent.
- Functional group tests: unsaturation (Br₂ water, Baeyer's); alcohol (CAN); phenol (FeCl₃ violet); aldehyde (Tollens', Fehling's); ketone (2,4-DNP, iodoform for methyl ketones); carboxylic acid (NaHCO₃); 1° amine (carbylamine, azo dye).
- Titrations: KMnO₄ self-indicator; oxalic acid vs NaOH (phenolphthalein); Mohr's salt vs KMnO₄.
- Preparations in syllabus: acetanilide, p-nitroacetanilide, aniline yellow, iodoform, Mohr's salt, potash alum.`,
    diagrams: r`Flow chart of cation group separation: add reagent, filter precipitate, pass filtrate to next group.`,
    graphs: r`Titration curves and indicator ranges (see ionic equilibrium).`,
    specialCases: r`- Pb²⁺ appears in both group I (partly) and group II.
- Brown ring is [Fe(H₂O)₅NO]²⁺.`,
    exceptions: r`Flame colours can be masked by sodium's intense yellow (use cobalt glass).`,
    assumptions: r`Standard qualitative analysis scheme.`,
    applications: r`Water testing, forensic analysis, quality control.`,
    patterns: r`- Identify ions from observations.
- Group reagents and reasons.
- Functional group identification.
- Indicator choice and titration calculations.`,
    misconceptions: r`- "All sulphides precipitate together." Acidity controls which group precipitates.`,
    traps: r`- AgCl soluble in NH₃, AgI not.`,
    summary: r`- Group reagents: HCl, H₂S/H⁺, NH₄OH/NH₄Cl, H₂S/NH₃, (NH₄)₂CO₃.
- Brown ring NO₃⁻; Prussian blue Fe³⁺; DMG Ni²⁺; flame colours.`,
  }),
];
