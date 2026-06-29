interface SymbolVariantProps {
  size?: number;
  className?: string;
}

const VIEWBOX_SIZE = 96;
const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.7;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const V_WIDTH = FONT_SIZE * 0.64;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const TOP_Y = (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2;
const BASELINE_Y = TOP_Y + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;
const CENTER_Y = (TOP_Y + BASELINE_Y) / 2;

const BRACKET_HEIGHT = TARGET_CAP_HEIGHT * 0.6;
const BRACKET_TOP = CENTER_Y - BRACKET_HEIGHT / 2;
const BRACKET_BOTTOM = CENTER_Y + BRACKET_HEIGHT / 2;
const BRACKET_GAP = VIEWBOX_SIZE * 0.145;
const BRACKET_TICK = VIEWBOX_SIZE * 0.05;

const LEFT_X = VIEWBOX_SIZE / 2 - (V_WIDTH / 2 + BRACKET_GAP);
const RIGHT_X = VIEWBOX_SIZE / 2 + (V_WIDTH / 2 + BRACKET_GAP);

const LEFT_BRACKET_PATH = `M ${LEFT_X + BRACKET_TICK} ${BRACKET_TOP} L ${LEFT_X} ${BRACKET_TOP} L ${LEFT_X} ${BRACKET_BOTTOM} L ${LEFT_X + BRACKET_TICK} ${BRACKET_BOTTOM}`;
const RIGHT_BRACKET_PATH = `M ${RIGHT_X - BRACKET_TICK} ${BRACKET_TOP} L ${RIGHT_X} ${BRACKET_TOP} L ${RIGHT_X} ${BRACKET_BOTTOM} L ${RIGHT_X - BRACKET_TICK} ${BRACKET_BOTTOM}`;

export default function SymbolVariantJ({ size = 96, className = "" }: SymbolVariantProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label="VANTIR symbol mark — V with editorial brackets"
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
      <path d={LEFT_BRACKET_PATH} stroke="currentColor" strokeWidth={1} fill="none" />
      <path d={RIGHT_BRACKET_PATH} stroke="currentColor" strokeWidth={1} fill="none" />
    </svg>
  );
}
