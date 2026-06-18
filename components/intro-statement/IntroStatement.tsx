"use client";

import { motion } from "framer-motion";
import GrainOverlay from "@/components/shared/GrainOverlay";
import TextReveal from "@/components/shared/TextReveal";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function IntroStatement() {
  const { t } = useTranslation();
  const { headline, story, punchline } = t.intro;

  return (
    <section
      data-bg="warm"
      className="relative overflow-hidden bg-[#F5F1EA] py-32 md:py-48 px-6 md:px-12"
    >
      <GrainOverlay opacity={0.025} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <TextReveal>
          <p className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-14">
            {t.intro.label}
          </p>
        </TextReveal>

        {/* Headline */}
        <TextReveal delay={0.08}>
          <h2 className="font-newsreader text-5xl md:text-7xl text-[#0F0E0C] leading-tight max-w-5xl mx-auto">
            <span className="block">{headline.line1}</span>
            <span className="block">{headline.line2}</span>
            <span className="block">
              {headline.line3}{" "}
              <em className="text-[#C8895A]">{headline.emphasis}</em>
            </span>
          </h2>
        </TextReveal>

        {/* Gap */}
        <div className="h-12 md:h-20" />

        {/* Origin story */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <TextReveal delay={0.16}>
            <p className="font-inter text-lg text-[#0F0E0C] leading-relaxed">
              {story.paragraph1}
            </p>
          </TextReveal>
          <TextReveal delay={0.24}>
            <p className="font-inter text-lg text-[#0F0E0C] leading-relaxed">
              {story.paragraph2}
            </p>
          </TextReveal>
        </div>

        {/* Gap */}
        <div className="h-[60px]" />

        {/* Value proposition punchline */}
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
            className="w-10 h-px bg-[#C8895A] origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="font-newsreader text-3xl md:text-5xl text-[#0F0E0C] text-center py-8"
          >
            <em>{punchline.line1}</em>
            <br />
            {punchline.line2}
            <br />
            <em>{punchline.line3}</em>
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="w-10 h-px bg-[#C8895A] origin-center"
          />
        </div>

        {/* Gap */}
        <div className="h-[60px]" />

        {/* Closing statement */}
        <TextReveal delay={0.2}>
          <p className="font-newsreader italic text-xl text-[#0F0E0C] opacity-70 text-center max-w-2xl mx-auto">
            {t.intro.closing}
          </p>
        </TextReveal>
      </div>
    </section>
  );
}
