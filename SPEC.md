# SPEC.md — Personal Resume / Portfolio Website

> Source of truth for the project. Read this fully before touching code.
> Companion file: `PLAN.md` (the phased execution plan).

---

## 1. Goal

A single-page personal website that works as an online CV / business card. It must:

- Present the owner's experience in a more polished, scannable, "alive" form than a PDF.
- Impress recruiters and hiring managers (HR) on first scroll — fast load, strong hero, clear story.
- Live on the owner's own Cloudflare-managed domain.
- Be visually striking: tasteful motion, smooth scroll, micro-interactions — *refined, not a disco*.

The defining hook: **the medicine → software transition** (anesthesiology → engineering). This is a rare, memorable differentiator and must be front-and-center, not buried.

---

## 2. Audience

Primary: technical recruiters, hiring managers, and engineering leads — both **international** (English) and **Ukrainian** (local market). Design copy and tone for skim-reading on desktop and mobile.

---

## 3. Owner profile (starting material)

> `resume.pdf` (in project root) is the **canonical source of truth** for facts, dates, and wording.
> The notes below are known context to seed structure and the narrative — reconcile everything against the PDF; if they conflict, the PDF wins. Flag any discrepancies instead of guessing.

- **Background:** dual — clinical medicine (anesthesiology) + software engineering. Career narrative: clinician → QA automation engineer → multi-disciplinary developer.
- **Engineering domains:**
  - **Mobile / Android:** Kotlin, Jetpack Compose, Room, Hilt, Clean Architecture.
  - **QA Automation:** Python, pytest, Playwright (sync API, page-object), Appium (mobile), Qase TMS.
  - **Web:** Next.js, React, TypeScript.
- **Selected projects (confirm/expand from PDF):**
  - **LabLib** — Android app interpreting lab results (PDF parsing + LLM-backed interpretation, Ukrainian lab support). Repo: `p-nk-ss/LabLib`.
  - **ezbuild_qa_auto** — QA automation suite (pytest + Playwright + Appium).
  - **Medical association web rebuilds** — WordPress → Next.js migrations (e.g. aaukr.org, bpr.kyiv.ua).
  - **DAS-2025-UA** — full Ukrainian translation of the Difficult Airway Society 2025 guidelines (styled HTML + recreated algorithm diagrams).
- **Community / leadership:** leads a Ukrainian anesthesiology association; runs community Telegram channels.
- **Languages:** Russian, Ukrainian, English (fluent in all three).
- **Location:** Ukraine.

---

## 4. Tech stack & decisions

| Area | Choice | Rationale |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Owner's stack; great SEO + metadata; future-proof for portfolio growth. |
| Rendering | **Static export** (`output: 'export'`) | Resume site needs no live server. Pure static = fastest + cheapest + most robust on Cloudflare. |
| Styling | **Tailwind CSS** | Fast, consistent design tokens. |
| Animation | **Motion** (formerly Framer Motion, pkg `motion`) | Declarative entrance + scroll + hover animations. |
| Smooth scroll | **Lenis** (pkg `lenis`) | Buttery scroll feel that anchors the whole "premium" impression. |
| Components (optional) | **shadcn/ui** | Only if useful; keep the bundle lean. |
| Hosting | **Cloudflare Pages** | Owner already in Cloudflare ecosystem; global CDN; generous free tier; one-click custom domain since DNS is already on Cloudflare. |
| Repo | `p-nk-ss/portfolio` (github.com/p-nk-ss/portfolio) | Auto-deploy from `main`. |

**Version note:** my knowledge has a cutoff — before scaffolding, verify the **current stable** versions of Next.js, React, Tailwind, and `motion`, and the **current Cloudflare static-hosting story** (Cloudflare has been unifying Pages and Workers Static Assets; confirm against current Cloudflare docs and pick whichever is the recommended path for a static Next.js export today).

**Static-export gotchas to handle up front:**
- `next.config`: `output: 'export'`, `images: { unoptimized: true }` (no image optimization server in a static export).
- No server-only features (no API routes, no server actions, no ISR). If any are ever needed later, switch to the Cloudflare Next.js adapter — out of scope for v1.

