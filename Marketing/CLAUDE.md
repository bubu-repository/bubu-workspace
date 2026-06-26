# CLAUDE.md — BUBU Marketing Workspace

This is the marketing team workspace for **BUBU** (BUBU.com), a Cultural Intelligence Agency. This file governs how Claude works in this folder.

## Golden rules

1. **Brand context is mandatory.** Before producing any output, load `_Context/AboutBUBU.md`. Load other `_Context/` files when directly relevant to the task. Every deliverable must reflect BUBU's brand voice, positioning, and cultural-intelligence framing.
2. **Save outputs to the right folder** (see Folder map below). Never leave final deliverables in a temp/scratch location.
3. **Frame everything through cultural relevance**, not just reach or impressions — BUBU is not a traditional ad agency.

## Folder map

| Folder | Purpose |
|--------|---------|
| `_Context/` | Brand foundation. **Read-first** source of truth. Do not treat as an output destination. |
| `_Templates/` | Reusable templates. Use these as the starting structure for matching deliverables. |
| `_SOP/` | Standard operating procedures and process docs. |
| `Ads/` | Finished ad creative and copy. |
| `Presentations/` | Finished decks and pitch presentations. |
| `Reports/` | Finished reports and analyses. |
| `Research/` | Research, teardowns, trend/audience intelligence. |
| `Social/` | Finished social content and calendars. |

Route every finished output to the folder matching its type. When a template exists in `_Templates/` for the deliverable, start from it.

## Brand essentials (summary — always confirm against `_Context/AboutBUBU.md`)

- **What BUBU is:** Cultural Intelligence Agency under Cultural Continuum Co. Founded 1996, HQ Jakarta, expanding to Dubai. Tagline spirit: *"It's not about visibility. It's about relevance."*
- **The edge:** Culture · Data · Creativity · Technology (AI & Web3).
- **Brand-to-Culture framework:** Belief → Signal → Moment → Movement → Legacy.
- **Audience:** Indonesia-first but globally ambitious — balance local cultural nuance with international appeal.
- **Emphasis:** Community, movement, and legacy over one-time campaigns.
- **Sub-brands matter:** Identify which unit a task belongs to (e.g. LabX for collaborations, BUBU Gaming for esports, Kisah Visual for AI-forward content) and adapt accordingly.

## Building skills and agents for this project

These conventions keep reusable assets consistent and conflict-free:

- **Keep skills brand-agnostic.** A skill defines workflow and process only. Never bake in brand-specific details. Skills must pull brand context from `_Context/` at runtime so they stay consistent and reusable across brands.
- **Keep agents brand-agnostic.** Never hardcode brand-specific details into agent files. Agents pull brand context at runtime.
- **One clear role per agent.** Give each agent a distinct, non-overlapping responsibility to avoid conflicts.

## Working defaults

- Match the deliverable file type to the request (`.docx`, `.pptx`, `.xlsx`, `.pdf`, `.md`) and use the relevant skill for that format.
- For BUBU meeting write-ups, use the `bubu-mom` skill rather than free-form prose.
- When in doubt about scope, audience, or format, ask before producing the full deliverable.
