import type { ReactNode } from "react";
import { TranslationProvider } from "@/lib/context/TranslationContext";
import type { Locale, Translations } from "@/lib/context/TranslationContext";
import en from "@/lib/translations/en.json";
import fr from "@/lib/translations/fr.json";
import nl from "@/lib/translations/nl.json";

const DICT: Record<Locale, Translations> = {
  en: en as unknown as Translations,
  fr: fr as unknown as Translations,
  nl: nl as unknown as Translations,
};

const VALID_LOCALES: Locale[] = ["en", "fr", "nl"];

export function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = VALID_LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : "en";

  return (
    <TranslationProvider locale={locale} translations={DICT[locale]}>
      {children}
    </TranslationProvider>
  );
}
