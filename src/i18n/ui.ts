// Testi dell'interfaccia, separati per lingua.
//
// Per aggiungere una lingua (es. ucraino):
// 1. aggiungi `uk: 'Українська'` in `languages` e `uk: 'uk-UA'` in `locales`;
// 2. aggiungi 'uk' in `i18n.locales` in astro.config.mjs;
// 3. aggiungi un blocco `uk` in `ui` (le chiavi che mancano restano in italiano);
// 4. traduci i testi `{ it, en }` in src/data/ (anche lì vale la riserva italiana).
// Gli articoli in ucraino vanno in src/content/blog/uk/.

export const languages = {
  it: 'Italiano',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'it';

/** Codice per date e numeri (Intl) */
export const locales: Record<Lang, string> = {
  it: 'it-IT',
  en: 'en-GB',
};

export const ui = {
  it: {
    'site.title': 'Sasha',
    'site.description': 'Portfolio e blog di Sasha, studente ITS: sto imparando cloud e cybersecurity.',
    'nav.main': 'Menu principale',
    'nav.home': 'Sasha, pagina iniziale',
    'nav.projects': 'Progetti',
    'nav.path': 'Percorso',
    'nav.its': 'Studio ITS',
    'nav.posts': 'Articoli',
    'nav.contact': 'Contatti',
    'nav.menu': 'Menu',
    'nav.close': 'Chiudi',
    'nav.skip': 'Vai al contenuto',
    'nav.lang': 'Lingua',
    'theme.toDark': 'Passa al tema scuro',
    'theme.toLight': 'Passa al tema chiaro',
    'hero.label': 'Studente ITS · Cloud e Cybersecurity',
    'hero.hi': 'Ciao! Sono',
    'hero.lead':
      'Sto imparando a progettare, gestire e proteggere infrastrutture cloud. Qui tengo traccia di quello che studio e dei progetti che costruisco.',
    'hero.projects': 'Guarda i progetti',
    'hero.blog': 'Leggi il blog',
    'projects.title': 'Cose che ho costruito',
    'projects.code': 'Codice su GitHub',
    'projects.private': 'Codice privato',
    'path.title': 'Da dove parto, dove vado',
    'state.done': 'Fatto',
    'state.current': 'In corso',
    'state.next': 'Obiettivo',
    'its.title': 'Appunti dal corso',
    'its.soon': 'In arrivo',
    'its.text': 'Qui raccoglierò appunti, esercizi e laboratori del corso ITS in infrastrutture digitali.',
    'posts.title': 'Dal blog',
    'posts.all': 'Tutti gli articoli',
    'posts.onlyIt': 'Solo in italiano',
    'contact.title': 'Scrivimi',
    'contact.text': 'Nessun modulo da compilare: mandami un messaggio su LinkedIn, X o Telegram.',
    'contact.ideas.label': 'Progetti e idee',
    'contact.ideas.title': "Hai un progetto o un'idea?",
    'contact.ideas.text':
      'Vuoi parlarne, chiedermi come ho costruito qualcosa o propormi di lavorarci insieme? Scrivimi pure.',
    'contact.study.label': 'Cloud e sicurezza',
    'contact.study.title': 'Stai studiando anche tu?',
    'contact.study.text':
      'Se anche tu stai imparando cloud o cybersecurity, scambiamoci risorse, laboratori e dubbi: in due si impara meglio.',
    'contact.dm.linkedin': 'Scrivimi su LinkedIn',
    'contact.dm.x': 'Scrivimi su X',
    'contact.dm.telegram': 'Scrivimi su Telegram',
    'footer.rss': 'Feed RSS',
    'blog.title': 'Blog',
    'blog.description': 'Appunti e articoli su quello che sto imparando: reti, Linux, cloud e sicurezza.',
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
  en: {
    'site.description': "Sasha's portfolio and blog. ITS student learning cloud and cybersecurity.",
    'nav.main': 'Main menu',
    'nav.home': 'Sasha, home page',
    'nav.projects': 'Projects',
    'nav.path': 'Path',
    'nav.its': 'ITS studies',
    'nav.posts': 'Articles',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',
    'nav.lang': 'Language',
    'theme.toDark': 'Switch to dark theme',
    'theme.toLight': 'Switch to light theme',
    'hero.label': 'ITS student · Cloud and Cybersecurity',
    'hero.hi': "Hi! I'm",
    'hero.lead':
      "I'm learning to design, run and secure cloud infrastructure. Here I keep track of what I study and the projects I build.",
    'hero.projects': 'See the projects',
    'hero.blog': 'Read the blog',
    'projects.title': "Things I've built",
    'projects.code': 'Code on GitHub',
    'projects.private': 'Private code',
    'path.title': "Where I start, where I'm headed",
    'state.done': 'Done',
    'state.current': 'In progress',
    'state.next': 'Goal',
    'its.title': 'Notes from the course',
    'its.soon': 'Coming soon',
    'its.text': "This is where I'll collect notes, exercises and labs from the ITS course in digital infrastructure.",
    'posts.title': 'From the blog',
    'posts.all': 'All articles',
    'posts.onlyIt': 'Italian only',
    'contact.title': 'Get in touch',
    'contact.text': 'No forms to fill in: send me a message on LinkedIn, X or Telegram.',
    'contact.ideas.label': 'Projects and ideas',
    'contact.ideas.title': 'Got a project or an idea?',
    'contact.ideas.text':
      'Want to talk it through, ask how I built something or suggest working on it together? Just write.',
    'contact.study.label': 'Cloud and security',
    'contact.study.title': 'Studying this too?',
    'contact.study.text':
      "If you're also learning cloud or cybersecurity, let's swap resources, labs and questions: it's easier to learn together.",
    'contact.dm.linkedin': 'Message me on LinkedIn',
    'contact.dm.x': 'Message me on X',
    'contact.dm.telegram': 'Message me on Telegram',
    'footer.rss': 'RSS feed',
    'blog.title': 'Blog',
    'blog.description': "Notes and articles on what I'm learning: networking, Linux, cloud and security.",
    'blog.toc': 'Contents',
    'blog.minutes': 'min read',
    'blog.draft': 'Draft',
    'blog.read': 'Read the article',
    'blog.back': 'All articles',
    'blog.tags': 'Tags',
    'blog.empty': 'No articles published yet.',
    'blog.updated': 'Updated on',
    'tag.title': 'Articles tagged',
    'notFound.title': 'Page not found',
    'notFound.text': "This address doesn't match any page on the site.",
    'notFound.home': 'Back to the home page',
  },
} satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)['it'];
