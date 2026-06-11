---
scene: 05
act: 1
title: "pwsh"
subtitle: "Why PowerShell is our default — and which PowerShell you are actually running"
duration_seconds: 150
key_idea: "PowerShell is the only mainstream shell that passes *objects* between commands instead of plain text. That sounds like a detail. It is the entire reason it's the right shell for an exec team in 2026."
warning: "Two different things share the name. Windows PowerShell 5.1 ships in the box and is frozen — no new features. PowerShell 7+, run with the pwsh command (it used to be called PowerShell Core), is the modern, cross-platform one we actually use. If your prompt reads 'Windows PowerShell', install pwsh and switch to it."
hero_image: "concept-powershell-desk.png"
hero_image_alt: "Hand-illustrated watercolor close-up of a laptop screen on a warm wooden desk, the PowerShell prompt 'PS C:\\Users\\hoop>' visible, a multi-line Get-Process pipeline running, and a hand resting beside a coffee mug under warm desk-lamp light"
hero_image_caption: "PowerShell as it lives on most laptops: a small window doing a lot of work."
deck_image: "concept-powershell-cinematic.png"
deck_image_alt: "Cinematic full-bleed watercolor of a PowerShell session on a dark navy background, glowing white and amber text showing a multi-stage Get-Process pipeline with streaming output, signature PowerShell blue-and-yellow accents catching the light"
deck_image_caption: "Objects on a pipeline. The Windows shell, taken seriously."
bullets:
  - "pwsh is PowerShell 7+ — modern, open-source, and cross-platform (Windows, macOS, Linux)"
  - "Cmdlets follow a readable Verb-Noun pattern: Get-Process, Stop-Service, Set-ItemProperty"
  - "Pipelines pass full objects, not just lines of text — every property is queryable"
  - "Speaks fluent Azure, Microsoft 365, files, and processes — the admin surface for our world"
  - "Watch out: 'Windows PowerShell' 5.1 is the old, frozen one — install pwsh for the modern shell"
---

## Two PowerShells, one name

Before anything else, clear up the single most confusing thing about PowerShell: there are **two** of them.

- **Windows PowerShell 5.1** — the one that has shipped inside Windows for years. It still works, but it is frozen: no new features, Windows-only, built on the old .NET Framework.
- **PowerShell 7+** — the modern, open-source, cross-platform rewrite. You launch it with the command **`pwsh`**. It used to be branded "PowerShell Core." This is the one we mean whenever we say "PowerShell."

How to tell which you are in: look at the window title and the first prompt. If it says *Windows PowerShell* in light blue, you are in the old one. If you typed `pwsh` (or opened a "PowerShell 7" tab in Windows Terminal), you are in the modern one. When in doubt, type `$PSVersionTable` and read the `PSVersion` line — `5.1` is old, `7.x` is what you want.

## A one-screen example

Type this in any open `pwsh` prompt:

```powershell
Get-Process | Where-Object CPU -gt 50 | Sort-Object CPU -Descending | Select-Object -First 5
```

What just happened, in plain English:

1. `Get-Process` asks the operating system for **every process** currently running and hands them down the pipeline.
2. `Where-Object CPU -gt 50` keeps **only the ones using more than 50 seconds of CPU**.
3. `Sort-Object CPU -Descending` puts the **busiest first**.
4. `Select-Object -First 5` keeps **only the top five**.

The output is a clean table of the five hungriest processes on the machine. Five seconds of typing. No installers, no apps, no admin rights.

## Why "objects" matter

The shell on Linux (`bash`) is wonderful, but it passes **text** between commands. Every step has to *re-parse* that text — split it on spaces, count columns, hope the format didn't change. It works, but it's fragile.

PowerShell passes **whole objects**. `Get-Process` doesn't print a list of lines; it hands you a list of *Process* objects. Each has properties — `.CPU`, `.WorkingSet`, `.Name`, `.StartTime`. The next command can filter on any of them directly. No parsing. No regex. No fragility.

## Verb-Noun, learnable in an hour

PowerShell cmdlets follow a strict naming convention: a **verb** from a known list (`Get`, `Set`, `New`, `Remove`, `Start`, `Stop`, …) followed by a **noun** (`Process`, `Service`, `Item`, `Location`, …).

| You want to… | The cmdlet is probably… |
| --- | --- |
| List the files in a folder | `Get-ChildItem` |
| Change directory | `Set-Location` |
| Read a file | `Get-Content` |
| Search file contents | `Select-String` |
| Get help on a cmdlet | `Get-Help Get-Process -Examples` |

Tab-completion fills in the rest. Two days in, you stop guessing.

## What to take from this scene

You don't need to become a PowerShell expert. You need three things:

1. Know that the text after `PS ` is **a real, modern programming environment**, not a relic.
2. When an agent or a colleague proposes a PowerShell line, you can read it because **verb-noun** tells you what it does.
3. Run **`pwsh`** (PowerShell 7+), not the frozen Windows PowerShell 5.1 — same prompt, far more capable underneath.
