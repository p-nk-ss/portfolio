import Container from "@/components/ui/Container";

/** Placeholder home — real sections are built in Phase 3. */
export default function Home() {
  return (
    <main className="flex min-h-dvh items-center">
      <Container>
        <p className="font-mono text-sm text-overlay">~/pankaz ❯ whoami</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">
          Pankaz Jha
        </h1>
        <p className="mt-2 font-display text-xl text-subtext1">
          QA Automation Engineer
        </p>
        <p className="mt-4 max-w-prose text-subtext0">
          From the operating room to the CI pipeline. Full site in progress —
          see the{" "}
          <a className="text-blue underline-offset-4 hover:underline" href="/preview/">
            design system preview
          </a>
          .
        </p>
      </Container>
    </main>
  );
}
