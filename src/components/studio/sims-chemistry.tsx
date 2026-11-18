"use client";

import { useEffect, useRef } from "react";
import { Arrow, Frame, H, Label, Readout, W, path } from "./svg";
import type { SimDef } from "./types";

// ───────────── Bohr levels & spectral series ─────────────
const RH = 1.097e7;
const SERIES = ["", "Lyman (UV)", "Balmer (visible)", "Paschen (IR)", "Brackett (IR)", "Pfund (IR)"];
function wavelengthColor(nm: number) {
  if (nm < 380 || nm > 750) return "#94a3b8";
  const stops: [number, string][] = [[380, "#7c3aed"], [440, "#3b82f6"], [490, "#06b6d4"], [530, "#22c55e"], [580, "#eab308"], [620, "#f97316"], [700, "#ef4444"], [750, "#b91c1c"]];
  for (let i = 0; i < stops.length - 1; i++) if (nm <= stops[i + 1][0]) return stops[i][1];
  return "#ef4444";
}
export const bohr: SimDef = {
  key: "bohr",
  params: [
    { key: "n2", label: "Upper level n₂", min: 2, max: 7, step: 1, default: 3 },
    { key: "n1", label: "Lower level n₁", min: 1, max: 5, step: 1, default: 2 },
  ],
  duration: () => 3,
  stepState: (s) => ({ t: 3, params: [{ n2: 3, n1: 2 }, { n2: 3, n1: 2 }, { n2: 2, n1: 1 }, { n2: 7, n1: 2 }][s] }),
  render: ({ t, params }) => {
    const n2 = Math.max(params.n2, params.n1 + 1);
    const n1 = Math.min(params.n1, n2 - 1);
    const E = (n: number) => -13.6 / (n * n);
    const yOf = (e: number) => 320 - ((e + 13.6) / 13.6) * 280;
    const dE = E(n2) - E(n1);
    const lam = 1 / (RH * (1 / (n1 * n1) - 1 / (n2 * n2))) * 1e9;
    const col = wavelengthColor(lam);
    const p = Math.min(1, t / 1.2);
    const ey = yOf(E(n2)) + (yOf(E(n1)) - yOf(E(n2))) * p;
    const photon = Math.max(0, t - 1.2) / 1.8;
    const wave: [number, number][] = Array.from({ length: 60 }, (_, i) => [260 + i * 4 + photon * 220, yOf(E(n1)) - 14 + 8 * Math.sin(i * 0.9)]);
    return (
      <Frame label="Bohr energy levels of hydrogen">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <g key={n}>
            <line x1={60} y1={yOf(E(n))} x2={240} y2={yOf(E(n))} stroke={n === n1 || n === n2 ? "#2b8cff" : "#94a3b8"} strokeWidth={n === n1 || n === n2 ? 2.5 : 1.2} />
            {n <= 5 && <Label x={52} y={yOf(E(n)) + 4} anchor="end" size={11}>n={n}</Label>}
            {n <= 4 && <Label x={248} y={yOf(E(n)) + 4} size={10} color="var(--muted)">{E(n).toFixed(2)} eV</Label>}
          </g>
        ))}
        <line x1={60} y1={yOf(0)} x2={240} y2={yOf(0)} stroke="#94a3b8" strokeDasharray="4 4" />
        <Label x={52} y={yOf(0) + 4} anchor="end" size={11}>∞</Label>
        <Arrow x1={150} y1={yOf(E(n2))} x2={150} y2={ey} color="#8b5cf6" width={2} />
        <circle cx={150} cy={ey} r={7} fill="#8b5cf6" />
        {t > 1.2 && <path d={path(wave)} fill="none" stroke={col} strokeWidth={3} opacity={1 - photon * 0.6} />}
        <rect x={300} y={300} width={320} height={24} rx={6} fill="url(#spec)" />
        <defs>
          <linearGradient id="spec">
            {[380, 440, 490, 530, 580, 620, 700, 750].map((nm, i) => <stop key={nm} offset={i / 7} stopColor={wavelengthColor(nm)} />)}
          </linearGradient>
        </defs>
        {lam >= 380 && lam <= 750 && <line x1={300 + ((lam - 380) / 370) * 320} y1={294} x2={300 + ((lam - 380) / 370) * 320} y2={330} stroke="currentColor" strokeWidth={2} />}
        <Label x={300} y={346} size={10} color="var(--muted)">380 nm</Label>
        <Label x={620} y={346} size={10} anchor="end" color="var(--muted)">750 nm (visible window)</Label>
        <Readout x={430} y={20} rows={[["Transition", `${n2} → ${n1}`], ["ΔE", `${dE.toFixed(2)} eV`], ["λ", `${lam.toFixed(1)} nm`], ["Series", SERIES[n1] ?? "—"]]} />
      </Frame>
    );
  },
};

