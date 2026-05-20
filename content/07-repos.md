---
scene: 07
act: 3
title: "Repos — The File With Memory"
subtitle: "A repository is just a folder that remembers"
duration_seconds: 150
key_idea: "A repo is a regular folder on your computer that has been given a memory. Every change is recorded forever. You can travel back to any moment in its history."
interactive: "repo-timeline"
---

## What a repository actually is

A **repository** (or **repo**) is a folder on your computer with a hidden `.git` subfolder inside it. That hidden folder is the **memory**. Everything else — your documents, your spreadsheets, your code, your notes — sits in the folder as normal files.

You interact with the files exactly the same way you always have: open them in Word, edit them in VS Code, view them in Explorer. The difference is that every time you decide a change is worth keeping, you **commit** it. A commit is a snapshot — *here is what every file looked like at 2:47pm on Tuesday, May 19, and here is the one-line note explaining why I changed them.*

```
hoop@laptop ~/team-canon $ git commit -m "Update Q2 plan: shifted launch to June 15"
[main 3a8f2c1] Update Q2 plan: shifted launch to June 15
 1 file changed, 4 insertions(+), 2 deletions(-)
```

That commit lives forever. Three weeks from now, three years from now, anyone can ask: *"Show me what the Q2 plan looked like on May 19."* And the repo will show them.

## Local first, then shared

Here is the part most newcomers miss: **a Git repo works completely offline.** The repository on your laptop has the full history. You can commit on a plane. You can rewind. You can compare two versions. None of it requires a server.

When you are ready to share — or want a backup — you **push** the repo to GitHub. Now it lives in two places: your laptop, and a cloud server that your teammates can access. If a teammate **clones** the repo, they get a complete copy on their machine, with the entire history. Three teammates, three full copies, all in sync.

This is fundamentally different from SharePoint or OneDrive, where the "real" version lives on a server you don't control and your local copy is a temporary cache.

## What you get for free

Once a folder is a repo:

- **Every change is timestamped and attributed.** No more "who edited this?"
- **Every change has a message** — a one-line note explaining the *why*.
- **You can diff** any two versions and see exactly what changed.
- **You can revert** to any prior state, instantly.
- **You can branch** — make a copy of the whole folder to try something, then keep or throw it away.

The mental shift: a repo is not a folder *with* version control. A repo is **a folder where version control is the floor, not an add-on**.
