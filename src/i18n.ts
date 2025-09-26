import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import as from "./locales/as/translation.json";   // Assamese
import mni from "./locales/mni/translation.json"; // Manipuri (Meitei Mayek)
import kh from "./locales/kh/translation.json";   // Khasi
import mi from "./locales/mi/translation.json";   // Mizo
import ng from "./locales/ng/translation.json";   // Nagamese

i18n
  .use(LanguageDetector) // auto detect browser language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      as: { translation: as },
      mni: { translation: mni },
      kh: { translation: kh },
      mi: { translation: mi },
      ng: { translation: ng },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "as", "mni", "kh", "mi", "ng"], // ✅ add this
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
