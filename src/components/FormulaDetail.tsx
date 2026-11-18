import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui";
import { Rich, TeX } from "@/components/Rich";
import { Player } from "@/components/studio/Player";

type Worked = { problem: string; solution: string };

export type FormulaView = {
  expression: string;
  variables: { symbol: string; meaning: string; unit: string }[];
  siUnit: string; dimensions: string; origin: string;
  derivation: { statement: string; justification: string }[];
  interpretation: string; whyItWorks: string; whenToUse: string; whenNotToUse: string; conditions: string; assumptions: string; specialCases: string;
  relations: { slug?: string; text: string }[];
  graph?: string | null; graphKey?: string | null;
  basicExample: Worked; jeeExample: Worked; trickyApplication: Worked;
  commonMistakes: string; shortcuts: string; limitations: string;
};

function Field({ n, title, children, tone }: { n: number; title: string; children: ReactNode; tone?: "good" | "bad" | "warn" }) {
  const toneCls = tone === "good" ? "border-l-emerald-500" : tone === "bad" ? "border-l-rose-500" : tone === "warn" ? "border-l-amber-500" : "border-l-transparent";
  return (
    <Card className={`border-l-4 ${toneCls}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-[11px] font-bold">{n}</span>
        <h2 className="font-display font-semibold">{title}</h2>
      </div>
      <div className="text-sm">{children}</div>
    </Card>
  );
}

function WorkedBlock({ w }: { w: Worked }) {
  return (
    <div className="space-y-2">
      <div className="rounded-xl bg-[var(--surface-2)] p-3"><Rich text={w.problem} /></div>
      <details open>
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-electric-500">Solution</summary>
        <div className="mt-2"><Rich text={w.solution} /></div>
      </details>
    </div>
  );
}

/** All 21 structured fields of a formula. Used by the full app and the static edition. */
export function FormulaDetail({ f, relName }: { f: FormulaView; relName: Record<string, string> }) {
  return (
    <>
      <Card className="bg-hero mb-6 text-center">
        <div className="muted mb-1 text-xs font-bold uppercase tracking-[0.18em]">2 · Mathematical expression</div>
        <div className="overflow-x-auto py-2 text-2xl"><TeX display>{f.expression}</TeX></div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Field n={3} title="Meaning of every variable">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="muted text-xs uppercase"><th className="py-1 pr-3">Symbol</th><th className="py-1 pr-3">Meaning</th><th className="py-1">Unit</th></tr></thead>
              <tbody>{f.variables.map((v) => <tr key={v.symbol} className="border-t border-[var(--border)]"><td className="py-1.5 pr-3"><TeX>{v.symbol}</TeX></td><td className="py-1.5 pr-3"><Rich text={v.meaning} /></td><td className="py-1.5">{v.unit}</td></tr>)}</tbody>
            </table>
          </div>
        </Field>
        <div className="grid gap-4">
          <Field n={4} title="SI unit"><Rich text={f.siUnit} /></Field>
          <Field n={5} title="Dimensions">{f.dimensions.startsWith("[") ? <TeX>{f.dimensions}</TeX> : <Rich text={f.dimensions} />}</Field>
          <Field n={6} title="Origin of the formula"><Rich text={f.origin} /></Field>
        </div>
        <div className="lg:col-span-2">
          <Field n={7} title="Step-by-step derivation">
            <ol className="space-y-3">
              {f.derivation.map((d, i) => (
                <li key={i} className="grid gap-1 rounded-xl border border-[var(--border)] p-3 md:grid-cols-[3.5rem_1fr_1fr] md:items-center">
                  <span className="muted text-xs font-bold">Step {i + 1}</span>
                  <div className="overflow-x-auto"><TeX display>{d.statement}</TeX></div>
                  <div className="muted text-sm"><Rich text={d.justification} /></div>
                </li>
              ))}
            </ol>
          </Field>
        </div>
        <Field n={8} title="Physical / mathematical interpretation"><Rich text={f.interpretation} /></Field>
        <Field n={9} title="Why the formula works"><Rich text={f.whyItWorks} /></Field>
        <Field n={10} title="When to use it" tone="good"><Rich text={f.whenToUse} /></Field>
        <Field n={11} title="When NOT to use it" tone="bad"><Rich text={f.whenNotToUse} /></Field>
        <Field n={12} title="Required conditions" tone="warn"><Rich text={f.conditions} /></Field>
        <Field n={13} title="Assumptions" tone="warn"><Rich text={f.assumptions} /></Field>
        <Field n={14} title="Special cases"><Rich text={f.specialCases} /></Field>
        <Field n={15} title="Relationship with other formulas">
          <ul className="space-y-2">
            {f.relations.map((r, i) => <li key={i}>{r.slug && relName[r.slug] ? <Link href={`/formulas/${r.slug}`} className="link">{relName[r.slug]}: </Link> : null}<Rich text={r.text} className="inline-block" /></li>)}
          </ul>
        </Field>
        <div className="lg:col-span-2">
          <Field n={16} title="Graphical interpretation">
            {f.graph ? <Rich text={f.graph} /> : <p className="muted">Not applicable for this formula.</p>}
            {f.graphKey && <div className="mt-4"><Player simKey={f.graphKey} compact /></div>}
          </Field>
        </div>
        <Field n={17} title="Basic solved example"><WorkedBlock w={f.basicExample} /></Field>
        <Field n={18} title="JEE Main-level solved example"><WorkedBlock w={f.jeeExample} /></Field>
        <Field n={19} title="Tricky application"><WorkedBlock w={f.trickyApplication} /></Field>
        <Field n={20} title="Common mistakes" tone="bad"><Rich text={f.commonMistakes} /></Field>
        <div className="lg:col-span-2">
          <Field n={21} title="Shortcuts and limitations">
            <div className="grid gap-4 md:grid-cols-2">
              <div><div className="mb-1 text-xs font-bold uppercase text-emerald-500">Shortcuts</div><Rich text={f.shortcuts} /></div>
              <div><div className="mb-1 text-xs font-bold uppercase text-rose-500">Limitations</div><Rich text={f.limitations} /></div>
            </div>
          </Field>
        </div>
      </div>
    </>
  );
}
