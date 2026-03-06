import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0c7c7c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          t.
        </span>
      </div>
    ),
    { ...size }
  );
}
