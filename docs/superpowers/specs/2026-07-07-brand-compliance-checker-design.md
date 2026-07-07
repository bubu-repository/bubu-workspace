# Brand Compliance Checker for `bubu-presentation` — Design

**Date:** 2026-07-07
**Status:** Approved by user, pending implementation plan

## Problem

The BUBU presentation design system already exists in full: `BRAND` tokens (colors,
fonts, dimensions) in `bubu-toolkit/skills/bubu-presentation/assets/bubu-theme.js`,
documented in `assets/design-spec.md`, with 21 ready-made layouts. The skill's own
`SKILL.md` already instructs every deck to be built with `bubu-theme.js` and lists
explicit "Don'ts" against off-brand colors, fonts, and decoration.

That enforcement today is entirely written instruction. Nothing checks the actual
`.pptx` file that comes out of a build against the token whitelist. A build script
that hardcodes a stray color or font, or a hand-edit after the fact, can slip through
the existing QA step (which only checks layout defects: overflow, overlap, footer
collisions) without ever being caught. The user wants a hard guarantee: every deck
produced through this skill actually matches the design system, not just an
instruction to try to match it.

## Goal

Add a deterministic, automated gate that inspects a built `.pptx` and fails loudly if
it deviates from the locked `BRAND` tokens, and wire that gate into the skill's
required workflow so it cannot be skipped.

## Non-goals

- Not rebuilding or changing the design system itself (tokens, layouts, logo, texture
  stay as they are).
- Not validating layout/spacing defects — that's the existing visual-QA-by-subagent
  step and stays separate.
- Not enforcing this outside the `bubu-presentation` skill (e.g. no change to the
  global `~/.claude/CLAUDE.md`) — BUBU-specific rules live in this workspace's own
  `CLAUDE.md` per existing convention.

## Design

### 1. New script: `check_brand_compliance.py`

Location: `bubu-toolkit/skills/bubu-presentation/assets/check_brand_compliance.py`,
alongside the existing `embed_fonts.py` (same convention: pure Python, stdlib only —
`zipfile`, `re` — no new dependency, matching how `embed_fonts.py` is already built).

**Input:** path to a built `.pptx`.

**Steps:**
1. Open the `.pptx` as a zip. Read every `ppt/slides/slide*.xml` — the actual
   rendered slide content (not slide masters/layouts/theme, which may carry unused
   PowerPoint default scheme colors that are never shown).
2. Extract every color via `srgbClr val="([0-9A-Fa-f]{6})"` and every font via
   `typeface="([^"]+)"`, per slide.
3. Compare against a hardcoded whitelist mirrored from `BRAND` in `bubu-theme.js`:
   - Colors: `FF5E00`, `F15A24`, `F06622`, `111111`, `000000`, `FFFFFF`, `666666`,
     `434343`, `8A8A8A`, `B7B7B7`, `CCCCCC`, `E4E4E4`, `F3F3F3`, `1C1C1C`
   - Fonts: `Bebas Neue`, `Poppins`, `Comfortaa`
   - The whitelist is duplicated here rather than read live from `bubu-theme.js`,
     following the same pattern `embed_fonts.py` already uses for its `FONT_MAP`. A
     comment in the script points back to `bubu-theme.js` / `design-spec.md` as the
     source of truth, so both are updated together if tokens ever change.
4. Read `ppt/presentation.xml` and confirm it contains `<p:embeddedFontLst>` (proof
   `embed_fonts.py` was run — without it Bebas Neue may not render on other machines).
5. Print a report:
   - `PASS` — no unexpected colors/fonts, fonts embedded.
   - `FAIL` — lists each unexpected color/font with the slide number(s) it appears
     on, and whether font embedding is missing.
6. Exit code `0` on PASS, `1` on FAIL — so it can gate a workflow, not just inform.

**Usage:** `python check_brand_compliance.py deck.pptx`

### 2. Workflow integration (the actual enforcement)

`SKILL.md` changes:
- **Workflow step 5** ("QA"): run the compliance checker *before* the visual-QA
  subagent step — it's fast and deterministic, so catch token drift early, then spend
  the more expensive visual QA pass only on a deck that's already brand-correct.
  Order becomes: build → `embed_fonts.py` → `check_brand_compliance.py` (must PASS) →
  visual QA subagent (layout defects) → save.
- **"QA (required)" section**: add the compliance-check command next to the existing
  `soffice.py` / `pdftoppm` commands, marked as a required step, not optional.
- **"Don'ts" section**: add — a deck is not finished if the compliance checker
  reports FAIL. Fix the build script (the likely cause is a hardcoded color/font that
  bypassed a `T.*` theme function) and rebuild; never hand-patch the output XML to
  force a pass.

`CLAUDE.md` (workspace root) changes:
- **Section 2 (Skill Routing)**: add one line noting that every deck produced via
  `/bubu-presentation` must pass the brand compliance check before being handed to
  the user — the gate lives inside the skill's own workflow, it is not a separate
  request the user has to make.

### 3. Testing

- Run the checker against the existing canonical reference,
  `assets/bubu-template.pptx` — expected result: `PASS`. This is the regression
  check that the whitelist doesn't false-positive against real, correct BUBU output.
- Create a throwaway copy of a built deck, inject one off-brand color (e.g. a shape
  fill of `FF0000`) and one off-brand font (e.g. `Arial`) directly into its slide
  XML, run the checker, and confirm it reports `FAIL` and correctly names the
  offending color/font and slide number. Delete the throwaway file afterward — it is
  not a permanent fixture.

## Open questions

None — scope is fully bounded to one new script plus two documentation edits.
