# Knowledge Index

The memory of BUBU's Claude setup. Read this file first, then open only the knowledge file the task needs. Every client-facing task starts here.

Maintained by the Learning Loop (CLAUDE.md section 9) and upgraded by `/bubu-upgrade`.

| File | What it holds | Read it when |
|------|---------------|--------------|
| `KNOWLEDGE_INDEX.md` | This index. One line per knowledge file. | Start of any client-facing task, before anything else. |
| `Learnings.md` | Running log of task learnings: what worked, what to change, which skill was used. Entries are marked `active` or `absorbed`. | Before starting a task of the same type or for the same client. Skim active entries. |
| `ClientPreferences.md` | Per-client tone, format, language, and delivery preferences. One section per client plus Internal. | Before producing any output for a named client. Read that client's section. |
| `SkillUpgradeLog.md` | History of every change made to a bubu-toolkit skill, with reason and source learning. | Before running `/bubu-upgrade`, and when a skill behaves unexpectedly (check what changed). |

## How the loop works, in one paragraph

Before a client-facing task, read this index and the relevant client section. After delivering significant output, append one entry to `Learnings.md` and, if the user corrected you or stated a preference, update `ClientPreferences.md`. When `Learnings.md` holds 10 or more `active` entries, or roughly once a month, run `/bubu-upgrade`: it reads every logged learning, edits the skills to absorb the recurring ones, logs each edit in `SkillUpgradeLog.md`, and flips absorbed learnings so they stop re-triggering. The system gets sharper every task instead of repeating the same corrections.
