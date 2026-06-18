"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function HeroHeadline() {
  const { t } = useTranslation();
  const { line1, line2, line3, italicAmber } = t.hero.headline;

  const lines = [line1, line2, line3];
  // flatten to compute stagger indices
  const flat = lines.flatMap((line, li) => line.map((_, wi) => ({ li, wi })));

  return (
    <h1 className="font-newsreader text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.04] tracking-tight">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => {
            const idx = flat.findIndex((w) => w.li === li && w.wi === wi);
            const isEmphasis = word === italicAmber;
            return (
              <motion.span
                key={`${li}-${wi}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.35 + idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={[
                  "inline-block mr-[0.22em]",
                  isEmphasis ? "italic" : "",
                  isEmphasis ? "text-[#C8895A]" : "text-[#F5F1EA]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
