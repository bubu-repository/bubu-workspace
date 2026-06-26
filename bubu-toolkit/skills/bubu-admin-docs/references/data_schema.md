# BUBU admin document schema (`doc_data.json`)

A single JSON object. Top-level fields describe the document; `body` is a list of
content **blocks**. Only `doc_type` is really needed; everything else is optional.

## Top-level fields

| Field | Type | Notes |
|-------|------|-------|
| `doc_type` | string | The document type, shown as the orange band title (e.g. `"Surat Resmi"`, `"Invoice"`, `"SOP"`, `"Memo"`, `"Berita Acara"`). |
| `subtitle` | string | Optional one-line subtitle under the title (e.g. the specific topic or document number). |
| `language` | `"id"` \| `"en"` | The document's single language. Drives signature labels ("Tanggal:" vs "Date:"). Default `"en"`. |
| `tag` | string | Optional small text top-right of the header. Defaults to the `confidentiality` value. |
| `confidentiality` | string | Footer label (e.g. `"Internal"`, `"Confidential"`). Default `"Internal"`. |
| `date_iso` | string | `YYYY-MM-DD`, used only for the auto-generated filename. |
| `title` | string | Used for the auto-filename if set (else `doc_type`). |
| `prepared_by` | string | Document author (metadata). |
| `meta` | array | Label/value pairs for the metadata grid (see below). |
| `body` | array | The content blocks (see below). |

## `meta` — array of {label, value}

Rendered as a two-column grid under the header. Include only what applies:

```json
"meta": [
  {"label": "Nomor", "value": "001/BUBU/VI/2026"},
  {"label": "Tanggal", "value": "26 Juni 2026"},
  {"label": "Perihal", "value": "..."},
  {"label": "Kepada", "value": "..."},
  {"label": "Dari", "value": "..."}
]
```

## `body` — array of blocks

Each block is an object with a `type`. A plain string is treated as a paragraph.

### `heading`
```json
{ "type": "heading", "text": "Detail Pelaksanaan" }
```
Orange square + underline section header, with uniform spacing.

### `paragraph`
```json
{ "type": "paragraph", "text": "Dengan hormat,\nIsi paragraf..." }
```
Use `\n` to split into multiple paragraphs.

### `bullets` / `numbered`
```json
{ "type": "bullets",  "items": ["Poin satu", "Poin dua"] }
{ "type": "numbered", "items": ["Langkah satu", "Langkah dua"] }
```

### `table` (also for invoices/quotations)
```json
{
  "type": "table",
  "columns": ["No", "Deskripsi", "Qty", "Harga Satuan", "Jumlah"],
  "align_right": [2, 3, 4],
  "rows": [
    ["1", "Brand strategy", "1", "Rp 120.000.000", "Rp 120.000.000"]
  ],
  "totals": [
    ["Subtotal", "Rp 265.000.000"],
    ["PPN 11%", "Rp 29.150.000"],
    ["Total", "Rp 294.150.000"]
  ]
}
```
- `align_right` — column indices (0-based) rendered right-aligned (for numbers).
- `totals` — optional right-aligned summary under the table; the **last row is bold**
  and the value prints in orange (use it for the grand total).
- If the first column is `"No"`/`"#"`, it's auto-sized narrow.

### `highlight`
```json
{ "type": "highlight", "text": "Catatan penting yang perlu ditonjolkan." }
```
Shaded callout box with an orange accent bar and italic text. Use sparingly.

### `signatures`
```json
{
  "type": "signatures",
  "label": "Hormat kami",
  "intro": "Disetujui oleh:",
  "approvers": [
    {"name": "Pungkas Riandika", "role": "Cultural Intelligence Officer", "organization": "BUBU"},
    {"name": "", "role": "", "organization": "Client Co."}
  ]
}
```
- `label` — the section heading (defaults to "Approval"/"Persetujuan" by language).
- Leave `name` empty (`""`) to print a blank signature line to sign by hand.
- Renders a signature line, name, role/org, and a date line per signatory (2 per row),
  kept together so it never splits across pages.

### `spacer`
```json
{ "type": "spacer", "size": 8 }
```
Adds vertical space (points). Rarely needed — spacing is handled automatically.

## Minimal example

```json
{
  "doc_type": "Memo",
  "language": "id",
  "meta": [{"label": "Tanggal", "value": "26 Juni 2026"}, {"label": "Perihal", "value": "Pengingat"}],
  "body": [
    {"type": "paragraph", "text": "Mohon lengkapi laporan mingguan sebelum Jumat."},
    {"type": "signatures", "approvers": [{"name": "Ika Handini", "role": "GA Manager", "organization": "BUBU"}]}
  ]
}
```
