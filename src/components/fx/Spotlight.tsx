"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { cn } from "@/lib/cn";
import { useMotionReady } from "./useMotionReady";
import { FX } from "./fx-config";

const BASE =
  "rounded-card border border-white/[0.07] bg-mantle/60 p-5 " +
  "transition-[transform,border-color] duration-200 " +
  "hover:-translate-y-1 hover:border-blue/30";

/**
 * Card surface with an optional mouse-follow glow. Static branch is a plain
 * styled <div> identical in layout to the animated branch, so the card reads
 * correctly with no JS / reduced motion.
 */
export default function Spotlight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const animate = useMotionReady();

  if (!animate) {
    return <div className={cn(BASE, className)}>{children}</div>;
  }

  return (
    <SpotlightCard
      className={cn(BASE, className)}
      spotlightColor={FX.spotlightColor}
    >
      {children}
    </SpotlightCard>
  );
}
