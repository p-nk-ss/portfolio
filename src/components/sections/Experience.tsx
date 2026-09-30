import Section from "@/components/ui/Section";
import Window from "@/components/ui/Window";
import Container from "@/components/ui/Container";
import { education, experience } from "@/content/site";
import StaggerItem from "@/components/fx/StaggerItem";

export default function Experience() {
  return (
    <Section id="experience" label="Experience">
      <Container>
        <Window title={experience.windowTitle}>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Experience
          </h2>

          <ol className="mt-6 space-y-8">
            {experience.roles.map((role, ri) => (
              <StaggerItem
                key={role.company}
                index={ri}
                as="li"
                className="border-l border-surface1 pl-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-text">
                    {role.title}{" "}
                    <span className="text-mauve">· {role.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-overlay">
                    {role.period}
                  </span>
                </div>
                {role.context && (
                  <p className="mt-2 max-w-[70ch] text-[15px] italic leading-relaxed text-subtext1">
                    {role.context}
                  </p>
                )}
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-subtext0">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span
                        className="mt-2 size-1.5 flex-none rounded-full bg-surface2"
                        aria-hidden="true"
                      />
                      <span className="max-w-[70ch]">{b}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </ol>

          <h3 className="mt-10 font-display text-lg font-semibold text-text">
            {education.title}
          </h3>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-subtext0">
            {education.items.map((e) => (
              <li
                key={e.name}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
              >
                <span className="max-w-[70ch]">
                  <span className="text-text">{e.name}</span> — {e.place}
                </span>
                {e.period && (
                  <span className="font-mono text-xs text-overlay">
                    {e.period}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Window>
      </Container>
    </Section>
  );
}
