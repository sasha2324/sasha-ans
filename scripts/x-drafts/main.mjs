// Draft posts for X: the GitHub Action runs this file every day
// (.github/workflows/draft-x-posts.yml). It never posts on X: Sasha posts by hand.
//
// 1. reads the public repositories with the topic «portfolio» (same list as the site);
// 2. for each project not in data/annunciati.json, creates the issue with the post
//    written in data/post-x.md (or, if it is not there yet, with the shape to fill in);
// 3. writes the new list in data/annunciati.json (the workflow commits it).
//
// Try it on your computer without changing anything:
//   node scripts/x-drafts/main.mjs --dry-run
import { readFile, writeFile } from 'node:fs/promises';
import { registerHooks } from 'node:module';
import { runDrafts } from './drafts.mjs';
import { parsePosts } from './text.mjs';

const SITE = 'https://sasha-ans.pages.dev'; // the same as `site` in astro.config.mjs
const LABEL = { name: 'post-x', color: '1d9bf0', description: 'Draft post for X, to post by hand' };
const LIST_FILE = new URL('../../data/annunciati.json', import.meta.url);
const POSTS_FILE = new URL('../../data/post-x.md', import.meta.url);

const dryRun = process.argv.includes('--dry-run');
const token = process.env.GITHUB_TOKEN;
// Set by GitHub Actions ("owner/name" of this repository).
const thisRepo = process.env.GITHUB_REPOSITORY ?? 'sasha2324/sasha-ans';

// The site data files are TypeScript: Node 24 reads them directly.
// progetti.ts also imports the card images: the script does not need them,
// so they become empty modules.
registerHooks({
  load(url, context, nextLoad) {
    if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(url)) {
      return { format: 'module', source: 'export default undefined;', shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});

/** One request to the GitHub API. With `optional`, a 404 gives null instead of an error. */
async function api(path, { method = 'GET', body, optional = false } = {}) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'x-drafts',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`https://api.github.com${path}`, { method, headers, body: body && JSON.stringify(body) });
  if (optional && res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub answered ${res.status} to ${method} ${path}: ${await res.text()}`);
  return res.json();
}

const listDraftIssues = async () => {
  const issues = await api(`/repos/${thisRepo}/issues?labels=${LABEL.name}&state=all&per_page=100`);
  return issues.filter((i) => !i.pull_request).map(({ number, title, body }) => ({ number, title, body }));
};

/** The real GitHub: creates the label and the issues. */
const realGitHub = {
  listDraftIssues,
  async ensureLabel() {
    if (await api(`/repos/${thisRepo}/labels/${LABEL.name}`, { optional: true })) return;
    await api(`/repos/${thisRepo}/labels`, { method: 'POST', body: LABEL });
    console.log(`Created the label "${LABEL.name}".`);
  },
  async createIssue(title, body) {
    const issue = await api(`/repos/${thisRepo}/issues`, { method: 'POST', body: { title, body, labels: [LABEL.name] } });
    console.log(`Created issue #${issue.number}: ${title}`);
  },
  async updateIssue(number, body) {
    await api(`/repos/${thisRepo}/issues/${number}`, { method: 'PATCH', body: { body } });
    console.log(`Updated issue #${number} with the draft.`);
  },
};

/** Dry run: it reads the real issues, but it only prints what it would write. */
const dryRunGitHub = {
  listDraftIssues,
  async ensureLabel() {},
  async createIssue(title, body) {
    console.log(`\n=== would create: ${title}\n${body}`);
  },
  async updateIssue(number, body) {
    console.log(`\n=== would update #${number}\n${body}`);
  },
};

async function main() {
  if (!token && !dryRun) throw new Error('GITHUB_TOKEN is missing. To try it on your computer, add --dry-run.');

  const { extras } = await import('../../src/data/progetti.ts');
  const { profile } = await import('../../src/data/profilo.ts');

  const announced = JSON.parse(await readFile(LIST_FILE, 'utf8'));
  if (!Array.isArray(announced) || !announced.every((name) => typeof name === 'string')) {
    throw new Error('data/annunciati.json must be a list of repository names, for example ["sub4"].');
  }
  const posts = parsePosts(await readFile(POSTS_FILE, 'utf8'));

  // The same request as the site (src/data/github.ts).
  const repos = await api(`/users/${profile.github.username}/repos?per_page=100&sort=pushed`);

  const next = await runDrafts({
    repos,
    announced,
    extras,
    posts,
    siteUrl: SITE,
    github: dryRun ? dryRunGitHub : realGitHub,
  });

  if (dryRun) {
    console.log(`\nDry run: nothing created. The list would be: ${JSON.stringify(next)}`);
  } else if (next.length !== announced.length) {
    await writeFile(LIST_FILE, `${JSON.stringify(next, null, 2)}\n`);
    console.log(`data/annunciati.json: ${JSON.stringify(next)}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
