// Builds the same structures the database holds, straight from /content, for the static edition.
import { SYLLABUS } from "@content/syllabus";
import { PHYSICS_NOTES } from "@content/notes-physics";
import { CHEMISTRY_NOTES } from "@content/notes-chemistry";
import { MATHEMATICS_NOTES } from "@content/notes-mathematics";
import { PHYSICS_FORMULAS } from "@content/formulas-physics";
import { CHEMISTRY_FORMULAS, MATHEMATICS_FORMULAS } from "@content/formulas-chem-math";
import { COMPARISONS } from "@content/comparisons";
import { ANIMATIONS } from "@content/animations";
import { NAMED_REACTIONS, INORGANIC_EXCEPTIONS, CONCEPT_CARDS } from "@content/chemistry";
import { ALL_QUESTIONS } from "@content/questions";
import type { NoteSection, QuestionSeed } from "@content/types";

const slugify = (s: string) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export type SiteTopic = { slug: string; name: string; subtopics: string[]; beyondMain: string[]; chapterSlug: string; chapterName: string; subject: string };
export type SiteChapter = { slug: string; name: string; unit?: string; summary: string; planWeight: number; subject: string; topics: SiteTopic[] };

const used = new Set<string>();
export const SUBJECTS = SYLLABUS.map((s) => ({
  slug: s.slug,
  name: s.name,
  chapters: s.chapters.map<SiteChapter>((c) => ({
    slug: c.slug, name: c.name, unit: c.unit, summary: c.summary, planWeight: c.planWeight, subject: s.slug,
    topics: c.topics.map((t) => {
      let slug = t.slug ?? slugify(t.name);
      if (used.has(slug)) slug = `${slug}-${c.slug}`;
      used.add(slug);
      return { slug, name: t.name, subtopics: t.subtopics, beyondMain: t.beyondMain ?? [], chapterSlug: c.slug, chapterName: c.name, subject: s.slug };
    }),
  })),
}));

export const CHAPTERS = SUBJECTS.flatMap((s) => s.chapters);
export const TOPICS = CHAPTERS.flatMap((c) => c.topics);
export const chapterBySlug = (slug: string) => CHAPTERS.find((c) => c.slug === slug);
export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);

export const NOTES: Record<string, NoteSection[]> = Object.fromEntries([...PHYSICS_NOTES, ...CHEMISTRY_NOTES, ...MATHEMATICS_NOTES].map((n) => [n.topic, n.sections]));
export const FORMULAS = [...PHYSICS_FORMULAS, ...CHEMISTRY_FORMULAS, ...MATHEMATICS_FORMULAS];
export { COMPARISONS, ANIMATIONS, NAMED_REACTIONS, INORGANIC_EXCEPTIONS, CONCEPT_CARDS };

export type SiteQuestion = QuestionSeed & { id: string; chapterSlug: string; chapterName: string; topicName: string; subject: string };
const counters: Record<string, number> = {};
export const QUESTIONS: SiteQuestion[] = ALL_QUESTIONS.map((q) => {
  const key = `${q.topic}-${q.level}`;
  counters[key] = (counters[key] ?? 0) + 1;
  const t = topicBySlug(q.topic)!;
  return { ...q, id: `seed-${q.topic}-l${q.level}-${counters[key]}`, chapterSlug: t.chapterSlug, chapterName: t.chapterName, topicName: t.name, subject: t.subject };
});
