# BUBU Workspace — Standing Instructions

These instructions apply to every session in this workspace.

---

## 1. Toolkit Check (do this at the start of every session)

Check whether the BUBU Toolkit is installed by verifying that the skill `/bubu-mom` is available.

**If the toolkit is NOT installed**, immediately tell the user:

> "bubu-toolkit belum terinstall. Install dulu: buka **bubu-toolkit.plugin** di folder BUBU ini, lalu klik Install di Claude Code. Setelah itu restart session dan kita bisa mulai."

Do not proceed with any BUBU-specific task until the toolkit is installed.

**If the toolkit IS installed**, proceed normally — all 5 skills below are active and ready.

---

## 2. Skill Routing — Use the Right Skill for the Right Task

Always use the appropriate bubu-toolkit skill instead of doing the work freehand. These skills produce on-brand, consistent BUBU output automatically.

| When the user asks for… | Use this skill |
|---|---|
| Minutes of meeting, MOM, notulen, meeting recap, "write up this meeting" | `/bubu-mom` |
| Surat resmi, invoice, penawaran, SOP, memo, proposal, admin document | `/bubu-admin-docs` |
| Deck, slides, presentation, pitch, company profile, campaign plan | `/bubu-presentation` |
| Brand research, market analysis, competitor teardown, "riset brand" | `/bubu-market-research` |
| Any uploaded file (PDF, DOCX, PPTX, XLSX, image, audio, ZIP) | `/markitdown` first, then continue the task |

**Default rule:** if a task clearly fits one of the skills above, use it — don't ask for permission. Just invoke the skill and do the work.

---

## 3. File Upload Rule

Whenever the user attaches or uploads a file in any format, **always convert it to Markdown using `/markitdown` before reading or acting on its contents**. This is a standing rule — the hook in the toolkit enforces it, but apply it manually if needed.

Exception: skip conversion if the file is already `.md` or plain `.txt` with no structure to recover.

---

## 4. Output Convention

All generated files must be saved inside the `Clients/` folder following this structure:

```
Clients/[ClientName]/[OutputType]/[FileName]
```

- **ClientName**: the company or person the work is for. Use `Internal` for BUBU's own internal work.
- **OutputType**: `MOM`, `Decks`, `Documents`, `Research` — only create the folder when there's an actual file to put in it.
- **FileName format**: `[ClientName]_[OutputType]_[Description]_[YYYY-MM-DD].[ext]`

Example: `Clients/MyPertamina/MOM/MyPertamina_MOM_KickoffMeeting_2026-07-01.pdf`

---

## 5. BUBU Company Context

BUBU (bubu.com) is a **Cultural Intelligence Agency** based in Jakarta — 30 years of turning culture into brands, products, and experiences. When generating any output, the tone should match BUBU's voice: confident, culturally grounded, not corporate-generic. The tagline is *"It's not about visibility. It's about relevance."*

For full company context (team, clients, positioning, sub-brands), read:
- `BUBU_Assets/Context/BUBU_Context_CompanyOverview.md`
- `BUBU_Assets/Context/BUBU_Context_PersonalProfile.md`

Read these before producing any output that needs to represent BUBU — MOM attendee titles, document headers, company descriptions, etc.
