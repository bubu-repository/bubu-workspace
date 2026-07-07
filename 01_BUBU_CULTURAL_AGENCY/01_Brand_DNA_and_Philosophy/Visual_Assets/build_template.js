// Builds bubu-template.pptx — one slide per layout (21), with sample content.
// Run from the assets/ dir so logo/ + fonts/ resolve. Then run embed_fonts.py.
const T = require('./bubu-theme.js');
const p = T.newDeck({ subject: 'BUBU Template — Layout Library' });
const DOC = 'Company Profile 2026';
['sectionDivider','agenda','statement','impactStat','bigNumber','statGrid','twoColumn','iconRows','processSteps','clientGrid','portfolioGrid','timeline','comparison','team','quote','caseStudy','caseStudyImage','coverImage','quoteImage'].forEach(fn => {
  const o = T[fn]; T[fn] = (pp, c = {}) => o(pp, { footerLeft: DOC, ...c });
});

T.cover(p, { title: ['THE CULTURAL', 'INTELLIGENCE', 'NETWORK'], accentLine: 2 });
T.coverImage(p, { title: ['MOVE BEYOND', 'THE CAMPAIGN'], accentLine: 1, imageLabel: 'HERO CAMPAIGN IMAGE' });
T.sectionDivider(p, { index: 1, kicker: 'Who we are', title: 'A CULTURAL\nINTELLIGENCE\nAGENCY', dark: true });
T.agenda(p, { items: [
  { title: 'The Cultural Shift', desc: 'Why relevance beats reach' },
  { title: 'The BUBU Edge', desc: 'Culture · Data · Creativity · Tech' },
  { title: 'Brand-to-Culture', desc: 'Belief → Movement → Legacy' },
  { title: 'Proof & Work', desc: 'Selected campaigns' },
  { title: 'The Approach', desc: 'How we engage' },
  { title: 'Next Steps', desc: 'Where we go from here' },
] });
T.statement(p, { kicker: 'Our belief', lines: [
  { text: 'It’s not about visibility.' }, { text: 'It’s about relevance.', hi: true },
], attribution: 'BUBU — Cultural Intelligence Agency' });
T.impactStat(p, { kicker: 'By the numbers', title: 'Three decades of cultural impact', stats: [
  { num: '30', unit: 'YRS', label: 'Pioneering Indonesia’s digital culture since 1996' },
  { num: '62.5', unit: 'M', label: 'TikTok reach, Manchester United ID & MY' },
  { num: '300', unit: '%', label: 'Sales lift from integrated AXE activations' },
] });
T.bigNumber(p, { kicker: 'Headline result', num: '300', unit: '%', headline: 'Sales increase',
  body: 'Integrated digital activations for AXE drove a 300% sales lift — relevance translated directly into revenue.' });
