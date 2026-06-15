import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — green terminal chevron on crust, matching the desktop theme. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#11111b",
          color: "#a6e3a1",
          fontSize: 24,
          fontWeight: 700,
          borderRadius: 7,
        }}
      >
        &gt;
      </div>
    ),
    { ...size },
  );
}
