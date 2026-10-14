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
    'nav.about': 'Chi sono',
    'nav.skills': 'Competenze',
    'nav.contact': 'Contatti',
    'nav.menu': 'Menu',
    'nav.close': 'Chiudi',
    'nav.main': 'Menu principale',
    'nav.skip': 'Vai al contenuto',
    'footer.github': 'Profilo GitHub',
    'footer.rss': 'Feed RSS',
    'blog.title': 'Blog',
    'blog.description': 'Appunti e articoli su quello che sto imparando: reti, Linux, cloud e sicurezza.',
    'blog.list': 'Articoli',
    'blog.toc': 'Indice',
    'blog.minutes': 'min di lettura',
    'blog.draft': 'Bozza',
    'blog.read': "Leggi l'articolo",
    'blog.back': 'Tutti gli articoli',
    'blog.tags': 'Tag',
    'blog.empty': 'Non ci sono ancora articoli pubblicati.',
    'blog.updated': 'Aggiornato il',
    'tag.title': 'Articoli con il tag',
    'notFound.title': 'Pagina non trovata',
    'notFound.text': "L'indirizzo non corrisponde a nessuna pagina del sito.",
    'notFound.home': 'Torna alla home',
  },
} as const;
