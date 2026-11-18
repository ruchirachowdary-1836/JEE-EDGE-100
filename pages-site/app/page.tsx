import Link from "next/link";
import { BookOpen, Clapperboard, Sigma, Dumbbell, FlaskConical, Repeat, ArrowRight, Github } from "lucide-react";
import { ANIMATIONS, CHAPTERS, FORMULAS, NOTES, QUESTIONS, TOPICS } from "@site/lib/data";

const FEATURES = [
  { href: "/syllabus", icon: BookOpen, title: "Syllabus & master notes", text: `${CHAPTERS.length} chapters, ${TOPICS.length} topics. ${Object.keys(NOTES).length} topics have full 17-part notes with live diagrams.` },
  { href: "/studio", icon: Clapperboard, title: "Concept Studio", text: `${ANIMATIONS.length} interactive simulations with play, pause, slow motion and step mode.` },
  { href: "/formulas", icon: Sigma, title: "Formula Lab", text: `${FORMULAS.length} formulas with derivation, conditions, when NOT to use them and worked examples.` },
  { href: "/gym", icon: Dumbbell, title: "Question Gym", text: `${QUESTIONS.length} original practice questions over 5 levels, each with a full solution.` },
  { href: "/chemistry", icon: FlaskConical, title: "Chemistry Lab", text: "Periodic table, configuration explorer, VSEPR, organic reaction map, named reactions." },
  { href: "/revision", icon: Repeat, title: "Flashcards", text: "Formula, concept and reaction flashcards for quick revision." },
];

export default function Home() {
  return (
    <div>
      <section className="card bg-hero card-pad mb-8">
        <div className="chip mb-4 bg-electric-500/10 text-electric-600 dark:text-electric-300">JEE Main 2027 · Physics · Chemistry · Mathematics</div>
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          Understand every concept.<br />
          <span className="bg-gradient-to-r from-electric-400 to-violet-400 bg-clip-text text-transparent">Justify every formula.</span>
        </h1>
        <p className="muted mt-4 max-w-2xl">Structured, human-written preparation material with fixed, predictable logic — no chatbots and no generated answers.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/syllabus" className="btn-primary">Start with the syllabus <ArrowRight size={16} /></Link>
          <a href="https://github.com/ruchirachowdary-1836/JEE-EDGE-100" className="btn-ghost"><Github size={16} /> Source code</a>
        </div>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Link key={f.href} href={f.href} className="card card-pad block transition hover:-translate-y-0.5 hover:border-electric-400">
            <f.icon className="mb-3 text-electric-500" size={22} />
            <div className="font-display font-semibold">{f.title}</div>
            <p className="muted mt-1 text-sm">{f.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
