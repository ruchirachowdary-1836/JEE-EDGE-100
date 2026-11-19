/* Independent re-computation of every numerical answer in the Question Gym.
 * Where possible a DIFFERENT method from the written solution is used (enumeration, numerical integration,
 * time-stepping simulation, polynomial multiplication, brute-force search), so an error in the worked
 * solution is not simply repeated here. Run: npm run test:answers */
import { ALL_QUESTIONS } from "../content/questions";

const g = 10;
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const C = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 ? 1 : (C(n - 1, k - 1) * n) / k);
const simpson = (f: (x: number) => number, a: number, b: number, n = 20000) => {
  const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
};
const rk4 = (f: (x: number, y: number) => number, x0: number, y0: number, x1: number, n = 20000) => {
  const h = (x1 - x0) / n; let x = x0, y = y0;
  for (let i = 0; i < n; i++) {
    const k1 = f(x, y), k2 = f(x + h / 2, y + (h * k1) / 2), k3 = f(x + h / 2, y + (h * k2) / 2), k4 = f(x + h, y + h * k3);
    y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4); x += h;
  }
  return y;
};
const polyMul = (a: number[], b: number[]) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => (r[i + j] += x * y))); return r; };
const polyPow = (p: number[], n: number) => { let r = [1]; for (let i = 0; i < n; i++) r = polyMul(r, p); return r; };
const det3 = (m: number[][]) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a: number[]) => Math.sqrt(dot(a, a));
const deg = (r: number) => (r * 180) / Math.PI;
/** solve f(x) = 0 by bisection on [a, b] */
const bisect = (f: (x: number) => number, a: number, b: number) => { for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; } return (a + b) / 2; };
const spinOnly = (n: number) => Math.sqrt(n * (n + 2));

