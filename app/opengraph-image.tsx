import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "teal. | 横浜元町の美容院";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0C7C7C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.15em",
            lineHeight: 1,
          }}
        >
          teal.
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 22,
            letterSpacing: "0.35em",
            marginTop: 8,
          }}
        >
          hair salon / yokohama motomachi
        </div>
      </div>
    ),
    { ...size }
  );
}
