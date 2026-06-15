import { cn } from "@/lib/cn";

type Accent = "blue" | "green" | "mauve" | "peach" | "teal" | "text";

const accents: Record<Accent, string> = {
  blue: "text-blue",
  green: "text-green",
  mauve: "text-mauve",
  peach: "text-peach",
  teal: "text-teal",
  text: "text-subtext1",
};

/** Mono "chip" — decorative label, never body copy. */
export default function Tag({
  accent = "text",
  className,
  children,
}: {
  accent?: Accent;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-white/5 bg-surface0 px-3 py-1.5 font-mono text-[12.5px]",
        accents[accent],
        className,
      )}
    >
      {children}
    </span>
  );
}
