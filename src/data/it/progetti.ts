// Progetti mostrati nella home.
// Regole: niente risultati economici (PifSignal), niente dati di salute, mappe o date
// di gara (Sub4). Le voci di «Cosa ho imparato» sono bozze da rivedere con Sasha.

export type ProjectId = 'pifsignal' | 'sub4';

export interface Project {
  id: ProjectId;
  title: string;
  /** Una riga: che cos'è */
  summary: string;
  /** Pieno = concluso, tratteggiato = in corso (come nel resto del sito) */
  state: 'done' | 'current';
  stateLabel: string;
  /** Introduzione breve a «Cosa fa» */
  what: string;
  /** Passaggi di «Cosa fa»; `ordered` se sono una sequenza */
  steps: string[];
  ordered: boolean;
  stack: string[];
  learned: string[];
  /** Link al codice, solo se il repository è pubblico */
  url?: string;
  /** Testo al posto del link quando il codice non è pubblico */
  noUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'pifsignal',
    title: 'PifSignal',
    summary: 'Bot di copy trading su conto demo.',
    state: 'done',
    stateLabel: 'Concluso, settembre 2026',
    what: 'Copia in automatico le operazioni annunciate in un canale Telegram di segnali crypto e forex.',
    steps: [
      'Legge i messaggi del canale appena arrivano.',
      'Ricava dal testo trader, asset, direzione, ingresso, stop loss e take profit.',
      'Applica le regole di rischio di ogni trader e scarta i segnali che non le rispettano.',
      'Apre gli ordini su un conto demo Bybit, e su MetaTrader 5 per il forex.',
      'Segue le posizioni (stop a pareggio, chiusure parziali) e registra tutto su Google Sheets.',
    ],
    ordered: true,
    stack: [
      'Python e asyncio',
      'Telethon',
      'pybit (Bybit)',
      'MetaApi (MetaTrader 5)',
      'API di Anthropic',
      'gspread',
      'pytest',
      'FastAPI',
      'Streamlit',
      'Next.js',
      'Linux, systemd',
    ],
    learned: [
      'Tenere chiavi e token fuori dal codice, in un file .env escluso da git.',
      'Far girare un servizio sempre acceso su un server Linux con systemd e aggiornarlo via ssh.',
      'Proteggere con test automatici la parte che apre e chiude gli ordini.',
      'Usare un modello AI con risposta strutturata per capire messaggi scritti a mano, con le regole come riserva.',
      'Chiudere un progetto in ordine: backup cifrati, credenziali revocate, server dismesso.',
    ],
    noUrl: 'Repository privato',
  },
  {
    id: 'sub4',
    title: 'Sub4',
    summary: 'Il mio tracker per preparare una maratona sotto le 4 ore.',
    state: 'current',
    stateLabel: 'In corso',
    what: 'Raccoglie le mie corse e le confronta con il piano di allenamento.',
    steps: [
      'Scarica ogni corsa una volta sola (da Strava e Garmin Connect) in un archivio locale: le analisi poi funzionano offline.',
      'Calcola il passo equivalente in piano, per confrontare corse con dislivelli diversi.',
      'Controlla la qualità dei dati: ha trovato un salto del GPS che falsava un record.',
      'Segue un piano a «cancelli»: si passa alla fase successiva quando si raggiungono i criteri, non a data fissa.',
    ],
    ordered: false,
    stack: ['Python', 'API di Strava (OAuth 2.0)', 'Garmin Connect', 'CSV e JSON', 'openpyxl (Excel)', 'API di Notion'],
    learned: [
      "Usare un'API con login OAuth 2.0 e token che scadono.",
      'Non fidarsi dei dati grezzi: controllarli prima di usarli.',
      "Progettare un archivio locale per chiamare l'API il meno possibile.",
    ],
    url: 'https://github.com/sasha2324/sub4',
  },
];

export const projectById = (id: ProjectId) => projects.find((p) => p.id === id)!;
