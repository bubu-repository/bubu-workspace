---
name: bubu-presentation
description: >-
  Create on-brand BUBU strategy and campaign presentation decks (.pptx). Use this
  ANY time the user wants a BUBU deck, slides, pitch, proposal, or presentation —
  whether they say "deck", "slides", "presentation", "pitch", "proposal",
  "company profile", "campaign plan", "strategy deck", or just "put this in a
  BUBU presentation". This is the default for BUBU presentations: it extends the
  base pptx skill but locks every slide to the BUBU visual system (vivid orange
  #FF5E00 on black/white, Bebas Neue display headlines, Poppins body, the orange B
  logo and BUBU.COM wordmark, subtle +/× and circle background texture) and the
  BUBU voice ("It's not about visibility. It's about relevance."). It embeds the
  brand fonts INTO the file so they are always available — including Bebas Neue.
  Trigger it even when the user doesn't say "branded" — if BUBU needs a deck, use
  this rather than building slides from scratch. Do NOT use for non-BUBU decks.
license: Proprietary — BUBU / Cultural Continuum Co.
---

# BUBU Presentation

Build BUBU strategy & campaign decks that look like they came straight out of the
**BUBU Company Profile 2026**. This is a branded extension of the base **pptx** skill:
it owns the BUBU *look, fonts, logo and story*; the pptx skill owns the *mechanics*
(render-to-image, visual QA, packing). Read the pptx skill's `SKILL.md` for those
commands and lean on it.

## What's in here
```
bubu-presentation/
├── SKILL.md
├── assets/
│   ├── bubu-theme.js     ← THE ENGINE: BRAND tokens + 21 layout functions + logo + texture
│   ├── embed_fonts.py    ← embeds the brand fonts INTO the .pptx (run after building)
│   ├── build_template.js ← worked example that builds the reference deck
│   ├── bubu-template.pptx← rendered reference deck (21 layouts, fonts embedded)
│   ├── design-spec.md    ← exact hex / fonts / sizes / spacing
│   ├── fonts/            ← Bebas Neue, Poppins (R/B/I/BI), Comfortaa  (TTF, for embedding + QA)
│   ├── logo/             ← bubu-mark.png + BUBU.COM wordmark (black / white)
│   └── reference/        ← PNG of each layout (01-cover … 21-closing)
└── references/
    └── layouts.md        ← every layout: when to use + code example
```

**Always build with `bubu-theme.js`** — it locks colors, fonts, spacing, the logo, the
background texture and footers. Read `references/layouts.md` for the catalog and
`assets/design-spec.md` for token values. Keep `bubu-theme.js` together with its
sibling `logo/` and `fonts/` folders — the logo paths resolve relative to the theme file.

## Workflow
1. **Get the content and the story.** Gather the substance first (campaign facts,
   results, client, audience, argument). For deeper brand facts (sub-brands, clients,
   milestones) read the workspace `_Context/AboutBUBU.md`.
2. **Outline the narrative, then map layouts to it.** Vary layouts to fit each beat —
   never repeat one back-to-back. 21 layouts are in `references/layouts.md`.
3. **Ask about output before building anything.** After outlining the narrative (steps 1–2),
   STOP and use AskUserQuestion to ask the user what they want. Do NOT build the .pptx
   until the user confirms. Use this exact question structure:

   - Question: "Outline deck sudah siap. Mau langsung dibuatkan file .pptx-nya?"
   - Options:
     - "Ya, build .pptx sekarang" — proceed to build the full branded deck
     - "Tampilkan outline dulu" — show the slide-by-slide outline in chat first, no file
     - "Mau review outline dulu baru build" — show outline and wait for approval before building
     - (always include the "Other" free-text option automatically provided by the system)

   Only proceed to steps 4–6 if the user selects a build option.
   If the user selects "Tampilkan outline dulu" or "Mau review outline dulu baru build",
   present the full slide outline as structured Markdown (slide number, layout name, headline,
   key content per slide), then wait for the user's go-ahead before building.

4. **Build** with the theme, then **embed fonts** (next section).
5. **QA** with the pptx skill (render + subagent). Fix real defects, then stop.
6. **Save** the `.pptx` to the workspace `Presentations/` folder unless told otherwise.

