---
scene: 15
act: 5
title: "Does SharePoint Still Earn Its Keep?"
subtitle: "An honest comparison, not a hot take"
duration_seconds: 180
key_idea: "SharePoint solves problems that mattered in 2007. A repo + a generated website solves the same problems and several new ones — in 2026."
interactive: "sharepoint-vs-repo"
---

## What SharePoint actually does well

Let's be fair to SharePoint. It does several things genuinely well:

- **File storage.** Centralized, backed up, accessible from anywhere.
- **Permissions.** Granular control over who sees what.
- **Office integration.** Word, Excel, PowerPoint open and save natively.
- **Search.** Find a doc by content, not just by filename.
- **Familiar.** Everyone has used it. The IT team supports it.

Those are real strengths. We are not dismissing them.

## What a repo + generated site does *better*

Now the comparison, honestly:

| Need | SharePoint | Repo + generated site |
| --- | --- | --- |
| **Centralized file storage** | ✓ | ✓ (GitHub) |
| **Permissions** | ✓ Granular | ✓ Per-repo, per-branch |
| **Full history of every change** | Partial (version history per file, hard to diff) | ✓ Complete, instant diff, forever |
| **Sign-off / approval workflow** | Bolted on, separate from the file | Built in (PRs), inseparable from the file |
| **Search across all files** | ✓ | ✓ |
| **Edit with your favorite tool** | Office only (mostly) | Any editor — Obsidian, VS Code, Notepad |
| **Read by AI agents** | Friction. APIs, permissions, format converters. | Native. Markdown is the agent's first language. |
| **Edit by talking to an agent** | Not really possible | Yes (Copilot CLI) |
| **A stable URL for the canon** | URL changes if file moves | URLs are permanent |
| **Survive vendor change** | All your files are in a proprietary format and CMS | Plain files; export is a `git clone` |
| **Generate a public website** | Possible but expensive (SharePoint Online) | Free (GitHub Pages) |
| **Cost** | Per-seat, ongoing | Free for public repos, low for private |

## The 2026 question

In 2007, when SharePoint won the enterprise, the alternatives were a shared network drive and email. SharePoint was a massive upgrade. In 2026, the alternatives include a free Git host, a free static site generator, a free Markdown editor, and an AI agent that will edit files for you.

The honest question isn't *"is SharePoint bad?"* — it's *"does SharePoint still earn its place, or is it taxing the team's velocity for benefits we could get more cheaply elsewhere?"*

## When SharePoint still makes sense

We are not saying delete SharePoint. We are saying: be intentional.

**SharePoint is still the right home for:**
- Large binary files (videos, design files, scanned PDFs).
- Forms that need to plug into Power Automate.
- Documents owned by groups outside our team's direct workflow.
- Anything where the audience genuinely lives in Office.

**A repo is the right home for:**
- The team's mission, plan of record, operating rhythm.
- Decisions, meeting notes, status updates.
- Anything we want agents to read.
- Anything we want signed off via PR.
- Anything we want to live at a permanent URL.

## The end state

The future isn't "no SharePoint." The future is **canonical knowledge lives in a repo, and SharePoint becomes the file cabinet for the things that genuinely belong in a file cabinet.** Most of what teams put in SharePoint today is canonical knowledge in disguise. That part should move.
