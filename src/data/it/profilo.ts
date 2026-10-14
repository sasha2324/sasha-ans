// Dati del profilo mostrati nel sito.
// Qui va solo ciò che Sasha ha deciso di rendere pubblico.

export type PathState = 'done' | 'current' | 'next';

export interface PathStep {
  title: string;
  state: PathState;
  /** Sostituisce l'etichetta di stato standard (Fatto / In corso / Obiettivo). */
  label?: string;
}

export const profile = {
  name: 'Sasha',
  github: {
    username: 'sasha2324',
    url: 'https://github.com/sasha2324',
  },

  intro: {
    headline: 'Sto imparando a gestire infrastrutture cloud e a proteggerle.',
    text: [
      'Sono Sasha. Sto per iniziare un percorso ITS in infrastrutture digitali: il mio obiettivo è lavorare come Cloud Administrator e nella cybersecurity.',
      'In questo sito tengo traccia di cosa studio e scrivo di quello che imparo strada facendo.',
    ],
    languages: 'Parlo italiano, ucraino e russo.',
  },

  // Il percorso è una sequenza: l'ordine qui è l'ordine nello schema.
  path: [
    { title: 'Basi di informatica', state: 'done' },
    { title: 'ITS Infrastrutture digitali', state: 'current', label: 'In partenza' },
    { title: 'Cloud Administrator', state: 'next' },
    { title: 'Cybersecurity', state: 'next' },
  ] as PathStep[],

  // TODO(Sasha): conferma o modifica queste liste.
  skills: {
    have: ['Italiano, ucraino e russo', 'Basi di informatica'],
    learning: [
      'Reti e protocollo TCP/IP',
      'Linux da riga di comando',
      'Fondamenti di cloud computing',
      'Fondamenti di sicurezza informatica',
    ],
  },

};
