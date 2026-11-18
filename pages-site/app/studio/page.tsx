import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { PageHeader, SubjectChip } from "@/components/ui";
import { ANIMATIONS, SUBJECTS, chapterBySlug } from "@site/lib/data";

export const metadata = { title: "Concept Studio" };

export default function StudioPage() {
  return (
    <div>
      <PageHeader eyebrow="Animated Concept Studio" title="See the concept move" subtitle="Real interactive simulations with play, pause, slow motion, scrubbing and step-by-step mode, wrapped in an 8-part lesson." />
      <div className="space-y-8">
        {SUBJECTS.map((s) => (
          <section key={s.slug}>
            <div className="mb-3 flex items-center gap-2"><h2 className="h2">{s.name}</h2><SubjectChip slug={s.slug} /></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ANIMATIONS.filter((a) => a.subject === s.slug).map((a) => (
                <Link key={a.key} href={`/studio/${a.key}`} className="card card-pad block transition hover:-translate-y-0.5 hover:border-violet-400">
                  <span className="mb-3 inline-block rounded-xl bg-violet-500/10 p-2 text-violet-500"><Clapperboard size={18} /></span>
                  <div className="font-display font-semibold">{a.title}</div>
                  {a.chapter && <div className="muted text-xs">{chapterBySlug(a.chapter)?.name}</div>}
                  <p className="muted mt-2 line-clamp-2 text-sm">{a.intro}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
