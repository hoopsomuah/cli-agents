---
scene: 11
act: 4
title: "Obsidian — Your Markdown Front Door"
subtitle: "The editor that treats your folder of notes like a knowledge graph"
duration_seconds: 150
key_idea: "Obsidian is the friendliest way to edit a folder of Markdown files. It gives you a real app experience while keeping the underlying files plain, portable, and yours."
interactive: "obsidian-demo"
hero_image: "11-obsidian-desk.png"
hero_image_alt: "A laptop on a wooden desk displaying a markdown editor, with an open notebook and a steaming ceramic mug beside it"
hero_image_caption: "Obsidian is a calm front door to a folder of plain-text files."
---

## What it is

[Obsidian](https://obsidian.md) is a free desktop app that opens a folder of Markdown files and gives you a polished, app-like experience for reading, editing, and connecting them. Search, tags, backlinks, graph view, plugins, themes — all the comforts of a modern note tool, sitting on top of plain `.md` files in a regular folder.

The folder is called a **vault**. A vault is just a folder. You can open it in Explorer, in VS Code, in Notepad — Obsidian doesn't lock anything down. The files are yours.

## Why we recommend it

The other tools in this space — Notion, Roam, Coda, Capacities — all store your notes in their own databases. If the company shuts down, the notes are hard to get out. If you want to write a script to process them, you need their API. If you want an AI agent to read them, you need to expose them somehow.

Obsidian's notes are just files. The agent can read them. A script can read them. You can read them. Twenty years from now, you can still read them.

## Why we recommend it *together with* Git

Obsidian gives you the editing experience. Git gives you the version control and team collaboration. Together they are a complete system:

- **You edit** in Obsidian — clean UI, search, backlinks, the works.
- **You commit** in the terminal (or with the Obsidian Git plugin) — every meaningful change becomes a saved version.
- **You push** to GitHub — your teammates see your changes.
- **You PR** when something needs review — the EA proposes a change to the operating rhythm doc, the principal reviews, merges, done.

The vault folder *is* the Git repo. There is no import/export. There is no sync layer to fail. The same files Obsidian opens are the same files Git tracks are the same files GitHub hosts are the same files Copilot can read.

## The aha moment

The first time you watch an EA edit the team's operating rhythm doc in Obsidian, hit `Ctrl+S`, run `git commit -m "Added Friday status update slot"`, run `git push`, and immediately see the change live on GitHub — the entire workflow clicks. There is no Save As, no upload, no "let me email this to you." There is just *the file, edited, committed, pushed, visible*.

That is the rhythm of business we are building toward.

## Install

Get Obsidian from [obsidian.md](https://obsidian.md). It is free for personal and most commercial use. Install it, open the folder where your team's repo lives, and you have a working vault.
