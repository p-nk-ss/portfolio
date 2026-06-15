import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — PJ monogram on the mauve→blue gradient. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #cba6f7, #89b4fa)",
          color: "#11111b",
          fontSize: 92,
          fontWeight: 700,
        }}
      >
        PJ
      </div>
    ),
    { ...size },
  );
}
