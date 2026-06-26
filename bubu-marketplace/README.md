# BUBU Marketplace

A private Claude **plugin marketplace** for BUBU Global. It distributes the
**`bubu-toolkit`** plugin (BUBU MOM + MarkItDown) to the whole team, with
**automatic updates**: push a change here and everyone gets it on next startup.

```
bubu-marketplace/
├── .claude-plugin/
│   └── marketplace.json          ← the catalog (lists bubu-toolkit)
└── plugins/
    └── bubu-toolkit/             ← the plugin itself
        ├── .claude-plugin/plugin.json   (version-less → every push = new version)
        ├── hooks/hooks.json             (convert-before-process rule)
        └── skills/
            ├── bubu-mom/                (Minutes of Meeting generator)
            └── markitdown/              (file → Markdown)
```

---

## 1. Publish to a PRIVATE GitHub repo (one time)

You need a GitHub account. Create an **empty private repo** named `bubu-marketplace`
(owner can be your personal account or a `BUBU-GLOBAL` org). Then, in a terminal:

```bash
cd "/Users/sea/Claude/Projects/BUBU/bubu-marketplace"
git init                       # already done for you; safe to re-run
git add -A
git commit -m "BUBU marketplace: bubu-toolkit"      # already committed for you
git branch -M main
git remote add origin https://github.com/<YOUR-OWNER>/bubu-marketplace.git
git push -u origin main
```

Replace `<YOUR-OWNER>` with your GitHub username or org. If `git remote add`
says it already exists, use `git remote set-url origin <url>` instead.

> The `homepage` in `plugin.json` currently points at `BUBU-GLOBAL/bubu-marketplace`.
> Edit it if your repo lives somewhere else (optional, cosmetic only).

---

## 2. Install it (you and every teammate)

In Claude (Cowork or Claude Code), run:

```
/plugin marketplace add <YOUR-OWNER>/bubu-marketplace
/plugin install bubu-toolkit@bubu-marketplace
```

That's it. The skills appear as `bubu-toolkit:bubu-mom` and `bubu-toolkit:markitdown`.

Because the repo is **private**, each person must be able to read it on GitHub
(be a collaborator / org member). Claude uses their existing GitHub login
(`gh auth login` or saved git credentials) when installing.

---

## 3. Updates — how "auto-update" works

This plugin is **version-less on purpose** (`plugin.json` has no `version`), so
**every commit you push is treated as a new version.** You don't have to bump a
number — just edit, commit, push.

- **Background auto-update:** Claude refreshes marketplaces at startup and pulls
  the newest version automatically. For a **private** repo this needs a token in
  the environment so the silent pull can authenticate:
  - GitHub: set `GITHUB_TOKEN` (or `GH_TOKEN`) to a personal access token with
    **read** access to the repo (add to `~/.zshrc` / `~/.bashrc`):
    ```bash
    export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
    ```
- **Manual update (always works, no token needed):** run
  ```
  /plugin marketplace update bubu-marketplace
  /plugin update bubu-toolkit@bubu-marketplace
  ```

---

## 4. Releasing a change (the BUBU workflow)

1. Edit files under `plugins/bubu-toolkit/` (e.g. tweak `skills/bubu-mom/SKILL.md`
   or `scripts/generate_mom.py`).
2. Commit and push:
   ```bash
   git add -A && git commit -m "tweak MOM template" && git push
   ```
3. Teammates get it automatically at next startup (or via the manual update above).

Validate before pushing (optional):

```
/plugin validate .
```

---

## Notes

- **One source of truth:** maintain the skill ONLY here, inside the plugin. You no
  longer need the standalone `bubu-mom.skill`; once the plugin is installed from the
  marketplace, `/plugin uninstall` any old standalone copy to avoid duplicates.
- **Marketplace name** is `bubu-marketplace` (used as `@bubu-marketplace` when
  installing). Keep it unique per user.
