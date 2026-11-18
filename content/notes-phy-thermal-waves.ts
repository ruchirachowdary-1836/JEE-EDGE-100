import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const PHY_THERMAL_WAVES_NOTES: NoteSeed[] = [
  note("first-law-of-thermodynamics", {
    introduction: r`The first law of thermodynamics is energy conservation for systems that exchange heat and work. It governs every process of a gas: isothermal, adiabatic, isobaric and isochoric.`,
    prerequisites: r`- Ideal gas equation $PV = nRT$
- Work as area under a curve`,
    concept: r`Heat supplied to a gas goes partly into raising its internal energy (temperature) and partly into work done as it expands. Internal energy depends only on the state (for an ideal gas, only on temperature); heat and work depend on the path taken.`,
    theory: r`$$\Delta Q = \Delta U + \Delta W, \qquad \Delta W = \int P\,dV$$
Sign convention (NCERT): $\Delta Q > 0$ heat given **to** the system, $\Delta W > 0$ work done **by** the system.

For an ideal gas $\Delta U = nC_V\Delta T$ for **any** process.`,
    definitions: r`- **Isothermal:** $T$ constant. **Adiabatic:** $\Delta Q = 0$. **Isobaric:** $P$ constant. **Isochoric:** $V$ constant.
- **Molar heat capacities** $C_V$, $C_P$; $\gamma = C_P/C_V$.
- **Polytropic process:** $PV^x = $ constant (index $x$).`,
    principles: r`1. $\Delta U$ is path-independent; $Q$ and $W$ are not.
2. In a cyclic process $\Delta U = 0$, so net heat = net work = area enclosed on the $P$–$V$ diagram (clockwise ⇒ positive work).
3. Mayer's relation $C_P - C_V = R$.`,
    derivations: r`**Isothermal work.** $W = \int_{V_1}^{V_2}\frac{nRT}{V}dV = nRT\ln\frac{V_2}{V_1}$.

**Adiabatic relation.** $dQ = 0$: $nC_VdT + P\,dV = 0$. With $PV = nRT$ this integrates to $PV^\gamma = $ constant. Work: $W = \frac{P_1V_1 - P_2V_2}{\gamma - 1} = \frac{nR(T_1 - T_2)}{\gamma - 1}$.`,
    formulas: r`- $\Delta Q = \Delta U + W$; $W = \int P\,dV$ = area under the $P$–$V$ curve.
- $\Delta U = nC_V\Delta T$ (ideal gas, any process); $C_P - C_V = R$; $\gamma = \dfrac{C_P}{C_V}$.
- Isothermal: $W = nRT\ln\dfrac{V_2}{V_1} = nRT\ln\dfrac{P_1}{P_2}$; $\Delta U = 0$; $Q = W$.
- Adiabatic: $PV^\gamma$, $TV^{\gamma-1}$, $P^{1-\gamma}T^\gamma$ constant; $W = \dfrac{nR(T_1 - T_2)}{\gamma - 1}$.
- Isobaric: $W = P\Delta V = nR\Delta T$; $Q = nC_P\Delta T$.
- Isochoric: $W = 0$; $Q = \Delta U = nC_V\Delta T$.
- Polytropic $PV^x = $ constant ($x \ne 1$): $W = \dfrac{nR(T_1 - T_2)}{x - 1}$; molar heat capacity $C = C_V + \dfrac{R}{1 - x}$.
- Slopes on $P$–$V$: isothermal $-\dfrac PV$, adiabatic $-\gamma\dfrac PV$ (steeper).
- Bulk modulus: isothermal $B = P$, adiabatic $B = \gamma P$.`,
    diagrams: r`On a $P$–$V$ diagram, an adiabat through a point is steeper than the isotherm through it.`,
    graphs: r`Work in a cycle = enclosed area; clockwise cycles are engines (net work out), anticlockwise are refrigerators.`,
    specialCases: r`- Free expansion into vacuum: $W = 0$, $Q = 0$, so $\Delta U = 0$ (ideal gas temperature unchanged).
- Mixture of gases: $C_V = \frac{n_1C_{V1} + n_2C_{V2}}{n_1 + n_2}$.`,
    exceptions: r`$\Delta U = nC_V\Delta T$ holds for ideal gases; real gases have internal energy depending on volume too.`,
    assumptions: r`Quasi-static (reversible) processes for $\int P\,dV$ formulas.`,
    applications: r`Engines, compressors, refrigeration, atmospheric processes (adiabatic cooling of rising air).`,
    patterns: r`- Work, heat and $\Delta U$ in multi-step cycles.
- Comparing isothermal and adiabatic processes.
- Final temperature/pressure after adiabatic compression.
- Molar heat capacity of polytropic processes and gas mixtures.`,
    misconceptions: r`- "Adiabatic means temperature constant." Adiabatic means no heat flow; temperature changes.
- "Heat is stored in a body." Internal energy is stored; heat is transfer.`,
    traps: r`- Sign convention for work (by vs on the gas).
- Using $C_P\Delta T$ for $\Delta U$.`,
    summary: r`- $\Delta Q = \Delta U + W$; $\Delta U = nC_V\Delta T$.
- Isothermal $W = nRT\ln(V_2/V_1)$; adiabatic $PV^\gamma$ const, $W = nR\Delta T/(\gamma - 1)$.
- $C_P - C_V = R$.`,
  }),

  note("second-law-and-heat-engines", {
    introduction: r`The second law limits how efficiently heat can be turned into work. No engine can convert all its heat input into work; the Carnot engine sets the upper bound.`,
    prerequisites: r`- First law of thermodynamics
- Isothermal and adiabatic processes`,
    concept: r`Heat flows spontaneously only from hot to cold. An engine exploits this flow, diverting part of it as work, but must always reject some heat to a cold reservoir.`,
    theory: r`Kelvin–Planck: no cyclic process can convert heat completely into work. Clausius: heat cannot flow from cold to hot by itself.

Efficiency $\eta = \frac{W}{Q_1} = 1 - \frac{Q_2}{Q_1}$. For a Carnot engine (two isotherms, two adiabats) $\frac{Q_2}{Q_1} = \frac{T_2}{T_1}$.`,
    definitions: r`- **Heat engine:** takes $Q_1$ from a hot source at $T_1$, does work $W$, rejects $Q_2$ at $T_2$.
- **Refrigerator:** uses work to move heat from cold to hot; coefficient of performance $\beta = \frac{Q_2}{W}$.
- **Reversible process:** can be retraced with no net change in system and surroundings.`,
    principles: r`1. Carnot's theorem: no engine between two temperatures is more efficient than a reversible (Carnot) engine.
2. All reversible engines between the same temperatures have the same efficiency.`,
    derivations: r`**Carnot efficiency.** Isothermal heat: $Q_1 = nRT_1\ln\frac{V_2}{V_1}$, $Q_2 = nRT_2\ln\frac{V_3}{V_4}$. The adiabats give $\frac{V_2}{V_1} = \frac{V_3}{V_4}$, so $\frac{Q_2}{Q_1} = \frac{T_2}{T_1}$ and $\eta = 1 - \frac{T_2}{T_1}$.`,
    formulas: r`- Engine: $W = Q_1 - Q_2$, $\eta = \dfrac{W}{Q_1} = 1 - \dfrac{Q_2}{Q_1}$.
- Carnot: $\eta = 1 - \dfrac{T_2}{T_1}$, $\dfrac{Q_2}{Q_1} = \dfrac{T_2}{T_1}$ — temperatures in kelvin.
- Refrigerator: $\beta = \dfrac{Q_2}{W} = \dfrac{T_2}{T_1 - T_2}$ (Carnot).
- Relation: $\beta = \dfrac{1 - \eta}{\eta}$ for a Carnot engine run in reverse.
- Heat pump COP $= \dfrac{Q_1}{W} = \dfrac{T_1}{T_1 - T_2}$.
- Entropy change (reversible): $\Delta S = \int\dfrac{dQ}{T}$; isothermal $\Delta S = \dfrac QT$.`,
    diagrams: r`Block diagram: hot reservoir → engine → cold reservoir, with work arrow out of the engine.`,
    graphs: r`Carnot cycle on $P$–$V$: two isotherms joined by two steeper adiabats; enclosed area = work per cycle.`,
    specialCases: r`- $\eta = 1$ would need $T_2 = 0\,\text{K}$, which is unattainable.
- Two Carnot engines in series with equal work: the intermediate temperature is $\frac{T_1 + T_2}{2}$; with equal efficiency it is $\sqrt{T_1T_2}$.`,
    exceptions: r`Real engines (Otto, Diesel) have lower efficiency than Carnot because of irreversibilities.`,
    assumptions: r`Reservoirs at fixed temperature; reversible cycle for Carnot formulas.`,
    applications: r`Car engines, power plants, refrigerators, air conditioners.`,
    patterns: r`- Carnot efficiency and heat rejected.
- Refrigerator COP.
- Engines in series.
- Efficiency of a given cycle from its $P$–$V$ diagram.`,
    misconceptions: r`- "A perfect engine is only an engineering challenge." The second law forbids it.`,
    traps: r`- Using Celsius temperatures in $\eta = 1 - T_2/T_1$.`,
    summary: r`- $\eta = 1 - Q_2/Q_1 \le 1 - T_2/T_1$.
- Refrigerator $\beta = T_2/(T_1 - T_2)$.
- Kelvin–Planck and Clausius statements.`,
  }),

  note("kinetic-theory", {
    introduction: r`Kinetic theory explains gas pressure and temperature from the motion of molecules. It links microscopic speeds to macroscopic quantities like $P$, $V$ and $T$.`,
    prerequisites: r`- Momentum and impulse
- Ideal gas equation`,
    concept: r`Pressure is the average force per unit area from countless molecular collisions with the walls. Temperature measures the average translational kinetic energy of the molecules.`,
    theory: r`$PV = \frac13Nm\overline{v^2}$, so $P = \frac13\rho v_{\text{rms}}^2$. Comparing with $PV = Nk_BT$: average translational KE per molecule $= \frac32k_BT$.`,
    definitions: r`- **rms speed** $v_{\text{rms}} = \sqrt{\overline{v^2}}$; **average speed** $\bar v$; **most probable speed** $v_p$.
- **Boltzmann constant** $k_B = R/N_A = 1.38\times10^{-23}\,\text{J K}^{-1}$.`,
    principles: r`Assumptions: large number of identical point molecules, random motion, elastic collisions, no intermolecular forces except during collisions, collision time negligible.`,
    derivations: r`**Pressure.** A molecule with $x$-velocity $v_x$ transfers $2mv_x$ per collision with a wall and hits it every $\frac{2L}{v_x}$ s, giving average force $\frac{mv_x^2}{L}$. Summing and using $\overline{v_x^2} = \frac13\overline{v^2}$: $P = \frac{Nm\overline{v^2}}{3V}$.`,
    formulas: r`- $P = \tfrac13\rho v_{\text{rms}}^2 = \dfrac{Nm\overline{v^2}}{3V}$; $PV = \tfrac23E_{\text{trans}}$.
- $PV = nRT = Nk_BT$.
- $v_{\text{rms}} = \sqrt{\dfrac{3RT}{M}}$, $\bar v = \sqrt{\dfrac{8RT}{\pi M}}$, $v_p = \sqrt{\dfrac{2RT}{M}}$ ($M$ = molar mass in kg/mol); $v_{\text{rms}} > \bar v > v_p$.
- Average translational KE per molecule $= \tfrac32k_BT$; per mole $\tfrac32RT$.
- $v_{\text{rms}} \propto \sqrt{T/M}$.
- Dalton's law: $P = P_1 + P_2 + \dots$.
- Graham's law (effusion): rate $\propto \dfrac1{\sqrt M}$.`,
    diagrams: r`Maxwell speed distribution: a skewed hump; raising $T$ flattens and shifts it to higher speeds, keeping area constant.`,
    graphs: r`$PV$ vs $P$ is a horizontal line for an ideal gas at fixed $T$.`,
    specialCases: r`- At the same $T$, all gases have equal average translational KE per molecule; lighter molecules move faster.`,
    exceptions: r`Real gases deviate at high pressure and low temperature (finite size, intermolecular attraction).`,
    assumptions: r`Ideal gas assumptions listed above.`,
    applications: r`Escape of light gases from planetary atmospheres, isotope separation by diffusion.`,
    patterns: r`- Ratios of rms speeds of gases or at different temperatures.
- Temperature at which a gas has a given rms speed.
- Pressure and energy relations ($E = \frac32PV$ for monatomic gas).`,
    misconceptions: r`- "All molecules move at $v_{\text{rms}}$." There is a distribution of speeds.`,
    traps: r`- Molar mass in g/mol instead of kg/mol.`,
    summary: r`- $P = \frac13\rho v_{\text{rms}}^2$; KE per molecule $\frac32k_BT$.
- $v_{\text{rms}} = \sqrt{3RT/M} > \bar v > v_p$.`,
  }),

  note("degrees-of-freedom", {
    introduction: r`Molecules store energy in translation, rotation and vibration. The law of equipartition shares energy equally among these modes, predicting the specific heats of gases.`,
    prerequisites: r`- Kinetic theory
- First law (molar heat capacities)`,
    concept: r`Each independent way a molecule can store energy quadratically (a **degree of freedom**) gets, on average, $\frac12k_BT$. More degrees of freedom mean more energy needed per kelvin, so larger heat capacity.`,
    theory: r`Monatomic: 3 translational ($f = 3$). Rigid diatomic: 3 translational + 2 rotational ($f = 5$). Non-linear polyatomic rigid: $f = 6$. Vibration (at high $T$) adds 2 per mode (kinetic + potential).

$U = \frac f2nRT$, $C_V = \frac f2R$, $C_P = \left(\frac f2 + 1\right)R$, $\gamma = 1 + \frac2f$.`,
    definitions: r`- **Degree of freedom:** independent coordinate needed to describe the molecule's energy.
- **Mean free path** $\lambda$: average distance between collisions.`,
    principles: r`1. Equipartition: $\frac12k_BT$ per quadratic degree of freedom.
2. Vibrational modes are "frozen" at low temperatures (quantum effect).`,
    derivations: r`**Mean free path.** A molecule of diameter $d$ sweeps a cylinder of cross-section $\pi d^2$; collisions per unit length $= n\pi d^2$. Accounting for relative motion of other molecules adds $\sqrt2$: $\lambda = \frac{1}{\sqrt2\,n\pi d^2}$.`,
    formulas: r`- Energy per molecule $= \dfrac f2k_BT$; per mole $U = \dfrac f2RT$.
- $C_V = \dfrac f2R$, $C_P = \left(\dfrac f2 + 1\right)R$, $\gamma = 1 + \dfrac2f$.
- Monatomic $f = 3$: $C_V = \tfrac32R$, $\gamma = \tfrac53$. Rigid diatomic $f = 5$: $C_V = \tfrac52R$, $\gamma = \tfrac75$. Rigid non-linear polyatomic $f = 6$: $\gamma = \tfrac43$.
- Diatomic with vibration: $f = 7$, $\gamma = \tfrac97$.
- Mixture: $C_V = \dfrac{n_1C_{V1} + n_2C_{V2}}{n_1 + n_2}$, $\gamma_{\text{mix}} = \dfrac{\sum n_iC_{Pi}}{\sum n_iC_{Vi}}$.
- Mean free path $\lambda = \dfrac{1}{\sqrt2\,n\pi d^2} = \dfrac{k_BT}{\sqrt2\pi d^2P}$.
- Solids (Dulong–Petit): $C \approx 3R$.`,
    diagrams: r`Diatomic dumbbell: three translational axes and two rotation axes perpendicular to the bond (rotation about the bond axis contributes negligibly).`,
    graphs: r`$C_V$ of hydrogen vs $T$ shows steps: $\frac32R \to \frac52R \to \frac72R$ as rotation and vibration switch on.`,
    specialCases: r`- $\gamma$ always lies between 1 and $\frac53$ for ideal gases.`,
    exceptions: r`Equipartition fails at low temperatures where quantum effects freeze modes.`,
    assumptions: r`Classical statistics; ideal gas.`,
    applications: r`Speed of sound ($v = \sqrt{\gamma RT/M}$), heat capacity predictions.`,
    patterns: r`- $\gamma$ and $C_V$ for mixtures.
- Internal energy of a gas sample.
- Mean free path dependence on $P$ and $T$.`,
    misconceptions: r`- "Diatomic molecules always have 7 degrees of freedom." Vibration contributes only at high temperature; standard answer is 5.`,
    traps: r`- Averaging $\gamma$ directly for mixtures (wrong); average $C_V$ and $C_P$ by moles.`,
    summary: r`- $C_V = \frac f2R$, $\gamma = 1 + \frac2f$; $f = 3, 5, 6$.
- $\lambda = \frac{1}{\sqrt2 n\pi d^2}$.`,
  }),

  note("wave-motion", {
    introduction: r`A wave transports energy without transporting matter. Mechanical waves on strings and sound in air follow the same mathematics: $y = A\sin(kx - \omega t)$.`,
    prerequisites: r`- Simple harmonic motion
- Trigonometric functions`,
    concept: r`Each particle of the medium oscillates about its mean position; the disturbance (the shape) travels. Particles further along simply start their oscillation later — that delay is the phase $kx$.`,
    theory: r`Progressive wave: $y(x,t) = A\sin(kx - \omega t + \phi)$, speed $v = \frac\omega k = f\lambda$. Transverse waves: particle motion perpendicular to propagation (strings); longitudinal: parallel (sound).

Speed on a string $v = \sqrt{T/\mu}$; sound in a gas $v = \sqrt{\gamma P/\rho}$ (Laplace).`,
    definitions: r`- **Wavelength** $\lambda$, **wave number** $k = 2\pi/\lambda$, **angular frequency** $\omega = 2\pi f$.
- **Intensity:** power per unit area, $I \propto A^2\omega^2$.
- **Doppler effect:** change in observed frequency due to relative motion of source/observer.`,
    principles: r`1. Wave speed depends on the medium, not on the source.
2. Frequency stays the same when a wave passes into another medium; speed and wavelength change.
3. Particle velocity $\frac{\partial y}{\partial t} = -v\frac{\partial y}{\partial x}$ (slope × wave speed).`,
    derivations: r`**Laplace correction.** Newton assumed isothermal compressions ($B = P$) and got $v = \sqrt{P/\rho} \approx 280\,\text{m/s}$, too low. Compressions are adiabatic ($B = \gamma P$), giving $v = \sqrt{\gamma P/\rho} \approx 332\,\text{m/s}$ in air at 0 °C.`,
    formulas: r`- $y = A\sin(kx - \omega t)$; $v = \dfrac\omega k = f\lambda$; $k = \dfrac{2\pi}\lambda$.
- Phase difference $\Delta\phi = \dfrac{2\pi}{\lambda}\Delta x$; time difference $\Delta\phi = \dfrac{2\pi}{T}\Delta t$.
- String: $v = \sqrt{\dfrac T\mu}$ ($\mu$ = mass per unit length).
- Sound: $v = \sqrt{\dfrac B\rho}$; gas $v = \sqrt{\dfrac{\gamma P}\rho} = \sqrt{\dfrac{\gamma RT}M}$; solid rod $\sqrt{\dfrac Y\rho}$; $v \propto \sqrt T$.
- Max particle speed $A\omega$; max particle acceleration $A\omega^2$.
- Intensity $I = 2\pi^2f^2A^2\rho v$; spherical source $I \propto \dfrac1{r^2}$.
- Sound level $\beta = 10\log_{10}\dfrac{I}{I_0}$ dB, $I_0 = 10^{-12}\,\text{W m}^{-2}$.
- Doppler: $f' = f\dfrac{v \pm v_o}{v \mp v_s}$ — upper signs when source and observer approach each other ($v_o$, $v_s$ along the line joining them).`,
    diagrams: r`The live diagram shows a travelling wave and a single particle that only moves up and down.`,
    graphs: r`Snapshot ($y$ vs $x$ at fixed $t$) shows $\lambda$; history ($y$ vs $t$ at fixed $x$) shows $T$.`,
    specialCases: r`- Wave reflected from a fixed end inverts (phase change $\pi$); from a free end it does not.
- Source moving at the speed of sound: shock wave (sonic boom).`,
    exceptions: r`Doppler formula needs velocities relative to the medium; with wind, add wind velocity to $v$.`,
    assumptions: r`Small amplitude, linear medium.`,
    applications: r`Sonar, ultrasound, radar speed guns (Doppler), musical instruments.`,
    patterns: r`- Reading $A, \lambda, f, v$ from a wave equation.
- Speed on strings with given tension and mass.
- Doppler problems with moving source and observer, including reflection from moving walls.
- Decibel calculations.`,
    misconceptions: r`- "Wave speed equals particle speed." Particle speed oscillates; wave speed is constant.`,
    traps: r`- Sign choices in Doppler formula.
- $\mu$ in kg/m (convert from g/m).`,
    summary: r`- $y = A\sin(kx - \omega t)$; $v = f\lambda = \sqrt{T/\mu}$; sound $\sqrt{\gamma P/\rho}$.
- Doppler $f' = f\frac{v \pm v_o}{v \mp v_s}$; dB $= 10\log(I/I_0)$.`,
  }, { diagrams: "wave" }),

  note("superposition-and-standing-waves", {
    introduction: r`When waves overlap, displacements add. Superposition produces interference, standing waves in strings and pipes, and beats — the basis of musical acoustics.`,
    prerequisites: r`- Wave motion
- Sum-to-product trigonometric identities`,
    concept: r`Two identical waves travelling in opposite directions create a pattern that does not travel: points of zero motion (nodes) and maximum motion (antinodes). Only wavelengths that fit the boundaries survive, giving discrete harmonics.`,
    theory: r`$y_1 + y_2 = A\sin(kx - \omega t) + A\sin(kx + \omega t) = 2A\sin kx\cos\omega t$. Nodes where $\sin kx = 0$ ($x = n\lambda/2$).

String fixed at both ends: $L = n\frac\lambda2$, $f_n = \frac{n}{2L}\sqrt{\frac T\mu}$. Open pipe: all harmonics. Closed pipe: odd harmonics only.`,
    definitions: r`- **Node:** zero amplitude. **Antinode:** maximum amplitude. Adjacent node–antinode distance $\lambda/4$.
- **Fundamental:** lowest frequency; **overtones:** higher allowed frequencies.
- **Beats:** periodic loudness variation from two close frequencies.`,
    principles: r`1. Principle of superposition: net displacement = algebraic sum.
2. Constructive interference: path difference $n\lambda$; destructive: $(n + \frac12)\lambda$.
3. Fixed end/closed end = node; free end/open end = antinode.`,
    derivations: r`**Closed pipe.** Node at the closed end, antinode at the open end: $L = (2n - 1)\frac\lambda4$, so $f = \frac{(2n-1)v}{4L}$ — only odd harmonics.

**Beats.** $\sin2\pi f_1t + \sin2\pi f_2t = 2\cos\pi(f_1 - f_2)t\,\sin\pi(f_1 + f_2)t$: loudness peaks $|f_1 - f_2|$ times per second.`,
    formulas: r`- Standing wave $y = 2A\sin kx\cos\omega t$; node spacing $\dfrac\lambda2$.
- String (both ends fixed): $f_n = \dfrac{n}{2L}\sqrt{\dfrac T\mu}$, $n = 1, 2, 3, \dots$ (all harmonics).
- Open pipe: $f_n = \dfrac{nv}{2L}$ (all harmonics). Closed pipe: $f = \dfrac{(2n-1)v}{4L}$ (odd harmonics).
- End correction: open pipe $L + 1.2r$ (≈ $0.6r$ each end), closed pipe $L + 0.6r$.
- Resonance tube: $\lambda = 2(l_2 - l_1)$; end correction $e = \dfrac{l_2 - 3l_1}{2}$.
- Beat frequency $= |f_1 - f_2|$.
- Resultant amplitude of two waves with phase difference $\phi$: $A = \sqrt{A_1^2 + A_2^2 + 2A_1A_2\cos\phi}$; intensity $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\phi$.
- Sonometer laws: $f \propto \dfrac1L$, $f \propto \sqrt T$, $f \propto \dfrac1{\sqrt\mu}$.`,
    diagrams: r`Switch the live diagram to standing mode to see fixed nodes and oscillating antinodes.`,
    graphs: r`Harmonic patterns: string $n = 1, 2, 3$ show 1, 2, 3 loops; closed pipe shows $\frac14, \frac34, \frac54$ of a wavelength.`,
    specialCases: r`- A closed pipe's fundamental is half that of an open pipe of the same length.
- Waxing a tuning fork lowers its frequency; filing raises it.`,
    exceptions: r`Energy is not transported along a standing wave (no net flow), unlike a progressive wave.`,
    assumptions: r`Ideal boundaries, uniform string or air column.`,
    applications: r`Guitars, flutes, organ pipes, tuning instruments using beats.`,
    patterns: r`- Harmonic frequencies of strings and pipes.
- Resonance tube experiments.
- Beats to identify an unknown frequency (with waxing/filing clues).
- Equation of a standing wave: positions of nodes/antinodes.`,
    misconceptions: r`- "Closed pipes have even harmonics." Only odd ones.`,
    traps: r`- Confusing open-pipe and closed-pipe formulas.
- Forgetting end correction when given.`,
    summary: r`- String/open pipe $f_n = nv/2L$; closed pipe $(2n-1)v/4L$.
- Beats $|f_1 - f_2|$; node spacing $\lambda/2$.`,
  }, { diagrams: "wave" }),
];
