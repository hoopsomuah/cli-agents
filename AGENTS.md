# AGENTS.md

Instructions for coding agents (Copilot, Claude Code, Codex, Cursor, etc.) and humans working in this repo.

If you are a person reading this, treat it as a one-page operating manual. If you are an agent, treat it as binding.

---

## TL;DR

- **Content lives in `content/`. Layout lives in `site/`. The slide deck lives in `present/`. Never mix them.**
- **Markdown is the canon.** No HTML or CSS in `content/`.
- **Both the reading view and the slide deck read from the same `content/` files.** A scene edit updates both views.
- **Plain static site.** HTML + CSS + ES modules, no build step, no framework, no package manager. Don't introduce one.
- **Deploy is `git push origin main`.** GitHub Pages serves the repo root.

---

## What this repo is

A 30-minute presentation explaining the terminal, version control, and agentic operations to a non-technical executive team. Two views of the same content:

- **Reading view** at `/` — long-form editorial site, scroll to read.
- **Presentation view** at `/present/` — full-screen cinematic slide deck for live delivery.

Live: <https://hoopsomuah.github.io/cli-agents/>

---

## Repository layout

```
.
├── content/              # SOURCE OF TRUTH — one Markdown file per scene
│   ├── manifest.json     # Act/scene structure (acts, scene order)
│   └── NN-name.md        # 17 scenes, with YAML-ish frontmatter
├── site/                 # Reading view — layout and styling
│   ├── css/              # tokens, base, layout, components, interactive
│   ├── js/               # main, render, header, toc, interactive/*
│   └── assets/
│       ├── images/       # Photographs (PNG)
│       └── diagrams/     # Hand-built SVGs
├── present/              # Presentation view — cinematic slide deck
│   ├── index.html
│   ├── deck.css
│   └── deck.js
├── docs/
│   └── SEEDED_ISSUES.md  # Starter issues for the post-meeting homework
├── index.html            # Reading view entry point
├── README.md             # Human-facing project description
├── TEAM.md
└── AGENTS.md             # You are here
```

---

## The cardinal rule: content vs layout isolation

This separation is **the thesis of the presentation itself**. Do not violate it.

| Goal | Edit |
| --- | --- |
| Change what the site says | `content/*.md` |
| Change how the site looks | `site/css/*` |
| Change how the site is rendered | `site/js/render.js` |
| Change a slide layout | `present/deck.css` or `present/deck.js` |
| Add an interactive widget | `site/js/interactive/<name>.js` + register in `index.js` |
| Add a new scene | new `content/NN-name.md` + add to `content/manifest.json` |
| Add a new image or diagram | drop in `site/assets/images/` or `site/assets/diagrams/` and reference from frontmatter |

If you find yourself writing HTML inside a Markdown file, stop. Either the frontmatter needs a new field, or the renderer in `site/js/render.js` needs to learn a new pattern.

---

## Scene file format

Every scene in `content/` follows this shape. The frontmatter is parsed by both `site/js/main.js` and `present/deck.js` — keep keys consistent across files.

```markdown
---
scene: 10
act: 4
title: "File Over App"
subtitle: "Steph Ango's three-word manifesto, and why it matters now"
duration_seconds: 180
key_idea: "Apps are ephemeral. Files have a chance to last."
interactive: "file-over-app"           # optional, name of widget in site/js/interactive/
hero_image: "10-notebook-handwriting.png"
hero_image_alt: "Open notebook with handwritten journal entry and pen-drawn tree"
hero_image_caption: "Pages outlive notebooks. Notebooks outlive bookstores. Files outlive apps."
hero_image_orientation: "portrait"     # "portrait" or omit for landscape
deck_image: "10-notebook-cinematic.png" # optional — cinematic variant for /present/
deck_image_alt: "..."                   # optional, falls back to hero_image_alt
deck_image_caption: "..."               # optional, falls back to hero_image_caption
deck_image_orientation: "portrait"      # optional, falls back to hero_image_orientation
diagram: "04-file-over-app.svg"        # optional
diagram_alt: "..."
diagram_caption: "..."
---

## Markdown body starts here

Plain Markdown. No raw HTML.
```

