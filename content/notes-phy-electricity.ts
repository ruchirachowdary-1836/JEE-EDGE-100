import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const PHY_ELECTRICITY_NOTES: NoteSeed[] = [
  note("electric-field", {
    introduction: r`Charges exert forces on each other through electric fields. Coulomb's law and superposition let you find the field of any arrangement of point charges, dipoles and continuous distributions.`,
    prerequisites: r`- Vectors and superposition
- Inverse-square laws`,
    concept: r`A charge modifies the space around it; another charge placed there feels a force. The **field** $\vec E$ is that force per unit positive test charge — a property of the source alone.`,
    theory: r`$F = \frac{1}{4\pi\varepsilon_0}\frac{q_1q_2}{r^2}$, $k = \frac1{4\pi\varepsilon_0} = 9\times10^9\,\text{N m}^2\text{C}^{-2}$. $\vec E = \vec F/q_0$. Fields of several charges add vectorially.

Electric dipole: charges $\pm q$ separated by $2a$, dipole moment $\vec p = q(2\vec a)$ from $-q$ to $+q$.`,
    definitions: r`- **Charge quantisation:** $q = ne$, $e = 1.6\times10^{-19}\,\text{C}$.
- **Field lines:** start on $+$, end on $-$, never cross; density shows field strength.
- **Linear/surface charge density** $\lambda$, $\sigma$.`,
    principles: r`1. Superposition of forces and fields.
2. Charge is conserved and quantised.
3. A dipole in a uniform field feels torque but no net force.`,
    derivations: r`**Dipole on its axis** (distance $r \gg a$ from centre): $E = k\left[\frac{q}{(r-a)^2} - \frac{q}{(r+a)^2}\right] = \frac{k\,4aqr}{(r^2 - a^2)^2} \approx \frac{2kp}{r^3}$.

**Ring on its axis.** Horizontal components cancel; $E = \frac{kQx}{(R^2 + x^2)^{3/2}}$, maximum at $x = R/\sqrt2$.`,
    formulas: r`- Coulomb: $F = \dfrac{kq_1q_2}{r^2}$; in a medium of dielectric constant $K$: $\dfrac{F}{K}$.
- Point charge: $E = \dfrac{kq}{r^2}$.
- Dipole: axis $E = \dfrac{2kp}{r^3}$; equatorial $E = \dfrac{kp}{r^3}$ (opposite to $\vec p$); general $E = \dfrac{kp}{r^3}\sqrt{1 + 3\cos^2\theta}$.
- Torque on dipole $\vec\tau = \vec p\times\vec E$; PE $U = -\vec p\cdot\vec E$; work to rotate from $\theta_1$ to $\theta_2$: $pE(\cos\theta_1 - \cos\theta_2)$.
- Ring on axis: $E = \dfrac{kQx}{(R^2 + x^2)^{3/2}}$; maximum at $x = \dfrac{R}{\sqrt2}$.
- Infinite line: $E = \dfrac{\lambda}{2\pi\varepsilon_0r}$; finite line (perpendicular distance $r$): $E_\perp = \dfrac{k\lambda}{r}(\sin\alpha_1 + \sin\alpha_2)$.
- Infinite sheet: $E = \dfrac{\sigma}{2\varepsilon_0}$; near a conductor surface: $\dfrac\sigma{\varepsilon_0}$.
- Neutral point for like charges $q_1, q_2$ separated by $d$: distance $\dfrac{d}{1 + \sqrt{q_2/q_1}}$ from $q_1$.
- Charged particle in uniform $E$: $a = \dfrac{qE}m$; deflection $y = \dfrac{qEx^2}{2mv^2}$.`,
    diagrams: r`Explore field lines of single charges, dipoles and like charges in the live diagram.`,
    graphs: r`$E$ vs $x$ on a ring's axis rises from zero, peaks at $R/\sqrt2$ and falls as $1/x^2$ far away.`,
    specialCases: r`- Field at the centre of a uniformly charged ring is zero.
- Equal charges at the corners of a regular polygon: field at the centre is zero.`,
    exceptions: r`Dipole formulas $\frac{2kp}{r^3}$ hold only for $r \gg a$.`,
    assumptions: r`Point charges in vacuum unless a medium is specified.`,
    applications: r`Photocopiers, inkjet deflection, electrostatic precipitators.`,
    patterns: r`- Net force/field from several point charges (symmetry first).
- Equilibrium of charges (stable/unstable).
- Dipole in uniform field: torque, energy, oscillation period $2\pi\sqrt{I/pE}$.
- Fields of rings, arcs and line charges.`,
    misconceptions: r`- "Field lines are paths of charges." A charge's path follows field lines only if it starts from rest and the lines are straight.`,
    traps: r`- Vector addition — add components, not magnitudes.
- Direction of the equatorial field (antiparallel to $\vec p$).`,
    summary: r`- $F = kq_1q_2/r^2$; dipole axis $2kp/r^3$, equator $kp/r^3$.
- $\tau = pE\sin\theta$, $U = -pE\cos\theta$.
- Line $\lambda/2\pi\varepsilon_0r$; sheet $\sigma/2\varepsilon_0$.`,
  }, { diagrams: "efield" }),

  note("gausss-law", {
    introduction: r`Gauss's law relates the electric flux through a closed surface to the charge enclosed. With symmetry it gives fields of wires, sheets and spheres in one line.`,
    prerequisites: r`- Electric field
- Surface area of spheres and cylinders`,
    concept: r`Flux counts field lines passing through a surface. Every line from an enclosed charge must cross a closed surface around it, while lines from outside charges enter and leave, contributing zero net flux.`,
    theory: r`$$\oint\vec E\cdot d\vec A = \frac{q_{\text{enc}}}{\varepsilon_0}$$
Choose a Gaussian surface on which $E$ is constant in magnitude and either parallel or perpendicular to $d\vec A$.`,
    definitions: r`- **Electric flux** $\phi = \int\vec E\cdot d\vec A$ (N m²/C).
- **Gaussian surface:** imaginary closed surface chosen for symmetry.`,
    principles: r`1. Net flux depends only on enclosed charge, not on the surface shape or outside charges.
2. Field **at** a point on the surface is due to all charges (inside and outside).
3. Inside a conductor in equilibrium $E = 0$; excess charge resides on the surface.`,
    derivations: r`**Infinite line charge.** Cylinder of radius $r$, length $l$: flux through the curved surface $E\cdot2\pi rl = \frac{\lambda l}{\varepsilon_0} \Rightarrow E = \frac{\lambda}{2\pi\varepsilon_0r}$.

**Solid sphere (uniform $\rho$), inside.** $E\cdot4\pi r^2 = \frac{\rho\frac43\pi r^3}{\varepsilon_0} \Rightarrow E = \frac{\rho r}{3\varepsilon_0} = \frac{kQr}{R^3}$.`,
    formulas: r`- Gauss: $\oint\vec E\cdot d\vec A = \dfrac{q_{\text{enc}}}{\varepsilon_0}$.
- Flux through each face of a cube with a charge at its centre: $\dfrac{q}{6\varepsilon_0}$; charge at a corner: total flux through the cube $\dfrac q{8\varepsilon_0}$.
- Flux of uniform $\vec E$ through a flat area: $EA\cos\theta$.
- Line charge $\dfrac\lambda{2\pi\varepsilon_0r}$; sheet $\dfrac\sigma{2\varepsilon_0}$; two oppositely charged sheets: $\dfrac\sigma{\varepsilon_0}$ between, $0$ outside.
- Shell (radius $R$): $0$ inside, $\dfrac{kQ}{r^2}$ outside.
- Solid sphere: $\dfrac{kQr}{R^3}$ inside, $\dfrac{kQ}{r^2}$ outside.
- Conductor surface: $E = \dfrac\sigma{\varepsilon_0}$; electrostatic pressure $\dfrac{\sigma^2}{2\varepsilon_0}$.`,
    diagrams: r`Draw the Gaussian surface (sphere, cylinder, pillbox) matching the symmetry; label where $\vec E \parallel d\vec A$ and where $\vec E \perp d\vec A$.`,
    graphs: r`$E$ vs $r$: shell — zero then $1/r^2$ (jump at $R$); solid sphere — linear rise then $1/r^2$ (continuous).`,
    specialCases: r`- Cavity inside a conductor (no charge in it): field zero in the cavity.
- Charge $q$ inside a cavity of a neutral conductor: $-q$ on the cavity wall, $+q$ on the outer surface.`,
    exceptions: r`Gauss's law is always true, but it gives the field easily only when symmetry makes $E$ constant on the surface.`,
    assumptions: r`Electrostatic conditions (charges at rest).`,
    applications: r`Electrostatic shielding (Faraday cage), field near charged conductors, capacitors.`,
    patterns: r`- Flux through cube faces and parts of surfaces.
- Field of non-uniform charge distributions ($\rho = kr$).
- Field graphs for shells and spheres.`,
    misconceptions: r`- "Zero flux means zero field." Field can be non-zero with zero net flux.`,
    traps: r`- Including charges outside the surface in $q_{\text{enc}}$.`,
    summary: r`- $\oint\vec E\cdot d\vec A = q_{\text{enc}}/\varepsilon_0$.
- Line $\lambda/2\pi\varepsilon_0r$, sheet $\sigma/2\varepsilon_0$, conductor $\sigma/\varepsilon_0$.
- Shell: 0 inside; solid sphere: $kQr/R^3$ inside.`,
  }),

  note("electric-potential", {
    introduction: r`Electric potential is potential energy per unit charge. As a scalar it is easier to add than fields, and its gradient gives the field.`,
    prerequisites: r`- Electric field
- Work and potential energy`,
    concept: r`Moving a positive charge against the field requires work; that stored energy per coulomb is the potential difference. Charges naturally move from high to low potential energy.`,
    theory: r`$V = \frac{kq}{r}$ (zero at infinity). $\Delta V = -\int\vec E\cdot d\vec l$, $\vec E = -\nabla V$ (in 1D $E = -\frac{dV}{dx}$). Equipotential surfaces are perpendicular to field lines.`,
    definitions: r`- **Potential** $V = U/q$ (volt = J/C).
- **Equipotential surface:** same $V$ everywhere; no work to move along it.
- **Electron-volt:** energy gained by an electron through 1 V.`,
    principles: r`1. Potentials add algebraically (scalar superposition).
2. A conductor in equilibrium is an equipotential.
3. Work by external agent $= q\Delta V$ (no change in KE).`,
    derivations: r`**Dipole potential.** $V = kq\left(\frac1{r_1} - \frac1{r_2}\right) \approx \frac{kq\,2a\cos\theta}{r^2} = \frac{kp\cos\theta}{r^2}$ for $r \gg a$.`,
    formulas: r`- Point charge $V = \dfrac{kq}{r}$; system: $V = \sum\dfrac{kq_i}{r_i}$.
- $\Delta V = -\int\vec E\cdot d\vec l$; uniform field: $V_A - V_B = Ed$ along the field.
- $E = -\dfrac{dV}{dr}$.
- Dipole: $V = \dfrac{kp\cos\theta}{r^2}$; zero on the equatorial line.
- Shell: $V = \dfrac{kQ}R$ inside, $\dfrac{kQ}r$ outside. Solid sphere inside: $V = \dfrac{kQ(3R^2 - r^2)}{2R^3}$.
- Ring on axis: $V = \dfrac{kQ}{\sqrt{R^2 + x^2}}$.
- PE of two charges $U = \dfrac{kq_1q_2}r$; of a system $U = \sum_{\text{pairs}}\dfrac{kq_iq_j}{r_{ij}}$.
- Work $W = q(V_B - V_A)$; speed gained from rest: $\tfrac12mv^2 = qV$.
- Two connected conducting spheres: common $V$, $\dfrac{\sigma_1}{\sigma_2} = \dfrac{R_2}{R_1}$ (charge density larger on the smaller sphere).`,
    diagrams: r`Equipotentials of a point charge: concentric spheres; of a uniform field: parallel planes perpendicular to $\vec E$.`,
    graphs: r`$V$ vs $r$ for a shell: flat inside, $1/r$ outside; slope gives $-E$.`,
    specialCases: r`- $V$ can be zero where $E \ne 0$ (midpoint of a dipole) and $E$ zero where $V \ne 0$ (centre of a ring or shell).`,
    exceptions: r`Potential reference at infinity fails for infinite line/sheet charges; use a finite reference.`,
    assumptions: r`Electrostatics.`,
    applications: r`Accelerators, CRTs, lightning rods (high $\sigma$ at sharp points), Van de Graaff generator.`,
    patterns: r`- Potential and PE of charge configurations; work to assemble.
- $E$ from $V(x, y, z)$.
- Charge redistribution between connected spheres.
- Particle speeds after acceleration through $\Delta V$.`,
    misconceptions: r`- "High potential means large field." Field depends on how fast $V$ changes.`,
    traps: r`- Sign of $q$ in $U = qV$ (electrons have negative charge).`,
    summary: r`- $V = kq/r$; $E = -dV/dr$; $U = kq_1q_2/r$.
- Dipole $V = kp\cos\theta/r^2$; shell constant inside.
- Conductors are equipotentials.`,
  }),

  note("capacitors", {
    introduction: r`A capacitor stores charge and energy in an electric field between conductors. JEE asks about capacitance, combinations, dielectrics and energy changes.`,
    prerequisites: r`- Electric potential and Gauss's law
- Series/parallel reasoning`,
    concept: r`Putting charge $+Q$ and $-Q$ on two plates creates a field and a potential difference $V$ proportional to $Q$. The constant of proportionality $C = Q/V$ depends only on geometry and the material between the plates.`,
    theory: r`Parallel plate: $C = \frac{\varepsilon_0A}{d}$; with dielectric $K$ filling the gap: $KC$. Energy $U = \frac12CV^2 = \frac{Q^2}{2C}$, energy density $\frac12\varepsilon_0E^2$.

Series: $\frac1C = \sum\frac1{C_i}$ (same charge). Parallel: $C = \sum C_i$ (same voltage).`,
    definitions: r`- **Capacitance** $C = Q/V$ (farad).
- **Dielectric constant** $K = \varepsilon/\varepsilon_0$.
- **Dielectric strength:** maximum field before breakdown.`,
    principles: r`1. Battery connected: $V$ fixed. Battery disconnected: $Q$ fixed.
2. Inserting a dielectric reduces the field inside it by $K$.
3. When capacitors share charge, total charge is conserved but energy is lost (as heat/radiation).`,
    derivations: r`**Parallel plate.** Field between plates $E = \frac{\sigma}{\varepsilon_0} = \frac{Q}{\varepsilon_0A}$; $V = Ed = \frac{Qd}{\varepsilon_0A}$; $C = \frac{\varepsilon_0A}d$.

**Energy.** Work to add $dq$ at potential $q/C$: $U = \int_0^Q\frac{q}{C}dq = \frac{Q^2}{2C}$.`,
    formulas: r`- $C = \dfrac QV$; parallel plate $C = \dfrac{K\varepsilon_0A}d$.
- Partially filled slab (thickness $t$, constant $K$): $C = \dfrac{\varepsilon_0A}{d - t + t/K}$; metal slab: $C = \dfrac{\varepsilon_0A}{d - t}$.
- Dielectric side by side (parallel): $C = \dfrac{\varepsilon_0}{d}(K_1A_1 + K_2A_2)$; layered (series): $C = \dfrac{\varepsilon_0A}{d_1/K_1 + d_2/K_2}$.
- Isolated sphere $C = 4\pi\varepsilon_0R$; spherical capacitor $C = 4\pi\varepsilon_0\dfrac{ab}{b - a}$; cylindrical $C = \dfrac{2\pi\varepsilon_0L}{\ln(b/a)}$.
- Series $\dfrac1C = \sum\dfrac1{C_i}$; parallel $C = \sum C_i$.
- Energy $U = \tfrac12CV^2 = \dfrac{Q^2}{2C} = \tfrac12QV$; density $u = \tfrac12\varepsilon_0E^2$.
- Common potential after connecting: $V = \dfrac{C_1V_1 + C_2V_2}{C_1 + C_2}$; energy loss $= \dfrac{C_1C_2}{2(C_1 + C_2)}(V_1 - V_2)^2$.
- Force between plates $F = \dfrac{Q^2}{2\varepsilon_0A}$.
- Charging RC: $q = Q_0(1 - e^{-t/RC})$; discharging $q = Q_0e^{-t/RC}$; time constant $\tau = RC$.`,
    diagrams: r`Field confined between the plates, uniform, pointing from $+$ to $-$; dielectric reduces it by $K$.`,
    graphs: r`Charging: $q$ rises exponentially to $CV$; current decays exponentially. Discharging: both decay with time constant $RC$.`,
    specialCases: r`- Dielectric inserted with battery connected: $Q$, $U$ increase by $K$. Disconnected: $V$, $U$ decrease by $K$.
- Wheatstone-type capacitor networks: balanced bridge ⇒ middle capacitor carries no charge.`,
    exceptions: r`Parallel-plate formula neglects fringing; valid when plate size $\gg d$.`,
    assumptions: r`Linear dielectrics; steady state for DC circuits.`,
    applications: r`Camera flash, power-supply filtering, timing circuits, touch screens.`,
    patterns: r`- Equivalent capacitance of networks (symmetry, bridges).
- Effect of inserting dielectric/metal slab with battery on/off.
- Charge sharing and energy loss.
- RC charging/discharging.`,
    misconceptions: r`- "Energy lost in charge sharing disappears." It becomes heat/radiation in connecting wires.`,
    traps: r`- Series capacitors behave like parallel resistors (and vice versa).
- Forgetting $K$ only applies to the filled part.`,
    summary: r`- $C = K\varepsilon_0A/d$; series $1/C = \sum1/C_i$; parallel $\sum C_i$.
- $U = \frac12CV^2 = Q^2/2C$; density $\frac12\varepsilon_0E^2$.
- Charge sharing loss $\frac{C_1C_2}{2(C_1+C_2)}(V_1-V_2)^2$.`,
  }),

  note("ohms-law-and-resistance", {
    introduction: r`Electric current is the flow of charge. Ohm's law, resistivity and series/parallel combinations form the basis of every circuit problem.`,
    prerequisites: r`- Electric potential
- Basic algebra`,
    concept: r`Free electrons drift slowly opposite to the field, colliding with ions. The steady drift speed is proportional to the field, which gives Ohm's law $V = IR$. Longer, thinner conductors resist more.`,
    theory: r`$I = \frac{dq}{dt} = neAv_d$. Ohm's law $V = IR$; $R = \frac{\rho L}A$; microscopic form $\vec J = \sigma\vec E$.

Resistivity rises with temperature for metals: $\rho_T = \rho_0(1 + \alpha\Delta T)$.`,
    definitions: r`- **Drift velocity** $v_d = \frac{eE\tau}{m}$; **mobility** $\mu = \frac{v_d}{E}$.
- **Current density** $J = I/A$; **conductivity** $\sigma = 1/\rho$.
- **Power** dissipated $P = VI$.`,
    principles: r`1. Series: same current, resistances add. Parallel: same voltage, conductances add.
2. Stretching a wire (volume constant): $R \propto L^2$.`,
    derivations: r`**Ohm's law from drift.** $v_d = \frac{eE\tau}m$ and $I = neAv_d = \frac{ne^2\tau A}{m}\frac VL$, so $R = \frac{m}{ne^2\tau}\frac LA$, i.e. $\rho = \frac{m}{ne^2\tau}$.`,
    formulas: r`- $I = neAv_d$; $v_d = \dfrac{eE\tau}{m}$; $\rho = \dfrac{m}{ne^2\tau}$.
- $V = IR$; $R = \dfrac{\rho L}A$; $J = \sigma E$.
- Temperature: $R_T = R_0(1 + \alpha\Delta T)$.
- Series $R = \sum R_i$; parallel $\dfrac1R = \sum\dfrac1{R_i}$.
- Stretched wire to $n$ times length (same volume): $R' = n^2R$.
- Power $P = VI = I^2R = \dfrac{V^2}R$; energy $= Pt$; $1\,\text{kWh} = 3.6\times10^6\,\text{J}$.
- Bulbs in series: lower-wattage bulb glows brighter; in parallel: higher-wattage bulb glows brighter.
- Colour code: B B R O Y G B V G W = 0–9; gold ±5%, silver ±10%.`,
    diagrams: r`Electrons drifting with random thermal motion superposed on a slow net drift opposite to $\vec E$.`,
    graphs: r`$V$–$I$ for an ohmic conductor is a straight line through the origin (slope $R$); for a bulb filament it curves (R rises with temperature).`,
    specialCases: r`- Equal resistors $R$: $n$ in series $nR$, $n$ in parallel $R/n$.
- Infinite ladders: use self-similarity.`,
    exceptions: r`Semiconductors, diodes and electrolytes are non-ohmic.`,
    assumptions: r`Constant temperature for Ohm's law.`,
    applications: r`Heaters, fuses, wiring design, sensors (thermistors).`,
    patterns: r`- Equivalent resistance (symmetry, Wheatstone, infinite networks).
- Drift velocity calculations.
- Stretching wires, temperature dependence.
- Power ratings of bulbs and appliances.`,
    misconceptions: r`- "Electrons travel at near light speed in wires." Drift speed is ~mm/s; the signal travels fast.`,
    traps: r`- Diameter vs radius in area.
- Rated power applies only at rated voltage.`,
    summary: r`- $I = neAv_d$, $R = \rho L/A$, $\rho = m/ne^2\tau$.
- Series add $R$; parallel add $1/R$.
- $P = I^2R = V^2/R$.`,
  }),

  note("kirchhoffs-laws-and-circuits", {
    introduction: r`Kirchhoff's laws solve any DC network. Cells with internal resistance, the Wheatstone bridge, meter bridge and potentiometer are the standard applications.`,
    prerequisites: r`- Ohm's law
- Solving simultaneous equations`,
    concept: r`Charge does not pile up at junctions (current in = current out), and energy is conserved around any loop (sum of potential changes is zero).`,
    theory: r`**Junction rule:** $\sum I_{\text{in}} = \sum I_{\text{out}}$. **Loop rule:** $\sum\Delta V = 0$ around a closed loop.

Cell of emf $\varepsilon$ and internal resistance $r$: terminal voltage $V = \varepsilon - Ir$ when supplying current.`,
    definitions: r`- **EMF:** work done per unit charge by the cell (open-circuit voltage).
- **Terminal voltage:** potential difference across the cell's terminals.
- **Balanced Wheatstone bridge:** galvanometer current zero.`,
    principles: r`1. Wheatstone bridge balanced when $\frac PQ = \frac RS$.
2. Maximum power transfer when external $R = r$.
3. Potentiometer measures emf without drawing current (null method).`,
    derivations: r`**Cells in parallel (emfs $\varepsilon_1, \varepsilon_2$, resistances $r_1, r_2$).** Equivalent: $\varepsilon_{eq} = \frac{\varepsilon_1r_2 + \varepsilon_2r_1}{r_1 + r_2}$, $r_{eq} = \frac{r_1r_2}{r_1 + r_2}$ — from Kirchhoff's laws on the combination.`,
    formulas: r`- $\sum I = 0$ at a junction; $\sum\Delta V = 0$ round a loop.
- $I = \dfrac{\varepsilon}{R + r}$; $V = \varepsilon - Ir$ (discharging), $V = \varepsilon + Ir$ (charging).
- $n$ cells in series: $I = \dfrac{n\varepsilon}{R + nr}$; $m$ in parallel: $I = \dfrac{\varepsilon}{R + r/m}$; mixed ($n$ series × $m$ parallel): $I = \dfrac{n\varepsilon}{R + nr/m}$, maximum when $R = \dfrac{nr}m$.
- Parallel cells: $\varepsilon_{eq} = \dfrac{\varepsilon_1r_2 + \varepsilon_2r_1}{r_1 + r_2}$, $r_{eq} = \dfrac{r_1r_2}{r_1 + r_2}$.
- Maximum power to load: $P_{\max} = \dfrac{\varepsilon^2}{4r}$ at $R = r$.
- Wheatstone: $\dfrac PQ = \dfrac RS$. Meter bridge: $\dfrac RS = \dfrac{l}{100 - l}$.
- Potentiometer: $\dfrac{\varepsilon_1}{\varepsilon_2} = \dfrac{l_1}{l_2}$; internal resistance $r = R\left(\dfrac{l_1}{l_2} - 1\right)$.
- Ammeter: shunt $S = \dfrac{I_gG}{I - I_g}$. Voltmeter: series $R = \dfrac V{I_g} - G$.`,
    diagrams: r`Wheatstone bridge: four arms $P, Q, R, S$ in a diamond, galvanometer across the middle, battery across the other diagonal.`,
    graphs: r`Terminal voltage vs current for a cell: straight line, intercept $\varepsilon$, slope $-r$.`,
    specialCases: r`- A cell short-circuited: $I = \varepsilon/r$, $V = 0$.
- Balanced bridge: the middle branch can be removed.`,
    exceptions: r`Loop rule assumes no changing magnetic flux through the loop (DC circuits).`,
    assumptions: r`Ideal wires; ideal meters unless their resistance is given.`,
    applications: r`Measuring unknown resistance and emf; designing meters; battery packs.`,
    patterns: r`- Multi-loop networks (choose loop currents).
- Cell combinations for maximum current.
- Meter bridge and potentiometer readings.
- Converting galvanometers into ammeters/voltmeters.`,
    misconceptions: r`- "A battery supplies constant current." It supplies an emf; current depends on the circuit.`,
    traps: r`- Sign conventions when traversing resistors and cells in a loop.`,
    summary: r`- Junction and loop rules; $V = \varepsilon - Ir$.
- Bridge $P/Q = R/S$; meter bridge $l/(100-l)$.
- Max power at $R = r$; shunt $S = I_gG/(I - I_g)$.`,
  }),

  note("biot-savart-and-amp-res-laws", {
    introduction: r`Moving charges (currents) produce magnetic fields. The Biot–Savart law gives the field of any current element; Ampère's law gives fields of symmetric current distributions quickly.`,
    prerequisites: r`- Cross product
- Integration over a line`,
    concept: r`A current element creates a field that circles around it (right-hand rule) and falls off as $1/r^2$. Adding up contributions from all elements gives the field of loops, wires and coils.`,
    theory: r`Biot–Savart: $d\vec B = \frac{\mu_0}{4\pi}\frac{I\,d\vec l\times\hat r}{r^2}$, $\mu_0 = 4\pi\times10^{-7}\,\text{T m A}^{-1}$.

Ampère's circuital law: $\oint\vec B\cdot d\vec l = \mu_0I_{\text{enc}}$.`,
    definitions: r`- **Magnetic field** $B$ (tesla). **Right-hand thumb rule:** thumb along current, fingers curl along $\vec B$.
- **Solenoid:** long coil; **toroid:** solenoid bent into a ring.`,
    principles: r`1. Superposition of magnetic fields.
2. Field lines form closed loops.
3. Ampère's law needs symmetry to extract $B$ (like Gauss's law).`,
    derivations: r`**Circular loop centre.** Every element is perpendicular to $\hat r$ at distance $R$: $B = \frac{\mu_0}{4\pi}\frac{I\cdot2\pi R}{R^2} = \frac{\mu_0I}{2R}$.

**Long solenoid.** Rectangular Amperian loop of length $l$ inside: $Bl = \mu_0nlI \Rightarrow B = \mu_0nI$.`,
    formulas: r`- Biot–Savart: $dB = \dfrac{\mu_0}{4\pi}\dfrac{I\,dl\sin\theta}{r^2}$.
- Finite straight wire: $B = \dfrac{\mu_0I}{4\pi d}(\sin\alpha_1 + \sin\alpha_2)$; infinite: $\dfrac{\mu_0I}{2\pi d}$; semi-infinite (at the end's perpendicular): $\dfrac{\mu_0I}{4\pi d}$.
- Loop centre: $\dfrac{\mu_0I}{2R}$ ($N$ turns: $\times N$); arc of angle $\theta$: $\dfrac{\mu_0I\theta}{4\pi R}$.
- Loop axis: $B = \dfrac{\mu_0IR^2}{2(R^2 + x^2)^{3/2}}$.
- Solenoid: $\mu_0nI$ inside (at the end $\tfrac12\mu_0nI$); toroid: $\dfrac{\mu_0NI}{2\pi r}$ inside, zero outside.
- Ampère: $\oint\vec B\cdot d\vec l = \mu_0I_{\text{enc}}$.
- Thick wire (radius $R$, uniform current): $B = \dfrac{\mu_0Ir}{2\pi R^2}$ inside, $\dfrac{\mu_0I}{2\pi r}$ outside.
- Magnetic moment of a loop $\vec m = NI\vec A$; far field on axis $\dfrac{\mu_0}{4\pi}\dfrac{2m}{x^3}$.`,
    diagrams: r`Field of a straight wire: concentric circles; of a loop: like a bar magnet; of a solenoid: uniform inside, weak outside.`,
    graphs: r`$B$ vs $r$ for a thick wire: rises linearly inside, falls as $1/r$ outside, maximum at the surface.`,
    specialCases: r`- Field at the centre of a square loop of side $a$: $\frac{2\sqrt2\mu_0I}{\pi a}$.
- Points on the line of a straight current: $B = 0$.`,
    exceptions: r`Ampère's law in this form holds for steady currents only.`,
    assumptions: r`Thin wires, steady currents.`,
    applications: r`Electromagnets, MRI coils, relays, motors.`,
    patterns: r`- Field at the centre of combinations of arcs and straight segments.
- Field on the axis of a loop.
- Superposition of fields from parallel wires.
- Solenoid/toroid fields.`,
    misconceptions: r`- "Magnetic field lines start at N and end at S." They form closed loops (inside the magnet S→N).`,
    traps: r`- Direction (into/out of page) for each segment before adding.`,
    summary: r`- Infinite wire $\mu_0I/2\pi d$; loop centre $\mu_0I/2R$; arc $\mu_0I\theta/4\pi R$.
- Solenoid $\mu_0nI$; toroid $\mu_0NI/2\pi r$.
- $\oint\vec B\cdot d\vec l = \mu_0I_{\text{enc}}$.`,
  }),

  note("force-on-moving-charges-and-currents", {
    introduction: r`Magnetic fields push on moving charges and currents. The Lorentz force explains circular orbits of charges, forces between wires, torque on loops and the moving-coil galvanometer.`,
    prerequisites: r`- Magnetic field of currents
- Circular motion`,
    concept: r`The magnetic force is always perpendicular to the velocity, so it changes direction but never speed — magnetic forces do no work. A charge moving perpendicular to a uniform field therefore circles.`,
    theory: r`Lorentz force $\vec F = q(\vec E + \vec v\times\vec B)$. Force on a wire $\vec F = I\vec L\times\vec B$. Torque on a loop $\vec\tau = \vec m\times\vec B$.`,
    definitions: r`- **Cyclotron frequency** $f = \frac{qB}{2\pi m}$ (independent of speed).
- **Pitch** of helical path: distance advanced along $\vec B$ per revolution.
- **Current sensitivity** of a galvanometer $\frac\phi I = \frac{NAB}{k}$.`,
    principles: r`1. Magnetic force does no work.
2. Parallel currents attract; antiparallel repel.
3. Crossed fields with $E = vB$ select velocity (no deflection).`,
    derivations: r`**Radius of circular motion.** $qvB = \frac{mv^2}r \Rightarrow r = \frac{mv}{qB} = \frac{p}{qB} = \frac{\sqrt{2mK}}{qB}$.

**Force between parallel wires.** Wire 1's field at wire 2: $\frac{\mu_0I_1}{2\pi d}$; force per length on wire 2: $\frac{\mu_0I_1I_2}{2\pi d}$.`,
    formulas: r`- $\vec F = q\vec v\times\vec B$, $F = qvB\sin\theta$; Lorentz $\vec F = q(\vec E + \vec v\times\vec B)$.
- Circular motion: $r = \dfrac{mv}{qB}$, $T = \dfrac{2\pi m}{qB}$, $\omega = \dfrac{qB}m$.
- Helix: radius $\dfrac{mv\sin\theta}{qB}$, pitch $\dfrac{2\pi mv\cos\theta}{qB}$.
- Velocity selector: $v = \dfrac EB$.
- Wire: $\vec F = I\vec L\times\vec B$; force between parallel wires per length $\dfrac{\mu_0I_1I_2}{2\pi d}$.
- Loop: $\vec\tau = \vec m\times\vec B$, $\tau = NIAB\sin\theta$; $U = -\vec m\cdot\vec B$.
- Galvanometer: $NIAB = k\phi$; current sensitivity $\dfrac{NAB}k$; voltage sensitivity $\dfrac{NAB}{kG}$.
- Accelerated through $V$ then into $B$: $r = \dfrac1B\sqrt{\dfrac{2mV}q}$.
- Net force on a closed loop in a uniform field is zero.`,
    diagrams: r`Fleming's left-hand rule: First finger Field, seCond finger Current, thuMb Motion (force).`,
    graphs: r`Path of a charge entering a uniform field obliquely: a helix along $\vec B$.`,
    specialCases: r`- Charge moving parallel to $\vec B$: no force, straight line.
- Proton and alpha with the same KE in the same field: $r \propto \frac{\sqrt m}{q}$, equal radii.`,
    exceptions: r`Cyclotron frequency is independent of speed only non-relativistically.`,
    assumptions: r`Uniform fields; non-relativistic speeds.`,
    applications: r`Cyclotrons, mass spectrometers, electric motors, loudspeakers, galvanometers.`,
    patterns: r`- Radius/period of charged particles; comparing particles.
- Helical motion pitch.
- Force on wires and loops; equilibrium of a current-carrying rod.
- Galvanometer sensitivity changes.`,
    misconceptions: r`- "Magnetic force speeds up charges." It does no work.`,
    traps: r`- Sign of charge (electrons curve the opposite way).
- Using diameter instead of radius.`,
    summary: r`- $F = qvB\sin\theta$; $r = mv/qB$; $T = 2\pi m/qB$.
- $F/L = \mu_0I_1I_2/2\pi d$; $\tau = NIAB\sin\theta$.`,
  }),

  note("magnetism-and-matter", {
    introduction: r`Bar magnets behave like magnetic dipoles, and materials respond to magnetic fields as dia-, para- or ferromagnets depending on their atomic structure.`,
    prerequisites: r`- Magnetic moment of current loops
- Electric dipole analogies`,
    concept: r`Each atom acts like a tiny current loop. In diamagnets induced moments oppose the field; in paramagnets permanent moments partly align with it; in ferromagnets domains align strongly and can stay aligned.`,
    theory: r`Bar magnet = dipole of moment $\vec m$ (S to N inside). Field on axis $\frac{\mu_0}{4\pi}\frac{2m}{r^3}$, on equator $\frac{\mu_0}{4\pi}\frac{m}{r^3}$.

Magnetisation $M$, intensity $H$: $B = \mu_0(H + M)$, $M = \chi H$, $\mu_r = 1 + \chi$.`,
    definitions: r`- **Susceptibility** $\chi$: diamagnetic small negative, paramagnetic small positive, ferromagnetic large positive.
- **Curie law** (paramagnets): $\chi = \frac{C}{T}$. **Curie temperature:** above it a ferromagnet becomes paramagnetic.
- **Hysteresis:** lag of $B$ behind $H$; retentivity and coercivity.`,
    principles: r`1. Magnetic dipole in a uniform field: torque $\vec m\times\vec B$, no net force.
2. Isolated magnetic poles do not exist ($\oint\vec B\cdot d\vec A = 0$).`,
    derivations: r`**Oscillation of a magnet in a field.** Restoring torque $-mB\theta$ for small $\theta$; $I\ddot\theta = -mB\theta \Rightarrow T = 2\pi\sqrt{\frac{I}{mB}}$.`,
    formulas: r`- Axial field $\dfrac{\mu_0}{4\pi}\dfrac{2m}{r^3}$; equatorial $\dfrac{\mu_0}{4\pi}\dfrac m{r^3}$ ($r \gg$ magnet length).
- Torque $\vec\tau = \vec m\times\vec B$; $U = -mB\cos\theta$; work to rotate from $0$ to $\theta$: $mB(1 - \cos\theta)$.
- Oscillation period $T = 2\pi\sqrt{\dfrac I{mB}}$.
- $B = \mu_0(H + M)$, $M = \chi H$, $\mu = \mu_0\mu_r$, $\mu_r = 1 + \chi$.
- Curie law $\chi = \dfrac CT$; ferromagnet above Curie temperature: $\chi = \dfrac{C}{T - T_C}$.
- Magnet cut into two equal halves perpendicular to its length: each half has moment $m/2$ (same pole strength, half the length).
- Orbital magnetic moment of an electron: $\mu = \dfrac{evr}2$; Bohr magneton $\dfrac{eh}{4\pi m_e}$.`,
    diagrams: r`Field lines of a bar magnet: out of N, into S outside; closed loops through the magnet.`,
    graphs: r`Hysteresis loop: soft iron — narrow loop (low coercivity, used in transformer cores); steel — wide loop (permanent magnets).`,
    specialCases: r`- Superconductors are perfect diamagnets ($\chi = -1$, Meissner effect).`,
    exceptions: r`$M = \chi H$ is non-linear for ferromagnets (depends on history).`,
    assumptions: r`Dipole approximation far from the magnet.`,
    applications: r`Compass needles, transformer cores, electromagnets, magnetic storage.`,
    patterns: r`- Fields of bar magnets at axial/equatorial points.
- Period of oscillating magnets.
- Classify materials by $\chi$ and temperature behaviour.
- Hysteresis loop interpretation.`,
    misconceptions: r`- "Diamagnets are not magnetic." They are weakly repelled by fields.`,
    traps: r`- Axial vs equatorial factor of 2.`,
    summary: r`- Axis $\frac{\mu_0}{4\pi}\frac{2m}{r^3}$, equator half of it.
- $T = 2\pi\sqrt{I/mB}$; $\mu_r = 1 + \chi$; Curie $\chi = C/T$.`,
  }),
];
