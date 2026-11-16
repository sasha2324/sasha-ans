// Funzioni comuni alle pagine del blog.
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, locales, type Lang } from '../i18n/ui';
import { langPrefix } from '../i18n/utils';

export type Post = CollectionEntry<'blog'>;

/** Un articolo da mostrare in un elenco. `fallback`: è in italiano dentro una pagina in un'altra lingua. */
export interface PostItem {
  post: Post;
  fallback: boolean;
}

/** Lingua in cui è scritto l'articolo (la cartella: `it/…`, `en/…`) */
export const postLang = (post: Post) => post.id.split('/')[0] as Lang;

/** `it/perche-cloud` → `perche-cloud` */
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');

const byDate = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

/** Articoli scritti in una lingua, dal più recente. Le bozze compaiono solo in sviluppo. */
export async function getPosts(lang: Lang = defaultLang): Promise<Post[]> {
  const posts = await getCollection('blog', ({ id, data }) => {
    const inLang = id.startsWith(`${lang}/`);
    return inLang && (import.meta.env.DEV || !data.draft);
  });
  return posts.sort(byDate);
}

/**
 * Articoli da elencare nelle pagine di una lingua: quelli scritti in quella lingua
 * più quelli italiani non ancora tradotti (segnati come `fallback`).
 */
export async function getPostsFor(lang: Lang): Promise<PostItem[]> {
  const own = await getPosts(lang);
  if (lang === defaultLang) return own.map((post) => ({ post, fallback: false }));
  const translated = new Set(own.map(postSlug));
  const italian = (await getPosts(defaultLang)).filter((post) => !translated.has(postSlug(post)));
  return [
    ...own.map((post) => ({ post, fallback: false })),
    ...italian.map((post) => ({ post, fallback: true })),
  ].sort((a, b) => byDate(a.post, b.post));
}

/** Indirizzo dell'articolo, nella lingua in cui è scritto (`/blog/...`, `/en/blog/...`). */
export const postUrl = (post: Post) => `${langPrefix(postLang(post))}/blog/${postSlug(post)}/`;

/** Nome del tag nell'indirizzo: minuscolo, spazi → trattini. */
export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Pagina del tag nella lingua dell'articolo (i tag di un articolo italiano portano alle pagine italiane). */
export const tagUrl = (tag: string, lang: Lang = defaultLang) => `${langPrefix(lang)}/tag/${tagSlug(tag)}/`;

/** Data leggibile: «14 ottobre 2026», «14 October 2026». */
export const formatDate = (date: Date, lang: Lang = defaultLang) =>
  new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(date);

/** Data breve per le schede: «14 ott 2026». */
export const formatShortDate = (date: Date, lang: Lang = defaultLang) =>
  new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'short', year: 'numeric' }).format(date);

/** Minuti di lettura stimati (circa 200 parole al minuto). */
export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
