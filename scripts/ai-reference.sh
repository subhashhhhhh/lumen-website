#!/bin/sh
# Builds Lumen AI's API reference (Dokka) and copies it to public/ai/reference.
# Needs the lumen-ai repository next to this one.
set -e
cd "$(dirname "$0")/.."
(cd ../lumen-ai && ./gradlew -q :ai:dokkaGenerate)
rm -rf public/ai/reference
mkdir -p public/ai
cp -R ../lumen-ai/ai/build/dokka/html public/ai/reference
echo "API reference copied to public/ai/reference"
