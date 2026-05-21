---
scene: 22
act: 3
title: "Does SharePoint Still Earn Its Keep?"
subtitle: "An honest comparison — not a hot take"
duration_seconds: 150
key_idea: "SharePoint solves problems that mattered in 2007. A repo plus a generated site solves the same problems and several new ones — in 2026."
hero_image: "15-cabinet-vs-shelf.png"
hero_image_alt: "A split composition: on the left, a closed beige metal filing cabinet with a single sticky note; on the right, a wooden shelf with bound notebooks"
hero_image_caption: "Both store information. Only one tells you who changed what, and when."
bullets:
  - "SharePoint is still good at: large binaries, Office-native edits, Power Automate flows"
  - "Repos are better at: PR-style sign-off, complete history, agent-readable formats"
  - "The hard question isn't 'is SharePoint bad?' — it's 'is it earning its place for this content?'"
  - "Most 'canonical' SharePoint docs should move to a repo"
  - "Most large binary files should stay in SharePoint"
---

## What SharePoint actually does well

Let's be fair to SharePoint. It does several things genuinely well:

- **File storage.** Centralized, backed up, accessible from anywhere.
- **Permissions.** Granular control over who sees what.
- **Office integration.** Word, Excel, PowerPoint open and save natively.
- **Search.** Find a doc by content, not just filename.
- **Familiar.** Everyone has used it; IT supports it.

These are real strengths. We're not dismissing them.

## What a repo + generated site does *better*

| Need | SharePoint | Repo + generated site |
| --- | --- | --- |
| **Centralized file storage** | ✓ | ✓ (GitHub) |
| **Permissions** | ✓ Granular | ✓ Per-repo, per-branch |
| **Full change history** | Partial (per-file, hard to diff) | ✓ Complete, instant diff, forever |
| **Sign-off / approval workflow** | Bolted on, separate from the file | Built in (PRs), inseparable from the file |
| **Search across all files** | ✓ | ✓ |
| **Edit with any tool** | Office mostly | Obsidian, VS Code, Notepad — any editor |
| **Read by AI agents** | Friction (APIs, permissions, converters) | Native — Markdown is the agent's first language |
| **Edit by talking to an agent** | Not really | Yes (Copilot CLI) |
| **Stable URL for the canon** | URL changes if file moves | Permanent |
| **Survive a vendor change** | Files in a proprietary format and CMS | Plain files; export = `git clone` |
| **Generate a public website** | Possible but expensive | Free (GitHub Pages) |
| **Cost** | Per-seat, ongoing | Free for public; low for private |

## The 2026 question

In 2007, when SharePoint won the enterprise, the alternatives were a network drive and email. SharePoint was a massive upgrade. In 2026, the alternatives include a free Git host, a free static site generator, a free Markdown editor, and an AI agent that edits files for you.

The honest question isn't *"is SharePoint bad?"* — it's *"does SharePoint still earn its place, or is it taxing the team's velocity for benefits we could get more cheaply elsewhere?"*

## A clean division of labor

| Belongs in a repo | Belongs in SharePoint |
| --- | --- |
| Team mission, plan of record, operating rhythm | Large binary files (videos, design files, scanned PDFs) |
| Decisions, meeting notes, status updates | Forms that need to plug into Power Automate |
| Anything we want agents to read | Documents owned by groups outside our team's workflow |
| Anything we want signed off via PR | Anything where the audience genuinely lives in Office |
| Anything we want at a permanent URL | |

The future isn't "no SharePoint." The future is: **canonical knowledge lives in a repo, and SharePoint becomes the file cabinet for the things that genuinely belong in a file cabinet.** Most of what teams put in SharePoint today is canonical knowledge in disguise. That part should move.
