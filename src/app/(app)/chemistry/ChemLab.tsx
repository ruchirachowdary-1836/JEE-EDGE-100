"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Shuffle, Eye, ArrowRight } from "lucide-react";
import { ELEMENTS, gridPos, configuration, aufbau, unpairedInSubshell, CONFIG_EXCEPTIONS, type Element } from "@/lib/elements";
import { ORGANIC_NODES, ORGANIC_EDGES, type OrganicEdge } from "@content/chemistry";
import { TeX, Rich, Inline } from "@/components/Rich";
import { Player } from "@/components/studio/Player";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ReviewBadge } from "@/components/ui";
import { cn } from "@/lib/utils";

type Reaction = { slug: string; name: string; chapter: string; reactant: string; reagents: string; product: string; equation: string; mechanism: string; notes: string; reviewStatus: string };
type Exception = { id: string; title: string; statement: string; reason: string; chapter: string; chapterSlug: string };

const TABS = [
  ["table", "Periodic table"], ["config", "Configuration explorer"], ["bonding", "Bonding visualiser"], ["map", "Organic reaction map"],
  ["practice", "Conversion practice"], ["reactions", "Named reactions"], ["exceptions", "Inorganic exceptions"], ["more", "Numericals & flashcards"],
] as const;

const CAT_COLOR: Record<string, string> = {
  alkali: "#f43f5e", alkaline: "#fb923c", transition: "#60a5fa", "post-transition": "#94a3b8", metalloid: "#a3e635",
  nonmetal: "#34d399", halogen: "#facc15", noble: "#c084fc", lanthanoid: "#f472b6", actinoid: "#e879f9",
};

function enColor(en: number | null) {
  if (en === null) return "#64748b";
  const t = Math.min(1, Math.max(0, (en - 0.7) / 3.3));
  return `hsl(${220 - t * 220}, 80%, ${45 + t * 10}%)`;
}

function PeriodicTable({ onPick }: { onPick: (z: number) => void }) {
  const [mode, setMode] = useState<"category" | "en" | "block">("category");
  const [sel, setSel] = useState<Element>(ELEMENTS[5]);
  const blockColor: Record<string, string> = { s: "#f43f5e", p: "#facc15", d: "#60a5fa", f: "#e879f9" };
  const color = (e: Element) => (mode === "category" ? CAT_COLOR[e.category] : mode === "en" ? enColor(e.en) : blockColor[e.block]);
  const cfg = configuration(sel.z);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold">Colour by:</span>
        {(["category", "en", "block"] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={cn("btn-ghost !py-1 text-xs", mode === m && "!border-electric-500 !text-electric-500")}>{m === "en" ? "Electronegativity trend" : m === "block" ? "Block" : "Category"}</button>)}
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[760px] gap-[3px]" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))", gridTemplateRows: "repeat(10, auto)" }}>
          {ELEMENTS.map((e) => {
            const { row, col } = gridPos(e);
            return (
              <button key={e.z} onClick={() => { setSel(e); onPick(e.z); }} title={`${e.name} (${e.z})`}
                className={cn("rounded-md p-1 text-left leading-tight transition hover:scale-110 hover:z-10", sel.z === e.z && "ring-2 ring-white")}
                style={{ gridRow: row + (row >= 9 ? 0 : 0), gridColumn: col, background: color(e), color: "#0b1020", marginTop: row === 9 ? 10 : 0 }}>
                <div className="text-[8px] font-semibold opacity-70">{e.z}</div>
                <div className="text-sm font-bold">{e.symbol}</div>
              </button>
            );
          })}
        </div>
      </div>
      {mode === "en" && <p className="muted text-xs">Blue = low electronegativity → red = high (Pauling). Grey = no accepted value. Notice the rise across a period and fall down a group.</p>}
      <div className="card card-pad grid gap-4 md:grid-cols-[auto_1fr]">
        <div className="grid h-28 w-28 place-items-center rounded-2xl text-center" style={{ background: color(sel), color: "#0b1020" }}>
          <div><div className="text-xs font-semibold">{sel.z}</div><div className="font-display text-4xl font-bold">{sel.symbol}</div><div className="text-[10px]">{sel.mass}</div></div>
        </div>
        <div className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
          <div><span className="muted">Name:</span> <strong>{sel.name}</strong></div>
          <div><span className="muted">Category:</span> {sel.category}</div>
          <div><span className="muted">Group / Period:</span> {sel.group ?? "3 (f-block)"} / {sel.period}</div>
          <div><span className="muted">Block:</span> {sel.block}</div>
          <div><span className="muted">Electronegativity:</span> {sel.en ?? "—"}</div>
          <div><span className="muted">Atomic mass:</span> {sel.mass}</div>
          <div className="sm:col-span-2"><span className="muted">Configuration:</span> <span className="font-mono">{cfg.condensed}</span> {cfg.exception && <span className="chip ml-1 bg-amber-500/10 text-amber-600">exception</span>}</div>
          {cfg.exception && <div className="muted text-xs sm:col-span-2">{cfg.exception}</div>}
        </div>
      </div>
    </div>
  );
}

