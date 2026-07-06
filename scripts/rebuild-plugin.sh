#!/bin/bash
# [ARCHIVED] Rebuild bubu-toolkit.plugin after any skill changes
#
# NOTE: This script is kept for historical reference only. Skills now auto-discover
# from bubu-toolkit/skills/ without requiring plugin rebuild. Just add a new skill
# folder with SKILL.md and commit — no zip command needed.
#
# Only run this manually if you need to regenerate the plugin binary for some reason
# (e.g., recovering from corruption). Normal workflow never requires this.
#
# Usage: ./rebuild-plugin.sh

set -e

cd "$(dirname "$0")/.."

echo "Rebuilding bubu-toolkit.plugin..."
cd bubu-toolkit
zip -rq ../bubu-toolkit.plugin . -x ".DS_Store" -x "*/.DS_Store"
cd ..

echo "✓ Plugin rebuilt: bubu-toolkit.plugin ($(du -h bubu-toolkit.plugin | cut -f1))"
echo ""
echo "Next: commit and push to update all users."
