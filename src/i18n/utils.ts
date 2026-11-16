import { defaultLang, languages, ui, type Lang, type UiKey } from './ui';

/** Testo scritto in più lingue: l'italiano c'è sempre e fa da riserva. */
export type Localized = { it: string } & Partial<Record<Lang, string>>;

export const langs = Object.keys(languages) as Lang[];

const isLang = (value: string | undefined): value is Lang => !!value && value in languages;

// Ricava la lingua dall'URL: `/en/blog/` → 'en', tutto il resto → italiano.
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return isLang(first) ? first : defaultLang;
}

// Restituisce una funzione `t('chiave')` per la lingua scelta,
// con l'italiano come riserva se una traduzione manca.
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Partial<Record<UiKey, string>>)[key] ?? ui[defaultLang][key];
  };
}

/** Sceglie la traduzione di un testo `{ it, en, … }`, con l'italiano come riserva. */
export const pick = (text: Localized, lang: Lang) => text[lang] ?? text.it;

/** Prefisso della lingua negli indirizzi: '' per l'italiano, '/en' per l'inglese. */
export const langPrefix = (lang: Lang) => (lang === defaultLang ? '' : `/${lang}`);

/** `/blog/` → `/en/blog/` (o il contrario), per lo stesso percorso in un'altra lingua. */
export function localizePath(path: string, lang: Lang): string {
  const [, first, ...rest] = path.split('/');
  const bare = isLang(first) ? `/${rest.join('/')}` : path;
  return `${langPrefix(lang)}${bare}` || '/';
}

/** Percorsi per getStaticPaths delle pagine `[...lang]`: una pagina per lingua. */
export const langPaths = () =>
  langs.map((lang) => ({ params: { lang: lang === defaultLang ? undefined : lang }, props: { lang } }));
