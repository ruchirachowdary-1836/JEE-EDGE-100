"use client";

import { Arrow, Frame, H, Label, Readout, W, path } from "./svg";
import type { SimDef } from "./types";

const G = 10;
const deg = (d: number) => (d * Math.PI) / 180;

// ───────────── Projectile ─────────────
export const projectile: SimDef = {
  key: "projectile",
  params: [
    { key: "u", label: "Launch speed", min: 5, max: 30, step: 1, default: 20, unit: "m/s" },
    { key: "angle", label: "Angle", min: 10, max: 85, step: 1, default: 50, unit: "°" },
  ],
  duration: (p) => (2 * p.u * Math.sin(deg(p.angle))) / G,
  stepState: (s, p) => ({ t: ((2 * p.u * Math.sin(deg(p.angle))) / G) * [0, 0.25, 0.5, 0.75, 1][s] }),
  render: ({ t, params }) => {
    const { u, angle } = params;
    const th = deg(angle);
    const T = (2 * u * Math.sin(th)) / G;
    const R = (u * u * Math.sin(2 * th)) / G;
    const Hm = (u * u * Math.sin(th) ** 2) / (2 * G);
    const Rmax = (30 * 30) / G; // fixed scale so changes are visible
    const sx = 520 / Rmax;
    const sy = Math.min(sx, 250 / Math.max(Hm, 1));
    const scale = Math.min(sx, sy);
    const ox = 60, oy = 310;
    const tc = Math.min(t, T);
    const x = u * Math.cos(th) * tc;
    const y = u * Math.sin(th) * tc - 0.5 * G * tc * tc;
    const vx = u * Math.cos(th), vy = u * Math.sin(th) - G * tc;
    const pts: [number, number][] = Array.from({ length: 61 }, (_, i) => {
      const ti = (T * i) / 60;
      return [ox + u * Math.cos(th) * ti * scale, oy - (u * Math.sin(th) * ti - 0.5 * G * ti * ti) * scale];
    });
    const traced = pts.filter((_, i) => (T * i) / 60 <= tc);
    const bx = ox + x * scale, by = oy - y * scale;
    const vs = 3.2;
    return (
      <Frame label="Projectile motion simulation">
        <line x1={20} y1={oy} x2={W - 20} y2={oy} className="stroke-slate-400" strokeWidth={2} />
        <path d={path(pts)} fill="none" className="stroke-slate-400" strokeDasharray="4 5" />
        {traced.length > 1 && <path d={path(traced)} fill="none" stroke="#8b5cf6" strokeWidth={3} />}
        <line x1={ox + (R / 2) * scale} y1={oy} x2={ox + (R / 2) * scale} y2={oy - Hm * scale} stroke="#f59e0b" strokeDasharray="3 4" />
        <Label x={ox + (R / 2) * scale + 6} y={oy - Hm * scale + 14} size={11} color="#f59e0b">H = {Hm.toFixed(1)} m</Label>
        <Label x={ox + R * scale} y={oy + 18} size={11} anchor="middle" color="#8b5cf6">R = {R.toFixed(1)} m</Label>
        <Arrow x1={bx} y1={by} x2={bx + vx * vs} y2={by} color="#2b8cff" />
        <Arrow x1={bx} y1={by} x2={bx} y2={by - vy * vs} color="#f43f5e" />
        <Arrow x1={bx} y1={by} x2={bx + vx * vs} y2={by - vy * vs} color="#10b981" width={2} dashed />
        <circle cx={bx} cy={by} r={8} fill="#2b8cff" stroke="white" strokeWidth={2} />
        <Readout x={W - 190} y={14} rows={[["t", `${tc.toFixed(2)} s`], ["x", `${x.toFixed(1)} m`], ["y", `${y.toFixed(1)} m`], ["vₓ (blue)", `${vx.toFixed(1)} m/s`], ["v_y (red)", `${vy.toFixed(1)} m/s`], ["T", `${T.toFixed(2)} s`]]} />
      </Frame>
    );
  },
};

