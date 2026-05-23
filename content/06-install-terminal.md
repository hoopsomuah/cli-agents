---
scene: 06
act: 1
title: "Install: Your Terminal"
subtitle: "Five minutes from zero to a blinking cursor"
duration_seconds: 60
layout: "install"
key_idea: "You'll be done with Act I when you can open Windows Terminal, see a PowerShell prompt, and type your name without flinching."
hero_image: "04-install-terminal-trio.png"
hero_image_alt: "Hand-illustrated watercolor of three platform glyphs in a row — Windows Terminal, macOS Terminal, and a Linux terminal mark — tied with a single ribbon on a warm cream background"
hero_image_caption: "Three doors into the same room: Windows, macOS, Linux — all open onto a blinking cursor."
deck_image: "04-install-terminal-pedestal.png"
deck_image_alt: "Cinematic watercolor of the three terminal glyphs as physical objects on a velvet pedestal, museum-spotlit against a darkened gallery, soft cyan and amber stage glows"
deck_image_caption: "Three doors. One blinking cursor on the other side."
bullets:
  - "Open the Microsoft Store from the Start menu"
  - "Search for 'Windows Terminal' (already installed on Windows 11)"
  - "Click Install — wait ~30 seconds"
  - "Hit the Start key, type 'Terminal', press Enter"
  - "Done when: a dark window opens with a blinking cursor and 'PS C:\\Users\\<you>>'"
---

## Why this scene exists

Each act of this presentation ends with a small install step you can do on your own time. By the end of Act I, you have the window open. By the end of Act II, you have the local tooling. By the end of Act III, you have the agent.

You learned in scenes 04 and 05 that the *window* is the terminal and the *brain* inside it is the shell. This install puts both on your machine in five minutes.

## The full instructions

### 1. Find the terminal (1 min)

If you're on **Windows 11**, Windows Terminal is already installed — skip to step 4.

If you're on **Windows 10**, click the Start menu, type **Store**, press Enter.

### 2. Search for "Windows Terminal" (30 s)

In the Microsoft Store, use the search bar at the top. The first result should be **Windows Terminal**, publisher **Microsoft Corporation** (the verified Microsoft icon next to the name matters — it confirms you're getting the official app).

### 3. Install (~30 s)

Click the **Install** (or **Get**) button. The download is about 30 MB and takes under a minute on a normal connection. The button changes to **Open** when it finishes.

### 4. Launch it (5 s)

Hit the **Start** key, type **Terminal**, press Enter. A dark window opens with a prompt that looks like:

```
PS C:\Users\hoop>
```

(Your username instead of `hoop`. The `PS` prefix tells you the shell is PowerShell — exactly what we want.)

### 5. Try the first conversation (15 s)

Type your name and press Enter. Whatever you typed, the terminal answers:

```
<your-name>: The term '<your-name>' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the
spelling of the name, or if a path was included, verify that the
path is correct and try again.
```

That looks like an error — but it isn't. PowerShell did exactly what scene 04 promised: it read your line, looked for a command with that name, didn't find one, and printed an honest answer. The conversation has begun.

### You are done when

You can:

- Open Windows Terminal from the Start menu in under two seconds.
- See `PS C:\Users\<you>>` waiting for input.
- Type any command (even a wrong one) and read PowerShell's response.

## If something breaks

- **No "Terminal" in Start menu on Windows 10?** Install from the Microsoft Store using the steps above.
- **Microsoft Store missing or blocked?** A locked-down work device may have it disabled. Open IT a ticket asking for the **Windows Terminal** app from Microsoft Corporation. (It is free, signed, and supported.)
- **Prompt looks like `Windows PowerShell` in light blue text?** You opened the *old* PowerShell 5.1 host instead of the modern Windows Terminal. Close it and use the Terminal app instead — same shell underneath, much better window around it.
- **Stuck?** Screenshot the error and open an issue on this repo titled *"Stuck on Act I install."* Include your Windows version and the exact text on screen.