**Frontmatter keys the parser understands** (see `site/js/main.js → parseScene` and `present/deck.js → parseScene`):

- `scene` (int), `act` (int) — required
- `title`, `subtitle` — strings
- `duration_seconds` — int, used in scene chrome
- `key_idea` — string, rendered as the brick-red callout in the reading view and as the pull-quote on slides
- `interactive` — slot name, must match a registered widget
- `hero_image`, `hero_image_alt`, `hero_image_caption`, `hero_image_orientation` — used by both views; the reading view always uses these
- `deck_image`, `deck_image_alt`, `deck_image_caption`, `deck_image_orientation` — optional; when present the slide deck prefers these over the hero image. Lets a scene carry a calmer editorial illustration for the reading view and a more cinematic one for the projector. Each field individually falls back to its `hero_image_*` counterpart if omitted.
- `diagram`, `diagram_alt`, `diagram_caption`

The parser is intentionally dumb (`key: value` per line, quoted strings). If you need lists or nested structures, extend the parser in **both** loaders, not in a content file.

---

## Adding a scene

1. Create `content/NN-name.md` with full frontmatter.
2. Add `"NN-name"` to the correct act's `scenes` array in `content/manifest.json`.
3. If the scene needs an interactive widget, add `site/js/interactive/<name>.js` and register it in `site/js/interactive/index.js`. The widget gets a DOM container; do not touch surrounding markup.
4. If the scene needs imagery, drop assets in `site/assets/images/` or `site/assets/diagrams/` and reference them by filename in frontmatter (no path prefix).
5. Reload `index.html` — the scene appears in both the reading view and the deck.

You should not need to touch `index.html`, `site/js/render.js`, or `present/deck.js` to add a scene.

---

## The slide deck (`present/`)

The deck reuses content from `content/` and adds **zero duplication**. Layouts are chosen automatically from frontmatter in `present/deck.js → buildSceneSlide`:

- Has `hero_image` → **scene+image** layout (two-column, photo on right)
- Has `diagram` but no `hero_image` → **diagram** layout (centered SVG on cream card)
- Has both → scene+image slide, **followed by** a dedicated diagram slide
- Has neither → **quote** layout (giant italic key_idea pull-quote)

Plus a cover slide, 6 act intros, and a closing slide. 29 total today.

Controls: `→`/`Space`/click = next, `←` = back, `F` = fullscreen, `Esc` = exit, `Home`/`End` = jump. Hash deep-linking via `#N`.

---

## Local development

No build step. Any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

The site uses ES modules over HTTP, so file:// won't work — you need a server.

---

## Deployment

GitHub Pages serves the repo root from `main`. `.nojekyll` is committed so Pages doesn't process the directory.

```bash
git add .
git commit -m "..."
git push origin main
# ~45s later, https://hoopsomuah.github.io/cli-agents/ updates
```

Verify the build:

```bash
gh api /repos/hoopsomuah/cli-agents/pages/builds/latest --jq '{status, commit}'
```

---

## Visual design system

Both views share a deliberate aesthetic. Hold the line.

- **Reading view** — light, editorial by default. Warm cream background, deep navy ink, brick-red key-idea accent. Serif (Fraunces) for display, sans (Inter) for body, mono (JetBrains Mono) **only inside actual code snippets**.
- **Slide deck** — dark cinematic by default. Deep navy background, cream text, peach + brick accents. Same type stack. Designed for projection in a darkened room.

### Themes

The visual surface is driven by two HTML attributes on `<html>`:

- `data-palette` — one of `editorial`, `ink`, `solar`, `forest`, `slate`, `rose`, `ocean`, `sunset`
- `data-mode` — `light` or `dark`

Both views ship with all 8 palettes × 2 modes. The defaults are:

- Reading view → `editorial` + `light`
- Slide deck → `editorial` + `dark`

Selection is persisted in `localStorage` (`cli-agents-palette` + `cli-agents-mode`) and synced across tabs/views via the `storage` event. Each view has a palette-swatch popover next to its dark/light toggle. The editorial palette is the canonical reference; the others are alternatives that respect the same hierarchy.

