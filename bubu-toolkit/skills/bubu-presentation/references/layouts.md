# BUBU Layout Catalog (v2 — 21 layouts)

Each function in `assets/bubu-theme.js` renders one branded slide:
`fn(pptx, content)`. All content keys are optional with sensible defaults;
`footerLeft` sets the left footer doc-label on any layout. Visual references are in
`assets/reference/NN-name.png`.

Pick layouts that fit the **story** and **vary** them — never repeat one back-to-back.
Typical flow: cover → divider → agenda → statement → edge (two-column / icon-rows /
process) → impact (impactStat / bigNumber / statGrid) → proof (case study / portfolio /
client grid / timeline) → comparison / quote → closing.

`title` accepts a string with `\n` or an array of lines. `accentLine` is the line
index rendered in orange.

| # | Function | When to use |
|---|----------|-------------|
| 1 | `cover` | Title slide — construction grid + orange B mark + hero headline |
| 2 | `coverImage` | Alt title — full-bleed photo + scrim + headline bottom-left |
| 3 | `sectionDivider` | Section break — giant word, `dark:true` for black, faint B watermark |
| 4 | `agenda` | Contents — numbered two-column list |
| 5 | `statement` | Manifesto / big idea on black; one line `hi:true` → orange |
| 6 | `impactStat` | 1–3 giant stat callouts |
| 7 | `bigNumber` | One huge hero stat + supporting copy |
| 8 | `statGrid` | Grid of stat cards (2–3 cols) |
| 9 | `twoColumn` | Text + visual (`imageSide:'left'` to flip) |
| 10 | `iconRows` | Numbered rows: chip + header + desc (frameworks) |
| 11 | `processSteps` | Horizontal numbered steps joined by connectors |
| 12 | `clientGrid` | Logo / client wall (pass `image` per cell for logos) |
| 13 | `portfolioGrid` | Work tiles + captions |
| 14 | `timeline` | Milestones around an orange axis |
| 15 | `comparison` | Two panels; right = highlighted BUBU way |
| 16 | `team` | People grid (photo + name + role) |
| 17 | `quote` | Testimonial on black |
| 18 | `caseStudy` | Title bar + half-bleed image left + content right |
| 19 | `caseStudyImage` | Content left + full-height image right |
| 20 | `quoteImage` | Quote over a full-bleed image with scrim |
| 21 | `closing` | Dark CTA + wordmark + contact |

## Examples

```js
T.cover(pptx, { title: ['THE CULTURAL','INTELLIGENCE','NETWORK'], accentLine: 2, footerLeft: 'Strategy 2026' });
T.coverImage(pptx, { title: ['MOVE BEYOND','THE CAMPAIGN'], accentLine: 1, image: '/abs/hero.jpg' });
T.sectionDivider(pptx, { index: 2, kicker: 'The edge', title: 'CULTURE\nAS STRATEGY', dark: true });
T.statement(pptx, { kicker: 'Our belief', lines: [
  { text: 'We don’t sell campaigns.' }, { text: 'We build movements.', hi: true }] });
T.impactStat(pptx, { title: 'WHY IT MATTERS', stats: [
  { num: '62.5', unit: 'M', label: 'TikTok reach' }, { num: '300', unit: '%', label: 'Sales lift' }] });
T.bigNumber(pptx, { kicker: 'Headline result', num: '300', unit: '%', headline: 'Sales increase',
  body: 'Integrated activations drove a 300% lift.' });
T.statGrid(pptx, { title: 'THE NUMBERS', items: [
  { num: '17.7', unit: 'M', label: 'Instagram' }, { num: '150', unit: '+', label: 'Placements' }] });
T.twoColumn(pptx, { kicker: 'The edge', title: 'CULTURE MEETS\nTECHNOLOGY',
  bullets: ['Immersion in subcultures','Signal & data','AI & Web3'], image: '/abs/p.jpg' });
T.iconRows(pptx, { title: 'BRAND-TO-CULTURE', rows: [
  { chip: '1', title: 'Belief', desc: '…' }, { chip: '2', title: 'Signal', desc: '…' }] });
T.processSteps(pptx, { title: 'THE PROCESS', steps: [
  { title: 'Deep Immerse', desc: '…' }, { title: 'Strategic Curation', desc: '…' }, { title: 'Measured Impact', desc: '…' }] });
T.clientGrid(pptx, { title: 'CLIENTS', cols: 4, items: [{ name: 'Manchester United' }, { name: 'Snapchat' }] });
T.portfolioGrid(pptx, { title: 'PORTFOLIO', cols: 3, items: [{ label: 'LABX', caption: '…', image: '/a.jpg' }] });
T.timeline(pptx, { title: 'OUR JOURNEY', items: [{ year: '1996', event: 'Founded' }, { year: '2026', event: 'Dubai' }] });
T.comparison(pptx, { title: 'THE SHIFT',
  left: { heading: 'Traditional', points: ['Buys reach','One-off'] },
  right: { heading: 'BUBU Way', points: ['Earns relevance','Builds movements'] } });
T.team(pptx, { title: 'OUR TEAM', items: [{ name: 'A. Rahman', role: 'Strategy', image: '/p.jpg' }] });
T.quote(pptx, { quote: 'They built a community that carried the brand.', author: 'Brand Partner', role: 'Consumer Goods' });
T.caseStudy(pptx, { title: 'MANCHESTER UNITED', headline: 'A decade managing United’s digital presence',
  subhead: 'Social media & creative strategy', body: '…',
  stats: [{ label: 'Instagram', num: '17.7M' }, { label: 'TikTok', num: '62.5M' }],
  services: ['Digital Campaign','Social Media Optimization'], image: '/abs/mu.jpg' });
T.caseStudyImage(pptx, { kicker: 'Case study', title: 'WARDAH ×\nBRAVE BEAUTY', body: '…',
  stats: [{ num: '4', label: 'Outlets' }, { num: '10M+', label: 'Reach' }], image: '/abs/w.jpg' });
T.quoteImage(pptx, { quote: 'We build movements.', author: 'BUBU', role: 'Cultural Intelligence Agency', image: '/abs/crowd.jpg' });
T.closing(pptx, { title: ['LET’S BUILD','WHAT MATTERS.'], accentLine: 1,
  contact: { web: 'BUBU.COM', email: 'hello@bubu.com', phone: '+6221 38808185', cities: 'Jakarta · Dubai' } });
```

## Custom slides
Use `T._helpers` (`footer`, `squareMotif`, `kicker`, `imgBlock`, `logoMark`,
`logoWordmark`, `texTicks`, `texCircles`, `texMark`) + `T.BRAND` tokens on a raw
`pptx.addSlide()` so custom slides still match the system.

## Images
Layouts render labelled grey placeholders when no `image` is supplied. A finished BUBU
deck should carry real campaign imagery — pass absolute `image:` paths to
`coverImage`, `caseStudy`, `caseStudyImage`, `twoColumn`, `portfolioGrid`, `team`,
`quoteImage`, and logo cells in `clientGrid`.
