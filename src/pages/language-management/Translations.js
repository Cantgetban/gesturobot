import { useLanguage } from "./LanguageContext";
import en from "./en.json";
import he from "./he.json";

const translations = {
  en,
  he
};

export const Translations = ({ children }) => {
  const { language } = useLanguage();
  const currentTranslations = translations[language];

  const translate = (key) => {
    return currentTranslations[key] || key;
  };

  return <>{children({ translate })}</>;
};
