export interface SymbolVariantProps {
  size?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

const VIEWBOX_SIZE = 100;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.75;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.025;
const BASELINE_Y =
  (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2 + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;

export function SymbolVariantA({
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
      aria-label="VANTIR symbol mark"
      className={className}
    >
      {bgColor !== "transparent" && (
        <rect x={0} y={0} width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill={bgColor} />
      )}
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
