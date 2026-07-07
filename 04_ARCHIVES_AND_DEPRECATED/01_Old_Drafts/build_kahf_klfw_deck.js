const T = require('./bubu_assets/bubu-theme.js');
const pptx = T.newDeck({ subject: 'KAHF × Todak × KLFW 2026' });
const DOC = 'KAHF × Todak KLFW 2026 Partnership Proposal';

// COVER
T.cover(pptx, {
  title: ['KAHF × TODAK','@KLFW 2026'],
  subtitle: 'Three Strategic Activation Concepts',
  accentLine: 1,
  footerLeft: DOC
});

// CONCEPT 1: BACKSTAGE GROOMING BAR
T.statement(pptx, {
  lines: [
    { text: 'CONCEPT 1' },
    { text: 'Backstage Grooming Bar', hi: true }
  ],
  footnote: 'Model Prep Facilitation',
  footerLeft: DOC
});

T.twoColumn(pptx, {
  title: 'The Activation',
  left: [
    { text: 'KAHF sponsors dedicated model grooming station backstage during Todak runway segment', style: 'body' },
    { text: 'All 24 models use KAHF products pre-runway', style: 'body' },
    { text: 'Visible signage: "Models groomed with KAHF"', style: 'stat' },
    { text: 'Behind-the-scenes photography & content ops', style: 'body' }
  ],
  right: [
    { text: 'Budget', style: 'stat' },
    { text: '20–40M IDR', style: 'hi' },
    { text: '', style: 'spacer' },
    { text: 'Reach', style: 'stat' },
    { text: '350–400 direct attendees + 500+ behind-the-scenes social impressions', style: 'body' }
  ],
  footerLeft: DOC
});

// CONCEPT 2: LIFESTYLE LOUNGE
T.statement(pptx, {
  lines: [
    { text: 'CONCEPT 2' },
    { text: 'KAHF Lifestyle Lounge', hi: true }
  ],
  footnote: 'VIP Engagement + Gifting Strategy',
  footerLeft: DOC
});

T.impactStat(pptx, {
  title: 'The Experience',
  stats: [
    { num: '200–300', unit: 'sq ft', label: 'Curated lounge in Showspace' },
    { num: '1,350+', unit: 'attendees', label: 'Flow-through from Todak runway + KLFW VIPs' },
    { num: '20–50', unit: 'influencers', label: 'Targeted Malaysian beauty/lifestyle accounts' }
  ],
  footnote: 'Services: Skin analysis, grooming consultations, premium product sampling, photo moments',
  footerLeft: DOC
});

T.twoColumn(pptx, {
  title: 'Strategic Value',
  left: [
    { text: 'Brand Positioning', style: 'stat' },
    { text: '"Where grooming meets style" — positions KAHF as lifestyle partner, not just skincare vendor', style: 'body' },
    { text: 'Influencer gifting unlocks authentic post-event content across Malaysian beauty community', style: 'body' }
  ],
  right: [
    { text: 'Investment', style: 'stat' },
    { text: '80–120M IDR', style: 'hi' },
    { text: '', style: 'spacer' },
    { text: 'Expected Impact', style: 'stat' },
    { text: '1–2M USD earned media; 5–10 retailer partnerships sparked', style: 'body' }
  ],
  footerLeft: DOC
});

// CONCEPT 3: CO-BRANDED MOMENT
T.statement(pptx, {
  lines: [
    { text: 'CONCEPT 3' },
    { text: 'KAHF × Todak Signature Moment', hi: true }
  ],
  footnote: '"Cultured Grooming" — Premium Experience',
  footerLeft: DOC
});

T.iconRows(pptx, {
  title: 'Four Moments of Impact',
  rows: [
    {
      icon: '▶',
      label: 'Runway Transition',
      caption: 'Models enter backstage grooming pod; reappear with groomed perfection for photo ops'
    },
    {
      icon: '▶',
      label: 'Limited-Edition Kit',
      caption: '500-unit KAHF × Todak co-branded grooming set: cleanser, moisturizer, fragrance'
    },
    {
      icon: '▶',
      label: 'Social Takeover',
      caption: 'Real-time TikTok/Instagram: grooming-to-styled transitions; 30–50 UGC pieces + 5 tier-1 influencers'
    },
    {
      icon: '▶',
      label: 'Brand Credibility',
      caption: 'Positions KAHF as authority on cultured male grooming; validates lifestyle positioning'
    }
  ],
  footerLeft: DOC
});

T.impactStat(pptx, {
  title: 'Why This Wins',
  stats: [
    { num: '2.5–4M', unit: 'USD', label: 'Earned media value estimate' },
    { num: '40–60K', unit: 'impressions', label: 'Social reach + influencer amplification' },
    { num: '10–20', unit: 'retail partners', label: 'Post-event partnership conversations' }
  ],
  footnote: 'Investment: 100–150M IDR | Signature moment for market entry & brand lift',
  footerLeft: DOC
});

// CLOSING
T.closing(pptx, {
  title: ['MOVE BEYOND','THE ACTIVATION.'],
  subtitle: 'Three concepts. One vision: KAHF as the grooming authority for cultured modern males at KLFW.',
  accentLine: 0,
  footerLeft: DOC
});

// Write to file
pptx.writeFile({ fileName: 'KAHF_KLFW_2026_Proposal.pptx' }).then(f => {
  console.log('✓ Built:', f);
  console.log('\nNext: Run embed_fonts.py to embed brand fonts...');
});
