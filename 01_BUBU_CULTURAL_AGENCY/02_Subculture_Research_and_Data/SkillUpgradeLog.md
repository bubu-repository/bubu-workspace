# Skill Upgrade Log

Every change made to a bubu-toolkit skill, and why. `/bubu-upgrade` appends here after each edit. When you wonder why a skill behaves a certain way, read this file.

## Entry format (copy this block, fill every field)

```
### YYYY-MM-DD | [what changed, short]
- Skill(s): [bubu-mom | bubu-admin-docs | bubu-presentation | bubu-market-research | bubu-stopslop | bubu-upgrade | markitdown | multiple]
- Change: [what was edited, concretely: which section, what rule added or removed]
- Reason: [the learning or feedback that drove it]
- Source: [Learnings.md entry date, user feedback, or git commit hash]
- Mirrored to plugin: [yes | no | reinstall-needed]
- By: [/bubu-upgrade | manual]
```

Rules: one edit per entry. Always cite the source learning so the chain from correction to skill change is traceable. Note the plugin mirror status every time, because `bubu-toolkit.plugin` is a packaged file and edits to the loose skills do not reach it until reinstall.

---

## History

### 2026-07-06 | Fable overseer setup + checkpoint-save rule
- Skill(s): multiple (workspace-level)
- Change: Added the checkpoint-save rule (CLAUDE.md section 6) and Fable overseer setup. Skills now expected to write output incrementally and leave a `.checkpoint.md` for long tasks.
- Reason: Long multi-step tasks were at risk of losing everything on a session or usage-limit break.
- Source: git commit 106fd46
- Mirrored to plugin: reinstall-needed
- By: manual

### 2026-07-06 | bubu-stopslop editorial voice skill added
- Skill(s): bubu-stopslop (new), all skills defer to it
- Change: Created bubu-stopslop as the canonical writing voice. All other skills now defer to it for prose voice; their own writing rules became supplements, not overrides.
- Reason: Prose across skills read as generic AI output (em-dashes, banned vocabulary). Needed one editorial standard instead of per-skill rules.
- Source: git commit 8fb3053
- Mirrored to plugin: reinstall-needed
- By: manual

### 2026-07-06 | Google Docs table fix + no-em-dash / no-AI-language across all skills
- Skill(s): multiple (bubu-mom, bubu-admin-docs, bubu-presentation, bubu-market-research)
- Change: Fixed Google Docs table rendering. Added the no-em-dash and no-AI-language rules to every skill.
- Reason: Tables rendered broken in Google Docs; prose still contained em-dashes and AI vocabulary despite the voice guidance.
- Source: git commit 915a6a8
- Mirrored to plugin: reinstall-needed
- By: manual

### 2026-07-06 | Skills generate file output only when explicitly requested
- Skill(s): all
- Change: Every skill changed to produce a file only when the user explicitly asks for one, instead of writing files by default.
- Reason: Skills were emitting files the user did not want, cluttering the workspace.
- Source: git commit 79d861a
- Mirrored to plugin: reinstall-needed
- By: manual

---

_New `/bubu-upgrade` entries append below this line._
