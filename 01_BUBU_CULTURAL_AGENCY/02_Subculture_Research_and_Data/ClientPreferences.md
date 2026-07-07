# Client Preferences

What each client wants, in their own terms. Read the relevant section before producing output for that client. Update it the moment a client corrects you or states a preference.

Every line is tagged: **[confirmed]** the user or client stated it, or **[inferred]** deduced from existing output and not yet verified. Promote `[inferred]` to `[confirmed]` when the user confirms; delete it if they contradict it.

## Entry format (per client)

```
## [ClientName]
- Language: [id | en | mixed], with note on when each is used
- Tone: [how formal, how much cultural framing]
- Format: [preferred deliverable types and file formats]
- Delivery: [how output is packaged, bundling rules, cadence]
- Do / Don't: [specific asks and hard nos]
- Notes: [context worth remembering: contacts, sub-brand, sensitivities]
```

---

## KAHF
- Language: [inferred] English for the deck and proposal (KLFW is a Kuala Lumpur / regional event, English-first).
- Tone: [inferred] Pitch-grade and culturally grounded. This is modest-lifestyle men's grooming meeting streetwear culture (KLFW, TODAK), so the cultural read carries the pitch, not the media math.
- Format: [inferred] Partnership proposals as `.md`, pitch decks as `.pptx` via /bubu-presentation. Research kept in a separate supporting-docs `.md`.
- Delivery: [inferred] Research summary shipped alongside the proposal as `_SupportingDocs` so deck, proposal, and research share one source of truth.
- Do / Don't: [inferred] Do keep the TODAK x KLFW cultural angle front and center. Don't lead with reach numbers.
- Notes: Work centers on the KAHF x TODAK KLFW 2026 "Tap-In" partnership. Brand profile PDF and TODAK X KLFW deck live in `Clients/KAHF/About/`.

## Pertamina
- Language: [inferred] Indonesian, consumer-facing (MyPertamina audience is mass Indonesian).
- Tone: [inferred] Playful and consumer-friendly. The one artifact so far is a "Tipe BBM" quiz, which reads as interactive content, not a formal document.
- Format: [inferred] Interactive web content (`.jsx`). Not the usual doc/deck pipeline.
- Delivery: [inferred] Component-level deliverables (a quiz built as a React component).
- Do / Don't: Unknown. Confirm on next task.
- Notes: Only one deliverable on record (`Pertamina_Documents_TipeBBMQuiz_2026-07-02.jsx`). Preferences here are thin; treat as provisional until a second task confirms the pattern.

## Internal
- Language: [confirmed] Indonesian for internal planning and chat (checkpoint files and briefs are written in Indonesian). English acceptable for outward-facing lead magnets like the AI prompts ebook.
- Tone: [confirmed] BUBU house voice, StopSlop mandatory. Confident, culturally grounded, no corporate-generic filler.
- Format: [confirmed] Research as `.md`, ebooks as HTML + PDF pair, manuscripts as editable `.docx` first, landing pages as `.html`.
- Delivery: [inferred] Bundle a deliverable with its distribution asset in the same batch (ebook + landing page together, not days apart). Multi-angle research uses parallel executors with a checkpoint file.
- Do / Don't: [confirmed] Do use the toolkit skills, never freehand a deliverable a skill covers. Do save under `Clients/Internal/[OutputType]/`. Don't hold significant work only in chat: write to disk incrementally.
- Notes: Internal work so far centers on AI enablement (making Claude usable by non-technical staff) and lead-magnet ebooks. This is BUBU building its own capability.

---

## How to add a client

When a new client folder appears under `Clients/`, add a section here using the format above, seeded with `[inferred]` lines from their first deliverable. Confirm the inferences on the next real interaction.
