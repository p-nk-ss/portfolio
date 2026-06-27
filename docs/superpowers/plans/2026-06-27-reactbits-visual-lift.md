# ReactBits Visual Lift Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add lightweight ReactBits animated accents (blur-in text, shimmer, spotlight cards, staggered reveals) to the portfolio without altering its locked Catppuccin / Linux-desktop look or breaking its no-JS / reduced-motion guarantees.

**Architecture:** Two motion layers. Layer 0 (existing CSS `.anim-pop`/`.reveal`) keeps owning content visibility — untouched. Layer 1 (new ReactBits client islands in `src/components/fx/`) animates decorative properties only, behind a guard that renders the final static state for SSR / no-JS / reduced-motion and upgrades to animation only after mount.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind v4 (css-first), `motion` (already a dep), ReactBits via the `@react-bits` shadcn registry.

## Global Constraints

- **Static export** — no server features; must build to static `out/` (`output: 'export'`).
- **Usable with JS off** — every enhanced element renders real, final-state text in SSR HTML (no orphan `opacity: 0`).
- **`prefers-reduced-motion: reduce`** — no motion; content at final state.
- **WCAG 2.1 AA**, **Lighthouse ≥ 95**.
- **No new heavy deps** — motion-based or pure-CSS ReactBits only. Forbidden: `gsap`, `@gsap/react`, `ogl`, `three`, `framer-motion`, `clsx`, `tailwind-merge`.
- **Copy stays in `src/content/site.ts`** — no text baked into images/SVG.
- **Fonts:** Sora (display) / Inter (body) / JetBrains Mono (mono accent only).
- **Vendored ReactBits raw files** land in `src/components/reactbits/` (shadcn `components` alias). Sections import **only** from `src/components/fx/` — never raw ReactBits.
- **Classname joiner:** reuse `cn` from `@/lib/cn` (no clsx/tailwind-merge).
- **Add command** for any ReactBits component: `npx shadcn@latest add @react-bits/<Name>-TS-TW --yes --overwrite`.

---

## File Structure

```
src/components/
  reactbits/                 # vendored raw ReactBits (TS-TW). Do not import directly from sections.
    BlurText.tsx             # already vendored
    ShinyText.tsx            # Task 2
    SpotlightCard.tsx        # Task 3
    AnimatedContent.tsx      # Task 4
  fx/                        # guarded, Catppuccin-configured wrappers — sections import ONLY these
    useMotionReady.ts        # Task 1 — mount + reduced-motion gate hook
    fx-config.ts             # Task 1 — shared durations / easing / glow color
    TaglineBlur.tsx          # Task 2 — guards BlurText for the hero tagline (<p>)
    ShinyAccent.tsx          # Task 2 — guards ShinyText for the hero role (<span>)
    Spotlight.tsx            # Task 3 — guards SpotlightCard, token-colored
    StaggerItem.tsx          # Task 4/5 — guards AnimatedContent for one item, index delay
  sections/                  # modified to consume fx/ wrappers
    Hero.tsx                 # Task 2
    Projects.tsx             # Task 3
    Skills.tsx               # Task 4
    Experience.tsx           # Task 5
```

