// Named reactions, inorganic exceptions and concept flashcards (seeded into the database so the
// content team can edit them), plus the organic conversion map used by the reaction-map tool.

export type ReactionSeed = { slug: string; name: string; chapter: string; reactant: string; reagents: string; product: string; equation: string; mechanism: string; notes: string };

export const NAMED_REACTIONS: ReactionSeed[] = [
  { slug: "aldol-condensation", name: "Aldol condensation", chapter: "oxygen-compounds", reactant: "Aldehyde or ketone with at least one α-hydrogen", reagents: "Dilute NaOH, then heat", product: "β-hydroxy carbonyl (aldol), dehydrating to an α,β-unsaturated carbonyl", equation: "2\\,\\text{CH}_3\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO} \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH=CHCHO}", mechanism: "Base removes an α-H to give an enolate; the enolate adds to the carbonyl carbon of a second molecule; protonation gives the aldol; heating eliminates water.", notes: "Needs α-H. Two different carbonyls both having α-H give a mixture (cross aldol)." },
  { slug: "cannizzaro-reaction", name: "Cannizzaro reaction", chapter: "oxygen-compounds", reactant: "Aldehyde with no α-hydrogen (HCHO, C₆H₅CHO)", reagents: "Concentrated NaOH or KOH", product: "Alcohol + carboxylate salt (disproportionation)", equation: "2\\,\\text{HCHO} \\xrightarrow{\\text{conc. NaOH}} \\text{CH}_3\\text{OH} + \\text{HCOONa}", mechanism: "OH⁻ adds to one aldehyde; the tetrahedral intermediate transfers a hydride to a second aldehyde.", notes: "In crossed Cannizzaro with HCHO, formaldehyde is always oxidised (to formate)." },
  { slug: "clemmensen-reduction", name: "Clemmensen reduction", chapter: "oxygen-compounds", reactant: "Aldehyde or ketone", reagents: "Zn–Hg, concentrated HCl", product: "Alkane (C=O → CH₂)", equation: "\\text{R}_2\\text{C=O} \\xrightarrow{\\text{Zn-Hg/HCl}} \\text{R}_2\\text{CH}_2", mechanism: "Surface reduction on amalgamated zinc in strongly acidic medium.", notes: "Unsuitable for acid-sensitive substrates — use Wolff–Kishner instead." },
  { slug: "wolff-kishner-reduction", name: "Wolff–Kishner reduction", chapter: "oxygen-compounds", reactant: "Aldehyde or ketone", reagents: "NH₂NH₂, then KOH in ethylene glycol, heat", product: "Alkane (C=O → CH₂)", equation: "\\text{R}_2\\text{C=O} \\xrightarrow{\\text{NH}_2\\text{NH}_2} \\text{R}_2\\text{C=NNH}_2 \\xrightarrow{\\text{KOH, glycol},\\ \\Delta} \\text{R}_2\\text{CH}_2 + \\text{N}_2", mechanism: "Hydrazone forms; base-promoted loss of N₂ gives a carbanion that is protonated.", notes: "Basic conditions — complements Clemmensen for acid-sensitive molecules." },
  { slug: "rosenmund-reduction", name: "Rosenmund reduction", chapter: "oxygen-compounds", reactant: "Acyl chloride", reagents: "H₂, Pd on BaSO₄ (poisoned)", product: "Aldehyde", equation: "\\text{RCOCl} \\xrightarrow{\\text{H}_2,\\ \\text{Pd/BaSO}_4} \\text{RCHO} + \\text{HCl}", mechanism: "Catalytic hydrogenolysis of the C–Cl bond.", notes: "The catalyst is poisoned so that the aldehyde is not reduced further to an alcohol." },
  { slug: "stephen-reaction", name: "Stephen reaction", chapter: "oxygen-compounds", reactant: "Nitrile", reagents: "SnCl₂ / HCl, then H₃O⁺", product: "Aldehyde", equation: "\\text{RCN} \\xrightarrow{\\text{SnCl}_2/\\text{HCl}} \\text{RCH=NH} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{RCHO}", mechanism: "Partial reduction to an imine, then hydrolysis.", notes: "DIBAL-H achieves the same conversion." },
  { slug: "etard-reaction", name: "Étard reaction", chapter: "oxygen-compounds", reactant: "Toluene (methylarene)", reagents: "CrO₂Cl₂ in CS₂, then H₃O⁺", product: "Benzaldehyde", equation: "\\text{C}_6\\text{H}_5\\text{CH}_3 \\xrightarrow{\\text{CrO}_2\\text{Cl}_2} \\text{chromium complex} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{C}_6\\text{H}_5\\text{CHO}", mechanism: "Chromyl chloride forms a brown complex with the methyl group that hydrolyses to the aldehyde.", notes: "Stops at the aldehyde stage." },
  { slug: "gattermann-koch", name: "Gattermann–Koch reaction", chapter: "oxygen-compounds", reactant: "Benzene", reagents: "CO, HCl, anhydrous AlCl₃ / CuCl", product: "Benzaldehyde", equation: "\\text{C}_6\\text{H}_6 + \\text{CO} + \\text{HCl} \\xrightarrow{\\text{AlCl}_3/\\text{CuCl}} \\text{C}_6\\text{H}_5\\text{CHO}", mechanism: "Electrophilic aromatic substitution by the formyl cation equivalent.", notes: "Formylation of arenes." },
  { slug: "reimer-tiemann", name: "Reimer–Tiemann reaction", chapter: "oxygen-compounds", reactant: "Phenol", reagents: "CHCl₃, aqueous NaOH, then H₃O⁺", product: "Salicylaldehyde (ortho-hydroxybenzaldehyde)", equation: "\\text{C}_6\\text{H}_5\\text{OH} \\xrightarrow{\\text{CHCl}_3/\\text{NaOH}} o\\text{-HOC}_6\\text{H}_4\\text{CHO}", mechanism: "Dichlorocarbene (:CCl₂) is the electrophile attacking the phenoxide ring, mainly ortho.", notes: "With CCl₄ instead of CHCl₃, salicylic acid forms." },
  { slug: "kolbe-schmitt", name: "Kolbe's reaction (Kolbe–Schmitt)", chapter: "oxygen-compounds", reactant: "Sodium phenoxide", reagents: "CO₂ (4–7 atm, ~400 K), then H⁺", product: "Salicylic acid", equation: "\\text{C}_6\\text{H}_5\\text{ONa} \\xrightarrow{\\text{CO}_2,\\ \\text{H}^+} o\\text{-HOC}_6\\text{H}_4\\text{COOH}", mechanism: "Phenoxide ring (strongly activated) attacks CO₂ as an electrophile.", notes: "Salicylic acid is the precursor of aspirin." },
  { slug: "hvz-reaction", name: "Hell–Volhard–Zelinsky reaction", chapter: "oxygen-compounds", reactant: "Carboxylic acid with α-hydrogen", reagents: "X₂ (Cl₂/Br₂), red P, then H₂O", product: "α-halo carboxylic acid", equation: "\\text{RCH}_2\\text{COOH} \\xrightarrow{\\text{Br}_2/\\text{red P}} \\text{RCHBrCOOH}", mechanism: "PX₃ converts the acid to the acyl halide, whose enol is halogenated at the α-carbon.", notes: "Requires an α-H." },
  { slug: "hofmann-bromamide", name: "Hofmann bromamide degradation", chapter: "nitrogen-compounds", reactant: "Primary amide", reagents: "Br₂ and aqueous NaOH (or KOH)", product: "Primary amine with one carbon fewer", equation: "\\text{RCONH}_2 + \\text{Br}_2 + 4\\text{NaOH} \\to \\text{RNH}_2 + \\text{Na}_2\\text{CO}_3 + 2\\text{NaBr} + 2\\text{H}_2\\text{O}", mechanism: "N-bromoamide → isocyanate via migration of R from C to N → hydrolysis and decarboxylation.", notes: "Chain shortening by one carbon; migrating group keeps its configuration." },
  { slug: "gabriel-phthalimide", name: "Gabriel phthalimide synthesis", chapter: "nitrogen-compounds", reactant: "Phthalimide + alkyl halide", reagents: "KOH (ethanolic), R–X, then NaOH(aq) hydrolysis", product: "Pure primary amine", equation: "\\text{Phthalimide} \\xrightarrow{\\text{KOH}} \\text{K-phthalimide} \\xrightarrow{\\text{RX}} \\text{N-alkylphthalimide} \\xrightarrow{\\text{NaOH(aq)}} \\text{RNH}_2", mechanism: "Phthalimide anion is a nucleophile (SN2) at the alkyl halide.", notes: "Aryl amines cannot be made this way (aryl halides do not undergo SN2)." },
  { slug: "sandmeyer-reaction", name: "Sandmeyer reaction", chapter: "nitrogen-compounds", reactant: "Arenediazonium salt", reagents: "CuCl/HCl, CuBr/HBr or CuCN/KCN", product: "Aryl chloride, bromide or nitrile", equation: "\\text{ArN}_2^+\\text{X}^- \\xrightarrow{\\text{CuCl/HCl}} \\text{ArCl} + \\text{N}_2", mechanism: "Copper(I)-mediated radical replacement of the diazo group.", notes: "Gattermann reaction uses Cu powder with HX instead." },
  { slug: "carbylamine-reaction", name: "Carbylamine reaction", chapter: "nitrogen-compounds", reactant: "Primary amine (aliphatic or aromatic)", reagents: "CHCl₃, alcoholic KOH, heat", product: "Isocyanide (foul smell)", equation: "\\text{RNH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\to \\text{RNC} + 3\\text{KCl} + 3\\text{H}_2\\text{O}", mechanism: "Dichlorocarbene reacts with the amine nitrogen.", notes: "Test for primary amines; secondary and tertiary amines do not respond." },
  { slug: "williamson-synthesis", name: "Williamson ether synthesis", chapter: "oxygen-compounds", reactant: "Alkyl halide + sodium alkoxide", reagents: "RONa, R′X", product: "Ether R–O–R′", equation: "\\text{RONa} + \\text{R'X} \\to \\text{ROR'} + \\text{NaX}", mechanism: "SN2 attack by alkoxide on the alkyl halide.", notes: "Use a primary alkyl halide; tertiary halides give elimination (alkene) instead." },
  { slug: "wurtz-reaction", name: "Wurtz reaction", chapter: "haloalkanes-haloarenes", reactant: "Alkyl halide", reagents: "Sodium metal in dry ether", product: "Higher alkane R–R", equation: "2\\text{RX} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{R-R} + 2\\text{NaX}", mechanism: "Radical/organosodium coupling.", notes: "Two different halides give a mixture — not useful for odd-carbon alkanes. Methane cannot be made." },
  { slug: "finkelstein-reaction", name: "Finkelstein reaction", chapter: "haloalkanes-haloarenes", reactant: "Alkyl chloride or bromide", reagents: "NaI in dry acetone", product: "Alkyl iodide", equation: "\\text{RCl} + \\text{NaI} \\xrightarrow{\\text{acetone}} \\text{RI} + \\text{NaCl}\\downarrow", mechanism: "SN2 halide exchange.", notes: "Driven forward because NaCl/NaBr precipitate in acetone (Le Chatelier). Swarts reaction uses metal fluorides to make alkyl fluorides." },
];

