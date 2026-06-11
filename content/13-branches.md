---
scene: 13
act: 2
title: "Branches — A Safe Place to Try a Change"
subtitle: "How you draft an edit without touching the version everyone relies on"
duration_seconds: 120
key_idea: "A branch is your own private copy of the whole repo's history, made in an instant. You can edit, commit, and experiment on it freely — the shared version everyone else uses stays untouched until you decide to bring your changes back."
hero_image: "loops-03-branches-reading.png"
hero_image_alt: "Hand-painted storyboard panel on a warm brick wall: a woman holds up a lantern beside a flagged fork in a glowing trail. A banner reads 'A branch is a line of work — you stand on one at a time.' A bright branch labelled 'chapter-7/rewrite' arcs up and away from a straight amber line labelled 'manuscript/main', a draft of chapter-7/rewrite resting on a desk below."
hero_image_caption: "A branch forks off the main line — and you only ever stand on one at a time."
deck_image: "loops-03-branches-deck.png"
deck_image_alt: "Cinematic watercolor of the same scene — a lantern-lit fork where the 'chapter-7/rewrite' branch glows away from 'manuscript/main' — staged dramatically for projection."
deck_image_caption: "One line forks into two. You only ever stand on one."
diagram: "03-branch-merge.svg"
diagram_alt: "Diagram showing the main branch as a horizontal line with commits, a feature branch arcing above with its own commits, and the branch joining back into main"
diagram_caption: "main is the shared version. A branch splits off, collects a few commits, then rejoins."
bullets:
  - "The shared, trusted version of a repo lives on a branch named main"
  - "A branch is your own copy of that history — created in an instant, costing nothing"
  - "On your branch you edit and commit freely; main is never affected"
  - "You can keep several branches at once, one per idea you're trying"
  - "When a draft is ready, its commits are brought back into main; if not, you throw the branch away"
---

## The problem branches solve

Imagine your team keeps its plans in one repo. There is one version everyone trusts — the current, agreed-upon truth. Now you want to try a sizeable edit: shift the Q2 launch, reflow the budget, rewrite the summary. You don't want half-finished edits visible to everyone while you think. And you certainly don't want two people overwriting each other on the same file at the same time.

A **branch** is the answer. It is your own copy of the repo's entire history, created in a fraction of a second. You make your edits and commits *on your branch*, in private. The shared version is completely unaffected by anything you do until you choose to bring your work back.

## Picture it as two lines

The trusted, shared version lives on a branch called **`main`**. When you start a change, you create a branch off it — say `q2-launch-shift`:

```
main:           A ──► B ──► C ──► D            ← the version everyone trusts
                          └──► X ──► Y          ← your branch, drafting a change
```

`A`, `B`, `C`, `D` are commits on `main`. The moment you branch, you get your own line — `X`, `Y` — that starts from wherever `main` was. You commit as many drafts as you like on that line. None of `X` or `Y` touches `main`. When the draft is good, those commits get folded back into `main` (a **merge**), and the two lines become one again. If the idea doesn't work out, you delete the branch and `main` never knew it existed.

## Three things to internalize

1. **Branches are free and instant.** Creating one takes under a second and copies nothing physically — Git is clever about that.
2. **You can have many at once.** Each unfinished idea lives on its own branch. Sarah drafts the Q2 plan on hers while you rewrite the mission on yours — neither sees the other's work-in-progress, and `main` stays clean.
3. **A branch never affects `main` until you merge it.** That is the whole safety guarantee.

## The vocabulary (to recognize, not memorize)

| Command | What it does |
| --- | --- |
| `git branch` | List your branches |
| `git checkout -b <name>` | Create a new branch and switch to it |
| `git checkout main` | Switch back to main |
| `git merge <name>` | Fold a branch's commits into the one you're on |

You will not memorize these — Copilot CLI will type them for you. But once you can *picture* a branch as a private line of commits that splits off `main` and later rejoins it, the rest of Git clicks into place.

That picture — your branch versus the shared `main` — is also the foundation of how whole teams collaborate on GitHub. That's where Act III begins.
