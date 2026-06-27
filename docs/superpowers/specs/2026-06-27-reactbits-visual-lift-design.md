# ReactBits visual lift — design spec

**Date:** 2026-06-27
**Branch:** `feat/reactbits-setup`
**Status:** Approved design, pending implementation plan
**Approach:** A — additive / surgical, lightweight, within the locked visual direction

## Goal

Lift the portfolio's visuals using [ReactBits](https://reactbits.dev) animated
components **without breaking the locked visual direction** (Catppuccin Mocha +
Linux-desktop metaphor, benchmarked to `hero-reference.html`). ReactBits is used
strictly as progressive-enhancement accents layered on top of the existing
structure — never as the structure itself.

## Scope decisions (locked with owner)

- **Scope:** Enhance within the lock. Keep palette, desktop metaphor, layout.
- **Weight:** Lightweight only. Motion- and CSS-based ReactBits components.
  **No WebGL** (no `ogl`, no `three`), **no `gsap`** (rules out `SplitText`).
- **Targets:** Hero, Experience cards, Projects cards, Skills, with consistent
  section entrances site-wide.
- **Dropped:** Stat strip + `CountUp` (would add a new layout band — out of lock).

## Non-negotiable constraints (from CLAUDE.md / SPEC.md)

1. **Static export** — no server features. Builds to a static `out/`.
2. **Usable with JS motion off** — the site must read fully without JS.
3. **`prefers-reduced-motion`** honored — no motion, content at final state.
4. **WCAG 2.1 AA**, **Lighthouse ≥ 95**.
5. **No text baked into images/SVG** — copy stays in `src/content/*` strings.
6. Fonts: Sora / Inter / JetBrains Mono (mono = accent only, never body).

## Architecture — two motion layers

**Layer 0 — structural (existing, unchanged).**
The current CSS motion system owns section entrance and content visibility:
- `.anim-pop`, `.anim-fade` — on-load entrance (CSS, no JS).
- `.reveal` — scroll-driven via `animation-timeline: view()` (CSS, no JS, no
  IntersectionObserver).
- `motion` + `lenis` for smooth scroll.

All of this is no-JS- and reduced-motion-safe by construction. **We do not touch
it.** It remains the single owner of "is this content visible / has it entered".

**Layer 1 — accent (new, ReactBits).**
ReactBits client islands mount *inside already-visible* structure and animate
**only decorative properties** (blur-in, shimmer, glow, hover tilt, stagger).
They never gate whether content is visible.

This is the core invariant: **Layer 1 must never own visibility.** If every
ReactBits component were removed, the site would look identical minus the
decorative flourishes.

## The guard pattern (the rule that protects the hard constraints)

**Problem:** ReactBits text components initialize at `opacity: 0` and animate in
on mount. Under static export their SSR HTML therefore contains invisible text —
which is blank under no-JS and wrong under reduced-motion. That violates
constraints (2) and (3).

**Solution:** every ReactBits element is consumed through a thin wrapper in
`src/components/fx/`. The wrapper renders the **final static state by default**
and only upgrades to the animated version after mount when motion is allowed:

```
const reduced = useReducedMotion();          // from "motion/react"
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted || reduced) return <StaticFinalText />;  // SSR / no-JS / reduced-motion
return <ReactBitsAnimated />;                          // JS + motion allowed
```

- SSR / no-JS / reduced-motion → real, visible, final-state text.
- JS + motion allowed → the animation.
- Both branches render the **same text content**, so hydration is safe
  (`suppressHydrationWarning` is already set on `html`/`body`).

**Rule:** no raw ReactBits component appears in section JSX. Sections import only
from `src/components/fx/`.

## Per-section mapping

| Section    | Enhancement                                  | ReactBits base | Dep      |
|------------|----------------------------------------------|----------------|----------|
| Hero       | `hero.name` headline blur-in                 | BlurText       | motion ✓ |
| Hero       | `hero.role` accent shimmer                   | ShinyText      | CSS, 0   |
| Hero       | `hero.tagline` word reveal                   | BlurText       | motion ✓ |
| Skills     | per-tag staggered pop on scroll-in           | AnimatedContent| motion ✓ |
| Experience | card mouse-follow glow + hover lift          | SpotlightCard  | 0 dep    |
| Projects   | card mouse-follow glow + hover lift (same)   | SpotlightCard  | 0 dep    |

Notes:
- Hero stays a **server component**; the FX above are small client islands
  embedded in it (`hero.name`, `hero.role`, `hero.tagline` slots only).
- The ECG-behind-name motif, blink cursor, neofetch panel, and window chrome are
  preserved. Spotlight is purely additive over the existing card chrome.
- Experience and Projects share one `SpotlightCard` wrapper for a consistent
  hover language.

## Dependencies

**Zero new heavy dependencies.** All chosen components are motion-based
(`motion` is already a dependency, added when BlurText was installed) or pure
CSS. Explicitly excluded: `gsap` / `@gsap/react` (SplitText, etc.) and all
WebGL backgrounds (`ogl`, `three`).

## File structure

```
src/components/
  reactbits/            # raw ReactBits drops (shadcn target → @/components/reactbits)
    BlurText.tsx        # already added
    ShinyText.tsx
    AnimatedContent.tsx
    SpotlightCard.tsx
  fx/                   # guarded, Catppuccin-configured wrappers — the ONLY thing sections import
    HeroHeadline.tsx    # BlurText, guarded
    ShinyAccent.tsx     # ShinyText, guarded
    StaggerTags.tsx     # AnimatedContent, guarded
    SpotlightCard.tsx   # SpotlightCard, guarded + token colors
    fx-config.ts        # shared durations / easing / glow color + alpha
  sections/             # import only from fx/
  ui/ desktop/ ...      # unchanged
```

- `components.json` `aliases.components` is set to `@/components/reactbits`, so
  `npx shadcn@latest add @react-bits/<Comp>-TS-TW` lands raw components in
  `src/components/reactbits/`.
- `aliases.utils` stays `@/lib/cn` (reuse the existing tiny `cn`, no
  `clsx`/`tailwind-merge`).

## Token integration

- All ReactBits color props are fed Catppuccin tokens
  (`text-mauve`, `--color-lavender`, etc.).
- `SpotlightCard` glow color = lavender/mauve at low alpha, matching the existing
  body radial-gradient background.
- `fx-config.ts` centralizes durations and easing so the accent motion language
  matches the existing `.reveal` / `.anim-pop` curves
  (`cubic-bezier(0.2, 0.9, 0.3, 1)`).

## Performance & accessibility

- No WebGL, minimal incremental JS → Lighthouse ≥ 95 preserved.
- Every wrapper honors `prefers-reduced-motion` (final static state).
- No-JS renders real text (guard pattern) — no `opacity: 0` orphans.
- Mono font stays accent-only; no copy baked into images/SVG.

## Verification

1. `npm run build` → clean static `out/`, no errors.
2. Reduced-motion emulation on → all enhanced text static and visible; cards
   show no motion.
3. JS-off / view-source check → enhanced text present in HTML, no orphaned
   `opacity: 0` text.
4. Optional: Playwright before/after screenshots of Hero, Experience, Projects,
   Skills.

## Out of scope

- Stat strip / `CountUp`.
- WebGL backgrounds (Aurora, Threads, Silk, Dither, etc.).
- `gsap`-based components (SplitText, Shuffle, etc.).
- Any layout, palette, or copy change.
- Contact / Footer / AiBlock enhancements (may be revisited later).
