export default function GodRays() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Warm cream rays */}
          <linearGradient id="gr-cream-a" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#F5F1EA" stopOpacity="0.10" />
            <stop offset="65%"  stopColor="#F5F1EA" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#F5F1EA" stopOpacity="0"    />
          </linearGradient>
          <linearGradient id="gr-cream-b" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#F5F1EA" stopOpacity="0.06" />
            <stop offset="80%"  stopColor="#F5F1EA" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#F5F1EA" stopOpacity="0"    />
          </linearGradient>
          {/* Amber accent ray */}
          <linearGradient id="gr-amber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#B87333" stopOpacity="0.07" />
            <stop offset="55%"  stopColor="#B87333" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#B87333" stopOpacity="0"    />
          </linearGradient>
          <linearGradient id="gr-amber-thin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#D4A574" stopOpacity="0.05" />
            <stop offset="70%"  stopColor="#D4A574" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#D4A574" stopOpacity="0"    />
          </linearGradient>
        </defs>

        {/* Ray 1 — wide, left-of-center, cream */}
        <g style={{ animation: "godray1 11s ease-in-out infinite", transformOrigin: "600px 0" }}>
          <polygon points="480,-5 710,-5 950,905 240,905" fill="url(#gr-cream-a)" />
        </g>

        {/* Ray 2 — narrow, far right, amber accent */}
        <g style={{ animation: "godray2 15s ease-in-out infinite 1.5s", transformOrigin: "1050px 0" }}>
          <polygon points="990,-5 1110,-5 1260,905 840,905" fill="url(#gr-amber)" />
        </g>

        {/* Ray 3 — very thin, left edge, cream */}
        <g style={{ animation: "godray3 13s ease-in-out infinite 3s", transformOrigin: "180px 0" }}>
          <polygon points="140,-5 220,-5 340,905 60,905" fill="url(#gr-cream-b)" />
        </g>

        {/* Ray 4 — center-right, warm amber thin */}
        <g style={{ animation: "godray4 18s ease-in-out infinite 5s", transformOrigin: "820px 0" }}>
          <polygon points="780,-5 860,-5 960,905 680,905" fill="url(#gr-amber-thin)" />
        </g>

        {/* Ray 5 — far left, very subtle */}
        <g style={{ animation: "godray1 20s ease-in-out infinite 8s", transformOrigin: "320px 0" }}>
          <polygon points="280,-5 370,-5 480,905 170,905" fill="url(#gr-cream-b)" />
        </g>
      </svg>

      {/* Radial vignette to keep edges dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, #0A0908 75%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0908)",
        }}
      />
    </div>
  );
}
