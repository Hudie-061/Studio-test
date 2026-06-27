import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const WARM_CREAM = "#F0E8D8";
const WARM_DARK = "#1C1814";

// Mirrors components/symbol/variants/SymbolVariantC.tsx geometry.
const VIEWBOX_SIZE = 100;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT_RATIO = 0.55;
const FONT_SIZE = (VIEWBOX_SIZE * TARGET_CAP_HEIGHT_RATIO) / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const BASELINE_Y =
  (VIEWBOX_SIZE * (1 - TARGET_CAP_HEIGHT_RATIO)) / 2 +
  VIEWBOX_SIZE * TARGET_CAP_HEIGHT_RATIO -
  OPTICAL_SHIFT;

const CIRCLE_INSET = VIEWBOX_SIZE * 0.08;
const CIRCLE_RADIUS = VIEWBOX_SIZE / 2 - CIRCLE_INSET;
const CIRCLE_STROKE_WIDTH = VIEWBOX_SIZE * 0.015;

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PNG_SIZES = [48, 96, 192, 512];
const ICO_SIZES = [16, 32, 48];

async function loadNewsreaderBase64(): Promise<string | null> {
  try {
    const cssUrl = "https://fonts.googleapis.com/css2?family=Newsreader:wght@400";
    const css = await (await fetch(cssUrl)).text();
    const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;

    const response = await fetch(match[1]);
    if (!response.ok) return null;

    return Buffer.from(await response.arrayBuffer()).toString("base64");
  } catch {
    return null;
  }
}

function buildSvg(fontBase64: string | null): string {
  const fontFace = fontBase64
    ? `<style>@font-face{font-family:'Newsreader';src:url(data:font/truetype;base64,${fontBase64}) format('truetype');}</style>`
    : "";
  const fontFamily = fontBase64 ? "Newsreader" : "Georgia, 'Times New Roman', serif";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}">
  <defs>${fontFace}</defs>
  <rect x="0" y="0" width="${VIEWBOX_SIZE}" height="${VIEWBOX_SIZE}" fill="${WARM_CREAM}" />
  <circle
    cx="${VIEWBOX_SIZE / 2}"
    cy="${VIEWBOX_SIZE / 2}"
    r="${CIRCLE_RADIUS}"
    stroke="${WARM_DARK}"
    stroke-width="${CIRCLE_STROKE_WIDTH}"
    fill="none"
  />
  <text
    x="${VIEWBOX_SIZE / 2}"
    y="${BASELINE_Y}"
    text-anchor="middle"
    fill="${WARM_DARK}"
    font-size="${FONT_SIZE}"
    font-weight="400"
    font-family="${fontFamily}"
  >V</text>
</svg>`;
}

async function main() {
  const fontBase64 = await loadNewsreaderBase64();
  if (!fontBase64) {
    console.warn(
      "[generate-favicons] Could not fetch Newsreader from Google Fonts — falling back to a serif system font."
    );
  }

  const svgBuffer = Buffer.from(buildSvg(fontBase64));
  await mkdir(PUBLIC_DIR, { recursive: true });

  for (const pngSize of PNG_SIZES) {
    const outPath = path.join(PUBLIC_DIR, `favicon-${pngSize}.png`);
    await sharp(svgBuffer, { density: 300 }).resize(pngSize, pngSize).png().toFile(outPath);
    console.log(`[generate-favicons] wrote ${outPath}`);
  }

  const icoBuffers = await Promise.all(
    ICO_SIZES.map((icoSize) =>
      sharp(svgBuffer, { density: 300 }).resize(icoSize, icoSize).png().toBuffer()
    )
  );
  const icoBuffer = await pngToIco(icoBuffers);
  const icoPath = path.join(PUBLIC_DIR, "favicon.ico");
  await writeFile(icoPath, icoBuffer);
  console.log(`[generate-favicons] wrote ${icoPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
