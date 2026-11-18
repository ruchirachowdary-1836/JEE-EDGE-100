"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, Highlighter, Trash2, Save, X, StickyNote } from "lucide-react";
import { Rich } from "@/components/Rich";
import { Player } from "@/components/studio/Player";
import { api } from "@/lib/client";
import { cn } from "@/lib/utils";

type Section = { key: string; title: string; body: string; animationKey?: string };
type HL = { id: string; sectionKey: string; text: string };

/* Paints ranges for every occurrence of each string inside `root` using the CSS Custom Highlight API. */
function paint(name: string, root: HTMLElement | null, needles: string[]) {
  const reg = (globalThis as unknown as { CSS?: { highlights?: Map<string, unknown> } }).CSS?.highlights;
  const HighlightCtor = (globalThis as unknown as { Highlight?: new (...r: Range[]) => unknown }).Highlight;
  if (!reg || !HighlightCtor || !root) return;
  const ranges: Range[] = [];
  const list = needles.map((n) => n.trim().toLowerCase()).filter((n) => n.length >= 2);
  if (list.length) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = (node.textContent ?? "").toLowerCase();
      for (const n of list) {
        let i = text.indexOf(n);
        while (i !== -1) {
          const r = document.createRange();
          r.setStart(node, i);
          r.setEnd(node, i + n.length);
          ranges.push(r);
          i = text.indexOf(n, i + n.length);
        }
      }
    }
  }
  reg.set(name, new HighlightCtor(...ranges));
}

