# CLI Agents — From Teletype to Rhythm of Business

A 30-minute walkthrough that introduces a non-technical executive team to:

- Windows Terminal, TTY/PTY/CLI/TUI, and the filesystem
- Git, repos, branches, and **pull requests as the auditable sign-off mechanism**
- The "file over app" philosophy and Markdown + Obsidian
- GitHub Copilot CLI as the agent that closes the loop
- Why a repo plus a generated website displaces most of what we use SharePoint for

Two views of the same content:

- **Reading view** — long-form editorial site at <https://hoopsomuah.github.io/cli-agents/>
- **Presentation view** — full-screen cinematic slide deck at <https://hoopsomuah.github.io/cli-agents/present/>

Edit a Markdown file in `content/` and both views update.

---

## Repository structure

This repo deliberately separates **content** from **layout**.

```
.
├── content/             # Source of truth — Markdown, one file per scene
│   ├── manifest.json    # Act/scene structure
│   ├── 01-teletype.md
│   ├── 02-tty-pty-cli-tui.md
│   └── ...
├── site/                # Reading view — layout, styling, interactive widgets
│   ├── css/
│   │   ├── tokens.css   # Color, type, spacing tokens
│   │   ├── base.css     # Resets, body, typography
│   │   ├── layout.css   # Header, hero, reading shell
│   │   ├── components.css   # Act / scene
│   │   └── interactive.css  # Interactive widgets
│   ├── js/
│   │   ├── main.js      # Boot
│   │   ├── render.js    # Markdown → structured HTML
│   │   ├── header.js    # Sticky scroll-aware header
│   │   ├── toc.js       # Sticky table of contents
│   │   └── interactive/ # One file per interactive widget
│   └── assets/
│       ├── images/      # Photographs (PNG)
│       └── diagrams/    # Hand-built SVGs
├── present/             # Presentation view — cinematic slide deck
│   ├── index.html
│   ├── deck.css
│   └── deck.js
├── docs/
│   └── SEEDED_ISSUES.md # Starter homework issues, ready to create
├── TEAM.md
├── index.html
├── README.md           # This file (for humans)
└── AGENTS.md           # Operating manual for coding agents
```

### Editing content

To change what the site says, **edit the Markdown files in `content/`**. No HTML. No CSS. Frontmatter at the top of each file declares the scene's metadata; the body is plain Markdown.

### Editing layout

To change how the site looks, **edit the files in `site/`**. The Markdown files don't need to change.

This isolation is intentional. It is the whole thesis of the presentation: **the file is the canon. The renderer is replaceable.**

---

## Presentation mode

For live delivery in a meeting, open <https://hoopsomuah.github.io/cli-agents/present/> and press **F** to go fullscreen.

- `→` / `Space` / click — next slide
- `←` — previous
- `F` — fullscreen toggle
- `Esc` — exit fullscreen
- `Home` / `End` — first / last
- URL hash (`#1`, `#15`, etc.) — deep-linkable

The deck is built from the same `content/` Markdown files — there is no separate slide source.

---

## Local preview

Any static file server works. Two easy options:

```powershell
# Python (any version with http.server)
python -m http.server 8000

# Or via npx
npx serve .
```

Then open <http://localhost:8000>.

---

## Live deployment

The site is served by GitHub Pages from the `main` branch root. To deploy:

1. Push to `main`.
2. In repo Settings → Pages, set Source = "Deploy from a branch" → `main` / root.
3. Wait ~60 seconds.

---

## The 30-minute meeting

Cover ~20% of the content live and leave the rest for self-serve. Suggested live path:

1. **Hero + teletype animation** (2 min) — the 63-year hook
2. **Scene 03: Windows Terminal** (3 min) — install + tabs demo
3. **Scene 06–08: filenames → repos → PRs** (10 min) — the core arc
4. **Scene 13: Copilot CLI** (5 min) — the magic moment
5. **Scene 15: SharePoint vs repo** (5 min) — the strategic question
6. **Scene 16–17: install checklist + issues** (5 min) — the homework

Send the URL. Let the issues drive the next week.

---

## Source material

- [Windows Command-Line Backgrounder](https://devblogs.microsoft.com/commandline/windows-command-line-backgrounder/) — Microsoft
- [File over app](https://stephango.com/file-over-app) — Steph Ango

---

## License

Content: CC BY 4.0. Code: MIT.
