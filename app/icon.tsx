import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-fonts";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const newsreader = await loadGoogleFont("Newsreader", 400);

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
            fontSize: 24,
            color: "#F5F1EA",
            lineHeight: 1,
          }}
        >
          V
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
