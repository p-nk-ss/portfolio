import Section from "@/components/ui/Section";
import Window from "@/components/ui/Window";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { IconExternal, IconGithub } from "@/components/desktop/icons";
import { projects } from "@/content/site";

export default function Projects() {
  return (
    <Section id="projects" label="Projects">
      <Container>
        <Window title={projects.windowTitle}>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="mt-1 max-w-[68ch] text-sm text-subtext0">
            {projects.intro}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.items.map((p) => (
              <Card key={p.name} className="flex flex-col">
                <h3 className="font-display text-lg font-semibold text-text">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-subtext0">
                  {p.blurb}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-subtext1">
                  {p.what}
                </p>

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-md bg-surface0 px-2 py-0.5 font-mono text-[11.5px] text-subtext0"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                {p.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4 pt-1">
                    {p.links.map((l) => {
                      const isGithub = l.label === "GitHub";
                      const Icon = isGithub ? IconGithub : IconExternal;
                      return (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue underline-offset-4 hover:underline"
                        >
                          <Icon className="size-4" />
                          {l.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Window>
      </Container>
    </Section>
  );
}
