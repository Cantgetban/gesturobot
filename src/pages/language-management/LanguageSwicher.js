
import { useLanguage } from "./LanguageContext";

export const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div>
      <button value="en" onClick={handleLanguageChange} disabled={language === 'en'}>English</button>
      <button value="he" onClick={handleLanguageChange} disabled={language === 'he'}>עברית</button>
    </div>
  );
};
