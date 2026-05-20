---
scene: 14
act: 5
title: "PRs as the Conversation"
subtitle: "Every proposed change — by you, by a teammate, or by an agent — flows through the same door"
duration_seconds: 120
key_idea: "When PRs are the universal change mechanism, it doesn't matter whether the change was proposed by a human or an agent. The review surface, the audit trail, and the sign-off process are identical."
interactive: "pr-author-comparison"
---

## The uniform interface

Once your team is operating in a repo, **every change** to the canon flows through the same door: a pull request. It doesn't matter whether:

- A teammate manually edited a file in VS Code and opened a PR.
- You asked Copilot CLI in English and it opened a PR.
- A scheduled agent ran overnight and opened a PR with a status update.
- An external collaborator forked the repo and proposed a change via PR.
- A bot (Dependabot, a custom workflow) opened a PR with an automated update.

All five look the same in your PR queue. All five get reviewed the same way. All five leave the same audit trail.

This is what makes a repo-driven operating rhythm **agent-ready** without being **agent-required**. Humans and agents propose changes in exactly the same way. The team's review process doesn't change.

## What this unlocks

A few patterns that become possible:

### Scheduled status snapshots

Every Friday at 4pm, an agent reads the week's calendar, Slack threads, and GitHub activity, and opens a PR proposing this week's entry in `canon/status/2026-W21.md`. The BM reviews it, edits if needed, merges. Five minutes of human review replaces an hour of manual writing.

### Continuous canon refresh

When someone joins or leaves the team, an agent watches the company directory and opens a PR updating `canon/org-chart.md`. Nobody has to remember to update it manually.

### Decision drafts

When the team makes a decision in a meeting, the EA tells Copilot: *"draft a decision record for what we just agreed about the Q2 launch."* Copilot writes the draft as a new file in `canon/decisions/`, opens a PR, the EA tweaks, the principal approves.

### Compliance pre-checks

A bot reviews every PR that touches `canon/policies/` and adds a comment listing which compliance frameworks might be affected. The reviewer sees the comment before approving.

## The principle

**One door, many proposers.** Every change comes through PRs. Some proposals are human, some are agentic. The review is uniform. The audit log is uniform. The trust model is uniform.

Compare to today's reality, where:
- Human edits go through SharePoint.
- Agent suggestions live in chat transcripts.
- Bot updates run silently in the background.
- Email approvals exist as PDF attachments somewhere.

Four parallel systems, no shared audit log, no shared review surface. The repo collapses all four into one.
