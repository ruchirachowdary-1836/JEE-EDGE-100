/* End-to-end checks against a running server (default http://localhost:3100) and its database.
 * Run: npm run build && npm run start   (in another terminal), then npm run test:e2e
 * Creates throwaway users e2e-*@test.local and deletes them at the end. */
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

const BASE = process.env.E2E_BASE ?? "http://localhost:3100";
const db = new PrismaClient();
const results: { name: string; ok: boolean; detail?: string }[] = [];

async function check(name: string, fn: () => Promise<void | string>) {
  try {
    const d = await fn();
    results.push({ name, ok: true, detail: d || undefined });
    console.log(`PASS  ${name}${d ? ` — ${d}` : ""}`);
  } catch (e) {
    results.push({ name, ok: false, detail: (e as Error).message });
    console.log(`FAIL  ${name} — ${(e as Error).message}`);
  }
}
function expect(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}

class Client {
  cookie = "";
  constructor(public label: string) {}
  async req(method: string, path: string, json?: unknown, headers: Record<string, string> = {}) {
    const res = await fetch(BASE + path, {
      method, redirect: "manual",
      headers: { ...(json !== undefined ? { "content-type": "application/json" } : {}), ...(this.cookie ? { cookie: this.cookie } : {}), ...headers },
      body: json !== undefined ? JSON.stringify(json) : undefined,
    });
    const set = res.headers.getSetCookie?.() ?? [];
    for (const c of set) if (c.startsWith("jee_session=")) this.cookie = c.split(";")[0];
    const text = await res.text();
    let body: any = text;
    try { body = JSON.parse(text); } catch { /* html */ }
    return { status: res.status, body, location: res.headers.get("location") };
  }
}

const DAY = 86400_000;
const approxDays = (d: Date | string | null | undefined) => (d ? Math.round((new Date(d).getTime() - Date.now()) / DAY) : NaN);

