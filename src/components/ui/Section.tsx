import { cn } from "@/lib/cn";

/** Semantic section landmark with anchor offset for the sticky panel.
 * Content scroll-reveals on entry via CSS scroll-driven animation
 * (no JS; disabled under prefers-reduced-motion; visible by default). */
export default function Section({
  id,
  label,
  className,
  tight,
  children,
}: {
  id: string;
  /** Accessible name for the landmark (aria-label). */
  label: string;
  className?: string;
  /** Reduced top padding — used for the first section after the full-height hero. */
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "scroll-mt-24 pb-16 sm:pb-20",
        tight ? "pt-10 sm:pt-12" : "pt-16 sm:pt-20",
        className,
      )}
    >
      <div className="reveal">{children}</div>
    </section>
  );
}
