import { test } from 'node:test';
import assert from 'node:assert/strict';
import { xLength, buildDraft, draftIssueBody, missingDescriptionBody, MISSING_MARK } from './text.mjs';

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

test('buildDraft puts name, description and link on separate lines', () => {
  const { text, shortened } = buildDraft({
    name: 'Sub4',
    description: 'My tracker for training to run a marathon in under 4 hours.',
    link: LINK,
  });
  assert.equal(
    text,
    `New project in my portfolio: Sub4.\n\nMy tracker for training to run a marathon in under 4 hours.\n\n${LINK}`
  );
  assert.equal(shortened, false);
});

test('buildDraft adds a full stop when the description has none', () => {
  const { text } = buildDraft({ name: 'Sub4', description: 'My marathon tracker', link: LINK });
  assert.match(text, /\nMy marathon tracker\.\n/);
});

test('buildDraft keeps a description that ends with ! or ?', () => {
  const { text } = buildDraft({ name: 'Sub4', description: 'Run faster!', link: LINK });
  assert.match(text, /\nRun faster!\n/);
});

test('buildDraft trims spaces around the description', () => {
  const { text } = buildDraft({ name: 'Sub4', description: '  My tracker.  ', link: LINK });
  assert.match(text, /\nMy tracker\.\n/);
});

test('buildDraft cuts a long description at a word and ends with …', () => {
  const description = 'word '.repeat(80).trim(); // 399 characters
  const { text, shortened } = buildDraft({ name: 'Sub4', description, link: LINK });
  assert.equal(shortened, true);
  assert.ok(xLength(text) <= 280, `too long: ${xLength(text)}`);
  assert.match(text, /\nword( word)*…\n/);
});

test('draftIssueBody has the draft in a code block, the count, the source and the checklist', () => {
  const body = draftIssueBody({
    text: 'New project in my portfolio: Sub4.',
    shortened: false,
    source: 'the English description on the site (`src/data/progetti.ts`)',
  });
  assert.match(body, /```text\nNew project in my portfolio: Sub4\.\n```/);
  assert.match(body, /34\/280 characters/);
  assert.match(body, /Text from: the English description on the site/);
  assert.match(body, /- \[ \] Add a GIF or short video\n- \[ \] Post on X\n- \[ \] Close this issue/);
  assert.doesNotMatch(body, /was too long/);
  assert.doesNotMatch(body, new RegExp(MISSING_MARK));
});

test('draftIssueBody says when the description was cut', () => {
  const body = draftIssueBody({ text: 'x', shortened: true, source: 'the GitHub description' });
  assert.match(body, /was too long/);
});

test('missingDescriptionBody asks for a description and has the mark', () => {
  const body = missingDescriptionBody('https://github.com/sasha2324/sub4');
  assert.match(body, /Add a description to the repository first/);
  assert.match(body, /https:\/\/github\.com\/sasha2324\/sub4/);
  assert.ok(body.includes(MISSING_MARK));
});
