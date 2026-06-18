"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isCTA, setIsCTA]       = useState(false);
  const [onWarm, setOnWarm]     = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 280, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 280, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as Element;
      const isWarm      = !!target.closest('[data-bg="warm"]');
      const interactive = !!target.closest("a, button, [data-cursor]");
      const cta         = !!target.closest('[data-cursor="cta"]');

      setOnWarm(isWarm);
      setIsCTA(cta);
      setHovering(interactive || cta);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  /* Border / fill logic:
     • CTA hover   → filled amber circle
     • Warm bg     → dark border (for contrast)
     • Default     → cream border on dark bg
  */
  const borderColor = isCTA
    ? "#C8895A"
    : onWarm
    ? "#0F0E0C"
    : "#F5F1EA";
  const bgColor = isCTA ? "#C8895A" : "transparent";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          width:           hovering ? 40 : 8,
          height:          hovering ? 40 : 8,
          backgroundColor: bgColor,
          borderColor,
          borderWidth: 1,
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </motion.div>
  );
}
