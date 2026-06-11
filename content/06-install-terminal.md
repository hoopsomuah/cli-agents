---
scene: 06
act: 1
title: "You Already Have a Terminal"
subtitle: "Windows and macOS both ship one in the box — here's how to open it"
duration_seconds: 60
layout: "install"
key_idea: "There is nothing to download. Every Windows and every Mac already has a terminal installed. Act I ends the moment you open it and see a blinking cursor."
hero_image: "04-install-terminal-trio.png"
hero_image_alt: "Hand-illustrated watercolor of three platform glyphs in a row — Windows Terminal, macOS Terminal, and a Linux terminal mark — tied with a single ribbon on a warm cream background"
hero_image_caption: "Three doors into the same room: Windows, macOS, Linux — all open onto a blinking cursor."
deck_image: "04-install-terminal-pedestal.png"
deck_image_alt: "Cinematic watercolor of the three terminal glyphs as physical objects on a velvet pedestal, museum-spotlit against a darkened gallery, soft cyan and amber stage glows"
deck_image_caption: "Three doors. One blinking cursor on the other side."
bullets:
  - "Windows: press Start, type 'Terminal', press Enter — it opens on a PowerShell prompt"
  - "macOS: press Cmd+Space, type 'Terminal', press Enter — or Applications -> Utilities -> Terminal"
  - "Nothing to install — both come built in"
  - "You're done when a window opens with a blinking cursor waiting for you"
---

## Nothing to install

Each act of this presentation ends with one small hands-on step. Act I's is the easiest of all: **open the terminal you already have.** There is nothing to download — Windows and macOS both ship a terminal in the box.

You learned in scenes 04 and 05 that the *window* is the terminal and the *brain* inside it is the shell. Opening the built-in app gives you both at once.

## On Windows

1. Press the **Start** key.
2. Type **Terminal**.
3. Press **Enter**.

A dark window opens on a PowerShell prompt:

```
PS C:\Users\hoop>
```

(Your username instead of `hoop`. The `PS` prefix tells you the shell is PowerShell — exactly what we want.) On Windows 11 the **Terminal** app is already there. On Windows 10, if "Terminal" doesn't appear, type **PowerShell** instead — same shell, plainer window.

## On macOS

1. Press **Cmd + Space** to open Spotlight.
2. Type **Terminal**.
3. Press **Enter**.

Or open it by hand from **Applications -> Utilities -> Terminal**. A window opens on a shell prompt that ends in `%` (the default shell on modern Macs is `zsh`):

```
hoop@MacBook ~ %
```

## Try the first conversation

In either terminal, type your name and press Enter. Whatever you typed, the shell answers — usually with a polite "command not found." That looks like an error, but it isn't: the shell did exactly what scene 04 promised. It read your line, looked for a command with that name, didn't find one, and answered honestly. The conversation has begun.

## You are done when

- The terminal opens from a keyboard shortcut in under two seconds.
- A prompt is waiting for input (`PS C:\Users\<you>>` on Windows, `… %` on macOS).
- You can type any command — even a wrong one — and read the response.

## If something breaks

- **No "Terminal" on Windows 10?** Type **PowerShell** in Start instead, or install the free **Windows Terminal** app from the Microsoft Store (publisher: Microsoft Corporation).
- **Prompt says `Windows PowerShell` in light-blue text?** That's the old 5.1 host. It works for now; in Act II we'll switch to modern `pwsh`.
- **Locked-down work laptop?** If the terminal is blocked, open IT a ticket asking for terminal access. It's free, signed, and supported.
