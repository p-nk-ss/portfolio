"use client";

import { useEffect, useState } from "react";

/** Live panel clock. Renders a placeholder on the server to avoid hydration
 * mismatch, then ticks on the client. (Updating the clock is benign ambient
 * motion — not gated by prefers-reduced-motion.) */
export default function Clock() {
  const [time, setTime] = useState<string>("--:--");

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    fmt();
    const id = setInterval(fmt, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[12.5px] tabular-nums text-subtext1">
      {time}
    </span>
  );
}
