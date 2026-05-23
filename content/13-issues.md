---
scene: 13
act: 2
title: "Issues — The Unit of Work"
subtitle: "Capturing 'we should do this' so it doesn't live only in someone's head"
duration_seconds: 180
key_idea: "An issue turns 'good intentions' into 'a thing with a URL.' Anyone can open one, anyone can comment, and the entire history of what got done — and why — is captured next to the work itself."
hero_image: "13-single-issue-card.png"
hero_image_alt: "Editorial close-up of a cork bulletin board with a single hand-printed index card pinned in the middle: MOVE Q2 STATUS UPDATE TO FRIDAYS 4PM"
hero_image_caption: "An issue turns 'good intentions' into 'a thing with a URL.'"
deck_image: "13-issue-wall.png"
deck_image_alt: "Cinematic wide shot of an entire wall covered in identical yellow sticky notes, with one note in the center glowing brighter than the rest"
deck_image_caption: "Every 'we should do this' gets a permanent URL."
bullets:
  - "An issue is a small unit of work or conversation on a repo"
  - "Title, description, labels, assignee, comments — all at a permanent URL"
  - "Anyone can open one — 'we should X', 'X is broken', 'I have a question'"
  - "A PR that says 'Closes #42' closes the issue when it merges"
  - "Issues + PRs = the entire ticket + sign-off + audit system, in one place"
---

## What an issue actually is

A **GitHub issue** is a tiny page on your repo with:

- A **title** ("Move Q2 status update to Fridays at 4pm")
- A **description** in Markdown (as detailed or as short as you want)
- An **author** and a **timestamp**
- Optional **labels** (e.g. `bug`, `discussion`, `good first issue`)
- Optional **assignee** (the person doing the work)
- A **comment thread** where anyone can chime in
- A **state** — Open or Closed
- A **permanent URL**

That's the whole concept. It is the lightest-weight task-management system that exists, and it sits **right next to the files it refers to.**

## Why issues are different from a ticketing tool

Most teams have used a tracking tool — Jira, Asana, Trello, Linear, ClickUp. Each has its strengths. The thing GitHub Issues does that the others struggle with: **the conversation lives next to the code/docs it's about.**

- An issue can reference a specific file: `canon/plan-of-record.md`.
- A PR can reference the issue: `Closes #42` in the description.
- When the PR merges, the issue closes automatically and links to the resulting commits.
- Six months later, you can read the issue, read the discussion that led to the change, read the PR that implemented it, and read the diff of what actually changed. All in one chain.

No other tool gives you this **full provenance** from "we should do this" to "here is the exact line that resulted." Tickets in Jira link to commits with effort; in GitHub the link is native.

## What you put in issues

For an operating team's canon:

| Use issues for | Example |
| --- | --- |
| **Proposals** | "Propose adding a new section to the operating rhythm doc" |
| **Decisions** | "Decide: do we use OKRs or NCTs for Q3?" |
| **Bugs in the canon** | "The org chart still shows Sarah on the previous team" |
| **Questions** | "What's our current policy on guest access?" |
| **Good-first-issue starters** | "Add yourself to TEAM.md" |
| **Discussion threads** | "Should we move status updates to Mondays?" |

The pattern is *"anything that needs a written conversation eventually gets resolved by a change to a file."* That's the sweet spot for an issue.

## The full loop

The complete operating loop on a repo is just three primitives:

1. **Issue** — captures what needs to happen and why.
2. **Branch + commits** — capture the proposed change.
3. **Pull request** — the conversation about whether to accept the proposed change.

When the PR merges:

- The change is now part of `main`.
- The issue closes automatically.
- The branch can be deleted.
- The PR, the issue, the commits, and the discussion are all permanently linked.

Three primitives. One audit chain. This is the whole rhythm of business, in its smallest form.
