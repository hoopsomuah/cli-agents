---
scene: 14
act: 3
title: "Pull Requests — Change as a Conversation"
subtitle: "The most auditable, lowest-friction sign-off process ever invented for knowledge work"
duration_seconds: 240
key_idea: "A PR turns 'I changed something' into 'I am proposing this change, here is exactly what I'm changing, and here is why' — and it preserves the whole conversation forever."
hero_image: "loops-10-proposal-reading.png"
hero_image_alt: "Watercolor courtyard between 'Ada's Workshop' and the 'Shared Repository Library'. Ada stands at a lectern holding open a book stamped 'PULL REQUEST', pointing to a branch labelled 'feature/auth', presenting to three seated colleagues — Kenji ('tests everything'), Rosa ('thinks in diagrams') and Sam ('ships with care'). A banner overhead reads 'The Proposal — asking the world to accept your work.'"
hero_image_caption: "A pull request is a proposal — your branch, presented to the people it affects."
deck_image: "loops-10-proposal-deck.png"
deck_image_alt: "Cinematic staging of the proposal scene: Ada presenting a 'PULL REQUEST' from the lectern between workshop and library, colleagues watching from the foreground."
deck_image_caption: "You're not just merging code. You're asking the world to accept your work."
bullets:
  - "A pull request (PR) says: please merge my branch into main"
  - "It shows the diff — every added, removed, and changed line"
  - "Reviewers comment line-by-line, request changes, or approve"
  - "When merged, the PR and its conversation are archived forever"
  - "Same mechanism for every change: tiny typo or major plan shift"
---

## Anatomy of a PR

When Hoop is ready to share his branch, he opens a **pull request** on GitHub. A PR is a single screen that contains:

| Section | What it shows |
| --- | --- |
| **Title** | A one-line summary of the change |
| **Description** | A few sentences (or paragraphs) explaining the *why* |
| **Diff** | Every line that was added, removed, or changed — green for additions, red for removals |
| **Files changed** | Which files the diff touches, organized by folder |
| **Conversation** | Reviewers' comments, line-by-line and overall |
| **Reviews** | Each reviewer's verdict — Approve, Request changes, or Comment |
| **Checks** | Automated tests, link checks, build status |
| **Merge button** | Lives at the bottom, locked until reviews/checks pass (if rules say so) |

Sarah opens the PR. She sees Hoop's diff. She can:

- Hover any line and leave a comment ("can you clarify this date format?")
- Suggest a specific edit that Hoop can accept with one click
- Approve, Request Changes, or just leave a Comment
- Re-read after Hoop pushes a follow-up commit — the diff updates live

When the conversation is resolved, Hoop clicks **Merge**. The branch's changes flow into `main`. The PR — with its full conversation, every comment, every approval, every change — is **permanently archived** and linked to the resulting commits forever.

## Why this is a sign-off process

Stop and re-read that last sentence. **The PR is permanently archived.** Six months from now, when an auditor or an exec asks, *"who approved the change to the Q2 plan?"* — you click one link and see:

- Who proposed it (Hoop, May 19 at 2:47 pm)
- What exactly changed (4 lines, all visible)
- Who reviewed it (Sarah, who left two comments)
- Who approved it (Sarah, May 20 at 9:12 am)
- Why it was made (Hoop's description)
- What it looked like *before* the change

This is the audit trail every compliance team dreams of, and software teams have been living inside it for fifteen years.

## What PRs replace

When PRs are the universal change door, the following all collapse into one mechanism:

- Email chains asking for approval
- A separate ticketing system to track "who said yes"
- A document management system that tries to bolt approval workflows onto files
- "Let me check with legal" three times for the same change

The file *is* the artifact. The PR *is* the sign-off. The repo *is* the audit log. **One mechanism, three jobs, zero friction.** This is the slide your EA should screenshot.

## A short worked example

Imagine the team's mission lives at `canon/mission.md`. The principal wants to update one sentence.

1. **Hoop** creates a branch `mission-tweak-may`.
2. He edits the one sentence in Obsidian and saves.
3. In the terminal: `git add canon/mission.md`, `git commit -m "Sharpen mission statement"`, `git push -u origin mission-tweak-may`.
4. He opens a PR titled *"Sharpen mission statement"* with a one-paragraph description.
5. The **principal** reviews the diff. Approves. Clicks Merge.
6. `canon/mission.md` on `main` now contains the new sentence. The PR is archived. The history shows exactly who, when, why.

Total elapsed time: about three minutes. Total bureaucracy: zero.
