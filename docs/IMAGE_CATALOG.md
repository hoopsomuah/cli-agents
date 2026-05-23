# Image Catalog

Per-scene and concept imagery for the reading view (`/`) and the slide deck (`/present/`).

All assets live in `site/assets/images/`. To browse them visually, open [`docs/image-viewer.html`](./image-viewer.html) in a browser.

This catalog tracks the dual brief from [issue #1](https://github.com/hoopsomuah/cli-agents/issues/1). For each scene/concept, the **Reading view** column is the calm, editorial, magazine-figure interpretation; the **Deck** column is the cinematic, stage-lit, audience-facing interpretation. They are intentionally different — the question for each is "what does this medium do best?", not "what is the literal picture?"

Filenames mirror the issue's suggestions. Where the issue suggested `.jpg`, the actual asset is `.png` because every illustration in this batch is hand-illustrated watercolor (not photography) and PNG is the honest format.

---

## Act I — From Teletype to Terminal

| Scene | Reading view | Deck |
| --- | --- | --- |
| 01 — The Return of the Teletype | `01-teletype-asr33-watercolor.png` | cover hero: `00-print-to-pixel-mural.png` |
| 02 — From Paper to Glass | `02-vt100-terminal-still.png` | `02-vt100-cinematic.png` |
| 03 — Inside Windows Terminal | `03-windows-terminal-desk.png` | `03-windows-terminal-fourpane.png` |
| 04 — Install: Your Terminal | `04-install-terminal-trio.png` | `04-install-terminal-pedestal.png` |

## Act II — Files, Repos, and the Living Canon

| Scene | Reading view | Deck |
| --- | --- | --- |
| 05 — The Filesystem as a House | `05-house-cutaway.png` | `05-house-night.png` |
| 06 — The Terminal Walks Faster | `06-mouse-vs-keyboard.png` | `06-terminal-velocity.png` |
| 07 — File Over App | `10-notebook-handwriting-watercolor.png` | — |
| 08 — Obsidian | `11-obsidian-desk-watercolor.png` | `08-obsidian-vault.png` |
| 09 — final_v7_FINAL.docx | `06-stickynotes-chaos-watercolor.png` | — |
| 10 — A Repository Is a Folder with Memory | `07-annotated-book-watercolor.png` | — |
| 11 — Branches | `11-parallel-drafts.png` | `11-forked-road.png` |
| 12 — Pull Requests | `12-manuscript-review.png` | `12-diff-and-paper.png` |
| 13 — Issues | `13-single-issue-card.png` | `13-issue-wall.png` |
| 14 — The Agent-Friendly Living Canon | `14-book-and-markdown.png` | `14-canon-living.png` |
| 15 — Install: Git, Obsidian, First Clone | `15-install-trio.png` | `15-install-plaques.png` |

## Act III — GitHub and the Copilot CLI

| Scene | Reading view | Deck |
| --- | --- | --- |
| 16 — GitHub Is the Cloud Home | `16-repo-house.png` | `16-campus-twilight.png` |
| 17 — Organizations, Teams, Repositories | `17-nested-drawers.png` | `17-org-architecture.png` |
| 18 — GitHub at Work | `18-platform-tools.png` | `18-platform-in-use.png` |
| 19 — The Copilot Family | `19-copilot-table.png` | `19-copilot-constellation.png` |
| 20 — Copilot CLI | `13-hands-keyboard-watercolor.png` | `20-copilot-cli-session.png` |
| 21 — PRs as the Conversation | `21-converging-door.png` | `21-pr-door-dusk.png` |
| 22 — SharePoint vs Repo | `15-cabinet-vs-shelf-watercolor.png` | — |
| 23 — Install: GitHub, gh CLI, Copilot CLI | `23-install-final-trio.png` | `23-install-final-pedestal.png` |

---

## Concepts (no scene yet — pre-built so the next author doesn't have to)

| Concept | Reading view | Deck |
| --- | --- | --- |
| Shells (the family) | `concept-shells-jars.png` | `concept-shells-glass.png` |
| PowerShell ⭐ | `concept-powershell-desk.png` | `concept-powershell-cinematic.png` |
| Pipelines (`\|`) | `concept-pipelines-copper.png` | `concept-pipelines-data.png` |
| SSH / remote sessions | `concept-ssh-here-and-there.png` | `concept-ssh-globe.png` |
| Markdown / plain text | `concept-markdown-source-vs-rendered.png` | `concept-markdown-morph.png` |
| The cloud | `concept-cloud-quiet.png` | `concept-cloud-aerial.png` |
| Open source / community | `concept-open-source-kitchen.png` | `concept-open-source-barn.png` |
| Continuous integration | `concept-ci-bakery.png` | `concept-ci-conveyor.png` |
| The agentic loop | `concept-agent-loop-dominoes.png` | `concept-agent-loop-mobius.png` |
| The repo as a building | `concept-repo-library.png` | `concept-repo-glass.png` |
| GitHub workflow (bonus) | `concept-github-workflow-reading.png` | `concept-github-workflow-deck.png` |

---

## Style notes

**Every hero referenced from frontmatter is now hand-illustrated cartoony watercolor with ink-line work**, anchored on the `00-print-to-pixel-mural.png` reference. Older assets that pre-dated the style lock (e.g. `01-teletype-asr33.jpg`, `13-hands-keyboard.png`, `15-cabinet-vs-shelf.png`) remain in `site/assets/images/` for history but are no longer referenced; the new `*-watercolor.png` files replace them in frontmatter.

- **Reading view variants** lean editorial: muted warm palette (cream, ochre, sienna, soft brown), soft window/lamp light, brick wall environments where natural.
- **Deck variants** lean cinematic: deep teal-purple backdrops, soft cyan-magenta glows, warm amber highlights, dramatic spotlighting, and often small silhouette audience figures — a direct nod to the plaza spectators in the print-to-pixel mural.

The same scene reads as "a quiet still life on my desk" in the reading view and "a moment on a lit stage" in the deck. That tonal split is the point of producing both.

## Why dual variants matter

The reading-view reader is alone with a screen, scrolling. They need the image to be calm enough to sit beside paragraphs of prose without competing. The deck viewer is in a darkened room, looking at a single image filling a wall, while a presenter talks over it. They need an image that earns that wall — that has scale, light, and (where it makes sense) a stand-in audience inside the frame for the audience watching it.

A single asset can technically serve both, but it usually compromises one. Producing them in pairs lets the reading view be quiet and the deck be theatrical without either one feeling watered down.

## Renderer note (optional follow-up)

The renderers today only consume `hero_image` from frontmatter. To wire the deck-specific variants in, we need the small renderer change called out in the issue:

- Add optional `deck_image` (+ alt + caption + orientation) frontmatter fields
- `site/js/render.js` keeps using `hero_image`
- `present/deck.js` prefers `deck_image`, falls back to `hero_image`
- Document in `AGENTS.md`

Until that lands, the frontmatter in this PR sets `hero_image` to the **reading-view** asset (the calm one), and the deck variants sit in `site/assets/images/` ready to be wired in. That keeps both views improved today and avoids stalling on a renderer change.