## Building a deck
Copy the whole `assets/` directory next to your build script so `logo/` and `fonts/`
travel with the theme:
```bash
cp -r <skill>/assets ./bubu_assets
npm install pptxgenjs           # if not already present
```
```js
// build_deck.js  — require the theme from the copied assets
const T = require('./bubu_assets/bubu-theme.js');
const pptx = T.newDeck({ subject: 'Campaign Strategy — Client X' });
const DOC = 'Campaign Strategy 2026';

T.cover(pptx, { title: ['MOVE BEYOND','THE CAMPAIGN'], accentLine: 1, footerLeft: DOC });
T.statement(pptx, { lines: [{ text: 'It’s not about visibility.' }, { text: 'It’s about relevance.', hi: true }], footerLeft: DOC });
T.impactStat(pptx, { title: 'WHY IT MATTERS', stats: [{ num: '62.5', unit: 'M', label: '…' }], footerLeft: DOC });
T.caseStudy(pptx, { title: 'CLIENT X', headline: '…', body: '…', image: '/abs/photo.jpg' });
// …choose more layouts to fit the story…
T.closing(pptx, { title: ['LET’S BUILD','WHAT MATTERS.'], accentLine: 1, footerLeft: 'Cultural Continuum Co.' });

pptx.writeFile({ fileName: 'ClientX-Strategy.pptx' }).then(f => console.log('WROTE', f));
```
```bash
node build_deck.js
python ./bubu_assets/embed_fonts.py ClientX-Strategy.pptx   # ← always run this
```
Pass `footerLeft` (the deck's doc-label) per slide; the right side is always
"Cultural Intelligence Agency" automatically.

## Fonts are ALWAYS available (embedding)
The deck is written with the real BUBU fonts — **Bebas Neue** (display), **Poppins**
(body), **Comfortaa** (wordmark). `embed_fonts.py` embeds the TTFs from `assets/fonts/`
directly into the .pptx using the standard OOXML mechanism PowerPoint reads natively
(`<p:embeddedFontLst>` + `embedTrueTypeFonts="1"`). **Run it after every build** so the
deck renders correctly even on machines that don't have the fonts installed — this is
the fix for Bebas Neue going missing. For trustworthy visual QA in the sandbox, also
install the TTFs locally:
```bash
mkdir -p ~/.fonts && cp <skill>/assets/fonts/*.ttf ~/.fonts/ && fc-cache -f ~/.fonts
```

## Logo & texture
`bubu-theme.js` already places the logo and background texture for you:
- **Logo** — `cover` shows the orange B mark + headline lockup; dark slides carry the
  white BUBU.COM wordmark; dividers/quotes/closing carry a faint oversized B watermark.
  To drop the logo on a custom slide use `T._helpers.logoMark` / `logoWordmark`.
- **Texture** — subtle `+`/`×` ticks (`texTicks`), faint outline circles (`texCircles`),
  and the faint B watermark (`texMark`) are applied tastefully behind content. Keep them
  subtle; don't stack texture on dense content slides.

## Writing rules (non-negotiable for all slide copy)
- **No em-dashes (—).** Use a comma, a colon, or split into two sentences. This applies to headlines, body copy, speaker notes, and captions.
- **No AI-sounding language.** Cut: "it is worth noting", "leveraging", "actionable insights", "robust", "seamless", "synergies", "utilize", "innovative solutions". Replace every buzzword with the specific thing it describes.
- **Tone: professional and persuasive.** Every line should feel like it was written by a strategist who knows the room, not generated by a system. Declarative, confident, specific.

## Brand voice & framing (bake into the copy)
- BUBU is a *Cultural Intelligence Agency*, not a traditional ad agency. Frame through
  **cultural relevance**, not reach/impressions.
- Spirit line: *"It's not about visibility. It's about relevance."*
- Edge: Culture · Data · Creativity · Technology (AI & Web3).
- Brand-to-Culture framework: Belief → Signal → Moment → Movement → Legacy (use `iconRows`).
- Emphasis: community, movement, legacy over one-off campaigns.
- Sub-brands: LabX (collaborations), BUBU Gaming (esports), Kisah Visual (AI content),
  IDByte, BUBU Awards. Identify the relevant unit and adapt.
- Audience: Indonesia-first but globally ambitious.
- Headlines: short, bold, declarative, all-caps; let one orange word carry the punch.

## QA (required — use the pptx skill)
```bash
python <pptx-skill>/scripts/office/soffice.py --headless --convert-to pdf deck.pptx
rm -f slide-*.jpg && pdftoppm -jpeg -r 150 deck.pdf slide && ls -1 "$PWD"/slide-*.jpg
```
Run the pptx skill's **visual QA with a subagent** over the images. Check first for text
overflow, text-on-text/shape overlaps, footer collisions, and low-contrast text. Also
`extract-text deck.pptx` to confirm content and catch leftover placeholder labels
(`IMAGE`, `PHOTO`, `CAMPAIGN VISUAL`). Fix real, user-visible defects, then stop.

## Don'ts (off-brand)
- No accent stripes, color bars, sidebar stripes, or title underlines — the square +
  the texture marks are the only decoration.
- No new colors or fonts beyond the tokens in `design-spec.md`.
- Don't center body text (center only big headlines). Don't make text-only slides where
  a visual belongs. Don't repeat one layout slide after slide.
- Don't forget `embed_fonts.py` — without it, Bebas Neue may not render on the viewer's machine.
