import { ecgPath } from "./ecg";

/** Static phosphor-green ECG trace. Used as a decorative background behind the
 * hero headline (the heart-rate motif, woven into the layout rather than a
 * detached widget). Phase 4 adds the live sweep. */
export default function EcgTrace({
  className,
  width = 640,
  height = 120,
  strokeWidth = 2,
}: {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={ecgPath(width, height)}
        fill="none"
        stroke="var(--color-green)"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 6px var(--color-green))" }}
      />
    </svg>
  );
}
