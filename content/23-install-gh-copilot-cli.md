---
scene: 23
act: 3
title: "Install: GitHub, the gh CLI, and Copilot CLI"
subtitle: "Twenty minutes from a cloned repo to your first agent-authored PR"
duration_seconds: 120
layout: "install"
key_idea: "You'll be done with this presentation when you've opened a PR — yourself or via Copilot — and watched it merge into main."
bullets:
  - "Sign in to GitHub: gh auth login (choose GitHub.com or your enterprise host)"
  - "Verify: gh auth status → prints your username"
  - "Install Copilot CLI: gh extension install github/copilot-cli (or per docs)"
  - "Launch it: copilot — inside your cloned repo folder"
  - "Try: 'add my name to TEAM.md and open a PR'"
  - "Done when: GitHub shows your PR open with a clean one-line diff"
---

## What you'll have at the end

- **A working GitHub identity** in your terminal.
- **The `gh` CLI** authenticated and ready.
- **Copilot CLI** installed and tested.
- **Your first PR open on this repo** — proposed by you, or proposed by Copilot at your direction.

That's the entire rhythm of business, in its smallest demonstrable form.

## The full instructions

### 1. Install the GitHub CLI (5 min)

In Windows Terminal:

```powershell
winget install --id GitHub.cli
```

Close and reopen Terminal, then:

```powershell
gh --version
```

**Done when:** the terminal prints a version like `gh version 2.55.0`.

### 2. Authenticate to GitHub (3 min)

```powershell
gh auth login
```

Follow the prompts. Choose:

- **GitHub.com** (for personal accounts) or **GitHub Enterprise Server** (for an on-premises company instance) or **GitHub Enterprise Cloud** (a github.com tenant for your company).
- **HTTPS** (recommended unless your team uses SSH).
- **Login with a web browser**, paste the one-time code into the browser, finish there.

Verify:

```powershell
gh auth status
```

**Done when:** the output shows your username and *"Logged in to github.com as ..."*.

### 3. Install Copilot CLI (5 min)

Follow [the install guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-cli/install-copilot-cli) for the latest current path — the install method changes occasionally as the product matures. As of 2026 it is usually:

```powershell
gh extension install github/copilot-cli
```

Then:

```powershell
copilot --version
```

**Done when:** the terminal prints a Copilot CLI version number.

### 4. Try it on this repo (5 min)

```powershell
cd ~\cli-agents
copilot
```

You should see a Copilot chat panel inside your terminal. Try:

```
> Add my name and role to TEAM.md, then open a PR titled
  "Add <Your Name> to TEAM.md"
```

Copilot will:

1. Show you the proposed edit to `TEAM.md`.
2. Ask for approval to commit and push.
3. Open the PR on GitHub and print the URL.

**Done when:** the PR URL opens to a one-line diff on GitHub, with your name added.

### 5. Pick a starter issue (3 min)

Visit the [issues tab](https://github.com/hoopsomuah/cli-agents/issues) on this repo. Find one labeled `good first issue`. Comment *"I'm picking this up."* Open a PR that resolves it (use `Closes #N` in the PR description).

**Done when:** the issue auto-closes because your PR was merged.

## The closing thought

When you've made your first three PRs, you have done all of the following:

- Used the terminal to navigate the filesystem.
- Cloned a repo, edited files, committed changes.
- Created a branch, pushed it, opened a PR.
- Used GitHub's review tools to comment and approve.
- Used an agent to do the same work, in less time, with the same audit trail.

That is the entire core loop. Everything else in this presentation is incremental from here.
