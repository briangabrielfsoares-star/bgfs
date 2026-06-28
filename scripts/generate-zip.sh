#!/usr/bin/env bash
set -e
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ZIP_NAME="bgfs-digital-ready.zip"
cd "$PROJECT_DIR/.."
rm -f "$ZIP_NAME"
zip -r "$ZIP_NAME" "$(basename "$PROJECT_DIR")" -x "*/node_modules/*" "*/.next/*" "*/.vercel/*" "*.log"
echo "ZIP gerado: $ZIP_NAME"
