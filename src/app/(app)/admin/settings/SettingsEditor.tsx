"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/client";
import type { AppSettings } from "@/lib/config";

const DESCRIPTIONS: Record<keyof AppSettings, string> = {
  examPattern: "Questions per subject, duration and marking scheme used by the simulator and the full-mock assembler.",
  examDates: "Preset exam dates students can choose for their countdown.",
  syllabus: "Which official syllabus the chapter list follows (shown on the Syllabus page).",
  gym: "Question Gym unlock rule: minimum accuracy (%) and minimum share of the level attempted (%).",
  srs: "Spaced-repetition intervals (days) for flashcards and the mistake-notebook re-attempt schedule.",
  mastery: "A topic counts as mastered only when all of these are met (and its notes are finished).",
};

export function SettingsEditor({ settings }: { settings: AppSettings }) {
  const router = useRouter();
  const [vals, setVals] = useState<Record<string, string>>(Object.fromEntries(Object.entries(settings).map(([k, v]) => [k, JSON.stringify(v, null, 2)])));
  const [msgs, setMsgs] = useState<Record<string, string>>({});
  const save = async (key: string) => {
    let value: unknown;
    try { value = JSON.parse(vals[key]); } catch { return setMsgs({ ...msgs, [key]: "Invalid JSON" }); }
    try { await api("/api/admin/settings", { method: "PUT", body: { key, value } }); setMsgs({ ...msgs, [key]: "Saved." }); router.refresh(); }
    catch (e) { setMsgs({ ...msgs, [key]: (e as Error).message }); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {(Object.keys(DESCRIPTIONS) as (keyof AppSettings)[]).map((k) => (
        <div key={k} className="card card-pad">
          <div className="font-display font-semibold">{k}</div>
          <p className="muted mb-2 text-xs">{DESCRIPTIONS[k]}</p>
          <textarea className="input min-h-[200px] font-mono text-xs" spellCheck={false} value={vals[k]} onChange={(e) => setVals({ ...vals, [k]: e.target.value })} />
          <div className="mt-2 flex items-center gap-2"><button className="btn-violet !py-1.5" onClick={() => save(k)}>Save</button>{msgs[k] && <span className="text-xs">{msgs[k]}</span>}</div>
        </div>
      ))}
    </div>
  );
}
