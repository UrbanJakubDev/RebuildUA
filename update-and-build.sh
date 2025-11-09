#!/bin/sh

set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo ">>> Fetching latest changes"
git pull --ff-only

echo ">>> Installing dependencies"
npm install

echo ">>> Building project"
npm run build

echo ">>> Done"

