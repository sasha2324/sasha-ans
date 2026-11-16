// Esperimenti della home: piccole pagine del sito sotto /lab/, una scheda ciascuna.
// Si aggiunge un oggetto qui e la pagina in src/pages/[...lang]/lab/.
// `ai: true` mostra l'etichetta «Fatto con l'aiuto dell'IA».
import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/utils';
// Immagini 4:3: schermata vera della pagina, tema chiaro
import imgInteresseComposto from '../assets/esperimenti/interesse-composto.png';

export interface Experiment {
  id: string;
  /** Indirizzo senza lingua, es. '/lab/interesse-composto/' (in inglese diventa /en/lab/…) */
  path: string;
  title: Localized;
  category: Localized;
  /** Una riga */
  description: Localized;
  ai?: boolean;
  image?: ImageMetadata;
  imageAlt?: Localized;
}

export const experiments: Experiment[] = [
  {
    id: 'interesse-composto',
    path: '/lab/interesse-composto/',
    title: { it: 'Interesse composto', en: 'Compound interest' },
    category: { it: 'Calcolatore', en: 'Calculator' },
    description: {
      it: 'Quanto cresce un capitale con un versamento ogni mese, anno per anno.',
      en: 'How savings grow with a deposit every month, year by year.',
    },
    ai: true,
    image: imgInteresseComposto,
    imageAlt: {
      it: 'Il calcolatore: capitale finale, versato e interessi in alto, i cursori a sinistra e il grafico della crescita a destra.',
      en: 'The calculator: final balance, deposits and interest at the top, the sliders on the left and the growth chart on the right.',
    },
  },
];
