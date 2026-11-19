// Chapter list verified line by line against the official NTA "Syllabus for JEE (Main) - 2027" PDF
// (Paper 1, B.E./B.Tech.), linked as "Syllabus" on jeemain.nta.nic.in, uploaded 24 Oct 2026.
//
// subtopics  = what the 2027 syllabus lists for that topic (paraphrased to the official wording).
// beyondMain = material this platform still teaches (useful for JEE Advanced or as background) that the
//              JEE Main 2027 text does NOT list. It is shown to students with that label, never as Main content.
//
// planWeight (1–5) is a planning priority chosen by the content team to allocate study time.
// It is NOT a claim about how many questions NTA will set.

export type TopicSeed = { name: string; slug?: string; subtopics: string[]; beyondMain?: string[] };
export type ChapterSeed = {
  slug: string;
  name: string;
  unit?: string;
  planWeight: number;
  summary: string;
  /** official unit number in the JEE Main 2027 syllabus */
  officialUnit: string;
  topics: TopicSeed[];
};
export type SubjectSeed = { slug: string; name: string; chapters: ChapterSeed[] };

export const SYLLABUS_SOURCE = {
  title: "Syllabus for JEE (Main) - 2027, Paper 1 (B.E./B.Tech.)",
  publisher: "National Testing Agency",
  url: "https://jeemain.nta.nic.in/",
  pdfUploaded: "2026-10-24",
  verifiedOn: "2026-11-18",
  note: "Every chapter, topic and subtopic on this platform was compared with the official 2027 PDF. Items the PDF does not list are marked “Beyond JEE Main 2027”.",
};

/** JEE Advanced 2027 is organised by IIT Delhi. Its syllabus page (jeeadv.ac.in/syllabus.html) showed “Coming soon” on the verification date. */
export const ADVANCED_SYLLABUS = {
  status: "pending" as "pending" | "verified",
  organiser: "IIT Delhi",
  url: "https://jeeadv.ac.in/syllabus.html",
  checkedOn: "2026-11-18",
  note: "The official JEE Advanced 2027 syllabus has not been published yet. The JEE Advanced syllabus is set by the IITs and is not the same as the JEE Main syllabus, so this platform does not assume either one from the other. When the IITs publish it, each chapter will be mapped here line by line.",
};

const t = (name: string, subtopics: string[], beyondMain?: string[], slug?: string): TopicSeed => ({ name, subtopics, beyondMain, slug });

