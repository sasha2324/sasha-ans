import { defaultLang, ui, type Lang } from './ui';

// Ricava la lingua dall'URL: `/en/blog/` → 'en', tutto il resto → italiano.
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first && first in ui) return first as Lang;
  return defaultLang;
}

// Restituisce una funzione `t('chiave')` per la lingua scelta,
// con l'italiano come riserva se una traduzione manca.
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}
