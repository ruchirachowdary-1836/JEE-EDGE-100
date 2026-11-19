# JEE EDGE 100

A structured JEE Main 2027 preparation platform for the final ~60 days. Students work through concepts, formulas, practice, mock tests and revision. Everything runs on **human-authored content and fixed, predictable logic**. There are **no AI features**: no chatbots, LLM calls, generated answers or generated questions.

> Every concept must be understood. Every formula must be justified. Every mistake must be corrected. Every important question must teach something.

---

## 1. Content status (read this first)

The app holds a starter content library. It is real content, not placeholder text, but it is **not yet expert-verified**:

| Content | Included | Status |
|---|---|---|
| Syllabus: 3 subjects, 54 chapters, 114 topics with subtopics | Mapped line by line to the official JEE Main 2027 syllabus (verified 18 Nov 2026); material beyond it is labelled | Published |
| Master notes (17 sections + formula sheet) | **All 114 topics** | Published · *awaiting expert review* |
| Formula sheets | Every topic, each formula with its validity condition; combined page `/formulas/sheet`; `npm run check:content` audits 184 standard JEE formulas | Published · *awaiting expert review* |
| Formula Lab entries (all 21 fields + derivation steps) | 15 formulas | Published · *awaiting expert review* |
| Formula comparisons | 7 (velocity vs speed, order vs molecularity, …) | Published · *awaiting expert review* |
| Question Gym questions (levels 1–5; full solutions, every option explained) | 630 original practice questions: **every one of the 114 topics** has a five-level set. Levels 1–4 use the JEE Main formats (single-correct MCQ, numerical). Level 5 adds the JEE Advanced formats: 50 multiple-correct questions (with one, two, three or four correct options) and 9 matching-list questions. All 273 numerical answers are recomputed independently by `npm run test:answers` | Published · *awaiting expert review* |
| Mock tests | Full Mock Test 1 (75 questions, JEE pattern) and Starter Mock 1 (30) | Published |
| Exam Playbook | Separate JEE Main 2027 and JEE Advanced 2027 strategies (`/strategy`); official rules and recommendations labelled separately | Published |
| Interactive simulations (Concept Studio) | 14 | Published · *awaiting expert review* |
| Named reactions · inorganic exceptions · concept flashcards | 18 · 16 · 24 | Published · *awaiting expert review* |
| Periodic table data (118 elements) + configuration exceptions | Reference data | — |
| **Previous-year questions (2022–2026)** | **None** | **Empty on purpose** |

**About the starter content.** It was written while the app was being built. Have a subject expert check it before students rely on it. Every item shows an *"Awaiting expert review"* badge until an admin sets its review status to **Verified** in the CMS.

**About PYQs.** The app does not invent, reconstruct or "recall" exam questions. The PYQ library, filters, year- and shift-wise papers and timed PYQ tests are all built and working. They fill up when you import papers from a **licensed or official source** through *Admin → Questions → Bulk import*. The importer refuses any PYQ that is missing its year, session, shift or source attribution.

To load the last five years: download the official question papers and final answer keys NTA publishes for each session and shift (jeemain.nta.nic.in); have a subject expert enter each question, its options, the official answer and a worked solution in the JSON format shown on the import page (`source: "PYQ"` with year, session, shift, date and `sourceAttribution`); import, review and publish.

**What students see where content is missing.** Topics, chapters and Gym sets without content show a *content pending* notice. Students never get filler text.

## 2. Syllabus and exam pattern

