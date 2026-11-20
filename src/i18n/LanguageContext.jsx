import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { en, productEn, optionEn } from './en.js';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'la_patata_language';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try { localStorage.setItem(STORAGE_KEY, language); } catch { /* storage blocked */ }
  }, [language]);

  const value = useMemo(() => {
    const t = (text) => language === 'en' ? (en[text] ?? text) : text;
    const product = item => {
      if (!item || language !== 'en') return item;
      // Keep ids, prices, category tags and saved customizations untouched.
      const localized = productEn[item.productId || item.id] || {};
      return {
        ...item,
        title: localized.title || item.title,
        desc: localized.desc || item.desc,
        badge: localized.badge || item.badge
      };
    };
    const option = text => language === 'en' ? (optionEn[text] || t(text)) : text;
    return { language, setLanguage, t, product, option };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within a LanguageProvider');
  return value;
}