// ───────────── SHM via reference circle ─────────────
export const shm: SimDef = {
  key: "shm",
  params: [
    { key: "A", label: "Amplitude", min: 40, max: 110, step: 5, default: 90, unit: "px" },
    { key: "omega", label: "Angular frequency ω", min: 0.5, max: 3, step: 0.1, default: 1.2, unit: "rad/s" },
  ],
  duration: () => Infinity,
  stepState: (s, p) => ({ t: [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2][s] / p.omega }),
  render: ({ t, params }) => {
    const { A, omega } = params;
    const cx = 160, cy = 170;
    const ph = omega * t;
    const px = cx + A * Math.cos(ph), py = cy - A * Math.sin(ph);
    const x = A * Math.cos(ph);
    const v = -A * omega * Math.sin(ph);
    const a = -omega * omega * x;
    // x–t graph
    const gx = 330, gw = 290, gy = cy;
    const window = 8;
    const t0 = Math.max(0, t - window);
    const trace: [number, number][] = Array.from({ length: 120 }, (_, i) => {
      const ti = t0 + ((t - t0) * i) / 119;
      return [gx + ((ti - t0) / window) * gw, gy - A * Math.cos(omega * ti) * 0.9];
    });
    return (
      <Frame label="SHM as projection of circular motion">
        <circle cx={cx} cy={cy} r={A} fill="none" className="stroke-slate-400" strokeDasharray="4 4" />
        <line x1={cx - A - 20} y1={cy} x2={cx + A + 20} y2={cy} className="stroke-slate-400" />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="#8b5cf6" strokeWidth={2} />
        <line x1={px} y1={py} x2={px} y2={cy} stroke="#94a3b8" strokeDasharray="3 3" />
        <circle cx={px} cy={py} r={6} fill="#8b5cf6" />
        <rect x={px - 12} y={cy - 12} width={24} height={24} rx={5} fill="#2b8cff" />
        <Arrow x1={px} y1={cy + 24} x2={px + v * 0.35} y2={cy + 24} color="#10b981" />
        <Arrow x1={px} y1={cy + 40} x2={px + a * 0.35} y2={cy + 40} color="#f43f5e" />
        <Label x={cx} y={cy + A + 40} anchor="middle" size={11} color="var(--muted)">green: velocity · red: acceleration (always toward centre)</Label>
        <line x1={gx} y1={gy} x2={gx + gw} y2={gy} className="stroke-slate-400" />
        <line x1={gx} y1={40} x2={gx} y2={300} className="stroke-slate-400" />
        <path d={path(trace)} fill="none" stroke="#2b8cff" strokeWidth={2.5} />
        <Label x={gx + 4} y={36} size={11} color="var(--muted)">x(t) = A cos(ωt)</Label>
        <Readout x={gx + 100} y={250} rows={[["phase ωt", `${((ph * 180) / Math.PI % 360).toFixed(0)}°`], ["x / A", (x / A).toFixed(2)], ["T = 2π/ω", `${((2 * Math.PI) / omega).toFixed(2)} s`]]} />
      </Frame>
    );
  },
};

