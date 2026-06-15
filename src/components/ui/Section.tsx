import { cn } from "@/lib/cn";

/** Semantic section landmark with anchor offset for the sticky panel. */
export default function Section({
  id,
  label,
  className,
  children,
}: {
  id: string;
  /** Accessible name for the landmark (aria-label). */
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("scroll-mt-24 py-16 sm:py-20", className)}
    >
      {children}
    </section>
  );
}
