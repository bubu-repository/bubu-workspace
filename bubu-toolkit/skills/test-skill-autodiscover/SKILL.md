---
name: test-skill-autodiscover
description: Test skill to verify auto-discovery mechanism works without plugin rebuild.
---

# Test Skill — Auto-Discovery Verification

This skill exists only to test that Claude Code auto-discovers skills from `bubu-toolkit/skills/` without requiring a plugin rebuild.

## How It Works

1. This skill was added by simply creating a folder `bubu-toolkit/skills/test-skill-autodiscover/` with a `SKILL.md` file.
2. No plugin rebuild was run (no `zip` command).
3. The user restarted Claude Code.
4. This skill appeared automatically.

If you can see this skill listed when you run `/` in Claude Code, auto-discovery is working.

## Usage

Run:
```
/test-skill-autodiscover
```

This skill outputs: "Auto-discovery is working! Skills load from `bubu-toolkit/skills/` without plugin rebuild."

## Notes

- This skill will be removed once auto-discovery is confirmed.
- It demonstrates that new skills can be added to the repo and appear to users immediately after `git pull` + session restart, no manual plugin steps needed.
