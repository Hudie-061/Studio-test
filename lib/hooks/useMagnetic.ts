"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface UseMagneticOptions {
  strength?: number;
  maxOffset?: number;
  stiffness?: number;
  damping?: number;
}

/**
 * Returns spring-driven x/y values and event handlers for a magnetic
 * hover effect. Attach `ref` to the element and spread the handlers.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.35,
  maxOffset = 8,
  stiffness = 200,
  damping = 20,
}: UseMagneticOptions = {}) {
  const ref = useRef<T>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping, mass: 0.1 });
  const springY = useSpring(y, { stiffness, damping, mass: 0.1 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - rect.left - rect.width / 2) * strength;
    const dy = (e.clientY - rect.top - rect.height / 2) * strength;
    x.set(Math.max(-maxOffset, Math.min(maxOffset, dx)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, dy)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, onMouseMove, onMouseLeave };
}
