---
scene: 02
act: 1
title: "From Paper to Glass"
subtitle: "A 60-second bridge from the teletype on the previous slide to the app on the next one"
duration_seconds: 60
key_idea: "The screen replaced the paper. The software pipe replaced the cable. The conversation stayed identical."
bullets:
  - "Paper roll → glass screen"
  - "Physical cable → 'pseudo-teletype' (PTY) in software"
  - "Mainframe in another room → process on your laptop"
  - "Same contract: text in, text out"
---

## The short version

This whole slide is a bridge. The teletype on the previous slide is the ancestor; the Windows Terminal on the next slide is the descendant. Three swaps connect them:

1. **Paper became a screen.** The roll of newsprint became a grid of glowing characters.
2. **The cable became a PTY.** "PTY" stands for *pseudo-teletype* — software pretending to be that thick cable, so a terminal window on your screen can talk to a program (a "shell") inside your computer.
3. **The mainframe became a process.** Your laptop runs the computer that the teletype used to talk to. It is faster, but the conversation is the same shape.

That's the whole bridge. Everything else is decoration.

## Sidenote — for those who want to go deeper

The vocabulary the terminal world uses can sound intimidating: TTY, PTY, CLI, TUI. Plain-English definitions:

| Term | Means |
| --- | --- |
| **TTY** | Teletype. The original physical machine, and the word the system still uses for "a text session." |
| **PTY** | Pseudo-teletype. The software pipe that replaces the cable. Every terminal tab opens its own PTY. |
| **CLI** | Command-Line Interface. A program you talk to one command at a time (e.g. `git`, `gh`, `copilot`). |
| **TUI** | Text User Interface. A program drawn inside the terminal that feels app-like — menus, panels, mouse support (e.g. `lazygit`, `htop`). |

Microsoft's [Windows Command-Line Backgrounder](https://devblogs.microsoft.com/commandline/windows-command-line-backgrounder/) tells the full story if you'd like to read further. For the rest of this presentation, you don't need these acronyms.
