import { test } from 'node:test';
import assert from 'node:assert/strict';
import { portfolioRepos, runDrafts } from './drafts.mjs';
import { MISSING_MARK } from './text.mjs';

const SITE = 'https://sasha-ans.pages.dev';

const repo = (name, more = {}) => ({
  name,
  description: `Description of ${name}`,
  html_url: `https://github.com/sasha2324/${name}`,
  private: false,
  fork: false,
  topics: ['portfolio'],
  ...more,
});

/** A fake GitHub: it remembers what the script asks, it changes nothing real. */
function fakeGitHub(issues = []) {
  const calls = { label: 0, created: [], updated: [] };
  return {
    calls,
    ensureLabel: async () => void calls.label++,
    listDraftIssues: async () => issues,
    createIssue: async (title, body) => void calls.created.push({ title, body }),
    updateIssue: async (number, body) => void calls.updated.push({ number, body }),
  };
}

const run = (options) => runDrafts({ siteUrl: SITE, extras: {}, announced: [], log: () => {}, ...options });

test('portfolioRepos keeps only public repos with the portfolio topic that are not forks', () => {
  const repos = [
    repo('good'),
    repo('private', { private: true }),
    repo('fork', { fork: true }),
    repo('no-topic', { topics: ['python'] }),
    repo('no-topics-field', { topics: undefined }),
  ];
  assert.deepEqual(portfolioRepos(repos).map((r) => r.name), ['good']);
});

test('creates one issue for each new project and adds it to the list', async () => {
  const github = fakeGitHub();
  const announced = await run({ repos: [repo('sub4'), repo('rapportino')], github });

  assert.deepEqual(github.calls.created.map((i) => i.title), ['Draft post: sub4', 'Draft post: rapportino']);
  assert.equal(github.calls.label, 1);
  assert.deepEqual(announced, ['sub4', 'rapportino']);
});

test('skips the projects that are already in the list', async () => {
  const github = fakeGitHub();
  const announced = await run({ repos: [repo('sub4'), repo('rapportino')], announced: ['sub4'], github });

  assert.deepEqual(github.calls.created.map((i) => i.title), ['Draft post: rapportino']);
  assert.deepEqual(announced, ['sub4', 'rapportino']);
});

test('does not call GitHub at all when there is no new project', async () => {
  const github = fakeGitHub();
  const announced = await run({ repos: [repo('sub4')], announced: ['sub4'], github });

  assert.equal(github.calls.label, 0);
  assert.deepEqual(github.calls.created, []);
  assert.deepEqual(announced, ['sub4']);
});

test('uses the English title and description of the site, and the English link', async () => {
  const github = fakeGitHub();
  const extras = {
    sub4: { title: { it: 'Sub4 IT', en: 'Sub4 EN' }, description: { en: 'My marathon tracker.' } },
  };
  await run({ repos: [repo('sub4')], extras, github });

  const [issue] = github.calls.created;
  assert.equal(issue.title, 'Draft post: Sub4 EN');
  assert.match(issue.body, /New project in my portfolio: Sub4 EN\.\n\nMy marathon tracker\.\n\nhttps:\/\/sasha-ans\.pages\.dev\/en\/#progetto-sub4\n/);
  assert.match(issue.body, /Text from: the English description on the site/);
});

test('uses the Italian title of the site when there is no English one', async () => {
  const github = fakeGitHub();
  await run({ repos: [repo('carburanti-terni')], extras: { 'carburanti-terni': { title: { it: 'Carburanti Terni' } } }, github });

  assert.equal(github.calls.created[0].title, 'Draft post: Carburanti Terni');
});

test('uses the GitHub description when the site has no English one, and says so', async () => {
  const github = fakeGitHub();
  await run({ repos: [repo('newapp', { description: 'A new app.' })], github });

  const [issue] = github.calls.created;
  assert.match(issue.body, /\n\nA new app\.\n\n/);
  assert.match(issue.body, /Text from: the GitHub description.*Check that it is in English/);
});

test('without a GitHub description: asks for it and does not add the project to the list', async () => {
  const github = fakeGitHub();
  const announced = await run({ repos: [repo('newapp', { description: null })], github });

  const [issue] = github.calls.created;
  assert.equal(issue.title, 'Draft post: newapp');
  assert.match(issue.body, /Add a description to the repository first/);
  assert.deepEqual(announced, []);
});

test('a description made only of spaces counts as missing', async () => {
  const github = fakeGitHub();
  const announced = await run({ repos: [repo('newapp', { description: '   ' })], github });

  assert.match(github.calls.created[0].body, /Add a description to the repository first/);
  assert.deepEqual(announced, []);
});

test('still without a description: does not create a second issue', async () => {
  const github = fakeGitHub([{ number: 7, title: 'Draft post: newapp', body: `${MISSING_MARK}\nold text` }]);
  const announced = await run({ repos: [repo('newapp', { description: null })], github });

  assert.deepEqual(github.calls.created, []);
  assert.deepEqual(github.calls.updated, []);
  assert.deepEqual(announced, []);
});

test('when the description arrives: puts the draft in the same issue', async () => {
  const github = fakeGitHub([{ number: 7, title: 'Draft post: newapp', body: `${MISSING_MARK}\nold text` }]);
  const announced = await run({ repos: [repo('newapp', { description: 'Now it has one.' })], github });

  assert.deepEqual(github.calls.created, []);
  assert.equal(github.calls.updated.length, 1);
  assert.equal(github.calls.updated[0].number, 7);
  assert.match(github.calls.updated[0].body, /Now it has one\./);
  assert.deepEqual(announced, ['newapp']);
});

test('a draft issue already exists (the last run failed before the commit): no new issue, no change', async () => {
  const github = fakeGitHub([{ number: 3, title: 'Draft post: sub4', body: 'Draft post for X… - [x] Post on X' }]);
  const announced = await run({ repos: [repo('sub4')], github });

  assert.deepEqual(github.calls.created, []);
  assert.deepEqual(github.calls.updated, []);
  assert.deepEqual(announced, ['sub4']);
});
