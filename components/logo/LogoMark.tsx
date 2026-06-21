import type { CSSProperties } from "react";

export interface LogoMarkProps {
  size?: number;
  color?: string;
  showSubtitle?: boolean;
  className?: string;
}

const MAIN_TEXT = "VANTIR";
const MAIN_FONT_SIZE = 100;
const MAIN_LETTER_SPACING_EM = 0.3;
const MAIN_CHAR_WIDTH_RATIO = 0.64;
const MAIN_CAP_HEIGHT = MAIN_FONT_SIZE * 0.78;

const SUBTITLE_TEXT = "STUDIO";
const SUBTITLE_FONT_SIZE = MAIN_FONT_SIZE * 0.2;
const SUBTITLE_LETTER_SPACING_EM = 0.4;
const SUBTITLE_CHAR_WIDTH_RATIO = 0.6;
const SUBTITLE_CAP_HEIGHT = SUBTITLE_FONT_SIZE * 0.78;

const GAP = MAIN_FONT_SIZE * 0.25;
const PADDING = 16;

const MAIN_TEXT_WIDTH =
  MAIN_TEXT.length * MAIN_FONT_SIZE * MAIN_CHAR_WIDTH_RATIO +
  MAIN_TEXT.length * MAIN_FONT_SIZE * MAIN_LETTER_SPACING_EM;
const SUBTITLE_TEXT_WIDTH =
  SUBTITLE_TEXT.length * SUBTITLE_FONT_SIZE * SUBTITLE_CHAR_WIDTH_RATIO +
  SUBTITLE_TEXT.length * SUBTITLE_FONT_SIZE * SUBTITLE_LETTER_SPACING_EM;

const VB_WIDTH_WITH_SUBTITLE =
  Math.max(MAIN_TEXT_WIDTH, SUBTITLE_TEXT_WIDTH) + PADDING * 2;
const VB_HEIGHT_WITH_SUBTITLE =
  MAIN_CAP_HEIGHT + GAP + SUBTITLE_CAP_HEIGHT + PADDING * 2;

const VB_WIDTH_MAIN_ONLY = MAIN_TEXT_WIDTH + PADDING * 2;
const VB_HEIGHT_MAIN_ONLY = MAIN_CAP_HEIGHT + PADDING * 2;

const MAIN_BASELINE_Y = PADDING + MAIN_CAP_HEIGHT;
const SUBTITLE_BASELINE_Y = MAIN_BASELINE_Y + GAP + SUBTITLE_CAP_HEIGHT;

export function LogoMark({
  size = 32,
  color = "currentColor",
  showSubtitle = true,
  className = "",
}: LogoMarkProps) {
  const vbWidth = showSubtitle ? VB_WIDTH_WITH_SUBTITLE : VB_WIDTH_MAIN_ONLY;
  const vbHeight = showSubtitle ? VB_HEIGHT_WITH_SUBTITLE : VB_HEIGHT_MAIN_ONLY;
  const width = size * (vbWidth / vbHeight);

  const mainStyle: CSSProperties = {
    fontFamily: "var(--font-newsreader), Georgia, serif",
    letterSpacing: `${MAIN_LETTER_SPACING_EM}em`,
    textTransform: "uppercase",
  };

  const subtitleStyle: CSSProperties = {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    letterSpacing: `${SUBTITLE_LETTER_SPACING_EM}em`,
    textTransform: "uppercase",
  };

  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      role="img"
      aria-label={showSubtitle ? "VANTIR Studio" : "VANTIR"}
      className={className}
    >
      <text
        x={vbWidth / 2}
        y={MAIN_BASELINE_Y}
        textAnchor="middle"
        fill={color}
        fontSize={MAIN_FONT_SIZE}
        fontWeight={400}
        fontStyle="normal"
        style={mainStyle}
      >
        {MAIN_TEXT}
      </text>
      {showSubtitle && (
        <text
          x={vbWidth / 2}
          y={SUBTITLE_BASELINE_Y}
          textAnchor="middle"
          fill={color}
          fontSize={SUBTITLE_FONT_SIZE}
          fontWeight={300}
          fontStyle="normal"
          style={subtitleStyle}
        >
          {SUBTITLE_TEXT}
        </text>
      )}
    </svg>
  );
}
