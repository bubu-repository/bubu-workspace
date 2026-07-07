/**
 * bubu-theme.js — BUBU branded PptxGenJS theme + layout library  (v2)
 * --------------------------------------------------------------------
 * Tokens, fonts, logo, background texture and 21 layouts locked to the
 * BUBU Company Profile 2026 source deck. Fonts: Bebas Neue (display) +
 * Poppins (body) + Comfortaa (wordmark) — embed them with embed_fonts.py
 * so they are always available.
 *
 * Keep this file together with its sibling folders `logo/` and `fonts/`
 * (logos resolve relative to this file). To build a deck, copy the whole
 * assets/ directory next to your build script.
 *
 * Usage:
 *   const T = require('./bubu-theme.js');
 *   const pptx = T.newDeck();
 *   T.cover(pptx, { title:['THE CULTURAL','INTELLIGENCE','NETWORK'], accentLine:2 });
 *   ...
 *   await pptx.writeFile({ fileName:'deck.pptx' });
 *   // then:  python embed_fonts.py deck.pptx
 */
const path = require('path');
const fs = require('fs');

// ---------- DESIGN TOKENS (locked to source deck) ----------
const BRAND = {
  color: {
    orange:   'FF5E00', // PRIMARY brand orange (most-used in source)
    orangeDeep:'F15A24', // secondary warm orange
    orange3:  'F06622', // tertiary
    ink:      '111111', // headline / primary text
    black:    '000000', // full-black backgrounds
    white:    'FFFFFF',
    body:     '666666', // body copy on light (source default)
    greyDark: '434343',
    grey:     '8A8A8A', // footer / captions
    greyLt:   'B7B7B7', // light captions / on-dark body
    line:     'CCCCCC', // hairlines, ticks, construction grid
    lineLt:   'E4E4E4',
    panel:    'F3F3F3', // content-block / image-placeholder tint
    panelDk:  '1C1C1C', // block on dark
  },
  font: {
    display:  'Bebas Neue',  // hero headlines, section words, big stat numbers, slide titles
    head:     'Poppins',     // sub-heads, kickers, labels (use bold:true)
    body:     'Poppins',     // paragraphs, bullets, captions
    wordmark: 'Comfortaa',   // text fallback for the BUBU.COM lockup
  },
  W: 13.333, H: 7.5, M: 0.6,
};
const C = BRAND.color, F = BRAND.font;
const M = BRAND.M, W = BRAND.W, H = BRAND.H;
const CW = W - 2 * M;

const LOGO = {
  mark: path.join(__dirname, 'logo', 'bubu-mark.png'),            // 195x338, orange B
  wordBlack: path.join(__dirname, 'logo', 'bubu-wordmark-black.png'), // 600x300
  wordWhite: path.join(__dirname, 'logo', 'bubu-wordmark-white.png'),
};
const MARK_AR = 338 / 195;   // height / width
const WORD_AR = 300 / 600;   // height / width
function has(p) { try { return fs.existsSync(p); } catch (e) { return false; } }

// ---------- shared helpers ----------
function newDeck(opts = {}) {
  const PptxGenJS = require('pptxgenjs');
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'BUBU16x9', width: W, height: H });
  pptx.layout = 'BUBU16x9';
  pptx.author = 'BUBU — Cultural Intelligence Agency';
  pptx.company = 'Cultural Continuum Co.';
  pptx.subject = opts.subject || 'BUBU Strategy Deck';
  return pptx;
}

// --- logo ---
// orange B mark, sized by height; falls back to a drawn B+square if image missing
function logoMark(slide, x, y, h) {
  if (has(LOGO.mark)) { slide.addImage({ path: LOGO.mark, x, y, w: h / MARK_AR, h }); return; }
  const w = h / MARK_AR;
  slide.addShape('roundRect', { x, y, w, h, rectRadius: 0.06, fill: { color: C.orange }, line: { type: 'none' } });
  slide.addText('B', { x, y, w, h, align: 'center', valign: 'middle', fontFace: F.display, fontSize: h * 60, color: C.white });
  slide.addShape('rect', { x: x + w * 0.18, y: y + h * 0.74, w: w * 0.16, h: w * 0.16, fill: { color: C.white }, line: { type: 'none' } });
}
// BUBU.COM wordmark, sized by width; white variant for dark backgrounds
function logoWordmark(slide, x, y, w, white) {
  const src = white ? LOGO.wordWhite : LOGO.wordBlack;
  if (has(src)) { slide.addImage({ path: src, x, y, w, h: w * WORD_AR }); return; }
  slide.addText([
    { text: 'BUBU', options: { fontFace: F.wordmark, bold: true, color: white ? C.white : C.ink } },
    { text: '.COM', options: { fontFace: F.wordmark, bold: true, color: C.orange } },
  ], { x, y, w, h: w * WORD_AR, align: 'left', valign: 'middle', fontSize: w * 14 });
}

