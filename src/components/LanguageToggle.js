import React from 'react';
import '../App.css';

/**
 * LanguageToggle Component
 * 
 * Toggle buttons for switching between Spanish and English
 * 
 * @param {string} language - Current language
 * @param {Function} onLanguageChange - Language change handler
 */
const LanguageToggle = ({ language, onLanguageChange }) => {
  return (
    <div className="language-tabs">
      <button
        className={`language-tab ${language === 'es' ? 'active' : ''}`}
        onClick={() => onLanguageChange('es')}
        role="button"
        tabIndex="0"
        aria-label="Español"
      >
        Español
      </button>
      <button
        className={`language-tab ${language === 'en' ? 'active' : ''}`}
        onClick={() => onLanguageChange('en')}
        role="button"
        tabIndex="0"
        aria-label="English"
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;