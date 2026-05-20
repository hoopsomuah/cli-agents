---
scene: 17
act: 6
title: "Starter Issues — Your Homework"
subtitle: "Eight small, real tasks waiting for you on the repo"
duration_seconds: 90
key_idea: "Issues turn 'good intentions after a meeting' into 'a list of things I can actually click on.' Every issue is small. Every issue is real. Every issue closes with a PR."
interactive: "issue-list"
---

## What is a GitHub Issue?

An **issue** is a small unit of work on a repo. It has a title, a description, optional labels, and an assignee. It lives at a permanent URL. Anyone can comment on it. When the work is done, it closes — usually automatically when a PR that references it is merged.

Issues are the bridge between *"we should do this thing"* and *"someone is doing this thing and you can see exactly where they are."* They are the lightest-weight task management tool in existence, and they are right next to the code/docs they refer to.

## The starter issues

The [Issues tab](https://github.com/hoopsomuah/cli-agents/issues) on this repo has eight starter tasks ready for you. They are deliberately small. Each one teaches one new thing. None of them take more than 20 minutes.

The goal is not to finish all eight today. The goal is to **finish one this week.** Pick the one that scares you the least and start there.

## How to claim an issue

1. Open the [issues list](https://github.com/hoopsomuah/cli-agents/issues).
2. Read through the titles. Pick one.
3. Click it.
4. Comment: *"I'm picking this up."*
5. Optionally, assign yourself (top of the right sidebar).

## How to close an issue

When you open a PR that resolves the issue, put this line in your PR description:

```
Closes #12
```

(Use the actual issue number.) When the PR is merged, GitHub will automatically close the issue and link it to your PR. The full trail — issue → PR → merge → close — is preserved forever.

## After the homework

When you've closed your first three issues, you have done all of the following without realizing it:

- Used the terminal to navigate the filesystem.
- Cloned a repo, edited files, committed changes.
- Created a branch, pushed it, and opened a PR.
- Used GitHub's review tools to comment and approve.
- Resolved an issue with a PR.

That is the entire core loop. Once you can do that loop comfortably, **everything else in this presentation becomes incremental**. Copilot CLI is "the loop, but you talk to it." Agent-driven status updates are "the loop, but a robot opens the PR." The living canon is "the loop, applied to every team document."

You will have learned the rhythm of business. The rest is reps.