- **JEE Main 2027.** Every chapter, topic and subtopic was compared with the official *Syllabus for JEE (Main) - 2027* PDF (linked as "Syllabus" on jeemain.nta.nic.in, uploaded 24 Oct 2026; verified 18 Nov 2026). Subtopics follow the 2027 wording. Material the platform still teaches but the 2027 text does not list (for example planes in 3D, scalar triple product, tangents and normals, mean value theorems, trigonometric equations, radioactivity, potentiometer, Carnot engine, Doppler effect, Faraday's laws of electrolysis, oxoacid structures) is stored in `beyondMain` and labelled *Beyond JEE Main 2027* on topic pages and in formula sheets. Source and date: `SYLLABUS_SOURCE` in `content/syllabus.ts`.
- **JEE Advanced 2027.** Organised by IIT Delhi. The exam is on Sunday 23 May 2027 (announced 13 Nov 2026). Its syllabus page still said "Coming soon" on 19 Nov 2026, so no Advanced mapping is claimed yet (`ADVANCED_SYLLABUS.status = "pending"`). The Main and Advanced syllabi are not assumed to be the same.
- **Default exam pattern.** Confirmed against the **JEE Main 2027 Information Bulletin** (NTA): 75 questions (20 MCQ + 5 numerical per subject, all compulsory), 300 marks, 3 hours (4 hours for PwD/PwBD candidates eligible for a scribe), +4 / −1 / 0 in both sections. Section B answers are integers; a decimal answer is rounded to the nearest integer. Sessions: 20–24 and 28 Jan 2027, and 2–7 Apr 2027; ranking uses the better of the two NTA scores. Pattern, marking scheme, exam dates and syllabus version are editable in *Admin → Exam configuration* without code changes.
- **Question formats.** Mocks and timed tests use only the JEE Main formats, and mock numericals all have integer answers. Gym Level 5 also uses the JEE Advanced formats. Multiple-correct follows the recent-paper rule: +4 for exactly the correct set; otherwise +1 for each correct option chosen if no wrong option is chosen; −2 if any wrong option is chosen. Matching uses +3 / −1. Each JEE Advanced paper prints its own scheme, so treat this one as practice.

## 3. Tech stack

- **Frontend:** Next.js 14 (App Router) and TypeScript, Tailwind CSS, Framer Motion, Lucide icons, Recharts, KaTeX, and SVG/Canvas simulations.
- **Backend:** Next.js route handlers, Zod validation, Prisma ORM and **PostgreSQL**.
- **Auth:** server-side sessions. A random token sits in an httpOnly cookie, and only its SHA-256 hash is stored in the database. Passwords are hashed with bcrypt (cost 12). Roles are `STUDENT` and `ADMIN`.
- **Local database:** `embedded-postgres` runs a real PostgreSQL 18 server from `node_modules`. You do not need Docker or a system install.
- **Fonts:** system font stacks, so the build never downloads fonts.

## 4. Local setup

Requirements: Node.js 20 or later.

```bash
npm install
```

```bash
cp .env.example .env
```

Start PostgreSQL in its own terminal and leave it running. The first run initialises `./.pgdata` with UTF-8 encoding.

```bash
npm run db:local
```

In a second terminal, create the tables and load the content library:

```bash
npx prisma migrate deploy
```

```bash
npm run db:seed
```

```bash
npm run dev
```

Open http://localhost:3100.

**Seeded local accounts.** These demo passwords are used only when `NODE_ENV` is not `production`. With `NODE_ENV=production` the seed refuses the defaults: set `SEED_ADMIN_PASSWORD` / `SEED_STUDENT_PASSWORD` (12+ characters) or the accounts are skipped.

| Role | Email | Password |
|---|---|---|
| Admin | `admin@jee-edge.local` | `Admin@JeeEdge2027` |
| Student | `student@jee-edge.local` | `Student@JeeEdge2027` |

You can also register a new student account from the sign-in page.

**Using your own PostgreSQL.** Point `DATABASE_URL` in `.env` at it and skip `npm run db:local`.

### Scripts

| Script | What it does |
|---|---|
| `npm run db:local` | Starts the embedded PostgreSQL on port 5433 |
| `npm run dev` / `build` / `start` | Next.js dev server, production build, production server (port 3100) |
| `npm run db:migrate` | Creates a new migration after a schema change |
| `npm run db:deploy` | Applies migrations (production) |
| `npm run db:seed` | Loads or refreshes the content library. Idempotent: it never rebuilds a mock that students have attempted |
| `npm run student:reset -- <email>` | Clears one student's activity (attempts, plan, mistakes, …) and keeps the account |
| `npm run typecheck` | Runs the TypeScript check |
| `npm run check:content` | KaTeX compiles in every note and question; MCQs have exactly one key and an explanation for every option; topic slugs exist; no duplicate questions; every numerical answer recomputed independently; 184-item formula checklist; periodic-table data consistency |
| `npm run test:answers` | Recomputes all numerical Gym answers by an independent method (simulation, enumeration, numerical integration) |
| `npx tsx scripts/list-coverage.ts` | Which chapters and topics have Gym questions, by level (`--all` lists every chapter) |
| `npm run test:unit` | Marking scheme, SRS intervals, mistake ladder, plan budgets/phases, Gym unlocks, mastery, rate limiter |
| `npm run test:e2e` | Against a running server: auth, rate limit, CSRF/Origin, IDOR between two students, admin-only APIs, multiple-correct partial marking and matching scoring, full 75-question mock scoring, mid-mock solution lock, re-seed safety, mistakes, flashcards, plan + recovery, analytics, page renders. Creates and deletes throwaway users |
| `npm run test:crawl` | Against a running server: follows every internal link as student and admin and reports any 4xx/5xx |

## 5. What's inside

| Module | Route | Highlights |
|---|---|---|
| Dashboard | `/dashboard` | Exam countdown (configurable), syllabus completion per subject, daily target, streak, accuracy, mock score trend, weak and strong chapters from recorded performance, today's plan, items due, recently studied |
| Syllabus & Master Notes | `/syllabus`, `/chapter/[slug]`, `/topic/[slug]` | 17-section notes with live embedded simulations, search inside notes, text highlighting, bookmarks, autosaved personal notes, completion and revision tracking, printable revision sheet (`/topic/[slug]/sheet`) |
| Concept Studio | `/studio` | 14 simulations with play/pause, restart, 0.25×–2× speed, timeline scrubbing, step mode and parameter sliders, plus the 8-part lesson around each |
| Formula Lab | `/formulas` | Search and filter, all 21 fields per formula, derivation steps, comparisons, flashcard revision |
| PYQ Library | `/pyq` | Filters for year, subject, chapter, difficulty, unsolved, incorrect, bookmarked and attempted; year- and shift-wise papers; timed PYQ tests |
| Question Gym | `/gym` | 5 levels per topic, unlocked by configurable accuracy and completion rules (enforced on the server), full solutions after submission, time tracking |
| Mistake Notebook | `/mistakes` | Auto-captured wrong answers, 6 error categories, personal observations, re-attempts on a 1/3/7/15-day schedule, repeated-mistake and weak-topic views |
| Exam Simulator | `/exams` | CBT interface (palette, save & next, mark for review, clear, subject tabs, server-synced timer, auto-submit), negative marking, chapter or custom tests, detailed analysis with mistake classification |
| 60-Day Plan | `/plan` | 4 phases (days 1–15, 16–30, 31–45, 46–60), daily budget capped to your hours, weekly buffer days, missed-task recovery, mock days, completion tracking |
| Chemistry Lab | `/chemistry` | Interactive periodic table (trend colouring), configuration explorer with verified exceptions, VSEPR visualiser, organic reaction map with shortest-route finder, conversion practice, named reactions, inorganic exceptions |
| Revision Centre | `/revision` | Spaced-repetition flashcards (formula, concept, reaction), incorrect and difficult questions, bookmarks, summary sheets, graphs and diagrams, 1-, 3- and 7-day tracks |
| Analytics | `/analytics` | Studied, practised, revised and mastered tracked separately; subject accuracy, solving time, daily volume, weekly improvement, mock trend, formula and PYQ completion, chapter mastery table |
| Admin CMS | `/admin` | Chapters and topics, notes editor with preview, formula editor (21 fields), question editor, bulk JSON import, animated-lesson editor, mock assembler, publish/review workflow, exam configuration |

## 6. How the rules work

- **Mastery.** A topic is *mastered* only when all of these hold: its notes are completed, Gym level 4 is cleared, at least *N* attempts are made at ≥ *X*% accuracy, and it has been revised at least once. All thresholds are configurable. Opening the notes never counts as mastery.
- **Gym unlock.** Level L+1 opens when level L is ≥ `minCompletion`% attempted at ≥ `minAccuracy`% accuracy. All attempts count, including retries. An unlocked level stays unlocked. A level with no published questions does not block progress. Locks are checked on the server.
- **Spaced repetition.** SM-2 style. The four grades (Again, Hard, Good, Easy) adjust the ease factor. First and second intervals and the maximum interval are configurable.
- **Mock scoring.** Uses the configured marking scheme. "Answered & marked for review" is evaluated; "marked" without an answer is not. Submission is atomic, so an auto-submit racing a manual submit cannot score twice.
- **Answer secrecy.** Correct options, explanations and solutions are never sent to the browser before the student submits.

## 7. Content architecture: adding content without code changes

- **Through the CMS:** add or edit chapters, topics, notes, formulas, questions, animated lessons and mocks. New or edited items are saved as **Draft / Pending review**. Publish them when ready, and mark them **Verified** once an expert has checked them.
- **Bulk import:** paste or upload JSON at *Admin → Questions → Bulk import*. The page shows the exact format. Every row is validated before anything is written.
- **Seed files:** the starter library lives in `content/*.ts` (version-controlled and reviewable in pull requests). `npm run db:seed` upserts it.
- **Text format** for notes, solutions and formula fields: a blank line separates paragraphs; lines starting with `- ` make bullets, `1. ` a numbered list and `> ` a callout. Inline maths uses `$…$`, display maths `$$…$$`, bold `**…**` and code `` `…` ``.

### Adding a simulation (needs code)

1. Write a `SimDef` in `src/components/studio/sims-*.tsx` with its params, `duration`, an optional `stepState`, and `render`.
2. Register it in `src/components/studio/registry.ts` and add its key to `src/lib/sim-keys.ts`.
3. Create the lesson text in *Admin → Animated lessons*, or in `content/animations.ts`.

## 8. Project structure

```
content/               starter content library (syllabus, notes, formulas, questions, reactions…)
prisma/schema.prisma   relational schema (users, sessions, syllabus, content, attempts, mocks, plans, SRS…)
prisma/migrations/     SQL migrations
prisma/seed.ts         idempotent content loader + local accounts
scripts/               local PostgreSQL launcher, student reset
src/app/(auth)         sign in / register
src/app/(app)          student modules + /admin CMS (sidebar layout)
src/app/(exam)         distraction-free CBT exam room
src/app/api            route handlers (auth, attempts, exams, plan, revision, admin…)
src/components         UI kit, rich-text/KaTeX renderer, question card, charts, Concept Studio
src/lib                auth, config, progress/mastery, SRS, plan generator, scoring, element data
```

## 9. Deployment

**On GitHub: the static edition.** GitHub Pages serves static files only, so it cannot run the full app's server and database. Instead, `.github/workflows/pages.yml` builds a **static edition** (`pages-site/`) on every push to `main` and publishes it to **https://ruchirachowdary-1836.github.io/JEE-EDGE-100/**. It reuses the same components and `content/` files and includes the syllabus, master notes, Concept Studio, Formula Lab, Question Gym (answers checked in the browser, progress saved in `localStorage`), Chemistry Lab and flashcards. Accounts, the exam simulator, the 60-day plan, analytics, the mistake notebook and the admin CMS exist only in the full app. Build it locally with `npm run pages:build` (output in `pages-site/out`).

The repo also runs **GitHub Actions CI** (`.github/workflows/ci.yml`) on every push: it starts PostgreSQL, applies migrations, seeds the content, typechecks and builds the full app.

**One-click hosting from the GitHub repo (Render).** `render.yaml` is a Render Blueprint. In Render choose *New → Blueprint*, connect this repository, and enter `SEED_ADMIN_PASSWORD` (and `SEED_STUDENT_PASSWORD`) when prompted. It creates a free web service and a free PostgreSQL database. Render's free database expires after 30 days unless upgraded.

Any other Node host with a managed PostgreSQL also works (Railway, Fly.io, a VPS, and so on).

1. Create a PostgreSQL database and set these environment variables:
   - `DATABASE_URL`: the database connection string.
   - `SESSION_DAYS`: optional; defaults to 30.
   - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`: **choose a strong password**. Optionally also `SEED_STUDENT_EMAIL` and `SEED_STUDENT_PASSWORD`, or delete the demo student after seeding.
2. Build: `npm ci && npm run build`. `postinstall` runs `prisma generate`.
3. On each release, run `npm run db:deploy`. Run `npm run db:seed` **once** for the initial content.
4. Start: `npm start` (port 3100; behind a proxy, map it or set `PORT` and change the script).
5. Cookies are set as `Secure` when `NODE_ENV=production`, so serve the app over HTTPS.

Vercel also works for the Next.js app with an external PostgreSQL. Use a pooled connection string and run the migrate and seed commands from your machine or CI.

## 10. Known limitations and next steps

- The expert verification pass on all starter content is still to do (see §1).
- The PYQ library needs licensed papers imported.
- Every topic has one five-level Gym set (5 questions). More questions per level would make the unlock rules more meaningful; `npx tsx scripts/list-coverage.ts --all` shows counts per level.
- The JEE Advanced 2027 syllabus mapping waits for the official publication (IIT Delhi's page said "Coming soon" on 19 Nov 2026).
- The GitHub Pages edition stores progress in the browser only; the Progress page offers export and import.
- Animations pause when the browser tab is in the background (standard `requestAnimationFrame` behaviour).
