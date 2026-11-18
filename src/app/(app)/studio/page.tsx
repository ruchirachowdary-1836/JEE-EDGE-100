import Link from "next/link";
import { Clapperboard, ArrowRight } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeader, SubjectChip } from "@/components/ui";

export const metadata = { title: "Concept Studio" };

export default async function StudioPage() {
  await requireUser();
  const subjects = await db.subject.findMany({
    orderBy: { order: "asc" },
    include: { animations: { where: { publishStatus: "PUBLISHED" }, include: { chapter: { select: { name: true } } }, orderBy: { title: "asc" } } },
  });
  return (
    <div>
      <PageHeader eyebrow="Animated Concept Studio" title="See the concept move" subtitle="Each lesson pairs a real interactive simulation with a step-by-step explanation, the mathematics behind it, a real-world link and how JEE tests it. Play, pause, slow down, scrub, or walk through it one step at a time." />
      <div className="space-y-8">
        {subjects.map((s) => (
          <section key={s.id}>
            <div className="mb-3 flex items-center gap-2"><h2 className="h2">{s.name}</h2><SubjectChip slug={s.slug} /></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.animations.map((a) => (
                <Link key={a.id} href={`/studio/${a.key}`} className="card card-pad group block transition hover:-translate-y-0.5 hover:border-violet-400">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-xl bg-violet-500/10 p-2 text-violet-500"><Clapperboard size={18} /></span>
                    <ArrowRight size={16} className="muted transition group-hover:translate-x-1" />
                  </div>
                  <div className="font-display font-semibold">{a.title}</div>
                  {a.chapter && <div className="muted text-xs">{a.chapter.name}</div>}
                  <p className="muted mt-2 line-clamp-2 text-sm">{a.intro}</p>
                </Link>
              ))}
              {s.animations.length === 0 && <p className="muted text-sm">No animated lessons published yet.</p>}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
