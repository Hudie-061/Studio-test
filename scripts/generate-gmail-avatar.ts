import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { GIFEncoder, quantize, applyPalette } from "gifenc";

const WARM_DARK = "#1C1814";
const WARM_CREAM = "#F0E8D8";

// V letterform geometry — same technique as scripts/generate-favicons.ts
// (Newsreader Regular, cap-height-ratio baseline math), scaled so the V
// fills ~60% of this canvas to balance against the wider comet ring.
const SIZE = 500;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT_RATIO = 0.6;
const FONT_SIZE = (SIZE * TARGET_CAP_HEIGHT_RATIO) / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = SIZE * 0.02;
const BASELINE_Y =
  (SIZE * (1 - TARGET_CAP_HEIGHT_RATIO)) / 2 + SIZE * TARGET_CAP_HEIGHT_RATIO - OPTICAL_SHIFT;

const RING_CX = 250;
const RING_CY = 250;
const RING_R = 200;
const RING_STROKE_WIDTH = 2.5;
const RING_OPACITY = 0.15;

const ARC_STROKE_WIDTH = 6;
const ARC_OPACITY = 0.95;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

// SVG circles start at the 3-o'clock point; this static rotation puts the
// dasharray's start (and thus the draw phase's anchor) at 12 o'clock.
const ARC_ROTATION = "rotate(-90 250 250)";

const FRAMES = 60;
const DURATION_MS = 4000;
const DELAY_MS = Math.round(DURATION_MS / FRAMES);
const PALETTE_MAX_COLORS = 64;

const PHASE1_FRAMES = 30; // draw: empty ring -> full circle
const PHASE2_FRAMES = 30; // erase: full circle -> empty ring
const STATIC_FRAME_INDEX = 7; // ~partial arc drawn — used for frame1.png + shared palette

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function arcStateForFrame(i: number): { arcLength: number; dashOffset: number } {
  if (i < PHASE1_FRAMES) {
    const t = i / PHASE1_FRAMES;
    return { arcLength: CIRCUMFERENCE * easeInOutQuad(t), dashOffset: 0 };
  }
  const t = (i - PHASE1_FRAMES) / PHASE2_FRAMES;
  const eased = easeInOutQuad(t);
  return { arcLength: CIRCUMFERENCE * (1 - eased), dashOffset: -CIRCUMFERENCE * eased };
}

const PUBLIC_DIR = path.join(process.cwd(), "public");

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

function buildSvg(
  arcState: { arcLength: number; dashOffset: number },
  fontBase64: string | null
): string {
  const fontFace = fontBase64
    ? `<style>@font-face{font-family:'Newsreader';src:url(data:font/truetype;base64,${fontBase64}) format('truetype');}</style>`
    : "";
  const fontFamily = fontBase64 ? "Newsreader" : "Georgia, 'Times New Roman', serif";
  const { arcLength, dashOffset } = arcState;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>${fontFace}</defs>
  <rect x="0" y="0" width="${SIZE}" height="${SIZE}" fill="${WARM_DARK}" />
  <text
    x="${SIZE / 2}"
    y="${BASELINE_Y}"
    text-anchor="middle"
    fill="${WARM_CREAM}"
    font-size="${FONT_SIZE}"
    font-weight="400"
    font-family="${fontFamily}"
  >V</text>
  <circle
    cx="${RING_CX}"
    cy="${RING_CY}"
    r="${RING_R}"
    fill="none"
    stroke="${WARM_CREAM}"
    stroke-width="${RING_STROKE_WIDTH}"
    opacity="${RING_OPACITY}"
  />
  <circle
    cx="${RING_CX}"
    cy="${RING_CY}"
    r="${RING_R}"
    fill="none"
    stroke="${WARM_CREAM}"
    stroke-width="${ARC_STROKE_WIDTH}"
    stroke-linecap="round"
    stroke-dasharray="${arcLength} ${CIRCUMFERENCE - arcLength}"
    stroke-dashoffset="${dashOffset}"
    opacity="${ARC_OPACITY}"
    transform="${ARC_ROTATION}"
  />
</svg>`;
}

async function rasterizeSvg(svg: string): Promise<{ data: Buffer; width: number; height: number }> {
  const { data, info } = await sharp(Buffer.from(svg))
    .resize(SIZE, SIZE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

async function main() {
  const fontBase64 = await loadNewsreaderBase64();
  if (!fontBase64) {
    console.warn(
      "[generate-gmail-avatar] Could not fetch Newsreader from Google Fonts — falling back to a serif system font."
    );
  }

  await mkdir(PUBLIC_DIR, { recursive: true });

  const frameArcStates = Array.from({ length: FRAMES }, (_, i) => arcStateForFrame(i));

  // The static export frame has a partial arc (plus the rounded-cap blend),
  // so it carries the same set of colors every other frame uses — a safe
  // source for a single shared GIF palette.
  const staticSvg = buildSvg(frameArcStates[STATIC_FRAME_INDEX], fontBase64);
  const staticFrame = await rasterizeSvg(staticSvg);
  const palette = quantize(staticFrame.data, PALETTE_MAX_COLORS);

  await sharp(Buffer.from(staticSvg))
    .resize(SIZE, SIZE)
    .png()
    .toFile(path.join(PUBLIC_DIR, "gmail-avatar-frame1.png"));
  console.log(`[generate-gmail-avatar] wrote ${path.join(PUBLIC_DIR, "gmail-avatar-frame1.png")}`);

  const encoder = GIFEncoder();

  for (let i = 0; i < FRAMES; i++) {
    const svg = buildSvg(frameArcStates[i], fontBase64);
    const frame = i === STATIC_FRAME_INDEX ? staticFrame : await rasterizeSvg(svg);
    const indexed = applyPalette(frame.data, palette);
    encoder.writeFrame(indexed, frame.width, frame.height, {
      palette,
      delay: DELAY_MS,
      repeat: 0,
    });
    console.log(`[generate-gmail-avatar] frame ${i + 1}/${FRAMES} encoded`);
  }

  encoder.finish();

  const gifPath = path.join(PUBLIC_DIR, "gmail-avatar.gif");
  await writeFile(gifPath, encoder.bytes());

  const sizeKb = (encoder.bytes().byteLength / 1024).toFixed(1);
  console.log(`[generate-gmail-avatar] wrote ${gifPath} (${sizeKb} KB)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
