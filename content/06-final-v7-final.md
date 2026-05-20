---
scene: 06
act: 3
title: "Final_v7_FINAL_actually-final.docx"
subtitle: "Why filenames are not a version-control strategy"
duration_seconds: 120
key_idea: "Every team has lived through the 'which version is the real one?' nightmare. Version control is the cure that the software world figured out 20 years ago — and that we should borrow."
interactive: "filename-graveyard"
---

## A familiar scene

You open the team's shared drive. You see:

```
Roadmap_Q1.docx
Roadmap_Q1_v2.docx
Roadmap_Q1_v2_edited.docx
Roadmap_Q1_v2_edited_FINAL.docx
Roadmap_Q1_v2_edited_FINAL_v3.docx
Roadmap_Q1_FINAL_actually-final.docx
Roadmap_Q1_FINAL_actually-final_USE-THIS-ONE.docx
```

You have to ask three people which one is "real." Two of them give different answers. The third one says "I think I emailed a newer version." Nobody is wrong, and nobody is right.

This is **distributed authority over change**, and it scales terribly. It is the single biggest hidden tax on operational work.

## The questions you cannot answer

With files-by-filename, you can't cleanly answer:

- **Who** changed this, **when**, and **why**?
- **What exactly** changed between this version and the last one?
- **Was it reviewed** before it became the new "real" version?
- **How do I get back** to the version from three weeks ago, before Sarah's edit?

Every team eventually invents a half-solution: a shared OneNote log, an email chain, a SharePoint approval flow. None of them survive contact with reality, because none of them are tied to **the file itself**.

## What the software world built

Programmers had the exact same problem in the 1990s — except worse, because changing one line in a program could break everything. Their answer was **version control**: a system where the file *remembers its own history*. Every change is stamped with who, when, why. Every change can be reviewed before it becomes the new truth. Every old version is always retrievable.

That tool is **Git**. The hub where teams share Git histories is **GitHub**. And the pattern of "propose a change → review it → accept it" is called a **pull request**, or **PR**.

The next three scenes break those apart.
