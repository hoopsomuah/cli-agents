---
scene: 17
act: 2
title: "Install: Git, Obsidian, and Your First Clone"
subtitle: "By the end of this scene, you have the canon on your laptop"
duration_seconds: 90
layout: "install"
key_idea: "You'll be done with Act II when you've cloned a real repo, edited a file, and seen your change with git status."
hero_image: "15-install-trio.png"
hero_image_alt: "Three small hand-illustrated object portraits in a row: a Git logo as an embroidered patch, an Obsidian vault icon stitched onto canvas, and a small terminal window framed like a photograph"
hero_image_caption: "Three small installs, and the canon is on your laptop."
deck_image: "15-install-plaques.png"
deck_image_alt: "Cinematic watercolor of three brass plaques mounted on a wooden plank — Git, Obsidian, Terminal — museum-spotlit against a dark gallery wall"
deck_image_caption: "Three plaques. By the end of this scene, all three are on your wall."
bullets:
  - "Install Git: winget install --id Git.Git -e --source winget"
  - "Verify: close + reopen Terminal, run 'git --version' → version number"
  - "Install Obsidian from obsidian.md (Windows installer)"
  - "Clone the demo repo: cd ~  →  git clone https://github.com/hoopsomuah/cli-agents.git"
  - "Open the cli-agents folder as an Obsidian vault"
  - "Run 'git status' inside the repo — done when it prints 'nothing to commit, working tree clean'"
---

## What you'll have at the end

- **Git** — the version-control tool — installed on your machine.
- **Obsidian** — your friendly Markdown editor — installed.
- A **real repository** cloned onto your laptop (this one).
- The repo open as an **Obsidian vault**, so you can read the scene files in a real editor.

That's the whole "local tooling for the canon" stack. After this, Act III adds GitHub authentication and the Copilot CLI.

## The full instructions

### 1. Install Git (5 min)

Open Windows Terminal:

```powershell
winget install --id Git.Git -e --source winget
```

When it finishes, **close and reopen** Windows Terminal. Then:

```powershell
git --version
```

**Done when:** the terminal prints something like `git version 2.45.2`.

### 2. Install Obsidian (5 min)

1. Go to <https://obsidian.md>.
2. Download the Windows installer (it's the big button).
3. Run it. Accept the defaults.

**Done when:** Obsidian opens and offers to create or open a vault.

### 3. Clone the demo repo (3 min)

In Windows Terminal:

```powershell
cd ~
git clone https://github.com/hoopsomuah/cli-agents.git
cd cli-agents
ls
```

**Done when:** `ls` shows folders like `content`, `site`, `present` and files like `README.md`, `AGENTS.md`.

### 4. Open the repo in Obsidian (1 min)

In Obsidian, click **File → Open vault → Open folder as vault**, then pick the `cli-agents` folder you just cloned. Browse to `content/` and open any scene file.

**Done when:** you can read this presentation's content in Obsidian, with proper Markdown formatting.

### 5. Confirm Git sees a clean repo

Back in Windows Terminal, in the `cli-agents` folder:

```powershell
git status
```

**Done when:** the terminal prints:

```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

That tells you: Git knows about this folder, you're on the main branch, and you haven't changed anything yet. You're now standing on the floor we've been describing for the last ten scenes.
