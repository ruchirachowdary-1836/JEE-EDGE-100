import katex from "katex";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders the platform's content dialect:
 *   blank line   → new block
 *   "- item"     → bullet list         "1. item" → numbered list
 *   "> text"     → callout             "$$ … $$" → display equation
 *   inline: $math$, **bold**, *italic*, `code`
 * Works in server and client components (KaTeX renders to a string).
 */

function tex(src: string, display: boolean) {
  try {
    return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: "ignore", output: "html" });
  } catch {
    return src;
  }
}

export function TeX({ children, display = false, className }: { children: string; display?: boolean; className?: string }) {
  return <span className={cn(display && "block overflow-x-auto py-1", className)} dangerouslySetInnerHTML={{ __html: tex(children, display) }} />;
}

function inline(text: string, keyBase = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  // tokens: $…$ math | **bold** | *italic* | `code`
  const re = /(\$[^$]+\$|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const key = `${keyBase}-${k++}`;
    if (t.startsWith("$")) out.push(<span key={key} dangerouslySetInnerHTML={{ __html: tex(t.slice(1, -1), false) }} />);
    else if (t.startsWith("**")) out.push(<strong key={key} className="font-semibold text-slate-900 dark:text-white">{inline(t.slice(2, -2), key)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={key} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/10">{t.slice(1, -1)}</code>);
    else out.push(<em key={key}>{inline(t.slice(1, -1), key)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Inline({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

export function Rich({ text, className }: { text: string | null | undefined; className?: string }) {
  if (!text) return null;
  const blocks = text.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);
  return (
    <div className={cn("rich space-y-3 leading-relaxed", className)}>
      {blocks.map((block, bi) => {
        const b = block.trim();
        if (/^(\$\$[\s\S]+?\$\$\s*)+$/.test(b)) {
          // one or more display equations (consecutive $$…$$ lines in the same block)
          const eqs = [...b.matchAll(/\$\$([\s\S]+?)\$\$/g)].map((m) => m[1].trim());
          return (
            <div key={bi} className="space-y-1">
              {eqs.map((eq, ei) => <div key={ei} className="overflow-x-auto py-1" dangerouslySetInnerHTML={{ __html: tex(eq, true) }} />)}
            </div>
          );
        }
        const lines = b.split("\n");
        if (lines.every((l) => /^\s*-\s+/.test(l))) {
          return (
            <ul key={bi} className="ml-5 list-disc space-y-1 marker:text-electric-500">
              {lines.map((l, li) => <li key={li}>{inline(l.replace(/^\s*-\s+/, ""), `${bi}-${li}`)}</li>)}
            </ul>
          );
        }
        if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return (
            <ol key={bi} className="ml-5 list-decimal space-y-1 marker:font-semibold marker:text-violet-500">
              {lines.map((l, li) => <li key={li}>{inline(l.replace(/^\s*\d+\.\s+/, ""), `${bi}-${li}`)}</li>)}
            </ol>
          );
        }
        if (lines.every((l) => l.startsWith(">"))) {
          return (
            <div key={bi} className="rounded-xl border-l-4 border-violet-500 bg-violet-500/5 px-4 py-3 text-slate-700 dark:text-slate-200">
              {lines.map((l, li) => <Fragment key={li}>{inline(l.replace(/^>\s?/, ""), `${bi}-${li}`)}{li < lines.length - 1 && <br />}</Fragment>)}
            </div>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => <Fragment key={li}>{inline(l, `${bi}-${li}`)}{li < lines.length - 1 && <br />}</Fragment>)}
          </p>
        );
      })}
    </div>
  );
}
