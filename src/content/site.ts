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
    { label: "CI/CD · Docker", accent: "peach" as const },
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
    { k: "coverage", v: "80%+ critical paths automated" },
    { k: "location", v: "Kyiv, UA · remote / hybrid" },
    { k: "langs", v: "Ukrainian (native) · English (B2)" },
    { k: "uptime", v: "since med school" },
  ] as const,
};

export const about = {
  title: "About",
  windowTitle: "pankaz@portfolio: ~/about",
  paragraphs: [
    "For twelve years I was an anesthesiologist — a job built on protocols, relentless monitoring, and catching problems before they ever reach the patient. I bring that exact discipline to QA automation.",
    "Today I build test automation from the ground up: scalable Python frameworks covering UI, API, database, mobile, and performance, integrated into CI/CD so quality is checked on every commit instead of at the finish line. I've automated more than 80% of critical paths and cut regression cycles from days to hours.",
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
        "Selenium",
        "Allure",
        "Page Object & Screen Object",
      ],
    },
    { name: "API testing", items: ["Postman", "Swagger", "Requests"] },
    { name: "Performance", items: ["JMeter", "k6", "Grafana"] },
    { name: "Mobile", items: ["Appium + Python (Android)"] },
    {
      name: "Databases",
      items: ["PostgreSQL", "MsSQL", "queries · data validation"],
    },
    {
      name: "CI/CD & infra",
      items: ["GitHub Actions", "Azure DevOps (TFS)", "Docker", "Git"],
    },
    {
      name: "Also builds",
      items: [
        "Android",
        "Web (Django / Next.js)",
        "AI-assisted development (Claude Code)",
      ],
    },
    { name: "Other languages", items: ["JavaScript", "C# (basic)"] },
    { name: "Spoken", items: ["Ukrainian (native)", "English (B2)"] },
  ],
};

export type Role = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
};

export const experience: { windowTitle: string; roles: Role[] } = {
  windowTitle: "pankaz@portfolio: ~/experience",
  roles: [
    {
      company: "LNOKS",
      title: "QA Automation Engineer",
      period: "2025 – present",
      bullets: [
        "Built a UI automation framework from scratch (Python + Playwright, Page Object Model) for a web application.",
        "Added Android mobile automation (Pytest + Appium, Screen Object pattern).",
        "Wired automated runs into CI with GitHub Actions, triggered on every feature update.",
        "Built API performance testing in JMeter — smoke (~200 virtual users) and load (~1,000 users) — with Grafana dashboards and scheduled remote runs for continuous monitoring.",
        "Introduced automation where there was none, making regression testing faster and feature validation automatic.",
      ],
    },
    {
      company: "Infopulse",
      title: "QA Engineer → QA Automation Engineer",
      period: "2022 – 2025",
      bullets: [
        "Built a Python automation framework from scratch (Playwright + Pytest) for a corporate time-tracking system.",
        "Automated 80%+ of critical functionality across UI, API, and DB — cutting regression time from days to hours.",
        "Integrated tests into Azure DevOps (TFS) pipelines to run on every commit.",
        "Drove new automation approaches and earlier defect detection by working closely with developers.",
      ],
    },
    {
      company: "Alexander Clinical Hospital",
      title: "Anesthesiologist",
      period: "2010 – 2022",
      bullets: [
        "A decade of precision-critical decisions, protocol-driven work, and high-stakes responsibility under pressure — the foundation of how I approach quality, risk, and verification today.",
      ],
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
      name: "LabLib — Android app (AI-assisted)",
      blurb:
        "A native Android app that interprets lab results, built largely through agentic AI development (Claude Code) and shipped end-to-end from product planning to deployment.",
      what: "Proves I can build and reason about the same mobile apps I write automation for.",
      stack: ["Android", "Kotlin", "Claude Code"],
      links: [{ label: "GitHub", href: "https://github.com/p-nk-ss/LabLib" }],
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
    {
      name: "Telegram news bot",
      blurb:
        "A news bot that scrapes the web with Playwright, processes messages asynchronously via RabbitMQ, and uses the OpenAI API for content processing.",
      what: "End-to-end async automation — the same Playwright skills I use for testing, applied to production scraping.",
      stack: ["Python", "PyTelegramBotAPI", "Playwright", "RabbitMQ", "OpenAI API"],
      links: [{ label: "Live", href: "https://t.me/self_games_news" }],
    },
    {
      name: "Self-hosted news workflow (n8n)",
      blurb:
        "A fully automated, self-hosted pipeline: scheduled scraping, parsing, translation and filtering; hash-based duplicate detection; structured storage in PostgreSQL; auto-publishes finished news to Telegram.",
      what: "Owns the whole stack — infra, data, scheduling — not just the tests on top of it.",
      stack: ["n8n", "PostgreSQL", "Adminer", "Hetzner", "Easypanel"],
      links: [],
    },
  ],
};

export const aiBlock = {
  windowTitle: "pankaz@portfolio: ~/ai-assisted",
  quote:
    "I use agentic AI tooling (Claude Code) to build and ship real products fast — an Android app, a clinical protocols site — and I apply the same QA discipline to AI-generated code that I apply to anything else: review, test, verify.",
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
  cvHref: "/cv.pdf",
};

/** Sections that appear in the panel nav and dock. */
export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
