import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/ui";
import { SIM_KEYS } from "@/lib/sim-keys";
import { FormulaEditor } from "./FormulaEditor";

export default async function FormulaAdmin({ params }: { params: { slug: string } }) {
  const isNew = params.slug === "new";
  const f = isNew ? null : await db.formula.findUnique({ where: { slug: params.slug }, include: { chapter: true, topic: true, derivation: { orderBy: { order: "asc" } } } });
  if (!isNew && !f) notFound();
  const chapters = await db.chapter.findMany({ orderBy: [{ subject: { order: "asc" } }, { order: "asc" }], select: { slug: true, name: true, topics: { select: { slug: true, name: true } } } });
  const blankWorked = { problem: "", solution: "" };
  const initial = f
    ? {
        slug: f.slug, chapterSlug: f.chapter.slug, topicSlug: f.topic?.slug ?? "", name: f.name, expression: f.expression, siUnit: f.siUnit, dimensions: f.dimensions, origin: f.origin,
        interpretation: f.interpretation, whyItWorks: f.whyItWorks, whenToUse: f.whenToUse, whenNotToUse: f.whenNotToUse, conditions: f.conditions, assumptions: f.assumptions,
        specialCases: f.specialCases, graph: f.graph ?? "", graphKey: f.graphKey ?? "", commonMistakes: f.commonMistakes, shortcuts: f.shortcuts, limitations: f.limitations,
        variables: f.variables, derivation: f.derivation.map((d) => ({ statement: d.statement, justification: d.justification })), relations: f.relations,
        basicExample: f.basicExample, jeeExample: f.jeeExample, trickyApplication: f.trickyApplication,
      }
    : {
        slug: "", chapterSlug: chapters[0]?.slug ?? "", topicSlug: "", name: "", expression: "", siUnit: "", dimensions: "", origin: "", interpretation: "", whyItWorks: "",
        whenToUse: "", whenNotToUse: "", conditions: "", assumptions: "", specialCases: "", graph: "", graphKey: "", commonMistakes: "", shortcuts: "", limitations: "",
        variables: [{ symbol: "", meaning: "", unit: "" }], derivation: [{ statement: "", justification: "" }], relations: [], basicExample: blankWorked, jeeExample: blankWorked, trickyApplication: blankWorked,
      };
  return (
    <div>
      <PageHeader title={isNew ? "New formula" : `Edit: ${f!.name}`} subtitle="Saving an existing formula resets its review status to pending so the change is re-verified." />
      <FormulaEditor initial={initial as never} originalSlug={f?.slug} chapters={chapters} simKeys={[...SIM_KEYS]} />
    </div>
  );
}
