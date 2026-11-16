// Dati del profilo mostrati nel sito.
// Qui va solo ciò che Sasha ha deciso di rendere pubblico.
// I testi `{ it, en }` si traducono qui; se una lingua manca, resta l'italiano.
import type { Localized } from '../i18n/utils';

export type PathState = 'done' | 'current' | 'next';

export interface PathStep {
  title: Localized;
  state: PathState;
}

export const profile = {
  name: 'Sasha',

  // Contatti autorizzati da Sasha. LinkedIn, GitHub, X e Telegram sono nell'intro e nei
  // Contatti della home; Instagram solo nel footer.
  linkedin: {
    url: 'https://www.linkedin.com/in/oleksandr-mazur-a62959217/',
  },
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
  x: {
    username: '3s_ans',
    url: 'https://x.com/3s_ans',
  },

  // Il percorso è una sequenza: l'ordine qui è l'ordine nello schema.
  path: [
    { title: { it: 'Basi di informatica', en: 'Computer basics' }, state: 'done' },
    { title: { it: 'ITS Infrastrutture digitali', en: 'ITS Digital infrastructure' }, state: 'current' },
    { title: { it: 'Cloud Administrator' }, state: 'next' },
    { title: { it: 'Cybersecurity' }, state: 'next' },
  ] as PathStep[],
};
