import { ecgPath } from "./ecg";

/** Phosphor-green ECG trace used as a decorative background behind the hero
 * name. A dim base line plus a bright pulse that sweeps along it (the "pulse
 * wave"). The sweep runs only when motion is allowed — under
 * prefers-reduced-motion the pulse overlay is hidden and the static line stays. */
export default function EcgTrace({
  className,
  width = 360,
  height = 120,
  strokeWidth = 2,
  period = 120,
}: {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  period?: number;
}) {
  const d = ecgPath(width, height, period);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* dim static base line */}
      <path
        d={d}
        fill="none"
        stroke="var(--color-green)"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        opacity={0.22}
      />
      {/* bright pulse wave sweeping left → right */}
      <path
        d={d}
        pathLength={1000}
        fill="none"
        stroke="var(--color-green)"
        strokeWidth={strokeWidth + 0.4}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray="58 942"
        className="motion-safe:animate-[ecg-sweep_3.2s_linear_infinite] motion-reduce:hidden"
        style={{ filter: "drop-shadow(0 0 6px var(--color-green))" }}
      />
    </svg>
  );
}
