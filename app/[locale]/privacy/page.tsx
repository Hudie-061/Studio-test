// This is a compliance document, not marketing copy. It has not been
// reviewed by a lawyer. Do not soften, shorten, or make it persuasive.
// Retention periods and processor claims must match what we actually do —
// if the pipeline changes, this page changes with it.

import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { PRIVACY_CONTENT } from "@/lib/legal/privacy";
import type { Locale } from "@/lib/context/TranslationContext";

const VALID_LOCALES: Locale[] = ["en", "fr", "nl"];

const TITLES: Record<Locale, string> = {
  en: "Privacy Notice",
  fr: "Politique de confidentialité",
  nl: "Privacyverklaring",
};

const DESCRIPTIONS: Record<Locale, string> = {
  en: "How VANTIR Studio collects, uses, and retains personal data.",
  fr: "Comment VANTIR Studio collecte, utilise et conserve les données à caractère personnel.",
  nl: "Hoe VANTIR Studio persoonsgegevens verzamelt, gebruikt en bewaart.",
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

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const Content = PRIVACY_CONTENT[locale];

  return (
    <LegalShell locale={locale}>
      <Content />
    </LegalShell>
  );
}
