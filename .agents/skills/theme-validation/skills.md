# Skill: Theme Validation (per-theme readability audit)

Audit **every scene in every theme** of the CLI-Agents site for readability and visual
clarity, using a screenshot harness plus parallel theme-aware reviewer agents. The point is
to let each palette's layout keep **evolving independently of the content** while staying
robust — catching overflow, cut-off text, stray scrollbars, clipped panels, weak contrast,
and bad measure *before* they ship.

> The file is the canon. The renderer is replaceable. This skill checks that every renderer
> still renders the canon **legibly**, in every gestalt, in both modes, at every size.

---

## When to use

- After any change to `site/css/palettes/*.css`, `site/css/tokens.css`, `palette-flavor.css`,
  `palette-layout.css`, `present/deck*.css`, or the renderers (`site/js/render.js`,
  `present/deck.js`).
- After adding/editing a `content/*.md` scene (long titles/bodies are the #1 source of
  layout fragility).
- Periodically, as a regression sweep across all 8 palettes × light/dark.

This is an **audit** skill: it produces a prioritized findings report. Fixing is a separate
step. Fixes must be **CSS-side and content-agnostic** (fluid `clamp()` type, `min-height`,
`text-wrap: balance/pretty`, overflow handling, container queries) — never edit `content/` to
make a layout fit.

---

## Prerequisites

1. **Static server running** at `http://localhost:8000` (repo root):
   ```
   npx --yes http-server -p 8000 -c-1 .
   ```
2. **Harness deps** (one-time, in this tool dir — keeps the site itself build-step-free):
   ```
   cd .agents/skills/theme-validation
   npm install
   npx playwright install chromium
   ```
   `node_modules/` and `.theme-audit/` are gitignored.

---

## Step 1 — Capture the matrix

From `.agents/skills/theme-validation/`:

```
node audit.mjs                  # full matrix: 8 palettes × light/dark × both views
node audit.mjs --palette forest # re-shoot a single palette
node audit.mjs --view deck      # one view only (reading|deck)
node audit.mjs --base http://localhost:8000
```

**What it captures**

| View | Unit captured | Viewports | Modes |
| --- | --- | --- | --- |
| Reading (`/`) | each `section.act` + each `section.scene` (element-clipped shot) | desktop 1440×900, mobile 390×844 | light + dark |
| Deck (`/present/`) | each `.slide` (full viewport, navigated by `#N`) | projector 1280×800 | light + dark |

Palette/mode are forced via `localStorage` in an `addInitScript` **before** page scripts run,
then verified from `data-palette`/`data-mode` on `<html>`. The harness waits for
`document.fonts.ready` + `networkidle` before each shot.

**Outputs** (all under `.theme-audit/`, gitignored):

```
.theme-audit/
  reading/<palette>/<mode>/<viewport>/<scene-id>.png
  deck/<palette>/<mode>/<projector>/<NN-slug>.png
  probes/<palette>.json      # machine-readable measurements, flagged-first
  reports/<palette>.md       # written by the reviewer agents (step 3)
  reports/_SUMMARY.md        # aggregated by the lead (step 4)
```

**Probe JSON** (per unit) is a *prioritization aid*, not a substitute for looking:
`overflowX` (scrollWidth>clientWidth), `overflowY` (deck slide content exceeds the stage),
`contrast` (WCAG ratio of primary text vs nearest opaque background — colors resolved through
a canvas so `oklch()` is handled), plus `color`/`bg`/`font`/`scrollW`/`clientW`. Entries are
sorted flagged-first.

---

## Step 1b — Downscale for agent review (REQUIRED)

The raw PNGs are large — full-page scene shots reach **5–8 MB each**. A reviewer agent that
opens even a single such PNG will blow the model's per-request attachment limit (~5 MB) and the
run fails before it sees anything. So before dispatching agents, generate compact JPEG copies:

```
pwsh .agents/skills/theme-validation/downscale.ps1
```

