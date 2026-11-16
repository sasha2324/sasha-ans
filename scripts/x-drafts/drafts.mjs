// Decides what to do for each portfolio project: create an issue, update it, or nothing.
// It talks to GitHub only through the `github` object it receives (see main.mjs),
// so the tests can use a fake GitHub.
import { draftIssueBody, missingDescriptionBody, waitingForPostBody, waitingState, withLink } from './text.mjs';

const TOPIC = 'portfolio';

/** The same rule as the site (src/data/github.ts): public, not a fork, topic «portfolio». */
export const portfolioRepos = (repos) =>
  repos.filter((r) => !r.private && !r.fork && r.topics?.includes(TOPIC));

/** Readable name: the title on the site (English, else Italian), else the repo name. */
const projectName = (repo, extra) => extra?.title?.en ?? extra?.title?.it ?? repo.name;

/**
 * The issue for one project, and whether the post is ready.
 * state: 'description' or 'post' = still waiting for it; 'ready' = the post is there.
 */
function issueFor(repo, { extra, post, siteUrl }) {
  if (!repo.description?.trim()) {
    return { state: 'description', body: missingDescriptionBody(repo.html_url) };
  }
  // The live app if the repo has a website, else the project card on the English site.
  const link = repo.homepage?.trim() || `${siteUrl}/en/#progetto-${repo.name}`;
  if (!post) {
    const description = extra?.description?.en?.trim() || repo.description.trim();
    return {
      state: 'post',
      body: waitingForPostBody({ repo: repo.name, description, link, readme: `${repo.html_url}#readme` }),
    };
  }
  return { state: 'ready', body: draftIssueBody(withLink(post, link)) };
}

/**
 * Creates or updates the draft issues of the new projects.
 * Returns the new list of projects that have their draft (the content of data/annunciati.json).
 */
export async function runDrafts({ repos, announced, extras, posts, siteUrl, github, log = console.log }) {
  const fresh = portfolioRepos(repos).filter((r) => !announced.includes(r.name));
  if (fresh.length === 0) {
    log('No new projects.');
    return announced;
  }

  await github.ensureLabel();
  const existing = await github.listDraftIssues();
  const result = [...announced];

  for (const repo of fresh) {
    const extra = extras[repo.name];
    const title = `Draft post: ${projectName(repo, extra)}`;
    const { state, body } = issueFor(repo, { extra, post: posts[repo.name], siteUrl });
    const old = existing.find((issue) => issue.title === title);
    const oldState = old && waitingState(old.body);

    if (!old) await github.createIssue(title, body);
    // Only when something changed (the description or the post arrived):
    // so the script never deletes what Sasha writes in a waiting issue.
    else if (oldState && oldState !== state) await github.updateIssue(old.number, body);
    else log(`${repo.name}: issue #${old.number} unchanged (${oldState ? `waiting for the ${oldState}` : 'draft ready'}).`);

    // Projects still waiting are not added: the script checks them again at the next run.
    if (state === 'ready') result.push(repo.name);
  }
  return result;
}
