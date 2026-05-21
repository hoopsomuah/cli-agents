---
scene: 03
act: 1
title: "Windows Terminal, the App"
subtitle: "The modern home for the world's oldest UI"
duration_seconds: 180
key_idea: "Windows Terminal is a tabbed browser for the command line. Install it once, configure it once, never think about it again."
interactive: "terminal-tour"
hero_image: "03-modern-terminal-desk.png"
hero_image_alt: "A modern home-office desk with a monitor displaying a code editor and a mechanical keyboard in the foreground"
hero_image_caption: "The terminal lives quietly inside a tidy desk — same contract, no clatter."
---

## What it is

**Windows Terminal** is a free Microsoft app you install from the Microsoft Store. It is the **container** that holds your PowerShell, Command Prompt, WSL Linux, and Azure Cloud Shell sessions — each in its own tab, just like Chrome holds websites.

Before Windows Terminal (shipped in 2019), Windows users were stuck with the original `conhost.exe` console window from the early 1990s. No tabs. No transparency. No emoji support. No mouse-friendly text selection. It was, technically, a museum piece.

Windows Terminal brought the Windows console world into 2019. As of 2024, it ships pre-installed on Windows 11.

## What you get

- **Tabs.** Multiple shells running side by side, like browser tabs.
- **Panes.** Split a tab into two or four panes. Run a server in one, edit files in another.
- **Profiles.** Each tab can be a different shell: PowerShell for Windows-y things, WSL Ubuntu for Linux-y things, Azure Cloud Shell for cloud-y things.
- **Real fonts.** Programming fonts with ligatures (JetBrains Mono, Cascadia Code), full Unicode, full emoji.
- **Configurable.** Colors, key bindings, background images, transparency — all in a single JSON file or the Settings UI.
- **Open source.** The whole codebase is on GitHub.

## The shells inside it

A **shell** is the program that reads what you type and runs it. Windows Terminal does not replace your shell — it hosts it. The three shells you'll meet:

| Shell | What it's for | When you'll use it |
| --- | --- | --- |
| **PowerShell** | Modern, object-aware shell for Windows | Day-to-day Windows tasks, automation |
| **Command Prompt (cmd)** | The classic MS-DOS-style shell | Legacy scripts, very simple commands |
| **WSL (Ubuntu, etc.)** | A real Linux running inside Windows | Tools that assume Linux — most of the AI/dev world |

For our work, **PowerShell is the default** and the only one you need to start. We will note when something requires WSL.

## What it is *not*

- Not a code editor (use VS Code for that).
- Not the same as PowerShell (PowerShell is what runs *inside* Terminal).
- Not Windows-only conceptually — every operating system has its own terminal app. macOS has Terminal.app and iTerm2. Linux has GNOME Terminal, Konsole, and others.

## Install link

Get it from the [Microsoft Store: Windows Terminal](https://aka.ms/terminal). On Windows 11 it's already there — just hit the Start key and type "Terminal."
