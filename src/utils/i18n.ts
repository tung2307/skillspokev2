// i18n.ts
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import enTranslation from "../../public/locales/en/translation.json";
import viTranslation from "../../public/locales/vi/translation.json";
void i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    lng: "vi", // default language
  });

export default i18n;