// --- background texture system (subtle, brand-authentic) ---
// small "+" and "×" technical ticks, scattered deterministically near edges
function texTicks(slide, dark, accent) {
  const col = accent ? C.orange : (dark ? '3A3A3A' : C.line);
  const pts = [
    [1.1, 0.9, 'mathPlus'], [12.4, 1.4, 'mathMultiply'], [0.9, 6.4, 'mathMultiply'],
    [11.9, 6.6, 'mathPlus'], [6.6, 0.7, 'mathPlus'], [12.7, 3.9, 'mathPlus'],
  ];
  pts.forEach(([x, y, k]) => slide.addShape(k, { x, y, w: 0.16, h: 0.16,
    fill: { color: col }, line: { type: 'none' } }));
}
// large faint outline circle(s) bleeding off an edge
function texCircles(slide, dark) {
  const col = dark ? '2A2A2A' : C.lineLt;
  slide.addShape('oval', { x: W - 2.6, y: -2.0, w: 5.0, h: 5.0, fill: { type: 'none' }, line: { color: col, width: 1 } });
  slide.addShape('oval', { x: -1.8, y: H - 2.6, w: 4.2, h: 4.2, fill: { type: 'none' }, line: { color: col, width: 1 } });
}
// oversized faint B watermark off a corner
function texMark(slide, corner) {
  if (!has(LOGO.mark)) return;
  const h = 6.8, w = h / MARK_AR;
  const pos = corner === 'left'
    ? { x: -w * 0.35, y: H - h * 0.78 }
    : { x: W - w * 0.62, y: -h * 0.22 };
  slide.addImage({ path: LOGO.mark, x: pos.x, y: pos.y, w, h, transparency: 90 });
}

// small orange square motif (top-right) — the one repeating mark
function squareMotif(slide) {
  slide.addShape('rect', { x: W - M - 0.26, y: M - 0.04, w: 0.26, h: 0.26,
    fill: { color: C.orange }, line: { type: 'none' } });
}

// footer: left doc-label / right "Cultural Intelligence Agency"
function footer(slide, leftLabel, dark) {
  const col = dark ? C.greyLt : C.grey;
  if (leftLabel) slide.addText(leftLabel, { x: M, y: H - 0.42, w: CW * 0.6, h: 0.28,
    align: 'left', valign: 'middle', fontFace: F.body, fontSize: 8, color: col });
  slide.addText('Cultural Intelligence Agency', { x: M + CW * 0.4, y: H - 0.42, w: CW * 0.6, h: 0.28,
    align: 'right', valign: 'middle', fontFace: F.body, fontSize: 8, color: col });
}

function kicker(slide, text, x, y, w, color) {
  if (!text) return;
  slide.addText(text.toUpperCase(), { x, y, w: w || CW, h: 0.3, align: 'left', valign: 'middle',
    fontFace: F.head, bold: true, fontSize: 11, color: color || C.orange, charSpacing: 3 });
}

function imgBlock(slide, x, y, w, h, dark, label) {
  slide.addShape('rect', { x, y, w, h, fill: { color: dark ? C.panelDk : C.panel }, line: { type: 'none' } });
  slide.addText(label || 'IMAGE', { x, y, w, h, align: 'center', valign: 'middle',
    fontFace: F.head, bold: true, fontSize: 11, color: dark ? '5A5A5A' : C.greyLt, charSpacing: 4 });
}

// Bebas display headline — accepts string (\n) or array of lines; accentLine -> orange
function displayLines(c, dflt) {
  return Array.isArray(c.title) ? c.title : String(c.title || dflt).split('\n');
}
function runsFor(lines, accentIdx, baseColor) {
  return lines.map((ln, i) => ({ text: ln + (i < lines.length - 1 ? '\n' : ''),
    options: { color: (accentIdx === i) ? C.orange : baseColor } }));
}

// ============================================================
// LAYOUTS
// ============================================================

// 1. COVER — construction grid + orange B mark lockup + hero headline
function cover(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  const g = { color: C.lineLt, width: 0.75 };
  s.addShape('rect', { x: M, y: 0.5, w: CW, h: H - 1.0, fill: { type: 'none' }, line: g });
  s.addShape('oval', { x: 0.7, y: 0.7, w: 3.4, h: 3.4, fill: { type: 'none' }, line: g });
  s.addShape('oval', { x: W - 4.1, y: 0.7, w: 3.4, h: 3.4, fill: { type: 'none' }, line: g });
  texTicks(s, false);
  logoWordmark(s, W / 2 - 0.85, 1.35, 1.7, false);
  const lines = displayLines(c, 'CULTURAL\nINTELLIGENCE\nNETWORK');
  logoMark(s, 3.85, 2.7, 1.9);
  s.addText(runsFor(lines, c.accentLine != null ? c.accentLine : lines.length - 1, C.ink),
    { x: 5.1, y: 2.45, w: 5.4, h: 2.6, align: 'left', valign: 'middle',
      fontFace: F.display, fontSize: c.titleSize || 48, lineSpacingMultiple: 0.92 });
  footer(s, c.footerLeft || 'Company Profile 2026');
  return s;
}

