interface SymbolVariantProps {
  size?: number;
  className?: string;
}

const VIEWBOX_SIZE = 96;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.65;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const V_WIDTH = FONT_SIZE * 0.64;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const TOP_Y = (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2;
const BASELINE_Y = TOP_Y + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;

const SUPERSCRIPT_FONT_SIZE = FONT_SIZE * 0.35;
const SUPERSCRIPT_CAP_HEIGHT = SUPERSCRIPT_FONT_SIZE * CAP_HEIGHT_RATIO;
const SUPERSCRIPT_X = VIEWBOX_SIZE / 2 + V_WIDTH * 0.42;
const SUPERSCRIPT_BASELINE_Y = TOP_Y + SUPERSCRIPT_CAP_HEIGHT;

export default function SymbolVariantH({ size = 96, className = "" }: SymbolVariantProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label="VANTIR symbol mark — V·S monogram"
      className={className}
    >
      <text
        x={VIEWBOX_SIZE / 2}
        y={BASELINE_Y}
        textAnchor="middle"
        fill="currentColor"
        fontSize={FONT_SIZE}
        fontWeight={400}
        fontStyle="normal"
        style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
      >
        V
      </text>
      <text
        x={SUPERSCRIPT_X}
        y={SUPERSCRIPT_BASELINE_Y}
        textAnchor="start"
        fill="currentColor"
        fontSize={SUPERSCRIPT_FONT_SIZE}
        fontWeight={400}
        fontStyle="normal"
        style={{ fontFamily: "var(--font-newsreader), Georgia, serif", letterSpacing: "-0.02em" }}
      >
        S
      </text>
    </svg>
  );
}
