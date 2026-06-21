"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/context/TranslationContext";

export interface LanguageSwitcherProps {
  className?: string;
}

interface LanguageOption {
  code: Locale;
  label: string;
  fullName: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "EN", fullName: "English" },
  { code: "fr", label: "FR", fullName: "Français" },
  { code: "nl", label: "NL", fullName: "Nederlands" },
];

const LOCALE_CODES: Locale[] = LANGUAGES.map((language) => language.code);

function isLocale(value: string): value is Locale {
  return (LOCALE_CODES as string[]).includes(value);
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const firstSegment = pathname.split("/")[1] ?? "";
  const currentLocale: Locale = isLocale(firstSegment) ? firstSegment : "en";
  const current =
    LANGUAGES.find((language) => language.code === currentLocale) ??
    LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) return;
    const segments = pathname.split("/");
    if (isLocale(segments[1] ?? "")) {
      segments[1] = locale;
      router.push(segments.join("/") || `/${locale}`);
    } else {
      router.push(`/${locale}`);
    }
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Change language, current: ${current.fullName}`}
        className="flex items-center gap-1.5 py-3 px-3 md:py-2 md:px-2 text-base md:text-sm font-inter font-normal text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8895A]"
      >
        {current.label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 min-w-[160px] py-2 bg-[#1A1816] border border-[#2A2825] rounded-sm shadow-lg z-50"
          >
            {LANGUAGES.map((language) => {
              const isCurrent = language.code === currentLocale;
              return (
                <button
                  key={language.code}
                  type="button"
                  role="option"
                  aria-selected={isCurrent}
                  aria-current={isCurrent ? "true" : undefined}
                  disabled={isCurrent}
                  onClick={() => switchLocale(language.code)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8895A] ${
                    isCurrent
                      ? "opacity-70 cursor-default"
                      : "cursor-pointer hover:bg-[rgba(245,241,234,0.05)]"
                  }`}
                >
                  <span>
                    <span className="block font-inter font-normal text-base text-[#F5F1EA]">
                      {language.label}
                    </span>
                    <span className="block font-inter font-light text-xs text-[#A39E96]">
                      {language.fullName}
                    </span>
                  </span>
                  {isCurrent && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[#C8895A]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