// 2. COVER (image) — full-bleed image + dark scrim + headline bottom-left
function coverImage(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.black };
  if (c.image) s.addImage({ path: c.image, x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } });
  else imgBlock(s, 0, 0, W, H, true, c.imageLabel || 'FULL-BLEED IMAGE');
  s.addShape('rect', { x: 0, y: H - 4.2, w: W, h: 4.2, fill: { color: C.black, transparency: 25 }, line: { type: 'none' } });
  logoWordmark(s, M, 0.55, 1.5, true);
  squareMotif(s);
  const lines = displayLines(c, 'MOVE BEYOND\nTHE CAMPAIGN');
  s.addText(runsFor(lines, c.accentLine, C.white), { x: M, y: H - 3.0, w: CW, h: 2.0,
    fontFace: F.display, fontSize: c.titleSize || 60, valign: 'bottom', lineSpacingMultiple: 0.92 });
  footer(s, c.footerLeft, true);
  return s;
}

// 3. SECTION DIVIDER — giant word; light/dark; big faint B watermark
function sectionDivider(pptx, c = {}) {
  const dark = !!c.dark;
  const s = pptx.addSlide();
  s.background = { color: dark ? C.black : C.white };
  texMark(s, 'right');
  texTicks(s, dark);
  squareMotif(s);
  if (c.index != null) s.addText(String(c.index).padStart(2, '0'), { x: M, y: 1.1, w: 3, h: 1.6,
    fontFace: F.display, fontSize: 80, color: C.orange });
  kicker(s, c.kicker, M, c.index != null ? 2.7 : 2.4, CW * 0.7);
  s.addText(displayLines(c, 'SECTION').join('\n').toUpperCase(), { x: M, y: c.index != null ? 3.0 : 2.7,
    w: CW * 0.85, h: 2.4, fontFace: F.display, fontSize: c.titleSize || 76, color: dark ? C.white : C.ink,
    align: 'left', valign: 'top', lineSpacingMultiple: 0.9 });
  if (c.subtitle) s.addText(c.subtitle, { x: M, y: 5.3, w: CW * 0.7, h: 1.0,
    fontFace: F.body, fontSize: 14, color: dark ? C.greyLt : C.body });
  footer(s, c.footerLeft, dark);
  return s;
}

// 4. AGENDA — numbered two-column list
function agenda(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s); texTicks(s, false);
  kicker(s, c.kicker || 'Agenda', M, 0.7);
  s.addText((c.title || 'WHAT WE’LL COVER').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.95,
    fontFace: F.display, fontSize: 46, color: C.ink });
  const items = c.items || [];
  const colN = Math.ceil(items.length / 2) || 1;
  const colW = (CW - 0.6) / 2, rowH = (H - 2.9) / Math.max(colN, 1);
  items.forEach((it, i) => {
    const col = Math.floor(i / colN), row = i % colN;
    const x = M + col * (colW + 0.6), y = 2.2 + row * rowH;
    s.addText(String(i + 1).padStart(2, '0'), { x, y, w: 0.95, h: rowH, valign: 'top',
      fontFace: F.display, fontSize: 34, color: C.orange });
    s.addText([
      { text: (it.title || it) + '\n', options: { fontFace: F.head, bold: true, fontSize: 16, color: C.ink } },
      ...(it.desc ? [{ text: it.desc, options: { fontFace: F.body, fontSize: 11, color: C.body } }] : []),
    ], { x: x + 1.0, y: y + 0.05, w: colW - 1.0, h: rowH, valign: 'top' });
  });
  footer(s, c.footerLeft);
  return s;
}

// 5. STATEMENT / MANIFESTO — huge line(s) on black, ticks + faint mark
function statement(pptx, c = {}) {
  const light = !!c.light;
  const s = pptx.addSlide();
  s.background = { color: light ? C.white : C.black };
  texMark(s, 'left'); texTicks(s, !light, false);
  squareMotif(s);
  kicker(s, c.kicker, M, 1.0);
  const lines = c.lines || [{ text: 'IT’S NOT ABOUT VISIBILITY.' }, { text: 'IT’S ABOUT RELEVANCE.', hi: true }];
  const runs = lines.map((ln, i) => ({ text: ln.text.toUpperCase() + (i < lines.length - 1 ? '\n' : ''),
    options: { color: ln.hi ? C.orange : (light ? C.ink : C.white) } }));
  s.addText(runs, { x: M, y: 1.6, w: CW, h: 4.0, fontFace: F.display, fontSize: c.size || 60,
    align: 'left', valign: 'middle', lineSpacingMultiple: 0.95 });
  if (c.attribution) s.addText(c.attribution, { x: M, y: H - 1.2, w: CW, h: 0.4,
    fontFace: F.body, fontSize: 12, color: light ? C.body : C.greyLt });
  footer(s, c.footerLeft, !light);
  return s;
}

