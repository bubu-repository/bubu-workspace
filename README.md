# BUBU Workspace

The shared Claude Code workspace for [BUBU](https://bubu.com) — Indonesia's Cultural Intelligence Agency. Clone this repo to get every skill, tool, and project context the team uses.

---

## Quick Start (new team member)

```bash
git clone --recurse-submodules <repo-url> BUBU
cd BUBU
chmod +x setup.sh && ./setup.sh
```

`setup.sh` initializes gstack and registers the team-mode auto-update hook. After that, open Claude Code in this folder and all skills are live.

> **Team auto-update**: once setup runs, gstack self-updates at every Claude Code session start. BUBU-specific content (skills, templates, docs) stays current via `git pull`.

---

## What's included

| Path | What it is |
|------|-----------|
| `gstack/` | [gstack](https://github.com/garrytan/gstack) — 23+ workflow skills (design, QA, security, browser automation, etc.) — git submodule, auto-updates |
| `bubu-marketplace/` | BUBU's internal Claude plugin marketplace — distributes `bubu-toolkit` to the team |
| `bubu-mom.skill` | `/bubu-mom` skill — generates BUBU-branded minutes of meeting |
| `markitdown.skill` | `/markitdown` skill — converts files (PDF, DOCX, XLSX) to Markdown |
| `bubu-toolkit.plugin` | Plugin bundle (MOM + MarkItDown) for one-click install |
| `Marketing/` | Marketing workspace — briefs, ads, social, reports, presentations |
| `MOM/` | Meeting notes archive |
| `Base/` | Shared project contexts, skills, and brand references |
| `.claude/` | Claude Code project settings (permissions, hooks) |
| `.agents/` | Project-specific skills for other AI agents (Higgsfield, etc.) |

---

## Getting updates

```bash
git pull                           # get updated BUBU skills, docs, templates
git submodule update --remote      # bump gstack to latest (optional — team mode handles this automatically)
```

When you push a skill edit or add a new file:

```bash
git add <file>
git commit -m "feat: describe the change"
git push
```

Everyone on the team gets it on their next `git pull`.

---

## Directory structure (Marketing)

See [Marketing/CLAUDE.md](Marketing/CLAUDE.md) for the full brief. Short version:

| Folder | Purpose |
|--------|---------|
| `_Context/` | Brand foundation — read before generating anything |
| `_Templates/` | Reusable templates |
| `_SOP/` | Process docs |
| `Ads/`, `Social/`, `Reports/`, `Presentations/`, `Research/` | Finished deliverables by type |

---

## Notes

- `.claude/settings.local.json` contains some **absolute paths** specific to the original machine. Team members may need to update those paths to match their local clone location.
- gstack requires `bun`. Install: `curl -fsSL https://bun.sh/install | bash`
