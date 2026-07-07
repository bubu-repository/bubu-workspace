#!/bin/bash
set -e

echo "Setting up BUBU workspace..."

# Pull gstack submodule
git submodule update --init --depth 1

# Run gstack setup (team mode + autodetect)
cd 03_FABLE_ORCHESTRATOR/gstack
./setup --host auto --team
cd ../..

# Configure git pull to fast-forward only (safe for auto-pull hook)
git config pull.ff only

echo ""
echo "✓ Setup complete."
echo ""
echo "Next steps:"
echo "  1. Open Claude Code and point it to this BUBU folder"
echo "  2. In Plugins panel: Install from file → select bubu-toolkit.plugin"
echo "  3. Restart Claude Code"
echo ""
echo "Auto-update is enabled — this workspace syncs with GitHub every time you open Claude Code."
