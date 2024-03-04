#!/usr/bin/env bash

# Intended to be run as a `preversion` lifecycle hook as part of `yarn version`
# 1. Update `published.json` file with the current date (UTC)
echo "{\"date\":\"$(date -u +%Y-%m-%d)\"}" > src/data/published.json
# 2. Stage changes before being committed during `version` lifecycle hook
git add src/data/published.json