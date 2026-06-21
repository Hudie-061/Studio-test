import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-fonts";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VANTIR Studio — Cinematic brand films and editorial websites";

export default async function OpengraphImage() {
  const [newsreader, interLight] = await Promise.all([
    loadGoogleFont("Newsreader", 400),
    loadGoogleFont("Inter", 300),
  ]);

  const mainFontSize = 120;
  const subtitleFontSize = 24;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F0E0C",
        }}
      >
        <span
          style={{
            fontFamily: "Newsreader",
            fontWeight: 400,
            fontSize: mainFontSize,
            letterSpacing: `${mainFontSize * 0.3}px`,
            color: "#F5F1EA",
            lineHeight: 1,
          }}
        >
          VANTIR
        </span>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 300,
            fontSize: subtitleFontSize,
            letterSpacing: `${subtitleFontSize * 0.4}px`,
            color: "#A39E96",
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          STUDIO
        </span>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 300,
            fontSize: 28,
            color: "#A39E96",
            marginTop: 80,
            lineHeight: 1,
          }}
        >
          Cinematic brand films · Editorial websites · Brussels
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 400, style: "normal" },
        { name: "Inter", data: interLight, weight: 300, style: "normal" },
      ],
    }
  );
}
