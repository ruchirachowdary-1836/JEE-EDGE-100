import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { logEvent, topicStats, emptyStat } from "@/lib/progress";
import { PageHeader, Pending, ReviewBadge, StageBadge, SubjectChip, Card } from "@/components/ui";
import { TeX } from "@/components/Rich";
import { NotesReader } from "./NotesReader";
import { TopicActions } from "./TopicActions";

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const user = await requireUser();
  const topic = await db.topic.findUnique({
    where: { slug: params.slug },
    include: {
      chapter: { include: { subject: true } },
      note: true,
      formulas: { where: { publishStatus: "PUBLISHED" }, select: { slug: true, name: true, expression: true } },
      animations: { where: { publishStatus: "PUBLISHED" }, select: { key: true, title: true } },
    },
  });
  if (!topic) notFound();
  const note = topic.note && (topic.note.publishStatus === "PUBLISHED" || user.role === "ADMIN") ? topic.note : null;
  const [highlights, personal, bookmark, progress, stats, gymCount] = await Promise.all([
    db.highlight.findMany({ where: { userId: user.id, topicId: topic.id }, orderBy: { createdAt: "asc" } }),
    db.personalNote.findUnique({ where: { userId_topicId: { userId: user.id, topicId: topic.id } } }),
    db.bookmark.findUnique({ where: { userId_itemType_itemId: { userId: user.id, itemType: "TOPIC", itemId: topic.id } } }),
    db.topicProgress.findUnique({ where: { userId_topicId: { userId: user.id, topicId: topic.id } } }),
    topicStats(user.id, [topic.id]),
    db.question.count({ where: { topicId: topic.id, publishStatus: "PUBLISHED", source: "PRACTICE" } }),
  ]);
  await logEvent(user.id, "NOTES", topic.name, `/topic/${topic.slug}`);
  const stat = stats.get(topic.id) ?? emptyStat(topic.id);
  const sections = (note?.sections ?? []) as { key: string; title: string; body: string; animationKey?: string }[];

  return (
    <div>
      <PageHeader
        eyebrow={`${topic.chapter.subject.name} · ${topic.chapter.name}`}
        title={topic.name}
        subtitle={<span className="flex flex-wrap items-center gap-2"><SubjectChip slug={topic.chapter.subject.slug} /><StageBadge stage={stat.stage} />{note && <ReviewBadge status={note.reviewStatus} />}</span>}
        actions={<Link href={`/chapter/${topic.chapter.slug}`} className="btn-ghost">Chapter overview</Link>}
      />
      <TopicActions
        topicId={topic.id}
        slug={topic.slug}
        hasNotes={!!note}
        notesDone={!!progress?.notesCompletedAt}
        revisedCount={progress?.revisedCount ?? 0}
        bookmarked={!!bookmark}
        gymCount={gymCount}
      />
      {note ? (
        <NotesReader
          topicId={topic.id}
          sections={sections}
          initialHighlights={highlights.map((h) => ({ id: h.id, sectionKey: h.sectionKey, text: h.text }))}
          initialPersonal={personal?.body ?? ""}
        />
      ) : (
        <div className="space-y-4">
          <Pending what={`The master notes for “${topic.name}”`} />
          {topic.subtopics.length > 0 && (
            <Card>
              <h2 className="h2 mb-2">What this topic covers</h2>
              <ul className="ml-5 list-disc space-y-1 text-sm">{topic.subtopics.map((s) => <li key={s}>{s}</li>)}</ul>
              <p className="muted mt-3 text-sm">Until the notes are published, study this topic from your NCERT textbook and use “Mark as studied” above once you have finished — it is recorded as self-reported.</p>
            </Card>
          )}
          <NotesReader topicId={topic.id} sections={[]} initialHighlights={[]} initialPersonal={personal?.body ?? ""} />
        </div>
      )}
      {(topic.formulas.length > 0 || topic.animations.length > 0) && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {topic.formulas.length > 0 && (
            <Card>
              <h2 className="h2 mb-2">Formulas in this topic</h2>
              {topic.formulas.map((f) => (
                <Link key={f.slug} href={`/formulas/${f.slug}`} className="block rounded-lg p-2 hover:bg-[var(--surface-2)]">
                  <div className="text-sm font-semibold">{f.name}</div>
                  <div className="overflow-x-auto"><TeX>{f.expression}</TeX></div>
                </Link>
              ))}
            </Card>
          )}
          {topic.animations.length > 0 && (
            <Card>
              <h2 className="h2 mb-2">Animated lessons</h2>
              {topic.animations.map((a) => <Link key={a.key} href={`/studio/${a.key}`} className="link block py-1 text-sm">{a.title}</Link>)}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
