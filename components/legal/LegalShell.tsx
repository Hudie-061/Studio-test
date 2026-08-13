import type { ReactNode } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/logo/LogoMark";
import Footer from "@/components/shared/Footer";
import type { Locale } from "@/lib/context/TranslationContext";

export function LegalShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0F0E0C]">
      <header className="px-6 md:px-12 pt-10 pb-4 max-w-[680px] mx-auto">
        <Link href={`/${locale}`} aria-label="VANTIR Studio home" className="inline-block">
          <LogoMark size={20} showSubtitle color="#F5F1EA" />
        </Link>
      </header>

      <main className="px-6 md:px-12 pb-32 max-w-[680px] mx-auto">
        {children}
      </main>

      <Footer />
    </div>
  );
}
