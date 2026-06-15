import Section from "@/components/ui/Section";
import Window from "@/components/ui/Window";
import Container from "@/components/ui/Container";
import { about } from "@/content/site";

export default function About() {
  return (
    <Section id="about" label="About">
      <Container>
        <Window title={about.windowTitle}>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {about.title}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-subtext0 sm:text-base">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="max-w-[68ch]">
                {p}
              </p>
            ))}
          </div>
        </Window>
      </Container>
    </Section>
  );
}
