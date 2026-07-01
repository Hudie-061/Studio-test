"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import TextReveal from "@/components/shared/TextReveal";
import ProjectHero from "./ProjectHero";
import type { Project } from "@/types";

const FOREST_AWAKENING: Project = {
  id: 1,
  category: "BRAND FILM · PREMIUM SPIRITS",
  title: "Forest Awakening",
  editorialDesc:
    "A botanical ritual. Cinematic AI direction exploring ingredient provenance through magical realism.",
  paragraph:
    "Built end-to-end as a speculative concept for a premium Belgian gin distillery. Generative imagery combined with cinematic 3D camera direction, organic transformation, and editorial colour treatment. Delivered as 30-second vertical hero film with native 2D and 3D motion.",
  thumbnailGradient:
    "linear-gradient(155deg, #1C1005 0%, #2D1E0A 30%, #3D2812 55%, #1A1005 80%, #0F0E0C 100%)",
  poster: "/work/forest-awakening/poster.png",
  accentColor: "#C8895A",
  aspectRatio: "9/16",
  metadata: [
    { label: "CLIENT",      value: "Belgian Premium Gin" },
    { label: "YEAR",        value: "2026" },
    { label: "DELIVERABLE", value: "30s Brand Film · 9:16" },
    { label: "CATEGORY",    value: "Spec Concept" },
  ],
};

export default function Work() {
  const { t } = useTranslation();

  return (
    <section id="work" className="bg-[#0F0E0C]">
      {/* Section opener */}
      <div className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <p className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-6">
              {t.work.label}
            </p>
          </TextReveal>
          <TextReveal delay={0.08}>
            <h2 className="font-newsreader text-4xl md:text-6xl lg:text-7xl text-[#F5F1EA] leading-tight mb-8">
              {t.work.heading}
            </h2>
          </TextReveal>
          <TextReveal delay={0.16}>
            <p className="font-inter text-base md:text-lg text-[#A39E96] max-w-2xl leading-relaxed">
              {t.work.intro}
            </p>
          </TextReveal>
        </div>
      </div>

      {/* Breath */}
      <div className="h-8 md:h-24" aria-hidden="true" />

      {/* Forest Awakening */}
      <ProjectHero project={FOREST_AWAKENING} imageLeft slug="forest-awakening" />

      {/* Closing statement */}
      <div className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <TextReveal>
            <p className="font-inter text-[10px] tracking-widest uppercase text-[#6B7A6E] mb-6">
              {t.work.moreSoon}
            </p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="font-newsreader italic text-2xl text-[#A39E96] opacity-60 max-w-2xl mx-auto leading-relaxed">
              {t.work.closing}
            </p>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
