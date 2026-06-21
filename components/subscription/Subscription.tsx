"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/shared/TextReveal";
import { useTranslation } from "@/lib/hooks/useTranslation";

const RECOMMENDED_PLAN_KEY = "considered";

export default function Subscription() {
  const { t } = useTranslation();
  const { headline, tiers } = t.subscription;

  function handleSubscribeClick(planKey: string) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.location.hash = `contact?plan=${planKey}`;
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  return (
    <section
      id="subscription"
      className="py-32 md:py-48 px-6 md:px-12 bg-[#0F0E0C]"
    >
      <div className="max-w-7xl mx-auto">
        <TextReveal>
          <p className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-8">
            {t.subscription.label}
          </p>
        </TextReveal>

        <TextReveal delay={0.08}>
          <h2 className="font-newsreader text-4xl md:text-6xl lg:text-7xl text-[#F5F1EA] leading-tight mb-8">
            {headline.line1}
            <br />
            {headline.line2}{" "}
            <em className="text-[#C8895A]">{headline.italicAmber}</em>
          </h2>
        </TextReveal>

        <TextReveal delay={0.16}>
          <p className="font-inter text-base md:text-lg text-[#A39E96] max-w-2xl leading-relaxed mb-20">
            {t.subscription.subhead}
          </p>
        </TextReveal>

        <div>
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.numeral}
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
                {tier.numeral}
              </motion.p>

              {/* Name + description */}
              <div className="w-full md:w-[55%] shrink-0">
                <h3 className="font-newsreader text-2xl md:text-4xl text-[#F5F1EA] leading-tight md:pt-2 mb-3">
                  {tier.name}
                  {tier.planKey === RECOMMENDED_PLAN_KEY && (
                    <span className="ml-3 align-middle font-inter text-[10px] uppercase tracking-widest text-[#C8895A] border border-[#C8895A]/40 rounded-full px-2.5 py-1">
                      {t.subscription.recommended}
                    </span>
                  )}
                </h3>
                <p className="font-inter text-base text-[#A39E96] leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Price + Subscribe link */}
              <div className="w-full md:w-[35%] md:text-right md:pt-2 flex flex-col md:items-end gap-3">
                <p className="font-newsreader text-lg text-[#F5F1EA]">{tier.price}</p>
                <a
                  href={`#contact?plan=${tier.planKey}`}
                  onClick={handleSubscribeClick(tier.planKey)}
                  className="font-inter text-[10px] uppercase tracking-widest text-[#6B7A6E] hover:text-[#C8895A] transition-colors duration-300 whitespace-nowrap"
                >
                  {t.subscription.subscribe} →
                </a>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[rgba(245,241,234,0.08)]" />
        </div>
      </div>
    </section>
  );
}
