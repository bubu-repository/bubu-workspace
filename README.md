# BUBU Workspace

The shared Claude Code workspace for [BUBU](https://bubu.com) — Indonesia's Cultural Intelligence Agency. Clone this repo once and every skill, template, and tool the team uses is ready to go.

---

## What's in here?

This repo is the **single source of truth** for how BUBU uses Claude Code. It contains:

- **bubu-toolkit** — a plugin with 6 skills that do BUBU-specific work (MOM, Admin Docs, Presentations, Market Research, file conversion, and self-improvement)
- **gstack** — 23+ general-purpose workflow skills (design review, QA, browser automation, etc.)
- **01_BUBU_CULTURAL_AGENCY** — brand DNA, knowledge, visual assets, and all client outputs
- **02_LABX_CORE** — the LabX brand system (master decks, art direction, strategic formulas)
- **03_FABLE_ORCHESTRATOR** — system blueprints, local configs (incl. MOM scripts), and the gstack submodule

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

**Output goes to:** `01_BUBU_CULTURAL_AGENCY/05_Client_Presentations_and_Decks/[ClientName]/MOM/` or `01_BUBU_CULTURAL_AGENCY/05_Client_Presentations_and_Decks/Internal/MOM/`

---

### `/bubu-admin-docs` — Admin Documents
Generates any BUBU administrative document as a branded `.docx` — official letters, memos, invoices, quotations (penawaran), SOPs, proposals, berita acara, approval forms. Same BUBU visual system as the MOM skill.

**Trigger phrases:** "buatkan surat", "bikin invoice", "buat SOP", "penawaran", "official letter", "memo"

**Output goes to:** `01_BUBU_CULTURAL_AGENCY/05_Client_Presentations_and_Decks/[ClientName]/Documents/` or wherever makes sense for the client

---

### `/bubu-presentation` — Branded Decks
Creates on-brand BUBU strategy and campaign decks as `.pptx` — with the BUBU visual system locked in (orange #FF5900, Bebas Neue headlines, Poppins body, the orange B logo). Fonts are embedded into the file so they render correctly on any computer.

**Trigger phrases:** "deck", "slides", "presentation", "pitch", "proposal", "company profile", "strategy deck"

**Output goes to:** `01_BUBU_CULTURAL_AGENCY/05_Client_Presentations_and_Decks/[ClientName]/Decks/`

---

### `/bubu-market-research` — Market Research
Deep, citation-backed marketing research on a brand, campaign, competitor, or market — built for a cultural-intelligence lens. Goes beyond the obvious: brand timeline, cultural positioning, competitive benchmarking, public reception, and a "Bubu Match" fit check. Asks clarifying questions before diving in.

**Trigger phrases:** "research [brand]", "marketing analysis", "teardown", "riset brand", "analisa brand", "competitive deep-dive"

**Output goes to:** `01_BUBU_CULTURAL_AGENCY/05_Client_Presentations_and_Decks/[ClientName]/Research/`

---

### `/markitdown` — File → Markdown
Converts any uploaded file to clean, structured Markdown before Claude works with it. Runs automatically in the background — whenever you attach a file (PDF, Word, PowerPoint, Excel, image, audio, ZIP, YouTube URL), it converts it first then continues with your request. Nothing needs to be installed on your computer.

**This runs automatically** — you don't need to call it. Just attach a file and it kicks in.

---

### `/bubu-upgrade` — Self-Improving Toolkit
Folds accumulated task learnings into the actual BUBU skills so the setup gets sharper over time. Every task that delivers output logs what worked, what to improve, and client preferences. Every ~10 learnings or monthly, run this skill to edit the skill files directly with the improvements, so a correction made once becomes a rule the whole team's setup follows forever.

**Trigger phrases:** "upgrade skill", "bubu makin pintar", "improve the toolkit", "review learnings", "self-improve"

**Requires:** a restart of Claude Code after skill files are updated

---

## Folder Structure

```
BUBU/
│
├── 00_GLOBAL_CORE_SYSTEMS/                  System-level directives and shared memory
│   ├── 01_System_Directives_and_Prompts/
│   ├── 02_Shared_AI_Memory_Ledger/
│   ├── 03_Global_Slop_Filters_and_Negative_Constraints/
│   └── UserGuide.md
│
├── 01_BUBU_CULTURAL_AGENCY/                 Everything BUBU-brand
│   ├── 01_Brand_DNA_and_Philosophy/         Company overview, profile, cultural map
│   │   └── Visual_Assets/                   Logo, fonts, templates, theme, reference
│   ├── 02_Subculture_Research_and_Data/     Learnings, client preferences, knowledge index
│   ├── 03_Media_and_Press_Releases/         Press release skill + media assets
│   ├── 04_Ebooks_and_Editorial_Assets/      Ebook skills + editorial assets
│   └── 05_Client_Presentations_and_Decks/   All client outputs (per client)
│       └── [ClientName]/
│           ├── MOM/ · Decks/ · Documents/ · Research/
│
├── 02_LABX_CORE/                            LabX brand system
│   ├── 01_Brand_DNA_and_Master_Decks/       Master deck + LABX_CORE_SYSTEM_CONTEXT.md
│   ├── 02_Visual_Architecture_and_Art_Direction/
│   ├── 03_Strategic_Formulas_and_Methodologies/
│   ├── 04_Experimental_Projects_and_Sprints/
│   └── 05_Outputs_and_Deliverables/
│
├── 03_FABLE_ORCHESTRATOR/                   System blueprints, configs, tooling
│   ├── 02_Local_and_Offline_Configs/mom-scripts/   generate-mom.sh, mom-formatter.js
│   └── gstack/                              gstack submodule — 23+ general skills
│
├── 04_ARCHIVES_AND_DEPRECATED/              Old drafts and legacy prompts
│
├── bubu-toolkit/              Source code for the BUBU plugin (skills + hooks)
├── bubu-toolkit.plugin        The installable plugin file — this is what you install
├── setup.sh                   Run once after cloning to initialize everything
└── README.md                  This file
```

---

## Where Outputs Go

Every file generated by a skill should be saved inside `01_BUBU_CULTURAL_AGENCY/05_Client_Presentations_and_Decks/`:

```
01_BUBU_CULTURAL_AGENCY/05_Client_Presentations_and_Decks/
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

**Auto-pull is enabled by default.** Every time you open Claude Code, the workspace automatically syncs with GitHub main. You will see a git pull notification (silent, doesn't interrupt your work).

**If you modify `bubu-toolkit.plugin` locally:** after a pull, restart Claude Code to reload the plugin. If you see skill warnings or old behavior, reinstall `bubu-toolkit.plugin` (Plugins panel → Uninstall → Install from file → select `bubu-toolkit.plugin`).

To manually pull updates (rarely needed):

```bash
git pull
```

To also update gstack to the latest version:

```bash
git submodule update --remote
```

---

## Editing a Skill or Adding a New One

Skills live in `bubu-toolkit/skills/`. Each skill is a folder with at minimum a `SKILL.md` file.

**Skills auto-discover:** When you add or edit a skill in `bubu-toolkit/skills/[skill-name]/SKILL.md`, Claude Code automatically discovers it on the next session restart or plugin reload. No plugin rebuild or reinstall needed.

**To edit an existing skill:**
1. Open the relevant `bubu-toolkit/skills/[skill-name]/SKILL.md`
2. Make your changes
3. Commit and push — the whole team gets the update on `git pull`

**To add a new skill:**
1. Create a new folder inside `bubu-toolkit/skills/[your-skill-name]/`
2. Add a `SKILL.md` following the same format as the existing skills
3. Commit and push
4. Team members pull and restart Claude Code — the new skill auto-discovers

**Note:** `bubu-toolkit.plugin` never needs rebuilding. The binary stays as-is; skills are auto-discovered at runtime. The `zip` command is archived in `scripts/rebuild-plugin.sh` only for historical reference.

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
