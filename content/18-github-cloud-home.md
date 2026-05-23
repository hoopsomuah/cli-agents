---
scene: 18
act: 3
title: "GitHub Is the Cloud Home for Your Repos"
subtitle: "What github.com actually is — and why your enterprise might have its own"
duration_seconds: 120
key_idea: "Git lives on your laptop. GitHub is the social, collaborative cloud where teams meet their repos and each other."
hero_image: "16-repo-house.png"
hero_image_alt: "Editorial illustration of a tall glass-fronted building at dusk with one warm light glowing inside, and a small hand-lettered sign by the door reading REPOS WELCOME"
hero_image_caption: "GitHub is the cloud home where teams meet their repos and each other."
deck_image: "16-campus-twilight.png"
deck_image_alt: "Cinematic aerial watercolor at twilight of a campus of low buildings with lit windows, subtle network-line overlays connecting them"
deck_image_caption: "GitHub is a campus. Your repos move in."
bullets:
  - "Git = local version control on your laptop"
  - "GitHub = the cloud host that adds a website, accounts, permissions, and collaboration"
  - "github.com — public hub, open to anyone with an email"
  - "GitHub Enterprise Cloud — same product, isolated for your company"
  - "GitHub Enterprise Server — same product, on your company's own servers"
---

## The Git / GitHub split

A lot of newcomers conflate **Git** and **GitHub**. They are different things:

| | Git | GitHub |
| --- | --- | --- |
| What it is | A version-control tool | A cloud hosting service for Git repos |
| Where it runs | On your laptop | On Microsoft-run servers (or on yours) |
| What you need | Just the install from the last scene | An account at github.com |
| What it gives you | History, branches, commits | The website, the PR UI, accounts, permissions, automation |

Git works without GitHub. GitHub works only on top of Git. When you `git push`, you are sending your local commits to a GitHub server somewhere in the cloud, where your teammates can pull them down.

## Three flavors of GitHub

| Flavor | Who runs it | When you'd use it |
| --- | --- | --- |
| **github.com** (the public site) | GitHub / Microsoft | Personal projects, open source, small teams. Free for public repos; paid plans for private repos and bigger teams. |
| **GitHub Enterprise Cloud** | GitHub / Microsoft, but isolated for your company | A dedicated tenant for your org: SSO, audit logs, compliance controls, but you don't run servers. The common choice for modern enterprises. |
| **GitHub Enterprise Server** | Your company's own IT | An on-premises install of GitHub running on your own infrastructure. Used by regulated industries or organizations that can't store code in cloud. |

For most of you, work happens on **GitHub Enterprise Cloud** under your company's tenant — `github.com/your-company-name` — with SSO sign-in. Personal experimentation happens on **github.com** with your personal account.

## What's the same across all three

Whichever flavor your company uses, the daily experience is identical:

- Same UI for repos, issues, PRs.
- Same `git push` / `git pull` workflow.
- Same `gh` CLI and Copilot CLI work against all three.
- Same Markdown rendering, same PR review tools, same Actions, same Projects.

The differences are about who-owns-the-server, who-pays-the-bill, and which compliance controls are turned on. The product is one product.

## What you do not need a personal github.com for

If your company runs Enterprise Cloud, your work account is enough. You can:

- Read this repo (it's public).
- Make a personal account separately if you want a sandbox for experiments. (Recommended — it keeps work and play in their own buckets.)

The install scene at the end of this act will walk you through authenticating to whichever GitHub your team uses.
