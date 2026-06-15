import Section from "@/components/ui/Section";
import Window from "@/components/ui/Window";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import {
  IconMail,
  IconLinkedin,
  IconGithub,
  IconTelegram,
  IconMapPin,
  IconDownload,
} from "@/components/desktop/icons";
import { contact } from "@/content/site";

const iconFor: Record<string, (p: { className?: string }) => React.ReactElement> = {
  Email: IconMail,
  LinkedIn: IconLinkedin,
  GitHub: IconGithub,
  Telegram: IconTelegram,
};

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      <Container>
        <Window title={contact.windowTitle}>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Contact
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-subtext0">
            <IconMapPin className="size-4 text-overlay" />
            {contact.location} — open to remote and hybrid.
          </p>
          <p className="mt-3 max-w-[60ch] text-[15px] text-subtext0">
            {contact.intro}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {contact.links.map((l) => {
              const Icon = iconFor[l.label] ?? IconMail;
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center gap-3 rounded-card border border-white/[0.07] bg-mantle/60 px-4 py-3 transition-colors hover:border-blue/40 hover:bg-surface0"
                  >
                    <span className="flex size-9 flex-none items-center justify-center rounded-lg bg-surface0 text-blue transition-colors group-hover:bg-blue group-hover:text-crust">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-overlay">{l.label}</span>
                      <span className="block truncate font-mono text-sm text-text">
                        {l.value}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <Button href={contact.cvHref} target="_blank" rel="noopener noreferrer">
              <IconDownload className="size-4" />
              Download CV (PDF)
            </Button>
          </div>
        </Window>
      </Container>
    </Section>
  );
}
