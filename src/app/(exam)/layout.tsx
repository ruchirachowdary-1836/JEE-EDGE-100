import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Distraction-free layout for the computer-based test (no sidebar). */
export default async function ExamLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return <div className="min-h-screen bg-[var(--bg)]">{children}</div>;
}
