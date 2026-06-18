"use client";

import { motion } from "framer-motion";
import GrainOverlay from "@/components/shared/GrainOverlay";
import TextReveal from "@/components/shared/TextReveal";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { useTranslation } from "@/lib/hooks/useTranslation";
import type { ProjectData } from "@/lib/projects/index";

interface CaseStudyPageProps {
  project: ProjectData;
}

function SectionBlock({
  label,
  title,
  body,
  dark,
  delay = 0,
}: {
  label: string;
  title: string;
  body: string;
  dark: boolean;
  delay?: number;
}) {
  return (
    <section
      data-bg={dark ? undefined : "warm"}
      className={`py-32 md:py-48 px-6 md:px-12 ${
        dark ? "bg-[#0F0E0C]" : "bg-[#F5F1EA]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <TextReveal delay={delay}>
          <p
            className={`font-inter text-[10px] tracking-widest uppercase mb-8 ${
              dark ? "text-[#C8895A]" : "text-[#C8895A]"
            }`}
          >
            {label}
          </p>
        </TextReveal>
        <TextReveal delay={delay + 0.08}>
          <h2
            className={`font-newsreader text-4xl md:text-5xl leading-tight mb-12 ${
              dark ? "text-[#F5F1EA]" : "text-[#0F0E0C]"
            }`}
          >
            {title}
          </h2>
        </TextReveal>
        <TextReveal delay={delay + 0.16}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
            <p
              className={`font-inter text-lg leading-relaxed ${
                dark ? "text-[#A39E96]" : "text-[#5C5853]"
              }`}
            >
              {body}
            </p>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}

export default function CaseStudyPage({ project }: CaseStudyPageProps) {
  const { t, lang } = useTranslation();
  const fa = t.forestAwakening;

  return (
    <div className="bg-[#0F0E0C] min-h-screen">
      {/* Sticky nav */}
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-28 pb-6 px-6 md:px-12 max-w-7xl mx-auto">
        <TextReveal>
          <p className="font-inter text-[10px] tracking-widest uppercase text-[#6B7A6E]">
            {fa.breadcrumb}
          </p>
        </TextReveal>
      </div>

      {/* Hero block — 60vh */}
      <section className="min-h-[60vh] px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* Left — editorial metadata */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-4">
            <TextReveal delay={0.08}>
              <h1 className="font-newsreader text-5xl md:text-7xl text-[#F5F1EA] leading-tight mb-12">
                {fa.title}
              </h1>
            </TextReveal>

            <TextReveal delay={0.16}>
              <div className="grid grid-cols-2 gap-x-10 gap-y-6 border-t border-[rgba(245,241,234,0.08)] pt-10">
                {[
                  { label: "CLIENT",      value: project.client      },
                  { label: "YEAR",        value: project.year        },
                  { label: "CATEGORY",    value: project.category    },
                  { label: "DELIVERABLE", value: project.deliverable },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-inter text-[10px] uppercase tracking-widest text-[#5C5853] mb-2">
                      {label}
                    </p>
                    <p className="font-inter text-sm text-[#F5F1EA]">{value}</p>
                  </div>
                ))}
              </div>
            </TextReveal>
          </div>

          {/* Right — hero visual placeholder */}
          <TextReveal className="w-full lg:w-1/2" delay={0.1} y={40}>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: project.aspectRatio, maxHeight: "60vh" }}
            >
              <div
                className="absolute inset-0"
                style={{ background: project.heroGradient }}
              />
              {/* Ambient glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse 60% 40% at 50% 30%, ${project.accentColor}50, transparent 70%)`,
                }}
              />
              <GrainOverlay opacity={0.04} />
            </div>
          </TextReveal>

        </div>
      </section>

      {/* Video section */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-[#0F0E0C]">
        <div className="max-w-5xl mx-auto">
          {project.videoEmbed ? (
            <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
              <iframe
                src={`https://player.vimeo.com/video/${project.videoEmbed}?autoplay=0&loop=1&background=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={fa.title}
              />
            </div>
          ) : (
            <div
              className="relative flex items-center justify-center bg-[#1A1816]"
              style={{ aspectRatio: "9/16", maxHeight: "80vh" }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: project.heroGradient }}
              />
              <p className="font-newsreader italic text-2xl text-[#A39E96] relative z-10 text-center px-8">
                {fa.videoPlaceholder}
              </p>
            </div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-sm text-[#5C5853] text-center mt-8"
          >
            {fa.videoCaption}
          </motion.p>
        </div>
      </section>

      {/* Brief / Approach / Result */}
      <SectionBlock
        label={fa.brief.label}
        title={fa.brief.title}
        body={fa.brief.body}
        dark={false}
      />
      <SectionBlock
        label={fa.approach.label}
        title={fa.approach.title}
        body={fa.approach.body}
        dark={true}
      />
      <SectionBlock
        label={fa.result.label}
        title={fa.result.title}
        body={fa.result.body}
        dark={false}
      />

      {/* Footer navigation */}
      <section className="py-20 px-6 md:px-12 bg-[#0F0E0C]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-[rgba(245,241,234,0.08)] pt-12">
            <a
              href={`/${lang}#work`}
              className="font-inter text-sm text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300"
            >
              {fa.backToWork}
            </a>
            <a
              href={`/${lang}#services`}
              className="font-inter text-sm text-[#C8895A] hover:text-[#D4A574] transition-colors duration-300"
            >
              {fa.viewServices}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
