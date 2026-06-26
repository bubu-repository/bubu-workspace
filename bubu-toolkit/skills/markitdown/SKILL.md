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

### 4. Deliver

Copy the `.md` into the user's connected folder so it persists, then present it:

```bash
cp "/sessions/<session-id>/mnt/outputs/report.md" "/sessions/<session-id>/mnt/<connected-folder>/report.md"
```

Then call `present_files` on the saved `.md`. If the user only wanted the
content used inline (e.g. "summarize this PDF"), read the generated Markdown and
continue the task — you don't always need to surface the `.md` as a deliverable.

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
