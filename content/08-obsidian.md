---
scene: 08
act: 2
title: "Obsidian — A Friendly Editor on Top of Plain Files"
subtitle: "A polished app experience that doesn't lock your notes inside it"
duration_seconds: 120
key_idea: "Obsidian gives you the comfort of a modern note app while keeping the underlying files plain, portable, and yours."
hero_image: "11-obsidian-desk-watercolor.png"
hero_image_alt: "Hand-illustrated watercolor of a writers desk with a laptop showing Obsidian's graph and editor panes, an open handwritten notebook beside it mirroring the on-screen graph, brick wall behind"
hero_image_caption: "Obsidian as a digital extension of a handwritten thinking practice."
deck_image: "08-obsidian-vault.png"
deck_image_alt: "Cinematic watercolor of an Obsidian vault: file tree on the left, a Markdown note in the middle showing a mission statement, and the graph view on the right, all rendered in a calm dark theme"
deck_image_caption: "A friendly editor sitting on top of plain text."
bullets:
  - "A free desktop app that opens a folder of Markdown files (a 'vault')"
  - "Gives you search, tags, backlinks, graph view, themes, plugins"
  - "The files stay plain .md — open them in Notepad too if you want"
  - "Pairs perfectly with Git: vault folder = repo folder"
  - "Twenty years from now your notes will still be readable"
---

## What it is

[Obsidian](https://obsidian.md) is a free desktop app that opens a folder of Markdown files and gives you a polished, app-like experience for reading, editing, and connecting them. The folder is called a **vault**. A vault is just a folder. You can open the same files in Notepad, in VS Code, in Explorer — Obsidian does not lock anything down.

## Why we recommend it

Most of the popular alternatives — Notion, Roam, Coda, Capacities — store your notes in their own databases. If the company shuts down, the notes are hard to get out. If you want an AI agent to read them, you need to expose them via an API.

Obsidian's notes are **just files**. The agent reads them. A script reads them. You read them. Twenty years from now you can still read them.

## Obsidian + Git = a complete system

Obsidian gives you the editing experience. Git gives you the version control and team collaboration. Together they are a complete system:

- **Edit** in Obsidian — clean UI, search, backlinks, the works.
- **Commit** in the terminal (or with the Obsidian Git plugin) — every meaningful change becomes a saved version.
- **Push** to GitHub — your teammates see your changes.
- **PR** when something needs review — the EA proposes a change to the operating rhythm, the principal reviews, merges, done.

The vault folder *is* the Git repo. There is no import. There is no export. There is no sync layer to fail. The same files Obsidian opens are the same files Git tracks are the same files GitHub hosts are the same files Copilot can read.

## The aha moment

The first time you watch someone edit the team's rhythm doc in Obsidian, hit `Ctrl+S`, run `git commit -m "Added Friday status slot"`, run `git push`, and immediately see the change live on GitHub — the whole workflow clicks. There is no Save As, no upload, no "let me email this to you." There is just *the file, edited, committed, pushed, visible*.
