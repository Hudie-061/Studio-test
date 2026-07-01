"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { LogoMark } from "@/components/logo/LogoMark";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, lang } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: t.nav.work,    href: `/${lang}#work`    },
    { label: t.nav.process, href: `/${lang}#process` },
    { label: t.nav.contact, href: `/${lang}#contact` },
  ];

  const drawerItems = [
    { label: t.nav.work,     href: `/${lang}#work`         },
    { label: t.nav.process,  href: `/${lang}#process`      },
    { label: t.nav.services, href: `/${lang}#services`     },
    { label: t.nav.contact,  href: `/${lang}#contact-form` },
  ];

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 right-0 left-0 z-50 flex justify-between items-center px-6 md:px-12 py-7 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md bg-[#0F0E0C]/60" : ""
        }`}
      >
        <Link href={`/${lang}`} aria-label="VANTIR Studio home">
          <LogoMark size={28} showSubtitle className="hidden md:block" />
          <LogoMark size={24} showSubtitle={false} className="md:hidden" />
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex items-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-inter text-sm text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F5F1EA] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Language switcher — far right */}
          <LanguageSwitcher className="ml-2 pl-6 border-l border-[rgba(245,241,234,0.12)]" />

          {/* Hamburger trigger — mobile only, after the switcher */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={isMenuOpen}
            className="md:hidden relative w-11 h-11 -mr-2 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8895A]"
          >
            <span className="relative w-[18px] h-2 block">
              <motion.span
                className="absolute left-0 top-0 w-full h-px bg-[#F5F1EA]"
                animate={isMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-0 bottom-0 w-full h-px bg-[#F5F1EA]"
                animate={isMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menuOpen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-[60] bg-[#0F0E0C] flex flex-col"
          >
            {/* Top row — matches main nav padding */}
            <div className="flex justify-between items-center px-6 py-7">
              <Link href={`/${lang}`} aria-label="VANTIR Studio home" onClick={closeMenu}>
                <LogoMark size={24} showSubtitle={false} />
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label={t.nav.menuClose}
                className="relative w-11 h-11 -mr-2 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8895A]"
              >
                <span className="relative w-[18px] h-[18px] block">
                  <span className="absolute left-0 top-1/2 w-full h-px bg-[#F5F1EA] -translate-y-1/2 rotate-45" />
                  <span className="absolute left-0 top-1/2 w-full h-px bg-[#F5F1EA] -translate-y-1/2 -rotate-45" />
                </span>
              </button>
            </div>

            {/* Editorial links */}
            <nav className="flex-1 flex flex-col justify-center px-6">
              <ul className="flex flex-col space-y-8">
                {drawerItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="font-newsreader text-4xl text-[#F5F1EA] hover:text-[#C8895A] transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer contact info */}
            <div className="px-6 py-10 flex flex-col gap-2">
              <a
                href={`mailto:${t.contact.methods.email.handle}`}
                className="font-inter text-sm text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300"
              >
                {t.contact.methods.email.handle}
              </a>
              <a
                href="tel:+32477045071"
                className="font-inter text-sm text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300"
              >
                {t.contact.methods.whatsapp.handle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
