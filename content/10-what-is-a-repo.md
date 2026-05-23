---
scene: 10
act: 2
title: "A Repository Is a Folder with Memory"
subtitle: "The single mental model that unlocks Git, GitHub, and everything after"
duration_seconds: 120
key_idea: "A repo is a regular folder on your computer that has been given a memory. Every change is recorded forever. You can rewind to any moment in its history."
hero_image: "07-annotated-book-watercolor.png"
hero_image_alt: "Hand-illustrated watercolor of an open hardcover book on a desk, pages dense with handwritten margin notes in several different inks, magnifying glass and fountain pen alongside, brick wall behind"
hero_image_caption: "A repository is a folder that remembers everything written in its margins."
bullets:
  - "A folder + a hidden .git subfolder = a repository"
  - "Files behave normally — open, edit, save in any app"
  - "When you 'commit', the repo takes a snapshot + your one-line note explaining why"
  - "Commits live forever — you can travel back to any one"
  - "Works fully offline; you 'push' to GitHub when you want to share or back up"
---

## What a repository actually is

A **repository** (or **repo**) is a folder on your computer with a hidden `.git` subfolder inside it. That hidden folder is the **memory**. Everything else — your documents, your spreadsheets, your code, your notes — sits in the folder as normal files.

You interact with the files exactly the same way you always have: open them in Word, edit them in Obsidian, view them in Explorer. The difference is that every time you decide a change is worth keeping, you **commit** it. A commit is a snapshot: *here is what every file looked like at 2:47pm on Tuesday, May 19, and here is the one-line note explaining why I changed them.*

```
hoop@laptop ~/team-canon $ git commit -m "Update Q2 plan: shifted launch to June 15"
[main 3a8f2c1] Update Q2 plan: shifted launch to June 15
 1 file changed, 4 insertions(+), 2 deletions(-)
```

That commit lives forever. Three weeks from now, three years from now, anyone can ask: *"Show me what the Q2 plan looked like on May 19."* The repo will show them.

## Local first, then shared

The part most newcomers miss: **a Git repo works completely offline.** The repository on your laptop has the full history. You can commit on a plane. You can rewind. You can compare any two versions. None of this requires a server.

When you are ready to share — or just want a backup — you **push** the repo to GitHub. Now it lives in two places: your laptop and a cloud server your teammates can access. If a teammate **clones** the repo, they get a complete copy on their machine, with the entire history. Three teammates, three full copies, all in sync.

This is fundamentally different from SharePoint or OneDrive, where the "real" version lives on a server you don't control and your local copy is a temporary cache.

## What you get for free

Once a folder is a repo:

- **Every change is timestamped and attributed.** No more "who edited this?"
- **Every change has a message** — a one-line note explaining the *why*.
- **You can diff** any two versions and see exactly what changed.
- **You can revert** to any prior state, instantly.
- **You can branch** — copy the whole folder to try something, then keep or throw it away. (Next scene.)

A repo is not a folder *with* version control bolted on. A repo is **a folder where version control is the floor**.
