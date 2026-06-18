"use client";

import { useRef, ElementType } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ContactLinkProps {
  icon: ElementType;
  label: string;
  handle: string;
  href: string;
}

export default function ContactLink({
  icon: Icon,
  label,
  handle,
  href,
}: ContactLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="flex items-center gap-4 group w-fit"
      data-cursor="interactive"
    >
      {/* Icon circle */}
      <div className="w-10 h-10 rounded-full border border-[#4A4845] flex items-center justify-center shrink-0 group-hover:border-[#B87333] transition-colors duration-300">
        <Icon
          size={16}
          className="text-[#888782] group-hover:text-[#B87333] transition-colors duration-300"
        />
      </div>

      {/* Text */}
      <div>
        <p className="font-inter text-base text-[#F5F1EA] group-hover:text-[#B87333] transition-colors duration-300 leading-none mb-1">
          {label}
        </p>
        <p className="font-inter text-sm text-[#888782] leading-none">
          {handle}
        </p>
      </div>
    </motion.a>
  );
}
