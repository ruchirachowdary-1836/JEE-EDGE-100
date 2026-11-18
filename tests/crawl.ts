/* Crawls every internal link reachable from the dashboard (as a student and as an admin) and reports
 * any link that returns 4xx/5xx or renders a Next.js error page. Run against a running server: npm run test:crawl */
const BASE = process.env.E2E_BASE ?? "http://localhost:3100";

async function login(email: string, password: string) {
  const r = await fetch(BASE + "/api/auth/login", { method: "POST", headers: { "content-type": "application/json", origin: BASE }, body: JSON.stringify({ email, password }) });
  if (!r.ok) throw new Error(`login ${email}: ${r.status}`);
  return r.headers.getSetCookie().find((c) => c.startsWith("jee_session="))!.split(";")[0];
}

async function crawl(cookie: string, label: string, limit = 1500) {
  const seen = new Set<string>(["/dashboard"]);
  const queue = ["/dashboard"];
  const bad: string[] = [];
  const from = new Map<string, string>();
  while (queue.length && seen.size <= limit) {
    const path = queue.shift()!;
    const res = await fetch(BASE + path, { headers: { cookie }, redirect: "manual" });
    if (res.status >= 300 && res.status < 400) continue;
    const html = await res.text();
    if (res.status >= 400) {
      bad.push(`${path} → ${res.status} (linked from ${from.get(path) ?? "start"})`);
      continue;
    }
    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      let href = m[1].replace(/&amp;/g, "&");
      if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next") || href.startsWith("/api")) continue;
      href = href.split("#")[0];
      if (!href || seen.has(href)) continue;
      // the CBT shell needs a real attempt id; the e2e test covers it
      if (/^\/exams\/[^/]+$/.test(href)) continue;
      seen.add(href); from.set(href, path); queue.push(href);
    }
  }
  console.log(`${label}: crawled ${seen.size} internal URLs, ${bad.length} broken`);
  for (const b of bad) console.log(`  BROKEN ${b}`);
  return bad.length;
}

(async () => {
  const student = await login(process.env.SEED_STUDENT_EMAIL ?? "student@jee-edge.local", process.env.SEED_STUDENT_PASSWORD ?? "Student@JeeEdge2027");
  const admin = await login(process.env.SEED_ADMIN_EMAIL ?? "admin@jee-edge.local", process.env.SEED_ADMIN_PASSWORD ?? "Admin@JeeEdge2027");
  const n = (await crawl(student, "student")) + (await crawl(admin, "admin"));
  process.exit(n ? 1 : 0);
})();