// 6. IMPACT STAT — 1–3 giant numbers
function impactStat(pptx, c = {}) {
  const dark = !!c.dark;
  const s = pptx.addSlide();
  s.background = { color: dark ? C.black : C.white };
  texCircles(s, dark); squareMotif(s);
  kicker(s, c.kicker || 'By the numbers', M, 0.75);
  if (c.title) s.addText(c.title.toUpperCase(), { x: M, y: 1.05, w: CW, h: 0.9,
    fontFace: F.display, fontSize: 40, color: dark ? C.white : C.ink });
  const stats = c.stats || [];
  const n = Math.max(stats.length, 1), gap = 0.5, colW = (CW - gap * (n - 1)) / n;
  stats.forEach((st, i) => {
    const x = M + i * (colW + gap), y = 2.6;
    s.addText([
      { text: st.num, options: { fontFace: F.display, fontSize: 92, color: C.orange } },
      ...(st.unit ? [{ text: st.unit, options: { fontFace: F.display, fontSize: 40, color: dark ? C.white : C.ink } }] : []),
    ], { x, y, w: colW, h: 1.5, align: 'left', valign: 'middle' });
    s.addText(st.label || '', { x, y: y + 1.65, w: colW, h: 1.4, align: 'left', valign: 'top',
      fontFace: F.body, fontSize: 13, color: dark ? C.greyLt : C.body });
  });
  footer(s, c.footerLeft, dark);
  return s;
}

// 7. BIG NUMBER — one giant stat dominates, supporting copy beside it
function bigNumber(pptx, c = {}) {
  const dark = !!c.dark;
  const s = pptx.addSlide();
  s.background = { color: dark ? C.black : C.white };
  texMark(s, 'right'); squareMotif(s);
  kicker(s, c.kicker, M, 0.8);
  s.addText([
    { text: (c.num || '300'), options: { fontFace: F.display, fontSize: 230, color: C.orange } },
    ...(c.unit ? [{ text: c.unit, options: { fontFace: F.display, fontSize: 96, color: dark ? C.white : C.ink } }] : []),
  ], { x: M - 0.1, y: 1.3, w: 7.4, h: 4.6, align: 'left', valign: 'middle' });
  s.addText((c.headline || '').toUpperCase(), { x: 8.2, y: 2.4, w: 4.5, h: 1.6,
    fontFace: F.display, fontSize: 30, color: dark ? C.white : C.ink, valign: 'top', lineSpacingMultiple: 0.95 });
  if (c.body) s.addText(c.body, { x: 8.2, y: 3.9, w: 4.5, h: 1.8, fontFace: F.body, fontSize: 13,
    color: dark ? C.greyLt : C.body, valign: 'top', lineSpacingMultiple: 1.1 });
  footer(s, c.footerLeft, dark);
  return s;
}

// 8. STAT GRID — grid of stat cards
function statGrid(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s);
  kicker(s, c.kicker || 'Results', M, 0.7);
  s.addText((c.title || 'THE NUMBERS').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 44, color: C.ink });
  const items = c.items || [];
  const cols = c.cols || (items.length <= 4 ? 2 : 3);
  const rows = Math.ceil(items.length / cols) || 1;
  const top = 2.25, gx = 0.3, gy = 0.3;
  const cw = (CW - gx * (cols - 1)) / cols, chh = (H - top - 0.7 - gy * (rows - 1)) / rows;
  items.forEach((it, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = M + col * (cw + gx), y = top + row * (chh + gy);
    s.addShape('rect', { x, y, w: cw, h: chh, fill: { color: C.panel }, line: { type: 'none' } });
    s.addText([
      { text: (it.num || '') + (it.unit || '') + '\n', options: { fontFace: F.display, fontSize: 44, color: C.orange } },
      { text: it.label || '', options: { fontFace: F.body, fontSize: 12, color: C.greyDark } },
    ], { x: x + 0.35, y: y + 0.25, w: cw - 0.7, h: chh - 0.5, valign: 'middle' });
  });
  footer(s, c.footerLeft);
  return s;
}

