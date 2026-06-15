"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wires Lenis smooth scroll at the app root.
 * Respects prefers-reduced-motion: when reduced motion is requested we skip
 * Lenis entirely and fall back to the browser's native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
