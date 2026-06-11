---
scene: 04
act: 1
title: "What Is a Shell?"
subtitle: "The terminal is the window. The shell is the program reading what you type."
duration_seconds: 120
key_idea: "The terminal is just a piece of furniture. The real thing — the program that reads your words and answers — is the shell. Every operating system ships at least one; most ship several."
hero_image: "concept-shells-jars.png"
hero_image_alt: "Hand-illustrated watercolor of five glass kitchen jars in a row on a wooden counter, each labeled bash, zsh, fish, cmd, and PowerShell, every jar holding the same little pile of pasta letters spelling a command"
hero_image_caption: "Different containers. Same letters going in. Same letters coming back."
deck_image: "concept-shells-glass.png"
deck_image_alt: "Cinematic watercolor of five translucent glass seashells arranged in a row on a dark surface, each shell containing a tiny glowing terminal cursor at its centre, with soft cyan and amber stage light catching the spirals"
deck_image_caption: "Many shells. One conversation."
bullets:
  - "The terminal is the window on screen; the shell is the program inside it that reads your commands and answers."
  - "It is a real back-and-forth: you type a line, the shell does the work, then prints a line back — the same contract as the 1960s teletype."
  - "Linux and macOS ship bash and zsh; Windows ships cmd (legacy) and PowerShell (the modern default)."
  - "You can swap the shell without changing the terminal — same window, a different brain inside."
---

## The two-piece confusion

The single most common mix-up newcomers make is treating "terminal" and "shell" as synonyms. They are not. They are two pieces of furniture that always show up together.

- **The terminal** is the *window*. It draws characters on the screen, captures your keystrokes, scrolls when you fill it up, and copies and pastes. Windows Terminal, macOS Terminal, iTerm, Alacritty — all terminals. They have no opinion about your commands. They are just the glass case.
- **The shell** is the *program inside the window* that actually reads what you type and decides what to do. `bash` is a shell. `zsh` is a shell. `PowerShell` is a shell. They speak slightly different dialects, but they all do the same job: read a line, run a thing, print a line.

Open Windows Terminal and you'll see a prompt like this:

```
PS C:\Users\hoop>
```

The window around the text is **Windows Terminal**. The `PS` prefix and the blinking cursor below it are **PowerShell**. Two separate things, displayed together. You can close the PowerShell tab and open a `bash` tab in the same Terminal window — same case, different brain inside.

## The shells you'll meet

| Shell | Where it lives | What it's good at |
| --- | --- | --- |
| **PowerShell** | Windows (default) · macOS · Linux | Objects, automation, Microsoft & cloud tooling |
| **bash** | Linux (default decades) · macOS (until 2019) · WSL | The universal lingua franca of servers and scripts |
| **zsh** | macOS (default since 2019) · Linux | A friendlier `bash` with auto-complete and themes |
| **cmd** | Windows (since 1987) | Tiny scripts and legacy `.bat` files. Mostly historical. |
| **fish** | Linux · macOS · Windows (via WSL) | Beginner-friendly autosuggestions and syntax colour |

You don't have to know all of these. You will mostly use **PowerShell** on Windows, and you'll see **bash** any time you ssh into a Linux server. That's the 95% case.

## Why this matters for the rest of the talk

Two reasons. First, every example we'll show from here on assumes you have a shell open and a prompt waiting. We're going to show **PowerShell** prompts because that's what Windows Terminal hands you by default — but the same commands work in `bash` with tiny syntax differences.

Second, when the AI agent in your terminal (Copilot CLI, Act III) proposes a command, it's proposing something for *the shell*, not the terminal. Knowing the difference makes the agent's behaviour readable: it's a colleague typing at the same prompt you're already at.
