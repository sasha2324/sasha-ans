// Decides what to do for each portfolio project: create an issue, update it, or nothing.
// It talks to GitHub only through the `github` object it receives (see main.mjs),
// so the tests can use a fake GitHub.
import { buildDraft, draftIssueBody, missingDescriptionBody, MISSING_MARK } from './text.mjs';

const TOPIC = 'portfolio';

/** The same rule as the site (src/data/github.ts): public, not a fork, topic «portfolio». */
export const portfolioRepos = (repos) =>
  repos.filter((r) => !r.private && !r.fork && r.topics?.includes(TOPIC));

/** Readable name: the title on the site (English, else Italian), else the repo name. */
const projectName = (repo, extra) => extra?.title?.en ?? extra?.title?.it ?? repo.name;

/** What the project does, in English if the site has it. */
function whatItDoes(repo, extra) {
  const english = extra?.description?.en?.trim();
  if (english) return { description: english, source: 'the English description on the site (`src/data/progetti.ts`)' };
  return {
    description: repo.description,
    source: 'the GitHub description of the repository. Check that it is in English',
  };
}

/**
 * Creates the draft issues for the new projects.
 * Returns the new list of projects that have a draft (the content of data/annunciati.json).
 */
export async function runDrafts({ repos, announced, extras, siteUrl, github, log = console.log }) {
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
    const name = projectName(repo, extra);
    const title = `Draft post: ${name}`;
    const old = existing.find((issue) => issue.title === title);

    if (!repo.description?.trim()) {
      // Not added to the list: the script checks it again at the next run.
      if (old) log(`${repo.name}: still no description, the issue #${old.number} waits.`);
      else await github.createIssue(title, missingDescriptionBody(repo.html_url));
      continue;
    }

    const { description, source } = whatItDoes(repo, extra);
    const draft = buildDraft({ name, description, link: `${siteUrl}/en/#progetto-${repo.name}` });
    const body = draftIssueBody({ ...draft, source });

    if (!old) await github.createIssue(title, body);
    else if (old.body?.includes(MISSING_MARK)) await github.updateIssue(old.number, body);
    else log(`${repo.name}: the issue #${old.number} already has the draft.`);

    result.push(repo.name);
  }
  return result;
}
