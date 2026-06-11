# Seeded Issues — For You to Review and Create

These are 8 starter "homework" issues to seed on the `hoopsomuah/cli-agents` repo. They are designed so that the EA and BM can each pick one this week, do the work, and close it via a PR. Together, the eight issues exercise every concept in the presentation at least once.

You can create them by hand on the GitHub website, or use the `gh issue create` commands below from a clone of the repo.

---

## Issue 1 — Install Windows Terminal and take a screenshot

**Title:** Install Windows Terminal and take a screenshot
**Labels:** `good first issue`, `step-1`
**Description:**

Walk through Step 1 of the [install checklist](https://hoopsomuah.github.io/cli-agents/#scene-06). When you have Windows Terminal open with a blinking cursor:

1. Take a screenshot.
2. Save it as `evidence/terminal-installed-<your-name>.png` in this repo.
3. Open a PR adding the screenshot. Reference this issue with `Closes #1` in the PR description.

**Done when:** Your screenshot is merged into `main`.

---

## Issue 2 — Add yourself to TEAM.md

**Title:** Add yourself to TEAM.md
**Labels:** `good first issue`, `step-2`
**Description:**

Edit `TEAM.md` to add a line with your name and role. Open a PR.

The point of this issue is to exercise the full PR loop: branch → edit → commit → push → open PR → review → merge.

**Done when:** Your name appears on the `main` branch of `TEAM.md`.

---

## Issue 3 — Clone this repo and open it as an Obsidian vault

**Title:** Clone this repo and open it as an Obsidian vault
**Labels:** `good first issue`, `step-3`
**Description:**

Walk through Steps 1–5 of the [install checklist for Git + Obsidian](https://hoopsomuah.github.io/cli-agents/#scene-17).

When Obsidian shows you the `content/` folder with all the scene files:

1. Pick one scene file. Read it.
2. Add a "Reader notes" section at the bottom with one or two of your reactions.
3. Open a PR adding your notes.

**Done when:** Your reader notes are merged into the scene file.

---

## Issue 4 — Fix a typo

**Title:** Fix a typo anywhere in this site
**Labels:** `good first issue`, `low-effort`
**Description:**

There are typos somewhere in the content. Find one. Fix it. Open a PR.

The point of this issue is to practice opening a small, surgical PR — one line changed. This is the bread-and-butter of a repo-driven team.

**Done when:** Your one-line PR is merged.

---

## Issue 5 — Propose a scene we should add

**Title:** Propose a new scene
**Labels:** `enhancement`, `discussion`
**Description:**

What's missing? What would help the next teammate who reads this site?

Comment on this issue with:

1. The proposed title.
2. A one-paragraph description of what the scene would cover.
3. Where it fits in the existing acts.

If the proposal gets a thumbs-up, open a PR adding a draft of the scene.

**Done when:** A new scene is merged, or this issue is closed with a `wontfix` label after discussion.

---

## Issue 6 — Try Copilot CLI on this repo

**Title:** Try Copilot CLI on this repo
**Labels:** `step-4`, `experiment`
**Description:**

Install Copilot CLI by following [GitHub's Copilot CLI documentation](https://docs.github.com/en/copilot/github-copilot-in-the-cli) to get it working. Then:

1. Run `copilot` from inside the `cli-agents` folder.
2. Ask it: *"Summarize what this repo is for."*
3. Ask it: *"What's the difference between a CLI and a TUI according to this content?"*
4. Open a PR adding a new file `evidence/copilot-cli-session-<your-name>.md` with a short transcript of what Copilot said.

**Done when:** Your transcript is merged.

---

## Issue 7 — Draft our team's mission as a Markdown file

**Title:** Draft mission.md for the team
**Labels:** `canon`, `discussion`
**Description:**

Create a new file `canon/mission.md` (the `canon/` folder doesn't exist yet — create it). Take a first pass at writing our team's mission in plain Markdown — a few paragraphs, maybe a bulleted list of operating principles.

It does not need to be right. It needs to be a starting point that we can iterate on via PRs.

Open the PR. Tag the principal as a reviewer.

**Done when:** The mission draft is merged. Subsequent edits will go through their own PRs — that's the point.

---

## Issue 8 — Compare a SharePoint document we use today to this workflow

**Title:** Compare one SharePoint doc to the repo workflow
**Labels:** `analysis`, `discussion`
**Description:**

Pick one document that currently lives in SharePoint and that you'd consider moving to this repo. Could be the operating rhythm, a status template, an org chart — your choice.

Open a PR adding `analysis/sharepoint-comparison-<doc-name>.md` with:

1. The name of the doc.
2. What it's used for.
3. What would be better if it lived in the repo.
4. What would be harder.
5. Your recommendation: move it, leave it, or split it.

**Done when:** The analysis PR is merged. We'll use it to decide whether to actually move the doc.

---

## Quick-create commands

Once you've cloned the repo and have `gh` authenticated, you can create all 8 issues with these commands:

```bash
gh issue create --title "Install Windows Terminal and take a screenshot" --label "good first issue" --body-file - <<'EOF'
[paste issue 1 description]
EOF
```

Or, easier: copy each block above into the GitHub web UI's "New Issue" form.
