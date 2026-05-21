---
scene: 04
act: 1
title: "Install: Your Terminal"
subtitle: "Five minutes from zero to a blinking cursor"
duration_seconds: 60
layout: "install"
key_idea: "You'll be done with Act I when you can open Windows Terminal, see a PowerShell prompt, and type your name without flinching."
bullets:
  - "Open the Microsoft Store from the Start menu"
  - "Search for 'Windows Terminal' (already installed on Windows 11)"
  - "Click Install — wait ~30 seconds"
  - "Hit the Start key, type 'Terminal', press Enter"
  - "Done when: a dark window opens with a blinking cursor and 'PS C:\\Users\\<you>>'"
---

## Why this scene exists

Each act of this presentation ends with a small install step you can do on your own time. By the end of Act I, you have the window open. By the end of Act II, you have the local tooling. By the end of Act III, you have the agent.

## The full instructions

### 1. Open the Microsoft Store

Click the Start menu, type **Store**, press Enter. (Skip this if you're already on Windows 11 — Terminal is preinstalled.)

### 2. Search for "Windows Terminal"

Use the search box at the top. The first result should be **Windows Terminal**, publisher Microsoft Corporation.

### 3. Install

Click the **Install** (or **Get**) button. It is about 30 MB and takes under a minute on a normal connection.

### 4. Launch it

Hit the Start key, type **Terminal**, press Enter. A dark window opens with a prompt that looks like:

```
PS C:\Users\hoop>
```

(Substitute your username.)

### You are done when

You can type your name and press Enter, and the terminal responds with:

```
The term '<your name>' is not recognized as the name of a cmdlet...
```

Yes — that error message means it's working. PowerShell looked for a command with your name, didn't find one, and told you so. The conversation has begun.

## If something breaks

- **No "Terminal" in Start menu?** You're on Windows 10. Install from the Store.
- **Microsoft Store missing?** Your work device may have it disabled — open IT a ticket asking for the **Windows Terminal** app.
- **PowerShell prompt looks different (`Windows PowerShell`)?** That is the older PowerShell 5.1 — fine for now; we'll upgrade to PowerShell 7 in Act II.

If you're stuck, screenshot the error and open an issue on this repo titled *"Stuck on Act I install."*
