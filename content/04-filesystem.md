---
scene: 04
act: 2
title: "The Filesystem as a House"
subtitle: "Folders, files, and the addresses they live at"
duration_seconds: 180
key_idea: "Everything on a computer — every doc, every photo, every program — is a file in a folder. The terminal is the fastest way to walk through that house."
interactive: "fs-walkthrough"
---

## The metaphor

Imagine your computer as a house. Each **folder** (or "directory") is a room. Each **file** is an object in that room. Files have **paths**, which are just the directions to find them: *go to the second floor, into the office, top drawer of the desk, third folder from the left.*

A path on Windows looks like:

```
C:\Users\hoop\Documents\plans\2026-rhythm-of-business.md
```

Read that left to right: start at drive `C:`, go into `Users`, then `hoop`, then `Documents`, then `plans`, and grab the file `2026-rhythm-of-business.md`.

That's it. That's the whole concept. Everything else is variation.

## Why the terminal beats double-clicking

In File Explorer, you navigate by **clicking**. That works fine for one or two folders. But:

- **Looking at 200 files?** Type `ls` (or `dir`) and see them all at once.
- **Need to copy 500 files matching a pattern?** One command instead of 500 clicks.
- **Need to know exactly where you are?** Type `pwd` ("print working directory") and the path is right there.
- **Want to do it twice tomorrow?** Save the command. Run it again. Done.

The terminal is **faster, scriptable, and exact**. File Explorer is friendly. You will use both.

## The five commands that cover 90% of the work

| Command | What it does | Example |
| --- | --- | --- |
| `pwd` | "Where am I?" — prints the current folder | `pwd` → `C:\Users\hoop` |
| `ls` (or `dir`) | List what's in this folder | `ls` |
| `cd` | "Change directory" — move to a folder | `cd Documents\plans` |
| `cd ..` | Move up one level (to the parent folder) | `cd ..` |
| `cat` (or `Get-Content`) | Show the contents of a file | `cat README.md` |

That's it for now. We will add a few more as we go, but you can navigate the entire filesystem with just these five.

## A live tour

Try this in your terminal once it's installed:

```powershell
# Where am I?
pwd

# What's here?
ls

# Go into Documents
cd Documents

# What's in Documents?
ls

# Go back up
cd ..
```

Five commands, and you've walked through three rooms of your house. The same pattern works for every folder on the machine.
