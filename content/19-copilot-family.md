---
scene: 19
act: 3
title: "The Copilot Family"
subtitle: "One brand, many surfaces — where each one fits"
duration_seconds: 120
key_idea: "'Copilot' is a family of agents that all speak to the same GitHub backend. Knowing which Copilot is which keeps you from getting lost."
hero_image: "19-copilot-table.png"
hero_image_alt: "Editorial illustration of a round oak table surrounded by six subtly different chairs — an office chair, a stool, a workshop chair, a wingback, a laptop-on-chair, and one more — each standing in for a Copilot surface"
hero_image_caption: "One family, many seats — each Copilot meets you where you already work."
deck_image: "19-copilot-constellation.png"
deck_image_alt: "Cinematic constellation watercolor: a central GitHub mark with six glowing nodes radiating outward, each labeled IDE, Browser, Code Review, Coding Agent, CLI, M365, with lines of light between them on a dark navy background"
deck_image_caption: "One backend, many surfaces — all called Copilot."
bullets:
  - "Copilot in your IDE (VS Code, JetBrains) — chat + completions while you edit code"
  - "Copilot on github.com — chat about a repo, PR, or issue in the browser"
  - "Copilot Code Review — automated review comments on every PR"
  - "Copilot Coding Agent — accepts an issue, opens the PR for you"
  - "Copilot CLI — the agent in your terminal — our focus today"
  - "Copilot in Microsoft 365 — a separate product, not a GitHub agent"
---

## Why this scene exists

The word **"Copilot"** is overloaded. Microsoft uses it for several different products. GitHub uses it for several different surfaces of the same product. Let's untangle them.

## The GitHub Copilot family

| Surface | What it is | When you'd reach for it |
| --- | --- | --- |
| **Copilot in your IDE** | A chat panel and auto-complete inside VS Code, JetBrains, Neovim, etc. | While you're editing files. The classic Copilot experience. |
| **Copilot on github.com** | A chat panel on github.com, scoped to whichever repo / PR / issue you're looking at | Asking "what's this PR doing?" or "where in this repo is X handled?" |
| **Copilot Code Review** | An automated reviewer that comments on PRs you open | When you want a second pair of eyes on a draft PR. |
| **Copilot Coding Agent** | You assign an issue to Copilot; it works in the background, opens a PR with the change | "Here's a small issue — go fix it and send me a PR." |
| **Copilot CLI** (our focus) | A conversational agent inside your terminal that reads files, runs commands, edits files, and opens PRs — with your approval at each step | Operational work from the terminal. The natural home for a non-developer's everyday flow. |

All of these share the same accounts, the same access controls, and the same audit trail. A PR opened by Copilot CLI looks identical, from a governance perspective, to one opened by a human or by Copilot Coding Agent.

## What Copilot is *not*

| Product | What it is |
| --- | --- |
| **Microsoft 365 Copilot** | A separate product that lives inside Word, Excel, PowerPoint, Teams. Different team, different backend, different licensing. Not a GitHub agent. |
| **Copilot in Windows** | A general-purpose chat assistant from Microsoft. Not connected to your repos. |
| **Bing Copilot / Copilot.com** | Microsoft's consumer chat product. Not a GitHub agent. |

When someone in this presentation says *"Copilot,"* assume they mean a GitHub Copilot surface. When they say *"Copilot CLI,"* they specifically mean the agent in your terminal.

## How the family stays consistent

The shared anchors:

- **Same accounts and permissions** — you sign in with your GitHub account; the agent can only do what you can do.
- **Same audit trail** — every commit, PR, and comment the agent makes is attributed to your account (with a "via Copilot CLI" annotation).
- **Same approval gates** — rulesets that require two reviewers apply to PRs the agent opens, exactly the same as human PRs.

This is the deep reason to be calm about agents: they enter the same governance fabric that's already been working for fifteen years. They are not a side door.
