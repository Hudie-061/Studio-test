"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/lib/hooks/useTranslation";
import type { Locale } from "@/lib/context/TranslationContext";

const LOCALES: Locale[] = ["en", "fr", "nl"];

export default function Footer() {
  const { t, lang } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || `/${locale}`);
  }

  const footerLinks = [
    { label: t.footer.links[0], href: "#work"     },
    { label: t.footer.links[1], href: "#process"  },
    { label: t.footer.links[2], href: "#services" },
    { label: t.footer.links[3], href: "#contact"  },
  ];

  return (
    <footer className="border-t border-[rgba(245,241,234,0.08)] py-16 px-6 md:px-12 bg-[#0F0E0C]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-10">
          {/* Left — studio mark */}
          <div>
            <p className="font-newsreader italic text-2xl text-[#F5F1EA] leading-none mb-2">
              {t.footer.logo}
            </p>
            <p className="font-inter text-xs tracking-widest uppercase text-[#6B7A6E] mb-3">
              {t.footer.location}
            </p>
            <p className="font-inter text-xs text-[#5C5853]">
              {t.footer.since}
            </p>
          </div>

          {/* Center — nav links */}
          <div className="flex flex-wrap items-center gap-6 md:justify-center">
            {footerLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-inter text-sm text-[#A39E96] hover:text-[#F5F1EA] transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right — lang switcher + copyright */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-3">
              {LOCALES.map((locale, i) => (
                <span key={locale} className="flex items-center gap-3">
                  <button
                    onClick={() => switchLocale(locale)}
                    className={`font-inter text-xs tracking-wider uppercase transition-colors duration-300 ${
                      lang === locale
                        ? "text-[#C8895A]"
                        : "text-[#5C5853] hover:text-[#A39E96]"
                    }`}
                  >
                    {locale.toUpperCase()}
                  </button>
                  {i < LOCALES.length - 1 && (
                    <span className="text-[#5C5853] text-xs">/</span>
                  )}
                </span>
              ))}
            </div>
            <p className="font-inter text-xs text-[#5C5853]">
              {t.footer.copy}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
