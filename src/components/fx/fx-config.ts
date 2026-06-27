/**
 * Shared Layer-1 motion language. Mirrors the existing CSS easing
 * (cubic-bezier(0.2, 0.9, 0.3, 1)) so accents match Layer 0.
 */
export const FX = {
  blurStep: 0.35, // seconds per BlurText keyframe step
  blurDelayMs: 90, // per-word stagger for blur-in
  staggerStepMs: 45, // per-item delay for staggered reveals
  ease: [0.2, 0.9, 0.3, 1] as number[],
  // lavender at low alpha — matches the body radial-gradient background
  spotlightColor: "rgba(180, 190, 254, 0.18)",
} as const;