---

## 5. Design direction — LOCKED

**Concept: a modern Linux desktop environment.** A polished, designer-grade "rice" aesthetic (think a tastefully themed GNOME desktop) — *not* a retro OS and *not* a green-on-black hacker terminal. It signals "I build clean front-ends" while staying contemporary and credible to a young, non-deeply-technical HR audience.

**Canonical visual reference:** `design/hero-reference.html` (the approved hero mockup — keep it in the repo and match it). Build the real hero to that fidelity, then extend the same language to the other sections.

**Principle:** taste over spectacle. The desktop framing is the personality; the *content stays effortlessly scannable* (this was an explicit requirement — non-technical recruiters must never hit a wall of mono/code).

### Theme & palette
- **Catppuccin Mocha** (dark) is the default theme. Core tokens:
  - bg: base `#1e1e2e`, mantle `#181825`, crust `#11111b`
  - surfaces: `#313244` / `#45475a` / `#585b70`, overlay `#6c7086`
  - text: `#cdd6f4`, subtext `#bac2de` / `#a6adc8`
  - accents: blue `#89b4fa`, lavender `#b4befe`, mauve `#cba6f7`, pink `#f5c2e7`, red `#f38ba8`, peach `#fab387`, green `#a6e3a1`, teal `#94e2d5`
  - accent usage: mauve/blue lead; green reserved for the heart monitor; red for the window-close hover.
- **Catppuccin Latte** (light) is a future toggle — see backlog, not v1-blocking.
- Wallpaper = soft multi-stop radial gradient (mauve + blue + faint teal) over base. No harsh neon.

### Typography
- **Display (name, headings):** `Sora` (500/600/700) — geometric, modern.
- **UI / body:** `Inter` (400/500/600) — body copy and longer text live here for readability.
- **Mono accents:** `JetBrains Mono` — prompts, window titles, chips, monitor labels. Decorative only; never set body paragraphs in mono.

### Desktop metaphor & layout
- **Top panel:** `Activities` + workspace pager (active workspace highlighted) + live clock + tray icons (network/volume/battery). Doubles as persistent nav.
- **Floating dock (bottom):** rounded, blurred, app icons that lift on hover. Dock icons map to site sections (About / Projects / Contact / CV) — clicking scrolls to / "opens" that section's window.
- **Windows:** rounded corners (~14px), soft shadow, 1px translucent border. GNOME-style header bar: traffic-light dots (left) + centered mono title (e.g. `pankaz@portfolio: ~`) + round close button (reddens on hover).
- **Section strategy (hybrid):** the hero is the live "desktop" with the About window open. Lower sections (Projects, Experience, Contact) are presented as themed windows/cards in the same language but laid out for normal top-to-bottom scanning — do **not** force users to literally drag/open windows to read content. Concept on top, usability underneath.
- Mobile-first; windows reflow to stacked full-width cards; panel and dock stay.

### Signature element
The **heart-rate "system monitor" widget** — a conky-style panel with a live phosphor-green heartbeat graph (`heart_rate.monitor`, `72 bpm`, `uptime: since med school`). This is the medicine→engineering bridge, expressed in Linux-desktop vocabulary (reads as a resource monitor). Keep exactly one such motif; don't over-medicalize the rest.

### Motion vocabulary
- Entrance: windows + dock pop in with a short staggered scale/fade (snappy, "apps opening").
- Ambient: live heart-rate canvas, live panel clock, blinking terminal cursor in the hero prompt.
- Micro-interactions: dock icons lift on hover, buttons lift on hover/press, close button hover state.
- **Reduced motion:** `prefers-reduced-motion` freezes the heart graph to a static trace, stops the cursor blink, and disables entrance animations. Everything must read correctly with all motion off.

**Consult the design skills** during build: `frontend-design` and the owner's `ui-ux-pro-max` skill for tokens, spacing, and polish.

---

## 6. Content model (sections)

