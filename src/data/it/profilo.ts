// Dati del profilo mostrati nel sito.
// Qui va solo ciò che Sasha ha deciso di rendere pubblico.

export type PathState = 'done' | 'current' | 'next';

export interface PathStep {
  title: string;
  state: PathState;
  /** Sostituisce l'etichetta di stato standard (Fatto / In corso / Obiettivo). */
  label?: string;
}

import type { ProjectId } from './progetti';

export interface Skill {
  name: string;
  /** Progetti che dimostrano la competenza */
  projects: ProjectId[];
}

export interface Skills {
  using: Skill[];
  tried: Skill[];
  learning: string[];
}

export const profile = {
  name: 'Sasha',
  github: {
    username: 'sasha2324',
    url: 'https://github.com/sasha2324',
  },
  telegram: {
    username: 's_ans3',
    url: 'https://t.me/s_ans3',
  },
  instagram: {
    username: '3s.ans',
    url: 'https://www.instagram.com/3s.ans/',
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

  // Competenze confermate da Sasha (ottobre 2026), ricavate dal codice dei progetti.
  // Ogni voce dei primi due livelli indica il progetto che la dimostra.
  skills: {
    using: [
      { name: 'Python', projects: ['pifsignal', 'sub4'] },
      { name: 'Integrazione di API e SDK', projects: ['pifsignal', 'sub4'] },
      { name: 'Gestione delle credenziali (.env, niente segreti in git)', projects: ['pifsignal', 'sub4'] },
      { name: 'Test automatici con pytest', projects: ['pifsignal'] },
      { name: 'Git e GitHub', projects: ['pifsignal', 'sub4'] },
      { name: 'Elaborazione di dati (CSV, JSON, XML)', projects: ['sub4'] },
      { name: 'Sviluppo con Claude Code', projects: ['pifsignal', 'sub4'] },
    ],
    tried: [
      { name: 'Server Linux: VPS, systemd, ssh, rsync, cron', projects: ['pifsignal'] },
      { name: 'Programmazione asincrona (asyncio)', projects: ['pifsignal'] },
      { name: 'Login OAuth 2.0', projects: ['sub4'] },
      { name: 'Modelli AI con risposta strutturata', projects: ['pifsignal'] },
      { name: 'API web con FastAPI', projects: ['pifsignal'] },
      { name: 'Dashboard con Streamlit e Next.js', projects: ['pifsignal'] },
      { name: 'API di Notion', projects: ['sub4'] },
    ],
    learning: [
      'Reti e protocollo TCP/IP',
      'Linux da riga di comando',
      'Fondamenti di cloud computing',
      'Fondamenti di sicurezza informatica',
    ],
  } satisfies Skills,
};
