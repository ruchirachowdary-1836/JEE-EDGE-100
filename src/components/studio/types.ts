import type { ReactNode } from "react";

export type Param = { key: string; label: string; min: number; max: number; step: number; default: number; unit?: string; options?: string[] };

export type SimRenderProps = {
  /** simulation time in seconds */
  t: number;
  /** the step index while in step mode, otherwise null */
  step: number | null;
  params: Record<string, number>;
  duration: number;
};

export type SimDef = {
  key: string;
  params: Param[];
  /** run length in seconds for the current parameters; Infinity = loops forever */
  duration: (p: Record<string, number>) => number;
  /** where each lesson step places the simulation: time and optional parameter overrides */
  stepState?: (step: number, p: Record<string, number>) => { t: number; params?: Record<string, number> };
  render: (props: SimRenderProps) => ReactNode;
};
