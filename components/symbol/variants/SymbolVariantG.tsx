interface SymbolVariantProps {
  size?: number;
  className?: string;
}

const VIEWBOX_SIZE = 96;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.8;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const V_WIDTH = FONT_SIZE * 0.64;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const TOP_Y = (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2;
const BASELINE_Y = TOP_Y + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;

const FLOURISH_ANGLE_DEG = 30;
const FLOURISH_LENGTH = VIEWBOX_SIZE * 0.17;
const FLOURISH_BASE_WIDTH = VIEWBOX_SIZE * 0.035;
const FLOURISH_START_X = VIEWBOX_SIZE / 2 + V_WIDTH * 0.2;
const FLOURISH_START_Y = BASELINE_Y - 2;

const ANGLE_RAD = (FLOURISH_ANGLE_DEG * Math.PI) / 180;
const DIR_X = Math.cos(ANGLE_RAD);
const DIR_Y = Math.sin(ANGLE_RAD);
const PERP_X = -DIR_Y;
const PERP_Y = DIR_X;

const TIP_X = FLOURISH_START_X + DIR_X * FLOURISH_LENGTH;
const TIP_Y = FLOURISH_START_Y + DIR_Y * FLOURISH_LENGTH;
const BASE_LEFT_X = FLOURISH_START_X + PERP_X * (FLOURISH_BASE_WIDTH / 2);
const BASE_LEFT_Y = FLOURISH_START_Y + PERP_Y * (FLOURISH_BASE_WIDTH / 2);
const BASE_RIGHT_X = FLOURISH_START_X - PERP_X * (FLOURISH_BASE_WIDTH / 2);
const BASE_RIGHT_Y = FLOURISH_START_Y - PERP_Y * (FLOURISH_BASE_WIDTH / 2);

const FLOURISH_PATH = `M ${BASE_LEFT_X} ${BASE_LEFT_Y} L ${TIP_X} ${TIP_Y} L ${BASE_RIGHT_X} ${BASE_RIGHT_Y} Z`;

export default function SymbolVariantG({ size = 96, className = "" }: SymbolVariantProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label="VANTIR symbol mark — V with serif flourish"
      className={className}
    >
      <text
        x={VIEWBOX_SIZE / 2}
        y={BASELINE_Y}
        textAnchor="middle"
        fill="currentColor"
        fontSize={FONT_SIZE}
        fontWeight={400}
        fontStyle="italic"
        style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
      >
        V
      </text>
      <path d={FLOURISH_PATH} fill="currentColor" />
    </svg>
  );
}