T.statGrid(p, { kicker: 'Results', title: 'The numbers', items: [
  { num: '17.7', unit: 'M', label: 'Instagram reach' }, { num: '62.5', unit: 'M', label: 'TikTok reach' },
  { num: '150', unit: '+', label: 'Media placements' }, { num: '10', unit: 'K', label: 'Pieces of UGC' },
] });
T.twoColumn(p, { kicker: 'The BUBU edge', title: 'CULTURE MEETS\nTECHNOLOGY', bullets: [
  'Deep immersion in subcultures and youth communities',
  'Signal tracking and behavioral data',
  'Creative translation into shareable moments',
  'AI & Web3 to amplify intelligence and reach',
], imageLabel: 'CULTURE VISUAL' });
T.iconRows(p, { kicker: 'Framework', title: 'BRAND-TO-CULTURE', rows: [
  { chip: '1', title: 'Belief', desc: 'Define what the brand truly stands for' },
  { chip: '2', title: 'Signal', desc: 'Identify what communities care about and why' },
  { chip: '3', title: 'Moment', desc: 'Design an immersive, shareable experience' },
  { chip: '4', title: 'Movement', desc: 'Activate audiences through participation' },
  { chip: '5', title: 'Legacy', desc: 'Shape conversations and long-term value' },
] });
T.processSteps(p, { kicker: 'How we engage', title: 'THE PROCESS', steps: [
  { title: 'Deep Immerse', desc: 'Live inside the culture and community' },
  { title: 'Strategic Curation', desc: 'Turn signals into a sharp strategy' },
  { title: 'Measured Impact', desc: 'Activate, measure, and scale what moves' },
] });
T.clientGrid(p, { title: 'CLIENTS', cols: 4, items: [
  'Manchester United', 'Snapchat', 'Unilever', 'Reckitt', 'AXE', 'Garuda Indonesia',
  'Telkom Metra', 'Guardian', 'PUBG Mobile', 'Wardah', 'TODAK', 'Oi Ocha',
].map(n => ({ name: n })) });
T.portfolioGrid(p, { title: 'PORTFOLIO', cols: 3, items: [
  { label: 'LABX', caption: 'Advan x Darbotz — street culture' },
  { label: 'GAMING', caption: 'PUBG Mobile x Machine56' },
  { label: 'BEAUTY', caption: 'Wardah — Brave Beauty' },
  { label: 'ESPORTS', caption: 'TODAK — Battle Scars rebrand' },
  { label: 'PR', caption: 'Mesut Özil x Concave' },
  { label: 'TVC', caption: 'Unilever — Dettol & Sunlight' },
] });
T.timeline(p, { title: 'OUR JOURNEY', items: [
  { year: '1996', event: 'Founded as a digital pioneer' },
  { year: '2011', event: 'Launched IDByte tech conference' },
  { year: '2019', event: 'BUBU Gaming & StartUp Indonesia' },
  { year: '2021', event: 'SuperGirls in Tech' },
  { year: '2025', event: 'Rebranded as Cultural Intelligence Agency' },
  { year: '2026', event: 'International expansion — Jakarta to Dubai' },
] });
T.comparison(p, { title: 'THE SHIFT',
  left: { heading: 'Traditional Agency', points: ['Buys reach & impressions', 'One-off campaigns', 'Brand talks at audiences', 'Success = visibility'] },
  right: { heading: 'BUBU Way', points: ['Earns cultural relevance', 'Builds movements & legacy', 'Communities participate', 'Success = belief → movement'] } });
T.team(p, { title: 'OUR TEAM', cols: 4, items: [
  { name: 'Strategy Lead', role: 'Cultural Intelligence' },
  { name: 'Creative Director', role: 'Concept & Craft' },
  { name: 'Data Lead', role: 'Signals & Insight' },
  { name: 'Tech Lead', role: 'AI & Web3' },
] });
T.quote(p, { quote: 'BUBU didn’t run a campaign for us — they built a community that carried the brand far beyond the launch.',
  author: 'Global Brand Partner', role: 'Consumer Goods' });
T.caseStudy(p, { title: 'MANCHESTER UNITED', headline: 'A decade managing United’s digital presence across Indonesia & Malaysia',
  subhead: 'Through social media & creative campaign strategy',
  body: 'Home to one of United’s largest fan communities, Indonesia & Malaysia became a key market for digital fan engagement. For over a decade BUBU has grown the regional community through social content, campaigns and audience-driven experiences.',
  stats: [{ label: 'Instagram', num: '17.7M' }, { label: 'TikTok', num: '62.5M' }],
  services: ['Digital Campaign', 'Social Media Optimization'] });
T.caseStudyImage(p, { kicker: 'Case study', title: 'WARDAH ×\nBRAVE BEAUTY',
  body: 'A global campaign where modest beauty met a worldwide conversation — turning a product launch into a cultural statement on identity and confidence.',
  stats: [{ num: '4', label: 'National outlets' }, { num: '10M+', label: 'Earned reach' }], imageLabel: 'CAMPAIGN VISUAL' });
T.quoteImage(p, { quote: 'We don’t sell campaigns. We build movements.', author: 'BUBU', role: 'Cultural Intelligence Agency', imageLabel: 'CULTURE / CROWD IMAGE' });
T.closing(p, { title: ['LET’S BUILD', 'WHAT MATTERS.'], accentLine: 1 });

p.writeFile({ fileName: 'bubu-template.pptx' }).then(f => console.log('WROTE', f));
