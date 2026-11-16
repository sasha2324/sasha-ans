# Draft posts for X — design

Approved by Sasha on 17/11/2026. Post style changed the same day (see "The post").

## Goal

When a new project appears on the portfolio, GitHub writes a **draft** post for X
as an issue. It never posts on X: Sasha posts by hand.

## How it works

1. A GitHub Action runs every day at 07:00 UTC and with the "Run workflow" button.
2. It reads the public repositories of `sasha2324` with the topic `portfolio`,
   with the same rule as the site (`src/data/github.ts`): not private, not a fork.
3. It skips the projects listed in `data/annunciati.json` (it starts empty: `[]`).
4. For each new project it creates an issue `Draft post: <project name>` with the
   label `post-x`: the post in a code block, the count (max 280 as X counts them:
   a link = 23, an emoji = 2) and a checklist: Add a GIF or short video / Post on X /
   Close this issue.
5. It adds the project to `data/annunciati.json` and commits it. The message starts
   with `[skip ci]`, so Cloudflare Pages does not rebuild the site (the skip words
   must be at the start of the message).

## The post

- **English only.** No "what I learned", **no hashtags**.
- Reference: Dilum Sanjaya's posts on X (5 screenshots from Sasha). Taken from them:
  a first line with a problem or a question the reader knows, then "So I built…",
  then one or two short facts ("Built with …" only if true), the link last, a video.
- The script can't write a hook, so **people write the posts**, in `data/post-x.md`:
  one section `## <repo-name>` per project. Claude wrote the first three, Sasha checks them.
- **The link:** the script adds it at the end, after an empty line: the "Website" of the
  repository on GitHub, otherwise the project card on the English site
  (`https://sasha-ans.pages.dev/en/#progetto-<repo>`). If the text already has a link,
  it adds nothing.
- Longer than 280: the script does not cut it; the issue shows a warning.
- **Name** in the issue title: the title in `src/data/progetti.ts` (`extras`, English,
  else Italian), else the repo name.

## Issues that wait

A hidden mark in the issue says what it is waiting for. A waiting project is **not**
added to the list, so the script checks it again every day.

- **No GitHub description:** the issue only says "Add a description to the repository first".
- **No post in `data/post-x.md`:** the issue shows the shape with ✏️ gaps and the facts
  (what it does — English description on the site, else GitHub description —, link, README).
- When the missing thing arrives, the script rewrites the **same** issue. It changes a
  waiting issue only when its state changes, so it never deletes what Sasha writes in it.
- **No duplicates:** before creating an issue, the script looks for an issue with the
  same title and the `post-x` label (open or closed). If it exists, it does not create a
  new one, so a run that fails before the commit never makes double issues.
- **Errors from GitHub:** the run fails (red in the Actions tab, email from GitHub).

## Security

- Only the default `GITHUB_TOKEN`, with `contents: write` and `issues: write`.
- No X key, no other secrets, no AI.
- Third-party actions: only `actions/checkout` and `actions/setup-node`, pinned to a commit.
- The repo is public: the issues (the drafts) are public too.

## Files

| File | What it does |
|---|---|
| `.github/workflows/draft-x-posts.yml` | when to run, permissions, tests, the commit |
| `scripts/x-drafts/main.mjs` | talks to GitHub and reads the files |
| `scripts/x-drafts/drafts.mjs` | decides what to do for each project |
| `scripts/x-drafts/text.mjs` | the issue text, the X character count, reads `post-x.md` |
| `scripts/x-drafts/*.test.mjs` | tests, with Node's built-in test runner |
| `data/post-x.md` | the posts, written by people |
| `data/annunciati.json` | the projects that already have their draft |

Local check without changing anything: `node scripts/x-drafts/main.mjs --dry-run`.
Tests: `node --test 'scripts/x-drafts/*.test.mjs'`.
