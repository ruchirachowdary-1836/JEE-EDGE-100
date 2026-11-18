"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/client";

export function SettingsForms(p: { name: string; email: string; examDate: string; presets: { label: string; date: string }[]; dailyHours: number; dailyQuestionTarget: number }) {
  const router = useRouter();
  const [f, setF] = useState({ name: p.name, examDate: p.examDate, dailyHours: p.dailyHours, dailyQuestionTarget: p.dailyQuestionTarget });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "" });
  const [pwMsg, setPwMsg] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (f.name.trim().length < 2) return setMsg("Name must be at least 2 characters.");
    if (!f.examDate) return setMsg("Choose your exam date.");
    if (f.dailyHours < 1 || f.dailyHours > 14) return setMsg("Daily hours must be between 1 and 14.");
    setBusy(true);
    try { await api("/api/profile", { method: "PATCH", body: f }); setMsg("Saved."); router.refresh(); }
    catch (err) { setMsg((err as Error).message); } finally { setBusy(false); }
  };
  const changePw = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg("");
    if (pw.next.length < 8) return setPwMsg("New password must be at least 8 characters.");
    try { await api("/api/profile", { body: pw }); setPwMsg("Password changed."); setPw({ current: "", next: "" }); }
    catch (err) { setPwMsg((err as Error).message); }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="card card-pad space-y-4" noValidate>
        <h2 className="h2">Profile & targets</h2>
        <div><label className="label">Name</label><input className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} maxLength={80} /></div>
        <div><label className="label">Email</label><input className="input opacity-70" value={p.email} disabled /></div>
        <div>
          <label className="label">Exam date</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {p.presets.map((d) => <button type="button" key={d.date} className="btn-ghost !py-1 text-xs" onClick={() => setF({ ...f, examDate: d.date })}>{d.label}</button>)}
          </div>
          <input type="date" className="input" value={f.examDate} onChange={(e) => setF({ ...f, examDate: e.target.value })} />
          <p className="muted mt-1 text-xs">Preset dates are configured by administrators from the official schedule. Set your own shift date once your admit card is out.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Study hours per day</label><input type="number" min={1} max={14} step={0.5} className="input" value={f.dailyHours} onChange={(e) => setF({ ...f, dailyHours: Number(e.target.value) })} /></div>
          <div><label className="label">Daily question target</label><input type="number" min={5} max={400} className="input" value={f.dailyQuestionTarget} onChange={(e) => setF({ ...f, dailyQuestionTarget: Number(e.target.value) })} /></div>
        </div>
        <div className="flex items-center gap-3"><button className="btn-primary" disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Save</button>{msg && <span className="text-sm">{msg}</span>}</div>
      </form>
      <form onSubmit={changePw} className="card card-pad space-y-4" noValidate>
        <h2 className="h2">Change password</h2>
        <div><label className="label">Current password</label><input type="password" autoComplete="current-password" className="input" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} /></div>
        <div><label className="label">New password</label><input type="password" autoComplete="new-password" className="input" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></div>
        <div className="flex items-center gap-3"><button className="btn-ghost">Update password</button>{pwMsg && <span className="text-sm">{pwMsg}</span>}</div>
      </form>
    </div>
  );
}
