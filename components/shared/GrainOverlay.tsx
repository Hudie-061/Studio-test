interface GrainOverlayProps {
  opacity?: number;
}

/**
 * Animated film-grain texture overlay.
 * Works on both dark and warm-cream backgrounds.
 * Place as first child of any `relative overflow-hidden` container.
 */
export default function GrainOverlay({ opacity = 0.035 }: GrainOverlayProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          top: "-100%",
          left: "-100%",
          width: "300%",
          height: "300%",
          opacity,
          animation: "grain 8s steps(10) infinite",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
