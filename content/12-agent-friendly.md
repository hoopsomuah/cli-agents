---
scene: 12
act: 4
title: "Agent-Friendly Formats"
subtitle: "Why Markdown, CSV, and JSON beat .docx every time"
duration_seconds: 90
key_idea: "If you want agents to help, you need to store information in formats they read effortlessly. The shortlist is short."
interactive: "format-shootout"
---

## The shortlist

If a file lives in your team's canon, it should be in one of these formats:

| Format | Use it for | Why agents love it |
| --- | --- | --- |
| **Markdown (`.md`)** | Prose, docs, plans, meeting notes | Plain text, structured headings, renders everywhere |
| **CSV (`.csv`)** | Tables, lists, budgets, headcount | Plain text, every tool reads it, diffs cleanly |
| **JSON (`.json`)** | Structured data, configs, schemas | Plain text, parseable by every language and model |
| **YAML (`.yml`)** | Settings, frontmatter, configs | Plain text, more human-readable than JSON |
| **Mermaid / PlantUML** | Diagrams, org charts, flowcharts | Text that renders to images on GitHub |

That's the whole list. Five formats. All plain text. All diff-friendly. All instantly readable by every agent on the market.

## The avoid-list

| Format | The problem |
| --- | --- |
| **.docx** | Zipped binary. Diffs are unreadable. Agents struggle. |
| **.xlsx** | Same problem as .docx, plus formulas drift silently. |
| **.pptx** | Visual-first, structurally opaque. Agents see noise. |
| **PDF** | Output format, not source. Almost impossible to edit or diff. |
| **Proprietary app formats** (Notion blocks, Coda docs, OneNote) | Locked in. No clean export. Agents can't read them without integrations. |

**The rule:** use the avoid-list formats only as the **rendered output** of something else — a presentation generated from Markdown, a PDF generated from a doc, a spreadsheet exported from a CSV. Never as the source of truth.

## Why this is non-negotiable

Every minute your agent spends fighting a format is a minute it isn't helping you. Every time a human has to "export to PDF and send to legal," that's a process that doesn't exist if the file was Markdown and legal had a GitHub account.

Agents are coworkers now. Coworkers need readable files.
