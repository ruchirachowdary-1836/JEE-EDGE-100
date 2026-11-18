"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Footprints, Gauge } from "lucide-react";
import { SIMS } from "./registry";
import { Inline } from "@/components/Rich";
import { cn } from "@/lib/utils";

type Step = { title: string; body: string };

export function Player({ simKey, steps = [], compact = false }: { simKey: string; steps?: Step[]; compact?: boolean }) {
  const sim = SIMS[simKey];
  const defaults = useMemo(() => Object.fromEntries((sim?.params ?? []).map((p) => [p.key, p.default])), [sim]);
  const [params, setParams] = useState<Record<string, number>>(defaults);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(!compact);
  const [speed, setSpeed] = useState(1);
  const [stepMode, setStepMode] = useState(false);
  const [step, setStep] = useState(0);
  const last = useRef<number | null>(null);
  const duration = sim ? sim.duration(params) : 0;

  useEffect(() => {
    if (!playing || stepMode) { last.current = null; return; }
    let raf = 0;
    const tick = (now: number) => {
      const dt = last.current == null ? 0 : (now - last.current) / 1000;
      last.current = now;
      setT((prev) => {
        const next = prev + dt * speed;
        if (Number.isFinite(duration) && next >= duration) { setPlaying(false); return duration; }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, stepMode, duration]);

  const goStep = (s: number) => {
    if (!sim) return;
    const clamped = Math.max(0, Math.min(Math.max(steps.length, 1) - 1, s));
    setStep(clamped);
    const st = sim.stepState?.(clamped, params);
    if (st) {
      if (st.params) setParams((p) => ({ ...p, ...st.params }));
      setT(st.t);
    }
  };

  if (!sim) return <div className="muted rounded-xl border border-dashed border-[var(--border)] p-6 text-sm">This simulation is not available.</div>;

  const restart = () => { setT(0); setPlaying(true); setStepMode(false); };
  const togglePlay = () => {
    if (stepMode) setStepMode(false);
    if (!playing && Number.isFinite(duration) && t >= duration) setT(0);
    setPlaying((p) => !p);
  };

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/40 p-2">
        {sim.render({ t, step: stepMode ? step : null, params, duration })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-primary !px-3" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing && !stepMode ? <Pause size={16} /> : <Play size={16} />} {playing && !stepMode ? "Pause" : "Play"}
        </button>
        <button className="btn-ghost !px-3" onClick={restart} aria-label="Restart"><RotateCcw size={16} /> Restart</button>
        <label className="btn-ghost !px-3">
          <Gauge size={16} />
          <select className="bg-transparent text-sm outline-none" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} aria-label="Playback speed">
            <option value={0.25}>0.25× (slow)</option>
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </label>
        {steps.length > 0 && (
          <button className={cn("btn-ghost !px-3", stepMode && "!border-violet-500 !text-violet-500")} onClick={() => { setStepMode(!stepMode); setPlaying(false); if (!stepMode) goStep(step); }}>
            <Footprints size={16} /> Step mode
          </button>
        )}
        {Number.isFinite(duration) && (
          <input type="range" min={0} max={duration} step={duration / 200 || 0.01} value={Math.min(t, duration)} onChange={(e) => { setPlaying(false); setStepMode(false); setT(Number(e.target.value)); }}
            className="min-w-[120px] flex-1 accent-electric-500" aria-label="Scrub timeline" />
        )}
      </div>

      {stepMode && steps.length > 0 && (
        <div className="rounded-xl border border-violet-500/40 bg-violet-500/5 p-4">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wide text-violet-500">Step {step + 1} of {steps.length}</div>
            <div className="flex gap-1">
              <button className="btn-ghost !p-1.5" onClick={() => goStep(step - 1)} disabled={step === 0} aria-label="Previous step"><ChevronLeft size={16} /></button>
              <button className="btn-ghost !p-1.5" onClick={() => goStep(step + 1)} disabled={step >= steps.length - 1} aria-label="Next step"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="font-semibold">{steps[step].title}</div>
          <p className="mt-1 text-sm"><Inline text={steps[step].body} /></p>
        </div>
      )}

      {sim.params.length > 0 && (
        <div className={cn("grid gap-3", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
          {sim.params.map((p) => (
            <div key={p.key} className="rounded-xl border border-[var(--border)] p-3">
              <div className="mb-1 flex justify-between text-xs font-semibold">
                <span className="muted">{p.label}</span>
                <span>{p.options ? p.options[Math.round(params[p.key])] : `${params[p.key]}${p.unit ? ` ${p.unit}` : ""}`}</span>
              </div>
              {p.options ? (
                <select className="input !py-1.5" value={Math.round(params[p.key])} onChange={(e) => { setParams({ ...params, [p.key]: Number(e.target.value) }); setT(0); setPlaying(true); setStepMode(false); }}>
                  {p.options.map((o, i) => <option key={o} value={i}>{o}</option>)}
                </select>
              ) : (
                <input type="range" min={p.min} max={p.max} step={p.step} value={params[p.key]} className="w-full accent-electric-500"
                  onChange={(e) => { setParams({ ...params, [p.key]: Number(e.target.value) }); setStepMode(false); if (Number.isFinite(duration) && t >= duration) setT(0); }} aria-label={p.label} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
