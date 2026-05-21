---
scene: 08
act: 3
title: "Branches and Pull Requests"
subtitle: "How a team agrees on a change without stepping on each other"
duration_seconds: 240
key_idea: "A pull request is the most powerful sign-off mechanism ever invented for knowledge work. Every change is proposed, reviewed, and approved before it becomes the new truth — and the entire conversation is auditable forever."
interactive: "pr-walkthrough"
diagram: "03-branch-merge.svg"
diagram_alt: "Diagram showing the main branch as a horizontal line with commits, a feature branch arcing above with its own commits, a pull-request box with approvals, and the branch merging back into main"
diagram_caption: "A branch is a safe place to try things. A PR is the conversation about whether to keep them."
---

## Branches — parallel realities for your folder

When you want to try a change without disturbing the team's shared version, you create a **branch**. A branch is a parallel copy of the folder where you can edit freely. The team's main version (called `main`) is untouched until you decide to merge.

```
main:           A ──► B ──► C ──► D                  (the team's shared truth)
                          └──► X ──► Y                (Hoop's branch, drafting a change)
```

Three things to know:

1. **Branches are free and instant.** You make a branch in under a second.
2. **You can have many branches at once.** Each unfinished idea lives in its own branch.
3. **A branch never affects `main` until you explicitly merge it.**

This solves the "stepping on each other" problem. Sarah can be drafting changes to the Q2 plan on her branch while Hoop is drafting changes to the team mission on his — neither of them sees the other's work-in-progress, and `main` stays clean.

## The pull request — propose, review, sign off

When Hoop is ready to share his branch, he opens a **pull request** (PR). A PR is a single screen on GitHub that says:

> *"Here is the change I want to make to `main`. Here is exactly what I edited, line by line. Here is the one-paragraph explanation of why. Please review it."*

Sarah opens the PR. She sees:

- A **diff** — every line that was added, removed, or changed, in green and red.
- The **description** Hoop wrote explaining the *why*.
- A **comment area** where she can ask questions or suggest tweaks, line by line.
- An **Approve / Request Changes** button.

If Sarah approves, Hoop clicks **Merge**. The branch's changes flow into `main`. The PR — with its full conversation, every comment, every approval, every change — is **permanently archived** and linked to the commits forever.

## Why this is a sign-off process

Stop and re-read that last sentence. **The PR is permanently archived.** Six months from now, when an auditor or an exec asks, *"who approved the change to the Q2 plan?"* — you click one link and see:

- Who proposed it (Hoop, on May 19 at 2:47pm).
- What exactly changed (4 lines, all visible).
- Who reviewed it (Sarah, who left two comments).
- Who approved it (Sarah, on May 20 at 9:12am).
- Why it was made (the description Hoop wrote).
- What it looked like *before* the change.

This is the audit trail every compliance team dreams of, and software teams have been living inside it for fifteen years. **PRs are the most auditable, lowest-friction sign-off mechanism ever invented for collaborative work.**

## A bigger claim

When the file is in a repo and changes flow through PRs, you stop needing:

- Email chains asking for approval.
- A separate ticketing system to track "who said yes."
- A document management system that tries to bolt approval workflows on top of files.
- The phrase "let me check with legal" three times for the same change.

The file *is* the artifact. The PR *is* the sign-off. The repo *is* the audit log. One mechanism, three jobs, zero friction.

This is the slide your EA and BM should screenshot.
