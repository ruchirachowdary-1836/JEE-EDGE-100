"use client";

import { useRouter } from "next/navigation";
import { SUBJECT_META } from "@/lib/utils";

export function PyqFilters({ chapters, current }: { chapters: { slug: string; name: string; subject: string }[]; current: Record<string, string | undefined> }) {
  const router = useRouter();
  const set = (key: string, value: string) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(current)) if (v && k !== "page") q.set(k, v);
    if (value) q.set(key, value); else q.delete(key);
    if (key === "subject") q.delete("chapter");
    router.push(`/pyq?${q.toString()}`);
  };
  const sel = (key: string, label: string, opts: [string, string][]) => (
    <select className="input" value={current[key] ?? ""} onChange={(e) => set(key, e.target.value)} aria-label={label}>
      <option value="">{label}</option>
      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
  return (
    <div className="mb-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {sel("year", "All years", [2026, 2025, 2024, 2023, 2022].map((y) => [String(y), String(y)]))}
      {sel("subject", "All subjects", Object.entries(SUBJECT_META).map(([k, v]) => [k, v.name]))}
      {sel("chapter", "All chapters", chapters.filter((c) => !current.subject || c.subject === current.subject).map((c) => [c.slug, c.name]))}
      {sel("difficulty", "Any difficulty", [["EASY", "Easy"], ["MEDIUM", "Medium"], ["HARD", "Hard"]])}
      {sel("status", "Any status", [["unsolved", "Unsolved"], ["attempted", "Previously attempted"], ["incorrect", "Incorrect (unresolved)"], ["bookmarked", "Bookmarked"]])}
      <button className="btn-ghost" onClick={() => router.push("/pyq")}>Clear filters</button>
    </div>
  );
}
