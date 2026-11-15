// Progetti pubblici, letti da GitHub al momento della build.
// Compaiono i repository pubblici del profilo che hanno il topic «portfolio»:
// per aggiungerne uno basta dargli il topic su GitHub e ricostruire il sito.
// Nome, descrizione e link vengono da GitHub: si cambiano lì, non qui.
import { profile } from './it/profilo';

const TOPIC = 'portfolio';

export interface Repo {
  /** Il nome del repository: fa anche da ancora (#progetto-<nome>) */
  name: string;
  description: string | null;
  url: string;
  /** Archiviato su GitHub = concluso (bordo pieno), altrimenti in corso */
  archived: boolean;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  topics?: string[];
}

export async function loadPortfolioRepos(): Promise<Repo[]> {
  // Senza token GitHub concede 60 richieste l'ora per indirizzo IP. Se la build
  // su Cloudflare fallisce per questo, aggiungi GITHUB_TOKEN alle variabili del
  // progetto (un token fine-grained senza permessi basta: legge solo dati pubblici).
  const token = process.env.GITHUB_TOKEN ?? import.meta.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'portfolio-build',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  // Una pagina sola: basta finché il profilo ha meno di 100 repository.
  const url = `https://api.github.com/users/${profile.github.username}/repos?per_page=100&sort=pushed`;

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub ha risposto ${res.status} ${res.statusText}`);
    const repos = (await res.json()) as GitHubRepo[];
    return repos
      .filter((r) => !r.private && !r.fork && r.topics?.includes(TOPIC))
      .map((r) => ({ name: r.name, description: r.description, url: r.html_url, archived: r.archived }));
  } catch (err) {
    const message = `Non riesco a leggere i progetti da GitHub (${(err as Error).message}).`;
    // In prova si va avanti senza: offline il sito deve comunque aprirsi.
    // Nella build vera ci si ferma, così Cloudflare lascia online la versione
    // precedente invece di pubblicare una sezione Progetti senza i progetti pubblici.
    if (import.meta.env.DEV) {
      console.warn(`${message} La sezione Progetti mostra solo le schede scritte a mano.`);
      return [];
    }
    throw new Error(message);
  }
}
