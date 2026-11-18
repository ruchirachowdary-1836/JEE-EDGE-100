import type { NoteSeed } from "./types";

export const CHEMISTRY_NOTES: NoteSeed[] = [
  {
    topic: "bohr-model-hydrogen-spectrum",
    sections: [
      { key: "introduction", title: "Introduction", body: `Classical physics predicted that an orbiting electron should radiate energy continuously and spiral into the nucleus in a tiny fraction of a second. Atoms are obviously stable, and hydrogen emits light only at **sharp, specific wavelengths**. In 1913 Niels Bohr proposed a model for hydrogen that explained both facts by quantising the electron's angular momentum.` },
      { key: "prerequisites", title: "Prerequisite knowledge", body: `- Coulomb's law: $F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1 q_2}{r^2}$
- Centripetal force: $F = mv^2/r$
- Photon energy: $E = h\\nu = hc/\\lambda$
- The electron-volt: $1\\,\\text{eV} = 1.602\\times10^{-19}\\,\\text{J}$` },
      { key: "concept", title: "Concept from the basics", body: `Bohr kept the planetary picture but added rules:

1. The electron moves only in certain circular orbits (**stationary states**) where it does not radiate.
2. In these orbits the angular momentum is a whole-number multiple of $h/2\\pi$: $mvr = \\dfrac{nh}{2\\pi}$.
3. Light is emitted or absorbed only when the electron jumps between orbits, with $h\\nu = E_{higher} - E_{lower}$.

The integer $n$ is the **principal quantum number**. Because only certain $n$ are allowed, only certain energies — and hence only certain spectral lines — are possible.` },
      { key: "theory", title: "Detailed theory", body: `For a one-electron (hydrogen-like) species of nuclear charge $Ze$:

$$r_n = 0.529\\,\\frac{n^2}{Z}\\ \\text{Å}, \\qquad v_n = 2.18\\times10^{6}\\,\\frac{Z}{n}\\ \\text{m s}^{-1}, \\qquad E_n = -13.6\\,\\frac{Z^2}{n^2}\\ \\text{eV}$$

The energy is negative because the electron is bound; $E = 0$ corresponds to an electron completely removed from the atom at rest. When an electron falls from $n_2$ to $n_1$:
$$\\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right), \\qquad R_H = 1.097\\times10^{7}\\ \\text{m}^{-1}$$` },
      { key: "definitions", title: "Definitions", body: `- **Stationary state:** an allowed orbit in which the electron does not radiate.
- **Ground state:** $n = 1$, the lowest energy state. States with $n > 1$ are **excited states**.
- **Ionisation energy:** energy needed to remove the electron from the ground state to $n = \\infty$; $13.6\\,\\text{eV}$ for hydrogen.
- **Excitation energy:** energy needed to raise the electron from the ground state to a higher state.
- **Wave number ($\\bar\\nu$):** $1/\\lambda$, the number of wavelengths per unit length.` },
      { key: "principles", title: "Important principles", body: `1. **Quantisation of angular momentum** produces quantisation of radius, speed and energy.
2. **Energy levels crowd together** as $n$ increases (gaps scale as $1/n^2$), which is why lines in each series converge toward a series limit.
3. **Total energy relations:** $KE = -E$, $PE = 2E$ (because $PE = -2\\,KE$ for an inverse-square attraction).
4. **Spectral series** are named by the lower level $n_1$: Lyman (1, ultraviolet), Balmer (2, visible), Paschen (3), Brackett (4), Pfund (5) — the last three in the infrared.` },
      { key: "derivations", title: "Derivations", body: `**Radius.** Coulomb attraction supplies the centripetal force:
$$\\frac{mv^2}{r} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Ze^2}{r^2}$$
With $v = \\dfrac{nh}{2\\pi m r}$ from the quantisation rule, substitute and solve:
$$r_n = \\frac{\\varepsilon_0 h^2}{\\pi m e^2}\\cdot\\frac{n^2}{Z} = 0.529\\,\\frac{n^2}{Z}\\ \\text{Å}$$

**Energy.** $KE = \\tfrac12 mv^2 = \\dfrac{Ze^2}{8\\pi\\varepsilon_0 r}$ and $PE = -\\dfrac{Ze^2}{4\\pi\\varepsilon_0 r}$, so
$$E = KE + PE = -\\frac{Ze^2}{8\\pi\\varepsilon_0 r_n} = -\\frac{m e^4}{8\\varepsilon_0^2 h^2}\\cdot\\frac{Z^2}{n^2} = -13.6\\,\\frac{Z^2}{n^2}\\ \\text{eV}$$

**Rydberg formula.** $h c/\\lambda = E_{n_2} - E_{n_1}$ gives $\\dfrac1\\lambda = \\dfrac{13.6\\,\\text{eV}}{hc}Z^2\\left(\\dfrac1{n_1^2} - \\dfrac1{n_2^2}\\right)$, and $13.6\\,\\text{eV}/hc = R_H$.` },
      { key: "diagrams", title: "Diagram", body: `The energy-level diagram below shows the allowed levels of hydrogen drawn to scale and lets you trigger transitions to see which series each line belongs to.`, animationKey: "bohr" },
      { key: "graphs", title: "Graphs", body: `- $r_n$ versus $n$: grows as $n^2$.
- $E_n$ versus $n$: rises toward 0 as $-1/n^2$; the levels get closer together.
- Line spectrum: in each series, lines get closer together and converge to a series limit at $n_2 \\to \\infty$.` },
      { key: "specialCases", title: "Special cases", body: `- **Number of spectral lines** when electrons fall from level $n$ to the ground state (many atoms): $\\dfrac{n(n-1)}{2}$. From $n_2$ down to $n_1$: $\\dfrac{(n_2-n_1)(n_2-n_1+1)}{2}$.
- A **single atom** can emit at most $n-1$ lines in one cascade.
- **Series limit** (shortest wavelength) of a series: put $n_2 = \\infty$.
- **First line** (longest wavelength) of a series: $n_2 = n_1 + 1$.` },
      { key: "exceptions", title: "Exceptions", body: `- The model applies **only to one-electron species**: H, He⁺, Li²⁺, Be³⁺ … It fails for multi-electron atoms such as He or Li.
- It cannot explain the fine structure of lines, the Zeeman effect (splitting in a magnetic field) or the Stark effect (splitting in an electric field) in detail.` },
      { key: "assumptions", title: "Assumptions and limitations", body: `- Circular orbits with a definite radius and speed — this contradicts the uncertainty principle.
- The nucleus is treated as infinitely heavy (reduced-mass correction ignored).
- The model gives no reason *why* angular momentum is quantised; de Broglie's wave picture later supplied one ($2\\pi r = n\\lambda$).
- It says nothing about the intensities of spectral lines or chemical bonding.` },
      { key: "applications", title: "Applications", body: `- Identifying hydrogen in stars from Balmer lines.
- Calculating ionisation energies of hydrogen-like ions.
- Understanding the photon energies used in hydrogen discharge lamps.` },
      { key: "patterns", title: "JEE Main question patterns", body: `- Ratio questions: radius, speed, energy or time period for different $n$ and $Z$.
- Wavelength of a given line in He⁺ compared with a line in H (use $Z^2$ scaling).
- Number of spectral lines for a given transition.
- Identifying which transition in He⁺ has the same wavelength as a given transition in H (match $Z^2/n^2$ values).
- KE, PE and total energy relationships.` },
      { key: "misconceptions", title: "Common misconceptions", body: `- "Higher orbit means higher speed." Speed falls as $1/n$.
- "Energy becomes more negative in higher orbits." It becomes *less* negative (closer to zero) — higher.
- "Bohr's model works for any atom with Z substituted." Only for one-electron species.` },
      { key: "traps", title: "Common examination traps", body: `- Forgetting $Z^2$ in energy and wavelength, or using $Z$ instead.
- Mixing up which series is in the visible region (Balmer).
- Using $n(n-1)/2$ for a single atom.
- Reporting wavelength in metres when options are in nm (1 nm = $10^{-9}$ m).` },
      { key: "summary", title: "Quick revision summary", body: `$$r_n = 0.529\\frac{n^2}{Z}\\,\\text{Å},\\quad v_n = 2.18\\times10^6\\frac{Z}{n}\\,\\text{m/s},\\quad E_n = -13.6\\frac{Z^2}{n^2}\\,\\text{eV}$$
$$\\frac1\\lambda = R_H Z^2\\left(\\frac1{n_1^2}-\\frac1{n_2^2}\\right)$$

- $KE = -E$, $PE = 2E$.
- Lyman (UV) → Balmer (visible) → Paschen, Brackett, Pfund (IR).
- Valid only for one-electron species.` },
    ],
  },
  {
    topic: "rate-law-order",
    sections: [
      { key: "introduction", title: "Introduction", body: `**Chemical kinetics** studies *how fast* reactions go and *what controls the speed*, whereas thermodynamics tells us only *whether* a reaction can go. The rate law is the experimentally determined link between the rate of a reaction and the concentrations of its reactants.` },
      { key: "prerequisites", title: "Prerequisite knowledge", body: `- Molarity (mol L⁻¹)
- Logarithms: $\\ln x = 2.303\\log_{10} x$
- Basic integration: $\\int \\dfrac{dx}{x} = \\ln x$
- Stoichiometry of balanced equations` },
      { key: "concept", title: "Concept from the basics", body: `Imagine molecules of A colliding to form products. The more A there is, the more collisions per second, so the faster the reaction. **How strongly** the rate depends on concentration is captured by the **order**.

If doubling [A] doubles the rate, the reaction is first order in A. If doubling [A] quadruples the rate, it is second order. If the rate does not change at all, it is zero order — something other than concentration (for example a saturated catalyst surface) limits the speed.` },
      { key: "theory", title: "Detailed theory", body: `For $aA + bB \\to$ products, the **rate of reaction** is
$$r = -\\frac1a\\frac{d[A]}{dt} = -\\frac1b\\frac{d[B]}{dt}$$
The **rate law** is found by experiment:
$$r = k[A]^m[B]^n$$
Here $m$ and $n$ are the orders with respect to A and B, $m + n$ is the overall order and $k$ is the rate constant. **$m$ and $n$ need not equal $a$ and $b$.** They can be zero, fractional or even negative.

The unit of $k$ for overall order $n$ is $(\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}$.` },
      { key: "definitions", title: "Definitions", body: `- **Order:** sum of the powers of concentration terms in the experimental rate law.
- **Molecularity:** number of reacting species that collide in a single **elementary** step. It is always a positive whole number (1, 2, rarely 3).
- **Rate constant (k):** the rate when all concentrations are 1 mol L⁻¹; it depends on temperature but not on concentration.
- **Half-life ($t_{1/2}$):** time for the concentration of a reactant to fall to half its initial value.
- **Pseudo-first-order reaction:** a higher-order reaction that behaves as first order because one reactant is in large excess.` },
      { key: "principles", title: "Important principles", body: `1. Order is **experimental**; it cannot be read from the balanced equation unless the reaction is known to be elementary.
2. For an elementary step, order equals molecularity.
3. For a multi-step mechanism, the **slowest step** determines the rate law.
4. Half-life behaviour identifies order: constant for first order; proportional to $[A]_0$ for zero order.` },
      { key: "derivations", title: "Derivations", body: `**Zero order.** $-\\dfrac{d[A]}{dt} = k \\Rightarrow \\int_{[A]_0}^{[A]} d[A] = -k\\int_0^t dt$
$$[A] = [A]_0 - kt, \\qquad t_{1/2} = \\frac{[A]_0}{2k}$$

**First order.** $-\\dfrac{d[A]}{dt} = k[A] \\Rightarrow \\int_{[A]_0}^{[A]} \\frac{d[A]}{[A]} = -k\\int_0^t dt$
$$\\ln\\frac{[A]_0}{[A]} = kt \\;\\Leftrightarrow\\; k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]}, \\qquad [A] = [A]_0e^{-kt}$$
Putting $[A] = [A]_0/2$: $t_{1/2} = \\dfrac{\\ln 2}{k} = \\dfrac{0.693}{k}$, independent of $[A]_0$.` },
      { key: "diagrams", title: "Diagram", body: `The live plot below shows concentration falling with time for zero, first and second order reactions starting from the same concentration. Adjust $k$ and watch the half-lives.`, animationKey: "kinetics" },
      { key: "graphs", title: "Graphs", body: `- Zero order: $[A]$ vs $t$ is a straight line with slope $-k$; rate vs $[A]$ is horizontal.
- First order: $\\ln[A]$ vs $t$ is a straight line with slope $-k$; $\\log[A]$ vs $t$ has slope $-k/2.303$; rate vs $[A]$ is a line through the origin.
- Second order (single reactant): $1/[A]$ vs $t$ is a straight line with slope $+k$.` },
      { key: "specialCases", title: "Special cases", body: `- First order: time for 75% completion = $2\\,t_{1/2}$; for 87.5% = $3\\,t_{1/2}$; for 99.9% ≈ $10\\,t_{1/2}$.
- After $n$ half-lives, the fraction remaining is $(1/2)^n$ (first order).
- Zero-order reactions finish completely at $t = [A]_0/k$.
- Radioactive decay is always first order.` },
      { key: "exceptions", title: "Exceptions", body: `- Acid-catalysed hydrolysis of an ester and inversion of cane sugar are bimolecular but **pseudo-first-order** because water is in large excess.
- Decomposition of gases on a metal surface (for example NH₃ on hot platinum at high pressure) can be zero order.
- Reactions with complex mechanisms can show fractional order, such as $r = k[A][B]^{1/2}$.` },
      { key: "assumptions", title: "Assumptions and limitations", body: `- Temperature is constant during the measurement (k depends on T).
- Integrated rate laws assume a single reactant term (or that other reactants are in excess).
- The rate law describes the observed behaviour; it does not by itself prove a mechanism.` },
      { key: "applications", title: "Applications", body: `- Drug dosage intervals use first-order elimination half-lives.
- Shelf-life of medicines and food is estimated from rate constants.
- Radiocarbon dating uses the first-order decay of carbon-14.` },
      { key: "patterns", title: "JEE Main question patterns", body: `- Finding order from initial-rate data tables (compare two experiments where only one concentration changes).
- Finding order from the units of $k$.
- First-order calculations of time, fraction remaining or $k$ using $\\log$ values.
- Graph identification: which plot is linear for a given order.
- Comparing half-lives when the initial concentration changes.` },
      { key: "misconceptions", title: "Common misconceptions", body: `- "Order equals the stoichiometric coefficient." Only for elementary reactions.
- "Molecularity can be zero or fractional." It cannot; order can.
- "Half-life is always constant." Only for first-order reactions.` },
      { key: "traps", title: "Common examination traps", body: `- Mixing $\\ln$ and $\\log$: forgetting the factor $2.303$.
- Using minutes for $t$ while $k$ is given in s⁻¹.
- In a rate table, comparing two experiments where *both* concentrations change.
- Confusing "rate of disappearance of A" with "rate of reaction" when the coefficient of A is not 1.` },
      { key: "summary", title: "Quick revision summary", body: `- Zero order: $[A] = [A]_0 - kt$, $t_{1/2} = [A]_0/2k$, $k$ in mol L⁻¹ s⁻¹.
- First order: $k = \\dfrac{2.303}{t}\\log\\dfrac{[A]_0}{[A]}$, $t_{1/2} = 0.693/k$, $k$ in s⁻¹.
- Order is experimental; molecularity is a whole number for an elementary step.
- Units of $k$: $(\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}$.` },
    ],
  },
];
