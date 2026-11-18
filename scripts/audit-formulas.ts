/* Checks the notes against a checklist of standard JEE Main formulas/results. Usage: npx tsx scripts/audit-formulas.ts */
import { PHYSICS_NOTES } from "../content/notes-physics";
import { CHEMISTRY_NOTES } from "../content/notes-chemistry";
import { MATHEMATICS_NOTES } from "../content/notes-mathematics";

const text = (ns: typeof PHYSICS_NOTES) => ns.map((n) => n.sections.map((s) => s.body).join("\n")).join("\n");
const P = text(PHYSICS_NOTES), C = text(CHEMISTRY_NOTES), M = text(MATHEMATICS_NOTES);
const r = String.raw;

// [label, subject text, needles — any match counts as present]
const checks: [string, string, string[]][] = [
  ["relative velocity", P, [r`v_{AB}`]], ["impulse", P, ["Impulse"]], ["spring PE", P, [r`\tfrac12kx^2`]], ["restitution", P, ["restitution"]],
  ["parallel axis", P, ["Parallel axis"]], ["escape speed", P, ["v_e"]], ["Kepler III", P, [r`T^2 \propto`]], ["Bernoulli", P, ["Bernoulli"]], ["Stokes", P, [r`6\pi\eta`]],
  ["Poiseuille", P, ["Poiseuille"]], ["capillary rise", P, [r`2S\cos\theta`]], ["Stefan", P, [r`\sigma AT^4`]], ["Wien", P, [r`\lambda_mT`]], ["Carnot", P, ["Carnot"]],
  ["rms speed", P, [r`v_{\text{rms}}`]], ["mean free path", P, ["ean free path"]], ["Doppler", P, ["Doppler"]], ["beats", P, ["Beat"]],
  ["closed pipe", P, ["(2n-1)v"]], ["Coulomb", P, ["Coulomb"]], ["dipole torque", P, [r`\vec p\times\vec E`]], ["Gauss", P, [r`q_{\text{enc}}`]], ["capacitor energy", P, [r`\tfrac12CV^2`]],
  ["drift velocity", P, ["v_d"]], ["Wheatstone", P, ["Wheatstone"]], ["potentiometer", P, ["otentiometer"]], ["Biot-Savart", P, ["Biot"]], ["solenoid", P, [r`\mu_0nI`]],
  ["cyclotron period", P, [r`\dfrac{2\pi m}{qB}`]], ["shunt", P, ["hunt"]], ["Faraday EMI", P, [r`d\phi`]], ["self inductance", P, [r`\mu_0n^2`]], ["LCR impedance", P, ["X_L - X_C"]],
  ["LC resonance", P, [r`\sqrt{LC}`]], ["transformer", P, ["ransformer"]], ["EM wave speed", P, [r`\mu_0\varepsilon_0`]], ["lens maker", P, ["ens maker"]],
  ["mirror formula", P, [r`\dfrac1v + \dfrac1u`]], ["prism", P, [r`\delta_m`]], ["microscope", P, ["icroscope"]], ["YDSE fringe width", P, [r`\dfrac{\lambda D}d`]],
  ["Malus", P, ["Malus"]], ["Brewster", P, ["Brewster"]], ["photoelectric", P, [r`\phi_0`]], ["de Broglie", P, [r`\dfrac h{mv}`, r`\dfrac hp`]], ["radioactive half-life", P, ["t_{1/2}"]],
  ["binding energy", P, ["931"]], ["rectifier", P, ["ull-wave"]], ["De Morgan (logic)", P, ["De Morgan"]], ["vernier", P, ["ernier"]], ["dimension of G", P, ["M^{-1}L^3T^{-2}"]],
  ["error propagation", P, [r`\dfrac{\Delta Z}{Z}`]], ["banking", P, [r`\dfrac{v^2}{rg}`]], ["rolling on incline", P, ["k^2/R^2"]], ["Young's modulus", P, [r`\dfrac{FL}{A\,\Delta L}`]],
  ["volume expansion", P, [r`\gamma = 3\alpha`]], ["Newton's cooling", P, ["cooling"]], ["adiabatic", P, [r`PV^\gamma`]], ["equipartition", P, [r`\dfrac f2`]],
  ["electric PE", P, [r`\dfrac{kq_1q_2}r`]], ["Lorentz force", P, ["Lorentz"]], ["force between wires", P, [r`\mu_0I_1I_2`]], ["EM intensity", P, [r`\varepsilon_0cE_0^2`]],
  ["Moseley", P, ["Moseley"]], ["pendulum", P, [r`2\pi\sqrt{\dfrac Lg}`]], ["work-energy", P, [r`W_{\text{net}}`]], ["power F.v", P, [r`\vec F\cdot\vec v`]],
  ["centre of mass", P, [r`x_{\text{cm}}`]], ["angular momentum", P, [r`\vec r\times\vec p`]], ["g at depth", P, [r`1 - \dfrac dR`]], ["projectile range", P, [r`\dfrac{u^2\sin2\theta}g`]],
  ["equations of motion", P, [r`v^2 = u^2 + 2as`]], ["friction incline", P, [r`\sin\theta - \mu`]], ["SHM energy", P, [r`\tfrac12m\omega^2A^2`]], ["wave speed string", P, [r`\sqrt{\dfrac T\mu}`]],
  ["mole", C, ["N_A"]], ["molality", C, ["olality"]], ["normality", C, ["ormality"]], ["nodes", C, ["n - l - 1"]], ["Heisenberg", C, [r`\dfrac h{4\pi`]],
  ["bond order", C, ["N_b - N_a"]], ["dipole moment", C, [r`q\times d`]], ["Hess", C, ["Hess"]], ["dH = dU + dn RT", C, [r`\Delta n_gRT`]], ["Gibbs", C, [r`\Delta H - T\Delta S`]],
  ["dG and K", C, [r`-RT\ln K`, r`-2.303RT\log K`]], ["Raoult", C, [r`x_Ap_A^\circ`]], ["Henry", C, ["K_Hx"]], ["bp elevation", C, ["K_bm"]], ["osmotic pressure", C, ["iCRT"]], ["van 't Hoff factor", C, [r`(n - 1)\alpha`]],
  ["Kp/Kc", C, [r`(RT)^{\Delta n_g}`]], ["van 't Hoff equation", C, [r`\dfrac{\Delta H^\circ}{2.303R}`]], ["weak acid pH", C, [r`\sqrt{K_aC}`]], ["Henderson", C, [r`\dfrac{[\text{salt}]}{[\text{acid}]}`]],
  ["Ksp", C, ["K_{sp}"]], ["salt hydrolysis", C, [r`\text{p}K_a + \log C`]], ["Nernst", C, ["0.0591"]], ["dG = -nFE", C, ["-nFE"]], ["Kohlrausch", C, ["Kohlrausch"]], ["molar conductivity", C, [r`\Lambda_m`]],
  ["Faraday electrolysis", C, ["MIt"]], ["first-order kinetics", C, ["2.303"]], ["Arrhenius", C, ["e^{-E_a/RT}"]], ["spin-only moment", C, [r`\sqrt{n(n+2)}`]], ["CFSE", C, [r`\Delta_o`]],
  ["DBE", C, ["DBE"]], ["Dumas", C, ["Dumas"]], ["Kjeldahl", C, ["Kjeldahl"]], ["entropy of phase change", C, [r`\dfrac{\Delta H}{T}`]],
  ["Bohr radius", C, ["0.529"]], ["photon energy", C, [r`h\nu`]], ["limiting reagent", C, ["imiting"]], ["% yield", C, ["yield"]], ["dilution", C, ["M_1V_1"]],
  ["ideal gas law", C, ["PV = nRT", "pV = nRT"]], ["Graham's law", C, ["Graham"]], ["Dalton partial pressure", C, ["Dalton"]],
  ["De Morgan (sets)", M, ["(A \\cup B)'"]], ["onto functions", M, ["Onto functions"]], ["De Moivre", M, ["De Moivre"]], ["cube roots of unity", M, [r`\omega^3`]], ["discriminant", M, ["b^2 - 4ac"]],
  ["(AB)^T", M, ["(AB)^T"]], ["adjoint", M, [r`\operatorname{adj}`]], ["Cramer", M, ["Cramer"]], ["nPr", M, ["^nP_r"]], ["nCr", M, ["^nC_r"]], ["derangements", M, ["D_n"]],
  ["binomial general term", M, ["T_{r+1}"]], ["AP sum", M, ["2a + (n-1)d"]], ["GP infinite sum", M, [r`S_\infty`]], ["AM-GM", M, [r`\text{AM} \ge \text{GM}`, "AM ≥ GM"]], ["sum of squares", M, [r`\dfrac{n(n+1)(2n+1)}6`]],
  ["standard limits", M, [r`\dfrac{\sin x}{x}`]], ["L'Hopital", M, ["Hôpital"]], ["chain rule", M, ["Chain rule"]], ["inverse trig derivatives", M, [r`\sqrt{1-x^2}`]], ["parametric derivative", M, ["Parametric"]],
  ["LMVT", M, ["LMVT"]], ["Rolle", M, ["Rolle"]], ["tangent and normal", M, ["normal"]], ["integration by parts", M, ["y parts"]], ["standard integrals", M, [r`\tan^{-1}\dfrac xa`]],
  ["King's property", M, ["a + b - x", "a+b-x"]], ["Leibniz rule", M, ["Leibniz"]], ["Wallis", M, ["Wallis"]], ["area between curves", M, ["Area between"]], ["linear DE", M, [r`\text{IF}`]],
  ["homogeneous DE", M, ["y = vx"]], ["point-line distance", M, [r`\dfrac{|ax_1 + by_1 + c|}{\sqrt{a^2 + b^2}}`]], ["angle between lines", M, [r`\dfrac{m_1 - m_2}{1 + m_1m_2}`]],
  ["circle tangent", M, [r`a\sqrt{1 + m^2}`]], ["orthogonal circles", M, ["2g_1g_2"]], ["parabola", M, ["y^2 = 4ax"]], ["ellipse", M, ["1 - e^2"]], ["hyperbola", M, ["e^2 - 1"]],
  ["direction cosines", M, ["l^2 + m^2 + n^2 = 1"]], ["skew-line distance", M, [r`\vec b_1\times\vec b_2`]], ["scalar triple product", M, [r`[\vec a\,\vec b\,\vec c]`]],
  ["vector triple product", M, [r`(\vec a\cdot\vec c)\vec b`]], ["variance", M, [r`\bar x^2`]], ["combined variance", M, ["Combined variance"]], ["Bayes", M, ["Bayes"]], ["binomial distribution", M, ["npq"]],
  ["compound angles", M, [r`\sin(A\pm B)`]], ["triple angles", M, [r`\sin3A`]], ["sum to product", M, [r`\sin C + \sin D`]], ["general solutions", M, ["(-1)^n"]], ["tan^-1 addition", M, [r`\dfrac{x+y}{1-xy}`]],
  ["section formula", M, ["ection formula"]], ["centroid/incentre", M, ["ncentre"]], ["area of triangle", M, ["Area of triangle"]],
  ["sine rule", M, ["Sine rule", "sine rule"]], ["cosine rule", M, ["Cosine rule", "cosine rule"]], ["projection formula", M, ["Projection formula"]],
  ["mean deviation", M, ["Mean deviation"]], ["Pascal", M, ["Pascal"]], ["number of divisors", M, ["divisors"]], ["circular permutations", M, ["(n-1)!"]], ["cubic roots relations", M, [r`\alpha\beta\gamma`]],
  ["log laws", M, [r`\log_a(xy)`]], ["modulus inequalities", M, ["|x| < a"]], ["exponential/log limits", M, [r`\dfrac{a^x - 1}{x}`]],
];

const missing = checks.filter(([, hay, needles]) => !needles.some((n) => hay.includes(n)));
console.log(`${checks.length - missing.length}/${checks.length} checklist items present.`);
for (const [label] of missing) console.log("MISSING:", label);
process.exit(missing.length ? 1 : 0);
