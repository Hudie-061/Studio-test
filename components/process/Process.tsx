"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import GrainOverlay from "@/components/shared/GrainOverlay";
import TextReveal from "@/components/shared/TextReveal";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface ProcessStep {
  label: string;
  romanNumeral: string;
  title: string;
  description: string;
}

function StepMarker({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        damping: 12,
        stiffness: 180,
        delay: index * 0.15,
      }}
      whileHover={{ scale: 1.15 }}
      className="w-12 h-12 rounded-full bg-[#C8895A] flex items-center justify-center flex-shrink-0 relative z-10 cursor-pointer"
    >
      <span className="font-newsreader text-xl text-[#0F0E0C] select-none">
        {step.romanNumeral}
      </span>
    </motion.div>
  );
}

function Connector() {
  return <div className="w-px h-10 bg-[#6B7A6E] flex-shrink-0" />;
}

function StepCard({
  step,
  index,
  mobile = false,
}: {
  step: ProcessStep;
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
      whileHover={{ y: -2 }}
      className={mobile ? "w-full" : "w-full text-center"}
    >
      <p className="font-inter text-[10px] tracking-widest uppercase text-[#6B7A6E] mb-3">
        {step.label}
      </p>
      <h3 className="font-newsreader text-2xl lg:text-3xl text-[#0F0E0C] mb-3 leading-tight">
        {step.title}
      </h3>
      <p className="font-inter text-base text-[#5C5853] leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const steps: ProcessStep[] = t.process.steps;
  const { headline } = t.process;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const smoothProgress = useSpring(rawProgress, { damping: 30, stiffness: 100 });

  return (
    <section
      ref={sectionRef}
      id="process"
      data-bg="warm"
      className="relative overflow-hidden bg-[#F5F1EA] py-32 md:py-48 px-6 md:px-12"
    >
      <GrainOverlay opacity={0.025} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <TextReveal>
            <p className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-8">
              {t.process.label}
            </p>
          </TextReveal>

          <TextReveal delay={0.08}>
            <h2 className="font-newsreader text-5xl md:text-7xl text-[#0F0E0C] leading-[1.05] mb-[60px]">
              {headline.line1}
              <br />
              {headline.line2}{" "}
              <em className="text-[#C8895A]">{headline.italicAmber}</em>
            </h2>
          </TextReveal>

          <TextReveal delay={0.14}>
            <p className="font-inter text-lg text-[#5C5853] max-w-2xl mx-auto leading-relaxed">
              {t.process.subtitle}
            </p>
          </TextReveal>
        </div>

        <div className="h-[100px]" />

        {/* Desktop: horizontal zigzag timeline */}
        <div className="hidden lg:block">
          <div className="relative h-[700px]">
            <div
              className="absolute left-0 right-0 h-[2px] bg-[#C8895A]/20 pointer-events-none"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            />
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-[#C8895A] origin-left pointer-events-none"
              style={{
                top: "50%",
                translateY: "-50%",
                scaleX: smoothProgress,
              }}
            />

            <div className="absolute inset-0 flex">
              {steps.map((step, i) => {
                const above = i % 2 === 1;
                return (
                  <div
                    key={step.romanNumeral}
                    className="flex-1 flex flex-col items-center h-full px-3"
                  >
                    <div className="flex-1 flex flex-col items-center justify-end">
                      {above && (
                        <>
                          <StepCard step={step} index={i} />
                          <Connector />
                        </>
                      )}
                    </div>

                    <StepMarker step={step} index={i} />

                    <div className="flex-1 flex flex-col items-center justify-start">
                      {!above && (
                        <>
                          <Connector />
                          <StepCard step={step} index={i} />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          <div
            className="absolute inset-y-0 w-[2px] bg-[#C8895A]/20 pointer-events-none"
            style={{ left: "23px" }}
          />
          <motion.div
            className="absolute inset-y-0 w-[2px] bg-[#C8895A] origin-top pointer-events-none"
            style={{ left: "23px", scaleY: smoothProgress }}
          />

          <div className="space-y-14">
            {steps.map((step, i) => (
              <div key={step.romanNumeral} className="flex items-start gap-8">
                <StepMarker step={step} index={i} />
                <div className="pt-2 flex-1">
                  <StepCard step={step} index={i} mobile />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-[100px]">
          <TextReveal delay={0.2}>
            <p className="font-newsreader italic text-2xl md:text-3xl text-[#0F0E0C] opacity-80 max-w-2xl mx-auto text-center leading-relaxed">
              &ldquo;{t.process.closing.split("\n")[0]}
              <br />
              {t.process.closing.split("\n")[1]}&rdquo;
            </p>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
