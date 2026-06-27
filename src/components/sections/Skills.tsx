import Section from "@/components/ui/Section";
import Window from "@/components/ui/Window";
import Container from "@/components/ui/Container";
import { skills } from "@/content/site";
import StaggerItem from "@/components/fx/StaggerItem";

export default function Skills() {
  return (
    <Section id="skills" label="Skills">
      <Container>
        <Window title={skills.windowTitle}>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Skills
          </h2>
          <p className="mt-1 text-sm text-subtext0">
            Automation-first. Development skills are second-tier proof.
          </p>

          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {skills.groups.map((g) => (
              <div key={g.name}>
                <h3
                  className={`mb-2.5 font-mono text-xs uppercase tracking-wider ${
                    g.lead ? "text-green" : "text-subtext0"
                  }`}
                >
                  {g.name}
                </h3>
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
              </div>
            ))}
          </div>
        </Window>
      </Container>
    </Section>
  );
}