const V: Record<string, () => number> = {
  // ── original sets ──
  "projectile-motion:2:1": () => { // simulate the vertical motion
    let y = 0, vy = 20 * Math.sin(Math.PI / 6), max = 0; const dt = 1e-5;
    while (vy > 0) { y += vy * dt; vy -= g * dt; max = Math.max(max, y); } return max;
  },
  "projectile-motion:3:2": () => { // find both angles numerically, compare heights
    const R = (t: number) => (400 * Math.sin(2 * t)) / g - 20 * Math.sqrt(3);
    const a = bisect(R, 0.01, Math.PI / 4), b = bisect(R, Math.PI / 4, Math.PI / 2 - 0.01);
    return Math.sin(b) ** 2 / Math.sin(a) ** 2;
  },
  "projectile-motion:5:1": () => { const t = bisect((t) => 20 + 15 * t - 5 * t * t, 0.1, 10); return 20 * t; },
  "simple-harmonic-motion:2:1": () => Math.sqrt(100 / 1),
  "simple-harmonic-motion:3:1": () => 2 * Math.sqrt(10 ** 2 - 6 ** 2),
  "simple-harmonic-motion:4:2": () => (Math.asin(0.5) / (2 * Math.PI)) * 12,
  "simple-harmonic-motion:5:2": () => { const w2 = (16 - 9) / (16 - 9); return Math.sqrt(9 / w2 + 16); },
  "capacitors:2:1": () => 0.5 * 10e-6 * 100 ** 2 * 1000,
  "capacitors:3:1": () => 1 / (1 / 3 + 1 / 3) + 3,
  "capacitors:4:2": () => bisect((t) => 1 - Math.exp(-t / 2) - (1 - Math.exp(-2)), 0.1, 20),
  "capacitors:5:1": () => { const Q = 4e-6 * 50; return ((Q * Q) / (2 * 4e-6) - (Q * Q) / (2 * 20e-6)) * 1000; },
  "ray-optics:2:1": () => 1 / 0.25,
  "ray-optics:3:1": () => 1 / (1 / 20 - 1 / 30),
  "ray-optics:4:2": () => 20 * ((1.5 - 1) / (1.5 / 1.25 - 1)),
  "ray-optics:5:1": () => { // the two lens positions are u and v swapped: u + v = 90, v − u = 30
    const u = (90 - 30) / 2, v = 90 - u; return 1 / (1 / u + 1 / v);
  },
  "bohr-model-hydrogen-spectrum:2:1": () => 13.6 * 2 ** 2,
  "bohr-model-hydrogen-spectrum:3:1": () => { let n = 0; for (let a = 1; a <= 5; a++) for (let b = a + 1; b <= 5; b++) n++; return n; },
  "bohr-model-hydrogen-spectrum:5:1": () => { const n = Math.round(Math.sqrt(13.6 / 0.85)); let c = 0; for (let a = 1; a <= n; a++) for (let b = a + 1; b <= n; b++) c++; return c; },
  "rate-law-order:2:1": () => Math.log(2) / 0.0693,
  "rate-law-order:3:1": () => 100 * Math.exp(-(Math.log(2) / 15) * 45),
  "rate-law-order:4:2": () => Math.log(100) / Math.log(10),
  "rate-law-order:5:1": () => (8.314 * Math.log(4)) / (1 / 300 - 1 / 320) / 1000,
  "ionic-equilibrium:2:1": () => 14 + Math.log10(0.01),
  "ionic-equilibrium:3:1": () => { const x = bisect((x) => (x * x) / (0.1 - x) - 1e-5, 0, 0.05); return -Math.log10(x); },
  "ionic-equilibrium:4:1": () => bisect((s) => s * (2 * s) ** 2 - 4e-12, 0, 1) / 1e-4,
  "ionic-equilibrium:5:1": () => { const oh = bisect((x) => (x * x) / (0.1 - x) - 1e-14 / 1e-5, 0, 0.01); return 14 + Math.log10(oh); },
  "electrochemical-cells:2:1": () => (2 * 96500 * 1.1) / 1000,
  "electrochemical-cells:3:1": () => 1000 * ((8.314 * 298) / 96500) * Math.log(10) * 3,
  "electrochemical-cells:4:1": () => (2 * 96500 * 1.1) / (8.314 * 298 * Math.log(10)),
  "electrochemical-cells:5:1": () => 1000 * ((1 * 0.77 + 2 * -0.44) / 3),
  "quadratic-equations:2:1": () => 2 ** 2 + 3 ** 2,
  "quadratic-equations:3:1": () => { const d = Math.sqrt(5); const a = (3 + d) / 2, b = (3 - d) / 2; return a ** 3 + b ** 3; },
  "quadratic-equations:4:2": () => range(-100, 100).filter((x) => x * x - 5 * Math.abs(x) + 6 === 0).length,
  "quadratic-equations:5:2": () => { // scan for roots of (base)^exp = 1 among candidates (integers suffice here, checked exactly)
    const s = new Set<number>();
    for (let x = -50; x <= 50; x++) { const b = x * x - 7 * x + 11, e = x * x - 13 * x + 42; if (b === 1 || (e === 0 && b !== 0) || (b === -1 && e % 2 === 0)) s.add(x); }
    return [...s].reduce((a, b) => a + b, 0);
  },
  "definite-integrals:2:1": () => simpson(Math.sin, 0, Math.PI / 2),
  "definite-integrals:3:1": () => simpson(Math.abs, -2, 2, 20000),
  "definite-integrals:4:1": () => simpson((x) => Math.floor(x), 0, 3 - 1e-12, 300000),
  "definite-integrals:5:2": () => { // local minimum of F: F' = (x-1)(x-3) changes sign - → +
    const Fp = (x: number) => (x - 1) * (x - 3); return range(0, 400).map((i) => i / 100).find((x) => Fp(x - 0.01) < 0 && Fp(x + 0.01) > 0 && Math.abs(Fp(x)) < 1e-9) ?? NaN;
  },
  "probability:2:1": () => { let n = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === 8) n++; return n; },
  "probability:3:1": () => { let n = 0; for (let m = 0; m < 16; m++) if (m.toString(2).split("").filter((c) => c === "1").length === 2) n++; return (n / 16) * 8; },
  "probability:4:2": () => { const p = [0.25, 0.5, 0.25]; const m = p.reduce((s, q, i) => s + q * i, 0); return p.reduce((s, q, i) => s + q * (i - m) ** 2, 0); },
  "probability:5:1": () => { const q = 2 / 4, n = 4 / (1 - q); return (1 - q ** n) * 256; },
  "determinants:2:1": () => 2 ** 3 * 4,
  "determinants:3:1": () => det3([[1, 2, 3], [4, 5, 6], [7, 8, 10]]),
  "determinants:4:2": () => 2 ** ((3 - 1) ** 2),
  "determinants:5:2": () => { const ks = new Set<number>(); for (let k = -10; k <= 10; k += 0.5) if (Math.abs(det3([[k, 1, 1], [1, k, 1], [1, 1, k]])) < 1e-9) ks.add(k); return [...ks].reduce((a, b) => a + b, 0); },

  // ── physics, set 3 ──
  "si-units-and-dimensions:2:1": () => 1 + -1 + 2, // M = F·L⁻¹·T² (exponents read off F = M L T⁻²)
  "si-units-and-dimensions:4:1": () => { // solve the exponent system M: a + c = 0, L: -3a + b = 0, T: -2c = 1
    const c = -0.5, a = -c, b = 3 * a; return a + b + c;
  },
  "friction:2:1": () => { const s = Math.asin(0.6); return g * (Math.sin(s) - 0.5 * Math.cos(s)); },
  "friction:4:1": () => { // largest F for which the common acceleration needs friction ≤ μ m_A g
    let F = 0; while ((2 * (F + 0.001)) / 6 <= 0.4 * 2 * g + 1e-12) F += 0.001; return F;
  },
  "friction:5:1": () => { // time-stepping simulation with kinetic friction once slipping
    let xa = 0, xb = 0, va = 0, vb = 0, t = 0; const dt = 1e-5;
    while (xa - xb > -1.5) { const f = 0.4 * 2 * g; va += (f / 2) * dt; vb += ((36 - f) / 4) * dt; xa += va * dt; xb += vb * dt; t += dt; }
    return t;
  },
  "work-and-the-work-energy-theorem:2:1": () => simpson((x) => 3 * x * x, 0, 2),
  "work-and-the-work-energy-theorem:4:1": () => (60 * g * 10 + 0.5 * 60 * 100) / 60,
  "work-and-the-work-energy-theorem:5:1": () => { // integrate the equation of motion of the chain: L·dv/dt = g·y
    const L = 2; let y = L / 3, v = 0; const dt = 1e-6;
    while (y < L) { v += (g * y / L) * dt; y += v * dt; } return v;
  },
  "torque-and-moment-of-inertia:2:1": () => simpson((x) => (3 / 2) * x * x, 0, 2),
  "torque-and-moment-of-inertia:4:1": () => ((4 * 0.5) / simpson((r) => (2 / (Math.PI * 0.25)) * 2 * Math.PI * r * r ** 2, 0, 0.5)) * 2,
  "torque-and-moment-of-inertia:5:1": () => { // simulate block + disc pulley
    const m = 1, M = 2, R = 0.1, I = 0.5 * M * R * R; let v = 0, s = 0; const dt = 1e-6;
    while (s < 0.9) { const a = (m * g) / (m + I / (R * R)); v += a * dt; s += v * dt; } return v;
  },
  "satellites-and-keplers-laws:2:1": () => 11.2 * Math.sqrt(2 / 2),
  "satellites-and-keplers-laws:4:1": () => Math.sqrt((g * 6.4e6 ** 2) / (2 * 6.4e6)) / 1000,
  "satellites-and-keplers-laws:5:1": () => { const GM = g * 6.4e6 ** 2, m = 600; const E = (r: number) => 0.5 * m * (GM / r) - (GM * m) / r; return (E(3 * 6.4e6) - E(2 * 6.4e6)) / 1e9; },
  "fluid-mechanics:2:1": () => (1000 * g * 10) / 1000,
  "fluid-mechanics:4:1": () => { const v = Math.sqrt(2 * g * 5); const t = Math.sqrt((2 * 5) / g); return v * t; },
  "fluid-mechanics:5:1": () => { // simulate the ball: in water, then in air
    let y = -2, v = 0; const dt = 1e-6; const a = (1000 / 500 - 1) * g;
    while (y < 0) { v += a * dt; y += v * dt; }
    let h = 0; while (v > 0) { v -= g * dt; h += v * dt; } return h;
  },
  "first-law-of-thermodynamics:2:1": () => 500 - 200,
  "first-law-of-thermodynamics:4:1": () => 2 * 2.5 * 8.31 * 100,
  "first-law-of-thermodynamics:5:1": () => { // shoelace area with orientation: W_by = ∮P dV
    const pts = [[1e-3, 1e5], [3e-3, 1e5], [3e-3, 2e5], [1e-3, 2e5]]; let W = 0;
    for (let i = 0; i < 4; i++) { const [v1, p1] = pts[i], [v2, p2] = pts[(i + 1) % 4]; W += ((p1 + p2) / 2) * (v2 - v1); } return W;
  },
  "kinetic-theory:2:1": () => Math.sqrt((3 * 8.31 * 300) / 0.032),
  "kinetic-theory:4:1": () => Math.sqrt((3 * 8.31 * 300) / 0.002) / Math.sqrt((3 * 8.31 * 300) / 0.032),
  "kinetic-theory:5:1": () => { const k = 1.38e-23, V0 = 1; const N1 = (1 * V0) / (k * 300), N2 = (2 * V0) / (k * 600); return (N2 * 1.5 * k * 600) / (N1 * 1.5 * k * 300); },
  "kirchhoffs-laws-and-circuits:2:1": () => 12 - (12 / 6) * 1,
  "kirchhoffs-laws-and-circuits:4:1": () => { const V0 = bisect((V) => (2 - V) + (4 - V) - V / 1.5, 0, 4); return V0 / 1.5; },
  "kirchhoffs-laws-and-circuits:5:1": () => { const X = (12 * 40) / 60; const Xp = 1 / (1 / X + 1 / 24); return bisect((l) => Xp / 12 - l / (100 - l), 1, 99); },
  "force-on-moving-charges-and-currents:2:1": () => ((1.6e-27 * 2e6) / (1.6e-19 * 0.1)) * 100,
  "force-on-moving-charges-and-currents:4:1": () => bisect((S) => (1 * S) / (S + 50) - 0.01, 1e-6, 50) ,
  "force-on-moving-charges-and-currents:5:1": () => ((1.6e-27 * (1e4 / 0.05)) / (1.6e-19 * 0.05)) * 100,
  "electromagnetic-induction:2:1": () => (10 * (0.5 - 0.1)) / 0.2,
  "electromagnetic-induction:4:1": () => simpson((i) => 2 * i, 0, 3),
  "electromagnetic-induction:5:1": () => { const e = 1 * 4 * 0.5, I = e / 2; return I * I * 2; },
  "electromagnetic-waves:2:1": () => (30 / 3e8) * 1e9,
  "electromagnetic-waves:4:1": () => 8.85e-12 * 0.01 * 1e12 * 1000,
  "electromagnetic-waves:5:1": () => { // average u_E + u_B over a period, times c
    const E0 = 600, c = 3e8, e0 = 8.85e-12, mu0 = 1 / (e0 * c * c), B0 = E0 / c;
    const avg = simpson((t) => 0.5 * e0 * (E0 * Math.sin(t)) ** 2 + (B0 * Math.sin(t)) ** 2 / (2 * mu0), 0, 2 * Math.PI) / (2 * Math.PI);
    return avg * c;
  },
  "wave-optics:2:1": () => ((600e-9 * 1) / 0.5e-3) * 1000,
  "wave-optics:4:1": () => 2 * 2 * Math.tan(Math.asin(500e-9 / 0.2e-3)) * 1000,
  "wave-optics:5:1": () => ((5 * 600e-9) / (1.5 - 1)) * 1e6,
  "photoelectric-effect:2:1": () => 5 - 2,
  "photoelectric-effect:4:1": () => 1240 / 310 - (1240 / 248 - 3),
  "photoelectric-effect:5:1": () => { const K = 2 * 1.6e-19, m = 9.1e-31, v = Math.sqrt((2 * K) / m); return ((m * v) / (1.6e-19 * 1e-4)) * 100; },
  "nuclei:2:1": () => 0.02 * 931.5,
  "nuclei:4:1": () => (1.007276 + 1.008665 - 2.013553) * 931.5,
  "nuclei:5:1": () => 2 * 120 * 8.5 - 240 * 7.6,
  "semiconductors-and-diodes:2:1": () => ((15 - 10) / 50 - 10 / 200) * 1000,
  "semiconductors-and-diodes:4:1": () => ((5.7 - 0.7) / 1000) * 1000,
  "semiconductors-and-diodes:5:1": () => { // smallest R_L (scan) with Zener current ≥ 0
    for (let R = 1; R <= 1000; R++) if ((15 - 10) / 50 - 10 / R >= -1e-12) return R; return NaN;
  },
  "measuring-instruments:2:1": () => 3 + 27 * (0.5 / 50),
  "measuring-instruments:4:1": () => 23 + 6 * (1 - 9 / 10) + 0.2,
  "measuring-instruments:5:1": () => { // worst case by direct evaluation of ρ at the error extremes
    const rho = (d: number, L: number) => (Math.PI * d * d) / (4 * L);
    const r0 = rho(0.5, 50), r1 = rho(0.51, 49.9); return ((r1 - r0) / r0) * 100;
  },

  // ── chemistry, set 3 ──
  "mole-concept:2:1": () => 0.25 * (12 + 2 * 16),
  "mole-concept:4:1": () => (8 / 16) * 2 * 32,
  "mole-concept:5:1": () => 100 * bisect((x) => x * (56 / 100) + (1 - x) * (40 / 84) - 0.5181, 0, 1),
  "vsepr-and-molecular-geometry:2:1": () => (8 - 4) / 2,
  "vsepr-and-molecular-geometry:4:1": () => [[3, 3], [5, 3], [7, 3], [5, 5], [6, 4], [8, 4], [4, 4]].filter(([v, b]) => (v - b) / 2 > 0).length,
  "first-law-and-enthalpy:2:1": () => -393.5 + 283.0,
  "first-law-and-enthalpy:4:1": () => -92.4 + 2 * 8.314e-3 * 298,
  "first-law-and-enthalpy:5:1": () => 4 * 415 + 2 * 498 - (2 * 804 + 4 * 463) - 2 * 44,
  "colligative-properties:2:1": () => 1.86 * 0.1,
  "colligative-properties:4:1": () => 0.1 * 0.0821 * 300,
  "colligative-properties:5:1": () => 100 * bisect((a) => 5.12 * ((2.44 / 122) / 0.1) * (1 - a / 2) - 0.64, 0, 1),
  "periodic-trends:2:1": () => 10 + 2 + (16 - 12), // after Ne (10): Na, Mg, then groups 13–16
  "groups-15-to-18:2:1": () => 1 + 3, // one 2s + three 2p orbitals
  "transition-elements:2:1": () => spinOnly(5),
  "transition-elements:4:1": () => ((20e-3 * 0.1) / 5 / 0.02) * 1000,
  "bonding-in-coordination-compounds:2:1": () => 5 - 2 * 2, // t2g⁵: two pairs, one single
  "bonding-in-coordination-compounds:4:1": () => Math.abs(6 * -0.4 + 0 * 0.6),
  "bonding-in-coordination-compounds:5:1": () => spinOnly(2) + spinOnly(0),
  "purification-and-analysis:2:1": () => ((10e-3 * 1 * 2 * 14) / 0.5) * 100,
  "purification-and-analysis:4:1": () => ((0.287 * 35.5) / 143.5 / 0.2) * 100,
  "purification-and-analysis:5:1": () => { const c = 0.44 / 44, h = (0.18 / 18) * 2, o = (0.3 - c * 12 - h) / 16; const emp = (c / c) * 12 + (h / c) * 1 + (o / c) * 16; return (180 / emp) * (c / c); },
  "electronic-effects-and-intermediates:2:1": () => 3 * 3,
  "alkanes-alkenes-and-alkynes:2:1": () => (2 * 4 + 2 - 4) / 2, // degrees of unsaturation of C4H4
  "haloalkanes-and-haloarenes:2:1": () => 1 + 1,
  "aldehydes-and-ketones:2:1": () => 3 + 2,
  "amines-and-diazonium-salts:2:1": () => 2 + 1 + 1, // enumerated: two 1°, one 2°, one 3°
  "biomolecules:2:1": () => [2, 3, 4, 5].length,
  "practical-chemistry:2:1": () => 6,
  "practical-chemistry:4:1": () => ((25e-3 * 0.05 * 2) / 5 / 0.02) * 1000,

  // ── mathematics, set 3 ──
  "functions:2:1": () => { const f = (x: number) => x * x + 1, gg = (x: number) => 2 * x - 1; return f(gg(2)); },
  "functions:4:1": () => { let n = 0; for (let m = 0; m < 8; m++) { const img = new Set([0, 1, 2].map((i) => (m >> i) & 1)); if (img.size === 2) n++; } return n; },
  "functions:5:1": () => { const f = (x: number) => (x + 1) / (x - 1); let x = 2; for (let i = 0; i < 2027; i++) x = f(x); return x; },
  "counting:2:1": () => C(10, 3),
  "counting:4:1": () => { const perms = new Set<string>(); const go = (s: string, rest: string) => { if (!rest) { perms.add(s); return; } for (let i = 0; i < rest.length; i++) go(s + rest[i], rest.slice(0, i) + rest.slice(i + 1)); }; go("", "BANANA"); return perms.size; },
  "counting:5:1": () => range(1000, 9999).filter((n) => n % 5 === 0 && new Set(String(n)).size === 4).length,
  "binomial-theorem:2:1": () => polyPow([1, 1], 5)[2],
  "binomial-theorem:4:1": () => { // (x² + 1/x)^9 = x^-9 (x³ + 1)^9: constant term is the x^9 coefficient of (1 + x³)^9
    return polyPow([1, 0, 0, 1], 9)[9];
  },
  "binomial-theorem:5:1": () => polyMul(polyPow([1, 1], 5), polyPow([1, -1], 5))[4],
  "progressions:2:1": () => range(0, 19).reduce((s, k) => s + 2 * k + 1, 0),
  "progressions:4:1": () => { for (let a = 1; a <= 100; a++) for (let b = 1; b <= a; b++) if (a + b === 10 && a * b === 16) return a; return NaN; },
  "progressions:5:1": () => { let best = Infinity; for (let x = 0.01; x < 100; x += 0.001) best = Math.min(best, x + (4 * 16) / x); return best; },
  "applications-of-derivatives:2:1": () => { let m = -Infinity; for (let x = -10; x <= 10; x += 1e-4) m = Math.max(m, -x * x + 4 * x + 1); return m; },
  "applications-of-derivatives:4:1": () => (Math.PI * (5 + 2e-6) ** 2 - Math.PI * 5 ** 2) / 1e-6,
  "applications-of-derivatives:5:1": () => { let m = 0; for (let x = 0; x <= 6; x += 1e-5) m = Math.max(m, x * (12 - 2 * x) ** 2); return m; },
  "differential-equations:2:1": () => rk4((x) => 2 * x, 0, 1, 3),
  "differential-equations:4:1": () => rk4((_x, y) => 1 - y, 0, 0, Math.log(2)),
  "differential-equations:5:1": () => { // integrate from a point on the curve near (1,0) along the branch y > 0 (y = 0 is singular)
    const x0 = 1.0001, y0 = Math.sqrt(x0 * x0 - x0); return rk4((x, y) => (x * x + y * y) / (2 * x * y), x0, y0, 3) ** 2;
  },
  "straight-lines:2:1": () => Math.abs(3 * 1 + 4 * 2 - 1) / 5,
  "straight-lines:4:1": () => { const x = 1, y = 1; return (5 - 2 * y) / x; },
  "straight-lines:5:1": () => { // foot by projection, image = 2·foot − P
    const P = [2, 3], n = [3, 4], A = [5 / 3, 0]; const t = dot([P[0] - A[0], P[1] - A[1]], n) / dot(n, n);
    const foot = [P[0] - t * n[0], P[1] - t * n[1]]; return 2 * foot[0] - P[0] + (2 * foot[1] - P[1]);
  },
  "lines-and-planes:2:1": () => norm([3, 4, 0]),
  "lines-and-planes:4:1": () => [0, 1, 2].reduce((s, i) => s + ([1, 2, 3][i] * 2 + [4, 5, 6][i]) / 3, 0),
  "lines-and-planes:5:1": () => { // brute-force minimum distance between points on the two lines
    let best = Infinity; for (let s = -3; s <= 3; s += 0.002) { const p = [s, s, 0]; const d = [1 - p[0], -p[1], 1 - p[2]]; const t = -dot(d, [0, 1, 1]) / 2; best = Math.min(best, norm([d[0], d[1] + t, d[2] + t])); } return best;
  },
  "vectors:2:1": () => norm(cross([1, 2, 0], [3, 1, 0])),
  "vectors:4:1": () => 0.5 * norm(cross([-1, 1, 0], [-1, 0, 1])),
  "vectors:5:1": () => { const ab = (25 - 9 - 16) / 2; return Math.sqrt(9 * 16 - ab * ab); },
  "inverse-trigonometric-functions:2:1": () => deg(Math.asin(0.5) + Math.acos(0.5)),
  "inverse-trigonometric-functions:4:1": () => deg(Math.atan(0.5) + Math.atan(1 / 3)),
  "inverse-trigonometric-functions:5:1": () => Math.sin(2 * Math.atan(1 / 3)) + Math.cos(Math.atan(2 * Math.sqrt(2))),
  // ── coverage sets: physics ──
  "errors-and-significant-figures:2:1": () => { // worst-case relative change for tiny errors in the same 1 : 2 : 3 ratio
    const s = 1e-6; let worst = 0; for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) worst = Math.max(worst, Math.abs(((1 + a * s) ** 2 * (1 + 2 * b * s)) / (1 + 3 * c * s) - 1));
    return worst / s;
  },
  "errors-and-significant-figures:4:1": () => { // perturb L and T (first order)
    const gOf = (L: number, T: number) => (4 * Math.PI ** 2 * L) / T ** 2; const g0 = gOf(100, 2); const d = 1e-6;
    const dL = (gOf(100 + d, 2) - g0) / d, dT = (gOf(100, 2 + d) - g0) / d; return ((Math.abs(dL) * 0.1 + Math.abs(dT) * 0.01) / g0) * 100;
  },
  "motion-in-a-straight-line:2:1": () => { let x = 0, v = 0; const dt = 1e-5; for (let t = 0; t < 5 - 1e-9; t += dt) { x += v * dt + dt * dt; v += 2 * dt; } return x; },
  "motion-in-a-straight-line:4:1": () => { let x = 20 * 0.5, v = 20; const dt = 1e-5; while (v > 0) { x += v * dt - 2.5 * dt * dt; v -= 5 * dt; } return x; },
  "vectors-in-kinematics:2:1": () => norm([3, 4, 0]),
  "vectors-in-kinematics:4:1": () => norm([0 - 8, -6, 0]),
  "uniform-circular-motion:2:1": () => 4 ** 2 * 0.5,
  "uniform-circular-motion:4:1": () => norm([4 ** 2 / 2, 6, 0]),
  "newtons-laws-and-free-body-diagrams:2:1": () => bisect((a) => (3 * g - 3 * a) - (2 * g + 2 * a), 0, 10), // equal tensions
  "newtons-laws-and-free-body-diagrams:4:1": () => bisect((a) => (3 * g - 3 * a) - (2 * g * Math.sin(Math.PI / 6) + 2 * a), 0, 10),
  "dynamics-of-circular-motion:2:1": () => bisect((v) => v * v / 20 - 0.5 * g, 0, 100),
  "dynamics-of-circular-motion:4:1": () => 0.5 * 4 ** 2 / 1 - 0.5 * g,
  "conservation-of-linear-momentum:2:1": () => bisect((V) => 5 * V - 0.05 * 200, 0, 100),
  "conservation-of-linear-momentum:4:1": () => { const v2 = (1 * 12) / 2; return 0.5 * 1 * 144 + 0.5 * 2 * v2 * v2; },
  "potential-energy-and-conservative-forces:2:1": () => simpson((x) => 200 * x, 0, 0.1),
  "potential-energy-and-conservative-forces:4:1": () => { // time-step the block against the spring
    let x = 0, v = 4; const dt = 1e-6; while (v > 0) { v -= (800 * x / 2) * dt; x += v * dt; } return x * 100;
  },
  "power-and-collisions:2:1": () => { const v = 6 / 3; return 0.5 * 36 - 0.5 * 3 * v * v; },
  "power-and-collisions:4:1": () => { const v = Math.sqrt(2 * g * 10) * 0.5; return v * v / (2 * g); },
  "centre-of-mass:2:1": () => (0 * 1 + 1 * 2 + 2 * 3) / 6,
  "centre-of-mass:4:1": () => Math.abs(2 * 3 - 1 * 3) / 3,
  "angular-momentum-and-rolling:2:1": () => (2 * 10) / 4,
  "angular-momentum-and-rolling:4:1": () => 0.5 * 2 * 100 - 0.5 * 4 * 25,
  "gravitational-field-and-potential:2:1": () => 10 / 2 ** 2,
  "gravitational-field-and-potential:4:1": () => simpson((r) => (10 * 6.4e6 ** 2) / (r * r), 6.4e6, 12.8e6) / 1e6, // integrate g(r)
  "elasticity:2:1": () => ((100 * 2) / (1e-6 * 2e11)) * 1000,
  "elasticity:4:1": () => simpson((x) => (100 / 1e-3) * x, 0, 1e-3) * 1000,
  "surface-tension:2:1": () => (4 * 0.025) / 0.01,
  "surface-tension:4:1": () => bisect((h) => 1000 * g * h * Math.PI * 1e-8 - 0.07 * 2 * Math.PI * 1e-4, 0, 1) * 100, // weight of column = surface force
  "thermal-properties:2:1": () => (2 * 4200 * 10) / 1000,
  "thermal-properties:4:1": () => bisect((T) => 0.1 * 336 + 0.1 * 4.2 * T - 0.1 * 4.2 * (100 - T), 0, 100), // heat gained = heat lost
  "second-law-and-heat-engines:2:1": () => ((1000 - 600) / 1000) * 100,
  "second-law-and-heat-engines:4:1": () => 300 / 100,
  "degrees-of-freedom:2:1": () => 3 / 2,
  "degrees-of-freedom:4:1": () => { const cv = (2 * 1.5 + 3 * 2.5) / 5; return (cv + 1) / cv; },
  "wave-motion:2:1": () => 500 * 0.68,
  "wave-motion:4:1": () => Math.sqrt(100 / 0.01),
  "superposition-and-standing-waves:2:1": () => { // count loudness minima (envelope zero crossings) over 10 s
    let n = 0; const env = (t: number) => Math.cos(Math.PI * (260 - 256) * t); for (let t = 0; t < 10; t += 1e-4) if (env(t) * env(t + 1e-4) < 0) n++; return n / 10;
  },
  "superposition-and-standing-waves:4:1": () => 200 / (2 * 1),
  "electric-field:2:1": () => (9e9 * 2e-6) / 9,
  "electric-field:4:1": () => simpson((th) => 2e-8 * 1e4 * Math.sin(th), 0, Math.PI) / 1e-4,
  "gausss-law:2:1": () => 8.85e-9 / 8.85e-12,
  "gausss-law:4:1": () => 2e-9 / (2 * Math.PI * 8.854e-12 * 0.18),
  "electric-potential:2:1": () => (9e9 * 1e-9) / 0.3,
  "electric-potential:4:1": () => simpson((u) => { const r = Math.exp(u); return ((9e9 * 2e-6 * 3e-6) / (r * r)) * r; }, Math.log(0.3), Math.log(3e5)), // work to bring q2 in from far away
  "ohms-law-and-resistance:2:1": () => { const L = 2, A = 1 / 2; return L / A; },
  "ohms-law-and-resistance:4:1": () => 1 / (1 / 6 + 1 / 6) + 6,
  "biot-savart-and-amp-res-laws:2:1": () => { // integrate Biot–Savart around the loop
    const mu = 4e-7 * Math.PI; return (simpson(() => (mu * 5 * 0.1) / (4 * Math.PI * 0.1 ** 2), 0, 2 * Math.PI)) * 1e6;
  },
  "biot-savart-and-amp-res-laws:4:1": () => 4e-7 * Math.PI * 1000 * 2 * 1000,
  "magnetism-and-matter:2:1": () => 2 * 0.1 * Math.sin(Math.PI / 6),
  "magnetism-and-matter:4:1": () => simpson((th) => 2 * 0.1 * Math.sin(th), 0, Math.PI),
  "alternating-current:2:1": () => Math.sqrt(simpson((t) => (311 * Math.sin(t)) ** 2, 0, 2 * Math.PI) / (2 * Math.PI)),
  "alternating-current:4:1": () => bisect((w) => w * 0.1 - 1 / (w * 10e-6), 1, 1e5),
  "matter-waves:2:1": () => 6.626e-34 / Math.sqrt(2 * 9.109e-31 * 1.602e-19 * 100) * 1e10,
  "matter-waves:4:1": () => (6.6e-34 / (6.6e-27 * 1000)) * 1e10,
  "atomic-models-and-spectra:2:1": () => 0.529 * 2 ** 2,
  "atomic-models-and-spectra:4:1": () => bisect((d) => (9e9 * 2 * 79 * 1.6e-19 ** 2) / d - 5e6 * 1.6e-19, 1e-16, 1e-12) * 1e15,
  "logic-gates:2:1": () => 2 ** 3,
  "logic-gates:4:1": () => [0, 1].flatMap((a) => [0, 1].map((b) => (!(a && b) && (a || b) ? 1 : 0))).reduce((s: number, x) => s + x, 0),
  "standard-experiments:2:1": () => 2 * 500 * (0.50 - 0.16),
  "standard-experiments:4:1": () => (2 * g * 2) / (Math.PI * 0.5e-3 ** 2 * 0.4e-3) / 1e11,

  // ── coverage sets: chemistry ──
  "stoichiometry:2:1": () => 4 / 40 / 0.25,
  "stoichiometry:4:1": () => ((0.02 * 0.5 * 2) / 0.1) * 1000,
  "quantum-mechanical-model:2:1": () => 3 - 1 - 1,
  "quantum-mechanical-model:4:1": () => 6.63e-34 / (4 * Math.PI * 9.1e-31 * 1e-10) / 1e5,
  "electronic-configuration:2:1": () => { // Hund's rule on 3d^6 (4s^2 paired)
    const orb = Array(5).fill(0); for (let e = 0; e < 6; e++) orb[e % 5]++; return orb.filter((n) => n === 1).length;
  },
  "electronic-configuration:4:1": () => { // Aufbau fill for Z = 17 and count p electrons
    const order: [string, number][] = [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6]]; let left = 17, p = 0;
    for (const [n, cap] of order) { const k = Math.min(cap, left); left -= k; if (n.endsWith("p")) p += k; } return p;
  },
  "hybridisation:2:1": () => [3, 3, 3].filter((sigma) => sigma === 3).length, // σ-domains on C1, C2, C3 (no lone pairs)
  "hybridisation:4:1": () => 3 /* C–H */ + 1 /* C=C */ + 1 /* C–C */ + 1 /* C≡N */,
  "molecular-orbital-theory:2:1": () => { // fill MOs for O2^- (17 e): bonding 10, antibonding = 17 − 10
    const total = 17, bonding = 10; return (bonding - (total - bonding)) / 2;
  },
  "molecular-orbital-theory:4:1": () => { // B2 valence: σ2s², σ*2s², then π2p (two degenerate) with 2 e
    const pi = [0, 0]; for (let e = 0; e < 2; e++) pi[e % 2]++; return pi.filter((n) => n === 1).length;
  },
  "ionic-bonding-and-polarity:2:1": () => (1.6e-19 * 1e-10) / 3.336e-30,
  "ionic-bonding-and-polarity:4:1": () => ((1.03 * 3.336e-30) / (1.6e-19 * 1.27e-10)) * 100,
  "entropy-and-gibbs-energy:2:1": () => 40700 / 373,
  "entropy-and-gibbs-energy:4:1": () => bisect((T) => 30000 - T * 100, 1, 2000),
  "raoults-law:2:1": () => 0.4 * 100 + 0.6 * 50,
  "raoults-law:4:1": () => (0.4 * 100) / (0.4 * 100 + 0.6 * 50),
  "chemical-equilibrium:2:1": () => { const B = 4, A = 1; return (A * A) / (B * B); }, // [A]=1, [B]=4 satisfy K=4
  "chemical-equilibrium:4:1": () => { const n = [0.5, 0.5, 0.5], tot = 1.5, P = 3; const p = n.map((x) => (x / tot) * P); return (p[1] * p[2]) / p[0]; },
  "redox-reactions:2:1": () => bisect((x) => 2 * 1 + 2 * x - 14, -10, 10),
  "redox-reactions:4:1": () => (7 - 2) / (3 - 2),
  "conductance-and-electrolysis:2:1": () => (1000 * 0.0012) / 0.01,
  "conductance-and-electrolysis:4:1": () => 39 / 390,
  "temperature-dependence-of-rate:2:1": () => { let r = 1; for (let T = 0; T < 30; T += 10) r *= 2; return r; },
  "temperature-dependence-of-rate:4:1": () => 100 - -40,
  "groups-13-and-14:2:1": () => 6 - 4, // 6 H, 4 of them terminal
  "groups-13-and-14:4:1": () => 2 * 2,
  "lanthanoids-and-actinoids:2:1": () => 64 - 3 - 54, // Z(Gd) − charge − [Xe]
  "lanthanoids-and-actinoids:4:1": () => 58 - 3 - 54,
  "nomenclature-and-isomerism:2:1": () => { // enumerate positions of the two Cl on a square (0..3), up to rotation/reflection
    const shapes = new Set<number>(); for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) shapes.add(Math.min(j - i, 4 - (j - i))); return shapes.size;
  },
  "nomenclature-and-isomerism:4:1": () => 2 /* cis pair */ + 1 /* trans */,
  "nomenclature-and-isomerism-basic-principles-organic:2:1": () => 3, // enumerated: n-, iso-, neo-pentane
  "nomenclature-and-isomerism-basic-principles-organic:4:1": () => { // (R/S) at C2, C3 with the meso pair counted once
    const forms = new Set<string>(); for (const a of "RS") for (const b of "RS") forms.add([a, b].sort().join("")); return forms.size;
  },
  "aromatic-hydrocarbons:2:1": () => 3 * 2,
  "aromatic-hydrocarbons:4:1": () => 3 /* o, m, p */ + 1 /* benzylic */,
  "alcohols-phenols-and-ethers:2:1": () => 2 /* on n-butane: C1, C2 */ + 2 /* on isobutane: C1, C2 */,
  "alcohols-phenols-and-ethers:4:1": () => [2, 4, 6].length,
  "carboxylic-acids:2:1": () => 2,
  "carboxylic-acids:4:1": () => -Math.log10(1.8e-5),

  // ── coverage sets: mathematics ──
  "sets-and-relations:2:1": () => range(1, 50).filter((s) => !(s <= 30) && !(s >= 16 && s <= 40)).length, // P = 1..30, C = 16..40 (15 in both)
  "sets-and-relations:4:1": () => { let n = 0; for (let m = 0; m < 512; m++) { if ([0, 4, 8].every((b) => (m >> b) & 1)) n++; } return n; }, // brute force over all 2^9 relations
  "complex-numbers:2:1": () => { let re = 1, im = 0; for (let k = 0; k < 100; k++) [re, im] = [-im, re]; return re; },
  "complex-numbers:4:1": () => { let re = 1, im = 0; for (let k = 0; k < 12; k++) [re, im] = [re - im, re + im]; return re; },
  "matrices:2:1": () => 2 + 1,
  "matrices:4:1": () => { const mul = (a: number[][], b: number[][]) => a.map((r) => b[0].map((_, j) => r.reduce((s, x, k) => s + x * b[k][j], 0))); const A = [[1, 2], [0, 1]]; return mul(mul(A, A), A)[0][1]; },
  "limits-and-continuity:2:1": () => { const x = 3 + 1e-7; return (x * x - 9) / (x - 3); },
  "limits-and-continuity:4:1": () => (1 + 2 / 1e8) ** 1e8,
  "differentiation:2:1": () => { const f = (x: number) => x ** 3 + 2 * x, h = 1e-6; return (f(2 + h) - f(2 - h)) / (2 * h); },
  "differentiation:4:1": () => { const f = (x: number) => x ** x, h = 1e-6; return (f(1 + h) - f(1 - h)) / (2 * h); },
  "indefinite-integrals:2:1": () => (simpson((x) => 3 * x * x + 2, 0, 1) - 1) / 1, // ∫₀¹ = 1 + k
  "indefinite-integrals:4:1": () => simpson((x) => (4 * x) / (1 + x * x), 0, 1) / Math.log(2),
  "circles:2:1": () => { const pts = [0, 1, 2].map((k) => [2 + 4 * Math.cos(k), -3 + 4 * Math.sin(k)]); return pts.every(([x, y]) => Math.abs(x * x + y * y - 4 * x + 6 * y - 3) < 1e-9) ? 4 : NaN; },
  "circles:4:1": () => Math.sqrt(13 * 13 - 25),
  "conic-sections:2:1": () => bisect((c) => 2 * Math.hypot(c, 3) - 10, 0, 5) / 5, // focus where the end of the minor axis is 2a from both foci
  "conic-sections:4:1": () => { const x = 6 * Math.cosh(1), y = 8 * Math.sinh(1); return bisect((c) => Math.abs(Math.hypot(x + c, y) - Math.hypot(x - c, y)) - 12, 6.0001, 100); },
  "statistics:2:1": () => { const d = [2, 4, 6, 8, 10]; const m = d.reduce((s, x) => s + x) / 5; return d.reduce((s, x) => s + (x - m) ** 2, 0) / 5; },
  "statistics:4:1": () => { const d = range(1, 10); const m = d.reduce((s, x) => s + x) / 10; return d.reduce((s, x) => s + (x - m) ** 2, 0) / 10; },
  "trigonometric-functions-and-equations:2:1": () => Math.sin((37 * Math.PI) / 180) ** 2 + Math.cos((37 * Math.PI) / 180) ** 2,
  "trigonometric-functions-and-equations:4:1": () => { // count sign changes / touchings of sin2x − cos x on a fine grid
    let n = 0; const N = 200000; const f = (x: number) => Math.sin(2 * x) - Math.cos(x);
    for (let i = 0; i < N; i++) { const a = (2 * Math.PI * i) / N, b = (2 * Math.PI * (i + 1)) / N; if (f(a) === 0 || f(a) * f(b) < 0) n++; } return n;
  },
};

let failed = 0, checked = 0;
const seen: Record<string, number> = {};
const missing: string[] = [];
for (const q of ALL_QUESTIONS) {
  const b = `${q.topic}:${q.level}`;
  seen[b] = (seen[b] ?? 0) + 1;
  if (q.type !== "NUMERICAL") continue;
  const key = `${b}:${seen[b]}`;
  const fn = V[key];
  if (!fn) { missing.push(key); continue; }
  checked++;
  const got = fn();
  const tol = Math.max(q.tolerance ?? 0.01, 1e-6);
  if (!(Math.abs(got - (q.answer as number)) <= tol)) { failed++; console.log(`FAIL ${key}: stored ${q.answer}, recomputed ${got}`); }
}
for (const k of missing) console.log(`NO INDEPENDENT CHECK: ${k}`);
console.log(`${checked} numerical answers recomputed independently; ${failed} mismatch(es); ${missing.length} without a check.`);
process.exit(failed || missing.length ? 1 : 0);
