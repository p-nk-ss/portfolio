# content.md — site copy

> Canonical text content for the site. Source: `public/Pankaz_Jha_QA_Automation_Engineer.pdf` (current CV) + `docs/site-changes.md`. Language: English only.
> Positioning: **QA automation**, with the anesthesiology background reframed as the *rigor* story.
> Site and PDF must not contradict each other. This file supersedes the seed examples in `SPEC.md §3`.

---

## Hero

- **Name:** Pankaz Jha
- **Role:** QA Automation Engineer
- **Tagline:** From the operating room to the CI pipeline.
- **Subline:** I build test automation from scratch — UI, API, mobile, performance — and wire it into CI/CD so quality is continuous, not a last-minute scramble.
- **Chips:** QA automation / Python · Playwright · Appium · CI/CD · GitHub Actions
- **Info rows:**
  - role — QA Automation Engineer
  - focus — UI · API · mobile · performance
  - stack — Python · Pytest · Playwright · Appium
  - ci_cd — GitHub Actions · Azure DevOps · Docker
  - coverage — 1,500+ E2E tests · 70% of test base automated
  - location — Kyiv, UA · remote / hybrid
  - langs — Ukrainian (native) · English (B2)
  - uptime — since med school
- **CTAs:** `Open CV.pdf` (primary) · `Get in touch`
- **Avatar:** real headshot (`public/avatar.jpg`).

---

## About

For ten years I was an anesthesiologist — a job built on protocols, relentless monitoring, and catching problems before they ever reach the patient. I bring that exact discipline to QA automation.

Today I build test automation from the ground up — twice as the sole automation engineer on the team. Most recently: 1,500+ Playwright tests for a US construction-management SaaS, Android automation with Appium, JMeter load testing that drove autoscaling, and CI pipelines with diff-based test selection and parallel shards. Before that, I cut a 3-day manual regression down to a 5-hour automated run.

I also build and ship my own products — an Android app, web apps, self-hosted automation pipelines — increasingly with AI-assisted development. Shipping software myself makes me a sharper tester: I know what breaks, because I've built it.

---

## Skills

Grouped (lead with automation; dev skills are second-tier proof):

- **Test automation** — Python · Pytest · Playwright · Allure · Page Object & Screen Object
- **API testing** — Postman · Swagger · Requests
- **Performance** — JMeter · Prometheus · Grafana
- **Mobile** — Appium + Python (Android) · Screen Object · emulators & real devices
- **Databases** — PostgreSQL · MsSQL · SQLAlchemy / SQLModel · queries · data validation
- **CI/CD & infra** — GitHub Actions · Azure DevOps · Docker · Docker Compose · AWS · Linux / bash · Git
- **QA process** — Test design · Test documentation · Qase · Jira · Agile / Scrum
- **Also builds** — Android · Web (Django / Next.js) · Claude Code skills & AI-assisted development
- **Familiar with** — k6 · Selenium · JavaScript
- **Spoken** — Ukrainian (native) · English (B2)

---

## Experience

### LNOKS — QA Automation Engineer
*Dec 2025 – present*

*Client project: EZBuild — multi-tenant construction-management SaaS for US general contractors (web + Android). Sole automation engineer in a 6-person team.*
- Built the E2E UI framework nearly from scratch (Python, pytest, Playwright, POM): 1,581 tests and 257 page objects across 7 functional areas; 70% of the ~2,000-case test base automated.
- CI on GitHub Actions: diff-based test selection, parallel shards on isolated tenants, merged reporting; a 137-test smoke suite gates every stage deploy.
- Android automation: ~100 tests with Appium (Screen Object) on emulators and real devices.
- JMeter load tests (9 scenarios, up to 1,000 users) with Prometheus + Grafana, weekly on AWS — exposed bottlenecks that led to autoscaling and DB optimizations.
- Built Claude Code skills for Qase test cases and Jira bug reports — case authoring went from ~10 a day to ~100 an hour; adopted company-wide.
- Verified data in PostgreSQL (SQLAlchemy); worked directly with the US client in English — demos, grooming, weekly syncs.

