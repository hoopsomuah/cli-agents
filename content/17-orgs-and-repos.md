---
scene: 17
act: 3
title: "Organizations, Teams, Repositories"
subtitle: "How GitHub structures ownership at company scale"
duration_seconds: 120
key_idea: "Inside a GitHub organization, every repo has an owner, a visibility setting, and a permission model — and 'teams' are the unit of access."
hero_image: "17-nested-drawers.png"
hero_image_alt: "Editorial illustration of a hardware-store wall of labeled wooden drawers in three sizes — large for org, medium for teams, small for repos — with one drawer at each level open to reveal the next"
hero_image_caption: "Drawers inside drawers: org holds teams, teams hold repos."
bullets:
  - "Organization = the company-level container (e.g. github.com/microsoft)"
  - "Repository = a project / canon / codebase inside the org"
  - "Visibility: public, internal (everyone in the company), private"
  - "Teams = named groups of people, granted access per repo"
  - "You belong to teams; teams have permissions; permissions cascade to repos"
---

## The container hierarchy

```
Organization
  ├── Teams (named groups of people)
  │     ├── @canon-stewards
  │     ├── @engineering
  │     └── @execs
  └── Repositories (projects)
        ├── canon
        ├── product-website
        └── ops-tooling
```

An **organization** is the company-level container on GitHub. Your company's GitHub URL looks like `github.com/<your-company>`. Inside it live:

- **Repositories** — projects, canons, codebases.
- **Teams** — named groups of people (`@canon-stewards`, `@engineering`, `@execs`).
- **People** — every member of the org, each assigned to one or more teams.
- **Settings** — org-wide policies (more in the next scene).

## How access actually works

Access to a repo is granted to a **team**, not to individual people. This scales because:

- New person joins the company → added to the relevant team → automatically gets access to all that team's repos.
- New project starts → create a repo, grant a few teams the right permission levels, done.
- Person leaves → removed from teams → access disappears from every repo at once.

The five permission levels:

| Level | Can do |
| --- | --- |
| **Read** | View, clone, comment on issues and PRs |
| **Triage** | Read + manage issues and PRs (labels, assignees) |
| **Write** | Triage + push to branches, open PRs, merge |
| **Maintain** | Write + manage repo settings (except destructive ones) |
| **Admin** | Everything, including deleting the repo |

For most operational work, your account has **Write** on your team's repos and **Read** on others.

## Three visibilities

| Visibility | Who can see |
| --- | --- |
| **Public** | The entire internet (open-source projects, this presentation) |
| **Internal** | Everyone in your company's org — no one outside |
| **Private** | Only people explicitly granted access |

Most operational canons live as **Internal**: easy for anyone in the company to read and propose changes, invisible to the outside world. Sensitive things (compensation, M&A) live as **Private**.

## The mental shift

In SharePoint, you tend to think *"who do I share this with?"* In GitHub, you think *"which team owns this, and what's its visibility?"* The latter scales because the team is reusable — once you grant `@canon-stewards` Write to a repo, you never have to think about it again as people come and go.
