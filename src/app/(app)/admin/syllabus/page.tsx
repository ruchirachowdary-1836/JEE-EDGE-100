import { db } from "@/lib/db";
import { SyllabusEditor } from "./SyllabusEditor";

export const metadata = { title: "Admin · Syllabus" };

export default async function AdminSyllabus() {
  const subjects = await db.subject.findMany({
    orderBy: { order: "asc" },
    include: { chapters: { orderBy: { order: "asc" }, include: { topics: { orderBy: { order: "asc" }, include: { note: { select: { id: true, publishStatus: true, reviewStatus: true } } } } } } },
  });
  return (
    <SyllabusEditor subjects={subjects.map((s) => ({
      slug: s.slug, name: s.name,
      chapters: s.chapters.map((c) => ({
        id: c.id, slug: c.slug, name: c.name, unit: c.unit, planWeight: c.planWeight, summary: c.summary, syllabusStatus: c.syllabusStatus, publishStatus: c.publishStatus, reviewStatus: c.reviewStatus,
        topics: c.topics.map((t) => ({ id: t.id, slug: t.slug, name: t.name, subtopics: t.subtopics, summary: t.summary, publishStatus: t.publishStatus, reviewStatus: t.reviewStatus, note: t.note })),
      })),
    }))} />
  );
}