export function NotesReader({ topicId, sections, initialHighlights, initialPersonal }: { topicId: string; sections: Section[]; initialHighlights: HL[]; initialPersonal: string }) {
  const [query, setQuery] = useState("");
  const [hls, setHls] = useState<HL[]>(initialHighlights);
  const [selection, setSelection] = useState<{ text: string; sectionKey: string; x: number; y: number } | null>(null);
  const [personal, setPersonal] = useState(initialPersonal);
  const [saved, setSaved] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [active, setActive] = useState(sections[0]?.key ?? "");
  const rootRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter((s) => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q));
  }, [query, sections]);

  useEffect(() => { paint("user-hl", rootRef.current, hls.map((h) => h.text)); }, [hls, visible]);
  useEffect(() => { paint("search-hl", rootRef.current, query ? [query] : []); }, [query, visible]);

  // track the section in view for the table of contents
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (top) setActive(top.target.id.replace("sec-", ""));
    }, { rootMargin: "-20% 0px -70% 0px" });
    rootRef.current?.querySelectorAll("section[id^=sec-]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [visible]);

  const onMouseUp = useCallback(() => {
    const sel = window.getSelection();
    const text = sel?.toString().trim() ?? "";
    if (!sel || text.length < 3 || text.length > 400 || !sel.rangeCount) { setSelection(null); return; }
    const range = sel.getRangeAt(0);
    const sectionEl = (range.commonAncestorContainer as HTMLElement).parentElement?.closest("section[id^=sec-]") ?? (range.commonAncestorContainer as HTMLElement).closest?.("section[id^=sec-]");
    if (!sectionEl) { setSelection(null); return; }
    const rect = range.getBoundingClientRect();
    setSelection({ text, sectionKey: sectionEl.id.replace("sec-", ""), x: rect.left + rect.width / 2, y: rect.top });
  }, []);

  const addHighlight = async () => {
    if (!selection) return;
    try {
      const h = await api<HL>("/api/highlights", { body: { topicId, sectionKey: selection.sectionKey, text: selection.text } });
      setHls((x) => [...x, h]);
    } catch { /* ignore */ }
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  };

  const removeHighlight = async (id: string) => {
    await api(`/api/highlights?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
    setHls((x) => x.filter((h) => h.id !== id));
  };

  const savePersonal = async () => {
    setSaved("saving");
    try { await api(`/api/topics/${topicId}/personal-note`, { method: "PUT", body: { body: personal } }); setSaved("saved"); }
    catch { setSaved("error"); }
  };

  // autosave personal notes 1.5 s after typing stops
  useEffect(() => {
    if (personal === initialPersonal) return;
    setSaved("idle");
    const id = setTimeout(savePersonal, 1500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personal]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px] xl:grid-cols-[200px_1fr_280px]">
      <style>{`::highlight(user-hl){background-color:rgba(250,204,21,.45)} ::highlight(search-hl){background-color:rgba(43,140,255,.35)}`}</style>

      {sections.length > 0 && (
        <aside className="no-print hidden xl:block">
          <div className="sticky top-6 space-y-1">
            <div className="muted mb-2 text-[10px] font-bold uppercase tracking-[0.18em]">Contents</div>
            {sections.map((s, i) => (
              <a key={s.key} href={`#sec-${s.key}`} className={cn("block rounded-lg px-2 py-1 text-sm transition", active === s.key ? "bg-electric-500/10 font-semibold text-electric-600 dark:text-electric-300" : "muted hover:text-[var(--text)]", !visible.includes(s) && "opacity-30")}>
                {i + 1}. {s.title}
              </a>
            ))}
          </div>
        </aside>
      )}

      <div className={cn("min-w-0 space-y-4", sections.length === 0 && "xl:col-span-2")} ref={rootRef} onMouseUp={onMouseUp}>
        {sections.length > 0 && (
          <div className="no-print relative">
            <Search size={16} className="muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="input !pl-9" placeholder="Search within these notes…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search within notes" />
            {query && <button className="muted absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}
          </div>
        )}
        {query && <p className="muted text-sm">{visible.length} of {sections.length} sections match “{query}”.</p>}
        {visible.map((s) => (
          <section key={s.key} id={`sec-${s.key}`} className="card card-pad scroll-mt-6">
            <h2 className="h2 mb-3">{sections.indexOf(s) + 1}. {s.title}</h2>
            <Rich text={s.body} />
            {s.animationKey && <div className="no-print mt-4"><Player simKey={s.animationKey} compact /></div>}
          </section>
        ))}
        {sections.length > 0 && <p className="no-print muted text-xs">Select any text in the notes to highlight it.</p>}
      </div>

      <aside className="no-print space-y-4">
        <div className="card card-pad lg:sticky lg:top-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold"><StickyNote size={16} className="text-violet-500" /> My notes</h3>
            <span className="muted text-xs">{saved === "saving" ? "Saving…" : saved === "saved" ? "Saved" : saved === "error" ? "Not saved" : ""}</span>
          </div>
          <textarea className="input min-h-[140px] resize-y" maxLength={20000} placeholder="Your own observations, shortcuts, doubts…" value={personal} onChange={(e) => setPersonal(e.target.value)} />
          <button className="btn-ghost mt-2 w-full !py-1.5 text-xs" onClick={savePersonal}><Save size={14} /> Save now</button>

          {sections.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 flex items-center gap-2 font-semibold"><Highlighter size={16} className="text-amber-500" /> Highlights ({hls.length})</h3>
              {hls.length === 0 && <p className="muted text-xs">Select text in the notes and press “Highlight”.</p>}
              <ul className="max-h-72 space-y-2 overflow-y-auto">
                {hls.map((h) => (
                  <li key={h.id} className="group flex items-start gap-2 rounded-lg bg-amber-500/10 p-2 text-xs">
                    <a href={`#sec-${h.sectionKey}`} className="flex-1">“{h.text}”</a>
                    <button onClick={() => removeHighlight(h.id)} className="muted opacity-60 hover:text-rose-500 hover:opacity-100" aria-label="Remove highlight"><Trash2 size={13} /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      {selection && (
        <button onMouseDown={(e) => e.preventDefault()} onClick={addHighlight}
          className="btn fixed z-50 -translate-x-1/2 -translate-y-full bg-amber-400 !py-1.5 text-xs text-slate-900 shadow-lg hover:bg-amber-300"
          style={{ left: selection.x, top: selection.y - 8 }}>
          <Highlighter size={14} /> Highlight
        </button>
      )}
    </div>
  );
}
