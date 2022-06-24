import i18next, { changeLanguage } from 'i18next';
import { useCallback, useState } from 'react';

export const LANG = 'lang';

const useLang = () => {
  const [lang] = useState(i18next.language);

  const changeLang = useCallback((lang: string) => {
    changeLanguage(lang);
    localStorage.setItem(LANG, lang);
  }, []);

  return { lang, changeLang };
};

export default useLang;
