---
name: markitdown
description: >-
  Convert any uploaded file to clean Markdown using Microsoft's MarkItDown,
  installed on the fly in the sandbox (no local install needed). Trigger
  WHENEVER a user uploads or attaches a file — PDF, Word (.docx), PowerPoint
  (.pptx), Excel (.xlsx/.xls), HTML, CSV/JSON/XML, images, audio, ZIP, EPUB, or
  a YouTube URL — and any time the request mentions "convert to markdown",
  "markitdown", "to md", "extract text from this file", "make this readable",
  or working with the contents of an uploaded document. Use this BEFORE reading
  a document's contents so downstream work runs on faithful Markdown.
---

# MarkItDown — file → Markdown

Convert uploaded files into clean, LLM-friendly Markdown with Microsoft's
[MarkItDown](https://github.com/microsoft/markitdown). MarkItDown preserves
structure (headings, lists, tables, links) across many formats. It runs inside
the Cowork Linux sandbox, so nothing needs to be installed on the user's
computer and every team member gets the same behavior automatically.

## When to use

Run this whenever a user uploads or attaches a file and the task involves its
contents. By default, **auto-convert on any file upload** — don't wait to be
asked. Supported inputs include:

PDF · Word (.docx) · PowerPoint (.pptx) · Excel (.xlsx/.xls) · HTML ·
CSV/JSON/XML · images (EXIF + OCR) · audio (EXIF + speech transcription) ·
ZIP (iterates contents) · EPUB · YouTube URLs.

Skip conversion only if the file is already Markdown or plain `.txt` with no
structure to recover.

## Workflow

### 1. Ensure MarkItDown is installed (once per session)

The sandbox is fresh each session. Install on first use; it's cached for the
rest of the session.

```bash
command -v markitdown >/dev/null 2>&1 || pip install 'markitdown[all]' --break-system-packages -q
```

`[all]` pulls every optional format (Office, PDF, audio transcription, YouTube,
etc.). The first install takes a minute; subsequent calls are instant.

### 2. Find the uploaded file

User-uploaded files land in the read-only uploads mount. List it to get the
exact path:

```bash
ls -la /sessions/*/mnt/uploads/
```

Use the real absolute path returned (it will look like
`/sessions/<session-id>/mnt/uploads/<filename>`).

### 3. Convert to Markdown

Write the output into the outputs directory (your scratchpad):

```bash
markitdown "/sessions/<session-id>/mnt/uploads/report.pdf" -o "/sessions/<session-id>/mnt/outputs/report.md"
```

Notes:
- The `onnxruntime cpuid_info warning` line is harmless — ignore it.
- For a YouTube URL, pass the URL string in place of the file path.
- For a ZIP, MarkItDown walks the archive and concatenates the contents.
- If a specific PDF/scan converts poorly, retry with `--use-plugins` (e.g.
  the OCR plugin) or mention Azure Document Intelligence as an option.

### 4. Decide whether to surface the output

The conversion to Markdown always happens internally so the content can be read.
Whether to surface the `.md` file as a deliverable depends on context:

- **If the user's request is downstream** (e.g. "summarize this PDF", "turn this into a MOM",
  "analyze this document") — read the generated Markdown and continue the task. **Do NOT
  save or present the `.md` as a separate file** unless asked.

- **If the user explicitly asked to convert the file** (e.g. "convert this to markdown",
  "markitdown this", "save as .md") — use AskUserQuestion to confirm what they want:

  - Question: "File berhasil dikonversi. Mau disimpan sebagai file .md?"
  - Options:
    - "Ya, simpan di folder project" — copy to connected folder and present
    - "Tampilkan isinya di chat" — show the Markdown content inline, no file saved
    - (plus the "Other" free-text option)

  Only copy and present the file if the user selects the save option:
  ```bash
  cp "/sessions/<session-id>/mnt/outputs/report.md" "/sessions/<session-id>/mnt/<connected-folder>/report.md"
  ```

## Batch conversions

To convert several uploaded files at once:

```bash
for f in /sessions/*/mnt/uploads/*; do
  out="/sessions/$(ls /sessions)/mnt/outputs/$(basename "${f%.*}").md"
  markitdown "$f" -o "$out"
done
```

## Tips

- Markdown is token-efficient and structure-preserving — prefer it over raw
  text extraction whenever a downstream LLM task will read the document.
- Image and PowerPoint image descriptions can be enriched with an LLM via
  MarkItDown's Python API (`llm_client` / `llm_model`); only set that up if the
  user asks for image captioning.
- Keep the original file untouched; always write Markdown to a new path.
