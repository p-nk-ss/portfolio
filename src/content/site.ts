/**
 * Canonical site copy, lifted from content.md (the approved final copy).
 * Kept as typed strings to leave a clean i18n seam (no text baked into images/SVG).
 * Positioning: QA-automation-first; anesthesiology reframed as the rigor story.
 */

export const hero = {
  name: "Pankaz Jha",
  role: "QA Automation Engineer",
  tagline: "From the operating room to the CI pipeline.",
  subline:
    "I build test automation from scratch — UI, API, mobile, performance — and wire it into CI/CD so quality is continuous, not a last-minute scramble.",
  prompt: "whoami",
  monogram: "PJ",
  chips: [
    { label: "QA automation / Python", accent: "green" as const },
    { label: "Playwright · Appium", accent: "blue" as const },
    { label: "CI/CD · GitHub Actions", accent: "peach" as const },
  ],
  monitor: {
    label: "heart_rate.monitor",
    bpm: 72,
    uptime: "uptime: since med school",
  },
  // neofetch-style summary shown in the right column of the hero window
  info: [
    { k: "role", v: "QA Automation Engineer" },
    { k: "focus", v: "UI · API · mobile · performance" },
    { k: "stack", v: "Python · Pytest · Playwright · Appium" },
    { k: "ci_cd", v: "GitHub Actions · Azure DevOps · Docker" },
    { k: "coverage", v: "1,500+ E2E tests · 70% of test base automated" },
    { k: "location", v: "Kyiv, UA · remote / hybrid" },
    { k: "langs", v: "Ukrainian (native) · English (B2)" },
    { k: "uptime", v: "since med school" },
  ] as const,
};

export const about = {
  title: "About",
  windowTitle: "pankaz@portfolio: ~/about",
  paragraphs: [
    "For ten years I was an anesthesiologist — a job built on protocols, relentless monitoring, and catching problems before they ever reach the patient. I bring that exact discipline to QA automation.",
    "Today I build test automation from the ground up — twice as the sole automation engineer on the team. Most recently: 1,500+ Playwright tests for a US construction-management SaaS, Android automation with Appium, JMeter load testing that drove autoscaling, and CI pipelines with diff-based test selection and parallel shards. Before that, I cut a 3-day manual regression down to a 5-hour automated run.",
    "I also build and ship my own products — an Android app, web apps, self-hosted automation pipelines — increasingly with AI-assisted development. Shipping software myself makes me a sharper tester: I know what breaks, because I've built it.",
  ],
};

export type SkillGroup = { name: string; items: string[]; lead?: boolean };

export const skills: { windowTitle: string; groups: SkillGroup[] } = {
  windowTitle: "pankaz@portfolio: ~/skills",
  groups: [
    {
      name: "Test automation",
      lead: true,
      items: [
        "Python",
        "Pytest",
        "Playwright",
        "Allure",
        "Page Object & Screen Object",
      ],
    },
    { name: "API testing", items: ["Postman", "Swagger", "Requests"] },
    { name: "Performance", items: ["JMeter", "Prometheus", "Grafana"] },
    {
      name: "Mobile",
      items: [
        "Appium + Python (Android)",
        "Screen Object",
        "emulators & real devices",
      ],
    },
    {
      name: "Databases",
      items: [
        "PostgreSQL",
        "MsSQL",
        "SQLAlchemy / SQLModel",
        "queries · data validation",
      ],
    },
    {
      name: "CI/CD & infra",
      items: [
        "GitHub Actions",
        "Azure DevOps",
        "Docker",
        "Docker Compose",
        "AWS",
        "Linux / bash",
        "Git",
      ],
    },
    {
      name: "QA process",
      items: [
        "Test design",
        "Test documentation",
        "Qase",
        "Jira",
        "Agile / Scrum",
      ],
    },
    {
      name: "Also builds",
      items: [
        "Android",
        "Web (Django / Next.js)",
        "Claude Code skills & AI-assisted development",
      ],
    },
    { name: "Familiar with", items: ["k6", "Selenium", "JavaScript"] },
    { name: "Spoken", items: ["Ukrainian (native)", "English (B2)"] },
  ],
};

export type Role = {
  company: string;
  title: string;
  period: string;
  // one-line project/setting context, shown under the heading without a bullet
  context?: string;
  bullets: string[];
};

