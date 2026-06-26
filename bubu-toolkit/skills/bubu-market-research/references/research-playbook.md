# Deep Research Playbook

How to research a brand so the output feels like it came from someone who has followed it for years — not a stranger summarizing the homepage. Consult this whenever you're unsure where to dig or how to push past the obvious.

## Table of contents
1. The insider test (generic vs. insider, with examples)
2. Where the real signal hides (by brand type)
3. Building the year-by-year timeline
4. Competitor benchmarking
5. Mining public & earned reception
6. Tooling: getting past empty pages and dead ends
7. Verification & confidence

---

## 1. The insider test

Before you write a finding, ask: *would a smart marketer who works in this category already know this?* If yes, it's table stakes — keep digging until you find the non-obvious layer underneath. The examples below use different categories on purpose — this test applies to any subject, not one brand.

**Generic (reject):** "[Skincare brand] uses cultural values and KOLs to reach young consumers."
**Insider (aim for):** "Their 2021 launch angle quietly reframed the product as a *discipline* ritual rather than vanity — and you can see the strategy mature when their 2023 ambassador choice shifted from niche credibility figures to mainstream actors, signaling a deliberate push out of the niche into the mass market."

**Generic:** "They have strong engagement on TikTok."
**Insider:** "Their TikTok took off when they stopped doing product demos and let creators roast the category's stigma — the comment sections flipped from skeptical to defensive-of-the-brand around mid-2022, which is the real inflection point."

**Generic:** "The esports org has a loyal fanbase and good sponsors."
**Insider:** "Their fanbase hardened after the 2022 roster gamble that fans initially hated — the jersey-reveal backlash became the origin story the community now rallies around, which is why merch tied to that era outsells current-season drops."

The difference is always: named specifics, a moment in time, a mechanism, and the audience's actual reaction.

## 2. Where the real signal hides (by brand type)

Don't search every channel reflexively. Form a hypothesis about where *this* brand's signal lives, then go there:

- **Skincare / personal care / FMCG:** marketplace reviews (Shopee/Tokopedia/Female Daily), beauty community forums, Ramadan campaign retrospectives, ambassador announcements, halal-certification angle, trade press (Marketing.co.id, Mix Marcomm, Campaign Asia, Marketeers).
- **Gaming / esports:** tournament sponsorships, roster/jersey reveals, Discord/Reddit/X community reaction, streamer adoption, in-game collabs, prize-pool announcements.
- **Fashion / sneaker / streetwear:** drops and collabs, resale/hype signals, creative-director moves, lookbook reception, scene credibility vs. mainstream crossover.
- **Tech / startup / app:** funding rounds, product launches, growth-loop mechanics, app-store reviews, founder narrative, PR around milestones.
- **F&B / lifestyle:** viral menu items, location/experiential plays, UGC food content, influencer seeding.

Cross-cut sources useful for almost any brand: the brand's own newsroom/press releases (claims to verify, not trust), award shows (Citra Pariwara, YouTube Works, Effie, Cannes for the famous ones — awards reveal what the industry rated as breakthrough), case-study writeups, and founder/CMO interviews (where strategy is often stated plainly).

## 3. Building the year-by-year timeline

The timeline is what makes an analysis feel like you've tracked the brand. Reconstruct the arc:

- Founding / launch year and the original positioning.
- Each pivotal campaign with name + year + what it did differently.
- Breakthroughs (*gebrakan*) — the moments the brand jumped levels (a viral hit, a category-defining collab, a bold reposition).
- Missteps and flops — equally informative; brands reveal themselves in what didn't work.
- Shifts in ambassador/KOL strategy, creative codes, or target audience over time (these signal strategic intent).
- Where momentum **accelerated** vs. where it **stalled or plateaued**.

Present it as a clear chronological spine, then interpret it — what does the arc tell you about where they're headed?

## 4. Competitor benchmarking

Name the real rivals (don't hand-wave "competitors"). For each key competitor, compare head to head:

- **Positioning:** what does each own in the customer's mind? Where do they overlap and where are they differentiated?
- **Share of voice / momentum:** who's winning the conversation right now, and is it changing?
- **Creative & channel:** what codes and platforms does each lean on?
- **Where the subject wins / loses:** be specific and balanced.
- **Category motion:** where is the whole category heading, and who's pulling it there?

A simple comparison table plus a paragraph of interpretation usually lands well. The goal is to locate *whitespace* — what no competitor credibly owns yet.

## 5. Mining public & earned reception

This is the dimension most analyses skip, and it's what the user specifically wants: how did **people** react, not what the brand claimed.

- Read comment sections, quote-tweets, Reddit threads, TikTok comments, YouTube comments, marketplace reviews. Characterize the *tone* and how it shifted over time.
- Distinguish paid/seeded buzz from genuine earned conversation — earned reaction (memes, unprompted praise, organic defense or criticism) is the real signal.
- Note backlash and controversy and how the brand handled it.
- Capture the audience's own language about the brand — verbatim phrasing is gold for a cultural-intelligence agency.
- Look for the gap between the brand's intended message and how it actually landed.

## 6. Tooling: getting past empty pages and dead ends

- **Start with web search** (load `WebSearch` via ToolSearch if deferred). Use focused queries; iterate on what you find rather than one broad query.
- **JS-rendered pages return an empty shell on a plain fetch.** Most social profiles and many news/marketplace pages are client-rendered. When a fetch comes back as a shell, a spinner, or "enable JavaScript," switch to the Claude-in-Chrome tools (`navigate`, then `get_page_text`) which render the page first.
- **Marketing-data connectors**, when authenticated, give hard numbers: SimilarWeb (web traffic, audience, competitor share), Ahrefs (SEO, keywords, backlinks, content gaps), Amplitude (product/engagement analytics). Use them for benchmarking; if they'd materially sharpen the analysis but aren't connected, offer to connect them.
- **Respect content restrictions.** If a source can't be retrieved through the allowed tools, don't route around it with scripts — note it and find an alternative source.
- **If web research genuinely fails this session**, say so up front, mark every figure as unverified, and produce the structural analysis from reasoning — but never present recalled facts as if they were freshly sourced.

## 7. Verification & confidence

- Cross-check every load-bearing figure against a second source.
- Flag anomalies instead of smoothing them into clean-looking stats.
- Tag key claims with confidence: **high** (multiple solid sources), **medium** (single decent source or strong inference), **low** (estimate/assumption).
- Keep a short, auditable Sources list with real URLs.
- Separate clearly: verified fact vs. estimate vs. assumption. Honesty about uncertainty is part of the rigor, not a weakness.
