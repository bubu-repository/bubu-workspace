# BUBU Toolkit

BUBU Global's shared Cowork plugin. Install once and every component inside
becomes available across the team.

## What's included

### Always-convert rule (hook)
A standing rule fires on every message: if you attach one or more files, Claude
converts each to clean Markdown with markitdown FIRST, then works from that —
no matter what you're asking for. Files already in .md or .txt are skipped.

### MarkItDown — file → Markdown
Converts uploaded files to clean, structured Markdown using Microsoft's
MarkItDown (https://github.com/microsoft/markitdown). Installs itself inside
Claude's sandbox each session, so nothing is installed on anyone's computer.
Supports: PDF, Word, PowerPoint, Excel, HTML, CSV/JSON/XML, images (OCR),
audio (transcription), ZIP, EPUB, and YouTube URLs.

### BUBU MOM — Minutes of Meeting
Turns raw meeting notes, a transcript, or a rough recap into a polished,
on-brand BUBU Minutes of Meeting in .docx and .pdf. If the notes come as an
uploaded file, it converts via markitdown first (Step 0). Triggers on
"minutes of meeting", "MOM", "notulen", "risalah mesyuarat", etc.

## How to install
1. Open the `.plugin` file in Cowork and press **Install**.
2. Done — the convert-first rule and both skills are active automatically.

To share with the team, distribute this `.plugin` file or add it to your team's
plugin marketplace so everyone runs the same version.

## A note on "always"
There is no mechanism that converts a file before Claude ever sees it — uploaded
content enters context automatically. The hook makes "convert to Markdown first"
a mandatory first action on every file, which is the strongest enforcement
available. In rare cases Claude may still act before converting; just say
"markitdown this first" to force it.

## Growing this toolkit
This plugin is a container. Add future BUBU skills under `skills/`, bump the
version, and reship — the whole team gets the update in one package.

---
Version 0.3.0 · Maintained by Bubu Global
