import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, Clapperboard, Sigma, Dumbbell, Timer, NotebookPen, CalendarRange, Repeat, Target, ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { ThemeToggle } from "@/components/AppShell";

const FEATURES = [
  { icon: BookOpen, title: "Master notes", text: "Seventeen-part notes per topic: from prerequisites and derivations to exam traps." },
  { icon: Clapperboard, title: "Concept Studio", text: "Interactive simulations with play, pause, slow motion and step-by-step mode." },
  { icon: Sigma, title: "Formula Lab", text: "Every formula with derivation, conditions, when NOT to use it and worked examples." },
  { icon: Dumbbell, title: "Question Gym", text: "Five mastery levels per topic. Higher levels unlock only after you earn them." },
  { icon: Timer, title: "Exam Simulator", text: "Computer-based test interface with palette, review marking and negative marking." },
  { icon: NotebookPen, title: "Mistake Notebook", text: "Classify every error and re-attempt it on a spaced schedule until it sticks." },
  { icon: CalendarRange, title: "60-day roadmap", text: "Four phases, realistic daily budgets, buffer days and missed-task recovery." },
  { icon: Repeat, title: "Revision Centre", text: "Spaced-repetition flashcards plus one-, three- and seven-day revision tracks." },
];

export default async function Home() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <div className="bg-hero min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 text-white"><Target size={18} /></span>
          <span className="font-display text-lg font-bold">JEE EDGE 100</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="btn-ghost">Sign in</Link>
          <Link href="/register" className="btn-primary hidden sm:inline-flex">Get started</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pt-16">
        <div className="max-w-3xl">
          <div className="chip mb-4 bg-electric-500/10 text-electric-600 dark:text-electric-300">JEE Main 2027 · JEE Advanced 2027 · Physics · Chemistry · Mathematics</div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Understand every concept.<br />
            <span className="bg-gradient-to-r from-electric-400 to-violet-400 bg-clip-text text-transparent">Justify every formula.</span>
          </h1>
          <p className="muted mt-5 max-w-2xl text-lg">
            A structured preparation platform for the final 60 days — built on human-written, verifiable content and plain, predictable logic. No chatbots, no generated answers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary !px-6 !py-3 text-base">Create free account <ArrowRight size={18} /></Link>
            <Link href="/login" className="btn-ghost !px-6 !py-3 text-base">I already have an account</Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card card-pad">
              <f.icon className="mb-3 text-electric-500" size={22} />
              <div className="font-display font-semibold">{f.title}</div>
              <p className="muted mt-1 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
