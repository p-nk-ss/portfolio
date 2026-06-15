import { cn } from "@/lib/cn";

/** Centered, max-width page gutter wrapper. */
export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}
