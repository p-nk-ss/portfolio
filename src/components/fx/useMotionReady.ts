"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Layer-1 guard. Returns true ONLY after client mount and only when the user
 * allows motion. Wrappers render the final static state until this is true, so
 * SSR / no-JS / reduced-motion always shows real content (never opacity:0).
 */
export function useMotionReady(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !reduced;
}