// ───────────── Electric field of two point charges ─────────────
type Charge = { x: number; y: number; q: number };
function fieldAt(px: number, py: number, charges: Charge[]) {
  let ex = 0, ey = 0;
  for (const c of charges) {
    const dx = px - c.x, dy = py - c.y;
    const r2 = dx * dx + dy * dy + 30;
    const r = Math.sqrt(r2);
    ex += (c.q * dx) / (r2 * r);
    ey += (c.q * dy) / (r2 * r);
  }
  return [ex, ey];
}
function fieldLine(sx: number, sy: number, charges: Charge[], dir: 1 | -1) {
  const pts: [number, number][] = [[sx, sy]];
  let x = sx, y = sy;
  for (let i = 0; i < 400; i++) {
    const [ex, ey] = fieldAt(x, y, charges);
    const m = Math.hypot(ex, ey);
    if (m < 1e-9) break;
    x += (dir * 4 * ex) / m;
    y += (dir * 4 * ey) / m;
    if (x < 0 || x > W || y < 0 || y > H) break;
    if (charges.some((c) => Math.hypot(x - c.x, y - c.y) < 8)) { pts.push([x, y]); break; }
    pts.push([x, y]);
  }
  return pts;
}
const PRESETS = [
  { q1: 2, q2: 0, d: 220 },
  { q1: 2, q2: -2, d: 220 },
  { q1: 2, q2: 2, d: 220 },
  { q1: 3, q2: -1, d: 220 },
];
export const efield: SimDef = {
  key: "efield",
  params: [
    { key: "q1", label: "Charge 1", min: -3, max: 3, step: 1, default: 2, unit: "q" },
    { key: "q2", label: "Charge 2", min: -3, max: 3, step: 1, default: -2, unit: "q" },
    { key: "d", label: "Separation", min: 100, max: 360, step: 10, default: 220, unit: "px" },
  ],
  duration: () => Infinity,
  stepState: (s) => ({ t: 0, params: PRESETS[s] }),
  render: ({ t, params }) => {
    const cx = W / 2, cy = H / 2;
    const charges: Charge[] = [
      { x: cx - params.d / 2, y: cy, q: params.q1 },
      { x: cx + params.d / 2, y: cy, q: params.q2 },
    ].filter((c) => c.q !== 0);
    const lines: [number, number][][] = [];
    const sources = charges.filter((c) => c.q > 0);
    const seeds = sources.length ? sources : charges;
    for (const c of seeds) {
      const n = 8 * Math.abs(c.q);
      for (let i = 0; i < n; i++) {
        const a = (2 * Math.PI * i) / n;
        lines.push(fieldLine(c.x + 10 * Math.cos(a), c.y + 10 * Math.sin(a), charges, c.q > 0 ? 1 : -1));
      }
    }
    const arrows: JSX.Element[] = [];
    for (let gx = 30; gx < W; gx += 50) for (let gy = 30; gy < H; gy += 50) {
      if (charges.some((c) => Math.hypot(gx - c.x, gy - c.y) < 25)) continue;
      const [ex, ey] = fieldAt(gx, gy, charges);
      const m = Math.hypot(ex, ey);
      if (m < 1e-7) continue;
      const len = Math.min(18, 4 + Math.log10(1 + m * 1e6) * 4);
      arrows.push(<Arrow key={`${gx}-${gy}`} x1={gx} y1={gy} x2={gx + (ex / m) * len} y2={gy + (ey / m) * len} color="#94a3b8" width={1.4} />);
    }
    return (
      <Frame label="Electric field lines of point charges">
        {arrows}
        {lines.map((l, i) => {
          const k = Math.floor(((t * 30) % l.length + l.length) % l.length);
          return (
            <g key={i}>
              <path d={path(l)} fill="none" stroke="#2b8cff" strokeOpacity={0.55} strokeWidth={1.5} />
              {l[k] && <circle cx={l[k][0]} cy={l[k][1]} r={2.6} fill="#2b8cff" />}
            </g>
          );
        })}
        {charges.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={14} fill={c.q > 0 ? "#f43f5e" : "#2b8cff"} stroke="white" strokeWidth={2} />
            <Label x={c.x} y={c.y + 5} anchor="middle" size={14} color="white">{c.q > 0 ? "+" : "−"}{Math.abs(c.q)}</Label>
          </g>
        ))}
        {charges.length === 0 && <Label x={cx} y={cy} anchor="middle">Set a non-zero charge</Label>}
      </Frame>
    );
  },
};

