"use client";

import { Frame, Label, Readout, W, path } from "./svg";
import type { SimDef } from "./types";

// Shared plotting window: x ∈ [-6, 6], y ∈ [-4, 6] mapped onto the frame.
const XMIN = -6, XMAX = 6, YMIN = -4, YMAX = 6;
const PX = (x: number) => 30 + ((x - XMIN) / (XMAX - XMIN)) * 580;
const PY = (y: number) => 340 - ((y - YMIN) / (YMAX - YMIN)) * 320;

function Axes() {
  const ticks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
  return (
    <g>
      {ticks.map((t) => <line key={`gx${t}`} x1={PX(t)} y1={PY(YMIN)} x2={PX(t)} y2={PY(YMAX)} className="stroke-slate-400" strokeOpacity={0.15} />)}
      {[-3, -2, -1, 1, 2, 3, 4, 5].map((t) => <line key={`gy${t}`} x1={PX(XMIN)} y1={PY(t)} x2={PX(XMAX)} y2={PY(t)} className="stroke-slate-400" strokeOpacity={0.15} />)}
      <line x1={PX(XMIN)} y1={PY(0)} x2={PX(XMAX)} y2={PY(0)} className="stroke-slate-400" strokeWidth={1.5} />
      <line x1={PX(0)} y1={PY(YMIN)} x2={PX(0)} y2={PY(YMAX)} className="stroke-slate-400" strokeWidth={1.5} />
      {ticks.map((t) => <Label key={`lx${t}`} x={PX(t)} y={PY(0) + 14} anchor="middle" size={9} color="var(--muted)">{t}</Label>)}
    </g>
  );
}

function plot(f: (x: number) => number, a = XMIN, b = XMAX, n = 300) {
  const segs: [number, number][][] = [[]];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    const y = f(x);
    if (!Number.isFinite(y) || y > YMAX + 4 || y < YMIN - 4) { if (segs[segs.length - 1].length) segs.push([]); continue; }
    segs[segs.length - 1].push([PX(x), PY(Math.max(YMIN - 1, Math.min(YMAX + 1, y)))]);
  }
  return segs.filter((s) => s.length > 1).map(path).join(" ");
}

const BASES: { name: string; f: (x: number) => number; tex: string }[] = [
  { name: "x²", f: (x) => x * x, tex: "x²" },
  { name: "sin x", f: Math.sin, tex: "sin x" },
  { name: "|x|", f: Math.abs, tex: "|x|" },
  { name: "eˣ", f: Math.exp, tex: "eˣ" },
  { name: "1/x", f: (x) => 1 / x, tex: "1/x" },
];

// ───────────── Function transformations ─────────────
export const transform: SimDef = {
  key: "transform",
  params: [
    { key: "base", label: "Base function", min: 0, max: BASES.length - 1, step: 1, default: 0, options: BASES.map((b) => b.name) },
    { key: "a", label: "a (vertical stretch)", min: -3, max: 3, step: 0.1, default: 1 },
    { key: "b", label: "b (horizontal compress)", min: -3, max: 3, step: 0.1, default: 1 },
    { key: "h", label: "h (shift right)", min: -4, max: 4, step: 0.1, default: 1 },
    { key: "k", label: "k (shift up)", min: -3, max: 4, step: 0.1, default: -2 },
  ],
  duration: () => 3,
  stepState: (s, p) => ({ t: 3, params: [{ a: 1, b: 1, h: 0, k: 2 }, { a: 1, b: 1, h: 2, k: 0 }, { a: 2, b: 2, h: 0, k: 0 }, { a: -1, b: -1, h: 0, k: 0 }][s] }),
  render: ({ t, params }) => {
    const base = BASES[Math.round(params.base)];
    const s = Math.min(1, t / 3);
    const lerp = (from: number, to: number) => from + (to - from) * s;
    const a = lerp(1, params.a), b = lerp(1, params.b === 0 ? 0.1 : params.b), h = lerp(0, params.h), k = lerp(0, params.k);
    const g = (x: number) => a * base.f(b * (x - h)) + k;
    let roots = "";
    if (Math.round(params.base) === 0 && s === 1 && Math.abs(params.a * params.b) > 1e-9) {
      // a·b²(x−h)² + k = 0 → quadratic in x
      const A = params.a * params.b * params.b;
      const D = -4 * A * params.k; // discriminant of A(x−h)² + k in shifted variable
      roots = D > 1e-9 ? `x = ${(params.h - Math.sqrt(-params.k / A)).toFixed(2)}, ${(params.h + Math.sqrt(-params.k / A)).toFixed(2)}` : Math.abs(D) <= 1e-9 ? `x = ${params.h.toFixed(2)} (equal roots)` : "no real roots (D < 0)";
    }
    return (
      <Frame label="Function transformation">
        <Axes />
        <path d={plot(base.f)} fill="none" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
        <path d={plot(g)} fill="none" stroke="#2b8cff" strokeWidth={3} />
        <Readout x={W - 200} y={14} rows={[["y =", `${a.toFixed(1)}·f(${b.toFixed(1)}(x − ${h.toFixed(1)})) + ${k.toFixed(1)}`], ["f(x)", base.tex], ...(roots ? [["roots", roots] as [string, string]] : [])]} />
        <Label x={40} y={30} size={11} color="var(--muted)">dashed: f(x) · blue: transformed</Label>
      </Frame>
    );
  },
};

