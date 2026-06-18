"use client";

import { createContext, useContext } from "react";
import type en from "@/lib/translations/en.json";

export type Locale = "en" | "fr" | "nl";
export type Translations = typeof en;

interface TranslationContextValue {
  locale: Locale;
  t: Translations;
}

export const TranslationContext = createContext<TranslationContextValue>({
  locale: "en",
  t: {} as Translations,
});

export function TranslationProvider({
  locale,
  translations,
  children,
}: {
  locale: Locale;
  translations: Translations;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={{ locale, t: translations }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext(): TranslationContextValue {
  return useContext(TranslationContext);
}
