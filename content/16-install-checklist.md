---
scene: 16
act: 6
title: "Install Checklist"
subtitle: "Forty-five minutes from zero to running Copilot CLI on your first repo"
duration_seconds: 120
key_idea: "You don't need to remember any of this from the meeting. The checklist is the artifact. Work it on your own time."
interactive: "install-checklist"
---

## The checklist

Every step has a confirmation — when you can do the small thing at the end, you're done with that step. Skip ahead if a step is already installed.

### Step 1 — Install Windows Terminal (5 min)

1. Open the Microsoft Store from the Start menu.
2. Search for *Windows Terminal*. (It may already be installed on Windows 11.)
3. Click *Install*.
4. Hit the Start key, type *Terminal*, press Enter.

**You're done when:** a black-or-dark window opens with a blinking cursor.

### Step 2 — Install Git (5 min)

1. Open Windows Terminal.
2. Type `winget install --id Git.Git -e --source winget` and press Enter.
3. When it finishes, **close and reopen Windows Terminal.**
4. Type `git --version` and press Enter.

**You're done when:** the terminal prints a version number like `git version 2.45.2`.

### Step 3 — Install GitHub CLI (5 min)

1. In Windows Terminal, type `winget install --id GitHub.cli` and press Enter.
2. Close and reopen Windows Terminal.
3. Type `gh auth login` and press Enter.
4. Follow the prompts. Choose *GitHub.com*, *HTTPS*, *Login with a web browser*, and complete the browser flow.

**You're done when:** `gh auth status` prints your GitHub username.

### Step 4 — Install GitHub Copilot CLI (5 min)

1. Type `gh extension install github/gh-copilot` and press Enter.
2. Type `gh copilot --help` to confirm.
3. For the full Copilot CLI experience (the agent that opens PRs), follow [the Copilot CLI install guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-cli/install-copilot-cli).

**You're done when:** `gh copilot suggest "list files"` returns a suggested command.

### Step 5 — Install Obsidian (5 min)

1. Go to [obsidian.md](https://obsidian.md).
2. Download and run the Windows installer.
3. Open Obsidian. Pick *Open folder as vault* — for now, point it at any folder. We'll change this in Step 7.

**You're done when:** Obsidian opens and shows you an empty vault.

### Step 6 — Clone the team repo (5 min)

1. In Windows Terminal, type `cd ~` (this puts you in your home folder).
2. Type `git clone https://github.com/hoopsomuah/cli-agents.git` and press Enter.
3. Type `cd cli-agents` and press Enter.
4. Type `ls` and press Enter.

**You're done when:** you see this site's files listed in the terminal.

### Step 7 — Open the repo as your Obsidian vault (2 min)

1. In Obsidian, click *File → Open vault → Open folder as vault*.
2. Pick the `cli-agents` folder you just cloned.
3. Browse to the `content/` folder and open one of the scene files.

**You're done when:** you can read this content in Obsidian and the formatting looks right.

### Step 8 — Make your first PR (10 min)

1. In the `cli-agents` folder, edit `TEAM.md` (or create it) in Obsidian. Add a line: `- <Your Name>, <Your Role>`.
2. In Windows Terminal, type `git checkout -b add-myself-to-team`.
3. Type `git add TEAM.md`.
4. Type `git commit -m "Add <Your Name> to TEAM.md"`.
5. Type `git push -u origin add-myself-to-team`.
6. Type `gh pr create --fill` and follow the prompts.

**You're done when:** GitHub shows your PR open, with a clean diff of the one line you added.

### Step 9 — Resolve a starter issue (3 min)

1. Visit the [issues tab on the cli-agents repo](https://github.com/hoopsomuah/cli-agents/issues).
2. Pick one that says *good first issue*.
3. Comment on it: *"I'm working on this."*
4. Open a PR that resolves it.

**You're done when:** the issue closes automatically because your PR resolved it.

## When something breaks

It will. That's normal. When it does:

- Screenshot the error.
- Ask Copilot CLI: `copilot "this command failed with [paste error]. What does it mean and how do I fix it?"`
- If you're stuck, open an issue on this repo titled *"Stuck on step N"* with the screenshot. We'll work it together.