export type ExceptionSeed = { chapter: string; title: string; statement: string; reason: string };

export const INORGANIC_EXCEPTIONS: ExceptionSeed[] = [
  { chapter: "periodicity", title: "Electron gain enthalpy: Cl > F", statement: "Chlorine has a more negative electron gain enthalpy than fluorine.", reason: "Fluorine's small 2p subshell is crowded; the incoming electron suffers strong electron–electron repulsion." },
  { chapter: "periodicity", title: "Ionisation enthalpy: N > O", statement: "Nitrogen has a higher first ionisation enthalpy than oxygen.", reason: "N has a stable half-filled 2p³; in O, removing one paired 2p electron relieves repulsion." },
  { chapter: "periodicity", title: "Ionisation enthalpy: Be > B", statement: "Beryllium's first ionisation enthalpy exceeds boron's.", reason: "B loses a 2p electron, which is higher in energy and better shielded than Be's 2s electron." },
  { chapter: "periodicity", title: "Ionisation enthalpy: Mg > Al", statement: "Magnesium has a higher first ionisation enthalpy than aluminium.", reason: "Al's outermost electron is in 3p, shielded by 3s²." },
  { chapter: "periodicity", title: "Atomic radius: Ga ≤ Al", statement: "Gallium's atomic radius (135 pm) is slightly smaller than aluminium's (143 pm).", reason: "Poor shielding by the ten 3d electrons raises the effective nuclear charge on Ga's outer electrons." },
  { chapter: "p-block", title: "Bond enthalpy: F–F < Cl–Cl", statement: "The F–F bond is weaker than the Cl–Cl bond.", reason: "Large lone-pair–lone-pair repulsion between the small fluorine atoms." },
  { chapter: "p-block", title: "Boiling point: H₂O ≫ H₂S", statement: "Water boils far higher than H₂S despite its lower molar mass.", reason: "Extensive intermolecular hydrogen bonding in water." },
  { chapter: "p-block", title: "Thermal stability of hydrides: NH₃ > PH₃ > AsH₃", statement: "Group 15 hydrides become less stable down the group, while reducing character increases.", reason: "E–H bond enthalpy decreases as the central atom gets larger." },
  { chapter: "p-block", title: "Inert pair effect: Pb²⁺ more stable than Pb⁴⁺", statement: "Lower oxidation state (+2) becomes more stable down group 14; PbO₂ is a strong oxidant.", reason: "The ns² pair is reluctant to participate in bonding for heavy elements (poor shielding by d and f electrons)." },
  { chapter: "p-block", title: "Nitrogen does not form pentahalides", statement: "NCl₅ does not exist though PCl₅ does.", reason: "Nitrogen has no accessible d orbitals to expand its octet." },
  { chapter: "d-f-block", title: "Chromium configuration 3d⁵4s¹", statement: "Cr is [Ar]3d⁵4s¹, not 3d⁴4s².", reason: "Extra stability of the half-filled d subshell (exchange energy)." },
  { chapter: "d-f-block", title: "Copper configuration 3d¹⁰4s¹", statement: "Cu is [Ar]3d¹⁰4s¹, not 3d⁹4s².", reason: "Extra stability of the completely filled d subshell." },
  { chapter: "d-f-block", title: "Zn, Cd, Hg are not typical transition metals", statement: "They have completely filled d orbitals in the ground state and in their common oxidation states.", reason: "IUPAC definition requires an incomplete d subshell in the atom or a common ion." },
  { chapter: "d-f-block", title: "Mn shows a dip in many trends", statement: "Manganese has unusually low melting point and enthalpy of atomisation within the 3d series.", reason: "The stable half-filled 3d⁵ configuration holds electrons tightly, so fewer take part in metallic bonding." },
  { chapter: "d-f-block", title: "Lanthanoid contraction: Zr ≈ Hf", statement: "Zr and Hf have nearly identical radii and very similar chemistry.", reason: "Poor shielding by 4f electrons cancels the expected increase in size from Zr to Hf." },
  { chapter: "coordination-compounds", title: "[Ni(CN)₄]²⁻ is square planar, [NiCl₄]²⁻ is tetrahedral", statement: "Both are Ni²⁺ (d⁸) four-coordinate complexes but have different geometries and magnetism.", reason: "CN⁻ is strong-field and pairs electrons (dsp², diamagnetic); Cl⁻ is weak-field (sp³, paramagnetic)." },
];

