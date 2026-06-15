import { hero } from "@/content/site";

/**
 * Conky-style heart-rate widget — the medicine→engineering bridge, expressed
 * as a Linux resource monitor. Phase 3 renders a static phosphor-green ECG
 * trace (reads correctly with motion off); Phase 4 adds the live canvas.
 */

const W = 252;
const H = 60;
const MID = H * 0.55;
const PERIOD = 120;
const AMP = H * 0.42;

function beat(p: number): number {
  let v = 0;
  v += 0.12 * Math.exp(-Math.pow((p - 0.12) / 0.028, 2));
  v += -0.15 * Math.exp(-Math.pow((p - 0.225) / 0.012, 2));
  v += 1.0 * Math.exp(-Math.pow((p - 0.255) / 0.011, 2));
  v += -0.28 * Math.exp(-Math.pow((p - 0.3) / 0.014, 2));
  v += 0.22 * Math.exp(-Math.pow((p - 0.55) / 0.055, 2));
  return v;
}

function tracePath(): string {
  let d = "";
  for (let x = 0; x <= W; x++) {
    const y = MID - beat((x % PERIOD) / PERIOD) * AMP;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d.trim();
}

export default function HeartMonitor({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Heart rate monitor widget"
      className={`overflow-hidden rounded-win border border-white/[0.07] bg-mantle/80 shadow-win backdrop-blur-md ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 px-3.5 pb-1.5 pt-3 font-mono text-[12.5px] text-subtext0">
        <span className="text-red" aria-hidden="true">
          &#9829;
        </span>
        {hero.monitor.label}
      </div>
      <div className="px-3.5 pb-3.5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-[60px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label={`Heart rate ${hero.monitor.bpm} beats per minute`}
        >
          <path
            d={tracePath()}
            fill="none"
            stroke="var(--color-green)"
            strokeWidth={1.8}
          />
        </svg>
        <div className="mt-2 flex items-baseline justify-between font-mono">
          <span className="text-[22px] text-green">
            {hero.monitor.bpm} <small className="text-[13px] text-overlay">bpm</small>
          </span>
          <span className="text-xs text-overlay">{hero.monitor.uptime}</span>
        </div>
      </div>
    </aside>
  );
}