// ───────────── Derivative as slope ─────────────
const DFUNCS = [
  { name: "x²/2", f: (x: number) => (x * x) / 2, d: (x: number) => x },
  { name: "sin x + 1", f: (x: number) => Math.sin(x) + 1, d: (x: number) => Math.cos(x) },
  { name: "x³/6 − x", f: (x: number) => (x ** 3) / 6 - x, d: (x: number) => (x * x) / 2 - 1 },
];
export const derivative: SimDef = {
  key: "derivative",
  params: [
    { key: "fn", label: "Function", min: 0, max: DFUNCS.length - 1, step: 1, default: 0, options: DFUNCS.map((f) => f.name) },
    { key: "x0", label: "Point x₀", min: -4, max: 4, step: 0.1, default: 1 },
  ],
  duration: () => 6,
  stepState: (s) => ({ t: [0, 3, 6, 6][s] }),
  render: ({ t, params }) => {
    const F = DFUNCS[Math.round(params.fn)];
    const x0 = params.x0;
    const hmax = 3;
    const h = Math.max(0.001, hmax * Math.pow(1 - Math.min(t, 6) / 6, 2));
    const y0 = F.f(x0), y1 = F.f(x0 + h);
    const m = (y1 - y0) / h;
    const exact = F.d(x0);
    const line = (slope: number) => (x: number) => y0 + slope * (x - x0);
    return (
      <Frame label="Secant approaching tangent">
        <Axes />
        <path d={plot(F.f)} fill="none" stroke="#2b8cff" strokeWidth={3} />
        <path d={plot(line(m))} fill="none" stroke="#f59e0b" strokeWidth={2} />
        {t >= 6 && <path d={plot(line(exact))} fill="none" stroke="#10b981" strokeWidth={2} strokeDasharray="6 4" />}
        <circle cx={PX(x0)} cy={PY(y0)} r={6} fill="#8b5cf6" />
        <circle cx={PX(x0 + h)} cy={PY(y1)} r={5} fill="#f59e0b" />
        <line x1={PX(x0)} y1={PY(y0)} x2={PX(x0 + h)} y2={PY(y0)} stroke="#94a3b8" strokeDasharray="3 3" />
        <line x1={PX(x0 + h)} y1={PY(y0)} x2={PX(x0 + h)} y2={PY(y1)} stroke="#94a3b8" strokeDasharray="3 3" />
        <Readout x={W - 200} y={14} rows={[["h", h.toFixed(3)], ["secant slope", m.toFixed(3)], ["f′(x₀) exact", exact.toFixed(3)], ["behaviour", exact > 0.001 ? "increasing" : exact < -0.001 ? "decreasing" : "stationary"]]} />
      </Frame>
    );
  },
};

// ───────────── Riemann sums ─────────────
const RFUNCS = [
  { name: "x²/4 + 1", f: (x: number) => (x * x) / 4 + 1, F: (x: number) => (x ** 3) / 12 + x },
  { name: "sin x + 2", f: (x: number) => Math.sin(x) + 2, F: (x: number) => -Math.cos(x) + 2 * x },
  { name: "4 − x²/4", f: (x: number) => 4 - (x * x) / 4, F: (x: number) => 4 * x - (x ** 3) / 12 },
];
export const riemann: SimDef = {
  key: "riemann",
  params: [
    { key: "fn", label: "Function", min: 0, max: RFUNCS.length - 1, step: 1, default: 0, options: RFUNCS.map((f) => f.name) },
    { key: "a", label: "Lower limit a", min: -5, max: 4, step: 0.5, default: -1 },
    { key: "b", label: "Upper limit b", min: -4, max: 5, step: 0.5, default: 4 },
    { key: "n", label: "Max strips n", min: 4, max: 120, step: 1, default: 60 },
    { key: "rule", label: "Sample point", min: 0, max: 2, step: 1, default: 0, options: ["Left", "Midpoint", "Right"] },
  ],
  duration: () => 6,
  stepState: (s, p) => ({ t: [0.01, 2, 4, 6][s], params: s === 2 ? { rule: 1 } : undefined }),
  render: ({ t, params }) => {
    const Fn = RFUNCS[Math.round(params.fn)];
    const a = Math.min(params.a, params.b - 0.5), b = Math.max(params.b, a + 0.5);
    const n = Math.max(2, Math.round(2 + (params.n - 2) * Math.min(1, t / 6)));
    const dx = (b - a) / n;
    const off = [0, 0.5, 1][Math.round(params.rule)];
    let sum = 0;
    const rects = Array.from({ length: n }, (_, i) => {
      const xs = a + (i + off) * dx;
      const hgt = Fn.f(xs);
      sum += hgt * dx;
      return <rect key={i} x={PX(a + i * dx)} y={Math.min(PY(hgt), PY(0))} width={Math.max(0.5, PX(a + (i + 1) * dx) - PX(a + i * dx))} height={Math.abs(PY(0) - PY(hgt))} fill="#8b5cf6" fillOpacity={0.28} stroke="#8b5cf6" strokeOpacity={n > 60 ? 0 : 0.7} />;
    });
    const exact = Fn.F(b) - Fn.F(a);
    return (
      <Frame label="Riemann sum approximation">
        <Axes />
        {rects}
        <path d={plot(Fn.f)} fill="none" stroke="#2b8cff" strokeWidth={3} />
        <Readout x={W - 200} y={14} rows={[["strips n", String(n)], ["Riemann sum", sum.toFixed(4)], ["exact ∫", exact.toFixed(4)], ["error", (sum - exact).toFixed(4)]]} />
      </Frame>
    );
  },
};

