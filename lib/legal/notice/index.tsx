import type { Locale } from "@/lib/context/TranslationContext";
import { LegalNoticeEn } from "./en";
import { LegalNoticeFr } from "./fr";
import { LegalNoticeNl } from "./nl";

export const LEGAL_NOTICE_CONTENT: Record<Locale, (props: { locale: Locale }) => JSX.Element> = {
  en: LegalNoticeEn,
  fr: LegalNoticeFr,
  nl: LegalNoticeNl,
};
