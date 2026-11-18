"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TeX } from "@/components/Rich";
import { api } from "@/lib/client";

type Data = Record<string, unknown> & { expression: string; chapterSlug: string };

const TEXT_FIELDS: [string, string, boolean][] = [
  ["name", "1. Formula name", false], ["expression", "2. Mathematical expression (LaTeX)", false], ["siUnit", "4. SI units", false], ["dimensions", "5. Dimensions (e.g. [M^0 L^1 T^{-1}])", false],
  ["origin", "6. Origin of the formula", true], ["interpretation", "8. Physical / mathematical interpretation", true], ["whyItWorks", "9. Why the formula works", true],
  ["whenToUse", "10. When to use it", true], ["whenNotToUse", "11. When NOT to use it", true], ["conditions", "12. Required conditions", true], ["assumptions", "13. Assumptions", true],
  ["specialCases", "14. Special cases", true], ["graph", "16. Graphical interpretation (optional)", true], ["commonMistakes", "20. Common mistakes", true],
  ["shortcuts", "21a. Shortcuts", true], ["limitations", "21b. Limitations", true],
];
const JSON_FIELDS: [string, string, string][] = [
  ["variables", "3. Meaning of every variable", '[{ "symbol": "u", "meaning": "launch speed", "unit": "m s⁻¹" }]'],
  ["derivation", "7. Step-by-step derivation", '[{ "statement": "LaTeX step", "justification": "why this step is valid" }]'],
  ["relations", "15. Relationship with other formulas", '[{ "slug": "other-formula-slug", "text": "how they relate" }]'],
  ["basicExample", "17. Basic solved example", '{ "problem": "…", "solution": "…" }'],
  ["jeeExample", "18. JEE Main-level solved example", '{ "problem": "…", "solution": "…" }'],
  ["trickyApplication", "19. Tricky application", '{ "problem": "…", "solution": "…" }'],
];

export function FormulaEditor({ initial, originalSlug, chapters, simKeys }: { initial: Data; originalSlug?: string; chapters: { slug: string; name: string; topics: { slug: string; name: string }[] }[]; simKeys: string[] }) {
  const router = useRouter();
  const [d, setD] = useState<Data>(initial);
  const [json, setJson] = useState<Record<string, string>>(Object.fromEntries(JSON_FIELDS.map(([k]) => [k, JSON.stringify(initial[k], null, 2)])));
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const topics = chapters.find((c) => c.slug === d.chapterSlug)?.topics ?? [];

  const save = async () => {
    setErr("");
    const payload: Record<string, unknown> = { ...d };
    for (const [k, label] of JSON_FIELDS) {
      try { payload[k] = JSON.parse(json[k]); } catch { return setErr(`${label}: invalid JSON`); }
    }
    payload.topicSlug = d.topicSlug || null;
    payload.graphKey = d.graphKey || null;
    payload.graph = d.graph || null;
    setBusy(true);
    try {
      const r = await api<{ slug: string }>("/api/admin/content", { method: "PUT", body: { kind: "formula", data: payload, originalSlug } });
      router.push(`/admin/formulas/${r.slug}`);
      router.refresh();
      setErr("Saved.");
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <div className="card card-pad grid gap-3 sm:grid-cols-3">
        <div><label className="label">Slug</label><input className="input font-mono" value={String(d.slug)} onChange={(e) => setD({ ...d, slug: e.target.value })} placeholder="e.g. ohms-law" /></div>
        <div><label className="label">Chapter</label><select className="input" value={d.chapterSlug} onChange={(e) => setD({ ...d, chapterSlug: e.target.value, topicSlug: "" })}>{chapters.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
        <div><label className="label">Topic (optional)</label><select className="input" value={String(d.topicSlug ?? "")} onChange={(e) => setD({ ...d, topicSlug: e.target.value })}><option value="">—</option>{topics.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select></div>
        <div><label className="label">Graph animation (optional)</label><select className="input" value={String(d.graphKey ?? "")} onChange={(e) => setD({ ...d, graphKey: e.target.value })}><option value="">—</option>{simKeys.map((k) => <option key={k}>{k}</option>)}</select></div>
        <div className="sm:col-span-2"><label className="label">Preview</label><div className="overflow-x-auto rounded-xl bg-[var(--surface-2)] p-3 text-center"><TeX display>{d.expression || "\\text{expression}"}</TeX></div></div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {TEXT_FIELDS.map(([k, label, multi]) => (
          <div key={k} className="card card-pad">
            <label className="label">{label}</label>
            {multi ? <textarea className="input min-h-[90px] text-sm" value={String(d[k] ?? "")} onChange={(e) => setD({ ...d, [k]: e.target.value })} /> : <input className="input" value={String(d[k] ?? "")} onChange={(e) => setD({ ...d, [k]: e.target.value })} />}
          </div>
        ))}
        {JSON_FIELDS.map(([k, label, hint]) => (
          <div key={k} className="card card-pad">
            <label className="label">{label}</label>
            <textarea className="input min-h-[140px] font-mono text-xs" value={json[k]} onChange={(e) => setJson({ ...json, [k]: e.target.value })} spellCheck={false} />
            <p className="muted mt-1 text-[11px]">Format: <code>{hint}</code></p>
          </div>
        ))}
      </div>
      <div className="sticky bottom-4 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
        <button className="btn-violet" onClick={save} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Save formula</button>
        {err && <span className="whitespace-pre-wrap text-sm">{err}</span>}
      </div>
    </div>
  );
}