`downscale.ps1` (Windows / .NET `System.Drawing`, no extra deps) mirrors the `reading/` and
`deck/` trees into `.theme-audit/review/...` as JPEGs: longest side capped at 1000px (1600px for
very tall scene shots), quality 68, with a second pass that re-compresses any file >1 MB at
quality 45. Result: **every review JPEG is ≤ ~1 MB**, so an agent can open one per turn safely.
The script is idempotent — re-running re-converts from the current PNGs.

> Agents review the `review/<view>/<palette>/...*.jpg` copies, **not** the source PNGs. The PNGs
> remain the pixel-accurate record if you need to zoom in manually.

---

## Step 2 — The readability rubric (what reviewers look for)

Severity: **blocking** (unreadable/broken) · **major** (clearly hurts) · **minor** (polish).

1. **Horizontal overflow / unwanted scrollbar** — `overflowX` true, or a scrollbar where the
   container could simply wrap or expand. Almost always blocking on mobile.
2. **Text cut off / clipped** — by `overflow:hidden`, fixed heights, `line-clamp`, or a parent
   that doesn't grow. Look for missing descenders, truncated last lines, "…".
3. **Vertical overflow in a fixed-height deck slide** — content taller than the stage, clipped
   or scrolling. Fix by scaling type (`clamp`) or letting the panel breathe, not by cutting words.
4. **Content escaping its card/container**; text colliding with image edges or other blocks.
5. **Contrast below WCAG AA** — 4.5:1 body, 3:1 large/UI. **Check BOTH modes** (a color that
   passes in light often fails in dark and vice-versa). Use the probe `contrast` to triage,
   then confirm by eye (probe measures one representative element).
6. **Text over imagery** without enough scrim/legibility (banners, act intros, image-behind
   slides).
7. **Measure / wrapping** — body measure too long (>~75ch) or cramped (<~45ch); ugly
   hyphenation, rivers in justified text, heading orphans/widows, a single word on the last line.
8. **Overlap / collision** — absolutely-positioned or rotated elements colliding; z-index
   mistakes; letterboxed or distorted (squished) images.
9. **Mobile (reading, ≤960px)** — TOC/nav still reachable, tap targets adequate, no h-scroll,
   clean single-column collapse, images not overflowing the gutter.
10. **Chrome overflow** — figcaptions, key-idea bands, scene numbers/durations, deck
    pull-quotes, act-intro banners wrapping badly or spilling.
11. **Type plumbing** — wrong font fallback (FOUT/FOIT), broken `:focus-visible`, motion that
    ignores `prefers-reduced-motion`.
12. **Robustness lens** — flag fragility that's *content-dependent*: "this only breaks because
    THIS scene's title is long/short." Recommend a CSS fix that holds for any content length.

---

## Step 3 — Per-theme reviewer agents

Dispatch **8 parallel `general-purpose` agents**, one per palette (including `editorial` as the
control/baseline). Each agent reviews ONLY its palette's screenshots and writes
`.theme-audit/reports/<palette>.md`.

**Critical: brief each agent on its gestalt INTENT** so deliberate design moves are not
reported as bugs. Reference table:

| id | Gestalt | Deliberate moves (NOT bugs) |
| --- | --- | --- |
| `editorial` | Editorial (baseline) | clean single column, inline figures — the reference |
| `ink` | **Broadsheet** | masthead act headers, dense **justified** serif, **drop caps**, hairline rules, horizontal ruled **index TOC**. Mono only in code. |
| `solar` | **Glossy** | huge Fraunces display + oversized numerals, **TOC on the RIGHT**, full-bleed imagery breaking the measure, margin pull-quote cards |
| `forest` | **Almanac** | **no desktop TOC** (subtracted on purpose), single **narrow centered measure**, ruled-paper texture, italic leader-mark captions, botanical dividers |
| `slate` | **Spec** | decimal **§ numbering** (1.1, 1.2), **wordless tick-rail TOC** = scroll gauge, **scroll-snap settle**, mono metadata labels, tight grid |
| `rose` | **Atelier** | **image-first** scenes, oversized italic Cormorant, **floating collapsible edge-drawer TOC** (slim when collapsed), deliberate asymmetry + negative space |
| `ocean` | **Encyclopedia** | auto-**numbered headings** (1., 2.), boxed **"Contents" card** TOC, right-floated **infobox** figures, footnote-flavored captions |
| `sunset` | **Riso** | poster-scale Archivo Black, **hard-offset block shadows**, slightly **rotated photo plates**, mono uppercase labels, screaming key-idea bands |