// ───────────── Waves ─────────────
export const wave: SimDef = {
  key: "wave",
  params: [
    { key: "amp", label: "Amplitude", min: 10, max: 60, step: 2, default: 40, unit: "px" },
    { key: "lambda", label: "Wavelength", min: 80, max: 320, step: 10, default: 200, unit: "px" },
    { key: "speed", label: "Wave speed", min: 20, max: 200, step: 10, default: 80, unit: "px/s" },
    { key: "mode", label: "Mode", min: 0, max: 1, step: 1, default: 0, options: ["Travelling", "Standing"] },
  ],
  duration: () => Infinity,
  stepState: (s) => ({ t: 0.6, params: { mode: s >= 2 ? 1 : 0 } }),
  render: ({ t, params, step }) => {
    const { amp, lambda, speed, mode } = params;
    const k = (2 * Math.PI) / lambda;
    const w = k * speed;
    const xs = Array.from({ length: 161 }, (_, i) => 20 + i * 3.75);
    const y0 = 170;
    const yt = (x: number) => (mode === 1 ? 2 * amp * 0.6 * Math.sin(k * (x - 20)) * Math.cos(w * t) : amp * Math.sin(k * (x - 20) - w * t));
    const right = xs.map((x) => [x, y0 - amp * 0.6 * Math.sin(k * (x - 20) - w * t)] as [number, number]);
    const left = xs.map((x) => [x, y0 - amp * 0.6 * Math.sin(k * (x - 20) + w * t)] as [number, number]);
    const tracked = 20 + lambda * 0.75;
    const nodes = mode === 1 ? Array.from({ length: 20 }, (_, i) => 20 + (i * lambda) / 2).filter((x) => x <= 620) : [];
    return (
      <Frame label="Wave propagation simulation">
        <line x1={20} y1={y0} x2={620} y2={y0} className="stroke-slate-400" strokeDasharray="3 4" />
        {mode === 1 && step !== null && step >= 2 && (
          <>
            <path d={path(right)} fill="none" stroke="#2b8cff" strokeOpacity={0.35} strokeWidth={1.5} />
            <path d={path(left)} fill="none" stroke="#f43f5e" strokeOpacity={0.35} strokeWidth={1.5} />
          </>
        )}
        <path d={path(xs.map((x) => [x, y0 - yt(x)]))} fill="none" stroke="#8b5cf6" strokeWidth={3} />
        {xs.filter((_, i) => i % 8 === 0).map((x) => <circle key={x} cx={x} cy={y0 - yt(x)} r={3} fill="#8b5cf6" />)}
        <circle cx={tracked} cy={y0 - yt(tracked)} r={7} fill="#f59e0b" stroke="white" strokeWidth={2} />
        <line x1={tracked} y1={y0 - 2.2 * amp} x2={tracked} y2={y0 + 2.2 * amp} stroke="#f59e0b" strokeDasharray="2 4" />
        {nodes.map((x) => <g key={x}><circle cx={x} cy={y0} r={4} fill="#10b981" /><Label x={x} y={y0 + 20} anchor="middle" size={10} color="#10b981">N</Label></g>)}
        {mode === 0 && <Arrow x1={480} y1={60} x2={580} y2={60} color="#2b8cff" />}
        <Label x={20} y={40} size={12}>{mode === 0 ? "y = A sin(kx − ωt) — the orange particle only moves up and down" : "y = 2A sin(kx) cos(ωt) — nodes (N) stay still"}</Label>
        <Readout x={W - 190} y={270} rows={[["λ", `${lambda} px`], ["v = ω/k", `${speed} px/s`], ["f = v/λ", `${(speed / lambda).toFixed(2)} Hz`]]} />
      </Frame>
    );
  },
};

