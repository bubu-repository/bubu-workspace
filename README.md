# BUBU Workspace

The shared Claude Code workspace for [BUBU](https://bubu.com) — Indonesia's Cultural Intelligence Agency. Clone this repo once and every skill, template, and tool the team uses is ready to go.

---

## What's in here?

This repo is the **single source of truth** for how BUBU uses Claude Code. It contains:

- **bubu-toolkit** — a plugin with 5 skills that do BUBU-specific work (MOM, Admin Docs, Presentations, Market Research, and file conversion)
- **gstack** — 23+ general-purpose workflow skills (design review, QA, browser automation, etc.)
- **BUBU_Assets** — shared brand assets, context files, and templates
- **Clients** — where all generated outputs go (organized by client name)
- **MOM/scripts** — the scripts that power the MOM document generator

---

## Before You Start

You need two things installed:

1. **Claude Code** — [claude.ai/code](https://claude.ai/code)
2. **Bun** (required by gstack) — install it by running this in your terminal:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

---

## Setup (do this once)

### Step 1 — Clone the repo

Open your terminal and run:

```bash
git clone --recurse-submodules https://github.com/seabub/bubu-workspace.git BUBU
cd BUBU
```

> `--recurse-submodules` is important — it also pulls in gstack automatically.

### Step 2 — Run setup

```bash
chmod +x setup.sh && ./setup.sh
```

This initializes gstack and registers the auto-update hook so gstack stays current every time you open Claude Code.

### Step 3 — Open the workspace in Claude Code

Open Claude Code and point it to the `BUBU` folder you just cloned. All gstack skills activate automatically.

### Step 4 — Install the BUBU Toolkit plugin

The BUBU-specific skills (MOM, Admin Docs, Presentation, etc.) come packaged in `bubu-toolkit.plugin`.

1. In Claude Code, open the **Plugins** panel
2. Click **Install from file**
3. Select `bubu-toolkit.plugin` from the BUBU folder
4. Done — all 5 BUBU skills are now active

---

## Skills — What Each One Does

All BUBU skills live inside `bubu-toolkit.plugin`. Here's what each one does:

### `/bubu-mom` — Minutes of Meeting
Drop your raw meeting notes, a transcript, a voice-memo recap, or a chat log. The skill writes a complete, on-brand BUBU Minutes of Meeting and exports it as both `.docx` and `.pdf` — with the orange header band, the BUBU logo, and all the right sections (Executive Summary, Action Items, Risks, Next Steps, etc.).

**Trigger phrases:** "minutes of meeting", "MOM", "notulen", "write up this meeting", "recap the call"

**Output goes to:** `Clients/[ClientName]/MOM/` or `Clients/Internal/MOM/`

---

### `/bubu-admin-docs` — Admin Documents
Generates any BUBU administrative document as a branded `.docx` — official letters, memos, invoices, quotations (penawaran), SOPs, proposals, berita acara, approval forms. Same BUBU visual system as the MOM skill.

**Trigger phrases:** "buatkan surat", "bikin invoice", "buat SOP", "penawaran", "official letter", "memo"

**Output goes to:** `Clients/[ClientName]/Documents/` or wherever makes sense for the client

---

### `/bubu-presentation` — Branded Decks
Creates on-brand BUBU strategy and campaign decks as `.pptx` — with the BUBU visual system locked in (orange #FF5900, Bebas Neue headlines, Poppins body, the orange B logo). Fonts are embedded into the file so they render correctly on any computer.

**Trigger phrases:** "deck", "slides", "presentation", "pitch", "proposal", "company profile", "strategy deck"

**Output goes to:** `Clients/[ClientName]/Decks/`

---

### `/bubu-market-research` — Market Research
Deep, citation-backed marketing research on a brand, campaign, competitor, or market — built for a cultural-intelligence lens. Goes beyond the obvious: brand timeline, cultural positioning, competitive benchmarking, public reception, and a "Bubu Match" fit check. Asks clarifying questions before diving in.

**Trigger phrases:** "research [brand]", "marketing analysis", "teardown", "riset brand", "analisa brand", "competitive deep-dive"

**Output goes to:** `Clients/[ClientName]/Research/`

---

### `/markitdown` — File → Markdown
Converts any uploaded file to clean, structured Markdown before Claude works with it. Runs automatically in the background — whenever you attach a file (PDF, Word, PowerPoint, Excel, image, audio, ZIP, YouTube URL), it converts it first then continues with your request. Nothing needs to be installed on your computer.

**This runs automatically** — you don't need to call it. Just attach a file and it kicks in.

---

## Folder Structure

```
BUBU/
│
├── bubu-toolkit/              Source code for the BUBU plugin
│   ├── skills/
│   │   ├── bubu-mom/          MOM skill — SKILL.md, scripts, examples, references
│   │   ├── bubu-admin-docs/   Admin Docs skill — SKILL.md, scripts, examples
│   │   ├── bubu-presentation/ Presentation skill — SKILL.md, assets, fonts
│   │   ├── bubu-market-research/ Market Research skill — SKILL.md, references
│   │   └── markitdown/        MarkItDown skill — SKILL.md
│   └── hooks/                 The auto-convert hook (fires on every file upload)
│
├── bubu-toolkit.plugin        The installable plugin file — this is what you install
│
├── BUBU_Assets/               Shared brand assets and reference files
│   ├── Brand/                 BUBU logo files (PNG, various variants)
│   ├── Context/               Company overview, personal profile, cultural map
│   ├── Templates/             Reusable branded templates (Presentation, Invoice, SOP, Letter)
│   └── Reference/             Advertising Masterclass and other reference docs
│
├── Clients/                   All generated outputs, organized by client
│   └── [ClientName]/
│       ├── MOM/               Minutes of meeting files
│       ├── Decks/             Presentation files
│       ├── Documents/         Admin docs (letters, invoices, SOPs)
│       └── Research/          Market research reports
│                              (folders are only created when there are actual files)
│
├── MOM/
│   └── scripts/               generate-mom.sh and mom-formatter.js (used by the MOM skill)
│
├── gstack/                    gstack submodule — 23+ general skills (auto-updates)
├── Base/                      Claude Code base configuration and Higgsfield skills
├── bubu-toolkit.plugin        Installable plugin bundle
├── setup.sh                   Run once after cloning to initialize everything
└── README.md                  This file
```

---

## Where Outputs Go

Every file generated by a skill should be saved inside `Clients/`:

```
Clients/
├── Internal/           For BUBU internal meetings and documents
│   └── MOM/
│       └── BUBU_Internal_MOM_WeeklySync_2026-07-01.pdf
└── MyPertamina/        For a client named MyPertamina
    ├── MOM/
    │   └── MyPertamina_MOM_2026-07-01.pdf
    └── Decks/
        └── MyPertamina_Deck_CampaignProposal.pptx
```

**Naming convention:** `[ClientName]_[OutputType]_[Description]_[Date].[ext]`

Sub-folders are only created when there are actual files in them — don't create empty folders.

---

## Getting Updates

When someone on the team updates a skill or adds a new file:

```bash
git pull
```

Everyone's workspace syncs. The `bubu-toolkit.plugin` file will also be updated — reinstall it in Claude Code after pulling if the plugin was changed.

To also update gstack to the latest version:

```bash
git submodule update --remote
```

---

## Editing a Skill or Adding a New One

Skills live in `bubu-toolkit/skills/`. Each skill is a folder with at minimum a `SKILL.md` file.

**To edit an existing skill:**
1. Open the relevant `bubu-toolkit/skills/[skill-name]/SKILL.md`
2. Make your changes
3. Rebuild the plugin: from inside `bubu-toolkit/`, run:
   ```bash
   cd bubu-toolkit
   zip -r ../bubu-toolkit.plugin . --exclude "*.DS_Store"
   ```
4. Commit and push — the whole team gets the update on `git pull`

**To add a new skill:**
1. Create a new folder inside `bubu-toolkit/skills/[your-skill-name]/`
2. Add a `SKILL.md` following the same format as the existing skills
3. Rebuild the plugin (same zip command above)
4. Commit and push

---

## Troubleshooting

**Skills not showing up after install?**
Restart Claude Code after installing `bubu-toolkit.plugin`.

**gstack setup fails?**
Make sure Bun is installed: `bun --version`. If not found, run the install command above and restart your terminal.

**`.claude/settings.local.json` path errors?**
This file contains absolute paths specific to the machine that last edited it. If you see path errors, open `.claude/settings.local.json` and update the paths to match your local clone location.

**File not converting automatically?**
The auto-convert hook requires the plugin to be installed. If you attached a file and it wasn't converted, type "markitdown this first" to trigger it manually.
