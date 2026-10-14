// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Indirizzo del sito: serve per RSS, mappa del sito e link canonici.
  // PROVVISORIO: va sostituito con l'indirizzo vero quando creiamo il progetto
  // su Cloudflare Pages (es. https://<nome-progetto>.pages.dev o un dominio proprio).
  site: 'https://sasha2324.pages.dev',

  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      // Tema scuro quasi monocromatico per i blocchi di codice degli articoli
      theme: 'min-dark',
      wrap: false,
    },
  },

  i18n: {
    // Per ora solo italiano. Per l'inglese basterà aggiungere 'en' qui
    // e le cartelle `en/` accanto a quelle `it/`.
    locales: ['it'],
    defaultLocale: 'it',
    routing: {
      // L'italiano resta su `/`, l'inglese andrà su `/en/`.
      prefixDefaultLocale: false,
    },
  },
});
