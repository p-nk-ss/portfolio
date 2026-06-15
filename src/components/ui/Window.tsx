import { cn } from "@/lib/cn";

/**
 * GNOME-style window chrome: rounded card with a header bar (traffic-light
 * dots + centered mono title + close button). The close button is decorative
 * (aria-hidden) — sections are read by scrolling, not by opening windows.
 */
export default function Window({
  title,
  className,
  bodyClassName,
  children,
}: {
  title: string;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-win border border-white/[0.07] bg-mantle shadow-win",
        className,
      )}
    >
      {/* header bar */}
      <div className="flex h-[42px] items-center gap-2.5 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent px-3">
        <span className="flex gap-[7px]" aria-hidden="true">
          <span className="size-[11px] rounded-full bg-red" />
          <span className="size-[11px] rounded-full bg-yellow" />
          <span className="size-[11px] rounded-full bg-green" />
        </span>
        <span className="flex-1 text-center font-mono text-[13px] font-medium text-subtext0">
          {title}
        </span>
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded-full bg-surface0 text-[13px] text-subtext1 transition-colors hover:bg-red hover:text-crust"
        >
          &#10005;
        </span>
      </div>
      {/* body */}
      <div className={cn("p-6 sm:p-8", bodyClassName)}>{children}</div>
    </div>
  );
}
