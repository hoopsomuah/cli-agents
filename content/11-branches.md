---
scene: 11
act: 2
title: "Branches — Parallel Drafts of the Same Folder"
subtitle: "How you try things without stepping on the team"
duration_seconds: 120
key_idea: "A branch is a free, instant, throwaway copy of the whole repo where you can edit without affecting anyone else. You can have as many as you want."
hero_image: "11-parallel-drafts.png"
hero_image_alt: "Three identical hardcover notebooks lying open side by side on a wooden desk, annotated in the same handwriting but with slightly different drafts of the same content"
hero_image_caption: "A branch is just another draft of the same notebook — kept alongside the others, not on top of them."
diagram: "03-branch-merge.svg"
diagram_alt: "Diagram showing the main branch as a horizontal line with commits, a feature branch arcing above with its own commits, and the branch merging back into main"
diagram_caption: "A branch is a safe place to draft. The merge is when it joins reality."
bullets:
  - "A branch is a parallel copy of the entire repo"
  - "Free, instant, and as many as you want"
  - "The team's shared truth lives on the 'main' branch"
  - "You work on your own branch (e.g. 'q2-launch-shift')"
  - "Nothing on your branch affects main until you merge"
---

## The diagram in words

```
main:           A ──► B ──► C ──► D                  ← the team's shared truth
                          └──► X ──► Y                ← Hoop's branch, drafting a change
```

The team's shared version of the canon lives on a branch called `main`. When you want to try a change, you create your own branch (let's call it `q2-launch-shift`). That branch is **a parallel copy of the entire folder**. You can edit any file freely. You can commit several drafts. You can throw the whole branch away if you change your mind.

## Three things to internalize

1. **Branches are free and instant.** You make a branch in under a second.
2. **You can have many branches at once.** Each unfinished idea lives in its own branch.
3. **A branch never affects `main` until you explicitly merge it.**

This solves the "stepping on each other" problem. Sarah can draft changes to the Q2 plan on her branch while Hoop drafts changes to the team mission on his — neither sees the other's work-in-progress, and `main` stays clean.

## Four commands to know about (not to memorize today)

| Command | What it does |
| --- | --- |
| `git branch` | List your branches |
| `git checkout -b <name>` | Create a new branch and switch to it |
| `git checkout main` | Switch back to main |
| `git merge <name>` | Merge a branch into the one you're on |

You will not memorize these. Copilot CLI will type them for you. But once you can *picture* a branch as a parallel copy of the folder, the rest of the vocabulary clicks into place.

## Why this matters before we get to PRs

A pull request — the next scene — is fundamentally a request to **merge your branch into main**. It is the conversation about whether your draft is good enough to become the new shared truth. None of that makes sense without first picturing branches as parallel drafts.
