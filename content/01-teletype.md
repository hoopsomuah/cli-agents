---
scene: 01
act: 1
title: "The Teletype Lives On"
subtitle: "Every terminal window on Earth is a ghost of a machine that printed on paper"
duration_seconds: 60
key_idea: "The black window with text isn't a relic. It's the most direct, durable interface humans have ever built for talking to a computer."
interactive: "teletype-animation"
hero_image: "02-teletype-keys.png"
hero_image_alt: "Close-up of vintage typewriter keys with a sheet of paper above showing typed text"
hero_image_caption: "Sixty-three years on, the contract is unchanged: characters in, characters out."
hero_image_orientation: "portrait"
diagram: "01-teletype-lineage.svg"
diagram_alt: "Timeline from 1869 stock ticker through 1930 Model 15, 1963 ASCII, 1978 VT100, to 2019 Windows Terminal"
diagram_caption: "From the stock ticker to Windows Terminal — a 150-year unbroken line."
---

## A one-minute history

In 1963, if you wanted to talk to a computer, you walked over to a **teletype** — a typewriter wired to a mainframe by a thick cable. You typed a command. The machine clattered back its response by hammering ink onto a roll of paper. The model was simple: you send characters in, the computer sends characters back.

That model never died.

In the 1980s, the paper roll was replaced by a glass CRT screen. The machine itself was replaced by a software window. The cable was replaced by an in-memory pipe called a **pseudo teletype**, or **PTY**. But the contract between human and computer stayed identical: characters in, characters out.

The black window with green or white text on your laptop today — Windows Terminal, macOS Terminal, iTerm — is the great-great-grandchild of that 1963 teletype. It is the most enduring user interface in computing history. Sixty-three years and counting.

## Why this matters for us

Every modern AI agent — Copilot, Claude, Cursor — speaks this same character-in, character-out language. When you learn to use a terminal, you are not learning a dusty skill. You are learning the **lingua franca that humans and AI agents both speak fluently**.

The team rhythm we are about to build runs on top of this 63-year-old contract. It is the most reliable foundation we have.

## Source

The history above is drawn from [Microsoft's official Windows Command-Line Backgrounder](https://devblogs.microsoft.com/commandline/windows-command-line-backgrounder/), which is required reading if any of this sparked your curiosity.
