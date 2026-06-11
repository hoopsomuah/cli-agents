---
scene: 11
act: 2
title: "Final_v7_FINAL_actually-final.docx"
subtitle: "Why filenames are not a version-control strategy"
duration_seconds: 90
key_idea: "Every team has lived the 'which version is the real one?' nightmare. The software world solved it twenty years ago — and we can borrow the cure."
hero_image: "06-stickynotes-chaos-watercolor.png"
hero_image_alt: "Hand-illustrated watercolor overhead of a wooden desk in chaos: a printed document labeled PROPOSAL_FINAL_v7_FINAL.docx surrounded by overlapping sticky notes with conflicting revisions"
hero_image_caption: "The version-naming disaster as still life."
hero_image_orientation: "portrait"
---

## You have lived this

It's Thursday afternoon and the board deck is due Friday. You open the team's shared drive to grab the latest roadmap and this is what greets you:

```
Roadmap_Q1.docx
Roadmap_Q1_v2.docx
Roadmap_Q1_v2_edited.docx
Roadmap_Q1_v2_edited_FINAL.docx
Roadmap_Q1_v2_edited_FINAL_v3.docx
Roadmap_Q1_FINAL_actually-final.docx
Roadmap_Q1_FINAL_actually-final_USE-THIS-ONE.docx
```

So you do what everyone does. You message three people and ask which one is real. Two of them disagree. The third says she's pretty sure she emailed a newer version Tuesday, but it might have been to the old thread. Nobody is lying. Nobody actually knows. And the one number on the slide that the CFO will read out loud lives somewhere in that pile.

This is the quiet tax on operational work: not that people make mistakes, but that **nobody can say with certainty which version is the truth, who changed it, or why.** Multiply it across every proposal, budget, and plan your team touches in a year.

## The questions a filename can't answer

When the version *is* the filename, there are four questions you simply cannot answer cleanly:

**Who** changed this, **when**, and **why**? **What exactly** is different from the last version? **Did anyone review it** before it became the new "real" one? And **how do I get back** to how it looked three weeks ago, before the change that broke the numbers?

Every team eventually invents a half-fix — a shared log, an email chain, an approval flow. None of them survive contact with reality, because none of them are tied to **the file itself**. The history lives in people's memories, and memory doesn't scale.

## Somebody already solved this

Programmers hit this exact wall in the 1990s, except worse: in software, a single mistyped line can take down the whole system. So they built a system where the file *remembers its own history* — every change stamped with who, when, and why; every old version recoverable; nothing overwritten and forgotten.

That system is called **version control**, and the tool nearly everyone uses is **Git**. That's the next scene.