// ───────────── Conic sections (focus–directrix) ─────────────
export const conics: SimDef = {
  key: "conics",
  params: [
    { key: "e", label: "Eccentricity e", min: 0, max: 2, step: 0.05, default: 0.6 },
    { key: "p", label: "Focus–directrix distance", min: 1, max: 4, step: 0.1, default: 2.5 },
  ],
  duration: () => 10,
  stepState: (s) => ({ t: 5, params: { e: [0.6, 0.6, 1, 1.5][s] } }),
  render: ({ t, params }) => {
    const { e, p } = params;
    // Focus at origin, directrix x = p. r(θ) = e·p / (1 + e cos θ).
    const sx = (x: number) => 320 + x * 42, sy = (y: number) => 180 - y * 42;
    const pts: [number, number][][] = [[]];
    for (let i = 0; i <= 720; i++) {
      const th = (i / 720) * 2 * Math.PI;
      const den = 1 + e * Math.cos(th);
      if (den <= 0.03) { if (pts[pts.length - 1].length) pts.push([]); continue; }
      const r = (e * p) / den;
      const x = r * Math.cos(th), y = r * Math.sin(th);
      if (Math.abs(x) > 9 || Math.abs(y) > 5) { if (pts[pts.length - 1].length) pts.push([]); continue; }
      pts[pts.length - 1].push([sx(x), sy(y)]);
    }
    // moving point P
    const range = e >= 1 ? Math.acos(-1 / e) * 0.92 : Math.PI;
    const th = -range + ((t % 10) / 10) * 2 * range;
    const r = e === 0 ? 0 : (e * p) / (1 + e * Math.cos(th));
    const P: [number, number] = [r * Math.cos(th), r * Math.sin(th)];
    const SP = Math.hypot(P[0], P[1]);
    const PM = p - P[0];
    const name = e === 0 ? "point (degenerate circle)" : e < 1 ? "Ellipse" : Math.abs(e - 1) < 0.001 ? "Parabola" : "Hyperbola (one branch)";
    return (
      <Frame label="Conic sections via focus and directrix">
        <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-slate-400" strokeOpacity={0.5} />
        <line x1={sx(p)} y1={0} x2={sx(p)} y2={360} stroke="#f43f5e" strokeWidth={2} strokeDasharray="6 4" />
        <Label x={sx(p) + 6} y={20} size={11} color="#f43f5e">directrix</Label>
        {pts.filter((s) => s.length > 1).map((s, i) => <path key={i} d={path(s)} fill="none" stroke="#2b8cff" strokeWidth={3} />)}
        <circle cx={sx(0)} cy={sy(0)} r={5} fill="#f59e0b" />
        <Label x={sx(0) - 6} y={sy(0) + 18} size={11} anchor="end" color="#f59e0b">focus S</Label>
        {e > 0 && (
          <g>
            <line x1={sx(0)} y1={sy(0)} x2={sx(P[0])} y2={sy(P[1])} stroke="#f59e0b" strokeWidth={2} />
            <line x1={sx(P[0])} y1={sy(P[1])} x2={sx(p)} y2={sy(P[1])} stroke="#f43f5e" strokeWidth={2} />
            <circle cx={sx(P[0])} cy={sy(P[1])} r={6} fill="#8b5cf6" />
            <Label x={sx(P[0]) + 8} y={sy(P[1]) - 8} size={12}>P</Label>
          </g>
        )}
        <Readout x={14} y={14} rows={[["e", e.toFixed(2)], ["conic", name], ["SP", SP.toFixed(2)], ["PM", PM.toFixed(2)], ["SP / PM", PM > 1e-6 ? (SP / PM).toFixed(2) : "—"]]} />
      </Frame>
    );
  },
};
