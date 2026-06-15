import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import Card from "@/components/ui/Card";
import Window from "@/components/ui/Window";

const SWATCHES: Array<[string, string]> = [
  ["base", "bg-base"],
  ["mantle", "bg-mantle"],
  ["crust", "bg-crust"],
  ["surface0", "bg-surface0"],
  ["surface1", "bg-surface1"],
  ["surface2", "bg-surface2"],
  ["overlay", "bg-overlay"],
  ["text", "bg-text"],
  ["subtext1", "bg-subtext1"],
  ["subtext0", "bg-subtext0"],
  ["blue", "bg-blue"],
  ["lavender", "bg-lavender"],
  ["mauve", "bg-mauve"],
  ["pink", "bg-pink"],
  ["red", "bg-red"],
  ["peach", "bg-peach"],
  ["yellow", "bg-yellow"],
  ["green", "bg-green"],
  ["teal", "bg-teal"],
  ["sky", "bg-sky"],
];

export default function PreviewPage() {
  return (
    <main className="py-16">
      <Container className="space-y-14">
        <header>
          <p className="font-mono text-sm text-overlay">~/pankaz ❯ design-tokens</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
            Design system preview
          </h1>
          <p className="mt-2 max-w-prose text-subtext0">
            CHECKPOINT 2 — Catppuccin Mocha tokens, type scale, primitives, and
            smooth scroll. Scroll to feel Lenis; enable reduced-motion to confirm
            it falls back to native scroll.
          </p>
        </header>

        {/* Colors */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-semibold">Palette</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {SWATCHES.map(([name, cls]) => (
              <div key={name} className="space-y-2">
                <div
                  className={`h-16 rounded-card border border-white/10 ${cls}`}
                />
                <p className="font-mono text-xs text-subtext0">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-3">
          <h2 className="mb-2 font-display text-2xl font-semibold">Typography</h2>
          <p className="font-display text-5xl font-bold tracking-tight">
            Sora display 700
          </p>
          <p className="font-display text-2xl font-medium text-subtext1">
            Sora medium 500 — section headings
          </p>
          <p className="max-w-prose font-sans text-base text-subtext0">
            Inter body 400 — this is the readable body copy used for paragraphs.
            Non-technical recruiters never hit a wall of monospace; long-form text
            always lives here.
          </p>
          <p className="font-mono text-sm text-green">
            JetBrains Mono — prompts, chips, window titles only.
          </p>
        </section>

        {/* Primitives */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-semibold">Primitives</h2>
          <div className="flex flex-wrap gap-3">
            <Button href="/cv.pdf">Open CV.pdf</Button>
            <Button variant="ghost">Get in touch</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag accent="green">QA automation / Python</Tag>
            <Tag accent="blue">Android / Kotlin</Tag>
            <Tag accent="mauve">Web / Next.js</Tag>
            <Tag accent="peach">CI/CD</Tag>
            <Tag>page-object</Tag>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h3 className="font-display text-lg font-semibold">Card</h3>
              <p className="mt-1 text-sm text-subtext0">
                Soft surface for grouped content inside section windows.
              </p>
            </Card>
            <Window title="pankaz@portfolio: ~" bodyClassName="p-5">
              <p className="font-mono text-sm text-overlay">
                ~/pankaz ❯ whoami
              </p>
              <p className="mt-2 text-subtext0">
                Window chrome primitive — header bar, traffic-light dots, mono
                title, close button (decorative).
              </p>
            </Window>
          </div>
        </section>

        {/* Scroll filler */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Scroll test</h2>
          {Array.from({ length: 6 }).map((_, i) => (
            <p key={i} className="max-w-prose text-subtext0">
              Filler paragraph {i + 1} — scroll through these to feel the Lenis
              easing. With prefers-reduced-motion enabled, scrolling reverts to
              the browser default and no smooth interpolation is applied.
            </p>
          ))}
        </section>
      </Container>
    </main>
  );
}