function ConfigExplorer({ z, setZ }: { z: number; setZ: (z: number) => void }) {
  const el = ELEMENTS[z - 1];
  const cfg = configuration(z);
  const filled = aufbau(z);
  const exception = CONFIG_EXCEPTIONS[z];
  // For exceptions, rebuild the outer subshells from the verified string for the box diagram
  const outer = exception
    ? exception.config.replace(/\[[A-Za-z]+\]\s*/, "").split(/\s+/).map((s) => ({ subshell: s.slice(0, 2), electrons: Number(s.slice(2)) }))
    : filled.slice(-3);
  const unpaired = outer.reduce((a, s) => a + unpairedInSubshell(s.subshell, s.electrons), 0);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="label !mb-0">Atomic number</label>
        <input type="number" min={1} max={118} value={z} onChange={(e) => setZ(Math.max(1, Math.min(118, Number(e.target.value) || 1)))} className="input !w-24" />
        <input type="range" min={1} max={118} value={z} onChange={(e) => setZ(Number(e.target.value))} className="flex-1 accent-electric-500" />
      </div>
      <div className="card card-pad">
        <div className="font-display text-2xl font-bold">{el.name} <span className="muted text-base">({el.symbol}, Z = {z})</span></div>
        <div className="mt-2 font-mono text-lg">{cfg.condensed}</div>
        {!exception && <div className="muted mt-1 font-mono text-xs">Full: {cfg.full}</div>}
        {exception && (
          <div className="mt-3 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 p-3 text-sm">
            <strong>Exception to the Aufbau order.</strong> Simple filling predicts <span className="font-mono">{cfg.aufbauPrediction}</span>; the observed ground state is <span className="font-mono">{exception.config}</span>. {exception.reason}
          </div>
        )}
      </div>
      <div className="card card-pad">
        <div className="mb-3 text-sm font-semibold">Orbital box diagram (outer subshells) · unpaired electrons: <span className="text-electric-500">{unpaired}</span></div>
        <div className="flex flex-wrap gap-6">
          {outer.map((s) => {
            const boxes = ({ s: 1, p: 3, d: 5, f: 7 } as Record<string, number>)[s.subshell[1]];
            return (
              <div key={s.subshell}>
                <div className="flex gap-1">
                  {Array.from({ length: boxes }, (_, i) => {
                    const up = i < s.electrons;
                    const down = i + boxes < s.electrons;
                    return <div key={i} className="grid h-10 w-9 place-items-center rounded-md border border-[var(--border)] font-mono text-lg">{up ? "↑" : ""}{down ? "↓" : ""}</div>;
                  })}
                </div>
                <div className="muted mt-1 text-center font-mono text-xs">{s.subshell}<sup>{s.electrons}</sup></div>
              </div>
            );
          })}
        </div>
        <p className="muted mt-3 text-xs">Hund&apos;s rule: electrons occupy degenerate orbitals singly with parallel spins before pairing. Pauli: at most two electrons per orbital, with opposite spins.</p>
      </div>
    </div>
  );
}

function shortestPath(from: string, to: string): OrganicEdge[] | null {
  if (from === to) return [];
  const prev = new Map<string, OrganicEdge>();
  const seen = new Set([from]);
  const queue = [from];
  while (queue.length) {
    const n = queue.shift()!;
    for (const e of ORGANIC_EDGES.filter((x) => x.from === n)) {
      if (seen.has(e.to)) continue;
      seen.add(e.to);
      prev.set(e.to, e);
      if (e.to === to) {
        const path: OrganicEdge[] = [];
        let cur: string = to;
        while (cur !== from) { const p = prev.get(cur)!; path.unshift(p); cur = p.from; }
        return path;
      }
      queue.push(e.to);
    }
  }
  return null;
}

