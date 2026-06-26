#!/bin/bash
set -e

echo "Setting up BUBU workspace..."

# Pull gstack submodule
git submodule update --init --depth 1

# Run gstack setup (team mode + autodetect)
cd gstack
./setup --host auto --team
cd ..

echo ""
echo "Done. Restart Claude Code to activate all skills."
