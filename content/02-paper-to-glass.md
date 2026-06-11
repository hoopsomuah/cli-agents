---
scene: 02
act: 1
title: "From Paper to Glass"
subtitle: "A 60-second bridge from the teletype on the previous slide to the app on the next one"
duration_seconds: 60
deck_layout: "image-behind"
key_idea: "The screen replaced the paper. The software pipe replaced the cable. The conversation stayed identical."
hero_image: "02-vt100-terminal-still.png"
hero_image_alt: "Hand-illustrated watercolor still life of a VT100 terminal sitting on a wooden desk with brick wall behind, soft warm window light from the left"
hero_image_caption: "The screen replaces the page — but the conversation stays the same."
deck_image: "02-vt100-cinematic.png"
deck_image_alt: "Cinematic watercolor of a VT100 video terminal in a darkened room, the amber CRT glowing brightly with a directory listing, casting warm light across the desk and outlining a silhouette audience"
deck_image_caption: "The screen is the stage. The text is still the conversation."
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
