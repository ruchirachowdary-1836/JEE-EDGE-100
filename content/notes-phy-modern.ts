import { note, r } from "./note-helpers";
import type { NoteSeed } from "./types";

export const PHY_MODERN_NOTES: NoteSeed[] = [
  note("electromagnetic-induction", {
    introduction: r`A changing magnetic flux induces an emf. Electromagnetic induction powers generators and transformers and is one of JEE's highest-yield electricity topics.`,
    prerequisites: r`- Magnetic field and flux
- Kirchhoff's laws`,
    concept: r`Change the flux through a loop — by moving a magnet, changing current in a nearby coil, or moving the loop — and an emf appears. The induced current always flows so as to **oppose** the change (Lenz's law), which is energy conservation in disguise.`,
    theory: r`Flux $\phi = \int\vec B\cdot d\vec A$. Faraday: $\varepsilon = -\frac{d\phi}{dt}$ ($N$ turns: $-N\frac{d\phi}{dt}$).

Motional emf: a rod of length $l$ moving at $v$ perpendicular to $B$: $\varepsilon = Blv$. Self-inductance $\phi = LI$, $\varepsilon = -L\frac{dI}{dt}$; mutual $\phi_2 = MI_1$.`,
    definitions: r`- **Magnetic flux** (weber). **Self-inductance** $L$ (henry). **Mutual inductance** $M$.
- **Eddy currents:** induced loops in bulk conductors (damping, heating).`,
    principles: r`1. Lenz's law: induced current opposes the cause.
2. Induced charge $Q = \frac{\Delta\phi}{R}$ is independent of how fast the flux changes.
3. Energy stored in an inductor $\frac12LI^2$.`,
    derivations: r`**Motional emf.** Charges in the rod feel $qvB$ along it; equilibrium when $qE = qvB$, so $\varepsilon = El = Blv$.

**Solenoid inductance.** $B = \mu_0nI$, flux through $N = nl$ turns: $\phi = \mu_0n^2AlI \Rightarrow L = \mu_0n^2Al$.

**LR growth.** $\varepsilon = IR + L\frac{dI}{dt} \Rightarrow I = \frac\varepsilon R(1 - e^{-Rt/L})$.`,
    formulas: r`- $\varepsilon = -N\dfrac{d\phi}{dt}$; induced current $I = \dfrac\varepsilon R$; induced charge $Q = \dfrac{N\Delta\phi}R$.
- Motional: $\varepsilon = Blv$ ($\vec v \perp \vec B \perp$ rod); general $\varepsilon = \int(\vec v\times\vec B)\cdot d\vec l$.
- Rotating rod (length $l$, angular speed $\omega$) about one end: $\varepsilon = \tfrac12B\omega l^2$; rotating disc: same with $l = R$.
- Rotating coil: $\varepsilon = NBA\omega\sin\omega t$, peak $NBA\omega$.
- Rod on rails with resistance $R$: force $\dfrac{B^2l^2v}R$; terminal speed (falling) $v_t = \dfrac{mgR}{B^2l^2}$.
- Self-inductance: $\varepsilon = -L\dfrac{dI}{dt}$; solenoid $L = \mu_0n^2Al = \dfrac{\mu_0N^2A}{l}$.
- Mutual: $\varepsilon_2 = -M\dfrac{dI_1}{dt}$; coaxial solenoids $M = \mu_0n_1n_2A_1l$; $M \le \sqrt{L_1L_2}$ ($M = k\sqrt{L_1L_2}$).
- Energy $U = \tfrac12LI^2$; density $\dfrac{B^2}{2\mu_0}$.
- LR circuit: growth $I = I_0(1 - e^{-t/\tau})$, decay $I = I_0e^{-t/\tau}$, $\tau = \dfrac LR$.
- Inductors: series $L_1 + L_2$, parallel $\dfrac{L_1L_2}{L_1 + L_2}$ (no mutual coupling).`,
    diagrams: r`Magnet approaching a coil: the facing end of the coil becomes the same pole (repels) — Lenz's law.`,
    graphs: r`LR current rises like $1 - e^{-t/\tau}$ (63% after one time constant) and decays exponentially when the source is removed.`,
    specialCases: r`- Loop moving through a uniform field entirely inside it: no change of flux, no emf (though each side has motional emf, they cancel).
- Ring dropped through a magnet falls with acceleration less than $g$.`,
    exceptions: r`Kirchhoff's loop rule needs modification (include $-L\,dI/dt$) when changing flux links the circuit.`,
    assumptions: r`Uniform fields unless stated; ideal inductors (no resistance).`,
    applications: r`Generators, transformers, induction cooktops, metal detectors, electromagnetic braking.`,
    patterns: r`- Emf in moving rods, rotating rods and coils.
- Rod on rails: velocity, force, terminal velocity, energy dissipated.
- Induced charge through a coil.
- LR transients; mutual inductance of coaxial coils.`,
    misconceptions: r`- "A strong field means a large emf." Only a **changing** flux induces emf.`,
    traps: r`- Direction of induced current (use Lenz, not guesswork).
- Number of turns $N$ in flux linkage.`,
    summary: r`- $\varepsilon = -N\,d\phi/dt$; $Blv$; $\frac12B\omega l^2$; $NBA\omega$.
- $L = \mu_0n^2Al$, $U = \frac12LI^2$, $\tau = L/R$; $Q = \Delta\phi/R$.`,
  }),

  note("alternating-current", {
    introduction: r`Alternating current reverses direction periodically. Phasors make AC circuits with resistors, inductors and capacitors manageable; resonance, power factor and transformers are core JEE topics.`,
    prerequisites: r`- Electromagnetic induction
- Capacitors and inductors
- Trigonometry and phasors`,
    concept: r`In a resistor voltage and current are in step. In an inductor current lags voltage by $90^\circ$; in a capacitor it leads by $90^\circ$. Represent each voltage as a rotating arrow (phasor) and add them vectorially.`,
    theory: r`$v = V_0\sin\omega t$. Reactances: $X_L = \omega L$, $X_C = \frac1{\omega C}$. Series LCR impedance $Z = \sqrt{R^2 + (X_L - X_C)^2}$, phase $\tan\phi = \frac{X_L - X_C}{R}$.

Average power $P = V_{\text{rms}}I_{\text{rms}}\cos\phi$. Resonance at $\omega_0 = \frac1{\sqrt{LC}}$.`,
    definitions: r`- **RMS value:** DC value giving the same heating; $V_{\text{rms}} = V_0/\sqrt2$ for sinusoids.
- **Power factor** $\cos\phi = R/Z$.
- **Quality factor** $Q = \frac{\omega_0L}{R} = \frac1R\sqrt{\frac LC}$.
- **Wattless current:** component $I\sin\phi$ that does no average work.`,
    principles: r`1. At resonance $X_L = X_C$, $Z = R$ (minimum), current maximum, power factor 1.
2. Pure L or C draws no average power.
3. Ideal transformer: $\frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}$.`,
    derivations: r`**RMS value.** $\overline{I^2} = I_0^2\overline{\sin^2\omega t} = \frac{I_0^2}{2}$, so $I_{\text{rms}} = \frac{I_0}{\sqrt2}$.

**Average power.** $\overline{vi} = V_0I_0\overline{\sin\omega t\sin(\omega t - \phi)} = \frac{V_0I_0}2\cos\phi$.`,
    formulas: r`- $V_{\text{rms}} = \dfrac{V_0}{\sqrt2}$, $I_{\text{rms}} = \dfrac{I_0}{\sqrt2}$; average over half cycle $I_{\text{avg}} = \dfrac{2I_0}\pi$.
- $X_L = \omega L$, $X_C = \dfrac1{\omega C}$.
- Series LCR: $Z = \sqrt{R^2 + (X_L - X_C)^2}$, $\tan\phi = \dfrac{X_L - X_C}R$, $I_0 = \dfrac{V_0}Z$.
- RL: $Z = \sqrt{R^2 + \omega^2L^2}$; RC: $Z = \sqrt{R^2 + \dfrac1{\omega^2C^2}}$.
- Resonance: $\omega_0 = \dfrac1{\sqrt{LC}}$, $f_0 = \dfrac1{2\pi\sqrt{LC}}$; bandwidth $\Delta\omega = \dfrac RL$; $Q = \dfrac{\omega_0}{\Delta\omega} = \dfrac{\omega_0L}R$.
- Power $P = V_{\text{rms}}I_{\text{rms}}\cos\phi = I_{\text{rms}}^2R$; power factor $\cos\phi = \dfrac RZ$.
- LC oscillations: $\omega = \dfrac1{\sqrt{LC}}$; $q = Q_0\cos\omega t$; energy $\dfrac{Q_0^2}{2C} = \tfrac12LI_0^2$.
- Transformer: $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$; efficiency $\eta = \dfrac{P_{\text{out}}}{P_{\text{in}}}$.
- Voltage across L or C at resonance $= Q\times V$ (can exceed the supply).`,
    diagrams: r`Phasor diagram: $V_R$ along $I$, $V_L$ $90^\circ$ ahead, $V_C$ $90^\circ$ behind; supply voltage is the vector sum.`,
    graphs: r`Current vs frequency in series LCR: a resonance peak at $\omega_0$, sharper for smaller $R$ (larger $Q$).`,
    specialCases: r`- At low frequency a capacitor blocks (large $X_C$); at high frequency an inductor blocks.
- Choke coil limits AC current with almost no power loss.`,
    exceptions: r`RMS = peak/√2 only for sinusoidal waveforms (square wave: rms = peak).`,
    assumptions: r`Steady-state sinusoidal operation; ideal components.`,
    applications: r`Radio tuning (resonance), power transmission at high voltage, transformers, chokes.`,
    patterns: r`- Impedance, phase and power in series LCR.
- Resonance frequency, bandwidth, $Q$.
- LC oscillation energy exchange.
- Transformer turns ratios and losses.`,
    misconceptions: r`- "Voltmeter readings across R, L, C add to the supply voltage." They add as phasors, not numbers.`,
    traps: r`- Peak vs rms values in power formulas.
- Using $f$ instead of $\omega$ in reactances.`,
    summary: r`- $Z = \sqrt{R^2 + (X_L - X_C)^2}$, $\tan\phi = (X_L - X_C)/R$.
- $\omega_0 = 1/\sqrt{LC}$; $P = V_{\text{rms}}I_{\text{rms}}\cos\phi$.
- $V_{\text{rms}} = V_0/\sqrt2$.`,
  }),

  note("electromagnetic-waves", {
    introduction: r`Changing electric and magnetic fields sustain each other and travel through space as electromagnetic waves — radio, light, X-rays and gamma rays are all the same phenomenon at different frequencies.`,
    prerequisites: r`- Ampère's and Faraday's laws
- Wave motion`,
    concept: r`Maxwell noticed that a changing electric field acts like a current (displacement current). A changing $E$ creates $B$, a changing $B$ creates $E$, and the pair propagates at $c = \frac1{\sqrt{\mu_0\varepsilon_0}}$.`,
    theory: r`Displacement current $I_d = \varepsilon_0\frac{d\phi_E}{dt}$; Ampère–Maxwell: $\oint\vec B\cdot d\vec l = \mu_0(I + I_d)$.

EM waves are transverse: $\vec E \perp \vec B \perp$ direction of travel, with $E_0 = cB_0$.`,
    definitions: r`- **Intensity** $I = \frac12\varepsilon_0E_0^2c$.
- **Radiation pressure:** $I/c$ for full absorption, $2I/c$ for full reflection.
- **Spectrum:** radio > microwave > infrared > visible > ultraviolet > X-ray > gamma (decreasing wavelength).`,
    principles: r`1. EM waves need no medium.
2. Energy is shared equally between electric and magnetic fields.
3. Accelerated charges radiate EM waves.`,
    derivations: r`**Displacement current in a charging capacitor.** Between the plates $\phi_E = \frac{q}{\varepsilon_0}$, so $\varepsilon_0\frac{d\phi_E}{dt} = \frac{dq}{dt} = I$ — continuity of current is restored.`,
    formulas: r`- $c = \dfrac1{\sqrt{\mu_0\varepsilon_0}} = 3\times10^8\,\text{m/s}$; in a medium $v = \dfrac c{\sqrt{\mu_r\varepsilon_r}}$, $n = \sqrt{\mu_r\varepsilon_r}$.
- $E_0 = cB_0$; $c = f\lambda$.
- $I_d = \varepsilon_0\dfrac{d\phi_E}{dt}$.
- Energy density $u = \tfrac12\varepsilon_0E^2 + \dfrac{B^2}{2\mu_0}$; average $\tfrac12\varepsilon_0E_0^2$.
- Intensity $I = \tfrac12\varepsilon_0cE_0^2 = \dfrac{E_{\text{rms}}^2}{\mu_0c}$; point source $I = \dfrac{P}{4\pi r^2}$.
- Momentum $p = \dfrac Uc$; radiation pressure $\dfrac Ic$ (absorbed), $\dfrac{2I}c$ (reflected).
- Poynting vector $\vec S = \dfrac1{\mu_0}\vec E\times\vec B$ (direction of propagation).`,
    diagrams: r`Sketch $\vec E$ oscillating in one plane, $\vec B$ in the perpendicular plane, both in phase, wave travelling along $\vec E\times\vec B$.`,
    graphs: r`Spectrum chart with approximate wavelengths: radio (> 0.1 m), microwave (mm–0.1 m), IR (700 nm–1 mm), visible (400–700 nm), UV (10–400 nm), X-ray (0.01–10 nm), gamma (< 0.01 nm).`,
    specialCases: r`- UV is absorbed by ozone; IR is felt as heat; microwaves heat water molecules.`,
    exceptions: r`$E_0 = cB_0$ holds in vacuum; in a medium use $v$.`,
    assumptions: r`Plane waves in linear media.`,
    applications: r`Communication (radio, microwave), medical imaging (X-ray), remote sensing (IR), sterilisation (UV).`,
    patterns: r`- Find $B_0$ from $E_0$ and direction of propagation from the wave equation.
- Intensity and energy density; radiation pressure/force.
- Order and uses of the EM spectrum.
- Displacement current in capacitors.`,
    misconceptions: r`- "Magnetic energy is smaller because $B$ is small." Energy densities are equal.`,
    traps: r`- Peak vs rms fields in intensity.`,
    summary: r`- $c = 1/\sqrt{\mu_0\varepsilon_0}$, $E_0 = cB_0$, transverse.
- $I = \frac12\varepsilon_0cE_0^2$; pressure $I/c$ or $2I/c$.
- $I_d = \varepsilon_0\,d\phi_E/dt$.`,
  }),

  note("ray-optics", {
    introduction: r`Ray optics treats light as straight rays that reflect and refract. Mirror and lens formulas, total internal reflection, prisms and optical instruments are tested in nearly every JEE paper.`,
    prerequisites: r`- Geometry of similar triangles
- Sign conventions`,
    concept: r`Light takes paths obeying simple laws: angle of incidence equals angle of reflection; at a boundary, $n_1\sin i = n_2\sin r$. Images form where rays (or their extensions) meet.`,
    theory: r`Cartesian sign convention: distances measured from the pole/optical centre, positive along incident light direction; heights up positive.

Mirror: $\frac1v + \frac1u = \frac1f$, $f = \frac R2$. Lens: $\frac1v - \frac1u = \frac1f$, lens maker $\frac1f = (n - 1)\left(\frac1{R_1} - \frac1{R_2}\right)$.`,
    definitions: r`- **Refractive index** $n = c/v$.
- **Critical angle** $C$: $\sin C = \frac{n_2}{n_1}$ (from denser to rarer).
- **Power** of a lens $P = \frac1f$ (dioptre, $f$ in metres).
- **Dispersion:** variation of $n$ with wavelength.`,
    principles: r`1. Total internal reflection when going denser → rarer with $i > C$.
2. Lenses in contact: powers add.
3. Prism: minimum deviation when the ray passes symmetrically.`,
    derivations: r`**Prism formula.** At minimum deviation $r_1 = r_2 = A/2$ and $i = e$; $A + \delta_m = 2i$. Snell: $n = \frac{\sin\frac{A + \delta_m}2}{\sin\frac A2}$.

**Apparent depth.** For near-normal viewing, $\tan$ ≈ $\sin$, giving apparent depth $= \frac{\text{real depth}}{n}$.`,
    formulas: r`- Mirror: $\dfrac1v + \dfrac1u = \dfrac1f$, $f = \dfrac R2$, $m = -\dfrac vu$.
- Lens: $\dfrac1v - \dfrac1u = \dfrac1f$, $m = \dfrac vu$; lens maker $\dfrac1f = (n - 1)\left(\dfrac1{R_1} - \dfrac1{R_2}\right)$ (in a medium use $\frac{n_{\text{lens}}}{n_{\text{medium}}} - 1$).
- Refraction at a spherical surface: $\dfrac{n_2}v - \dfrac{n_1}u = \dfrac{n_2 - n_1}R$.
- Snell: $n_1\sin i = n_2\sin r$; critical angle $\sin C = \dfrac1n$ (to air).
- Apparent depth $= \dfrac{\text{real}}{n}$; normal shift $t\left(1 - \dfrac1n\right)$ for a slab.
- Lenses in contact $P = P_1 + P_2$; separated by $d$: $\dfrac1F = \dfrac1{f_1} + \dfrac1{f_2} - \dfrac d{f_1f_2}$.
- Prism: $A = r_1 + r_2$, $\delta = i + e - A$, $n = \dfrac{\sin\frac{A + \delta_m}2}{\sin\frac A2}$; thin prism $\delta = (n - 1)A$.
- Dispersive power $\omega = \dfrac{n_v - n_r}{n_y - 1}$; achromatic pair $\dfrac{\omega_1}{f_1} + \dfrac{\omega_2}{f_2} = 0$.
- Microscope: $m = \dfrac{L}{f_o}\left(1 + \dfrac D{f_e}\right)$ (near point) or $\dfrac{L}{f_o}\dfrac D{f_e}$ (normal); telescope $m = \dfrac{f_o}{f_e}$, length $f_o + f_e$ (normal adjustment).
- Simple magnifier $m = 1 + \dfrac D{f}$ ($D = 25$ cm).
- Minimum distance between object and real image for a convex lens: $4f$; displacement method $f = \dfrac{D^2 - d^2}{4D}$.
- Plane mirror rotated by $\theta$: reflected ray turns by $2\theta$. Silvered lens: $\dfrac1F = \dfrac2{f_l} + \dfrac1{f_m}$.`,
    diagrams: r`Use the live convex-lens diagram: move the object and watch the image switch from real/inverted to virtual/upright inside $F$.`,
    graphs: r`$\delta$ vs $i$ for a prism: U-shaped curve with minimum $\delta_m$; $1/v$ vs $1/u$ for a lens: straight line of slope 1.`,
    specialCases: r`- Object at $2f$: image at $2f$, same size, inverted.
- Convex mirror and concave lens always form virtual, diminished, upright images of real objects.
- Lens immersed in a liquid of the same $n$ acts as a plane sheet.`,
    exceptions: r`Thin-lens and paraxial formulas fail for wide-angle rays (spherical aberration).`,
    assumptions: r`Paraxial rays, thin lenses, Cartesian sign convention.`,
    applications: r`Optical fibres (TIR), spectacles, cameras, microscopes, telescopes, mirages.`,
    patterns: r`- Image position/size with sign conventions.
- Lens maker's formula including immersion in liquids.
- Combinations and silvered lenses.
- Prism minimum deviation; TIR and critical angle.
- Magnification of instruments.`,
    misconceptions: r`- "A larger lens gives a larger image." Size affects brightness, not image size.
- "Half a lens forms half an image." The full image forms, dimmer.`,
    traps: r`- Sign of $u$ (always negative for real objects in Cartesian convention).
- Mirror ($+$) vs lens ($-$) formula sign.`,
    summary: r`- Mirror $\frac1v + \frac1u = \frac1f$; lens $\frac1v - \frac1u = \frac1f$.
- Lens maker; $\sin C = 1/n$; prism $n = \frac{\sin((A+\delta_m)/2)}{\sin(A/2)}$.
- $P = P_1 + P_2$; telescope $f_o/f_e$.`,
  }, { diagrams: "lens" }),

  note("wave-optics", {
    introduction: r`Wave optics explains effects rays cannot: interference fringes, diffraction around edges and polarisation. Young's double-slit experiment is a JEE favourite.`,
    prerequisites: r`- Superposition of waves
- Path difference and phase difference`,
    concept: r`Light from two coherent sources overlaps; where crests meet crests the screen is bright, where crests meet troughs it is dark. The pattern spacing depends on wavelength, slit separation and screen distance.`,
    theory: r`Path difference $\Delta = d\sin\theta \approx \frac{yd}{D}$. Bright: $\Delta = n\lambda$; dark: $(n + \frac12)\lambda$. Fringe width $\beta = \frac{\lambda D}{d}$.

Single slit width $a$: minima at $a\sin\theta = n\lambda$; central maximum width $\frac{2\lambda D}{a}$.

Polarisation: Malus $I = I_0\cos^2\theta$; Brewster $\tan\theta_B = n$.`,
    definitions: r`- **Coherent sources:** constant phase difference.
- **Wavefront:** surface of constant phase (Huygens: every point is a source of secondary wavelets).
- **Resolving power:** ability to separate close objects.`,
    principles: r`1. Phase difference $\phi = \frac{2\pi}\lambda\Delta$.
2. $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\phi$.
3. Energy is redistributed, not lost, in interference.`,
    derivations: r`**Fringe width.** Bright fringes at $y_n = \frac{n\lambda D}{d}$; spacing $y_{n+1} - y_n = \frac{\lambda D}{d}$.

**Shift due to a thin sheet.** A sheet of thickness $t$ and index $\mu$ adds optical path $(\mu - 1)t$; the pattern shifts by $\frac{(\mu - 1)tD}{d}$ toward that slit.`,
    formulas: r`- $\beta = \dfrac{\lambda D}d$; $y_n = \dfrac{n\lambda D}d$ (bright), $\left(n + \tfrac12\right)\dfrac{\lambda D}d$ (dark).
- $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\phi$; equal intensities $I = 4I_0\cos^2\dfrac\phi2$.
- $I_{\max} = (\sqrt{I_1} + \sqrt{I_2})^2$, $I_{\min} = (\sqrt{I_1} - \sqrt{I_2})^2$.
- Fringe shift with sheet: $\dfrac{(\mu - 1)tD}{d}$; in a medium of index $\mu$: $\beta' = \dfrac\beta\mu$.
- Single slit: minima $a\sin\theta = n\lambda$; central max angular width $\dfrac{2\lambda}a$, linear $\dfrac{2\lambda D}a$.
- Resolving limit: telescope $\theta = \dfrac{1.22\lambda}{D}$; microscope resolving power $\dfrac{2\mu\sin\theta}{1.22\lambda}$.
- Malus: $I = I_0\cos^2\theta$; unpolarised through a polariser: $\dfrac{I_0}2$.
- Brewster: $\tan\theta_B = \mu$; reflected and refracted rays perpendicular.
- Fresnel distance $z_F = \dfrac{a^2}\lambda$.`,
    diagrams: r`Double-slit geometry: slits $S_1, S_2$ a distance $d$ apart, screen at $D$; path difference $S_2P - S_1P \approx d\sin\theta$.`,
    graphs: r`YDSE intensity: equally bright fringes ($\cos^2$); single slit: bright central maximum with fainter, narrower side maxima.`,
    specialCases: r`- White light YDSE: central fringe white, coloured fringes on either side.
- Moving the whole apparatus into water reduces fringe width by $\mu$.`,
    exceptions: r`$\beta = \lambda D/d$ assumes small angles ($D \gg d$).`,
    assumptions: r`Monochromatic coherent sources; far-field (Fraunhofer) diffraction.`,
    applications: r`Thin-film colours, anti-reflection coatings, polaroid sunglasses, resolving power of instruments.`,
    patterns: r`- Fringe width and positions; coincidence of fringes of two wavelengths.
- Shift by a thin sheet; intensity at a point.
- Single-slit widths; resolving power.
- Malus's law with multiple polarisers; Brewster angle.`,
    misconceptions: r`- "Dark fringes destroy energy." Energy moves to bright fringes.`,
    traps: r`- Central maximum of a single slit is twice the width of others.
- Unpolarised light: first polariser halves intensity before Malus applies.`,
    summary: r`- $\beta = \lambda D/d$; shift $(\mu - 1)tD/d$.
- Single slit minima $a\sin\theta = n\lambda$; central width $2\lambda D/a$.
- Malus $I_0\cos^2\theta$; Brewster $\tan\theta_B = \mu$.`,
  }, { diagrams: "wave" }),

  note("photoelectric-effect", {
    introduction: r`Light can knock electrons out of a metal — but only if its frequency is high enough, regardless of intensity. Einstein explained this with photons, proving light's particle nature.`,
    prerequisites: r`- Energy and electron-volt
- Electric potential`,
    concept: r`Light comes in packets (photons) of energy $hf$. One photon gives all its energy to one electron. If $hf$ is less than the work function, no electron escapes no matter how many photons arrive.`,
    theory: r`Einstein's equation: $K_{\max} = hf - \phi_0 = eV_0$. Threshold frequency $f_0 = \phi_0/h$.

Intensity affects the number of photoelectrons (current), not their maximum energy.`,
    definitions: r`- **Work function** $\phi_0$: minimum energy to remove an electron.
- **Stopping potential** $V_0$: reverse voltage that stops the most energetic electrons.
- **Saturation current:** all emitted electrons collected.`,
    principles: r`1. Emission is instantaneous (no time lag).
2. $K_{\max}$ increases linearly with frequency, independent of intensity.
3. Photocurrent ∝ intensity (above threshold).`,
    derivations: r`**Graph of $V_0$ vs $f$.** $eV_0 = hf - \phi_0 \Rightarrow V_0 = \frac{h}{e}f - \frac{\phi_0}e$: a straight line of slope $h/e$ (same for all metals), intercept $f_0$ on the frequency axis.`,
    formulas: r`- Photon: $E = hf = \dfrac{hc}\lambda$; $E(\text{eV}) = \dfrac{1240}{\lambda(\text{nm})}$; momentum $p = \dfrac h\lambda$.
- Einstein: $K_{\max} = hf - \phi_0 = eV_0$; threshold $f_0 = \dfrac{\phi_0}h$, $\lambda_0 = \dfrac{hc}{\phi_0}$.
- $V_0 = \dfrac hef - \dfrac{\phi_0}e$ (slope $h/e$).
- Number of photons per second $= \dfrac{P}{hf} = \dfrac{P\lambda}{hc}$.
- Radiation force on a surface: $\dfrac Pc$ (absorbed), $\dfrac{2P}c$ (reflected).
- Maximum speed $v_{\max} = \sqrt{\dfrac{2(hf - \phi_0)}m}$.`,
    diagrams: r`Photocell: light on the emitter, collector at variable potential; ammeter measures photocurrent.`,
    graphs: r`- $I$ vs $V$: saturation current rises with intensity; all curves meet at the same $-V_0$ for one frequency.
- Higher frequency: same saturation (for equal photon flux) but larger stopping potential.
- $V_0$ vs $f$: parallel lines for different metals.`,
    specialCases: r`- Below threshold, increasing intensity produces no emission.`,
    exceptions: r`Wave theory predicted energy ∝ intensity and a time lag — both contradicted by experiment.`,
    assumptions: r`One photon interacts with one electron.`,
    applications: r`Solar cells, light meters, photomultiplier tubes, automatic doors.`,
    patterns: r`- Stopping potential and threshold from given wavelengths.
- Graph interpretation ($I$–$V$, $V_0$–$f$).
- Photon flux and radiation pressure from power.`,
    misconceptions: r`- "Brighter light gives faster electrons." It gives more electrons.`,
    traps: r`- Converting eV and J; nm to m.`,
    summary: r`- $K_{\max} = hf - \phi_0 = eV_0$; slope $h/e$.
- $E(\text{eV}) = 1240/\lambda(\text{nm})$; intensity → current only.`,
  }),

  note("matter-waves", {
    introduction: r`De Broglie proposed that matter also behaves as a wave, with wavelength $\lambda = h/p$. Electron diffraction confirmed it and laid the foundation of quantum mechanics.`,
    prerequisites: r`- Photoelectric effect
- Momentum and kinetic energy`,
    concept: r`If light (a wave) can act like particles, particles may act like waves. The wavelength is tiny for everyday objects but measurable for electrons, which is why electron microscopes resolve so finely.`,
    theory: r`$\lambda = \frac hp = \frac{h}{mv} = \frac{h}{\sqrt{2mK}}$. For an electron accelerated through $V$: $\lambda = \frac{h}{\sqrt{2meV}} \approx \frac{1.227}{\sqrt V}$ nm.

Davisson–Germer: electrons scattered from nickel show a diffraction peak at 54 V matching $\lambda = h/p$.`,
    definitions: r`- **De Broglie wavelength:** wavelength associated with a moving particle.
- **Heisenberg uncertainty:** $\Delta x\,\Delta p \ge \frac{h}{4\pi}$.`,
    principles: r`1. Wave–particle duality applies to all matter.
2. Bohr's quantisation follows from fitting whole wavelengths in an orbit: $2\pi r = n\lambda$.`,
    derivations: r`**Thermal neutron wavelength.** $K = \frac32k_BT$: $\lambda = \frac{h}{\sqrt{3mk_BT}}$.`,
    formulas: r`- $\lambda = \dfrac hp = \dfrac h{mv} = \dfrac h{\sqrt{2mK}}$.
- Charged particle through potential $V$: $\lambda = \dfrac h{\sqrt{2mqV}}$; electron $\lambda \approx \dfrac{1.227}{\sqrt V}$ nm; proton $\approx \dfrac{0.0286}{\sqrt V}$ nm.
- Thermal particles: $\lambda = \dfrac h{\sqrt{3mk_BT}}$.
- Same KE: $\lambda \propto \dfrac1{\sqrt m}$; same momentum: equal $\lambda$.
- Photon vs electron of the same wavelength: photon energy $\dfrac{hc}\lambda$, electron KE $\dfrac{h^2}{2m\lambda^2}$.
- Uncertainty: $\Delta x\,\Delta p \ge \dfrac h{4\pi}$.
- Bohr orbit: $2\pi r_n = n\lambda$.`,
    diagrams: r`Standing de Broglie wave around a Bohr orbit: an integer number of wavelengths fits the circumference.`,
    graphs: r`$\lambda$ vs $V$ for electrons falls as $1/\sqrt V$; $\lambda$ vs $p$ is a rectangular hyperbola.`,
    specialCases: r`- A cricket ball's wavelength (~$10^{-34}$ m) is unobservable.`,
    exceptions: r`Non-relativistic formula fails for electrons accelerated through very high voltages.`,
    assumptions: r`Non-relativistic speeds.`,
    applications: r`Electron microscopes, neutron diffraction for crystal structures.`,
    patterns: r`- Wavelength ratios for particles with equal KE, momentum or accelerating voltage.
- Electron through $V$ volts.
- Link to Bohr's orbits.`,
    misconceptions: r`- "Matter waves are EM waves." They are probability waves, not electromagnetic.`,
    traps: r`- Use charge $q$ ($2e$ for alpha) and mass correctly.`,
    summary: r`- $\lambda = h/p = h/\sqrt{2mK} = h/\sqrt{2mqV}$; electron $1.227/\sqrt V$ nm.
- $\Delta x\Delta p \ge h/4\pi$.`,
  }),

  note("atomic-models-and-spectra", {
    introduction: r`Rutherford's scattering experiment revealed a tiny nucleus; Bohr's model then explained hydrogen's spectral lines. Physics questions focus on energy levels, transitions and recoil.`,
    prerequisites: r`- Coulomb's law
- Photon energy`,
    concept: r`Most alpha particles pass straight through gold foil; a few bounce back. So the atom is mostly empty with its positive charge and mass concentrated in a nucleus. Bohr then quantised electron orbits to explain discrete spectra.`,
    theory: r`Distance of closest approach (head-on): $r_0 = \frac{2kZe^2}{K}$. Bohr: $E_n = -\frac{13.6Z^2}{n^2}$ eV, $r_n = 0.529\frac{n^2}{Z}$ Å, $v_n = \frac{2.18\times10^6Z}{n}$ m/s.

Spectral series: Lyman (UV), Balmer (visible), Paschen, Brackett, Pfund (IR).`,
    definitions: r`- **Impact parameter** $b$: perpendicular distance of the alpha's initial path from the nucleus.
- **Excitation/ionisation potential:** energies to excite/remove the electron, per unit charge.`,
    principles: r`1. Angular momentum quantised: $mvr = \frac{nh}{2\pi}$.
2. Photon energy = difference of levels.`,
    derivations: r`**Closest approach.** All KE converts to PE at turning point: $K = \frac{k(2e)(Ze)}{r_0}$.

**Recoil of the atom.** Emitting a photon of momentum $\frac{E}{c}$ gives the atom speed $v = \frac{E}{mc}$.`,
    formulas: r`- Closest approach $r_0 = \dfrac{2kZe^2}{K}$; impact parameter $b = \dfrac{kZe^2\cot(\theta/2)}{K}$.
- $E_n = -\dfrac{13.6Z^2}{n^2}$ eV; $r_n = 0.529\dfrac{n^2}Z$ Å; $v_n = \dfrac{c}{137}\dfrac Zn$.
- Frequency of revolution $\propto \dfrac{Z^2}{n^3}$; time period $\propto \dfrac{n^3}{Z^2}$.
- $\dfrac1\lambda = RZ^2\left(\dfrac1{n_1^2} - \dfrac1{n_2^2}\right)$, $R = 1.097\times10^7\,\text{m}^{-1}$.
- Number of lines from level $n$: $\dfrac{n(n-1)}2$.
- Recoil speed $v = \dfrac{\Delta E}{mc}$.
- Reduced mass correction: $E \propto \mu = \dfrac{mM}{m + M}$ (e.g. positronium, muonic atoms).
- Characteristic X-rays (Moseley): $\sqrt f \propto (Z - 1)$ for $K_\alpha$; cut-off $\lambda_{\min} = \dfrac{hc}{eV}$.`,
    diagrams: r`Energy level diagram with arrows for Lyman, Balmer and Paschen transitions — explore it in the Bohr lesson.`,
    graphs: r`Number of scattered alphas vs angle falls steeply ($\propto 1/\sin^4(\theta/2)$).`,
    specialCases: r`- Current due to the orbiting electron $I = \frac{ev}{2\pi r}$; magnetic moment $\frac{evr}{2}$.`,
    exceptions: r`Bohr model is limited to one-electron species.`,
    assumptions: r`Infinitely heavy nucleus unless reduced mass is asked.`,
    applications: r`Spectroscopy, lasers, X-ray tubes.`,
    patterns: r`- Ratios of $r$, $v$, $E$, $T$ for levels and ions.
- Wavelengths of series lines; recoil speed.
- Closest approach in alpha scattering.
- X-ray cut-off and Moseley's law.`,
    misconceptions: r`- "Electron energy increases with $n$ as it becomes more negative." It becomes less negative.`,
    traps: r`- $Z^2$ factor; using reduced mass when needed.`,
    summary: r`- $E_n = -13.6Z^2/n^2$ eV; $r_0 = 2kZe^2/K$.
- $1/\lambda = RZ^2(1/n_1^2 - 1/n_2^2)$; X-ray $\lambda_{\min} = hc/eV$.`,
  }, { diagrams: "bohr" }),

  note("nuclei", {
    introduction: r`The nucleus holds protons and neutrons together through the strong force. Mass defect, binding energy, radioactive decay and nuclear reactions are high-scoring JEE topics.`,
    prerequisites: r`- Mass–energy equivalence
- Exponential functions`,
    concept: r`A nucleus weighs less than its separate nucleons: the missing mass became binding energy ($E = mc^2$). Unstable nuclei decay randomly; for many nuclei this randomness gives a precise exponential law.`,
    theory: r`Radius $R = R_0A^{1/3}$ ($R_0 \approx 1.2$ fm), so density is nearly constant. Mass defect $\Delta m = Zm_p + (A - Z)m_n - M$; binding energy $\Delta m\,c^2$ ($1\,\text{u} = 931.5$ MeV).

Decay law $N = N_0e^{-\lambda t}$, half-life $\frac{\ln2}{\lambda}$.`,
    definitions: r`- **Isotopes:** same $Z$; **isobars:** same $A$; **isotones:** same $N$.
- **Activity** $A = \lambda N$ (becquerel; 1 Ci $= 3.7\times10^{10}$ Bq).
- **Q-value:** energy released in a reaction.`,
    principles: r`1. Binding energy per nucleon peaks near iron ($A \approx 56$): fusion of light and fission of heavy nuclei release energy.
2. Conservation of charge, nucleon number, energy and momentum in reactions.`,
    derivations: r`**Mean life.** $\tau = \frac{\int t\,dN}{N_0} = \frac1\lambda$, so $\tau = \frac{t_{1/2}}{0.693} = 1.44\,t_{1/2}$.`,
    formulas: r`- $R = R_0A^{1/3}$; nuclear density ≈ $2.3\times10^{17}\,\text{kg/m}^3$ (independent of $A$).
- $\Delta m = Zm_p + (A - Z)m_n - M_{\text{nucleus}}$; $BE = \Delta m\times931.5$ MeV/u.
- $N = N_0e^{-\lambda t} = N_0\left(\tfrac12\right)^{t/t_{1/2}}$; $t_{1/2} = \dfrac{0.693}\lambda$; $\tau = \dfrac1\lambda$.
- Activity $A = \lambda N = A_0e^{-\lambda t}$.
- Q-value $= (\text{mass of reactants} - \text{mass of products})c^2$; positive ⇒ exothermic.
- Alpha decay: $^A_ZX \to {}^{A-4}_{Z-2}Y + \alpha$; KE of alpha $= \dfrac{A - 4}{A}Q$.
- Beta-minus: $n \to p + e^- + \bar\nu$ ($Z$ up by 1); beta-plus: $p \to n + e^+ + \nu$; gamma: no change in $A$, $Z$.
- Number of α and β decays: $n_\alpha = \dfrac{\Delta A}4$, $n_\beta = 2n_\alpha - \Delta Z$.
- Parallel decay: $\lambda = \lambda_1 + \lambda_2$. Successive decay at secular equilibrium: $\lambda_1N_1 = \lambda_2N_2$.`,
    diagrams: r`BE/A vs A curve: sharp rise for light nuclei, broad peak at Fe (~8.8 MeV), slow fall for heavy nuclei.`,
    graphs: r`$N$ vs $t$: exponential decay; $\ln N$ vs $t$: straight line of slope $-\lambda$.`,
    specialCases: r`- After $n$ half-lives, fraction left $= 2^{-n}$.
- Fusion in stars: hydrogen → helium (~26.7 MeV per cycle).`,
    exceptions: r`Decay of a single nucleus is random; the law holds statistically for large $N$.`,
    assumptions: r`Masses in atomic mass units including electrons where atomic masses are used consistently.`,
    applications: r`Nuclear reactors (fission), carbon dating, medical tracers, stellar energy.`,
    patterns: r`- Binding energy and Q-value calculations.
- Half-life, activity, mean life.
- Counting α and β emissions in decay chains.
- Energy sharing in alpha decay.`,
    misconceptions: r`- "Half-life means half the time to decay completely." Decay never completes in finite time.`,
    traps: r`- Atomic vs nuclear masses; MeV conversions.`,
    summary: r`- $R = R_0A^{1/3}$; $BE = \Delta m\cdot931.5$ MeV.
- $N = N_0e^{-\lambda t}$, $t_{1/2} = 0.693/\lambda$, $\tau = 1/\lambda$.
- $n_\alpha = \Delta A/4$, $n_\beta = 2n_\alpha - \Delta Z$.`,
  }),

  note("semiconductors-and-diodes", {
    introduction: r`Semiconductors conduct between conductors and insulators, and doping controls their behaviour. The p–n junction diode is the building block of rectifiers, LEDs, solar cells and Zener regulators.`,
    prerequisites: r`- Current and resistance
- Energy bands (qualitative)`,
    concept: r`In a semiconductor, a small band gap lets some electrons jump to the conduction band, leaving holes. Adding pentavalent atoms gives extra electrons (n-type); trivalent atoms give extra holes (p-type). Joining p and n forms a depletion layer that lets current flow easily in only one direction.`,
    theory: r`Intrinsic: $n_e = n_h = n_i$. Extrinsic: $n_en_h = n_i^2$. Forward bias narrows the depletion layer (current flows above ~0.7 V for Si, 0.3 V for Ge); reverse bias widens it (tiny current until breakdown).

Half-wave rectifier output frequency $= f$; full-wave $= 2f$.`,
    definitions: r`- **Band gap** $E_g$: Si ≈ 1.1 eV, Ge ≈ 0.7 eV.
- **Majority/minority carriers.** **Depletion region**, **barrier potential**.
- **Zener breakdown:** sharp reverse breakdown at a fixed voltage, used for regulation.`,
    principles: r`1. Mass-action law $n_en_h = n_i^2$.
2. Conductivity $\sigma = e(n_e\mu_e + n_h\mu_h)$.
3. Semiconductors' resistance falls with temperature.`,
    derivations: r`**Zener regulator.** Load voltage held at $V_Z$; series resistor current $I = \frac{V_{\text{in}} - V_Z}{R_s}$ splits into $I_Z + I_L$.`,
    formulas: r`- $n_en_h = n_i^2$; $\sigma = e(n_e\mu_e + n_h\mu_h)$.
- Photon energy needed to create carriers: $hf \ge E_g$; LED wavelength $\lambda = \dfrac{hc}{E_g}$.
- Half-wave: $I_{\text{dc}} = \dfrac{I_0}\pi$, $I_{\text{rms}} = \dfrac{I_0}2$, efficiency max 40.6%, ripple frequency $f$.
- Full-wave: $I_{\text{dc}} = \dfrac{2I_0}\pi$, $I_{\text{rms}} = \dfrac{I_0}{\sqrt2}$, efficiency max 81.2%, ripple frequency $2f$.
- Zener: $I_s = \dfrac{V_{\text{in}} - V_Z}{R_s} = I_Z + I_L$.
- Diode dynamic resistance $r_d = \dfrac{\Delta V}{\Delta I}$.
- Ideal diode: zero resistance forward, infinite reverse.`,
    diagrams: r`Energy band diagrams: conductor (overlap), semiconductor (small gap), insulator (large gap); donor levels just below the conduction band, acceptor levels just above the valence band.`,
    graphs: r`Diode I–V: negligible current below the knee voltage, steep rise after; reverse: tiny saturation current, then breakdown (sharp for Zener).`,
    specialCases: r`- Solar cell operates in the fourth quadrant (no bias, light-generated current).
- Photodiode is used in reverse bias.`,
    exceptions: r`A doped semiconductor is still electrically neutral overall.`,
    assumptions: r`Ideal diode in circuit problems unless a cut-in voltage is given.`,
    applications: r`Power supplies, voltage regulators, LEDs, solar panels, sensors.`,
    patterns: r`- Carrier concentrations after doping.
- Current in diode circuits (which diodes conduct).
- Rectifier outputs and ripple frequency.
- Zener regulator currents; LED colour from band gap.`,
    misconceptions: r`- "p-type is positively charged." It is neutral; holes are majority carriers.`,
    traps: r`- Diode orientation in bridge circuits.
- Including the 0.7 V drop only when stated.`,
    summary: r`- $n_en_h = n_i^2$; $\lambda_{\text{LED}} = hc/E_g$.
- Half-wave ripple $f$; full-wave $2f$.
- Zener: $I_s = I_Z + I_L$, $V_L = V_Z$.`,
  }),

  note("logic-gates", {
    introduction: r`Logic gates perform Boolean operations on binary inputs. NAND and NOR are universal: any circuit can be built from them alone.`,
    prerequisites: r`- Binary numbers (0 and 1)`,
    concept: r`Treat high voltage as 1 and low as 0. A gate is a rule that maps input combinations to an output — conveniently listed in a truth table.`,
    theory: r`OR: $Y = A + B$. AND: $Y = A\cdot B$. NOT: $Y = \bar A$. NAND: $\overline{A\cdot B}$. NOR: $\overline{A + B}$. XOR: $A\bar B + \bar AB$.`,
    definitions: r`- **Truth table:** all input combinations with outputs.
- **Universal gate:** NAND or NOR.`,
    principles: r`1. De Morgan: $\overline{A + B} = \bar A\cdot\bar B$, $\overline{A\cdot B} = \bar A + \bar B$.
2. Identities: $A + \bar A = 1$, $A\cdot\bar A = 0$, $A + AB = A$.`,
    derivations: r`**NOT from NAND.** Tie both inputs: $\overline{A\cdot A} = \bar A$. **AND from NAND:** NAND followed by NOT. **OR from NAND:** invert each input, then NAND: $\overline{\bar A\cdot\bar B} = A + B$.`,
    formulas: r`- OR $A + B$; AND $AB$; NOT $\bar A$; NAND $\overline{AB}$; NOR $\overline{A + B}$; XOR $A\oplus B = A\bar B + \bar AB$; XNOR $\overline{A\oplus B}$.
- De Morgan: $\overline{A + B} = \bar A\bar B$, $\overline{AB} = \bar A + \bar B$.
- Boolean algebra: $A + 1 = 1$, $A\cdot1 = A$, $A + AB = A$, $A + \bar AB = A + B$.
- Number of rows for $n$ inputs: $2^n$.`,
    diagrams: r`Gate symbols: OR (curved), AND (D-shaped), NOT (triangle with bubble); a bubble on any gate means inversion.`,
    graphs: r`Timing diagrams: draw input waveforms and derive the output bit by bit.`,
    specialCases: r`- NOR with both inputs tied acts as NOT.`,
    exceptions: r`Real gates have propagation delays (ignored in JEE).`,
    assumptions: r`Positive logic (high = 1).`,
    applications: r`Computers, digital displays, control systems.`,
    patterns: r`- Output of a combination of gates for given inputs.
- Identify the gate from a truth table or waveform.
- Simplify Boolean expressions.`,
    misconceptions: r`- "NAND is AND with inputs inverted." It is AND with output inverted.`,
    traps: r`- Missing a bubble when reading the circuit.`,
    summary: r`- NAND/NOR universal; De Morgan's laws; XOR $= A\bar B + \bar AB$.`,
  }),

  note("measuring-instruments", {
    introduction: r`Experimental skills questions test reading vernier callipers and screw gauges, including zero error. These are quick marks if the method is clear.`,
    prerequisites: r`- Errors and least count`,
    concept: r`A vernier divides a main-scale division more finely by comparing two scales; a screw gauge converts a small linear advance into a large rotation of its circular scale.`,
    theory: r`Vernier: reading $=$ MSR $+$ (coinciding vernier division × LC). Screw gauge: reading $=$ PSR $+$ (circular scale reading × LC). Subtract zero error (with sign).`,
    definitions: r`- **Least count (LC):** smallest measurable length.
- **Zero error:** non-zero reading when jaws/studs are closed; positive if zero of vernier/circular scale is ahead.
- **Pitch:** linear advance per rotation.`,
    principles: r`1. Corrected reading = observed − zero error.
2. Take multiple readings and average to reduce random error.`,
    derivations: r`**Vernier LC.** If $n$ vernier divisions equal $(n - 1)$ main divisions, $1\,\text{VSD} = \frac{n-1}{n}$ MSD, so $\text{LC} = 1\,\text{MSD} - 1\,\text{VSD} = \frac{1\,\text{MSD}}{n}$.`,
    formulas: r`- Vernier LC $= 1\,\text{MSD} - 1\,\text{VSD} = \dfrac{\text{MSD}}{n}$; typical 0.1 mm.
- Screw gauge LC $= \dfrac{\text{pitch}}{\text{circular divisions}}$; typical 0.01 mm.
- Reading $=$ main scale $+$ (coinciding division × LC) $-$ zero error.
- Negative zero error (screw gauge): zero of circular scale above the reference line — e.g. $-(N - n)\times$ LC.`,
    diagrams: r`Vernier callipers: main scale, sliding vernier, outside jaws, inside jaws, depth rod. Screw gauge: sleeve (pitch scale), thimble (circular scale), ratchet.`,
    graphs: r`Not applicable.`,
    specialCases: r`- Backlash error in screw gauges: always rotate in one direction.`,
    exceptions: r`Zero error sign conventions vary; follow the question's description carefully.`,
    assumptions: r`Instruments read at eye level (no parallax).`,
    applications: r`Measuring wire diameter, rod length, internal diameters, depths.`,
    patterns: r`- Compute LC and reading with zero correction.
- Find diameter/area and its percentage error.`,
    misconceptions: r`- "Zero error is added." It is subtracted (with its sign).`,
    traps: r`- Unit consistency (mm vs cm).`,
    summary: r`- Vernier LC $= $ MSD/$n$; screw gauge LC $=$ pitch/divisions.
- Corrected $=$ observed $-$ zero error.`,
  }),

  note("standard-experiments", {
    introduction: r`The syllabus lists standard laboratory experiments. JEE asks for the principle, formula, graph to plot and sources of error for each.`,
    prerequisites: r`- Relevant theory chapters
- Error analysis`,
    concept: r`Each experiment turns a law into a straight-line graph whose slope or intercept gives the quantity sought — reducing random error and revealing systematic error.`,
    theory: r`Key experiments: simple pendulum ($g$), Young's modulus (Searle's), surface tension (capillary rise), viscosity (terminal velocity), speed of sound (resonance tube), specific heat (mixtures), meter bridge (resistivity), Ohm's law, galvanometer figure of merit, focal length of mirrors/lenses ($u$–$v$ method), prism refractive index ($i$–$\delta$ curve), diode and Zener characteristics.`,
    definitions: r`- **Figure of merit** of a galvanometer: current per division.
- **End correction:** effective extra length at the open end of a resonance tube.`,
    principles: r`1. Plot linearising graphs ($T^2$ vs $L$, $1/v$ vs $1/u$).
2. Interchange known/unknown resistances in a meter bridge to cancel end errors.`,
    derivations: r`**Pendulum graph.** $T^2 = \frac{4\pi^2}{g}L$: slope $\frac{4\pi^2}{g}$, so $g = \frac{4\pi^2}{\text{slope}}$.`,
    formulas: r`- Pendulum: $g = 4\pi^2\dfrac{L}{T^2}$ (plot $T^2$ vs $L$).
- Searle's: $Y = \dfrac{MgL}{\pi r^2\,\Delta l}$ (slope of load vs extension).
- Capillary: $S = \dfrac{rh\rho g}{2\cos\theta}$.
- Terminal velocity: $\eta = \dfrac{2r^2(\rho - \sigma)g}{9v_t}$.
- Resonance tube: $v = 2f(l_2 - l_1)$; end correction $e = \dfrac{l_2 - 3l_1}2$.
- Meter bridge: $S = R\dfrac{100 - l}{l}$; resistivity $\rho = \dfrac{S\pi r^2}{L}$.
- Galvanometer by half deflection: $G = \dfrac{RS}{R - S}$; figure of merit $k = \dfrac{\varepsilon}{(R + G)\theta}$.
- Mirror/lens $u$–$v$: $\dfrac1f = \dfrac1v \pm \dfrac1u$; at $u = v = 2f$ (lens) or $u = v = R$ (mirror).
- Prism: $n = \dfrac{\sin\frac{A + \delta_m}2}{\sin\frac A2}$ from the minimum of the $i$–$\delta$ graph.
- Specific heat by mixtures: $m_1c_1(T_1 - T) = (m_2c_2 + W)(T - T_2)$.`,
    diagrams: r`Draw each setup's key elements: pendulum with clamp; meter bridge with jockey; resonance tube with tuning fork; optical bench with pins.`,
    graphs: r`- $T^2$ vs $L$: line through origin.
- $1/v$ vs $1/u$ (lens): intercepts give $1/f$.
- $i$–$\delta$: U-curve, minimum gives $\delta_m$.
- Diode I–V: knee voltage; Zener: breakdown voltage.`,
    specialCases: r`- Meter bridge null point near the middle minimises error.`,
    exceptions: r`Small-angle approximation required for the pendulum.`,
    assumptions: r`Standard lab conditions; instruments calibrated.`,
    applications: r`Laboratory practicals and the experimental-skills questions in JEE Main.`,
    patterns: r`- Percentage error in $g$, $Y$, $\eta$ from measured values.
- Which graph to plot and how to read the result.
- End correction and resonance lengths.`,
    misconceptions: r`- "Graph method is just for show." It averages out random errors and exposes systematic ones.`,
    traps: r`- Effective pendulum length includes the bob radius.`,
    summary: r`- Linearise: $T^2$–$L$, $1/v$–$1/u$, $i$–$\delta$.
- Resonance $v = 2f(l_2 - l_1)$; meter bridge $S = R(100 - l)/l$.`,
  }),
];