// ───────────── Kinetics: concentration vs time ─────────────
export const kinetics: SimDef = {
  key: "kinetics",
  params: [
    { key: "k", label: "Rate constant k", min: 0.05, max: 0.5, step: 0.01, default: 0.15 },
    { key: "A0", label: "Initial [A]₀", min: 0.5, max: 2, step: 0.1, default: 1, unit: "M" },
  ],
  duration: () => 6,
  stepState: (s) => ({ t: 6 }),
  render: ({ t, params, step }) => {
    const { k, A0 } = params;
    const tmax = 20;
    const gx = 70, gy = 300, gw = 520, gh = 250;
    const X = (tt: number) => gx + (tt / tmax) * gw;
    const Y = (c: number) => gy - (c / 2) * gh;
    const reveal = (Math.min(t, 6) / 6) * tmax;
    const z = (tt: number) => Math.max(0, A0 - k * 0.25 * tt);
    const f = (tt: number) => A0 * Math.exp(-k * tt);
    const s2 = (tt: number) => A0 / (1 + k * A0 * tt);
    const curve = (fn: (x: number) => number) => path(Array.from({ length: 121 }, (_, i) => (i / 120) * reveal).map((tt) => [X(tt), Y(fn(tt))] as [number, number]));
    const half1 = Math.log(2) / k;
    const focus = step === null ? -1 : step;
    const op = (i: number) => (focus < 0 || focus === 3 || focus === i ? 1 : 0.2);
    return (
      <Frame label="Concentration–time curves for zero, first and second order reactions">
        <line x1={gx} y1={gy} x2={gx + gw} y2={gy} className="stroke-slate-400" />
        <line x1={gx} y1={gy} x2={gx} y2={gy - gh} className="stroke-slate-400" />
        <Label x={gx + gw} y={gy + 22} anchor="end" size={11} color="var(--muted)">time (s) →</Label>
        <Label x={gx - 8} y={gy - gh - 6} size={11} color="var(--muted)">[A] (M)</Label>
        {[0, 0.5, 1, 1.5, 2].map((c) => <Label key={c} x={gx - 8} y={Y(c) + 4} anchor="end" size={10} color="var(--muted)">{c}</Label>)}
        <path d={curve(z)} fill="none" stroke="#f59e0b" strokeWidth={3} opacity={op(0)} />
        <path d={curve(f)} fill="none" stroke="#2b8cff" strokeWidth={3} opacity={op(1)} />
        <path d={curve(s2)} fill="none" stroke="#8b5cf6" strokeWidth={3} opacity={op(2)} />
        {[1, 2, 3].map((n) => n * half1 <= reveal && (
          <g key={n} opacity={op(1)}>
            <line x1={X(n * half1)} y1={gy} x2={X(n * half1)} y2={Y(A0 / 2 ** n)} stroke="#2b8cff" strokeDasharray="3 4" />
            <Label x={X(n * half1)} y={gy + 14} anchor="middle" size={10} color="#2b8cff">{n}t½</Label>
          </g>
        ))}
        <g>
          <rect x={gx + gw - 200} y={30} width={200} height={70} rx={10} className="fill-[var(--surface)] stroke-[var(--border)]" />
          <Label x={gx + gw - 188} y={52} size={11} color="#f59e0b">— zero order (k′ = k/4 M/s)</Label>
          <Label x={gx + gw - 188} y={70} size={11} color="#2b8cff">— first order: t½ = {half1.toFixed(1)} s</Label>
          <Label x={gx + gw - 188} y={88} size={11} color="#8b5cf6">— second order</Label>
        </g>
      </Frame>
    );
  },
};

