interface SymbolVariantProps {
  size?: number;
  className?: string;
}

const VIEWBOX_SIZE = 96;
const FRAME_SIZE = VIEWBOX_SIZE * 0.8;
const FRAME_INSET = (VIEWBOX_SIZE - FRAME_SIZE) / 2;

const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.5;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const TOP_Y = (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2;
const BASELINE_Y = TOP_Y + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;

export default function SymbolVariantF({ size = 96, className = "" }: SymbolVariantProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label="VANTIR symbol mark — V in square frame"
      className={className}
    >
      <rect
        x={FRAME_INSET}
        y={FRAME_INSET}
        width={FRAME_SIZE}
        height={FRAME_SIZE}
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
      />
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
    </svg>
  );
}
