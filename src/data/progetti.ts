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
// Immagini 4:3: schermate vere dei progetti (con dati di prova, mai dati veri di persone)
import imgCarburanti from '../assets/progetti/carburanti-terni.png';
import imgSub4 from '../assets/progetti/sub4.png';
import imgRapportino from '../assets/progetti/rapportino.png';

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
  /** Page that explains how the project works (second button on the card) */
  explainer?: string;
}

export const extras: Record<string, ProjectExtra> = {
  'carburanti-terni': {
    order: 1,
    title: { it: 'Carburanti Terni' },
    category: { it: 'Dati · Open data', en: 'Data · Open data' },
    description: {
      en: 'Fuel prices in the province of Terni, updated every morning from MIMIT open data.',
    },
    image: imgCarburanti,
    explainer: 'https://sasha2324.github.io/carburanti-terni/come-funziona.html',
    imageAlt: {
      it: 'Grafici dei prezzi di benzina e gasolio di un distributore di Terni, self e servito, da aprile a novembre 2026.',
      en: 'Petrol and diesel price charts for a petrol station in Terni, self-service and full service, April to November 2026.',
    },
  },
  sub4: {
    order: 2,
    title: { it: 'Sub4' },
    category: { it: 'Sport · Analisi dati', en: 'Sport · Data analysis' },
    description: {
      en: 'My tracker for training to run a marathon in under 4 hours.',
    },
    image: imgSub4,
    imageAlt: {
      it: 'Grafico a barre dei chilometri corsi ogni settimana da agosto a novembre, con le settimane previste in sagoma.',
      en: 'Bar chart of the kilometres run each week from August to November, with the planned weeks drawn as outlines.',
    },
  },
  rapportino: {
    order: 3,
    title: { it: 'Rapportino' },
    category: { it: 'App per telefono · Lavoro', en: 'Mobile app · Work' },
    description: {
      en: 'A timesheet for employees that any company can set up: the form travels in the link, the data stays on the phone.',
    },
    image: imgRapportino,
    imageAlt: {
      it: "Due schermate con dati di prova: a sinistra il titolare sceglie il modello del modulo, a destra l'app del dipendente con i giorni del mese compilati.",
      en: "Two screens with sample data: on the left the owner picks a form template, on the right the employee's app with the month's days filled in.",
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

export const privateProjects: PrivateProject[] = [];