// ───────────── VSEPR 3D geometry ─────────────
type V3 = [number, number, number];
const norm = (v: V3): V3 => { const m = Math.hypot(...v); return [v[0] / m, v[1] / m, v[2] / m]; };
const GEOM: Record<number, V3[]> = {
  2: [[1, 0, 0], [-1, 0, 0]],
  3: [[1, 0, 0], [-0.5, 0.866, 0], [-0.5, -0.866, 0]],
  4: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map((v) => norm(v as V3)),
  5: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-0.5, 0, 0.866], [-0.5, 0, -0.866]],
  6: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
};
// lone-pair positions follow VSEPR preferences (equatorial for 5, trans pairs for 6)
const LP_ORDER: Record<number, number[]> = { 2: [0, 1], 3: [0, 1, 2], 4: [0, 1, 2, 3], 5: [2, 3, 4, 0, 1], 6: [0, 1, 2, 3, 4, 5] };
export const MOLECULES = [
  { name: "CO₂", central: "C", ligand: "O", bp: 2, lp: 0, shape: "Linear", angle: "180°" },
  { name: "BF₃", central: "B", ligand: "F", bp: 3, lp: 0, shape: "Trigonal planar", angle: "120°" },
  { name: "CH₄", central: "C", ligand: "H", bp: 4, lp: 0, shape: "Tetrahedral", angle: "109.5°" },
  { name: "NH₃", central: "N", ligand: "H", bp: 3, lp: 1, shape: "Trigonal pyramidal", angle: "≈107°" },
  { name: "H₂O", central: "O", ligand: "H", bp: 2, lp: 2, shape: "Bent", angle: "≈104.5°" },
  { name: "PCl₅", central: "P", ligand: "Cl", bp: 5, lp: 0, shape: "Trigonal bipyramidal", angle: "90°, 120°" },
  { name: "SF₄", central: "S", ligand: "F", bp: 4, lp: 1, shape: "See-saw", angle: "<90°, <120°" },
  { name: "ClF₃", central: "Cl", ligand: "F", bp: 3, lp: 2, shape: "T-shaped", angle: "<90°" },
  { name: "XeF₂", central: "Xe", ligand: "F", bp: 2, lp: 3, shape: "Linear", angle: "180°" },
  { name: "SF₆", central: "S", ligand: "F", bp: 6, lp: 0, shape: "Octahedral", angle: "90°" },
  { name: "BrF₅", central: "Br", ligand: "F", bp: 5, lp: 1, shape: "Square pyramidal", angle: "<90°" },
  { name: "XeF₄", central: "Xe", ligand: "F", bp: 4, lp: 2, shape: "Square planar", angle: "90°" },
];
const HYB: Record<number, string> = { 2: "sp", 3: "sp²", 4: "sp³", 5: "sp³d", 6: "sp³d²" };
export const vsepr: SimDef = {
  key: "vsepr",
  params: [
    { key: "mol", label: "Molecule", min: 0, max: MOLECULES.length - 1, step: 1, default: 3, options: MOLECULES.map((m) => m.name) },
    { key: "tilt", label: "Tilt", min: -60, max: 60, step: 5, default: 20, unit: "°" },
  ],
  duration: () => Infinity,
  stepState: (s) => ({ t: 1, params: { mol: [2, 2, 3, 4][s] } }),
  render: ({ t, params }) => {
    const m = MOLECULES[Math.round(params.mol)];
    const sn = m.bp + m.lp;
    const dirs = GEOM[sn];
    const order = LP_ORDER[sn];
    const lpIdx = new Set(order.slice(0, m.lp));
    if (sn === 6 && m.lp === 2) { lpIdx.clear(); lpIdx.add(4); lpIdx.add(5); }
    if (sn === 6 && m.lp === 1) { lpIdx.clear(); lpIdx.add(5); }
    if (sn === 5 && m.lp === 3) { lpIdx.clear(); [2, 3, 4].forEach((i) => lpIdx.add(i)); }
    if (sn === 4) { lpIdx.clear(); order.slice(0, m.lp).forEach((i) => lpIdx.add(i)); }
    const yaw = t * 0.6, tilt = (params.tilt * Math.PI) / 180;
    const proj = (v: V3) => {
      const x1 = v[0] * Math.cos(yaw) + v[2] * Math.sin(yaw);
      const z1 = -v[0] * Math.sin(yaw) + v[2] * Math.cos(yaw);
      const y2 = v[1] * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = v[1] * Math.sin(tilt) + z1 * Math.cos(tilt);
      return { x: 230 + x1 * 120, y: 180 - y2 * 120, z: z2 };
    };
    const items = dirs.map((d, i) => ({ ...proj(d), lp: lpIdx.has(i) })).sort((a, b) => a.z - b.z);
    return (
      <Frame label={`3D model of ${m.name}`}>
        {items.filter((i) => i.z < 0).map((it, i) => <Atom key={`b${i}`} it={it} m={m} />)}
        <circle cx={230} cy={180} r={26} fill="#8b5cf6" stroke="white" strokeWidth={2} />
        <Label x={230} y={185} anchor="middle" size={13} color="white">{m.central}</Label>
        {items.filter((i) => i.z >= 0).map((it, i) => <Atom key={`f${i}`} it={it} m={m} />)}
        <Readout x={440} y={30} rows={[["Molecule", m.name], ["Bond pairs", String(m.bp)], ["Lone pairs", String(m.lp)], ["Steric no.", String(sn)], ["Hybridisation", HYB[sn]], ["Shape", m.shape], ["Bond angle", m.angle]]} />
        <Label x={440} y={200} size={11} color="var(--muted)">Pink lobes = lone pairs</Label>
      </Frame>
    );
  },
};
function Atom({ it, m }: { it: { x: number; y: number; z: number; lp: boolean }; m: (typeof MOLECULES)[number] }) {
  const s = 1 + it.z * 0.18;
  if (it.lp) {
    const dx = it.x - 230, dy = it.y - 180;
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    return <ellipse cx={230 + dx * 0.62} cy={180 + dy * 0.62} rx={38 * s} ry={18 * s} transform={`rotate(${ang} ${230 + dx * 0.62} ${180 + dy * 0.62})`} fill="#f472b6" fillOpacity={0.35} stroke="#f472b6" />;
  }
  return (
    <g>
      <line x1={230} y1={180} x2={it.x} y2={it.y} stroke="#94a3b8" strokeWidth={5 * s} strokeLinecap="round" />
      <circle cx={it.x} cy={it.y} r={17 * s} fill="#2b8cff" stroke="white" strokeWidth={2} />
      <Label x={it.x} y={it.y + 4} anchor="middle" size={11} color="white">{m.ligand}</Label>
    </g>
  );
}

