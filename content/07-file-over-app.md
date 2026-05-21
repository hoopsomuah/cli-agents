---
scene: 07
act: 2
title: "File Over App"
subtitle: "Steph Ango's three-word manifesto for durable knowledge"
duration_seconds: 120
key_idea: "Apps are ephemeral. Files have a chance to last. In a world of agents, that's not nostalgia — it's strategy."
hero_image: "10-notebook-handwriting.png"
hero_image_alt: "Open notebook with handwritten cursive on the left page and a small ink sketch of a tree on the right"
hero_image_caption: "Pages outlive notebooks. Files outlive apps."
hero_image_orientation: "portrait"
bullets:
  - "The tools you rely on today will eventually shut down, get bought, or change format"
  - "The file in a plain format is the thing that survives"
  - "Plain text — Markdown, CSV, JSON — opens in every editor that will ever exist"
  - "Agents read plain files fluently; proprietary apps make them work harder"
  - "Treat files as canon; treat apps as interchangeable lenses on the canon"
---

## The thesis

In 2023, [Steph Ango](https://stephango.com/file-over-app) — one of the makers of Obsidian — wrote a 300-word essay called *File over app*. The thesis:

> *"If you want to create digital artifacts that last, they must be files you can control, in formats that are easy to retrieve and read."*

> *"In the fullness of time, the files you create are more important than the tools you use to create them. Apps are ephemeral, but your files have a chance to last."*

It is a quietly radical statement. It says: the tool you're using right now will eventually shut down, get bought, change its format, raise its prices, lose your data. The **file** is the thing that survives.

## Why this matters for an exec team in 2026

Three reasons:

1. **Tool churn is constant.** SharePoint, Notion, Confluence, Coda, Airtable, Loop — your team has rotated through several of these in the last decade. Every migration costs weeks. A Markdown file in a Git repo does not have this problem: every text editor on Earth can open it.
2. **AI agents read files brilliantly.** Hand an agent a folder of `.md` and it reads, summarizes, and reasons across the whole thing in seconds. Hand the same agent a SharePoint site and it needs keys, permissions, format converters.
3. **The file is the contract.** When the mission lives in `mission.md` in a repo, the rules are simple: anyone can read it, anyone can propose a change via PR, every change is reviewed, the URL never changes. That is a real, durable, enforceable contract.

## What this looks like in practice

| Information | Lives as |
| --- | --- |
| Mission, plan of record, org chart | Markdown files in a repo |
| Tabular data — budgets, headcount | CSV files in a repo |
| Diagrams | Mermaid or PlantUML (text-based) |
| Settings, structured config | YAML or JSON in a repo |

The app you **edit** with — Obsidian, VS Code, Cursor, even Notepad — is your choice. The **file** is the canon.
