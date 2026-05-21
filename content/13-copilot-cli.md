---
scene: 13
act: 5
title: "GitHub Copilot CLI"
subtitle: "Talk to your repo. In English. From the terminal."
duration_seconds: 240
key_idea: "Copilot CLI turns the terminal into a conversation. You describe what you want; it proposes commands, edits files, opens PRs. You stay in the driver's seat."
interactive: "copilot-cli-sim"
hero_image: "13-hands-keyboard.png"
hero_image_alt: "Two hands resting on a black mechanical keyboard at a wooden desk, with a stack of books and a mug in soft focus behind them"
hero_image_caption: "The agent does not replace your hands. It collaborates with them."
diagram: "05-agent-loop.svg"
diagram_alt: "A circular diagram with four nodes — You, Copilot CLI, Files, and Git — connected by arrows showing the loop: you describe in English, the agent edits files, commits to git, and opens a PR back to you"
diagram_caption: "A small loop. You can run it as many times as you need."
---

## What it is

[GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) is an AI agent that runs inside your terminal. You launch it with one command — `copilot` — and a chat panel opens right there in your terminal window. You can talk to it in plain English about anything in the folder you're in.

It is the same Copilot you might already know from VS Code, but instead of editing files in an IDE, it works at the level of **your whole repository, your filesystem, and your shell**. It can:

- Read files in the current folder.
- Run commands (with your approval).
- Edit files and stage them as a commit.
- Open a PR on GitHub.
- Search GitHub for related code, issues, and PRs.

You stay in the driver's seat. Every command it proposes, you can see and approve before it runs.

## A real-world example

You are the EA. The team just decided to move the Q2 launch from June 1 to June 15. You open the terminal:

```
$ cd team-canon
$ copilot
> The Q2 launch date moved from June 1 to June 15. Update the plan of record
  and the operating rhythm doc to reflect this. Open a PR for the principal
  to review.

[Copilot will perform the following:]
  1. Read canon/plan-of-record.md
  2. Read canon/rhythm.md
  3. Edit both files to reflect the new date
  4. Create a branch named 'q2-launch-shift-june-15'
  5. Commit the changes with message "Shift Q2 launch to June 15"
  6. Open a PR titled "Q2 launch: June 1 → June 15"

[Approve? y/n]
> y

✓ Branch created
✓ Files edited (2 files, 4 lines changed)
✓ Committed
✓ PR #47 opened: https://github.com/our-team/canon/pull/47
```

That was 30 seconds of work. The PR is now sitting in the principal's queue, with a diff showing exactly what changed, ready to approve.

## Why this is a step-change for ops work

Two things to notice:

1. **The EA didn't need to remember any Git commands.** They said what they wanted in English. Copilot did the mechanical work.
2. **The audit trail is identical to a manual edit.** The PR has a description, a diff, an author, a timestamp. The principal reviews and approves exactly the same way as if a developer had done it.

This is the magic combination: **natural language input + structured, auditable output**. The EA speaks human; the repo speaks Git; Copilot translates. And because the file lives in a repo, the same agent can later answer "when did we shift the Q2 launch?" by reading the commit log.

## The skills you actually need

To use Copilot CLI productively, you need to know:

- How to **`cd` into a folder** in the terminal. (We covered this.)
- How to **read a PR diff** on GitHub. (We covered this.)
- How to **approve or comment** on a PR. (We covered this.)

That's it. The rest is conversation.

## Cost / Access

Copilot CLI is part of GitHub Copilot. Most enterprise GitHub plans include it. We will confirm access for the team in the install checklist.
