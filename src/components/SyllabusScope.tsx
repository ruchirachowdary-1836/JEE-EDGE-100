import { ListChecks } from "lucide-react";
import { SYLLABUS_SOURCE, ADVANCED_SYLLABUS } from "@content/syllabus";

/** What the official JEE Main 2027 syllabus lists for a topic, and what this platform teaches beyond it. */
export function SyllabusScope({ subtopics, beyondMain }: { subtopics: string[]; beyondMain?: string[] }) {
  if (!subtopics.length && !beyondMain?.length) return null;
  return (
    <details className="card card-pad mb-4" open={false}>
      <summary className="flex cursor-pointer items-center gap-2 font-semibold">
        <ListChecks size={16} className="text-electric-500" /> Syllabus scope
        {beyondMain?.length ? <span className="chip bg-amber-500/10 text-amber-700 dark:text-amber-300">{beyondMain.length} beyond JEE Main 2027</span> : null}
      </summary>
      <div className="mt-3 grid gap-4 text-sm md:grid-cols-2">
        <div>
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">In the JEE Main 2027 syllabus</div>
          <ul className="ml-5 list-disc space-y-1">{subtopics.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        {beyondMain?.length ? (
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Taught here, but beyond JEE Main 2027</div>
            <ul className="ml-5 list-disc space-y-1">{beyondMain.map((s) => <li key={s}>{s}</li>)}</ul>
            <p className="muted mt-2 text-xs">Useful background and possibly JEE Advanced material. Whether it is in JEE Advanced 2027 will be confirmed when the IITs publish that syllabus.</p>
          </div>
        ) : null}
      </div>
      <p className="muted mt-3 text-xs">Checked against the official “{SYLLABUS_SOURCE.title}” (NTA, uploaded {SYLLABUS_SOURCE.pdfUploaded}) on {SYLLABUS_SOURCE.verifiedOn}.</p>
    </details>
  );
}

export function BeyondMainLine({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return <div className="mt-1 text-xs text-amber-700 dark:text-amber-300">Beyond JEE Main 2027: {items.join(" · ")}</div>;
}

/** Source, verification date and the JEE Advanced mapping status, shown on the syllabus pages. */
export function SyllabusSourceCard({ beyondCount }: { beyondCount: number }) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2">
      <div className="card card-pad text-sm">
        <div className="mb-1 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">JEE Main 2027 · verified</div>
        <p>Every chapter, topic and subtopic is mapped to the official <strong>{SYLLABUS_SOURCE.title}</strong> published by the {SYLLABUS_SOURCE.publisher} (PDF uploaded {SYLLABUS_SOURCE.pdfUploaded}).</p>
        <p className="muted mt-2">Last verified: <strong>{SYLLABUS_SOURCE.verifiedOn}</strong> · Source: <a className="link" href={SYLLABUS_SOURCE.url} target="_blank" rel="noreferrer">jeemain.nta.nic.in</a> → Syllabus</p>
        <p className="muted mt-2">{beyondCount} subtopics taught on this platform are not in the 2027 text. They are labelled “Beyond JEE Main 2027” on each topic.</p>
      </div>
      <div className="card card-pad text-sm">
        <div className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">JEE Advanced 2027 · awaiting official syllabus</div>
        <p>{ADVANCED_SYLLABUS.note}</p>
        <p className="muted mt-2">Organising institute: {ADVANCED_SYLLABUS.organiser} · Checked on {ADVANCED_SYLLABUS.checkedOn}: <a className="link" href={ADVANCED_SYLLABUS.url} target="_blank" rel="noreferrer">jeeadv.ac.in/syllabus.html</a> said “Coming soon”.</p>
      </div>
    </div>
  );
}
