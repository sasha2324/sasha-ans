// Schede scritte a mano: solo per i progetti PRIVATI, il cui codice non si può linkare.
// I progetti pubblici arrivano da GitHub al momento della build (vedi ../github.ts):
// basta dare al repository il topic «portfolio».
// Regole: niente risultati economici, niente dati di salute, mappe o date di gara.
// Le voci di «Cosa ho imparato» vanno riviste con Sasha.

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

export const projects: Project[] = [];
