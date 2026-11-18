import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const CHEM_PHYSICAL_2: NoteSeed[] = [
  note("entropy-and-gibbs-energy", {
    introduction: r`Whether a reaction happens on its own depends on both energy and disorder. Gibbs energy combines enthalpy and entropy into a single spontaneity test, and links directly to the equilibrium constant.`,
    prerequisites: r`- Enthalpy
- Logarithms`,
    concept: r`Nature tends toward greater total entropy (dispersal of energy and matter). At constant temperature and pressure, a process is spontaneous if it lowers the Gibbs energy: $\Delta G = \Delta H - T\Delta S < 0$.`,
    theory: r`$\Delta S = \frac{q_{\text{rev}}}{T}$. $\Delta S_{\text{total}} = \Delta S_{\text{sys}} + \Delta S_{\text{surr}} > 0$ for spontaneous change. $\Delta G^\circ = -RT\ln K$; $\Delta G = \Delta G^\circ + RT\ln Q$.`,
    definitions: r`- **Entropy** $S$: measure of dispersal (J K⁻¹ mol⁻¹).
- **Gibbs energy** $G = H - TS$.
- **Spontaneous:** occurs without continuous external input (says nothing about rate).`,
    principles: r`1. $\Delta G < 0$ spontaneous, $= 0$ equilibrium, $> 0$ non-spontaneous.
2. Third law: entropy of a perfect crystal at 0 K is zero.
3. Gases > liquids > solids in entropy; more moles of gas ⇒ larger $\Delta S$.`,
    derivations: r`**Temperature for spontaneity.** If $\Delta H > 0$ and $\Delta S > 0$, $\Delta G < 0$ when $T > \frac{\Delta H}{\Delta S}$.

**Phase change.** At the transition temperature $\Delta G = 0$: $\Delta S = \frac{\Delta H_{\text{trans}}}{T}$.`,
    formulas: r`- $\Delta S = \dfrac{q_{\text{rev}}}T$; phase change $\Delta S = \dfrac{\Delta H}{T}$.
- Ideal gas: $\Delta S = nC_v\ln\dfrac{T_2}{T_1} + nR\ln\dfrac{V_2}{V_1}$; isothermal $\Delta S = 2.303nR\log\dfrac{V_2}{V_1}$.
- $\Delta_rS^\circ = \sum S^\circ_{\text{prod}} - \sum S^\circ_{\text{react}}$.
- $\Delta G = \Delta H - T\Delta S$; $\Delta G^\circ = -RT\ln K = -2.303RT\log K$.
- $\Delta G = \Delta G^\circ + RT\ln Q$.
- $\Delta G^\circ = -nFE^\circ_{\text{cell}}$.
- Sign table: $\Delta H < 0, \Delta S > 0$ always spontaneous; $\Delta H > 0, \Delta S < 0$ never; $\Delta H < 0, \Delta S < 0$ spontaneous at low $T$; $\Delta H > 0, \Delta S > 0$ at high $T$.
- Trouton's rule: $\Delta S_{\text{vap}} \approx 85$–$88$ J K⁻¹ mol⁻¹.`,
    diagrams: r`$G$ vs extent of reaction: minimum at equilibrium; slope sign shows direction of spontaneous change.`,
    graphs: r`$\Delta G$ vs $T$ is a straight line with slope $-\Delta S$ and intercept $\Delta H$.`,
    specialCases: r`- $\Delta G^\circ = 0 \Rightarrow K = 1$.
- Ellingham diagrams use $\Delta G^\circ$ vs $T$ (enrichment beyond the current syllabus).`,
    exceptions: r`Spontaneous does not mean fast (diamond → graphite is spontaneous but extremely slow).`,
    assumptions: r`$\Delta H$, $\Delta S$ roughly independent of temperature.`,
    applications: r`Predicting feasibility, temperature needed for decomposition, battery voltages.`,
    patterns: r`- Spontaneity from signs and temperatures.
- $K$ from $\Delta G^\circ$ and vice versa.
- Entropy change in phase transitions and gas expansion.`,
    misconceptions: r`- "Negative $\Delta S$ processes never happen." They can if $\Delta H$ is negative enough.`,
    traps: r`- Units: kJ for $\Delta H$, J for $\Delta S$ — convert before combining.`,
    summary: r`- $\Delta G = \Delta H - T\Delta S$; $\Delta G^\circ = -RT\ln K = -nFE^\circ$.
- $\Delta S_{\text{trans}} = \Delta H/T$.`,
  }),

  note("raoults-law", {
    introduction: r`Raoult's law relates vapour pressure of a solution to its composition. Deviations from it reveal intermolecular forces and lead to azeotropes.`,
    prerequisites: r`- Mole fraction
- Vapour pressure`,
    concept: r`In an ideal solution each component evaporates in proportion to its share of the liquid surface (its mole fraction). Stronger or weaker A–B attractions than A–A and B–B cause negative or positive deviations.`,
    theory: r`$p_A = x_Ap_A^\circ$, $P = x_Ap_A^\circ + x_Bp_B^\circ$. Vapour composition: $y_A = \frac{p_A}{P}$. Henry's law for gases: $p = K_Hx$.`,
    definitions: r`- **Ideal solution:** obeys Raoult's law at all compositions; $\Delta H_{\text{mix}} = 0$, $\Delta V_{\text{mix}} = 0$.
- **Positive deviation:** weaker A–B interactions (e.g. ethanol + water, acetone + CS₂). **Negative deviation:** stronger (acetone + chloroform).
- **Azeotrope:** boils at constant composition.`,
    principles: r`1. Vapour is richer in the more volatile component.
2. Positive deviation ⇒ minimum-boiling azeotrope; negative ⇒ maximum-boiling azeotrope.`,
    derivations: r`**Total pressure vs vapour composition.** $\frac1P = \frac{y_A}{p_A^\circ} + \frac{y_B}{p_B^\circ}$, from $x_A = \frac{y_AP}{p_A^\circ}$ and $x_A + x_B = 1$.`,
    formulas: r`- $p_A = x_Ap_A^\circ$; $P = p_B^\circ + (p_A^\circ - p_B^\circ)x_A$.
- Vapour mole fraction $y_A = \dfrac{x_Ap_A^\circ}{P}$; $\dfrac1P = \dfrac{y_A}{p_A^\circ} + \dfrac{y_B}{p_B^\circ}$.
- Henry's law $p = K_Hx$ (higher $K_H$ ⇒ lower solubility).
- Ideal: $\Delta H_{\text{mix}} = 0$, $\Delta V_{\text{mix}} = 0$, $\Delta S_{\text{mix}} > 0$.
- Positive deviation: $\Delta H_{\text{mix}} > 0$, $\Delta V_{\text{mix}} > 0$; negative: both $< 0$.`,
    diagrams: r`$P$–$x$ diagram: straight line for ideal; curved above (positive) or below (negative).`,
    graphs: r`Boiling point–composition diagram showing azeotrope minimum or maximum.`,
    specialCases: r`- Ethanol–water: positive deviation, azeotrope at 95% ethanol (cannot be purified further by distillation).
- HNO₃–water: negative deviation, maximum-boiling azeotrope (~68% HNO₃).`,
    exceptions: r`Raoult's law fails for strongly interacting or very dissimilar liquids.`,
    assumptions: r`Volatile liquids, dilute gases (Henry).`,
    applications: r`Fractional distillation, carbonated drinks (Henry), scuba diving (bends).`,
    patterns: r`- Total and partial pressures; vapour composition.
- Identify type of deviation.
- Henry's law solubility.`,
    misconceptions: r`- "Vapour composition equals liquid composition." Vapour is richer in the more volatile component.`,
    traps: r`- Liquid mole fraction $x$ vs vapour mole fraction $y$.`,
    summary: r`- $P = x_Ap_A^\circ + x_Bp_B^\circ$; $y_A = x_Ap_A^\circ/P$.
- Positive deviation → min-boiling azeotrope; negative → max-boiling.`,
  }),

  note("colligative-properties", {
    introduction: r`Colligative properties depend only on the number of solute particles, not their identity. They are used to determine molar masses and explain antifreeze and osmosis.`,
    prerequisites: r`- Raoult's law
- Molality`,
    concept: r`Dissolved particles take up surface space and dilute the solvent, lowering its escaping tendency. That lowers vapour pressure and freezing point, raises boiling point, and creates osmotic pressure.`,
    theory: r`Relative lowering of vapour pressure $\frac{p^\circ - p}{p^\circ} = x_{\text{solute}}$. $\Delta T_b = iK_bm$, $\Delta T_f = iK_fm$, $\pi = iCRT$. The van 't Hoff factor $i$ corrects for dissociation or association.`,
    definitions: r`- **Van 't Hoff factor** $i = \frac{\text{observed colligative property}}{\text{calculated}}$.
- **Isotonic solutions:** equal osmotic pressure.
- **Reverse osmosis:** applying pressure > $\pi$ pushes solvent out of the solution.`,
    principles: r`1. Dissociation increases $i$ (> 1); association decreases it (< 1).
2. Osmotic pressure is the most suitable method for macromolecules (measurable at room temperature).`,
    derivations: r`**Degree of dissociation.** For an electrolyte giving $n$ ions: $i = 1 + (n - 1)\alpha$. For association into $n$-mers: $i = 1 - \alpha\left(1 - \frac1n\right)$.`,
    formulas: r`- $\dfrac{p^\circ - p}{p^\circ} = ix_B$ (dilute: $\approx \dfrac{iw_BM_A}{w_AM_B}$).
- $\Delta T_b = iK_bm$, $\Delta T_f = iK_fm$; $K_b(\text{water}) = 0.52$, $K_f(\text{water}) = 1.86$ K kg/mol.
- $\pi = iCRT$ ($C$ in mol/L, $R = 0.0821$ L atm K⁻¹ mol⁻¹).
- Molar mass: $M_B = \dfrac{K_bw_B\times1000}{\Delta T_bw_A}$ (similar for $K_f$), $M_B = \dfrac{w_BRT}{\pi V}$.
- Dissociation $i = 1 + (n - 1)\alpha$; association $i = 1 - \alpha\left(1 - \dfrac1n\right)$.
- $K_b = \dfrac{RT_b^2M_A}{1000\Delta H_{\text{vap}}}$ (per kg form).`,
    diagrams: r`Osmosis setup: semipermeable membrane, solvent flows into solution; height difference measures $\pi$.`,
    graphs: r`Vapour pressure–temperature curves of solvent and solution: solution curve lies lower, giving higher bp and lower fp.`,
    specialCases: r`- Acetic acid dimerises in benzene ($i \approx 0.5$).
- 0.1 m NaCl ($i \approx 2$) lowers fp about twice as much as 0.1 m glucose.`,
    exceptions: r`Formulas assume dilute solutions and non-volatile solutes.`,
    assumptions: r`Ideal dilute solution behaviour.`,
    applications: r`Antifreeze, salting roads, IV fluids (isotonic saline), desalination by reverse osmosis.`,
    patterns: r`- Molar mass from colligative data.
- Van 't Hoff factor and degree of dissociation/association.
- Compare bp/fp/π of different solutions.`,
    misconceptions: r`- "Heavier solutes lower the freezing point more." Only the number of particles matters.`,
    traps: r`- Molality uses kg of solvent, not solution.
- Including $i$ for electrolytes.`,
    summary: r`- $\Delta T = iKm$; $\pi = iCRT$; RLVP $= ix_B$.
- $i = 1 + (n-1)\alpha$ (dissociation).`,
  }),

  note("chemical-equilibrium", {
    introduction: r`At equilibrium, forward and reverse reactions proceed at equal rates and concentrations stop changing. The equilibrium constant quantifies the position; Le Chatelier's principle predicts shifts.`,
    prerequisites: r`- Rate concepts
- Partial pressures`,
    concept: r`Equilibrium is dynamic: molecules keep reacting both ways. The ratio of products to reactants (each raised to its coefficient) settles to a constant at a given temperature.`,
    theory: r`For $aA + bB \rightleftharpoons cC + dD$: $K_c = \frac{[C]^c[D]^d}{[A]^a[B]^b}$, $K_p = K_c(RT)^{\Delta n_g}$. Reaction quotient $Q$: $Q < K$ forward, $Q > K$ backward.`,
    definitions: r`- **Homogeneous/heterogeneous equilibrium.** Pure solids and liquids are omitted from $K$.
- **Degree of dissociation** $\alpha$.`,
    principles: r`1. Le Chatelier: the system shifts to oppose an imposed change (concentration, pressure, temperature).
2. Only temperature changes $K$; catalysts change neither $K$ nor position.
3. Adding inert gas at constant volume: no shift; at constant pressure: shifts toward more gaseous moles.`,
    derivations: r`**Dissociation and vapour density.** For $A \rightleftharpoons nB$, total moles $1 + (n-1)\alpha$, so $\alpha = \frac{D - d}{(n-1)d}$ where $D$ is the initial and $d$ the observed vapour density.`,
    formulas: r`- $K_c = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}$; $K_p = K_c(RT)^{\Delta n_g}$.
- Reversed reaction: $K' = 1/K$; multiplied by $n$: $K' = K^n$; added reactions: $K = K_1K_2$.
- $Q < K$ forward; $Q > K$ backward.
- Van 't Hoff: $\log\dfrac{K_2}{K_1} = \dfrac{\Delta H^\circ}{2.303R}\left(\dfrac1{T_1} - \dfrac1{T_2}\right)$.
- $\Delta G^\circ = -2.303RT\log K$.
- $\alpha = \dfrac{D - d}{(n - 1)d}$.
- PCl₅ ⇌ PCl₃ + Cl₂: $K_p = \dfrac{\alpha^2P}{1 - \alpha^2}$.`,
    diagrams: r`Concentration vs time: reactants fall, products rise, both level off; rates become equal.`,
    graphs: r`Rate vs time: forward decreases, backward increases, meeting at equilibrium.`,
    specialCases: r`- $\Delta n_g = 0$: $K_p = K_c$ and pressure has no effect.
- Exothermic reactions: $K$ decreases as $T$ rises.`,
    exceptions: r`$K$ uses activities; concentrations approximate them only for dilute solutions/ideal gases.`,
    assumptions: r`Closed system at constant temperature.`,
    applications: r`Haber process conditions, contact process, blood oxygen transport.`,
    patterns: r`- $K_p$–$K_c$ conversions.
- Equilibrium concentrations from initial amounts (ICE tables).
- Le Chatelier predictions; effect of inert gas.
- $K$ at a new temperature.`,
    misconceptions: r`- "At equilibrium concentrations are equal." They are constant, not equal.`,
    traps: r`- Including solids/liquids in $K$.
- $\Delta n_g$ only for gases.`,
    summary: r`- $K_p = K_c(RT)^{\Delta n_g}$; $Q$ vs $K$.
- Le Chatelier; only $T$ changes $K$.`,
  }),

  note("ionic-equilibrium", {
    introduction: r`Ionic equilibrium covers acids, bases, pH, buffers, salt hydrolysis and solubility product — the most numerical part of physical chemistry.`,
    prerequisites: r`- Chemical equilibrium
- Logarithms`,
    concept: r`Weak acids and bases ionise only partly; the extent is fixed by $K_a$ or $K_b$. Water itself ionises slightly ($K_w = 10^{-14}$ at 25 °C), which links $[H^+]$ and $[OH^-]$ in every aqueous solution.`,
    theory: r`$\text{pH} = -\log[H^+]$; $K_w = [H^+][OH^-]$; $\text{p}K_a + \text{p}K_b = 14$ for a conjugate pair.

Weak acid: $[H^+] = \sqrt{K_aC}$, $\alpha = \sqrt{K_a/C}$ (Ostwald dilution, $\alpha \ll 1$). Buffer: Henderson–Hasselbalch.

Solubility product $K_{sp} = [M^{n+}]^x[A^{m-}]^y$; precipitation when ionic product > $K_{sp}$.`,
    definitions: r`- **Arrhenius, Brønsted–Lowry, Lewis** acids and bases.
- **Buffer:** resists pH change (weak acid + its salt, or weak base + its salt).
- **Common ion effect:** suppression of ionisation by adding a common ion.`,
    principles: r`1. Stronger acid ⇒ weaker conjugate base.
2. Common ion decreases solubility.
3. Salt of strong acid + weak base is acidic; weak acid + strong base is basic.`,
    derivations: r`**Henderson equation.** $K_a = \frac{[H^+][A^-]}{[HA]} \Rightarrow \text{pH} = \text{p}K_a + \log\frac{[A^-]}{[HA]} = \text{p}K_a + \log\frac{[\text{salt}]}{[\text{acid}]}$.`,
    formulas: r`- pH $= -\log[H^+]$; pH + pOH = 14 (25 °C); $K_w = 10^{-14}$.
- Weak acid: $\alpha = \sqrt{\dfrac{K_a}C}$, $[H^+] = \sqrt{K_aC}$, pH $= \tfrac12(\text{p}K_a - \log C)$.
- Weak base: $[OH^-] = \sqrt{K_bC}$.
- Acidic buffer: pH $= \text{p}K_a + \log\dfrac{[\text{salt}]}{[\text{acid}]}$; basic: pOH $= \text{p}K_b + \log\dfrac{[\text{salt}]}{[\text{base}]}$.
- Hydrolysis (pH at 25 °C):
- — weak acid + strong base salt: pH $= 7 + \tfrac12(\text{p}K_a + \log C)$, $h = \sqrt{\dfrac{K_w}{K_aC}}$.
- — strong acid + weak base salt: pH $= 7 - \tfrac12(\text{p}K_b + \log C)$.
- — weak acid + weak base salt: pH $= 7 + \tfrac12(\text{p}K_a - \text{p}K_b)$ (independent of $C$).
- $K_{sp}$: for $A_xB_y$ with solubility $s$: $K_{sp} = x^xy^ys^{x+y}$ (AB: $s^2$; AB₂: $4s^3$; A₃B: $27s^4$).
- Precipitation if ionic product $Q_{sp} > K_{sp}$.
- Very dilute strong acid ($C < 10^{-6}$ M): include water: $[H^+] = C + 10^{-7}$ approximately (solve $x^2 - Cx - K_w = 0$ exactly).
- Polyprotic acids: pH mainly from the first ionisation.`,
    diagrams: r`Titration curves: strong acid–strong base (sharp jump at pH 7); weak acid–strong base (equivalence above 7, buffer region with pH = p$K_a$ at half-equivalence).`,
    graphs: r`Indicator ranges: methyl orange 3.1–4.4, phenolphthalein 8.3–10.`,
    specialCases: r`- At half-neutralisation of a weak acid, pH = p$K_a$.
- Maximum buffer capacity when [salt] = [acid].`,
    exceptions: r`$\alpha = \sqrt{K_a/C}$ fails when $\alpha$ is not small (solve the quadratic).`,
    assumptions: r`25 °C unless stated; activity ≈ concentration.`,
    applications: r`Blood buffer (H₂CO₃/HCO₃⁻), qualitative analysis (selective precipitation), titrations.`,
    patterns: r`- pH of acids, bases, mixtures, buffers and salts.
- Solubility from $K_{sp}$; common ion effect.
- Whether precipitation occurs on mixing.
- Indicator choice.`,
    misconceptions: r`- "A buffer keeps pH absolutely constant." It resists change within its capacity.`,
    traps: r`- Dilution on mixing solutions (recalculate concentrations).
- Neglecting water's contribution in very dilute solutions.`,
    summary: r`- pH, $K_w = 10^{-14}$; $[H^+] = \sqrt{K_aC}$.
- Henderson: pH $= $ p$K_a + \log(\text{salt}/\text{acid})$.
- $K_{sp} = x^xy^ys^{x+y}$; precipitate if $Q > K_{sp}$.`,
  }),

  note("redox-reactions", {
    introduction: r`Redox reactions transfer electrons: one species is oxidised, another reduced. Oxidation numbers track electrons and allow balancing and equivalent-weight calculations.`,
    prerequisites: r`- Valency and ions`,
    concept: r`Oxidation is loss of electrons (oxidation number increases); reduction is gain (oxidation number decreases). Electrons lost must equal electrons gained.`,
    theory: r`Oxidation number rules: elements 0; monatomic ion = charge; O usually −2 (−1 in peroxides, +2 in OF₂); H +1 (−1 in metal hydrides); sum = overall charge.

Balancing: ion–electron (half-reaction) method or oxidation-number method.`,
    definitions: r`- **Oxidising agent:** gets reduced. **Reducing agent:** gets oxidised.
- **Disproportionation:** same species oxidised and reduced. **Comproportionation:** reverse.
- **n-factor:** electrons transferred per formula unit.`,
    principles: r`1. Electrons lost = electrons gained.
2. Equivalents of oxidant = equivalents of reductant.`,
    derivations: r`**Balancing MnO₄⁻ + Fe²⁺ (acidic).** Reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O. Oxidation: Fe²⁺ → Fe³⁺ + e⁻ (×5). Sum: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O.`,
    formulas: r`- n-factor: KMnO₄ 5 (acidic), 3 (neutral/weakly basic, → MnO₂), 1 (strongly basic, → MnO₄²⁻); K₂Cr₂O₇ 6 (acidic); H₂O₂ 2; oxalate C₂O₄²⁻ 2; Fe²⁺ 1.
- Equivalent weight $= \dfrac{M}{n\text{-factor}}$.
- Equivalents of oxidant = equivalents of reductant: $N_1V_1 = N_2V_2$.
- Average oxidation number can be fractional (Fe in Fe₃O₄ = $+\tfrac83$, S in S₄O₆²⁻ = $+2.5$).`,
    diagrams: r`Half-reaction ladder: write each half, balance atoms other than O and H, then O with H₂O, H with H⁺ (or OH⁻ in basic), then charge with electrons.`,
    graphs: r`Not applicable.`,
    specialCases: r`- CrO₅ has Cr in +6 (peroxide linkages).
- H₂O₂ acts as both oxidant and reductant.`,
    exceptions: r`Oxidation numbers are formal bookkeeping, not real charges.`,
    assumptions: r`Medium (acidic/basic) specified.`,
    applications: r`Titrations, batteries, corrosion, metallurgy, bleaching.`,
    patterns: r`- Oxidation numbers in complex species.
- Balance redox equations in acidic/basic media.
- Redox titration calculations.`,
    misconceptions: r`- "Oxidation always involves oxygen." It is electron loss.`,
    traps: r`- n-factor of KMnO₄ depends on the medium.`,
    summary: r`- OIL RIG; electrons lost = gained.
- KMnO₄ n = 5 (acid); K₂Cr₂O₇ n = 6; $E = M/n$.`,
  }),

  note("electrochemical-cells", {
    introduction: r`Galvanic cells convert chemical energy into electrical energy. Standard electrode potentials, the Nernst equation and the link to Gibbs energy are core JEE numericals.`,
    prerequisites: r`- Redox reactions
- Gibbs energy and equilibrium`,
    concept: r`Separate oxidation and reduction into two half-cells joined by a wire and a salt bridge, and electrons are forced through the wire. The cell voltage measures how strongly the reaction wants to go.`,
    theory: r`$E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}$ (reduction potentials). Nernst: $E = E^\circ - \frac{0.0591}{n}\log Q$ at 298 K. $\Delta G = -nFE$.`,
    definitions: r`- **Anode:** oxidation (negative in a galvanic cell). **Cathode:** reduction (positive).
- **SHE:** standard hydrogen electrode, $E^\circ = 0$.
- **Electrochemical series:** reduction potentials in order.`,
    principles: r`1. Higher reduction potential ⇒ stronger oxidising agent.
2. Cell is spontaneous if $E_{\text{cell}} > 0$.
3. At equilibrium $E_{\text{cell}} = 0$, $Q = K$.`,
    derivations: r`**$E^\circ$ and $K$.** At equilibrium $0 = E^\circ - \frac{0.0591}{n}\log K \Rightarrow \log K = \frac{nE^\circ}{0.0591}$.

**Combining half-cell potentials.** Use $\Delta G^\circ$ (additive), not $E^\circ$: $n_3E_3^\circ = n_1E_1^\circ + n_2E_2^\circ$.`,
    formulas: r`- $E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}$.
- Nernst: $E = E^\circ - \dfrac{0.0591}{n}\log Q$ (298 K); general $E = E^\circ - \dfrac{RT}{nF}\ln Q$.
- Electrode $M^{n+}/M$: $E = E^\circ - \dfrac{0.0591}n\log\dfrac1{[M^{n+}]}$.
- Hydrogen electrode: $E = -0.0591\,\text{pH}$ (at $p_{H_2} = 1$ bar).
- $\Delta G^\circ = -nFE^\circ$; $\log K = \dfrac{nE^\circ}{0.0591}$; $F = 96485$ C/mol.
- Concentration cell: $E = \dfrac{0.0591}n\log\dfrac{C_2}{C_1}$ (cathode concentration $C_2$).
- Combining potentials: $E^\circ_3 = \dfrac{n_1E_1^\circ + n_2E_2^\circ}{n_3}$.
- Daniell cell $E^\circ = 1.10$ V.`,
    diagrams: r`Watch electrons flow from Zn to Cu and ions move through the salt bridge in the Daniell cell lesson.`,
    graphs: r`$E_{\text{cell}}$ vs $\log Q$: straight line, slope $-0.0591/n$.`,
    specialCases: r`- Metals above hydrogen in the series liberate H₂ from dilute acids.
- Fuel cells: H₂–O₂, $E^\circ = 1.23$ V.`,
    exceptions: r`Cannot add $E^\circ$ values directly when electrons differ.`,
    assumptions: r`Activities ≈ concentrations; 298 K for 0.0591.`,
    applications: r`Batteries (dry cell, lead–acid, Li-ion), fuel cells, corrosion prevention (galvanisation).`,
    patterns: r`- $E_{\text{cell}}$ with concentrations; pH from cell emf.
- $K$ and $\Delta G^\circ$ from $E^\circ$.
- Predict feasibility and products.
- Combining electrode potentials.`,
    misconceptions: r`- "$E^\circ$ doubles when the equation is doubled." It is intensive; it does not change.`,
    traps: r`- Sign conventions (reduction potentials).
- $n$ in the Nernst equation.`,
    summary: r`- $E^\circ_{\text{cell}} = E^\circ_c - E^\circ_a$; Nernst $E = E^\circ - \frac{0.0591}n\log Q$.
- $\Delta G^\circ = -nFE^\circ$, $\log K = nE^\circ/0.0591$.`,
  }, { diagrams: "galvanic" }),

  note("conductance-and-electrolysis", {
    introduction: r`Electrolytic solutions conduct by moving ions. Conductivity, molar conductivity, Kohlrausch's law and Faraday's laws of electrolysis are standard JEE calculations.`,
    prerequisites: r`- Ohm's law
- Ions and moles`,
    concept: r`More ions and faster ions mean better conduction. As a solution is diluted, conductivity per volume drops (fewer ions), but conductivity per mole rises (ions move more freely and weak electrolytes ionise more).`,
    theory: r`$\kappa = \frac1\rho = G\frac{l}{A}$ (cell constant $G^* = l/A$). Molar conductivity $\Lambda_m = \frac{\kappa\times1000}{C}$. Strong electrolytes: $\Lambda_m = \Lambda_m^\circ - A\sqrt C$. Weak: $\alpha = \frac{\Lambda_m}{\Lambda_m^\circ}$.

Faraday: $m = ZIt = \frac{E}{F}It$.`,
    definitions: r`- **Conductance** $G = 1/R$ (S). **Conductivity** $\kappa$ (S/m or S/cm).
- **Limiting molar conductivity** $\Lambda_m^\circ$ at infinite dilution.
- **Electrochemical equivalent** $Z$: mass deposited per coulomb.`,
    principles: r`1. Kohlrausch: $\Lambda_m^\circ = \nu_+\lambda_+^\circ + \nu_-\lambda_-^\circ$.
2. Same charge deposits masses in the ratio of equivalent weights (Faraday's second law).`,
    derivations: r`**$\Lambda_m^\circ$ of a weak acid from strong electrolytes.** $\Lambda^\circ(\text{CH}_3\text{COOH}) = \Lambda^\circ(\text{CH}_3\text{COONa}) + \Lambda^\circ(\text{HCl}) - \Lambda^\circ(\text{NaCl})$.`,
    formulas: r`- $\kappa = \dfrac{G^*}{R}$, cell constant $G^* = \dfrac lA$.
- $\Lambda_m = \dfrac{1000\kappa}{C}$ (S cm² mol⁻¹, $\kappa$ in S/cm, $C$ in mol/L).
- Strong: $\Lambda_m = \Lambda_m^\circ - A\sqrt C$ (Debye–Hückel–Onsager).
- Weak: $\alpha = \dfrac{\Lambda_m}{\Lambda_m^\circ}$; $K_a = \dfrac{C\alpha^2}{1 - \alpha}$.
- Kohlrausch: $\Lambda_m^\circ = \nu_+\lambda_+^\circ + \nu_-\lambda_-^\circ$.
- Faraday I: $m = ZIt = \dfrac{MIt}{nF}$; II: $\dfrac{m_1}{m_2} = \dfrac{E_1}{E_2}$.
- 1 F = 96485 C = charge on 1 mol electrons; deposits 1 equivalent.
- Products of electrolysis: aqueous NaCl gives H₂ at cathode and Cl₂ at anode (overpotential); dilute H₂SO₄ gives O₂ at anode.`,
    diagrams: r`Conductivity cell: two platinised electrodes of area $A$ separated by $l$.`,
    graphs: r`$\Lambda_m$ vs $\sqrt C$: straight line for strong electrolytes (extrapolate to $\Lambda^\circ$); steep curve for weak electrolytes (cannot extrapolate).`,
    specialCases: r`- H⁺ and OH⁻ have unusually high ionic conductivities (Grotthuss mechanism).`,
    exceptions: r`$\Lambda^\circ$ of weak electrolytes must be obtained via Kohlrausch, not extrapolation.`,
    assumptions: r`Constant temperature (conductivity rises with $T$).`,
    applications: r`Electroplating, extraction of Al and Na, purity checks of water, conductometric titrations.`,
    patterns: r`- $\kappa$, $\Lambda_m$ and cell constant calculations.
- Kohlrausch for weak electrolytes; degree of dissociation and $K_a$.
- Mass deposited/gas liberated in electrolysis.`,
    misconceptions: r`- "Conductivity increases on dilution." Molar conductivity does; conductivity decreases.`,
    traps: r`- Unit conversions (S/m vs S/cm; mol/L vs mol/m³).`,
    summary: r`- $\Lambda_m = 1000\kappa/C$; Kohlrausch sums.
- $\alpha = \Lambda_m/\Lambda_m^\circ$; $m = MIt/nF$.`,
  }),

  note("temperature-dependence-of-rate", {
    introduction: r`Most reactions speed up sharply with temperature. The Arrhenius equation and collision theory explain why, through activation energy.`,
    prerequisites: r`- Rate laws
- Exponential and logarithm functions`,
    concept: r`Only collisions with energy above the activation energy $E_a$ (and the right orientation) react. Raising the temperature increases the fraction of such energetic molecules exponentially.`,
    theory: r`$k = Ae^{-E_a/RT}$; $\log\frac{k_2}{k_1} = \frac{E_a}{2.303R}\left(\frac1{T_1} - \frac1{T_2}\right)$. Catalysts provide a path with lower $E_a$.`,
    definitions: r`- **Activation energy** $E_a$: minimum extra energy for reaction.
- **Pre-exponential factor** $A$: collision frequency × orientation (steric) factor.
- **Temperature coefficient:** $\frac{k_{T+10}}{k_T}$, typically 2–3.`,
    principles: r`1. Catalyst lowers $E_a$ equally for forward and backward reactions; $K$ unchanged.
2. $E_a(\text{forward}) - E_a(\text{backward}) = \Delta H$.`,
    derivations: r`**Fraction of effective collisions.** From the Boltzmann distribution, fraction with energy ≥ $E_a$ ≈ $e^{-E_a/RT}$; multiplying by collision frequency gives $k$.`,
    formulas: r`- $k = Ae^{-E_a/RT}$; $\ln k = \ln A - \dfrac{E_a}{RT}$.
- $\log\dfrac{k_2}{k_1} = \dfrac{E_a}{2.303R}\cdot\dfrac{T_2 - T_1}{T_1T_2}$.
- Slope of $\ln k$ vs $1/T$: $-\dfrac{E_a}R$; of $\log k$ vs $1/T$: $-\dfrac{E_a}{2.303R}$.
- $\Delta H = E_{a,f} - E_{a,b}$.
- Catalysed: $\dfrac{k_{\text{cat}}}{k} = e^{(E_a - E_a')/RT}$.
- Temperature coefficient $\mu = \dfrac{k_{T+10}}{k_T}$; rate at $T + n\cdot10$: $\mu^n$ times.`,
    diagrams: r`Energy profile: reactants → activated complex (peak) → products; catalyst lowers the peak.`,
    graphs: r`Maxwell–Boltzmann distribution at two temperatures: the area beyond $E_a$ grows markedly at the higher temperature.`,
    specialCases: r`- If $E_a = 0$, rate is independent of temperature.`,
    exceptions: r`Enzyme reactions slow down above an optimum temperature (denaturation).`,
    assumptions: r`$A$ and $E_a$ constant over the range.`,
    applications: r`Food preservation (refrigeration), industrial catalysis, cooking times at altitude.`,
    patterns: r`- $E_a$ from two rate constants or a graph.
- Effect of catalysts on $E_a$ and rates.
- Energy profile interpretation.`,
    misconceptions: r`- "A catalyst shifts equilibrium." It only speeds up attainment.`,
    traps: r`- Using °C or kJ/J inconsistently.`,
    summary: r`- $k = Ae^{-E_a/RT}$; two-point form with $2.303R$.
- Slope $-E_a/R$; $\Delta H = E_{a,f} - E_{a,b}$.`,
  }),
];