export const experience: { windowTitle: string; roles: Role[] } = {
  windowTitle: "pankaz@portfolio: ~/experience",
  roles: [
    {
      company: "LNOKS",
      title: "QA Automation Engineer",
      period: "Dec 2025 – present",
      context:
        "Client project: EZBuild — multi-tenant construction-management SaaS for US general contractors (web + Android). Sole automation engineer in a 6-person team.",
      bullets: [
        "Built the E2E UI framework nearly from scratch (Python, pytest, Playwright, POM): 1,581 tests and 257 page objects across 7 functional areas; 70% of the ~2,000-case test base automated.",
        "CI on GitHub Actions: diff-based test selection, parallel shards on isolated tenants, merged reporting; a 137-test smoke suite gates every stage deploy.",
        "Android automation: ~100 tests with Appium (Screen Object) on emulators and real devices.",
        "JMeter load tests (9 scenarios, up to 1,000 users) with Prometheus + Grafana, weekly on AWS — exposed bottlenecks that led to autoscaling and DB optimizations.",
        "Built Claude Code skills for Qase test cases and Jira bug reports — case authoring went from ~10 a day to ~100 an hour; adopted company-wide.",
        "Verified data in PostgreSQL (SQLAlchemy); worked directly with the US client in English — demos, grooming, weekly syncs.",
      ],
    },
    {
      company: "Infopulse",
      title: "Quality Control Engineer (QA Automation)",
      period: "Dec 2021 – Sep 2025",
      context:
        "Internal time-tracking system used company-wide (~2,000 employees). Sole automation engineer in a 7-person team.",
      bullets: [
        "Started in manual QA; moved to automation within six months and built the framework from scratch (Python, pytest, Playwright, Page Object).",
        "~500 UI and API tests covering 80%+ of critical functionality — regression cut from 3 days to a ~5-hour automated run.",
        "MS SQL validation after UI actions; DB-level test preconditions and cleanup.",
        "Azure DevOps pipelines run the suite on every commit.",
      ],
    },
    {
      company: "Kyiv clinical hospitals",
      title: "Anesthesiologist",
      period: "2010 – 2022",
      context: "Alexander Clinical Hospital, International Neurosurgery Center.",
      bullets: [
        "A decade of precision-critical decisions, protocol-driven work, and high-stakes responsibility under pressure — the foundation of how I approach quality, risk, and verification today.",
      ],
    },
  ],
};

export const education = {
  title: "Education",
  items: [
    {
      name: "Medicine",
      place: "Bogomolets National Medical University, Kyiv",
      period: "2004 – 2010",
    },
    {
      name: "Residency",
      place: "Shupyk National Medical Academy of Postgraduate Education",
      period: "2010 – 2012",
    },
    {
      name: "Certificate: Fundamentals of Software Testing",
      place: "QATestLab",
      period: "",
    },
  ],
};

export type Project = {
  name: string;
  blurb: string;
  what: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: { windowTitle: string; intro: string; items: Project[] } = {
  windowTitle: "pankaz@portfolio: ~/projects",
  intro:
    "I build real systems end-to-end — so I understand what I test — and I automate everything: scraping, pipelines, CI, infra.",
  items: [
    {
      name: "Mirrolit — bilingual e-book reader (Android)",
      blurb:
        "An Android reader that shows the original text and a live translation side by side — EPUB, FB2 and MOBI, on-device translation with ML Kit and offline models. In closed testing on Google Play.",
      what: "Built with Claude Code and covered by unit and instrumented tests — I test what I build.",
      stack: ["Kotlin", "Jetpack Compose", "ML Kit", "Room", "Claude Code"],
      links: [{ label: "GitHub", href: "https://github.com/p-nk-ss/SplitReader" }],
    },
    {
      name: "LabLib — Android app (AI-assisted)",
      blurb:
        "A native Android app that interprets lab results, built largely through agentic AI development (Claude Code) and shipped end-to-end from product planning to deployment.",
      what: "Proves I can build and reason about the same mobile apps I write automation for.",
      stack: ["Android", "Kotlin", "Claude Code"],
      links: [],
    },
    {
      name: "News pipeline → Telegram",
      blurb:
        "v1: a Python bot — Playwright scraping, RabbitMQ queues, OpenAI API for processing. v2 (live): a self-hosted n8n pipeline on Hetzner — scheduled scraping, translation and filtering, hash-based de-duplication in PostgreSQL, auto-publishing to Telegram.",
      what: "Rebuilt the system when v1 stopped fitting — owning the whole stack, not just the tests on top of it.",
      stack: ["Python", "Playwright", "RabbitMQ", "OpenAI API", "n8n", "PostgreSQL", "Hetzner"],
      links: [{ label: "Live", href: "https://t.me/self_games_news" }],
    },
    {
      name: "protocols.pankaz.dev",
      blurb:
        "A clean, structured reference site of translated anesthesiology clinical guidelines (e.g. the DAS 2025 difficult-airway guidelines) — recreated as styled HTML with algorithm diagrams.",
      what: "Brings medical domain knowledge and engineering together, built fast with AI-assisted development.",
      stack: ["Next.js", "Claude Code"],
      links: [
        { label: "Live", href: "https://protocols.pankaz.dev" },
      ],
    },
  ],
};

export const aiBlock = {
  windowTitle: "pankaz@portfolio: ~/ai-assisted",
  quote:
    "I use agentic AI tooling (Claude Code) to ship real products — two Android apps, a clinical protocols site — and to speed up QA itself: my Claude Code skills for test cases and bug reports took case authoring from ~10 a day to ~100 an hour and are now used company-wide. AI-generated output gets the same treatment as any other code: review, test, verify.",
};

export const contact = {
  windowTitle: "pankaz@portfolio: ~/contact",
  intro: "Open to remote and hybrid roles. The fastest ways to reach me:",
  location: "Kyiv, Ukraine",
  email: "pankaz6jha@gmail.com",
  links: [
    { label: "Email", value: "pankaz6jha@gmail.com", href: "mailto:pankaz6jha@gmail.com" },
    {
      label: "LinkedIn",
      value: "pankaz-jha",
      href: "https://www.linkedin.com/in/pankaz-jha-51b225220/",
    },
    { label: "GitHub", value: "p-nk-ss", href: "https://github.com/p-nk-ss" },
    { label: "Telegram", value: "@self_pankass", href: "https://t.me/self_pankass" },
  ],
  cvHref: "/Pankaz_Jha_QA_Automation_Engineer.pdf",
};

/** Sections that appear in the panel nav and dock. */
export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
