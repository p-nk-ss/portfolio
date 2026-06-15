import { cn } from "@/lib/cn";

/** Soft surface card — used for grouped content inside section windows. */
export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-white/[0.07] bg-mantle/60 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
