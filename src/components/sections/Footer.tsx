import Container from "@/components/ui/Container";
import { hero } from "@/content/site";

export default function Footer() {
  return (
    <footer className="pb-28 pt-10 sm:pb-24">
      <Container>
        <div className="flex flex-col items-center gap-1 border-t border-white/[0.06] pt-6 text-center font-mono text-xs text-subtext0">
          <p>
            {hero.name} — {hero.role}
          </p>
          <p>Built with Next.js · Tailwind · deployed on Cloudflare.</p>
        </div>
      </Container>
    </footer>
  );
}
