---
scene: 05
act: 2
title: "TUIs — Apps That Live in the Terminal"
subtitle: "When the command line feels like an app, that's a TUI"
duration_seconds: 90
key_idea: "TUIs prove that 'command line' doesn't mean 'unfriendly.' Many of the best tools on your machine are already TUIs in disguise."
interactive: "tui-gallery"
---

## When the terminal grows a UI

A **TUI** — Text User Interface — is a program that runs inside the terminal but draws itself like a real app. Menus you can arrow through. Panels you can resize. Lists you can search. Mouse clicks that work.

Once you see a few good TUIs, the mystery of "the scary black window" disappears. The terminal is not a single program — it is a **canvas** that any developer can paint an interface onto.

## A few you'll meet

- **lazygit** — A visual interface for Git. See branches, commits, and diffs without memorizing commands. We will use this.
- **htop** — A live view of running processes, like Task Manager but in the terminal.
- **gh dash** — A dashboard of your GitHub pull requests and issues. We will use this too.
- **Copilot CLI** — Yes, Copilot CLI itself is a TUI. When you launch it, it draws a chat panel right inside your terminal window.

## Why this matters for our team

The instinct people have is: "Command line means typing arcane commands from memory." That was true in 1985. Today, the best CLI tools either:

1. **Have great defaults** so you barely type anything (`gh pr create` → it asks you the questions),
2. **Have a TUI mode** that gives you menus and arrow keys, or
3. **Have Copilot** to translate your English into the exact command.

You are not signing up to memorize commands. You are signing up to **collaborate with tools that already know the commands** — and to read what they did so you can sign off on it.
