# Migration notes — read this first

This directory is cargo, not part of the `cli-agents` site. It exists only so the content
can travel from a session that can push to `hoopsomuah/cli-agents` to one that can push to
**`anokye-labs/ade-tre-svg`**, since a single Claude Code session can't hold write access to
both owners at once. Once it lands in `ade-tre-svg`, delete this branch (or at least this
directory) from `cli-agents` — it has no reason to persist here.

## Why this exists

The user (Hoop) asked to extract the Flow Lab prototype — originally built at `flow/` in
`hoopsomuah/cli-agents` on branch `claude/animated-workflow-diagrams-yms7c6` — into a new,
already-created repo: `anokye-labs/ade-tre-svg`.

The session doing that work had `hoopsomuah/cli-agents` as its GitHub source. Its `add_repo`
tool refused to add `anokye-labs/ade-tre-svg` too, with:

> cross-tier adds are not supported in v1: requested "anokye-labs/ade-tre-svg" but session
> already has repos from owner(s) [hoopsomuah]. Start a new session with the requested repo
> as the initial source, or add a repo from the same owner as the existing sources.

So the session built and tested the standalone repo content locally, handed it to the user
as a downloadable tarball, and — per this follow-up request — is also committing it here, on
a dedicated branch of `cli-agents`, so a **new session opened with both repos as sources**
can pull it across with normal git commands instead of a manual file transfer.

## What's in this directory

Everything one level below `MIGRATION.md` is the complete, already-tested content of the
`ade-tre-svg` repo root — copy these files to the repo root, not this directory itself:

```
_export-ade-tre-svg/
├── MIGRATION.md          you are here — delete, don't copy
├── index.html            playground UI (root-level, so GitHub Pages serves it directly)
├── flow.css
├── css/tokens.css        palette tokens copied in from cli-agents/site/css/tokens.css
├── js/                   dot.js, layout.js, icons.js, timeline.js, scene.js,
│                         player.js, export.js, examples.js, main.js
├── test/smoke.mjs        no-dependency Node test — parsers, layout, scheduler, icon
│                         auto-pick, error paths. Run: node test/smoke.mjs (9/9 passing)
├── .github/workflows/pages.yml   Pages deploy: test → upload repo root → deploy
│                                 (no build step — the repo root IS the site)
├── .nojekyll
└── README.md             full format reference + module map, already rewritten to
                           reference anokye-labs/ade-tre-svg instead of cli-agents
```

This is the same bundle already sent to the user as `ade-tre-svg.tar.gz`. Everything in it
was smoke-tested with `node test/smoke.mjs` (9/9 pass) and browser-tested with Playwright —
the playground loads, animates, and exports a working standalone SVG with zero console
errors from the app itself.

## What the next session should do

1. Open a session with **both** `hoopsomuah/cli-agents` and `anokye-labs/ade-tre-svg` as
   sources (or `anokye-labs/ade-tre-svg` as the initial source, then add `cli-agents`).
2. From a clone of `cli-agents` on branch `export/ade-tre-svg-standalone`, copy everything
   under `_export-ade-tre-svg/` (except this file) to the root of a clone of
   `anokye-labs/ade-tre-svg`.
3. Commit and push to `ade-tre-svg`'s `main`.
4. In `anokye-labs/ade-tre-svg` → Settings → Pages, confirm Source = "GitHub Actions" (the
   workflow tries to set this itself via `configure-pages` with `enablement: true`; if org
   permissions block that, set it manually once and re-run the workflow).
5. Confirm the deploy at `https://anokye-labs.github.io/ade-tre-svg/`.
6. Clean up: delete the `export/ade-tre-svg-standalone` branch on `cli-agents` (this
   directory's only job was the handoff).

## Background, if useful

The original prototype and its rationale are documented in `flow/README.md` on
`claude/animated-workflow-diagrams-yms7c6` (not yet merged to `cli-agents` `main`) — the
combination of a Graphviz DOT graph (structure) with a small timeline DSL (narration),
rendered as a live SVG player or exported as a standalone SMIL-animated `.svg`. That
branch and this one are independent; this one only carries the extraction.
