import { PageHeader } from "@/components/ui";
import { ImportForm } from "./ImportForm";

export const metadata = { title: "Admin · Import questions" };

const EXAMPLE = JSON.stringify({
  questions: [
    {
      source: "PYQ", type: "MCQ", chapterSlug: "kinematics", topicSlug: "projectile-motion", difficulty: "MEDIUM",
      pyqYear: 2025, pyqSession: "January", pyqShift: "Shift 1", pyqDate: "2025-01-22", sourceAttribution: "<licensed source and reference>",
      statement: "<original question text, LaTeX in $…$>",
      options: [
        { text: "<option A>", isCorrect: false, explanation: "<why A is wrong>" },
        { text: "<option B>", isCorrect: true, explanation: "<why B is right>" },
        { text: "<option C>", isCorrect: false, explanation: "<why C is wrong>" },
        { text: "<option D>", isCorrect: false, explanation: "<why D is wrong>" },
      ],
      solution: "<step-by-step solution>", conceptTested: "<concept>", formulaUsed: "<formula>", whyFormula: "<why this formula>",
      altMethod: null, commonMistakes: "<typical errors>", approxTimeSec: 120,
    },
  ],
}, null, 2);

export default function ImportPage() {
  return (
    <div>
      <PageHeader title="Bulk import questions" subtitle="Paste JSON or upload a .json file. Every row is validated before anything is saved: MCQs need exactly one correct option, numericals need an answer, PYQs need year, session, shift and a source attribution. Imported questions start as draft / pending review." />
      <div className="mb-4 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 p-4 text-sm">
        Only import previous-year questions from sources you are licensed or authorised to use, and attribute them accurately. Do not import reconstructed or “memory-based” questions as PYQs.
      </div>
      <ImportForm example={EXAMPLE} />
    </div>
  );
}
