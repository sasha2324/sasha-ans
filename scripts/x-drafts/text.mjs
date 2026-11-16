// The text of the GitHub issues with the draft posts for X.
// No network and no files here: only text, so it is easy to test.

const LIMIT = 280;

// X counts every link as 23 characters, whatever its real length.
const LINK_LENGTH = 23;
const LINK = /https?:\/\/\S+/g;

// X counts these characters as 1 (Latin letters with accents too, Cyrillic, Greek,
// common punctuation). Everything else counts as 2: emoji, Chinese, Japanese…
// (rules of twitter-text v3). An emoji made of several symbols, like ❤️, counts
// more here than on X: the post can only look a bit longer, never too short.
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

/** The link goes last, on its own line, unless the text already has one. */
export const withLink = (text, link) => (/https?:\/\//.test(text) ? text : `${text}\n\n${link}`);

/**
 * Reads data/post-x.md: every "## repo-name" section is the post of that project.
 * The text before the first section is help for Sasha and is ignored.
 */
export function parsePosts(markdown) {
  const posts = {};
  let current = null;
  let lines = [];
  const save = () => {
    const text = lines.join('\n').trim();
    if (current && text) posts[current] = text;
  };
  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(\S+)\s*$/);
    if (heading) {
      save();
      current = heading[1];
      lines = [];
    } else {
      lines.push(line);
    }
  }
  save();
  return posts;
}

// Hidden marks: they tell the script that an issue is still waiting for something.
const WAITING = {
  description: '<!-- x-drafts: waiting for description -->',
  post: '<!-- x-drafts: waiting for post text -->',
};

/** 'description' or 'post' if the issue is waiting for it, else null. */
export const waitingState = (body) =>
  Object.keys(WAITING).find((state) => body?.includes(WAITING[state])) ?? null;

const CHECKLIST = `## Checklist

- [ ] Add a GIF or short video
- [ ] Post on X
- [ ] Close this issue
`;

/** Body of the issue with the ready post. */
export function draftIssueBody(text) {
  const length = xLength(text);
  const tooLong = length > LIMIT ? '\n⚠️ **Too long for X.** Make it shorter here or in `data/post-x.md`.\n' : '';
  return `Draft post for X. Check it, copy it and post it by hand.

\`\`\`text
${text}
\`\`\`

**${length}/${LIMIT} characters** (X counts every link as ${LINK_LENGTH}).
${tooLong}
Text from \`data/post-x.md\`.

${CHECKLIST}`;
}

/** Body of the issue when data/post-x.md has no post for the project yet. */
export function waitingForPostBody({ repo, description, link, readme }) {
  return `${WAITING.post}
✏️ **Write the post in \`data/post-x.md\`**, in a section \`## ${repo}\`.
At the next run (every day, or "Run workflow" in the Actions tab) the draft appears here.

The shape, from Dilum Sanjaya's posts on X:

\`\`\`text
✏️ First line: a problem or a question your reader knows.

So I built ✏️ … (what it does, in first person)

✏️ One or two short facts. "Built with …" only if it is true.
\`\`\`

The script adds the link at the end. No hashtags.

**Facts for you**

- What it does: ${description}
- Link: ${link}
- README: ${readme}

${CHECKLIST}`;
}

/** Body of the issue when the repository has no description on GitHub. */
export function missingDescriptionBody(repoUrl) {
  return `${WAITING.description}
⚠️ **Add a description to the repository first.**

Open ${repoUrl}, click ⚙️ next to "About" and write one sentence about what the project does.
At the next run (every day, or "Run workflow" in the Actions tab) this issue changes.
`;
}
