---
scene: 09
act: 2
title: "Final_v7_FINAL_actually-final.docx"
subtitle: "Why filenames are not a version-control strategy"
duration_seconds: 90
key_idea: "Every team has lived through the 'which version is the real one?' nightmare. The software world solved this twenty years ago. We should borrow the cure."
hero_image: "06-stickynotes-chaos-watercolor.png"
hero_image_alt: "Hand-illustrated watercolor overhead of a wooden desk in chaos: a printed document labeled PROPOSAL_FINAL_v7_FINAL.docx surrounded by overlapping sticky notes with conflicting revisions"
hero_image_caption: "The version-naming disaster as still life."
hero_image_orientation: "portrait"
bullets:
  - "Filenames-as-versions doesn't scale: who, when, why, which one is real?"
  - "Email and shared drives have no audit trail — only tribal memory"
  - "Programmers solved this in the 1990s with version control (Git)"
  - "The team's hub for that history is GitHub"
  - "The pattern for proposing a change is the pull request — coming up"
---

## A familiar drive

You open the team's shared drive and see:

```
Roadmap_Q1.docx
Roadmap_Q1_v2.docx
Roadmap_Q1_v2_edited.docx
Roadmap_Q1_v2_edited_FINAL.docx
Roadmap_Q1_v2_edited_FINAL_v3.docx
Roadmap_Q1_FINAL_actually-final.docx
Roadmap_Q1_FINAL_actually-final_USE-THIS-ONE.docx
```

You ask three people which one is "real." Two of them disagree. The third says she thinks she emailed a newer version. Nobody is wrong, and nobody is right.

This is **distributed authority over change**, and it scales terribly. It is the single biggest hidden tax on operational work.

## The questions you cannot answer

With files-by-filename, you cannot cleanly answer:

- **Who** changed this, **when**, and **why**?
- **What exactly** changed between this version and the last one?
- **Was it reviewed** before it became the new "real" version?
- **How do I get back** to the version from three weeks ago?

Every team eventually invents a half-solution — a shared OneNote log, an email chain, a SharePoint approval flow. None survive contact with reality, because none of them are tied to **the file itself**.

## What the software world built

Programmers had this same problem in the 1990s, except worse — a one-line change in a program can break everything. Their answer was **version control**: a system where the file *remembers its own history*. Every change is stamped with who, when, why. Every change can be reviewed before it becomes the new truth. Every old version is retrievable.

That tool is called **Git**. The team hub where Git histories are shared is **GitHub**. The pattern of "propose a change → review it → accept it" is called a **pull request**.

The next four scenes break those apart.