// 9. CASE STUDY — title bar + half-bleed image (left) + content (right)
function caseStudy(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  s.addText((c.title || 'CASE STUDY').toUpperCase(), { x: M, y: 0.35, w: CW, h: 1.0,
    fontFace: F.display, fontSize: 52, color: C.ink, align: 'left', valign: 'middle' });
  squareMotif(s);
  const imgW = 6.0, imgY = 1.55, imgH = H - imgY - 0.5;
  if (c.image) s.addImage({ path: c.image, x: 0, y: imgY, w: imgW, h: imgH, sizing: { type: 'cover', w: imgW, h: imgH } });
  else imgBlock(s, 0, imgY, imgW, imgH, false, c.imageLabel || 'CAMPAIGN VISUAL');
  const cx = imgW + 0.6, cw = W - cx - M; let y = imgY;
  s.addText((c.headline || '').toUpperCase(), { x: cx, y, w: cw, h: 1.4, fontFace: F.head, bold: true,
    fontSize: 18, color: C.ink, valign: 'top', lineSpacingMultiple: 1.0 }); y += 1.4;
  if (c.subhead) { s.addText(c.subhead.toUpperCase(), { x: cx, y, w: cw, h: 0.4, fontFace: F.head, bold: true,
    fontSize: 11, color: C.orange, charSpacing: 1 }); y += 0.42; }
  if (c.body) { s.addText(c.body, { x: cx, y, w: cw, h: 1.5, fontFace: F.body, fontSize: 11.5, color: C.body,
    valign: 'top', lineSpacingMultiple: 1.08 }); y += 1.5; }
  if (c.stats && c.stats.length) {
    const n = c.stats.length, gw = cw / n;
    c.stats.forEach((st, i) => s.addText([
      { text: (st.label || '') + '\n', options: { fontFace: F.body, bold: true, fontSize: 10, color: C.ink } },
      { text: st.num, options: { fontFace: F.display, fontSize: 34, color: C.orange } },
    ], { x: cx + i * gw, y, w: gw, h: 1.0, valign: 'top' }));
    y += 1.05;
  }
  if (c.services && c.services.length) {
    s.addText('SERVICES', { x: cx, y, w: cw, h: 0.3, fontFace: F.head, bold: true, fontSize: 11, color: C.orange, charSpacing: 1 });
    y += 0.32;
    s.addText(c.services.map(t => ({ text: t, options: { bullet: { code: '2022' }, fontFace: F.body, fontSize: 11, color: C.ink } })),
      { x: cx, y, w: cw, h: 1.0, valign: 'top', lineSpacingMultiple: 1.1 });
  }
  footer(s, c.footerLeft || 'Official Record © 2026');
  return s;
}

// 10. CASE STUDY (image-right) — content left, full-height image right
function caseStudyImage(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  const imgW = 5.6, ix = W - imgW;
  if (c.image) s.addImage({ path: c.image, x: ix, y: 0, w: imgW, h: H, sizing: { type: 'cover', w: imgW, h: H } });
  else imgBlock(s, ix, 0, imgW, H, false, c.imageLabel || 'CAMPAIGN VISUAL');
  squareMotif(s);
  const cw = ix - M - 0.5;
  kicker(s, c.kicker, M, 0.7, cw);
  s.addText((c.title || 'CLIENT').toUpperCase(), { x: M, y: 1.0, w: cw, h: 1.4, fontFace: F.display,
    fontSize: 48, color: C.ink, lineSpacingMultiple: 0.92 });
  let y = 2.6;
  if (c.body) { s.addText(c.body, { x: M, y, w: cw, h: 1.8, fontFace: F.body, fontSize: 13, color: C.body,
    valign: 'top', lineSpacingMultiple: 1.1 }); y += 1.9; }
  if (c.stats && c.stats.length) {
    const n = c.stats.length, gw = cw / n;
    c.stats.forEach((st, i) => s.addText([
      { text: st.num + '\n', options: { fontFace: F.display, fontSize: 40, color: C.orange } },
      { text: st.label || '', options: { fontFace: F.body, fontSize: 11, color: C.greyDark } },
    ], { x: M + i * gw, y, w: gw, h: 1.2, valign: 'top' }));
  }
  footer(s, c.footerLeft || 'Official Record © 2026');
  return s;
}

