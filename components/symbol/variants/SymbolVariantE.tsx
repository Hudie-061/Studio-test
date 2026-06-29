interface SymbolVariantProps {
  size?: number;
  className?: string;
}

const VIEWBOX_SIZE = 96;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.6;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const V_WIDTH = FONT_SIZE * 0.64;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const TOP_Y = (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2;
const BASELINE_Y = TOP_Y + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;

const RULE_HALF_WIDTH = V_WIDTH * 0.7;

export default function SymbolVariantE({ size = 96, className = "" }: SymbolVariantProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label="VANTIR symbol mark — V with baseline rule"
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
      <line
        x1={VIEWBOX_SIZE / 2 - RULE_HALF_WIDTH}
        y1={BASELINE_Y}
        x2={VIEWBOX_SIZE / 2 + RULE_HALF_WIDTH}
        y2={BASELINE_Y}
        stroke="currentColor"
        strokeWidth={1}
      />
    </svg>
  );
}
