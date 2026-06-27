"use client";

import BlurText from "@/components/reactbits/BlurText";
import { useMotionReady } from "./useMotionReady";
import { FX } from "./fx-config";

/**
 * Hero tagline. Animated branch = ReactBits BlurText (word blur-in).
 * Static branch = a plain <p> with identical text + classes, so SSR / no-JS /
 * reduced-motion renders the real, fully-visible tagline.
 */
export default function TaglineBlur({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const animate = useMotionReady();

  if (!animate) {
    return <p className={className}>{text}</p>;
  }

  return (
    <BlurText
      text={text}
      className={className}
      animateBy="words"
      direction="bottom"
      delay={FX.blurDelayMs}
      stepDuration={FX.blurStep}
    />
  );
}
