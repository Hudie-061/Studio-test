import fs from "fs";
import path from "path";
import sharp from "sharp";

const WARM_CREAM = "#F0E8D8";
const WARM_DARK = "#1C1814";

// V letterform geometry — same text+embedded-font technique as
// scripts/generate-favicons.ts and scripts/generate-gmail-avatar.ts, so the
// glyph is pixel-faithful to the favicon/Gmail avatar at this larger size.
const SIZE = 1080;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT_RATIO = 0.6;
const FONT_SIZE = (SIZE * TARGET_CAP_HEIGHT_RATIO) / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = SIZE * 0.02;
const BASELINE_Y =
  (SIZE * (1 - TARGET_CAP_HEIGHT_RATIO)) / 2 + SIZE * TARGET_CAP_HEIGHT_RATIO - OPTICAL_SHIFT;

const CIRCLE_CX = 540;
const CIRCLE_CY = 540;
const CIRCLE_R = 432; // 80% of canvas width — ~108px margin to the inscribed crop circle
const CIRCLE_STROKE_WIDTH = 13;

const OUTPUT_DIR = path.join(process.cwd(), "brand-exports", "social-avatars");

interface Variant {
  fileName: string;
  background: string;
  foreground: string;
}

const VARIANTS: Variant[] = [
  { fileName: "vantir-social-avatar-dark-1080.png", background: WARM_DARK, foreground: WARM_CREAM },
  { fileName: "vantir-social-avatar-cream-1080.png", background: WARM_CREAM, foreground: WARM_DARK },
];

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

function buildSvg(background: string, foreground: string, fontBase64: string | null): string {
  const fontFace = fontBase64
    ? `<style>@font-face{font-family:'Newsreader';src:url(data:font/truetype;base64,${fontBase64}) format('truetype');}</style>`
    : "";
  const fontFamily = fontBase64 ? "Newsreader" : "Georgia, 'Times New Roman', serif";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>${fontFace}</defs>
  <rect x="0" y="0" width="${SIZE}" height="${SIZE}" fill="${background}" />
  <circle
    cx="${CIRCLE_CX}"
    cy="${CIRCLE_CY}"
    r="${CIRCLE_R}"
    stroke="${foreground}"
    stroke-width="${CIRCLE_STROKE_WIDTH}"
    fill="none"
  />
  <text
    x="${SIZE / 2}"
    y="${BASELINE_Y}"
    text-anchor="middle"
    fill="${foreground}"
    font-size="${FONT_SIZE}"
    font-weight="400"
    font-family="${fontFamily}"
  >V</text>
</svg>`;
}

async function renderVariant(variant: Variant, fontBase64: string | null): Promise<void> {
  const svg = buildSvg(variant.background, variant.foreground, fontBase64);
  const outPath = path.join(OUTPUT_DIR, variant.fileName);

  await sharp(Buffer.from(svg), { density: 300 })
    .resize(SIZE, SIZE)
    .flatten({ background: variant.background })
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(outPath);

  const { size } = fs.statSync(outPath);
  console.log(`[generate-social-avatars] wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
}

async function main() {
  const fontBase64 = await loadNewsreaderBase64();
  if (!fontBase64) {
    console.warn(
      "[generate-social-avatars] Could not fetch Newsreader from Google Fonts — falling back to a serif system font."
    );
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const variant of VARIANTS) {
    await renderVariant(variant, fontBase64);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
