import type { ReactNode } from "react";

export const W = 640;
export const H = 360;

export function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none" role="img" aria-label={label}>
      <defs>
        {["#2b8cff", "#8b5cf6", "#f43f5e", "#10b981", "#f59e0b", "#94a3b8"].map((c) => (
          <marker key={c} id={`ah-${c.slice(1)}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={c} />
          </marker>
        ))}
      </defs>
      {children}
    </svg>
  );
}

export function Arrow({ x1, y1, x2, y2, color = "#2b8cff", width = 2.5, dashed = false }: { x1: number; y1: number; x2: number; y2: number; color?: string; width?: number; dashed?: boolean }) {
  if (Math.hypot(x2 - x1, y2 - y1) < 2) return null;
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dashed ? "5 4" : undefined} markerEnd={`url(#ah-${color.slice(1)})`} />;
}

export function Label({ x, y, children, color = "currentColor", size = 12, anchor = "start", weight = 600 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: "start" | "middle" | "end"; weight?: number }) {
  return <text x={x} y={y} fill={color} fontSize={size} textAnchor={anchor} fontWeight={weight} style={{ fontFamily: "var(--font-sans)" }}>{children}</text>;
}

export function Readout({ x, y, rows }: { x: number; y: number; rows: [string, string][] }) {
  return (
    <g>
      <rect x={x} y={y} width={170} height={rows.length * 18 + 12} rx={10} className="fill-[var(--surface)] stroke-[var(--border)]" opacity={0.95} />
      {rows.map(([k, v], i) => (
        <g key={k}>
          <Label x={x + 10} y={y + 20 + i * 18} size={11} weight={500} color="var(--muted)">{k}</Label>
          <Label x={x + 160} y={y + 20 + i * 18} size={11} anchor="end">{v}</Label>
        </g>
      ))}
    </g>
  );
}

/** Polyline path from points. */
export const path = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
