@AGENTS.md

# Portfolio — project conventions

Personal resume/portfolio for Pankaz Jha. Single-page site styled as a modern Linux desktop (Catppuccin Mocha).

## Sources of truth
- `SPEC.md` — locked tech + design decisions, NFRs.
- `PLAN.md` — phased plan + checkpoint gates.
- `content.md` — approved final copy (supersedes SPEC §3 and the old copy in `hero-reference.html`).
- `hero-reference.html` — approved **visual** benchmark (repo root). Match its language; wire `content.md` copy.
- Active execution plan: `~/.claude/plans/claude-code-piped-micali.md`.

## Stack
- Next.js 16 (App Router, TypeScript) — **static export** (`output: 'export'`, `images.unoptimized`, `trailingSlash`).
- Tailwind CSS **v4** — CSS-first config via `@import "tailwindcss"` + `@theme` in `src/app/globals.css`. **No `tailwind.config.js`.** PostCSS plugin: `@tailwindcss/postcss`.
- `motion` (entrance/scroll/hover) + `lenis` (smooth scroll).
- Package manager: **npm**. Node 22.

## Hard rules
- **No server features** — no API routes, server actions, or ISR. Must build to a static `out/`.
- Fonts: Sora (display) / Inter (body) / JetBrains Mono (mono accents only — never body paragraphs). Load via `next/font`.
- Palette: Catppuccin Mocha (tokens mirror `hero-reference.html` `:root`).
- Honor `prefers-reduced-motion`; site fully usable with JS motion off. WCAG 2.1 AA. Lighthouse ≥ 95.
- English only. Keep copy as translatable strings in `src/content/*` (clean i18n seam) — don't bake text into images/SVG.

## Conventions
- App code under `src/` (`@/*` → `src/*`). Sections in `src/components/sections/`, primitives in `src/components/ui/`, copy in `src/content/`.
- Next 16 has breaking changes from older versions — check `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Boundaries (owner does these, not the agent)
Cloudflare Pages/Workers project creation, domain attach, DNS, the deploy, and any secret/remote push are the owner's to run. Prepare exact settings/commands and hand them over.

## Verify
- `npm run build` → static `out/` with no errors. `npm run dev` to preview.
