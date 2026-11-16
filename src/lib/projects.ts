// Mette insieme le schede della sezione Progetti: prima i repository pubblici
// letti da GitHub (con i dati in più di src/data/progetti.ts), poi i progetti privati.
import type { ImageMetadata } from 'astro';
import type { Repo } from '../data/github';
import { extras, privateProjects } from '../data/progetti';
import type { Lang } from '../i18n/ui';
import { pick } from '../i18n/utils';

export interface ShowcaseProject {
  id: string;
  title: string;
  category?: string;
  description?: string;
  /** Link al codice; assente per i progetti privati */
  url?: string;
  image?: ImageMetadata;
  imageAlt: string;
  /** Archiviato su GitHub = concluso */
  done: boolean;
}

export function showcase(repos: Repo[], lang: Lang): ShowcaseProject[] {
  const order = (name: string) => extras[name]?.order ?? Number.MAX_SAFE_INTEGER;
  // sort è stabile: a parità di ordine resta quello di GitHub (il più aggiornato prima)
  const fromGitHub = [...repos]
    .sort((a, b) => order(a.name) - order(b.name))
    .map((repo): ShowcaseProject => {
      const extra = extras[repo.name];
      const title = extra?.title ? pick(extra.title, lang) : repo.name;
      return {
        id: repo.name,
        title,
        category: extra ? pick(extra.category, lang) : undefined,
        description: extra?.description?.[lang] ?? repo.description ?? undefined,
        url: repo.url,
        image: extra?.image,
        imageAlt: extra?.imageAlt ? pick(extra.imageAlt, lang) : title,
        done: repo.archived,
      };
    });

  const handWritten = privateProjects.map(
    (project): ShowcaseProject => ({
      id: project.id,
      title: pick(project.title, lang),
      category: pick(project.category, lang),
      description: pick(project.description, lang),
      image: project.image,
      imageAlt: project.imageAlt ? pick(project.imageAlt, lang) : pick(project.title, lang),
      done: false,
    })
  );

  return [...fromGitHub, ...handWritten];
}
