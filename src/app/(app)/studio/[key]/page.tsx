import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { logEvent } from "@/lib/progress";
import { Card, PageHeader, ReviewBadge, SubjectChip } from "@/components/ui";
import { Rich, Inline } from "@/components/Rich";
import { Player } from "@/components/studio/Player";

export default async function StudioLesson({ params }: { params: { key: string } }) {
  const user = await requireUser();
  const a = await db.animation.findUnique({ where: { key: params.key }, include: { subject: true, chapter: true, topic: true } });
  if (!a || (a.publishStatus !== "PUBLISHED" && user.role !== "ADMIN")) notFound();
  await logEvent(user.id, "STUDIO", a.title, `/studio/${a.key}`);
  const steps = a.steps as { title: string; body: string }[];

  const Section = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
    <Card>
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-violet-500/15 text-xs font-bold text-violet-500">{n}</span>
        <h2 className="h2">{title}</h2>
      </div>
      {children}
    </Card>
  );

  return (
    <div>
      <PageHeader eyebrow="Concept Studio" title={a.title}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={a.subject.slug} />{a.chapter && <Link className="link" href={`/chapter/${a.chapter.slug}`}>{a.chapter.name}</Link>}<ReviewBadge status={a.reviewStatus} /></span>}
        actions={<>{a.topic && <Link href={`/topic/${a.topic.slug}`} className="btn-ghost">Read the notes</Link>}<Link href="/studio" className="btn-ghost">All lessons</Link></>} />
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="space-y-4 xl:col-span-3">
          <Section n={1} title="Concept introduction"><Rich text={a.intro} /></Section>
          <Card>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-violet-500">
              <span>2 · Visual representation</span><span className="muted">/</span><span>4 · Animated process</span><span className="muted">/</span><span>5 · Interactive experiment</span>
            </div>
            <Player simKey={a.key} steps={steps} />
          </Card>
        </div>
        <div className="space-y-4 xl:col-span-2">
          <Section n={3} title="Step-by-step explanation">
            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-xs font-bold">{i + 1}</span>
                  <div><div className="font-semibold">{s.title}</div><p className="muted text-sm"><Inline text={s.body} /></p></div>
                </li>
              ))}
            </ol>
            <p className="muted mt-3 text-xs">Tip: turn on <strong>Step mode</strong> under the animation to jump the simulation to each of these states.</p>
          </Section>
          <Section n={6} title="Mathematical explanation"><Rich text={a.mathExplanation} /></Section>
          <Section n={7} title="Real-life application"><Rich text={a.realLife} /></Section>
          <Section n={8} title="JEE-level application"><Rich text={a.jeeApplication} /></Section>
        </div>
      </div>
    </div>
  );
}