export const SYLLABUS: SubjectSeed[] = [
  {
    slug: "physics",
    name: "Physics",
    chapters: [
      { slug: "units-and-measurements", name: "Units and Measurements", officialUnit: "Physics Unit 1", planWeight: 2, summary: "SI units, least count, significant figures, errors, and dimensional analysis.", topics: [
        t("SI Units and Dimensions", ["Units and systems of units, SI units", "Fundamental and derived units", "Dimensions of physical quantities", "Dimensional analysis and its applications"]),
        t("Errors and Significant Figures", ["Least count", "Significant figures", "Errors in measurements (absolute, relative, percentage; propagation)"]),
      ]},
      { slug: "kinematics", name: "Kinematics", officialUnit: "Physics Unit 2", planWeight: 4, summary: "Frames of reference, motion in a straight line and in a plane, graphs, projectiles, relative velocity and uniform circular motion.", topics: [
        t("Motion in a Straight Line", ["Frame of reference", "Speed and velocity; average speed and instantaneous velocity", "Uniform and non-uniform motion", "Uniformly accelerated motion and its relations", "Position–time and velocity–time graphs"]),
        t("Vectors in Kinematics", ["Scalars and vectors, resolution", "Relative velocity"]),
        t("Projectile Motion", ["Motion in a plane", "Time of flight, range, maximum height", "Equation of trajectory", "Projection from a height"], undefined, "projectile-motion"),
        t("Uniform Circular Motion", ["Angular variables", "Centripetal acceleration"]),
      ]},
      { slug: "laws-of-motion", name: "Laws of Motion", officialUnit: "Physics Unit 3", planWeight: 4, summary: "Newton's laws, impulse, momentum conservation, equilibrium of concurrent forces, friction and circular dynamics.", topics: [
        t("Newton's Laws and Free-Body Diagrams", ["Force and inertia; Newton's first law", "Momentum and Newton's second law", "Impulse", "Newton's third law", "Equilibrium of concurrent forces", "Connected bodies and pulleys"]),
        t("Friction", ["Static and kinetic friction", "Laws of friction", "Rolling friction", "Angle of repose and blocks on inclines"]),
        t("Dynamics of Circular Motion", ["Centripetal force and its applications", "Vehicle on a level circular road", "Vehicle on a banked road"]),
        t("Conservation of Linear Momentum", ["Law of conservation of linear momentum and its applications", "Recoil"], ["Variable-mass systems (rocket equation)"]),
      ]},
      { slug: "work-energy-power", name: "Work, Energy and Power", officialUnit: "Physics Unit 4", planWeight: 4, summary: "Work by constant and variable forces, energy, power, motion in a vertical circle and collisions.", topics: [
        t("Work and the Work–Energy Theorem", ["Work done by a constant and a variable force", "Kinetic energy", "Work–energy theorem", "Power"]),
        t("Potential Energy and Conservative Forces", ["Potential energy of a spring", "Conservation of mechanical energy", "Conservative and non-conservative forces", "Motion in a vertical circle"], ["Potential-energy curves and stability"]),
        t("Power and Collisions", ["Elastic and inelastic collisions in one and two dimensions", "Coefficient of restitution (as the tool for inelastic collisions)"]),
      ]},
      { slug: "rotational-motion", name: "Rotational Motion", officialUnit: "Physics Unit 5", planWeight: 4, summary: "Centre of mass, torque, angular momentum, moment of inertia, rigid-body equilibrium and rotational dynamics.", topics: [
        t("Centre of Mass", ["Centre of mass of a two-particle system", "Centre of mass of a rigid body"]),
        t("Torque and Moment of Inertia", ["Moment of a force (torque)", "Moment of inertia and radius of gyration", "Moments of inertia of simple geometrical objects", "Parallel and perpendicular axes theorems", "Equilibrium of rigid bodies"]),
        t("Angular Momentum and Rolling", ["Angular momentum and its conservation", "Rigid-body rotation and equations of rotational motion", "Comparison of linear and rotational motion", "Rotational kinetic energy"], ["Rolling without slipping (not named in the JEE Main 2027 text)"]),
      ]},
      { slug: "gravitation", name: "Gravitation", officialUnit: "Physics Unit 6", planWeight: 3, summary: "Universal law of gravitation, variation of g, Kepler's laws, potential, escape and orbital velocity and satellite energy.", topics: [
        t("Gravitational Field and Potential", ["Universal law of gravitation", "Acceleration due to gravity and its variation with altitude and depth", "Gravitational potential energy and gravitational potential"]),
        t("Satellites and Kepler's Laws", ["Kepler's laws of planetary motion", "Escape velocity", "Orbital velocity, time period and energy of a satellite"]),
      ]},
      { slug: "properties-of-solids-and-liquids", name: "Properties of Solids and Liquids", officialUnit: "Physics Unit 7", planWeight: 3, summary: "Elasticity, fluid pressure, viscosity, Bernoulli's principle, surface tension, calorimetry and heat transfer.", topics: [
        t("Elasticity", ["Elastic behaviour, stress–strain relationship", "Hooke's law", "Young's modulus, bulk modulus, modulus of rigidity"]),
        t("Fluid Mechanics", ["Pressure due to a fluid column; effect of gravity on fluid pressure", "Pascal's law and its applications", "Viscosity, Stokes' law, terminal velocity", "Streamline and turbulent flow, critical velocity", "Bernoulli's principle and its applications"]),
        t("Surface Tension", ["Surface energy and surface tension", "Angle of contact", "Excess pressure across a curved surface", "Drops, bubbles and capillary rise"]),
        t("Thermal Properties", ["Heat, temperature, thermal expansion", "Specific heat capacity and calorimetry", "Change of state and latent heat", "Heat transfer: conduction, convection and radiation"], ["Newton's law of cooling", "Stefan–Boltzmann and Wien's laws (beyond a qualitative idea of radiation)"]),
      ]},
      { slug: "thermodynamics", name: "Thermodynamics", officialUnit: "Physics Unit 8", planWeight: 3, summary: "Thermal equilibrium, the zeroth, first and second laws, isothermal and adiabatic processes.", topics: [
        t("First Law of Thermodynamics", ["Thermal equilibrium, zeroth law and temperature", "Heat, work and internal energy", "First law of thermodynamics", "Isothermal and adiabatic processes", "Work from P–V diagrams"]),
        t("Second Law and Heat Engines", ["Second law of thermodynamics", "Reversible and irreversible processes"], ["Carnot engine, efficiency and refrigerators (not named in the JEE Main 2027 text)"]),
      ]},
      { slug: "kinetic-theory-of-gases", name: "Kinetic Theory of Gases", officialUnit: "Physics Unit 9", planWeight: 2, summary: "Ideal-gas equation, work on compressing a gas, kinetic interpretation of temperature, equipartition and mean free path.", topics: [
        t("Kinetic Theory", ["Equation of state of a perfect gas", "Work done on compressing a gas", "Assumptions of kinetic theory and the concept of pressure", "Kinetic interpretation of temperature and RMS speed", "Avogadro's number"]),
        t("Degrees of Freedom", ["Degrees of freedom", "Law of equipartition and specific heats of gases", "Mean free path"]),
      ]},
      { slug: "oscillations-and-waves", name: "Oscillations and Waves", officialUnit: "Physics Unit 10", planWeight: 4, summary: "Periodic motion, SHM, springs and pendulums, wave motion, superposition, standing waves and beats.", topics: [
        t("Simple Harmonic Motion", ["Periodic motion, period, frequency, displacement as a function of time", "SHM and its equation, phase", "Oscillations of a spring: restoring force and force constant", "Energy in SHM", "Simple pendulum: derivation of its time period"], undefined, "simple-harmonic-motion"),
        t("Wave Motion", ["Longitudinal and transverse waves", "Speed of a travelling wave", "Displacement relation for a progressive wave"]),
        t("Superposition and Standing Waves", ["Principle of superposition", "Reflection of waves", "Standing waves in strings and organ pipes, fundamental mode and harmonics", "Beats"], ["Doppler effect (not in the JEE Main 2027 text)"]),
      ]},
      { slug: "electrostatics", name: "Electrostatics", officialUnit: "Physics Unit 11", planWeight: 5, summary: "Charge, Coulomb's law, field, dipoles, Gauss's law, potential, dielectrics and capacitors.", topics: [
        t("Electric Field", ["Conservation of charge, Coulomb's law, superposition", "Continuous charge distributions", "Field of a point charge, field lines", "Electric dipole: field and torque in a uniform field"]),
        t("Gauss's Law", ["Electric flux", "Field of an infinite line charge, infinite sheet and thin spherical shell"]),
        t("Electric Potential", ["Potential of a point charge, dipole and system of charges", "Potential difference and equipotential surfaces", "Potential energy of two point charges and of a dipole in a field"]),
        t("Capacitors", ["Conductors, insulators, dielectrics and polarisation", "Capacitors and capacitance; series and parallel combinations", "Parallel-plate capacitor with and without a dielectric", "Energy stored in a capacitor"]),
      ]},
      { slug: "current-electricity", name: "Current Electricity", officialUnit: "Physics Unit 12", planWeight: 4, summary: "Drift velocity, Ohm's law, resistivity, cells, Kirchhoff's laws, Wheatstone bridge and metre bridge.", topics: [
        t("Ohm's Law and Resistance", ["Drift velocity, mobility and current", "Ohm's law; I–V characteristics of ohmic and non-ohmic conductors", "Resistivity and conductivity; temperature dependence of resistance", "Electrical energy and power", "Series and parallel resistors"]),
        t("Kirchhoff's Laws and Circuits", ["Internal resistance, EMF and terminal potential difference", "Cells in series and parallel", "Kirchhoff's laws and applications", "Wheatstone bridge and metre bridge"], ["Potentiometer (not in the JEE Main 2027 text)"]),
      ]},
      { slug: "magnetic-effects-and-magnetism", name: "Magnetic Effects of Current and Magnetism", officialUnit: "Physics Unit 13", planWeight: 4, summary: "Biot–Savart and Ampère's laws, Lorentz force, galvanometers, magnetic dipoles and magnetic materials.", topics: [
        t("Biot–Savart and Ampère's Laws", ["Biot–Savart law: circular loop", "Ampère's law: infinitely long straight wire and solenoid"], ["Toroid (not named in the JEE Main 2027 text)"]),
        t("Force on Moving Charges and Currents", ["Force on a moving charge in uniform magnetic and electric fields", "Force on a current-carrying conductor", "Force between parallel currents; definition of the ampere", "Torque on a current loop", "Moving-coil galvanometer, sensitivity, conversion to ammeter and voltmeter"]),
        t("Magnetism and Matter", ["Current loop as a magnetic dipole; bar magnet as an equivalent solenoid", "Field of a bar magnet on its axis and perpendicular bisector", "Torque on a magnetic dipole in a uniform field", "Para-, dia- and ferromagnetic substances; effect of temperature"]),
      ]},
      { slug: "emi-and-ac", name: "Electromagnetic Induction and Alternating Currents", officialUnit: "Physics Unit 14", planWeight: 4, summary: "Faraday's and Lenz's laws, eddy currents, inductance, AC values, LCR circuits, power, generator and transformer.", topics: [
        t("Electromagnetic Induction", ["Faraday's law, induced EMF and current", "Lenz's law", "Eddy currents", "Self and mutual inductance", "Motional EMF (as a case of Faraday's law)"]),
        t("Alternating Current", ["Peak and RMS values", "Reactance and impedance", "LCR series circuit and resonance", "Power in AC circuits, wattless current", "AC generator and transformer"]),
      ]},
      { slug: "electromagnetic-waves", name: "Electromagnetic Waves", officialUnit: "Physics Unit 15", planWeight: 2, summary: "Displacement current, transverse nature of EM waves, the spectrum and applications.", topics: [
        t("Electromagnetic Waves", ["Displacement current", "Characteristics and transverse nature of EM waves", "Electromagnetic spectrum and applications"]),
      ]},
      { slug: "optics", name: "Optics", officialUnit: "Physics Unit 16", planWeight: 5, summary: "Mirrors, refraction, lenses, prism, instruments; Huygens' principle, interference, diffraction and polarisation.", topics: [
        t("Ray Optics", ["Spherical mirrors and the mirror formula", "Refraction at plane and spherical surfaces", "Thin lens formula, lens maker's formula, magnification, power", "Total internal reflection and its applications", "Thin lenses in contact", "Refraction through a prism", "Microscope and astronomical telescope (reflecting and refracting) and magnifying powers"]),
        t("Wave Optics", ["Wavefront and Huygens' principle; reflection and refraction from it", "Young's double-slit experiment, fringe width, coherent sources", "Single-slit diffraction and width of the central maximum", "Plane-polarised light, Brewster's law, Polaroids"]),
      ]},
      { slug: "dual-nature", name: "Dual Nature of Matter and Radiation", officialUnit: "Physics Unit 17", planWeight: 3, summary: "Photoelectric effect, Hertz and Lenard's observations, Einstein's equation and de Broglie waves.", topics: [
        t("Photoelectric Effect", ["Dual nature of radiation", "Hertz and Lenard's observations", "Einstein's photoelectric equation; particle nature of light"]),
        t("Matter Waves", ["Wave nature of particles", "de Broglie relation"], ["Davisson–Germer experiment (not in the JEE Main 2027 text)"]),
      ]},
      { slug: "atoms-and-nuclei", name: "Atoms and Nuclei", officialUnit: "Physics Unit 18", planWeight: 3, summary: "Rutherford scattering, Bohr model and hydrogen spectrum; nuclear size, mass defect, binding energy, fission and fusion.", topics: [
        t("Atomic Models and Spectra", ["Alpha-particle scattering and Rutherford's model", "Bohr model and energy levels", "Hydrogen spectrum"]),
        t("Nuclei", ["Composition and size of the nucleus, atomic masses", "Mass–energy relation and mass defect", "Binding energy per nucleon and its variation with mass number", "Nuclear fission and fusion"], ["Radioactivity and the decay law, half-life (not in the JEE Main 2027 text)"]),
      ]},
      { slug: "electronic-devices", name: "Electronic Devices", officialUnit: "Physics Unit 19", planWeight: 3, summary: "Semiconductors, diode characteristics and rectifiers, LED, photodiode, solar cell, Zener regulator and logic gates.", topics: [
        t("Semiconductors and Diodes", ["Semiconductors", "Diode I–V characteristics in forward and reverse bias", "Diode as a rectifier", "I–V characteristics of LED, photodiode and solar cell", "Zener diode as a voltage regulator"]),
        t("Logic Gates", ["OR, AND, NOT, NAND and NOR gates", "Truth tables"]),
      ]},
      { slug: "experimental-skills", name: "Experimental Skills", officialUnit: "Physics Unit 20", planWeight: 2, summary: "The 18 experiments listed in the syllabus, from vernier callipers to diode characteristics.", topics: [
        t("Measuring Instruments", ["Vernier callipers: internal and external diameter, depth", "Screw gauge: thickness of a sheet, diameter of a wire", "Least count and zero error", "Metre scale: mass by the principle of moments"]),
        t("Standard Experiments", ["Simple pendulum: dissipation of energy from amplitude² vs time", "Young's modulus of a wire", "Surface tension by capillary rise; effect of detergents", "Viscosity from terminal velocity", "Speed of sound with a resonance tube", "Specific heat of a solid and a liquid by mixtures", "Resistivity with a metre bridge; resistance by Ohm's law", "Galvanometer resistance and figure of merit (half deflection)", "Focal length of convex mirror, concave mirror and convex lens (parallax)", "Angle of deviation vs angle of incidence for a prism", "Refractive index of a glass slab (travelling microscope)", "Characteristic curves of p–n and Zener diodes", "Identifying diode, LED, resistor and capacitor"]),
      ]},
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    chapters: [
      { slug: "basic-concepts", name: "Some Basic Concepts in Chemistry", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 1", planWeight: 3, summary: "Dalton's theory, laws of chemical combination, mole concept, formulae and stoichiometry.", topics: [
        t("Mole Concept", ["Matter, Dalton's atomic theory; atom, molecule, element, compound", "Laws of chemical combination", "Atomic and molecular masses, mole, molar mass", "Percentage composition, empirical and molecular formulae"]),
        t("Stoichiometry", ["Chemical equations and stoichiometry", "Limiting reagent", "Concentration terms (listed in the syllabus under Solutions)"]),
      ]},
      { slug: "atomic-structure", name: "Atomic Structure", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 2", planWeight: 4, summary: "EM radiation, photoelectric effect, Bohr model, de Broglie, uncertainty, quantum numbers, orbitals and configuration.", topics: [
        t("Bohr Model and Hydrogen Spectrum", ["Nature of EM radiation and the photoelectric effect", "Spectrum of the hydrogen atom", "Bohr model: postulates, energy and radii of orbits", "Limitations of the Bohr model"], undefined, "bohr-model-hydrogen-spectrum"),
        t("Quantum Mechanical Model", ["Dual nature of matter, de Broglie relation", "Heisenberg uncertainty principle", "Orbitals as one-electron wave functions; ψ and ψ² vs r for 1s and 2s", "Quantum numbers and their significance", "Shapes of s, p and d orbitals; electron spin"]),
        t("Electronic Configuration", ["Aufbau principle", "Pauli exclusion principle", "Hund's rule", "Extra stability of half-filled and completely filled orbitals"]),
      ]},
      { slug: "chemical-bonding", name: "Chemical Bonding and Molecular Structure", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 3", planWeight: 5, summary: "Ionic and covalent bonding, Fajans' rules, VSEPR, hybridisation, resonance, MO theory, metallic and hydrogen bonding.", topics: [
        t("VSEPR and Molecular Geometry", ["VSEPR theory and shapes of simple molecules", "Bond angles with lone pairs"]),
        t("Hybridisation", ["Valence bond theory", "Hybridisation involving s, p and d orbitals", "Resonance"]),
        t("Molecular Orbital Theory", ["LCAO; bonding and antibonding orbitals; σ and π bonds", "MO configurations of homonuclear diatomics", "Bond order, bond length and bond energy"]),
        t("Ionic Bonding and Polarity", ["Kossel–Lewis approach; ionic and covalent bonds", "Formation of ionic bonds and lattice enthalpy", "Electronegativity, Fajans' rules, dipole moment", "Elementary idea of metallic bonding", "Hydrogen bonding and its applications"]),
      ]},
      { slug: "chemical-thermodynamics", name: "Chemical Thermodynamics", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 4", planWeight: 4, summary: "System and surroundings, first law, enthalpies and Hess's law, entropy, Gibbs energy and K.", topics: [
        t("First Law and Enthalpy", ["System and surroundings; extensive and intensive properties; state functions; types of processes", "Work, heat, internal energy, enthalpy, heat capacity, molar heat capacity", "Hess's law", "Enthalpies of bond dissociation, combustion, formation, atomisation, sublimation, phase transition, hydration, ionisation and solution"]),
        t("Entropy and Gibbs Energy", ["Entropy; second law and spontaneity", "ΔS of the universe and ΔG of the system as criteria", "ΔG° and the equilibrium constant"]),
      ]},
      { slug: "solutions", name: "Solutions", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 5", planWeight: 3, summary: "Concentration terms, Raoult's law, ideal and non-ideal solutions, colligative properties and the van 't Hoff factor.", topics: [
        t("Raoult's Law", ["Molality, molarity, mole fraction, percentage (mass and volume)", "Vapour pressure of solutions and Raoult's law", "Ideal and non-ideal solutions; vapour pressure–composition plots"], ["Azeotropes in detail (only implied by non-ideal behaviour)"]),
        t("Colligative Properties", ["Relative lowering of vapour pressure", "Depression of freezing point and elevation of boiling point", "Osmotic pressure", "Molar mass from colligative properties; abnormal molar mass", "van 't Hoff factor"]),
      ]},
      { slug: "equilibrium", name: "Equilibrium", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 6", planWeight: 4, summary: "Physical and chemical equilibria, Kp and Kc, Le Chatelier, acids and bases, pH, hydrolysis, Ksp and buffers.", topics: [
        t("Chemical Equilibrium", ["Dynamic equilibrium; physical equilibria and Henry's law", "Law of chemical equilibrium; Kp and Kc", "Significance of ΔG and ΔG° in equilibrium", "Effect of concentration, pressure, temperature and catalyst; Le Chatelier's principle"]),
        t("Ionic Equilibrium", ["Weak and strong electrolytes", "Arrhenius, Brønsted–Lowry and Lewis acids and bases", "Acid–base equilibria including multistage ionisation", "Ionisation of water and the pH scale", "Common-ion effect and hydrolysis of salts", "Solubility product and buffer solutions"]),
      ]},
      { slug: "redox-electrochemistry", name: "Redox Reactions and Electrochemistry", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 7", planWeight: 4, summary: "Oxidation number and balancing, conductance and Kohlrausch's law, cells, Nernst equation, ΔG and batteries.", topics: [
        t("Redox Reactions", ["Electronic concept of oxidation and reduction", "Oxidation number and rules", "Balancing redox reactions"]),
        t("Electrochemical Cells", ["Electrolytic and galvanic cells; types of electrodes", "Standard electrode potential; half-cell and cell reactions", "EMF and Nernst equation", "Cell potential and Gibbs energy", "Dry cell, lead accumulator and fuel cells"]),
        t("Conductance and Electrolysis", ["Electrolytic and metallic conduction", "Conductance, molar conductivity and its variation with concentration", "Kohlrausch's law and applications"], ["Faraday's laws of electrolysis (not named in the JEE Main 2027 text)"]),
      ]},
      { slug: "chemical-kinetics", name: "Chemical Kinetics", unit: "Physical Chemistry", officialUnit: "Chemistry Unit 8", planWeight: 4, summary: "Rate, factors affecting it, order and molecularity, zero- and first-order kinetics, Arrhenius and collision theory.", topics: [
        t("Rate Law and Order", ["Rate of reaction; effect of concentration, temperature, pressure and catalyst", "Elementary and complex reactions; order and molecularity", "Rate law, rate constant and its units", "Differential and integral forms of zero- and first-order reactions; half-lives"], undefined, "rate-law-order"),
        t("Temperature Dependence of Rate", ["Arrhenius theory and activation energy", "Collision theory of bimolecular gaseous reactions (no derivation)"]),
      ]},
      { slug: "periodicity", name: "Classification of Elements and Periodicity", unit: "Inorganic Chemistry", officialUnit: "Chemistry Unit 9", planWeight: 3, summary: "Modern periodic law, blocks, and trends in radii, ionisation enthalpy, electron gain enthalpy, valence and reactivity.", topics: [
        t("Periodic Trends", ["Modern periodic law; s, p, d and f blocks", "Atomic and ionic radii", "Ionisation enthalpy and electron gain enthalpy", "Valence, oxidation states and chemical reactivity", "Electronegativity"]),
      ]},
      { slug: "p-block", name: "p-Block Elements", unit: "Inorganic Chemistry", officialUnit: "Chemistry Unit 10", planWeight: 4, summary: "Groups 13–18: configuration, trends across periods and down groups, and anomalous first elements.", topics: [
        t("Groups 13 and 14", ["Electronic configuration and general trends", "Unique behaviour of the first element (B, C)", "Inert pair effect as a trend"]),
        t("Groups 15 to 18", ["Electronic configuration and trends in physical and chemical properties", "Unique behaviour of N, O, F", "Trends in oxidation states"], ["Structures of oxoacids, interhalogens and noble-gas compounds (the 2027 text lists only general trends)"]),
      ]},
      { slug: "d-f-block", name: "d- and f-Block Elements", unit: "Inorganic Chemistry", officialUnit: "Chemistry Unit 11", planWeight: 3, summary: "First-row transition-metal trends, complexes, interstitial compounds, alloys, KMnO₄ and K₂Cr₂O₇, lanthanoids and actinoids.", topics: [
        t("Transition Elements", ["Configuration, occurrence and characteristics", "Trends: ionisation enthalpy, oxidation states, radii, colour, catalysis, magnetism, complex formation", "Interstitial compounds and alloys", "Preparation, properties and uses of K₂Cr₂O₇ and KMnO₄"]),
        t("Lanthanoids and Actinoids", ["Lanthanoids: configuration, oxidation states, lanthanoid contraction", "Actinoids: configuration and oxidation states"]),
      ]},
      { slug: "coordination-compounds", name: "Coordination Compounds", unit: "Inorganic Chemistry", officialUnit: "Chemistry Unit 12", planWeight: 4, summary: "Werner's theory, ligands, denticity, nomenclature, isomerism, VBT, crystal field theory and applications.", topics: [
        t("Nomenclature and Isomerism", ["Werner's theory; ligands, coordination number, denticity, chelation", "IUPAC nomenclature of mononuclear compounds", "Isomerism"]),
        t("Bonding in Coordination Compounds", ["Valence bond approach", "Basic ideas of crystal field theory; colour and magnetic properties", "Importance in qualitative analysis, metal extraction and biological systems"]),
      ]},
      { slug: "purification-characterisation", name: "Purification and Characterisation of Organic Compounds", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 13", planWeight: 2, summary: "Purification methods; detection and estimation of elements; formula calculations.", topics: [
        t("Purification and Analysis", ["Crystallisation, sublimation, distillation, differential extraction, chromatography", "Detection of N, S, P and halogens", "Estimation of C, H, N, halogens, S and P (principles)", "Empirical and molecular formula calculations"]),
      ]},
      { slug: "basic-principles-organic", name: "Some Basic Principles of Organic Chemistry", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 14", planWeight: 5, summary: "Tetravalency, hybridisation, functional groups, nomenclature, isomerism, bond fission, intermediates, electronic effects and reaction types.", topics: [
        t("Nomenclature and Isomerism", ["Tetravalency of carbon; shapes and hybridisation (s, p)", "Classification by functional group; homologous series", "Trivial and IUPAC nomenclature", "Structural and stereoisomerism"]),
        t("Electronic Effects and Intermediates", ["Homolytic and heterolytic fission", "Free radicals, carbocations, carbanions and their stability", "Electrophiles and nucleophiles", "Inductive, electromeric, resonance and hyperconjugation effects", "Substitution, addition, elimination and rearrangement"]),
      ]},
      { slug: "hydrocarbons", name: "Hydrocarbons", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 15", planWeight: 4, summary: "Alkanes, alkenes, alkynes and aromatic hydrocarbons: preparation, mechanisms and reactions.", topics: [
        t("Alkanes, Alkenes and Alkynes", ["Sawhorse and Newman conformations of ethane; halogenation mechanism", "Geometrical isomerism; electrophilic addition", "Markovnikov addition and peroxide effect; ozonolysis; polymerisation", "Acidity of alkynes; additions to alkynes"]),
        t("Aromatic Hydrocarbons", ["Structure and aromaticity of benzene", "Electrophilic substitution: halogenation, nitration", "Friedel–Crafts alkylation and acylation", "Directive influence of substituents"]),
      ]},
      { slug: "haloalkanes-haloarenes", name: "Organic Compounds Containing Halogens", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 16", planWeight: 3, summary: "Preparation and reactions, nature of the C–X bond, substitution mechanisms and environmental effects.", topics: [
        t("Haloalkanes and Haloarenes", ["General methods of preparation, properties and reactions", "Nature of the C–X bond", "Mechanisms of substitution reactions (SN1, SN2)", "Uses and environmental effects of chloroform, iodoform, freons and DDT"], ["Detailed E1/E2 elimination mechanisms"]),
      ]},
      { slug: "oxygen-compounds", name: "Organic Compounds Containing Oxygen", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 17", planWeight: 5, summary: "Alcohols, phenols, ethers, aldehydes, ketones and the acidity of carboxylic acids.", topics: [
        t("Alcohols, Phenols and Ethers", ["Identifying 1°, 2°, 3° alcohols; dehydration mechanism", "Acidity of phenols; halogenation, nitration, sulphonation", "Reimer–Tiemann reaction", "Structure of ethers"]),
        t("Aldehydes and Ketones", ["Nature of the carbonyl group; nucleophilic addition (HCN, NH₃ and derivatives)", "Grignard reagent, oxidation, Wolff–Kishner and Clemmensen reduction", "Acidity of α-hydrogen; aldol, Cannizzaro, haloform", "Tests to distinguish aldehydes and ketones"]),
        t("Carboxylic Acids", ["Acidic strength and the factors affecting it"], ["Reactions of carboxylic acids and their derivatives (the 2027 text lists only acidity)"]),
      ]},
      { slug: "nitrogen-compounds", name: "Organic Compounds Containing Nitrogen", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 18", planWeight: 3, summary: "Amines: classification, structure, basicity and identification; diazonium salts in synthesis.", topics: [
        t("Amines and Diazonium Salts", ["Nomenclature, classification and structure of amines", "Basic character", "Identification of 1°, 2°, 3° amines", "Importance of diazonium salts in synthesis"]),
      ]},
      { slug: "biomolecules", name: "Biomolecules", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 19", planWeight: 3, summary: "Carbohydrates, proteins, vitamins, nucleic acids and hormones.", topics: [
        t("Biomolecules", ["Carbohydrates: aldoses, ketoses, glucose, fructose; sucrose, lactose, maltose", "α-amino acids, peptide bond, protein structure, denaturation, enzymes", "Vitamins: classification and functions", "DNA and RNA: constitution and functions", "Hormones (general introduction)"]),
      ]},
      { slug: "practical-chemistry", name: "Principles Related to Practical Chemistry", unit: "Organic Chemistry", officialUnit: "Chemistry Unit 20", planWeight: 2, summary: "Element and functional-group detection, listed preparations, titrations, salt analysis and four experiments.", topics: [
        t("Practical Chemistry", ["Detection of N, S, halogens; hydroxyl, carbonyl, carboxyl and amino groups", "Preparation of Mohr's salt, potash alum, acetanilide, p-nitroacetanilide, aniline yellow, iodoform", "Titrations: acids and bases with indicators; oxalic acid and Mohr's salt vs KMnO₄", "Salt analysis: Pb²⁺, Cu²⁺, Al³⁺, Fe³⁺, Zn²⁺, Ni²⁺, Ca²⁺, Ba²⁺, Mg²⁺, NH₄⁺; CO₃²⁻, S²⁻, SO₄²⁻, NO₃⁻, NO₂⁻, Cl⁻, Br⁻, I⁻", "Enthalpy of solution of CuSO₄ and of neutralisation; lyophilic and lyophobic sols; kinetics of I⁻ with H₂O₂"]),
      ]},
    ],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    chapters: [
      { slug: "sets-relations-functions", name: "Sets, Relations and Functions", officialUnit: "Mathematics Unit 1", planWeight: 3, summary: "Sets and their algebra, power set, types of relations, functions, one-one and onto, composition.", topics: [
        t("Sets and Relations", ["Representation; union, intersection, complement and their properties", "Power set", "Types of relations; equivalence relations"]),
        t("Functions", ["One-one, into and onto functions", "Composition of functions", "Domain and range; inverse functions and graphs of simple functions (Unit 7)"]),
      ]},
      { slug: "complex-quadratic", name: "Complex Numbers and Quadratic Equations", officialUnit: "Mathematics Unit 2", planWeight: 4, summary: "Complex numbers in the Argand plane, modulus and argument; quadratic equations and their roots.", topics: [
        t("Complex Numbers", ["Complex numbers as ordered pairs; a + ib form", "Argand diagram and algebra of complex numbers", "Modulus and argument"], ["Cube roots of unity and De Moivre's theorem (not named in the JEE Main 2027 text)"]),
        t("Quadratic Equations", ["Quadratic equations in real and complex number systems", "Relations between roots and coefficients", "Nature of roots", "Forming quadratics with given roots"], ["Location of roots (position of roots relative to given numbers)"], "quadratic-equations"),
      ]},
      { slug: "matrices-determinants", name: "Matrices and Determinants", officialUnit: "Mathematics Unit 3", planWeight: 4, summary: "Matrix algebra, determinants of order 2 and 3, area of a triangle, adjoint, inverse and linear systems.", topics: [
        t("Matrices", ["Types and algebra of matrices"]),
        t("Determinants", ["Determinants of order two and three and their evaluation", "Area of a triangle using determinants", "Adjoint and inverse", "Consistency and solution of linear equations in two or three variables"]),
      ]},
      { slug: "permutations-combinations", name: "Permutations and Combinations", officialUnit: "Mathematics Unit 4", planWeight: 3, summary: "Fundamental principle of counting, P(n, r), C(n, r) and simple applications.", topics: [
        t("Counting", ["Fundamental principle of counting", "Permutations and combinations; P(n, r) and C(n, r)", "Simple applications"], ["Advanced arrangements: circular permutations, derangements, distribution into groups"]),
      ]},
      { slug: "binomial-theorem", name: "Binomial Theorem", officialUnit: "Mathematics Unit 5", planWeight: 3, summary: "Binomial theorem for a positive integral index, general and middle terms, simple applications.", topics: [
        t("Binomial Theorem", ["Binomial theorem for a positive integral index", "General term and middle term", "Simple applications"], ["Sums of binomial coefficients beyond simple applications"]),
      ]},
      { slug: "sequences-series", name: "Sequences and Series", officialUnit: "Mathematics Unit 6", planWeight: 3, summary: "Arithmetic and geometric progressions, inserting means, and the AM–GM relation.", topics: [
        t("Progressions", ["Arithmetic and geometric progressions", "Inserting arithmetic and geometric means", "Relation between AM and GM"], ["Special series Σn, Σn², Σn³ and arithmetico-geometric series"]),
      ]},
      { slug: "limits-continuity-differentiability", name: "Limits, Continuity and Differentiability", officialUnit: "Mathematics Unit 7", planWeight: 5, summary: "Real functions and graphs, limits, continuity, differentiation rules, second derivatives, rates, monotonicity and extrema.", topics: [
        t("Limits and Continuity", ["Real-valued functions: polynomial, rational, trigonometric, logarithmic, exponential, inverse", "Graphs of simple functions", "Limits and continuity"]),
        t("Differentiation", ["Differentiability", "Derivatives of sum, difference, product and quotient", "Trigonometric, inverse trigonometric, logarithmic, exponential, composite and implicit functions", "Derivatives up to order two"], ["Parametric differentiation (not named in the JEE Main 2027 text)"]),
        t("Applications of Derivatives", ["Rate of change of quantities", "Increasing and decreasing functions", "Maxima and minima of functions of one variable"], ["Tangents and normals", "Rolle's theorem and Lagrange's mean value theorem"]),
      ]},
      { slug: "integral-calculus", name: "Integral Calculus", officialUnit: "Mathematics Unit 8", planWeight: 5, summary: "Antiderivatives, substitution, parts, partial fractions, definite integrals, their properties and areas.", topics: [
        t("Indefinite Integrals", ["Integral as an antiderivative; fundamental integrals", "Substitution, integration by parts, partial fractions", "Integration using trigonometric identities", "Standard forms such as ∫dx/(x² ± a²), ∫dx/√(a² − x²), ∫√(x² ± a²) dx"]),
        t("Definite Integrals", ["Fundamental theorem of calculus", "Properties of definite integrals", "Evaluation of definite integrals", "Areas of regions bounded by simple curves in standard forms"], ["Definite integral as the limit of a sum (Riemann sums)"], "definite-integrals"),
      ]},
      { slug: "differential-equations", name: "Differential Equations", officialUnit: "Mathematics Unit 9", planWeight: 3, summary: "Order and degree, variables separable, homogeneous and linear first-order equations.", topics: [
        t("Differential Equations", ["Order and degree", "Separation of variables", "Homogeneous equations", "Linear equations dy/dx + p(x)y = q(x)"]),
      ]},
      { slug: "coordinate-geometry", name: "Coordinate Geometry", officialUnit: "Mathematics Unit 10", planWeight: 5, summary: "Coordinates, locus, straight lines, triangle centres, circles and the standard conic sections.", topics: [
        t("Straight Lines", ["Distance and section formulae; locus", "Slope; parallel and perpendicular lines; intercepts", "Forms of a line; intersection and angle between lines", "Concurrency of three lines", "Distance of a point from a line", "Centroid, orthocentre and circumcentre"]),
        t("Circles", ["Standard and general forms; centre and radius", "Circle on a given diameter", "Intersection of a line and a circle centred at the origin"], ["Tangents and normals to circles", "Two circles: intersection, family and orthogonality"]),
        t("Conic Sections", ["Sections of a cone", "Standard forms of the parabola, ellipse and hyperbola"], ["Tangents, normals, chords and focal properties of conics"]),
      ]},
      { slug: "three-d-geometry", name: "Three-Dimensional Geometry", officialUnit: "Mathematics Unit 11", planWeight: 4, summary: "Coordinates in space, distance, section formula, direction cosines and ratios, lines, skew lines and shortest distance.", topics: [
        t("Lines and Planes", ["Coordinates in space; distance and section formula", "Direction ratios and direction cosines; angle between intersecting lines", "Equation of a line", "Skew lines and the shortest distance between them"], ["Equation of a plane, angle and distance involving planes (not in the JEE Main 2027 text)"]),
      ]},
      { slug: "vector-algebra", name: "Vector Algebra", officialUnit: "Mathematics Unit 12", planWeight: 4, summary: "Vectors and scalars, addition, components in 2D and 3D, scalar and vector products.", topics: [
        t("Vectors", ["Vectors and scalars; addition", "Components in two and three dimensions", "Scalar (dot) product", "Vector (cross) product"], ["Scalar triple product (not in the JEE Main 2027 text)"]),
      ]},
      { slug: "statistics-probability", name: "Statistics and Probability", officialUnit: "Mathematics Unit 13", planWeight: 4, summary: "Mean, median, mode, dispersion; probability, addition and multiplication theorems, Bayes' theorem and distributions.", topics: [
        t("Statistics", ["Mean, median and mode of grouped and ungrouped data", "Standard deviation, variance and mean deviation"]),
        t("Probability", ["Probability of an event", "Addition and multiplication theorems (with conditional probability)", "Bayes' theorem", "Probability distribution of a random variable"], ["Binomial distribution as a named distribution"]),
      ]},
      { slug: "trigonometry", name: "Trigonometry", officialUnit: "Mathematics Unit 14", planWeight: 3, summary: "Trigonometric identities and functions; inverse trigonometric functions and their properties.", topics: [
        t("Trigonometric Functions and Equations", ["Trigonometric identities", "Trigonometric functions"], ["General solutions of trigonometric equations (not in the JEE Main 2027 text)", "Properties of triangles: sine, cosine and projection rules"]),
        t("Inverse Trigonometric Functions", ["Inverse trigonometric functions and their properties", "Principal values"]),
      ]},
    ],
  },
];
