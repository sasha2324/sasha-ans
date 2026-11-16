import { test } from 'node:test';
import assert from 'node:assert/strict';
import { portfolioRepos, runDrafts } from './drafts.mjs';
import { draftIssueBody, missingDescriptionBody, waitingForPostBody, waitingState } from './text.mjs';

const SITE = 'https://sasha-ans.pages.dev';

const repo = (name, more = {}) => ({
  name,
  description: `Description of ${name}`,
  html_url: `https://github.com/sasha2324/${name}`,
  homepage: null,
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

const run = (options) =>
  runDrafts({ siteUrl: SITE, extras: {}, posts: {}, announced: [], log: () => {}, ...options });

const waitingForPost = (name) =>
  waitingForPostBody({ repo: name, description: 'old', link: 'old', readme: 'old' });

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

test('creates one issue for each new project with a post, and adds it to the list', async () => {
  const github = fakeGitHub();
  const posts = { sub4: 'Sub4 post.', rapportino: 'Rapportino post.' };
  const announced = await run({ repos: [repo('sub4'), repo('rapportino')], posts, github });

  assert.deepEqual(github.calls.created.map((i) => i.title), ['Draft post: sub4', 'Draft post: rapportino']);
  assert.equal(github.calls.label, 1);
  assert.deepEqual(announced, ['sub4', 'rapportino']);
});

test('skips the projects that are already in the list', async () => {
  const github = fakeGitHub();
  const posts = { sub4: 'Sub4 post.', rapportino: 'Rapportino post.' };
  const announced = await run({ repos: [repo('sub4'), repo('rapportino')], posts, announced: ['sub4'], github });

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

test('the issue title uses the title of the site: English, else Italian', async () => {
  const github = fakeGitHub();
  const extras = {
    sub4: { title: { it: 'Sub4 IT', en: 'Sub4 EN' } },
    'carburanti-terni': { title: { it: 'Carburanti Terni' } },
  };
  await run({ repos: [repo('sub4'), repo('carburanti-terni')], extras, github });

  assert.deepEqual(github.calls.created.map((i) => i.title), ['Draft post: Sub4 EN', 'Draft post: Carburanti Terni']);
});

test('the post ends with the link to the live app when the repo has a website', async () => {
  const github = fakeGitHub();
  const homepage = 'https://rapportino-2bu.pages.dev';
  await run({ repos: [repo('rapportino', { homepage })], posts: { rapportino: 'So I built it.' }, github });

  assert.equal(github.calls.created[0].body, draftIssueBody(`So I built it.\n\n${homepage}`));
});

test('without a website, the link goes to the project card on the English site', async () => {
  const github = fakeGitHub();
  await run({ repos: [repo('sub4', { homepage: '' })], posts: { sub4: 'So I built it.' }, github });

  assert.match(github.calls.created[0].body, /So I built it\.\n\nhttps:\/\/sasha-ans\.pages\.dev\/en\/#progetto-sub4\n/);
});

test('without a post: an issue with the shape and the facts, not added to the list', async () => {
  const github = fakeGitHub();
  const extras = { sub4: { description: { en: 'My marathon tracker.' } } };
  const announced = await run({ repos: [repo('sub4')], extras, github });

  const [issue] = github.calls.created;
  assert.equal(waitingState(issue.body), 'post');
  assert.match(issue.body, /What it does: My marathon tracker\./);
  assert.match(issue.body, /Link: https:\/\/sasha-ans\.pages\.dev\/en\/#progetto-sub4/);
  assert.match(issue.body, /README: https:\/\/github\.com\/sasha2324\/sub4#readme/);
  assert.deepEqual(announced, []);
});

test('without a post and without an English description on the site, the facts use the GitHub one', async () => {
  const github = fakeGitHub();
  await run({ repos: [repo('newapp', { description: 'Una app nuova.' })], github });

  assert.match(github.calls.created[0].body, /What it does: Una app nuova\./);
});

test('when the post arrives: puts the draft in the same issue and adds it to the list', async () => {
  const github = fakeGitHub([{ number: 5, title: 'Draft post: sub4', body: waitingForPost('sub4') }]);
  const announced = await run({ repos: [repo('sub4')], posts: { sub4: 'Now there is a post.' }, github });

  assert.deepEqual(github.calls.created, []);
  assert.equal(github.calls.updated.length, 1);
  assert.equal(github.calls.updated[0].number, 5);
  assert.match(github.calls.updated[0].body, /Now there is a post\./);
  assert.deepEqual(announced, ['sub4']);
});

test('still without a post: does not touch the issue (Sasha may be writing in it)', async () => {
  const edited = `${waitingForPost('sub4')}\nSasha wrote something here.`;
  const github = fakeGitHub([{ number: 5, title: 'Draft post: sub4', body: edited }]);
  const announced = await run({ repos: [repo('sub4')], github });

  assert.deepEqual(github.calls.created, []);
  assert.deepEqual(github.calls.updated, []);
  assert.deepEqual(announced, []);
});

test('without a GitHub description: asks for it and does not add the project to the list', async () => {
  const github = fakeGitHub();
  const announced = await run({ repos: [repo('newapp', { description: null })], posts: { newapp: 'Post.' }, github });

  const [issue] = github.calls.created;
  assert.equal(issue.title, 'Draft post: newapp');
  assert.match(issue.body, /Add a description to the repository first/);
  assert.deepEqual(announced, []);
});

test('a description made only of spaces counts as missing', async () => {
  const github = fakeGitHub();
  const announced = await run({ repos: [repo('newapp', { description: '   ' })], github });

  assert.equal(waitingState(github.calls.created[0].body), 'description');
  assert.deepEqual(announced, []);
});

test('still without a description: does not create a second issue', async () => {
  const body = missingDescriptionBody('https://github.com/sasha2324/newapp');
  const github = fakeGitHub([{ number: 7, title: 'Draft post: newapp', body }]);
  const announced = await run({ repos: [repo('newapp', { description: null })], github });

  assert.deepEqual(github.calls.created, []);
  assert.deepEqual(github.calls.updated, []);
  assert.deepEqual(announced, []);
});

test('when the description arrives but there is no post yet: the issue shows the shape', async () => {
  const body = missingDescriptionBody('https://github.com/sasha2324/newapp');
  const github = fakeGitHub([{ number: 7, title: 'Draft post: newapp', body }]);
  const announced = await run({ repos: [repo('newapp')], github });

  assert.equal(github.calls.updated.length, 1);
  assert.equal(waitingState(github.calls.updated[0].body), 'post');
  assert.deepEqual(announced, []);
});

test('a draft issue already exists (the last run failed before the commit): no new issue, no change', async () => {
  const github = fakeGitHub([{ number: 3, title: 'Draft post: sub4', body: 'Draft post for X… - [x] Post on X' }]);
  const announced = await run({ repos: [repo('sub4')], posts: { sub4: 'Post.' }, github });

  assert.deepEqual(github.calls.created, []);
  assert.deepEqual(github.calls.updated, []);
  assert.deepEqual(announced, ['sub4']);
});
