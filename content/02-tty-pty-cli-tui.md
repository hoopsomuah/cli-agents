---
scene: 02
act: 1
title: "Four Letters You'll Hear a Lot"
subtitle: "TTY, PTY, CLI, TUI — plain-English definitions"
duration_seconds: 120
key_idea: "These four acronyms describe the layers of the terminal stack. Knowing them lets you read documentation without flinching."
interactive: "acronym-cards"
---

## The vocabulary, demystified

You will see these four letters thrown around in documentation, blog posts, and Copilot's own messages. None of them are scary once you have the metaphor.

### TTY — Teletype

The original physical machine. A keyboard wired to a printer wired to a computer. Today, "TTY" is shorthand for **any character-based session** between a human and a program. When a Linux server says `tty1`, it means "session number one."

### PTY — Pseudo-Teletype

A **software pretend-TTY**. There is no cable and no printer, but the operating system fakes the same conversation in memory. Your Windows Terminal opens a PTY when you launch PowerShell. Every tab is its own PTY.

> Think of it like FaceTime versus a phone call with paper cups and string. Same conversation, no string.

### CLI — Command-Line Interface

A program you talk to **one command at a time**. You type `dir`, it lists files. You type `git status`, it tells you what changed. Commands are verbs; you string them together to get work done. **Copilot CLI is a CLI** — that is literally what the name means.

### TUI — Text User Interface

A program that lives **inside** the terminal but draws something more app-like — menus, panels, scrolling lists, mouse support. Think of email clients, file managers, or interactive Git tools that run in the terminal. A TUI is the bridge between "scary command line" and "real app."

## How they stack

```
You ──► Windows Terminal (the window)
            │
            ▼
        PTY (the fake teletype pipe)
            │
            ▼
        Shell — PowerShell, Bash (the program that reads your commands)
            │
            ├─► CLI tools (git, gh, copilot)
            └─► TUI apps (lazygit, htop, gh dash)
```

When someone says "open your terminal and run `git status`," what they mean is: *open Windows Terminal (the window), which opens a PTY (the pipe), which runs PowerShell (the shell), which runs git's CLI (the tool) which prints text back to your screen.* Five layers, but you only ever notice one.