export type ConceptSeed = { chapter: string; front: string; back: string };

export const CONCEPT_CARDS: ConceptSeed[] = [
  { chapter: "kinematics", front: "What is the speed of a projectile at the highest point?", back: "$u\\cos\\theta$ — only the vertical component is zero." },
  { chapter: "kinematics", front: "Which two angles give the same range for a given speed?", back: "Complementary angles $\\theta$ and $90^\\circ - \\theta$." },
  { chapter: "kinematics", front: "Relative acceleration of two projectiles in flight?", back: "Zero — both accelerate at $g$ downward, so their relative motion is uniform (straight line)." },
  { chapter: "oscillations-and-waves", front: "Phase difference between displacement and acceleration in SHM?", back: "$\\pi$ — acceleration is always opposite to displacement." },
  { chapter: "oscillations-and-waves", front: "Where is KE equal to PE in SHM?", back: "$x = A/\\sqrt2$." },
  { chapter: "oscillations-and-waves", front: "Does a vertical spring–mass system have a different period?", back: "No. $T = 2\\pi\\sqrt{m/k}$; gravity only shifts the equilibrium position." },
  { chapter: "electrostatics", front: "Electric field inside a conductor in electrostatic equilibrium?", back: "Zero; the potential is constant throughout." },
  { chapter: "electrostatics", front: "Can E be zero where V is non-zero?", back: "Yes — e.g. the centre of a uniformly charged ring." },
  { chapter: "atomic-structure", front: "Which spectral series of hydrogen lies in the visible region?", back: "Balmer series ($n_1 = 2$)." },
  { chapter: "atomic-structure", front: "Ratio of KE to total energy in a Bohr orbit?", back: "$-1$ ($KE = -E$)." },
  { chapter: "atomic-structure", front: "How does electron speed vary with n in the Bohr model?", back: "$v \\propto Z/n$ — it decreases in higher orbits." },
  { chapter: "chemical-kinetics", front: "Half-life of a first-order reaction depends on initial concentration?", back: "No. $t_{1/2} = 0.693/k$." },
  { chapter: "chemical-kinetics", front: "Unit of k for a second-order reaction?", back: "L mol⁻¹ s⁻¹ (generally $(\\text{mol L}^{-1})^{1-n}\\text{s}^{-1}$)." },
  { chapter: "chemical-kinetics", front: "Can molecularity be fractional?", back: "No — it is a positive whole number for an elementary step. Order can be fractional." },
  { chapter: "chemical-bonding", front: "Shape and bond angle of NH₃?", back: "Trigonal pyramidal, about 107° (one lone pair, sp³)." },
  { chapter: "chemical-bonding", front: "Bond order of O₂ and its magnetic nature?", back: "Bond order 2; paramagnetic (two unpaired electrons in π* orbitals)." },
  { chapter: "chemical-bonding", front: "Shape of XeF₄?", back: "Square planar (sp³d², two lone pairs)." },
  { chapter: "complex-quadratic", front: "Condition for both roots of $ax^2+bx+c=0$ to be equal?", back: "$D = b^2 - 4ac = 0$." },
  { chapter: "complex-quadratic", front: "Roots reciprocal of each other when?", back: "$c = a$ (product of roots = 1)." },
  { chapter: "complex-quadratic", front: "If $D < 0$ and $a > 0$, the sign of $ax^2+bx+c$?", back: "Positive for every real $x$." },
  { chapter: "integral-calculus", front: "$\\int_{-a}^{a} f(x)\\,dx$ for odd $f$?", back: "0." },
  { chapter: "integral-calculus", front: "$\\lim_{n\\to\\infty}\\frac1n\\sum_{r=1}^{n} f(r/n)$ equals?", back: "$\\int_0^1 f(x)\\,dx$." },
  { chapter: "integral-calculus", front: "$\\int_0^{\\pi/2}\\ln\\sin x\\,dx$?", back: "$-\\dfrac{\\pi}{2}\\ln 2$." },
  { chapter: "limits-continuity-differentiability", front: "$\\lim_{x\\to0}\\dfrac{\\sin x}{x}$?", back: "1 ($x$ in radians)." },
];

