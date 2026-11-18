import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Card, PageHeader, ReviewBadge, SubjectChip } from "@/components/ui";
import { Rich, Inline } from "@/components/Rich";
import { Player } from "@/components/studio/Player";
import { ANIMATIONS, chapterBySlug } from "@site/lib/data";

export const generateStaticParams = () => ANIMATIONS.map((a) => ({ key: a.key }));
export const dynamicParams = false;

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-2 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-violet-500/15 text-xs font-bold text-violet-500">{n}</span><h2 className="h2">{title}</h2></div>
      {children}
    </Card>
  );
}

export default function Lesson({ params }: { params: { key: string } }) {
  const a = ANIMATIONS.find((x) => x.key === params.key);
  if (!a) notFound();
  const ch = a.chapter ? chapterBySlug(a.chapter) : undefined;
  return (
    <div>
      <PageHeader eyebrow="Concept Studio" title={a.title}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={a.subject} />{ch && <Link className="link" href={`/chapter/${ch.slug}`}>{ch.name}</Link>}<ReviewBadge status="PENDING" /></span>}
        actions={<>{a.topic && <Link href={`/topic/${a.topic}`} className="btn-ghost">Read the notes</Link>}<Link href="/studio" className="btn-ghost">All lessons</Link></>} />
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="min-w-0 space-y-4 xl:col-span-3">
          <Section n={1} title="Concept introduction"><Rich text={a.intro} /></Section>
          <Card>
            <div className="mb-3 text-xs font-bold uppercase tracking-wide text-violet-500">2 · Visual representation / 4 · Animated process / 5 · Interactive experiment</div>
            <Player simKey={a.key} steps={a.steps} />
          </Card>
        </div>
        <div className="min-w-0 space-y-4 xl:col-span-2">
          <Section n={3} title="Step-by-step explanation">
            <ol className="space-y-3">{a.steps.map((s, i) => <li key={i} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-xs font-bold">{i + 1}</span><div><div className="font-semibold">{s.title}</div><p className="muted text-sm"><Inline text={s.body} /></p></div></li>)}</ol>
          </Section>
          <Section n={6} title="Mathematical explanation"><Rich text={a.math} /></Section>
          <Section n={7} title="Real-life application"><Rich text={a.realLife} /></Section>
          <Section n={8} title="JEE-level application"><Rich text={a.jee} /></Section>
        </div>
      </div>
    </div>
  );
}
