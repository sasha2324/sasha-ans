// Feed RSS del blog: /rss.xml (solo articoli pubblicati, non le bozze).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/blog';
import { useTranslations } from '../i18n/utils';

export async function GET(context: APIContext) {
  const t = useTranslations('it');
  const posts = await getPosts('it');
  return rss({
    title: `${t('site.title')} — ${t('blog.title')}`,
    description: t('blog.description'),
    site: context.site ?? 'https://example.com',
    customData: '<language>it</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
    })),
  });
}
