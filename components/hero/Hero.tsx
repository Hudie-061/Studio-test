"use client";

import { motion } from "framer-motion";
import GrainOverlay from "@/components/shared/GrainOverlay";
import HeroHeadline from "./HeroHeadline";
import MagneticButton from "@/components/shared/MagneticButton";
import Navigation from "@/components/shared/Navigation";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col overflow-hidden bg-[#0F0E0C]"
    >
      <GrainOverlay />
      <Navigation />

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="w-full md:w-3/5 xl:w-1/2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-8"
          >
            {t.hero.label}
          </motion.p>

          <HeroHeadline />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter text-base md:text-lg text-[#A39E96] max-w-xl leading-relaxed mt-14"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 mt-10"
          >
            <MagneticButton>
              <a
                href="#contact-form"
                data-cursor="cta"
                className="inline-block font-inter text-[11px] tracking-widest uppercase text-[#C8895A] border border-[#C8895A] px-10 py-4 hover:bg-[#C8895A] hover:text-[#0F0E0C] transition-all duration-300"
              >
                {t.hero.ctaPrimary}
              </a>
            </MagneticButton>

            <a
              href="#work"
              className="group flex items-center gap-1.5 font-inter text-sm text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300"
            >
              {t.hero.ctaSecondary}
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-6 md:px-12 pb-8 flex justify-between items-end max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="font-inter text-[10px] tracking-widest text-[#5C5853]"
        >
          {t.hero.since}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-[30px] bg-[#6B7A6E] animate-scroll-bounce" />
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#5C5853]">
            {t.hero.scroll}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
