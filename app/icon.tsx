import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-fonts";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

const WARM_CREAM = "#F0E8D8";
const WARM_DARK = "#1C1814";

const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT_RATIO = 0.55;
const FONT_SIZE = (size.width * TARGET_CAP_HEIGHT_RATIO) / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = size.width * 0.02;
const CIRCLE_DIAMETER_RATIO = 1 - 2 * 0.08;
const CIRCLE_STROKE_WIDTH = size.width * 0.015;

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
          background: WARM_CREAM,
        }}
      >
        <div
          style={{
            width: `${CIRCLE_DIAMETER_RATIO * 100}%`,
            height: `${CIRCLE_DIAMETER_RATIO * 100}%`,
            borderRadius: "50%",
            border: `${CIRCLE_STROKE_WIDTH}px solid ${WARM_DARK}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Newsreader",
              fontWeight: 400,
              fontSize: FONT_SIZE,
              color: WARM_DARK,
              lineHeight: 1,
              transform: `translateY(-${OPTICAL_SHIFT}px)`,
            }}
          >
            V
          </span>
        </div>
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
