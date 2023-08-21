// i18n.ts
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslation from "../../public/locales/en/translation.json";
import viTranslation from "../../public/locales/vi/translation.json";
void i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    lng: "vi", // default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