function ReactionMap() {
  const [from, setFrom] = useState<string>("Alkene");
  const [to, setTo] = useState<string>("Carboxylic acid");
  const path = shortestPath(from, to);
  const R = 150, cx = 320, cy = 190;
  const pos = Object.fromEntries(ORGANIC_NODES.map((n, i) => { const a = (i / ORGANIC_NODES.length) * 2 * Math.PI - Math.PI / 2; return [n, [cx + R * 1.6 * Math.cos(a), cy + R * Math.sin(a)]]; }));
  const onPath = new Set((path ?? []).map((e) => `${e.from}>${e.to}`));
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select className="input !w-auto" value={from} onChange={(e) => setFrom(e.target.value)}>{ORGANIC_NODES.map((n) => <option key={n}>{n}</option>)}</select>
        <ArrowRight size={16} />
        <select className="input !w-auto" value={to} onChange={(e) => setTo(e.target.value)}>{ORGANIC_NODES.map((n) => <option key={n}>{n}</option>)}</select>
        <span className="muted text-sm">Shortest route in the map ({ORGANIC_EDGES.length} curated conversions)</span>
      </div>
      <div className="card overflow-x-auto p-2">
        <svg viewBox="0 0 640 380" className="min-w-[600px]">
          {ORGANIC_EDGES.map((e, i) => {
            const [x1, y1] = pos[e.from], [x2, y2] = pos[e.to];
            const hot = onPath.has(`${e.from}>${e.to}`);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={hot ? "#8b5cf6" : "#94a3b8"} strokeOpacity={hot ? 1 : 0.18} strokeWidth={hot ? 3 : 1} />;
          })}
          {ORGANIC_NODES.map((n) => {
            const [x, y] = pos[n];
            const active = n === from || n === to;
            return (
              <g key={n} onClick={() => (n === from ? null : setTo(n))} className="cursor-pointer">
                <rect x={x - 48} y={y - 13} width={96} height={26} rx={13} fill={active ? "#2b8cff" : "var(--surface)"} stroke={active ? "#2b8cff" : "var(--border)"} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize={10} fontWeight={600} fill={active ? "white" : "currentColor"}>{n}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="card card-pad">
        {path === null ? <p className="text-sm">No route between these classes exists in the curated map.</p> : path.length === 0 ? <p className="text-sm">Same class selected.</p> : (
          <ol className="space-y-2">
            {path.map((e, i) => (
              <li key={i} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500/15 text-xs font-bold text-violet-500">{i + 1}</span>
                <strong>{e.from}</strong> <ArrowRight size={14} /> <strong>{e.to}</strong>
                <span className="muted">— {e.reagent}{e.note ? ` (${e.note})` : ""}</span>
              </li>
            ))}
          </ol>
        )}
        <p className="muted mt-3 text-xs">The map gives the shortest sequence of standard NCERT-level conversions. Carbon count may change (e.g. Hofmann degradation removes one carbon); always check whether the target needs the same carbon skeleton.</p>
      </div>
    </div>
  );
}

function ConversionPractice() {
  const pairs = useMemo(() => {
    const out: [string, string, number][] = [];
    for (const a of ORGANIC_NODES) for (const b of ORGANIC_NODES) {
      const p = shortestPath(a, b);
      if (p && p.length >= 2 && p.length <= 3) out.push([a, b, p.length]);
    }
    return out;
  }, []);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const [from, to] = pairs[i % pairs.length];
  const path = shortestPath(from, to)!;
  return (
    <div className="card card-pad space-y-4">
      <div className="text-sm">Convert in {path.length} steps:</div>
      <div className="flex flex-wrap items-center gap-3 font-display text-xl font-bold"><span>{from}</span><ArrowRight /><span>{to}</span></div>
      <p className="muted text-sm">Write down the reagents for each step on paper first, then reveal one step at a time and check yourself.</p>
      <ol className="space-y-2">
        {path.map((e, k) => (
          <li key={k} className="rounded-xl border border-[var(--border)] p-3 text-sm">
            <strong>Step {k + 1}:</strong> {k < shown ? <>{e.from} → {e.to}: <span className="text-electric-600 dark:text-electric-300">{e.reagent}</span></> : <span className="muted">hidden</span>}
          </li>
        ))}
      </ol>
      <div className="flex gap-2">
        <button className="btn-ghost" disabled={shown >= path.length} onClick={() => setShown(shown + 1)}><Eye size={16} /> Reveal next step</button>
        <button className="btn-primary" onClick={() => { setI(Math.floor(Math.random() * pairs.length)); setShown(0); }}><Shuffle size={16} /> New conversion</button>
      </div>
    </div>
  );
}

export function ChemLab({ initialTab, reactions, exceptions, physTopics, bookmarked, staticMode = false, hrefPrefix = "" }: { initialTab: string; reactions: Reaction[]; exceptions: Exception[]; physTopics: { slug: string; name: string; chapter: string; count: number }[]; bookmarked: string[]; /** static GitHub Pages edition: no account features */ staticMode?: boolean; hrefPrefix?: string }) {
  const [tab, setTab] = useState(TABS.some(([k]) => k === initialTab) ? initialTab : "table");
  const [z, setZ] = useState(24);
  const [q, setQ] = useState("");
  const bm = new Set(bookmarked);
  const rx = reactions.filter((r) => !q || `${r.name} ${r.reactant} ${r.reagents} ${r.product}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {TABS.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition", tab === k ? "bg-emerald-500 text-white" : "muted hover:bg-[var(--surface-2)]")}>{l}</button>)}
      </div>

      {tab === "table" && <PeriodicTable onPick={setZ} />}
      {tab === "config" && <ConfigExplorer z={z} setZ={setZ} />}
      {tab === "bonding" && <div className="card card-pad"><Player simKey="vsepr" steps={[{ title: "Tetrahedral", body: "CH₄: four bond pairs, 109.5°." }, { title: "Tetrahedral, no lone pairs", body: "All four positions are atoms." }, { title: "One lone pair", body: "NH₃: the lone pair squeezes the H–N–H angle to about 107°." }, { title: "Two lone pairs", body: "H₂O: two lone pairs reduce the angle further, to about 104.5°." }]} /><p className="muted mt-3 text-sm">See also the <Link href="/studio/orbitals" className="link">atomic orbital</Link> lesson and the <Link href="/chapter/chemical-bonding" className="link">Chemical Bonding</Link> chapter.</p></div>}
      {tab === "map" && <ReactionMap />}
      {tab === "practice" && <ConversionPractice />}
      {tab === "reactions" && (
        <div className="space-y-4">
          <div className="relative"><Search size={16} className="muted absolute left-3 top-1/2 -translate-y-1/2" /><input className="input !pl-9" placeholder="Search name, reagent, reactant or product…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="grid gap-4 lg:grid-cols-2">
            {rx.map((r) => (
              <div key={r.slug} id={r.slug} className="card card-pad scroll-mt-6">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div><div className="font-display font-semibold">{r.name}</div><div className="muted text-xs">{r.chapter}</div></div>
                  <div className="flex items-center gap-2"><ReviewBadge status={r.reviewStatus} />{!staticMode && <BookmarkButton itemType="REACTION" itemId={r.slug} initial={bm.has(r.slug)} small />}</div>
                </div>
                <div className="overflow-x-auto rounded-xl bg-[var(--surface-2)] px-3 py-2 text-sm"><TeX display>{r.equation}</TeX></div>
                <div className="mt-2 grid gap-1 text-sm">
                  <div><span className="muted">Substrate:</span> {r.reactant}</div>
                  <div><span className="muted">Reagents:</span> {r.reagents}</div>
                  <div><span className="muted">Product:</span> {r.product}</div>
                  <div><span className="muted">Mechanism:</span> <Inline text={r.mechanism} /></div>
                  <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/5 p-2 text-xs"><Inline text={r.notes} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "exceptions" && (
        <div className="grid gap-4 md:grid-cols-2">
          {exceptions.map((e) => (
            <div key={e.id} className="card card-pad">
              <div className="mb-1 flex items-center justify-between gap-2"><div className="font-semibold">{e.title}</div><Link href={`/chapter/${e.chapterSlug}`} className="muted text-xs hover:underline">{e.chapter}</Link></div>
              <Rich text={e.statement} className="text-sm" />
              <div className="mt-2 rounded-lg bg-[var(--surface-2)] p-2 text-sm"><span className="text-xs font-bold uppercase text-emerald-500">Why: </span><Inline text={e.reason} /></div>
            </div>
          ))}
        </div>
      )}
      {tab === "more" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card card-pad">
            <h3 className="h2 mb-2">Physical Chemistry numerical practice</h3>
            {physTopics.length ? physTopics.map((t) => <Link key={t.slug} href={`${hrefPrefix}/gym/${t.slug}`} className="flex justify-between rounded-lg p-2 text-sm hover:bg-[var(--surface-2)]"><span>{t.name} <span className="muted">· {t.chapter}</span></span><span>{t.count} Qs</span></Link>) : <p className="muted text-sm">No numerical sets published yet.</p>}
          </div>
          <div className="card card-pad">
            <h3 className="h2 mb-2">Flashcards & NCERT revision</h3>
            <Link href="/revision?deck=REACTION" className="link block py-1 text-sm">Important reaction flashcards ({reactions.length})</Link>
            <Link href="/revision?deck=CONCEPT" className="link block py-1 text-sm">Concept flashcards</Link>
            <p className="muted mt-2 text-sm">NCERT line-by-line revision sets for Inorganic Chemistry are <strong>content pending</strong>; the inorganic exceptions above and chapter notes cover the most frequently confused facts in the meantime.</p>
          </div>
        </div>
      )}
    </div>
  );
}
