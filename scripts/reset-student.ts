/* Clears all study activity for one student account (default: the seeded demo student) without touching content.
 * Usage: npm run student:reset -- student@example.com */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const email = process.argv[2] ?? process.env.SEED_STUDENT_EMAIL ?? "student@jee-edge.local";

(async () => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error(`No user with email ${email}`);
  if (user.role !== "STUDENT") throw new Error("Refusing to reset a non-student account.");
  const id = user.id;
  const results = await db.$transaction([
    db.attempt.deleteMany({ where: { userId: id } }),
    db.mockAttempt.deleteMany({ where: { userId: id } }),
    db.mockExam.deleteMany({ where: { ownerId: id } }),
    db.mistakeEntry.deleteMany({ where: { userId: id } }),
    db.topicProgress.deleteMany({ where: { userId: id } }),
    db.studyPlan.deleteMany({ where: { userId: id } }),
    db.studyEvent.deleteMany({ where: { userId: id } }),
    db.bookmark.deleteMany({ where: { userId: id } }),
    db.highlight.deleteMany({ where: { userId: id } }),
    db.personalNote.deleteMany({ where: { userId: id } }),
    db.reviewCard.deleteMany({ where: { userId: id } }),
    db.studentProfile.update({ where: { userId: id }, data: { streak: 0, longestStreak: 0, lastActiveDay: null, completedChapterIds: [] } }),
  ]);
  console.log(`Reset ${email}: removed ${results.slice(0, -1).reduce((a, r) => a + (r as { count: number }).count, 0)} rows of activity.`);
  await db.$disconnect();
})().catch((e) => { console.error(e.message); process.exit(1); });
