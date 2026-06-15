/** ECG / heartbeat geometry — shared by the static background trace and
 * (Phase 4) the animated canvas. The medicine→engineering motif. */

export function beat(p: number): number {
  let v = 0;
  v += 0.12 * Math.exp(-Math.pow((p - 0.12) / 0.028, 2));
  v += -0.15 * Math.exp(-Math.pow((p - 0.225) / 0.012, 2));
  v += 1.0 * Math.exp(-Math.pow((p - 0.255) / 0.011, 2));
  v += -0.28 * Math.exp(-Math.pow((p - 0.3) / 0.014, 2));
  v += 0.22 * Math.exp(-Math.pow((p - 0.55) / 0.055, 2));
  return v;
}

/** Build an SVG path string for a repeating ECG trace across `width`. */
export function ecgPath(
  width: number,
  height: number,
  period = 120,
  ampRatio = 0.42,
  midRatio = 0.5,
): string {
  const mid = height * midRatio;
  const amp = height * ampRatio;
  let d = "";
  for (let x = 0; x <= width; x++) {
    const y = mid - beat((x % period) / period) * amp;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d.trim();
}
