// Progetti della home.
//
// I progetti PUBBLICI arrivano da GitHub al momento della build (vedi ./github.ts):
// basta dare al repository il topic «portfolio». Nome del repository, descrizione
// italiana e link vengono da lì. Qui sotto, in `extras`, si aggiunge quello che
// GitHub non sa: titolo leggibile, categoria, immagine, descrizione nelle altre lingue.
//
// I progetti PRIVATI (codice non linkabile) si scrivono a mano in `privateProjects`.
//
// Regole: niente risultati economici, niente dati di salute, mappe o date di gara,
// niente dati veri di dipendenti nelle immagini.
import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/utils';

export interface ProjectExtra {
  /** Ordine nella pagina (più basso = prima). Senza, il progetto va in fondo. */
  order?: number;
  /** Titolo leggibile al posto del nome del repository */
  title?: Localized;
  category: Localized;
  /** Descrizione nelle altre lingue; l'italiano resta quello di GitHub */
  description?: Partial<Localized>;
  image?: ImageMetadata;
  imageAlt?: Localized;
}

export const extras: Record<string, ProjectExtra> = {
  'carburanti-terni': {
    order: 1,
    title: { it: 'Carburanti Terni' },
    category: { it: 'Dati · Open data', en: 'Data · Open data' },
    description: {
      en: 'Fuel prices in the province of Terni, updated every morning from MIMIT open data.',
    },
  },
  sub4: {
    order: 2,
    title: { it: 'Sub4' },
    category: { it: 'Sport · Analisi dati', en: 'Sport · Data analysis' },
    description: {
      en: 'My tracker for training to run a marathon in under 4 hours.',
    },
  },
};

export interface PrivateProject {
  id: string;
  title: Localized;
  category: Localized;
  description: Localized;
  image?: ImageMetadata;
  imageAlt?: Localized;
}

export const privateProjects: PrivateProject[] = [
  {
    id: 'dda',
    title: { it: 'DDA — Registro ore', en: 'DDA — Timesheet' },
    category: { it: 'App per telefono · Privato', en: 'Mobile app · Private' },
    description: {
      it: "App per il telefono dei dipendenti: ore, viaggi, spese e cantiere di ogni giorno, con l'Excel del mese da condividere.",
      en: "A phone app for employees: each day's hours, travel, expenses and job site, with the month's Excel file to share.",
    },
  },
];
