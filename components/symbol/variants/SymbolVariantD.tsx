export interface SymbolVariantProps {
  size?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

const VIEWBOX_SIZE = 100;
const CHEVRON_WIDTH = VIEWBOX_SIZE * 0.6;
const CHEVRON_HEIGHT = VIEWBOX_SIZE * 0.5;
const STROKE_WIDTH = VIEWBOX_SIZE * 0.08;

const LEFT_X = (VIEWBOX_SIZE - CHEVRON_WIDTH) / 2;
const RIGHT_X = LEFT_X + CHEVRON_WIDTH;
const TOP_Y = (VIEWBOX_SIZE - CHEVRON_HEIGHT) / 2;
const BOTTOM_Y = TOP_Y + CHEVRON_HEIGHT;
const CENTER_X = VIEWBOX_SIZE / 2;

const CHEVRON_PATH = `M ${LEFT_X} ${TOP_Y} L ${CENTER_X} ${BOTTOM_Y} L ${RIGHT_X} ${TOP_Y}`;

export function SymbolVariantD({
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
      aria-label="VANTIR symbol mark — chevron"
      className={className}
    >
      {bgColor !== "transparent" && (
        <rect x={0} y={0} width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill={bgColor} />
      )}
      <path
        d={CHEVRON_PATH}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