// ───────────── Atomic orbitals (canvas density + radial probability) ─────────────
export const ORBITALS = [
  { name: "1s", n: 1, l: 0, f: (x: number, z: number, r: number) => Math.exp(-r), R: (r: number) => Math.exp(-r) },
  { name: "2s", n: 2, l: 0, f: (x: number, z: number, r: number) => (2 - r) * Math.exp(-r / 2), R: (r: number) => (2 - r) * Math.exp(-r / 2) },
  { name: "2p_z", n: 2, l: 1, f: (x: number, z: number, r: number) => z * Math.exp(-r / 2), R: (r: number) => r * Math.exp(-r / 2) },
  { name: "3s", n: 3, l: 0, f: (x: number, z: number, r: number) => (27 - 18 * r + 2 * r * r) * Math.exp(-r / 3), R: (r: number) => (27 - 18 * r + 2 * r * r) * Math.exp(-r / 3) },
  { name: "3p_z", n: 3, l: 1, f: (x: number, z: number, r: number) => (6 - r) * z * Math.exp(-r / 3), R: (r: number) => (6 - r) * r * Math.exp(-r / 3) },
  { name: "3d_xz", n: 3, l: 2, f: (x: number, z: number, r: number) => x * z * Math.exp(-r / 3), R: (r: number) => r * r * Math.exp(-r / 3) },
  { name: "3d_z²", n: 3, l: 2, f: (x: number, z: number, r: number) => (3 * z * z - r * r) * Math.exp(-r / 3), R: (r: number) => r * r * Math.exp(-r / 3) },
];
function OrbitalCanvas({ idx }: { idx: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const N = 200;
    const o = ORBITALS[idx];
    const extent = o.n === 1 ? 6 : o.n === 2 ? 14 : 26;
    const img = ctx.createImageData(N, N);
    let max = 0;
    const vals = new Float32Array(N * N);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const x = ((i / N) * 2 - 1) * extent, z = (1 - (j / N) * 2) * extent;
      const r = Math.hypot(x, z);
      const v = o.f(x, z, r);
      vals[j * N + i] = v;
      max = Math.max(max, v * v);
    }
    for (let k = 0; k < N * N; k++) {
      const v = vals[k];
      const d = Math.pow((v * v) / max, 0.35);
      const pos = v >= 0;
      img.data[k * 4] = pos ? 43 : 249;
      img.data[k * 4 + 1] = pos ? 140 : 115;
      img.data[k * 4 + 2] = pos ? 255 : 22;
      img.data[k * 4 + 3] = Math.round(d * 255);
    }
    ctx.putImageData(img, 0, 0);
  }, [idx]);
  return <canvas ref={ref} width={200} height={200} className="h-full w-full" />;
}
export const orbitals: SimDef = {
  key: "orbitals",
  params: [{ key: "orb", label: "Orbital", min: 0, max: ORBITALS.length - 1, step: 1, default: 2, options: ORBITALS.map((o) => o.name) }],
  duration: () => 8,
  stepState: (s) => ({ t: 4, params: { orb: [1, 2, 5, 4][s] } }),
  render: ({ t, params }) => {
    const idx = Math.round(params.orb);
    const o = ORBITALS[idx];
    const extent = o.n === 1 ? 6 : o.n === 2 ? 14 : 26;
    const P = (r: number) => r * r * o.R(r) ** 2;
    const samples = Array.from({ length: 200 }, (_, i) => (i / 199) * extent);
    const pmax = Math.max(...samples.map(P));
    const rNow = (Math.min(t, 8) / 8) * extent;
    const gx = 360, gy = 300, gw = 250, gh = 200;
    const radial = o.n - o.l - 1;
    return (
      <Frame label={`${o.name} orbital`}>
        <foreignObject x={20} y={20} width={320} height={320}><OrbitalCanvas idx={idx} /></foreignObject>
        <circle cx={180} cy={180} r={(rNow / extent) * 160} fill="none" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3" />
        <Label x={30} y={36} size={13}>{o.name} (xz cross-section)</Label>
        <Label x={30} y={334} size={10} color="var(--muted)">blue/orange = opposite signs of ψ</Label>
        <line x1={gx} y1={gy} x2={gx + gw} y2={gy} className="stroke-slate-400" />
        <line x1={gx} y1={gy} x2={gx} y2={gy - gh} className="stroke-slate-400" />
        <path d={path(samples.map((r) => [gx + (r / extent) * gw, gy - (P(r) / pmax) * gh * 0.95]))} fill="none" stroke="#8b5cf6" strokeWidth={2.5} />
        <line x1={gx + (rNow / extent) * gw} y1={gy} x2={gx + (rNow / extent) * gw} y2={gy - gh} stroke="#f59e0b" strokeDasharray="3 3" />
        <Label x={gx} y={gy - gh - 8} size={11} color="var(--muted)">radial probability r²R²</Label>
        <Label x={gx + gw} y={gy + 18} size={11} anchor="end" color="var(--muted)">r →</Label>
        <Readout x={gx + 60} y={20} rows={[["n, l", `${o.n}, ${o.l}`], ["radial nodes", String(radial)], ["angular nodes", String(o.l)], ["total nodes", String(o.n - 1)]]} />
      </Frame>
    );
  },
};

