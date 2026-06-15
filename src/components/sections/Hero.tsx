import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import EcgTrace from "@/components/desktop/EcgTrace";
import { IconFile, IconMail } from "@/components/desktop/icons";
import { hero } from "@/content/site";

const chipAccent = {
  green: "green",
  blue: "blue",
  peach: "peach",
} as const;

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-site flex-col justify-center px-4 py-10 sm:px-6"
    >
      <div className="relative">
        {/* main "About" window — full Container width, consistent with the other section windows */}
        <div className="anim-pop w-full overflow-hidden rounded-win border border-white/[0.07] bg-mantle shadow-win">
          {/* header bar */}
          <div className="flex h-[42px] items-center gap-2.5 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent px-3">
            <span className="flex gap-[7px]" aria-hidden="true">
              <span className="size-[11px] rounded-full bg-red" />
              <span className="size-[11px] rounded-full bg-yellow" />
              <span className="size-[11px] rounded-full bg-green" />
            </span>
            <span className="flex-1 text-center font-mono text-[13px] font-medium text-subtext0">
              pankaz@portfolio: ~
            </span>
            <span
              aria-hidden="true"
              className="flex size-6 items-center justify-center rounded-full bg-surface0 text-[13px] text-subtext1 transition-colors hover:bg-red hover:text-crust"
            >
              &#10005;
            </span>
          </div>

          {/* body */}
          <div className="p-7 sm:p-9">
            <p className="mb-5 font-mono text-[13px] tracking-wide text-subtext0">
              ~/pankaz <span className="font-bold text-green">&#10095;</span>{" "}
              {hero.prompt}
              <span className="ml-1 inline-block h-[15px] w-2 -translate-y-px bg-green align-middle motion-safe:animate-[blink_1.1s_steps(1)_infinite]" aria-hidden="true" />
            </p>

            {/* two columns: identity (left) + neofetch-style summary (right) */}
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="flex items-center gap-5">
                  {/* avatar — headshot extracted from the CV */}
                  <div className="relative z-10 size-[72px] flex-none overflow-hidden rounded-full ring-1 ring-white/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/avatar.jpg"
                      alt={hero.name}
                      width={72}
                      height={72}
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    {/* ECG woven behind the name only — the medicine→engineering motif */}
                    <span className="relative inline-block">
                      <EcgTrace
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[64px] w-[calc(100%+28px)] -translate-x-1/2 -translate-y-1/2"
                        width={360}
                        period={108}
                      />
                      <h1 className="relative font-display text-[clamp(34px,6vw,50px)] font-bold leading-none tracking-tight">
                        {hero.name}
                      </h1>
                    </span>
                    <p className="mt-2 font-display text-[clamp(15px,2.4vw,19px)] font-medium">
                      <span className="font-semibold text-mauve">{hero.role}</span>
                    </p>
                    <p className="mt-1.5 font-mono text-[11.5px] text-subtext0">
                      <span className="text-red" aria-hidden="true">
                        &#9829;
                      </span>{" "}
                      {hero.monitor.bpm} bpm · {hero.monitor.uptime}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-[46ch] font-display text-lg text-text">
                  {hero.tagline}
                </p>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-subtext1">
                  {hero.subline}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {hero.chips.map((c) => (
                    <Tag key={c.label} accent={chipAccent[c.accent]}>
                      {c.label}
                    </Tag>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                    <IconFile className="size-4" />
                    Open CV.pdf
                  </Button>
                  <Button href="#contact" variant="ghost">
                    <IconMail className="size-4" />
                    Get in touch
                  </Button>
                </div>
              </div>

              {/* right column — neofetch-style system summary */}
              <div className="hidden self-stretch rounded-card border border-white/[0.07] bg-base/40 p-5 md:block">
                <p className="font-mono text-[13px]">
                  <span className="text-blue">pankaz</span>
                  <span className="text-overlay">@</span>
                  <span className="text-blue">portfolio</span>
                </p>
                <div className="my-2.5 h-px bg-white/10" />
                <dl className="space-y-1.5 font-mono text-[12.5px] leading-relaxed">
                  {hero.info.map((row) => (
                    <div key={row.k} className="flex gap-3">
                      <dt className="w-[74px] flex-none text-mauve">{row.k}</dt>
                      <dd className="text-subtext1">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
