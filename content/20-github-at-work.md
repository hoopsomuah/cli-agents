---
scene: 20
act: 3
title: "GitHub at Work"
subtitle: "Actions, rulesets, Projects, security — the platform under the canon"
duration_seconds: 180
key_idea: "Around every repo, GitHub provides a small but powerful set of platform features — automation, guardrails, planning, and security — that together make the rhythm of business durable."
hero_image: "18-platform-tools.png"
hero_image_alt: "Editorial top-down illustration of a watchmaker's bench with five neatly-laid-out tools labeled Actions, Rulesets, Projects, Issues, and Security"
hero_image_caption: "Around every repo is a small bench of platform tools."
deck_image: "18-platform-in-use.png"
deck_image_alt: "Cinematic watercolor of a watchmaker's bench with five tools — Actions, Rulesets, Projects, Issues, Security — partially floating above the surface as if mid-use, motion-trails suggesting the platform is running"
deck_image_caption: "Five small tools, one durable rhythm."
bullets:
  - "Actions — automation: run code on every push, PR, or schedule"
  - "Rulesets — guardrails: 'main needs 2 approvals', 'no force-push', 'no secrets'"
  - "Projects — planning: kanban / table views over issues across repos"
  - "Issues at scale — labels, milestones, saved searches, cross-repo links"
  - "Security — SSO, 2FA, secret scanning, dependency alerts, audit log"
---

## Actions — the automation layer

[**GitHub Actions**](https://docs.github.com/en/actions) is GitHub's built-in workflow engine. You drop a YAML file in `.github/workflows/`, declare a trigger ("when a PR opens", "every Monday at 9am", "when this file changes"), and a list of steps. GitHub runs those steps on its own servers — for free, within generous limits.

Practical uses for an operating team:

- **PR checks** — every new PR runs a script that confirms the canon's Markdown is valid, links work, frontmatter is right.
- **Scheduled status snapshots** — every Friday at 4pm, an Action runs Copilot to draft this week's status entry as a PR.
- **Deploys** — when something merges to `main`, an Action publishes the new version (this presentation deploys this way on every push).
- **Notifications** — when a new decision is logged, an Action pings the team's chat.

You can use Actions without ever writing one. Most teams pick up shared workflows from a marketplace.

## Rulesets — the guardrails layer

A **[ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)** is a policy that GitHub enforces on a branch. Common rules:

- "**Pull requests required** — no direct pushes to `main`."
- "**N approvals required** before merge."
- "**All CI checks must pass.**"
- "**No force-push, no branch deletion.**"
- "**Required reviewers from specific teams** for changes touching `canon/policies/`."

These rules turn the "should we do this?" social agreement into a "we cannot accidentally bypass this" technical guarantee. The merge button literally disappears when rules are unmet.

## Projects — the planning layer

[**GitHub Projects**](https://docs.github.com/en/issues/planning-and-tracking-with-projects) gives you spreadsheet, kanban, and timeline views over issues, across one or many repos. Think of it as Trello/Jira/Linear, where the cards *are* GitHub issues — so opening an issue and updating a project board are the same action.

Useful patterns:

- A single **Operating Rhythm** project tracking issues across all your team's repos.
- An **OKR** project where each issue is a key result and labels track status.
- A **decisions** project showing every open decision the team needs to make.

## Security — the platform layer

What you get just for being on GitHub:

- **SSO** — your company sign-in works on GitHub.
- **Two-factor authentication** — required for almost all orgs in 2026.
- **Secret scanning** — GitHub scans every push for accidentally committed passwords, API keys, tokens.
- **Dependency alerts** — alerts when a library a repo uses has a vulnerability.
- **Audit log** — every administrative action is logged, searchable, exportable.

For the canon use cases we've been describing, the security defaults are already enough. You don't need to be a security engineer to be safe — but it's worth knowing the platform is doing this work for you.

## The point

You don't need to learn each of these in depth. You just need to know they **exist**, so when you wonder *"can the repo enforce two approvals on the operating rhythm doc?"* — the answer is yes (rulesets) — and *"can a robot draft the weekly status?"* — the answer is yes (Actions + Copilot).
