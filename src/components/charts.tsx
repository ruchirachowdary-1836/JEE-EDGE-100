"use client";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

const axis = { stroke: "currentColor", fontSize: 11, tickLine: false, axisLine: false, opacity: 0.6 } as const;
const tooltipStyle = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, color: "var(--text)" };

export function BarSeries({ data, xKey, bars, height = 240, yMax, unit = "" }: {
  data: Record<string, unknown>[]; xKey: string; bars: { key: string; color: string; name?: string }[]; height?: number; yMax?: number; unit?: string;
}) {
  if (!data.length) return <div className="muted grid place-items-center text-sm" style={{ height }}>No data yet</div>;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
        <XAxis dataKey={xKey} {...axis} interval={0} />
        <YAxis {...axis} domain={[0, yMax ?? "auto"]} unit={unit} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(43,140,255,0.06)" }} />
        {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {bars.map((b) => <Bar key={b.key} dataKey={b.key} name={b.name ?? b.key} fill={b.color} radius={[6, 6, 0, 0]} maxBarSize={42} />)}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ColoredBars({ data, height = 220, yMax = 100, unit = "%" }: { data: { name: string; value: number; color: string }[]; height?: number; yMax?: number; unit?: string }) {
  if (!data.length) return <div className="muted grid place-items-center text-sm" style={{ height }}>No data yet</div>;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
        <XAxis dataKey="name" {...axis} />
        <YAxis {...axis} domain={[0, yMax]} unit={unit} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(43,140,255,0.06)" }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((d) => <Cell key={d.name} fill={d.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineSeries({ data, xKey, lines, height = 240, yMax, unit = "" }: {
  data: Record<string, unknown>[]; xKey: string; lines: { key: string; color: string; name?: string }[]; height?: number; yMax?: number; unit?: string;
}) {
  if (!data.length) return <div className="muted grid place-items-center text-sm" style={{ height }}>No data yet</div>;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
        <XAxis dataKey={xKey} {...axis} />
        <YAxis {...axis} domain={[0, yMax ?? "auto"]} unit={unit} />
        <Tooltip contentStyle={tooltipStyle} />
        {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {lines.map((l) => <Line key={l.key} type="monotone" dataKey={l.key} name={l.name ?? l.key} stroke={l.color} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} connectNulls />)}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function RadarMastery({ data, height = 260 }: { data: { subject: string; value: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid opacity={0.3} />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "currentColor" }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
