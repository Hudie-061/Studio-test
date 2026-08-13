"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

// /privacy and /legal are plain compliance documents — no custom cursor,
// no motion. They restore the native cursor via the .legal-page class
// (see globals.css, which otherwise hides it site-wide with cursor: none).
const LEGAL_ROUTE = /^\/(en|fr|nl)\/(privacy|legal)(\/|$)/;

export default function CustomCursor() {
  const pathname = usePathname();
  const isLegalPage = LEGAL_ROUTE.test(pathname ?? "");

  const [visible, setVisible]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isCTA, setIsCTA]       = useState(false);
  const [onWarm, setOnWarm]     = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 280, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 280, damping: 28, mass: 0.5 });

  useEffect(() => {
    document.body.classList.toggle("legal-page", isLegalPage);
    return () => {
      document.body.classList.remove("legal-page");
    };
  }, [isLegalPage]);

  useEffect(() => {
    if (isLegalPage) return;
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
  }, [mouseX, mouseY, visible, isLegalPage]);

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

  if (isLegalPage) return null;

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
