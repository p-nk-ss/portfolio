"use client";

import type { ReactNode } from "react";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { useMotionReady } from "./useMotionReady";
import { FX } from "./fx-config";

/**
 * One staggered item. Animated branch fades/slides the child in with an
 * index-based delay; static branch is the bare element, fully visible.
 * `as` lets the static branch keep correct semantics (e.g. <li> inside a <ul>).
 */
export default function StaggerItem({
  index,
  as = "div",
  className,
  children,
}: {
  index: number;
  as?: "li" | "div";
  className?: string;
  children: ReactNode;
}) {
  const animate = useMotionReady();
  const Tag = as;

  if (!animate) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag>
      <AnimatedContent
        className={className}
        distance={12}
        direction="vertical"
        duration={0.4}
        delay={(index * FX.staggerStepMs) / 1000}
        threshold={0.1}
      >
        {children}
      </AnimatedContent>
    </Tag>
  );
}
