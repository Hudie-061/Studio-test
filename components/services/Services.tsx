"use client";

import TextReveal from "@/components/shared/TextReveal";
import ServicesList from "./ServicesList";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="py-32 md:py-48 px-6 md:px-12 bg-[#0F0E0C]"
    >
      <div className="max-w-7xl mx-auto">
        <TextReveal>
          <p className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-8">
            {t.services.label}
          </p>
        </TextReveal>

        <TextReveal delay={0.08}>
          <h2 className="font-newsreader text-4xl md:text-6xl lg:text-7xl text-[#F5F1EA] leading-tight mb-8">
            {t.services.heading}
          </h2>
        </TextReveal>

        <TextReveal delay={0.16}>
          <p className="font-inter text-base md:text-lg text-[#A39E96] max-w-2xl leading-relaxed mb-20">
            {t.services.intro}
          </p>
        </TextReveal>

        <ServicesList />

        <TextReveal delay={0.3}>
          <p className="font-inter text-sm text-[#5C5853] text-center mt-20">
            {t.services.caption}
          </p>
        </TextReveal>
      </div>
    </section>
  );
}
