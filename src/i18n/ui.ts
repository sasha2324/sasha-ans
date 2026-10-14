// Testi dell'interfaccia, separati per lingua.
// Per aggiungere l'inglese: aggiungi `en` in `languages` e un blocco `en` in `ui`
// con le stesse chiavi.

export const languages = {
  it: 'Italiano',
} as const;

export const defaultLang = 'it';

export type Lang = keyof typeof languages;

export const ui = {
  it: {
    'site.title': 'Sasha',
    'site.description':
      'Portfolio e blog tecnico di Sasha: percorso verso cloud administration e cybersecurity.',
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.skip': 'Vai al contenuto',
    'footer.github': 'Profilo GitHub',
    'footer.rss': 'Feed RSS',
  },
} as const;
