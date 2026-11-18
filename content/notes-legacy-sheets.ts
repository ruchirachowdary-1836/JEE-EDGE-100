import { r } from "./note-helpers";

/** Formula sheets for the first four notes, written before the formula-sheet section existed. */
export const LEGACY_SHEETS: Record<string, string> = {
  "projectile-motion": r`- $x = u\cos\theta\,t$, $y = u\sin\theta\,t - \tfrac12gt^2$; $v_x = u\cos\theta$, $v_y = u\sin\theta - gt$.
- Level ground: $T = \dfrac{2u\sin\theta}g$, $H = \dfrac{u^2\sin^2\theta}{2g}$, $R = \dfrac{u^2\sin2\theta}g$ — launch and landing at the same height.
- $R_{\max} = \dfrac{u^2}g$ at $45^\circ$; $\tan\theta = \dfrac{4H}R$; complementary angles give equal $R$, and $T_1T_2 = \dfrac{2R}g$.
- Trajectory: $y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta} = x\tan\theta\left(1 - \dfrac xR\right)$.
- Horizontal launch from height $h$: $T = \sqrt{\dfrac{2h}g}$, range $u\sqrt{\dfrac{2h}g}$.
- Speed at height $y$: $v = \sqrt{u^2 - 2gy}$; speed at the top $u\cos\theta$.
- Inclined plane (angle $\alpha$, launched at $\theta$ from the incline, up the slope): $T = \dfrac{2u\sin\theta}{g\cos\alpha}$, $R = \dfrac{2u^2\sin\theta\cos(\theta + \alpha)}{g\cos^2\alpha}$, $R_{\max} = \dfrac{u^2}{g(1 + \sin\alpha)}$.`,
  "simple-harmonic-motion": r`- $x = A\sin(\omega t + \phi)$; $v = \omega\sqrt{A^2 - x^2}$; $a = -\omega^2x$.
- $T = \dfrac{2\pi}\omega$; $v_{\max} = A\omega$; $a_{\max} = A\omega^2$.
- Energy: $E = \tfrac12m\omega^2A^2$; $KE = \tfrac12m\omega^2(A^2 - x^2)$; $PE = \tfrac12m\omega^2x^2$.
- Spring: $T = 2\pi\sqrt{\dfrac mk}$; series $\dfrac1k = \dfrac1{k_1} + \dfrac1{k_2}$; parallel $k = k_1 + k_2$; cut into $n$ parts: $nk$ each.
- Pendulum: $T = 2\pi\sqrt{\dfrac Lg}$ (small angles); in a lift $g_{\text{eff}} = g \pm a$; physical pendulum $T = 2\pi\sqrt{\dfrac{I}{mgd}}$.
- Liquid in a U-tube: $T = 2\pi\sqrt{\dfrac{L}{2g}}$ ($L$ = total liquid length); floating cylinder: $T = 2\pi\sqrt{\dfrac hg}$ ($h$ = submerged depth).
- Two-body spring: replace $m$ with $\mu = \dfrac{m_1m_2}{m_1 + m_2}$.
- Superposition of two SHMs (same $\omega$): $A = \sqrt{A_1^2 + A_2^2 + 2A_1A_2\cos\delta}$.`,
  "bohr-model-hydrogen-spectrum": r`- $r_n = 0.529\dfrac{n^2}Z$ Å; $v_n = 2.18\times10^6\dfrac Zn$ m/s; $E_n = -13.6\dfrac{Z^2}{n^2}$ eV — one-electron species only.
- $KE = -E_n$, $PE = 2E_n$; angular momentum $mvr = \dfrac{nh}{2\pi}$.
- $\dfrac1\lambda = R_HZ^2\left(\dfrac1{n_1^2} - \dfrac1{n_2^2}\right)$, $R_H = 1.097\times10^7$ m⁻¹ (109 677 cm⁻¹).
- Lines from level $n$ to ground (many atoms): $\dfrac{n(n-1)}2$; single atom at most $n - 1$.
- Series limit: $n_2 \to \infty$; first line: $n_2 = n_1 + 1$.
- Ionisation energy $= \dfrac{13.6Z^2}{n^2}$ eV; $E(\text{eV}) = \dfrac{1240}{\lambda(\text{nm})}$.
- Time period $\propto \dfrac{n^3}{Z^2}$; frequency of revolution $\propto \dfrac{Z^2}{n^3}$.`,
  "rate-law-order": r`- Rate $= -\dfrac1a\dfrac{d[A]}{dt}$; rate law $r = k[A]^m[B]^n$ (orders from experiment).
- Unit of $k$: $(\text{mol L}^{-1})^{1-n}\,\text{s}^{-1}$.
- Zero order: $[A] = [A]_0 - kt$, $t_{1/2} = \dfrac{[A]_0}{2k}$, completes at $t = [A]_0/k$.
- First order: $k = \dfrac{2.303}t\log\dfrac{[A]_0}{[A]}$, $t_{1/2} = \dfrac{0.693}k$; fraction left after $n$ half-lives $2^{-n}$; $t_{99.9\%} \approx 10\,t_{1/2}$; $t_{75\%} = 2t_{1/2}$.
- Second order (one reactant): $\dfrac1{[A]} = \dfrac1{[A]_0} + kt$, $t_{1/2} = \dfrac1{k[A]_0}$.
- General: $t_{1/2} \propto [A]_0^{1-n}$.
- Gas phase first order $A \to B + C$: $k = \dfrac{2.303}t\log\dfrac{P_0}{2P_0 - P_t}$.
- Pseudo-first-order: one reactant in large excess (ester hydrolysis, inversion of sucrose).`,
};
