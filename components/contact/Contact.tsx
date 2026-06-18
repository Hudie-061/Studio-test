"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import TextReveal from "@/components/shared/TextReveal";
import ContactForm from "./ContactForm";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface ContactMethod {
  label: string;
  handle: string;
  href: string;
}

function ContactMethodRow({ label, handle, href }: ContactMethod) {
  const ref  = useRef<HTMLAnchorElement>(null);
  const x    = useMotionValue(0);
  const y    = useMotionValue(0);
  const spX  = useSpring(x, { stiffness: 180, damping: 18, mass: 0.1 });
  const spY  = useSpring(y, { stiffness: 180, damping: 18, mass: 0.1 });

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top  - r.height / 2) * 0.25);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{ x: spX, y: spY }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group block w-fit"
      data-cursor="interactive"
    >
      <p className="font-newsreader text-2xl text-[#F5F1EA] leading-none mb-1.5">
        {label}
      </p>
      <p className="font-inter text-sm text-[#A39E96] tracking-wide group-hover:text-[#C8895A] group-hover:translate-x-2 transition-all duration-300">
        {handle}
      </p>
    </motion.a>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const { methods, heading } = t.contact;

  const METHODS: ContactMethod[] = [
    { label: methods.telegram.label, handle: methods.telegram.handle, href: "https://t.me/studioname"  },
    { label: methods.whatsapp.label, handle: methods.whatsapp.handle, href: "https://wa.me/32000000000" },
    { label: methods.email.label,    handle: methods.email.handle,    href: "mailto:hello@studio.com"   },
  ];

  return (
    <section
      id="contact"
      className="py-32 md:py-48 px-6 md:px-12 bg-[#0F0E0C]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-20 items-start">

          {/* Left — editorial content */}
          <TextReveal>
            <div>
              <p className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-10">
                {t.contact.label}
              </p>

              <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-[#F5F1EA] leading-[1.05] mb-10">
                {heading.line1}
                <br />
                {heading.line2}
              </h2>

              <p className="font-inter text-base md:text-lg text-[#A39E96] max-w-md leading-relaxed mb-16">
                {t.contact.intro}
              </p>

              <div className="flex flex-col gap-9">
                {METHODS.map((m) => (
                  <ContactMethodRow key={m.href} {...m} />
                ))}
              </div>
            </div>
          </TextReveal>

          {/* Right — cream contact panel */}
          <TextReveal delay={0.18}>
            <div
              data-bg="warm"
              className="bg-[#F5F1EA] py-12 px-10"
            >
              <p className="font-inter text-[10px] tracking-widest uppercase text-[#C8895A] mb-10">
                {t.contact.form.panelLabel}
              </p>
              <ContactForm />
            </div>
          </TextReveal>

        </div>
      </div>
    </section>
  );
}
