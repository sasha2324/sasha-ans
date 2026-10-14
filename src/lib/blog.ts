// Funzioni comuni alle pagine del blog.
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

/** Articoli di una lingua, dal più recente. Le bozze compaiono solo in sviluppo. */
export async function getPosts(lang: Lang = defaultLang): Promise<Post[]> {
  const posts = await getCollection('blog', ({ id, data }) => {
    const inLang = id.startsWith(`${lang}/`);
    return inLang && (import.meta.env.DEV || !data.draft);
  });
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** `it/perche-cloud` → `perche-cloud` */
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');

/** Indirizzo dell'articolo. L'italiano non ha prefisso, le altre lingue sì (`/en/blog/...`). */
export function postUrl(post: Post): string {
  const lang = post.id.split('/')[0];
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${prefix}/blog/${postSlug(post)}/`;
}

/** Nome del tag nell'indirizzo: minuscolo, spazi → trattini. */
export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const tagUrl = (tag: string) => `/tag/${tagSlug(tag)}/`;

/** Data leggibile: «14 ottobre 2026». */
export const formatDate = (date: Date, lang: Lang = defaultLang) =>
  new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

/** Minuti di lettura stimati (circa 200 parole al minuto). */
export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
