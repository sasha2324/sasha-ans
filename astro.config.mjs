// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Indirizzo definitivo del sito: lo impostiamo quando creiamo il progetto su Cloudflare Pages.
  // Serve per RSS, sitemap e link canonici.
  // site: 'https://<nome-progetto>.pages.dev',

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
