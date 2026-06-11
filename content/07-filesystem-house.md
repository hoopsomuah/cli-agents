---
scene: 07
act: 2
title: "Folders, Files, and Paths"
subtitle: "How to read the address of anything on your machine"
duration_seconds: 90
key_idea: "Every doc, every photo, every program is a file inside a folder. Once you can read a path — the address of a file — the whole machine opens up."
bullets:
  - "A folder holds files and other folders; nested folders form a tree"
  - "A path is the address of a file: drive, then folder, then folder, then file"
  - "Windows uses backslashes; macOS and Linux use forward slashes"
  - "Every app — Word, Slack, Chrome — sits on top of this same tree of folders"
---

## A path is just an address

Everything on your computer is a **file** living inside a **folder** (also called a "directory"). Folders nest inside folders, forming a tree. A **path** is the address that tells you exactly where a file sits in that tree.

On Windows a path looks like this:

```
C:\Users\hoop\Documents\plans\2026-rhythm-of-business.md
```

Read it left to right: start at drive `C:`, go into `Users`, then `hoop`, then `Documents`, then `plans`, and grab the file `2026-rhythm-of-business.md`. That's the whole idea. Everything else is variation.

## Two flavors of address

- **Windows** uses backslashes: `C:\Users\hoop\Documents`
- **macOS and Linux** use forward slashes: `/Users/hoop/Documents`

When you read documentation written for a Mac or for Linux, you'll see forward slashes. They mean the same thing.

## Shortcuts the terminal uses

| Shortcut | Means |
| --- | --- |
| `.` | The current folder |
| `..` | The parent folder (one level up) |
| `~` | Your home folder (e.g. `C:\Users\hoop`) |
| `\` (alone) | The root of the drive |

These aren't jargon — they're just abbreviations for places in the tree, and you'll see them everywhere.

## Why this sets up the next scene

Hold onto one fact: **the filesystem is the substrate, and everything else is paperwork on top of it.** Repos, branches, commits, vaults, GitHub URLs — all of it is just folders and files. In the next scene we'll move around this tree from the terminal and see why typing the address beats clicking toward it.
