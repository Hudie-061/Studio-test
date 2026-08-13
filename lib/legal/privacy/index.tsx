import type { Locale } from "@/lib/context/TranslationContext";
import { PrivacyEn } from "./en";
import { PrivacyFr } from "./fr";
import { PrivacyNl } from "./nl";

export const PRIVACY_CONTENT: Record<Locale, () => JSX.Element> = {
  en: PrivacyEn,
  fr: PrivacyFr,
  nl: PrivacyNl,
};
