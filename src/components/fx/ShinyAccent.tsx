"use client";

import ShinyText from "@/components/reactbits/ShinyText";
import { useMotionReady } from "./useMotionReady";

/**
 * Inline shimmer accent (hero role). Animated branch = ReactBits ShinyText.
 * Static branch = a plain <span> with identical text + classes.
 */
export default function ShinyAccent({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const animate = useMotionReady();

  if (!animate) {
    return <span className={className}>{text}</span>;
  }

  return <ShinyText text={text} className={className} speed={5} color="#cba6f7" shineColor="#b4befe" />;
}
