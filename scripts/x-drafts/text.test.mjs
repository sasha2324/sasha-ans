import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  xLength,
  withLink,
  parsePosts,
  draftIssueBody,
  waitingForPostBody,
  missingDescriptionBody,
  waitingState,
} from './text.mjs';

const LINK = 'https://sasha-ans.pages.dev/en/#progetto-sub4';

test('xLength counts normal letters as 1', () => {
  assert.equal(xLength('Hello'), 5);
});

test('xLength counts Italian accented letters as 1', () => {
  assert.equal(xLength('città perché'), 12);
});

test('xLength counts any link as 23', () => {
  assert.equal(xLength(LINK), 23);
  assert.equal(xLength(`See ${LINK} now`), 4 + 23 + 4);
});

test('xLength counts an emoji as 2', () => {
  assert.equal(xLength('🏃'), 2);
});

test('withLink puts the link at the end, after an empty line', () => {
  assert.equal(withLink('So I built it.', LINK), `So I built it.\n\n${LINK}`);
});

test('withLink adds nothing when the text already has a link', () => {
  const text = 'Play with it here\nhttps://sasha2324.github.io/carburanti-terni/';
  assert.equal(withLink(text, LINK), text);
});

test('parsePosts reads one post for each "## repo-name" section', () => {
  const markdown = `# Posts for X

Some help text that is not a post.

## sub4

First line.

Second line.
Third line.

## rapportino
Rapportino post.
`;
  assert.deepEqual(parsePosts(markdown), {
    sub4: 'First line.\n\nSecond line.\nThird line.',
    rapportino: 'Rapportino post.',
  });
});

test('parsePosts ignores empty sections', () => {
  assert.deepEqual(parsePosts('## sub4\n\n## rapportino\nText.\n'), { rapportino: 'Text.' });
});

test('draftIssueBody has the post in a code block, the count and the checklist', () => {
  const body = draftIssueBody('So I built Sub4.');
  assert.match(body, /```text\nSo I built Sub4\.\n```/);
  assert.match(body, /16\/280 characters/);
  assert.match(body, /data\/post-x\.md/);
  assert.match(body, /- \[ \] Add a GIF or short video\n- \[ \] Post on X\n- \[ \] Close this issue/);
  assert.doesNotMatch(body, /Too long/);
  assert.equal(waitingState(body), null);
});

test('draftIssueBody warns when the post is longer than 280', () => {
  const body = draftIssueBody('word '.repeat(60).trim());
  assert.match(body, /299\/280 characters/);
  assert.match(body, /Too long for X/);
});

test('waitingForPostBody shows the shape, the facts and the checklist', () => {
  const body = waitingForPostBody({
    repo: 'sub4',
    description: 'My tracker for training to run a marathon in under 4 hours.',
    link: LINK,
    readme: 'https://github.com/sasha2324/sub4#readme',
  });
  assert.match(body, /`## sub4`/);
  assert.match(body, /So I built ✏️/);
  assert.match(body, /My tracker for training to run a marathon in under 4 hours\./);
  assert.ok(body.includes(LINK));
  assert.match(body, /https:\/\/github\.com\/sasha2324\/sub4#readme/);
  assert.match(body, /- \[ \] Post on X/);
  assert.equal(waitingState(body), 'post');
});

test('missingDescriptionBody asks for a description', () => {
  const body = missingDescriptionBody('https://github.com/sasha2324/sub4');
  assert.match(body, /Add a description to the repository first/);
  assert.match(body, /https:\/\/github\.com\/sasha2324\/sub4/);
  assert.equal(waitingState(body), 'description');
});

test('waitingState is null for a text without the hidden mark', () => {
  assert.equal(waitingState('Some text written by Sasha'), null);
  assert.equal(waitingState(null), null);
});