// ───────────── Daniell cell ─────────────
export const galvanic: SimDef = {
  key: "galvanic",
  params: [
    { key: "zn", label: "[Zn²⁺]", min: 0.01, max: 2, step: 0.01, default: 1, unit: "M" },
    { key: "cu", label: "[Cu²⁺]", min: 0.01, max: 2, step: 0.01, default: 1, unit: "M" },
  ],
  duration: () => Infinity,
  render: ({ t, params, step }) => {
    const E = 1.1 - (0.0591 / 2) * Math.log10(params.zn / params.cu);
    const wear = Math.min(18, t * 0.4);
    const hl = (i: number) => (step === null || step === i ? 1 : 0.25);
    const wire: [number, number][] = [[150, 110], [150, 50], [490, 50], [490, 110]];
    const total = 60 + 340 + 60;
    const at = (d: number): [number, number] => d < 60 ? [150, 110 - d] : d < 400 ? [150 + (d - 60), 50] : [490, 50 + (d - 400)];
    return (
      <Frame label="Daniell cell">
        <g opacity={hl(1)}>
          <path d={path(wire)} fill="none" stroke="#94a3b8" strokeWidth={3} />
          <circle cx={320} cy={50} r={22} className="fill-[var(--surface)]" stroke="#94a3b8" strokeWidth={2} />
          <Label x={320} y={55} anchor="middle" size={12}>{E.toFixed(3)} V</Label>
          {[0, 1, 2, 3, 4, 5].map((k) => { const p = at(((t * 60 + (k * total) / 6) % total)); return <circle key={k} cx={p[0]} cy={p[1]} r={4} fill="#2b8cff" />; })}
          <Label x={230} y={40} size={11} color="#2b8cff">e⁻ flow →</Label>
        </g>
        <rect x={70} y={150} width={170} height={170} rx={10} fill="#94a3b8" fillOpacity={0.12} stroke="#94a3b8" />
        <rect x={400} y={150} width={170} height={170} rx={10} fill="#2b8cff" fillOpacity={0.12} stroke="#94a3b8" />
        <g opacity={hl(0)}>
          <rect x={140 + wear / 2} y={110} width={20 - wear / 2} height={180} fill="#9ca3af" />
          <Label x={150} y={340} anchor="middle" size={12}>Zn anode (−): oxidation</Label>
          {[0, 1, 2].map((k) => { const ph = (t * 0.5 + k / 3) % 1; return <Label key={k} x={170 + ph * 40} y={200 + k * 30} size={11} color="#64748b">Zn²⁺</Label>; })}
        </g>
        <g opacity={hl(2)}>
          <rect x={480} y={110} width={20 + Math.min(10, t * 0.2)} height={180} fill="#c2410c" />
          <Label x={490} y={340} anchor="middle" size={12}>Cu cathode (+): reduction</Label>
          {[0, 1, 2].map((k) => { const ph = (t * 0.5 + k / 3) % 1; return <Label key={k} x={415 + ph * 40} y={200 + k * 30} size={11} color="#2563eb">Cu²⁺</Label>; })}
        </g>
        <g opacity={hl(3)}>
          <path d="M200 150 L200 110 L440 110 L440 150" fill="none" stroke="#f59e0b" strokeWidth={16} strokeOpacity={0.35} strokeLinejoin="round" />
          <Label x={320} y={128} anchor="middle" size={11} color="#b45309">salt bridge (KNO₃)</Label>
          {[0, 1].map((k) => { const ph = (t * 0.3 + k / 2) % 1; return <g key={k}><Label x={430 - ph * 220} y={106} size={10} color="#b45309">NO₃⁻ ←</Label><Label x={210 + ph * 220} y={120} size={10} color="#b45309">→ K⁺</Label></g>; })}
        </g>
        <Label x={320} y={90} anchor="middle" size={10} color="var(--muted)">E°cell = 1.100 V · E = E° − (0.0591/2) log([Zn²⁺]/[Cu²⁺])</Label>
      </Frame>
    );
  },
};
