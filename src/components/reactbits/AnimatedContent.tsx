"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 30,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  const axis = direction === "horizontal" ? "x" : "y";
  const offset = reverse ? -distance : distance;

  const initial: Record<string, number> = {
    [axis]: offset,
    scale,
    opacity: animateOpacity ? initialOpacity : 1,
  };

  const animate: Record<string, number> = {
    [axis]: 0,
    scale: 1,
    opacity: 1,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration, delay, ease: [0.2, 0.9, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