async function main() {
  // wait for the server
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(BASE + "/login")).ok) break; } catch { /* not up */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  const tag = Date.now().toString(36);
  const A = new Client("A"), B = new Client("B"), anon = new Client("anon");
  const pw = "E2e-Passw0rd-long";

  await check("register two students", async () => {
    for (const [c, n] of [[A, "a"], [B, "b"]] as const) {
      const r = await c.req("POST", "/api/auth/register", { name: `E2E ${n}`, email: `e2e-${n}-${tag}@test.local`, password: pw });
      expect(r.status === 200, `register ${n}: ${r.status} ${JSON.stringify(r.body)}`);
      expect(c.cookie, "no session cookie set");
    }
  });
  await check("duplicate registration is rejected", async () => {
    const r = await anon.req("POST", "/api/auth/register", { name: "Dup", email: `e2e-a-${tag}@test.local`, password: pw });
    expect(r.status >= 400 && r.status < 500, `got ${r.status}`);
  });
  await check("session cookie is HttpOnly, SameSite=Lax; DB stores only a hash", async () => {
    const res = await fetch(BASE + "/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: `e2e-a-${tag}@test.local`, password: pw }) });
    const c = res.headers.getSetCookie().find((x) => x.startsWith("jee_session="))!;
    expect(/HttpOnly/i.test(c) && /SameSite=Lax/i.test(c), c);
    const token = c.split(";")[0].split("=")[1];
    const raw = await db.session.findUnique({ where: { id: token } });
    expect(!raw, "raw token found in DB");
  });
  await check("unauthenticated API calls get 401, pages redirect to /login", async () => {
    const r = await anon.req("POST", "/api/attempts", { questionId: "x", context: "GYM", timeTakenSec: 1 });
    expect(r.status === 401, `api ${r.status}`);
    const p = await anon.req("GET", "/dashboard");
    expect(p.status >= 300 && p.status < 400 && (p.location ?? "").includes("/login"), `page ${p.status} ${p.location}`);
  });
  await check("wrong password: generic 401, then 429 after 10 failures", async () => {
    const email = `e2e-nobody-${tag}@test.local`;
    const codes: number[] = [];
    for (let i = 0; i < 11; i++) codes.push((await anon.req("POST", "/api/auth/login", { email, password: "wrong" })).status);
    expect(codes.slice(0, 10).every((c) => c === 401), codes.join(","));
    expect(codes[10] === 429, `11th attempt gave ${codes[10]}`);
    return codes.join(",");
  });
  await check("cross-site POST (foreign Origin) is blocked with 403", async () => {
    const topic = await db.topic.findFirstOrThrow();
    const r = await A.req("POST", "/api/highlights", { topicId: topic.id, sectionKey: "summary", text: "csrf test" }, { origin: "https://evil.example" });
    expect(r.status === 403, `got ${r.status}`);
    const ok = await A.req("POST", "/api/highlights", { topicId: topic.id, sectionKey: "summary", text: "same-site test" }, { origin: BASE });
    expect(ok.status === 200, `same-origin got ${ok.status}`);
  });
  await check("student cannot use admin APIs or pages", async () => {
    for (const [m, p] of [["PUT", "/api/admin/questions"], ["POST", "/api/admin/questions"], ["PUT", "/api/admin/settings"], ["POST", "/api/admin/review"], ["PUT", "/api/admin/content"], ["POST", "/api/admin/mocks"], ["DELETE", "/api/admin/mocks?id=x"], ["PUT", "/api/admin/syllabus"], ["DELETE", "/api/admin/questions?id=x"]] as const) {
      const r = await A.req(m, p, m === "DELETE" ? undefined : {});
      expect(r.status === 403, `${m} ${p} → ${r.status}`);
    }
    const page = await A.req("GET", "/admin");
    expect(page.status !== 200 || !String(page.body).includes("Content CMS"), `admin page ${page.status}`);
  });

  // ---- Gym locks and analytics
  const topic = await db.topic.findFirstOrThrow({ where: { questions: { some: { level: 1, source: "PRACTICE" } } }, include: { questions: { where: { source: "PRACTICE", publishStatus: "PUBLISHED" }, include: { options: true } } } });
  const l1 = topic.questions.filter((q) => q.level === 1);
  const l3 = topic.questions.find((q) => q.level === 3);
  const answer = (q: (typeof l1)[number], right: boolean) =>
    q.type === "MCQ" ? { selectedOptionId: q.options.find((o) => o.isCorrect === right)!.id } : { numericalResponse: right ? q.numericalAnswer! : q.numericalAnswer! + 1000 };

  await check("Gym level 3 is locked server-side for a new student", async () => {
    expect(l3, "topic has no level-3 question");
    const r = await A.req("POST", "/api/attempts", { questionId: l3!.id, context: "GYM", timeTakenSec: 30, ...answer(l3!, true) });
    expect(r.status === 403, `got ${r.status}`);
  });
  let gymCorrect = 0, gymTotal = 0;
  await check("Gym attempts are scored, wrong ones go to the mistake notebook due in 1 day", async () => {
    for (const [i, q] of l1.entries()) {
      const right = i !== 0;
      const r = await A.req("POST", "/api/attempts", { questionId: q.id, context: "GYM", timeTakenSec: 40, ...answer(q, right) });
      expect(r.status === 200, `attempt ${r.status} ${JSON.stringify(r.body)}`);
      expect(r.body.isCorrect === right, `isCorrect ${r.body.isCorrect} expected ${right}`);
      expect(typeof r.body.solution === "string" && r.body.solution.length > 0, "no solution revealed");
      gymTotal++; if (right) gymCorrect++;
    }
    const u = await db.user.findFirstOrThrow({ where: { email: `e2e-a-${tag}@test.local` } });
    const m = await db.mistakeEntry.findUnique({ where: { userId_questionId: { userId: u.id, questionId: l1[0].id } } });
    expect(m && !m.resolved && approxDays(m.nextReviewAt) === 1, `mistake ${JSON.stringify(m)}`);
    return `${l1.length} level-1 questions, ${gymCorrect} correct`;
  });
  await check("an option id from a different question is rejected", async () => {
    const mcqs = l1.filter((q) => q.type === "MCQ");
    const other = await db.questionOption.findFirstOrThrow({ where: { questionId: { not: mcqs[0].id } } });
    const r = await A.req("POST", "/api/attempts", { questionId: mcqs[0].id, context: "GYM", timeTakenSec: 5, selectedOptionId: other.id });
    expect(r.status === 400, `got ${r.status}`);
  });

  // ---- Mistake notebook schedule
  await check("mistake re-attempt ladder: correct → +3 days; other student cannot touch it", async () => {
    const r = await A.req("PATCH", "/api/mistakes", { questionId: l1[0].id, review: "correct" });
    expect(r.status === 200 && approxDays(r.body.nextReviewAt) === 3, JSON.stringify(r.body));
    const b = await B.req("PATCH", "/api/mistakes", { questionId: l1[0].id, review: "correct" });
    expect(b.status === 404, `B got ${b.status}`);
  });

  // ---- Flashcards
  await check("formula flashcard 'Good' schedules the card 1 day out", async () => {
    const f = await db.formula.findFirstOrThrow({ where: { publishStatus: "PUBLISHED" } });
    const r = await A.req("POST", "/api/revision/review", { cardType: "FORMULA", itemId: f.slug, grade: 2 });
    expect(r.status === 200, `${r.status} ${JSON.stringify(r.body)}`);
    const u = await db.user.findFirstOrThrow({ where: { email: `e2e-a-${tag}@test.local` } });
    const card = await db.reviewCard.findFirstOrThrow({ where: { userId: u.id, itemId: f.slug } });
    expect(card.intervalDays === 1 && approxDays(card.dueAt) === 1, JSON.stringify(card));
  });

  // ---- Highlights IDOR
  await check("student B cannot delete student A's highlight", async () => {
    const t = await db.topic.findFirstOrThrow();
    const h = await A.req("POST", "/api/highlights", { topicId: t.id, sectionKey: "summary", text: "keep me" });
    expect(h.status === 200, `create ${h.status}`);
    const d = await B.req("DELETE", `/api/highlights?id=${h.body.id}`);
    expect(d.status === 200, `delete ${d.status}`);
    expect(await db.highlight.findUnique({ where: { id: h.body.id } }), "A's highlight was deleted by B");
  });

  // ---- Full mock
  let attemptId = "";
  const mockQs: { id: string; type: string; numericalAnswer: number | null; options: { id: string; isCorrect: boolean }[] }[] = [];
  await check("start the 75-question, 180-minute full mock", async () => {
    const r = await A.req("POST", "/api/exams/start", { mode: "mock", mockExamId: "seed-full-mock-1" });
    expect(r.status === 200, `${r.status} ${JSON.stringify(r.body)}`);
    attemptId = r.body.attemptId;
    const at = await db.mockAttempt.findUniqueOrThrow({ where: { id: attemptId }, include: { mockExam: { include: { items: { orderBy: { order: "asc" }, include: { question: { include: { options: true } } } } } } } });
    expect(at.mockExam.items.length === 75, `items ${at.mockExam.items.length}`);
    const mins = Math.round((at.endsAt.getTime() - at.startedAt.getTime()) / 60000);
    expect(mins === 180, `duration ${mins}`);
    const per = Object.entries(at.mockExam.items.reduce<Record<string, number>>((s, i) => ((s[i.section] = (s[i.section] ?? 0) + 1), s), {}));
    expect(per.every(([, n]) => n === 25), JSON.stringify(per));
    mockQs.push(...at.mockExam.items.map((i) => i.question));
    const again = await A.req("POST", "/api/exams/start", { mode: "mock", mockExamId: "seed-full-mock-1" });
    expect(again.body.attemptId === attemptId && again.body.resumed, "second start did not resume");
    return per.map(([s, n]) => `${s} ${n}`).join(", ");
  });
  await check("questions in a live mock cannot be practised for their solution", async () => {
    const r = await A.req("POST", "/api/attempts", { questionId: mockQs[0].id, context: "PYQ", timeTakenSec: 5, ...(mockQs[0].type === "MCQ" ? { selectedOptionId: mockQs[0].options[0].id } : { numericalResponse: 1 }) });
    expect(r.status === 409, `got ${r.status}`);
    const b = await B.req("POST", "/api/attempts", { questionId: mockQs[0].id, context: "PYQ", timeTakenSec: 5, ...(mockQs[0].type === "MCQ" ? { selectedOptionId: mockQs[0].options[0].id } : { numericalResponse: 1 }) });
    expect(b.status === 200, `other student blocked too: ${b.status}`);
  });
  // answer: 10 correct, 5 wrong, rest blank → 10×4 − 5×1 = 35
  const pickAnswer = (q: (typeof mockQs)[number], right: boolean) =>
    q.type === "MCQ" ? { selectedOptionId: q.options.find((o) => o.isCorrect === right)!.id, numericalResponse: null } : { selectedOptionId: null, numericalResponse: right ? q.numericalAnswer : (q.numericalAnswer ?? 0) + 999 };
  await check("save 15 responses; student B cannot write to or submit A's attempt", async () => {
    for (let i = 0; i < 15; i++) {
      const r = await A.req("PUT", `/api/exams/${attemptId}/response`, { questionId: mockQs[i].id, ...pickAnswer(mockQs[i], i < 10), state: "ANSWERED", timeDeltaSec: 60 });
      expect(r.status === 200, `save ${i}: ${r.status} ${JSON.stringify(r.body)}`);
    }
    const w = await B.req("PUT", `/api/exams/${attemptId}/response`, { questionId: mockQs[20].id, ...pickAnswer(mockQs[20], true), state: "ANSWERED", timeDeltaSec: 1 });
    expect(w.status === 404, `B write ${w.status}`);
    const s = await B.req("POST", `/api/exams/${attemptId}/submit`);
    expect(s.status === 404, `B submit ${s.status}`);
  });
  await check("re-seeding content mid-mock keeps option ids (saved answers stay valid)", async () => {
    const before = await db.questionOption.findMany({ where: { questionId: { in: mockQs.map((q) => q.id) } }, select: { id: true } });
    execSync("npx tsx prisma/seed.ts", { stdio: "ignore", env: { ...process.env } });
    const after = new Set((await db.questionOption.findMany({ where: { questionId: { in: mockQs.map((q) => q.id) } }, select: { id: true } })).map((o) => o.id));
    expect(before.length > 0 && before.every((o) => after.has(o.id)), `${before.filter((o) => !after.has(o.id)).length} option ids changed`);
    const stillLinked = await db.mockAttempt.findUnique({ where: { id: attemptId } });
    expect(stillLinked?.status === "IN_PROGRESS", "seed touched the live attempt");
    return `${before.length} options unchanged`;
  });
  await check("submit scores 10×(+4) + 5×(−1) + 60×0 = 35/300; double submit is idempotent", async () => {
    const r = await A.req("POST", `/api/exams/${attemptId}/submit`);
    expect(r.status === 200, `${r.status} ${JSON.stringify(r.body)}`);
    const at = await db.mockAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    const s = at.summary as any;
    expect(at.status === "SUBMITTED" && at.score === 35 && s.max === 300 && s.correct === 10 && s.incorrect === 5 && s.unattempted === 60, JSON.stringify({ score: at.score, max: s.max, c: s.correct, i: s.incorrect, u: s.unattempted }));
    const again = await A.req("POST", `/api/exams/${attemptId}/submit`);
    const at2 = await db.mockAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    expect(again.status < 500 && at2.score === 35, `second submit ${again.status}, score ${at2.score}`);
    const late = await A.req("PUT", `/api/exams/${attemptId}/response`, { questionId: mockQs[30].id, ...pickAnswer(mockQs[30], true), state: "ANSWERED", timeDeltaSec: 1 });
    expect(late.status === 409, `write after submit ${late.status}`);
  });
  await check("mock: wrong answers enter the mistake notebook, MOCK attempts are recorded", async () => {
    const u = await db.user.findFirstOrThrow({ where: { email: `e2e-a-${tag}@test.local` } });
    const entries = await db.mistakeEntry.count({ where: { userId: u.id, questionId: { in: mockQs.slice(10, 15).map((q) => q.id) } } });
    expect(entries === 5, `mistake entries ${entries}`);
    const mockAttempts = await db.attempt.count({ where: { userId: u.id, context: "MOCK" } });
    expect(mockAttempts === 15, `MOCK attempts ${mockAttempts}`);
    const after = await A.req("POST", "/api/attempts", { questionId: mockQs[0].id, context: "PYQ", timeTakenSec: 5, ...(mockQs[0].type === "MCQ" ? { selectedOptionId: mockQs[0].options[0].id } : { numericalResponse: 1 }) });
    expect(after.status === 200, `practice after submit ${after.status}`);
  });
  await check("analytics page shows the real attempt count and accuracy", async () => {
    const u = await db.user.findFirstOrThrow({ where: { email: `e2e-a-${tag}@test.local` } });
    const all = await db.attempt.findMany({ where: { userId: u.id } });
    const acc = Math.round((all.filter((a) => a.isCorrect).length / all.length) * 100);
    const p = await A.req("GET", "/analytics");
    const html = String(p.body).replace(/<!-- -->/g, "");
    expect(p.status === 200, `status ${p.status}`);
    expect(html.includes(`>${all.length}<`) && html.includes(`${acc}%`), `expected ${all.length} attempts and ${acc}% on the page`);
    expect(html.includes("35"), "mock score 35 not shown");
    return `${all.length} attempts, ${acc}% accuracy`;
  });

  // ---- Study plan
  let planId = "";
  await check("plan (2 h/day): no day over 120 min; B cannot tick A's tasks", async () => {
    const r = await A.req("POST", "/api/plan", { action: "generate", dailyHours: 2, completedChapterIds: [] });
    expect(r.status === 200, `${r.status} ${JSON.stringify(r.body)}`);
    planId = r.body.planId;
    const tasks = await db.planTask.findMany({ where: { planId } });
    const load: Record<number, number> = {};
    for (const t of tasks) load[t.day] = (load[t.day] ?? 0) + t.minutes;
    const worst = Math.max(...Object.values(load));
    expect(worst <= 120, `a day has ${worst} min`);
    const days = Math.max(...tasks.map((t) => t.day));
    expect(!tasks.some((t) => t.kind === "MOCK" && t.day > days - 2), "mock in last two days");
    const b = await B.req("PATCH", "/api/plan", { taskId: tasks[0].id, completed: true });
    expect(b.status === 404, `B toggle ${b.status}`);
    const a = await A.req("PATCH", "/api/plan", { taskId: tasks[0].id, completed: true });
    expect(a.status === 200, `A toggle ${a.status}`);
    return `${days} days, ${tasks.length} tasks, busiest day ${worst} min`;
  });
  await check("recover missed tasks: moves them forward without overfilling any day beyond 125%", async () => {
    const plan = await db.studyPlan.findUniqueOrThrow({ where: { id: planId } });
    await db.studyPlan.update({ where: { id: planId }, data: { startDate: new Date(plan.startDate.getTime() - 3 * DAY) } });
    const r = await A.req("POST", "/api/plan", { action: "recover" });
    expect(r.status === 200 && r.body.moved > 0, JSON.stringify(r.body));
    const tasks = await db.planTask.findMany({ where: { planId, completedAt: null } });
    const load: Record<number, number> = {};
    for (const t of tasks) if (t.kind !== "BUFFER" && t.day >= 4) load[t.day] = (load[t.day] ?? 0) + t.minutes;
    const worst = Math.max(...Object.values(load));
    expect(worst <= 150, `day load ${worst} > 150`);
    const stillMissed = tasks.filter((t) => t.day < 4 && t.kind !== "BUFFER").length;
    return `moved ${r.body.moved}, unplaced ${r.body.unplaced ?? 0}, left behind ${stillMissed}, busiest day ${worst} min`;
  });

  // ---- Pages render for a student
  await check("every student page returns 200 without a server error", async () => {
    const topicSlug = topic.slug;
    const ch = await db.chapter.findFirstOrThrow({ include: { subject: true } });
    const pages = ["/dashboard", "/syllabus", `/syllabus/${ch.subject.slug}`, `/chapter/${ch.slug}`, `/topic/${topicSlug}`, `/topic/${topicSlug}/sheet`, "/studio", "/formulas", "/pyq", "/gym", `/gym/${topicSlug}`, "/mistakes", "/exams", `/exams/${attemptId}/result`, "/plan", "/chemistry", "/revision", "/analytics", "/strategy", "/settings", `/q/${l1[0].id}`];
    const bad: string[] = [];
    for (const p of pages) {
      const r = await A.req("GET", p);
      if (r.status !== 200 || String(r.body).includes("Application error")) bad.push(`${p} → ${r.status}`);
    }
    expect(!bad.length, bad.join("; "));
    return `${pages.length} pages`;
  });

  await check("logout invalidates the session server-side", async () => {
    const saved = A.cookie;
    const r = await A.req("POST", "/api/auth/logout");
    expect(r.status === 200, `logout ${r.status}`);
    A.cookie = saved;
    const after = await A.req("POST", "/api/attempts", { questionId: "x", context: "GYM", timeTakenSec: 1 });
    expect(after.status === 401, `old cookie still works: ${after.status}`);
  });

  await check("admin: create → edit keeps option ids; PYQ import without year/shift/source is refused; delete", async () => {
    const admin = new Client("admin");
    const login = await admin.req("POST", "/api/auth/login", { email: process.env.SEED_ADMIN_EMAIL ?? "admin@jee-edge.local", password: process.env.SEED_ADMIN_PASSWORD ?? "Admin@JeeEdge2027" });
    expect(login.status === 200 && login.body.role === "ADMIN", `admin login ${login.status}`);
    const ch = await db.chapter.findFirstOrThrow();
    const q = {
      source: "PRACTICE", type: "MCQ", chapterSlug: ch.slug, level: 1, difficulty: "EASY", statement: "E2E temporary question statement",
      options: [{ text: "one", isCorrect: false, explanation: "no" }, { text: "two", isCorrect: true, explanation: "yes" }],
      solution: "E2E solution text", conceptTested: "x", formulaUsed: "x", whyFormula: "x", commonMistakes: "x",
    };
    const c = await admin.req("PUT", "/api/admin/questions", q);
    expect(c.status === 200, `create ${c.status} ${JSON.stringify(c.body)}`);
    const before = (await db.questionOption.findMany({ where: { questionId: c.body.id }, orderBy: { order: "asc" } })).map((o) => o.id);
    const e = await admin.req("PUT", "/api/admin/questions", { ...q, id: c.body.id, options: [{ text: "one!", isCorrect: true, explanation: "now right" }, { text: "two!", isCorrect: false, explanation: "now wrong" }] });
    expect(e.status === 200, `edit ${e.status}`);
    const after = await db.questionOption.findMany({ where: { questionId: c.body.id }, orderBy: { order: "asc" } });
    expect(after.map((o) => o.id).join() === before.join() && after[0].isCorrect && after[0].text === "one!", "option ids changed on edit");
    const bad = await admin.req("POST", "/api/admin/questions", { questions: [{ ...q, source: "PYQ" }] });
    expect(bad.status === 400, `unattributed PYQ import gave ${bad.status}`);
    const del = await admin.req("DELETE", `/api/admin/questions?id=${c.body.id}`);
    expect(del.status === 200, `delete ${del.status}`);
    return String(bad.body.error).slice(0, 90);
  });

  // cleanup
  await db.user.deleteMany({ where: { email: { endsWith: `-${tag}@test.local` } } });
  await db.mockExam.deleteMany({ where: { ownerId: null, id: { notIn: ["seed-full-mock-1", "seed-starter-mock-1"] }, attempts: { none: {} }, publishStatus: "DRAFT", title: { startsWith: "E2E" } } });

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} end-to-end checks passed.`);
  await db.$disconnect();
  process.exit(failed.length ? 1 : 0);
}

main().catch(async (e) => { console.error(e); await db.$disconnect(); process.exit(1); });
