# PLAN.md — Phased Implementation Plan

> Companion to `SPEC.md`. Execute phase by phase. **Stop at each `CHECKPOINT` and verify before moving on.**
> Recommended workflow: use `superpowers:writing-plans` to ratify this plan, then `superpowers:executing-plans` to drive execution. Consult `frontend-design` and `ui-ux-pro-max` skills during the build phases.
> Environment: Windows + Claude Code CLI + Node (use current LTS). Use the project's package manager consistently (npm/pnpm).

---

## Phase 0 — Discovery & content extraction

**Goal:** turn `resume.pdf` into structured, rewritten content before any code.

- [ ] Read `resume.pdf` from the project root and extract all facts: roles, dates, employers, skills, projects, education, contacts, languages.
- [ ] Reconcile against the profile notes in `SPEC.md §3`. List any conflicts; **PDF wins**, but surface discrepancies to the owner.
- [ ] Draft `content.md` (or `src/content/*.ts`): rewrite every bullet to be **outcome-oriented** (action verb + measurable result), tighten the hero positioning line around the medicine→tech story, and group skills per `SPEC.md §6`.
- [ ] Note all open items from `SPEC.md §9` and ask the owner where blocking; otherwise leave `TODO:` markers.

**CHECKPOINT 0:** content draft reviewed/approved by owner (or `TODO`s explicitly accepted). No code yet.

---

## Phase 1 — Scaffold

**Goal:** running Next.js app configured for static export.

- [ ] Verify current stable versions (Next.js, React, Tailwind, `motion`, `lenis`) before installing.
- [ ] Scaffold Next.js (App Router, TypeScript, Tailwind, ESLint).
- [ ] Configure static export: `output: 'export'`, `images: { unoptimized: true }`, set `trailingSlash` if needed for Cloudflare.
- [ ] Install `motion` and `lenis`. (Add `shadcn/ui` only if it earns its place.)
- [ ] Place `resume.pdf` in `public/` so it's downloadable at a stable URL.
- [ ] Init git, create repo `p-nk-ss/<repo>`, push initial commit.
- [ ] Add a minimal `CLAUDE.md` capturing project conventions (stack, package manager, "static export — no server features", code style) so future sessions stay aligned.

**CHECKPOINT 1:** `next build` produces a static `out/` with no errors; dev server renders a blank styled page.

---

## Phase 2 — Design system

**Goal:** tokens and primitives locked before building sections.

- [ ] Define palette (neutrals + one accent), dark theme default (light variant only if cheap).
- [ ] Define type scale + load chosen fonts (display + body) via `next/font`.
- [ ] Set spacing scale, radii, shadows, container widths in Tailwind config.
- [ ] Build base primitives: `Section`, `Container`, `Button`, `Link`, `Tag`, `Card`.
- [ ] Wire Lenis smooth scroll at the layout root; add a `useReducedMotion` guard.

**CHECKPOINT 2:** a tokens/preview page shows typography, colors, and primitives; smooth scroll works; reduced-motion disables it.

---

## Phase 3 — Sections (static, no fancy motion yet)

**Goal:** all content on the page, fully responsive, semantic, accessible — before polish.

Build in `SPEC.md §6` order, content wired from Phase 0:
- [ ] Hero (name, role, positioning line, CTAs incl. Download CV)
- [ ] About (the bridge narrative)
- [ ] Skills (grouped)
- [ ] Experience
- [ ] Projects (problem → built → stack → result, with links)
- [ ] Community / Beyond code (optional)
- [ ] Contact + footer
- [ ] Sticky/anchored nav with smooth-scroll links

Each section: semantic landmarks, real responsive behavior, keyboard-navigable, alt text.

**CHECKPOINT 3:** complete page readable and usable on mobile + desktop **with JS motion disabled**. Get owner sign-off on content/layout here — cheaper to fix before animation.

---

## Phase 4 — Motion & polish

**Goal:** the "красиво" layer, per `SPEC.md §5`.

- [ ] Hero entrance (staggered reveal; optional GPU-cheap background motif).
- [ ] Scroll-reveal for sections (fade + small translate, sensible stagger/thresholds).
- [ ] Micro-interactions: link/card/button hovers, animated underlines.
- [ ] Optional: the medicine→tech visual motif (conceptual, restrained).
- [ ] Re-verify `prefers-reduced-motion` softens/disables everything.
- [ ] Trim: drop any effect that hurts feel or performance. Taste over spectacle.

**CHECKPOINT 4:** motion feels smooth on mid-range mobile; no jank; reduced-motion path verified.

---

## Phase 5 — SEO, social, a11y, performance

- [ ] Metadata: title, description, canonical, lang; favicon + app icons.
- [ ] JSON-LD `Person` schema.
- [ ] Open Graph + Twitter cards; generate a custom OG image; verify the preview.
- [ ] `sitemap.xml` + `robots.txt`.
- [ ] Accessibility pass (WCAG 2.1 AA): contrast, focus order, landmarks, alt text, keyboard.
- [ ] Lighthouse pass — target ≥ 95 across Performance/Best-Practices/SEO; fix regressions.
- [ ] (Optional) Cloudflare Web Analytics (cookieless).

**CHECKPOINT 5:** Lighthouse targets met; OG preview looks right; a11y audit clean.

---

## Phase 6 — Deploy to Cloudflare Pages + domain

> Confirm the current Cloudflare recommended path for static Next.js before starting (Pages vs Workers Static Assets).

- [ ] Create a Cloudflare Pages project connected to the GitHub repo.
- [ ] Build settings — framework: Next.js (static export); build command: `next build`; output dir: `out`; set Node version.
- [ ] Confirm first deploy succeeds on the `*.pages.dev` preview URL.
- [ ] Attach the custom domain (one-click since DNS is already on Cloudflare); confirm SSL/HTTPS active.
- [ ] Verify auto-deploy on push to `main`.
- [ ] **Side-effectful steps (domain attach, DNS, deploy) are for the owner to confirm/perform in their Cloudflare account — do not assume authorization.** Prepare exact settings and hand them over.

**CHECKPOINT 6:** site live on the custom domain over HTTPS; push-to-deploy confirmed.

---

## Phase 7 — Launch QA

- [ ] Cross-browser + real-device check (mobile Safari/Chrome, desktop).
- [ ] All links/CTAs work; "Download CV" serves the right `resume.pdf`.
- [ ] Share the URL in a messenger to confirm the OG preview in the wild.
- [ ] Final Lighthouse on production.
- [ ] Resolve or log remaining `TODO:`s.

**CHECKPOINT 7:** owner final sign-off → done.

---

## Backlog (post-v1)

UK locale (full i18n), blog/writing section, project case-study pages, contact form (needs a backend → Cloudflare adapter or a form service), light-theme toggle if deferred.
