---
scene: 09
act: 3
title: "The Living Canon"
subtitle: "Mission and plan-of-record as live URIs, not attachments"
duration_seconds: 120
key_idea: "Every team has a mission, an org chart, a plan of record. These should live at a stable URL, edited via PRs, with the entire history visible. Not as a PDF emailed quarterly."
interactive: "canon-comparison"
---

## The problem with the quarterly deck

Most teams capture their "plan of record" as a slide deck or a Word doc, emailed around quarterly. Within a week, three different versions exist on five laptops. Within a month, the deck is out of date and nobody updates it because *which copy do you even update?*

The mission statement on the company wiki was last edited eighteen months ago. The org chart in the welcome packet is one re-org out of date. The Q2 priorities live in someone's OneNote.

There is no **canon**. There is no single, stable, current source of truth.

## What a living canon looks like

In a repo-driven team, every canonical document has:

1. **A stable URL.** `github.com/our-team/canon/mission.md` always points to the current mission.
2. **A complete history.** Click "history" and see every change ever made, with who and why.
3. **A PR for every change.** No edit happens without a proposal and a review.
4. **An obvious "open a PR to propose a change" button** — built into GitHub.

Anyone can read it. Anyone can propose a change. Nobody can change it without a review. And the URL never breaks, never drifts, never gets out of sync.

## What goes in the canon

For an exec team's rhythm of business:

| Document | Lives at | Updated via |
| --- | --- | --- |
| **Team mission** | `canon/mission.md` | PR, reviewed by the principal |
| **Plan of record** | `canon/plan-of-record.md` | PR, reviewed by EA + BM + principal |
| **Org chart** | `canon/org-chart.md` | PR, reviewed by EA |
| **Operating rhythm** | `canon/rhythm.md` | PR, reviewed by BM |
| **Glossary / acronyms** | `canon/glossary.md` | PR, anyone can propose |
| **Decisions log** | `canon/decisions/` | PR per decision |

All of these are Markdown files. All of them render beautifully on GitHub. All of them are diff-able, searchable, and permanently history-tracked.

And — this is the magic — **all of them can be read by an agent**. When Copilot is summarizing your team's status, you can point it at `canon/plan-of-record.md` and it reads the same canonical document the humans read. There is no "agent version" and "human version." There is just *the canon*.
