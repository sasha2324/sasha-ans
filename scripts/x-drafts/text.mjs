// The text of the draft post for X, and the text of the GitHub issue.
// No network and no files here: only text, so it is easy to test.

const LIMIT = 280;

// X counts every link as 23 characters, whatever its real length.
const LINK_LENGTH = 23;
const LINK = /https?:\/\/\S+/g;

// X counts these characters as 1 (Latin letters with accents too, Cyrillic, Greek,
// common punctuation). Everything else counts as 2: emoji, Chinese, Japanese…
// (rules of twitter-text v3). An emoji made of several symbols, like ❤️, counts
// more here than on X: the draft can only look a bit longer, never too short.
const SINGLE = [
  [0x0000, 0x10ff],
  [0x2000, 0x200d],
  [0x2010, 0x201f],
  [0x2032, 0x2037],
];

const weight = (codePoint) => (SINGLE.some(([from, to]) => codePoint >= from && codePoint <= to) ? 1 : 2);

/** Length of a text as X counts it. */
export function xLength(text) {
  const normal = text.normalize('NFC');
  const links = normal.match(LINK) ?? [];
  const rest = normal.replace(LINK, '');
  let length = links.length * LINK_LENGTH;
  for (const char of rest) length += weight(char.codePointAt(0));
  return length;
}

const asSentence = (text) => (/[.!?…]$/.test(text) ? text : `${text}.`);

const compose = (name, description, link) =>
  `New project in my portfolio: ${name}.\n\n${description}\n\n${link}`;

/**
 * The draft post: a first line with the name, what the project does, the link.
 * If it is longer than 280, the description is cut at a word and ends with "…".
 */
export function buildDraft({ name, description, link }) {
  const clean = description.trim();
  const text = compose(name, asSentence(clean), link);
  if (xLength(text) <= LIMIT) return { text, shortened: false };

  const words = clean.split(/\s+/);
  let shorter = text;
  while (words.length > 1) {
    words.pop();
    shorter = compose(name, `${words.join(' ').replace(/[\s,;:.]+$/, '')}…`, link);
    if (xLength(shorter) <= LIMIT) break;
  }
  return { text: shorter, shortened: true };
}

/** Hidden mark in the issues that wait for a repository description. */
export const MISSING_MARK = '<!-- x-drafts: missing description -->';

/** Body of the issue with the draft. */
export function draftIssueBody({ text, shortened, source }) {
  const cut = shortened ? '\n⚠️ The description was too long and was cut. Check the end of the text.\n' : '';
  return `Draft post for X. Check it, copy it and post it by hand.

\`\`\`text
${text}
\`\`\`

**${xLength(text)}/${LIMIT} characters** (X counts every link as ${LINK_LENGTH}).
${cut}
Text from: ${source}.

## Checklist

- [ ] Add a GIF or short video
- [ ] Post on X
- [ ] Close this issue
`;
}

/** Body of the issue when the repository has no description on GitHub. */
export function missingDescriptionBody(repoUrl) {
  return `${MISSING_MARK}
⚠️ **Add a description to the repository first.**

Open ${repoUrl}, click ⚙️ next to "About" and write one sentence about what the project does.
At the next run (every day, or "Run workflow" in the Actions tab) the draft appears here.
`;
}
