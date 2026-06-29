import { useId } from "react";

interface SymbolVariantProps {
  size?: number;
  className?: string;
}

const VIEWBOX_SIZE = 96;
const DISC_RADIUS = VIEWBOX_SIZE * 0.42;

const CAP_HEIGHT_RATIO = 0.78;
const TARGET_CAP_HEIGHT = VIEWBOX_SIZE * 0.55;
const FONT_SIZE = TARGET_CAP_HEIGHT / CAP_HEIGHT_RATIO;
const OPTICAL_SHIFT = VIEWBOX_SIZE * 0.02;
const TOP_Y = (VIEWBOX_SIZE - TARGET_CAP_HEIGHT) / 2;
const BASELINE_Y = TOP_Y + TARGET_CAP_HEIGHT - OPTICAL_SHIFT;

export default function SymbolVariantI({ size = 96, className = "" }: SymbolVariantProps) {
  const maskId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label="VANTIR symbol mark — negative V"
      className={className}
    >
      <mask id={maskId}>
        <rect x={0} y={0} width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill="white" />
        <text
          x={VIEWBOX_SIZE / 2}
          y={BASELINE_Y}
          textAnchor="middle"
          fill="black"
          fontSize={FONT_SIZE}
          fontWeight={400}
          fontStyle="normal"
          style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
        >
          V
        </text>
      </mask>
      <circle
        cx={VIEWBOX_SIZE / 2}
        cy={VIEWBOX_SIZE / 2}
        r={DISC_RADIUS}
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