// Organic conversion map: nodes are functional-group classes, edges are reagents.
export const ORGANIC_NODES = [
  "Alkane", "Alkene", "Alkyne", "Alkyl halide", "Alcohol", "Aldehyde", "Ketone", "Carboxylic acid", "Ester",
  "Amide", "Nitrile", "Primary amine", "Ether", "Benzene", "Phenol", "Diazonium salt", "Aryl halide",
] as const;

export type OrganicEdge = { from: (typeof ORGANIC_NODES)[number]; to: (typeof ORGANIC_NODES)[number]; reagent: string; note?: string };

export const ORGANIC_EDGES: OrganicEdge[] = [
  { from: "Alkane", to: "Alkyl halide", reagent: "X₂, hν (free-radical halogenation)" },
  { from: "Alkene", to: "Alkane", reagent: "H₂, Ni/Pt/Pd" },
  { from: "Alkyne", to: "Alkene", reagent: "H₂, Lindlar catalyst (cis) or Na/liq. NH₃ (trans)" },
  { from: "Alkene", to: "Alkyl halide", reagent: "HX (Markovnikov); HBr + peroxide (anti-Markovnikov)" },
  { from: "Alkene", to: "Alcohol", reagent: "H₂O/H⁺, or B₂H₆ then H₂O₂/OH⁻ (anti-Markovnikov)" },
  { from: "Alkene", to: "Aldehyde", reagent: "O₃, then Zn/H₂O (ozonolysis)", note: "Gives ketones when the alkene carbon is disubstituted" },
  { from: "Alkyne", to: "Ketone", reagent: "H₂O, HgSO₄/H₂SO₄ (ethyne gives ethanal)" },
  { from: "Alkyl halide", to: "Alkene", reagent: "Alcoholic KOH (dehydrohalogenation)" },
  { from: "Alkyl halide", to: "Alcohol", reagent: "Aqueous KOH (substitution)", note: "Works well for 1° halides. With 3° halides (and with alcoholic KOH) elimination to the alkene competes or dominates." },
  { from: "Alkyl halide", to: "Nitrile", reagent: "KCN (alcoholic)", note: "AgCN gives the isocyanide (R–NC) instead — the covalent Ag–C bond leaves only N free to attack." },
  { from: "Alkyl halide", to: "Ether", reagent: "RONa (Williamson)" },
  { from: "Alkyl halide", to: "Alkane", reagent: "Na/dry ether (Wurtz) or Zn/HCl" },
  { from: "Alkyl halide", to: "Primary amine", reagent: "Potassium phthalimide then hydrolysis (Gabriel)" },
  { from: "Alcohol", to: "Alkene", reagent: "Conc. H₂SO₄, 443 K", note: "Temperature decides the product for ethanol: at 413 K (excess alcohol) diethyl ether forms instead. 3° alcohols dehydrate under much milder conditions; the more substituted alkene (Saytzeff) is the major product." },
  { from: "Alcohol", to: "Alkyl halide", reagent: "SOCl₂, PCl₅ or HX/ZnCl₂" },
  { from: "Alcohol", to: "Aldehyde", reagent: "PCC (primary alcohol)" },
  { from: "Alcohol", to: "Ketone", reagent: "CrO₃ or PCC (secondary alcohol)" },
  { from: "Alcohol", to: "Ester", reagent: "RCOOH, conc. H₂SO₄ (esterification)" },
  { from: "Aldehyde", to: "Carboxylic acid", reagent: "KMnO₄, K₂Cr₂O₇/H⁺ or Tollens' reagent" },
  { from: "Aldehyde", to: "Alcohol", reagent: "NaBH₄ or LiAlH₄" },
  { from: "Ketone", to: "Alcohol", reagent: "NaBH₄ or LiAlH₄ (gives secondary alcohol)" },
  { from: "Aldehyde", to: "Alkane", reagent: "Zn-Hg/HCl (Clemmensen) or NH₂NH₂/KOH (Wolff–Kishner)" },
  { from: "Ketone", to: "Alkane", reagent: "Zn-Hg/HCl (Clemmensen) or NH₂NH₂/KOH (Wolff–Kishner)" },
  { from: "Carboxylic acid", to: "Alcohol", reagent: "LiAlH₄, then H₃O⁺" },
  { from: "Carboxylic acid", to: "Ester", reagent: "R′OH, H⁺" },
  { from: "Carboxylic acid", to: "Amide", reagent: "SOCl₂ then NH₃ (via acyl chloride)" },
  { from: "Carboxylic acid", to: "Aldehyde", reagent: "SOCl₂ then H₂/Pd-BaSO₄ (Rosenmund)" },
  { from: "Ester", to: "Carboxylic acid", reagent: "Hydrolysis: H₃O⁺ or NaOH then H⁺" },
  { from: "Ester", to: "Alcohol", reagent: "LiAlH₄" },
  { from: "Amide", to: "Primary amine", reagent: "Br₂/NaOH (Hofmann, one carbon fewer) or LiAlH₄ (same carbons)" },
  { from: "Amide", to: "Nitrile", reagent: "P₂O₅ (dehydration)" },
  { from: "Nitrile", to: "Primary amine", reagent: "LiAlH₄ or H₂/Ni" },
  { from: "Nitrile", to: "Carboxylic acid", reagent: "H₃O⁺, heat" },
  { from: "Nitrile", to: "Aldehyde", reagent: "SnCl₂/HCl then H₃O⁺ (Stephen) or DIBAL-H" },
  { from: "Benzene", to: "Aryl halide", reagent: "X₂, FeX₃" },
  { from: "Benzene", to: "Ketone", reagent: "RCOCl, anhydrous AlCl₃ (Friedel–Crafts acylation)" },
  { from: "Benzene", to: "Aldehyde", reagent: "CO + HCl, AlCl₃/CuCl (Gattermann–Koch)" },
  { from: "Primary amine", to: "Diazonium salt", reagent: "NaNO₂ + HCl, 273–278 K (aromatic amines)" },
  { from: "Diazonium salt", to: "Phenol", reagent: "H₂O, warm" },
  { from: "Diazonium salt", to: "Aryl halide", reagent: "CuCl/HCl or CuBr/HBr (Sandmeyer); KI for ArI" },
  { from: "Diazonium salt", to: "Nitrile", reagent: "CuCN/KCN (Sandmeyer)" },
  { from: "Diazonium salt", to: "Benzene", reagent: "H₃PO₂ or ethanol (reduction)" },
  { from: "Phenol", to: "Benzene", reagent: "Zn dust, heat" },
  { from: "Phenol", to: "Aldehyde", reagent: "CHCl₃/NaOH (Reimer–Tiemann, gives salicylaldehyde)" },
  { from: "Phenol", to: "Carboxylic acid", reagent: "NaOH, CO₂, then H⁺ (Kolbe, gives salicylic acid)" },
];
