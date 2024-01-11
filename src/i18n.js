import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { fr } from "./locales/fr";

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, fr: { translation: fr } },
  debug: true,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
