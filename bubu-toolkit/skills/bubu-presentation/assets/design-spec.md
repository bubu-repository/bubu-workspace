# BUBU Presentation — Design Spec (v2)

Locked design tokens, extracted from the **BUBU Company Profile 2026** source deck
(fonts, colors and shapes read directly from the .pptx). These are the exact values
`bubu-theme.js` uses. Don't improvise — match this spec so every deck is unmistakably BUBU.

## Slide format
- 16:9 widescreen, 13.333 in × 7.5 in (layout `BUBU16x9`)
- Outer margin 0.6 in (content width 12.13 in); footer baseline y = 7.08 in

## Color palette (from the source deck)
| Token | Hex | Role |
|-------|-----|------|
| `orange` | `#FF5E00` | **PRIMARY** brand orange — the most-used color in the source. Headlines accent word, stat numbers, kickers, chips, axis lines, square motif. |
| `orangeDeep` | `#F15A24` | Secondary warm orange (sparingly). |
| `orange3` | `#F06622` | Tertiary warm orange. |
| `ink` | `#111111` | Headline / primary text on light. |
| `black` | `#000000` | Full-black backgrounds. |
| `white` | `#FFFFFF` | Light backgrounds / text on dark. |
| `body` | `#666666` | Body copy on light (source default). |
| `greyDark` | `#434343` | Secondary text. |
| `grey` | `#8A8A8A` | Footer / captions. |
| `greyLt` | `#B7B7B7` | Captions / body on dark. |
| `line` | `#CCCCCC` | Ticks, hairlines. |
| `lineLt` | `#E4E4E4` | Construction grid, faint circles. |
| `panel` | `#F3F3F3` | Content-block / image-placeholder tint. |
| `panelDk` | `#1C1C1C` | Block on dark. |

One orange dominates the accenting; black/white carry the structure.

## Typography (the real BUBU fonts)
The source deck's two workhorses are **Bebas Neue** (display, ~1700 uses) and
**Poppins** (body, ~4700 uses). The skill uses exactly these.

| Token | Font | Use |
|-------|------|-----|
| `display` | **Bebas Neue** | Hero headlines, section words, slide titles, big stat numbers, quote marks. Tall condensed all-caps — it's *the* BUBU headline look. |
| `head` | **Poppins** (bold) | Sub-heads, kickers, labels, case-study headlines. |
| `body` | **Poppins** | Paragraphs, bullets, captions. |
| `wordmark` | **Comfortaa** | Text fallback for BUBU.COM (the logo image is primary). |

**Fonts are embedded into every deck** via `embed_fonts.py` so they are always
available — including **Bebas Neue** — even on machines without the fonts. TTFs are
bundled in `assets/fonts/`. Always run the embed step after building.

### Type scale (Bebas reads smaller than its point size — sizes are larger than a normal sans)
| Element | Size (pt) |
|---------|-----------|
| Hero / section word | 48–76 |
| Statement / manifesto | 60 |
| Slide title | 44–52 |
| Big single stat | 230 |
| Stat number | 44–92 |
| Sub-head / kicker | 11 (Poppins bold, tracked caps, orange) |
| Body | 11.5–14 (Poppins) |
| Footer / caption | 8–10 |

## Logo (`assets/logo/`)
- `bubu-mark.png` — the orange **B** mark (with the white square notch). Use on cover and as a faint oversized watermark.
- `bubu-wordmark-black.png` / `bubu-wordmark-white.png` — the **BUBU.COM** wordmark for light / dark backgrounds.
`logoMark()` and `logoWordmark()` place these; both fall back to a drawn mark / Comfortaa text if the files are missing.

## Background texture (authentic to the source)
The source uses small `+`/`×` technical ticks, faint outline circles, and large faint
logo shapes. The theme provides three subtle helpers, applied tastefully (not on every slide):
- `texTicks` — scattered `+` and `×` marks near the edges (blueprint motif).
- `texCircles` — large faint outline circles bleeding off two corners.
- `texMark` — an oversized B watermark at ~90% transparency off a corner.
Keep texture subtle — it sits behind content and never competes with it.

## Motif & rules
- One repeating mark: a small `orange` square, top-right (~0.26 in).
- No accent stripes, sidebar bars, card edge-stripes, or title underlines.
- Footer: left = doc-label (optional, via `footerLeft`), right = `Cultural Intelligence Agency`.
- Sandwich: dark (`black`) for cover-image / statement / quote / closing; light (`white`) for content.
