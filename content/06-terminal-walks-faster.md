---
scene: 06
act: 2
title: "The Terminal Walks the House Faster"
subtitle: "Five commands cover ninety percent of the work"
duration_seconds: 120
key_idea: "File Explorer is friendly. The terminal is fast. You'll use both — but the terminal is the one that scales."
bullets:
  - "pwd — 'where am I?' Prints the current folder"
  - "ls (or dir) — 'what's here?' Lists files and folders"
  - "cd <folder> — go into a folder"
  - "cd .. — go up one level"
  - "cat <file> — show the contents of a file on screen"
---

## When clicking runs out

In File Explorer, you navigate by **clicking**. That works fine for one or two folders. But:

- **Looking at 200 files?** Type `ls` and see them all at once.
- **Need to copy 500 files matching a pattern?** One command instead of 500 clicks.
- **Need to know exactly where you are?** Type `pwd` and the full path prints.
- **Want to do this again tomorrow?** Save the command. Run it again. Done.

The terminal is **faster, exact, and scriptable**. File Explorer is friendly. You will use both, every day. The terminal becomes irreplaceable the moment you want to do anything *more than once*.

## The five commands

| Command | What it does | Example |
| --- | --- | --- |
| `pwd` | Print the current folder | `pwd` → `C:\Users\hoop` |
| `ls` | List what's in this folder | `ls` |
| `cd <folder>` | Change into a folder | `cd Documents` |
| `cd ..` | Move up one level | `cd ..` |
| `cat <file>` | Show a file's contents | `cat README.md` |

That's it for now. We will add a few more as we go. With just these five you can walk the entire filesystem.

## A live tour

Try this in your terminal:

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

Five commands, three rooms walked. The same pattern works for every folder on the machine.

## What a TUI is (and why you've already used one)

A **TUI** is a Text User Interface — a program that lives inside the terminal but draws menus, panels, and lists, with mouse support. Examples you may meet:

- **lazygit** — a visual front end for Git.
- **htop** — a live view of running processes.
- **gh dash** — a dashboard of your GitHub PRs and issues.
- **Copilot CLI** — yes, Copilot CLI itself is a TUI: it draws a chat panel right in your terminal window.

The point: "command line" does *not* mean "type arcane commands from memory." It means *the canvas a developer can paint any interface onto, including very friendly ones.*
