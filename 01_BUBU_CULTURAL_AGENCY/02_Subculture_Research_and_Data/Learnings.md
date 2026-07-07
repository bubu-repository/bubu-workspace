# Learnings

Running log of what each task taught the setup. Add one entry after any significant delivery. `/bubu-upgrade` reads this file, folds recurring learnings into the skills, then marks them `absorbed`.

## Entry format (copy this block, fill every field)

```
### YYYY-MM-DD | [Task short name]
- Status: active            # active = still triggers; absorbed = folded into a skill
- Client: [ClientName or Internal]
- Skill used: [/bubu-mom | /bubu-admin-docs | /bubu-presentation | /bubu-market-research | /bubu-ebook | /markitdown | none]
- What worked: [one concrete thing that produced a good result]
- Do differently: [one concrete change for next time, or "nothing" if clean]
- Absorbed by: [SkillUpgradeLog entry date, or "-" while active]
```

Rules: one learning per entry, no essays. "Do differently" must be concrete enough to act on without this session's memory. If a correction repeats across three entries, it is a candidate for `/bubu-upgrade`.

---

## Active entries

### 2026-06-29 | KAHF x TODAK KLFW partnership proposal
- Status: active
- Client: KAHF
- Skill used: /bubu-market-research then /bubu-presentation
- What worked: Running research synthesis into a supporting-docs file first, then building the pitch deck from it, kept the deck claims grounded and citable. Two decks shipped (Tap-In Strategy + Pitch).
- Do differently: Save the research summary as a separate `_SupportingDocs` file alongside the proposal so the deck and proposal never drift from the same source. Do this by default for pitch work.
- Absorbed by: -

### 2026-06-29 | K-Beauty men Malaysia market research
- Status: active
- Client: Internal
- Skill used: /bubu-market-research
- What worked: Framing the analysis through cultural relevance (not reach numbers) matched BUBU positioning and read as insider-grade.
- Do differently: For SEA market work, lead with the local cultural read before the competitor table. Analysts skimmed the numbers first and missed the angle.
- Absorbed by: -

### 2026-06-30 | 111 AI Prompts ebook (internal lead magnet)
- Status: active
- Client: Internal
- Skill used: /bubu-ebook
- What worked: Content-first pass (read the material, then propose cover and palette) produced an on-brand HTML + PDF pair in one go.
- Do differently: Ship the landing page in the same batch as the ebook, not three days later. The ebook landed 2026-06-30, the landing page 2026-07-03. Bundle deliverable and its distribution asset.
- Absorbed by: -

### 2026-07-01 | Financial-literacy gamification ebook manuscript
- Status: active
- Client: Internal
- Skill used: /bubu-ebook-copywriter
- What worked: Writing the manuscript as an editable .docx before any design let the content get reviewed without design noise.
- Do differently: Confirm the CTA and target audience up front. The manuscript needed the CTA woven toward the end, which is hard to retrofit. Ask for CTA before writing.
- Absorbed by: -

### 2026-07-07 | Fable clone architecture blueprint (internal research)
- Status: active
- Client: Internal
- Skill used: none (direct research write-up, StopSlop voice)
- What worked: Correcting the premise first (Fable is one model; the "orchestrator" behaviors live in the harness and workspace files) turned a speculative reverse-engineering ask into a concrete, buildable blueprint, and using bubu-press-release as the worked example grounded the "formula without template" section in a system we already run.
- Do differently: For "how does AI tool X work" requests, check Anthropic/vendor docs before writing; the user-supplied doc link plus one extra fetch covered every claim and avoided invented internals.
- Absorbed by: -

### 2026-07-06 | AI-for-non-technical-orgs research (4-angle parallel)
- Status: active
- Client: Internal
- Skill used: /bubu-market-research (4 parallel executors)
- What worked: Splitting a broad research question into four single-angle files run by parallel executors, with a checkpoint file tracking each angle's status, kept the work resumable and prevented one giant unrecoverable session.
- Do differently: Every multi-executor research task gets a `.checkpoint.md` from the first step, listing each output file and its status. This already worked once; make it the standing pattern for fan-out research.
- Absorbed by: -

### 2026-07-07 | Workspace reorganization + LabX asset generation
- Status: active
- Client: Internal (LabX)
- Skill used: none (markitdown for pptx extraction, direct asset writing)
- What worked: Extracting the full 149-slide deck before writing assets surfaced commercial data (OPEX, revenue options A/B/C, 4-tier sponsorship) that the first 50 slides never showed; asset docs cite slide ranges so claims are traceable.
- Do differently: "Rapihin semuanya" from this user means reorganize the entire workspace, not just add new folders alongside the old ones. When restructuring, move existing content in the same pass and update every path reference (CLAUDE.md, launch.json, setup.sh, README) or standing instructions silently break.
- Absorbed by: -

### 2026-07-07 | LabX PNG asset library extraction
- Status: active
- Client: Internal (LabX)
- Skill used: none (python zipfile + sips)
- What worked: When ingesting a client/brand deck, the user wants usable visual assets, not just markdown analysis: extract embedded images from the pptx, dedupe, map image-to-slide for theme categorization (logo / moodboard per theme / symbols / brand logos), convert to PNG, ship as a sorted folder library with an INDEX.md.
- Do differently: Make PNG asset extraction a standard step of every future deck ingest, and keep heavy uncategorized backgrounds local-only (gitignore) so the repo stays lean. Brand marks from slide masters are usually white-on-transparent; note that in the index so nobody thinks the files are empty.
- Absorbed by: -

---

## Absorbed entries

_None yet. `/bubu-upgrade` moves entries here once their lesson is baked into a skill, keeping a record without re-triggering._