// 11. TWO-COLUMN — text + visual
function twoColumn(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s);
  kicker(s, c.kicker, M, 0.7);
  s.addText(displayLines(c, 'TITLE').join('\n').toUpperCase(), { x: M, y: 1.0, w: CW, h: 1.1,
    fontFace: F.display, fontSize: 44, color: C.ink, lineSpacingMultiple: 0.92 });
  const imgRight = c.imageSide !== 'left';
  const colW = (CW - 0.6) / 2;
  const tx = imgRight ? M : M + colW + 0.6, ix = imgRight ? M + colW + 0.6 : M;
  const cy = 2.4, ch = H - cy - 0.7;
  if (c.bullets && c.bullets.length)
    s.addText(c.bullets.map(b => ({ text: b, options: { bullet: { code: '2022', indent: 18 }, fontFace: F.body, fontSize: 14, color: C.ink, paraSpaceAfter: 10 } })),
      { x: tx, y: cy, w: colW, h: ch, valign: 'top' });
  else if (c.body)
    s.addText(c.body, { x: tx, y: cy, w: colW, h: ch, fontFace: F.body, fontSize: 14, color: C.body, valign: 'top', lineSpacingMultiple: 1.12 });
  if (c.image) s.addImage({ path: c.image, x: ix, y: cy, w: colW, h: ch, sizing: { type: 'cover', w: colW, h: ch } });
  else imgBlock(s, ix, cy, colW, ch, false, c.imageLabel || 'IMAGE');
  footer(s, c.footerLeft);
  return s;
}

// 12. ICON ROWS — number chip + header + description
function iconRows(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s);
  kicker(s, c.kicker, M, 0.7);
  s.addText((c.title || 'OUR APPROACH').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 44, color: C.ink });
  const rows = c.rows || [];
  const top = 2.25, rh = (H - top - 0.7) / Math.max(rows.length, 1);
  rows.forEach((r, i) => {
    const y = top + i * rh;
    s.addShape('rect', { x: M, y: y + 0.08, w: 0.64, h: 0.64, fill: { color: C.orange }, line: { type: 'none' } });
    s.addText(r.chip || String(i + 1), { x: M, y: y + 0.08, w: 0.64, h: 0.64, align: 'center', valign: 'middle',
      fontFace: F.display, fontSize: 24, color: C.white });
    s.addText([
      { text: (r.title || '') + '\n', options: { fontFace: F.head, bold: true, fontSize: 16, color: C.ink } },
      { text: r.desc || '', options: { fontFace: F.body, fontSize: 12, color: C.body } },
    ], { x: M + 0.95, y, w: CW - 0.95, h: rh - 0.15, valign: 'middle', lineSpacingMultiple: 1.05 });
  });
  footer(s, c.footerLeft);
  return s;
}

// 13. PROCESS STEPS — horizontal numbered steps joined by connectors
function processSteps(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s); texTicks(s, false);
  kicker(s, c.kicker, M, 0.7);
  s.addText((c.title || 'THE PROCESS').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 44, color: C.ink });
  const steps = c.steps || [];
  const n = Math.max(steps.length, 1), gap = 0.4;
  const cw = (CW - gap * (n - 1)) / n, top = 2.7, ch = 3.0;
  steps.forEach((st, i) => {
    const x = M + i * (cw + gap);
    s.addShape('oval', { x, y: top, w: 0.85, h: 0.85, fill: { color: C.orange }, line: { type: 'none' } });
    s.addText(String(i + 1), { x, y: top, w: 0.85, h: 0.85, align: 'center', valign: 'middle', fontFace: F.display, fontSize: 30, color: C.white });
    if (i < n - 1) s.addShape('line', { x: x + 0.95, y: top + 0.42, w: cw + gap - 1.05, h: 0, line: { color: C.line, width: 1.25, dashType: 'dash' } });
    s.addText([
      { text: (st.title || '') + '\n', options: { fontFace: F.head, bold: true, fontSize: 15, color: C.ink } },
      { text: st.desc || '', options: { fontFace: F.body, fontSize: 11, color: C.body } },
    ], { x, y: top + 1.1, w: cw, h: ch - 1.1, valign: 'top', lineSpacingMultiple: 1.05 });
  });
  footer(s, c.footerLeft);
  return s;
}

// 14. CLIENT GRID — name/logo cells
function clientGrid(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s);
  kicker(s, c.kicker || 'Trusted by', M, 0.7);
  s.addText((c.title || 'CLIENTS').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 46, color: C.ink });
  const items = c.items || [];
  const cols = c.cols || 4, rows = Math.ceil(items.length / cols) || 1;
  const top = 2.25, gx = 0.25, gy = 0.25;
  const cw = (CW - gx * (cols - 1)) / cols, chh = (H - top - 0.7 - gy * (rows - 1)) / rows;
  items.forEach((it, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = M + col * (cw + gx), y = top + row * (chh + gy);
    s.addShape('rect', { x, y, w: cw, h: chh, fill: { color: C.panel }, line: { type: 'none' } });
    if (it.image) s.addImage({ path: it.image, x: x + cw * 0.15, y: y + chh * 0.2, w: cw * 0.7, h: chh * 0.6, sizing: { type: 'contain', w: cw * 0.7, h: chh * 0.6 } });
    else s.addText(it.name || it, { x, y, w: cw, h: chh, align: 'center', valign: 'middle', fontFace: F.head, bold: true, fontSize: 13, color: C.ink });
  });
  footer(s, c.footerLeft);
  return s;
}

