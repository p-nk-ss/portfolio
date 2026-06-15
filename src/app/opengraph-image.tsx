import { ImageResponse } from "next/og";
import { ecgPath } from "@/components/desktop/ecg";
import { hero } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pankaz Jha — QA Automation Engineer";

const dot = (color: string) => ({
  width: 18,
  height: 18,
  borderRadius: 9,
  background: color,
});

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#1e1e2e",
          backgroundImage:
            "linear-gradient(135deg, rgba(203,166,247,0.18), rgba(137,180,250,0.14) 55%, rgba(148,226,213,0.10))",
          color: "#cdd6f4",
          fontFamily: "sans-serif",
        }}
      >
        {/* window title bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", gap: 9 }}>
            <div style={dot("#f38ba8")} />
            <div style={dot("#f9e2af")} />
            <div style={dot("#a6e3a1")} />
          </div>
          <div style={{ fontSize: 26, color: "#a6adc8" }}>
            pankaz@portfolio: ~
          </div>
        </div>

        {/* identity */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#6c7086" }}>
            $ whoami
          </div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 1.05 }}>
            {hero.name}
          </div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 600, color: "#cba6f7", marginTop: 8 }}>
            {hero.role}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#bac2de", marginTop: 16 }}>
            {hero.tagline}
          </div>
        </div>

        {/* ECG + footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <svg width={1072} height={90} viewBox="0 0 1072 90">
            <path
              d={ecgPath(1072, 90, 150)}
              fill="none"
              stroke="#a6e3a1"
              strokeWidth={3}
            />
          </svg>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 28,
              color: "#a6adc8",
            }}
          >
            <div style={{ display: "flex" }}>
              QA automation · Playwright · Appium · CI/CD
            </div>
            <div style={{ display: "flex", color: "#89b4fa" }}>cv.pankaz.dev</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
