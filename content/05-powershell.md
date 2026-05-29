---
scene: 05
act: 1
title: "Why PowerShell?"
subtitle: "The modern Windows shell, and why it became the default for everything we do here"
duration_seconds: 150
key_idea: "PowerShell is the only mainstream shell that passes *objects* between commands instead of plain text. That sounds like a detail. It is the entire reason it's the right shell for an exec team in 2026."
hero_image: "concept-powershell-desk.png"
hero_image_alt: "Hand-illustrated watercolor close-up of a laptop screen on a warm wooden desk, the PowerShell prompt 'PS C:\\Users\\hoop>' visible, a multi-line Get-Process pipeline running, and a hand resting beside a coffee mug under warm desk-lamp light"
hero_image_caption: "PowerShell as it lives on most laptops: a small window doing a lot of work."
deck_image: "concept-powershell-cinematic.png"
deck_image_alt: "Cinematic full-bleed watercolor of a PowerShell session on a dark navy background, glowing white and amber text showing a multi-stage Get-Process pipeline with streaming output, signature PowerShell blue-and-yellow accents catching the light"
deck_image_caption: "Objects on a pipeline. The Windows shell, taken seriously."
bullets:
  - "Built by Microsoft in 2006; default on Windows since 10; open-source since 2016"
  - "Cross-platform — runs on macOS and Linux too"
  - "Cmdlets follow a Verb-Noun pattern: Get-Process, Stop-Service, Set-ItemProperty"
  - "Pipelines pass full objects, not just lines of text — every property is queryable"
  - "Speaks fluent Azure, Microsoft 365, Active Directory, files, registry, and processes"
---

## A one-screen example

Type this in any open Windows Terminal:

```powershell
Get-Process | Where-Object CPU -gt 50 | Sort-Object CPU -Descending | Select-Object -First 5
```

What just happened, in plain English:

1. `Get-Process` asks the operating system for **every process** currently running and hands them down the pipeline.
2. `Where-Object CPU -gt 50` keeps **only the ones using more than 50 seconds of CPU**.
3. `Sort-Object CPU -Descending` puts the **busiest first**.
4. `Select-Object -First 5` keeps **only the top five**.

The output is a clean table of the five hungriest processes on the machine, with CPU, memory, and the process name — printed nicely. Five seconds of typing. No installers, no apps, no admin rights.

That single line is the elevator pitch for PowerShell.

## Why "objects" matter

The shell on Linux (`bash`) is wonderful, but it passes **text** between commands. Every step has to *re-parse* that text — split it on spaces, count columns, hope the format didn't change. It works, but it's fragile, and it's the reason `bash` scripts are full of `awk`, `sed`, `cut`, and tribal knowledge.

PowerShell passes **whole objects**. `Get-Process` doesn't print a list of lines; it hands you a list of *Process* objects. Each has properties — `.CPU`, `.WorkingSet`, `.Name`, `.StartTime`, `.Threads`. The next command can filter on any of them directly. No parsing. No regex. No fragility.

That difference is small for a one-liner and **huge** for anything you want to run reliably more than once.

## Verb-Noun, learnable in an hour

PowerShell cmdlets follow a strict naming convention: a **verb** from a known list (`Get`, `Set`, `New`, `Remove`, `Start`, `Stop`, `Find`, `Show`, …) followed by a **noun** (`Process`, `Service`, `Item`, `Location`, `Variable`, …).

The pattern is so predictable that you can usually *guess* the right command:

| You want to… | The cmdlet is probably… |
| --- | --- |
| List the files in a folder | `Get-ChildItem` |
| Change directory | `Set-Location` |
| Read a file | `Get-Content` |
| Search file contents | `Select-String` |
| Find a cmdlet you don't know | `Get-Command -Noun Process` |
| Get help on a cmdlet | `Get-Help Get-Process -Examples` |

Tab-completion fills in the rest. Two days in, you stop guessing.

## Where it earns its keep for a team like ours

- **Azure & Microsoft 365** — the official admin surface is PowerShell. Resetting a license, restarting a tenant service, querying who has access to what — all one-liners.
- **GitHub** via the `gh` CLI — pipes naturally into PowerShell objects, so "list every open PR with no reviewer" is a one-liner.
- **Files at scale** — moving, renaming, hashing, comparing thousands of files is trivial.
- **Scheduled runs** — Task Scheduler + PowerShell handles "run this thing every Monday at 9am" without a single line of `.bat`.
- **Reliable scripts** — when the team's "ops runbook" lives in a `.ps1` file in a repo, it stops being a Confluence page that no one trusts.

## What to take from this scene

You don't need to become a PowerShell expert. You need three things:

1. Know that the blue text after `PS ` is **a real, modern programming environment**, not a relic.
2. When an agent or a colleague proposes a PowerShell line, you can read it because **verb-noun** tells you what it does.
3. When you start scripting your own rhythm — weekly report pulls, cleanup jobs, exports — PowerShell is the language that's already on your laptop.

The terminal is the window. PowerShell is the brain inside it. Now we know both.