// 15. PORTFOLIO GRID — image tiles + captions
function portfolioGrid(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s);
  kicker(s, c.kicker || 'Selected work', M, 0.7);
  s.addText((c.title || 'PORTFOLIO').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 44, color: C.ink });
  const items = c.items || [];
  const cols = c.cols || 3, rows = Math.ceil(items.length / cols) || 1;
  const top = 2.2, gx = 0.3, gy = 0.45;
  const cw = (CW - gx * (cols - 1)) / cols, chh = (H - top - 0.7 - gy * (rows - 1)) / rows;
  items.forEach((it, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = M + col * (cw + gx), y = top + row * (chh + gy), ih = chh - 0.35;
    if (it.image) s.addImage({ path: it.image, x, y, w: cw, h: ih, sizing: { type: 'cover', w: cw, h: ih } });
    else imgBlock(s, x, y, cw, ih, false, it.label || 'WORK');
    s.addText(it.caption || '', { x, y: y + ih + 0.03, w: cw, h: 0.3, fontFace: F.body, fontSize: 10, color: C.body });
  });
  footer(s, c.footerLeft);
  return s;
}

// 16. TIMELINE — milestones alternating around an orange axis
function timeline(pptx, c = {}) {
  const dark = !!c.dark;
  const s = pptx.addSlide();
  s.background = { color: dark ? C.black : C.white };
  squareMotif(s);
  kicker(s, c.kicker || 'Milestones', M, 0.7);
  s.addText((c.title || 'OUR JOURNEY').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 44, color: dark ? C.white : C.ink });
  const items = c.items || [], axisY = 4.05, n = Math.max(items.length, 1), stepW = CW / n;
  s.addShape('line', { x: M, y: axisY, w: CW, h: 0, line: { color: C.orange, width: 1.5 } });
  items.forEach((it, i) => {
    const x = M + i * stepW + stepW / 2, up = i % 2 === 0;
    s.addShape('oval', { x: x - 0.07, y: axisY - 0.07, w: 0.14, h: 0.14, fill: { color: C.orange }, line: { type: 'none' } });
    s.addText(it.year || '', { x: x - stepW / 2, y: up ? axisY - 0.8 : axisY + 0.22, w: stepW, h: 0.55,
      align: 'center', fontFace: F.display, fontSize: 30, color: C.orange });
    s.addText(it.event || '', { x: x - stepW / 2 + 0.05, y: up ? axisY - 1.7 : axisY + 0.82, w: stepW - 0.1, h: 0.85,
      align: 'center', valign: up ? 'bottom' : 'top', fontFace: F.body, fontSize: 10, color: dark ? C.greyLt : C.body });
  });
  footer(s, c.footerLeft, dark);
  return s;
}

// 17. COMPARISON — two panels, right = highlighted BUBU way
function comparison(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s);
  kicker(s, c.kicker, M, 0.7);
  s.addText((c.title || 'THE SHIFT').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 44, color: C.ink });
  const colW = (CW - 0.5) / 2, top = 2.3, ch = H - top - 0.7;
  [c.left || {}, c.right || {}].forEach((col, i) => {
    const x = M + i * (colW + 0.5), accent = i === 1;
    s.addShape('rect', { x, y: top, w: colW, h: ch, fill: { color: accent ? C.orange : C.panel }, line: { type: 'none' } });
    s.addText((col.heading || '').toUpperCase(), { x: x + 0.35, y: top + 0.3, w: colW - 0.7, h: 0.7,
      fontFace: F.display, fontSize: 26, color: accent ? C.white : C.ink });
    s.addText((col.points || []).map(p => ({ text: p, options: { bullet: { code: '2022' }, fontFace: F.body, fontSize: 12.5,
      color: accent ? C.white : C.body, paraSpaceAfter: 8 } })), { x: x + 0.35, y: top + 1.15, w: colW - 0.7, h: ch - 1.4, valign: 'top' });
  });
  footer(s, c.footerLeft);
  return s;
}

