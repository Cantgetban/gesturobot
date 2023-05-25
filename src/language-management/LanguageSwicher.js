import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <nav id="nav" className="navbar" style={{ position: '' }}>
      <Link to="/">
        <img
          src="/logo3.png"
          height="75"
          style={{ marginLeft: '10px' }}
          className="d-inline-block align-top"
          alt=""
        />
      </Link>

      <div className="navbar-brand">
        <button
          value="en"
          onClick={handleLanguageChange}
          disabled={language === 'en'}
          style={{ marginRight: '5px' }}
        >
          English
        </button>
        <button
          value="he"
          onClick={handleLanguageChange}
          disabled={language === 'he'}
        >
          עברית
        </button>
      </div>
    </nav>
  );
};
