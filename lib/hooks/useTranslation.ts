import { useTranslationContext } from "@/lib/context/TranslationContext";
import type { Locale, Translations } from "@/lib/context/TranslationContext";

export function useTranslation(): { t: Translations; lang: Locale } {
  const { locale, t } = useTranslationContext();
  return { t, lang: locale };
}
