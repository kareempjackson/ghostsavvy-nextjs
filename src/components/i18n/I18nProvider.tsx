"use client";

import { ReactNode, useEffect, useState } from "react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

// Import language resources
import enUS from "@/app/i18n/locales/en-US.json";

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    "en-US": {
      translation: enUS,
    },
  },
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder while not mounted to avoid hydration issues
  if (!mounted) return <>{null}</>;

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
