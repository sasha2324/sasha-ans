// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Indirizzo del sito: serve per RSS, mappa del sito e link canonici.
  // Progetto Cloudflare Pages «sasha-ans». Se aggiungi un dominio tuo, cambialo qui.
  site: 'https://sasha-ans.pages.dev',

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
