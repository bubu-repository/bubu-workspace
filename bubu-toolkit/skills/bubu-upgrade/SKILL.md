---
name: bubu-upgrade
description: >-
  Self-improvement pass for the BUBU toolkit. Reads the accumulated knowledge in
  BUBU_Assets/Knowledge/ (learnings, client preferences, prior upgrades), reads every
  bubu-toolkit skill, then edits the skills to absorb recurring lessons so the setup
  stops repeating the same corrections. Trigger on "upgrade skill", "upgrade the toolkit",
  "improve the toolkit", "bubu makin pintar", "bikin bubu lebih pintar", "review learnings",
  "self-improve", "jadikan skill lebih pintar", or roughly monthly when Learnings.md has
  10 or more active entries. This edits skill files directly and logs every change.
---

# BUBU Upgrade: Fold Learnings Into Skills

The setup logs what every task teaches it in `Learnings.md`, and what every client wants in `ClientPreferences.md`. This skill turns that accumulated record into actual skill edits, so a correction made once becomes a rule the skill follows forever. Run it periodically, not on every task.

Absolute paths (this workspace):
- Knowledge folder: `/Users/sea/Claude/Projects/BUBU/BUBU_Assets/Knowledge/`
- Skills folder: `/Users/sea/Claude/Projects/BUBU/bubu-toolkit/skills/`
- Packaged plugin: `/Users/sea/Claude/Projects/BUBU/bubu-toolkit.plugin`

## Procedure

### Step 1: Read all knowledge
Read, in order:
1. `Knowledge/KNOWLEDGE_INDEX.md`
2. `Knowledge/Learnings.md` (focus on `active` entries)
3. `Knowledge/ClientPreferences.md`
4. `Knowledge/SkillUpgradeLog.md` (so you do not re-apply a change already made)

### Step 2: Read every skill
Read each `SKILL.md` under the skills folder: `bubu-mom`, `bubu-admin-docs`, `bubu-presentation`, `bubu-market-research`, `bubu-stopslop`, `bubu-upgrade`, `markitdown`, plus any others present. `ls` the folder first; do not assume the list. You need each skill's current text to know what to change and to avoid duplicating a rule it already has.

### Step 3: Identify concrete improvements
A learning earns a skill edit only when it is backed by evidence, not a one-off. Look for:
- **Recurring corrections:** the same "do differently" appears in three or more `active` entries. That pattern belongs in the skill as a rule.
- **Repeated client preferences:** a `[confirmed]` preference that keeps mattering (for example, "bundle the deliverable with its distribution asset") becomes a default step in the relevant skill.
- **Repeated failure modes:** the same mistake logged across tasks (broken tables, missing CTA, files written when none were wanted).

Skip one-off learnings, low-confidence hunches, and anything already covered by an existing skill rule or a prior `SkillUpgradeLog` entry. Fewer, high-confidence edits beat many speculative ones.

For each candidate, write down in one line: which skill, which section, what rule to add or change, and which learning backs it. Show this shortlist to the user before editing if the changes are more than cosmetic.

### Step 4: Apply the edits
Edit the target `SKILL.md` files directly. Add the rule to the section where the model will actually read it at the decision point (a delivery rule goes in the delivery/output section, not buried at the end). Keep the skill's existing structure and voice. All prose you add follows StopSlop: no em-dashes, no banned AI vocabulary, concrete over abstract.

### Step 5: Log every change
For each edit, append one entry to `Knowledge/SkillUpgradeLog.md` using the format defined in that file: date, skill(s), the concrete change, the reason, the source learning date, plugin mirror status, and `By: /bubu-upgrade`.

### Step 6: Mark absorbed learnings
For every `Learnings.md` entry whose lesson you just folded into a skill, change its `Status: active` to `Status: absorbed`, set `Absorbed by:` to today's `SkillUpgradeLog` entry date, and move the entry from the "Active entries" section to the "Absorbed entries" section. This stops the same learning from re-triggering an upgrade next month while keeping the record.

### Step 7: Handle the plugin mirror
Check the packaged plugin path:
- **If `bubu-toolkit.plugin` is a directory** containing a `skills/` folder, it is a live mirror: apply the same edits to the matching `SKILL.md` files inside it, and set `Mirrored to plugin: yes` in the log entries.
- **If `bubu-toolkit.plugin` is a single file** (a `.plugin` zip package, which is the current state in this workspace) or is absent, the loose skill edits do NOT reach the installed plugin automatically. Set `Mirrored to plugin: reinstall-needed` in the log entries, and tell the user in plain terms:

  > "Skill sudah di-update di folder `bubu-toolkit/skills/`, tapi plugin yang terinstall (`bubu-toolkit.plugin`) belum ikut berubah. Supaya perubahannya aktif, plugin-nya perlu di-repackage dan di-install ulang di Claude Code, lalu restart session."

  Do not silently assume the edits are live.

### Step 8: Report
Tell the user: how many learnings were reviewed, how many became skill edits (and which skills), how many were marked absorbed, and the plugin reinstall status. End on the sharpest line, not a recap.

## Guardrails
- Never invent a learning. Every edit traces to a logged `Learnings.md` entry, a `[confirmed]` client preference, or explicit user feedback.
- Never edit `CLAUDE.md` from this skill. That file is owned separately.
- Never delete a learning. Absorb it (flip the status and move it) so the audit trail survives.
- If nothing meets the Step 3 bar, make no edits and say so. A quiet month is a valid outcome.
