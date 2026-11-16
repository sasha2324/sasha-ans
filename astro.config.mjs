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
      // Blocchi di codice: un tema per il tema chiaro e uno per lo scuro (cambio in global.css)
      themes: { light: 'min-light', dark: 'min-dark' },
      wrap: false,
    },
  },

  i18n: {
    // Lingue del sito: deve coincidere con `languages` in src/i18n/ui.ts.
    // Per aggiungere ucraino o russo: 'uk' / 'ru' qui, il blocco di testi in ui.ts
    // e, se ci sono, gli articoli in src/content/blog/uk/ (o ru/).
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: {
      // L'italiano resta su `/`, l'inglese andrà su `/en/`.
      prefixDefaultLocale: false,
    },
  },
});
