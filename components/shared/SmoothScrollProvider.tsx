"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// /privacy and /legal are plain compliance documents — no smooth-scroll
// easing, just native scroll behavior (see CustomCursor.tsx for the same
// exclusion on the custom cursor).
const LEGAL_ROUTE = /^\/(en|fr|nl)\/(privacy|legal)(\/|$)/;

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLegalPage = LEGAL_ROUTE.test(pathname ?? "");

  useEffect(() => {
    if (isLegalPage) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLegalPage]);

  return <>{children}</>;
}