A rotated plate, a hidden TOC, a right-side TOC, justified text, a tick-rail — these are
**intent**. Report them only if the intent *produces* a readability failure (e.g. a rotated
plate that now overflows the viewport on mobile, or justified text with unreadable rivers).

**Agent brief template** (fill `<PALETTE>`):

```
You are auditing the "<PALETTE>" palette (gestalt: <GESTALT>) of a static presentation site
for READABILITY and VISUAL CLARITY. You review rendered screenshots — do not read CSS to
decide; judge what the eye sees, then (optionally) name the likely CSS cause.

INTENT (do NOT report these as bugs unless they cause an actual readability failure):
<paste the palette's row from the gestalt table>

INPUTS:
- Screenshots (downscaled review JPEGs): .agents/skills/theme-validation/.theme-audit/review/reading/<PALETTE>/
  and  /review/deck/<PALETTE>/  (subfolders: <mode>/<viewport>/<id>.jpg).
  *** CRITICAL: open images ONE AT A TIME — exactly one `view` call per turn, then reason, then
  the next. NEVER put two+ image paths in one turn; batching exceeds the request-size limit and
  the run fails. *** Prioritize units flagged in the probe file.
- Probe data: .agents/skills/theme-validation/.theme-audit/probes/<PALETTE>.json
  (overflowX / overflowY / contrast / sizes, sorted flagged-first). Treat as triage hints, confirm by eye.

RUBRIC: <paste Step 2 rubric>

TASK:
1. Open the probe JSON; note every flagged unit (overflowX, overflowY, contrast<4.5).
2. View ALL screenshots for <PALETTE> (both views, both modes, both reading viewports).
3. For each genuine issue, record a finding.
4. Cross-check each candidate against INTENT before reporting.

OUTPUT → write .agents/skills/theme-validation/.theme-audit/reports/<PALETTE>.md with:
- A "## <PALETTE> — theme health" summary (2-4 sentences) + a counts line
  (blocking / major / minor).
- A "## Findings" table, one row per issue:
  | # | view | id (scene/slide) | mode | viewport | severity | symptom (what the eye sees) | likely CSS cause | suggested content-agnostic fix | screenshot |
- A "## Robustness notes" list: content-dependent fragilities + the CSS pattern that would
  make the layout hold for any content length.
Only report real problems. Do not pad. Do not suggest editing content/.
```

Dispatch all 8 in parallel (`mode: background`), then collect each `<palette>.md`.

---

## Step 4 — Aggregate

Read all `reports/<palette>.md` and write `reports/_SUMMARY.md`:

- One prioritized, de-duplicated list across all palettes (blocking → major → minor).
- A "cross-theme patterns" section: issues that recur across palettes usually point at a
  **shared** fix (tokens, base layout, the renderer) rather than per-palette CSS.
- A short "quick wins" list (low-effort, high-impact).

Present the summary to the user. Only proceed to fixes when asked, and keep every fix on the
CSS side so content stays canonical and layout stays independent.

---

## Files in this skill

```
.agents/skills/theme-validation/
  skills.md       # this document
  audit.mjs       # Playwright capture + probe harness
  downscale.ps1   # PNG → compact review JPEGs (≤1MB) so agents can open them
  package.json    # tool deps (playwright) — isolated from the site
  .theme-audit/   # generated artifacts (gitignored): screenshots, review JPEGs, probes, reports
```

## Notes & gotchas

- The deck has **no TOC** and is largely palette-independent (token-driven); still audit each
  palette's deck for token-driven overflow (an oversized display font breaking a slide) and
  contrast over imagery.
- Slides are navigated by hash (`#N`, 1-based) and stacked absolutely; the harness waits 750ms
  after each navigation for the transition + staggered reveals to settle.
- If a palette changes the scroll container (e.g. slate's scroll-snap on `:root`), keep
  `data-palette`/`data-mode` on `<html>` — the harness already sets them there.
- Re-run a single palette after a fix with `--palette <id>` instead of the full matrix.
