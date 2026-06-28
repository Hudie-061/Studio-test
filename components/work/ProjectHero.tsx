"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types";
import MagneticButton from "@/components/shared/MagneticButton";
import TextReveal from "@/components/shared/TextReveal";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface ProjectHeroProps {
  project: Project;
  imageLeft?: boolean;
  slug?: string;
}

export default function ProjectHero({
  project,
  imageLeft = true,
  slug,
}: ProjectHeroProps) {
  const { t, lang } = useTranslation();
  const caseStudyHref = slug ? `/${lang}/work/${slug}` : "#contact";

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto">
      <div
        className={`flex flex-col ${
          imageLeft ? "md:flex-row" : "md:flex-row-reverse"
        } gap-12 md:gap-20 items-start`}
      >
        {/* Visual placeholder */}
        <TextReveal
          className={imageLeft ? "w-full md:w-[60%]" : "w-full md:w-[60%]"}
          y={40}
        >
          <a
            href={caseStudyHref}
            aria-label={`${t.work.cta} — ${project.title}`}
            data-cursor="interactive"
            className="relative overflow-hidden group block"
            style={{ aspectRatio: project.aspectRatio }}
          >
            <div
              className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
              style={{ background: project.thumbnailGradient }}
            />
            {project.poster && (
              <Image
                src={project.poster}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="absolute inset-0 object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
              />
            )}
            <div
              className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse 65% 45% at 50% 28%, ${project.accentColor}38, transparent 70%)`,
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0F0E0C]/60 to-transparent" />
            {project.poster && (
              <div
                className="absolute inset-x-0 bottom-0 h-1/4"
                style={{
                  background: "linear-gradient(to top, rgba(28,24,20,0.4) 0%, transparent 70%)",
                }}
              />
            )}
          </a>
        </TextReveal>

        {/* Editorial metadata */}
        <div className="w-full md:w-[40%] flex flex-col justify-center">
          <TextReveal>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-14 pb-14 border-b border-[rgba(245,241,234,0.08)]">
              {project.metadata.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-inter text-[10px] uppercase tracking-widest text-[#5C5853] mb-1.5">
                    {label}
                  </p>
                  <p className="font-inter text-sm text-[#F5F1EA]">{value}</p>
                </div>
              ))}
            </div>
          </TextReveal>

          <TextReveal delay={0.08}>
            <h3 className="font-newsreader text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#F5F1EA] leading-[1.05] mb-6">
              {project.title}
            </h3>
          </TextReveal>

          <TextReveal delay={0.14}>
            <p className="font-newsreader italic text-lg md:text-xl text-[#A39E96] max-w-md mb-5 leading-relaxed">
              {project.editorialDesc}
            </p>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="font-inter text-base text-[#A39E96] max-w-md leading-relaxed mb-12">
              {project.paragraph}
            </p>
          </TextReveal>

          <TextReveal delay={0.26}>
            <MagneticButton>
              <a
                href={caseStudyHref}
                className="group inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-widest text-[#C8895A] hover:text-[#D4A574] transition-colors duration-300"
                data-cursor="interactive"
              >
                {t.work.cta}
                <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </a>
            </MagneticButton>
          </TextReveal>
        </div>
      </div>
    </div>
  );
}