Palette tokens live in **one place** — `site/css/tokens.css` — and are imported into `present/deck.css`, which aliases deck-specific variable names (`--ink`, `--ink-soft`, ...) onto the shared semantic tokens (`--fg`, `--fg-muted`, ...). Add a new palette in one file; both views pick it up.

What we are not:
- **Not a terminal-themed site.** No scanlines, no CRT glow, no phosphor green, no mono-everywhere. That aesthetic was deliberately removed in the editorial overhaul.
- **Not a slide tool.** No PowerPoint exports, no per-slide markdown.
- **Not a framework site.** No React, no Vue, no Svelte, no Tailwind, no build step.

---

## Adding visual assets

The house style for hero imagery is **hand-illustrated cartoony watercolor with ink-line work**, anchored on `site/assets/images/00-print-to-pixel-mural.png`. Every new hero image must read as a continuous piece of that editorial illustration — not as photography, not as glossy AI poster art, not as flat vector.

- **Reading-view variants** (`hero_image`) lean editorial and calm: muted warm palette (cream, ochre, sienna, soft brown), soft window/lamp light, brick wall environments where natural. They sit beside prose without competing.
- **Deck variants** (`deck_image`, once the renderer supports it) lean cinematic: muted deep teal-purple backdrops, soft cyan-magenta glows, warm amber highlights, dramatic spotlighting, and — where it fits — small silhouette audience figures inside the frame, echoing the plaza spectators in the print-to-pixel mural.

**Text inside images is allowed** when it serves the metaphor (labels on jars, brass plaques, recipe binders, chalkboard flows, etc.). Misspelled or hallucinated text is not — review every panel before merging. Diagrams that need to be precisely readable (architecture, agent loops with labeled steps that change as the project evolves) should still be hand-built SVG, not raster art.

- **Images** — PNG, ~16:9 or portrait (~4:3) if the subject warrants. Save to `site/assets/images/NN-name.png` for scene art or `concept-<topic>-<variant>.png` for cross-cutting concepts.
- **Diagrams** — hand-write SVG to `site/assets/diagrams/NN-name.svg`. Use `currentColor` where possible; the deck renders diagrams on a cream card so dark-on-light reads cleanly against the navy stage.

Reference both from scene frontmatter, not from Markdown body. For the per-asset filename map, see `docs/IMAGE_CATALOG.md`; to browse the full set visually, open `docs/image-viewer.html` directly from a checkout.

---

## Coding conventions

- **ES modules, no bundler.** Import paths are relative and must include `.js`.
- **No dependencies** beyond `marked` (CDN) for Markdown parsing. Do not add npm/yarn/pnpm; there is no `package.json` on purpose.
- **CSS custom properties** drive the design system. Tokens live in `site/css/tokens.css`; the deck has its own scoped tokens at the top of `present/deck.css`.
- **One concern per file.** Sticky header → `header.js`. TOC → `toc.js`. Each interactive widget gets its own file.
- **No inline event handlers, no inline styles.** Use classes and addEventListener.
- **Accessibility** — every image needs alt text. Buttons need aria-labels. Respect `prefers-reduced-motion` (the deck already does).
- **Hash-based deep linking** for both views. Don't break `#scene-NN` or `#N` (deck).

---

## Things to never do

- Do not add a build step, framework, or package manager.
- Do not put HTML in `content/*.md`.
- Do not put copy in `site/js/*` or `present/deck.js` — they read it from `content/`.
- Do not duplicate content between the reading view and the deck.
- Do not reintroduce the terminal theme. Mono is for code only.
- Do not rename frontmatter keys without updating both `site/js/main.js` and `present/deck.js`.
- Do not commit without verifying the page loads in a browser; ES module path mistakes do not show up until runtime.

---

## When in doubt

The thesis of the presentation is the operating principle of the repo:

> The file is the canon. The renderer is replaceable.

Treat `content/` as immutable canon you can swap renderers around. Treat `site/` and `present/` as renderers you can replace tomorrow without losing a word.
