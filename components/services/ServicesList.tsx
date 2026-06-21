"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function ServicesList() {
  const { t } = useTranslation();
  const services = t.services.items;

  return (
    <div>
      {services.map((service, i) => (
        <motion.div
          key={service.numeral}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.75,
            delay: i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="border-t border-[rgba(245,241,234,0.08)] py-12 flex flex-col md:flex-row md:items-start gap-6 md:gap-0"
        >
          {/* Roman numeral */}
          <motion.p
            initial={{ rotate: -8 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: i * 0.06 + 0.12,
            }}
            className="font-newsreader text-5xl md:text-7xl text-[#C8895A] w-full md:w-[10%] shrink-0 leading-none select-none"
          >
            {service.numeral}
          </motion.p>

          {/* Name */}
          <h3 className="font-newsreader text-2xl md:text-4xl text-[#F5F1EA] w-full md:w-[40%] shrink-0 leading-tight md:pt-2">
            {service.name}
          </h3>

          {/* Description */}
          <p className="font-inter text-base text-[#A39E96] leading-relaxed w-full md:w-[40%] md:pt-2">
            {service.description}
          </p>

          {/* Inquire link */}
          <div className="w-full md:w-[10%] md:text-right md:pt-2 shrink-0">
            <a
              href="#contact-form"
              className="font-inter text-[10px] uppercase tracking-widest text-[#6B7A6E] hover:text-[#C8895A] transition-colors duration-300 whitespace-nowrap"
            >
              {t.services.inquire} →
            </a>
          </div>
        </motion.div>
      ))}
      <div className="border-t border-[rgba(245,241,234,0.08)]" />
    </div>
  );
}
