---
scene: 03
act: 1
title: "Inside Windows Terminal"
subtitle: "What you actually see when you open the modern terminal app"
duration_seconds: 120
key_idea: "Windows Terminal is a tabbed browser for command-line sessions. Install it once, configure it once, never think about it again."
hero_image: "03-windows-terminal-desk.png"
hero_image_alt: "Hand-illustrated watercolor of a modern laptop on a wooden desk, Windows Terminal open on screen with a tabbed PowerShell session, brick wall behind, warm desk lamp light"
hero_image_caption: "The same terminal, four decades later — on the desk of someone shipping software."
deck_image: "03-windows-terminal-fourpane.png"
deck_image_alt: "Cinematic illustration of a tall four-pane Windows Terminal session filling the frame: PowerShell, WSL Ubuntu, cmd, and Azure Cloud Shell each in its own pane against a deep navy backdrop, with soft cyan and amber stage glows"
deck_image_caption: "One window, four shells — projected for a room."
bullets:
  - "A free Microsoft app — preinstalled on Windows 11"
  - "Tabs and panes — multiple shells side by side, like browser tabs"
  - "Hosts PowerShell, Command Prompt, WSL Linux, Azure Cloud Shell"
  - "Real fonts, real Unicode, real emoji — built this decade"
  - "Configurable in a Settings UI; open source on GitHub"
---

## What it is

**Windows Terminal** is the modern container that holds your command-line sessions. It is a free Microsoft app, shipped pre-installed on Windows 11 and one click away on the Microsoft Store for Windows 10.

It is not itself a "shell" — it does not run your commands. It is the **window** that hosts the shell, the same way Chrome is the window that hosts a webpage. The shell (PowerShell, for our purposes) is the program that does the work.

## The prompt, explained

When you open it, you see something like this:

```
PS C:\Users\hoop>
```

Read that left to right:

- **`PS`** — you are talking to **PowerShell**.
- **`C:\Users\hoop`** — you are currently inside the folder `C:\Users\hoop`. This is your "home" folder, where the prompt drops you by default.
- **`>`** — the prompt is waiting for you to type a command.

That single line tells you what shell you're using and where you are in the filesystem. Once you can read it, the terminal is no longer mysterious.

## The three shells

| Shell | What it's for | When you'll use it |
| --- | --- | --- |
| **PowerShell** | Modern Windows shell, object-aware | Day-to-day, almost always |
| **Command Prompt (cmd)** | Classic MS-DOS-style shell | Legacy scripts only |
| **WSL (Ubuntu)** | Real Linux running inside Windows | Tools that assume Linux |

For our work, **PowerShell is the default**. You will not need anything else to start.

## What it is *not*

- Not a code editor — use VS Code or Obsidian.
- Not the same thing as PowerShell — PowerShell runs *inside* Terminal.
- Not Windows-only conceptually — macOS has Terminal.app and iTerm2; Linux has GNOME Terminal and Konsole.
