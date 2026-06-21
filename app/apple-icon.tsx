import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-fonts";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const newsreader = await loadGoogleFont("Newsreader", 400);
  const fontSize = 28;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F0E0C",
        }}
      >
        <span
          style={{
            fontFamily: "Newsreader",
            fontWeight: 400,
            fontSize,
            letterSpacing: `${fontSize * 0.2}px`,
            color: "#F5F1EA",
            lineHeight: 1,
          }}
        >
          VANTIR
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 400, style: "normal" },
      ],
    }
  );
}
