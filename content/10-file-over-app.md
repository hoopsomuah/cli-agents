---
scene: 10
act: 4
title: "File Over App"
subtitle: "Steph Ango's three-word manifesto, and why it matters now"
duration_seconds: 180
key_idea: "Apps are ephemeral. Files have a chance to last. In a world of agents, this isn't just nostalgia — it's strategy."
interactive: "file-over-app-quotes"
---

## The thesis

In 2023, [Steph Ango](https://stephango.com/file-over-app) — one of the makers of the Obsidian note-taking app — wrote a 300-word essay called *File over app*. The thesis is this:

> *"If you want to create digital artifacts that last, they must be files you can control, in formats that are easy to retrieve and read."*

> *"In the fullness of time, the files you create are more important than the tools you use to create them. Apps are ephemeral, but your files have a chance to last."*

> *"The ideas hieroglyphs convey are more important than the type of chisel that was used to carve them."*

It is a quietly radical statement. It says: the tool you're using right now will eventually shut down, get bought, change its format, raise its prices, lose your data. The **file** is the thing that survives.

## Why this matters for an exec team in 2026

Three reasons.

### 1. Tool churn is constant

SharePoint, OneDrive, Notion, Confluence, Coda, Airtable, Asana, ClickUp, Loop. In the last decade, your team has probably used three or four of these. Each one promised to be the home for your docs. Each one made it hard to leave. Each migration cost weeks of work and lost context.

A Markdown file in a Git repo does not have this problem. The file is plain text. Every text editor on Earth can open it. GitHub could disappear tomorrow and your `mission.md` would still be readable on a thumb drive in a desk drawer.

### 2. AI agents read files brilliantly

Every modern AI agent — Copilot, Claude, GPT, Gemini — is *fluent* in Markdown, JSON, YAML, and plain text. Hand an agent a folder of Markdown files and it can read, summarize, search, and reason across all of them in seconds.

Hand the same agent a SharePoint site, a Confluence page, or a OneNote notebook, and the agent struggles. It needs API keys, special permissions, format converters. The friction is real.

**The team that stores its canon as plain files gives every agent it works with a clean, fast on-ramp.** The team that stores its canon in a proprietary app builds a moat — against itself.

### 3. The file is the contract

When the mission lives in `mission.md` in a Git repo, the rules are: anyone can read it, anyone can propose a change via PR, every change is reviewed, the URL never changes. That is a *contract* — a simple, durable, enforceable contract.

When the mission lives in "the SharePoint site, somewhere, maybe in the Q2 Planning folder, I think Sarah moved it" — there is no contract. There is only tribal knowledge.

## What this looks like in practice

- Mission, plan of record, org chart, decisions, glossary → **Markdown files in a repo.**
- Templates, agendas, status reports → **Markdown files in a repo.**
- Tabular data (budgets, headcount, KPIs) → **CSV files in a repo.**
- Diagrams → **Mermaid or PlantUML** (text-based, render automatically on GitHub).
- Long-form prose → **Markdown files in a repo.**

Anything that is *the canonical version of a piece of information* should be a file. The app you use to **edit** that file — Obsidian, VS Code, Cursor, even Notepad — is your choice. The file is the canon.