**No automated unit-test harness exists in this repo** (no jest/vitest), and adding one for visual wrappers is out of scope. Per-task verification is therefore `npm run build` (the project's stated gate) plus, in the final task, a Playwright check of the guard invariant (text present with JS disabled and under reduced-motion). Every task that changes a component ends by confirming a clean `npm run build`.

---

### Task 1: FX foundation — guard hook + shared config

**Files:**
- Create: `src/components/fx/useMotionReady.ts`
- Create: `src/components/fx/fx-config.ts`

**Interfaces:**
- Consumes: `useReducedMotion` from `motion/react`.
- Produces:
  - `useMotionReady(): boolean` — `true` only when mounted in the browser AND motion is allowed. Used by every fx wrapper to choose the animated vs static branch.
  - `FX` object: `{ blurStep: number; blurDelayMs: number; staggerStepMs: number; ease: number[]; spotlightColor: string; }`.

- [ ] **Step 1: Write the guard hook**

Create `src/components/fx/useMotionReady.ts`:

```ts
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Layer-1 guard. Returns true ONLY after client mount and only when the user
 * allows motion. Wrappers render the final static state until this is true, so
 * SSR / no-JS / reduced-motion always shows real content (never opacity:0).
 */
export function useMotionReady(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !reduced;
}
```

- [ ] **Step 2: Write the shared config**

Create `src/components/fx/fx-config.ts`:

```ts
/**
 * Shared Layer-1 motion language. Mirrors the existing CSS easing
 * (cubic-bezier(0.2, 0.9, 0.3, 1)) so accents match Layer 0.
 */
export const FX = {
  blurStep: 0.35, // seconds per BlurText keyframe step
  blurDelayMs: 90, // per-word stagger for blur-in
  staggerStepMs: 45, // per-item delay for staggered reveals
  ease: [0.2, 0.9, 0.3, 1] as number[],
  // lavender at low alpha — matches the body radial-gradient background
  spotlightColor: "rgba(180, 190, 254, 0.18)",
} as const;
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: completes with no errors; `out/` produced. (New files are unused so far — this confirms they compile.)

- [ ] **Step 4: Commit**

```bash
git add src/components/fx/useMotionReady.ts src/components/fx/fx-config.ts
git commit -m "feat(fx): add motion-ready guard hook and shared fx config"
```

---

### Task 2: Hero — tagline blur-in + role shimmer

Adds the hero's primary text accent (tagline word blur) and a subtle shimmer on the role. The `<h1>` name is intentionally left structural (preserves the ECG-behind-name motif and `<h1>` semantics; BlurText renders a `<p>` and cannot wrap an `<h1>` validly).

**Files:**
- Add (shadcn): `src/components/reactbits/ShinyText.tsx`
- Create: `src/components/fx/TaglineBlur.tsx`
- Create: `src/components/fx/ShinyAccent.tsx`
- Modify: `src/components/sections/Hero.tsx` (tagline `<p>` at lines 88-90; role `<span>` at line 77)

**Interfaces:**
- Consumes: `useMotionReady` (Task 1), `FX` (Task 1), vendored `BlurText` (`@/components/reactbits/BlurText`), vendored `ShinyText` (`@/components/reactbits/ShinyText`).
- Produces:
  - `TaglineBlur({ text, className }: { text: string; className?: string }): JSX.Element`
  - `ShinyAccent({ text, className }: { text: string; className?: string }): JSX.Element`

- [ ] **Step 1: Vendor ShinyText**

Run: `npx shadcn@latest add @react-bits/ShinyText-TS-TW --yes --overwrite`
Expected: creates `src/components/reactbits/ShinyText.tsx`. Confirm no new dependency was installed (`git diff package.json` shows no change — ShinyText is pure CSS).

- [ ] **Step 2: Verify ShinyText has no forbidden import**

Run: `grep -nE "gsap|three|ogl|framer-motion" src/components/reactbits/ShinyText.tsx`
Expected: no matches.

- [ ] **Step 3: Write the TaglineBlur wrapper**

Create `src/components/fx/TaglineBlur.tsx`:

```tsx
"use client";

import BlurText from "@/components/reactbits/BlurText";
import { useMotionReady } from "./useMotionReady";
import { FX } from "./fx-config";

/**
 * Hero tagline. Animated branch = ReactBits BlurText (word blur-in).
 * Static branch = a plain <p> with identical text + classes, so SSR / no-JS /
 * reduced-motion renders the real, fully-visible tagline.
 */
export default function TaglineBlur({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const animate = useMotionReady();

  if (!animate) {
    return <p className={className}>{text}</p>;
  }

  return (
    <BlurText
      text={text}
      className={className}
      animateBy="words"
      direction="bottom"
      delay={FX.blurDelayMs}
      stepDuration={FX.blurStep}
    />
  );
}
```

- [ ] **Step 4: Write the ShinyAccent wrapper**

Create `src/components/fx/ShinyAccent.tsx`. First check the vendored ShinyText prop names:

Run: `sed -n '1,40p' src/components/reactbits/ShinyText.tsx`
Expected: a component taking `text`, `disabled`, `speed`, `className` props (ReactBits ShinyText signature). If the prop names differ, adapt the call below to match.

```tsx
"use client";

import ShinyText from "@/components/reactbits/ShinyText";
import { useMotionReady } from "./useMotionReady";

/**
 * Inline shimmer accent (hero role). Animated branch = ReactBits ShinyText.
 * Static branch = a plain <span> with identical text + classes.
 */
export default function ShinyAccent({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const animate = useMotionReady();

  if (!animate) {
    return <span className={className}>{text}</span>;
  }

  return <ShinyText text={text} className={className} speed={5} />;
}
```

- [ ] **Step 5: Wire the tagline in Hero**

In `src/components/sections/Hero.tsx`, add the import near the other imports (after line 5):

```tsx
import TaglineBlur from "@/components/fx/TaglineBlur";
import ShinyAccent from "@/components/fx/ShinyAccent";
```

Replace the tagline block (lines 88-90):

```tsx
                <p className="mt-5 max-w-[46ch] font-display text-lg text-text">
                  {hero.tagline}
                </p>
```

with:

```tsx
                <TaglineBlur
                  text={hero.tagline}
                  className="mt-5 max-w-[46ch] font-display text-lg text-text"
                />
```

- [ ] **Step 6: Wire the role in Hero**

Replace the role span (line 77):

```tsx
                      <span className="font-semibold text-mauve">{hero.role}</span>
```

with:

```tsx
                      <ShinyAccent text={hero.role} className="font-semibold text-mauve" />
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: clean build, `out/` produced, no errors.

- [ ] **Step 8: Confirm static text is in the SSR HTML**

Run: `grep -o "From the operating room to the CI pipeline" out/index.html`
Expected: one match (proves the tagline text is server-rendered, not JS-only).

Run: `grep -o "QA Automation Engineer" out/index.html | head -1`
Expected: at least one match (role text present).

- [ ] **Step 9: Commit**

```bash
git add src/components/reactbits/ShinyText.tsx src/components/fx/TaglineBlur.tsx src/components/fx/ShinyAccent.tsx src/components/sections/Hero.tsx
git commit -m "feat(hero): blur-in tagline and shimmer role via guarded ReactBits"
```

---

### Task 3: Projects — spotlight cards

Replaces the Projects card container with a guarded SpotlightCard (mouse-follow lavender glow) while preserving the existing card chrome, hover-lift, and all inner content.

**Files:**
- Add (shadcn): `src/components/reactbits/SpotlightCard.tsx`
- Create: `src/components/fx/Spotlight.tsx`
- Modify: `src/components/sections/Projects.tsx` (the `<Card>` wrapper at lines 22-25 and its closing `</Card>` at line 67)

**Interfaces:**
- Consumes: `useMotionReady` (Task 1), `FX` (Task 1), vendored `SpotlightCard` (`@/components/reactbits/SpotlightCard`), `cn` (`@/lib/cn`).
- Produces:
  - `Spotlight({ className, children }: { className?: string; children: React.ReactNode }): JSX.Element` — a card surface. Animated branch adds the spotlight glow; static branch is a plain styled `<div>`. Both apply the same base card classes so the layout is identical.

- [ ] **Step 1: Vendor SpotlightCard**

Run: `npx shadcn@latest add @react-bits/SpotlightCard-TS-TW --yes --overwrite`
Expected: creates `src/components/reactbits/SpotlightCard.tsx`. Confirm `git diff package.json` shows no new dependency (SpotlightCard is CSS + a pointer handler, no deps).

- [ ] **Step 2: Verify no forbidden import**

Run: `grep -nE "gsap|three|ogl|framer-motion" src/components/reactbits/SpotlightCard.tsx`
Expected: no matches.

- [ ] **Step 3: Inspect SpotlightCard props**

Run: `sed -n '1,40p' src/components/reactbits/SpotlightCard.tsx`
Expected: a `'use client'` component taking `children`, `className`, and `spotlightColor` props. If prop names differ, adapt the call in Step 4 accordingly.

- [ ] **Step 4: Write the Spotlight wrapper**

Create `src/components/fx/Spotlight.tsx`:

```tsx
"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { cn } from "@/lib/cn";
import { useMotionReady } from "./useMotionReady";
import { FX } from "./fx-config";

const BASE =
  "rounded-card border border-white/[0.07] bg-mantle/60 p-5 " +
  "transition-[transform,border-color] duration-200 " +
  "hover:-translate-y-1 hover:border-blue/30";

/**
 * Card surface with an optional mouse-follow glow. Static branch is a plain
 * styled <div> identical in layout to the animated branch, so the card reads
 * correctly with no JS / reduced motion.
 */
export default function Spotlight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const animate = useMotionReady();

  if (!animate) {
    return <div className={cn(BASE, className)}>{children}</div>;
  }

  return (
    <SpotlightCard
      className={cn(BASE, className)}
      spotlightColor={FX.spotlightColor}
    >
      {children}
    </SpotlightCard>
  );
}
```

Note: the vendored `SpotlightCard` may inject its own base classes (e.g. its own `card-spotlight` padding/border). If `sed` in Step 3 shows hardcoded base styling, pass `className` through and rely on Tailwind's later-wins ordering; verify visually in the final task that border/padding match the other section cards.

- [ ] **Step 5: Wire Projects**

In `src/components/sections/Projects.tsx`, replace the `Card` import (line 4):

```tsx
import Card from "@/components/ui/Card";
```

with:

```tsx
import Spotlight from "@/components/fx/Spotlight";
```

Replace the opening card tag (lines 22-25):

```tsx
              <Card
                key={p.name}
                className="flex flex-col transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-blue/30"
              >
```

with (the hover/transition classes now live in `Spotlight`'s BASE, so only `flex flex-col` remains):

```tsx
              <Spotlight key={p.name} className="flex flex-col">
```

Replace the closing tag (line 67) `</Card>` with `</Spotlight>`.

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: clean build, no errors.

- [ ] **Step 7: Confirm card text is server-rendered**

Run: `grep -o "LabLib" out/index.html | head -1`
Expected: at least one match (project card content present in SSR HTML).

- [ ] **Step 8: Commit**

```bash
git add src/components/reactbits/SpotlightCard.tsx src/components/fx/Spotlight.tsx src/components/sections/Projects.tsx
git commit -m "feat(projects): guarded spotlight glow on project cards"
```

---

### Task 4: Skills — staggered tag reveal

Wraps each skill tag in a guarded stagger so tags fade/slide in with a small per-index delay once the Skills window scrolls into view. Layer 0 still owns the section's own reveal; this only adds per-tag motion.

**Files:**
- Add (shadcn): `src/components/reactbits/AnimatedContent.tsx`
- Create: `src/components/fx/StaggerItem.tsx`
- Modify: `src/components/sections/Skills.tsx` (the tag `<li>` at lines 30-35)

**Interfaces:**
- Consumes: `useMotionReady` (Task 1), `FX` (Task 1), vendored `AnimatedContent` (`@/components/reactbits/AnimatedContent`).
- Produces:
  - `StaggerItem({ index, as, className, children }: { index: number; as?: "li" | "div"; className?: string; children: React.ReactNode }): JSX.Element` — animated branch wraps `children` in AnimatedContent with delay `index * FX.staggerStepMs`; static branch renders the bare element with `className`.

- [ ] **Step 1: Vendor AnimatedContent**

Run: `npx shadcn@latest add @react-bits/AnimatedContent-TS-TW --yes --overwrite`
Expected: creates `src/components/reactbits/AnimatedContent.tsx`. Confirm `git diff package.json` shows no new heavy dependency (AnimatedContent is `motion`-based; `motion` is already present — no gsap).

- [ ] **Step 2: Verify no forbidden import**

Run: `grep -nE "gsap|three|ogl|framer-motion" src/components/reactbits/AnimatedContent.tsx`
Expected: no matches (it should import from `motion/react`).

- [ ] **Step 3: Inspect AnimatedContent props**

Run: `sed -n '1,50p' src/components/reactbits/AnimatedContent.tsx`
Expected: a `'use client'` component with props such as `children`, `distance`, `direction`, `delay`, `duration`, `threshold`. Note the exact prop names; adapt Step 4 if they differ.

- [ ] **Step 4: Write the StaggerItem wrapper**

Create `src/components/fx/StaggerItem.tsx`:

```tsx
"use client";

import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { useMotionReady } from "./useMotionReady";
import { FX } from "./fx-config";

/**
 * One staggered item. Animated branch fades/slides the child in with an
 * index-based delay; static branch is the bare element, fully visible.
 * `as` lets the static branch keep correct semantics (e.g. <li> inside a <ul>).
 */
export default function StaggerItem({
  index,
  as = "div",
  className,
  children,
}: {
  index: number;
  as?: "li" | "div";
  className?: string;
  children: React.ReactNode;
}) {
  const animate = useMotionReady();
  const Tag = as;

  if (!animate) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      <AnimatedContent
        distance={12}
        direction="vertical"
        duration={0.4}
        delay={(index * FX.staggerStepMs) / 1000}
        threshold={0.1}
      >
        {children}
      </AnimatedContent>
    </Tag>
  );
}
```

Note: AnimatedContent wraps its child in its own element. Keeping the semantic `<li>` as the outer `Tag` and letting AnimatedContent animate an inner wrapper preserves valid list markup. If Step 3 shows AnimatedContent renders a block that visibly breaks the inline tag flow, set `display:inline-block` is unnecessary here because each tag is already a list item on a flex row — verify visually in the final task.

- [ ] **Step 5: Wire Skills tags**

In `src/components/sections/Skills.tsx`, add the import (after line 4):

```tsx
import StaggerItem from "@/components/fx/StaggerItem";
```

Replace the tag list-item block (lines 28-37):

```tsx
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/5 bg-surface0 px-2.5 py-1 text-[13px] text-subtext1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
```

with:

```tsx
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item, i) => (
                    <StaggerItem
                      key={item}
                      index={i}
                      as="li"
                      className="rounded-lg border border-white/5 bg-surface0 px-2.5 py-1 text-[13px] text-subtext1"
                    >
                      {item}
                    </StaggerItem>
                  ))}
                </ul>
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: clean build, no errors.

- [ ] **Step 7: Confirm tag text is server-rendered**

Run: `grep -o "Playwright" out/index.html | head -1`
Expected: at least one match (skill tags present in SSR HTML).

- [ ] **Step 8: Commit**

```bash
git add src/components/reactbits/AnimatedContent.tsx src/components/fx/StaggerItem.tsx src/components/sections/Skills.tsx
git commit -m "feat(skills): guarded staggered reveal on skill tags"
```

---

### Task 5: Experience — staggered role reveal (timeline preserved)

Experience is a border-left timeline, not cards, so it does NOT get a SpotlightCard (that would box each role and break the locked timeline look). Instead each role reuses the `StaggerItem` wrapper from Task 4 to fade/slide in, keeping the `border-l` timeline intact.

**Files:**
- Modify: `src/components/sections/Experience.tsx` (the role `<li>` at lines 17-20)

**Interfaces:**
- Consumes: `StaggerItem` (Task 4).
- Produces: none.

- [ ] **Step 1: Wire Experience roles**

In `src/components/sections/Experience.tsx`, add the import (after line 4):

```tsx
import StaggerItem from "@/components/fx/StaggerItem";
```

Replace the role list-item opening (lines 17-20):

```tsx
              <li
                key={role.company}
                className="border-l border-surface1 pl-5"
              >
```

with (add `index` from the map — update the map signature on line 16 from `(role)` to `(role, ri)`):

```tsx
              <StaggerItem
                key={role.company}
                index={ri}
                as="li"
                className="border-l border-surface1 pl-5"
              >
```

Change the map callback on line 16:

```tsx
            {experience.roles.map((role) => (
```

to:

```tsx
            {experience.roles.map((role, ri) => (
```

Replace the matching closing `</li>` (line 41) with `</StaggerItem>`.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: clean build, no errors.

- [ ] **Step 3: Confirm role text is server-rendered**

Run: `grep -o "Infopulse" out/index.html | head -1`
Expected: at least one match (experience content present in SSR HTML).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat(experience): guarded staggered role reveal, timeline preserved"
```

---

### Task 6: Final verification — guard invariant, reduced-motion, Lighthouse

Proves the hard constraints hold across all enhancements: real text with JS off, no motion under reduced-motion, and no Lighthouse regression.

**Files:** none (verification only).

- [ ] **Step 1: Clean production build**

Run: `npm run build`
Expected: clean build; `out/` produced with no errors or warnings about client/server boundaries.

- [ ] **Step 2: Serve the static output**

Run: `npx serve out -l 4321` (leave running in a background shell)
Expected: serving `out/` at `http://localhost:4321`.

- [ ] **Step 3: Guard invariant — text present with JavaScript disabled**

Use the webapp-testing (Playwright) skill. Create a browser context with JavaScript disabled, navigate to `http://localhost:4321`, and assert the enhanced text is visible:

```js
// context created with javaScriptEnabled: false
await page.goto("http://localhost:4321");
await expect(page.getByText("From the operating room to the CI pipeline")).toBeVisible();
await expect(page.getByRole("heading", { name: "Pankaz Jha" })).toBeVisible();
await expect(page.getByText("Playwright").first()).toBeVisible();
await expect(page.getByText("LabLib").first()).toBeVisible();
```
Expected: all assertions pass (proves the guard renders static content without JS).

- [ ] **Step 4: Reduced-motion check**

With JavaScript enabled but `prefers-reduced-motion: reduce` emulated, navigate to the site and confirm the same elements are immediately visible and not mid-animation (opacity 1):

```js
// context created with reducedMotion: "reduce"
await page.goto("http://localhost:4321");
await expect(page.getByText("From the operating room to the CI pipeline")).toBeVisible();
const opacity = await page.getByText("From the operating room to the CI pipeline")
  .evaluate((el) => getComputedStyle(el).opacity);
// expect "1" (final state, no animation)
```
Expected: opacity is `1`; no elements stuck at reduced opacity.

- [ ] **Step 5: Motion-on smoke check**

With a normal context (JS on, motion allowed), navigate, scroll through all sections, and take a full-page screenshot. Visually confirm: tagline blurs in, role shimmers, project cards show the lavender glow on hover, skill tags and experience roles stagger in, and the Catppuccin palette / window chrome is unchanged.

Run (capture): take a full-page screenshot via the Playwright skill and save to `out/../verify-after.png` (scratchpad).
Expected: site matches the locked look with the new accents layered on.

- [ ] **Step 6: Lighthouse (optional but recommended)**

If Chrome + lighthouse CLI are available:
Run: `npx lighthouse http://localhost:4321 --only-categories=performance,accessibility --quiet --chrome-flags="--headless"`
Expected: performance ≥ 95 and accessibility ≥ 95. If below, investigate (most likely the spotlight pointer handler or an oversized image — none expected here).

- [ ] **Step 7: Stop the server and finalize**

Stop the background `serve` process.

- [ ] **Step 8: Verify the dependency surface is clean**

Run: `grep -E '"(gsap|three|ogl|framer-motion|clsx|tailwind-merge)"' package.json`
Expected: no matches (only `motion`, `lenis`, `next`, `react`, `react-dom` plus dev deps).

- [ ] **Step 9: Commit any verification artifacts notes (if a verification doc was produced)**

```bash
git add -A
git commit -m "test(reactbits): verify guard invariant, reduced-motion, and deps" --allow-empty
```

---

## Self-Review

**Spec coverage:**
- Two-layer architecture → Task 1 (guard hook), enforced in every wrapper. ✓
- Guard pattern (static branch for SSR/no-JS/reduced-motion) → Tasks 2-5 wrappers + Task 6 verification. ✓
- Hero (BlurText + ShinyText) → Task 2. *Refinement:* blur applied to tagline not the `<h1>` name (a11y + valid HTML + ECG motif); flagged in Task 2 intro. ✓
- Skills (AnimatedContent stagger) → Task 4. ✓
- Experience cards (SpotlightCard) → *Refinement:* Experience is a timeline, so it gets the stagger reveal (Task 5); SpotlightCard goes to Projects (Task 3), which are real cards. Flagged in Task 3/5 intros. ✓
- Projects (SpotlightCard) → Task 3. ✓
- Zero new heavy deps → enforced per-task (`grep` forbidden imports + `package.json` check) and Task 6 Step 8. ✓
- Token integration (lavender glow, Catppuccin classes) → `FX.spotlightColor`, wrapper classNames. ✓
- File structure (reactbits/ vendored, fx/ wrappers, sections import fx only) → File Structure section + per-task paths. ✓
- Verification (build, reduced-motion, no-JS, Lighthouse) → Task 6. ✓

**Placeholder scan:** No TBD/TODO; every code step has complete code; verification steps have exact commands and expected output. Each `sed`/`grep` inspection step explicitly says "adapt if prop names differ" rather than assuming — necessary because the exact ReactBits prop names are read from the vendored file at execution time.

**Type consistency:** `useMotionReady(): boolean` used identically in all wrappers. `FX` fields (`blurStep`, `blurDelayMs`, `staggerStepMs`, `ease`, `spotlightColor`) defined in Task 1 and consumed with matching names. `StaggerItem` signature (`index`, `as`, `className`, `children`) defined in Task 4 and reused identically in Task 5.

**Known execution-time variable:** ReactBits vendored components are fetched live from the registry; their exact prop names (e.g. ShinyText `speed`, SpotlightCard `spotlightColor`, AnimatedContent `distance`/`direction`/`delay`) are verified via the `sed` inspection step in each task and adapted if the registry version differs. This is the one place the plan defers to runtime inspection, and it is called out explicitly each time.
