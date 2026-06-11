---
scene: 16
act: 3
title: "The Agent-Friendly Living Canon"
subtitle: "Mission, plan-of-record, and org chart as live URLs — not attachments"
duration_seconds: 150
key_idea: "When the canon lives in a repo, humans and agents read the same files. There is no 'agent version' and 'human version' — there is just the canon."
hero_image: "14-book-and-markdown.png"
hero_image_alt: "Editorial still life: a bound leather book open on a desk beside a laptop showing the same content as plain Markdown source, with a fountain pen resting across both"
hero_image_caption: "The canon and its source are the same words, written once."
deck_image: "14-canon-living.png"
deck_image_alt: "Cinematic watercolor of a leather book open on a desk beside a laptop showing the same content as Markdown, with golden afternoon light raking across the desk and the page mid-annotation, ink still wet"
deck_image_caption: "Same content, two formats — the canon is alive."
bullets:
  - "Canonical docs live at stable URLs (e.g. canon/mission.md)"
  - "Every change is a PR — reviewed, archived, attributed"
  - "Markdown, CSV, JSON, YAML — formats every agent reads natively"
  - "The agent reads the same file the humans read. No export, no API."
  - "Old proprietary formats (.docx, .pptx, Notion) become friction, not foundation"
---

## The problem with the quarterly deck

Most teams capture their "plan of record" as a slide deck or a Word doc, emailed around quarterly. Within a week, three different versions exist on five laptops. Within a month, the deck is out of date because *which copy do you update?* The mission statement on the company wiki was last edited eighteen months ago. The Q2 priorities live in someone's OneNote. There is no **canon** — no single, stable, current source of truth.

## What a living canon looks like

In a repo-driven team, every canonical document has:

1. **A stable URL.** `github.com/our-team/canon/mission.md` always points to the current mission.
2. **A complete history.** Click "history" and see every change ever made, with who and why.
3. **A PR for every change.** No edit happens without a proposal and a review.
4. **An obvious "propose a change" button** — built into GitHub.

Anyone can read it. Anyone can propose a change. Nobody can change it without a review. And the URL never breaks, never drifts, never gets out of sync.

## What goes in the canon

| Document | Lives at | Updated via |
| --- | --- | --- |
| **Team mission** | `canon/mission.md` | PR, reviewed by the principal |
| **Plan of record** | `canon/plan-of-record.md` | PR, reviewed by EA + BM + principal |
| **Org chart** | `canon/org-chart.md` | PR, reviewed by EA |
| **Operating rhythm** | `canon/rhythm.md` | PR, reviewed by BM |
| **Glossary / acronyms** | `canon/glossary.md` | PR, anyone can propose |
| **Decisions log** | `canon/decisions/` | PR per decision |

All Markdown. All diff-able. All searchable. All permanently history-tracked.

## Why "agent-friendly" follows automatically

| Format | What agents do with it | Use for |
| --- | --- | --- |
| **Markdown (.md)** | Read effortlessly, summarize, edit | Prose, docs, plans |
| **CSV** | Parse, slice, render to tables | Budgets, headcount, KPIs |
| **JSON / YAML** | Native parsing, schema-aware | Configs, structured data |
| **Mermaid / PlantUML** | Render diagrams from text | Org charts, flowcharts |

When the canon is in these formats, every modern AI agent — Copilot, Claude, GPT, Gemini — reads it as fluently as a teammate. Pointing Copilot at `canon/plan-of-record.md` and asking *"what's our Q2 commit?"* requires zero integration: it just reads the file.

Contrast with `.docx`, `.pptx`, Notion blocks, OneNote: the agent needs APIs, permissions, format converters. The friction is real, and it compounds across every workflow.

## The rule

> The thing that survives is the file.
> The thing that proves who changed it is the PR.
> The thing that lets the agent help is the format.

When all three are true, the canon is alive.
