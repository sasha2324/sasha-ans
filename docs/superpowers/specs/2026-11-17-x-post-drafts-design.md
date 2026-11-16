# Draft posts for X — design

Approved by Sasha on 17/11/2026.

## Goal

When a new project appears on the portfolio, GitHub writes a **draft** post for X
as an issue. It never posts on X: Sasha posts by hand.

## How it works

1. A GitHub Action runs every day at 07:00 UTC and with the "Run workflow" button.
2. It reads the public repositories of `sasha2324` with the topic `portfolio`,
   with the same rule as the site (`src/data/github.ts`): not private, not a fork.
3. It skips the projects listed in `data/annunciati.json` (it starts empty: `[]`).
4. For each new project it creates an issue:
   - title `Draft post: <project name>`, label `post-x`;
   - one draft, **in English only**, max 280 characters as X counts them
     (a link = 23, an emoji = 2): a first line with the name, what the project does,
     the link to the project card on the English site
     (`https://sasha-ans.pages.dev/en/#progetto-<repo>`);
   - no "what I learned", **no hashtags**;
   - a checklist: Add a GIF or short video / Post on X / Close this issue.
5. It adds the project to `data/annunciati.json` and commits it with `[skip ci]`.

## Where the text comes from

- **Name:** the title in `src/data/progetti.ts` (`extras`), else the repo name.
- **What it does:** the English description in `src/data/progetti.ts`
  (`extras[repo].description.en`), else the GitHub description.
  The issue says which one it used. The README is not used.
- If the text is too long, it is cut at a word and ends with "…"; the issue says so.

## Special cases

- **No GitHub description:** the issue only says "Add a description to the repository
  first" and the project does **not** go into the list. At the next runs the script
  updates the same issue; when the description exists, the draft appears there.
- **No duplicates:** before creating an issue, the script looks for an issue with the
  same title and the `post-x` label (open or closed). If it exists, it does not create
  a new one. So a run that fails before the commit never makes double issues.
- **Errors from GitHub:** the run fails (red in the Actions tab, email from GitHub).

## Security

- Only the default `GITHUB_TOKEN`, with `contents: write` and `issues: write`.
- No X key, no other secrets, no AI.
- Third-party actions: only `actions/checkout` and `actions/setup-node`, pinned to a commit.
- The repo is public: the issues (the drafts) are public too.

## Files

| File | What it does |
|---|---|
| `.github/workflows/draft-x-posts.yml` | when to run, permissions, the commit |
| `scripts/x-drafts/main.mjs` | talks to GitHub and reads the files |
| `scripts/x-drafts/drafts.mjs` | decides what to do for each project |
| `scripts/x-drafts/text.mjs` | writes the draft and counts the characters |
| `scripts/x-drafts/*.test.mjs` | tests, with Node's built-in test runner |
| `data/annunciati.json` | the projects that already have a draft |

Local check without changing anything: `node scripts/x-drafts/main.mjs --dry-run`.
Tests: `node --test scripts/`.