**Positioning — target roles: QA automation.** Lead with QA automation as the primary identity. Frame the anesthesiology background as the *rigor* story: monitoring, checklists, protocol discipline, catching failures before they reach the patient → systematic, risk-aware verification (a naturally compelling narrative for test engineering). Frame Android + web development as supporting evidence — a tester who also ships production apps understands what they're testing, so breadth strengthens rather than dilutes. Emphasis order: hero role line is QA-forward; Skills and Projects lead with QA (Python, pytest, Playwright, Appium, Qase TMS, page-object, CI; `ezbuild_qa_auto` as the flagship), with dev work as second-tier proof.

Order, top → bottom. Final copy comes from `resume.pdf`; rewrite it to be punchy and result-oriented (verbs + outcomes, not duties).

1. **Hero** — name, role/title, one-line positioning statement built around the dual background, primary CTAs (Contact, Download CV/PDF).
2. **About** — the medicine→engineering story; what makes this combination valuable (domain expertise + clinical-grade rigor applied to software).
3. **Skills** — grouped: Mobile/Android · QA Automation · Web · Domain expertise (clinical/medical). Avoid generic skill bars; prefer grouped tags with brief context.
4. **Experience** — roles with concise, outcome-focused bullets (from PDF).
5. **Projects** — LabLib, ezbuild_qa_auto, medical-association rebuilds, DAS-2025-UA. Each: problem → what was built → stack → result, with live/repo links where public.
6. **Community / Beyond code** (optional) — anesthesiology association leadership, guideline translation, Telegram communities. Strong signal of initiative and communication.
7. **Contact** — email + relevant links (GitHub `p-nk-ss`, LinkedIn, Telegram if desired) + a clear "Download PDF CV" action serving `resume.pdf`.

**i18n — RESOLVED: English only for v1.** No locale routing/switcher. Owner is trilingual, so keep copy in plain, translatable strings (avoid baking English into images/SVG) to leave a clean seam for a future UK locale, but ship EN-only.

---

## 7. Non-functional requirements

- **Performance:** Lighthouse ≥ 95 on Performance/Best-Practices/SEO; LCP fast on mid-range mobile. Lazy-load heavy/below-the-fold assets; keep JS lean; prefer CSS transforms/opacity for animation.
- **Accessibility:** WCAG 2.1 AA — semantic landmarks, keyboard navigation, focus states, sufficient contrast, alt text. **Honor `prefers-reduced-motion`** (disable/soften animations). Site must be fully usable with JS-driven motion off.
- **SEO + social:** proper `<title>`/meta description, canonical URL, JSON-LD `Person` schema, sitemap + robots. **Open Graph / Twitter cards** with a custom OG image so the link looks great when shared in messengers/email.
- **Responsive:** mobile-first; verify common breakpoints (360 / 768 / 1024 / 1440).
- **Privacy/analytics:** if analytics wanted, use Cloudflare Web Analytics (cookieless). Optional.

---

## 8. Out of scope (v1)

CMS/blog, server-side features (API routes, auth, forms backend), e-commerce, multi-page routing beyond anchors. Keep v1 a single beautiful page; leave clean seams to extend into a full portfolio later.

---

## 9. Open items to confirm with the owner

- ~~**Domain**~~ — RESOLVED: **`cv.pankaz.dev`** (subdomain of `pankaz.dev`). Alternative `portfolio.pankaz.dev` left as a fallback. Note: `.dev` is HSTS-preloaded → HTTPS only; Cloudflare Pages provides the cert automatically. Prerequisite: confirm `pankaz.dev` is managed in Cloudflare DNS (it should be) so the subdomain attaches in one click.
- ~~**Repo**~~ — RESOLVED: `github.com/p-nk-ss/portfolio`.
- ~~**i18n**~~ — RESOLVED: English only for v1.
- ~~**Contact channels**~~ — RESOLVED: email, Telegram, LinkedIn and GitHub are all in `resume.pdf`; extract them in Phase 0 and surface them in the Contact section + dock.

Leave `TODO:`-tagged placeholders for any unconfirmed item rather than inventing values.
