---
name: bubu-admin-docs
description: >
  Create any BUBU administrative document as a polished, on-brand .docx that
  looks exactly like the BUBU house style (same visual system as the BUBU MOM
  skill). Use this WHENEVER you produce an administrative or official document
  for BUBU — official letters (surat resmi), memos, announcements (pengumuman),
  cover letters (surat pengantar), proposals, quotations (penawaran), invoices,
  receipts (kwitansi), SOPs, internal policies, berita acara, approval forms,
  and any other admin paperwork. Trigger on "surat", "memo", "invoice",
  "penawaran", "proposal", "SOP", "kebijakan", "berita acara", "formulir",
  "official document", "buatkan surat", "bikin invoice", or any request to make
  an administration-related document for BUBU. ALWAYS use this for BUBU admin
  documents instead of writing a plain document, so every BUBU document is
  consistent: vivid orange #FF5900, Bebas Neue headings, Arial body, the
  BUBU.COM logo header band, uniform spacing, and the 30-years footer.
license: Proprietary — BUBU internal use.
---

# BUBU Administrative Documents

Produce **any** BUBU administrative document with one consistent look. This skill
shares the exact BUBU visual system used by the BUBU MOM skill, so a letter, an
invoice, and an SOP all look like they came from the same company.

The look is produced by a bundled script from structured JSON, so the styling is
identical every time — you supply the content as a list of **blocks**, the script
renders the branded `.docx` with Bebas Neue embedded (so it displays correctly on
any computer).

> Output is **.docx only** (editable). No PDF is produced.

## When to use

Any administrative / official BUBU document, for example: surat resmi, memo,
pengumuman, surat pengantar, proposal, penawaran/quotation, invoice, kwitansi,
SOP, kebijakan internal, berita acara, formulir persetujuan. If it's BUBU
paperwork, build it here rather than as a plain document, so the house style holds.

## Workflow

1. **Identify the document type** (`doc_type`) — e.g. "Surat Resmi", "Memo",
   "Invoice", "Proposal", "SOP", "Berita Acara". This becomes the orange band title.

2. **Detect the language and commit to ONE.** Write everything in Bahasa Indonesia
   OR English (don't mix). Set `language` to `"id"` or `"en"` so the signature
   block labels print in that one language (e.g. "Tanggal:" vs "Date:").

3. **Gather the metadata** (`meta`) — the document's logistics as label/value pairs
   (Nomor, Tanggal, Perihal, Kepada, Dari, Lampiran, Jatuh Tempo, Version, Owner,
   etc.). Only include pairs that apply to this document type.

4. **Write the body as blocks** following `references/data_schema.md`. Mix and match:
   `heading`, `paragraph`, `bullets`, `numbered`, `table` (with optional `totals`
   for invoices/quotations), `highlight` (callout), and `signatures`.

5. **Get names and titles right.** For BUBU people (signatories, senders), use their
   exact role title from `references/AboutBUBU.md` (company profile + org structure).
   Don't guess.

6. **Run the generator:**
   ```bash
   python3 scripts/generate_doc.py doc_data.json --root "/path/to/BUBU"
   ```
   With `--root`, it auto-files to **`BUBU/Administration/<DocType>/<Title> - <date>.docx`**.
   Or pass an explicit path: `python3 scripts/generate_doc.py doc_data.json "/some/path/My Letter"`.

7. **Verify, then deliver.** Render page 1 to an image to check the brand band, logo,
   tables, and spacing, then present the `.docx` to the user.

## House style (handled by the script — don't re-implement)

- Vivid **BUBU orange `#FF5900`**, near-black ink, warm light fills.
- **Bebas Neue** display headings (bundled + embedded), Arial body.
- BUBU.COM logo header band with the `doc_type` as the title; optional `subtitle`.
- Section headings: orange square + underline, with **uniform spacing** before/after.
- Footer: 30-years tagline, confidentiality label, page numbers.
- Tables: dark header, zebra rows, right-aligned number columns, orange Total.
- Signature blocks for approvals/sign-off, kept together (never split).

## How to write well (BUBU voice)

**Red flags to avoid (non-negotiable):**

- Don't use jargon.
- Don't sound like an AI.
- Don't use buzzwords or filler.
- Avoid passive voice.
- Be conversational, not robotic.

Plus: write plainly so a junior staffer understands it; match the document's
formality (a surat resmi is more formal than an internal memo); never invent
numbers, names, dates, or legal terms — mark anything unknown as `TBC`.

## Reference & assets

- `references/data_schema.md` — the full block schema. **Read before writing the JSON.**
- `references/AboutBUBU.md` — BUBU company profile + org structure (names → roles).
- `examples/letter_id.json`, `examples/invoice_id.json`, `examples/sop_en.json` —
  worked examples (and their generated `.docx`).
- `assets/bubu_logo.png`, `assets/fonts/BebasNeue-Regular.ttf` — brand assets.
