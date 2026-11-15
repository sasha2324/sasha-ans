// Schede scritte a mano: solo per i progetti PRIVATI, il cui codice non si può linkare.
// I progetti pubblici arrivano da GitHub al momento della build (vedi ../github.ts):
// basta dare al repository il topic «portfolio».
// Regole: niente risultati economici (PifSignal), niente dati di salute, mappe o date
// di gara. Le voci di «Cosa ho imparato» sono bozze da rivedere con Sasha.

export interface Project {
  id: string;
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
  /** Testo al posto del link al codice, per esempio «Repository privato» */
  noUrl: string;
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
];

