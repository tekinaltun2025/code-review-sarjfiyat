import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "./locales/tr.json";
import en from "./locales/en.json";

const STORAGE_KEY = "app-language";

const getInitialLanguage = (): "tr" | "en" => {
  if (typeof window === "undefined") return "tr";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "tr" || saved === "en") return saved;
  return "tr";
};

void i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "tr",
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
});

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
}

export default i18n;