// 18. TEAM — people grid
function team(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  squareMotif(s);
  kicker(s, c.kicker || 'The people', M, 0.7);
  s.addText((c.title || 'OUR TEAM').toUpperCase(), { x: M, y: 1.0, w: CW, h: 0.9, fontFace: F.display, fontSize: 44, color: C.ink });
  const items = c.items || [], cols = c.cols || 4, rows = Math.ceil(items.length / cols) || 1;
  const top = 2.2, gx = 0.4, gy = 0.3;
  const cw = (CW - gx * (cols - 1)) / cols, chh = (H - top - 0.7 - gy * (rows - 1)) / rows;
  items.forEach((it, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = M + col * (cw + gx), y = top + row * (chh + gy), ph = chh - 0.85;
    if (it.image) s.addImage({ path: it.image, x, y, w: cw, h: ph, sizing: { type: 'cover', w: cw, h: ph } });
    else imgBlock(s, x, y, cw, ph, false, 'PHOTO');
    s.addText([
      { text: (it.name || '') + '\n', options: { fontFace: F.head, bold: true, fontSize: 13, color: C.ink } },
      { text: it.role || '', options: { fontFace: F.body, fontSize: 10, color: C.orange } },
    ], { x, y: y + ph + 0.05, w: cw, h: 0.75, valign: 'top' });
  });
  footer(s, c.footerLeft);
  return s;
}

// 19. QUOTE — testimonial on black
function quote(pptx, c = {}) {
  const light = !!c.light;
  const s = pptx.addSlide();
  s.background = { color: light ? C.white : C.black };
  texMark(s, 'right'); squareMotif(s);
  s.addText('“', { x: M - 0.05, y: 0.55, w: 2, h: 1.6, fontFace: F.display, fontSize: 130, color: C.orange });
  s.addText(c.quote || 'Quote goes here.', { x: M, y: 2.2, w: CW, h: 3.0, fontFace: F.head, bold: true,
    fontSize: c.size || 28, color: light ? C.ink : C.white, valign: 'top', lineSpacingMultiple: 1.1 });
  s.addText([
    { text: (c.author || '') + '\n', options: { fontFace: F.head, bold: true, fontSize: 14, color: C.orange } },
    { text: c.role || '', options: { fontFace: F.body, fontSize: 11, color: light ? C.body : C.greyLt } },
  ], { x: M, y: H - 1.5, w: CW, h: 0.9, valign: 'top' });
  footer(s, c.footerLeft, !light);
  return s;
}

// 20. QUOTE (image) — quote over a full-bleed image with scrim
function quoteImage(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.black };
  if (c.image) s.addImage({ path: c.image, x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } });
  else imgBlock(s, 0, 0, W, H, true, 'IMAGE');
  s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: C.black, transparency: 45 }, line: { type: 'none' } });
  squareMotif(s);
  s.addText('“', { x: M - 0.05, y: 0.9, w: 2, h: 1.6, fontFace: F.display, fontSize: 120, color: C.orange });
  s.addText(c.quote || 'Quote.', { x: M, y: 2.6, w: CW, h: 2.6, fontFace: F.head, bold: true, fontSize: c.size || 30,
    color: C.white, valign: 'top', lineSpacingMultiple: 1.1 });
  s.addText([
    { text: (c.author || '') + '\n', options: { fontFace: F.head, bold: true, fontSize: 14, color: C.orange } },
    { text: c.role || '', options: { fontFace: F.body, fontSize: 11, color: C.greyLt } },
  ], { x: M, y: H - 1.5, w: CW, h: 0.9, valign: 'top' });
  footer(s, c.footerLeft, true);
  return s;
}

// 21. CLOSING / CONTACT — dark CTA + logo + contact
function closing(pptx, c = {}) {
  const s = pptx.addSlide();
  s.background = { color: C.black };
  texMark(s, 'right'); texTicks(s, true); squareMotif(s);
  logoWordmark(s, M, 0.8, 1.7, true);
  const lines = displayLines(c, 'LET’S BUILD\nWHAT MATTERS.');
  s.addText(runsFor(lines, c.accentLine != null ? c.accentLine : lines.length - 1, C.white),
    { x: M, y: 2.3, w: CW, h: 2.6, fontFace: F.display, fontSize: c.titleSize || 66, valign: 'middle', lineSpacingMultiple: 0.92 });
  const contact = c.contact || { web: 'BUBU.COM', email: 'hello@bubu.com', phone: '+6221 38808185', cities: 'Jakarta · Dubai' };
  s.addText([
    { text: (contact.web || '') + '   ', options: { color: C.orange, bold: true } },
    { text: [contact.email, contact.phone, contact.cities].filter(Boolean).join('   ·   '), options: { color: C.greyLt } },
  ], { x: M, y: H - 1.4, w: CW, h: 0.5, fontFace: F.body, fontSize: 13 });
  footer(s, c.footerLeft || 'Cultural Continuum Co.', true);
  return s;
}

module.exports = {
  BRAND, newDeck,
  cover, coverImage, sectionDivider, agenda, statement, impactStat, bigNumber, statGrid,
  caseStudy, caseStudyImage, twoColumn, iconRows, processSteps, clientGrid, portfolioGrid,
  timeline, comparison, team, quote, quoteImage, closing,
  _helpers: { footer, squareMotif, kicker, imgBlock, logoMark, logoWordmark, texTicks, texCircles, texMark },
};