// ───────────── Convex lens ray diagram ─────────────
export const lens: SimDef = {
  key: "lens",
  params: [
    { key: "u", label: "Object distance", min: 0.3, max: 3, step: 0.05, default: 2.2, unit: "× f" },
    { key: "h", label: "Object height", min: 20, max: 70, step: 5, default: 50, unit: "px" },
  ],
  duration: () => Infinity,
  stepState: (s) => ({ t: 0, params: { u: [2.5, 2.5, 1.6, 0.6][s] } }),
  render: ({ t, params }) => {
    const f = 95;
    const lx = 320, ay = 190;
    const u = -params.u * f; // Cartesian: object on left, negative
    const vInv = 1 / f + 1 / u;
    const v = Math.abs(vInv) < 1e-6 ? Infinity : 1 / vInv;
    const m = v / u;
    const ox = lx + u, oyTop = ay - params.h;
    const ix = lx + v, iyTop = ay - params.h * m;
    const real = v > 0 && Number.isFinite(v);
    const clipX = (x: number) => Math.max(0, Math.min(W, x));
    // Ray 1: parallel then through F' (lx+f, ay)
    const r1a: [number, number] = [lx, oyTop];
    const slope1 = (ay - oyTop) / f;
    const r1end: [number, number] = [W, oyTop + slope1 * (W - lx)];
    // Ray 2: through optical centre
    const slope2 = (ay - oyTop) / (lx - ox);
    const r2end: [number, number] = [W, ay + slope2 * (W - lx)];
    const dots = [0, 0.33, 0.66].map((o) => ((t * 0.35 + o) % 1));
    return (
      <Frame label="Convex lens ray diagram">
        <line x1={0} y1={ay} x2={W} y2={ay} className="stroke-slate-400" />
        <ellipse cx={lx} cy={ay} rx={10} ry={120} fill="#2b8cff" fillOpacity={0.12} stroke="#2b8cff" strokeWidth={2} />
        {[-2, -1, 1, 2].map((k) => <g key={k}><circle cx={lx + k * f} cy={ay} r={3.5} fill="#94a3b8" /><Label x={lx + k * f} y={ay + 18} anchor="middle" size={10} color="var(--muted)">{Math.abs(k) === 1 ? (k < 0 ? "F" : "F′") : k < 0 ? "2F" : "2F′"}</Label></g>)}
        <Arrow x1={ox} y1={ay} x2={ox} y2={oyTop} color="#10b981" width={3} />
        <line x1={ox} y1={oyTop} x2={lx} y2={oyTop} stroke="#f59e0b" strokeWidth={2} />
        <line x1={lx} y1={oyTop} x2={clipX(r1end[0])} y2={r1end[1]} stroke="#f59e0b" strokeWidth={2} />
        <line x1={ox} y1={oyTop} x2={clipX(r2end[0])} y2={r2end[1]} stroke="#8b5cf6" strokeWidth={2} />
        {!real && Number.isFinite(v) && (
          <>
            <line x1={lx} y1={oyTop} x2={ix} y2={iyTop} stroke="#f59e0b" strokeDasharray="4 4" />
            <line x1={ox} y1={oyTop} x2={ix} y2={iyTop} stroke="#8b5cf6" strokeDasharray="4 4" />
          </>
        )}
        {Number.isFinite(v) && Math.abs(ix) < 4 * W && <Arrow x1={ix} y1={ay} x2={ix} y2={iyTop} color="#f43f5e" width={3} dashed={!real} />}
        {dots.map((d, i) => {
          const p1 = d < 0.5 ? [ox + (lx - ox) * d * 2, oyTop] : [lx + (r1end[0] - lx) * (d - 0.5) * 2, r1a[1] + (r1end[1] - r1a[1]) * (d - 0.5) * 2];
          const p2 = [ox + (r2end[0] - ox) * d, oyTop + (r2end[1] - oyTop) * d];
          return <g key={i}><circle cx={p1[0]} cy={p1[1]} r={3} fill="#f59e0b" /><circle cx={p2[0]} cy={p2[1]} r={3} fill="#8b5cf6" /></g>;
        })}
        <Readout x={14} y={14} rows={[["u", `${(u / f).toFixed(2)} f`], ["v", Number.isFinite(v) ? `${(v / f).toFixed(2)} f` : "∞"], ["m = v/u", Number.isFinite(m) ? m.toFixed(2) : "∞"], ["Image", !Number.isFinite(v) ? "at infinity" : real ? "real, inverted" : "virtual, upright"]]} />
      </Frame>
    );
  },
};
