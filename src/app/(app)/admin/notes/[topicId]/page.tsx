import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { SIM_KEYS } from "@/lib/sim-keys";
import { NoteEditor } from "./NoteEditor";
import { StatusControl } from "../../StatusControl";

const TEMPLATE: [string, string][] = [
  ["introduction", "Introduction"], ["prerequisites", "Prerequisite knowledge"], ["concept", "Concept from the basics"], ["theory", "Detailed theory"],
  ["definitions", "Definitions"], ["principles", "Important principles"], ["derivations", "Derivations"], ["diagrams", "Diagram"], ["graphs", "Graphs"],
  ["specialCases", "Special cases"], ["exceptions", "Exceptions"], ["assumptions", "Assumptions and limitations"], ["applications", "Applications"],
  ["patterns", "JEE Main question patterns"], ["misconceptions", "Common misconceptions"], ["traps", "Common examination traps"], ["summary", "Quick revision summary"],
];

export default async function NoteAdmin({ params }: { params: { topicId: string } }) {
  const topic = await db.topic.findUnique({ where: { id: params.topicId }, include: { note: true, chapter: true } });
  if (!topic) notFound();
  const sections = (topic.note?.sections as { key: string; title: string; body: string; animationKey?: string }[] | undefined) ?? TEMPLATE.map(([key, title]) => ({ key, title, body: "" }));
  return (
    <div>
      <PageHeader eyebrow={topic.chapter.name} title={`Notes: ${topic.name}`}
        subtitle="The standard note has 17 sections. Body text supports blank-line paragraphs, “- ” bullets, “1. ” lists, “> ” callouts, **bold**, $inline maths$ and $$display maths$$."
        actions={<>{topic.note && <StatusControl model="note" id={topic.note.id} publishStatus={topic.note.publishStatus} reviewStatus={topic.note.reviewStatus} />}<Link href={`/topic/${topic.slug}`} className="btn-ghost">View as student</Link></>} />
      <NoteEditor topicId={topic.id} initial={sections} simKeys={[...SIM_KEYS]} />
    </div>
  );
}