### Infopulse — Quality Control Engineer (QA Automation)
*Dec 2021 – Sep 2025*

*Internal time-tracking system used company-wide (~2,000 employees). Sole automation engineer in a 7-person team.*
- Started in manual QA; moved to automation within six months and built the framework from scratch (Python, pytest, Playwright, Page Object).
- ~500 UI and API tests covering 80%+ of critical functionality — regression cut from 3 days to a ~5-hour automated run.
- MS SQL validation after UI actions; DB-level test preconditions and cleanup.
- Azure DevOps pipelines run the suite on every commit.

### Kyiv clinical hospitals — Anesthesiologist
*2010 – 2022*

*Alexander Clinical Hospital, International Neurosurgery Center.*
- A decade of precision-critical decisions, protocol-driven work, and high-stakes responsibility under pressure — the foundation of how I approach quality, risk, and verification today.

### Education
- Medicine — Bogomolets National Medical University, Kyiv · 2004 – 2010
- Residency — Shupyk National Medical Academy of Postgraduate Education · 2010 – 2012
- Certificate: Fundamentals of Software Testing — QATestLab

---

## Projects

> Framing for a QA audience: these show that I build real systems end-to-end (so I understand what I test) and that I automate everything — scraping, pipelines, CI, infra.

### Mirrolit — bilingual e-book reader (Android)
*Kotlin · Jetpack Compose · ML Kit · Room · Claude Code* — GitHub: https://github.com/p-nk-ss/SplitReader
- An Android reader that shows the original text and a live translation side by side — EPUB, FB2 and MOBI, on-device translation with ML Kit and offline models. In closed testing on Google Play.
- Built with Claude Code and covered by unit and instrumented tests — I test what I build.

### LabLib — Android app (AI-assisted)
*Android · Kotlin · Claude Code* — no link (repository is private)
- A native Android app that interprets lab results, built largely through agentic AI development (Claude Code) and shipped end-to-end from product planning to deployment.
- Proves I can build and reason about the same mobile apps I write automation for.

### News pipeline → Telegram
*Python · Playwright · RabbitMQ · OpenAI API · n8n · PostgreSQL · Hetzner* — Live: https://t.me/self_games_news
- v1: a Python bot — Playwright scraping, RabbitMQ queues, OpenAI API for processing. v2 (live): a self-hosted n8n pipeline on Hetzner — scheduled scraping, translation and filtering, hash-based de-duplication in PostgreSQL, auto-publishing to Telegram.
- Rebuilt the system when v1 stopped fitting — owning the whole stack, not just the tests on top of it.

### protocols.pankaz.dev
*Next.js · Claude Code* — Live: https://protocols.pankaz.dev
- A clean, structured reference site of translated anesthesiology clinical guidelines (e.g. the DAS 2025 difficult-airway guidelines) — recreated as styled HTML with algorithm diagrams.
- Brings medical domain knowledge and engineering together, built fast with AI-assisted development.

---

## AI-assisted development — highlight block

Position as a modern strength, framed for the QA/rigor brand (don't undercut it):

> "I use agentic AI tooling (Claude Code) to ship real products — two Android apps, a clinical protocols site — and to speed up QA itself: my Claude Code skills for test cases and bug reports took case authoring from ~10 a day to ~100 an hour and are now used company-wide. AI-generated output gets the same treatment as any other code: review, test, verify."

`[NOTE]` On wording: keep the public copy as **"AI-assisted development"** rather than the casual term "vibe coding." For a QA engineer whose entire brand is rigor, "vibe coding" risks reading as low-discipline.

---

## Contact

- **Email:** pankaz6jha@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/pankaz-jha-51b225220/
- **GitHub:** https://github.com/p-nk-ss
- **Telegram:** https://t.me/self_pankass
- **Location:** Kyiv, Ukraine — open to remote and hybrid.
- **CV:** `/Pankaz_Jha_QA_Automation_Engineer.pdf` (single path: `contact.cvHref`).
- **Phone:** not published on the page; CV only.

---

## Later

- Demo repository card (autotests + load testing) once it exists — possibly first in Projects or linked from the hero.
