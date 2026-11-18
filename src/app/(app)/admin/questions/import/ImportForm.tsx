"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { api } from "@/lib/client";

export function ImportForm({ example }: { example: string }) {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    setMsg("");
    let parsed: unknown;
    try { parsed = JSON.parse(text); } catch { return setMsg("Invalid JSON."); }
    const payload = Array.isArray(parsed) ? { questions: parsed } : parsed;
    setBusy(true);
    try { const r = await api<{ imported: number }>("/api/admin/questions", { body: payload }); setMsg(`Imported ${r.imported} question(s) as draft. Review and publish them from the Questions list.`); setText(""); }
    catch (e) { setMsg((e as Error).message); } finally { setBusy(false); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card card-pad space-y-3">
        <label className="btn-ghost w-fit cursor-pointer"><Upload size={16} /> Choose .json file<input type="file" accept=".json,application/json" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (file) setText(await file.text()); }} /></label>
        <textarea className="input min-h-[360px] font-mono text-xs" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste JSON here" spellCheck={false} />
        <button className="btn-violet" onClick={submit} disabled={busy || !text.trim()}>{busy && <Loader2 size={16} className="animate-spin" />} Validate & import</button>
        {msg && <pre className="whitespace-pre-wrap rounded-xl bg-[var(--surface-2)] p-3 text-xs">{msg}</pre>}
      </div>
      <div className="card card-pad">
        <div className="label">Format</div>
        <pre className="max-h-[480px] overflow-auto rounded-xl bg-[var(--surface-2)] p-3 text-[11px]">{example}</pre>
        <p className="muted mt-2 text-xs">Practice questions use <code>&quot;source&quot;: &quot;PRACTICE&quot;</code> and need a <code>level</code> (1–5). Numericals use <code>&quot;type&quot;: &quot;NUMERICAL&quot;</code>, <code>numericalAnswer</code> and optional <code>numericalTolerance</code>.</p>
      </div>
    </div>
  );
}
