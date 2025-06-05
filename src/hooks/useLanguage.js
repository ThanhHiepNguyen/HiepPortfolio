import { useState, useEffect } from 'react';
import vi from '../locales/vi.json';
import en from '../locales/en.json';

const translations = { vi, en };

function useLanguage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'vi');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return { language, toggleLanguage, t: translations[language] };
}

export default useLanguage;