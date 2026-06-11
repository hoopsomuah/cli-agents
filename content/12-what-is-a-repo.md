---
scene: 12
act: 2
title: "Git: A System for Managing Repositories"
subtitle: "A repository is a folder with a memory — Git is the tool that gives it one"
duration_seconds: 120
key_idea: "Git turns an ordinary folder into a repository: a folder that records every change forever and lets you rewind to any moment. GitHub takes those same repositories and makes them a place to collaborate — more on that in Act III."
diagram: "12-git-glyph.svg"
diagram_alt: "Abstract diagram of version control: commit dots on a main line labelled init, draft, edit, merge, with a branch splitting off to try and fix before merging back"
diagram_caption: "A repository remembers every change as a commit. A branch is a safe place to try one."
bullets:
  - "Git is version control: it gives a folder a memory of every change"
  - "A folder plus a hidden .git inside it is a repository"
  - "Each commit is a snapshot plus a one-line note saying who, when, and why"
  - "Commits live forever — you can rewind to any of them, fully offline"
  - "GitHub is where teams share repositories and collaborate — that's Act III"
---

## What Git is

**Git** is a system for managing repositories. A **repository** (or **repo**) is just an ordinary folder on your computer that Git has given a *memory*. From the outside it looks like any other folder — your documents, spreadsheets, notes, and code sit inside it as normal files, and you open and edit them with the same apps you always use. The memory lives in a hidden `.git` subfolder.

Every time you decide a change is worth keeping, you **commit** it. A commit is a snapshot: *here is exactly what every file looked like at 2:47pm on Tuesday, and here is the one-line note explaining why I changed them.*

```
hoop@laptop ~/team-canon $ git commit -m "Update Q2 plan: shifted launch to June 15"
[main 3a8f2c1] Update Q2 plan: shifted launch to June 15
 1 file changed, 4 insertions(+), 2 deletions(-)
```

That commit lives forever. Three weeks or three years from now, anyone can ask *"show me what the Q2 plan looked like on May 19"* and the repo will answer. This is the cure for the `Final_v7_FINAL` problem from the last scene: the history is attached to the files themselves, not to anyone's memory.

## What Git gives you for free

Once a folder is a repo:

- **Every change is timestamped and attributed** — no more "who edited this?"
- **Every change carries a message** explaining the *why*.
- **You can compare** any two versions and see exactly what changed.
- **You can rewind** to any prior state, instantly.

And crucially, all of this works **completely offline**. The repository on your laptop holds the full history. You can commit on a plane and rewind with no network at all.

## Where GitHub comes in

Git lives on your machine. **GitHub** is a service built on Git's principles that takes those same repositories and turns them into a place to *collaborate* — a shared home in the cloud where a whole team works on one repository together, with reviews, discussion, and a complete shared history.

We're not there yet. For now, hold onto one line: **Git is the memory; GitHub is the meeting place.** We'll spend all of Act III on GitHub. First, the one Git idea that makes collaboration possible at all — the **branch** — is next.
