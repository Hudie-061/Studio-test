export interface SymbolVariantProps {
  size?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

const VIEWBOX_SIZE = 100;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.55;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const BASELINE_Y =
  (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2 + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;

const CIRCLE_INSET = VIEWBOX_SIZE * 0.08;
const CIRCLE_RADIUS = VIEWBOX_SIZE / 2 - CIRCLE_INSET;
const CIRCLE_STROKE_WIDTH = VIEWBOX_SIZE * 0.015;

export function SymbolVariantC({
  size = 120,
  color = "currentColor",
  bgColor = "transparent",
  className = "",
}: SymbolVariantProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label="VANTIR symbol mark — monogram"
      className={className}
    >
      {bgColor !== "transparent" && (
        <rect x={0} y={0} width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill={bgColor} />
      )}
      <circle
        cx={VIEWBOX_SIZE / 2}
        cy={VIEWBOX_SIZE / 2}
        r={CIRCLE_RADIUS}
        stroke={color}
        strokeWidth={CIRCLE_STROKE_WIDTH}
        fill="none"
      />
      <text
        x={VIEWBOX_SIZE / 2}
        y={BASELINE_Y}
        textAnchor="middle"
        fill={color}
        fontSize={FONT_SIZE}
        fontWeight={400}
        fontStyle="normal"
        style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
      >
        V
      </text>
    </svg>
  );
}
