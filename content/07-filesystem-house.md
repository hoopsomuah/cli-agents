---
scene: 07
act: 2
title: "The Filesystem as a House"
subtitle: "Folders, files, and the addresses they live at"
duration_seconds: 120
key_idea: "Every doc, every photo, every program on your computer is a file in a folder. Once you can read a path, the whole machine opens up."
hero_image: "05-house-cutaway.png"
hero_image_alt: "Architectural watercolor cutaway of a two-story house with rooms labeled Documents, Pictures, Projects, and a hallway labeled /Users/hoop/"
hero_image_caption: "Your computer is a house. Folders are rooms. Paths are directions."
deck_image: "05-house-night.png"
deck_image_alt: "Cinematic watercolor of the filesystem house at night, each labeled room glowing a different color, with a small figure in the front hallway carrying a terminal cursor as a flashlight"
deck_image_caption: "Every folder is a room. The cursor is your flashlight."
bullets:
  - "Computer = a house. Folders = rooms. Files = objects in those rooms."
  - "A 'path' is the address: drive → folder → folder → file"
  - "Example: C:\\Users\\hoop\\Documents\\plans\\2026-rhythm.md"
  - "Every app — Word, Slack, Chrome — sits on top of this same tree"
---

## The metaphor

Imagine your computer as a house. Each **folder** (or "directory") is a room. Each **file** is an object in that room. Files have **paths**, which are just directions: *go to the second floor, into the office, top drawer of the desk, third folder from the left.*

A path on Windows looks like:

```
C:\Users\hoop\Documents\plans\2026-rhythm-of-business.md
```

Read it left to right: start at drive `C:`, go into `Users`, then `hoop`, then `Documents`, then `plans`, and grab the file `2026-rhythm-of-business.md`. That's the whole concept. Everything else is variation.

## Two flavors of address

- **Windows** uses backslashes: `C:\Users\hoop\Documents`
- **Mac and Linux** use forward slashes: `/Users/hoop/Documents`

When you read documentation written for a Mac or for Linux, you'll see forward slashes. They mean the same thing.

## Special shortcuts the terminal uses

| Shortcut | Means |
| --- | --- |
| `.` | The current folder |
| `..` | The parent folder (one level up) |
| `~` | Your home folder (e.g. `C:\Users\hoop`) |
| `\` (alone) | The root of the drive |

You will see these everywhere. They are not jargon; they are abbreviations for places in the house.

## Why this mental model carries the next ten scenes

Everything that comes next — repos, branches, commits, Obsidian vaults, GitHub URLs — is **just folders and files**. Every advanced concept is a thin layer on top of the filesystem you already understand. If you remember nothing else from this scene, remember this: **the filesystem is the substrate. Everything else is paperwork on top of it.**
