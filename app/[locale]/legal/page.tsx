// This is a compliance document, not marketing copy. It has not been
// reviewed by a lawyer. Do not soften, shorten, or make it persuasive.
// Retention periods and processor claims must match what we actually do —
// if the pipeline changes, this page changes with it.

import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { LEGAL_NOTICE_CONTENT } from "@/lib/legal/notice";
import type { Locale } from "@/lib/context/TranslationContext";

const VALID_LOCALES: Locale[] = ["en", "fr", "nl"];

const TITLES: Record<Locale, string> = {
  en: "Legal Notice",
  fr: "Mentions légales",
  nl: "Wettelijke vermeldingen",
};

const DESCRIPTIONS: Record<Locale, string> = {
  en: "Company and publisher information for vantir.studio.",
  fr: "Informations sur l'éditeur du site vantir.studio.",
  nl: "Bedrijfs- en uitgeversinformatie voor vantir.studio.",
};

function resolveLocale(raw: string): Locale {
  return VALID_LOCALES.includes(raw as Locale) ? (raw as Locale) : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: TITLES[locale],
    description: DESCRIPTIONS[locale],
    robots: { index: true, follow: true },
  };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const Content = LEGAL_NOTICE_CONTENT[locale];

  return (
    <LegalShell locale={locale}>
      <Content locale={locale} />
    </LegalShell>
  );
}
