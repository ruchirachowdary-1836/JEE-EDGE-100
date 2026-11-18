// Chapter list follows the NTA JEE Main syllabus (latest official PDF: 2026, released 31 Oct 2025).
// Topics deleted from the syllabus in 2024 (e.g. communication systems, states of matter, surface chemistry,
// s-block, hydrogen, metallurgy, polymers, environmental chemistry, mathematical reasoning/induction)
// are intentionally not taught as examinable content.
//
// planWeight (1–5) is a planning priority chosen by the content team to allocate study time.
// It is NOT a claim about how many questions NTA will set.

export type TopicSeed = { name: string; slug?: string; subtopics: string[] };
export type ChapterSeed = {
  slug: string;
  name: string;
  unit?: string;
  planWeight: number;
  summary: string;
  topics: TopicSeed[];
};
export type SubjectSeed = { slug: string; name: string; chapters: ChapterSeed[] };

const t = (name: string, subtopics: string[], slug?: string): TopicSeed => ({ name, subtopics, slug });

export const SYLLABUS: SubjectSeed[] = [
  {
    slug: "physics",
    name: "Physics",
    chapters: [
      { slug: "units-and-measurements", name: "Units and Measurements", planWeight: 2, summary: "SI units, dimensional analysis, significant figures and error propagation.", topics: [
        t("SI Units and Dimensions", ["Fundamental and derived units", "Dimensional formulae", "Dimensional analysis and its limits"]),
        t("Errors and Significant Figures", ["Least count", "Absolute, relative and percentage error", "Propagation of errors", "Significant figures and rounding"]),
      ]},
      { slug: "kinematics", name: "Kinematics", planWeight: 4, summary: "Motion in one and two dimensions, graphs, projectiles, relative and circular motion.", topics: [
        t("Motion in a Straight Line", ["Position, displacement, distance", "Average and instantaneous velocity", "Uniformly accelerated motion", "Motion graphs"]),
        t("Vectors in Kinematics", ["Scalars and vectors", "Resolution of vectors", "Relative velocity"]),
        t("Projectile Motion", ["Independence of horizontal and vertical motion", "Time of flight, range, maximum height", "Equation of trajectory", "Projection from a height"], "projectile-motion"),
        t("Uniform Circular Motion", ["Angular variables", "Centripetal acceleration"]),
      ]},
      { slug: "laws-of-motion", name: "Laws of Motion", planWeight: 4, summary: "Newton's laws, free-body diagrams, friction, momentum conservation and circular dynamics.", topics: [
        t("Newton's Laws and Free-Body Diagrams", ["Inertia and the first law", "F = dp/dt", "Action–reaction pairs", "Connected bodies and pulleys"]),
        t("Friction", ["Static and kinetic friction", "Angle of repose", "Blocks on inclines"]),
        t("Dynamics of Circular Motion", ["Banking of roads", "Vehicle on a level curve", "Vertical circle"]),
        t("Conservation of Linear Momentum", ["Impulse", "Recoil", "Variable mass awareness"]),
      ]},
      { slug: "work-energy-power", name: "Work, Energy and Power", planWeight: 4, summary: "Work by constant and variable forces, the work–energy theorem, potential energy and collisions.", topics: [
        t("Work and the Work–Energy Theorem", ["Work by constant and variable force", "Kinetic energy", "Work–energy theorem"]),
        t("Potential Energy and Conservative Forces", ["Spring potential energy", "Conservative vs non-conservative forces", "Energy diagrams"]),
        t("Power and Collisions", ["Power", "Elastic and inelastic collisions in 1D and 2D", "Coefficient of restitution"]),
      ]},
      { slug: "rotational-motion", name: "Rotational Motion", planWeight: 4, summary: "Centre of mass, torque, moment of inertia, angular momentum and rolling.", topics: [
        t("Centre of Mass", ["Discrete and continuous bodies", "Motion of the centre of mass"]),
        t("Torque and Moment of Inertia", ["Torque", "Moment of inertia of standard bodies", "Parallel and perpendicular axis theorems"]),
        t("Angular Momentum and Rolling", ["Conservation of angular momentum", "Rolling without slipping", "Rotational kinetic energy"]),
      ]},
      { slug: "gravitation", name: "Gravitation", planWeight: 3, summary: "Newton's law of gravitation, field and potential, satellites and Kepler's laws.", topics: [
        t("Gravitational Field and Potential", ["Universal law of gravitation", "Variation of g with height and depth", "Gravitational potential energy"]),
        t("Satellites and Kepler's Laws", ["Orbital and escape velocity", "Geostationary satellites", "Kepler's laws"]),
      ]},
      { slug: "properties-of-solids-and-liquids", name: "Properties of Solids and Liquids", planWeight: 3, summary: "Elasticity, fluid statics and dynamics, viscosity, surface tension and heat transfer.", topics: [
        t("Elasticity", ["Stress, strain, Hooke's law", "Young's, bulk and shear moduli"]),
        t("Fluid Mechanics", ["Pascal's law", "Bernoulli's principle", "Viscosity and Stokes' law", "Terminal velocity"]),
        t("Surface Tension", ["Surface energy", "Excess pressure", "Capillary rise"]),
        t("Thermal Properties", ["Thermal expansion", "Calorimetry and latent heat", "Conduction, convection, radiation", "Newton's law of cooling"]),
      ]},
      { slug: "thermodynamics", name: "Thermodynamics", planWeight: 3, summary: "Zeroth, first and second laws, thermodynamic processes and heat engines.", topics: [
        t("First Law of Thermodynamics", ["Internal energy, heat and work", "Isothermal and adiabatic processes", "Work from P–V diagrams"]),
        t("Second Law and Heat Engines", ["Reversible and irreversible processes", "Carnot engine and efficiency"]),
      ]},
      { slug: "kinetic-theory-of-gases", name: "Kinetic Theory of Gases", planWeight: 2, summary: "Ideal gas assumptions, pressure from molecular motion, equipartition and mean free path.", topics: [
        t("Kinetic Theory", ["Assumptions of kinetic theory", "Pressure of an ideal gas", "RMS speed and temperature"]),
        t("Degrees of Freedom", ["Law of equipartition", "Specific heats of gases", "Mean free path"]),
      ]},
      { slug: "oscillations-and-waves", name: "Oscillations and Waves", planWeight: 4, summary: "Simple harmonic motion, pendulums, springs, wave motion, superposition and resonance.", topics: [
        t("Simple Harmonic Motion", ["Periodic motion", "Displacement, velocity, acceleration in SHM", "Energy in SHM", "Spring–mass system and simple pendulum"], "simple-harmonic-motion"),
        t("Wave Motion", ["Transverse and longitudinal waves", "Speed of a wave", "Displacement relation for a progressive wave"]),
        t("Superposition and Standing Waves", ["Principle of superposition", "Standing waves in strings and pipes", "Beats"]),
      ]},
      { slug: "electrostatics", name: "Electrostatics", planWeight: 5, summary: "Coulomb's law, electric field and potential, Gauss's law and capacitors.", topics: [
        t("Electric Field", ["Coulomb's law", "Field due to point charges", "Electric dipole", "Field lines"]),
        t("Gauss's Law", ["Electric flux", "Applications to wire, sheet and shell"]),
        t("Electric Potential", ["Potential and potential energy", "Equipotential surfaces", "Relation between E and V"]),
        t("Capacitors", ["Capacitance", "Series and parallel combination", "Dielectrics", "Energy stored"]),
      ]},
      { slug: "current-electricity", name: "Current Electricity", planWeight: 4, summary: "Ohm's law, resistivity, Kirchhoff's laws, Wheatstone bridge and meter bridge.", topics: [
        t("Ohm's Law and Resistance", ["Drift velocity", "Resistivity and temperature", "Series and parallel resistors"]),
        t("Kirchhoff's Laws and Circuits", ["Junction and loop rules", "Cells, EMF, internal resistance", "Wheatstone bridge, meter bridge, potentiometer"]),
      ]},
      { slug: "magnetic-effects-and-magnetism", name: "Magnetic Effects of Current and Magnetism", planWeight: 4, summary: "Biot–Savart and Ampère's laws, force on charges and currents, galvanometers and magnetic materials.", topics: [
        t("Biot–Savart and Ampère's Laws", ["Field of a straight wire and loop", "Solenoid and toroid"]),
        t("Force on Moving Charges and Currents", ["Lorentz force", "Motion in a magnetic field", "Force between parallel currents", "Torque on a current loop", "Moving coil galvanometer"]),
        t("Magnetism and Matter", ["Bar magnet as a dipole", "Para-, dia- and ferromagnetism"]),
      ]},
      { slug: "emi-and-ac", name: "Electromagnetic Induction and Alternating Currents", planWeight: 4, summary: "Faraday's and Lenz's laws, self and mutual induction, AC circuits and resonance.", topics: [
        t("Electromagnetic Induction", ["Faraday's law", "Lenz's law", "Motional EMF", "Eddy currents", "Self and mutual inductance"]),
        t("Alternating Current", ["Peak and RMS values", "Reactance and impedance", "LCR series circuit and resonance", "Power factor", "Transformer"]),
      ]},
      { slug: "electromagnetic-waves", name: "Electromagnetic Waves", planWeight: 2, summary: "Displacement current, nature of EM waves and the electromagnetic spectrum.", topics: [
        t("Electromagnetic Waves", ["Displacement current", "Characteristics of EM waves", "Electromagnetic spectrum and uses"]),
      ]},
      { slug: "optics", name: "Optics", planWeight: 5, summary: "Reflection, refraction, lenses and optical instruments; interference, diffraction and polarisation.", topics: [
        t("Ray Optics", ["Mirror and lens formulae", "Refraction and total internal reflection", "Prism", "Optical instruments"]),
        t("Wave Optics", ["Huygens' principle", "Young's double-slit experiment", "Single-slit diffraction", "Polarisation and Brewster's law"]),
      ]},
      { slug: "dual-nature", name: "Dual Nature of Matter and Radiation", planWeight: 3, summary: "Photoelectric effect, Einstein's equation and de Broglie waves.", topics: [
        t("Photoelectric Effect", ["Work function", "Einstein's photoelectric equation", "Stopping potential"]),
        t("Matter Waves", ["de Broglie wavelength", "Davisson–Germer experiment"]),
      ]},
      { slug: "atoms-and-nuclei", name: "Atoms and Nuclei", planWeight: 3, summary: "Bohr model, hydrogen spectrum, nuclear structure, binding energy and radioactivity.", topics: [
        t("Atomic Models and Spectra", ["Rutherford scattering", "Bohr model of hydrogen", "Spectral series"]),
        t("Nuclei", ["Mass defect and binding energy", "Radioactive decay law", "Fission and fusion"]),
      ]},
      { slug: "electronic-devices", name: "Electronic Devices", planWeight: 3, summary: "Semiconductors, p–n junction diodes, rectifiers and logic gates.", topics: [
        t("Semiconductors and Diodes", ["Intrinsic and extrinsic semiconductors", "p–n junction", "Rectifiers", "Zener diode as regulator"]),
        t("Logic Gates", ["OR, AND, NOT, NAND, NOR", "Truth tables"]),
      ]},
      { slug: "experimental-skills", name: "Experimental Skills", planWeight: 2, summary: "Standard laboratory experiments listed in the syllabus: vernier, screw gauge, pendulum, meter bridge and more.", topics: [
        t("Measuring Instruments", ["Vernier callipers", "Screw gauge", "Least count and zero error"]),
        t("Standard Experiments", ["Simple pendulum", "Meter bridge", "Ohm's law verification", "Focal length of mirrors and lenses", "Characteristic curves of diodes"]),
      ]},
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    chapters: [
      { slug: "basic-concepts", name: "Some Basic Concepts in Chemistry", unit: "Physical Chemistry", planWeight: 3, summary: "Mole concept, stoichiometry, concentration terms and limiting reagent.", topics: [
        t("Mole Concept", ["Atomic and molecular mass", "Mole and Avogadro number", "Empirical and molecular formula"]),
        t("Stoichiometry", ["Balancing equations", "Limiting reagent", "Concentration terms"]),
      ]},
      { slug: "atomic-structure", name: "Atomic Structure", unit: "Physical Chemistry", planWeight: 4, summary: "Bohr model, hydrogen spectrum, quantum numbers, orbitals and electronic configuration.", topics: [
        t("Bohr Model and Hydrogen Spectrum", ["Postulates of the Bohr model", "Radius, velocity and energy of the nth orbit", "Rydberg formula and spectral series", "Limitations of the Bohr model"], "bohr-model-hydrogen-spectrum"),
        t("Quantum Mechanical Model", ["Dual behaviour and uncertainty principle", "Quantum numbers", "Shapes of s, p, d orbitals", "Nodes"]),
        t("Electronic Configuration", ["Aufbau principle", "Pauli exclusion principle", "Hund's rule", "Stability of half-filled and filled subshells"]),
      ]},
      { slug: "chemical-bonding", name: "Chemical Bonding and Molecular Structure", unit: "Physical Chemistry", planWeight: 5, summary: "Ionic and covalent bonding, VSEPR, hybridisation, MO theory and hydrogen bonding.", topics: [
        t("VSEPR and Molecular Geometry", ["Electron pair repulsion", "Shapes with lone pairs", "Bond angles"]),
        t("Hybridisation", ["sp, sp², sp³, sp³d, sp³d²", "Predicting hybridisation"]),
        t("Molecular Orbital Theory", ["LCAO", "MO diagrams for homonuclear diatomics", "Bond order and magnetism"]),
        t("Ionic Bonding and Polarity", ["Lattice enthalpy", "Fajans' rules", "Dipole moment", "Hydrogen bonding"]),
      ]},
      { slug: "chemical-thermodynamics", name: "Chemical Thermodynamics", unit: "Physical Chemistry", planWeight: 4, summary: "First law, enthalpy, Hess's law, entropy and Gibbs energy.", topics: [
        t("First Law and Enthalpy", ["System and surroundings", "Internal energy and enthalpy", "Hess's law", "Enthalpies of formation, combustion, bond dissociation"]),
        t("Entropy and Gibbs Energy", ["Second law", "Spontaneity criteria", "ΔG and equilibrium constant"]),
      ]},
      { slug: "solutions", name: "Solutions", unit: "Physical Chemistry", planWeight: 3, summary: "Concentration, Raoult's law, colligative properties and the van 't Hoff factor.", topics: [
        t("Raoult's Law", ["Vapour pressure of solutions", "Ideal and non-ideal solutions", "Azeotropes"]),
        t("Colligative Properties", ["Relative lowering of vapour pressure", "Elevation in boiling point", "Depression in freezing point", "Osmotic pressure", "van 't Hoff factor"]),
      ]},
      { slug: "equilibrium", name: "Equilibrium", unit: "Physical Chemistry", planWeight: 4, summary: "Chemical and ionic equilibrium, Le Chatelier's principle, pH, buffers and solubility product.", topics: [
        t("Chemical Equilibrium", ["Law of mass action", "Kp and Kc", "Le Chatelier's principle"]),
        t("Ionic Equilibrium", ["Acids and bases", "pH and ionic product of water", "Buffer solutions", "Hydrolysis of salts", "Solubility product"]),
      ]},
      { slug: "redox-electrochemistry", name: "Redox Reactions and Electrochemistry", unit: "Physical Chemistry", planWeight: 4, summary: "Oxidation numbers, balancing redox reactions, electrochemical cells, Nernst equation and conductance.", topics: [
        t("Redox Reactions", ["Oxidation number", "Balancing by ion–electron method"]),
        t("Electrochemical Cells", ["Galvanic cells", "Standard electrode potential", "Nernst equation", "ΔG and EMF"]),
        t("Conductance and Electrolysis", ["Conductivity and molar conductivity", "Kohlrausch's law", "Faraday's laws"]),
      ]},
      { slug: "chemical-kinetics", name: "Chemical Kinetics", unit: "Physical Chemistry", planWeight: 4, summary: "Rate laws, order and molecularity, integrated rate equations, half-life and the Arrhenius equation.", topics: [
        t("Rate Law and Order", ["Rate of reaction", "Rate law and rate constant", "Order vs molecularity", "Integrated rate laws for zero and first order", "Half-life"], "rate-law-order"),
        t("Temperature Dependence of Rate", ["Arrhenius equation", "Activation energy", "Collision theory"]),
      ]},
      { slug: "periodicity", name: "Classification of Elements and Periodicity", unit: "Inorganic Chemistry", planWeight: 3, summary: "Modern periodic law and trends in radius, ionisation enthalpy, electron gain enthalpy and electronegativity.", topics: [
        t("Periodic Trends", ["Atomic and ionic radii", "Ionisation enthalpy", "Electron gain enthalpy", "Electronegativity", "Valency and oxidation states"]),
      ]},
      { slug: "p-block", name: "p-Block Elements", unit: "Inorganic Chemistry", planWeight: 4, summary: "Groups 13 to 18: trends, anomalous behaviour and important compounds.", topics: [
        t("Groups 13 and 14", ["General trends", "Anomalous behaviour of B and C", "Inert pair effect"]),
        t("Groups 15 to 18", ["Trends in oxidation states", "Oxoacids", "Interhalogen and noble-gas compounds"]),
      ]},
      { slug: "d-f-block", name: "d- and f-Block Elements", unit: "Inorganic Chemistry", planWeight: 3, summary: "Transition metal properties, KMnO₄ and K₂Cr₂O₇, lanthanoids and actinoids.", topics: [
        t("Transition Elements", ["Electronic configuration", "Oxidation states", "Magnetic properties and colour", "KMnO₄ and K₂Cr₂O₇"]),
        t("Lanthanoids and Actinoids", ["Lanthanoid contraction", "Comparison with actinoids"]),
      ]},
      { slug: "coordination-compounds", name: "Coordination Compounds", unit: "Inorganic Chemistry", planWeight: 4, summary: "Werner's theory, nomenclature, isomerism, VBT and crystal field theory.", topics: [
        t("Nomenclature and Isomerism", ["Ligands and coordination number", "IUPAC nomenclature", "Structural and stereoisomerism"]),
        t("Bonding in Coordination Compounds", ["Valence bond theory", "Crystal field splitting", "Magnetic moment and colour"]),
      ]},
      { slug: "purification-characterisation", name: "Purification and Characterisation of Organic Compounds", unit: "Organic Chemistry", planWeight: 2, summary: "Purification methods, qualitative and quantitative analysis of organic compounds.", topics: [
        t("Purification and Analysis", ["Crystallisation, distillation, chromatography", "Detection of N, S, halogens", "Quantitative estimation"]),
      ]},
      { slug: "basic-principles-organic", name: "Some Basic Principles of Organic Chemistry", unit: "Organic Chemistry", planWeight: 5, summary: "Nomenclature, isomerism, electronic effects, reactive intermediates and reaction types.", topics: [
        t("Nomenclature and Isomerism", ["IUPAC nomenclature", "Structural isomerism", "Stereoisomerism"]),
        t("Electronic Effects and Intermediates", ["Inductive, resonance, hyperconjugation", "Carbocations, carbanions, free radicals", "Electrophiles and nucleophiles"]),
      ]},
      { slug: "hydrocarbons", name: "Hydrocarbons", unit: "Organic Chemistry", planWeight: 4, summary: "Alkanes, alkenes, alkynes and aromatic hydrocarbons: preparation and reactions.", topics: [
        t("Alkanes, Alkenes and Alkynes", ["Conformations", "Markovnikov and anti-Markovnikov addition", "Ozonolysis", "Acidity of terminal alkynes"]),
        t("Aromatic Hydrocarbons", ["Aromaticity", "Electrophilic substitution", "Directive influence"]),
      ]},
      { slug: "haloalkanes-haloarenes", name: "Organic Compounds Containing Halogens", unit: "Organic Chemistry", planWeight: 3, summary: "Preparation and reactions of haloalkanes and haloarenes, SN1 and SN2 mechanisms.", topics: [
        t("Haloalkanes and Haloarenes", ["SN1 and SN2 mechanisms", "Elimination reactions", "Reactions of haloarenes"]),
      ]},
      { slug: "oxygen-compounds", name: "Organic Compounds Containing Oxygen", unit: "Organic Chemistry", planWeight: 5, summary: "Alcohols, phenols, ethers, aldehydes, ketones and carboxylic acids.", topics: [
        t("Alcohols, Phenols and Ethers", ["Preparation", "Acidity of alcohols and phenols", "Reactions"]),
        t("Aldehydes and Ketones", ["Nucleophilic addition", "Aldol and Cannizzaro reactions", "Distinguishing tests"]),
        t("Carboxylic Acids", ["Acidity", "Reactions of carboxylic acids and derivatives"]),
      ]},
      { slug: "nitrogen-compounds", name: "Organic Compounds Containing Nitrogen", unit: "Organic Chemistry", planWeight: 3, summary: "Amines, basicity, diazonium salts and their reactions.", topics: [
        t("Amines and Diazonium Salts", ["Classification and basicity", "Preparation of amines", "Diazonium salts and coupling"]),
      ]},
      { slug: "biomolecules", name: "Biomolecules", unit: "Organic Chemistry", planWeight: 3, summary: "Carbohydrates, proteins, vitamins and nucleic acids.", topics: [
        t("Biomolecules", ["Carbohydrates", "Amino acids and proteins", "Vitamins", "Nucleic acids"]),
      ]},
      { slug: "practical-chemistry", name: "Principles Related to Practical Chemistry", unit: "Organic Chemistry", planWeight: 2, summary: "Functional group tests, salt analysis, titrations and preparation of compounds listed in the syllabus.", topics: [
        t("Practical Chemistry", ["Detection of functional groups", "Qualitative salt analysis", "Titrimetric exercises", "Enthalpy measurements"]),
      ]},
    ],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    chapters: [
      { slug: "sets-relations-functions", name: "Sets, Relations and Functions", planWeight: 3, summary: "Sets, types of relations, functions, composition and inverse.", topics: [
        t("Sets and Relations", ["Operations on sets", "Reflexive, symmetric, transitive relations", "Equivalence relations"]),
        t("Functions", ["Domain and range", "One-one and onto", "Composition and inverse", "Graph transformations"]),
      ]},
      { slug: "complex-quadratic", name: "Complex Numbers and Quadratic Equations", planWeight: 4, summary: "Algebra and geometry of complex numbers; nature and relations of roots of quadratics.", topics: [
        t("Complex Numbers", ["Algebra of complex numbers", "Modulus and argument", "Argand plane", "Cube roots of unity"]),
        t("Quadratic Equations", ["Nature of roots", "Relations between roots and coefficients", "Forming equations from roots", "Location of roots"], "quadratic-equations"),
      ]},
      { slug: "matrices-determinants", name: "Matrices and Determinants", planWeight: 4, summary: "Matrix algebra, determinants, adjoint, inverse and systems of linear equations.", topics: [
        t("Matrices", ["Types of matrices", "Matrix operations", "Symmetric and skew-symmetric"]),
        t("Determinants", ["Properties", "Adjoint and inverse", "Solving linear systems"]),
      ]},
      { slug: "permutations-combinations", name: "Permutations and Combinations", planWeight: 3, summary: "Fundamental counting principle, permutations, combinations and their applications.", topics: [
        t("Counting", ["Fundamental principle of counting", "Permutations with and without repetition", "Combinations", "Selection with restrictions"]),
      ]},
      { slug: "binomial-theorem", name: "Binomial Theorem", planWeight: 3, summary: "Binomial expansion, general and middle terms and properties of coefficients.", topics: [
        t("Binomial Theorem", ["Expansion for positive integral index", "General and middle term", "Properties of binomial coefficients"]),
      ]},
      { slug: "sequences-series", name: "Sequences and Series", planWeight: 3, summary: "AP, GP, means and relations between them.", topics: [
        t("Progressions", ["Arithmetic progression", "Geometric progression", "AM–GM inequality"]),
      ]},
      { slug: "limits-continuity-differentiability", name: "Limits, Continuity and Differentiability", planWeight: 5, summary: "Limits, continuity, derivatives and applications of derivatives.", topics: [
        t("Limits and Continuity", ["Standard limits", "Indeterminate forms", "Continuity"]),
        t("Differentiation", ["Derivative as slope", "Chain rule", "Implicit and parametric differentiation"]),
        t("Applications of Derivatives", ["Increasing and decreasing functions", "Maxima and minima", "Tangents and normals", "Rolle's and Lagrange's mean value theorems"]),
      ]},
      { slug: "integral-calculus", name: "Integral Calculus", planWeight: 5, summary: "Indefinite integrals, definite integrals and area under curves.", topics: [
        t("Indefinite Integrals", ["Standard integrals", "Substitution", "Integration by parts", "Partial fractions"]),
        t("Definite Integrals", ["Fundamental theorem of calculus", "Properties of definite integrals", "Riemann sums", "Area under curves"], "definite-integrals"),
      ]},
      { slug: "differential-equations", name: "Differential Equations", planWeight: 3, summary: "Order and degree, variables separable, homogeneous and linear first-order equations.", topics: [
        t("Differential Equations", ["Order and degree", "Variables separable", "Homogeneous equations", "Linear first-order equations"]),
      ]},
      { slug: "coordinate-geometry", name: "Coordinate Geometry", planWeight: 5, summary: "Straight lines, circles and conic sections.", topics: [
        t("Straight Lines", ["Forms of a line", "Distance of a point from a line", "Angle between lines"]),
        t("Circles", ["Standard and general forms", "Tangents", "Intersection of circles"]),
        t("Conic Sections", ["Parabola", "Ellipse", "Hyperbola", "Eccentricity and focal properties"]),
      ]},
      { slug: "three-d-geometry", name: "Three-Dimensional Geometry", planWeight: 4, summary: "Direction cosines, lines and planes in space, distances and angles.", topics: [
        t("Lines and Planes", ["Direction cosines and ratios", "Equation of a line", "Equation of a plane", "Shortest distance between skew lines"]),
      ]},
      { slug: "vector-algebra", name: "Vector Algebra", planWeight: 4, summary: "Vector operations, dot and cross products and the scalar triple product.", topics: [
        t("Vectors", ["Addition and components", "Dot product", "Cross product", "Scalar triple product"]),
      ]},
      { slug: "statistics-probability", name: "Statistics and Probability", planWeight: 4, summary: "Measures of dispersion, probability, conditional probability, Bayes' theorem and distributions.", topics: [
        t("Statistics", ["Mean, median, mode", "Variance and standard deviation", "Mean deviation"]),
        t("Probability", ["Addition and multiplication theorems", "Conditional probability", "Bayes' theorem", "Random variables and binomial distribution"]),
      ]},
      { slug: "trigonometry", name: "Trigonometry", planWeight: 3, summary: "Trigonometric identities, equations and inverse trigonometric functions.", topics: [
        t("Trigonometric Functions and Equations", ["Identities", "Graphs of trigonometric functions", "General solutions"]),
        t("Inverse Trigonometric Functions", ["Principal values", "Properties"]),
      ]},
    ],
  },
];
