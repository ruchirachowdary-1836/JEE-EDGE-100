import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { SIM_KEYS } from "@/lib/sim-keys";
import { AnimationAdmin } from "./AnimationAdmin";

export const metadata = { title: "Admin · Animated lessons" };

export default async function AdminAnimations() {
  const [anims, chapters] = await Promise.all([
    db.animation.findMany({ include: { subject: true, chapter: true, topic: true }, orderBy: { title: "asc" } }),
    db.chapter.findMany({ orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], select: { slug: true, name: true, subject: { select: { slug: true } }, topics: { select: { slug: true, name: true } } } }),
  ]);
  return (
    <div>
      <PageHeader title="Animated lessons" subtitle="Each lesson wraps one interactive simulation with the 8-part lesson text. New simulations require a code change (see README → Adding a simulation); lesson text, steps and links are fully editable here." />
      <AnimationAdmin
        simKeys={[...SIM_KEYS]}
        chapters={chapters.map((c) => ({ slug: c.slug, name: c.name, subject: c.subject.slug, topics: c.topics }))}
        lessons={anims.map((a) => ({
          id: a.id, key: a.key, title: a.title, subjectSlug: a.subject.slug, chapterSlug: a.chapter?.slug ?? "", topicSlug: a.topic?.slug ?? "",
          intro: a.intro, mathExplanation: a.mathExplanation, realLife: a.realLife, jeeApplication: a.jeeApplication, steps: a.steps as { title: string; body: string }[],
          publishStatus: a.publishStatus, reviewStatus: a.reviewStatus,
        }))}
      />
    </div>
  );
}
