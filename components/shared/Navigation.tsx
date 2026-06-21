"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { LogoMark } from "@/components/logo/LogoMark";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t.nav.work,    href: "#work"    },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 flex justify-between items-center px-6 md:px-12 py-7 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[#0F0E0C]/60" : ""
      }`}
    >
      <a href="#" aria-label="VANTIR Studio">
        <LogoMark size={28} showSubtitle className="hidden md:block" />
        <LogoMark size={24} showSubtitle={false} className="md:hidden" />
      </a>

      <div className="flex items-center gap-6 md:gap-8">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="font-inter text-sm text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300 relative group"
          >
            {item.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F5F1EA] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}

        {/* Language switcher — far right */}
        <LanguageSwitcher className="ml-2 pl-6 border-l border-[rgba(245,241,234,0.12)]" />
      </div>
    </motion.nav>
  );
}
