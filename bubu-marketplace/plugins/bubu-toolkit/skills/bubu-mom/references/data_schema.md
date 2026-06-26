# MOM data schema (`mom_data.json`)

The generator (`scripts/generate_mom.py`) reads a single JSON object. **Every field is
optional except `meeting_title`.** Omit a section entirely and it won't render — so the
same template serves a short internal standup and a full client review.

Strings accept `\n` for line breaks where noted. Dates are free-text strings (write them
how they should appear, e.g. `"18 June 2026"`). `date_iso` is used only for auto-naming
the output file.

## Top-level fields (header + metadata block)

| Field | Type | Notes |
|-------|------|-------|
| `document_title` | string | Big title in the orange band. Default `"Minutes of Meeting"`. |
| `meeting_title` | string | **Required.** Shows in the metadata grid as "Meeting". |
| `category` | string | Meeting category, shown in the Meeting block. Pick one: `Credentials & Discovery Meeting`, `Discovery & Strategic Meeting`, `Creative & Content Production Meeting`, `Finance Administrative Meeting`, `Work in Progress (WIP) Meeting`, `Technology & Asset Meeting`. |
| `meeting_type` | `"Internal"` \| `"External"` | Sets the header tag, default confidentiality, and the auto-file folder (`Internal/` vs the company name). |
| `language` | `"id"` \| `"en"` | The document's single language. Drives the Approval signature labels ("Dokumen ini disetujui oleh:" / "Tanggal:" vs "This document is approved by:" / "Date:"). If omitted, it's guessed from the text. |
| `company` | string | Short, tidy company name used for the auto-file folder and filename (e.g. `"MyPertamina"`). Falls back to `client`/`project` if omitted. |
| `client` | string | Client/partner name (external meetings). |
| `project` | string | Project/workstream name. Used **only** for auto-filing (folder/filename); it is NOT shown in the Meeting block, to avoid repeating it next to the meeting topic. |
| `date` | string | Display date, e.g. `"18 June 2026"`. |
| `date_iso` | string | `YYYY-MM-DD`, used only for the auto-generated filename. |
| `time` | string | e.g. `"14:00 – 15:30 (GMT+8)"`. |
| `location` | string | Venue and/or platform, e.g. `"BUBU HQ / Google Meet"`. |
| `reference` | string | Internal MOM reference number. |
| `facilitator` | string | Who chaired. |
| `minute_taker` | string | Who took the minutes. |
| `prepared_by` | string | Author (also set as document author metadata). |
| `confidentiality` | string | Footer label. Defaults to `"Confidential"` (external) or `"Internal"`. |

## Content sections

### `executive_summary` — string
Exactly **one** tight paragraph (no `\n`). What happened, what was decided, what's at risk.
This is the most important field.

### `agenda` — array
List of strings (rendered as a numbered list).

### `key_points` — array
Prefer **plain one-line strings** — one decision per line:
```json
["Setiap pengguna maksimal mendapat 2 stamp per hari supaya adil."]
```
(An object form `{ "title": "...", "detail": "..." }` is still accepted, but the agreed BUBU
style is the one-liner string.)

### `discussion` — array
Each item is an object. Only `topic` + `notes` are required; the rest are optional and used
only where they help:
```json
{
  "topic": "3. Transaction Validation Framework",
  "intro": "Optional paragraph before the bullets.",
  "lead": "Optional one-line lead-in, e.g. \"Beberapa tantangan yang diidentifikasi:\"",
  "notes": ["Bullet one.", "Bullet two.", "Bullet three."],
  "highlight": "Key agreement/conclusion — rendered as a shaded callout box with an orange accent."
}
```
- `notes` may also be a single **string** for plain prose instead of bullets.
- `flow` — an array of short step labels for a process/journey, rendered as an on-brand flow
  diagram (orange boxes + arrows). Use instead of (or alongside) bullets when the point is a
  sequence. Example: `"flow": ["Transaksi di SPBU", "Sistem cek", "Buka microsite", "Stamp masuk"]`.
- `image` — absolute path to your own infographic/diagram image to embed (fits page width).
- `intro` / `lead` / `highlight` / `flow` / `image` are all optional — don't force them onto
  every point. Bullets or a short paragraph on their own are perfectly fine. Reach for
  `highlight` only when a point has one line that truly deserves spotlighting.

### `action_items` — array of objects
```json
{ "action": "What needs doing", "owner": "Name (Org)", "due": "23 Jun 2026", "status": "Open" }
```
Accepted aliases: `task`→action, `responsible`→owner, `due_date`/`deadline`→due.
`status` defaults to `"Open"` if omitted.

### `risks` — array of objects  (Risks, Blockers & Workarounds)
```json
{ "risk": "The risk or blocker", "impact": "High", "workaround": "Agreed mitigation.", "owner": "Name (Org)" }
```
Accepted aliases: `blocker`/`issue`→risk, `severity`→impact, `mitigation`/`resolution`→workaround.

### `next_steps` — array
List of strings (em-dash bullets). Forward-looking actions/checkpoints.

### `participants` — array of objects
```json
{ "name": "Full Name", "role": "Title", "organization": "BUBU" }
```
Accepted aliases: `title`→role, `org`/`company`→organization. Rendered near the top of the
document, before the Executive Summary.

### `approvals` — array of objects  (Approval signature blocks)
Rendered under an **"Approval"** heading. The block flows at the bottom of the document and is
kept together (heading + signatures); it moves to the next page as a whole only if it doesn't
fit. Label language follows the top-level `language` field.
```json
{ "name": "Full Name", "role": "Title", "organization": "BUBU" }
```
Each entry prints a signature line, the name, role/organization, and a date line. Leave
`name` as `""` to print an empty line for hand-signing (e.g. when the client signatory isn't
named yet). Typically one signatory per party. Omit the field for informal internal notes.

## Minimal example (internal standup)

```json
{
  "meeting_title": "Weekly Product Sync",
  "meeting_type": "Internal",
  "date": "19 June 2026",
  "minute_taker": "Nadia Lim",
  "executive_summary": "Team aligned on shipping the landing page first...",
  "key_points": ["Phased launch agreed: landing page first, full site later."],
  "action_items": [
    {"action": "Draft launch copy", "owner": "Sara", "due": "Fri 20 Jun", "status": "Open"}
  ],
  "risks": [
    {"risk": "Analytics not yet configured", "impact": "Medium",
     "workaround": "Use GA placeholder tag until full setup is done.", "owner": "Dev"}
  ],
  "participants": [
    {"name": "Sara", "role": "Copywriter", "organization": "BUBU"},
    {"name": "Dev", "role": "Engineer", "organization": "BUBU"}
  ]
}
```
