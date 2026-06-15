import Container from "@/components/ui/Container";
import { aiBlock } from "@/content/site";

/** AI-assisted development highlight — framed for the QA/rigor brand. */
export default function AiBlock() {
  return (
    <section aria-label="AI-assisted development" className="py-6">
      <Container>
        <figure className="overflow-hidden rounded-win border border-mauve/25 bg-gradient-to-br from-mauve/10 via-mantle to-blue/10 p-7 sm:p-9">
          <figcaption className="mb-3 font-mono text-xs uppercase tracking-wider text-mauve">
            AI-assisted development
          </figcaption>
          <blockquote className="max-w-[72ch] font-display text-lg leading-relaxed text-text sm:text-xl">
            “{aiBlock.quote}”
          </blockquote>
        </figure>
      </Container>
    </section>
  );
}
