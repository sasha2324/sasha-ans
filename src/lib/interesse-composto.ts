// Calcolo della pagina /lab/interesse-composto: lo usa la build (valori iniziali
// già scritti nella pagina) e lo stesso codice gira nel browser quando si muovono i cursori.
//
// Tasso annuo nominale con capitalizzazione mensile, versamenti a fine mese:
// ogni mese il capitale cresce di r/12 e poi si aggiunge il versamento. In formula:
// C × (1 + r/12)^(12n) + m × ((1 + r/12)^(12n) − 1) / (r/12)

export interface Parametri {
  /** Capitale iniziale in euro */
  capitale: number;
  /** Versamento a fine mese in euro */
  mensile: number;
  /** Tasso annuo nominale: 0.05 per il 5% */
  tasso: number;
  anni: number;
}

export interface Risultato {
  /** Un valore per anno, dall'anno 0 (oggi) all'ultimo */
  composto: number[];
  /** Capitale + versamenti, senza interessi */
  versato: number[];
  /** Solo il capitale iniziale, capitalizzato ogni mese come la curva principale */
  soloIniziale: number[];
  finale: number;
  totaleVersato: number;
  interessi: number;
}

export function calcola({ capitale, mensile, tasso, anni }: Parametri): Risultato {
  const r = tasso / 12;
  const composto: number[] = [];
  const versato: number[] = [];
  const soloIniziale: number[] = [];
  let c = capitale;
  for (let anno = 0; anno <= anni; anno++) {
    if (anno > 0) for (let mese = 0; mese < 12; mese++) c = c * (1 + r) + mensile;
    composto.push(c);
    versato.push(capitale + mensile * 12 * anno);
    soloIniziale.push(capitale * (1 + r) ** (12 * anno));
  }
  const finale = composto[anni];
  const totaleVersato = versato[anni];
  return { composto, versato, soloIniziale, finale, totaleVersato, interessi: finale - totaleVersato };
}

export interface Composizione {
  iniziale: number;
  versamenti: number;
  interessi: number;
}

/** Quote del capitale finale, da 0 a 1. Se il capitale finale è 0 sono tutte 0: barra vuota. */
export function composizione(ris: Risultato, capitale: number): Composizione {
  if (!(ris.finale > 0)) return { iniziale: 0, versamenti: 0, interessi: 0 };
  return {
    iniziale: capitale / ris.finale,
    versamenti: (ris.totaleVersato - capitale) / ris.finale,
    interessi: Math.max(0, ris.interessi) / ris.finale,
  };
}

/** Percentuali intere che sommano a 100 (metodo dei resti più grandi); tutte 0 se le quote sono 0. */
export function percentuali(quote: Composizione): Composizione {
  const chiavi = ['iniziale', 'versamenti', 'interessi'] as const;
  const somma = chiavi.reduce((s, k) => s + quote[k], 0);
  if (!(somma > 0)) return { iniziale: 0, versamenti: 0, interessi: 0 };
  const esatte = chiavi.map((k) => (quote[k] / somma) * 100);
  const intere = esatte.map(Math.floor);
  let resto = 100 - intere.reduce((s, v) => s + v, 0);
  [0, 1, 2]
    .sort((a, b) => esatte[b] - intere[b] - (esatte[a] - intere[a]))
    .forEach((i) => {
      if (resto > 0) {
        intere[i]++;
        resto--;
      }
    });
  return { iniziale: intere[0], versamenti: intere[1], interessi: intere[2] };
}
